import React, { useState } from "react";
import VideoList from "../components/VideoList";
import UploadModal from "../components/UploadModal";
import ErrorModal from "../components/ErrorModal";

const AppContainer = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Sample Video 1", url: "https://example.com/video1" },
    { id: 2, title: "Sample Video 2", url: "https://example.com/video2" },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [error, setError] = useState(""); // State for max limit error


  const addVideo = (link) => {
    if (videos.length >= 10) {
      setErrorModalOpen(true); // Open the error modal
      return;
    }

    const newVideo = { id: Date.now(), title: "New Video", url: link };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const handleDeleteVideo = (id) => {
    console.log("deleting video with id: ", id);
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    setError("");
    console.log("error cleared: ", error);
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
        onClick={() =>
          videos.length >= 10 ? setErrorModalOpen(true) : setModalOpen(true)
        }
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

      {/* Modals */}
      {isModalOpen && (
        <UploadModal
          onClose={() => setModalOpen(false)}
          onUpload={addVideo}
        />
      )}
      {isErrorModalOpen && (
        <ErrorModal
          onClose={() => setErrorModalOpen(false)}
          message="You have reached the maximum limit of 10 videos. Please delete a video to upload a new one."
        />
      )}
    </div>
  );
};

export default AppContainer;
