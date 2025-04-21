package com.app.QLCH.DTO;

import com.app.QLCH.model.CheBien;
import com.app.QLCH.model.ChiTietCheBien;
import lombok.Data;

import java.util.List;

@Data
public class CheBienDTO {
    private CheBien cheBien;
    private List<ChiTietCheBien> chiTietCheBienList;
    
    public CheBienDTO(CheBien cheBien, List<ChiTietCheBien> chiTietCheBienList) {
        this.cheBien = cheBien;
        this.chiTietCheBienList = chiTietCheBienList;
    }

    
}