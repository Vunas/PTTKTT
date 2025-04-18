import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from "@mui/material";
import NhapSanPhamDialog from "./NhapSanPhamDialog";

export default function PhieuCheBienDialog({ open, onClose, cheBien }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [newCheBien, setNewCheBien] = useState({
    maCheBien: "",
    ngayCheBien: new Date().toISOString().slice(0, 16), // Giá trị mặc định cho ngày chế biến
    nguoiCheBien: "",
  });

  useEffect(() => {
    if (cheBien) {
      setNewCheBien(cheBien);

      // Gọi API để lấy danh sách chi tiết chế biến (bao gồm cả sản phẩm và số lượng)
      fetch(`http://localhost:8080/api/chebien/${cheBien.maCheBien}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.chiTietCheBienList) {
            // Chuyển đổi danh sách chi tiết chế biến thành danh sách sản phẩm đã chọn
            const formattedSelectedProducts = data.chiTietCheBienList.map(
              (chiTiet) => ({
                maSanPham: chiTiet.sanPham.maSanPham, // Đảm bảo có maSanPham
                tenSanPham: chiTiet.sanPham.tenSanPham, // Đảm bảo có tenSanPham
                soLuong: chiTiet.soLuongSanPham,
              })
            );
            setSelectedProducts(formattedSelectedProducts);
          }
        })
        .catch((error) =>
          console.error("Lỗi khi tải chi tiết chế biến:", error)
        );
    } else {
      // Reset state khi mở dialog để tạo mới
      setSelectedProducts([]);
      setNewCheBien({
        maCheBien: "",
        ngayCheBien: new Date().toISOString().slice(0, 16),
        nguoiCheBien: "",
      });
    }
  }, [cheBien]);

  useEffect(() => {
    // Gọi API lấy nguyên liệu dựa trên danh sách sản phẩm đã chọn
    if (selectedProducts.length > 0) {
      const requestBody = selectedProducts.map((product) => ({
        maSanPham: product.maSanPham,
        soLuong: product.soLuong,
      }));
      fetch("http://localhost:8080/api/chebien/nguyenlieu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => setIngredientList(data))
        .catch((error) => console.error("Lỗi khi tải nguyên liệu:", error));
    } else {
      setIngredientList([]); // Reset danh sách nguyên liệu khi không có sản phẩm nào được chọn
    }
  }, [selectedProducts]);

  const handleConfirm = async () => {
    if (selectedProducts.length === 0) {
      setErrorMessage("Vui lòng chọn ít nhất một sản phẩm.");
      setShowError(true);
      return;
    }

    // Tạo đối tượng gửi đi theo đúng định dạng API
    const cheBienDTO = {
      cheBien: {
        maCheBien: newCheBien.maCheBien,
        ngayCheBien: newCheBien.ngayCheBien,
        nguoiCheBien: newCheBien.nguoiCheBien
          ? newCheBien.nguoiCheBien
          : { maNhanVien: 1 },
      },
      chiTietCheBienList: selectedProducts.map((product) => ({
        sanPham: { maSanPham: product.maSanPham },
        soLuongSanPham: product.soLuong,
      })),
    };

    console.log("Dữ liệu gửi đi:", cheBienDTO);

    try {
      let response = await fetch("http://localhost:8080/api/chebien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cheBienDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Tạo phiếu chế biến thất bại.");
      }

      onClose();
      // Có thể gọi một callback để thông báo cho component cha về việc tạo mới thành công
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const handleProductSelect = (products) => {
    // Cập nhật danh sách sản phẩm đã chọn, đảm bảo không có sản phẩm trùng lặp
    const uniqueProducts = products.filter(
      (newProduct) =>
        !selectedProducts.some(
          (existingProduct) =>
            existingProduct.maSanPham === newProduct.maSanPham
        )
    );
    setSelectedProducts([...selectedProducts, ...uniqueProducts]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {cheBien ? "Xem Phiếu Chế Biến" : "Tạo Phiếu Chế Biến"}
      </DialogTitle>
      <DialogContent dividers>
        {cheBien === null && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setProductDialogOpen(true)}
            sx={{ mb: 2 }}
          >
            Chọn Sản Phẩm
          </Button>
        )}

        {selectedProducts.length > 0 && (
          <Table sx={{ mb: 2 }}>
            <TableHead>
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
        )}

        {ingredientList.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Danh Sách Nguyên Liệu
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Nguyên Liệu</TableCell>
                  <TableCell>Số Lượng Cần</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredientList.map((ingredient) => (
                  <TableRow key={ingredient.maNguyenLieu}>
                    <TableCell>{ingredient.ten}</TableCell>
                    <TableCell>{ingredient.soLuong}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        {cheBien === null && (
          <Button onClick={handleConfirm} variant="contained">
            Xác nhận
          </Button>
        )}
      </DialogActions>

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      <NhapSanPhamDialog
        open={productDialogOpen}
        onClose={() => setProductDialogOpen(false)}
        onConfirm={handleProductSelect}
        defaultSelected={selectedProducts}
      />
    </Dialog>
  );
}
