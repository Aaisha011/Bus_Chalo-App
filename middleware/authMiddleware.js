const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protect = async (req, res, next) => {
  let token;

  try {
    // check if token is coming with req
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // get token
      token = req.headers.authorization.split(" ")[1];

      // validate token
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // check if user exists
      const user = await User.findById(decoded.id).select("-password");
      // stored user into req object
      if (user.isActive) {
        req.user = user;
        next();
      }
      else{
        res.status(400)
        throw new Error("your account has been suspended by admin")
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized access no token found");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized access");
  }
};

module.exports = protect;
