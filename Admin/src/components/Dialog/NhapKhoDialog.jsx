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
import NhapNguyenLieuDialog from "./NhapNguyenLieuDialog";
import NhapNhaCungCapDialog from "./NhapNhaCungCapDialog";
import { Snackbar, Alert } from "@mui/material";
import NhaCungCap from "../../pages/admin/NhaCungCap";
import NhapKhoHangDialog from "./NhapKhoHangDialog";

export default function AddImportDialog({ open, onClose }) {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [paymentRecorded, setPaymentRecorded] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);
  const [filteredIngredients, setFilteredIngredients] =
    useState(selectedIngredients);

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(selectedSupplier);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [warehouseDialogOpen, setWareHouseDialogOpen] = useState(false);
  const [filteredWarehouse, setFilteredWarehouse] = useState(selectedWarehouse);

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [tenPhieuInput, setTenPhieuInput] = useState("");
  const [maPhieuInput, setMaPhieuInput] = useState("");

  const handleOrder = async (trangThai = "DAT_HANG") => {
    if (!selectedSupplier || selectedIngredients.length === 0) {
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

    const phieuNhap = {
      maPhieu: maPhieuInput,
      tenPhieu: tenPhieuInput,
      fileChungTu: file?.name || null,
      ghiChu: note,
      nhaCungCap: { maNhaCungCap: selectedSupplier[0].maNhaCungCap },
      khoHang: selectedWarehouse[0],
      trangThai,
      thoiGianTao: new Date().toISOString(),
      thoiGianCapNhat: null,
      thoiGianHuy: null,
      nguoiNhap: {
        maNhanVien: 1, // hoặc id, tùy theo thuộc tính bạn dùng trong entity NhanVien
      },
      nguoiHuy: null,
    };

    try {
      const response = await fetch("http://localhost:8080/api/phieu-nhap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(phieuNhap),
      });

      // Kiểm tra nếu phản hồi không thành công
      if (!response.ok) {
        throw new Error("Tạo phiếu nhập thất bại");
      }

      // Nhận thông tin phiếu nhập đã tạo từ phản hồi
      const createdPhieuNhap = await response.json();

      // Kiểm tra xem createdPhieuNhap có hợp lệ không
      if (!createdPhieuNhap || !createdPhieuNhap.id) {
        throw new Error("Dữ liệu phiếu nhập không hợp lệ.");
      }

      // Thêm chi tiết phiếu nhập
      await Promise.all(
        selectedIngredients.map(async (item) => {
          const chiTietPhieuNhap = {
            phieuNhap: createdPhieuNhap,
            nguyenLieu: { maNguyenLieu: item.maNguyenLieu },
            soLuong: item.soLuong,
            giaNhap: item.giaNhap,
          };

          const chiTietResponse = await fetch(
            "http://localhost:8080/api/chi-tiet-phieu-nhap",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(chiTietPhieuNhap),
            }
          );

          if (!chiTietResponse.ok) {
            throw new Error("Thêm chi tiết phiếu nhập thất bại");
          }
        })
      );

      const params = new URLSearchParams();
      params.append("trangThai", phieuNhap.trangThai);
      params.append("nguoiNhapId", phieuNhap.nguoiNhap?.maNhanVien);

      if (phieuNhap.nguoiHuy?.maNhanVien) {
        params.append("nguoiHuyId", phieuNhap.nguoiHuy.maNhanVien);
      }

      if (createdPhieuNhap.trangThai === "NHAP_KHO") {
        const khoResponse = await fetch(
          `http://localhost:8080/api/phieu-nhap/${createdPhieuNhap.id}/trang-thai?${params.toString()}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!khoResponse.ok) {
          throw new Error("Cập nhật kho thất bại");
        }
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
    setFilteredSuppliers(selectedSupplier);
  }, [selectedSupplier]);

  useEffect(() => {
    setFilteredWarehouse(selectedWarehouse);
  }, [selectedWarehouse]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIngredientsDialogConfirm = (selected) => {
    setSelectedIngredients(selected);
  };

  const handleSuppliersDialogConfirm = (selected) => {
    setSelectedSupplier(selected);
  };

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

  const tongCong = filteredIngredients.reduce((tong, item) => {
    return tong + item.soLuong * item.giaNhap;
  }, 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="text-xl font-semibold">
        Thêm mới phiếu nhập
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
            <p className="text-lg font-semibold mb-4 mt-6">Nhà cung cấp</p>
          </div>

          <div className="flex items-center gap-8 mb-4 justify-end">
            <Button
              onClick={() => setSupplierDialogOpen(true)}
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", px: "1rem", py: "1rem" }}
            >
              Nhập nhà cung cấp
            </Button>
          </div>

          <Paper variant="outlined">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Mã nhà cung cấp</TableCell>
                  <TableCell>Tên nhà cung cấp</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Không có nhà cung cấp nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((item, index) => (
                    <TableRow key={item.maNhaCungCap}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.tenNhaCungCap}</TableCell>
                      <TableCell>{item.soDienThoai}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.diaChi}</TableCell>
                      <TableCell>{item.ngayTao}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>

          <div className="justify-center items-center flex">
            <p className="text-lg font-semibold mb-4 mt-6">Kho Hàng</p>
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
              Nhập nguyên liệu
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
                  <TableCell>Đơn giá</TableCell>
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
                  filteredIngredients.map((item, index) => (
                    <TableRow key={item.maNguyenLieu}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.ten}</TableCell>
                      <TableCell>{item.donVi}</TableCell>
                      <TableCell>{item.soLuong}</TableCell>
                      <TableCell>{item.giaNhap.toLocaleString()} đ</TableCell>
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

          <div className="flex mt-4 items-end justify-end">
            <p className="font-semibold text-xl text-green-700">
              TỔNG CỘNG: {tongCong.toLocaleString("vi-VN")} đ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Typography>Ghi nhận thanh toán</Typography>
          <Switch
            checked={paymentRecorded}
            onChange={(e) => setPaymentRecorded(e.target.checked)}
          />
        </div>

        <TextField
          label="Ghi chú"
          placeholder="Nhập ghi chú"
          fullWidth
          multiline
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="outlined" onClick={() => handleOrder("DAT_HANG")}>
          Đặt hàng
        </Button>
        <Button variant="contained" onClick={() => handleOrder("NHAP_KHO")}>
          Đặt hàng & Nhập kho
        </Button>
      </DialogActions>

      <NhapNguyenLieuDialog
        open={ingredientDialogOpen}
        onClose={() => setIngredientDialogOpen(false)}
        onConfirm={handleIngredientsDialogConfirm}
        defaultSelected={selectedIngredients}
      />

      <NhapNhaCungCapDialog
        open={supplierDialogOpen}
        onClose={() => setSupplierDialogOpen(false)}
        onConfirm={handleSuppliersDialogConfirm}
        defaultSelected={selectedSupplier}
      />
      <NhapKhoHangDialog
        open={warehouseDialogOpen}
        onClose={() => setWareHouseDialogOpen(false)}
        onConfirm={handleWarehouseDialogConfirm}
        defaultSelected={selectedWarehouse}
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
