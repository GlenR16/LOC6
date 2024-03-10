import React, { useEffect, useState } from 'react';
import * as cv from 'opencv.js';
import Plotly from 'plotly.js';
import Stats from 'stats.js';

const VideoProcessingComponent = () => {
  const [stream, setStream] = useState(null);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [streaming, setStreaming] = useState(false);

  let stats, video, canvasOutput, faceClassifier, eyeClassifier;
  let totalPlay = 0,
    totalPause = 0,
    accuracy,
    totalTimesTabSwitched = 0;
  let sampling = true;
  let counter = 0;

  useEffect(() => {
    const initializeVideoStream = async () => {
      if (streaming) return;

      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setStream(s);

        video.srcObject = s;
        video.play();

        video.addEventListener('canplay', () => {
          if (!streaming) {
            setVideoWidth(video.videoWidth);
            setVideoHeight(video.videoHeight);
            video.setAttribute('width', videoWidth);
            video.setAttribute('height', videoHeight);
            canvasOutput.width = videoWidth;
            canvasOutput.height = videoHeight;
            setStreaming(true);
          }
          startVideoProcessing();
        });
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initializeVideoStream();

    return () => {
      stopVideoProcessing();
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [streaming, videoWidth, videoHeight]);

  const startVideoProcessing = () => {
    if (!streaming) {
      console.warn('Please startup your webcam');
      return;
    }
    stopVideoProcessing();

    // Other initialization code...

    requestAnimationFrame(processVideo);
  };

  const stopVideoProcessing = () => {
    // Your existing code for stopping video processing
    // ...

    if (video) {
      video.pause();
      video.srcObject = null;
    }

    if (canvasOutput) {
      const ctx = canvasOutput.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, videoWidth, videoHeight);
      }
    }
  };

  const processVideo = () => {
    // Your existing code for processing video frames
    // ...

    requestAnimationFrame(processVideo);
  };

  // Other event handlers and functions

  return (
    <div>
      {/* Render your video component and other UI elements */}
      {streaming && (
        <video
          playsInline
          autoPlay
          style={{ width: '100%' }}
          ref={(videoRef) => {
            video = videoRef;
          }}
        />
      )}
      <canvas id="canvasOutput" />
      {/* Include other UI elements as needed */}
    </div>
  );
};

export default VideoProcessingComponent;
