import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const NhaCungCapDialog = ({ open, onClose, onSave, title, nhaCungCap }) => {
  const [newNhaCungCap, setNewNhaCungCap] = useState({
    maNhaCungCap: "",
    tenNhaCungCap: "",
    email: "",
    soDienThoai: "",
    diaChi: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (nhaCungCap) {
      setNewNhaCungCap(nhaCungCap);
    } else {
      setNewNhaCungCap({
        maNhaCungCap: "",
        tenNhaCungCap: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
      });
    }
    setErrors({});
  }, [nhaCungCap]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNhaCungCap((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
    const requiredFields = ["tenNhaCungCap", "email", "soDienThoai"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newNhaCungCap[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newNhaCungCap[field]);
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newNhaCungCap);
    setNewNhaCungCap({
      maNhaCungCap: "",
      tenNhaCungCap: "",
      email: "",
      soDienThoai: "",
      diaChi: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên Nhà Cung Cấp"
          name="tenNhaCungCap"
          fullWidth
          margin="dense"
          value={newNhaCungCap.tenNhaCungCap}
          onChange={handleChange}
          error={!!errors.tenNhaCungCap}
          helperText={errors.tenNhaCungCap}
        />
        {nhaCungCap && (
          <TextField
            label="Mã Nhà Cung Cấp"
            name="maNhaCungCap"
            fullWidth
            margin="dense"
            value={newNhaCungCap.maNhaCungCap}
            disabled
          />
        )}
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          value={newNhaCungCap.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Số Điện Thoại"
          name="soDienThoai"
          type="tel"
          fullWidth
          margin="dense"
          value={newNhaCungCap.soDienThoai}
          onChange={handleChange}
          error={!!errors.soDienThoai}
          helperText={errors.soDienThoai}
        />
        <TextField
          label="Địa Chỉ"
          name="diaChi"
          fullWidth
          margin="dense"
          value={newNhaCungCap.diaChi}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          {nhaCungCap ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NhaCungCapDialog;
