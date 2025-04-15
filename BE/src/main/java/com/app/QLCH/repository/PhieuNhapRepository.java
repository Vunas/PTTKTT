package com.app.QLCH.repository;

import com.app.QLCH.model.PhieuNhap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PhieuNhapRepository extends JpaRepository<PhieuNhap, Long> {

}