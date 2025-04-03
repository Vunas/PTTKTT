package com.app.QLCH.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app.QLCH.model.PhanQuyen;

@Repository
public interface PhanQuyenRepository extends JpaRepository<PhanQuyen, Integer> {
    List<PhanQuyen> findByTrangThai(Integer trangThai);

    List<PhanQuyen> findByTenQuyenContainingIgnoreCaseAndTrangThai(String tenQuyen, Integer trangThai);

    boolean existsByTenQuyen(String tenQuyen);
}
