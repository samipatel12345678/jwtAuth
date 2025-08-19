import express from "express";
import dotenv from "dotenv";
import cookieParser from"cookie-parser";
import cors from "cors";
import "./src/db.js";
import authRoutes from "./src/routes/auth.routes.js";


dotenv.config();
const app=express();



//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use(cors({
origin:process.env.CLIENT_ORIGIN,

credentials:true
}));

app.get('/',(req,res)=>{

    res.json({ok:true , message:"Sever running!"});

});


app.listen(process.env.PORT|| 4000,()=>
    console.log("Server is running on http://localhost:4000")
);
