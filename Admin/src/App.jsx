import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminRoutes from "./router/AdminRoutes";
import LoginAdmin from "./pages/Login";
import fetchDataById from "./utils/FetchDataByID";
import Error from "./utils/state/Error";

const App = () => {
  // const [errors, setErrors] = useState({});
  const [danhSachQuyen, setDanhSachQuyen] = useState({});
  const [snackBarLogin, setSnackbarLogin] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const checkLoginAdmin = async () => {
    try {
      const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));
      if (!taiKhoan) return false;
      setDanhSachQuyen(
        await fetchDataById(
          "http://localhost:8080/api/phanquyen/danhsachquyen",
          taiKhoan.maPhanQuyen
        )
      );
      return true;
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
      return false;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginAdmin().then((loggedIn) => setIsLoggedIn(loggedIn));
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("loginMessage");
    if (message) {
      setSnackbarLogin({
        open: true,
        message: message,
        severity: "success",
      });
      localStorage.removeItem("loginMessage");
    }
  }, []);

  // if (errors) return <Error/>

  return (
    <Router>
      <Routes>
        <Route
          path="/login-admin"
          element={
            isLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <LoginAdmin />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route
          path="/admin/*"
          element={
            isLoggedIn ? (
              <AdminRoutes
                danhSachQuyen={danhSachQuyen}
                snackBarLogin={snackBarLogin}
                setSnackbarLogin={setSnackbarLogin}
              />
            ) : (
              <Navigate to="/login-admin" replace />
            )
          }
        />
        <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
