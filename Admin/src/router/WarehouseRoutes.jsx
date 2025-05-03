import React from "react";
import { Route, Routes } from "react-router-dom";
import SideBarQLK from "../components/sidebar/SideBarQLK";
import KhoHang from "../pages/admin/KhoHang";
import NhaCungCap from "../pages/admin/NhaCungCap";
import NhapKho from "../pages/admin/NhapKho";
import XuatKho from "../pages/admin/XuatKho";

const WarehouseRoutes = ({ danhSachQuyen }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBarQLK danhSachQuyen={danhSachQuyen} />

      {/* Nội dung chính */}
      <div className="flex-1 p-4">
        <Routes>
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
        </Routes>
      </div>
    </div>
  );
};

export default WarehouseRoutes;
