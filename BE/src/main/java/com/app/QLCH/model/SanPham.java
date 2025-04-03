package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "SanPham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maSanPham; // Mã sản phẩm tự động tăng

    @Column(nullable = false, length = 100) // Tên sản phẩm
    private String tenSanPham;

    @Column(nullable = false) // Giá sản xuất
    private Double giaSanXuat;

    @Column(nullable = false) // Giá bán
    private Double giaBan;

    @Column(nullable = true, length = 255) // Đường dẫn hình ảnh
    private String hinhAnh;

    @Column(nullable = false) // Số lượng
    private Integer soLuong;

    @Column(nullable = true) // Mô tả sản phẩm
    private String moTa;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 1") // Trạng thái (1: Hoạt động, 0: Không hoạt động)
    private Integer trangThai = 1;

    @Column(columnDefinition = "DATE DEFAULT CURRENT_DATE") // Ngày tạo sản phẩm
    private String ngayTao;
}