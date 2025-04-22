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

const KhachHangTable = ({ khachHangList, onEdit, onDelete, quyen }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    khachHangList.sort((a, b) => {
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
            <TableCell align="center" onClick={() => handleSort("maKhachHang")}>
              <strong>
                Mã khách hàng{" "}
                {sortField === "maKhachHang" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("hoTen")}>
              <strong>
                Họ tên{" "}
                {sortField === "hoTen" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("email")}>
              <strong>
                Email{" "}
                {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("gioiTinh")}>
              <strong>
                Giới tính{" "}
                {sortField === "gioiTinh" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("soDienThoai")}>
              <strong>
                Số điện thoại{" "}
                {sortField === "soDienThoai" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("diaChi")}>
              <strong>
                Địa chỉ{" "}
                {sortField === "diaChi" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center">
              <strong>Chức năng</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {khachHangList.length > 0 ? (
            khachHangList.map((khachHang, index) => (
              <TableRow key={index}>
                <TableCell align="center">{khachHang.maKhachHang}</TableCell>
                <TableCell align="center">{khachHang.hoTen}</TableCell>
                <TableCell align="center">{khachHang.email}</TableCell>
                <TableCell align="center">{khachHang.gioiTinh}</TableCell>
                <TableCell align="center">{khachHang.soDienThoai}</TableCell>
                <TableCell align="center">{khachHang.diaChi}</TableCell>
                <TableCell align="center">
                  {quyen?.fix && (
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(khachHang)} // Chỉ hiển thị icon
                    >
                      <CreateIcon />
                    </IconButton>
                  )}
                  {quyen?.delete && (
                    <IconButton
                      color="secondary"
                      onClick={() => onDelete(khachHang.maKhachHang)} // Chỉ hiển thị icon
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
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

export default KhachHangTable;
