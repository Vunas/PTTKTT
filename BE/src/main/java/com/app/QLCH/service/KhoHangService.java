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

    public List<KhoHang> getAllKhoHang() {
        return khoHangRepository.findByTrangThai(1);
    }

    public KhoHang getKhoHangById(Integer id) {
        KhoHang khoHang = khoHangRepository.findById(id).orElse(null);
        if (khoHang != null && khoHang.getTrangThai() == 1) {
            return khoHang;
        }
        return null;
    }

    public KhoHang saveKhoHang(KhoHang khoHang) {
        return khoHangRepository.save(khoHang);
    }

    public void deleteKhoHangById(Integer id) {
        KhoHang khoHang = khoHangRepository.findById(id).orElse(null);
        if (khoHang != null) {
            khoHang.setTrangThai(0);
            khoHangRepository.save(khoHang);
        }
    }

    public List<KhoHang> getKhoHangByTen(String tenKhoHang) {
        return khoHangRepository.findByTenKhoHangContainingIgnoreCaseAndTrangThai(tenKhoHang, 1);
    }

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
