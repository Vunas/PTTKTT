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

const NguyenLieuTable = ({ nguyenLieuList, onEdit, onDelete, quyen }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    nguyenLieuList.sort((a, b) => {
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
              onClick={() => handleSort("maNguyenLieu")}
            >
              <strong>
                Mã NL{" "}
                {sortField === "maNguyenLieu" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("hinhAnh")}>
              <strong>
                Hình ảnh{" "}
                {sortField === "hinhAnh" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("ten")}>
              <strong>
                Tên nguyên liệu{" "}
                {sortField === "ten" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("donVi")}>
              <strong>
                Đơn vị{" "}
                {sortField === "donVi" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("giaNhap")}>
              <strong>
                Giá nhập{" "}
                {sortField === "giaNhap" && (sortOrder === "asc" ? "▲" : "▼")}
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
          {nguyenLieuList.length > 0 ? (
            nguyenLieuList.map((nguyenLieu) => (
              <TableRow key={nguyenLieu.maNguyenLieu}>
                <TableCell align="center">{nguyenLieu.maNguyenLieu}</TableCell>
                <TableCell align="center">
                  {nguyenLieu.hinhAnh ? (
                    <img
                      src={nguyenLieu.hinhAnh}
                      alt={nguyenLieu.ten}
                      style={{ width: 80, height: 88 }}
                    />
                  ) : (
                    "Không có ảnh"
                  )}
                </TableCell>
                <TableCell align="center">{nguyenLieu.ten}</TableCell>
                <TableCell align="center">{nguyenLieu.donVi}</TableCell>
                <TableCell align="center">{nguyenLieu.giaNhap}</TableCell>
                <TableCell align="center">{nguyenLieu.soLuong}</TableCell>
                <TableCell align="center">
                  {quyen?.fix && (
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(nguyenLieu)} // Chỉ hiển thị icon
                    >
                      <CreateIcon />
                    </IconButton>
                  )}
                  {quyen?.delete && (
                    <IconButton
                      color="secondary"
                      onClick={() => onDelete(nguyenLieu.maNguyenLieu)} // Chỉ hiển thị icon
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

export default NguyenLieuTable;
