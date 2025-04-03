import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const KhachHangFilter = ({ FilterParams, onFilterParamsChange }) => {
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
        </Select>
      </FormControl>

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

      {/* Địa Chỉ */}
      <TextField
        label="Địa Chỉ"
        value={FilterParams.diaChi}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            diaChi: e.target.value,
          })
        }
        size="small"
      />
    </div>
  );
};

export default KhachHangFilter;