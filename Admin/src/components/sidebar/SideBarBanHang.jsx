import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  Close,
  Logout,
  ReceiptOutlined,
  ArticleOutlined,
  DiscountOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material"; 

const SideBarBanHang = ({ danhSachQuyen }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
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
            {nhanvien ? nhanvien.hoTen : "Sale Panel"}
          </div>
        ) : (
          <div className="h-14"></div>
        )}

        {/* Menu điều hướng */}
        <ul className="flex-1 mt-4">
          {danhSachQuyen?.DonHang?.access && (
            <SidebarItem
              isOpen={isOpen}
              icon={<ReceiptOutlined />}
              label="Đơn Hàng"
              to="/sale/donhang"
              active={location.pathname === "/sale/donhang"}
            />
          )}
          {danhSachQuyen?.HoaDon?.access && (
            <SidebarItem
              isOpen={isOpen}
              icon={<ArticleOutlined />} 
              label="Hóa Đơn"
              to="/sale/hoadon"
              active={location.pathname === "/sale/hoadon"}
            />
          )}
          {danhSachQuyen?.KhuyenMai?.access && (
            <SidebarItem
              isOpen={isOpen}
              icon={<DiscountOutlined />} 
              label="Khuyến Mãi"
              to="/sale/khuyenmai"
              active={location.pathname === "/sale/khuyenmai"}
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

export default SideBarBanHang;
