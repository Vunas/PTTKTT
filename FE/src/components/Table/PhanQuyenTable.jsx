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

const PhanQuyenTable = ({
  phanQuyenList,
  onEdit,
  onDelete,
  setSelectedQuyen,
  quyen,
}) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    phanQuyenList.sort((a, b) => {
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
          {/* Thanh tiêu đề với màu nền khác biệt */}
          <TableRow>
            <TableCell align="center" onClick={() => handleSort("maPhanQuyen")}>
              <strong>
                Mã quyền{" "}
                {sortField === "maPhanQuyen" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("tenQuyen")}>
              <strong>
                Tên quyền{" "}
                {sortField === "tenQuyen" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center">
              <strong>Chức năng</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {phanQuyenList.length > 0 ? (
            phanQuyenList.map((phanQuyen, index) => (
              <TableRow
                key={index}
                onClick={() => setSelectedQuyen(phanQuyen)} // Cập nhật quyền được chọn
              >
                <TableCell align="center">{phanQuyen.maPhanQuyen}</TableCell>
                <TableCell align="center">{phanQuyen.tenQuyen}</TableCell>
                <TableCell align="center">
                  {quyen?.fix && (
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(phanQuyen)} // Chỉ hiển thị icon
                    >
                      <CreateIcon />
                    </IconButton>
                  )}
                  {quyen?.delete && (
                    <IconButton
                      color="secondary"
                      onClick={() => onDelete(phanQuyen.maPhanQuyen)} // Chỉ hiển thị icon
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
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

export default PhanQuyenTable;
