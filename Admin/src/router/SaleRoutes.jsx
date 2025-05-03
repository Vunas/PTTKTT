import React from "react";
import { Route, Routes } from "react-router-dom";
import HoaDon from "../pages/admin/HoaDon";
import DonHang from "../pages/admin/DonHang";
import KhuyenMai from "../pages/admin/KhuyenMai";
import SideBarBanHang from "../components/sidebar/SideBarBanHang";

const SaleRoutes = ({ danhSachQuyen }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBarBanHang danhSachQuyen={danhSachQuyen} /> 
      <div className="flex-1 p-4">
      <Routes>
        {danhSachQuyen?.KhuyenMai?.access && (
          <Route
            path="khuyenmai"
            element={<KhuyenMai quyen={danhSachQuyen?.KhuyenMai} />}
          />
        )}
        {danhSachQuyen?.DonHang?.access && (
          <Route
            path="donhang"
            element={<DonHang quyen={danhSachQuyen?.DonHang} />}
          />
        )}
        {danhSachQuyen?.HoaDon?.access && (
          <Route
            path="hoadon"
            element={<HoaDon quyen={danhSachQuyen?.HoaDon} />}
          />
        )}
        </Routes>
      </div>
    </div>
  );
};

export default SaleRoutes;
