import React, { useState } from "react";
import VideoList from "../components/videos/VideoList";
import UploadModal from "../components/modals/UploadModal";
import ErrorModal from "../components/modals/ErrorModal";
import Bio from "../components/profile/Bio"; // Importing Bio component
import SocialLinks from "../components/profile/SocialLinks"; // Importing SocialLinks component
import "../styles/global.css";

const AppContainer = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Sample Video 1", url: "https://example.com/video1" },
    { id: 2, title: "Sample Video 2", url: "https://example.com/video2" },
  ]);
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    reddit: "",
    tiktok: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

  // Function to add a video, with validation for the maximum limit
  const addVideo = (link) => {
    if (videos.length >= 10) {
      setErrorModalOpen(true);
      return;
    }
    const newVideo = { id: Date.now(), title: "New Video", url: link };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  // Function to delete a video by ID
  const handleDeleteVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  // Function to pin a video by bringing it to the top of the list
  const handlePin = (pinnedVideo) => {
    setVideos((prevVideos) => [
      pinnedVideo,
      ...prevVideos.filter((video) => video.id !== pinnedVideo.id),
    ]);
  };

  // Function to handle changes in social links
  const handleSocialLinkChange = (platform, url) => {
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: url,
    }));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">My Cubby Videos</h1>

      {/* Bio Section */}
      <Bio bio={bio} onBioChange={setBio} />

      {/* Social Links Section */}
      <SocialLinks
        socialLinks={socialLinks}
        onSocialLinkChange={handleSocialLinkChange}
      />

      <button
        onClick={() =>
          videos.length >= 10 ? setErrorModalOpen(true) : setModalOpen(true)
        }
        className="add-video-button"
      >
        Add Video
      </button>

      <VideoList videos={videos} onPin={handlePin} onDelete={handleDeleteVideo} />

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
