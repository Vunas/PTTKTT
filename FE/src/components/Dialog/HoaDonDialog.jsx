import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const HoaDonDialog = ({ open, onClose, onSave, title, hoaDon }) => {
  const [newHoaDon, setNewHoaDon] = useState({
    maHoaDon: "",
    maDonHang: "",
    maKhuyenMai: "",
    ngayXuatHoaDon: "",
    tongTien: "",
    maNhanVien: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hoaDon) {
      setNewHoaDon(hoaDon); // Đổ dữ liệu khi sửa
    } else {
      setNewHoaDon({
        maHoaDon: "",
        maDonHang: "",
        maKhuyenMai: "",
        ngayXuatHoaDon: new Date().toISOString().slice(0, 16), // Lấy ngày hiện tại
        tongTien: "",
        maNhanVien: "",
      }); // Reset khi thêm mới
    }
    setErrors({}); // Reset lỗi
  }, [hoaDon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHoaDon((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value); // Kiểm tra giá trị khi người dùng nhập
  };

  const handleDonHangChange = (e) => {
    const { name, value } = e.target;

    setNewHoaDon((prevValues) => ({
      ...prevValues,
      donHang: {
        ...prevValues.donHang,
        [name]: value,
      },
    }));

    validateField(name, value);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Trường này không được để trống";
    }
    if (field === "tongTien" && value && isNaN(value)) {
      errorMessage = "Tổng tiền phải là số hợp lệ";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleSave = () => {
    const requiredFields = [
      "maDonHang",
      "ngayXuatHoaDon",
      "tongTien",
      "maNhanVien",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newHoaDon[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newHoaDon[field]);
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newHoaDon);
    setNewHoaDon({
      maHoaDon: "",
      maDonHang: "",
      maKhuyenMai: "",
      ngayXuatHoaDon: new Date().toISOString().slice(0, 16),
      tongTien: "",
      maNhanVien: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {hoaDon && (
          <TextField
            label="Mã Hóa Đơn"
            name="maHoaDon"
            fullWidth
            margin="dense"
            value={newHoaDon.maHoaDon}
            disabled
          />
        )}
        <TextField
          label="Mã Đơn Hàng"
          name="maDonHang"
          fullWidth
          margin="dense"
          value={newHoaDon.maDonHang}
          onChange={handleChange}
          error={!!errors.maDonHang}
          helperText={errors.maDonHang}
        />
        <TextField
          label="Mã Khách Hàng"
          name="maKhachHang"
          fullWidth
          margin="dense"
          value={newHoaDon.donHang?.maKhachHang || ""}
          disabled
        />
        <FormControl
          fullWidth
          margin="dense"
          error={!!errors.trangThaiGiaoHang}
        >
          <InputLabel>Trạng Thái Giao Hàng</InputLabel>
          <Select
            name="trangThaiGiaoHang"
            value={newHoaDon.donHang?.trangThaiGiaoHang || "Đã đặt"}
            onChange={handleDonHangChange}
          >
            <MenuItem value="Đã đặt">Đã Đặt</MenuItem>
            <MenuItem value="Đã xác nhận">Đã Xác Nhận</MenuItem>
            <MenuItem value="Đang giao">Đang Giao</MenuItem>
            <MenuItem value="Đã giao">Đã Giao</MenuItem>
            <MenuItem value="Đã hủy">Đã Hủy</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Tổng giá"
          name="tongGia"
          fullWidth
          margin="dense"
          value={newHoaDon.donHang?.tongGia || ""}
          disabled
        />
        <TextField
          label="Mã Khuyến Mãi"
          name="maKhuyenMai"
          fullWidth
          margin="dense"
          value={newHoaDon.maKhuyenMai || ""}
          onChange={handleChange}
        />
        <TextField
          label="Ngày Xuất Hóa Đơn"
          name="ngayXuatHoaDon"
          type="datetime-local"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={newHoaDon.ngayXuatHoaDon}
          onChange={handleChange}
          error={!!errors.ngayXuatHoaDon}
          helperText={errors.ngayXuatHoaDon}
        />
        <TextField
          label="Tổng Tiền"
          name="tongTien"
          fullWidth
          margin="dense"
          value={newHoaDon.tongTien}
          onChange={handleChange}
          error={!!errors.tongTien}
          helperText={errors.tongTien}
        />
        <TextField
          label="Mã Nhân Viên"
          name="maNhanVien"
          fullWidth
          margin="dense"
          value={newHoaDon.maNhanVien}
          onChange={handleChange}
          error={!!errors.maNhanVien}
          helperText={errors.maNhanVien}
        />
        <TextField
          label="Địa Chỉ"
          name="diachi"
          fullWidth
          margin="dense"
          value={newHoaDon.donHang?.diachi || ""}
          onChange={handleDonHangChange}
        />
        <TextField
          label="Ghi Chú"
          name="ghichu"
          fullWidth
          margin="dense"
          value={newHoaDon.donHang?.ghiChu || ""}
          onChange={handleDonHangChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {hoaDon ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HoaDonDialog;
