const User = require("../../auth/model")
const Product = require("../../../store/products/model")

const route = async (req,res,next) => {
    try {
        let { params, body , kuserData} = req;
        await User.findOne({ $and: [{_id: kuserData.id},{favorite_product:{$in: [params.id]}}]})
            .exec(async(err,data) => {
                if(!data){
                    await User.updateOne(
                      { _id: kuserData.id },
                      { $push: { favorite_product: params.id } }
                    );
                    await Product.updateOne(
                      {
                        $and: [
                          { _id: params.id },
                          { favorite: { $nin: [kuserData.id] } },
                        ],
                      },
                      {
                        $push: {
                          favorite: kuserData.id,
                        },
                      }
                    );
                    return res.status(200).send({ status: true, message: "Product Add Favorite Success "})
                }else{
                    await User.updateOne(
                      { _id: kuserData.id },
                      {
                        $pull: {
                          favorite_product: {
                            $in: [params.id],
                          },
                        },
                      }
                    );
                    await Product.updateOne(
                        {
                          $and: [
                            { _id: params.id },
                            { favorite: { $in: [kuserData.id] } },
                          ],
                        },
                        {
                          $pull: {
                            favorite: {
                                $in: [kuserData.id]
                            },
                          },
                        }
                      );
                    return res.status(200).send({ status: true, message: "Product Delete Favorite Success "})
                }
            })
    } catch (error) {
        if(error){
            if(error.name === "MongoError" && error.code === 11000)
                return res.status(500).send({ status: false, message: `File Already exists: ${error}`})
        }
        return res.status(500).send({ status: false, message: `Product Add Favorite ,Something Missing => ${error}`})
    }
}

module.exports = route