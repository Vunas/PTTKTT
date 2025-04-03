package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.PhanQuyen;
import com.app.QLCH.repository.PhanQuyenRepository;

import java.util.List;

@Service
public class PhanQuyenService {

    @Autowired
    private PhanQuyenRepository phanQuyenRepository;

    // Lấy danh sách tất cả các quyền còn hoạt động
    public List<PhanQuyen> getAllActiveQuyen() {
        return phanQuyenRepository.findByTrangThai(1); // Chỉ lấy quyền có trạng thái kích hoạt (1)
    }

    // Lấy một quyền theo ID
    public PhanQuyen getQuyenById(Integer id) {
        PhanQuyen phanQuyen = phanQuyenRepository.findById(id).orElse(null);
        if (phanQuyen != null && phanQuyen.getTrangThai() != 0) {
            return phanQuyen; // Chỉ trả về quyền chưa bị xóa
        }
        return null; // Trả về null nếu quyền đã bị xóa
    }

    // Thêm hoặc cập nhật quyền
    public PhanQuyen saveQuyen(PhanQuyen PhanQuyen) {
        return phanQuyenRepository.save(PhanQuyen);
    }

    // Xóa mềm quyền (đánh dấu trạng thái là đã xóa)
    public void deleteQuyenById(Integer id) {
        PhanQuyen phanQuyen = phanQuyenRepository.findById(id).orElse(null);
        if (phanQuyen != null) {
            phanQuyen.setTrangThai(0); // Đánh dấu là đã xóa
            phanQuyenRepository.save(phanQuyen); // Lưu thay đổi
        }
    }

    public List<PhanQuyen> filterQuyen(String tenQuyen, Integer trangThai) {
        return phanQuyenRepository.findByTenQuyenContainingIgnoreCaseAndTrangThai(
                tenQuyen != null ? tenQuyen : "",
                trangThai != null ? trangThai : 1 // Mặc định trạng thái là "1" (kích hoạt)
        );
    }

    public boolean existsByTenQuyen(String tenQuyen) {
        return phanQuyenRepository.existsByTenQuyen(tenQuyen);
    }
    
}
