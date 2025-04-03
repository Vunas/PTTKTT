package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "TaiKhoan")
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maTaiKhoan;

    @Column(nullable = false, unique = true, length = 50)
    private String tenDangNhap;

    @Column(nullable = false, length = 100)
    private String matKhau;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @JoinColumn(name = "maPhanQuyen", nullable = false)
    private Integer maPhanQuyen; 

    @Column( columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer trangThai = 1;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp ngayTao;
}