package com.app.QLCH.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private static final String UPLOAD_DIR = "BE/uploads/";

    @PostMapping
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            System.out.println("Spring Boot đang phục vụ tài nguyên tại: " + uploadPath.toAbsolutePath()); // In ra đường dẫn

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                System.out.println("Đã tạo thư mục: " + uploadPath.toAbsolutePath());
            }

            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File được lưu tại: " + filePath.toString());

            return "http://localhost:8080/api/upload/" + fileName;

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi upload file: " + e.getMessage());
        }
    }


    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> getFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            byte[] fileBytes = Files.readAllBytes(filePath);

            String contentType = Files.probeContentType(filePath);
            return ResponseEntity.ok()
                    .header("Content-Type", contentType)
                    .body(fileBytes);
        } catch (IOException e) {
            throw new RuntimeException("Không thể đọc file: " + e.getMessage());
        }
    }

}
