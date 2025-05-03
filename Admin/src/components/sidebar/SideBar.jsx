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
  Storage, // Icon cho Kho cha
  ShoppingCart, // Icon cho Sản phẩm cha
  AddBoxOutlined, // Nhập Kho
  Input, // Thay thế AddBoxOutlined nếu thích
  IndeterminateCheckBoxOutlined, // Xuất Kho
  Output, // Thay thế IndeterminateCheckBoxOutlined nếu thích
  HomeOutlined, // Kho Hàng
  WarehouseOutlined, // Thay thế HomeOutlined nếu thích
  FactoryOutlined, // Nhà Cung Cấp
  PeopleAltOutlined, // Thay thế FactoryOutlined nếu thích
  GrainOutlined, // Nguyên Liệu
  ListAltOutlined, // Sản Phẩm
  SettingsSuggestOutlined, // Chế Biến
  PointOfSaleOutlined, // Bán hàng cha
  ReceiptOutlined, // Đơn Hàng
  ArticleOutlined, // Hóa Đơn
  DiscountOutlined, // Khuyến Mãi
  GroupsOutlined, // Người dùng cha
  BadgeOutlined, // Nhân Viên
  PersonOutlineOutlined, // Khách Hàng
  ManageAccountsOutlined, // Tài Khoản
  SettingsOutlined, // Phân Quyền
  BarChartOutlined, // Thống Kê
  ExpandMoreRounded,
  Logout, // Icon đánh dấu mục cha khi thu nhỏ
} from "@mui/icons-material";
import Error from "../../utils/state/Error";
import { Button } from "@mui/material";

