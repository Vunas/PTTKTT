package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "TonKho") // Bảng tương ứng trong cơ sở dữ liệu
public class TonKho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID tự tăng
    private Integer maTonKho; // Mã tồn kho

    @ManyToOne
    @JoinColumn(name = "MaKhoHang", nullable = false) // Liên kết với bảng KhoHang
    private KhoHang khoHang; // Đối tượng kho hàng (foreign key)

    @ManyToOne
    @JoinColumn(name = "MaNguyenLieu", nullable = false) // Liên kết với bảng NguyenLieu
    private NguyenLieu nguyenLieu; // Đối tượng sản phẩm (foreign key)

    @Column(name = "SoLuong", nullable = false) // Số lượng tồn kho
    private Integer soLuong;

    @Column(name = "NgayCapNhat", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP") // Ngày cập nhật
    private java.sql.Timestamp ngayCapNhat; 
}