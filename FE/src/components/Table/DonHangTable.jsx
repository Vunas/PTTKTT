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
  Collapse,
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IosShareIcon from '@mui/icons-material/IosShare';

const DonHangTable = ({ donHangList, getChiTietDonHang,chiTietDonHang, onEdit, onDelete, setExport }) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedRow, setExpandedRow] = useState(null); // Dòng mở rộng
  // const [chiTietDonHang, setChiTietDonHang] = useState({}); // Lưu chi tiết đơn hàng

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    donHangList.sort((a, b) => {
      const valueA = a[field]?.toString().toLowerCase() || "";
      const valueB = b[field]?.toString().toLowerCase() || "";
      return order === "asc" ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });
  };

  // Hàm xác định style theo trạng thái
  const getTrangThaiStyle = (trangThaiGiaoHang) => {
    switch (trangThaiGiaoHang) {
      case "Đã xóa":
        return { text: "Đã Xóa", icon: <DeleteSweepIcon style={{ color: "#5a5a5a" }} />, backgroundColor: "#f5f5f5", color: "#5a5a5a" };
      case "Đã đặt":
        return { text: "Đã Đặt", icon: <EventAvailableIcon style={{ color: "#1e88e5" }} />, backgroundColor: "#e3f2fd", color: "#1e88e5" };
      case "Đã xác nhận":
        return { text: "Đã Xác Nhận", icon: <CheckCircleIcon style={{ color: "#388e3c" }} />, backgroundColor: "#e8f5e9", color: "#388e3c" };
      case "Đang giao":
        return { text: "Đang Giao", icon: <LocalShippingIcon style={{ color: "#f57c00" }} />, backgroundColor: "#fff8e1", color: "#f57c00" };
      case "Đã giao":
        return { text: "Đã Giao", icon: <DoneOutlineIcon style={{ color: "#689f38" }} />, backgroundColor: "#f1f8e9", color: "#689f38" };
      case "Đã hủy":
        return { text: "Đã Hủy", icon: <CancelPresentationIcon style={{ color: "#d32f2f" }} />, backgroundColor: "#ffebee", color: "#d32f2f" };
      default:
        return { text: "Không xác định", icon: null, backgroundColor: "#f5f5f5", color: "#9e9e9e" };
    }
  };

  // Hàm mở rộng/thu gọn dòng
  const handleExpandClick = async (maDonHang) => {
    console.log(donHangList)
    if (expandedRow === maDonHang) {
      setExpandedRow(null);
    } else {
      if (!chiTietDonHang[maDonHang]) {
        await getChiTietDonHang(maDonHang);
      }
      setExpandedRow(maDonHang);
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
            <TableCell align="center" onClick={() => handleSort("diaChiGiaoHang")}>
              <strong>Địa chỉ giao hàng {sortField === "diaChiGiaoHang" && (sortOrder === "asc" ? "▲" : "▼")}</strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("tongGia")}>
              <strong>Tổng giá {sortField === "tongGia" && (sortOrder === "asc" ? "▲" : "▼")}</strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("trangThaiGiaoHang")}>
              <strong>Trạng thái {sortField === "trangThaiGiaoHang" && (sortOrder === "asc" ? "▲" : "▼")}</strong>
            </TableCell>
            <TableCell align="center"><strong>Chức năng</strong></TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {donHangList.map((donHang) => {
            const { text, icon, backgroundColor, color } = getTrangThaiStyle(donHang.trangThaiGiaoHang);
            return (
              <React.Fragment key={donHang.maDonHang}>
                <TableRow>
                  <TableCell align="center">{donHang.maDonHang}</TableCell>
                  <TableCell align="center">{donHang.maKhachHang}</TableCell>
                  <TableCell align="center">{dayjs(donHang.ngayDat).format("DD/MM/YYYY HH:mm")}</TableCell>
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
                      marginTop: "16px"
                    }}
                  >
                    <span>{text}</span>
                    {icon}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => {
                      setExport(false);
                      onEdit(donHang)}
                      }>
                      <CreateIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => onDelete(donHang.maDonHang)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton style={{color: "#1e88e5" }}  onClick={() => {
                      setExport(true);
                      onEdit(donHang)}
                      }>
                      <IosShareIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpandClick(donHang.maDonHang)} size="small">
                      {expandedRow === donHang.maDonHang ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={expandedRow === donHang.maDonHang} timeout="auto" unmountOnExit>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center"><strong>Mã sản phẩm</strong></TableCell>
                            <TableCell align="center"><strong>Tên sản phẩm</strong></TableCell>
                            <TableCell align="center"><strong>Số lượng</strong></TableCell>
                            <TableCell align="center"><strong>Đơn giá</strong></TableCell>
                            <TableCell align="center"><strong>Thành tiền</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {chiTietDonHang[donHang.maDonHang]?.map((chiTiet) => (
                            <TableRow key={chiTiet.maChiTiet}>
                              <TableCell align="center">{chiTiet.maSanPham}</TableCell>
                              <TableCell align="center">{chiTiet.sanPham.tenSanPham}</TableCell>
                              <TableCell align="center">{chiTiet.soLuong}</TableCell>
                              <TableCell align="center">{chiTiet.donGia}</TableCell>
                              <TableCell align="center">{chiTiet.thanhTien}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DonHangTable;
