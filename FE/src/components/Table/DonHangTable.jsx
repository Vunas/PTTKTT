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
import dayjs from "dayjs"; // Import thư viện dayjs
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const DonHangTable = ({ donHangList, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    donHangList.sort((a, b) => {
      const valueA = a[field]?.toString().toLowerCase() || ""; // Convert to string and lowercase for sorting
      const valueB = b[field]?.toString().toLowerCase() || "";
      if (order === "asc") {
        return valueA > valueB ? 1 : -1;
      }
      return valueA < valueB ? 1 : -1;
    });
  };

  // Hàm xác định style theo trạng thái
  const getTrangThaiStyle = (trangThai) => {
    switch (trangThai) {
      case "Đã xóa":
        return {
          text: "Đã Xóa",
          icon: <DeleteSweepIcon style={{ color: "#5a5a5a" }} />,
          backgroundColor: "#f5f5f5",
          color: "#5a5a5a",
        };
      case "Đã đặt":
        return {
          text: "Đã Đặt",
          icon: <EventAvailableIcon style={{ color: "#1e88e5" }} />,
          backgroundColor: "#e3f2fd",
          color: "#1e88e5",
        };
      case "Đã xác nhận":
        return {
          text: "Đã Xác Nhận",
          icon: <CheckCircleIcon style={{ color: "#388e3c" }} />,
          backgroundColor: "#e8f5e9",
          color: "#388e3c",
        };
      case "Đang giao":
        return {
          text: "Đang Giao Hàng",
          icon: <LocalShippingIcon style={{ color: "#f57c00" }} />,
          backgroundColor: "#fff8e1",
          color: "#f57c00",
        };
      case "Đã giao":
        return {
          text: "Đã Giao",
          icon: <DoneOutlineIcon style={{ color: "#689f38" }} />,
          backgroundColor: "#f1f8e9",
          color: "#689f38",
        };
      case "Đã hủy":
        return {
          text: "Đã Hủy",
          icon: <CancelPresentationIcon style={{ color: "#d32f2f" }} />,
          backgroundColor: "#ffebee",
          color: "#d32f2f",
        };
      default:
        return {
          text: "Không xác định",
          icon: null,
          backgroundColor: "#f5f5f5",
          color: "#9e9e9e",
        };
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }} sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center" onClick={() => handleSort("maDonHang")}>
              <strong>Mã đơn hàng {sortField === "maDonHang" && (sortOrder === "asc" ? "▲" : "▼")}</strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("maKhachHang")}>
              <strong>Mã khách hàng {sortField === "maKhachHang" && (sortOrder === "asc" ? "▲" : "▼")}</strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("ngayDat")}>
              <strong>Ngày đặt {sortField === "ngayDat" && (sortOrder === "asc" ? "▲" : "▼")}</strong>
            </TableCell>
            <TableCell align="center">Địa chỉ giao hàng</TableCell>
            <TableCell align="center" onClick={() => handleSort("tongGia")}>
              <strong>Tổng giá {sortField === "tongGia" && (sortOrder === "asc" ? "▲" : "▼")}</strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("trangThai")}>
              <strong>Trạng thái {sortField === "trangThai" && (sortOrder === "asc" ? "▲" : "▼")}</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Chức năng</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donHangList.length > 0 ? (
            donHangList.map((donHang) => {
              const { text, icon, backgroundColor, color } = getTrangThaiStyle(donHang.trangThai);
              return (
                <TableRow key={donHang.maDonHang}>
                  <TableCell align="center">{donHang.maDonHang}</TableCell>
                  <TableCell align="center">{donHang.maKhachHang}</TableCell>
                  <TableCell align="center">
                    {dayjs(donHang.ngayDat).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell align="center">{donHang.diaChiGiaoHang}</TableCell>
                  <TableCell align="center">{donHang.tongGia}</TableCell>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: backgroundColor,
                      color: color,
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px",
                    }}
                  >
                    <span>{text}</span>
                    {icon}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => onEdit(donHang)}>
                      <CreateIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => onDelete(donHang.maDonHang)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
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

export default DonHangTable;