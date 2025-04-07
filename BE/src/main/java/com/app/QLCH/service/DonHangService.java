package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.DonHang;
import com.app.QLCH.repository.DonHangRepository;

import java.util.List;
import java.sql.Date;
@Service
public class DonHangService {
    @Autowired
    private DonHangRepository donHangRepository;

    // Lấy danh sách tất cả đơn hàng đang hoạt động (không bị xóa mềm)
    public List<DonHang> getAllDonHang() {
        return donHangRepository.findByTrangThaiNot(0); // Lấy tất cả trừ trạng thái xóa (0)
    }

    // Lấy đơn hàng theo ID, nhưng không bao gồm đơn hàng bị xóa mềm
    public DonHang getDonHangById(Integer id) {
        DonHang donHang = donHangRepository.findById(id).orElse(null);
        return (donHang != null && donHang.getTrangThai() != 0) ? donHang : null;
    }

    // Thêm hoặc cập nhật đơn hàng
    public DonHang saveDonHang(DonHang donHang) {
        return donHangRepository.save(donHang);
    }

    // Xóa mềm đơn hàng bằng cách đặt trạng thái là 0
    public void deleteDonHangById(Integer id) {
        DonHang donHang = donHangRepository.findById(id).orElse(null);
        if (donHang != null) {
            donHang.setTrangThai(0); // Đánh dấu là đã xóa
            donHangRepository.save(donHang); // Cập nhật trạng thái
        }
    }

    // Lấy danh sách đơn hàng theo trạng thái (không bao gồm đơn hàng bị xóa mềm)
    public List<DonHang> getDonHangByTrangThai(Integer trangThai) {
        return donHangRepository.findByTrangThaiAndTrangThaiNot(trangThai, 0);
    }

    // // Lấy danh sách đơn hàng của một khách hàng cụ thể (không bao gồm đơn hàng bị xóa mềm)
    // public List<DonHang> getDonHangByKhachHangId(Integer maKhachHang) {
    //     return donHangRepository.findByKhachHang_MaKhachHangAndTrangThaiNot(maKhachHang, 0);
    // }

    // Lấy danh sách đơn hàng theo ngày đặt (không bao gồm đơn hàng bị xóa mềm)
    public List<DonHang> getDonHangByNgayDat(Date ngayDat) {
        return donHangRepository.findByNgayDatAndTrangThaiNot(ngayDat, 0);
    }

    public List<DonHang> filterDonHang(Integer maKhachHang, Date startDate, Date endDate, Double minGia, Double maxGia, Integer trangThai) {
        if(minGia == null) minGia = 0.0;
        if (maxGia == null) maxGia = Double.MAX_VALUE;
        // Cả startDate và endDate đều null
        if (startDate == null && endDate == null) {
            if (maKhachHang == null && trangThai == null) {
                return donHangRepository.findByTongGiaBetweenAndTrangThaiNot(minGia, maxGia, 0);
            } else if (maKhachHang == null) {
                return donHangRepository.findByTongGiaBetweenAndTrangThai(minGia, maxGia, trangThai);
            } else if (trangThai == null) {
                return donHangRepository.findByMaKhachHangAndTongGiaBetweenAndTrangThaiNot(maKhachHang, minGia, maxGia, 0);
            } else {
                return donHangRepository.findByMaKhachHangAndTongGiaBetweenAndTrangThai(maKhachHang, minGia, maxGia, trangThai);
            }
        }
    
        // Chỉ startDate null
        if (startDate == null) {
            if (maKhachHang == null && trangThai == null) {
                return donHangRepository.findByNgayDatBeforeAndTongGiaBetweenAndTrangThaiNot(endDate, minGia, maxGia, 0);
            } else if (maKhachHang == null) {
                return donHangRepository.findByNgayDatBeforeAndTongGiaBetweenAndTrangThai(endDate, minGia, maxGia, trangThai);
            } else if (trangThai == null) {
                return donHangRepository.findByMaKhachHangAndNgayDatBeforeAndTongGiaBetweenAndTrangThaiNot(maKhachHang, endDate, minGia, maxGia, 0);
            } else {
                return donHangRepository.findByMaKhachHangAndNgayDatBeforeAndTongGiaBetweenAndTrangThai(maKhachHang, endDate, minGia, maxGia, trangThai);
            }
        }
    
        // Chỉ endDate null
        if (endDate == null) {
            if (maKhachHang == null && trangThai == null) {
                return donHangRepository.findByNgayDatAfterAndTongGiaBetweenAndTrangThaiNot(startDate, minGia, maxGia, 0);
            } else if (maKhachHang == null) {
                return donHangRepository.findByNgayDatAfterAndTongGiaBetweenAndTrangThai(startDate, minGia, maxGia, trangThai);
            } else if (trangThai == null) {
                return donHangRepository.findByMaKhachHangAndNgayDatAfterAndTongGiaBetweenAndTrangThaiNot(maKhachHang, startDate, minGia, maxGia, 0);
            } else {
                return donHangRepository.findByMaKhachHangAndNgayDatAfterAndTongGiaBetweenAndTrangThai(maKhachHang, startDate, minGia, maxGia, trangThai);
            }
        }
    
        // Cả startDate và endDate đều không null
        if (maKhachHang == null && trangThai == null) {
            return donHangRepository.findByNgayDatBetweenAndTongGiaBetweenAndTrangThaiNot(startDate, endDate, minGia, maxGia, 0);
        } else if (maKhachHang == null) {
            return donHangRepository.findByNgayDatBetweenAndTongGiaBetweenAndTrangThai(startDate, endDate, minGia, maxGia, trangThai);
        } else if (trangThai == null) {
            return donHangRepository.findByMaKhachHangAndNgayDatBetweenAndTongGiaBetweenAndTrangThaiNot(maKhachHang, startDate, endDate, minGia, maxGia, 0);
        } else {
            return donHangRepository.findByMaKhachHangAndNgayDatBetweenAndTongGiaBetweenAndTrangThai(maKhachHang, startDate, endDate, minGia, maxGia, trangThai);
        }
    }
}
