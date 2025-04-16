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
    ('shipper2', 'hashed_password2', 'vuh265@gmail.com', 2),
    ('shipper3', 'hashed_password2', 'anhtuancogang123@gmail.com', 2),
    ('shipper4', 'hashed_password2', 'phamtandat2206@gmail.com', 2),
    ('manager1', 'hashed_password3', 'vietdq19042005@gmail.com', 2);

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
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO NhanVien (HoTen, GioiTinh, SoDienThoai, Email, DiaChi, ChucVu) 
VALUES
<<<<<<< HEAD
    ('Le Van C', 'Nam', '0987654321', 'vuh265@gmail.com.le@example.com', '789 Đường PQR, Đà Nẵng', 'Nhân viên giao hàng'),
    ('Pham Thi D', 'Nữ', '0971234567', 'd.pham@example.com', '321 Đường LMN, TP.HCM', 'Quản lý'),
    ('Nguyen Van E', 'Nam', '0901234567', 'e.nguyen@example.com', '456 Đường XYZ, Hà Nội', 'Nhân viên kho'),
    ('Tran Thi F', 'Nữ', '0937654321', 'f.tran@example.com', '123 Đường ABC, Cần Thơ', 'Kế toán'),
    ('Hoang Van G', 'Nam', '0918888888', 'g.hoang@example.com', '654 Đường TUV, Huế', 'Bảo vệ'),
    ('Bui Thi H', 'Nữ', '0929999999', 'h.bui@example.com', '987 Đường QRS, Vũng Tàu', 'Nhân viên bán hàng');

=======
    ('Le Van C', 'Nam', '0987654321', 'c.le@example.com', '789 Đường PQR, Đà Nẵng', 'Nhân viên giao hàng'),
    ('Pham Thi D', 'Nữ', '0971234567', 'd.pham@example.com', '321 Đường LMN, TP.HCM', 'Quản lý'),
    ('Do Quoc H', 'Nam', '0998765432', 'h.do@example.com', '123 Đường ABC, Hà Nội', 'Nhân viên kho'),
    ('Tran Thi E', 'Nữ', '0965432109', 'e.tran@example.com', '456 Đường XYZ, Cần Thơ', 'Nhân viên bán hàng'),
    ('Nguyen Van F', 'Nam', '0943216789', 'f.nguyen@example.com', '888 Đường JKL, Hải Phòng', 'Nhân viên chăm sóc khách hàng'),
    ('Bui Thi G', 'Nữ', '0932143657', 'g.bui@example.com', '101 Đường TUV, Huế', 'Kế toán');
    
>>>>>>> vu
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
    ('Tran Thi B', 'Nữ', '0912345678', 'b.tran@example.com', '456 Đường XYZ, Hà Nội'),
    ('Le Van C', 'Nam', '0923456789', 'c.le@example.com', '789 Đường PQR, Đà Nẵng'),
    ('Pham Thi D', 'Nữ', '0934567890', 'd.pham@example.com', '101 Đường JKL, Cần Thơ'),
    ('Hoang Van E', 'Nam', '0945678901', 'e.hoang@example.com', '202 Đường DEF, Hải Phòng'),
    ('Vu Thi F', 'Nữ', '0956789012', 'f.vu@example.com', '303 Đường GHI, Bình Dương'),
    ('Ngo Van G', 'Nam', '0967890123', 'g.ngo@example.com', '404 Đường LMN, Nha Trang'),
    ('Nguyen Thi H', 'Nữ', '0978901234', 'h.nguyen@example.com', '505 Đường STU, Huế'),
    ('Tran Van I', 'Nam', '0989012345', 'i.tran@example.com', '606 Đường VWX, Quy Nhơn'),
    ('Le Thi J', 'Nữ', '0990123456', 'j.le@example.com', '707 Đường YZ, Vũng Tàu');


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

