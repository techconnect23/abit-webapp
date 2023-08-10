import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import homeRouter from "./routes/home.js";
import linkedAuthRouter, {initPassport, createLinkedInStrategy} from "./routes/linkedinAuth.js";
import { connectToDB } from "./DbUtils/dbHandler.js";
import http from "http";

const PORT = process.env.SERVER_PORT_UNSECURE;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use( session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}));
app.use(initPassport);


app.use("/", homeRouter);
app.use("/", linkedAuthRouter);

http.createServer(app).listen(PORT, () => {
  connectToDB()
  createLinkedInStrategy();
  console.log(`Server listening on port ${PORT}`);
});

// Comment https related code, will be used at later stage

// import https from "https";
// import fs from "fs";

// const PORT_SECURE = process.env.SERVER_PORT_SECURE
// const options ={
//   key: fs.readFileSync(process.env.PRIVATE_KEY),
//   cert: fs.readFileSync(process.env.PUBLIC_KEY),
//   passphrase: process.env.PASSPHRASE
// };

// https.createServer(options, app).listen(PORT_SECURE, () => {
//   connectToDB()
//   createLinkedInStrategy();
//   console.log(`Server listening on port ${PORT_SECURE}`);
// });