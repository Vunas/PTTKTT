package com.app.QLCH.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;

@Data
@Entity
@Table(name = "ChiTietPhieuNhap")
public class ChiTietPhieuNhap {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;

   @ManyToOne
   @JoinColumn(name = "maPhieuNhap", nullable = false)
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "chiTiet"}) // tránh vòng lặp
   private PhieuNhap phieuNhap;

   @ManyToOne
   @JoinColumn(name = "maNguyenLieu", nullable = false)
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
   private NguyenLieu nguyenLieu;

   @Column(nullable = false)
   private Integer soLuong;

   @Column(nullable = false)
   private Double giaNhap; // Có thể ghi đè nếu giá thực tế khác với giáNguyenLieu mặc định
}
