const Listing = require("../models/listing")
const Review = require("../models/review")
//create route
module.exports.create = async(req,res)=>{
  const {id} = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success","New Review created!")
  res.redirect(`/listings/${listing.id}`);
}
//delete route
module.exports.deleteRoute = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Correct usage
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review was deleted!");
  res.redirect(`/listings/${id}`);
}
