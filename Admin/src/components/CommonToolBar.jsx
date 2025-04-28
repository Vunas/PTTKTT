import React from "react";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

const CommonToolBar = ({ onAdd, onSearch, onExport, quyenThem }) => {
  return (
    <div style={{ padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px", marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        {quyenThem && ( <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Thêm
        </Button>
        )}
        <div style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
          <TextField
            placeholder="Tìm kiếm..."
            size="small"
            style={{ width: "300px" }}
            InputProps={{
              startAdornment: <SearchIcon color="action" />,
            }}
            onChange={(e) => onSearch(e.target.value)} 
          />
        </div>
        {/* <Button
          variant="contained"
          color="secondary"
          startIcon={<FilterAltIcon />}
          onClick={onToggleFilter}
        >
          Hiển Thị Lọc
        </Button> */}
        <Button
          variant="outlined"
          color="success"
          startIcon={<DownloadIcon />}
          onClick={onExport}
          style={{ marginLeft: "16px" }}
        >
          Xuất Excel
        </Button>
      </div>
    </div>
  );
};

export default CommonToolBar;