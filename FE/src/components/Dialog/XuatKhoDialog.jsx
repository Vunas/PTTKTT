import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import XuatNguyenLieuDialog from "./XuatNguyenLieuDialog";
import { Snackbar, Alert } from "@mui/material";
import NhaCungCap from "../../pages/admin/NhaCungCap";
import NhapKhoHangDialog from "./NhapKhoHangDialog";

export default function AddImportDialog({ open, onClose }) {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const [warehouseDialogOpen, setWareHouseDialogOpen] = useState(false);
  const [filteredWarehouse, setFilteredWarehouse] = useState(selectedWarehouse);

  // const [paymentRecorded, setPaymentRecorded] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);
  const [filteredIngredients, setFilteredIngredients] =
    useState(selectedIngredients);

  // const [selectedSupplier, setSelectedSupplier] = useState("");
  // const [filteredSuppliers, setFilteredSuppliers] = useState(selectedSupplier);
  // const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [tenPhieuInput, setTenPhieuInput] = useState("");
  const [maPhieuInput, setMaPhieuInput] = useState("");

  const handleOrder = async (trangThai = "") => {
    if (selectedIngredients.length === 0) {
      setErrorMessage("Vui lòng chọn đầy đủ nhà cung cấp và nguyên liệu.");
      setShowError(true);
      return;
    }

    if (!selectedWarehouse || selectedWarehouse.length === 0) {
      setErrorMessage("Vui lòng chọn kho hàng.");
      setShowError(true);
      return;
    }

    const hasInvalidQty = selectedIngredients.some(
      (item) => !item.soLuong || item.soLuong <= 0
    );
    if (hasInvalidQty) {
      setErrorMessage("Số lượng nguyên liệu phải lớn hơn 0.");
      setShowError(true);
      return;
    }

    const tonKhoDTO = {
      khoHang: selectedWarehouse[0],
      nguyenLieuList: selectedIngredients,
    };


    const phieuXuat = {
      maPhieu: maPhieuInput,
      tenPhieu: tenPhieuInput,
      khoHang: selectedWarehouse[0],
      fileChungTu: file?.name || null,
      ghiChu: note,
      trangThai,
      thoiGianTao: new Date().toISOString(),
      nguoiXuat: {
        maNhanVien: 1, // hoặc id, tùy theo thuộc tính bạn dùng trong entity NhanVien
      },
    };

    try {
      const responseTonKho = await fetch("http://localhost:8080/api/tonkho/check-update-ton-kho", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tonKhoDTO),
      });

      if (!responseTonKho.ok) {
        throw new Error("Số lượng tôn kho không đủ hoặc bị lỗi ");
      }

      const response = await fetch("http://localhost:8080/api/phieu-xuat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(phieuXuat),
      });

      // Kiểm tra nếu phản hồi không thành công
      if (!response.ok) {
        throw new Error("Tạo phiếu xuất thất bại");
      }

      // Nhận thông tin phiếu xuất đã tạo từ phản hồi
      const createdPhieuXuat = await response.json();

      // Kiểm tra xem createdPhieuXuat có hợp lệ không
      if (!createdPhieuXuat || !createdPhieuXuat.id) {
        throw new Error("Dữ liệu phiếu xuất không hợp lệ.");
      }

      // Thêm chi tiết phiếu xuất
      await Promise.all(
        selectedIngredients.map(async (item) => {
          const chiTietPhieuXuat = {
            phieuXuat: { id: createdPhieuXuat.id },
            nguyenLieu: { maNguyenLieu: item.maNguyenLieu },
            soLuong: item.soLuong,
          };

          const chiTietResponse = await fetch(
            "http://localhost:8080/api/chi-tiet-phieu-xuat",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(chiTietPhieuXuat),
            }
          );

          if (!chiTietResponse.ok) {
            throw new Error("Thêm chi tiết phiếu xuất thất bại");
          }
        })
      );

      const params = new URLSearchParams();
      params.append("trangThai", phieuXuat.trangThai);
      params.append("nguoiXuatId", phieuXuat.nguoiXuat?.maNhanVien);

      const khoResponse = await fetch(
        `http://localhost:8080/api/phieu-xuat/xuat-kho/${createdPhieuXuat.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!khoResponse.ok) {
        const errorData = await khoResponse.json(); // Parse JSON body
        throw new Error(errorData.message || "Lỗi không xác định"); // Lấy message từ backend
      }

      onClose(); // Đóng modal sau khi hoàn tất
    } catch (error) {
      setErrorMessage(`Lỗi: ${error.message}`);
      setShowError(true);
    }
  };

  useEffect(() => {
    setFilteredIngredients(selectedIngredients);
  }, [selectedIngredients]);

  useEffect(() => {
    setFilteredWarehouse(selectedWarehouse);
  }, [selectedWarehouse]);

  // useEffect(() => {
  //   setFilteredSuppliers(selectedSupplier);
  // }, [selectedSupplier]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIngredientsDialogConfirm = (selected) => {
    setSelectedIngredients(selected);
  };

  // const handleSuppliersDialogConfirm = (selected) => {
  //   setSelectedSupplier(selected);
  // };

  const handleWarehouseDialogConfirm = (selected) => {
    setSelectedWarehouse(selected);
  };

  const handleSearchIngredients = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredIngredients = selectedIngredients.filter((ingredient) =>
      ingredient.ten.toLowerCase().trim().includes(query)
    );
    setFilteredIngredients(filteredIngredients);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="text-xl font-semibold">
        Thêm mới phiếu xuất
      </DialogTitle>
      <DialogContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 flex-grow mt-3">
          <TextField
            label="Mã phiếu"
            value={maPhieuInput}
            onChange={(e) => setMaPhieuInput(e.target.value)}
          />
          <TextField
            label="Tên phiếu"
            value={tenPhieuInput}
            onChange={(e) => setTenPhieuInput(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
            >
              Tải file chứng từ
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {file && <Typography className="text-sm">{file.name}</Typography>}
          </div>
        </div>

        <div>
          <div className="justify-center items-center flex">
            <p className="text-lg font-semibold mb-4 mt-6 pt-8">Kho Hàng</p>
          </div>

          <div className="flex items-center gap-8 mb-4 justify-end">
            <Button
              onClick={() => setWareHouseDialogOpen(true)}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", px: "1rem", py: "1rem" }}
            >
              Nhập Kho Hàng
            </Button>
          </div>

          <Paper variant="outlined">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Mã Kho Hàng</TableCell>
                  <TableCell>Tên Kho Hàng</TableCell>
                  <TableCell>Địa Điẻm</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredWarehouse.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Không có kho hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWarehouse.map((item) => (
                    <TableRow key={item.maKhoHang}>
                      <TableCell>{item.maKhoHang}</TableCell>
                      <TableCell>{item.tenKhoHang}</TableCell>
                      <TableCell>{item.diaDiem}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>

          <div className="justify-center items-center flex">
            <p className="text-lg font-semibold mb-4 mt-6 pt-8">Nguyên liệu</p>
          </div>

          <div className="flex gap-8 mb-4 justify-end">
            <TextField
              placeholder="Tìm nguyên liệu"
              className="flex-grow"
              onChange={(e) => {
                handleSearchIngredients(e);
              }}
            />
            <Button
              onClick={() => setIngredientDialogOpen(true)}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", px: "1rem", py: "1rem" }}
            >
              Xuất nguyên liệu
            </Button>
          </div>

          <Paper variant="outlined">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Mã nguyên liệu</TableCell>
                  <TableCell>Tên nguyên liệu</TableCell>
                  <TableCell>Đơn vị</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Hình ảnh</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredIngredients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Không có nguyên liệu nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIngredients.map((item) => (
                    <TableRow key={item.maNguyenLieu}>
                      <TableCell>{item.maNguyenLieu}</TableCell>
                      <TableCell>{item.ten}</TableCell>
                      <TableCell>{item.donVi}</TableCell>
                      <TableCell>{item.soLuong}</TableCell>
                      <TableCell>
                        <img
                          src={item.hinhAnh}
                          alt={item.ten}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </div>

        <TextField
          label="Ghi chú"
          placeholder="Xuất ghi chú"
          fullWidth
          multiline
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={() => handleOrder("")}>
          Xuất kho
        </Button>
      </DialogActions>

      <NhapKhoHangDialog
        open={warehouseDialogOpen}
        onClose={() => setWareHouseDialogOpen(false)}
        onConfirm={handleWarehouseDialogConfirm}
        defaultSelected={selectedWarehouse}
      />

      <XuatNguyenLieuDialog
        open={ingredientDialogOpen}
        onClose={() => setIngredientDialogOpen(false)}
        onConfirm={handleIngredientsDialogConfirm}
        defaultSelected={selectedIngredients}
      />

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
