

import React, { useState,useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes";
import LoginAdmin from "./pages/Login";

const App = () => {

  const checkLoginAdmin = () => {
    try {
      const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));
      return taiKhoan?.email ? true : false; // Kiểm tra email có tồn tại
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
      return false;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  useEffect(() => {
    setIsLoggedIn(checkLoginAdmin());
  }, []);
  

  return (
    <Router>
      <Routes>
        <Route
          path="/login-admin"
          element={isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <LoginAdmin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/admin/*" element={isLoggedIn ? <AdminRoutes /> : <Navigate to="/login-admin" replace />} />
        <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
