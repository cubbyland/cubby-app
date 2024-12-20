import React from "react";
import { DragDropContext, Droppable, Draggable } from "@atlaskit/pragmatic-drag-and-drop";
import VideoCard from "./VideoCard";
import "../../styles/videos.css";

const VideoList = ({ videos = [], onDelete = () => {}, onReorder = () => {} }) => {
  // Handler for drag-and-drop reordering
  const handleDragEnd = ({ sourceIndex, destinationIndex }) => {
    if (destinationIndex == null) return; // If dropped outside, do nothing

    const reorderedVideos = Array.from(videos);
    const [removed] = reorderedVideos.splice(sourceIndex, 1);
    reorderedVideos.splice(destinationIndex, 0, removed);

    if (typeof onReorder === "function") {
      onReorder(reorderedVideos);
    } else {
      console.error("onReorder is not a function!");
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable type="VIDEO" droppableId="video-list">
        {({ innerRef, droppableProps }) => (
          <div
            className="video-list-container"
            {...droppableProps}
            ref={innerRef}
          >
            {videos.map((video, index) => (
              <Draggable key={video.id} draggableId={String(video.id)} index={index}>
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <div
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                  >
                    <VideoCard
                      title={video.title}
                      url={video.url}
                      description={video.description || "No description available"}
                      onDelete={() => onDelete(video.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default VideoList;
