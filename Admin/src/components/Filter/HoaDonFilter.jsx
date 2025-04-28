import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const HoaDonFilter = ({ FilterParams, onFilterParamsChange }) => {
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
      {/* Mã Đơn Hàng */}
      <TextField
        label="Mã Đơn Hàng"
        value={FilterParams.maDonHang}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            maDonHang: e.target.value,
          })
        }
        size="small"
      />

      {/* Mã Khuyến Mãi */}
      <TextField
        label="Mã Khuyến Mãi"
        value={FilterParams.maKhuyenMai}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            maKhuyenMai: e.target.value,
          })
        }
        size="small"
      />


      {/* Ngày Xuất Hóa Đơn (Bắt Đầu) */}
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

      {/* Ngày Xuất Hóa Đơn (Kết Thúc) */}
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

      {/* Tổng Tiền (Tối Thiểu) */}
      <TextField
        label="Tổng Tiền Tối Thiểu"
        name="tongTienMin"
        type="number"
        value={FilterParams.tongTienMin || ""}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            tongTienMin: e.target.value,
          })
        }
        size="small"
      />

      {/* Tổng Tiền (Tối Đa) */}
      <TextField
        label="Tổng Tiền Tối Đa"
        name="tongTienMax"
        type="number"
        value={FilterParams.tongTienMax || ""}
        onChange={(e) =>
          onFilterParamsChange({
            ...FilterParams,
            tongTienMax: e.target.value,
          })
        }
        size="small"
      />
    </div>
  );
};

export default HoaDonFilter;