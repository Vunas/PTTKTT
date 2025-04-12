import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
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
    const requiredFields = ["maDonHang", "ngayXuatHoaDon", "tongTien", "maNhanVien"];
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
          label="Mã Khuyến Mãi"
          name="maKhuyenMai"
          fullWidth
          margin="dense"
          value={newHoaDon.maKhuyenMai}
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