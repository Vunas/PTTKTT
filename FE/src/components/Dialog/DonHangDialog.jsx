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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add"; // Import AddIcon
const DonHangDialog = ({
  open,
  onClose,
  onSave,
  title,
  donHang,
  chiTietDonHang,
  khachHangList,
  sanPhamList,
  setSanPhamList,
  setSnackbar,
}) => {
  const [newDonHang, setNewDonHang] = useState({
    maDonHang: "",
    maKhachHang: "",
    ngayDat: dayjs().format("YYYY-MM-DDTHH:mm"),
    trangThaiGiaoHang: "Đã đặt",
    tongGia: 0,
    phuongThucThanhToan: "",
    diaChiGiaoHang: "",
    ghiChu: "",
  });
  const [newChiTietDonHang, setNewChiTietDonHang] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (donHang) {
      setNewDonHang(donHang);
      setNewChiTietDonHang(chiTietDonHang);
    } else {
      handleAddNewOrder();
      setNewDonHang((prevValues) => ({
        ...prevValues,
        ngayDat: dayjs().format("YYYY-MM-DDTHH:mm"),
      }));
    }
    setErrors({});
  }, [donHang, chiTietDonHang]);

  const handleAddNewOrder = () => {
    setNewDonHang({
      maDonHang: "",
      maKhachHang: "",
      ngayDat: dayjs().format("YYYY-MM-DDTHH:mm"),
      trangThaiGiaoHang: "Đã đặt",
      tongGia: 0,
      phuongThucThanhToan: "",
      diaChiGiaoHang: "",
      ghiChu: "",
    });
    setNewChiTietDonHang([]);
    setErrors({});
  };

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

  const handleQuantityChange = (index, newQuantity, sanPham) => {
    // Kiểm tra giá trị nhập hợp lệ
    if (newQuantity < 1 || isNaN(newQuantity)) {
      setSnackbar({
        open: true,
        message: "Số lượng không hợp lệ!",
        type: "error",
      });
      return;
    }

    // Lấy sản phẩm hiện tại từ danh sách chi tiết
    const currentItem = newChiTietDonHang[index];
    const delta = newQuantity - currentItem.soLuong; // Tính số lượng thay đổi
    console.log(delta);

    const sanPhamIndex = sanPhamList.findIndex(
      (sp) => sp.maSanPham === sanPham.maSanPham
    );
    console.log(sanPhamList[sanPhamIndex].soLuong);
    if (
      sanPhamIndex < 0 ||
      (sanPhamList[sanPhamIndex].soLuong !== undefined &&
        sanPhamList[sanPhamIndex].soLuong < 0) ||
      sanPhamList[sanPhamIndex].soLuong - delta < 0
    ) {
      console.log(sanPhamList[sanPhamIndex].soLuong - delta);
      setSnackbar({
        open: true,
        message: "Sản phẩm không còn đủ số lượng trong kho!",
        type: "error",
      });
      return;
    }

    // Cập nhật danh sách chi tiết đơn hàng
    const updatedChiTietDonHang = [...newChiTietDonHang];
    updatedChiTietDonHang[index] = {
      ...currentItem,
      soLuong: newQuantity,
      thanhTien: newQuantity * currentItem.donGia, // Cập nhật thành tiền
    };

    // Ghi nhận delta vào một biến riêng để gửi xuống backend
    const updatedSoLuong = sanPhamList.map((sp) => {
      if (sp.maSanPham === currentItem.maSanPham) {
        return {
          ...sp,
          soLuong: sp.soLuong - delta,
          deltaSoLuong: (sp.deltaSoLuong || 0) + delta, // Cộng dồn delta
        };
      }
      return sp;
    });

    // Tính lại tổng giá trị đơn hàng
    const updatedTongGia = updatedChiTietDonHang.reduce(
      (total, item) => total + item.thanhTien,
      0
    );

    // Cập nhật state
    setNewChiTietDonHang(updatedChiTietDonHang);
    setNewDonHang((prevValues) => ({
      ...prevValues,
      tongGia: updatedTongGia,
    }));
    setSanPhamList(updatedSoLuong); // Chỉ cập nhật delta thay vì số lượng trực tiếp
  };

  const handleAddSanPham = (sanPham) => {
    console.log(sanPhamList);
    if (!sanPham || !sanPham.giaBan || isNaN(sanPham.giaBan)) {
      console.error("Lỗi: Sản phẩm không hợp lệ hoặc thiếu giá bán!");
      return;
    }

    // Kiểm tra số lượng trong `sanPhamList`
    const sanPhamIndex = sanPhamList.findIndex(
      (sp) => sp.maSanPham === sanPham.maSanPham
    );
    if (
      sanPhamIndex < 0 ||
      (sanPhamList[sanPhamIndex].soLuong !== undefined &&
        sanPhamList[sanPhamIndex].soLuong <= 0)
    ) {
      setSnackbar({
        open: true,
        message: "Sản phẩm không còn đủ số lượng trong kho!",
        type: "error",
      });
      return;
    }

    // Tăng số lượng trong `newChiTietDonHang`
    let found = false;
    const updatedChiTietDonHang = newChiTietDonHang.map((item) => {
      if (item.maSanPham === sanPham.maSanPham) {
        found = true;
        const updatedSoLuong = item.soLuong + 1; // Tăng số lượng
        return {
          ...item,
          soLuong: updatedSoLuong,
          thanhTien: updatedSoLuong * item.donGia, // Cập nhật thanhTien
        };
      }
      return item;
    });

    if (!found) {
      updatedChiTietDonHang.push({
        maSanPham: sanPham.maSanPham,
        soLuong: 1, // Số lượng mặc định
        donGia: sanPham.giaBan,
        thanhTien: sanPham.giaBan,
        trangThai: 1,
        maDonHang: "",
        sanPham: sanPham,
      });
    }

    // Cập nhật `deltaSoLuong` trong `sanPhamList`
    const updatedSanPhamList = sanPhamList.map((sp) =>
      sp.maSanPham === sanPham.maSanPham
        ? {
            ...sp,
            soLuong: sp.soLuong - 1,
            deltaSoLuong: (sp.deltaSoLuong || 0) + 1,
          }
        : sp
    );

    // Cập nhật tổng giá trị đơn hàng
    const updatedTongGia = updatedChiTietDonHang.reduce(
      (total, item) => total + item.thanhTien,
      0
    );

    setNewDonHang((prevValues) => ({
      ...prevValues,
      tongGia: updatedTongGia,
    }));
    setNewChiTietDonHang(updatedChiTietDonHang);
    setSanPhamList(updatedSanPhamList); // Cập nhật danh sách sản phẩm
  };

  const handleRemoveSanPham = (index) => {
    const removedProduct = newChiTietDonHang[index];
    const updatedChiTietDonHang = [...newChiTietDonHang];
    updatedChiTietDonHang.splice(index, 1); // Loại bỏ sản phẩm

    // Cập nhật `deltaSoLuong` trong `sanPhamList`
    const updatedSanPhamList = sanPhamList.map((sp) =>
      sp.maSanPham === removedProduct.maSanPham
        ? {
            ...sp,
            deltaSoLuong: (sp.deltaSoLuong || 0) - removedProduct.soLuong,
          }
        : sp
    );

    // Tính lại tổng giá trị đơn hàng
    const updatedTongGia = updatedChiTietDonHang.reduce(
      (total, item) => total + item.thanhTien,
      0
    );

    setNewDonHang((prevValues) => ({
      ...prevValues,
      tongGia: updatedTongGia,
    }));
    setNewChiTietDonHang(updatedChiTietDonHang);
    setSanPhamList(updatedSanPhamList); // Cập nhật danh sách sản phẩm
  };

  const handleSave = () => {
    const requiredFields = [
      "maKhachHang",
      "ngayDat",
      "trangThaiGiaoHang",
      "phuongThucThanhToan",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newDonHang[field]) {
        newErrors[field] = "Trường này không được để trống";
      }
    });

    if (Object.values(newErrors).length > 0) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập đầy đủ thông tin!",
        type: "error",
      });
      setErrors(newErrors);
      console.log(errors);
      return;
    }

    if (!newChiTietDonHang["tongGia"]) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn thực đơn!",
        type: "error",
      });
      return;
    }

    const updatedSanPhamList = sanPhamList.map((sp) => {
      return {
        ...sp,
        soLuong: sp.deltaSoLuong || 0,
        deltaSoLuong: undefined,
      };
    });

    console.log(updatedSanPhamList);

    if (title === "Sửa Đơn Hàng") {
      onSave({
        donHang: newDonHang,
        chiTietDonHang: newChiTietDonHang,
        sanPhamList: updatedSanPhamList,
      });
    } else {
      onSave(newDonHang, newChiTietDonHang, updatedSanPhamList);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <Typography variant="h5" align="center" style={{ paddingTop: '16px' }}>
        {title}
      </Typography>

      <DialogContent>
        <Grid container spacing={2}>
          {/* Phần 1: Ô nhập liệu */}
          <Grid item xs={12} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Thông Tin Đơn Hàng</Typography>
                <Divider style={{ marginBottom: "16px" }} />

                <FormControl
                  fullWidth
                  margin="dense"
                  error={!!errors.maKhachHang}
                >
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

                <TextField
                  label="Ngày Đặt"
                  name="ngayDat"
                  type="datetime-local"
                  fullWidth
                  margin="dense"
                  value={dayjs(newDonHang.ngayDat).format("YYYY-MM-DDTHH:mm")}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />

                <FormControl
                  fullWidth
                  margin="dense"
                  error={!!errors.trangThaiGiaoHang}
                >
                  <InputLabel>Trạng Thái Giao Hàng</InputLabel>
                  <Select
                    name="trangThaiGiaoHang"
                    value={newDonHang.trangThaiGiaoHang}
                    onChange={handleChange}
                  >
                    <MenuItem value="Đã đặt">Đã Đặt</MenuItem>
                    <MenuItem value="Đã xác nhận">Đã Xác Nhận</MenuItem>
                    <MenuItem value="Đang giao">Đang Giao</MenuItem>
                    <MenuItem value="Đã giao">Đã Giao</MenuItem>
                    <MenuItem value="Đã hủy">Đã Hủy</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Tổng Giá"
                  name="tongGia"
                  fullWidth
                  margin="dense"
                  value={newDonHang.tongGia}
                  disabled
                />

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

                <TextField
                  label="Địa Chỉ Giao Hàng"
                  name="diaChiGiaoHang"
                  fullWidth
                  margin="dense"
                  value={newDonHang.diaChiGiaoHang}
                  onChange={handleChange}
                />

                <TextField
                  label="Ghi Chú"
                  name="ghiChu"
                  fullWidth
                  margin="dense"
                  value={newDonHang.ghiChu}
                  onChange={handleChange}
                  multiline
                  rows={6.4}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Phần 2: Table sản phẩm để chọn */}
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6">Danh Sách Sản Phẩm</Typography>
                <Divider style={{ marginBottom: "16px" }} />

                <TableContainer component={Paper} style={{ maxHeight: 600 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã SP</TableCell>
                        <TableCell>Ảnh</TableCell>
                        <TableCell>Tên Sản Phẩm</TableCell>
                        <TableCell>Đơn Giá</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sanPhamList.map((sanPham) => (
                        <TableRow key={sanPham.maSanPham}>
                          <TableCell>{sanPham.maSanPham}</TableCell>
                          <TableCell>
                            {sanPham.hinhAnh ? (
                              <img
                                src={sanPham.hinhAnh}
                                alt={sanPham.tenSanPham}
                                style={{ width: 80, height: 88 }}
                              />
                            ) : (
                              "Không có ảnh"
                            )}
                          </TableCell>
                          <TableCell>{sanPham.tenSanPham}</TableCell>
                          <TableCell>{sanPham.giaBan}</TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleAddSanPham(sanPham)}
                            >
                              <AddShoppingCartIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Phần 3: Table hiển thị sản phẩm đã chọn */}
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6">Sản Phẩm Đã Chọn</Typography>
                <Divider style={{ marginBottom: "16px" }} />

                <TableContainer component={Paper} style={{ maxHeight: 600 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <strong>Tên Sản Phẩm</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Số Lượng</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>Thành Tiền</strong>
                        </TableCell>
                        <TableCell align="center" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newChiTietDonHang.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">
                            {item.sanPham.tenSanPham}
                          </TableCell>
                          <TableCell align="center">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px", // Khoảng cách giữa các nút
                              }}
                            >
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={() =>
                                  handleQuantityChange(
                                    index,
                                    Math.max(item.soLuong - 1, 1),
                                    item.sanPham
                                  )
                                }
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <TextField
                                type="number"
                                value={item.soLuong}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    index,
                                    Math.max(parseInt(e.target.value) || 1, 1),
                                    item.sanPham
                                  )
                                }
                                variant="standard"
                                InputProps={{
                                  disableUnderline: true,
                                  style: {
                                    textAlign: "center",
                                    width: "48px",
                                    height: "32px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    padding: "4px",
                                  },
                                }}
                                inputProps={{
                                  min: 1,
                                  style: { textAlign: "center" },
                                }}
                              />
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={() =>
                                  handleQuantityChange(
                                    index,
                                    item.soLuong + 1,
                                    item.sanPham
                                  )
                                }
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </div>
                          </TableCell>
                          <TableCell align="center">{item.thanhTien}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="secondary"
                              onClick={() => handleRemoveSanPham(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {donHang ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DonHangDialog;
