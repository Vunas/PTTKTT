package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.QLCH.model.ChiTietDonHang;
import com.app.QLCH.repository.ChiTietDonHangRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChiTietDonHangService {

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepository;

    // Lấy danh sách tất cả chi tiết đơn hàng
    public List<ChiTietDonHang> getAllChiTietDonHang() {
        return chiTietDonHangRepository.findAll();
    }

    // Lấy chi tiết đơn hàng theo ID
    public ChiTietDonHang getChiTietDonHangById(Integer id) {
        return chiTietDonHangRepository.findById(id).orElse(null);
    }

    // Lấy chi tiết đơn hàng theo mã đơn hàng
    public List<ChiTietDonHang> getChiTietByMaDonHangAndTrangThai(Integer maDonHang) {
        return chiTietDonHangRepository.findByMaDonHangAndTrangThai(maDonHang, 1);
    }

    public List<ChiTietDonHang> getChiTietByMaDonHang(Integer maDonHang) {
        return chiTietDonHangRepository.findByMaDonHang(maDonHang);
    }

    // Lấy chi tiết đơn hàng theo mã sản phẩm
    public List<ChiTietDonHang> getChiTietByMaSanPham(Integer maSanPham) {
        return chiTietDonHangRepository.findByMaSanPham(maSanPham);
    }

    // Thêm hoặc cập nhật chi tiết đơn hàng
    public ChiTietDonHang saveChiTietDonHang(ChiTietDonHang chiTietDonHang) {
        chiTietDonHang.setThanhTien(chiTietDonHang.getSoLuong() * chiTietDonHang.getDonGia()); // Tính tổng giá trị sản
                                                                                               // phẩm
        return chiTietDonHangRepository.save(chiTietDonHang);
    }

    public List<ChiTietDonHang> saveChiTietDonHangBulk(List<ChiTietDonHang> chiTietDonHangList) {
        return chiTietDonHangRepository.saveAll(chiTietDonHangList); // Sử dụng phương thức saveAll của JpaRepository
    }

    public List<ChiTietDonHang> updateChiTietDonHangBulk(List<ChiTietDonHang> chiTietDonHangList) {
        // Lấy danh sách chi tiết hiện có từ CSDL theo mã đơn hàng
        List<ChiTietDonHang> chiTietDonHangListTheoMa = getChiTietByMaDonHang(chiTietDonHangList.get(0).getMaDonHang());

        // Tạo một Map để dễ dàng tra cứu sản phẩm hiện có theo MaSanPham
        Map<Integer, ChiTietDonHang> existingChiTietMap = chiTietDonHangListTheoMa.stream()
                .collect(Collectors.toMap(ChiTietDonHang::getMaSanPham, chiTiet -> chiTiet));

        // Danh sách kết quả để lưu sau khi xử lý
        List<ChiTietDonHang> resultList = new ArrayList<>();

        // Xử lý từng chi tiết trong danh sách đầu vào
        for (ChiTietDonHang chiTietDonHang : chiTietDonHangList) {
            ChiTietDonHang existingChiTiet = existingChiTietMap.get(chiTietDonHang.getMaSanPham());

            if (existingChiTiet != null) {
                // Cập nhật sản phẩm đã tồn tại
                existingChiTiet.setTrangThai(1); // Sản phẩm vẫn tồn tại
                existingChiTiet.setSoLuong(chiTietDonHang.getSoLuong()); // Cập nhật số lượng
                existingChiTiet.setThanhTien(null); // Để database tự tính toán
                resultList.add(existingChiTiet);
                existingChiTietMap.remove(chiTietDonHang.getMaSanPham()); // Xóa khỏi Map để còn lại sản phẩm cần xóa
            } else {
                // Thêm sản phẩm mới
                chiTietDonHang.setTrangThai(1);
                chiTietDonHang.setThanhTien(null); // Để database tự tính toán
                resultList.add(chiTietDonHang);
            }
        }

        // Xử lý các sản phẩm đã bị xóa (còn lại trong existingChiTietMap)
        for (ChiTietDonHang chiTietDonHang : existingChiTietMap.values()) {
            chiTietDonHang.setTrangThai(0); // Đánh dấu sản phẩm bị xóa
            chiTietDonHang.setThanhTien(null); // Để database tự tính toán
            resultList.add(chiTietDonHang);
        }

        // Lưu toàn bộ danh sách đã xử lý vào repository
        return chiTietDonHangRepository.saveAll(resultList);
    }

    // Xóa mềm chi tiết đơn hàng bằng cách đặt trạng thái là "đã xóa"
    public void deleteChiTietDonHangById(Integer id) {
        ChiTietDonHang chiTietDonHang = chiTietDonHangRepository.findById(id).orElse(null);
        if (chiTietDonHang != null) {
            chiTietDonHang.setTrangThai(0); // Đánh dấu là đã xóa
            chiTietDonHangRepository.save(chiTietDonHang); // Cập nhật trạng thái
        }
    }

    // Lọc chi tiết đơn hàng theo đơn giá
    public List<ChiTietDonHang> filterChiTietByDonGia(Double minDonGia, Double maxDonGia) {
        if (minDonGia == null)
            minDonGia = 0.0;
        if (maxDonGia == null)
            maxDonGia = Double.MAX_VALUE;
        return chiTietDonHangRepository.findByDonGiaBetween(minDonGia, maxDonGia);
    }
}