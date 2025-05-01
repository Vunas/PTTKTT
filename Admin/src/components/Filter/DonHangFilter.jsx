import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const DonHangFilter = ({
  filterParams,
  onFilterParamsChange,
  khachHangList,
  onRefresh,
}) => {
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
              {khachHang.maKhachHang} {khachHang.hoTen}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Ngày Đặt Bắt Đầu */}
      <TextField
        label="Ngày Đặt Bắt Đầu"
        type="date"
        value={filterParams.ngayDatBatDau || ""} // Đảm bảo giá trị không phải null hoặc undefined
        onChange={(e) =>
          onFilterParamsChange({
            ...filterParams,
            ngayDatBatDau: e.target.value, // Giá trị luôn là định dạng YYYY-MM-DD
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />

      <TextField
        label="Ngày Đặt Kết Thúc"
        type="date"
        value={filterParams.ngayDatKetThuc || ""} // Xử lý giá trị null hoặc undefined
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
      />

      <TextField
        label="Địa chỉ giao hàng"
        type="text"
        value={filterParams.diaChiGiaoHang || ""} // Xử lý giá trị null hoặc undefined
        onChange={(e) =>
          onFilterParamsChange({
            ...filterParams,
            diaChiGiaoHang: e.target.value,
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />

      {/* Trạng Thái */}
      <FormControl size="small" style={{ minWidth: 150 }}>
        <InputLabel>Trạng Thái</InputLabel>
        <Select
          value={filterParams.trangThaiGiaoHang || ""}
          onChange={(e) =>
            onFilterParamsChange({
              ...filterParams,
              trangThaiGiaoHang: e.target.value || null,
            })
          }
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="Đã đặt">Đã Đặt</MenuItem>
          <MenuItem value="Đã xác nhận">Đã Xác Nhận</MenuItem>
          <MenuItem value="Đang giao">Đang Giao Hàng</MenuItem>
          <MenuItem value="Đã giao">Đã Giao</MenuItem>
          <MenuItem value="Đã xóa">Đã Xóa</MenuItem>
          <MenuItem value="Đã hủy">Đã Hủy</MenuItem>
        </Select>
      </FormControl>

      {/* <TextField
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
      /> */}
      <Button
        variant="contained"
        color="primary"
        onClick={onRefresh} // Gọi hàm làm mới
        size="small"
        startIcon={<RefreshIcon />}
      >
        Làm Mới
      </Button>
    </div>
  );
};

export default DonHangFilter;
