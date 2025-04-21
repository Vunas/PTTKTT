package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

@Data
@Entity
@Table(name = "DonHang")
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maDonHang;

    @Column(name = "maKhachHang")
    private Integer maKhachHang;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngayDat", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private Date ngayDat;

    @Column(name = "trangThaiGiaoHang", nullable = false, length = 50)
    private String trangThaiGiaoHang; // Đổi tên để đồng nhất với SQL

    @Column(name = "tongGia", nullable = false, columnDefinition = "DECIMAL(10, 2)")
    private Double tongGia;

    @Column(name = "diaChiGiaoHang", length = 255)
    private String diaChiGiaoHang;

    @Column(name = "phuongThucThanhToan", length = 50)
    private String phuongThucThanhToan = "Tiền mặt";

    @Column(name = "ghiChu", columnDefinition = "TEXT")
    private String ghiChu; // Thêm columnDefinition để khớp với kiểu TEXT của SQL

    @Column(name = "TrangThai")
    private Integer trangThai = 1; // Đặt giá trị mặc định là 1
}