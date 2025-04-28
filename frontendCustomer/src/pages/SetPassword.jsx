import React, { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const SetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Mật khẩu mới và xác nhận không khớp.",
        severity: "warning",
      });
      return;
    }

    const khachHang = JSON.parse(localStorage.getItem("taiKhoan"));
    if (!khachHang) {
      setSnackbar({
        open: true,
        message: "Bạn chưa đăng nhập.",
        severity: "error",
      });
      return;
    }

    try {

      const response = await axios.put(`http://localhost:8080/api/taikhoan/set-password/${khachHang.maTaiKhoan}`, {
        maTaiKhoan: khachHang.maTaiKhoan,
        matKhauCu: currentPassword,
        matKhauMoi: newPassword,
      });

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Cập nhật mật khẩu thành công!",
          severity: "success",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data || "Cập nhật mật khẩu thất bại.",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Cập nhật mật khẩu</h1>
        <p className="text-gray-600 mb-6">Vui lòng nhập mật khẩu cũ và mật khẩu mới của bạn.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white">
            Cập nhật
          </button>
        </form>
        <p className="text-gray-500 mt-4 text-sm">Nếu bạn gặp sự cố, vui lòng liên hệ bộ phận hỗ trợ.</p>
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SetPassword;
