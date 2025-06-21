const User = require("../models/user.js")
const  passport  = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

//log out route 
module.exports.logoutRoute = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash("success", "Logged out successfully!");
    res.redirect("/login");
  });
};

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup")
};
module.exports.signUp=async(req,res)=>{
try{    
let {username,email,password} = req.body;
 const newUser =new User ({
    email,
    username,
}
)
 const registerUser=await User.register(newUser,password);
req.login(registerUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","user was registered ")
    
res.redirect("/listings");
});
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}

};
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login");
}
module.exports.loginRoute= async (req, res) =>{
    req.flash("success","Login successful");
 let redirectUrl = res.locals.redirectUrl ||"/listings";
   res.redirect(redirectUrl);
}