package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.TonKho;
import com.app.QLCH.model.KhoHang;
import com.app.QLCH.model.SanPham;
import com.app.QLCH.repository.TonKhoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TonKhoService {
    @Autowired
    private TonKhoRepository tonKhoRepository;

    // Lấy tất cả tồn kho
    public List<TonKho> getAllTonKho() {
        return tonKhoRepository.findAll();
    }

    // Lấy tồn kho theo ID
    public TonKho getTonKhoById(Integer id) {
        return tonKhoRepository.findById(id).orElse(null);
    }

    // Lấy tồn kho theo kho hàng
    public List<TonKho> getTonKhoByKhoHang(KhoHang khoHang) {
        return tonKhoRepository.findByKhoHang(khoHang);
    }

    // Lấy tồn kho theo sản phẩm
    public List<TonKho> getTonKhoBySanPham(SanPham sanPham) {
        return tonKhoRepository.findBySanPham(sanPham);
    }

    // Lấy tồn kho theo kho hàng và sản phẩm
    public TonKho getTonKhoByKhoHangAndSanPham(KhoHang khoHang, SanPham sanPham) {
        return tonKhoRepository.findByKhoHangAndSanPham(khoHang, sanPham);
    }

    // Thêm mới hoặc cập nhật tồn kho
    public TonKho saveTonKho(TonKho tonKho) {
        return tonKhoRepository.save(tonKho);
    }

    // Kiểm tra tồn tại của sản phẩm trong kho
    public boolean existsByKhoHangAndSanPham(KhoHang khoHang, SanPham sanPham) {
        return tonKhoRepository.existsByKhoHangAndSanPham(khoHang, sanPham);
    }

    // Lấy tồn kho có số lượng lớn hơn giá trị
    public List<TonKho> getTonKhoBySoLuongGreaterThan(Integer soLuong) {
        return tonKhoRepository.findBySoLuongGreaterThan(soLuong);
    }

    // Lấy tồn kho có số lượng nhỏ hơn giá trị
    public List<TonKho> getTonKhoBySoLuongLessThan(Integer soLuong) {
        return tonKhoRepository.findBySoLuongLessThan(soLuong);
    }

    // Xóa mềm tồn kho bằng cách đánh dấu (trong trường hợp cần)
    public void deleteTonKhoById(Integer id) {
        TonKho tonKho = tonKhoRepository.findById(id).orElse(null);
        if (tonKho != null) {
            tonKhoRepository.delete(tonKho); // Nếu muốn xóa cứng
        }
    }

    public List<TonKho> filterTonKho(Integer maKhoHang, Integer maSanPham, Integer soLuongMin, Integer soLuongMax) {
        return tonKhoRepository.findAll().stream()
                .filter(tonKho -> (maKhoHang == null || tonKho.getKhoHang().getMaKhoHang().equals(maKhoHang)) &&
                        (maSanPham == null || tonKho.getSanPham().getMaSanPham().equals(maSanPham)) &&
                        (soLuongMin == null || tonKho.getSoLuong() >= soLuongMin) &&
                        (soLuongMax == null || tonKho.getSoLuong() <= soLuongMax))
                .collect(Collectors.toList());
    }
}