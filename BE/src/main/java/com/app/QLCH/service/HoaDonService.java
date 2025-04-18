package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.HoaDon;
import com.app.QLCH.repository.HoaDonRepository;

import java.util.List;
import java.time.LocalDate;
import java.sql.Date;

@Service
public class HoaDonService {
    @Autowired
    private HoaDonRepository hoaDonRepository;

    // Lấy danh sách tất cả hóa đơn đang hoạt động (không bị hủy)
    public List<HoaDon> getAllHoaDon() {
        return hoaDonRepository.findByTrangThai(1); // Lấy hóa đơn có trạng thái bình thường
    }

    // Lấy hóa đơn theo ID
    public HoaDon getHoaDonById(Integer id) {
        HoaDon hoaDon = hoaDonRepository.findById(id).orElse(null);
        return (hoaDon != null && hoaDon.getTrangThai() == 1) ? hoaDon : null; // Chỉ lấy hóa đơn chưa bị hủy
    }

    // Thêm hoặc cập nhật hóa đơn
    public HoaDon saveHoaDon(HoaDon hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }

    // Xóa mềm hóa đơn bằng cách đặt trạng thái là "đã hủy"
    public void deleteHoaDonById(Integer id) {
        HoaDon hoaDon = hoaDonRepository.findById(id).orElse(null);
        if (hoaDon != null) {
            hoaDon.setTrangThai(0); // Đánh dấu hóa đơn là đã hủy
            hoaDonRepository.save(hoaDon); // Cập nhật trạng thái trong cơ sở dữ liệu
        }
    }

    public List<HoaDon> getHoaDonByMaKhachHang(Integer maKhachHang) {
        return hoaDonRepository.findByDonHang_MaKhachHang(maKhachHang);
    }

    // Lọc danh sách hóa đơn dựa trên nhiều tiêu chí
    public List<HoaDon> filterHoaDon(LocalDate ngayBatDau, LocalDate ngayKetThuc, Double minTongTien,
            Double maxTongTien, Integer maKhuyenMai, Integer maNhanVien) {
        // Gán giá trị mặc định nếu tham số ngày không được cung cấp
        if (ngayBatDau == null) {
            ngayBatDau = LocalDate.of(1970, 1, 1); // Ngày bắt đầu mặc định (epoch)
        }
        if (ngayKetThuc == null) {
            ngayKetThuc = LocalDate.of(9999, 12, 31); // Ngày xa trong tương lai
        }

        Date startDate = Date.valueOf(ngayBatDau);
        Date endDate = Date.valueOf(ngayKetThuc);
        if (minTongTien == null) {
            minTongTien = 0.0; // Tổng tiền tối thiểu mặc định
        }
        if (maxTongTien == null) {
            maxTongTien = Double.MAX_VALUE; // Tổng tiền tối đa mặc định
        }

        return hoaDonRepository.filterHoaDon(startDate, endDate, minTongTien, maxTongTien, maKhuyenMai, maNhanVien);
    }
}