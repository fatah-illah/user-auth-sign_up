import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
  return passwordRegex.test(password);
};

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) return res.status(400).json({ message: "Password and confirm password do not match" });

  if (!validatePassword(password)) {
    return res.status(400).json({
      message: "Password must contain at least one lowercase character, one uppercase character, one digit character, one special character, and be at least 8 characters long",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) return res.status(409).json({ error: "Email already registered" });

    await Users.create({
      name,
      email,
      password: hashPassword,
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Enrollment Notice",
      text: `Halo ${name}, thank you for registering on our app!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "Register Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
