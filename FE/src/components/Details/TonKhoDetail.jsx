import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const TonKhoDetail = ({ khoHang }) => {
  const [danhSachTonKho, setDanhSachTonKho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTonKho = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/tonkho/khohang/${khoHang.maKhoHang}`
        );
        setDanhSachTonKho(response.data);
      } catch (error) {
        setError(error.message || "Có lỗi xảy ra khi tải dữ liệu tồn kho.");
      } finally {
        setLoading(false);
      }
    };

    if (khoHang && khoHang.maKhoHang) {
      fetchTonKho();
    } else {
      setDanhSachTonKho([]); // Reset danh sách nếu không có kho hàng được chọn
      setLoading(false);
    }
  }, [khoHang]); // Effect sẽ chạy lại mỗi khi khoHang thay đổi

  if (loading) {
    return (
      <Box textAlign="center">
        <Typography>Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="p-4">
      {danhSachTonKho && danhSachTonKho.length > 0 ? (
        <Box>
          <Typography variant="h6" component="h2" className="font-bold mb-4">
            Danh sách nguyên liệu trong kho:{" "}
            {khoHang.tenKhoHang || "Không xác định"}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell className="p-2 font-bold">
                    Mã nguyên liệu
                  </TableCell>
                  <TableCell className="p-2 font-bold">
                    Tên nguyên liệu
                  </TableCell>
                  <TableCell className="p-2 font-bold text-center">
                    Đơn vị
                  </TableCell>
                  <TableCell className="p-2 font-bold text-center">
                    Số lượng tồn kho
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {danhSachTonKho.map((tonKho) => (
                  <TableRow key={tonKho.maTonKho}>
                    <TableCell className="p-2">
                      {tonKho.nguyenLieu.maNguyenLieu}
                    </TableCell>
                    <TableCell className="p-2">
                      {tonKho.nguyenLieu.ten}
                    </TableCell>
                    <TableCell className="p-2 text-center">
                      {tonKho.nguyenLieu.donVi}
                    </TableCell>
                    <TableCell className="p-2 text-center">
                      {tonKho.soLuong}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box textAlign="center" className="text-center">
          <Typography variant="body1">
            {khoHang
              ? "Kho hàng này hiện chưa có nguyên liệu nào."
              : "Vui lòng chọn kho hàng để xem chi tiết."}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default TonKhoDetail;