CREATE TABLE KhoHang (
    MaKhoHang INT PRIMARY KEY AUTO_INCREMENT,
    TenKhoHang VARCHAR(100) NOT NULL,
    DiaDiem TEXT NOT NULL,
    TrangThai TINYINT DEFAULT 1,
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO KhoHang (TenKhoHang, DiaDiem, TrangThai)
VALUES ('Kho Hà Nội', '789 Đường Trường Chinh, Quận Đống Đa, Hà Nội', 1),
       ('Kho Hải Phòng', '123 Đường Lạch Tray, Quận Ngô Quyền, Hải Phòng', 1),
       ('Kho Bình Dương', '456 Đường Mỹ Phước Tân Vạn, TP. Thủ Dầu Một, Bình Dương', 0),
       ('Kho Nha Trang', '789 Đường Trần Phú, TP. Nha Trang, Khánh Hòa', 1),
       ('Kho Cần Thơ', '321 Đường Nguyễn Trãi, TP. Cần Thơ', 0);

CREATE TABLE TonKho (
    MaTonKho INT PRIMARY KEY AUTO_INCREMENT, -- Mã tồn kho tự động tăng
    MaKhoHang INT NOT NULL,                  -- Mã kho (liên kết với bảng KhoHang)
    MaSanPham INT NOT NULL,                  -- Mã sản phẩm (liên kết với bảng SanPham)
    SoLuong INT NOT NULL,                    -- Số lượng tồn kho
    NgayCapNhat TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Ngày cập nhật
    FOREIGN KEY (MaKhoHang) REFERENCES KhoHang(MaKhoHang),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham)
);

INSERT INTO TonKho (MaKhoHang, MaSanPham, SoLuong) VALUES
(1, 1, 100), -- Kho Trung Tâm có 100 sản phẩm "Gà Rán Truyền Thống"
(1, 2, 80),  -- Kho Trung Tâm có 80 sản phẩm "Gà Rán Cay"
(2, 3, 50),  -- Kho Khu Vực (Hà Nội) có 50 sản phẩm "Burger Gà"
(3, 4, 150), -- Kho Miền Tây có 150 sản phẩm "Khoai Tây Chiên"
(3, 5, 30),  -- Kho Miền Tây có 30 sản phẩm "Salad Gà"
(2, 6, 70),  -- Kho Khu Vực (Hà Nội) có 70 sản phẩm "Gà Viên Chiên"
(1, 7, 200), -- Kho Trung Tâm có 200 sản phẩm "Nước Ngọt Cola"
(1, 8, 180), -- Kho Trung Tâm có 180 sản phẩm "Nước Ngọt Chanh"
(3, 9, 90),  -- Kho Miền Tây có 90 sản phẩm "Cơm Gà"
(2, 10, 40); -- Kho Khu Vực (Hà Nội) có 40 sản phẩm "Gà Rán Không Xương"

CREATE TABLE ChiTietNguyenLieuSanPham (
    MaChiTiet INT PRIMARY KEY AUTO_INCREMENT, -- Mã chi tiết tự động tăng
    MaSanPham INT NOT NULL,                   -- Mã sản phẩm (liên kết với bảng SanPham)
    MaNguyenLieu INT NOT NULL,                -- Mã nguyên liệu (liên kết với bảng NguyenLieu)
    SoLuongNguyenLieu DOUBLE NOT NULL,        -- Số lượng nguyên liệu cần cho 1 sản phẩm
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham),
    FOREIGN KEY (MaNguyenLieu) REFERENCES NguyenLieu(MaNguyenLieu)
);

CREATE TABLE NhapKho (
    MaNhapKho INT PRIMARY KEY AUTO_INCREMENT, -- Mã nhập kho tự động tăng
    MaKhoHang INT NOT NULL,                   -- Mã kho (liên kết với bảng KhoHang)
    MaNguyenLieu INT NOT NULL,                -- Mã nguyên liệu (liên kết với bảng NguyenLieu)
    SoLuong INT NOT NULL,                     -- Số lượng nhập
    GiaNhap DOUBLE NOT NULL,                  -- Giá nhập
    NgayNhap TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Ngày nhập
    FOREIGN KEY (MaKhoHang) REFERENCES KhoHang(MaKhoHang),
    FOREIGN KEY (MaNguyenLieu) REFERENCES NguyenLieu(MaNguyenLieu)
);

CREATE TABLE XuatKho (
    MaXuatKho INT PRIMARY KEY AUTO_INCREMENT, -- Mã xuất kho tự động tăng
    MaKhoHang INT NOT NULL,                   -- Mã kho (liên kết với bảng KhoHang)
    MaSanPham INT NOT NULL,                   -- Mã sản phẩm (liên kết với bảng SanPham)
    SoLuong INT NOT NULL,                     -- Số lượng xuất
    NgayXuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Ngày xuất
    FOREIGN KEY (MaKhoHang) REFERENCES KhoHang(MaKhoHang),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham)
);

INSERT INTO ChiTietNguyenLieuSanPham (MaSanPham, MaNguyenLieu, SoLuongNguyenLieu) VALUES
(1, 1, 2.5),
(1, 3, 1.0),
(2, 2, 3.0),
(3, 3, 2.0),
(3, 4, 5.0);

