import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/SideBar"; // Import Sidebar từ components
import Dashboard from "../pages/admin/Dashboard";
import NhanVien from "../pages/admin/NhanVien";
import KhachHang from "../pages/admin/KhachHang";
import TaiKhoan from "../pages/admin/TaiKhoan";
import PhanQuyen from "../pages/admin/PhanQuyen";
import NguyenLieu from "../pages/admin/NguyenLieu";
import NhaCungCap from "../pages/admin/NhaCungCap";
import SanPham from "../pages/admin/SanPham";
import KhoHang from "../pages/admin/KhoHang";
import DonHang from "../pages/admin/DonHang";
import KhuyenMai from "../pages/admin/KhuyenMai";

const AdminRoutes = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="khuyenmai" element={<KhuyenMai />} />
          <Route path="donhang" element={<DonHang />} />
          <Route path="khohang" element={<KhoHang />} />
          <Route path="nhacungcap" element={<NhaCungCap />} />
          <Route path="sanpham" element={<SanPham />} />
          <Route path="nguyenlieu" element={<NguyenLieu />} />
          <Route path="nhanvien" element={<NhanVien />} />
          <Route path="khachhang" element={<KhachHang />} />
          <Route path="taikhoan" element={<TaiKhoan />} />
          <Route path="phanquyen" element={<PhanQuyen />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;