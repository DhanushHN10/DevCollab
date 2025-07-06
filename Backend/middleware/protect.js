import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req , res , next) =>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
        try {
            
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');
            return next();
        } catch (error) {
            res.status(401).json({
                error: "Not authorized, token invalid or expired",
                details: error.message
            });
        }
    }
    else{        
    return res.status(401).json({
        error: "Not authorized, No Token found"
    });}
};