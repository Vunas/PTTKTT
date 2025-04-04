import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData";
import { addItem, editItem, deleteItem } from "../../utils/CRUD";
import filterData from "../../utils/FilterData";
import CommonToolbar from "../../components/CommonToolBar"; // Toolbar chung
import KhachHangDialog from "../../components/Dialog/KhachHangDialog"; // Dialog
import KhachHangTable from "../../components/Table/KhachHangTable"; // Bảng
import Loading from "../../utils/state/Loading"; // Spinner khi đang tải
import Error from "../../utils/state/Error"; // Thông báo lỗi
import { exportExcel } from "../../utils/ExcelJS"; // Xuất file Excel
import KhachHangFilter from "../../components/Filter/KhachHangFilter"; // Bộ lọc
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const KhachHang = () => {
  const [khachHangList, setKhachHangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editKhachHang, setEditKhachHang] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    hoTen: "",
    email: "",
    gioiTinh: "",
    soDienThoai: "",
    diaChi: "",
  });
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setLoading(true);
    fetchData(
      "http://localhost:8080/api/khachhang",
      setKhachHangList,
      setLoading,
      setError
    );
    setLoading(false);
  }, []);

  const handleFilter = useCallback(() => {
    filterData(
      "http://localhost:8080/api/khachhang/filter",
      filterParams,
      search,
      setKhachHangList,
      setError
    );
  }, [filterParams, search]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const handleAdd = (newData) => {
    setEditKhachHang(null);
    addItem(
      "http://localhost:8080/api/khachhang",
      newData,
      setKhachHangList,
      setSnackbar
    );
  };

  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/khachhang",
      id,
      updatedData,
      setKhachHangList,
      setSnackbar,
      "maKhachHang"
    );
  };

  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/khachhang",
      id,
      setKhachHangList,
      setSnackbar,
      "maKhachHang"
    );
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleExport = () => {
    exportExcel(
      khachHangList,
      [
        { header: "Mã Khách Hàng", key: "maKhachHang" },
        { header: "Họ Tên", key: "hoTen" },
        { header: "Email", key: "email" },
        { header: "Giới Tính", key: "gioiTinh" },
        { header: "Số Điện Thoại", key: "soDienThoai" },
        { header: "Địa Chỉ", key: "diaChi" },
      ],
      "DanhSachKhachHang.xlsx"
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setEditKhachHang(null);
          setTitle("Thêm khách hàng");
          setDialogOpen(true);
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
      />

      <KhachHangFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
      />

      <KhachHangTable
        khachHangList={khachHangList}
        onEdit={(khachHang) => {
          setTitle("Sửa Khách Hàng");
          setEditKhachHang(khachHang);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <KhachHangDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editKhachHang
            ? (data) => handleEdit(editKhachHang.maKhachHang, data)
            : handleAdd
        }
        khachHang={editKhachHang}
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

export default KhachHang;
