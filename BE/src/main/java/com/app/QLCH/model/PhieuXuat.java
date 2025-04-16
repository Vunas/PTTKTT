package com.app.QLCH.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "phieuXuat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhieuXuat {

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

   @Column(name = "thoiGianTao", updatable = false)
   private LocalDateTime thoiGianTao;

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "nguoiXuat", nullable = false)  // Dùng trường "nguoiXuat" để lưu khóa ngoại (id của NhanVien)
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Tránh vòng lặp khi serialize
   private NhanVien nguoiXuat;

   @OneToMany(mappedBy = "phieuXuat", cascade = CascadeType.ALL, orphanRemoval = true)
   @Builder.Default
   @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
   private List<ChiTietPhieuXuat> chiTiet = new ArrayList<>();

   @PrePersist
   public void prePersist() {
      LocalDateTime now = LocalDateTime.now();
      this.thoiGianTao = now;
   }

}
