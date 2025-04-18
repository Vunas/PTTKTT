package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.CheBien;

@Repository
public interface CheBienRepository extends JpaRepository<CheBien, Integer> {

    // Tìm các chế biến theo nhân viên thực hiện
    List<CheBien> findByNguoiCheBienMaNhanVien(Integer maNhanVien);

    // Lấy danh sách các chế biến chưa bị xoá mềm (trangThai = 1)
    @Query("SELECT cb FROM CheBien cb WHERE cb.trangThai = 1")
    List<CheBien> findAllActive();

    // Cập nhật trạng thái để xóa mềm thay vì xoá cứng
    @Query("UPDATE CheBien cb SET cb.trangThai = 0 WHERE cb.maCheBien = :maCheBien")
    void softDelete(Integer maCheBien);
}