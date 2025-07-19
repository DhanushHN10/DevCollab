import dotenv from "dotenv";
dotenv.config();
import argon2 from 'argon2';
import User from '../models/User.js';
import { generateAuthToken } from '../utils/authGenerationToken.js';
import gravatar from 'gravatar';

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const hashedPassword = await argon2.hash(password);
    const avatar = gravatar.url(email,{s:'200', r:'pg', d:'mm'},true);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    const token = generateAuthToken(user);

    res.status(201).json({
      message: 'Signup successful, User created',
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar:user.avatar
      },
    });
  } catch (err) {
    res.status(500).json({
      err: 'Signup failed',
      details: err.message,
    });
  }
};

export const completeProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);
       if (!user) return res.status(404).json({ message: "User not found" });

        if (user.profileCompleted) {
      return res.status(400).json({
        Error: 'Profile already completed',
        
      });
    }


    const { links, skills, interests, availability, Bio, location } = req.body;

    

   
    user.links = links;
    // user.avatar = avatar;
    user.skills = skills;
    user.interests = interests;
    user.availability = availability;
    user.Bio = Bio;
    user.location = location;
    user.profileCompleted = true;

    await user.save();

    res.status(200).json({
      message: 'Profile completed successfully',
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        links: user.links,
        avatar: user.avatar,
        skills: user.skills,
        interests: user.interests,
        availability: user.availability,
        Bio: user.Bio,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({
      err: 'Profile completion failed',
      details: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    }).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Profile update failed',
      details: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password'); // fixed typo: fineOne → findOne

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const PasswordCheck = await argon2.verify(user.password, password);

    if (!PasswordCheck) {
      return res.status(400).json({
        error: 'Invalid Credentials (Wrong Email or Password)',
      });
    }

    const token = generateAuthToken(user);
    res.status(200).json({ // fixed typo: was using comma instead of dot
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        links: user.links,
        avatar: user.avatar,
        skills: user.skills,
        interests: user.interests,
        availability: user.availability,
        Bio: user.Bio,
        location: user.location,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'Login failed',
      details: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user }); 
};

export const googleOAuth = (req, res) => {
  const token = generateAuthToken(req.user._id);
  const redirectPath = req.user.profileCompleted ? 'dashboard' : 'complete-profile';
  res.redirect(`${process.env.CLIENT_REDIRECT_URL}/${redirectPath}?token=${token}`); 
};



// import argon2 from 'argon2';
// import User from '../models/User.js';
// import { generateAuthToken } from '../utils/authGenerationToken.js';


// export const signup = async (req,res) =>{
//     try {
//         const {name,username, email, password } = req.body;
        
//         const hashedPassword = await argon2.hash(password);

//         const user= await User.create({
//             name,
//             username,
//             email,
//             password: hashedPassword,
//         });
        
//         const token = generateAuthToken(user._id);

//         res.status(201).json({
//             message:"Signup successful, User created",
//             token,
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 username: user.username,
//                 email: user.email,
//             }
//         });

        
//     } catch (err) {
//         res.status(500).json({
//             err:"Signup failed",
//             details: err.message
//         });
//     };
// }


// export const completeProfile = async (req,res) =>{
//     try {
//         const {links, avatar, skills, interests, availability, Bio, location} = req.body;

//         const user= await User.findById(req.user._id);

//         if(user.profileCompleted)
//         {
//             return res.status(400).json({
//                 Error: "Profile already completed"
//             });
//         }


//         user.links = links;
//         user.avatar = avatar;
//         user.skills = skills;
//         user.interests = interests;
//         user.availability = availability;
//         user.Bio = Bio;
//         user.location = location;
//         user.profileCompleted  = true;

//         await user.save();

//         res.status(200).json({
//             message: "Profile completed successfully",
//             user:{
//                 _id: user._id,
//                 name: user.name,
//                 username: user.username,
//                 email: user.email,
//                 links: user.links,
//                 avatar: user.avatar,
//                 skills: user.skills,
//                 interests: user.interests,
//                 availability: user.availability,
//                 Bio: user.Bio,
//                 location: user.location
//             }
//         });


//     } catch (err) {
//         res.status(500).json({
//             err: "Profile completion failed",
//             details: err.message
//         });
//     }

// };
// export const updateProfile = async (req, res) => {
//         try {
//             const updates= req.body;

//             const user= await User.findByIdAndUpdate(req.user._id,updates,{
//                 new:true
//             }).select('-password');  // to exclude the password

//             res.status(200).json({
//                 message:"Profile updated successfully"
//                 // ,
//                 // user
//             });
//         } catch (error) {
//             res.status(500).json({
//                 error: "Profile update failed",
//                 details: error.message
//             });
//         }
//     };

//     export const login =async (req,res) =>{
//             const {email, password} = req.body;
//             try {
//                 const user= User.fineOne({email}).select('+password');

//                 if(!user){
//                     return res.status(404).json({
//                         error: "User not found"
//                     });
//                 }

//                 const PasswordCheck = await argon2.verify(user.password,password);

//                 if(!PasswordCheck){
//                     return res.status(400).json({
//                         error: " Invalid Credentials ( Wrong Email or Password)"
//                     });
//                 }

//                 const token= generateAuthToken(user._id);
//                 res.status(200),json({
//                     message: "Login successful",
//                     token,
//                     user: {
//                         _id: user._id,
//                         name: user.name,
//                         username: user.username,
//                         email: user.email,
//                         links: user.links,
//                         avatar: user.avatar,
//                         skills: user.skills,
//                         interests: user.interests,
//                         availability: user.availability,
//                         Bio: user.Bio,
//                         location: user.location
//                     }   
//                 });
//             } catch (error) {
//                 res.status(500).json({
//                     error: "Login failed",
//                     details: error.message
//                 });
//             }
//     };


//     export const getMe = async (req,res) => {
//         res.status(200).jason({user:req.user});
//     }
 

//     export const googleOAuth = (req,res) =>{
//         const token = generateAuthToken(req.user._id);
//         const redirectPath = req.user.profileCompleted?'dashboard':'complete-profile';
//         res.dedirect(`${process.env.CLIENT_REDIRECT_URL}/${redirectPath}?token=${token}`);
//     }