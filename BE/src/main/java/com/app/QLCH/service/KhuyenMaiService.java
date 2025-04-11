package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.KhuyenMai;
import com.app.QLCH.repository.KhuyenMaiRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class KhuyenMaiService {
    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    // Lấy danh sách tất cả khuyến mãi còn hoạt động
    public List<KhuyenMai> getAllKhuyenMai() {
        return khuyenMaiRepository.findByTrangThaiNot(0); // Chỉ lấy khuyến mãi đang hoạt động
    }

    // Lấy thông tin khuyến mãi theo ID (chỉ khuyến mãi đang hoạt động)
    public KhuyenMai getKhuyenMaiById(Integer id) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(id).orElse(null);
        if (khuyenMai != null && khuyenMai.getTrangThai() != 0) {
            return khuyenMai; // Trả về khuyến mãi nếu còn hoạt động
        }
        return null; // Trả về null nếu khuyến mãi đã hết hiệu lực
    }

    // Tìm kiếm khuyến mãi theo tên khuyến mãi
    public List<KhuyenMai> searchKhuyenMaiByTen(String tenKhuyenMai) {
        return khuyenMaiRepository.findByTenKhuyenMaiContainingIgnoreCase(tenKhuyenMai);
    }

    // Tìm kiếm khuyến mãi theo loại khuyến mãi (1, 2, 3)
    public List<KhuyenMai> searchKhuyenMaiByLoai(Integer loaiKhuyenMai) {
        return khuyenMaiRepository.findByLoaiKhuyenMai(loaiKhuyenMai);
    }

    // Kiểm tra sự tồn tại của khuyến mãi dựa trên tên
    public boolean existsByTenKhuyenMai(String tenKhuyenMai) {
        return khuyenMaiRepository.existsByTenKhuyenMai(tenKhuyenMai);
    }

    // Thêm mới hoặc cập nhật khuyến mãi
    public KhuyenMai saveKhuyenMai(KhuyenMai khuyenMai) {
        return khuyenMaiRepository.save(khuyenMai);
    }

    // Xóa mềm khuyến mãi (đánh dấu trạng thái là đã xóa)
    public void deleteKhuyenMaiById(Integer id) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(id).orElse(null);
        if (khuyenMai != null) {
            khuyenMai.setTrangThai(0); // Đánh dấu là đã xóa
            khuyenMaiRepository.save(khuyenMai); // Lưu thay đổi
        }
    }

    // Lọc khuyến mãi theo tên, loại khuyến mãi và trạng thái
    public List<KhuyenMai> filterKhuyenMai(String tenKhuyenMai, Integer loaiKhuyenMai, Integer trangThai,
            LocalDate ngayBatDau, LocalDate ngayKetThuc) {
        // Gán giá trị mặc định nếu tham số ngày không được cung cấp
        if (ngayBatDau == null) {
            ngayBatDau = LocalDate.of(1970, 1, 1); // Ngày bắt đầu mặc định (epoch)
        }
        if (ngayKetThuc == null) {
            ngayKetThuc = LocalDate.now().plusDays(1); // Bao gồm cả ngày hiện tại
        }

        Date startDate = Date.valueOf(ngayBatDau);
        Date endDate = Date.valueOf(ngayKetThuc);

        return khuyenMaiRepository.filterKhuyenMaiByAllConditions(tenKhuyenMai, loaiKhuyenMai, trangThai, startDate,
                endDate);
    }

    // Tìm kiếm khuyến mãi trong khoảng thời gian
    public List<KhuyenMai> searchKhuyenMaiByDateRange(Date ngayBatDau, Date ngayKetThuc) {
        return khuyenMaiRepository.findByNgayBatDauGreaterThanEqualAndNgayKetThucLessThanEqual(ngayBatDau, ngayKetThuc);
    }

    // Khóa khuyến mãi (trạng thái = 2)
    public void lockKhuyenMaiById(Integer id) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(id).orElse(null);
        if (khuyenMai != null) {
            khuyenMai.setTrangThai(2);
            khuyenMaiRepository.save(khuyenMai); // Cập nhật trạng thái là đã khóa
        }
    }

    // Kích hoạt khuyến mãi (trạng thái = 1)
    public void activateKhuyenMaiById(Integer id) {
        KhuyenMai khuyenMai = khuyenMaiRepository.findById(id).orElse(null);
        if (khuyenMai != null) {
            khuyenMai.setTrangThai(1);
            khuyenMaiRepository.save(khuyenMai); // Cập nhật trạng thái là kích hoạt
        }
    }
}
