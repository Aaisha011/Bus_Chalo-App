const User = require("../models/userSchema");
// bcrypt for hash password
const bcrypt = require("bcrypt");
// JWT token
const jwt = require('jsonwebtoken');

// User Registration
const registerUser = async (req, res) => {
  const { name, age, gender, phone, email, password } = req.body;

  // check all fields are coming from req body
  if (!name || !age || !gender || !phone || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // check if user already exists
  const phoneExists = await User.findOne({ phone: phone });
  const emailExists = await User.findOne({ email: email });

  if (phoneExists || emailExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // if phone number is not 10 digits
  if (phone.length !== 10) {
    res.status(400);
    throw new Error("Phone number must be 10 digits");
  }

  const user = await User.create({
    name,
    age,
    gender,
    phone,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("User not created");
  }

  res.status(201).json({
    msg: "User registered successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    },
  });
};

// User Login
const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    res.status(400);
    throw new error("All fields are required");
  }

  // Check is user exists
  const user = await User.findOne({ phone });

  if (user && bcrypt.compare(password, user.password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      token: generatetoken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
};

// private controller
const privateController = (req,res) =>{
  res.json({
    msg :"Request by: ",
    data: req.user
  })
  console.log(req.user);
}

// generate token
const generatetoken = (id) =>{
  let token = jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"10d"});
  return token;
}

module.exports = {
  registerUser,
  loginUser,
  generatetoken,
  privateController
};
