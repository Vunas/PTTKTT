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

const KhuyenMaiTable = ({
  khuyenMaiList,
  onEdit,
  onDelete,
  onToggleLock,
  quyen,
}) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    khuyenMaiList.sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
  };

  return (
    <>
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
                onClick={() => handleSort("maKhuyenMai")}
              >
                <strong>
                  Mã Khuyến Mãi{" "}
                  {sortField === "maKhuyenMai" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </strong>
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("tenKhuyenMai")}
              >
                <strong>
                  Tên Khuyến Mãi{" "}
                  {sortField === "tenKhuyenMai" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </strong>
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("loaiKhuyenMai")}
              >
                <strong>
                  Loại Khuyến Mãi{" "}
                  {sortField === "loaiKhuyenMai" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </strong>
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("giaTriKhuyenMai")}
              >
                <strong>
                  Giá Trị Khuyến Mãi{" "}
                  {sortField === "giaTriKhuyenMai" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </strong>
              </TableCell>
              <TableCell align="center" onClick={() => handleSort("trangThai")}>
                <strong>
                  Trạng Thái{" "}
                  {sortField === "trangThai" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </strong>
              </TableCell>
              <TableCell align="center">
                <strong>Chức Năng</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {khuyenMaiList.length > 0 ? (
              khuyenMaiList.map((khuyenMai) => (
                <TableRow key={khuyenMai.maKhuyenMai}>
                  <TableCell align="center">{khuyenMai.maKhuyenMai}</TableCell>
                  <TableCell align="center">{khuyenMai.tenKhuyenMai}</TableCell>
                  <TableCell align="center">
                    {khuyenMai.loaiKhuyenMai === 1
                      ? "Phần Trăm Giảm"
                      : khuyenMai.loaiKhuyenMai === 2
                        ? "Giá Cố Định Giảm"
                        : "Quà Tặng"}
                  </TableCell>
                  <TableCell align="center">
                    {khuyenMai.giaTriKhuyenMai}
                  </TableCell>
                  <TableCell className="text-center">
                    {khuyenMai.trangThai === 1 ? (
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md flex items-center justify-center w-28 mx-auto">
                        <span className="mr-2">Kích Hoạt</span>
                        <span>✔️</span>
                      </div>
                    ) : (
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded-md flex items-center justify-center w-24 mx-auto">
                        <span className="mr-2">Khóa</span>
                        <span>❌</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {quyen?.fix && (
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(khuyenMai)} // Chỉnh sửa khuyến mãi
                      >
                        <CreateIcon />
                      </IconButton>
                    )}
                    {quyen?.delete && (
                      <IconButton
                        color="secondary"
                        onClick={() => onDelete(khuyenMai.maKhuyenMai)} // Xóa khuyến mãi
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    )}
                    {quyen?.fix && (
                      <IconButton
                        color={khuyenMai.trangThai === 1 ? "success" : "error"}
                        onClick={() => onToggleLock(khuyenMai.maKhuyenMai)} // Khóa/Mở khuyến mãi
                      >
                        {khuyenMai.trangThai === 1 ? (
                          <LockOpenIcon />
                        ) : (
                          <LockIcon />
                        )}
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
    </>
  );
};

export default KhuyenMaiTable;
