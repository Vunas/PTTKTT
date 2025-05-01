import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const KhoHangDialog = ({ open, onClose, onSave, title, khoHang }) => {
  const [newKhoHang, setNewKhoHang] = useState({
    maKhoHang: "",
    tenKhoHang: "",
    diaDiem: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (khoHang) {
      setNewKhoHang(khoHang);
    } else {
      setNewKhoHang({
        maKhoHang: "",
        tenKhoHang: "",
        diaDiem: "",
      });
    }
    setErrors({});
  }, [khoHang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewKhoHang((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Trường này không được để trống";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleAdd = () => {
    const requiredFields = ["tenKhoHang", "diaDiem"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newKhoHang[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newKhoHang[field]);
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newKhoHang);
    setNewKhoHang({
      maKhoHang: "",
      tenKhoHang: "",
      diaDiem: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên Kho Hàng"
          name="tenKhoHang"
          fullWidth
          margin="dense"
          value={newKhoHang.tenKhoHang}
          onChange={handleChange}
          error={!!errors.tenKhoHang}
          helperText={errors.tenKhoHang}
        />
        {khoHang && (
          <TextField
            label="Mã Kho Hàng"
            name="maKhoHang"
            fullWidth
            margin="dense"
            value={newKhoHang.maKhoHang}
            disabled
          />
        )}
        <TextField
          label="Địa Điểm"
          name="diaDiem"
          fullWidth
          margin="dense"
          value={newKhoHang.diaDiem}
          onChange={handleChange}
          error={!!errors.diaDiem}
          helperText={errors.diaDiem}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          {khoHang ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KhoHangDialog;
