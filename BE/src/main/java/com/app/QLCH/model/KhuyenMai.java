package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "KhuyenMai")
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maKhuyenMai;

    @Column(nullable = false, length = 100)
    private String tenKhuyenMai;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @Column(nullable = false)
    private Double giaTriKhuyenMai;

    @Column(nullable = false)
    private Integer loaiKhuyenMai; // 1: phần trăm giảm, 2: giá cố định giảm, 3: quà tặng

    @Column(nullable = false)
    private java.sql.Date ngayBatDau;

    @Column(nullable = false)
    private java.sql.Date ngayKetThuc;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer trangThai = 1;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp ngayTao;
}
