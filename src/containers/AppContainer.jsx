import React, { useState } from "react";
import VideoList from "../components/videos/VideoList";
import UploadModal from "../components/modals/UploadModal";
import ErrorModal from "../components/modals/ErrorModal";
import Bio from "../components/profile/Bio";
import SocialLinks from "../components/profile/SocialLinks";
import "../styles/global.css";

const AppContainer = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Sample Video 1", url: "https://example.com/video1" },
    { id: 2, title: "Sample Video 2", url: "https://example.com/video2" },
    { id: 3, title: "Sample Video 3", url: "https://example.com/video3" },
    { id: 4, title: "Sample Video 4", url: "https://example.com/video4" },
    { id: 5, title: "Sample Video 5", url: "https://example.com/video5" },
    { id: 6, title: "Sample Video 6", url: "https://example.com/video6" },
    { id: 7, title: "Sample Video 7", url: "https://example.com/video7" },
    { id: 8, title: "Sample Video 8", url: "https://example.com/video8" },
    { id: 9, title: "Sample Video 9", url: "https://example.com/video9" },
  ]);
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    reddit: "",
    tiktok: "",
  });
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [isSocialLinkModalOpen, setSocialLinkModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState(null);

  // Add a new video
  const addVideo = (data) => {
    const { url } = data;
    if (videos.length >= 10) {
      setErrorModalOpen(true);
      return;
    }
    const newVideo = { id: Date.now(), title: "New Video", url };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  // Delete a video
  const handleDeleteVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  // Reorder videos after drag and drop
  const reorderVideos = (newOrder) => {
    setVideos(newOrder);
  };

  // Update social link for a platform
  const updateSocialLink = (data) => {
    const { platform, url } = data;
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: url,
    }));
    setSocialLinkModalOpen(false);
    setEditingPlatform(null);
  };

  // Open modal for editing a specific social link
  const editSocialLink = (platform) => {
    setEditingPlatform(platform);
    setSocialLinkModalOpen(true);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">My Cubby Videos</h1>

      {/* Bio Section */}
      <Bio bio={bio} onBioChange={setBio} />

      {/* Social Links Section */}
      <SocialLinks
        socialLinks={socialLinks}
        onEditSocialLink={editSocialLink}
      />

      {/* Add Video Button */}
      <button
        onClick={() => setVideoModalOpen(true)}
        className="add-video-button"
      >
        Add Video
      </button>

      {/* Video List */}
      <VideoList
        videos={videos}
        onDelete={handleDeleteVideo}
        onReorder={reorderVideos}
      />

      {/* Modals */}
      {isVideoModalOpen && (
        <UploadModal
          title="Upload Video Link"
          fields={[
            { name: "url", type: "text", placeholder: "Enter Video URL (x.com)", autoFocus: true },
          ]}
          onSave={addVideo}
          onClose={() => setVideoModalOpen(false)}
        />
      )}
      {isSocialLinkModalOpen && (
        <UploadModal
          title={`Edit ${editingPlatform} Link`}
          fields={[
            {
              name: "url",
              type: "text",
              placeholder: `Enter your ${editingPlatform} URL`,
              autoFocus: true,
            },
          ]}
          initialData={{ url: socialLinks[editingPlatform] }}
          onSave={(data) =>
            updateSocialLink({ platform: editingPlatform, ...data })
          }
          onClose={() => setSocialLinkModalOpen(false)}
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
