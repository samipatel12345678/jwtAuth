import mongoose from"mongoose";
import dotenv from"dotenv";
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB connnected"))
.catch((err) =>console.error("MongoDb error:",err));
