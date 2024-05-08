const exp = require("constants")
const exps = require("express")()
const https = require("http").Server(exps)
let sock = require("socket.io")(https)
let paths = require("path")

let user = 0
exps.get("/", function (req, res) {
    let opt = {
        root: paths.join(__dirname)
    }
    let file = "copy.html"
    res.sendFile(file, opt)
})

sock.on("connection", function (socket) {
    user += 1
    console.log("Hello user...")
    sock.sockets.emit("pins", { paper: user })
    socket.on("disconnect", function () {
        console.log("ok bye babe..")
    })

})

https.listen(3000)