const Sidebar = ({ danhSachQuyen }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (groupName) => {
    console.log("Danh sách quyền:", danhSachQuyen);
    console.log(
      "Các khóa (keys) có trong danhSachQuyen:",
      Object.keys(danhSachQuyen)
    );
    setExpanded((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };
  const nhanvien = JSON.parse(localStorage.getItem("nhanvien"));
  const handleLogout = () => {
    localStorage.removeItem("taiKhoan");
    localStorage.removeItem("nhanvien");
    window.location.reload();
  };

  if (!danhSachQuyen) return <Error />;

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
        {isOpen ? (
          <div className="h-14 p-4 text-xl font-semibold border-b border-gray-200">
            {nhanvien ? nhanvien.hoTen : "Admin Panel"}
          </div>
        ) : (
          <div className="h-14"></div>
        )}

        <ul className="flex-1 mt-2 space-y-1">
          <NavItemCollapsed
            isOpen={isOpen}
            icon={<Dashboard />}
            label="Dashboard"
            to="/admin/dashboard"
            active={location.pathname === "/admin/dashboard"}
          />

          {(danhSachQuyen?.NhapKho?.access ||
            danhSachQuyen?.XuatKho?.access ||
            danhSachQuyen?.KhoHang?.access ||
            danhSachQuyen?.NhaCungCap?.access) && (
            <ItemGroup
              isOpen={isOpen}
              label="Kho"
              icon={<Inventory />} // Hoặc <Storage />
              onToggle={() => toggleExpand("kho")}
              expanded={expanded["kho"]}
            >
              {danhSachQuyen?.NhapKho?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<AddBoxOutlined />} // Nhập Kho
                  label="Nhập Kho"
                  to="/admin/nhapkho"
                  active={location.pathname === "/admin/nhapkho"}
                />
              )}
              {danhSachQuyen?.XuatKho?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<IndeterminateCheckBoxOutlined />} // Xuất Kho
                  label="Xuất Kho"
                  to="/admin/xuatkho"
                  active={location.pathname === "/admin/xuatkho"}
                />
              )}
              {danhSachQuyen?.KhoHang?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<HomeOutlined />} // Kho Hàng
                  label="Kho Hàng"
                  to="/admin/khohang"
                  active={location.pathname === "/admin/khohang"}
                />
              )}
              {danhSachQuyen?.NhaCungCap?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<FactoryOutlined />} // Nhà Cung Cấp
                  label="Nhà Cung Cấp"
                  to="/admin/nhacungcap"
                  active={location.pathname === "/admin/nhacungcap"}
                />
              )}
            </ItemGroup>
          )}

          {(danhSachQuyen?.NguyenLieu?.access ||
            danhSachQuyen?.SanPham?.access ||
            danhSachQuyen?.CheBien?.access) && (
            <ItemGroup
              isOpen={isOpen}
              label="Sản phẩm"
              icon={<Category />} // Hoặc <ShoppingCart />
              onToggle={() => toggleExpand("sanpham")}
              expanded={expanded["sanpham"]}
            >
              {danhSachQuyen?.NguyenLieu?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<Restaurant />}
                  label="Nguyên Liệu"
                  to="/admin/nguyenlieu"
                  active={location.pathname === "/admin/nguyenlieu"}
                />
              )}
              {danhSachQuyen?.SanPham?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<ListAltOutlined />} // Sản Phẩm
                  label="Sản Phẩm"
                  to="/admin/sanpham"
                  active={location.pathname === "/admin/sanpham"}
                />
              )}
              {danhSachQuyen?.CheBien?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<SettingsSuggestOutlined />} // Chế Biến
                  label="Chế Biến"
                  to="/admin/chebien"
                  active={location.pathname === "/admin/chebien"}
                />
              )}
            </ItemGroup>
          )}

          {(danhSachQuyen?.DonHang?.access ||
            danhSachQuyen?.HoaDon?.access ||
            danhSachQuyen?.KhuyenMai?.access) && (
            <ItemGroup
              isOpen={isOpen}
              label="Bán hàng"
              icon={<LocalOffer />} // Hoặc <PointOfSaleOutlined />
              onToggle={() => toggleExpand("banhang")}
              expanded={expanded["banhang"]}
            >
              {danhSachQuyen?.DonHang?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<ReceiptOutlined />} // Đơn Hàng
                  label="Đơn Hàng"
                  to="/admin/donhang"
                  active={location.pathname === "/admin/donhang"}
                />
              )}
              {danhSachQuyen?.HoaDon?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<ArticleOutlined />} // Hóa Đơn
                  label="Hóa Đơn"
                  to="/admin/hoadon"
                  active={location.pathname === "/admin/hoadon"}
                />
              )}
              {danhSachQuyen?.KhuyenMai?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<DiscountOutlined />} // Khuyến Mãi
                  label="Khuyến Mãi"
                  to="/admin/khuyenmai"
                  active={location.pathname === "/admin/khuyenmai"}
                />
              )}
            </ItemGroup>
          )}
          {(danhSachQuyen?.NhanVien?.access ||
            danhSachQuyen?.KhachHang?.access ||
            danhSachQuyen?.TaiKhoan?.access ||
            danhSachQuyen?.PhanQuyen?.access) && (
            <ItemGroup
              isOpen={isOpen}
              label="Người dùng"
              icon={<AccountCircle />} // Hoặc <GroupsOutlined />
              onToggle={() => toggleExpand("taikhoan")}
              expanded={expanded["taikhoan"]}
            >
              {danhSachQuyen?.NhanVien?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<BadgeOutlined />} // Nhân Viên
                  label="Nhân Viên"
                  to="/admin/nhanvien"
                  active={location.pathname === "/admin/nhanvien"}
                />
              )}
              {danhSachQuyen?.KhachHang?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<PersonOutlineOutlined />} // Khách Hàng
                  label="Khách Hàng"
                  to="/admin/khachhang"
                  active={location.pathname === "/admin/khachhang"}
                />
              )}
              {danhSachQuyen?.TaiKhoan?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<ManageAccountsOutlined />} // Tài Khoản
                  label="Tài Khoản"
                  to="/admin/taikhoan"
                  active={location.pathname === "/admin/taikhoan"}
                />
              )}
              {danhSachQuyen?.PhanQuyen?.access && (
                <NavItemCollapsed
                  isOpen={isOpen}
                  icon={<SettingsOutlined />} // Phân Quyền
                  label="Phân Quyền"
                  to="/admin/phanquyen"
                  active={location.pathname === "/admin/phanquyen"}
                />
              )}
            </ItemGroup>
          )}

          {danhSachQuyen?.ThongKe?.access && (
            <NavItemCollapsed
              isOpen={isOpen}
              icon={<BarChartOutlined />} // Thống Kê
              label="Thống Kê"
              to="/admin/thongke"
              active={location.pathname === "/admin/thongke"}
            />
          )}
        </ul>

        {isOpen && (
          <div className="p-4 text-sm text-gray-500 border-t border-gray-200 text-center">
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

const ItemGroup = ({ isOpen, label, icon, children, onToggle, expanded }) => (
  <li className={`group ml-2 my-0.5 rounded-md overflow-hidden `}>
    <button
      onClick={onToggle}
      className="flex items-center justify-between p-2 w-full transition-all focus:outline-none"
    >
      <div className="flex items-center">
        <div className="text-lg flex-shrink-0 relative">
          {icon}
          {!isOpen && (
            <ExpandMoreRounded className="absolute bottom-0 right-0 text-sm text-gray-500" />
          )}
        </div>
        {isOpen && (
          <span className="ml-3 font-medium text-gray-700 whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
      <div>{expanded ? <ExpandLess /> : <ExpandMore />}</div>
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
