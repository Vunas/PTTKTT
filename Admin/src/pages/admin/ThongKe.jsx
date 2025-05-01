import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CircularProgress,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ThongKeItem from "../../components/ThongKeItem";
import { Bar, Pie, Line } from "react-chartjs-2"; // Corrected import to include Line
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement, // Added PointElement for Line chart
  LineElement, // Added LineElement for Line chart
} from "chart.js";
import ThongKeThongKeTable from "../../components/Table/ThongKeTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement, // Register PointElement
  LineElement // Register LineElement
);

const StyledCard = styled(Card)(({ theme }) => ({
  // padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[3],
}));

function ThongKe() {
  const [hoaDons, setHoaDons] = useState([]);
  const [donHangs, setDonHangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [hoaDonResponse, donHangResponse] = await Promise.all([
        fetch("http://localhost:8080/api/hoadon"),
        fetch("http://localhost:8080/api/donhang"),
      ]);

      if (!hoaDonResponse.ok || !donHangResponse.ok) {
        throw new Error(
          `Lỗi HTTP: ${hoaDonResponse.status} hoặc ${donHangResponse.status}`
        );
      }

      const hoaDonData = await hoaDonResponse.json();
      const donHangData = await donHangResponse.json();

      setHoaDons(hoaDonData);
      setDonHangs(donHangData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredHoaDons = useMemo(() => {
    if (!startDate && !endDate) return hoaDons;
    return hoaDons.filter((hd) => {
      const date = new Date(hd.ngayXuatHoaDon);
      const end = endDate ? new Date(endDate) : null;
      return (
        (!startDate || date >= new Date(startDate)) && (!end || date <= end)
      );
    });
  }, [hoaDons, startDate, endDate]);

  const filteredDonHangs = useMemo(() => {
    if (!startDate && !endDate) return donHangs;
    return donHangs.filter((dh) => {
      const date = new Date(dh.ngayDat);
      const end = endDate ? new Date(endDate) : null;
      return (
        (!startDate || date >= new Date(startDate)) && (!end || date <= end)
      );
    });
  }, [donHangs, startDate, endDate]);

  const tongDoanhThu = useMemo(() => {
    return filteredHoaDons.reduce(
      (sum, hoaDon) => sum + (hoaDon.tongTien || 0),
      0
    );
  }, [filteredHoaDons]);

  const tongSoHoaDon = useMemo(() => filteredHoaDons.length, [filteredHoaDons]);

  const soDonHangMoi = useMemo(() => {
    return filteredDonHangs.filter(
      (donHang) =>
        donHang.trangThaiGiaoHang === "Đã đặt" ||
        donHang.trangThaiGiaoHang === "Đã xác nhận"
    ).length;
  }, [filteredDonHangs]);

  const soHoaDonHuy = useMemo(() => {
    return filteredHoaDons.filter(
      (hoadon) => hoadon.donHang?.trangThaiGiaoHang === "Đã hủy"
    ).length;
  }, [filteredHoaDons]);

  const tyLeHuyDon = useMemo(() => {
    const tongSoHoaDon = filteredHoaDons.length;
    return tongSoHoaDon > 0 ? (soHoaDonHuy / tongSoHoaDon) * 100 : 0;
  }, [filteredHoaDons, soHoaDonHuy]);

  const doanhThuChartData = useMemo(
    () => ({
      labels: filteredHoaDons.map((hd) =>
        new Date(hd.ngayXuatHoaDon).toLocaleDateString()
      ),
      datasets: [
        {
          label: "Doanh thu",
          data: filteredHoaDons.map((hd) => hd.tongTien || 0),
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
          fill: true, // Added fill for Area Chart effect
        },
      ],
    }),
    [filteredHoaDons]
  );

  // const trangThaiDonHangChartData = useMemo(() => {
  //   const trangThaiCounts = filteredDonHangs.reduce((acc, donHang) => {
  //     acc[donHang.trangThaiGiaoHang] =
  //       (acc[donHang.trangThaiGiaoHang] || 0) + 1;
  //     return acc;
  //   }, {});

  //   return {
  //     labels: Object.keys(trangThaiCounts),
  //     datasets: [
  //       {
  //         label: "Trạng thái đơn hàng",
  //         data: Object.values(trangThaiCounts),
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.7)",
  //           "rgba(54, 162, 235, 0.7)",
  //           "rgba(255, 206, 86, 0.7)",
  //           "rgba(75, 192, 192, 0.7)",
  //           "rgba(153, 102, 255, 0.7)",
  //           "rgba(255, 159, 64, 0.7)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  // }, [filteredDonHangs]);

  const trangThaiHoaDonChartData = useMemo(() => {
    const trangThaiCounts = filteredHoaDons.reduce((acc, hoaDon) => {
      acc[hoaDon.donHang?.trangThaiGiaoHang] =
        (acc[hoaDon.donHang?.trangThaiGiaoHang] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(trangThaiCounts),
      datasets: [
        {
          label: "Trạng thái hóa đơn",
          data: Object.values(trangThaiCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(255, 159, 64, 0.7)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [filteredHoaDons]);

  return (
    <Container className="pt-2 max-h-dvh overflow-auto">
      {/* <Typography
        variant="h4"
        gutterBottom
        className="font-semibold text-gray-800 mb-4"
      >
        Thống Kê
      </Typography> */}

      <div className="mb-4 flex space-x-4">
        <TextField
          label="Từ ngày"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Đến ngày"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={() => {setEndDate(""),setStartDate("")}}>
          Làm Mới
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">Lỗi: {error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Các item thống kê tổng quan */}
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <ThongKeItem
                title="Tổng Số Hóa Đơn"
                value={tongSoHoaDon}
                icon={<ReceiptIcon />}
                color="primary"
              />
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <ThongKeItem
                title="Tổng Doanh Thu"
                value={tongDoanhThu.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                icon={<AttachMoneyIcon />}
                color="success"
              />
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <ThongKeItem
                title="Đơn Hàng Mới"
                value={soDonHangMoi}
                icon={<NewReleasesIcon />}
                color="warning"
              />
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <ThongKeItem
                title="Tỷ Lệ Hủy Đơn"
                value={`${tyLeHuyDon.toFixed(2)}%`}
                icon={<CancelIcon />}
                color="error"
              />
            </StyledCard>
          </Grid>

          {/* Biểu đồ doanh thu */}
          <Grid item xs={12} md={7}>
            <StyledCard>
              <Typography
                variant="h6"
                gutterBottom
                className="font-semibold text-gray-700 text-center"
              >
                Biểu Đồ Doanh Thu Theo Ngày
              </Typography>
              <Line data={doanhThuChartData} options={{ responsive: true }} />{" "}
              {/* Changed Bar to Line */}
            </StyledCard>
            <ThongKeThongKeTable hoaDonList={hoaDons} />
          </Grid>

          {/* Biểu đồ trạng thái đơn hàng */}
          <Grid item xs={12} md={5}>
            {/* <StyledCard>
              <Typography variant="h6" gutterBottom className="font-semibold text-gray-700 text-center">
                Thống Kê Trạng Thái Đơn Hàng
              </Typography>
              <Pie data={trangThaiDonHangChartData} options={{ responsive: true }} />
            </StyledCard> */}
            <StyledCard className="h-full">
              <Typography
                variant="h6"
                gutterBottom
                className="font-semibold text-gray-700 text-center"
              >
                Thống Kê Trạng Thái Hóa Đơn
              </Typography>
              <Bar
                data={trangThaiHoaDonChartData}
                options={{ responsive: true }}
              />
              <br /> <br /> <br />
              <Pie
                data={trangThaiHoaDonChartData}
                options={{ responsive: true }}
              />
            </StyledCard>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ThongKe;
