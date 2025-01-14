import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableVideoCard from "./SortableVideoCard";
import VideoCard from "./VideoCard";
import "../../styles/videos.css";

const VideoList = ({ videos, onDelete, onReorder, isSortable = true }) => {
  const handleDragEnd = (event) => {
    if (!isSortable) return;

    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      console.log("Dragging Video: ", { activeId: active.id, overId: over.id });

      const oldIndex = videos.findIndex((video) => video.id === active.id);
      const newIndex = videos.findIndex((video) => video.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedVideos = arrayMove(videos, oldIndex, newIndex);
        console.log("Updated Video Order: ", updatedVideos);
        onReorder(updatedVideos); // Call the reorder function with the updated list
      }
    }
  };

  return (
    <div className="video-list-container">
      {isSortable ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={videos.map((video) => video.id)} strategy={rectSortingStrategy}>
            {videos.map((video) => (
              <SortableVideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                url={video.url}
                description={video.description || "No description available"}
                onDelete={() => {
                  console.log("Delete Triggered for Video ID (Sortable): ", video.id);
                  onDelete(video.id);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            url={video.url}
            description={video.description || "No description available"}
            onDelete={() => {
              console.log("Delete Triggered for Video ID (Non-Sortable): ", video.id);
              onDelete(video.id);
            }}
          />
        ))
      )}
    </div>
  );
};

export default VideoList;
