import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData"; // Hàm fetch dữ liệu chung
import { addItem, editItem, deleteItem } from "../../utils/CRUD"; // Các thao tác CRUD
import filterData from "../../utils/FilterData"; // Hàm lọc chung
import CommonToolbar from "../../components/CommonToolBar"; // Toolbar chung
import HoaDonDialog from "../../components/Dialog/HoaDonDialog"; // Dialog hóa đơn
import HoaDonTable from "../../components/Table/HoaDonTable"; // Bảng hóa đơn
import Loading from "../../utils/state/Loading"; // Hiển thị trạng thái tải
import Error from "../../utils/state/Error"; // Hiển thị trạng thái lỗi
import HoaDonFilter from "../../components/Filter/HoaDonFilter"; // Bộ lọc hóa đơn
import Snackbar from "@mui/material/Snackbar"; // Snackbar thông báo
import Alert from "@mui/material/Alert"; // Alert thông báo
import { exportExcel } from "../../utils/ExcelJS"; // Xuất file Excel

const HoaDon = () => {
  const [hoaDonList, setHoaDonList] = useState([]);
  const [khuyenMaiList, setKhuyenMaiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editHoaDon, setEditHoaDon] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    maDonHang: "",
    maKhuyenMai: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    tongTienMin: "",
    tongTienMax: "",
  });
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Fetch dữ liệu hóa đơn lần đầu
  useEffect(() => {
    fetchData(
      "http://localhost:8080/api/hoadon",
      setHoaDonList,
      setLoading,
      setError
    );
    fetchData(
      "http://localhost:8080/api/khuyenmai",
      setKhuyenMaiList,
      setLoading,
      setError
    );
  }, []);

  // Hàm lọc dữ liệu
  const handleFilter = useCallback(() => {
    filterData(
      "http://localhost:8080/api/hoadon/filter",
      filterParams,
      search,
      setHoaDonList,
      setError
    );
  }, [filterParams, search]);

  // Gọi lại filter khi có thay đổi
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  // Xử lý thêm hóa đơn
  const handleAdd = (newData) => {
    addItem(
      "http://localhost:8080/api/hoadon",
      newData,
      setHoaDonList,
      setSnackbar
    );
  };

  // Xử lý sửa hóa đơn
  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/hoadon",
      id,
      updatedData,
      setHoaDonList,
      setSnackbar,
      "maHoaDon"
    );
  };

  // Xử lý xóa hóa đơn
  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/hoadon",
      id,
      setHoaDonList,
      setSnackbar,
      "maHoaDon"
    );
  };

  // Đóng dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Đóng snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Xuất file Excel
  const handleExport = () => {
    exportExcel(
      hoaDonList,
      [
        { header: "Mã Hóa Đơn", key: "maHoaDon" },
        { header: "Mã Đơn Hàng", key: "maDonHang" },
        { header: "Mã Khuyến Mãi", key: "maKhuyenMai" },
        { header: "Ngày Xuất Hóa Đơn", key: "ngayXuatHoaDon" },
        { header: "Tổng Tiền", key: "tongTien" },
      ],
      "DanhSachHoaDon.xlsx"
    );
  };

  // Render giao diện
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        // onAdd={() => {
        //   setDialogOpen(true);
        //   setEditHoaDon(null);
        //   setTitle("Thêm Hóa Đơn");
        // }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
      />

      <HoaDonFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
      />

      <HoaDonTable
        hoaDonList={hoaDonList}
        khuyenMaiList={khuyenMaiList}
        onEdit={(hoaDon) => {
          setTitle("Sửa Hóa Đơn");
          setEditHoaDon(hoaDon);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <HoaDonDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editHoaDon
            ? (data) => handleEdit(editHoaDon.maHoaDon, data)
            : handleAdd
        }
        hoaDon={editHoaDon}
        title={title}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.type}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HoaDon;