package com.app.QLCH.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.app.QLCH.repository.NguyenLieuRepository;
import com.app.QLCH.repository.SanPhamRepository;

import jakarta.annotation.PostConstruct;

@Component
public class FileCleanupJob {

    @Autowired
    private NguyenLieuRepository nguyenLieuRepository;
    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Scheduled(cron = "0 0 0 * * ?") // Chạy hàng ngày lúc 00:00
    public void cleanUnusedFiles() {
        executeCleanup(); // Gọi hàm dọn dẹp
    }

    @PostConstruct // Chạy một lần ngay sau khi ứng dụng khởi động
    public void onStartupCleanup() {
        executeCleanup();
    }

    private void executeCleanup() {
        File uploadDir = new File("BE/uploads");
        File[] files = uploadDir.listFiles();

        if (files != null) {
            List<String> usedFiles = new ArrayList<>();
            usedFiles.addAll(nguyenLieuRepository.findAllImagePaths());
            usedFiles.addAll(sanPhamRepository.findAllImagePaths());

            for (File file : files) {
                if (!usedFiles.stream().anyMatch(item -> item.contains(file.getName().trim()))) {
                    file.delete();
                    System.out.println("Xóa file không sử dụng: " + file.getName());
                }
            }
        }
    }
}
