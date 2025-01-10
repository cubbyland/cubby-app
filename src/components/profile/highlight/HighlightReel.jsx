import React, { useState } from "react";
import VideoList from "../../videos/VideoList";
import UploadModal from "../../modals/UploadModal";
import "../../../styles/highlight.css";

const HighlightReel = () => {
  const [highlightVideos, setHighlightVideos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const addHighlightVideo = (data) => {
    const newVideo = {
      id: Date.now(),
      title: "Highlight Video",
      description: "No description available",
      url: data.url,
    };
    setHighlightVideos((prev) => [...prev, newVideo]);
  };

  const deleteHighlightVideo = (id) => {
    console.log("Deleting Highlight Video: ", id);
    setHighlightVideos((prev) => {
      const updatedVideos = prev.filter((video) => video.id !== id);
      console.log("Updated Highlight Videos: ", updatedVideos);
      return updatedVideos;
    });
  };
  

  const reorderHighlightVideos = (reorderedVideos) => {
    setHighlightVideos(reorderedVideos);
  };

  return (
    <div className="highlight-reel">
      <button className="add-video-button" onClick={() => setModalOpen(true)}>
        Add Video
      </button>
      <VideoList
        videos={highlightVideos}
        onDelete={deleteHighlightVideo}
        onReorder={reorderHighlightVideos}
        isSortable={false} // Highlights are non-sortable
      />

      {isModalOpen && (
        <UploadModal
          title="Upload Highlight Video"
          fields={[
            {
              name: "url",
              type: "text",
              placeholder: "Enter Highlight Video URL",
              autoFocus: true,
            },
          ]}
          onSave={addHighlightVideo}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HighlightReel;
