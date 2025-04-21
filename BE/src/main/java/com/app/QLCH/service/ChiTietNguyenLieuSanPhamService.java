package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.QLCH.model.ChiTietNguyenLieuSanPham;
import com.app.QLCH.model.NguyenLieu;
import com.app.QLCH.model.SanPham;
import com.app.QLCH.repository.ChiTietNguyenLieuSanPhamRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChiTietNguyenLieuSanPhamService {

    @Autowired
    private ChiTietNguyenLieuSanPhamRepository repository;

    // Lấy danh sách tất cả chi tiết nguyên liệu
    public List<ChiTietNguyenLieuSanPham> getAllChiTiet() {
        return repository.findAll();
    }

    // Lấy chi tiết nguyên liệu theo ID
    public ChiTietNguyenLieuSanPham getChiTietById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // Thêm hoặc cập nhật một chi tiết nguyên liệu
    public ChiTietNguyenLieuSanPham saveChiTiet(ChiTietNguyenLieuSanPham chiTiet) {
        return repository.save(chiTiet);
    }

    // Xóa một chi tiết nguyên liệu theo ID
    public void deleteChiTietById(Integer id) {
        repository.deleteById(id);
    }

    // Xóa tất cả chi tiết nguyên liệu theo sản phẩm ID
    public void deleteBySanPhamId(Integer maSanPham) {
        List<ChiTietNguyenLieuSanPham> details = repository.findBySanPhamMaSanPham(maSanPham);
        if (!details.isEmpty()) {
            repository.deleteAll(details);
        }
    }

    // Tìm danh sách chi tiết nguyên liệu theo sản phẩm
    public List<ChiTietNguyenLieuSanPham> findBySanPham(Integer maSanPham) {
        return repository.findBySanPhamMaSanPham(maSanPham);
    }

    public List<NguyenLieu> findNguyenLieuBySanPham(List<SanPham> sanPhamList) {
        return sanPhamList.stream()
                .flatMap(sanPham -> repository.findBySanPhamMaSanPham(sanPham.getMaSanPham()).stream()
                        .map(chiTiet -> {
                            // Tạo một bản sao mới thay vì sửa đổi trực tiếp đối tượng gốc
                            NguyenLieu nguyenLieuCopy = new NguyenLieu();
                            nguyenLieuCopy.setMaNguyenLieu(chiTiet.getNguyenLieu().getMaNguyenLieu());
                            nguyenLieuCopy.setTen(chiTiet.getNguyenLieu().getTen());
                            nguyenLieuCopy.setHinhAnh(chiTiet.getNguyenLieu().getHinhAnh());
                            nguyenLieuCopy.setSoLuong(
                                    (int) Math.round(chiTiet.getSoLuongNguyenLieu() * sanPham.getSoLuong()));
                            return nguyenLieuCopy;
                        }))
                .collect(Collectors.toList());
    }

}