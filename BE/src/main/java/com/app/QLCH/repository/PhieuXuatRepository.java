package com.app.QLCH.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.QLCH.model.PhieuXuat;

@Repository
public interface PhieuXuatRepository extends JpaRepository<PhieuXuat, Long> {

}