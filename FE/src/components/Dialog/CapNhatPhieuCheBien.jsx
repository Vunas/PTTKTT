import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import NhapSanPhamDialog from "./NhapSanPhamDialog";
import { Snackbar, Alert } from "@mui/material";

export default function PhieuCheBienDialog({ open, onClose }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [tenPhieuInput, setTenPhieuInput] = useState("");
  const [maPhieuInput, setMaPhieuInput] = useState("");

  useEffect(() => {
    console.log(selectedProducts);
    if (selectedProducts.length > 0) {
        fetch("http://localhost:8080/api/chebien/nguyenlieu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedProducts),
        })
          .then((response) => response.json())
          .then((data) => setIngredientList(data))
          .catch((error) => console.error("Lỗi:", error));
      }
    }, [selectedProducts]);

  const handleConfirm = async () => {
    if (selectedProducts.length === 0) {
      setErrorMessage("Vui lòng chọn ít nhất một sản phẩm.");
      setShowError(true);
      return;
    }

    const phieuCheBien = {
      maPhieu: maPhieuInput,
      tenPhieu: tenPhieuInput,
      ghiChu: note,
      trangThai: "DANG_CHE_BIEN",
      thoiGianTao: new Date().toISOString(),
      nguoiCheBien: { maNhanVien: 1 },
    };

    try {
      let response = await fetch("http://localhost:8080/api/phieu-chebien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(phieuCheBien),
      });

      if (!response.ok) {
        throw new Error("Tạo phiếu chế biến thất bại.");
      }

      const newPhieuCheBien = await response.json();

      const chiTietList = ingredientList.map((item) => ({
        phieuCheBien: { id: newPhieuCheBien.id },
        nguyenLieu: { maNguyenLieu: item.maNguyenLieu },
        soLuong: item.soLuongNguyenLieu,
      }));

      response = await fetch("http://localhost:8080/api/chi-tiet-chebien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chiTietList),
      });

      if (!response.ok) {
        throw new Error("Tạo chi tiết phiếu chế biến thất bại.");
      }

      onClose();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="text-xl font-semibold">Thêm mới phiếu chế biến</DialogTitle>
      <DialogContent className="space-y-6">
        <TextField label="Mã Phiếu" fullWidth margin="dense" value={maPhieuInput} onChange={(e) => setMaPhieuInput(e.target.value)} disabled/>
        <TextField label="Tên Phiếu" fullWidth margin="dense" value={tenPhieuInput} onChange={(e) => setTenPhieuInput(e.target.value)}/>
        <TextField label="Ghi Chú" fullWidth margin="dense" multiline rows={3} value={note} onChange={(e) => setNote(e.target.value)}/>

        <Button variant="contained" color="primary" onClick={() => setProductDialogOpen(true)}>
          Chọn Sản Phẩm
        </Button>

        {selectedProducts.length > 0 && (
          <Paper variant="outlined">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Tên Sản Phẩm</TableCell>
                  <TableCell>Số Lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map((product) => (
                  <TableRow key={product.maSanPham}>
                    <TableCell>{product.tenSanPham}</TableCell>
                    <TableCell>{product.soLuong}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        {ingredientList.length > 0 && (
          <Paper variant="outlined">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Tên Nguyên Liệu</TableCell>
                  <TableCell>Số Lượng Cần</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredientList.map((ingredient) => (
                  <TableRow key={ingredient.maNguyenLieu}>
                    <TableCell>{ingredient.ten}</TableCell>
                    <TableCell>{ingredient.soLuongNguyenLieu}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleConfirm}>Xác nhận</Button>
      </DialogActions>

      <Snackbar open={showError} autoHideDuration={4000} onClose={() => setShowError(false)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      <NhapSanPhamDialog open={productDialogOpen} onClose={() => setProductDialogOpen(false)} onConfirm={(selected) => setSelectedProducts(selected)} defaultSelected={selectedProducts}/>
    </Dialog>
  );
}