import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import NhapNguyenLieuDialog from "./NhapNguyenLieuDialog";

const SanPhamDialog = ({ open, onClose, onSave, title, sanPham   }) => {
  const [newSanPham, setNewSanPham] = useState({
    maSanPham: "",
    tenSanPham: "",
    giaSanXuat: "",
    giaBan: "",
    soLuong: "",
    hinhAnh: "",
    moTa: "",
  });

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false); // To track drag state
  const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);

  useEffect(() => {
    if (sanPham) {
      setNewSanPham(sanPham);

      // Gọi API để lấy danh sách nguyên liệu nếu có sản phẩm
      fetch(`http://localhost:8080/api/sanpham/${sanPham.maSanPham}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.chiTietNguyenLieu) {
            console.log(data.chiTietNguyenLieu);
            // Chuyển danh sách chi tiết nguyên liệu thành danh sách nguyên liệu đúng cú pháp
            const formattedIngredients = data.chiTietNguyenLieu.map((chiTiet) => ({
              maNguyenLieu: chiTiet.nguyenLieu.maNguyenLieu, 
              ten: chiTiet.nguyenLieu.ten, 
              donVi: chiTiet.nguyenLieu.donVi,
              giaNhap: chiTiet.nguyenLieu.giaNhap,
              hinhAnh: chiTiet.nguyenLieu.hinhAnh,
              soLuong: chiTiet.soLuongNguyenLieu
            }));

            setSelectedIngredients(formattedIngredients);
          }
        })
        .catch((error) => console.error("Lỗi khi tải nguyên liệu:", error));
    } else {
      setSelectedIngredients([]);
      setNewSanPham({
        maSanPham: "",
        tenSanPham: "",
        giaSanXuat: "",
        giaBan: "",
        soLuong: "",
        hinhAnh: "",
        moTa: "",
      });
    }
    setErrors({});
}, [sanPham]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] =
    useState(selectedIngredients);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSanPham((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Trường này không được để trống";
    } else if (field === "giaSanXuat" && isNaN(value)) {
      errorMessage = "Giá sản xuất phải là số";
    } else if (field === "giaBan" && isNaN(value)) {
      errorMessage = "Giá bán phải là số";
    } else if (field === "soLuong" && !/^\d+$/.test(value)) {
      errorMessage = "Số lượng phải là số nguyên";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleAdd = () => {
    const requiredFields = ["tenSanPham", "giaSanXuat", "giaBan"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newSanPham[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newSanPham[field]);
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      sanPham: newSanPham,
      chiTietNguyenLieu: selectedIngredients.map((ingredient) => ({
        nguyenLieu: {
          maNguyenLieu: ingredient.maNguyenLieu 
        },
        soLuongNguyenLieu: ingredient.soLuong,
      })),
    };

    console.log(payload);

    onSave(payload);
    setNewSanPham({
      maSanPham: "",
      tenSanPham: "",
      giaSanXuat: "",
      giaBan: "",
      soLuong: "",
      hinhAnh: "",
      moTa: "",
    });
    setSelectedIngredients([]);
    onClose();
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:8080/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        setNewSanPham((prevValues) => ({
          ...prevValues,
          hinhAnh: data,
        }));
      })
      .catch((error) => console.error("Lỗi khi upload ảnh:", error));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    setFilteredIngredients(selectedIngredients);
  }, [selectedIngredients]);

  const handleSearchIngredients = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredIngredients = selectedIngredients.filter((ingredient) =>
      ingredient.ten.toLowerCase().trim().includes(query)
    );
    setFilteredIngredients(filteredIngredients);
  };

  const handleIngredientsDialogConfirm = (selected) => {
    console.log(selectedIngredients);
    setSelectedIngredients(selected);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div className="flex">
          {/* Left Side: Input Fields and Image */}
          <div className="flex-1 pr-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="mb-2 w-full"
            />
            {/* Drag-and-Drop Area */}
            <div
              className={`w-full h-60 flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md mb-4 ${
                isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleFileDrop}
            >
              <p>{isDragging ? "Thả tệp tại đây..." : "Kéo thả tệp vào đây"}</p>
              {newSanPham.hinhAnh && (
                <img
                  src={newSanPham.hinhAnh}
                  alt="Preview"
                  className="mt-4 max-w-full h-auto rounded-lg shadow-lg"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
            <TextField
              label="Tên Sản Phẩm"
              name="tenSanPham"
              fullWidth
              margin="dense"
              value={newSanPham.tenSanPham}
              onChange={handleChange}
              error={!!errors.tenSanPham}
              helperText={errors.tenSanPham}
            />
            <TextField
              label="Giá Sản Xuất"
              name="giaSanXuat"
              type="number"
              fullWidth
              margin="dense"
              value={newSanPham.giaSanXuat}
              onChange={handleChange}
              error={!!errors.giaSanXuat}
              helperText={errors.giaSanXuat}
            />
            <TextField
              label="Giá Bán"
              name="giaBan"
              type="number"
              fullWidth
              margin="dense"
              value={newSanPham.giaBan}
              onChange={handleChange}
              error={!!errors.giaBan}
              helperText={errors.giaBan}
            />
            <TextField
              label="Số Lượng"
              name="soLuong"
              type="number"
              fullWidth
              margin="dense"
              value={newSanPham.soLuong}
              onChange={handleChange}
              error={!!errors.soLuong}
              helperText={errors.soLuong}
            />
            <TextField
              label="Mô Tả"
              name="moTa"
              fullWidth
              margin="dense"
              multiline
              rows={4}
              value={newSanPham.moTa}
              onChange={handleChange}
            />
          </div>

          {/* Right Side: Ingredients Table */}
          <div className="flex-1 pl-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-semibold">Nguyên liệu</p>
              <Button
                onClick={() => setIngredientDialogOpen(true)}
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", px: "1rem", py: "0.5rem" }}
              >
                Nhập nguyên liệu
              </Button>
            </div>
            <TextField
              placeholder="Tìm nguyên liệu"
              fullWidth
              margin="dense"
              onChange={handleSearchIngredients}
            />
            <Paper variant="outlined" className="mt-2">
              <Table size="small">
                <TableHead className="bg-gray-100">
                  <TableRow>
                    <TableCell>STT</TableCell>
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
                        <TableCell>
                          {item.giaNhap?.toLocaleString()} đ
                        </TableCell>
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          {sanPham ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>

      <NhapNguyenLieuDialog
        open={ingredientDialogOpen}
        onClose={() => setIngredientDialogOpen(false)}
        onConfirm={handleIngredientsDialogConfirm}
        defaultSelected={selectedIngredients}
      />
    </Dialog>
  );
};

export default SanPhamDialog;
