const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const app = express();
var fs = require("file-system");
const fileName = "./resources/photo.jpg";
var bodyParser = require("body-parser");
const axios = require('axios');
var multer  = require('multer')
var upload = multer({ dest: 'resources/' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const WS_PORT  = 8888;
const HTTP_PORT = 8000;

const wsServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log(`WS Server is listening at ${WS_PORT}`));

let connectedClients = [];
// app.get('/connect',function(req,res)
// {
//  wsServer.on
// })
app.get('/livestream',function(req,res)
{
    
wsServer.on('connection', (ws, req)=>{
    console.log('Connected');
    connectedClients.push(ws);

    ws.on('message', data => {
        connectedClients.forEach((ws,i)=>{
            if(ws.readyState === ws.OPEN){
                ws.send(data);
            }else{
                connectedClients.splice(i ,1);
            }
        })
    });
});
res.send("Streaming......");
});
function capturePhoto()
{

}
app.get("/capture",function(request,response)
    {
        console.log("Photo is loading ....");
        // var capture = JSON.parse(req.body.body);
        // console.log(capture);
        // var status = capture.Statu
       axios.get("http://192.168.0.104:3000/captured",{})
       .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
      
});
app.post("/savedPhoto",function(req,res)
{
    var photoFile = fs.createWriteStream(fileName, { encoding: "utf8" });
    req.on("data", function(data) {
        photoFile.write(data);
    });

    req.on("end", async function() {
        photoFile.end();
        });
        const targetPath = path.join(__dirname, "./resources/photo.jpg");
            fs.createWriteStream(targetPath, err => {;
            });
         res.end();
    });
    app.get("/photo.jpg", (req, res) => {
        res.sendFile(path.join(__dirname, "./resources/photo.jpg"));
      });
      
    
app.get('/client',(req,res)=>res.sendFile(path.resolve(__dirname, './client.html')));
app.listen(HTTP_PORT, ()=> console.log(`HTTP server listening at ${HTTP_PORT}`));