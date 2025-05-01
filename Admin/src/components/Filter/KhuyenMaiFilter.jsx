import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const KhuyenMaiFilter = ({ FilterParams, onFilterParamsChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "16px",
        gap: "16px",
        flexWrap: "nowrap",
      }}
    >
      {/* Tên Khuyến Mãi */}
      <TextField
        label="Tên Khuyến Mãi"
        value={FilterParams.tenKhuyenMai}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            tenKhuyenMai: e.target.value,
          })
        }
        size="small"
      />

      {/* Loại Khuyến Mãi */}
      <FormControl size="small" style={{ minWidth: 150 }}>
        <InputLabel>Loại Khuyến Mãi</InputLabel>
        <Select
          value={FilterParams.loaiKhuyenMai}
          onChange={(e) =>
            onFilterParamsChange({
              ...FilterParams,
              loaiKhuyenMai: e.target.value,
            })
          }
        >
          <MenuItem value="">Tất Cả</MenuItem>
          <MenuItem value={1}>Phần Trăm Giảm</MenuItem>
          <MenuItem value={2}>Giá Cố Định Giảm</MenuItem>
          <MenuItem value={3}>Quà Tặng</MenuItem>
        </Select>
      </FormControl>

      {/* Trạng Thái */}
      <FormControl size="small" style={{ minWidth: 150 }}>
        <InputLabel>Trạng Thái</InputLabel>
        <Select
          value={FilterParams.trangThai}
          onChange={(e) =>
            onFilterParamsChange({
              ...FilterParams,
              trangThai: e.target.value,
            })
          }
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value={1}>Kích Hoạt</MenuItem>
          <MenuItem value={2}>Khóa</MenuItem>
        </Select>
      </FormControl>

      {/* Ngày Bắt Đầu */}
      <TextField
        label="Ngày Bắt Đầu"
        name="ngayBatDau"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={FilterParams.ngayBatDau || ""}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            ngayBatDau: e.target.value,
          })
        }
        size="small"
      />

      {/* Ngày Kết Thúc */}
      <TextField
        label="Ngày Kết Thúc"
        name="ngayKetThuc"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={FilterParams.ngayKetThuc || ""}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            ngayKetThuc: e.target.value,
          })
        }
        size="small"
      />
    </div>
  );
};

export default KhuyenMaiFilter;
