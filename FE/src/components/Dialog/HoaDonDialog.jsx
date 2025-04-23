import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import dayjs from "dayjs";

const HoaDonDialog = ({
  open,
  onClose,
  onSave,
  title,
  hoaDon,
  chiTietDonHang,
}) => {
  const [newHoaDon, setNewHoaDon] = useState({
    maHoaDon: "",
    maDonHang: "",
    maKhuyenMai: "",
    ngayXuatHoaDon: dayjs().format("YYYY-MM-DDTHH:mm"),
    tongTien: "",
    maNhanVien: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hoaDon) {
      setNewHoaDon(hoaDon);
    } else {
      setNewHoaDon({
        maHoaDon: "",
        maDonHang: "",
        maKhuyenMai: "",
        ngayXuatHoaDon: dayjs().format("YYYY-MM-DDTHH:mm"),
        tongTien: "",
        maNhanVien: "",
      });
    }
    setErrors({});
  }, [hoaDon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHoaDon((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleChangeDonHang = (e) => {
    const { name, value } = e.target;
    setNewHoaDon((prevValues) => ({
      ...prevValues,
      donHang: {
        ...prevValues.donHang, // Sao chép các thuộc tính hiện tại của "donhang"
        [name]: value, // Cập nhật thuộc tính cụ thể
      },
    }));
    validateField(name, value);
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
      ngayXuatHoaDon: dayjs().format("YYYY-MM-DDTHH:mm"),
      tongTien: "",
      maNhanVien: "",
    });
    onClose();
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Phần thông tin hóa đơn */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Thông Tin Hóa Đơn
            </Typography>
            <Divider />
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
              value={newHoaDon.maKhuyenMai || ""}
              onChange={handleChange}
            />
            <TextField
              label="Tên Khuyến Mãi"
              name="tenKhuyenMai"
              fullWidth
              margin="dense"
              value={newHoaDon.khuyenMai?.tenKhuyenMai || ""}
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
                value={newHoaDon.donHang?.trangThaiGiaoHang || ""}
                onChange={handleChangeDonHang}
              >
                <MenuItem value="Đã đặt">Đã Đặt</MenuItem>
                <MenuItem value="Đã xác nhận">Đã Xác Nhận</MenuItem>
                <MenuItem value="Đang giao">Đang Giao</MenuItem>
                <MenuItem value="Đã giao">Đã Giao</MenuItem>
                <MenuItem value="Đã hủy">Đã Hủy</MenuItem>
              </Select>
            </FormControl>
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
          </Grid>

          {/* Phần danh sách chi tiết đơn hàng */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Chi Tiết Đơn Hàng
            </Typography>
            <Divider />
            {chiTietDonHang && chiTietDonHang.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên Sản Phẩm</TableCell>
                      <TableCell>Hình Ảnh</TableCell>
                      <TableCell align="center">Số Lượng</TableCell>
                      <TableCell align="center">Đơn Giá</TableCell>
                      <TableCell align="center">Thành Tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chiTietDonHang.map((item) => (
                      <TableRow key={item.maSanPham}>
                        <TableCell component="th" scope="row">
                          {item.sanPham?.tenSanPham}
                        </TableCell>
                        <TableCell>
                          <img
                            src={item.sanPham?.hinhAnh}
                            alt={item.sanPham?.ten}
                            style={{ width: 80, height: 88 }}
                          />
                        </TableCell>
                        <TableCell align="center">{item.soLuong}</TableCell>
                        <TableCell align="center">{item.donGia}</TableCell>
                        <TableCell align="center">{item.thanhTien}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="subtitle2">
                Không có chi tiết đơn hàng.
              </Typography>
            )}
          </Grid>
        </Grid>
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
