// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import { connectDb } from "./lib/db.js";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";

import dotenv from 'dotenv';
import express from 'express';
import cors from "cors"
import authRoutes from './routes/auth.route.js';
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import {connectDb} from "./lib/db.js"
import { app, server } from './lib/socket.js';
import path from "path"

dotenv.config()

const port = process.env.PORT;
//------------------------------------
const __dirname = path.resolve();



app.use(express.json({limit:"10mb"}));
app.use(cors({
    // origin:process.env.CLIENT_URL || "https://sturdy-couscous-445967xppjg3766x-5173.app.github.dev/",
    origin:"https://sturdy-couscous-445967xppjg3766x-5173.app.github.dev",
    credentials:true,
}))
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}



server.listen(port, () => {
    console.log(`Server is running on port:`+port);
    connectDb();
})