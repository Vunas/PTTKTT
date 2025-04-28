import React from "react";
import { TextField } from "@mui/material";

const NhaCungCapFilter = ({ FilterParams, onFilterParamsChange }) => {
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
      {/* Tên Nhà Cung Cấp */}
      <TextField
        label="Tên Nhà Cung Cấp"
        value={FilterParams.tenNhaCungCap}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            tenNhaCungCap: e.target.value,
          })
        }
        size="small"
      />

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

export default NhaCungCapFilter;
