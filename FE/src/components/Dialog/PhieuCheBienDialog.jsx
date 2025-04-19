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
import { Grid } from "@mui/material";
import exportPhieuCheBienPDF from "../../Hook/ExportPhieuCheBienPDF";

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
                hinhAnh: chiTiet.sanPham.hinhAnh,
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
    // Tạo một Set chứa maSanPham của các sản phẩm vừa được chọn
    const selectedMaSanPhams = new Set(products.map((p) => p.maSanPham));

    // Lọc ra những sản phẩm đã chọn trước đó mà vẫn còn trong danh sách mới
    const updatedProducts = selectedProducts.filter((p) =>
      selectedMaSanPhams.has(p.maSanPham)
    );

    // Thêm hoặc cập nhật số lượng cho các sản phẩm mới
    products.forEach((newProduct) => {
      const existingIndex = updatedProducts.findIndex(
        (p) => p.maSanPham === newProduct.maSanPham
      );

      if (existingIndex > -1) {
        // Cập nhật số lượng nếu sản phẩm đã tồn tại
        updatedProducts[existingIndex].soLuong = newProduct.soLuong;
      } else {
        // Thêm sản phẩm mới nếu chưa tồn tại
        updatedProducts.push(newProduct);
      }
    });

    setSelectedProducts(updatedProducts);
  };

  const handleExportPDF = () => {
    exportPhieuCheBienPDF(newCheBien, selectedProducts, ingredientList);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {cheBien ? "Xem Phiếu Chế Biến" : "Tạo Phiếu Chế Biến"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Phần 1: Sản phẩm đã chọn */}
          <Grid item xs={6}>
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sản Phẩm Đã Chọn
            </Typography>
            {selectedProducts.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Sản Phẩm</TableCell>
                    <TableCell>Hình Ảnh</TableCell>
                    <TableCell>Số Lượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.maSanPham}>
                      <TableCell>{product.tenSanPham}</TableCell>
                      <TableCell>
                        <img
                          src={product.hinhAnh}
                          alt={product.ten}
                          style={{ width: 80, height: 88 }}
                        />
                      </TableCell>
                      <TableCell>{product.soLuong}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Grid>

          {/* Phần 2: Nguyên liệu cần */}
          <Grid item xs={6}>
            <br />
            <br />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Danh Sách Nguyên Liệu Cần
            </Typography>
            {ingredientList.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Nguyên Liệu</TableCell>
                    <TableCell>Hình Ảnh</TableCell>
                    <TableCell>Số Lượng Cần</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredientList.map((ingredient) => (
                    <TableRow key={ingredient.maNguyenLieu}>
                      <TableCell>{ingredient.ten}</TableCell>
                      <TableCell>
                        <img
                          src={ingredient.hinhAnh}
                          alt={ingredient.ten}
                          style={{ width: 80, height: 88 }}
                        />
                      </TableCell>
                      <TableCell>{ingredient.soLuong}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Grid>
        </Grid>
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
        {(cheBien || selectedProducts.length > 0) &&
          ingredientList.length > 0 && (
            <Button
              onClick={handleExportPDF}
              variant="contained"
              color="secondary"
            >
              Xuất PDF
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
