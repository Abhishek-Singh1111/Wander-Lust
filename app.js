if(process.env.NODE_ENV !="production"){
require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ejsMate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const path = require('path');
const methodOverride = require('method-override');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"/public")));
app.set("views", path.join(__dirname, "views"));

const port = 8080;

//sessionOptions
const sessionOptions={
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true,
  }
}
//session meddleware
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
 app.use(express.static(path.join(__dirname,"/public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Middleware to serve static files
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));            

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter)               
app.use("/",userRouter);




// Connect to MongoDB
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
 
// home route
//  app.get("/", (req, res) => {
//     res.send("home");
//   });
//   app.get("/signup",async (req,res)=>{
//   let fackUser = new User({
//      email:"student1",
//      username:"delta_Student"
//   });
//  let registerUser =await User.register(fackUser,'password');
//  res.send(registerUser);
//   })
  

  

// index route for listings
app.get("/listings", async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index", { listings}); 
});

 
//new route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new");
});

// show route 
app.get("/listings/:id",async (req,res)=>{
    const {id} = req.params;
 const listing =    await Listing.findById(id).populate("reviews"); // using populate;
 res.render("listings/show.ejs",{listing})
});


// crearte route 
app.post("/listings", wrapAsync(async (req, res,next) => {
  //const { title, description,image, price, location, country } = req.body  
  
  let listings = req.body.listing;
 const newListing = new Listing(listings)
 await newListing.save();
 res.redirect("/listings");
})); 


//edit route
app.get("/listings/:id/edit", async (req, res) => {
     const {id} = req.params;
 const listing =await Listing.findById(id);
 res.render("listings/edit", {listing});
});

//update route
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
let {id} = req.params;
await Listing.findByIdAndUpdate(id,{...req.body.listing})
res.redirect(`/listings/${id}`);
}))
//delete route
app.delete("/listings/:id", async (req, res) => {
  const {id} = req.params;
  await Listing.findByIdAndDelete(id).then(()=>{
    res.redirect('/listings')
  })
});
//reviews route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
  const {id} = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("new review saved");

  res.redirect(`/listings/${listing.id}`);
}))
//delete route for reviews
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
   let {id,reviewId} = req.params;
   await Listing.findOneAndUpdate({_id:id},{$pull:{reviews:reviewId}})//pull operator of mongoose
   await Review.findByIdAndDelete(reviewId);

   res.redirect(`/listings/${id}`)

}))

// app.all("*",(req,res,next)=>{
//   next(new ExpressError(404,"Page not found"));
// })



// middleware for handling errors
app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong"} = err;
  res.status(statusCode).send(message);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
}); 