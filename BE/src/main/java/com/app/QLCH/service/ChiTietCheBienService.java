package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.QLCH.model.ChiTietCheBien;
import com.app.QLCH.repository.ChiTietCheBienRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ChiTietCheBienService {

    @Autowired
    private ChiTietCheBienRepository repository;

    // Lấy danh sách tất cả chi tiết chế biến chưa bị xóa mềm
    public List<ChiTietCheBien> getAllActiveChiTietCheBien() {
        return repository.findAllActive();
    }

    // Lấy chi tiết chế biến theo ID
    public Optional<ChiTietCheBien> getChiTietCheBienById(Integer id) {
        return repository.findById(id);
    }

    // Thêm hoặc cập nhật chi tiết chế biến
    public ChiTietCheBien saveChiTietCheBien(ChiTietCheBien chiTietCheBien) {
        return repository.save(chiTietCheBien);
    }

    // Lưu danh sách chi tiết chế biến
    public List<ChiTietCheBien> saveAll(List<ChiTietCheBien> chiTietCheBienList) {
        return repository.saveAll(chiTietCheBienList);
    }

    // Xóa mềm chi tiết chế biến theo ID
    @Transactional
    public void softDeleteChiTietCheBien(Integer id) {
        repository.softDelete(id);
    }

    // Xóa mềm toàn bộ chi tiết chế biến theo mã CheBien
    @Transactional
    public void softDeleteChiTietByCheBien(Integer maCheBien) {
        List<ChiTietCheBien> chiTietList = repository.findByCheBienMaCheBien(maCheBien);
        for (ChiTietCheBien chiTiet : chiTietList) {
            repository.softDelete(chiTiet.getMaChiTiet());
        }
    }

    // Tìm danh sách chi tiết chế biến theo chế biến
    public List<ChiTietCheBien> findByCheBien(Integer maCheBien) {
        return repository.findByCheBienMaCheBien(maCheBien);
    }

    // Tìm danh sách chi tiết chế biến theo sản phẩm
    public List<ChiTietCheBien> findBySanPham(Integer maSanPham) {
        return repository.findBySanPhamMaSanPham(maSanPham);
    }
}