const admin =require("../firebase");
const product = require("../models/product");
const User=require("../models/user");
exports.authCheck=async(req,res,next)=>{
    try {
        const firebaseUser=await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);//header is being passed as authtoken from front end
      //  console.log("FIREBASE USER IN AUTHCHECK",firebaseUser);
        req.user=firebaseUser;
        next();
    } catch (error) {
        res.status(401).json({
            err: "Invalid or expired token try logging in",
        }); 
    }    
};
exports.adminCheck=async(req,res,next)=>{
    const {email}=req.user;
    const adminUser=await User.findOne({email}).exec();
    if(adminUser.role!=="admin"){
        res.status(403).json({
            err: "Admin resource. Access denied.",
        });
    }
    else{
        next();
    }
};
