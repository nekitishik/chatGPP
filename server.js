require('dotenv').config()
let db = require('./db')
let http = require('http')
let path = require('path')
let fs = require('fs')
let { Server } = require('socket.io')

let pathToIndex = path.join(__dirname, 'static', 'index.html')
let index = fs.readFileSync(pathToIndex, "utf-8")

let pathToStyle = path.join(__dirname, 'static', 'style.css')
let style = fs.readFileSync(pathToStyle, "utf-8")

let pathToScript = path.join(__dirname, 'static', 'script.js')
let script = fs.readFileSync(pathToScript, "utf-8")

let pathToRegister = path.join(__dirname, 'static', 'register.html')
let register = fs.readFileSync(pathToRegister, "utf-8")

let pathToAuth = path.join(__dirname, 'static', 'auth.js')
let auth = fs.readFileSync(pathToAuth, "utf-8")

let ser = http.createServer((req, res) => {
    switch (req.url) {
        case "/":
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(index)
            break;
        case "/style.css":
            res.writeHead(200, { 'Content-Type': 'text/css' })
            res.end(style)
            break;
        case "/register":
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(register)
            break;
        case "/auth.js":
            res.writeHead(200, { 'Content-Type': 'text/js' })
            res.end(auth)
            break;
        case "/script.js":
            res.writeHead(200, { 'Content-Type': 'text/js' })
            res.end(script)
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end("<h1>404</h1>")

    }
}).listen(3000, () => console.log('Меня звать Борат!'))

let io = new Server(ser);

let messages = []

io.on("connection", async function(socket) {
    console.log(socket.id)
    let messages = await db.getMessages();
        messages = messages.map(m=>({name: m.login, text: m.content}))
        io.emit("update", JSON.stringify(messages))
    socket.on("message",async (data) => {
        data = JSON.parse(data)
        await db.addMessage(data.text, 2)
        let messages = await db.getMessages();
        messages = messages.map(m=>({name: m.login, text: m.content}))
        io.emit("update", JSON.stringify(messages))
    })
})

// db.getUsers().then(res=>console.log(res)).catch(err=>console.log(err))

// db.getMessages().then(res=>console.log(res)).catch(err=>console.log(err.message))

// db.addMessage("hello", 2).then(res=>console.log(res)).catch(err=>console.log(err))
