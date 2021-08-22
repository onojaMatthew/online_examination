import { User } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { success, error } from "../../config/response";

export const createUser = async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;
  try {
    const isUser = await User.findOne({ email });
    
    if (isUser) return res.status(400).json(error("Email already exists", res.statusCode));
    let newUser = new User({ first_name, last_name, email, password, phone });
    const hash = bcrypt.hashSync(password, 12);

    newUser.password = hash;
    newUser = await newUser.save();

    return res.json(success("Account created successfully", newUser, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const login = async (req, res) => {
  try {
    const isUser = await User.findOne({ email: req.body.email });
    if (!isUser) return res.status(404).json(error("This church account does not exist", res.statusCode));
    const passwordMatched = bcrypt.compareSync(req.body.password, isUser.password);
    if (!passwordMatched) return res.status(400).json(error("Password did not match", res.statusCode));
    const { email, _id, first_name, last_name } = isUser;
    const token = jwt.sign({ _id, email }, process.env.SECRET_KEY, { expiresIn: "1days"});
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, user: { email, _id, first_name, last_name }}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const users = async (req, res) => {
  try {
    const users = await User.paginate();
    return res.json(success("Success", users, res.statusCode))
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const userDetail = async (req, res) => {
  try {
    const user = await User.findOne({ domain_name: req.query.domain_name });
    return res.json(success("Success", user, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const updateUser = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete({ _id: req.query.id });
    return res.json(success("Success", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}