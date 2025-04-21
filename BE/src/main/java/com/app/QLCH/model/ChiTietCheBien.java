package com.app.QLCH.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ChiTietCheBien")
public class ChiTietCheBien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maChiTiet; // Mã chi tiết chế biến tự động tăng

    @ManyToOne
    @JoinColumn(name = "MaCheBien", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private CheBien cheBien; // Liên kết với bảng CheBien

    @ManyToOne
    @JoinColumn(name = "MaSanPham", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private SanPham sanPham; // Mã sản phẩm liên quan đến chế biến

    @Column(nullable = false)
    private Integer soLuongSanPham; // Số lượng sản phẩm được chế biến

    @Column(columnDefinition = "TINYINT DEFAULT 1")
    private Integer trangThai= 1;
}