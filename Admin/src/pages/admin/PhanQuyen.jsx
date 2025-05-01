import React, { useEffect, useState } from "react";
import fetchData from "../../utils/FetchData";
import { addItem, editItem, deleteItem } from "../../utils/CRUD";
import CommonToolbar from "../../components/CommonToolBar";
import PhanQuyenDialog from "../../components/Dialog/PhanQuyenDialog";
import PhanQuyenTable from "../../components/Table/PhanQuyenTable";
import Loading from "../../utils/state/Loading";
import Error from "../../utils/state/Error";
import { exportExcel } from "../../utils/ExcelJS";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import QuyenDetails from "../../components/Details/PhanQuyenDetail";

const PhanQuyen = ({quyen}) => {
  const [phanQuyenList, setPhanQuyenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editPhanQuyen, setEditPhanQuyen] = useState(null);
  const [selectedQuyen, setSelectedQuyen] = useState(null);
  const [title, setTitle] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchData(
      "http://localhost:8080/api/phanquyen",
      setPhanQuyenList,
      setLoading,
      setError
    );
  }, []);

  const handleSearch = (keyword) => {
    if (!keyword.trim()) {
      fetchData(
        "http://localhost:8080/api/phanquyen",
        setPhanQuyenList,
        setLoading,
        setError
      );
      return;
    }

    const filteredList = phanQuyenList.filter((role) =>
      role.tenQuyen.toLowerCase().includes(keyword.toLowerCase())
    );
    setPhanQuyenList(filteredList);
  };

  const handleAdd = (newData) => {
    addItem(
      "http://localhost:8080/api/phanquyen",
      newData,
      setPhanQuyenList,
      setSnackbar
    );
  };

  const handleEdit = (id, updatedData) => {
    editItem(
      "http://localhost:8080/api/phanquyen",
      id,
      updatedData,
      setPhanQuyenList,
      setSnackbar,
      "maPhanQuyen"
    );
  };

  const handleDelete = (id) => {
    deleteItem(
      "http://localhost:8080/api/phanquyen",
      id,
      setPhanQuyenList,
      setSnackbar,
      "maPhanQuyen"
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
      phanQuyenList,
      [
        { header: "Mã Quyền", key: "maPhanQuyen" },
        { header: "Tên Quyền", key: "tenQuyen" },
        { header: "Chức Năng", key: "danhSachChucNang" },
      ],
      "DanhSachPhanQuyen.xlsx"
    );
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setEditPhanQuyen(null);
          setTitle("Thêm phân quyền");
          setDialogOpen(true);
        }}
        onSearch={(keyword) => handleSearch(keyword.trim())}
        onExport={handleExport}
        quyenThem={quyen?.create}
      />

      <div className="flex w-full space-x-4 p-4">
        {/* Bảng Table */}
        <div className="w-3/5">
          <PhanQuyenTable
            phanQuyenList={phanQuyenList}
            onEdit={(phanQuyen) => {
              setTitle("Sửa phân quyền");
              setEditPhanQuyen(phanQuyen);
              setDialogOpen(true);
            }}
            onDelete={handleDelete}
            setSelectedQuyen={setSelectedQuyen}
            quyen={quyen}
          />
        </div>

        {/* Chi tiết quyền */}
        <div className="w-2/5">
          <QuyenDetails selectedQuyen={selectedQuyen} />
        </div>
      </div>

      <PhanQuyenDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editPhanQuyen
            ? (data) => handleEdit(editPhanQuyen.maPhanQuyen, data)
            : handleAdd
        }
        phanQuyen={editPhanQuyen}
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

export default PhanQuyen;
