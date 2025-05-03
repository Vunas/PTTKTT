import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SideBarQLK from "../components/sidebar/SideBarQLK";
import NguyenLieu from "../pages/admin/NguyenLieu";
import SanPham from "../pages/admin/SanPham";
import CheBien from "../pages/admin/CheBien";
import SideBarSanPham from "../components/sidebar/SideBarSanPham";
import PhieuCheBien from "../pages/admin/CheBien";
import LoginAdmin from "../pages/Login";

const ProductRoutes = ({ danhSachQuyen, isLoggedIn }) => {
  if (!isLoggedIn)
    return (
      <Routes>
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/product" replace />
            ) : (
              <LoginAdmin />
            )
          }
        />
      </Routes>
    );
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBarSanPham danhSachQuyen={danhSachQuyen} /> {/* Nội dung chính */}
      <div className="flex-1 p-4">
        <Routes>
          {danhSachQuyen?.SanPham?.access && (
            <Route
              path="sanpham"
              element={<SanPham quyen={danhSachQuyen?.SanPham} />}
            />
          )}
          {danhSachQuyen?.NguyenLieu?.access && (
            <Route
              path="nguyenlieu"
              element={<NguyenLieu quyen={danhSachQuyen?.NguyenLieu} />}
            />
          )}
          {danhSachQuyen?.CheBien?.access && (
            <Route
              path="chebien"
              element={<PhieuCheBien quyen={danhSachQuyen?.CheBien} />}
            />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default ProductRoutes;
