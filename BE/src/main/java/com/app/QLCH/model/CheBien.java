package com.app.QLCH.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "CheBien")
public class CheBien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maCheBien; // Mã chế biến tự động tăng

    @Column(updatable = false)
    private LocalDateTime ngayCheBien = LocalDateTime.now(); // Ngày chế biến mặc định hiện tại

    @ManyToOne
    @JoinColumn(name = "NguoiCheBien")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private NhanVien nguoiCheBien; // Nhân viên thực hiện chế biến

    @Column( columnDefinition = "TINYINT DEFAULT 1")
    private Integer trangThai = 1; // Trạng thái (1: hoạt động, 0: đã xóa mềm)

    // @OneToMany(mappedBy = "cheBien", cascade = CascadeType.ALL)
    // @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    // private List<ChiTietCheBien> danhSachChiTiet; // Danh sách chi tiết chế biến
}