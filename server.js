require('dotenv').config()
let db = require('./db')
let http = require('http')
let path = require('path')
let fs = require('fs')

let pathToIndex = path.join(__dirname, 'static', 'index.html')
let index = fs.readFileSync(pathToIndex, "utf-8")

let pathToStyle = path.join(__dirname, 'static', 'style.css')
let style = fs.readFileSync(pathToStyle, "utf-8")

let pathToScript = path.join(__dirname, 'static', 'script.js')
let script = fs.readFileSync(pathToScript, "utf-8")

http.createServer((req, res) => {
    switch(req.url){
        case "/":
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(index)
            break;
        case "/style.css":
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(style)
                break;
        case "/script.js":
                    res.writeHead(200, {'Content-Type': 'text/js'})
                    res.end(script)
                    break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end("<h1>404</h1>")

    }
}).listen(3000, () =>console.log('Меня звать Борат!'))