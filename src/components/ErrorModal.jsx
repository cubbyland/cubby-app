import React from "react";

const ErrorModal = ({ onClose, message }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
        borderRadius: "8px",
        width: "300px",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "red" }}>Error</h2>
      <p style={{ marginBottom: "15px" }}>{message}</p>
      <button
        onClick={onClose}
        style={{
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default ErrorModal;
