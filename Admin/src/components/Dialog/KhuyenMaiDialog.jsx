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

const KhuyenMaiDialog = ({
  open,
  onClose,
  onSave,
  title,
  khuyenMai,
}) => {
  const [newKhuyenMai, setNewKhuyenMai] = useState({
    maKhuyenMai: "",
    tenKhuyenMai: "",
    moTa: "",
    giaTriKhuyenMai: "",
    loaiKhuyenMai: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    trangThai: 1,
  });

  const [errors, setErrors] = useState({}); // Quản lý lỗi

  useEffect(() => {
    if (khuyenMai) {
      setNewKhuyenMai(khuyenMai); // Đổ dữ liệu khi sửa
    } else {
      setNewKhuyenMai({
        maKhuyenMai: "",
        tenKhuyenMai: "",
        moTa: "",
        giaTriKhuyenMai: "",
        loaiKhuyenMai: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        trangThai: 1,
      }); // Reset khi thêm mới
    }
    setErrors({}); // Reset lỗi
  }, [khuyenMai]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewKhuyenMai((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value); // Kiểm tra giá trị khi người dùng nhập
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value && field !== "moTa") {
      errorMessage = "Trường này không được để trống";
    }
    if (field === "giaTriKhuyenMai" && value && isNaN(value)) {
      errorMessage = "Giá trị phải là số hợp lệ";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleSave = () => {
    const requiredFields = ["tenKhuyenMai", "giaTriKhuyenMai", "loaiKhuyenMai", "ngayBatDau", "ngayKetThuc"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newKhuyenMai[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newKhuyenMai[field]);
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newKhuyenMai); // Gửi dữ liệu lên cha
    setNewKhuyenMai({
      maKhuyenMai: "",
      tenKhuyenMai: "",
      moTa: "",
      giaTriKhuyenMai: "",
      loaiKhuyenMai: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      trangThai: 1,
    }); // Reset form
    onClose(); // Đóng dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Tên Khuyến Mãi */}
        <TextField
          label="Tên Khuyến Mãi"
          name="tenKhuyenMai"
          fullWidth
          margin="dense"
          value={newKhuyenMai.tenKhuyenMai}
          onChange={handleChange}
          error={!!errors.tenKhuyenMai}
          helperText={errors.tenKhuyenMai}
        />
        {/* Mã Khuyến Mãi (Ẩn khi thêm mới) */}
        {khuyenMai && (
          <TextField
            label="Mã Khuyến Mãi"
            name="maKhuyenMai"
            fullWidth
            margin="dense"
            value={newKhuyenMai.maKhuyenMai}
            disabled
          />
        )}
        {/* Mô Tả */}
        <TextField
          label="Mô Tả"
          name="moTa"
          fullWidth
          margin="dense"
          value={newKhuyenMai.moTa}
          onChange={handleChange}
        />
        {/* Giá Trị Khuyến Mãi */}
        <TextField
          label="Giá Trị Khuyến Mãi"
          name="giaTriKhuyenMai"
          fullWidth
          margin="dense"
          value={newKhuyenMai.giaTriKhuyenMai}
          onChange={handleChange}
          error={!!errors.giaTriKhuyenMai}
          helperText={errors.giaTriKhuyenMai}
        />
        {/* Loại Khuyến Mãi */}
        <FormControl fullWidth margin="dense" error={!!errors.loaiKhuyenMai}>
          <InputLabel>Loại Khuyến Mãi</InputLabel>
          <Select
            name="loaiKhuyenMai"
            value={newKhuyenMai.loaiKhuyenMai}
            onChange={handleChange}
          >
            <MenuItem value={1}>Phần Trăm Giảm</MenuItem>
            <MenuItem value={2}>Giá Cố Định Giảm</MenuItem>
            <MenuItem value={3}>Quà Tặng</MenuItem>
          </Select>
          {errors.loaiKhuyenMai && (
            <p style={{ color: "red", fontSize: "0.8em" }}>
              {errors.loaiKhuyenMai}
            </p>
          )}
        </FormControl>
        {/* Ngày Bắt Đầu */}
        <TextField
          label="Ngày Bắt Đầu"
          name="ngayBatDau"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={newKhuyenMai.ngayBatDau}
          onChange={handleChange}
          error={!!errors.ngayBatDau}
          helperText={errors.ngayBatDau}
        />
        {/* Ngày Kết Thúc */}
        <TextField
          label="Ngày Kết Thúc"
          name="ngayKetThuc"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={newKhuyenMai.ngayKetThuc}
          onChange={handleChange}
          error={!!errors.ngayKetThuc}
          helperText={errors.ngayKetThuc}
        />
        {/* Trạng Thái */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Trạng Thái</InputLabel>
          <Select
            name="trangThai"
            value={newKhuyenMai.trangThai}
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
        <Button onClick={handleSave} variant="contained" color="primary">
          {khuyenMai ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KhuyenMaiDialog;
