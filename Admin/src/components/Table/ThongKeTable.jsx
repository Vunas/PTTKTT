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
import fetchDataById from "../../utils/FetchDataByID";

const ThongKeThongKeTable = ({
  hoaDonList,
}) => {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [donHang, setDonHang] = useState([]);
  const [errors, setErrors] = useState({});
  const [chiTietDonHang, setChiTietDonHang] = useState([]);

  // Hàm sắp xếp danh sách
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    hoaDonList.sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
  };

  const getData = async (hoaDon) => {
    console.log(errors);
    setDonHang(
      await fetchDataById(
        "http://localhost:8080/api/donhang",
        hoaDon.maDonHang,
        setErrors
      )
    );
    setChiTietDonHang(
      await fetchDataById(
        "http://localhost:8080/api/chitietdonhang/donhang",
        hoaDon.maDonHang,
        setErrors
      )
    );
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
            <TableCell align="center" onClick={() => handleSort("maHoaDon")}>
              <strong>
                Mã Hóa Đơn{" "}
                {sortField === "maHoaDon" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("maDonHang")}>
              <strong>
                Mã Đơn Hàng{" "}
                {sortField === "maDonHang" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("tongTien")}>
              <strong>
                Tổng Tiền{" "}
                {sortField === "tongTien" && (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
            <TableCell
              align="center"
              onClick={() => handleSort("ngayXuatHoaDon")}
            >
              <strong>
                Ngày Xuất Hóa Đơn{" "}
                {sortField === "ngayXuatHoaDon" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hoaDonList.length > 0 ? (
            hoaDonList.map((hoaDon) => (
              <TableRow key={hoaDon.maHoaDon}>
                <TableCell align="center">{hoaDon.maHoaDon}</TableCell>
                <TableCell align="center">{hoaDon.maDonHang}</TableCell>
                <TableCell align="center">{hoaDon.tongTien}</TableCell>
                <TableCell align="center">{hoaDon.ngayXuatHoaDon}</TableCell>
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

export default ThongKeThongKeTable;
