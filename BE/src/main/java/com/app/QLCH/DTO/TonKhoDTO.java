package com.app.QLCH.DTO;

import com.app.QLCH.model.KhoHang;
import com.app.QLCH.model.NguyenLieu;

import lombok.Data;

import java.util.List;

@Data
public class TonKhoDTO {
    private KhoHang khoHang;
    private List<NguyenLieu> nguyenLieuList;

}