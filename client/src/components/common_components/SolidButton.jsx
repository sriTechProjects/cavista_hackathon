import React from "react";
import Button from "@mui/material/Button";

const SolidButton = ({ containsIcon, icon, onClick, text }) => {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      style={{ background: "#03C988", boxShadow: "none", padding: "0.5rem 0.9rem" }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SolidButton;
