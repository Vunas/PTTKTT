package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "KhoHang") // Bảng tương ứng trong cơ sở dữ liệu
public class KhoHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID tự tăng
    private Integer maKhoHang; // Mã kho hàng

    @Column(name = "TenKhoHang", nullable = false, length = 100) // Tên kho hàng
    private String tenKhoHang;

    @Column(name = "DiaDiem", nullable = false, columnDefinition = "TEXT") // Địa điểm
    private String diaDiem;

    @Column(name = "TrangThai", columnDefinition = "TINYINT(1) DEFAULT 1") // Trạng thái (1: Hoạt động, 0: Ngừng hoạt động)
    private Integer trangThai = 1;

    @Column(name = "NgayTao", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP") // Ngày tạo
    private java.sql.Timestamp ngayTao;
}
