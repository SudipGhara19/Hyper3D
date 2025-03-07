
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler.js';
import User from '../models/main.model.js';


//--------------------------------------------- SIGNUP CONTROLLER -------------------------------------------
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler(400, "User already exists, go to sign in."));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
        username,
         email, 
         password: hashedPassword,
         folders: [] //initially no folders assigned
        });
    await newUser.save();


    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


//--------------------------------------------- SIGNIN CONTROLLER -------------------------------------------
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler(400, 'User not found, please sign up.'));
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler(401, 'Invalid credentials.'));
    }

    const { password: pass, ...rest } = user._doc;

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, user: rest });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};