CREATE TABLE PhieuNhap (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   maPhieu VARCHAR(50) UNIQUE,
   tenPhieu VARCHAR(255) NOT NULL,
   fileChungTu VARCHAR(255),
   nhaCungCap INT NOT NULL,  -- Khóa ngoại tham chiếu MaNhaCungCap
   ghiChu TEXT,
   trangThai VARCHAR(50) NOT NULL DEFAULT 'DAT_HANG',
   thoiGianTao DATETIME,
   thoiGianCapNhat DATETIME,
   thoiGianHuy DATETIME,
   nguoiNhap INT,  -- Khóa ngoại tham chiếu MaNhanVien
   nguoiHuy INT,  -- Khóa ngoại tham chiếu MaNhanVien

   CONSTRAINT lienKetNhaCungCap FOREIGN KEY (nhaCungCap)
      REFERENCES NhaCungCap(maNhaCungCap)
      ON DELETE CASCADE
      ON UPDATE CASCADE,

   CONSTRAINT lienKetNguoiTao FOREIGN KEY (nguoiNhap)
      REFERENCES NhanVien(MaNhanVien)
      ON DELETE SET NULL
      ON UPDATE CASCADE,

   CONSTRAINT lienKetNguoiHuy FOREIGN KEY (nguoiHuy)
      REFERENCES NhanVien(MaNhanVien)
      ON DELETE SET NULL
      ON UPDATE CASCADE

);

CREATE TABLE ChiTietPhieuNhap (
   id INT PRIMARY KEY AUTO_INCREMENT,                          -- Mã chi tiết tự động tăng
   maPhieuNhap BIGINT NOT NULL,                                -- FK tới bảng PhieuNhap
   maNguyenLieu INT NOT NULL,                                  -- FK tới bảng NguyenLieu
   soLuong INT NOT NULL,                                       -- Số lượng nguyên liệu nhập
   giaNhap DOUBLE NOT NULL,                                    -- Giá nhập tại thời điểm này

   CONSTRAINT lienKetPhieuNhap FOREIGN KEY (MaPhieuNhap)
      REFERENCES PhieuNhap(Id),

   CONSTRAINT lienKetNguyenLieuNhap FOREIGN KEY (MaNguyenLieu)
      REFERENCES NguyenLieu(MaNguyenLieu)
);

CREATE TABLE PhieuXuat(
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   maPhieu VARCHAR(50) UNIQUE,
   tenPhieu VARCHAR(255) NOT NULL,
   fileChungTu VARCHAR(255),
   ghiChu TEXT,
   thoiGianTao DATETIME,
   nguoiXuat INT  -- Khóa ngoại tham chiếu MaNhanVien
);

CREATE TABLE ChiTietPhieuXuat(
   id INT PRIMARY KEY AUTO_INCREMENT,                          -- Mã chi tiết tự động tăng
   maPhieuXuat BIGINT NOT NULL,                                -- FK tới bảng PhieuXuat
   maNguyenLieu INT NOT NULL,                                  -- FK tới bảng NguyenLieu
   soLuong INT NOT NULL,                                       -- Số lượng nguyên liệu nhập

   CONSTRAINT lienKetPhieuXuat FOREIGN KEY (MaPhieuXuat)
      REFERENCES PhieuXuat(Id),

   CONSTRAINT lienKetNguyenLieuXuat FOREIGN KEY (MaNguyenLieu)
      REFERENCES NguyenLieu(MaNguyenLieu)  
);