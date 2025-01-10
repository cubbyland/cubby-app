import React, { useState } from "react";
import VideoList from "../components/videos/VideoList";
import UploadModal from "../components/modals/UploadModal";
import ErrorModal from "../components/modals/ErrorModal";
import Bio from "../components/profile/Bio";
import SocialLinks from "../components/profile/SocialLinks";
import HighlightReel from "../components/profile/highlight/HighlightReel";
import "../styles/highlight.css";
import "../styles/global.css";

const AppContainer = () => {
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    reddit: "",
    tiktok: "",
  });
  const [curationVideos, setCurationVideos] = useState([
    { id: 1, title: "Sample Video 1", url: "https://example.com/video1" },
    { id: 2, title: "Sample Video 2", url: "https://example.com/video2" },
    { id: 3, title: "Sample Video 3", url: "https://example.com/video3" },
  ]);
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

  const addCurationVideo = (data) => {
    if (curationVideos.length >= 10) {
      setErrorModalOpen(true);
      return;
    }
    const newVideo = { id: Date.now(), title: "New Video", url: data.url };
    setCurationVideos((prev) => [...prev, newVideo]);
  };

  const deleteCurationVideo = (id) => {
    console.log("Deleting Curation Video: ", id);
    setCurationVideos((prev) => {
      const updatedVideos = prev.filter((video) => video.id !== id);
      console.log("Updated Curation Videos: ", updatedVideos);
      return updatedVideos;
    });
  };
  

  const reorderCurationVideos = (reorderedVideos) => {
    setCurationVideos(reorderedVideos);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">My Cubby</h1>
      <Bio bio={bio} onBioChange={setBio} />
      <SocialLinks socialLinks={socialLinks} />

      <h2 className="section-title">Creations</h2>
      <HighlightReel />

      <h2 className="section-title">Curations</h2>
      <button
        onClick={() => setVideoModalOpen(true)}
        className="add-video-button"
      >
        Add Video
      </button>
      <VideoList
        videos={curationVideos}
        onDelete={deleteCurationVideo}
        onReorder={reorderCurationVideos}
        isSortable={true} // Curation videos are sortable
      />

      {isVideoModalOpen && (
        <UploadModal
          title="Upload Video Link"
          fields={[
            {
              name: "url",
              type: "text",
              placeholder: "Enter Video URL (x.com)",
              autoFocus: true,
            },
          ]}
          onSave={addCurationVideo}
          onClose={() => setVideoModalOpen(false)}
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
