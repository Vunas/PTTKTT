package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.KhoHang;
import com.app.QLCH.repository.KhoHangRepository;

import java.util.List;

@Service
public class KhoHangService {
    @Autowired
    private KhoHangRepository khoHangRepository;

    // Lấy danh sách tất cả kho hàng đang hoạt động
    public List<KhoHang> getAllKhoHang() {
        return khoHangRepository.findByTrangThai(1); // Chỉ lấy kho hàng có trạng thái hoạt động
    }

    // Lấy một kho hàng theo ID
    public KhoHang getKhoHangById(Integer id) {
        KhoHang khoHang = khoHangRepository.findById(id).orElse(null);
        if (khoHang != null && khoHang.getTrangThai() == 1) {
            return khoHang;
        }
        return null; // Trả về null nếu kho hàng đã bị "xóa"
    }

    // Thêm hoặc cập nhật kho hàng
    public KhoHang saveKhoHang(KhoHang khoHang) {
        return khoHangRepository.save(khoHang);
    }

    // Xóa mềm kho hàng theo ID
    public void deleteKhoHangById(Integer id) {
        KhoHang khoHang = khoHangRepository.findById(id).orElse(null);
        if (khoHang != null) {
            khoHang.setTrangThai(0); // Đánh dấu là đã xóa
            khoHangRepository.save(khoHang); // Lưu lại thay đổi
        }
    }

    // Lấy danh sách kho hàng theo tên và trạng thái
    public List<KhoHang> getKhoHangByTen(String tenKhoHang) {
        return khoHangRepository.findByTenKhoHangContainingIgnoreCaseAndTrangThai(tenKhoHang, 1);
    }

    // Lọc kho hàng theo tên, địa điểm và trạng thái
    public List<KhoHang> filterKhoHang(String tenKhoHang, String diaDiem) {
        return khoHangRepository
                .findByTenKhoHangContainingIgnoreCaseAndDiaDiemContainingIgnoreCaseAndTrangThai(
                        tenKhoHang != null ? tenKhoHang : "",
                        diaDiem != null ? diaDiem : "",
                        1);
    }

    public boolean existsByTenKhoHang(String tenKhoHang) {
        return khoHangRepository.existsByTenKhoHang(tenKhoHang);
    }
}
