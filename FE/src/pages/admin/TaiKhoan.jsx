import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData"; // Hàm fetch dữ liệu chung
import { addItem, editItem, deleteItem } from "../../utils/CRUD"; // Các thao tác CRUD
import filterData from "../../utils/FilterData"; // Hàm lọc chung
import CommonToolbar from "../../components/CommonToolBar"; // Toolbar chung
import TaiKhoanDialog from "../../components/Dialog/TaiKhoanDialog"; // Dialog tài khoản
import TaiKhoanTable from "../../components/Table/TaiKhoanTable"; // Bảng tài khoản
import Loading from "../../utils/state/Loading"; // Hiển thị trạng thái tải
import Error from "../../utils/state/Error"; // Hiển thị trạng thái lỗi
import TaiKhoanFilter from "../../components/Filter/TaiKhoanFilter"; // Bộ lọc tài khoản
import Snackbar from "@mui/material/Snackbar"; // Snackbar thông báo
import Alert from "@mui/material/Alert"; // Alert thông báo
import { exportExcel } from "../../utils/ExcelJS"; // Xuất file Excel
import axios from "axios";

const TaiKhoan = () => {
  const [taiKhoanList, setTaiKhoanList] = useState([]);
  const [phanQuyenList, setPhanQuyenList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editTaiKhoan, setEditTaiKhoan] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    tenDangNhap: "",
    email: "",
    maPhanQuyen: "",
    trangThai: "",
  });
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Fetch dữ liệu tài khoản lần đầu
  useEffect(() => {
    fetchData(
      "http://localhost:8080/api/taikhoan",
      setTaiKhoanList,
      setLoading,
      setError
    );
    fetchData(
      "http://localhost:8080/api/phanquyen",
      setPhanQuyenList,
      setLoading,
      setError
    );
  }, []);

  // Hàm lọc dữ liệu
  const handleFilter = useCallback(() => {
    filterData(
      "http://localhost:8080/api/taikhoan/filter",
      filterParams,
      search,
      setTaiKhoanList,
      setError
    );
  }, [filterParams, search]);

  // Gọi lại filter khi có thay đổi
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  // Xử lý thêm tài khoản
  const handleAdd = (newData) => {
    addItem(
      "http://localhost:8080/api/taikhoan",
      newData,
      () => {
        fetchData(
          "http://localhost:8080/api/taikhoan",
          setTaiKhoanList,
          setLoading,
          setError
        );
      },
      setSnackbar
    );
  };

  // Xử lý sửa tài khoản
  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/taikhoan",
      id,
      updatedData,
      setTaiKhoanList,
      setSnackbar,
      "maTaiKhoan"
    );
  };

  // Xử lý xóa tài khoản
  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/taikhoan",
      id,
      setTaiKhoanList,
      setSnackbar,
      "maTaiKhoan"
    );
  };

  const fetchTaiKhoanList = () => {
    axios
      .get("http://localhost:8080/api/taikhoan")
      .then((response) => {
        setTaiKhoanList(response.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError("Không thể tải dữ liệu từ server");
        setLoading(false);
      });
  };

  const handleToggleLock = (id) => {
    axios
      .put(`http://localhost:8080/api/taikhoan/lock/${id}`)
      .then((response) => {
        fetchTaiKhoanList();
        setSnackbar({ open: true, message: response.data, type: "success" });
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data || "Có lỗi xảy ra khi khóa/mở tài khoản.";
        setSnackbar({ open: true, message: errorMessage, type: "error" });
      });
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
      taiKhoanList,
      [
        { header: "Mã Tài Khoản", key: "maTaiKhoan" },
        { header: "Tên Đăng Nhập", key: "tenDangNhap" },
        { header: "Email", key: "email" },
        { header: "Phân Quyền", key: "maPhanQuyen" },
        { header: "Trạng Thái", key: "trangThai" },
      ],
      "DanhSachTaiKhoan.xlsx"
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
          setEditTaiKhoan(null);
          setTitle("Thêm Tài Khoản");
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
      />

      <TaiKhoanFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
        phanQuyenList={phanQuyenList}
      />

      <TaiKhoanTable
        taiKhoanList={taiKhoanList}
        onEdit={(taiKhoan) => {
          setTitle("Sửa Tài Khoản");
          setEditTaiKhoan(taiKhoan);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
        onToggleLock={handleToggleLock}
      />

      <TaiKhoanDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editTaiKhoan
            ? (data) => handleEdit(editTaiKhoan.maTaiKhoan, data)
            : handleAdd
        }
        taiKhoan={editTaiKhoan}
        title={title}
        phanQuyenList={phanQuyenList} 
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

export default TaiKhoan;
