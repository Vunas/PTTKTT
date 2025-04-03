-- Tạo cơ sở dữ liệu
CREATE DATABASE fastfood;
USE fastfood;

-- Tạo bảng PhanQuyen
CREATE TABLE PhanQuyen (
    MaPhanQuyen INT PRIMARY KEY AUTO_INCREMENT,
    TenQuyen VARCHAR(50) NOT NULL,
    TrangThai TINYINT DEFAULT 1,
    DanhSachChucNang VARCHAR(256) NOT NULL
);

INSERT INTO PhanQuyen (TenQuyen, DanhSachChucNang)
VALUES 
    ('Khách hàng', ''),
    ('Quản lý', 'khachhang: access, create, fix, delete; nhanvien: access'),
    ('Nhân viên', 'khachhang: access, update; donhang: create, update; sanpham: access');

-- Tạo bảng TaiKhoan
CREATE TABLE TaiKhoan (
    MaTaiKhoan INT PRIMARY KEY AUTO_INCREMENT,
    TenDangNhap VARCHAR(50) NOT NULL UNIQUE,
    MatKhau VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    MaPhanQuyen INT NOT NULL,
    TrangThai TINYINT DEFAULT 1,
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MaPhanQuyen) REFERENCES PhanQuyen(MaPhanQuyen)
);

INSERT INTO TaiKhoan (TenDangNhap, MatKhau, Email, MaPhanQuyen)
VALUES
    ('user1', 'hashed_password1', 'user1@example.com', 1),
    ('shipper1', 'hashed_password2', 'shipper1@example.com', 2),
    ('manager1', 'hashed_password3', 'manager1@example.com', 3);

