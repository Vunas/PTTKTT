package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.QLCH.model.SanPham;
import com.app.QLCH.repository.SanPhamRepository;

import java.util.List;

@Service
public class SanPhamService {
    @Autowired
    private SanPhamRepository sanPhamRepository;

    // Lấy danh sách tất cả sản phẩm
    public List<SanPham> getAllSanPham() {
        return sanPhamRepository.findAll();
    }

    // Lấy một sản phẩm theo ID
    public SanPham getSanPhamById(Integer id) {
        return sanPhamRepository.findById(id).orElse(null);
    }

    // Thêm hoặc cập nhật sản phẩm
    public SanPham saveSanPham(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }

    public List<SanPham> saveSanPhamBulk(List<SanPham> sanPhamList) {
        return sanPhamRepository.saveAll(sanPhamList); 
    }

    // Xóa sản phẩm theo ID (đánh dấu trạng thái là không hoạt động)
    public void deleteSanPhamById(Integer id) {
        SanPham sanPham = sanPhamRepository.findById(id).orElse(null);
        if (sanPham != null) {
            sanPham.setTrangThai(0); // Đặt trạng thái là không hoạt động
            sanPhamRepository.save(sanPham);
        }
    }

    // Lọc sản phẩm theo các tiêu chí
    public List<SanPham> filterSanPham(String tenSanPham, Double giaBanMin, Double giaBanMax, 
            Integer soLuongMin, Integer soLuongMax) {
        return sanPhamRepository
                .findByTenSanPhamContainingIgnoreCaseAndGiaBanBetweenAndSoLuongBetween(
                        tenSanPham != null ? tenSanPham : "",
                        giaBanMin != null ? giaBanMin : 0.0,
                        giaBanMax != null ? giaBanMax : Double.MAX_VALUE,
                        soLuongMin != null ? soLuongMin : 0,
                        soLuongMax != null ? soLuongMax : Integer.MAX_VALUE);
    }

    // Kiểm tra xem sản phẩm có tồn tại theo tên
    public boolean existsByTenSanPham(String tenSanPham) {
        return sanPhamRepository.existsByTenSanPham(tenSanPham);
    }
}
