import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const Loading = ({ message = "Đang tải dữ liệu..." }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: "10px" }}>
        {message}
      </Typography>
    </div>
  );
};

export default Loading;
