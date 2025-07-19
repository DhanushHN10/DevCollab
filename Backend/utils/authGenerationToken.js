import jwt from 'jsonwebtoken';



export const generateAuthToken = (user) =>{
    return jwt.sign(

        {id : user._id,
        // user.username,
        // user.email,
        profileCompleted:user.profileCompleted

        },
        process.env.JWT_SECRET,
        {expiresIn:'30d'}

    );


};



