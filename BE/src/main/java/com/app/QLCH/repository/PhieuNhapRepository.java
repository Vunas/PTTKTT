package com.app.QLCH.repository;

import com.app.QLCH.model.PhieuNhap;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface PhieuNhapRepository extends JpaRepository<PhieuNhap, Long> {
   @Query("SELECT pn FROM PhieuNhap pn " +
       "LEFT JOIN FETCH pn.chiTiet ct " +
       "LEFT JOIN FETCH ct.nguyenLieu " +
       "WHERE pn.id = :id")
   Optional<PhieuNhap> findByIdWithChiTiet(@Param("id") Long id);
}