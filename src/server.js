import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
// import Users from "./models/userModel.js"; // Create Table
import router from "./routes/server.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

try {
  await db.authenticate();
  console.log("Database Connected ...");
  // await Users.sync(); // Create Table
} catch (error) {
  console.error(error);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(router);

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT} ...`));
