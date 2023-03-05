import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const hostEmail = process.env.HOST_EMAIL;
const portEmail = process.env.PORT_EMAIL;
const secuEmail = process.env.SECU_EMAIL;
const userEmail = process.env.USER_EMAIL;
const passEmail = process.env.PASS_EMAIL;

const transporter = nodemailer.createTransport({
  host: hostEmail,
  port: portEmail,
  secure: secuEmail,
  auth: {
    user: userEmail,
    pass: passEmail,
  },
});

module.exports = transporter;