CREATE TABLE DonHang (
    maDonHang INT PRIMARY KEY AUTO_INCREMENT, -- Mã đơn hàng duy nhất
    maKhachHang INT NOT NULL, -- Mã khách hàng
    ngayDat TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Ngày đặt hàng
    trangThaiGiaoHang VARCHAR(50) DEFAULT 'Đã đặt', -- Trạng thái đơn hàng
    tongGia DECIMAL(10, 2) NOT NULL CHECK (tongGia >= 0), -- Tổng giá trị đơn hàng (không âm)
    diaChiGiaoHang VARCHAR(255) NOT NULL, -- Địa chỉ giao hàng
    phuongThucThanhToan VARCHAR(50) NOT NULL, -- Phương thức thanh toán
    ghiChu TEXT, -- Ghi chú bổ sung cho đơn hàng (nếu cần)
    TrangThai TINYINT DEFAULT 1, -- 1 là bình thường 0 là xóa 2 là đã xuất hóa đơnđơn
    FOREIGN KEY (maKhachHang) REFERENCES KhachHang(maKhachHang) -- Khóa ngoại liên kết với bảng KhachHang
);

INSERT INTO DonHang (maKhachHang, trangThaiGiaoHang, tongGia, diaChiGiaoHang, phuongThucThanhToan, ghiChu)
VALUES
(1, 'Đã đặt', 250000.00, '123 Nguyễn Văn Cừ, Hà Nội', 'Tiền mặt', 'Không có yêu cầu đặc biệt'),
(2, 'Đã xác nhận', 450000.00, '456 Trần Hưng Đạo, TP.HCM', 'Thẻ ngân hàng', 'Yêu cầu giao nhanh'),
(3, 'Đang giao', 650000.00, '789 Lý Thường Kiệt, Đà Nẵng', 'Ví điện tử', NULL),
(4, 'Đã giao', 850000.00, '321 Phan Đình Phùng, Cần Thơ', 'Tiền mặt', 'Khách không nhận đúng giờ'),
(5, 'Đã hủy', 150000.00, '654 Hoàng Diệu, Hải Phòng', 'Thẻ ngân hàng', 'Khách thay đổi địa chỉ'),
(6, 'Đã đặt', 550000.00, '987 Nguyễn Du, Hà Nội', 'Ví điện tử', 'Yêu cầu không cay'),
(7, 'Đã xác nhận', 750000.00, '345 Bùi Thị Xuân, TP.HCM', 'Tiền mặt', NULL),
(8, 'Đang giao', 950000.00, '210 Lê Văn Sỹ, Đà Lạt', 'Thẻ ngân hàng', 'Địa chỉ xa, giao trễ'),
(9, 'Đã giao', 350000.00, '890 Pasteur, TP.HCM', 'Ví điện tử', 'Khách hài lòng'),
(10, 'Đã xóa', 450000.00, '123 Tôn Đức Thắng, Hà Nội', 'Tiền mặt', NULL);

CREATE TABLE ChiTietDonHang (
    maChiTiet INT PRIMARY KEY AUTO_INCREMENT, -- Mã chi tiết đơn hàng duy nhất
    maDonHang INT NOT NULL, -- Mã đơn hàng liên kết
    maSanPham INT NOT NULL, -- Mã sản phẩm liên kết
    soLuong INT NOT NULL CHECK (soLuong > 0), -- Số lượng sản phẩm (phải lớn hơn 0)
    donGia DECIMAL(10, 2) NOT NULL CHECK (donGia >= 0), -- Đơn giá sản phẩm (không âm)
    thanhTien DECIMAL(10, 2) GENERATED ALWAYS AS (soLuong * donGia), -- Tổng giá trị của sản phẩm
    TrangThai TINYINT DEFAULT 1, 
    FOREIGN KEY (maDonHang) REFERENCES DonHang(maDonHang), -- Khóa ngoại liên kết với bảng đơn hàng
    FOREIGN KEY (maSanPham) REFERENCES SanPham(maSanPham) -- Khóa ngoại liên kết với bảng sản phẩm
);

INSERT INTO ChiTietDonHang (maDonHang, maSanPham, soLuong, donGia) VALUES
(1, 1, 2, 150000),
(1, 2, 1, 300000),
(2, 3, 5, 50000),
(2, 1, 3, 150000),
(3, 4, 1, 250000),
(4, 5, 7, 80000),
(5, 6, 2, 180000),
(6, 7, 4, 220000),
(7, 8, 1, 450000),
(8, 9, 3, 120000);

