import React, { useEffect, useRef } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import VideoCard from "./VideoCard";
import "../../styles/videos.css";

// Utility function to reorder the list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const VideoList = ({ videos, onDelete, onReorder }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      console.error("Container not found.");
      return;
    }

    const draggables = Array.from(container.children).map((element, index) =>
      draggable({
        element,
        getInitialData: () => ({
          id: videos[index].id,
          index,
        }),
      })
    );

    const dropTarget = dropTargetForElements({
      element: container,
      onDragOver: (event) => {
        event.preventDefault();
      },
      onDrop: (event) => {
        const { source, location } = event;
        if (!source || !location) return;

        const sourceIndex = source.data.index;
        const destinationIndex = Array.from(container.children).indexOf(location.element);

        if (sourceIndex !== destinationIndex && destinationIndex >= 0) {
          const reorderedVideos = reorder(videos, sourceIndex, destinationIndex);
          onReorder(reorderedVideos); // Notify the parent about the new order
        }
      },
    });

    return () => {
      draggables.forEach((cleanup) => cleanup && cleanup());
      dropTarget();
    };
  }, [videos, onReorder]);

  return (
    <div ref={containerRef} className="video-list-container">
      {videos.map((video, index) => (
        <div key={video.id} data-index={index}>
          <VideoCard
            title={video.title}
            url={video.url}
            description={video.description || "No description available"}
            onDelete={() => onDelete(video.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoList;
