package com.app.QLCH.utils;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.app.QLCH.repository.NguyenLieuRepository;

import jakarta.annotation.PostConstruct;

@Component
public class FileCleanupJob {

    @Autowired
    private NguyenLieuRepository nguyenLieuRepository;

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
            List<String> usedFiles = nguyenLieuRepository.findAllImagePaths();
            for (String string : usedFiles) {
                System.out.println(string);
            }

            for (File file : files) {
                if (!usedFiles.stream().anyMatch(item -> item.contains(file.getName().trim()))) {
                    file.delete();
                    System.out.println("Xóa file không sử dụng: " + file.getName());
                }
            }
        }
    }
}

