package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.NhaCungCap;
import com.app.QLCH.repository.NhaCungCapRepository;

import java.util.List;

@Service
public class NhaCungCapService {
    @Autowired
    private NhaCungCapRepository nhaCungCapRepository;

    // Lấy danh sách tất cả nhà cung cấp đang hoạt động
    public List<NhaCungCap> getAllNhaCungCap() {
        return nhaCungCapRepository.findByTrangThai(1); // Chỉ lấy nhà cung cấp có trạng thái hoạt động
    }

    // Lấy một nhà cung cấp theo ID
    public NhaCungCap getNhaCungCapById(Integer id) {
        NhaCungCap nhaCungCap = nhaCungCapRepository.findById(id).orElse(null);
        if (nhaCungCap != null && nhaCungCap.getTrangThai() == 1) {
            return nhaCungCap;
        }
        return null; // Trả về null nếu nhà cung cấp đã bị "xóa"
    }

    // Thêm hoặc cập nhật nhà cung cấp
    public NhaCungCap saveNhaCungCap(NhaCungCap nhaCungCap) {
        return nhaCungCapRepository.save(nhaCungCap);
    }

    // Xóa mềm nhà cung cấp theo ID
    public void deleteNhaCungCapById(Integer id) {
        NhaCungCap nhaCungCap = nhaCungCapRepository.findById(id).orElse(null);
        if (nhaCungCap != null) {
            nhaCungCap.setTrangThai(0); // Đánh dấu là đã xóa
            nhaCungCapRepository.save(nhaCungCap); // Lưu lại thay đổi
        }
    }

    public List<NhaCungCap> getNhaCungCapByEmail(String email) {
        return nhaCungCapRepository.findByEmailContainingIgnoreCaseAndTrangThai(email, 1);
    }

    public List<NhaCungCap> filterNhaCungCap(String tenNhaCungCap, String email, String soDienThoai,
            String diaChi) {
        return nhaCungCapRepository
                .findByTenNhaCungCapContainingIgnoreCaseAndEmailContainingIgnoreCaseAndSoDienThoaiContainingAndDiaChiContainingIgnoreCaseAndTrangThai(
                        tenNhaCungCap != null ? tenNhaCungCap : "",
                        email != null ? email : "",
                        soDienThoai != null ? soDienThoai : "",
                        diaChi != null ? diaChi : "",
                        1);
    }

    public boolean existsByEmail(String email) {
        return nhaCungCapRepository.existsByEmail(email);
    }

    public boolean existsBySoDienThoai(String soDienThoai) {
        return nhaCungCapRepository.existsBySoDienThoai(soDienThoai);
    }
}
