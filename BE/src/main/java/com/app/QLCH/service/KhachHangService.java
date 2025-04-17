package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.KhachHang;
import com.app.QLCH.repository.KhachHangRepository;

import java.util.List;
import java.util.Optional;

@Service
public class KhachHangService {
    @Autowired
    private KhachHangRepository khachHangRepository;

    // Lấy danh sách tất cả khách hàng đang hoạt động
    public List<KhachHang> getAllKhachHang() {
        return khachHangRepository.findByTrangThai(1); // Chỉ lấy khách hàng có trạng thái hoạt động
    }

    // Lấy một khách hàng theo ID
    public KhachHang getKhachHangById(Integer id) {
        KhachHang khachHang = khachHangRepository.findById(id).orElse(null);
        if (khachHang != null && khachHang.getTrangThai() == 1) {
            return khachHang;
        }
        return null; // Trả về null nếu khách hàng đã bị "xóa"
    }

    // Thêm hoặc cập nhật khách hàng
    public KhachHang saveKhachHang(KhachHang khachHang) {
        return khachHangRepository.save(khachHang);
    }

    // Xóa mềm khách hàng theo ID
    public void deleteKhachHangById(Integer id) {
        KhachHang khachHang = khachHangRepository.findById(id).orElse(null);
        if (khachHang != null) {
            khachHang.setTrangThai(0); // Đánh dấu là đã xóa
            khachHangRepository.save(khachHang); // Lưu lại thay đổi
        }
    }

    public List<KhachHang> getKhachHangByEmail(String email) {
        return khachHangRepository.findByEmailContainingIgnoreCaseAndTrangThai(email, 1);
    }

    public List<KhachHang> filterKhachHang(String hoTen, String email, String gioiTinh,
            String soDienThoai, String diaChi) {
        return khachHangRepository
                .findByHoTenContainingIgnoreCaseAndEmailContainingIgnoreCaseAndGioiTinhContainingIgnoreCaseAndSoDienThoaiContainingAndDiaChiContainingIgnoreCaseAndTrangThai(
                        hoTen != null ? hoTen : "",
                        email != null ? email : "",
                        gioiTinh != null ? gioiTinh : null,
                        soDienThoai != null ? soDienThoai : "",
                        diaChi != null ? diaChi : "",
                        1);
    }

    public boolean existsByEmail(String email) {
        return khachHangRepository.existsByEmail(email);
    }

    public boolean existsBySoDienThoai(String soDienThoai) {
        return khachHangRepository.existsBySoDienThoai(soDienThoai);
    }

    public Optional<KhachHang> findByEmail(String email) {
        return khachHangRepository.findByEmail(email);
    }

    public Optional<KhachHang> findBySoDienThoai(String soDienThoai) {
        return khachHangRepository.findBySoDienThoai(soDienThoai);
    }

}