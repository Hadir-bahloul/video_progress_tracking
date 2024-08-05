// src/VideoPlayer.js
import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [percentageWatched, setPercentageWatched] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = () => {
      if (startTime === null) {
        setStartTime(Date.now());
      }
    };

    const handlePause = () => {
      if (startTime !== null) {
        const newTimeSpent = (Date.now() - startTime) / 1000;
        setTimeSpent(prevTimeSpent => prevTimeSpent + newTimeSpent);
        setStartTime(null);
        calculatePercentageWatched(); // Calculate percentage on pause
      }
    };

    const handleEnded = () => {
      if (startTime !== null) {
        const newTimeSpent = (Date.now() - startTime) / 1000;
        setTimeSpent(prevTimeSpent => prevTimeSpent + newTimeSpent);
        setStartTime(null);
      }
      calculatePercentageWatched(); // Calculate percentage on end
      markVideoAsCompleted(); // Optionally send data to the server
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(videoElement.duration);
    };

    const calculatePercentageWatched = () => {
      if (videoDuration > 0) {
        const newPercentage = (timeSpent / videoDuration) * 100;
        setPercentageWatched(Math.min(newPercentage, 100)); // Ensure percentage does not exceed 100%
      }
    };

    const markVideoAsCompleted = async () => {
      calculatePercentageWatched(); // Ensure percentage is calculated before sending
      try {
        await fetch('/api/mark-completed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoId,
            timeSpent,
            videoDuration,
            percentageWatched,
          }),
        });
      } catch (error) {
        console.error('Error marking video as completed:', error);
      }
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoId, timeSpent, startTime, videoDuration]);

  // Log percentageWatched value whenever it changes
  useEffect(() => {
    console.log(`Percentage Watched: ${percentageWatched.toFixed(2)}%`);
  }, [percentageWatched]); // Dependency array includes percentageWatched

  return (
    <div>
      <video
        ref={videoRef}
        width="600"
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div>
        <p>Percentage Watched: {percentageWatched.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
