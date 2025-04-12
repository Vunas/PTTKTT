package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "HoaDon")
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maHoaDon;

    @Column(nullable = false)
    private Integer maDonHang; // Mã đơn hàng liên kết

    @Column(nullable = true) 
    private Integer maKhuyenMai; // Mã khuyến mãi áp dụng nếu có

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp ngayXuatHoaDon; // Ngày xuất hóa đơn

    @Column(nullable = false)
    private Double tongTien; // Tổng tiền sau khi áp dụng khuyến mãi

    @Column(columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer trangThai = 1; // 1: bình thường, 0: đã hủy

    @ManyToOne
    @JoinColumn(name = "maDonHang", referencedColumnName = "maDonHang", insertable = false, updatable = false)
    private DonHang donHang;
}