CREATE TABLE KhuyenMai (
    MaKhuyenMai INT PRIMARY KEY AUTO_INCREMENT,
    TenKhuyenMai VARCHAR(100) NOT NULL,
    MoTa TEXT,
    GiaTriKhuyenMai DECIMAL(10, 2) NOT NULL,
    LoaiKhuyenMai INT NOT NULL, -- 1: phần trăm giảm, 2: giá cố định giảm, 3: quà tặng
    NgayBatDau DATE NOT NULL,
    NgayKetThuc DATE NOT NULL,
    TrangThai TINYINT DEFAULT 1,
);

INSERT INTO KhuyenMai (TenKhuyenMai, MoTa, GiaTriKhuyenMai, LoaiKhuyenMai, NgayBatDau, NgayKetThuc, TrangThai)
VALUES 
('Giảm 10% Cánh Gà', 'Giảm 10% cho tất cả các phần cánh gà', 10.00, 1, '2025-04-15', '2025-04-30', 1),
('Giảm 20% Gà Viên', 'Giảm giá 20% cho các phần gà viên chiên giòn', 20.00, 1, '2025-05-01', '2025-05-15', 1),
('Giảm 30,000 VND Đùi Gà', 'Giảm ngay 30,000 VND khi mua mỗi phần đùi gà rán', 30000.00, 2, '2025-05-10', '2025-05-20', 1),
('Giảm 50,000 VND Gà Cay', 'Giảm 50,000 VND áp dụng cho các phần gà cay đặc biệt', 50000.00, 2, '2025-06-01', '2025-06-15', 1),
('Tặng Nước Ngọt Khi Mua Đùi Gà', 'Mua 1 phần đùi gà rán tặng 1 lon nước ngọt', NULL, 3, '2025-06-20', '2025-06-30', 1),
('Tặng Khoai Tây Khi Mua Gà Rán', 'Tặng 1 phần khoai tây chiên cho mỗi phần gà rán', NULL, 3, '2025-07-01', '2025-07-15', 1),
('Giảm 15% Ức Gà', 'Giảm giá 15% cho các phần ức gà rán', 15.00, 1, '2025-07-20', '2025-07-30', 1),
('Giảm 25,000 VND Gà Không Xương', 'Giảm giá 25,000 VND cho gà rán không xương', 25000.00, 2, '2025-08-01', '2025-08-15', 1),
('Tặng Sốt Khi Mua Gà Rán', 'Tặng 1 phần sốt khi mua gà rán bất kỳ', NULL, 3, '2025-08-20', '2025-08-31', 1),
('Giảm 5% Gà Nguyên Con', 'Giảm giá 5% cho gà rán nguyên con', 5.00, 1, '2025-09-01', '2025-09-10', 1);

CREATE TABLE HoaDon (
    maHoaDon INT PRIMARY KEY AUTO_INCREMENT, -- Mã hóa đơn duy nhất
    maDonHang INT NOT NULL,                  -- Mã đơn hàng liên kết
    maKhuyenMai INT DEFAULT NULL,            -- Mã khuyến mãi áp dụng (nếu có)
    ngayXuatHoaDon TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Ngày xuất hóa đơn
    tongTien DECIMAL(10, 2) NOT NULL CHECK (tongTien >= 0), -- Tổng tiền sau áp dụng khuyến mãi (không âm)
    TrangThai TINYINT DEFAULT 1,             -- Trạng thái (1: bình thường, 0: đã hủy)
    maNhanVien INT NOT NULL,                 -- Mã nhân viên phụ trách hóa đơn
    FOREIGN KEY (maDonHang) REFERENCES DonHang(maDonHang), -- Khóa ngoại đến bảng đơn hàng
    FOREIGN KEY (maKhuyenMai) REFERENCES KhuyenMai(maKhuyenMai), -- Khóa ngoại đến bảng khuyến mãi
    FOREIGN KEY (maNhanVien) REFERENCES NhanVien(maNhanVien) -- Khóa ngoại đến bảng nhân viên
);

INSERT INTO HoaDon (maDonHang, maKhuyenMai, tongTien, maNhanVien) VALUES 
    (1, NULL, 120000.00, 1), 
    (2, 1, 95000.00, 2), 
    (3, 2, 85000.00, 3), 
    (4, NULL, 150000.00, 4), 
    (5, 3, 100000.00, 5);








