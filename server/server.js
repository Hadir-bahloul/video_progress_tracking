// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Make sure to include this
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

app.post('/api/mark-completed', (req, res) => {
  const { videoId, timeSpent, videoDuration, percentageWatched } = req.body;
  console.log(`Video ID: ${videoId}, Time Spent: ${timeSpent} seconds, Duration: ${videoDuration} seconds, Percentage Watched: ${percentageWatched.toFixed(2)}%`);
  // Here you would save to a database or handle the data as needed
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