-- Tạo bảng NhanVien
CREATE TABLE NhanVien (
    MaNhanVien INT PRIMARY KEY AUTO_INCREMENT,
    HoTen VARCHAR(100) NOT NULL,
    GioiTinh VARCHAR(10) NOT NULL,
    SoDienThoai VARCHAR(15) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    DiaChi TEXT,
    ChucVu VARCHAR(50) NOT NULL,
    TrangThai TINYINT DEFAULT 1,
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

INSERT INTO NhanVien (HoTen, GioiTinh, SoDienThoai, Email, DiaChi, ChucVu)
VALUES
    ('Le Van C', 'Nam', '0987654321', 'c.le@example.com', '789 Đường PQR, Đà Nẵng', 'Nhân viên giao hàng'),
    ('Pham Thi D', 'Nữ', '0971234567', 'd.pham@example.com', '321 Đường LMN, TP.HCM', 'Quản lý');

-- Tạo bảng KhachHang
CREATE TABLE KhachHang (
    maKhachHang INT PRIMARY KEY AUTO_INCREMENT,
    HoTen VARCHAR(100) NOT NULL,
    GioiTinh VARCHAR(10) NOT NULL,
    SoDienThoai VARCHAR(15) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE,
    DiaChi TEXT NOT NULL,
    TrangThai TINYINT DEFAULT 1,
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO KhachHang (HoTen, GioiTinh, SoDienThoai, Email, DiaChi)
VALUES
    ('Nguyen Van A', 'Nam', '0909123456', 'a.nguyen@example.com', '123 Đường ABC, TP.HCM'),
    ('Tran Thi B', 'Nữ', '0912345678', 'b.tran@example.com', '456 Đường XYZ, Hà Nội');

-- Tạo bảng NguyenLieu
CREATE TABLE NguyenLieu (
    MaNguyenLieu INT PRIMARY KEY AUTO_INCREMENT,      -- Mã nguyên liệu tự động tăng
    Ten NVARCHAR(100) NOT NULL,             -- Tên nguyên liệu
    DonVi NVARCHAR(50) NOT NULL,            -- Đơn vị (ví dụ: kg, lít, lon)
    GiaNhap DOUBLE NOT NULL,                -- Giá nhập (kiểu DOUBLE)
    SoLuong INT NOT NULL,                   -- Số lượng
    HinhAnh NVARCHAR(255),                  -- Đường dẫn hình ảnh
    TrangThai TINYINT DEFAULT 1             -- Trạng thái (1: Hoạt động, 0: Không hoạt động)
);

-- Thêm dữ liệu vào bảng NguyenLieu
INSERT INTO NguyenLieu (Ten, DonVi, GiaNhap, SoLuong, HinhAnh)
VALUES ('Gạo', 'kg', 15000.50, 100, 'http://localhost:8080/api/upload/gao.jpg'),
       ('Đường', 'kg', 20000.00, 50, 'http://localhost:8080/api/upload/duong.jpg'),
       ('Sữa đặc', 'lon', 35000.75, 30, 'http://localhost:8080/api/upload/sua-dac.jpg'),
       ('Dầu ăn', 'lít', 45000.25, 20, 'http://localhost:8080/api/upload/dau-an.jpg'),
       ('Muối', 'kg', 8000.00, 150, 'http://localhost:8080/api/upload/muoi.jpg'),
       ('Bột mì', 'kg', 12000.60, 80, 'http://localhost:8080/api/upload/bot-mi.jpg'),
       ('Trứng gà', 'quả', 3000.20, 200, 'http://localhost:8080/api/upload/trung-ga.jpg'),
       ('Nước mắm', 'chai', 25000.15, 40, 'http://localhost:8080/api/upload/nuoc-mam.jpg'),
       ('Hạt nêm', 'gói', 18000.50, 60, 'http://localhost:8080/api/upload/hat-nem.jpg'),
       ('Bột ngọt', 'kg', 22000.40, 70, 'http://localhost:8080/api/upload/bot-ngot.jpg');

CREATE TABLE NhaCungCap (
    maNhaCungCap INT PRIMARY KEY AUTO_INCREMENT, -- Mã Nhà Cung Cấp
    TenNhaCungCap VARCHAR(100) NOT NULL,          -- Tên Nhà Cung Cấp
    SoDienThoai VARCHAR(15) UNIQUE NOT NULL,      -- Số Điện Thoại
    Email VARCHAR(100) UNIQUE,                    -- Email
    DiaChi TEXT NOT NULL,                         -- Địa Chỉ
    TrangThai TINYINT DEFAULT 1,                  -- Trạng Thái (1: Hoạt động, 0: Ngừng hoạt động)
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Ngày tạo
);

INSERT INTO NhaCungCap (TenNhaCungCap, SoDienThoai, Email, DiaChi, TrangThai)
VALUES
    ('Công ty ABC', '0123456789', 'abc@abc.com', 'Số 10, Đường A, TP.HCM', 1),
    ('Doanh nghiệp XYZ', '0987654321', 'xyz@xyz.com', 'Số 20, Đường B, Hà Nội', 1),
    ('Công ty Thiết Bị Gia Đình', '0912345678', 'thietbi@gia.com', 'Số 30, Đường C, Đà Nẵng', 1),
    ('Cửa hàng Sài Gòn Phát', '0934567890', 'saigonphat@gmail.com', 'Số 40, Đường D, TP.HCM', 0),
    ('Nhà phân phối Minh Đức', '0945678901', 'minhduc@minhduc.com', 'Số 50, Đường E, Hải Phòng', 1),
    ('Công ty Vận Tải Trung', '0956789012', 'vantai@trung.com', 'Số 60, Đường F, Nha Trang', 1),
    ('Xưởng Cơ Khí Nam Hà', '0967890123', 'namha@xuongcokhi.com', 'Số 70, Đường G, Bình Dương', 0),
    ('Nhà sản xuất Nhật Bản', '0978901234', 'nhatban@sanxuat.com', 'Số 80, Đường H, TP.HCM', 1),
    ('Công ty Hóa Chất Thiên An', '0989012345', 'hoachat@thienan.com', 'Số 90, Đường I, Hà Nội', 1),
    ('Đơn vị Phân Phối Toàn Cầu', '0990123456', 'toancau@phanphoi.com', 'Số 100, Đường J, Hải Phòng', 1);

CREATE TABLE SanPham (
    MaSanPham INT PRIMARY KEY AUTO_INCREMENT,      -- Mã sản phẩm tự động tăng
    TenSanPham NVARCHAR(100) NOT NULL,            -- Tên sản phẩm
    GiaSanXuat DOUBLE NOT NULL,                   -- Giá sản xuất
    GiaBan DOUBLE NOT NULL,                       -- Giá bán
    HinhAnh NVARCHAR(255),                        -- Đường dẫn hình ảnh
    SoLuong INT NOT NULL,                         -- Số lượng
    MoTa TEXT,                                    -- Mô tả sản phẩm
    TrangThai TINYINT DEFAULT 1,                  -- Trạng thái (1: Hoạt động, 0: Không hoạt động)
    NgayTao DATE DEFAULT CURRENT_DATE             -- Ngày tạo (mặc định là ngày hiện tại)
);

INSERT INTO SanPham (TenSanPham, GiaSanXuat, GiaBan, HinhAnh, SoLuong, MoTa, TrangThai, NgayTao) VALUES
('Gà Rán Truyền Thống', 30000, 50000, 'http://localhost:8080/api/upload/ga_ran_truyen_thong.jpg', 200, 'Gà rán giòn rụm với hương vị đặc trưng', 1, '2025-04-03'),
('Gà Rán Cay', 35000, 60000, 'http://localhost:8080/api/upload/ga_ran_cay.jpg', 150, 'Gà rán cay nóng, thêm sức hấp dẫn', 1, '2025-04-03'),
('Burger Gà', 40000, 70000, 'http://localhost:8080/api/upload/burger_ga.jpg', 100, 'Burger gà với rau tươi và sốt đặc biệt', 1, '2025-04-03'),
('Khoai Tây Chiên', 20000, 35000, 'http://localhost:8080/api/upload/khoai_tay_chien.jpg', 300, 'Khoai tây chiên giòn tan với gia vị', 1, '2025-04-03'),
('Salad Gà', 25000, 45000, 'http://localhost:8080/api/upload/salad_ga.jpg', 80, 'Salad gà tươi mát với sốt Caesar', 1, '2025-04-03'),
('Gà Viên Chiên', 30000, 50000, 'http://localhost:8080/api/upload/ga_vien_chien.jpg', 180, 'Gà viên chiên nhỏ xinh, tiện lợi', 1, '2025-04-03'),
('Nước Ngọt Cola', 10000, 20000, 'http://localhost:8080/api/upload/nuoc_ngot_cola.jpg', 500, 'Nước ngọt giải khát hương cola', 1, '2025-04-03'),
('Nước Ngọt Chanh', 10000, 20000, 'http://localhost:8080/api/upload/nuoc_ngot_chanh.jpg', 450, 'Nước giải khát chanh mát lạnh', 1, '2025-04-03'),
('Cơm Gà', 30000, 55000, 'http://localhost:8080/api/upload/com_ga.jpg', 120, 'Cơm gà thơm ngon với rau củ', 1, '2025-04-03'),
('Gà Rán Không Xương', 40000, 65000, 'http://localhost:8080/api/upload/ga_ran_khong_xuong.jpg', 90, 'Gà rán không xương, tiện lợi thưởng thức', 1, '2025-04-03');

