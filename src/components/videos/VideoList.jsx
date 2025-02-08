import React, { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableVideoCard from "./SortableVideoCard";
import VideoCard from "./VideoCard";
import "../../styles/videos.css";

const VideoList = ({ videos, onDelete, onReorder, isSortable = true, isLoading, hasActiveSearch }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let attempt = 0;
    const loadWidgets = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load();
      } else if (attempt < 3) {
        attempt++;
        setTimeout(loadWidgets, 500);
      }
    };
    
    loadWidgets();
  }, [videos]);

  useEffect(() => {
    if (window.twttr && !isLoading) {
      window.twttr.widgets.load();
    }
  }, [videos, isLoading]);

  if (loading) return <div>Loading posts...</div>;

  const handleDragEnd = (event) => {
    if (!isSortable) return;

    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = videos.findIndex((video) => video.id === active.id);
      const newIndex = videos.findIndex((video) => video.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedVideos = arrayMove(videos, oldIndex, newIndex);
        onReorder(updatedVideos);
      }
    }
  };

  console.log('Rendering videos:', videos);

  if (!hasActiveSearch) return null; // Render nothing when no hashtags

  return isLoading ? (
    <div className="loading">Loading posts...</div>
  ) : (
    <div className="video-list">
      {videos.map(video => (
        <div key={video.id} className="video-item">
          {video.isXPost && (
            <blockquote className="twitter-tweet">
              <a href={video.url}></a>
            </blockquote>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoList;
