import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videos, onPin }) => {
  // Debugging: Check if onPin is received as a function
  console.log("onPin in VideoList:", typeof onPin);

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
          key={video.id}
          title={video.title}
          url={video.url}
          onPin={() => {
            if (typeof onPin === "function") {
              onPin(video);
            } else {
              console.error("onPin is not a function!");
            }
          }}
        />
      ))}
    </div>
  );
};

export default VideoList;
