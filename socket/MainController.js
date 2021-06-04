const { userIn } = require("../main")

module.exports = socket => {
    console.log("connected user", userIn)
    socket.on("user-in", data => {
        console.log("user in", data, userIn)
        socket.join(data.user)
    })

    socket.on("friend-req",  data => {
        socket.join(data.toUser)
        io.in(data.toUser).emit("notify", {
            message: "Nueva solicitud de amistad!!!"
        })
    })

    socket.on('logout', payload => {
        console.log("LOGOUT")
        require("../main").userOut()
    })
    
}