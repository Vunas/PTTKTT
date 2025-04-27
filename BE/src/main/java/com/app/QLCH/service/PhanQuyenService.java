package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.PhanQuyen;
import com.app.QLCH.repository.PhanQuyenRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PhanQuyenService {

    @Autowired
    private PhanQuyenRepository phanQuyenRepository;

    public List<PhanQuyen> getAllActiveQuyen() {
        return phanQuyenRepository.findByTrangThai(1);
    }

    public PhanQuyen getQuyenById(Integer id) {
        PhanQuyen phanQuyen = phanQuyenRepository.findById(id).orElse(null);
        if (phanQuyen != null && phanQuyen.getTrangThai() != 0) {
            return phanQuyen;
        }
        return null;
    }

    public PhanQuyen saveQuyen(PhanQuyen PhanQuyen) {
        return phanQuyenRepository.save(PhanQuyen);
    }

    public void deleteQuyenById(Integer id) {
        PhanQuyen phanQuyen = phanQuyenRepository.findById(id).orElse(null);
        if (phanQuyen != null) {
            phanQuyen.setTrangThai(0);
            phanQuyenRepository.save(phanQuyen);
        }
    }

    public List<PhanQuyen> filterQuyen(String tenQuyen, Integer trangThai) {
        return phanQuyenRepository.findByTenQuyenContainingIgnoreCaseAndTrangThai(
                tenQuyen != null ? tenQuyen : "",
                trangThai != null ? trangThai : 1);
    }

    public boolean existsByTenQuyen(String tenQuyen) {
        return phanQuyenRepository.existsByTenQuyen(tenQuyen);
    }

    public Map<String, Map<String, Boolean>> getDanhSachQuyen(Integer maQuyen) {
        PhanQuyen phanQuyen = phanQuyenRepository.findById(maQuyen).orElse(null);
        if (phanQuyen == null)
            return null;

        Map<String, Map<String, Boolean>> formattedPermissions = new HashMap<>();
        String[] danhSachQuyenMoiTrang = phanQuyen.getDanhSachChucNang().split(";");

        for (String string : danhSachQuyenMoiTrang) {
            String[] parts = string.split(":");
            if (parts.length < 2)
                continue;

            String tenQuyen = parts[0].trim();
            String cacQuyen = parts[1];

            Map<String, Boolean> quyenTruyCap = new HashMap<>();
            quyenTruyCap.put("access", false);
            quyenTruyCap.put("create", false);
            quyenTruyCap.put("fix", false);
            quyenTruyCap.put("delete", false);

            if (cacQuyen.contains("access"))
                quyenTruyCap.put("access", true);
            if (cacQuyen.contains("create"))
                quyenTruyCap.put("create", true);
            if (cacQuyen.contains("fix"))
                quyenTruyCap.put("fix", true);
            if (cacQuyen.contains("delete"))
                quyenTruyCap.put("delete", true);

            formattedPermissions.put(tenQuyen, quyenTruyCap);
        }

        return formattedPermissions;
    }
}
