import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableVideoCard = ({ id, title, url, description, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="video-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="watch-video-link">
        Watch Video
      </a>
      <button onClick={onDelete} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default SortableVideoCard;
