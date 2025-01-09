import React, { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { arrayMoveItem } from '@dnd-kit/utilities';
import { DndContext, closestCenter, Draggable, Droppable } from '@dnd-kit/drag-and-drop'; 
import VideoCard from "./VideoCard";
import "../../styles/videos.css";

const VideoList = ({ videos, onDelete, onReorder }) => {
  const containerRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
  } = useSortable({
    id: 'video-list',
    items: videos.map((video) => ({ id: video.id })),
    onSortEnd: ({ oldIndex, newIndex }) => {
      onReorder(arrayMoveItem(videos, oldIndex, newIndex)); 
    },
  });

  const handleContainerRef = (el) => {
    provided.ref(el);
    setNodeRef(el);
  };

  return (
    <DndContext collisionDetection={closestCenter}>
      <Droppable id="video-list" data={{}} >
        {(provided) => (
          <div 
            ref={handleContainerRef} 
            style={transition} 
            className="video-list-container"
          >
            {videos.map((video, index) => (
              <Draggable key={video.id} id={video.id}>
                {(provided) => (
                  <div 
                    ref={provided.ref} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps} 
                    style={provided.draggableProps.style} 
                    className="video-card"
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DndContext>
  );
};

export default VideoList;