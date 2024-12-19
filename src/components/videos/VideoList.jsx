import React from "react";
import VideoCard from "./VideoCard";
import "../../styles/videos.css"; // Updated to import the correct CSS file

const VideoList = ({ videos, onPin, onDelete }) => {
  console.log("onPin in VideoList:", typeof onPin); // Debugging output

  // Handler to pin a video
  const handlePin = (video) => {
    if (typeof onPin === "function") {
      onPin(video);
    } else {
      console.error("onPin is not a function!");
    }
  };

  // Handler to delete a video
  const handleDelete = (videoId) => {
    if (typeof onDelete === "function") {
      onDelete(videoId);
    } else {
      console.error("onDelete is not a function!");
    }
  };

  return (
    <div className="video-list-container">
      {videos.map((video) => (
        <VideoCard
          key={video.id} // `id` is used as the unique key
          title={video.title}
          url={video.url}
          description={video.description || "No description available"}
          onPin={() => handlePin(video)} // Pin handler
          onDelete={() => handleDelete(video.id)} // Delete handler
        />
      ))}
    </div>
  );
};

export default VideoList;
