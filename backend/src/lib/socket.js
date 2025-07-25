import {Server} from "socket.io"
import http from "http"
import express from "express"

const app =express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "https://chat-app-eight-eosin-26.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
    }
})

export function getRecieverSocketId(userId){
    return userSocketMap[userId]
}

//store online users
const userSocketMap={};//{userId:socketId}

io.on("connection", (socket)=>{
    console.log("a socket connected", socket.id);
    const userId = socket.handshake.query.userId;

    if(userId) userSocketMap[userId]=socket.id;
    //show online users to everyone
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", ()=>{
        console.log("a socket disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

export { io, app, server};