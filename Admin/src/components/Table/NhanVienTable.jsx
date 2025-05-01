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

const NhanVienTable = ({ nhanVienList, onEdit, onDelete, quyen }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    nhanVienList.sort((a, b) => {
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
            <TableCell align="center" onClick={() => handleSort("maNhanVien")}>
              <strong>
                Mã nhân viên{" "}
                {sortField === "maNhanVien" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("hoTen")}>
              <strong>
                Họ Tên{" "}
                {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
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
            <TableCell align="center" onClick={() => handleSort("chucVu")}>
              <strong>
                Chức vụ{" "}
                {sortField === "chucVu" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center">
              <strong>Chức năng</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nhanVienList.length > 0 ? (
            nhanVienList.map((nhanVien) => (
              <TableRow key={nhanVien.maNhanVien}>
                <TableCell align="center">{nhanVien.maNhanVien}</TableCell>
                <TableCell align="center">{nhanVien.hoTen}</TableCell>
                <TableCell align="center">{nhanVien.email}</TableCell>
                <TableCell align="center">{nhanVien.gioiTinh}</TableCell>
                <TableCell align="center">{nhanVien.soDienThoai}</TableCell>
                <TableCell align="center">{nhanVien.chucVu}</TableCell>
                <TableCell align="center">
                  {quyen?.fix && (
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(nhanVien)} // Chỉ hiển thị icon
                    >
                      <CreateIcon />
                    </IconButton>
                  )}
                  {quyen?.delete && (
                    <IconButton
                      color="secondary"
                      onClick={() => onDelete(nhanVien.maNhanVien)} // Chỉ hiển thị icon
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Không có dữ liệu để hiển thị
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NhanVienTable;
