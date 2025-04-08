package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.DonHang;
import com.app.QLCH.repository.DonHangRepository;

import java.util.List;
import java.sql.Date;
import java.time.LocalDate;

@Service
public class DonHangService {
    @Autowired
    private DonHangRepository donHangRepository;

    // Lấy danh sách tất cả đơn hàng đang hoạt động (không bị xóa mềm)
    public List<DonHang> getAllDonHang() {
        return donHangRepository.findByTrangThaiNot("đã xóa"); // Lấy tất cả trừ trạng thái xóa mềm
    }

    // Lấy đơn hàng theo ID, nhưng không bao gồm đơn hàng bị xóa mềm
    public DonHang getDonHangById(Integer id) {
        DonHang donHang = donHangRepository.findById(id).orElse(null);
        return (donHang != null && !"đã xóa".equals(donHang.getTrangThai())) ? donHang : null;
    }

    // Thêm hoặc cập nhật đơn hàng
    public DonHang saveDonHang(DonHang donHang) {
        return donHangRepository.save(donHang);
    }

    // Xóa mềm đơn hàng bằng cách đặt trạng thái là "đã xóa"
    public void deleteDonHangById(Integer id) {
        DonHang donHang = donHangRepository.findById(id).orElse(null);
        if (donHang != null) {
            donHang.setTrangThai("đã xóa"); // Đánh dấu là đã xóa
            donHangRepository.save(donHang); // Cập nhật trạng thái
        }
    }

    // Lọc danh sách đơn hàng dựa trên nhiều tiêu chí
    public List<DonHang> filterDonHang(Integer maKhachHang, Date startDate, Date endDate, String diaChiGiaoHang, String phuongThucThanhToan, Double minGia, Double maxGia, String trangThai) {
        if (minGia == null) minGia = 0.0;
        if (maxGia == null) maxGia = Double.MAX_VALUE;
        if (startDate == null) {
            startDate = Date.valueOf(LocalDate.of(1970, 1, 1)); // Ngày đầu tiên (UNIX epoch)
        }
        if (endDate == null) {
            endDate = Date.valueOf(LocalDate.now()); // Ngày hiện tại
        }

        if (maKhachHang == null && (trangThai == null || trangThai.isEmpty())) {
            return donHangRepository.findByNgayDatBetweenAndTrangThaiNotAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetween(
                startDate, endDate, "Đã xóa", diaChiGiaoHang != null? diaChiGiaoHang : "%", phuongThucThanhToan != null ? phuongThucThanhToan : "%", minGia, maxGia);
        } else if (maKhachHang == null) {
            return donHangRepository.findByNgayDatBetweenAndTrangThaiAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetween(
                startDate, endDate, trangThai,  diaChiGiaoHang != null? diaChiGiaoHang : "", phuongThucThanhToan != null ? phuongThucThanhToan : "", minGia, maxGia);
        } else if (trangThai == null) {
            return donHangRepository.findByMaKhachHangAndNgayDatBetweenAndTrangThaiNotAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetween(
                maKhachHang, startDate, endDate, "Đã xóa",  diaChiGiaoHang != null? diaChiGiaoHang : "", phuongThucThanhToan != null ? phuongThucThanhToan : "", minGia, maxGia);
        } else {
            return donHangRepository.findByMaKhachHangAndNgayDatBetweenAndTrangThaiContainingIgnoreCaseAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetween(
                maKhachHang, startDate, endDate, trangThai,  diaChiGiaoHang != null? diaChiGiaoHang : "", phuongThucThanhToan != null ? phuongThucThanhToan : "", minGia, maxGia);
        }
    }
}
