import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData";
import { addItem, editItem, deleteItem } from "../../utils/CRUD";
import filterData from "../../utils/FilterData";
import CommonToolbar from "../../components/CommonToolBar"; // Toolbar chung
import NhanVienDialog from "../../components/Dialog/NhanVienDialog"; // Dialog
import NhanVienTable from "../../components/Table/NhanVienTable"; // Bảng
import Loading from "../../utils/state/Loading"; // Spinner khi đang tải
import Error from "../../utils/state/Error"; // Thông báo lỗi
import { exportExcel } from "../../utils/ExcelJS"; // Xuất file Excel
import NhanVienFilter from "../../components/Filter/NhanVienFilter"; // Bộ lọc
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const NhanVien = () => {
  const [nhanVienList, setNhanVienList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editNhanVien, setEditNhanVien] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    hoTen: "",
    email: "",
    gioiTinh: "",
    chucVu: "",
    soDienThoai: "",
    diaChi: "",
  });

  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Fetch dữ liệu nhân viên lần đầu
  useEffect(() => {
    fetchData(
      "http://localhost:8080/api/nhanvien",
      setNhanVienList,
      setLoading,
      setError
    );
  }, []);

  // Hàm lọc dữ liệu
  const handleFilter = useCallback(() => {
    filterData(
      "http://localhost:8080/api/nhanvien/filter",
      filterParams,
      search,
      setNhanVienList,
      setError
    );
  }, [filterParams, search]);

  // Gọi lại filter khi có thay đổi
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  // Xử lý thêm nhân viên
  const handleAdd = (newData) => {
    addItem(
      "http://localhost:8080/api/nhanvien",
      newData,
      setNhanVienList,
      setSnackbar
    );
  };

  // Xử lý sửa nhân viên
  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/nhanvien",
      id,
      updatedData,
      setNhanVienList,
      setSnackbar,
      "maNhanVien"
    );
  };

  // Xử lý xóa nhân viên
  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/nhanvien",
      id,
      setNhanVienList,
      setSnackbar,
      "maNhanVien"
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
      nhanVienList,
      [
        { header: "Mã Nhân Viên", key: "maNhanVien" },
        { header: "Họ Tên", key: "hoTen" },
        { header: "Email", key: "email" },
        { header: "Giới Tính", key: "gioiTinh" },
        { header: "Số Điện Thoại", key: "soDienThoai" },
        { header: "Chức Vụ", key: "chucVu" },
        { header: "Địa Chỉ", key: "diaChi" },
      ],
      "DanhSachNhanVien.xlsx"
    );
  };

  // Render giao diện
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setDialogOpen(true);
          setEditNhanVien(null); 
          setTitle("Thêm Nhân Viên");
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
      />

      <NhanVienFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
      />

      <NhanVienTable
        nhanVienList={nhanVienList}
        onEdit={(nhanVien) => {
          setTitle("Sửa Nhân Viên");
          setEditNhanVien(nhanVien);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <NhanVienDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editNhanVien
            ? (data) => handleEdit(editNhanVien.maNhanVien, data)
            : handleAdd
        }
        nhanVien={editNhanVien}
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

export default NhanVien;
