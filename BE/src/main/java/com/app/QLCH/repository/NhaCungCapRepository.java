package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.NhaCungCap;

@Repository
public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, Integer> {
    // Tìm nhà cung cấp theo email (không phân biệt chữ hoa/chữ thường) và trạng thái hoạt động
    List<NhaCungCap> findByEmailContainingIgnoreCaseAndTrangThai(String email, int trangThai);

    // Tìm kiếm nhà cung cấp theo trạng thái
    List<NhaCungCap> findByTrangThai(Integer trangThai);

    // Tìm nhà cung cấp theo các tiêu chí và trạng thái hoạt động
    List<NhaCungCap> findByTenNhaCungCapContainingIgnoreCaseAndEmailContainingIgnoreCaseAndSoDienThoaiContainingAndDiaChiContainingIgnoreCaseAndTrangThai(
            String tenNhaCungCap, String email, String soDienThoai, String diaChi, int trangThai);

    boolean existsByEmail(String email);

    boolean existsBySoDienThoai(String soDienThoai);
}
