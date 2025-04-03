package com.app.QLCH.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.QLCH.model.TaiKhoan;
import com.app.QLCH.repository.TaiKhoanRepository;

import java.util.List;

@Service
public class TaiKhoanService {
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    // Lấy danh sách tất cả tài khoản còn hoạt động
    public List<TaiKhoan> getAllTaiKhoan() {
        return taiKhoanRepository.findByTrangThaiNot(0); // Chỉ lấy tài khoản kích hoạt
    }

    // Lấy một tài khoản theo ID (chỉ tài khoản không bị xóa)
    public TaiKhoan getTaiKhoanById(Integer id) {
        TaiKhoan taiKhoan = taiKhoanRepository.findById(id).orElse(null);
        if (taiKhoan != null && taiKhoan.getTrangThai() != 0) {
            return taiKhoan; // Trả về tài khoản nếu chưa bị xóa
        }
        return null; // Trả về null nếu tài khoản đã bị xóa
    }

    // Lấy tài khoản theo tên đăng nhập (chỉ tài khoản kích hoạt)
    public TaiKhoan getTaiKhoanByTenDangNhap(String tenDangNhap) {
        return taiKhoanRepository.findByTenDangNhapAndTrangThai(tenDangNhap, 1); // Chỉ tài khoản kích hoạt
    }

    public TaiKhoan getTaiKhoanByemail(String email) {
        return taiKhoanRepository.findByEmailAndTrangThai(email, 1);
    }

    public boolean existsByTenDangNhap(String tenDangNhap){
        return taiKhoanRepository.existsByTenDangNhap(tenDangNhap);
    }

    public boolean existsByEmail(String tenDangNhap){
        return taiKhoanRepository.existsByEmail(tenDangNhap);
    }

    // Thêm hoặc cập nhật tài khoản
    public TaiKhoan saveTaiKhoan(TaiKhoan taiKhoan) {
        return taiKhoanRepository.save(taiKhoan);
    }

    // Xóa mềm tài khoản (đánh dấu trạng thái là đã xóa)
    public void deleteTaiKhoanById(Integer id) {
        TaiKhoan taiKhoan = taiKhoanRepository.findById(id).orElse(null);
        if (taiKhoan != null) {
            taiKhoan.setTrangThai(0); // Đánh dấu là đã xóa
            taiKhoanRepository.save(taiKhoan); // Lưu thay đổi
        }
    }

    // Khóa tài khoản (trạng thái = 2)
    public void lockTaiKhoanById(Integer id) {
        TaiKhoan taiKhoan = taiKhoanRepository.findById(id).orElse(null);
        if (taiKhoan != null) {
            taiKhoan.setTrangThai(2); // Đánh dấu là bị khóa
            taiKhoanRepository.save(taiKhoan); // Lưu thay đổi
        }
    }

    // Kích hoạt tài khoản (trạng thái = 1)
    public void activateTaiKhoanById(Integer id) {
        TaiKhoan taiKhoan = taiKhoanRepository.findById(id).orElse(null);
        if (taiKhoan != null) {
            taiKhoan.setTrangThai(1); // Đánh dấu là kích hoạt
            taiKhoanRepository.save(taiKhoan); // Lưu thay đổi
        }
    }

    public List<TaiKhoan> filterTaiKhoan(String tenDangNhap, String email, Integer maPhanQuyen, Integer trangThai) {
        if (maPhanQuyen == null && trangThai == null) {
            return taiKhoanRepository.findByTenDangNhapContainingIgnoreCaseAndEmailContainingIgnoreCase(tenDangNhap,
                    email);
        } else if (maPhanQuyen == null) {
            return taiKhoanRepository.findByTenDangNhapContainingIgnoreCaseAndEmailContainingIgnoreCaseAndTrangThai(
                    tenDangNhap, email, trangThai);
        } else if (trangThai == null) {
            return taiKhoanRepository.findByTenDangNhapContainingIgnoreCaseAndEmailContainingIgnoreCaseAndMaPhanQuyen(
                    tenDangNhap, email, maPhanQuyen);
        } else
            return taiKhoanRepository
                    .findByTenDangNhapContainingIgnoreCaseAndEmailContainingIgnoreCaseAndMaPhanQuyenAndTrangThai(
                            tenDangNhap != null ? tenDangNhap : "",
                            email != null ? email : "",
                            maPhanQuyen != null ? maPhanQuyen : null,
                            trangThai != null ? trangThai : null);
    }
}