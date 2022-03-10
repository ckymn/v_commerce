
const express = require("express")
const router = express.Router();

//middleware
const {
  authJwt,
  active,
  uploadImage,
  idChecker,
  ip_mid,
  validate,
  errorHandler,
} = require("../middlewares");
//validations
const schemas = require("../validations/admin");

//store_get
const store_home = require("../modules/store/store_home/router")
const sectorSearch = require("../modules/store/auth/router")
const products = require("../modules/store/products/router")
const all_advertisement = require('../modules/store/advertisement/router')
const panel = require("../modules/store/panel/router")

//store_post
const store_advertisement = require("../modules/store/advertisement/router")
const store_auth = require("../modules/store/auth/router")
const storeStory = require("../modules/store/story/router")
const store_payment = require("../modules/store/payment/router")
const store_images = require("../modules/store/img")

//store_get
router.get(`/store/store`, authJwt, store_home.store)
router.get(`/store/register`, store_auth.get_register)
router.get(`/store/login`, store_auth.get_login)
router.get(`/store/sectors`,authJwt, sectorSearch.get_sectors)
router.get(`/store/search_sector`,authJwt, sectorSearch.get_search_sector)
router.get(`/store/logout`,authJwt,store_auth.logout)
router.get(`/store/products`,authJwt,products.all_products)
router.get(`/store/product/:id`,idChecker(),authJwt,products.single_product)
router.get(`/store/advertisements`, authJwt, all_advertisement.all_advertisement)
router.get(`/store/advertisement/:id`,idChecker(), authJwt, all_advertisement.single_advertisement)
router.get(`/store/images`,authJwt,store_images.get_images)
router.get(`/store/panel`,authJwt,panel.get_info)
router.get(`/store/panel/:id`,idChecker(),authJwt,panel.show_info)
router.get(`/store/payments`, authJwt,store_payment.all_payment)
router.get(`/store/payment/:id`,idChecker(), authJwt, store_payment.single_payment)
router.get(`/store/payment_cancel/:id`,idChecker(),authJwt,store_payment.cancel_payment)
router.get(`/store/stories`,authJwt ,storeStory.all_story)
router.get(`/store/home_page`,authJwt ,store_home.home_page)

//store_post
router.post(`/store/register`,store_auth.register)
router.post(`/store/login`,store_auth.login)
router.post(`/store/forgot_password`,authJwt,store_auth.forgot_password)
router.post(`/store/reset_password`,authJwt,store_auth.reset_password)
router.put(`/store/update_password`,authJwt,store_auth.update_password)
router.post(`/store/advertisement`, authJwt ,ip_mid.ip2_Middleware,store_advertisement.add_advertisement)
router.delete(`/store/advertisement/:id`,idChecker(), authJwt, all_advertisement.delete_advertisement);
router.post(`/store/products`,authJwt,products.add_products)
router.delete(`/store/product/:id`,idChecker(), authJwt, products.delete_product)
router.put(`/store/product/:id`,idChecker(), authJwt, products.update_product)
router.put(`/store/panel`,authJwt,panel.update_info);
router.post(`/store/payment`,authJwt,ip_mid.ip2_Middleware,store_payment.store_date_payment)
router.post(`/store/storie`,authJwt,storeStory.add_story)
router.delete(`/store/storie/:id`,idChecker(),authJwt,storeStory.delete_story);
router.post(`/store/image/upload`,authJwt,uploadImage.array("img"),store_images.uploader);
router.delete(`/store/image/delete`,authJwt,store_images.delete_images);

module.exports = router;    
