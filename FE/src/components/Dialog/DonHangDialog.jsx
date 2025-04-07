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

const DonHangDialog = ({
  open,
  onClose,
  onSave,
  title,
  donHang,
  khachHangList,
}) => {
  const [newDonHang, setNewDonHang] = useState({
    maDonHang: "",
    maKhachHang: "",
    ngayDat: "",
    trangThai: 1,
    tongGia: "",
  });

  const [errors, setErrors] = useState({}); // Quản lý lỗi

  useEffect(() => {
    if (donHang) {
      setNewDonHang(donHang); // Đổ dữ liệu khi sửa
    } else {
      setNewDonHang({
        maDonHang: "",
        maKhachHang: "",
        ngayDat: "",
        trangThai: 1,
        tongGia: "",
      }); // Reset khi thêm mới
    }
    setErrors({}); // Reset lỗi
  }, [donHang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonHang((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value); // Kiểm tra giá trị
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Trường này không được để trống";
    } else if (field === "tongGia" && isNaN(Number(value))) {
      errorMessage = "Tổng giá phải là số hợp lệ";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleAdd = () => {
    const requiredFields = ["maKhachHang", "ngayDat", "trangThai", "tongGia"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newDonHang[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newDonHang[field]);
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newDonHang); // Gửi dữ liệu lên cha
    setNewDonHang({
      maDonHang: "",
      maKhachHang: "",
      ngayDat: "",
      trangThai: 1,
      tongGia: "",
    }); // Reset form
    onClose(); // Đóng dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Mã Đơn Hàng (Ẩn khi thêm mới) */}
        {donHang && (
          <TextField
            label="Mã Đơn Hàng"
            name="maDonHang"
            fullWidth
            margin="dense"
            value={newDonHang.maDonHang}
            disabled // Không cho sửa
          />
        )}
        {/* Mã Khách Hàng */}
        <FormControl fullWidth margin="dense" error={!!errors.maKhachHang}>
          <InputLabel>Khách Hàng</InputLabel>
          <Select
            name="maKhachHang"
            value={newDonHang.maKhachHang}
            onChange={handleChange}
          >
            <MenuItem key={-1} value="">
              Chọn Khách Hàng
            </MenuItem>
            {khachHangList.length > 0 ? (
              khachHangList.map((khachHang) => (
                <MenuItem
                  key={khachHang.maKhachHang}
                  value={khachHang.maKhachHang}
                >
                  {khachHang.hoTen}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={0}>Không có dữ liệu</MenuItem>
            )}
          </Select>
          {errors.maKhachHang && (
            <p style={{ color: "red", fontSize: "0.8em" }}>
              {errors.maKhachHang}
            </p>
          )}
        </FormControl>
        {/* Ngày Đặt */}
        <TextField
          label="Ngày Đặt"
          name="ngayDat"
          type="date"
          fullWidth
          margin="dense"
          value={newDonHang.ngayDat}
          onChange={handleChange}
          error={!!errors.ngayDat}
          helperText={errors.ngayDat}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* Trạng Thái */}
        <FormControl fullWidth margin="dense" error={!!errors.trangThai}>
          <InputLabel>Trạng Thái</InputLabel>
          <Select
            name="trangThai"
            value={newDonHang.trangThai}
            onChange={handleChange}
          >
            <MenuItem value={1}>Đã Đặt</MenuItem>
            <MenuItem value={2}>Đã Xác Nhận</MenuItem>
            <MenuItem value={3}>Đang Giao</MenuItem>
            <MenuItem value={4}>Đã Giao</MenuItem>
            <MenuItem value={5}>Đã Hủy</MenuItem>
          </Select>
        </FormControl>
        {/* Tổng Giá */}
        <TextField
          label="Tổng Giá"
          name="tongGia"
          fullWidth
          margin="dense"
          value={newDonHang.tongGia}
          onChange={handleChange}
          error={!!errors.tongGia}
          helperText={errors.tongGia}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          {donHang ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonHangDialog;
