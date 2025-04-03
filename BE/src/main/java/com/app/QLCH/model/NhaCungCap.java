package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "NhaCungCap") // Bảng tương ứng trong cơ sở dữ liệu
public class NhaCungCap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID tự tăng
    private Integer maNhaCungCap; // Mã nhà cung cấp

    @Column(name = "TenNhaCungCap", nullable = false, length = 100) // Tên nhà cung cấp
    private String tenNhaCungCap;

    @Column(name = "SoDienThoai", nullable = false, unique = true, length = 15) // Số điện thoại
    private String soDienThoai;

    @Column(name = "Email", unique = true, length = 100) // Email
    private String email;

    @Column(name = "DiaChi", nullable = false, columnDefinition = "TEXT") // Địa chỉ
    private String diaChi;

    @Column(name = "TrangThai", columnDefinition = "TINYINT(1) DEFAULT 1") // Trạng thái (1: Hoạt động, 0: Ngừng hoạt động)
    private Integer trangThai = 1;

    @Column(name = "NgayTao", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP") // Ngày tạo
    private java.sql.Timestamp ngayTao;
}
