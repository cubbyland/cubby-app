import React, { useEffect, useRef } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import VideoCard from "./VideoCard";
import "../../styles/videos.css";

// Utility function to reorder the list based on drag and drop
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const VideoList = ({ videos = [], onDelete = () => {}, onReorder = () => {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.error("Container element not found.");
      return;
    }

    // Initialize draggable elements
    const cleanupDraggables = videos
      .map((video, index) => {
        const element = container.querySelector(`[data-video-id="${video.id}"]`);
        if (!element) {
          console.error(`Element not found for video ID: ${video.id}`);
          return null;
        }

        return draggable({
          element,
          getInitialData: () => ({ id: video.id, index }),
        });
      })
      .filter(Boolean);

    // Initialize drop target
    const cleanupDropTarget = dropTargetForElements({
      element: container,
      onDragOver: (event) => {
        // Required to allow dropping
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"; // Set drop effect
      },
      onDrop: ({ source, destination }) => {
        // Debug source and destination
        console.log("Source:", source);
        console.log("Destination:", destination);

        // Validate source and destination
        if (!source || !destination) {
          console.error("Invalid drop event. Source or destination missing.");
          return;
        }

        const sourceIndex = source?.data?.index;
        const destinationIndex = destination?.index;

        if (
          typeof sourceIndex !== "number" ||
          typeof destinationIndex !== "number"
        ) {
          console.warn(
            "Invalid indices for drop event. Source index:",
            sourceIndex,
            "Destination index:",
            destinationIndex
          );
          return;
        }

        // Prevent reordering if indices are the same
        if (sourceIndex === destinationIndex) {
          console.warn("No reordering necessary. Source and destination are the same.");
          return;
        }

        // Perform reordering
        const reorderedVideos = reorder(videos, sourceIndex, destinationIndex);

        // Notify parent about the new order
        if (typeof onReorder === "function") {
          onReorder(reorderedVideos);
        } else {
          console.error("onReorder is not a valid function.");
        }
      },
    });

    // Clean up on unmount or when videos change
    return () => {
      cleanupDraggables.forEach((cleanup) => cleanup && cleanup());
      cleanupDropTarget();
    };
  }, [videos, onReorder]);

  return (
    <div
      ref={containerRef}
      className="video-list-container"
      onDragOver={(event) => {
        event.preventDefault(); // Prevent default to allow dropping
        event.dataTransfer.dropEffect = "move"; // Ensure correct cursor feedback
      }}
    >
      {videos.map((video) => (
        <div
          key={video.id}
          data-video-id={video.id}
          className="video-card-container"
        >
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
