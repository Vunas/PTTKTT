import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Input,
} from "@mui/material";
import NhapKhoDialog from "../../components/Dialog/NhapKhoDialog";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import CapNhatNhapKhoDialog from "../../components/Dialog/CapNhatNhapKhoDialog";

const NhapKho = ({ quyen }) => {
  const [importReceipts, setImportReceipts] = useState([]); // Danh sách phiếu nhập kho
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredReceipts, setFilteredReceipts] = useState(importReceipts);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null); // Phiếu nhập được chọn để chỉnh sửa

  useEffect(() => {
    setFilteredReceipts(importReceipts);
  }, [importReceipts]);

  const handleSearchReceipts = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredReceipts = importReceipts.filter(
      (receipt) =>
        receipt.tenPhieu.toLowerCase().trim().includes(query) ||
        receipt.maPhieu.toLowerCase().trim().includes(query)
    );
    setFilteredReceipts(filteredReceipts);
  };

  const handleEditReceipt = (receipt) => {
    setSelectedReceipt(receipt);
    setOpenEditDialog(true);
  };

  const getTrangThaiText = (trangThai) => {
    switch (trangThai) {
      case "DAT_HANG":
        return "Đặt hàng";
      case "NHAP_KHO":
        return "Nhập kho";
      case "HUY":
        return "Hủy";
      default:
        return "Không xác định";
    }
  };

  const getTrangThaiStyle = (trangThai) => {
    switch (trangThai) {
      case "DAT_HANG":
        return "px-3 py-1 rounded-full text-blue-700 bg-blue-100 border border-blue-400 text-sm font-semibold";
      case "NHAP_KHO":
        return "px-3 py-1 rounded-full text-green-700 bg-green-100 border border-green-400 text-sm font-semibold";
      case "HUY":
        return "px-3 py-1 rounded-full text-red-700 bg-red-100 border border-red-400 text-sm font-semibold";
      default:
        return "px-3 py-1 rounded-full text-gray-700 bg-gray-100 border border-gray-400 text-sm font-semibold";
    }
  };

  // Lấy danh sách phiếu nhập từ server khi component mount
  const fetchReceipts = () => {
    fetch("http://localhost:8080/api/phieu-nhap")
      .then((res) => res.json())
      .then((data) => {
        setImportReceipts(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách phiếu nhập:", error);
      });
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="text-xl font-semibold">Danh sách phiếu nhập kho</div>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Tìm kiếm theo Mã phiếu hoặc Tên phiếu"
          className="w-96"
          onChange={(e) => handleSearchReceipts(e)}
        />
        {quyen?.create && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Thêm phiếu nhập
          </Button>
        )}
      </div>

      <NhapKhoDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          // Có thể reload lại danh sách nếu cần sau khi thêm thành công
        }}
      />

      {selectedReceipt && (
        <CapNhatNhapKhoDialog
          open={openEditDialog}
          onClose={() => {
            setOpenEditDialog(false);
            setSelectedReceipt(null);
          }}
          phieuNhap={selectedReceipt}
        />
      )}

      <Card className="mt-4">
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thời gian tạo</TableCell>
                <TableCell>Mã phiếu</TableCell>
                <TableCell>Loại phiếu</TableCell>
                <TableCell>Tên phiếu</TableCell>
                <TableCell>Tên nhà cung cấp</TableCell>
                <TableCell>Giá trị nhập</TableCell>
                <TableCell>Người tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReceipts.map((phieu) => {
                const tongGiaTri =
                  phieu.chiTiet?.reduce(
                    (sum, item) => sum + item.soLuong * item.giaNhap,
                    0
                  ) || 0;

                return (
                  <TableRow key={phieu.id}>
                    <TableCell>
                      {dayjs(phieu.thoiGianTao).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>{phieu.maPhieu}</TableCell>
                    <TableCell>Nhập kho</TableCell>
                    <TableCell>{phieu.tenPhieu}</TableCell>
                    <TableCell>
                      {phieu.nhaCungCap?.tenNhaCungCap || "N/A"}
                    </TableCell>
                    <TableCell>{tongGiaTri.toLocaleString()} đ</TableCell>
                    <TableCell>{phieu.nguoiNhap?.hoTen || "N/A"}</TableCell>
                    <TableCell>
                      <span className={getTrangThaiStyle(phieu.trangThai)}>
                        {getTrangThaiText(phieu.trangThai)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {phieu.trangThai === "DAT_HANG" && (
                        <IconButton
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => handleEditReceipt(phieu)}
                        >
                          <CreateIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NhapKho;
