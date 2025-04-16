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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import fetchDataById from "../../utils/FetchDataByID";
import exportHoaDonPDF from "../../Hook/ExportHoaDonPDF";

const HoaDonTable = ({ hoaDonList, khuyenMaiList, onEdit, onDelete }) => {
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
    console.log(hoaDon);
console.log(donHang);
console.log(chiTietDonHang) 
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
            <TableCell align="center">
              <strong>Chức Năng</strong>
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
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(hoaDon)} // Chỉnh sửa hóa đơn
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => onDelete(hoaDon.maHoaDon)} // Xóa hóa đơn
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      getData(hoaDon);
                      exportHoaDonPDF(
                        donHang,
                        hoaDon,
                        chiTietDonHang,
                        khuyenMaiList,
                        () => {
                          console.log(
                            "Đóng dialog hoặc thực hiện hành động khác."
                          );
                        }
                      );
                    }} // Xóa hóa đơn
                  >
                    <PictureAsPdfIcon />
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

export default HoaDonTable;
