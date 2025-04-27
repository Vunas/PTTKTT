import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData";
import { addItem, editItem, deleteItem } from "../../utils/CRUD";
import filterData from "../../utils/FilterData";
import CommonToolbar from "../../components/CommonToolBar"; // Toolbar chung
import KhoHangDialog from "../../components/Dialog/KhoHangDialog"; // Dialog
import KhoHangTable from "../../components/Table/KhoHangTable"; // Bảng
import Loading from "../../utils/state/Loading"; // Spinner khi đang tải
import Error from "../../utils/state/Error"; // Thông báo lỗi
import { exportExcel } from "../../utils/ExcelJS"; // Xuất file Excel
import KhoHangFilter from "../../components/Filter/KhoHangFilter"; // Bộ lọc
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TonKhoDetail from "../../components/Details/TonKhoDetail";
import { Grid, Paper, Typography } from "@mui/material";

const KhoHang = ({ quyen }) => {
  const [khoHangList, setKhoHangList] = useState([]);
  const [selectedKhoHang, setSelectedKhoHang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editKhoHang, setEditKhoHang] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    tenKhoHang: "",
    diaDiem: "",
  });
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchData(
      "http://localhost:8080/api/khohang",
      setKhoHangList,
      setLoading,
      setError
    );
  }, []);

  const handleFilter = useCallback(() => {
    filterData(
      "http://localhost:8080/api/khohang/filter",
      filterParams,
      search,
      setKhoHangList,
      setError
    );
  }, [filterParams, search]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const handleAdd = (newData) => {
    setEditKhoHang(null);
    addItem(
      "http://localhost:8080/api/khohang",
      newData,
      setKhoHangList,
      setSnackbar
    );
  };

  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/khohang",
      id,
      updatedData,
      setKhoHangList,
      setSnackbar,
      "maKhoHang"
    );
  };

  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/khohang",
      id,
      setKhoHangList,
      setSnackbar,
      "maKhoHang"
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
      khoHangList,
      [
        { header: "Mã Kho Hàng", key: "maKhoHang" },
        { header: "Tên Kho Hàng", key: "tenKhoHang" },
        { header: "Địa Điểm", key: "diaDiem" },
      ],
      "DanhSachKhoHang.xlsx"
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setEditKhoHang(null);
          setTitle("Thêm Kho Hàng");
          setDialogOpen(true);
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
        quyenThem={quyen?.create}
      />

      <KhoHangFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
      />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Danh sách Kho Hàng
            </Typography>
            <KhoHangTable
              khoHangList={khoHangList}
              onEdit={(khoHang) => {
                setTitle("Sửa Kho Hàng");
                setEditKhoHang(khoHang);
                setDialogOpen(true);
              }}
              onDelete={handleDelete}
              quyen={quyen}
              setKhoHangSelected={setSelectedKhoHang}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Chi Tiết Tồn Kho
            </Typography>
            <TonKhoDetail khoHang={selectedKhoHang} />
          </Paper>
        </Grid>
      </Grid>

      <KhoHangDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editKhoHang
            ? (data) => handleEdit(editKhoHang.maKhoHang, data)
            : handleAdd
        }
        khoHang={editKhoHang}
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

export default KhoHang;
