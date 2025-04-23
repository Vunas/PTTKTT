import React from "react";
import { Typography, Card } from "@mui/material";

function ThongKeItem({ title, value, icon, color }) {
  return (
    <Card
      sx={{
        height: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      {icon && React.cloneElement(icon, {
        sx: { fontSize: 40, color: `${color}.main`, mb: 1 },
      })}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
        {value}
      </Typography>
    </Card>
  );
}

export default ThongKeItem;