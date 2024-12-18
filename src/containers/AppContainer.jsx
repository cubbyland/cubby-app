import React, { useState } from "react";
import UploadModal from "../components/UploadModal";
import VideoList from "../components/VideoList";

const AppContainer = ({ children }) => {
  return <div className="app-container">{children}</div>;
};

const App = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Sample Video 1", link: "https://example.com/video1" },
    { id: 2, title: "Sample Video 2", link: "https://example.com/video2" },
    { id: 3, title: "New Video 3", link: "https://example.com/video3" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addVideo = (newVideo) => {
    setVideos([...videos, newVideo]);
    setIsModalOpen(false); // Close the modal after adding
  };

  return (
    <AppContainer>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>My Cubby Videos</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Add Video
        </button>
      </div>

      <VideoList videos={videos} />

      {isModalOpen && (
        <UploadModal
          onClose={() => setIsModalOpen(false)}
          onUpload={addVideo}
        />
      )}
    </AppContainer>
  );
};

export default App;