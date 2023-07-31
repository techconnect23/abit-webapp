import "dotenv/config";
import mongoose from "mongoose";


const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

console.log(COLLECTION_NAME);
const memSchema = new mongoose.Schema({
  fName:String,
  lName:String,
  email:String,
  city:String,
  company:String,
  profile:String
});

const Member = mongoose.model(COLLECTION_NAME, memSchema);

async function connectToDB() {
  await mongoose.connect(`${DB_URL}/${DB_NAME}`);
  console.log("DBUtils: Connected to DB");
}


function findOrCreate() {
  console.log("findOrCreate");
  // TODO: Check if user exists return profile else create new user before returning profile
}



export {connectToDB, findOrCreate};