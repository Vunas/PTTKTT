import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const SanPhamDialog = ({ open, onClose, onSave, title, sanPham }) => {
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

  useEffect(() => {
    if (sanPham) {
      setNewSanPham(sanPham);
    } else {
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
    const requiredFields = ["tenSanPham", "giaSanXuat", "giaBan", "soLuong"];
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

    onSave(newSanPham);
    setNewSanPham({
      maSanPham: "",
      tenSanPham: "",
      giaSanXuat: "",
      giaBan: "",
      soLuong: "",
      hinhAnh: "",
      moTa: "",
    });
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
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
              value={newSanPham.moTa}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1 flex flex-col items-center">
            {/* Drag-and-Drop Area */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="mt-2"
            />
            <br />
            <div
              className={`w-full h-60 flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md ${
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
    </Dialog>
  );
};

export default SanPhamDialog;
