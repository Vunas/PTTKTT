import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const clientId = "1041605160701-9q21rn06djjtsdlck5ks2mur96eckti0.apps.googleusercontent.com"; // Thay bằng client ID của bạn

const LoginAdmin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const user = localStorage.getItem("taiKhoan");
    if (user) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login-admin-account", {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("taiKhoan", JSON.stringify(response.data));
        setSnackbar({
          open: true,
          message: "Đăng nhập thành công!",
          severity: "success",
        });
        setIsLoggedIn(true);
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

      const response = await axios.post("http://localhost:8080/api/login-admin-google", { token });
      if (response.status === 200) {
        localStorage.setItem("taiKhoan", JSON.stringify(response.data));
        setSnackbar({
          open: true,
          message: "Đăng nhập Google thành công!",
          severity: "success",
        });
        setIsLoggedIn(true);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Đăng nhập dành cho Admin</h1>
          <p className="text-gray-600 mb-6">Sử dụng tài khoản Google hoặc nhập thông tin để đăng nhập.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Đăng nhập
            </button>
          </form>
          <div className="my-4 text-gray-500">Hoặc</div>
          <GoogleLogin
            onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse)}
            onError={() => setSnackbar({ open: true, message: "Lỗi đăng nhập Google.", severity: "error" })}
          />
          <p className="text-gray-500 mt-4 text-sm">Nếu gặp vấn đề khi đăng nhập, hãy liên hệ với bộ phận hỗ trợ.</p>
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

export default LoginAdmin;