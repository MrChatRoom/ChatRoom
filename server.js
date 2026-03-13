const express=require("express")
const http=require("http")
const WebSocket=require("ws")

const app=express()
app.use(express.static("public"))

const server=http.createServer(app)
const wss=new WebSocket.Server({server})

let clients=[]

wss.on("connection",ws=>{
clients.push(ws)

ws.on("message",msg=>{
clients.forEach(c=>{
if(c.readyState===WebSocket.OPEN){
c.send(msg.toString())
}
})
})

ws.on("close",()=>{
clients=clients.filter(c=>c!==ws)
})
})

server.listen(3000)