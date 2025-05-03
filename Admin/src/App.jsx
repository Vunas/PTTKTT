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
import Page404 from "./utils/state/Page404";
import WarehouseRoutes from "./router/WarehouseRoutes";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Loading from "./utils/state/Loading";
import ProductRoutes from "./router/ProductRoutes";
import SaleRoutes from "./router/SaleRoutes";

const App = () => {
  const [danhSachQuyen, setDanhSachQuyen] = useState({});
  const [snackBarLogin, setSnackbarLogin] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Trạng thái loading

  const handleSnackbarClose = () =>
    setSnackbarLogin({ ...snackBarLogin, open: false });

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

  useEffect(() => {
    checkLoginAdmin().then((loggedIn) => {
      setIsLoggedIn(loggedIn);
      setLoading(false);
    });
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login-admin"
            element={isLoggedIn ? <Navigate to="" replace /> : <LoginAdmin />}
          />
          <Route
            path="/admin/*"
            element=<AdminRoutes
              danhSachQuyen={danhSachQuyen}
              isLoggedIn={isLoggedIn}
            />
          />
          <Route
            path="/warehouse/*"
            element=<WarehouseRoutes
              danhSachQuyen={danhSachQuyen}
              isLoggedIn={isLoggedIn}
            />
          />
          <Route
            path="/product/*"
            element=<ProductRoutes
              danhSachQuyen={danhSachQuyen}
              isLoggedIn={isLoggedIn}
            />
          />
          <Route
            path="/sale/*"
            element=<SaleRoutes
              danhSachQuyen={danhSachQuyen}
              isLoggedIn={isLoggedIn}
            />
          />
          <Route path="*" element={<Page404 href={"/admin"} />} />
        </Routes>
      </Router>
      <Snackbar
        open={snackBarLogin.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackBarLogin.type}
          variant="filled"
        >
          {snackBarLogin.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
