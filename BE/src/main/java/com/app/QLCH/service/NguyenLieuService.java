package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.repository.NguyenLieuRepository;

import java.util.List;

@Service
public class NguyenLieuService {
    @Autowired
    private NguyenLieuRepository nguyenLieuRepository;

    // Lấy danh sách tất cả nguyên liệu
    public List<NguyenLieu> getAllNguyenLieu() {
        return nguyenLieuRepository.findAll();
    }

    // Lấy một nguyên liệu theo ID
    public NguyenLieu getNguyenLieuById(Integer id) {
        return nguyenLieuRepository.findById(id).orElse(null);
    }

    // Thêm hoặc cập nhật nguyên liệu
    public NguyenLieu saveNguyenLieu(NguyenLieu nguyenLieu) {
        return nguyenLieuRepository.save(nguyenLieu);
    }

    // Xóa nguyên liệu theo ID
    public void deleteNguyenLieuById(Integer id) {
        NguyenLieu nguyenLieu = nguyenLieuRepository.findById(id).orElse(null);
        if ( nguyenLieu != null) {
            nguyenLieu.setTrangThai(0);
            nguyenLieuRepository.save(nguyenLieu);
        }
    }

    public List<NguyenLieu> filterNguyenLieu(String ten, String donVi, Double giaNhapMin, Double giaNhapMax,
            Integer soLuongMin, Integer soLuongMax) {
        return nguyenLieuRepository
                .findByTenContainingIgnoreCaseAndDonViContainingIgnoreCaseAndGiaNhapBetweenAndSoLuongBetween(
                        ten != null ? ten : "",
                        donVi != null ? donVi : "",
                        giaNhapMin != null ? giaNhapMin : 0.0,
                        giaNhapMax != null ? giaNhapMax : Double.MAX_VALUE,
                        soLuongMin != null ? soLuongMin : 0,
                        soLuongMax != null ? soLuongMax : Integer.MAX_VALUE);
    }

    // Kiểm tra xem nguyên liệu có tồn tại theo tên
    public boolean existsByTen(String ten) {
        return nguyenLieuRepository.existsByTen(ten);
    }
}
