import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import VideoCard from "./VideoCard";
import "../../styles/videos.css"; // Updated to import the correct CSS file

const VideoList = ({ videos, onDelete, onReorder }) => {
  // Handler for drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const reorderedVideos = Array.from(videos);
    const [removed] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, removed);

    if (typeof onReorder === "function") {
      onReorder(reorderedVideos);
    } else {
      console.error("onReorder is not a function!");
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="video-list">
        {(provided) => (
          <div
            className="video-list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {videos.map((video, index) => (
              <Draggable key={video.id} draggableId={String(video.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <VideoCard
                      key={video.id}
                      title={video.title}
                      url={video.url}
                      description={video.description || "No description available"}
                      onDelete={() => onDelete(video.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default VideoList;