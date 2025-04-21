package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.QLCH.model.CheBien;
import com.app.QLCH.repository.CheBienRepository;

import java.util.List;

@Service
public class CheBienService {

    @Autowired
    private CheBienRepository repository;

    // Lấy danh sách tất cả chế biến chưa bị xóa mềm
    public List<CheBien> getAllActiveCheBien() {
        return repository.findAllActive();
    }

    // Lấy chế biến theo ID
    public CheBien getCheBienById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // Thêm hoặc cập nhật chế biến
    public CheBien saveCheBien(CheBien cheBien) {
        return repository.save(cheBien);
    }

    public List<CheBien> saveALL(List<CheBien> cheBienList) {
        return repository.saveAll(cheBienList);
    }

    // Xóa mềm chế biến theo ID
    @Transactional
    public void softDeleteCheBien(Integer id) {
        repository.softDelete(id);
    }

    // Tìm danh sách chế biến theo nhân viên thực hiện
    public List<CheBien> findByNguoiCheBien(Integer maNhanVien) {
        return repository.findByNguoiCheBienMaNhanVien(maNhanVien);
    }
}