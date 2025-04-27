package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.TonKho;
import com.app.QLCH.model.KhoHang;
import com.app.QLCH.model.NguyenLieu;

@Repository
public interface TonKhoRepository extends JpaRepository<TonKho, Integer> {

    // Tìm danh sách tồn kho theo kho hàng
    List<TonKho> findByKhoHang(KhoHang khoHang);

    List<TonKho> findByKhoHang_MaKhoHang(Integer maKhoHang);

    // Tìm danh sách tồn kho theo nguyên liệu
    List<TonKho> findByNguyenLieu(NguyenLieu nguyenLieu);

    // Tìm tồn kho theo kho hàng và nguyên liệu
    TonKho findByKhoHangAndNguyenLieu(KhoHang khoHang, NguyenLieu nguyenLieu);

    // Tìm danh sách tồn kho theo số lượng lớn hơn một giá trị
    List<TonKho> findBySoLuongGreaterThan(Integer soLuong);

    // Tìm danh sách tồn kho theo số lượng nhỏ hơn một giá trị
    List<TonKho> findBySoLuongLessThan(Integer soLuong);

    // Kiểm tra tồn tại của tồn kho theo kho hàng và nguyên liệu
    boolean existsByKhoHangAndNguyenLieu(KhoHang khoHang, NguyenLieu nguyenLieu);
}