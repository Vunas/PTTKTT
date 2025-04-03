package com.app.QLCH.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PhanQuyen")
public class PhanQuyen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maPhanQuyen;

    @Column(nullable = false, length = 50)
    private String tenQuyen;

    @Column(columnDefinition = "TEXT")
    private String danhSachChucNang;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 1")
    private Integer trangThai = 1;
}