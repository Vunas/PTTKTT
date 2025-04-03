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
import LockIcon from "@mui/icons-material/Lock"; // Icon Khóa
import LockOpenIcon from "@mui/icons-material/LockOpen"; // Icon Mở Khóa

const TaiKhoanTable = ({ taiKhoanList, onEdit, onDelete, onToggleLock }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    taiKhoanList.sort((a, b) => {
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
            <TableCell align="center" onClick={() => handleSort("maTaiKhoan")}>
              <strong>
                Mã tài khoản{" "}
                {sortField === "maTaiKhoan" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("tenDangNhap")}>
              <strong>
                Tên đăng nhập{" "}
                {sortField === "tenDangNhap" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("email")}>
              <strong>
                Email{" "}
                {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("maPhanQuyen")}>
              <strong>
                Phân quyền{" "}
                {sortField === "maPhanQuyen" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("trangThai")}>
              <strong>
                Trạng thái{" "}
                {sortField === "trangThai" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center">
              <strong>Chức năng</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taiKhoanList.length > 0 ? (
            taiKhoanList.map((taiKhoan) => (
              <TableRow key={taiKhoan.maTaiKhoan}>
                <TableCell align="center">{taiKhoan.maTaiKhoan}</TableCell>
                <TableCell align="center">{taiKhoan.tenDangNhap}</TableCell>
                <TableCell align="center">{taiKhoan.email}</TableCell>
                <TableCell align="center">{taiKhoan.maPhanQuyen}</TableCell>
                <TableCell align="center">
                  {taiKhoan.trangThai === 1 ? "Kích hoạt" : "Khóa"}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(taiKhoan)} // Chỉnh sửa tài khoản
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => onDelete(taiKhoan.maTaiKhoan)} // Xóa tài khoản
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton
                    color={taiKhoan.trangThai === 1 ? "success" : "error"}
                    onClick={() => onToggleLock(taiKhoan.maTaiKhoan)} // Khóa/Mở tài khoản
                  >
                    {taiKhoan.trangThai === 1 ? <LockOpenIcon /> : <LockIcon />}
                  </IconButton>
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

export default TaiKhoanTable;
