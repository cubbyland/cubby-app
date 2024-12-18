import React, { useState } from "react";
import VideoList from "../components/VideoList";
import UploadModal from "../components/UploadModal";

const AppContainer = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Sample Video 1", url: "https://example.com/video1" },
    { id: 2, title: "Sample Video 2", url: "https://example.com/video2" },
  ]);
  const [isModalOpen, setModalOpen] = useState(false); // <-- FIX: Add this state
  const [pinnedVideos, setPinnedVideos] = useState([]); // State for pinned videos

  const addVideo = (link) => {
    const newVideo = { id: Date.now(), title: "New Video", url: link };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };  

  const handleDeleteVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
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
      <VideoList videos={videos} onPin={handlePin} onDelete={handleDeleteVideo} />

      {/* Upload Modal */}
      {isModalOpen && (
        <UploadModal
          onClose={() => setModalOpen(false)}
          onUpload={addVideo}
        />
      )}
    </div>
  );
};

export default AppContainer;
