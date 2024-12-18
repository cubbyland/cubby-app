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
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Title */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>My Cubby Videos</h1>

      {/* Add Video Button */}
      <button
        onClick={() => setModalOpen(true)} // Opens the modal
        style={{
          margin: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          borderRadius: "5px",
        }}
      >
        Add Video
      </button>

      {/* Video List */}
      <VideoList videos={videos} onPin={handlePin} />

      {/* Upload Modal */}
      {isModalOpen && (
        <UploadModal
          onClose={() => setModalOpen(false)}
          onAdd={addVideo}
        />
      )}
    </div>
  );
};

export default AppContainer;
