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

const NhaCungCapTable = ({ nhaCungCapList, onEdit, onDelete, quyen }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    nhaCungCapList.sort((a, b) => {
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
            <TableCell
              align="center"
              onClick={() => handleSort("maNhaCungCap")}
            >
              <strong>
                Mã nhà cung cấp{" "}
                {sortField === "maNhaCungCap" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell
              align="center"
              onClick={() => handleSort("tenNhaCungCap")}
            >
              <strong>
                Tên nhà cung cấp{" "}
                {sortField === "tenNhaCungCap" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("email")}>
              <strong>
                Email{" "}
                {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
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
          {nhaCungCapList.length > 0 ? (
            nhaCungCapList.map((nhaCungCap, index) => (
              <TableRow key={index}>
                <TableCell align="center">{nhaCungCap.maNhaCungCap}</TableCell>
                <TableCell align="center">{nhaCungCap.tenNhaCungCap}</TableCell>
                <TableCell align="center">{nhaCungCap.email}</TableCell>
                <TableCell align="center">{nhaCungCap.soDienThoai}</TableCell>
                <TableCell align="center">{nhaCungCap.diaChi}</TableCell>
                <TableCell align="center">
                  {quyen?.fix && (
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(nhaCungCap)} // Chỉ hiển thị icon
                    >
                      <CreateIcon />
                    </IconButton>
                  )}
                  {quyen?.delete && (
                    <IconButton
                      color="secondary"
                      onClick={() => onDelete(nhaCungCap.maNhaCungCap)} // Chỉ hiển thị icon
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

export default NhaCungCapTable;
