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

const NhanVienDialog = ({ open, onClose, onSave, title, nhanVien }) => {
  const [newNhanVien, setNewNhanVien] = useState({
    maNhanVien: "",
    hoTen: "",
    email: "",
    gioiTinh: "",
    soDienThoai: "",
    chucVu: "",
    diaChi: "",
  });

  const [errors, setErrors] = useState({}); // Quản lý lỗi

  useEffect(() => {
    if (nhanVien) {
      setNewNhanVien(nhanVien); // Đổ dữ liệu khi sửa
    } else {
      setNewNhanVien({
        maNhanVien: "",
        hoTen: "",
        email: "",
        gioiTinh: "",
        soDienThoai: "",
        chucVu: "",
        diaChi: "",
      }); // Reset khi thêm mới
    }
    setErrors({}); // Reset lỗi
  }, [nhanVien]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNhanVien((prevValues) => ({
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
      if (!newNhanVien[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newNhanVien[field]);
      }
    });

    // Nếu có lỗi thì không lưu
    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newNhanVien); // Gửi dữ liệu lên cha
    setNewNhanVien({
      maNhanVien: "",
      hoTen: "",
      email: "",
      gioiTinh: "",
      soDienThoai: "",
      chucVu: "",
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
          value={newNhanVien.hoTen}
          onChange={handleChange}
          error={!!errors.hoTen}
          helperText={errors.hoTen}
        />
        {/* Mã Nhân Viên (Ẩn khi thêm mới) */}
        {nhanVien && (
          <TextField
            label="Mã Nhân Viên"
            name="maNhanVien"
            fullWidth
            margin="dense"
            value={newNhanVien.maNhanVien}
            disabled // Không cho sửa
          />
        )}
        {/* Email */}
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          value={newNhanVien.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        {/* Giới Tính */}
        <FormControl fullWidth margin="dense" error={!!errors.gioiTinh}>
          <InputLabel>Giới Tính</InputLabel>
          <Select
            name="gioiTinh"
            value={newNhanVien.gioiTinh}
            onChange={handleChange}
          >
            <MenuItem value="">Chọn Giới Tính</MenuItem>
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
            <MenuItem value="Khác">Khác</MenuItem>
          </Select>
          {errors.gioiTinh && (
            <p style={{ color: "red", fontSize: "0.8em" }}>{errors.gioiTinh}</p>
          )}
        </FormControl>
        {/* Số Điện Thoại */}
        <TextField
          label="Số Điện Thoại"
          name="soDienThoai"
          type="number"
          fullWidth
          margin="dense"
          value={newNhanVien.soDienThoai}
          onChange={handleChange}
          error={!!errors.soDienThoai}
          helperText={errors.soDienThoai}
        />
        {/* Chức Vụ */}
        <TextField
          label="Chức Vụ"
          name="chucVu"
          fullWidth
          margin="dense"
          value={newNhanVien.chucVu}
          onChange={handleChange}
        />
        {/* Địa Chỉ */}
        <TextField
          label="Địa Chỉ"
          name="diaChi"
          fullWidth
          margin="dense"
          value={newNhanVien.diaChi}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          {nhanVien ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NhanVienDialog;