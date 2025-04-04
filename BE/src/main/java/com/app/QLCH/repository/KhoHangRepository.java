package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.KhoHang;

@Repository
public interface KhoHangRepository extends JpaRepository<KhoHang, Integer> {
    // Tìm kho hàng theo tên (không phân biệt chữ hoa/chữ thường) và trạng thái hoạt động
    List<KhoHang> findByTenKhoHangContainingIgnoreCaseAndTrangThai(String tenKhoHang, int trangThai);

    // Tìm kiếm kho hàng theo trạng thái
    List<KhoHang> findByTrangThai(Integer trangThai);

    // Tìm kho hàng theo các tiêu chí và trạng thái hoạt động
    List<KhoHang> findByTenKhoHangContainingIgnoreCaseAndDiaDiemContainingIgnoreCaseAndTrangThai(
            String tenKhoHang, String diaDiem, int trangThai);

    boolean existsByTenKhoHang(String tenKhoHang);
}
