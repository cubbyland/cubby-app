import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videos, onPin, onDelete }) => {
  console.log("onPin in VideoList:", typeof onPin); // Debugging output

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
      }}
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id || video.title} // Use `id` as the unique key
          title={video.title}
          url={video.url}
          description={video.description || "No description available"}
          onPin={() => {
            if (typeof onPin === "function") {
              onPin(video);
            } else {
              console.error("onPin is not a function!");
            }
          }}
          onDelete={() => {
            if (typeof onDelete === "function") {
              onDelete(video.id);
            } else {
              console.error("onDelete is not a function!");
            }
          }}
        />
      ))}
    </div>
  );
};

export default VideoList;
