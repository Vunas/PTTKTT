package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "KhachHang") // Bảng tương ứng trong cơ sở dữ liệu
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID tự tăng
    private Integer maKhachHang; // Tên biến đổi về chữ thường để đồng nhất với thực tiễn tốt.

    @Column(name = "HoTen", nullable = false, length = 100) // Ánh xạ tới cột HoTen
    private String hoTen; // Chữ thường giúp tránh lỗi ánh xạ

    @Column(name = "GioiTinh", nullable = false, length = 10) // VARCHAR(10)
    private String gioiTinh;

    @Column(name = "SoDienThoai", nullable = false, unique = true, length = 15) // Unique đảm bảo không trùng số
    private String soDienThoai;

    @Column(name = "Email", unique = true, length = 100) // Email có thể không null theo logic business
    private String email;

    @Column(name = "DiaChi", nullable = false, columnDefinition = "TEXT") // Kiểu TEXT cho địa chỉ
    private String diaChi;

    @Column(name = "TrangThai", columnDefinition = "TINYINT(1) DEFAULT 1") // Trạng thái mặc định 1
                                                                                             // (Hoạt động)
    private Integer trangThai = 1;

    @Column(name = "NgayTao",updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP") // Ngày tạo tự
                                                                                                          // động
    private java.sql.Timestamp ngayTao;

}