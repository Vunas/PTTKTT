import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData"; // Hàm fetch dữ liệu chung
import { addItem, editItem, deleteItem } from "../../utils/CRUD"; // Các thao tác CRUD
import filterData from "../../utils/FilterData"; // Hàm lọc chung
import CommonToolbar from "../../components/CommonToolBar"; // Toolbar chung
import KhuyenMaiDialog from "../../components/Dialog/KhuyenMaiDialog"; // Dialog khuyến mãi
import KhuyenMaiTable from "../../components/Table/KhuyenMaiTable"; // Bảng khuyến mãi
import Loading from "../../utils/state/Loading"; // Hiển thị trạng thái tải
import Error from "../../utils/state/Error"; // Hiển thị trạng thái lỗi
import KhuyenMaiFilter from "../../components/Filter/KhuyenMaiFilter"; // Bộ lọc khuyến mãi
import Snackbar from "@mui/material/Snackbar"; // Snackbar thông báo
import Alert from "@mui/material/Alert"; // Alert thông báo
import { exportExcel } from "../../utils/ExcelJS"; // Xuất file Excel
import axios from "axios";

const KhuyenMai = () => {
  const [khuyenMaiList, setKhuyenMaiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editKhuyenMai, setEditKhuyenMai] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    tenKhuyenMai: "",
    loaiKhuyenMai: "",
    trangThai: "",
    ngayBatDau: "",
    ngayKetThuc: "",
  });
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Fetch dữ liệu khuyến mãi lần đầu
  useEffect(() => {
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
      "http://localhost:8080/api/khuyenmai/filter",
      filterParams,
      search,
      setKhuyenMaiList,
      setError
    );
  }, [filterParams, search]);

  // Gọi lại filter khi có thay đổi
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  // Xử lý thêm khuyến mãi
  const handleAdd = (newData) => {
    addItem(
      "http://localhost:8080/api/khuyenmai",
      newData,
      setKhuyenMaiList,
      setSnackbar
    );
  };

  // Xử lý sửa khuyến mãi
  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/khuyenmai",
      id,
      updatedData,
      setKhuyenMaiList,
      setSnackbar,
      "maKhuyenMai"
    );
  };

  // Xử lý xóa khuyến mãi
  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/khuyenmai",
      id,
      setKhuyenMaiList,
      setSnackbar,
      "maKhuyenMai"
    );
  };

  const fetchKhuyenMaiList = () => {
    axios
      .get("http://localhost:8080/api/khuyenmai")
      .then((response) => {
        setKhuyenMaiList(response.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError("Không thể tải dữ liệu từ server");
        setLoading(false);
      });
  };

  const handleToggleLock = (id) => {
    axios
      .put(`http://localhost:8080/api/khuyenmai/lock/${id}`)
      .then((response) => {
        fetchKhuyenMaiList();
        setSnackbar({ open: true, message: response.data, type: "success" });
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data || "Có lỗi xảy ra khi khóa/mở khuyến mãi.";
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
      khuyenMaiList,
      [
        { header: "Mã Khuyến Mãi", key: "maKhuyenMai" },
        { header: "Tên Khuyến Mãi", key: "tenKhuyenMai" },
        { header: "Loại Khuyến Mãi", key: "loaiKhuyenMai" },
        { header: "Giá Trị Khuyến Mãi", key: "giaTriKhuyenMai" },
        { header: "Trạng Thái", key: "trangThai" },
      ],
      "DanhSachKhuyenMai.xlsx"
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
          setEditKhuyenMai(null);
          setTitle("Thêm Khuyến Mãi");
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
      />

      <KhuyenMaiFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
      />

      <KhuyenMaiTable
        khuyenMaiList={khuyenMaiList}
        onEdit={(khuyenMai) => {
          setTitle("Sửa Khuyến Mãi");
          setEditKhuyenMai(khuyenMai);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
        onToggleLock={handleToggleLock}
      />

      <KhuyenMaiDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editKhuyenMai
            ? (data) => handleEdit(editKhuyenMai.maKhuyenMai, data)
            : handleAdd
        }
        khuyenMai={editKhuyenMai}
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

export default KhuyenMai;
