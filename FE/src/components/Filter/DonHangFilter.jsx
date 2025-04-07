import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const DonHangFilter = ({ filterParams, onFilterParamsChange, khachHangList }) => {
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
      {/* Mã Khách Hàng */}
      <FormControl size="small" style={{ minWidth: 150 }}>
        <InputLabel>Khách Hàng</InputLabel>
        <Select
          value={filterParams.maKhachHang || ""}
          onChange={(e) =>
            onFilterParamsChange({
              ...filterParams,
              maKhachHang: e.target.value || null,
            })
          }
        >
          <MenuItem value="">Tất cả</MenuItem>
          {khachHangList.map((khachHang) => (
            <MenuItem key={khachHang.maKhachHang} value={khachHang.maKhachHang}>
              {khachHang.hoTen}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Ngày Đặt Bắt Đầu */}
      <TextField
        label="Ngày Đặt Bắt Đầu"
        type="date"
        value={filterParams.ngayDatBatDau}
        onChange={(e) =>
          onFilterParamsChange({
            ...filterParams,
            ngayDatBatDau: e.target.value,
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
        required
      />

      {/* Ngày Đặt Kết Thúc */}
      <TextField
        label="Ngày Đặt Kết Thúc"
        type="date"
        value={filterParams.ngayDatKetThuc}
        onChange={(e) =>
          onFilterParamsChange({
            ...filterParams,
            ngayDatKetThuc: e.target.value,
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
        required
      />

      {/* Trạng Thái */}
      <FormControl size="small" style={{ minWidth: 150 }}>
        <InputLabel>Trạng Thái</InputLabel>
        <Select
          value={filterParams.trangThai || ""}
          onChange={(e) =>
            onFilterParamsChange({
              ...filterParams,
              trangThai: e.target.value || null,
            })
          }
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value={1}>Đã Đặt</MenuItem>
          <MenuItem value={2}>Đã Xác Nhận</MenuItem>
          <MenuItem value={3}>Đang Giao</MenuItem>
          <MenuItem value={4}>Đã Giao</MenuItem>
          <MenuItem value={5}>Đã Hủy</MenuItem>
          <MenuItem value={0}>Đã Xóa</MenuItem>
        </Select>
      </FormControl>

      {/* Tổng Giá Tối Thiểu */}
      <TextField
        label="Tổng Giá Tối Thiểu"
        type="number"
        value={filterParams.tongGiaMin}
        onChange={(e) =>
          onFilterParamsChange({
            ...filterParams,
            tongGiaMin: e.target.value,
          })
        }
        size="small"
      />

      {/* Tổng Giá Tối Đa */}
      <TextField
        label="Tổng Giá Tối Đa"
        type="number"
        value={filterParams.tongGiaMax}
        onChange={(e) =>
          onFilterParamsChange({
            ...filterParams,
            tongGiaMax: e.target.value,
          })
        }
        size="small"
      />
    </div>
  );
};

export default DonHangFilter;