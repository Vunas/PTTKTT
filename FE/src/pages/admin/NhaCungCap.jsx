import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData";
import { addItem, editItem, deleteItem } from "../../utils/CRUD";
import filterData from "../../utils/FilterData";
import CommonToolbar from "../../components/CommonToolBar"; // Toolbar chung
import NhaCungCapDialog from "../../components/Dialog/NhaCungCapDialog"; // Dialog
import NhaCungCapTable from "../../components/Table/NhaCungCapTable"; // Bảng
import Loading from "../../utils/state/Loading"; // Spinner khi đang tải
import Error from "../../utils/state/Error"; // Thông báo lỗi
import { exportExcel } from "../../utils/ExcelJS"; // Xuất file Excel
import NhaCungCapFilter from "../../components/Filter/NhaCungCapFilter"; // Bộ lọc
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const NhaCungCap = () => {
  const [nhaCungCapList, setNhaCungCapList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editNhaCungCap, setEditNhaCungCap] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    tenNhaCungCap: "",
    email: "",
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
      "http://localhost:8080/api/nhacungcap",
      setNhaCungCapList,
      setLoading,
      setError
    );
    setLoading(false);
  }, []);

  const handleFilter = useCallback(() => {
    filterData(
      "http://localhost:8080/api/nhacungcap/filter",
      filterParams,
      search,
      setNhaCungCapList,
      setError
    );
  }, [filterParams, search]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const handleAdd = (newData) => {
    setEditNhaCungCap(null);
    addItem(
      "http://localhost:8080/api/nhacungcap",
      newData,
      setNhaCungCapList,
      setSnackbar
    );
  };

  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/nhacungcap",
      id,
      updatedData,
      setNhaCungCapList,
      setSnackbar,
      "maNhaCungCap"
    );
  };

  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/nhacungcap",
      id,
      setNhaCungCapList,
      setSnackbar,
      "maNhaCungCap"
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
      nhaCungCapList,
      [
        { header: "Mã Nhà Cung Cấp", key: "maNhaCungCap" },
        { header: "Tên Nhà Cung Cấp", key: "tenNhaCungCap" },
        { header: "Email", key: "email" },
        { header: "Số Điện Thoại", key: "soDienThoai" },
        { header: "Địa Chỉ", key: "diaChi" },
      ],
      "DanhSachNhaCungCap.xlsx"
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setEditNhaCungCap(null);
          setTitle("Thêm Nhà Cung Cấp");
          setDialogOpen(true);
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
      />

      <NhaCungCapFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
      />

      <NhaCungCapTable
        nhaCungCapList={nhaCungCapList}
        onEdit={(nhaCungCap) => {
          setTitle("Sửa Nhà Cung Cấp");
          setEditNhaCungCap(nhaCungCap);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <NhaCungCapDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editNhaCungCap
            ? (data) => handleEdit(editNhaCungCap.maNhaCungCap, data)
            : handleAdd
        }
        nhaCungCap={editNhaCungCap}
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

export default NhaCungCap;
