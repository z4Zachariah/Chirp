import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";

//This controller governs the functions of signing in and signing up to the Chirp platform.

const secret = 'test';

//sign in
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //see if user exists
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    //chech if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    //issue JWT
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    //result
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    //error
    res.status(500).json({ message: "Something went wrong" });
  }
};// end of Sign in 


//sign up function
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {

    //check if user already exists
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    //issue JWT
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    //result
    res.status(201).json({ result, token });
  } catch (error) {
    //error
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};//end of Sign up
