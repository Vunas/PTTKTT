import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Dashboard,
  Inventory,
  LocalShipping,
  Category,
  Restaurant,
  Work,
  Face,
  AccountCircle,
  Security,
  Menu,
  Close,
  BarChart, // Import icon cho Thống kê
  Assignment, // Import icon cho Báo cáo
  Logout,
  ListAltOutlined,
  RestaurantMenu,
  SettingsSuggestOutlined, // Import icon cho Đăng xuất
} from "@mui/icons-material";
import { Button } from "@mui/material"; // Import Button component

const SideBarSanPham = ({ danhSachQuyen }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // Lấy vị trí trang hiện tại
  const nhanvien = JSON.parse(localStorage.getItem("nhanvien"));
  const handleLogout = () => {
    console.log(danhSachQuyen);
    localStorage.removeItem("taiKhoan");
    localStorage.removeItem("nhanvien");
    window.location.reload();
  };

  return (
    <div className="relative overflow-hidden">
      {/* Nút thu gọn/mở rộng */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-2 z-50 p-3 rounded-full transition-all duration-300"
      >
        {isOpen ? <Close /> : <Menu />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ width: isOpen ? "16rem" : "4rem" }}
        animate={{ width: isOpen ? "16rem" : "4rem" }}
        transition={{ duration: 0.3 }}
        className="h-screen bg-white text-gray-900 shadow-md flex flex-col"
      >
        {/* Tiêu đề Sidebar */}
        {isOpen ? (
          <div className="h-14 p-4 text-xl font-semibold border-b border-gray-200">
            {nhanvien ? nhanvien.hoTen : "Admin Panel"}
          </div>
        ) : (
          <div className="h-14"></div>
        )}

        {/* Menu điều hướng */}
        <ul className="flex-1 mt-4">
          {danhSachQuyen?.NguyenLieu?.access && (
            <SidebarItem
              isOpen={isOpen}
              icon={<RestaurantMenu />}
              label="Nguyên Liệu"
              to="/product/nguyenlieu"
              active={location.pathname === "/product/nguyenlieu"}
            />
          )}
          {danhSachQuyen?.SanPham?.access && (
            <SidebarItem
              isOpen={isOpen}
              icon={<ListAltOutlined />}
              label="Sản Phẩm"
              to="/product/sanpham"
              active={location.pathname === "/product/sanpham"}
            />
          )}
          {danhSachQuyen?.XuatKho?.access && (
            <SidebarItem
              isOpen={isOpen}
              icon={<SettingsSuggestOutlined />}
              label="Chế Biến"
              to="/product/chebien"
              active={location.pathname === "/product/chebien"}
            />
          )}
        </ul>

        {/* Footer Sidebar - Nút đăng xuất */}
        {isOpen && (
          <div className="p-4 text-sm text-gray-500 border-t border-gray-300 text-center">
            <Button
              onClick={handleLogout}
              className="w-full justify-start"
              startIcon={<Logout />}
              sx={{
                color: "inherit",
                "&:hover": {
                  backgroundColor: "#f44336",
                  color: "white",
                },
              }}
            >
              Đăng xuất
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const SidebarItem = ({ isOpen, icon, label, to, active }) => (
  <li
    className={`group p-3 overflow-hidden max-h-12 transition-all rounded-md mx-2 my-1 ${
      active ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"
    }`}
  >
    <Link to={to} className="flex items-center space-x-4">
      <div className="text-lg flex-shrink-0">{icon}</div>
      {isOpen && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`font-medium whitespace-nowrap ${
            active ? "text-blue-600" : "text-gray-700"
          }`}
        >
          {label}
        </motion.span>
      )}
    </Link>
  </li>
);

export default SideBarSanPham;
