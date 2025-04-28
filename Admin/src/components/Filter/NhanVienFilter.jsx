import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const NhanVienFilter = ({ FilterParams, onFilterParamsChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "16px",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      {/* Email */}
      <TextField
        label="Email"
        value={FilterParams.email}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            email: e.target.value,
          })
        }
        size="small"
      />

      {/* Giới Tính */}
      <FormControl size="small" style={{ minWidth: 150 }}>
        <InputLabel>Giới Tính</InputLabel>
        <Select
          value={FilterParams.gioiTinh}
          onChange={(e) =>
            onFilterParamsChange({
              ...FilterParams,
              gioiTinh: e.target.value,
            })
          }
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="Nam">Nam</MenuItem>
          <MenuItem value="Nữ">Nữ</MenuItem>
          <MenuItem value="Khác">Khác</MenuItem>
        </Select>
      </FormControl>

      {/* Chức Vụ */}
      <TextField
        label="Chức Vụ"
        value={FilterParams.chucVu}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            chucVu: e.target.value,
          })
        }
        size="small"
      />

      {/* Số Điện Thoại */}
      <TextField
        label="Số Điện Thoại"
        value={FilterParams.soDienThoai}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            soDienThoai: e.target.value,
          })
        }
        size="small"
      />
    </div>
  );
};

export default NhanVienFilter;