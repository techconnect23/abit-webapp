import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import homeRouter from "./routes/home.js";
import linkedAuthRouter, {initPassport, createLinkedInStrategy} from "./routes/linkedinAuth.js";
import { connectToDB } from "./DbUtils/dbHandler.js";


const PORT = process.env.SERVER_PORT;

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



app.listen(PORT, () => {
  connectToDB()
  createLinkedInStrategy();
  console.log(`Server listening on port ${PORT}`);
});

