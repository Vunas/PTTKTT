import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const NguyenLieuDialog = ({ open, onClose, onSave, title, nguyenLieu }) => {
  const [newNguyenLieu, setNewNguyenLieu] = useState({
    maNguyenLieu: "",
    ten: "",
    donVi: "",
    giaNhap: "",
    soLuong: "",
    hinhAnh: "",
  });

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false); // To track drag state

  useEffect(() => {
    if (nguyenLieu) {
      setNewNguyenLieu(nguyenLieu);
    } else {
      setNewNguyenLieu({
        maNguyenLieu: "",
        ten: "",
        donVi: "",
        giaNhap: "",
        soLuong: "",
        hinhAnh: "",
      });
    }
    setErrors({});
  }, [nguyenLieu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNguyenLieu((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Trường này không được để trống";
    } else if (field === "giaNhap" && isNaN(value)) {
      errorMessage = "Giá nhập phải là số";
    } else if (field === "soLuong" && !/^\d+$/.test(value)) {
      errorMessage = "Số lượng phải là số nguyên";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const handleAdd = () => {
    const requiredFields = ["ten", "donVi", "giaNhap", "soLuong"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!newNguyenLieu[field]) {
        newErrors[field] = "Trường này không được để trống";
      } else {
        validateField(field, newNguyenLieu[field]);
      }
    });

    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    onSave(newNguyenLieu);
    setNewNguyenLieu({
      maNguyenLieu: "",
      ten: "",
      donVi: "",
      giaNhap: "",
      soLuong: "",
      hinhAnh: "",
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
        setNewNguyenLieu((prevValues) => ({
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
              label="Tên"
              name="ten"
              fullWidth
              margin="dense"
              value={newNguyenLieu.ten}
              onChange={handleChange}
              error={!!errors.ten}
              helperText={errors.ten}
            />
            <TextField
              label="Đơn Vị"
              name="donVi"
              fullWidth
              margin="dense"
              value={newNguyenLieu.donVi}
              onChange={handleChange}
              error={!!errors.donVi}
              helperText={errors.donVi}
            />
            <TextField
              label="Giá Nhập"
              name="giaNhap"
              type="number"
              fullWidth
              margin="dense"
              value={newNguyenLieu.giaNhap}
              onChange={handleChange}
              error={!!errors.giaNhap}
              helperText={errors.giaNhap}
            />
            <TextField
              label="Số Lượng"
              name="soLuong"
              type="number"
              fullWidth
              margin="dense"
              value={newNguyenLieu.soLuong}
              onChange={handleChange}
              error={!!errors.soLuong}
              helperText={errors.soLuong}
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
            <br/>
            <div
              className={`w-full h-60 flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md ${
                isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleFileDrop}
            >
              <p>{isDragging ? "Thả tệp tại đây..." : "Kéo thả tệp vào đây"}</p>
              {newNguyenLieu.hinhAnh && (
                <img
                  src={newNguyenLieu.hinhAnh}
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
          {nguyenLieu ? "Lưu Thay Đổi" : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NguyenLieuDialog;
