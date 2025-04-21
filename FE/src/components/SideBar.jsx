import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Dashboard,
    Inventory,
    Category,
    Restaurant,
    Work,
    Face,
    AccountCircle,
    Security,
    Menu,
    Close,
    Assignment,
    Business,
    LocalOffer,
    ReceiptLong,
    PieChart,
    Kitchen,
    Inventory2Outlined,
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const [expanded, setExpanded] = useState({}); // State quản lý trạng thái mở/đóng của các nhóm

    const toggleExpand = (groupName) => {
        setExpanded(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    return (
        <div className="relative overflow-y-scroll">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-1.5 right-2 z-50 p-3 rounded-full transition-all duration-300 focus:outline-none bg-white shadow"
            >
                {isOpen ? <Close /> : <Menu />}
            </button>

            <motion.div
                initial={{ width: isOpen ? "16rem" : "4rem" }}
                animate={{ width: isOpen ? "16rem" : "4rem" }}
                transition={{ duration: 0.3 }}
                className="h-screen bg-white text-gray-900 shadow-md flex flex-col"
            >
                {isOpen && (
                    <div className="p-4 text-xl font-semibold border-b border-gray-200">
                        Admin Panel
                    </div>
                )}

                <ul className="flex-1 mt-2 space-y-1">
                    <NavItemCollapsed
                        isOpen={isOpen}
                        icon={<Dashboard />}
                        label="Dashboard"
                        to="/admin/dashboard"
                        active={location.pathname === "/admin/dashboard"}
                    />

                    <ItemGroup
                        isOpen={isOpen}
                        label="Kho"
                        icon={<Inventory />}
                        onToggle={() => toggleExpand("kho")}
                        expanded={expanded["kho"]}
                    >
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Inventory />}
                            label="Nhập Kho"
                            to="/admin/nhapkho"
                            active={location.pathname === "/admin/nhapkho"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Inventory2Outlined />}
                            label="Xuất Kho"
                            to="/admin/xuatkho"
                            active={location.pathname === "/admin/xuatkho"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Inventory />}
                            label="Kho Hàng"
                            to="/admin/khohang"
                            active={location.pathname === "/admin/khohang"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Business />}
                            label="Nhà Cung Cấp"
                            to="/admin/nhacungcap"
                            active={location.pathname === "/admin/nhacungcap"}
                        />
                    </ItemGroup>

                    <ItemGroup
                        isOpen={isOpen}
                        label="Sản phẩm"
                        icon={<Category />}
                        onToggle={() => toggleExpand("sanpham")}
                        expanded={expanded["sanpham"]}
                    >
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Restaurant />}
                            label="Nguyên Liệu"
                            to="/admin/nguyenlieu"
                            active={location.pathname === "/admin/nguyenlieu"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Category />}
                            label="Sản Phẩm"
                            to="/admin/sanpham"
                            active={location.pathname === "/admin/sanpham"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Kitchen />}
                            label="Chế Biến"
                            to="/admin/chebien"
                            active={location.pathname === "/admin/chebien"}
                        />
                    </ItemGroup>

                    <ItemGroup
                        isOpen={isOpen}
                        label="Bán hàng"
                        icon={<LocalOffer />}
                        onToggle={() => toggleExpand("banhang")}
                        expanded={expanded["banhang"]}
                    >
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Assignment />}
                            label="Đơn Hàng"
                            to="/admin/donhang"
                            active={location.pathname === "/admin/donhang"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<ReceiptLong />}
                            label="Hóa Đơn"
                            to="/admin/hoadon"
                            active={location.pathname === "/admin/hoadon"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<LocalOffer />}
                            label="Khuyến Mãi"
                            to="/admin/khuyenmai"
                            active={location.pathname === "/admin/khuyenmai"}
                        />
                    </ItemGroup>

                    <ItemGroup
                        isOpen={isOpen}
                        label="Người dùng"
                        icon={<AccountCircle />}
                        onToggle={() => toggleExpand("taikhoan")}
                        expanded={expanded["taikhoan"]}
                    >
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Work />}
                            label="Nhân Viên"
                            to="/admin/nhanvien"
                            active={location.pathname === "/admin/nhanvien"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Face />}
                            label="Khách Hàng"
                            to="/admin/khachhang"
                            active={location.pathname === "/admin/khachhang"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<AccountCircle />}
                            label="Tài Khoản"
                            to="/admin/taikhoan"
                            active={location.pathname === "/admin/taikhoan"}
                        />
                        <NavItemCollapsed
                            isOpen={isOpen}
                            icon={<Security />}
                            label="Phân Quyền"
                            to="/admin/phanquyen"
                            active={location.pathname === "/admin/phanquyen"}
                        />
                    </ItemGroup>

                    <NavItemCollapsed
                        isOpen={isOpen}
                        icon={<PieChart />}
                        label="Thống Kê"
                        to="/admin/thongke"
                        active={location.pathname === "/admin/thongke"}
                    />
                </ul>

                {isOpen && (
                    <div className="p-4 text-sm text-gray-500 border-t border-gray-200 text-center">
                        © 2025 Admin Panel
                    </div>
                )}
            </motion.div>
        </div>
    );
};

const ItemGroup = ({ isOpen, label, icon, children, onToggle, expanded }) => (
    <li className="group mx-2 my-0.5 rounded-md overflow-hidden">
        <button
            onClick={onToggle}
            className="flex items-center justify-between p-2 transition-all focus:outline-none"
        >
            <div className="flex items-center">
                <div className="text-lg flex-shrink-0">{icon}</div>
                {isOpen && <span className="ml-3 font-medium text-gray-700 whitespace-nowrap">{label}</span>}
            </div>
            {isOpen && <div className="ml-2">{expanded ? <ExpandLess /> : <ExpandMore />}</div>}
        </button>
        <motion.ul
            initial={{ height: 0 }}
            animate={{ height: expanded ? "auto" : 0 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
        >
            {children}
        </motion.ul>
    </li>
);

const NavItemCollapsed = ({ isOpen, icon, label, to, active }) => (
    <li
        className={`group p-2 rounded-md mx-2 my-0.5 transition-all ${
            active ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"
        }`}
    >
        <Link to={to} className="flex items-center focus:outline-none">
            <div className="text-lg flex-shrink-0">{icon}</div>
            {isOpen && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`ml-3 font-medium whitespace-nowrap ${
                        active ? "text-blue-600" : "text-gray-700"
                    }`}
                >
                    {label}
                </motion.span>
            )}
        </Link>
    </li>
);

export default Sidebar;