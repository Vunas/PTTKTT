package com.app.QLCH.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "DonHang") // Tương ứng với bảng trong cơ sở dữ liệu
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID tự tăng
    private Integer maDonHang; // Mã đơn hàng (khóa chính)

    @Column(name = "maKhachHang", nullable = false) // Lưu mã khách hàng (Integer)
    private Integer maKhachHang; // Mã khách hàng, không dùng ManyToOne

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "ngayDat", nullable = false) // Ngày đặt hàng
    private Date ngayDat = new Date(); // Giá trị mặc định là thời gian hiện tại

    @Column(name = "trangThai", nullable = false) // Trạng thái đơn hàng
    private Integer trangThai; // Trạng thái (0 là đã xóa, 1 là đã đặt, v.v.)

    @Column(name = "tongGia", nullable = false, columnDefinition = "DECIMAL(10, 2)") // Tổng giá trị đơn hàng
    private Double tongGia; // Giá trị tổng của đơn hàng
}

// 0 là đã xóa, 1 là đã đặt, 2 là đã xác nhận, 3 là đang giao, 4 là đã giao, 5 là đã hủy