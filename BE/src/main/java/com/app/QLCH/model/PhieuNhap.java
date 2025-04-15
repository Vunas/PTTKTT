package com.app.QLCH.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Entity
@Table(name = "phieuNhap")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhieuNhap {

   public enum TrangThaiPhieuNhap {
      DAT_HANG,
      NHAP_KHO,
      HUY
   }
   
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name = "maPhieu", length = 50, unique = true)
   private String maPhieu;

   @Column(name = "tenPhieu", nullable = false, length = 255)
   private String tenPhieu;

   @Column(name = "fileChungTu", length = 255)
   private String fileChungTu;

   @Column(name = "ghiChu", columnDefinition = "TEXT")
   private String ghiChu;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "nhaCungCap", nullable = false)  // Dùng trường "nhaCungCap" để lưu khóa ngoại (id của NhaCungCap)
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Tránh vòng lặp khi serialize
   private NhaCungCap nhaCungCap;

   @Enumerated(EnumType.STRING)
   @Column(name = "trangThai", nullable = false)
   @Builder.Default
   private TrangThaiPhieuNhap trangThai = TrangThaiPhieuNhap.DAT_HANG;
   
   @Column(name = "thoiGianTao", updatable = false)
   private LocalDateTime thoiGianTao;

   @Column(name = "thoiGianCapNhat")
   private LocalDateTime thoiGianCapNhat;

   @Column(name = "thoiGianHuy")
   private LocalDateTime thoiGianHuy;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "nguoiNhap", nullable = false)  // Dùng trường "nguoiNhap" để lưu khóa ngoại (id của NhanVien)
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Tránh vòng lặp khi serialize
   private NhanVien nguoiNhap;

   // Liên kết đến đối tượng NhanVien để lưu thông tin người hủy (có thể null nếu chưa hủy)
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "nguoiHuy")  // Dùng trường "nguoiHuy" để lưu khóa ngoại (id của NhanVien)
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Tránh vòng lặp khi serialize
   private NhanVien nguoiHuy;

   @OneToMany(mappedBy = "phieuNhap", cascade = CascadeType.ALL, orphanRemoval = true)
   @Builder.Default
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
   private List<ChiTietPhieuNhap> chiTiet = new ArrayList<>();


   @PrePersist
   public void prePersist() {
      LocalDateTime now = LocalDateTime.now();
      this.thoiGianTao = now;
      this.thoiGianCapNhat = now;
   }

   @PreUpdate
   public void preUpdate() {
      this.thoiGianCapNhat = LocalDateTime.now();
   }
}