const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require('path');
const port = 9050;
const fs = require('fs');

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let interval, data, socket, nowPlayingSong;

io.on("connection", (oSocket) => {
  socket = oSocket;
  console.log("New client connected");
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.removeAllListeners();
  });

  updateSong();
  updateData();
});

server.listen(port, () => console.log(`Listening on port ${port}`));

let nowPlayingWatch = fs.watch('./nowPlaying.txt');
let dataFile = fs.watch('./data.json');

dataFile.on('change', () => updateData());
nowPlayingWatch.on('change', () => updateSong());

function updateData() {
  fs.readFile('./data.json', { 'encoding': 'utf-8' }, (err, oData) => {
      data = JSON.parse(JSON.stringify(oData));
      console.log(data);
      if (socket) socket.emit("DATAUPDATE", data);
  });
}

function updateSong() {
  fs.readFile('./nowPlaying.txt', (err, data) => {
    let np = data.toString();

    if (np === "from ?") {
      nowPlayingSong = "No Music"
    } else if (np !== nowPlayingSong) {
      console.log('updating...')
      nowPlayingSong = np;
    }

    console.log(nowPlayingSong);
    if (socket) {
      socket.emit("NEWSONG", nowPlayingSong);
    }
  });
}