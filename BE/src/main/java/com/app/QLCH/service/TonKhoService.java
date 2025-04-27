package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.TonKho;
import com.app.QLCH.DTO.TonKhoDTO;
import com.app.QLCH.model.KhoHang;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.repository.TonKhoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TonKhoService {
    @Autowired
    private TonKhoRepository tonKhoRepository;

    @Autowired
    private NguyenLieuService nguyenLieuService;

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

    // Lấy tồn kho theo sản phẩm (đã sửa tên biến)
    public List<TonKho> getTonKhoByNguyenLieu(NguyenLieu nguyenLieu) {
        return tonKhoRepository.findByNguyenLieu(nguyenLieu);
    }

    // Lấy tồn kho theo kho hàng và sản phẩm (đã sửa tên biến)
    public TonKho getTonKhoByKhoHangAndNguyenLieu(KhoHang khoHang, NguyenLieu nguyenLieu) {
        return tonKhoRepository.findByKhoHangAndNguyenLieu(khoHang, nguyenLieu);
    }

    // Thêm mới hoặc cập nhật tồn kho
    public TonKho saveTonKho(TonKho tonKho) {
        return tonKhoRepository.save(tonKho);
    }

    // Kiểm tra tồn tại của sản phẩm trong kho (đã sửa tên biến)
    public boolean existsByKhoHangAndNguyenLieu(KhoHang khoHang, NguyenLieu nguyenLieu) {
        return tonKhoRepository.existsByKhoHangAndNguyenLieu(khoHang, nguyenLieu);
    }

    public boolean updateNguyenLieuTonKho(TonKhoDTO tonKhoDTO) {
        for (NguyenLieu nguyenLieu : tonKhoDTO.getNguyenLieuList()) {
            TonKho tonKho = tonKhoRepository.findByKhoHangAndNguyenLieu(tonKhoDTO.getKhoHang(), nguyenLieu);
            if (tonKho.getSoLuong() < nguyenLieu.getSoLuong()) {
                return false;
            }
        }

        for (NguyenLieu nguyenLieu : tonKhoDTO.getNguyenLieuList()) {
            System.out.println("bat dau tu day aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            TonKho tonKho = tonKhoRepository.findByKhoHangAndNguyenLieu(tonKhoDTO.getKhoHang(), nguyenLieu);
            System.out.println(tonKho.getSoLuong() + " va  " + nguyenLieu.getSoLuong());
            tonKho.setSoLuong((tonKho.getSoLuong() - nguyenLieu.getSoLuong()));
            NguyenLieu newNguyenLieu = nguyenLieuService.getNguyenLieuById(nguyenLieu.getMaNguyenLieu());
            newNguyenLieu.setSoLuong(newNguyenLieu.getSoLuong() + nguyenLieu.getSoLuong());
            nguyenLieuService.saveNguyenLieu(newNguyenLieu);
            tonKhoRepository.save(tonKho);
        }

        return true;
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

    public List<TonKho> filterTonKho(Integer maKhoHang, Integer maNguyenLieu, Integer soLuongMin, Integer soLuongMax) {
        return tonKhoRepository.findAll().stream()
                .filter(tonKho -> (maKhoHang == null || tonKho.getKhoHang().getMaKhoHang().equals(maKhoHang)) &&
                        (maNguyenLieu == null || tonKho.getNguyenLieu().getMaNguyenLieu().equals(maNguyenLieu)) &&
                        (soLuongMin == null || tonKho.getSoLuong() >= soLuongMin) &&
                        (soLuongMax == null || tonKho.getSoLuong() <= soLuongMax))
                .collect(Collectors.toList());
    }
}