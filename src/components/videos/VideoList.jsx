import React, { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableVideoCard from "./SortableVideoCard";
import VideoCard from "./VideoCard";
import "../../styles/videos.css";

const VideoList = ({ videos, isLoading, hasActiveSearch }) => {
  const [visible, setVisible] = useState(false);

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

  useEffect(() => {
    const shouldShow = hasActiveSearch && (isLoading || videos.length > 0);
    setVisible(shouldShow);
  }, [hasActiveSearch, isLoading, videos]);

  if (!hasActiveSearch) return null;

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

  return visible ? (
    <div className="video-list">
      {isLoading && <div className="loading">Loading posts...</div>}
      {!isLoading && videos.length > 0 ? (
        videos.map(video => (
          <div key={video.id} className="video-item">
            {video.isXPost && (
              <blockquote className="twitter-tweet">
                <a href={video.url}></a>
              </blockquote>
            )}
          </div>
        ))
      ) : (
        <div className="empty-state">
          <h3>No posts found</h3>
          <p>Try different hashtags or upload a new post</p>
        </div>
      )}
    </div>
  ) : null;
};

export default VideoList;
