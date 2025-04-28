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

const TaiKhoanDialog = ({
  open,
  onClose,
  onSave,
  title,
  taiKhoan,
  phanQuyenList,
}) => {
  const [newTaiKhoan, setNewTaiKhoan] = useState({
    maTaiKhoan: "",
    tenDangNhap: "",
    matKhau: "",
    email: "",
    maPhanQuyen: "",
    trangThai: 1,
  });

  const [errors, setErrors] = useState({}); // Quản lý lỗi

  useEffect(() => {
    if (taiKhoan) {
      setNewTaiKhoan(taiKhoan); // Đổ dữ liệu khi sửa
    } else {
      setNewTaiKhoan({
        maTaiKhoan: "",
        tenDangNhap: "",
        matKhau: "",
        email: "",
        maPhanQuyen: "",
        trangThai: 1,
      }); // Reset khi thêm mới
    }
    setErrors({}); // Reset lỗi
  }, [taiKhoan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTaiKhoan((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value); // Kiểm tra giá trị khi người dùng nhập
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Trường này không được để trống";
    } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMessage = "Email không hợp lệ";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleAdd = () => {
    const requiredFields = ["tenDangNhap", "matKhau", "email", "maPhanQuyen"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newTaiKhoan[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newTaiKhoan[field]);
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newTaiKhoan); // Gửi dữ liệu lên cha
    setNewTaiKhoan({
      maTaiKhoan: "",
      tenDangNhap: "",
      matKhau: "",
      email: "",
      maPhanQuyen: "",
      trangThai: 1,
    }); // Reset form
    onClose(); // Đóng dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Tên Đăng Nhập */}
        <TextField
          label="Tên Đăng Nhập"
          name="tenDangNhap"
          fullWidth
          margin="dense"
          value={newTaiKhoan.tenDangNhap}
          onChange={handleChange}
          error={!!errors.tenDangNhap}
          helperText={errors.tenDangNhap}
        />
        {/* Mã Tài Khoản (Ẩn khi thêm mới) */}
        {taiKhoan && (
          <TextField
            label="Mã Tài Khoản"
            name="maTaiKhoan"
            fullWidth
            margin="dense"
            value={newTaiKhoan.maTaiKhoan}
            disabled // Không cho sửa
          />
        )}
        {/* Mật Khẩu */}
        <TextField
          label="Mật Khẩu"
          name="matKhau"
          type="password"
          fullWidth
          margin="dense"
          value={newTaiKhoan.matKhau}
          onChange={handleChange}
          error={!!errors.matKhau}
          helperText={errors.matKhau}
        />
        {/* Email */}
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          value={newTaiKhoan.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        {/* Phân Quyền */}
        <FormControl fullWidth margin="dense" error={!!errors.maPhanQuyen}>
          <InputLabel>Phân Quyền</InputLabel>
          <Select
            name="maPhanQuyen"
            value={newTaiKhoan.maPhanQuyen}
            onChange={handleChange}
          >
            <MenuItem key={-1} value="">
              Tất Cả
            </MenuItem>
            {phanQuyenList.length > 0 ? (
              phanQuyenList.map((phanQuyen) => (
                <MenuItem
                  key={phanQuyen.maPhanQuyen}
                  value={phanQuyen.maPhanQuyen}
                >
                  {phanQuyen.tenQuyen}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={0}>Không có dữ liệu</MenuItem>
            )}
          </Select>
          {errors.maPhanQuyen && (
            <p style={{ color: "red", fontSize: "0.8em" }}>
              {errors.maPhanQuyen}
            </p>
          )}
        </FormControl>
        {/* Trạng Thái */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Trạng Thái</InputLabel>
          <Select
            name="trangThai"
            value={newTaiKhoan.trangThai}
            onChange={handleChange}
          >
            <MenuItem value={1}>Kích Hoạt</MenuItem>
            <MenuItem value={2}>Khóa</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          {taiKhoan ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaiKhoanDialog;
