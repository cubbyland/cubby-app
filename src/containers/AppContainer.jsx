import React, { useState } from "react";
import VideoList from "../components/VideoList";
import UploadModal from "../components/UploadModal";

const AppContainer = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Sample Video 1", url: "https://example.com/video1" },
    { id: 2, title: "Sample Video 2", url: "https://example.com/video2" },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(""); // State for max limit error

  const addVideo = (link) => {
    if (videos.length >= 10) {
      setError("You can only upload up to 10 videos.");
      return;
    }

    const newVideo = { id: Date.now(), title: "New Video", url: link };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
    setError(""); // Clear any existing error
  };

  const handleDeleteVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    setError(""); // Clear error when a video is deleted
  };

  const handlePin = (pinnedVideo) => {
    // Move the pinned video to the front of the list
    setVideos((prevVideos) => [
      pinnedVideo,
      ...prevVideos.filter((video) => video.id !== pinnedVideo.id),
    ]);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Title */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>My Cubby Videos</h1>

      {/* Add Video Button */}
      <button
        onClick={() => setModalOpen(true)}
        disabled={videos.length >= 10} // Disable button if max limit is reached
        style={{
          margin: "20px",
          padding: "10px 20px",
          backgroundColor: videos.length >= 10 ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          cursor: videos.length >= 10 ? "not-allowed" : "pointer",
          fontSize: "16px",
          borderRadius: "5px",
        }}
      >
        Add Video
      </button>

      {/* Error Message */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      {/* Video List */}
      <VideoList videos={videos} onPin={handlePin} onDelete={handleDeleteVideo} />

      {/* Upload Modal */}
      {isModalOpen && (
        <UploadModal
          onClose={() => setModalOpen(false)}
          onUpload={addVideo}
          isMaxVideos={videos.length >= 10} // New prop to check video limit
        />
      )}
    </div>
  );
};

export default AppContainer;
