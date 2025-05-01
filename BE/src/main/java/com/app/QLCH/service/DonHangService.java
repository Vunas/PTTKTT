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
        return donHangRepository.findByTrangThai(1);
    }

    public List<DonHang> getAllDonHangIgnoreTrangThai() {
        return donHangRepository.findAll();
    }

    // Lấy đơn hàng theo ID, nhưng không bao gồm đơn hàng bị xóa mềm
    public DonHang getDonHangById(Integer id) {
        DonHang donHang = donHangRepository.findById(id).orElse(null);
        return (donHang != null && donHang.getTrangThai() == 1) ? donHang : null;
    }

    public DonHang getDonHangByIdIgnoreTrangThai(Integer id) {
        DonHang donHang = donHangRepository.findById(id).orElse(null);
        return (donHang != null) ? donHang : null;
    }

    // Thêm hoặc cập nhật đơn hàng
    public DonHang saveDonHang(DonHang donHang) {
        return donHangRepository.save(donHang);
    }

    // Xóa mềm đơn hàng bằng cách đặt trạng thái là "đã xóa"
    public void deleteDonHangById(Integer id) {
        DonHang donHang = donHangRepository.findById(id).orElse(null);
        if (donHang != null) {
            donHang.setTrangThai(0); // Đánh dấu là đã xóa
            donHangRepository.save(donHang); // Cập nhật trạng thái
        }
    }

    // Lọc danh sách đơn hàng dựa trên nhiều tiêu chí
    public List<DonHang> filterDonHang(Integer maKhachHang, Date startDate, Date endDate, String diaChiGiaoHang,
            String phuongThucThanhToan, Double minGia, Double maxGia, String trangThaiGiaoHang) {
        if (minGia == null)
            minGia = 0.0;
        if (maxGia == null)
            maxGia = Double.MAX_VALUE;
        if (startDate == null) {
            startDate = Date.valueOf(LocalDate.of(1970, 1, 1)); // Ngày đầu tiên (UNIX epoch)
        }
        if (endDate == null) {
            endDate = Date.valueOf(LocalDate.of(9999, 12, 31)); // Ngày hiện tại
        }

        if (maKhachHang == null) {
            return donHangRepository
                    .findByNgayDatBetweenAndTrangThaiGiaoHangContainingIgnoreCaseAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetweenAndTrangThai(
                            startDate, endDate, trangThaiGiaoHang != null ? trangThaiGiaoHang : "", diaChiGiaoHang,
                            phuongThucThanhToan, minGia, maxGia,
                            1);
        } else {
            return donHangRepository
                    .findByMaKhachHangAndNgayDatBetweenAndTrangThaiGiaoHangContainingIgnoreCaseAndDiaChiGiaoHangContainingIgnoreCaseAndPhuongThucThanhToanContainingIgnoreCaseAndTongGiaBetweenAndTrangThai(
                            maKhachHang, startDate, endDate, trangThaiGiaoHang != null ? trangThaiGiaoHang : "",
                            diaChiGiaoHang, phuongThucThanhToan,
                            minGia, maxGia, 1);
        }
    }
}