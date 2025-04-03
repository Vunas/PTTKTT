package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.NhanVien;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
    List<NhanVien> findByEmailContainingIgnoreCaseAndTrangThai(String email, int trangThai);

    // Tìm kiếm nhân viên theo trạng thái
    List<NhanVien> findByTrangThai(Integer trangThai);

    // Tìm kiếm nhân viên theo vai trò
    List<NhanVien> findByHoTenContainingIgnoreCaseAndEmailContainingIgnoreCaseAndGioiTinhContainingIgnoreCaseAndSoDienThoaiContainingAndDiaChiContainingIgnoreCaseAndChucVuContainingIgnoreCaseAndTrangThai(
            String hoTen, String email, String gioiTinh, String soDienThoai, String diaChi,
            String chucVu, int trangThai);

    boolean existsByEmail(String email);

    boolean existsBySoDienThoai(String soDienThoai);
}
