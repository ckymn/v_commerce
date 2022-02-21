const Products = require("../../../store/products/model")

const route = async (req,res,next) => {
    try {
        let { params, query } = req;
        let _data = await Products.findOne({ _id: params.id })
            .populate({ path: 'author', select: 'phone'})
            .populate({ 
                path: 'comments',
                populate : {
                    path : 'author',
                    select: 'name surname',
                }, 
                options: {
                    lean: true
                }
            })
            .populate({ path: 'star', select: 'rate'})
            .lean().exec();
        return res.status(200).send({ status: true, message: "Single Products and Stories are success ", data: _data })
    } catch (error) {
        if(error){
            if(error.name === "MongoError" && error.code === 11000)
                return res.status(500).send({ status: false, message: `File Already exists: ${error}`})
        }
        return res.status(500).send({ status: false, message: `User Single Product ,Something Missing => ${error}`})
    }
};

module.exports = route;