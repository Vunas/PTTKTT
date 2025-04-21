package com.app.QLCH.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ChiTietNguyenLieuSanPham")
public class ChiTietNguyenLieuSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maChiTiet; // Mã chi tiết tự động tăng

    @ManyToOne
    @JoinColumn(name = "MaSanPham", nullable = false) // Liên kết với bảng SanPham
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    private SanPham sanPham; // Sản phẩm liên quan

    @ManyToOne
    @JoinColumn(name = "MaNguyenLieu", nullable = false) // Liên kết với bảng NguyenLieu
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    private NguyenLieu nguyenLieu; // Nguyên liệu liên quan

    @Column(nullable = false) // Số lượng nguyên liệu cần cho sản phẩm
    private Double soLuongNguyenLieu;
}
