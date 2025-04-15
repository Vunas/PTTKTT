package com.app.QLCH.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "ChiTietPhieuXuat")
public class ChiTietPhieuXuat {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;

   @ManyToOne
   @JoinColumn(name = "maPhieuXuat", nullable = false)
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "chiTiet"}) // tránh vòng lặp
   private PhieuXuat phieuXuat;

   @ManyToOne(fetch = FetchType.EAGER)
   @JoinColumn(name = "maNguyenLieu", nullable = false)
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
   private NguyenLieu nguyenLieu;

   @Column(nullable = false)
   private Integer soLuong;
}

