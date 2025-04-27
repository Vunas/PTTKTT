package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "KhoHang")
public class KhoHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maKhoHang;

    @Column(name = "TenKhoHang", nullable = false, length = 100)
    private String tenKhoHang;

    @Column(name = "DiaDiem", nullable = false, columnDefinition = "TEXT")
    private String diaDiem;

    @Column(name = "TrangThai", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer trangThai = 1;

    @Column(name = "NgayTao", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp ngayTao;
}
