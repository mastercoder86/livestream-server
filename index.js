const {Server, Socket} = require ('socket.io');
const io = new Server(8000,{
    cors: true,
});
const socketIdToEmail = new Map();
const emailToSocketId = new Map();
io.on('connection',(socket)=>{
    console.log("Socket connected",socket.id);

    socket.on("room:join",(data)=>{
        const {email,room} = data;
        socketIdToEmail.set(socket.id, email);
        emailToSocketId.set(email,socket.id);
        io.to(room).emit("room:joined",{email,id:socket.id});
        socket.join(room);
        io.to(socket.id).emit("room:join",data);
    })
    
})