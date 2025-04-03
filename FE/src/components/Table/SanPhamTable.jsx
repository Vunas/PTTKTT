import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";

const SanPhamTable = ({ sanPhamList, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    sanPhamList.sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
  };

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: "20px" }}
      sx={{ maxHeight: 600 }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center" onClick={() => handleSort("maSanPham")}>
              <strong>
                Mã SP{" "}
                {sortField === "maSanPham" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("hinhAnh")}>
              <strong>
                Hình ảnh{" "}
                {sortField === "hinhAnh" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("tenSanPham")}>
              <strong>
                Tên sản phẩm{" "}
                {sortField === "tenSanPham" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("giaSanXuat")}>
              <strong>
                Giá sản xuất{" "}
                {sortField === "giaSanXuat" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("giaBan")}>
              <strong>
                Giá bán{" "}
                {sortField === "giaBan" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("soLuong")}>
              <strong>
                Số lượng{" "}
                {sortField === "soLuong" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center">
              <strong>Chức năng</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sanPhamList.length > 0 ? (
            sanPhamList.map((sanPham) => (
              <TableRow key={sanPham.maSanPham}>
                <TableCell align="center">{sanPham.maSanPham}</TableCell>
                <TableCell align="center">
                  {sanPham.hinhAnh ? (
                    <img
                      src={sanPham.hinhAnh}
                      alt={sanPham.tenSanPham}
                      style={{ width: 80, height: 88 }}
                    />
                  ) : (
                    "Không có ảnh"
                  )}
                </TableCell>
                <TableCell align="center">{sanPham.tenSanPham}</TableCell>
                <TableCell align="center">{sanPham.giaSanXuat}</TableCell>
                <TableCell align="center">{sanPham.giaBan}</TableCell>
                <TableCell align="center">{sanPham.soLuong}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(sanPham)} // Chỉ hiển thị icon
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => onDelete(sanPham.maSanPham)} // Chỉ hiển thị icon
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Không có dữ liệu để hiển thị
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SanPhamTable;
