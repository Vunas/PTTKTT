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
} from "@mui/icons-material";

const SideBarQLK = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // Lấy vị trí trang hiện tại

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
          <div className="p-4 text-xl max-h-10 overflow-hidden font-semibold border-b border-gray-300">
            Warehouse Panel
          </div>
        ) : (
          <div className="h-10"></div>
        )}

        {/* Menu điều hướng */}
        <ul className="flex-1 mt-4">
          <SidebarItem
            isOpen={isOpen}
            icon={<Dashboard />}
            label="Kho hàng"
            to="/warehouse/khohang"
            active={location.pathname === "/warehouse/khohang"}
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<Inventory />}
            label="Nguyên liệu"
            to="/warehouse/nguyenlieu"
            active={location.pathname === "/warehouse/nguyenlieu"}
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<LocalShipping />}
            label="Nhập kho"
            to="/warehouse/nhapkho"
            active={location.pathname === "/warehouse/nhapkho"}
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<Category />}
            label="Xuất kho"
            to="/warehouse/xuatkho"
            active={location.pathname === "/warehouse/xuatkho"}
          />
          
          <SidebarItem
            isOpen={isOpen}
            icon={<Work />}
            label="Công thức"
            to="/warehouse/congthuc"
            active={location.pathname === "/warehouse/congthuc"}
          />
          
        </ul>

        {/* Footer Sidebar */}
        {isOpen && (
          <div className="p-4 text-sm text-gray-500 border-t border-gray-300 text-center">
            © 2025 Admin Panel. All rights reserved.
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

export default SideBarQLK;