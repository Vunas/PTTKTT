import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
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
    trangThai: "Đã đặt", // Mặc định là "Đã Đặt"
    tongGia: "",
    phuongThucThanhToan: "",
    diaChiGiaoHang: "",
    ghiChu: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (donHang) {
      setNewDonHang(donHang); // Đổ dữ liệu khi sửa
    } else {
      setNewDonHang({
        maDonHang: "",
        maKhachHang: "",
        ngayDat: "",
        trangThai: "Đã đặt",
        tongGia: "",
        phuongThucThanhToan: "",
        diaChiGiaoHang: "",
        ghiChu: "",
      });
    }
    setErrors({}); // Reset lỗi
  }, [donHang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonHang((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Trường này không được để trống";
    } else if (
      field === "tongGia" &&
      (isNaN(Number(value)) || Number(value) <= 0)
    ) {
      errorMessage = "Tổng giá phải là số lớn hơn 0";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleAdd = () => {
    const requiredFields = [
      "maKhachHang",
      "ngayDat",
      "trangThai",
      "tongGia",
      "phuongThucThanhToan",
      "diaChiGiaoHang",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newDonHang[field]) {
        newErrors[field] = "Trường này không được để trống";
      }
    });

    if (Object.values(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(newDonHang); // Gửi dữ liệu về component cha
    onClose(); // Đóng dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Mã Đơn Hàng */}
        {donHang && (
          <TextField
            label="Mã Đơn Hàng"
            name="maDonHang"
            fullWidth
            margin="dense"
            value={newDonHang.maDonHang}
            disabled
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
            <MenuItem value="">Chọn Khách Hàng</MenuItem>
            {khachHangList.map((khachHang) => (
              <MenuItem
                key={khachHang.maKhachHang}
                value={khachHang.maKhachHang}
              >
                {khachHang.hoTen}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Ngày Đặt */}

        <TextField
          label="Ngày Đặt"
          name="ngayDat"
          type="date"
          fullWidth
          margin="dense"
          value={dayjs(newDonHang.ngayDat).format("YYYY-MM-DD")}
          onChange={handleChange}
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
            <MenuItem value={"Đã đặt"}>Đã Đặt</MenuItem>
            <MenuItem value={"Đã xác nhận"}>Đã Xác Nhận</MenuItem>
            <MenuItem value={"Đang giao"}>Đang Giao</MenuItem>
            <MenuItem value={"Đã giao"}>Đã Giao</MenuItem>
            <MenuItem value={"Đã hủy"}>Đã Hủy</MenuItem>
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
        />

        {/* Phương Thức Thanh Toán */}
        <FormControl
          fullWidth
          margin="dense"
          error={!!errors.phuongThucThanhToan}
        >
          <InputLabel>Phương Thức Thanh Toán</InputLabel>
          <Select
            name="phuongThucThanhToan"
            value={newDonHang.phuongThucThanhToan}
            onChange={handleChange}
          >
            <MenuItem value="Tiền mặt">Tiền Mặt</MenuItem>
            <MenuItem value="Thẻ ngân hàng">Thẻ Ngân Hàng</MenuItem>
            <MenuItem value="Ví điện tử">Ví Điện Tử</MenuItem>
          </Select>
        </FormControl>

        {/* Địa Chỉ Giao Hàng */}
        <TextField
          label="Địa Chỉ Giao Hàng"
          name="diaChiGiaoHang"
          fullWidth
          margin="dense"
          value={newDonHang.diaChiGiaoHang}
          onChange={handleChange}
        />

        {/* Ghi Chú */}
        <TextField
          label="Ghi Chú"
          name="ghiChu"
          fullWidth
          margin="dense"
          value={newDonHang.ghiChu}
          onChange={handleChange}
          multiline
          rows={3}
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
