package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.NhanVien;
import com.app.QLCH.repository.NhanVienRepository;

import java.util.List;

@Service
public class NhanVienService {
    @Autowired
    private NhanVienRepository nhanVienRepository;

    // Lấy danh sách tất cả nhân viên còn hoạt động
    public List<NhanVien> getAllNhanVien() {
        return nhanVienRepository.findByTrangThai(1); // Chỉ lấy nhân viên có trạng thái hoạt động
    }

    // Lấy một nhân viên theo ID (chỉ hoạt động)
    public NhanVien getNhanVienById(Integer id) {
        NhanVien nhanVien = nhanVienRepository.findById(id).orElse(null);
        if (nhanVien != null && nhanVien.getTrangThai() == 1) {
            return nhanVien;
        }
        return null; // Trả về null nếu nhân viên đã bị xóa
    }

    public NhanVien getNhanVienByEmail(String email) {
        return nhanVienRepository.findByEmailAndTrangThai(email,1);
    }

    // Thêm hoặc cập nhật nhân viên
    public NhanVien saveNhanVien(NhanVien nhanVien) {
        return nhanVienRepository.save(nhanVien);
    }

    // Xóa mềm nhân viên theo ID
    public void deleteNhanVienById(Integer id) {
        NhanVien nhanVien = nhanVienRepository.findById(id).orElse(null);
        if (nhanVien != null) {
            nhanVien.setTrangThai(0); // Đánh dấu là đã xóa
            nhanVienRepository.save(nhanVien); // Lưu thay đổi
        }
    }

    public List<NhanVien> filterNhanVien(String hoTen, String email, String gioiTinh,
            String soDienThoai, String diaChi, String chucVu, int trangThai) {
        return nhanVienRepository
                .findByHoTenContainingIgnoreCaseAndEmailContainingIgnoreCaseAndGioiTinhContainingIgnoreCaseAndSoDienThoaiContainingAndDiaChiContainingIgnoreCaseAndChucVuContainingIgnoreCaseAndTrangThai(
                        hoTen != null ? hoTen : "",
                        email != null ? email : "",
                        gioiTinh != null ? gioiTinh : "",
                        soDienThoai != null ? soDienThoai : "",
                        diaChi != null ? diaChi : "",
                        chucVu != null ? chucVu : "",
                        trangThai);
    }

    public boolean existsByEmail(String email) {
        return nhanVienRepository.existsByEmail(email);
    }

    public boolean existsBySoDienThoai(String soDienThoai) {
        return nhanVienRepository.existsBySoDienThoai(soDienThoai);
    }

}