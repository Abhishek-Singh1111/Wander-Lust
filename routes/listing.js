const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner} = require("../middleware.js")
const listingControler = require("../controllers/listing.js")
const multer  = require('multer')
const {storage}= require("../cloudConfig.js")
const upload = multer({storage })
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
router.get("/new",isLoggedIn,listingControler.renderNewForm);
//here we are appling router.route method
router.route("/")
.get(listingControler.index)
// .post(wrapAsync(listingControler.createRoute)); 
.post(upload.single('listing[image]'), validateListing, listingControler.createRoute)


router.route("/:id")
.get(listingControler.renderShowPage)
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  listingControler.updateRoute
)
.delete(isLoggedIn,isOwner,listingControler.deleteRoute);




//edit route
router.get("/:id/edit",isLoggedIn,isOwner,listingControler.editRoute );

module.exports = router;
