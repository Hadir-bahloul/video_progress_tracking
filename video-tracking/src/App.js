// src/App.js
import React from 'react';
import VideoPlayer from './VideoPlayer';

function App() {
  return (
    <div className="App">
      <h1>Video Tracking Example</h1>
      <VideoPlayer videoId="12345" />
    </div>
  );
}

export default App;
