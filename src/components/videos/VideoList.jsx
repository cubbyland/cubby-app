import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableVideoCard from "./SortableVideoCard";
import "../../styles/videos.css";

const VideoList = ({ videos, onDelete, onReorder }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = videos.findIndex((video) => video.id === active.id);
      const newIndex = videos.findIndex((video) => video.id === over.id);

      const updatedVideos = arrayMove(videos, oldIndex, newIndex);
      onReorder(updatedVideos);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={videos.map((video) => video.id)} strategy={rectSortingStrategy}>
        <div className="video-list-container">
          {videos.map((video) => (
            <SortableVideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              url={video.url}
              description={video.description || "No description available"}
              onDelete={() => onDelete(video.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default VideoList;
