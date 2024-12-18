import React, { useState } from "react";
import VideoList from "../components/VideoList";

const AppContainer = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Sample Video 1", url: "https://example.com/video1" },
    { id: 2, title: "Sample Video 2", url: "https://example.com/video2" },
    { id: 3, title: "New Video 3", url: "https://example.com/video3" },
  ]);

  // Handle pinning logic
  const handlePin = (pinnedVideo) => {
    // Move the pinned video to the start of the array
    setVideos((prevVideos) => {
      const updatedVideos = prevVideos.filter((video) => video.id !== pinnedVideo.id);
      return [pinnedVideo, ...updatedVideos];
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>My Cubby Videos</h1>
      {/* Video List with pinning functionality */}
      <VideoList videos={videos} onPin={handlePin} />
    </div>
  );
};

export default AppContainer;
