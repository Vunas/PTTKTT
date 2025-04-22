import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData";
import { addItem, editItem, deleteItem } from "../../utils/CRUD";
import filterData from "../../utils/FilterData";
import CommonToolbar from "../../components/CommonToolBar";
import SanPhamDialog from "../../components/Dialog/SanPhamDialog";
import SanPhamTable from "../../components/Table/SanPhamTable";
import Loading from "../../utils/state/Loading";
import Error from "../../utils/state/Error";
import { exportExcel } from "../../utils/ExcelJS";
import SanPhamFilter from "../../components/Filter/SanPhamFilter";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SanPham = ({quyen}) => {
  const [sanPhamList, setSanPhamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editSanPham, setEditSanPham] = useState(null);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    tenSanPham: "",
    giaBanMin: "",
    giaBanMax: "",
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
      "http://localhost:8080/api/sanpham",
      setSanPhamList,
      setLoading,
      setError
    );
  }, []);

  const handleFilter = useCallback(() => {
    filterData(
      "http://localhost:8080/api/sanpham/filter",
      filterParams,
      search,
      setSanPhamList,
      setError
    );
  }, [filterParams, search]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const handleAdd = async (newData) => {
    await addItem(
      "http://localhost:8080/api/sanpham",
      newData,
      setSanPhamList,
      setSnackbar
    );
    await fetchData(
      "http://localhost:8080/api/sanpham",
      setSanPhamList,
      setLoading,
      setError
    );
  };

  const handleEdit = async (id, updatedData) => {
    await editItem(
      "http://localhost:8080/api/sanpham",
      id,
      updatedData,
      setSanPhamList,
      setSnackbar,
      "maSanPham"
    );
    await fetchData(
      "http://localhost:8080/api/sanpham",
      setSanPhamList,
      setLoading,
      setError
    );
  };

  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/sanpham",
      id,
      setSanPhamList,
      setSnackbar,
      "maSanPham"
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
      sanPhamList,
      [
        { header: "Mã Sản Phẩm", key: "maSanPham" },
        { header: "Tên Sản Phẩm", key: "tenSanPham" },
        { header: "Giá Sản Xuất", key: "giaSanXuat" },
        { header: "Giá Bán", key: "giaBan" },
        { header: "Số Lượng", key: "soLuong" },
        { header: "Hình Ảnh", key: "hinhAnh" },
      ],
      "DanhSachSanPham.xlsx"
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setEditSanPham(null);
          setTitle("Thêm Sản Phẩm");
          setDialogOpen(true);
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
        quyenThem={quyen?.create}
      />

      <SanPhamFilter
        FilterParams={filterParams}
        onFilterParamsChange={setFilterParams}
      />

      <SanPhamTable
        sanPhamList={sanPhamList}
        onEdit={(sanPham) => {
          setTitle("Sửa Sản Phẩm");
          setEditSanPham(sanPham);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
        quyen={quyen}
      />

      <SanPhamDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editSanPham
            ? (data) => handleEdit(data.sanPham.maSanPham, data)
            : handleAdd
        }
        sanPham={editSanPham}
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

export default SanPham;
