import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData";
import { addItem, editItem, deleteItem } from "../../utils/CRUD";
import filterData from "../../utils/FilterData";
import CommonToolbar from "../../components/CommonToolBar";
import NguyenLieuDialog from "../../components/Dialog/NguyenLieuDialog";
import NguyenLieuTable from "../../components/Table/NguyenLieuTable";
import Loading from "../../utils/state/Loading";
import Error from "../../utils/state/Error";
import { exportExcel } from "../../utils/ExcelJS";
import NguyenLieuFilter from "../../components/Filter/NguyenLieuFilter";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const NguyenLieu = ({quyen}) => {
  const [nguyenLieuList, setNguyenLieuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editNguyenLieu, setEditNguyenLieu] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    ten: "",
    donVi: "",
    giaNhapMin: "",
    giaNhapMax: "",
    soLuongMin: "",
    soLuongMax: "",
  });

  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchData(
      "http://localhost:8080/api/nguyenlieu",
      setNguyenLieuList,
      setLoading,
      setError
    );
  }, []);

  const handleFilter = useCallback(() => {
    filterData(
      "http://localhost:8080/api/nguyenlieu/filter",
      filterParams,
      search,
      setNguyenLieuList,
      setError
    );
  }, [filterParams, search]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const handleAdd = (newData) => {
    addItem(
      "http://localhost:8080/api/nguyenlieu",
      newData,
      setNguyenLieuList,
      setSnackbar
    );
  };

  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/nguyenlieu",
      id,
      updatedData,
      setNguyenLieuList,
      setSnackbar,
      "maNguyenLieu"
    );
  };

  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/nguyenlieu",
      id,
      setNguyenLieuList,
      setSnackbar,
      "maNguyenLieu"
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
      nguyenLieuList,
      [
        { header: "Mã Nguyên Liệu", key: "maNguyenLieu" },
        { header: "Tên", key: "ten" },
        { header: "Đơn Vị", key: "donVi" },
        { header: "Giá Nhập", key: "giaNhap" },
        { header: "Số Lượng", key: "soLuong" },
        { header: "Hình Ảnh", key: "hinhAnh" },
      ],
      "DanhSachNguyenLieu.xlsx"
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setEditNguyenLieu(null);
          setTitle("Thêm Nguyên Liệu");
          setDialogOpen(true);
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
        quyenThem={quyen?.create}
      />

      <NguyenLieuFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
      />

      <NguyenLieuTable
        nguyenLieuList={nguyenLieuList}
        onEdit={(nguyenLieu) => {
          setTitle("Sửa Nguyên Liệu");
          setEditNguyenLieu(nguyenLieu);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
        quyen={quyen}
      />

      <NguyenLieuDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editNguyenLieu
            ? (data) => handleEdit(editNguyenLieu.maNguyenLieu, data)
            : handleAdd
        }
        nguyenLieu={editNguyenLieu}
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

export default NguyenLieu;
