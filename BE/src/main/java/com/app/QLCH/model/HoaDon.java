package com.app.QLCH.model;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngayXuatHoaDon", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private Date ngayXuatHoaDon;

    @Column(nullable = false)
    private Double tongTien; // Tổng tiền sau khi áp dụng khuyến mãi

    @Column(columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer trangThai = 1; // 1: bình thường, 0: đã hủy

    @ManyToOne
    @JoinColumn(name = "maDonHang", referencedColumnName = "maDonHang", insertable = false, updatable = false)
    private DonHang donHang;

    @Column(nullable = false)
    private Integer maNhanVien; // Mã nhân viên liên kết

    @ManyToOne
    @JoinColumn(name = "maNhanVien", referencedColumnName = "maNhanVien", insertable = false, updatable = false)
    private NhanVien nhanVien; // Liên kết tới bảng NhânVien
}