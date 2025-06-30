import { check,validationResult } from "express-validator";
// import  User  from "../models/User.js";
import User from "../models/User.js";

const signupValidator = [
  check("name", "Name is required").notEmpty(),
  check("username", "Enter a valid Username").notEmpty(),
  check("email", "Enter a valid Email").isEmail(),
  check("email").custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
  }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),
];



const signupValidateRequest= (req,res,next) =>{
  const errors= validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      errors: errors.array(),
    });

  }
  next();
};

export default {signupValidator , signupValidateRequest}; 
