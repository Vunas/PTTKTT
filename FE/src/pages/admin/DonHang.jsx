import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData"; // Hàm fetch dữ liệu chung
import { addItem, editItem, deleteItem } from "../../utils/CRUD"; // Các thao tác CRUD
import filterData from "../../utils/FilterData"; // Hàm lọc chung
import CommonToolbar from "../../components/CommonToolBar"; // Toolbar chung
import DonHangDialog from "../../components/Dialog/DonHangDialog"; // Dialog đơn hàng
import DonHangTable from "../../components/Table/DonHangTable"; // Bảng đơn hàng
import Loading from "../../utils/state/Loading"; // Hiển thị trạng thái tải
import Error from "../../utils/state/Error"; // Hiển thị trạng thái lỗi
import DonHangFilter from "../../components/Filter/DonHangFilter"; // Bộ lọc đơn hàng
import Snackbar from "@mui/material/Snackbar"; // Snackbar thông báo
import Alert from "@mui/material/Alert"; // Alert thông báo
import { exportExcel } from "../../utils/ExcelJS"; // Xuất file Excel

const DonHang = () => {
  const [donHangList, setDonHangList] = useState([]);
  const [khachHangList, setKhachHangList] = useState([]);
  const [loadingDonHang, setLoadingDonHang] = useState(true);
  const [loadingKhachHang, setLoadingKhachHang] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editDonHang, setEditDonHang] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    maKhachHang: "",
    ngayDatBatDau: "",
    ngayDatKetThuc: "",
    diaChiGiaoHang: "",
    phuongThucThanhToan: "",
    MinGia: "",
    MaxGia: "",
    trangThai: "",
  });
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Fetch dữ liệu đơn hàng và khách hàng lần đầu
  useEffect(() => {
    fetchData(
      "http://localhost:8080/api/donhang",
      setDonHangList,
      setLoadingDonHang,
      setError
    );
    fetchData(
      "http://localhost:8080/api/khachhang",
      setKhachHangList,
      setLoadingKhachHang,
      setError
    );
  }, []);

  const handleRefresh = () => {
    // Reset tất cả các filter về mặc định
    setFilterParams({
      maKhachHang: "",
      ngayDatBatDau: "",
      ngayDatKetThuc: "",
      diaChiGiaoHang: "",
      phuongThucThanhToan: "",
      trangThai: "",
      tongGiaMin: "",
      tongGiaMax: "",
    });
  };

  // Hàm lọc dữ liệu
  const handleFilter = useCallback(() => {

    console.log("Sending filter params to API:", filterParams);

    filterData(
      "http://localhost:8080/api/donhang/filter",
      filterParams,
      search,
      setDonHangList,
      setError
    );
  }, [filterParams, search]);

  // Gọi lại filter khi có thay đổi
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  // Xử lý thêm đơn hàng
  const handleAdd = (newData) => {
    addItem(
      "http://localhost:8080/api/donhang",
      newData,
      setDonHangList,
      setSnackbar
    );
  };

  // Xử lý sửa đơn hàng
  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/donhang",
      id,
      updatedData,
      setDonHangList,
      setSnackbar,
      "maDonHang"
    );
  };

  // Xử lý xóa mềm đơn hàng
  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/donhang",
      id,
      setDonHangList,
      setSnackbar,
      "maDonHang"
    );
  };

  // Đóng dialog
  const handleDialogClose = () => setDialogOpen(false);

  // Đóng snackbar
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  // Xuất file Excel
  const handleExport = () => {
    exportExcel(
      donHangList,
      [
        { header: "Mã Đơn Hàng", key: "maDonHang" },
        { header: "Mã Khách Hàng", key: "maKhachHang" },
        { header: "Ngày Đặt", key: "ngayDat" },
        { header: "Trạng Thái", key: "trangThai" },
        { header: "Tổng Giá", key: "tongGia" },
      ],
      "DanhSachDonHang.xlsx"
    );
  };

  // Render giao diện
  if (loadingDonHang || loadingKhachHang) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setDialogOpen(true);
          setEditDonHang(null);
          setTitle("Thêm Đơn Hàng");
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
      />

      <DonHangFilter
        filterParams={filterParams}
        onFilterParamsChange={setFilterParams}
        khachHangList={khachHangList}
        onRefresh={handleRefresh}
      />

      <DonHangTable
        donHangList={donHangList}
        onEdit={(donHang) => {
          setTitle("Sửa Đơn Hàng");
          setEditDonHang(donHang);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <DonHangDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editDonHang
            ? (data) => handleEdit(editDonHang.maDonHang, data)
            : handleAdd
        }
        donHang={editDonHang}
        title={title}
        khachHangList={khachHangList}
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

export default DonHang;
