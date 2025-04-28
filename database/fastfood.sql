-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 06:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fastfood`
--

-- --------------------------------------------------------

--
-- Table structure for table `chebien`
--

CREATE TABLE `chebien` (
  `MaCheBien` int(11) NOT NULL,
  `NgayCheBien` datetime DEFAULT current_timestamp(),
  `NguoiCheBien` int(11) NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chebien`
--

INSERT INTO `chebien` (`MaCheBien`, `NgayCheBien`, `NguoiCheBien`, `TrangThai`) VALUES
(1, '2025-04-18 17:09:00', 1, 1),
(2, '2025-04-18 17:09:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `chitietchebien`
--

CREATE TABLE `chitietchebien` (
  `MaChiTiet` int(11) NOT NULL,
  `MaCheBien` int(11) NOT NULL,
  `MaSanPham` int(11) NOT NULL,
  `SoLuongSanPham` int(11) NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietchebien`
--

INSERT INTO `chitietchebien` (`MaChiTiet`, `MaCheBien`, `MaSanPham`, `SoLuongSanPham`, `TrangThai`) VALUES
(1, 1, 2, 4, 1),
(2, 2, 2, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `chitietdonhang`
--

CREATE TABLE `chitietdonhang` (
  `maChiTiet` int(11) NOT NULL,
  `maDonHang` int(11) NOT NULL,
  `maSanPham` int(11) NOT NULL,
  `soLuong` int(11) NOT NULL CHECK (`soLuong` > 0),
  `donGia` decimal(10,2) NOT NULL CHECK (`donGia` >= 0),
  `thanhTien` decimal(10,2) GENERATED ALWAYS AS (`soLuong` * `donGia`) VIRTUAL,
  `TrangThai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietdonhang`
--

INSERT INTO `chitietdonhang` (`maChiTiet`, `maDonHang`, `maSanPham`, `soLuong`, `donGia`, `TrangThai`) VALUES
(1, 1, 1, 2, 150000.00, 1),
(3, 2, 3, 5, 50000.00, 1),
(5, 3, 4, 1, 250000.00, 1),
(57, 36, 1, 1, 50000.00, 1),
(58, 5, 1, 1, 50000.00, 1),
(59, 5, 2, 1, 60000.00, 1),
(60, 37, 1, 2, 50000.00, 1),
(61, 37, 2, 1, 60000.00, 1),
(62, 38, 1, 1, 50000.00, 1),
(63, 39, 1, 1, 50000.00, 1),
(64, 40, 1, 1, 50000.00, 1),
(65, 41, 1, 1, 50000.00, 1),
(66, 42, 1, 1, 50000.00, 1),
(67, 43, 1, 1, 50000.00, 1),
(68, 44, 1, 1, 50000.00, 1),
(69, 45, 1, 1, 50000.00, 1),
(70, 46, 1, 1, 50000.00, 1),
(71, 47, 1, 1, 50000.00, 1),
(72, 48, 1, 1, 50000.00, 1),
(73, 49, 1, 1, 50000.00, 1),
(74, 50, 1, 1, 50000.00, 1),
(75, 51, 1, 1, 50000.00, 1),
(76, 52, 1, 1, 50000.00, 1),
(77, 53, 1, 1, 50000.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `chitietnguyenlieusanpham`
--

CREATE TABLE `chitietnguyenlieusanpham` (
  `MaChiTiet` int(11) NOT NULL,
  `MaSanPham` int(11) NOT NULL,
  `MaNguyenLieu` int(11) NOT NULL,
  `SoLuongNguyenLieu` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitietnguyenlieusanpham`
--

INSERT INTO `chitietnguyenlieusanpham` (`MaChiTiet`, `MaSanPham`, `MaNguyenLieu`, `SoLuongNguyenLieu`) VALUES
(6, 9, 5, 1),
(7, 9, 7, 1),
(57, 2, 2, 3),
(58, 1, 4, 1),
(59, 1, 5, 1),
(60, 1, 6, 15),
(61, 1, 7, 2),
(62, 1, 8, 60),
(63, 1, 9, 50),
(64, 1, 10, 100),
(65, 3, 3, 2),
(66, 3, 4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `chitietphieunhap`
--

CREATE TABLE `chitietphieunhap` (
  `id` int(11) NOT NULL,
  `maPhieuNhap` bigint(20) NOT NULL,
  `maNguyenLieu` int(11) NOT NULL,
  `soLuong` int(11) NOT NULL,
  `giaNhap` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietphieuxuat`
--

CREATE TABLE `chitietphieuxuat` (
  `id` int(11) NOT NULL,
  `maPhieuXuat` bigint(20) NOT NULL,
  `maNguyenLieu` int(11) NOT NULL,
  `soLuong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `maDonHang` int(11) NOT NULL,
  `maKhachHang` int(11) DEFAULT NULL,
  `ngayDat` timestamp NOT NULL DEFAULT current_timestamp(),
  `trangThaiGiaoHang` varchar(50) DEFAULT 'Đã đặt',
  `tongGia` decimal(10,2) NOT NULL CHECK (`tongGia` >= 0),
  `diaChiGiaoHang` varchar(255) NOT NULL,
  `phuongThucThanhToan` varchar(50) NOT NULL,
  `ghiChu` text DEFAULT NULL,
  `TrangThai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donhang`
--

INSERT INTO `donhang` (`maDonHang`, `maKhachHang`, `ngayDat`, `trangThaiGiaoHang`, `tongGia`, `diaChiGiaoHang`, `phuongThucThanhToan`, `ghiChu`, `TrangThai`) VALUES
(1, 1, '2025-04-11 09:58:00', 'Đã giao', 250000.00, '123 Nguyễn Văn Cừ, Hà Nội', 'Tiền mặt', 'Không có yêu cầu đặc biệt', 0),
(2, 2, '2025-04-11 09:58:00', 'Đang giao', 450000.00, '456 Trần Hưng Đạo, TP.HCM', 'Tiền mặt', 'Yêu cầu giao nhanh', 2),
(3, 3, '2025-04-11 09:58:00', 'Đã xác nhận', 500000.00, '789 Lý Thường Kiệt, Đà Nẵng', 'Ví điện tử', NULL, 2),
(4, 4, '2025-04-11 09:58:00', 'Đã giao', 850000.00, '321 Phan Đình Phùng, Cần Thơ', 'Tiền mặt', 'Khách không nhận đúng giờ', 2),
(5, 5, '2025-04-11 09:58:00', 'Đã đặt', 110000.00, '654 Hoàng Diệu, Hải Phòng', 'Thẻ ngân hàng', 'Khách thay đổi địa chỉ', 1),
(36, NULL, '2025-04-22 23:05:00', 'Đã xác nhận', 50000.00, '', '', '', 2),
(37, 1, '2025-04-22 23:19:00', 'Đã hủy', 160000.00, '', '', '', 2),
(38, 1, '2025-04-23 09:29:00', 'Đã hủy', 50000.00, '', '', '', 2),
(39, NULL, '2025-04-23 09:31:00', 'Đã hủy', 50000.00, '', '', '', 2),
(40, NULL, '2025-04-23 09:34:00', 'Đã hủy', 50000.00, '', '', '', 2),
(41, NULL, '2025-04-23 09:35:00', 'Đã hủy', 50000.00, '', '', '', 2),
(42, NULL, '2025-04-23 09:36:00', 'Đã hủy', 50000.00, '', 'Tiền mặt', '', 2),
(43, NULL, '2025-04-23 09:37:00', 'Đã hủy', 50000.00, '', '', '', 2),
(44, NULL, '2025-04-23 09:37:00', 'Đã hủy', 50000.00, '', 'Tiền mặt', '', 2),
(45, NULL, '2025-04-23 09:39:00', 'Đã hủy', 50000.00, '', '', '', 2),
(46, NULL, '2025-04-23 09:39:00', 'Đã hủy', 50000.00, '', '', '', 2),
(47, NULL, '2025-04-23 09:43:00', 'Đã hủy', 50000.00, '', '', '', 2),
(48, NULL, '2025-04-23 09:45:00', 'Đã hủy', 50000.00, '', '', '', 2),
(49, NULL, '2025-04-23 09:48:00', 'Đã hủy', 50000.00, '', '', '', 2),
(50, NULL, '2025-04-23 09:51:00', 'Đã hủy', 50000.00, '', '', '', 2),
(51, NULL, '2025-04-23 09:51:00', 'Đã đặt', 50000.00, '', '', '', 2),
(52, NULL, '2025-04-23 09:51:00', 'Đã đặt', 50000.00, '', '', '', 2),
(53, NULL, '2025-04-23 10:00:00', 'Đã đặt', 50000.00, '', '', '', 2);

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `maHoaDon` int(11) NOT NULL,
  `maDonHang` int(11) NOT NULL,
  `maKhuyenMai` int(11) DEFAULT NULL,
  `ngayXuatHoaDon` timestamp NOT NULL DEFAULT current_timestamp(),
  `tongTien` decimal(10,2) NOT NULL CHECK (`tongTien` >= 0),
  `TrangThai` tinyint(4) DEFAULT 1,
  `maNhanVien` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`maHoaDon`, `maDonHang`, `maKhuyenMai`, `ngayXuatHoaDon`, `tongTien`, `TrangThai`, `maNhanVien`) VALUES
(6, 3, 2, '2025-04-12 03:34:00', 200000.00, 1, 3),
(7, 4, NULL, '2025-04-12 03:34:38', 150000.00, 1, 4),
(8, 5, 3, '2025-04-12 03:34:38', 100000.00, 1, 5),
(9, 1, NULL, '2025-04-12 03:35:28', 120000.00, 1, 1),
(10, 2, 1, '2025-04-12 03:35:28', 95000.00, 1, 2),
(30, 36, NULL, '2025-04-23 09:14:00', 0.00, 1, 1),
(31, 42, NULL, '2025-04-23 09:36:00', 50000.00, 1, 1),
(32, 43, NULL, '2025-04-23 09:38:00', 50000.00, 1, 1),
(33, 49, NULL, '2025-04-23 09:48:00', 0.00, 1, 1),
(34, 50, NULL, '2025-04-23 09:51:00', 0.00, 1, 1),
(35, 51, NULL, '2025-04-23 09:51:00', 50000.00, 1, 1),
(36, 52, NULL, '2025-04-23 09:52:00', 50000.00, 1, 1),
(37, 53, NULL, '2025-04-23 10:00:00', 50000.00, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `maKhachHang` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `GioiTinh` varchar(10) NOT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DiaChi` text NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`maKhachHang`, `HoTen`, `GioiTinh`, `SoDienThoai`, `Email`, `DiaChi`, `TrangThai`, `NgayTao`) VALUES
(1, 'Nguyen Van A', 'Nam', '0909123456', 'a.nguyen@example.com', '123 Đường ABC, TP.HCM', 1, '2025-04-04 16:31:05'),
(2, 'Tran Thi B', 'Nữ', '0912345678', 'b.tran@example.com', '456 Đường XYZ, Hà Nội', 1, '2025-04-04 16:31:05'),
(3, 'Le Van C', 'Nam', '0923456789', 'c.le@example.com', '789 Đường PQR, Đà Nẵng', 1, '2025-04-07 15:45:54'),
(4, 'Pham Thi D', 'Nữ', '0934567890', 'd.pham@example.com', '101 Đường JKL, Cần Thơ', 1, '2025-04-07 15:45:54'),
(5, 'Hoang Van E', 'Nam', '0945678901', 'e.hoang@example.com', '202 Đường DEF, Hải Phòng', 1, '2025-04-07 15:45:54'),
(6, 'Vu Thi F', 'Nữ', '0956789012', 'f.vu@example.com', '303 Đường GHI, Bình Dương', 1, '2025-04-07 15:45:54'),
(7, 'Ngo Van G', 'Nam', '0967890123', 'g.ngo@example.com', '404 Đường LMN, Nha Trang', 1, '2025-04-07 15:45:54'),
(8, 'Nguyen Thi H', 'Nữ', '0978901234', 'h.nguyen@example.com', '505 Đường STU, Huế', 1, '2025-04-07 15:45:54'),
(9, 'Tran Van I', 'Nam', '0989012345', 'i.tran@example.com', '606 Đường VWX, Quy Nhơn', 1, '2025-04-07 15:45:54'),
(10, 'Le Thi J', 'Nữ', '0990123456', 'j.le@example.com', '707 Đường YZ, Vũng Tàu', 1, '2025-04-07 15:45:54'),
(11, 'vinh', 'Nữ', '0123456789', 'vinh@vinh.com', 'ngoai dường', 1, '2025-04-16 07:06:34'),
(12, 'ac', 'Nam', '01234757523', 'a@a', 'ac', 1, '2025-04-22 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `khohang`
--

CREATE TABLE `khohang` (
  `MaKhoHang` int(11) NOT NULL,
  `TenKhoHang` varchar(100) NOT NULL,
  `DiaDiem` text NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khohang`
--

INSERT INTO `khohang` (`MaKhoHang`, `TenKhoHang`, `DiaDiem`, `TrangThai`, `NgayTao`) VALUES
(1, 'Kho Hà Nội', '789 Đường Trường Chinh, Quận Đống Đa, Hà Nội', 1, '2025-04-04 16:31:05'),
(2, 'Kho Hải Phòng', '123 Đường Lạch Tray, Quận Ngô Quyền, Hải Phòng', 1, '2025-04-04 16:31:05'),
(3, 'Kho Bình Dương', '456 Đường Mỹ Phước Tân Vạn, TP. Thủ Dầu Một, Bình Dương', 0, '2025-04-04 16:31:05'),
(4, 'Kho Nha Trang', '789 Đường Trần Phú, TP. Nha Trang, Khánh Hòa', 1, '2025-04-04 16:31:05'),
(5, 'Kho Cần Thơ', '321 Đường Nguyễn Trãi, TP. Cần Thơ', 0, '2025-04-04 16:31:05');

-- --------------------------------------------------------

--
-- Table structure for table `khuyenmai`
--

CREATE TABLE `khuyenmai` (
  `MaKhuyenMai` int(11) NOT NULL,
  `TenKhuyenMai` varchar(100) NOT NULL,
  `MoTa` text DEFAULT NULL,
  `GiaTriKhuyenMai` decimal(10,2) NOT NULL,
  `LoaiKhuyenMai` int(11) NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khuyenmai`
--

INSERT INTO `khuyenmai` (`MaKhuyenMai`, `TenKhuyenMai`, `MoTa`, `GiaTriKhuyenMai`, `LoaiKhuyenMai`, `NgayBatDau`, `NgayKetThuc`, `TrangThai`, `NgayTao`) VALUES
(1, 'Giảm 10% Cánh Gà', 'Giảm 10% cho tất cả các phần cánh gà', 10.00, 1, '2025-04-15', '2025-04-30', 1, '2025-04-11 10:22:23'),
(2, 'Giảm 20% Gà Viên', 'Giảm giá 20% cho các phần gà viên chiên giòn', 20.00, 1, '2025-05-01', '2025-05-15', 2, '2025-04-11 10:22:23'),
(3, 'Giảm 30,000 VND Đùi Gà', 'Giảm ngay 30,000 VND khi mua mỗi phần đùi gà rán', 30000.00, 2, '2025-05-10', '2025-05-20', 2, '2025-04-11 10:22:23'),
(4, 'Giảm 50,000 VND Gà Cay', 'Giảm 50,000 VND áp dụng cho các phần gà cay đặc biệt', 50000.00, 2, '2025-06-01', '2025-06-15', 1, '2025-04-11 10:22:23'),
(5, 'Tặng Nước Ngọt Khi Mua Đùi Gà', 'Mua 1 phần đùi gà rán tặng 1 lon nước ngọt', 0.00, 3, '2025-06-20', '2025-06-30', 1, '2025-04-11 10:22:23'),
(6, 'Tặng Khoai Tây Khi Mua Gà Rán', 'Tặng 1 phần khoai tây chiên cho mỗi phần gà rán', 0.00, 3, '2025-07-01', '2025-07-15', 1, '2025-04-11 10:22:23'),
(7, 'Giảm 15% Ức Gà', 'Giảm giá 15% cho các phần ức gà rán', 15.00, 1, '2025-07-20', '2025-07-30', 1, '2025-04-11 10:22:23'),
(8, 'Giảm 25,000 VND Gà Không Xương', 'Giảm giá 25,000 VND cho gà rán không xương', 25000.00, 2, '2025-08-01', '2025-08-15', 1, '2025-04-11 10:22:23'),
(9, 'Tặng Sốt Khi Mua Gà Rán', 'Tặng 1 phần sốt khi mua gà rán bất kỳ', 0.00, 3, '2025-08-20', '2025-08-31', 1, '2025-04-11 10:22:23'),
(10, 'Giảm 5% Gà Nguyên Con', 'Giảm giá 5% cho gà rán nguyên con', 5.00, 1, '2025-09-01', '2025-09-10', 1, '2025-04-11 10:22:23');

-- --------------------------------------------------------

--
-- Table structure for table `nguyenlieu`
--

CREATE TABLE `nguyenlieu` (
  `MaNguyenLieu` int(11) NOT NULL,
  `Ten` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DonVi` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GiaNhap` double NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `HinhAnh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `TrangThai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nguyenlieu`
--

INSERT INTO `nguyenlieu` (`MaNguyenLieu`, `Ten`, `DonVi`, `GiaNhap`, `SoLuong`, `HinhAnh`, `TrangThai`) VALUES
(1, 'Gạo', 'kg', 15000.5, 1609, 'http://localhost:8080/api/upload/gao.jpg', 1),
(2, 'Đường', 'kg', 20000, 1401, 'http://localhost:8080/api/upload/duong.jpg', 1),
(3, 'Sữa đặc', 'lon', 35000.75, 9502, 'http://localhost:8080/api/upload/sua-dac.jpg', 1),
(4, 'Dầu ăn', 'lít', 45000.25, 9402, 'http://localhost:8080/api/upload/dau-an.jpg', 1),
(5, 'Muối', 'kg', 8000, 24905, 'http://localhost:8080/api/upload/muoi.jpg', 1),
(6, 'Bột mì', 'kg', 12000.6, 6609, 'http://localhost:8080/api/upload/bot-mi.jpg', 1),
(7, 'Trứng gà', 'quả', 3000.2, 19806, 'http://localhost:8080/api/upload/trung-ga.jpg', 1),
(8, 'Nước mắm', 'chai', 25000.15, 34004, 'http://localhost:8080/api/upload/nuoc-mam.jpg', 1),
(9, 'Hạt nêm', 'gói', 18000.5, 3000, 'http://localhost:8080/api/upload/hat-nem.jpg', 1),
(10, 'Bột ngọt', 'kg', 22000.4, 60000, 'http://localhost:8080/api/upload/bot-ngot.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `maNhaCungCap` int(11) NOT NULL,
  `TenNhaCungCap` varchar(100) NOT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DiaChi` text NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhacungcap`
--

INSERT INTO `nhacungcap` (`maNhaCungCap`, `TenNhaCungCap`, `SoDienThoai`, `Email`, `DiaChi`, `TrangThai`, `NgayTao`) VALUES
(1, 'Công ty ABC', '0123456789', 'abc@abc.com', 'Số 10, Đường A, TP.HCM', 1, '2025-04-04 16:31:05'),
(2, 'Doanh nghiệp XYZ', '0987654321', 'xyz@xyz.com', 'Số 20, Đường B, Hà Nội', 1, '2025-04-04 16:31:05'),
(3, 'Công ty Thiết Bị Gia Đình', '0912345678', 'thietbi@gia.com', 'Số 30, Đường C, Đà Nẵng', 1, '2025-04-04 16:31:05'),
(4, 'Cửa hàng Sài Gòn Phát', '0934567890', 'saigonphat@gmail.com', 'Số 40, Đường D, TP.HCM', 0, '2025-04-04 16:31:05'),
(5, 'Nhà phân phối Minh Đức', '0945678901', 'minhduc@minhduc.com', 'Số 50, Đường E, Hải Phòng', 1, '2025-04-04 16:31:05'),
(6, 'Công ty Vận Tải Trung', '0956789012', 'vantai@trung.com', 'Số 60, Đường F, Nha Trang', 1, '2025-04-04 16:31:05'),
(7, 'Xưởng Cơ Khí Nam Hà', '0967890123', 'namha@xuongcokhi.com', 'Số 70, Đường G, Bình Dương', 0, '2025-04-04 16:31:05'),
(8, 'Nhà sản xuất Nhật Bản', '0978901234', 'nhatban@sanxuat.com', 'Số 80, Đường H, TP.HCM', 1, '2025-04-04 16:31:05'),
(9, 'Công ty Hóa Chất Thiên An', '0989012345', 'hoachat@thienan.com', 'Số 90, Đường I, Hà Nội', 1, '2025-04-04 16:31:05'),
(10, 'Đơn vị Phân Phối Toàn Cầu', '0990123456', 'toancau@phanphoi.com', 'Số 100, Đường J, Hải Phòng', 1, '2025-04-04 16:31:05');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MaNhanVien` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `GioiTinh` varchar(10) NOT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `DiaChi` text DEFAULT NULL,
  `ChucVu` varchar(50) NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`MaNhanVien`, `HoTen`, `GioiTinh`, `SoDienThoai`, `Email`, `DiaChi`, `ChucVu`, `TrangThai`, `NgayTao`) VALUES
(1, 'Le Van C', 'Nam', '0987654321', 'vuh265@gmail.com', '789 Đường PQR, Đà Nẵng', 'Nhân viên giao hàng', 1, '2025-04-04 16:31:05'),
(2, 'Pham Thi D', 'Nữ', '0971234567', 'admin@gmail.com', '321 Đường LMN, TP.HCM', 'Quản lý', 1, '2025-04-04 16:31:05'),
(3, 'Do Quoc H', 'Nam', '0998765432', 'h.do@example.com', '123 Đường ABC, Hà Nội', 'Nhân viên kho', 1, '2025-04-12 03:34:14'),
(4, 'Tran Thi E', 'Nữ', '0965432109', 'e.tran@example.com', '456 Đường XYZ, Cần Thơ', 'Nhân viên bán hàng', 1, '2025-04-12 03:34:14'),
(5, 'Nguyen Van F', 'Nam', '0943216789', 'f.nguyen@example.com', '888 Đường JKL, Hải Phòng', 'Nhân viên chăm sóc khách hàng', 1, '2025-04-12 03:34:14'),
(6, 'Bui Thi G', 'Nữ', '0932143657', 'g.bui@example.com', '101 Đường TUV, Huế', 'Kế toán', 1, '2025-04-12 03:34:14'),
(7, 'nguyen vinh', 'Khác', '0123456789', 'vinh@vinh.com', 'đau cx dc', 'dọn vệ sinh', 1, '2025-04-16 07:06:01');

-- --------------------------------------------------------

--
-- Table structure for table `phanquyen`
--

CREATE TABLE `phanquyen` (
  `MaPhanQuyen` int(11) NOT NULL,
  `TenQuyen` varchar(50) NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `DanhSachChucNang` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phanquyen`
--

INSERT INTO `phanquyen` (`MaPhanQuyen`, `TenQuyen`, `TrangThai`, `DanhSachChucNang`) VALUES
(1, 'Khách hàng', 1, ''),
(2, 'Quản lý', 1, 'NhapKho: access, create, fix, delete; XuatKho: access, create, fix, delete; KhoHang: access, create, fix, delete; NhaCungCap: access, create, fix, delete; NguyenLieu: access, create, fix, delete; SanPham: access, create, fix, delete; CheBien: access, create, fix, delete; DonHang: access, create, fix, delete; HoaDon: access, create, fix, delete; KhuyenMai: access, create, fix, delete; KhachHang: access, create, fix, delete; NhanVien: access, create, fix, delete; TaiKhoan: access, create, fix, delete; PhanQuyen: access, create, fix, delete; ThongKe: access'),
(3, 'Nhân viên', 1, 'khachhang: access, create; donhang: create; sanpham: access'),
(4, 'tesst', 0, 'NhapKho: access, create, fix, delete; XuatKho: access, create, fix; KhoHang: ; NhaCungCap: ; NguyenLieu: access, create, fix; SanPham: access, create; CheBien: access, create, fix; DonHang: access, fix; HoaDon: access, fix; KhyenMai: access; KhachHang: access; NhanVien: access, create, fix; TaiKhoan: access, create; PhanQuyen: fix');

-- --------------------------------------------------------

--
-- Table structure for table `phieunhap`
--

CREATE TABLE `phieunhap` (
  `id` bigint(20) NOT NULL,
  `maPhieu` varchar(50) DEFAULT NULL,
  `tenPhieu` varchar(255) NOT NULL,
  `fileChungTu` varchar(255) DEFAULT NULL,
  `nhaCungCap` int(11) NOT NULL,
  `MaKhoHang` int(11) NOT NULL,
  `ghiChu` text DEFAULT NULL,
  `trangThai` varchar(50) NOT NULL DEFAULT 'DAT_HANG',
  `thoiGianTao` datetime DEFAULT NULL,
  `thoiGianCapNhat` datetime DEFAULT NULL,
  `thoiGianHuy` datetime DEFAULT NULL,
  `nguoiNhap` int(11) DEFAULT NULL,
  `nguoiHuy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phieuxuat`
--

CREATE TABLE `phieuxuat` (
  `id` bigint(20) NOT NULL,
  `maPhieu` varchar(50) DEFAULT NULL,
  `tenPhieu` varchar(255) NOT NULL,
  `MaKhoHang` int(11) NOT NULL,
  `fileChungTu` varchar(255) DEFAULT NULL,
  `ghiChu` text DEFAULT NULL,
  `thoiGianTao` datetime DEFAULT NULL,
  `nguoiXuat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `MaSanPham` int(11) NOT NULL,
  `TenSanPham` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GiaSanXuat` double NOT NULL,
  `GiaBan` double NOT NULL,
  `HinhAnh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SoLuong` int(11) NOT NULL,
  `MoTa` text DEFAULT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `NgayTao` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`MaSanPham`, `TenSanPham`, `GiaSanXuat`, `GiaBan`, `HinhAnh`, `SoLuong`, `MoTa`, `TrangThai`, `NgayTao`) VALUES
(1, 'Gà Rán Truyền Thống', 30000, 50000, 'http://localhost:8080/api/upload/ga_ran_truyen_thong.jpg', 359, 'Gà rán giòn rụm với hương vị đặc trưng', 1, '2025-04-03'),
(2, 'Gà Rán Cay', 35000, 60000, 'http://localhost:8080/api/upload/ga_ran_cay.jpg', 0, 'Gà rán cay nóng, thêm sức hấp dẫn', 1, '2025-04-03'),
(3, 'Burger Gà', 40000, 70000, 'http://localhost:8080/api/upload/burger_ga.jpg', 2, 'Burger gà với rau tươi và sốt đặc biệt', 1, '2025-04-03'),
(4, 'Khoai Tây Chiên', 20000, 35000, 'http://localhost:8080/api/upload/khoai_tay_chien.jpg', 600, 'Khoai tây chiên giòn tan với gia vị', 1, '2025-04-03'),
(5, 'Salad Gà', 25000, 45000, 'http://localhost:8080/api/upload/salad_ga.jpg', 800, 'Salad gà tươi mát với sốt Caesar', 1, '2025-04-03'),
(6, 'Gà Viên Chiên', 30000, 50000, 'http://localhost:8080/api/upload/ga_vien_chien.jpg', 200, 'Gà viên chiên nhỏ xinh, tiện lợi', 1, '2025-04-03'),
(7, 'Nước Ngọt Cola', 10000, 20000, 'http://localhost:8080/api/upload/nuoc_ngot_cola.jpg', 300, 'Nước ngọt giải khát hương cola', 1, '2025-04-03'),
(8, 'Nước Ngọt Chanh', 10000, 20000, 'http://localhost:8080/api/upload/nuoc_ngot_chanh.jpg', 150, 'Nước giải khát chanh mát lạnh', 1, '2025-04-03'),
(9, 'Cơm Gà', 30000, 55000, 'http://localhost:8080/api/upload/com_ga.jpg', 200, 'Cơm gà thơm ngon với rau củ', 1, '2025-04-03'),
(10, 'Gà Rán Không Xương', 40000, 65000, 'http://localhost:8080/api/upload/ga_ran_khong_xuong.jpg', 280, 'Gà rán không xương, tiện lợi thưởng thức', 1, '2025-04-03');

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `MaTaiKhoan` int(11) NOT NULL,
  `TenDangNhap` varchar(50) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `MaPhanQuyen` int(11) NOT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`MaTaiKhoan`, `TenDangNhap`, `MatKhau`, `Email`, `MaPhanQuyen`, `TrangThai`, `NgayTao`) VALUES
(1, 'user1', 'hashed_password1', 'user1@example.com', 1, 1, '2025-04-04 16:30:18'),
(2, 'shipper1', 'bf4bc74a54177aed8ba8b25d654c325797640e40b7c2d8aa417b23495f346e8f', 'shipper1@example.com', 2, 1, '2025-04-04 16:30:18'),
(3, 'manager1', 'hashed_password3', 'manager1@example.com', 3, 1, '2025-04-04 16:30:18'),
(4, 'shipper2', 'hashed_password2', 'vuh265@gmail.com', 2, 1, '2025-04-06 15:54:25'),
(5, 'shipper3', 'hashed_password2', 'anhtuancogang123@gmail.com', 2, 1, '2025-04-06 15:54:25'),
(6, 'shipper4', 'hashed_password2', 'phamtandat2206@gmail.com', 2, 1, '2025-04-06 15:54:25'),
(7, 'abcc', 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'a@aaaa.com', 2, 1, '2025-04-09 03:59:56'),
(8, 'abc', 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'a@a', 1, 1, '2025-04-22 08:03:39'),
(9, 'admin', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'admin@gmail.com', 2, 1, '2025-04-28 03:58:30');

-- --------------------------------------------------------

--
-- Table structure for table `tonkho`
--

CREATE TABLE `tonkho` (
  `MaTonKho` int(11) NOT NULL,
  `MaKhoHang` int(11) NOT NULL,
  `MaNguyenLieu` int(11) NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `NgayCapNhat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chebien`
--
ALTER TABLE `chebien`
  ADD PRIMARY KEY (`MaCheBien`),
  ADD KEY `fk_NguoiCheBien` (`NguoiCheBien`);

--
-- Indexes for table `chitietchebien`
--
ALTER TABLE `chitietchebien`
  ADD PRIMARY KEY (`MaChiTiet`),
  ADD KEY `fk_CheBien` (`MaCheBien`),
  ADD KEY `fk_SanPham` (`MaSanPham`);

--
-- Indexes for table `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD PRIMARY KEY (`maChiTiet`),
  ADD KEY `maDonHang` (`maDonHang`),
  ADD KEY `maSanPham` (`maSanPham`);

--
-- Indexes for table `chitietnguyenlieusanpham`
--
ALTER TABLE `chitietnguyenlieusanpham`
  ADD PRIMARY KEY (`MaChiTiet`),
  ADD KEY `MaSanPham` (`MaSanPham`),
  ADD KEY `MaNguyenLieu` (`MaNguyenLieu`);

--
-- Indexes for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lienKetPhieuNhap` (`maPhieuNhap`),
  ADD KEY `lienKetNguyenLieu` (`maNguyenLieu`);

--
-- Indexes for table `chitietphieuxuat`
--
ALTER TABLE `chitietphieuxuat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_PhieuXuat` (`maPhieuXuat`),
  ADD KEY `fk_NguyenLieu` (`maNguyenLieu`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`maDonHang`),
  ADD KEY `maKhachHang` (`maKhachHang`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`maHoaDon`),
  ADD KEY `maDonHang` (`maDonHang`),
  ADD KEY `maKhuyenMai` (`maKhuyenMai`),
  ADD KEY `maNhanVien` (`maNhanVien`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`maKhachHang`),
  ADD UNIQUE KEY `SoDienThoai` (`SoDienThoai`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `khohang`
--
ALTER TABLE `khohang`
  ADD PRIMARY KEY (`MaKhoHang`);

--
-- Indexes for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  ADD PRIMARY KEY (`MaKhuyenMai`);

--
-- Indexes for table `nguyenlieu`
--
ALTER TABLE `nguyenlieu`
  ADD PRIMARY KEY (`MaNguyenLieu`);

--
-- Indexes for table `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`maNhaCungCap`),
  ADD UNIQUE KEY `SoDienThoai` (`SoDienThoai`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MaNhanVien`),
  ADD UNIQUE KEY `SoDienThoai` (`SoDienThoai`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `phanquyen`
--
ALTER TABLE `phanquyen`
  ADD PRIMARY KEY (`MaPhanQuyen`);

--
-- Indexes for table `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `maPhieu` (`maPhieu`),
  ADD KEY `lienKetNhaCungCap` (`nhaCungCap`),
  ADD KEY `lienKetKhoHang` (`MaKhoHang`),
  ADD KEY `lienKetNguoiTao` (`nguoiNhap`),
  ADD KEY `lienKetNguoiHuy` (`nguoiHuy`);

--
-- Indexes for table `phieuxuat`
--
ALTER TABLE `phieuxuat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `maPhieu` (`maPhieu`),
  ADD KEY `lienKetKhoHangXuat` (`MaKhoHang`),
  ADD KEY `fk_NguoiXuat` (`nguoiXuat`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MaSanPham`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`MaTaiKhoan`),
  ADD UNIQUE KEY `TenDangNhap` (`TenDangNhap`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `MaPhanQuyen` (`MaPhanQuyen`);

--
-- Indexes for table `tonkho`
--
ALTER TABLE `tonkho`
  ADD PRIMARY KEY (`MaTonKho`),
  ADD KEY `MaKhoHang` (`MaKhoHang`),
  ADD KEY `MaNguyenLieu` (`MaNguyenLieu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chebien`
--
ALTER TABLE `chebien`
  MODIFY `MaCheBien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `chitietchebien`
--
ALTER TABLE `chitietchebien`
  MODIFY `MaChiTiet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  MODIFY `maChiTiet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `chitietnguyenlieusanpham`
--
ALTER TABLE `chitietnguyenlieusanpham`
  MODIFY `MaChiTiet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chitietphieuxuat`
--
ALTER TABLE `chitietphieuxuat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `maDonHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `maHoaDon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `maKhachHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `khohang`
--
ALTER TABLE `khohang`
  MODIFY `MaKhoHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `khuyenmai`
--
ALTER TABLE `khuyenmai`
  MODIFY `MaKhuyenMai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `nguyenlieu`
--
ALTER TABLE `nguyenlieu`
  MODIFY `MaNguyenLieu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `nhacungcap`
--
ALTER TABLE `nhacungcap`
  MODIFY `maNhaCungCap` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `MaNhanVien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `phanquyen`
--
ALTER TABLE `phanquyen`
  MODIFY `MaPhanQuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `phieunhap`
--
ALTER TABLE `phieunhap`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phieuxuat`
--
ALTER TABLE `phieuxuat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MaSanPham` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `MaTaiKhoan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tonkho`
--
ALTER TABLE `tonkho`
  MODIFY `MaTonKho` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chebien`
--
ALTER TABLE `chebien`
  ADD CONSTRAINT `fk_NguoiCheBien` FOREIGN KEY (`NguoiCheBien`) REFERENCES `nhanvien` (`MaNhanVien`);

--
-- Constraints for table `chitietchebien`
--
ALTER TABLE `chitietchebien`
  ADD CONSTRAINT `fk_CheBien` FOREIGN KEY (`MaCheBien`) REFERENCES `chebien` (`MaCheBien`),
  ADD CONSTRAINT `fk_SanPham` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`);

--
-- Constraints for table `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`maDonHang`) REFERENCES `donhang` (`maDonHang`),
  ADD CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`maSanPham`) REFERENCES `sanpham` (`MaSanPham`);

--
-- Constraints for table `chitietnguyenlieusanpham`
--
ALTER TABLE `chitietnguyenlieusanpham`
  ADD CONSTRAINT `chitietnguyenlieusanpham_ibfk_1` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`),
  ADD CONSTRAINT `chitietnguyenlieusanpham_ibfk_2` FOREIGN KEY (`MaNguyenLieu`) REFERENCES `nguyenlieu` (`MaNguyenLieu`);

--
-- Constraints for table `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD CONSTRAINT `lienKetNguyenLieu` FOREIGN KEY (`maNguyenLieu`) REFERENCES `nguyenlieu` (`MaNguyenLieu`),
  ADD CONSTRAINT `lienKetPhieuNhap` FOREIGN KEY (`maPhieuNhap`) REFERENCES `phieunhap` (`id`);

--
-- Constraints for table `chitietphieuxuat`
--
ALTER TABLE `chitietphieuxuat`
  ADD CONSTRAINT `fk_NguyenLieu` FOREIGN KEY (`maNguyenLieu`) REFERENCES `nguyenlieu` (`MaNguyenLieu`),
  ADD CONSTRAINT `fk_PhieuXuat` FOREIGN KEY (`maPhieuXuat`) REFERENCES `phieuxuat` (`id`);

--
-- Constraints for table `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`maKhachHang`) REFERENCES `khachhang` (`maKhachHang`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`maDonHang`) REFERENCES `donhang` (`maDonHang`),
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`maKhuyenMai`) REFERENCES `khuyenmai` (`MaKhuyenMai`),
  ADD CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`maNhanVien`) REFERENCES `nhanvien` (`MaNhanVien`);

--
-- Constraints for table `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `lienKetKhoHang` FOREIGN KEY (`MaKhoHang`) REFERENCES `khohang` (`MaKhoHang`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lienKetNguoiHuy` FOREIGN KEY (`nguoiHuy`) REFERENCES `nhanvien` (`MaNhanVien`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lienKetNguoiTao` FOREIGN KEY (`nguoiNhap`) REFERENCES `nhanvien` (`MaNhanVien`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lienKetNhaCungCap` FOREIGN KEY (`nhaCungCap`) REFERENCES `nhacungcap` (`maNhaCungCap`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phieuxuat`
--
ALTER TABLE `phieuxuat`
  ADD CONSTRAINT `fk_NguoiXuat` FOREIGN KEY (`nguoiXuat`) REFERENCES `nhanvien` (`MaNhanVien`),
  ADD CONSTRAINT `lienKetKhoHangXuat` FOREIGN KEY (`MaKhoHang`) REFERENCES `khohang` (`MaKhoHang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `taikhoan_ibfk_1` FOREIGN KEY (`MaPhanQuyen`) REFERENCES `phanquyen` (`MaPhanQuyen`);

--
-- Constraints for table `tonkho`
--
ALTER TABLE `tonkho`
  ADD CONSTRAINT `tonkho_ibfk_1` FOREIGN KEY (`MaKhoHang`) REFERENCES `khohang` (`MaKhoHang`),
  ADD CONSTRAINT `tonkho_ibfk_2` FOREIGN KEY (`MaNguyenLieu`) REFERENCES `nguyenlieu` (`MaNguyenLieu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
