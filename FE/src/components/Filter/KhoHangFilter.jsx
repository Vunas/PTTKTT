import React from "react";
import { TextField } from "@mui/material";

const KhoHangFilter = ({ FilterParams, onFilterParamsChange }) => {
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
      {/* Tên Kho Hàng */}
      <TextField
        label="Tên Kho Hàng"
        value={FilterParams.tenKhoHang}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            tenKhoHang: e.target.value,
          })
        }
        size="small"
      />

      {/* Địa Điểm */}
      <TextField
        label="Địa Điểm"
        value={FilterParams.diaDiem}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            diaDiem: e.target.value,
          })
        }
        size="small"
      />
    </div>
  );
};

export default KhoHangFilter;
