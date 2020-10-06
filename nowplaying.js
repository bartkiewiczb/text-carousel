const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const port = 9050;
const url = require('url');
const fs = require('fs');

let nowPlayingSong = 'No music playing.'

app.use(express.static(path.join(__dirname, 'build')));

// url: http://localhost:3000/
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// all routes prefixed with /api
app.use('/api', router);

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  response.json({message: nowPlayingSong});
});

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

let nowPlayingWatch = fs.watch('./nowPlaying.txt');

function updateSong() {
  fs.readFile('./nowPlaying.txt', (err, data) => {
    let np = data.toString();
    if (np === "from ?") {
      nowPlayingSong = "No Music"
    } else if (np !== nowPlayingSong) {
      console.log('updating...')
      nowPlayingSong = np;
      console.log(nowPlayingSong);
    }
  });
}

updateSong();
nowPlayingWatch.on('change', () => updateSong());