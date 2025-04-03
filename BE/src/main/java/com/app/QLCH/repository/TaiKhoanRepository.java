package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.TaiKhoan;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer> {
    List<TaiKhoan> findByTrangThaiNot(Integer tranThai);

    // Tìm kiếm tài khoản bằng tên đăng nhập hoặc email
    TaiKhoan findByTenDangNhapAndTrangThai(String tenDangNhap, Integer trangThai);

    TaiKhoan findByEmailAndTrangThai(String email, Integer tranThai);

    Boolean existsByTenDangNhap(String tenDangNhap);
    Boolean existsByEmail(String email);

    List<TaiKhoan> findByTenDangNhapContainingIgnoreCaseAndEmailContainingIgnoreCaseAndMaPhanQuyenAndTrangThai(
            String tenDangNhap, String email, Integer maPhanQuyen, Integer trangThai);
    List<TaiKhoan> findByTenDangNhapContainingIgnoreCaseAndEmailContainingIgnoreCase(String tenDangNhap, String email);

    List<TaiKhoan> findByTenDangNhapContainingIgnoreCaseAndEmailContainingIgnoreCaseAndMaPhanQuyen(String tenDangNhap, String email, Integer maPhanQuyen);
    List<TaiKhoan> findByTenDangNhapContainingIgnoreCaseAndEmailContainingIgnoreCaseAndTrangThai(String tenDangNhap, String email, Integer trangThai);
}
