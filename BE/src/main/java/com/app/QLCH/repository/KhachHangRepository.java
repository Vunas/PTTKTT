package com.app.QLCH.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.KhachHang;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
    // Tìm khách hàng theo email (không phân biệt chữ hoa/chữ thường) và trạng thái
    // kích hoạt
    List<KhachHang> findByEmailContainingIgnoreCaseAndTrangThai(String email, int trangThai);

    // Tìm kiếm khách hàng theo trạng thái
    List<KhachHang> findByTrangThai(Integer trangThai);

    // Tìm khách hàng theo các tiêu chí và trạng thái kích hoạt
    List<KhachHang> findByHoTenContainingIgnoreCaseAndEmailContainingIgnoreCaseAndGioiTinhContainingIgnoreCaseAndSoDienThoaiContainingAndDiaChiContainingIgnoreCaseAndTrangThai(
            String hoTen, String email, String gioiTinh, String soDienThoai, String diaChi, int trangThai);

    boolean existsByEmail(String email);

    boolean existsBySoDienThoai(String soDienThoai);
    
    Optional<KhachHang> findByEmail(String email);
    Optional<KhachHang> findBySoDienThoai(String soDienThoai);

}
