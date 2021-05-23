module.exports = socket => {
    socket.on("user-in", data => {
        socket.join(data.user)
        console.log(socket.id, socket.rooms)
    })

    socket.on("friend-req",  data => {
        socket.join(data.toUser)
        console.log(socket.rooms)
        io.in(data.toUser).emit("notify", {
            message: "Nueva solicitud de amistad!!!"
        })
    })
    console.log("new user connected")
    
}