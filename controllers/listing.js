const Listing = require("../models/listing")
module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index", { listings }); 
};
module.exports.renderNewForm = (req,res)=>{
  res.render("listings/new");
}
module.exports.renderShowPage = async (req,res)=>{
    const {id} = req.params;
 const listing =await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner"); // using populate
 if(!listing){
    req.flash("error","listing does not exist");
    res.redirect("/listings");
 }
 res.render("listings/show.ejs",{listing});
}
module.exports.createRoute = async (req, res, next) => {
  let listings = req.body.listing;
  const newListing = new Listing(listings);
  newListing.owner = req.user._id;
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};
module.exports.editRoute = async (req, res) => {
     const {id} = req.params;
 const listing =await Listing.findById(id);
 res.render("listings/edit", {listing});
}
module.exports.updateRoute = async (req, res) => {

let {id} = req.params;
let listing  = await Listing.findByIdAndUpdate(id,{...req.body.listing})
 if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  } 
  await listing.save();
req.flash("success","Listing was Updated!")

res.redirect(`/listings/${id}`);
}
module.exports.deleteRoute = async (req, res) => {
  const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing was Deleted!")
    res.redirect('/listings')
  
}
module.exports.postRoute= (req,res)=>{
  res.send(req.file);
}
