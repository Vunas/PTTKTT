package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ChiTietDonHang")
public class ChiTietDonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maChiTiet;

    @Column(name = "maDonHang", nullable = false)
    private Integer maDonHang;

    @Column(name = "maSanPham", nullable = false)
    private Integer maSanPham;

    @Column(name = "soLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "donGia", nullable = false, columnDefinition = "DECIMAL(10, 2)")
    private Double donGia;

    @Column(name = "thanhTien", columnDefinition = "DECIMAL(10, 2)")
    private Double thanhTien; // Tự tính toán ở tầng logic, không để auto-generated ở DB

    @Column(name = "trangThai")
    private Integer trangThai = 1;

    @ManyToOne
    @JoinColumn(name = "maSanPham", referencedColumnName = "maSanPham", insertable = false, updatable = false)
    private SanPham sanPham; 

}