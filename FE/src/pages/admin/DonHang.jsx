import React, { useEffect, useState, useCallback } from "react";
import fetchData from "../../utils/FetchData"; // Hàm fetch dữ liệu chung
import { deleteItem, addList, editList } from "../../utils/CRUD"; // Các thao tác CRUD
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
import axios from "axios";

const DonHang = ({ quyen }) => {
  const [donHangList, setDonHangList] = useState([]);
  const [khachHangList, setKhachHangList] = useState([]);
  const [KhuyenMaiList, setKhuyenMaiList] = useState([]);
  const [sanPhamList, setSanPhamList] = useState([]);
  const [loadingDonHang, setLoadingDonHang] = useState(true);
  const [loadingKhachHang, setLoadingKhachHang] = useState(true);
  const [loadingSanPham, setLoadingSanPham] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editDonHang, setEditDonHang] = useState(null);
  const [isExport, setExport] = useState(false);
  const [title, setTitle] = useState("");
  const [filterParams, setFilterParams] = useState({
    maKhachHang: "",
    ngayDatBatDau: "",
    ngayDatKetThuc: "",
    diaChiGiaoHang: "",
    phuongThucThanhToan: "",
    MinGia: "",
    MaxGia: "",
    trangThaiGiaoHang: "",
  });
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [expandedChiTiet, setExpandedChiTiet] = useState({});
  const [currentChiTietDonHang, setCurrentChiTietDonHang] = useState([]);
  const [dialogSanPhamList, setDialogSanPhamList] = useState([]); // State riêng cho danh sách sản phẩm trong dialog

  // Fetch dữ liệu đơn hàng và khách hàng lần đầu
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await fetchData("http://localhost:8080/api/khachhang", setKhachHangList, setLoadingKhachHang, setError);
        await fetchData("http://localhost:8080/api/sanpham", setSanPhamList, setLoadingSanPham, setError);
        await fetchData("http://localhost:8080/api/khuyenmai", setKhuyenMaiList, setLoadingDonHang, setError);
        await fetchData("http://localhost:8080/api/donhang", setDonHangList, setLoadingDonHang, setError);
        
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoadingDonHang(false);
      }
    };
  
    fetchAllData();
  }, []);

  useEffect(() => {
    setExpandedChiTiet({});
  }, [donHangList]);

  // Lấy chi tiết đơn hàng
  const getChiTietDonHang = async (maDonHang) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/chitietdonhang/donhang/${maDonHang}`
      );
      const data = await response.json();
      setExpandedChiTiet((prev) => ({ ...prev, [maDonHang]: data }));
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  const handleOpenDialog = async (donHang = null) => {
    setTitle(donHang ? "Sửa Đơn Hàng" : "Thêm Đơn Hàng");
    setEditDonHang(donHang);
    setDialogOpen(true);

    // Cập nhật danh sách sản phẩm cho dialog mỗi khi mở
    setDialogSanPhamList(sanPhamList);

    if (donHang) {
      const chiTiet = await getChiTietDonHang(donHang.maDonHang);
      setCurrentChiTietDonHang(chiTiet);
    } else {
      setCurrentChiTietDonHang([]); // Reset chi tiết đơn hàng khi thêm mới
    }
  };

  const handleRefresh = () => {
    // Reset tất cả các filter về mặc định
    setFilterParams({
      maKhachHang: "",
      ngayDatBatDau: "",
      ngayDatKetThuc: "",
      diaChiGiaoHang: "",
      phuongThucThanhToan: "",
      trangThaiGiaoHang: "",
      tongGiaMin: "",
      tongGiaMax: "",
    });
  };

  // Hàm lọc dữ liệu
  const handleFilter = useCallback(() => {
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
  const handleAdd = async (
    newDonHang,
    newChiTietDonHang,
    updatedSanPhamList
  ) => {
    console.log(updatedSanPhamList);
    try {
      // Cập nhật lại danh sách sản phẩm sau khi thêm đơn hàng
      const newSanPhamList = await editList(
        "http://localhost:8080/api/sanpham/bulk",
        updatedSanPhamList,
        setError
      );
      setSanPhamList(newSanPhamList);

      const addedDonHang = await addList(
        "http://localhost:8080/api/donhang",
        newDonHang,
        setError
      );
      console.log("loi kiaaa");
      // Sau khi thêm xong `DonHang`, lấy mã đơn hàng vừa tạo và thêm `ChiTietDonHang`
      await addList(
        "http://localhost:8080/api/chitietdonhang/bulk",
        newChiTietDonHang.map((item) => ({
          ...item,
          maDonHang: addedDonHang.maDonHang, // Thêm mã đơn hàng vào chi tiết
        })),
        setError
      );

      // Refetch danh sách đơn hàng
      fetchData(
        "http://localhost:8080/api/donhang",
        setDonHangList,
        setLoadingDonHang,
        setError
      );

      setSnackbar({ open: true, message: "Thêm thành công!", type: "success" });
    } catch (error) {
      console.error("Lỗi khi thêm đơn hàng hoặc chi tiết:", error);
      setSnackbar({
        open: true,
        message: "Lỗi khi thêm dữ liệu.",
        type: "error",
      });
    }
  };

  const addHoaDon = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      const errorMessage = error.response?.data || "Có lỗi xảy ra khi thêm.";
      console.log(errorMessage);
      throw error; // Ném lỗi để xử lý phía gọi hàm
    }
  };

  // Xử lý sửa đơn hàng
  const handleEdit = async (
    id,
    updatedDonHang,
    updatedChiTietDonHang,
    updatedSanPhamList,
    updatedHoaDon
  ) => {
    console.log(updatedSanPhamList);
    try {
      setLoadingDonHang(true);
      console.log(updatedDonHang);
      console.log(updatedChiTietDonHang);

      // Cập nhật danh sách sản phẩm
      const newSanPhamList = await editList(
        "http://localhost:8080/api/sanpham/bulk",
        updatedSanPhamList,
        setError
      );
      setSanPhamList(newSanPhamList);

      // Cập nhật thông tin DonHang
      await editList(
        `http://localhost:8080/api/donhang/${id}`,
        updatedDonHang,
        setError
      );

      // Cập nhật danh sách ChiTietDonHang liên quan đến DonHang
      await editList(
        "http://localhost:8080/api/chitietdonhang/bulk",
        updatedChiTietDonHang.map((item) => ({
          ...item,
          maDonHang: updatedDonHang.maDonHang, // Đảm bảo mã đơn hàng được gán chính xác
        })),
        setError
      );

      console.log(updatedHoaDon);
      if (isExport) {
        addHoaDon("http://localhost:8080/api/hoadon", updatedHoaDon);
      }

      // Refetch danh sách đơn hàng
      await fetchData(
        "http://localhost:8080/api/donhang",
        setDonHangList,
        setLoadingDonHang,
        setError
      );
      setLoadingDonHang(false);
      setSnackbar({
        open: true,
        message: "Cập nhật thành công!",
        type: "success",
      });
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa đơn hàng hoặc chi tiết:", error);
      setSnackbar({
        open: true,
        message: "Lỗi khi chỉnh sửa dữ liệu.",
        type: "error",
      });
    }
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
        { header: "Trạng Thái Giao Hàng", key: "trangThaiGiaoHang" },
        { header: "Tổng Giá", key: "tongGia" },
      ],
      "DanhSachDonHang.xlsx"
    );
  };

  // Render giao diện
  if (loadingDonHang || loadingKhachHang || loadingSanPham) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      <CommonToolbar
        onAdd={() => {
          setExport(false);
          handleOpenDialog();
        }}
        onSearch={(keyword) => setSearch(keyword.trim())}
        onExport={handleExport}
        quyenThem={quyen?.create}
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
          handleOpenDialog(donHang);
        }}
        onDelete={handleDelete}
        getChiTietDonHang={getChiTietDonHang}
        chiTietDonHang={expandedChiTiet}
        setExport={setExport}
        quyen={quyen}
      />

      <DonHangDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSave={
          editDonHang
            ? (data) =>
                handleEdit(
                  editDonHang.maDonHang,
                  data.donHang,
                  data.chiTietDonHang,
                  data.sanPhamList,
                  data.hoaDon
                )
            : (donHangData, chiTietData, sanPhamData) =>
                handleAdd(donHangData, chiTietData, sanPhamData)
        }
        donHang={editDonHang}
        chiTietDonHang={currentChiTietDonHang}
        title={title}
        khachHangList={khachHangList}
        sanPhamList={dialogSanPhamList}
        setSanPhamList={setDialogSanPhamList}
        setSnackbar={setSnackbar}
        isExport={isExport}
        KhuyenMaiList={KhuyenMaiList}
        setTitle={setTitle}
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
