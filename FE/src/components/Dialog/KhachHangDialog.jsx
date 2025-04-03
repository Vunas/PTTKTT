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

const KhachHangDialog = ({ open, onClose, onSave, title, khachHang }) => {
  const [newKhachHang, setNewKhachHang] = useState({
    maKhachHang: "",
    hoTen: "",
    email: "",
    gioiTinh: "",
    soDienThoai: "",
    diaChi: "",
  });

  const [errors, setErrors] = useState({}); // Quản lý lỗi

  useEffect(() => {
    if (khachHang) {
      setNewKhachHang(khachHang); // Điền dữ liệu khi sửa
    } else {
      setNewKhachHang({
        maKhachHang: "",
        hoTen: "",
        email: "",
        gioiTinh: "",
        soDienThoai: "",
        diaChi: "",
      }); // Reset khi thêm mới
    }
    setErrors({}); // Reset lỗi khi mở dialog
  }, [khachHang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewKhachHang((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Kiểm tra giá trị khi người dùng nhập
    validateField(name, value);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Trường này không được để trống";
    } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMessage = "Email không hợp lệ";
    } else if (field === "soDienThoai" && !/^\d{10}$/.test(value)) {
      errorMessage = "Số điện thoại phải có đúng 10 chữ số";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleAdd = () => {
    const requiredFields = ["hoTen", "email", "soDienThoai", "gioiTinh"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newKhachHang[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newKhachHang[field]);
      }
    });

    // Nếu có lỗi thì không lưu
    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newKhachHang); // Gửi dữ liệu lên cha
    setNewKhachHang({
      maKhachHang: "",
      hoTen: "",
      email: "",
      gioiTinh: "",
      soDienThoai: "",
      diaChi: "",
    }); // Reset form
    onClose(); // Đóng dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Họ Tên */}
        <TextField
          label="Họ Tên"
          name="hoTen"
          fullWidth
          margin="dense"
          value={newKhachHang.hoTen}
          onChange={handleChange}
          error={!!errors.hoTen}
          helperText={errors.hoTen}
        />
        {/* Mã Khách Hàng (Ẩn khi thêm mới) */}
        {khachHang && (
          <TextField
            label="Mã Khách Hàng"
            name="maKhachHang"
            fullWidth
            margin="dense"
            value={newKhachHang.maKhachHang}
            disabled // Không cho sửa
          />
        )}
        {/* Email */}
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          value={newKhachHang.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        {/* Giới Tính */}
        <FormControl fullWidth margin="dense" error={!!errors.gioiTinh}>
          <InputLabel>Giới Tính</InputLabel>
          <Select
            name="gioiTinh"
            value={newKhachHang.gioiTinh}
            onChange={handleChange}
          >
            <MenuItem value="">Chọn Giới Tính</MenuItem>
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </Select>
          {errors.gioiTinh && (
            <p style={{ color: "red", fontSize: "0.8em" }}>{errors.gioiTinh}</p>
          )}
        </FormControl>
        {/* Số Điện Thoại */}
        <TextField
          label="Số Điện Thoại"
          name="soDienThoai"
          type="tel"
          fullWidth
          margin="dense"
          value={newKhachHang.soDienThoai}
          onChange={handleChange}
          error={!!errors.soDienThoai}
          helperText={errors.soDienThoai}
        />
        {/* Địa Chỉ */}
        <TextField
          label="Địa Chỉ"
          name="diaChi"
          fullWidth
          margin="dense"
          value={newKhachHang.diaChi}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          {khachHang ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KhachHangDialog;