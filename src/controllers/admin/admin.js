import { Admin } from "../../models/admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error, success } from "../../config/response";

export const createAdmin = async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;
  try {
    const isAdmin = await Admin.findOne({ email });
    
    if (isAdmin) return res.status(400).json(error("Email already exists", res.statusCode));
    let newAdmin = new Admin({ first_name, last_name, email, password, phone });
    const hash = bcrypt.hashSync(password, 12);

    newAdmin.password = hash;
    newAdmin = await newAdmin.save();

    return res.json(success("Account created successfully", newAdmin, res.statusCode));
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

export const signIn = async (req, res) => {
  try {
    const isAdmin = await Admin.findOne({ email: req.body.email });
    if (!isAdmin) return res.status(404).json(error("User does not exist", res.statusCode));
    const passwordMatched = bcrypt.compareSync(req.body.password, isAdmin.password);
    if (!passwordMatched) return res.status(400).json(error("Password did not match", res.statusCode));
    const { email, first_name, last_name, phone, _id, role } = isAdmin;
    const token = jwt.sign({ _id, email }, process.env.SECRET_KEY, { expiresIn: "1days"});
    res.cookie("token", `Bearer ${token}`, { expires: new Date(new Date() + 64800000)});
    return res.header("authorization", `Bearer ${token}`).json(success("Login success", { token, user: { email, first_name, last_name, phone, _id }}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Please try again", res.statusCode));
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie("token").json("You have logged out");
  } catch (err) {
    return res.status(400).json(error(err.message, res.statusCode));
  }
}

// @desc Recover Password - Generates token and Sends password reset email
// @access Public
export const forgotPassword = async (req, res) => {
  try {
    let isAdmin = await Admin.findOne({ email: req.body.email });
    if (!isAdmin) return res.status(404).json(error(`We could not find any account with the email ${req.body.email}`));
    isAdmin.resetPasswordToken = jwt.sign({ _id: isAdmin._id, first_name: isAdmin.first_name }, process.env.SECRET_KEY, { expiresIn: "120m" });
    isAdmin.resetPasswordExpires = Date.now() + 3600000;

    isAdmin = await isAdmin.save();
    let link = `https://${req.headers.host}/api/v1/auth/reset/${isAdmin.resetPasswordToken}`
    const receiver = isAdmin.email;
    const sender = "onoja.matthew@ojirehprime.com";
    const subject = "Password change request\n";
    const message = `Hi ${isAdmin.first_name}. \n\n
    You sent a password reset request. Please click on the following link ${link} to reset your password. \n\n 
    If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }
    await sendEmail(data);
    return res.json(success("A password reset email was sent to you", {}, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Server Error. Please try again", res.statusCode));
  }
};


// @route POST api/auth/reset
// @desc Reset Password
// @access Public
export const resetPassword = async (req, res) => {
  try {
    let isAdmin = await Account.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: {$gt: Date.now()} });
    if (!isAdmin) return res.status(401).json(error("Invalid password reset token or token has expired", res.statusCode));
    const hash = bcrypt.hashSync(req.body.password, 12);
    isAdmin.password = hash;
    isAdmin.resetPasswordToken = undefined;
    isAdmin.resetPasswordExpires = undefined;
    const result = await isAdmin.save();
    if (!result) return res.status(400).json(error("Failed to update password. Try again", res.statusCode));
    const receiver = isAdmin.email;
    const sender = "no-reply@mail.com";
    const subject = "Password reset confirmation";
    const message = `Hi ${isAdmin.first_name} \n 
    This is a confirmation that the password for your account ${isAdmin.email} has just been changed.\n`;

    const data = {
      receiver,
      sender,
      subject,
      message
    }

    await sendEmail(data);
    return res.json(success("Your password has been changed successfully"))
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after some time", res.statusCode));
  }
};

export const fetchAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    if (!admins) return res.json(success("No records found", admins, res.statusCode));
    return res.json(success("Success", admins, res.statusCode));
  } catch (err) {
    console.log(err)
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}

export const fetchAdmin = async (req, res) => {
  try {
    const admins = await Admin.findById({ _id: req.params.adminId });
    if (!admins) return res.json(success("No records found", admins, res.statusCode));
    return res.json(success("Success", admins, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}

export const updateRole = async (req, res) => {
  try {
    let isExists = await Admin.findById({ _id: req.body.adminId });
    const role_data = await Role.findById({ _id: req.body.role });

    if (!isExists) return res.status(404).json(error("Admin account not found", res.statusCode));
    isExists.role.name = role_data.name;
    isExists.role.role_id = role_data._id;
    const result = isExists.save();
    return res.json(success("Role updated", result, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}

export const updateProfile = async (req, res) => {
  try {
    let admin = await Admin.findByIdAndUpdate({_id: req.params.adminId}, req.body);
    return res.json(success("Account deleted", admin, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const deletedAccount = await Admin.findByIdAndRemove({ _id: req.params.adminId });
    if (!deletedAccount) return res.status(404).json(error("Admin account not found", res.statusCode));
    return res.json(success("Account deleted", deletedAccount, res.statusCode));
  } catch (err) {
    return res.status(400).json(error("Internal Server Error. Try again after few minutes", res.statusCode));
  }
}
