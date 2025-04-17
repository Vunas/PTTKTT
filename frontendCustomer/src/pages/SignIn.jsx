import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; //  dùng hook navigate

const clientId = "1041605160701-9q21rn06djjtsdlck5ks2mur96eckti0.apps.googleusercontent.com";

const LoginKhachHang = ({ setIsLoggedIn }) => {
  const [tenTaiKhoan, setUsername] = useState("");
  const [matKhau, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate(); //  hook để chuyển trang

  useEffect(() => {
    const user = localStorage.getItem("khachHang");
    if (user) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login-customer-account", {
        username: tenTaiKhoan,
        password: matKhau,
      });
      if (response.status === 200) {
        localStorage.setItem("taiKhoan", JSON.stringify(response.data));
        setSnackbar({
          open: true,
          message: "Đăng nhập thành công!",
          severity: "success",
        });
        setIsLoggedIn(true);
        navigate("/"); //  điều hướng sau khi đăng nhập
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response ? `Lỗi: ${error.response.data}` : "Đăng nhập thất bại. Vui lòng thử lại!",
        severity: "error",
      });
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      if (!token) {
        setSnackbar({
          open: true,
          message: "Không nhận được token từ Google.",
          severity: "error",
        });
        return;
      }

      const response = await axios.post("http://localhost:8080/api/login-customer", { token });
      if (response.status === 200) {
        localStorage.setItem("taiKhoan", JSON.stringify(response.data));
        setSnackbar({
          open: true,
          message: "Đăng nhập Google thành công!",
          severity: "success",
        });

        setTimeout(() => {
        setIsLoggedIn(true);
        navigate("/"); // Điều hướng sau khi 2 giây
      }, 2000); // chuyển hướng về trang chính
      
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response ? `Lỗi: ${error.response.data}` : "Đăng nhập Google thất bại.",
        severity: "error",
      });
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Đăng nhập dành cho Khách hàng</h1>
          <p className="text-gray-600 mb-6">Sử dụng tài khoản Google hoặc nhập thông tin để đăng nhập.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tenTaiKhoan}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={matKhau}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white">
              Đăng nhập
            </button>
          </form>
          <div className="my-2 text-gray-500">Hoặc</div>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() =>
              setSnackbar({ open: true, message: "Lỗi đăng nhập Google.", severity: "error" })
            }
          />
          <div className="mt-8">
            <Link className="text-gray-500 mt-4 text-sm" to="/SignUp">
              Chưa có tài khoản? Đăng ký
            </Link>
          </div>
        </div>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginKhachHang;
