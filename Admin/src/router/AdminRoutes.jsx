import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/sidebar/SideBar"; // Import Sidebar từ components
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
import HoaDon from "../pages/admin/HoaDon";
import ThongKe from "../pages/admin/ThongKe";
import PhieuCheBien from "../pages/admin/CheBien";
import XuatKho from "../pages/admin/XuatKho";
import NhapKho from "../pages/admin/NhapKho";
import LoginAdmin from "../pages/Login";

const AdminRoutes = ({ danhSachQuyen, isLoggedIn }) => {
  if (!isLoggedIn)
    return (
      <Routes>
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
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
      <Sidebar danhSachQuyen={danhSachQuyen} />

      {/* Nội dung chính */}
      <div className="flex-1 p-4">
        <Routes>
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="dashboard" element={<Dashboard />} />
          {danhSachQuyen?.CheBien?.access && (
            <Route
              path="chebien"
              element={<PhieuCheBien quyen={danhSachQuyen?.CheBien} />}
            />
          )}
          {danhSachQuyen?.NhapKho?.access && (
            <Route
              path="nhapkho"
              element={<NhapKho quyen={danhSachQuyen?.NhapKho} />}
            />
          )}
          {danhSachQuyen?.XuatKho?.access && (
            <Route
              path="xuatkho"
              element={<XuatKho quyen={danhSachQuyen?.XuatKho} />}
            />
          )}
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
          {danhSachQuyen?.KhoHang?.access && (
            <Route
              path="khohang"
              element={<KhoHang quyen={danhSachQuyen?.KhoHang} />}
            />
          )}
          {danhSachQuyen?.NhaCungCap?.access && (
            <Route
              path="nhacungcap"
              element={<NhaCungCap quyen={danhSachQuyen?.NhaCungCap} />}
            />
          )}
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
          {danhSachQuyen?.NhanVien?.access && (
            <Route
              path="nhanvien"
              element={<NhanVien quyen={danhSachQuyen?.NhanVien} />}
            />
          )}
          {danhSachQuyen?.KhachHang?.access && (
            <Route
              path="khachhang"
              element={<KhachHang quyen={danhSachQuyen?.KhachHang} />}
            />
          )}
          {danhSachQuyen?.TaiKhoan?.access && (
            <Route
              path="taikhoan"
              element={<TaiKhoan quyen={danhSachQuyen?.TaiKhoan} />}
            />
          )}
          {danhSachQuyen?.PhanQuyen?.access && (
            <Route
              path="phanquyen"
              element={<PhanQuyen quyen={danhSachQuyen?.PhanQuyen} />}
            />
          )}
          {danhSachQuyen?.ThongKe?.access && (
            <Route path="thongke" element={<ThongKe />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
