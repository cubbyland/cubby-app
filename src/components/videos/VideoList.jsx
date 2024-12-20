import React, { useEffect, useRef } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import VideoCard from "./VideoCard";
import "../../styles/videos.css";

// Custom reorder function
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
    if (!container) return;

    const cleanupDraggables = videos.map((video, index) => {
      const element = container.querySelector(`[data-video-id="${video.id}"]`);
      if (!element) return null;

      return draggable({
        element,
        getInitialData: () => ({ id: video.id, index }),
      });
    }).filter(Boolean);

    const cleanupDropTarget = dropTargetForElements({
      element: container,
      onDrop: ({ source, destination }) => {
        if (!destination) return;

        const reorderedVideos = reorder(videos, source.data.index, destination.index);
        onReorder(reorderedVideos);
      },
    });

    return () => {
      cleanupDraggables.forEach(cleanup => cleanup && cleanup());
      cleanupDropTarget();
    };
  }, [videos, onReorder]);

  return (
    <div ref={containerRef} className="video-list-container">
      {videos.map((video) => (
        <div key={video.id} data-video-id={video.id} className="video-card-container">
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
