import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "رجوع" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        backgroundColor: "#ffffffff",
        color: "black",
        border: "none",
        borderRadius: "6px",
        padding: "8px 14px",
        fontSize: "15px",
        cursor: "pointer",
      }}
    >
      ⬅ {label}
    </button>
  );
};

export default BackButton;
