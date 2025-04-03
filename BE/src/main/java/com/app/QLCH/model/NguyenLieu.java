package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "NguyenLieu")
public class NguyenLieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maNguyenLieu;

    @Column(nullable = false, length = 100) // Tên nguyên liệu
    private String ten;

    @Column(nullable = false, length = 50) // Đơn vị (ví dụ: kg, lít)
    private String donVi;

    @Column(nullable = false) // Giá nhập (kiểu DOUBLE)
    private Double giaNhap;

    @Column(nullable = false) // Số lượng
    private Integer soLuong;

    @Column(nullable = true, length = 255) // Đường dẫn hình ảnh
    private String hinhAnh;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer trangThai = 1;
}
