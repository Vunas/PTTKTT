package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "NhanVien")
public class NhanVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maNhanVien;

    @Column(nullable = false, length = 100)
    private String hoTen;

    @Column(nullable = false, length = 10) // VARCHAR(10)
    private String gioiTinh;

    @Column(nullable = false, unique = true, length = 15)
    private String soDienThoai;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String diaChi;

    @Column(nullable = false, length = 100)
    private String chucVu;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer trangThai = 1;

    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp ngayTao;

}