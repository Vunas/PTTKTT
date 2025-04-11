import React from "react";
import { Typography } from "@mui/material";

const Error = ({ message }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h6" color="error">
        {message || "Có lỗi xảy ra"}
      </Typography>
    </div>
  );
};

export default Error;
