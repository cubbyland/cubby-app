import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videos, onPin }) => {
  console.log("onPin in VideoList:", typeof onPin); // Debugging check

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
          key={video.id || video.title} // Use `id` as the unique key. Fallback to `title` if no id exists.
          title={video.title}
          url={video.url}
          onPin={() => 
            if (typeof onPin === "function") {
              onPin(video);
            } else {
              console.error("onPin is not a function!");
            }
          }
          onDelete={() => onDelete(video.id)} // New delete prop
        />
      ))}
    </div>
  );
};

export default VideoList;
