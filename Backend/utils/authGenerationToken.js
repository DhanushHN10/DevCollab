import jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      profileCompleted: user.profileCompleted,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
