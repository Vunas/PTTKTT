import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const TaiKhoanFilter = ({ FilterParams, onFilterParamsChange, phanQuyenList }) => {
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
      {/* Tên Đăng Nhập */}
      <TextField
        label="Tên Đăng Nhập"
        value={FilterParams.tenDangNhap}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            tenDangNhap: e.target.value,
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

      {/* Phân Quyền */}
      <FormControl size="small" style={{ minWidth: 150 }}>
        <InputLabel>Phân Quyền</InputLabel>
        <Select
          value={FilterParams.maPhanQuyen}
          onChange={(e) =>
            onFilterParamsChange({
              ...FilterParams,
              maPhanQuyen: e.target.value,
            })
          }
        >
          <MenuItem key={-1} value="">
                Tất Cả
              </MenuItem>
          {phanQuyenList.length > 0 ? (
            phanQuyenList.map((phanQuyen) => (
              <MenuItem key={phanQuyen.maPhanQuyen} value={phanQuyen.maPhanQuyen}>
                {phanQuyen.tenQuyen}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={0}>Không có dữ liệu</MenuItem>
          )}
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
          <MenuItem value={0}>Khóa</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TaiKhoanFilter;