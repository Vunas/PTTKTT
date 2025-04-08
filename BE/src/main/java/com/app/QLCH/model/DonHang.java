package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "DonHang")
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maDonHang;

    @Column(name = "maKhachHang", nullable = false)
    private Integer maKhachHang;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngayDat", nullable = false, updatable = false)
    private Date ngayDat = new Date();

    @Column(name = "trangThai", nullable = false, length = 50)
    private String trangThai; // Sử dụng String thay vì Enum

    @Column(name = "tongGia", nullable = false, columnDefinition = "DECIMAL(10, 2)")
    private Double tongGia;

    @Column(name = "diaChiGiaoHang", nullable = false, length = 255)
    private String diaChiGiaoHang;

    @Column(name = "phuongThucThanhToan", nullable = false, length = 50)
    private String phuongThucThanhToan; // Sử dụng String thay vì Enum

    @Column(name = "ghiChu")
    private String ghiChu;
}
