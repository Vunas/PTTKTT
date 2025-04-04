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

const KhoHangTable = ({ khoHangList, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    khoHangList.sort((a, b) => {
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
            <TableCell align="center" onClick={() => handleSort("maKhoHang")}>
              <strong>
                Mã kho hàng{" "}
                {sortField === "maKhoHang" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("tenKhoHang")}>
              <strong>
                Tên kho hàng{" "}
                {sortField === "tenKhoHang" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("diaDiem")}>
              <strong>
                Địa điểm{" "}
                {sortField === "diaDiem" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center">
              <strong>Chức năng</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {khoHangList.length > 0 ? (
            khoHangList.map((khoHang, index) => (
              <TableRow key={index}>
                <TableCell align="center">{khoHang.maKhoHang}</TableCell>
                <TableCell align="center">{khoHang.tenKhoHang}</TableCell>
                <TableCell align="center">{khoHang.diaDiem}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(khoHang)} // Chỉ hiển thị icon
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => onDelete(khoHang.maKhoHang)} // Chỉ hiển thị icon
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Không có dữ liệu để hiển thị
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KhoHangTable;
