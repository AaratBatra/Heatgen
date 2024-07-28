import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Request, Response } from "express";
const PORT = process.env.PORT || 5000;
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import {Server} from "socket.io"
import { io as ClientSocketIO } from "socket.io-client";
import { aggregateData } from "./utils";

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(bodyParser.json({limit: '1mb'}));


const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
    }
});

interface AggregateData {
    x: number;
    y: number;
    value: number;
}
const Tdata: AggregateData[] = [];

const flaskSocket = ClientSocketIO('http://localhost:5001');

flaskSocket.on('connect', () => {
    console.log('Connected to Flask server');
});

flaskSocket.on('analytics', (data) => {
    // now send this to next js via web sockets
    console.log("from flask: ", data)
    io.emit('analytics_from_node', data);
});

io.on('connection', (socket) => {
    console.log("user connected");
    socket.on('disconnect', () => {
        console.log("user disconnected");
    });
    socket.on('heat', (data: AggregateData[]) => {
        if (data) {
            //if (data.length !== 0) console.log(data.length)
            Tdata.push(...data)
            //console.log(Tdata.length)
            const data_to_send = aggregateData(Tdata)
            console.log(data_to_send?.length)
            if (data_to_send && data_to_send !== undefined) {
                io.emit('heat', data_to_send)
                flaskSocket.emit('heat', data_to_send);
            }
        }
    });
});

setInterval(() => {
    if (Tdata.length > 0) {
      const aggregatedData = aggregateData(Tdata);
      io.emit("heat", aggregatedData);
      Tdata.splice(0, Tdata.length);
      console.log("Data array cleared");
    }
  }, 60000);


app.get("/reset", (req: Request, res: Response)=>{
    Tdata.splice(0)
    res.json({message: "reset successful"})
})

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
