import React, { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [tenTaiKhoan, setTenTaiKhoan] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (matKhau !== xacNhanMatKhau) {
      setSnackbar({
        open: true,
        message: "Mật khẩu và xác nhận không khớp.",
        severity: "warning",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/taikhoan", {
        tenDangNhap: tenTaiKhoan,
        email,
        matKhau,
        maPhanQuyen: 1,
      });

      if (response.status === 200 || response.status === 201) {
        setSnackbar({
          open: true,
          message: "Đăng ký thành công! Hãy đăng nhập.",
          severity: "success",
        });
        // Reset form
        setTenTaiKhoan("");
        setEmail("");
        setMatKhau("");
        setXacNhanMatKhau("");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data || "Đăng ký thất bại. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Đăng ký tài khoản</h1>
        <p className="text-gray-600 mb-6">Vui lòng điền thông tin để tạo tài khoản mới.</p>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tenTaiKhoan}
            onChange={(e) => setTenTaiKhoan(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={xacNhanMatKhau}
            onChange={(e) => setXacNhanMatKhau(e.target.value)}
            required
          />
          <button type="submit" className="w-full px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white">
            Đăng ký
          </button>
        </form>
        
        <div className="mt-8">
          <Link to="/signIn" className="text-gray-500 mt-4 text-sm">Bạn đã có tài khoản? Hãy đăng nhập!</Link>
        </div>
        
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
