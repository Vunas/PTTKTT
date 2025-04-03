import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Dashboard,
  People,
  Restaurant,
  Work,
  Face,
  AccountCircle,
  Security,
  Menu,
  Close,
} from "@mui/icons-material";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      {/* Nút thu gọn/mở rộng */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 z-50 p-2 text-white rounded-full shadow-lg"
      >
        {isOpen ? <Close /> : <Menu />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ width: isOpen ? "16rem" : "4rem" }}
        animate={{ width: isOpen ? "16rem" : "4rem" }}
        transition={{ duration: 0.3 }}
        className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-lg`}
      >
        {/* Tiêu đề Sidebar */}
        <div
          className={`p-6 text-2xl font-bold bg-gray-900 border-b border-gray-700 ${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          {isOpen && <h2>Admin Panel</h2>}
        </div>

        {/* Menu điều hướng */}
        <ul className="flex-1">
          <SidebarItem
            isOpen={isOpen}
            icon={<Dashboard />}
            label="Dashboard"
            to="/admin/dashboard"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<People />}
            label="Users"
            to="/admin/users"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<People />}
            label="Nhà Cung Cấp"
            to="/admin/nhacungcap"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<People />}
            label="Sản Phẩm"
            to="/admin/sanpham"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<Restaurant />}
            label="Nguyên Liệu"
            to="/admin/nguyenlieu"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<Work />}
            label="Nhân viên"
            to="/admin/nhanvien"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<Face />}
            label="Khách Hàng"
            to="/admin/khachhang"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<AccountCircle />}
            label="Tài Khoản"
            to="/admin/taikhoan"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<Security />}
            label="Phân Quyền"
            to="/admin/phanquyen"
          />
        </ul>

        {/* Footer Sidebar */}
        <div
          className={`p-4 bg-gray-900 border-t border-gray-700 text-center text-sm ${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          {isOpen && <p>© 2025 Admin Panel</p>}
        </div>
      </motion.div>
    </div>
  );
};

const SidebarItem = ({ isOpen, icon, label, to }) => (
  <li className="group p-3 hover:bg-gray-700 hover:text-yellow-400 transition-all">
    <Link
      to={to}
      className="flex items-center space-x-3"
      style={{ justifyContent: isOpen ? "start" : "center" }}
    >
      <div className={`text-yellow-400 group-hover:text-yellow-300`}>{icon}</div>
      {isOpen && <span>{label}</span>}
    </Link>
  </li>
);

export default Sidebar;