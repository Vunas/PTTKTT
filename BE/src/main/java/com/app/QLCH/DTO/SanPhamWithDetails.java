package com.app.QLCH.DTO;

import java.util.List;
import com.app.QLCH.model.SanPham;
import com.app.QLCH.model.ChiTietNguyenLieuSanPham;

public class SanPhamWithDetails {
    private SanPham sanPham;
    private List<ChiTietNguyenLieuSanPham> chiTietNguyenLieu;

    public SanPhamWithDetails(SanPham sanPham, List<ChiTietNguyenLieuSanPham> chiTietNguyenLieu) {
        this.sanPham = sanPham;
        this.chiTietNguyenLieu = chiTietNguyenLieu;
    }

    // Getters và Setters
    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

    public List<ChiTietNguyenLieuSanPham> getChiTietNguyenLieu() {
        return chiTietNguyenLieu;
    }

    public void setChiTietNguyenLieu(List<ChiTietNguyenLieuSanPham> chiTietNguyenLieu) {
        this.chiTietNguyenLieu = chiTietNguyenLieu;
    }
}
