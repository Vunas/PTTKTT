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
import dayjs from "dayjs";
import XuatKhoDialog from "../../components/Dialog/XuatKhoDialog";

const XuatKho = ({ quyen }) => {
  const [importReceipts, setImportReceipts] = useState([]); // Danh sách phiếu xuất kho
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredReceipts, setFilteredReceipts] = useState(importReceipts);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null); // Phiếu xuất được chọn để chỉnh sửa

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

  // const handleEditReceipt = (receipt) => {
  //   setSelectedReceipt(receipt);
  //   setOpenEditDialog(true);
  // };

  const getTrangThaiStyle = () => {
    return "px-3 py-1 rounded-full text-blue-700 bg-blue-100 border border-blue-400 text-sm font-semibold";
  };

  // Lấy danh sách phiếu xuất từ server khi component mount
  const fetchReceipts = () => {
    fetch("http://localhost:8080/api/phieu-xuat")
      .then((res) => res.json())
      .then((data) => {
        setImportReceipts(data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách phiếu xuất:", error);
      });
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="text-xl font-semibold">Danh sách phiếu xuất kho</div>
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
            Thêm phiếu xuất
          </Button>
        )}
      </div>

      <XuatKhoDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          // Có thể reload lại danh sách nếu cần sau khi thêm thành công
        }}
      />

      {selectedReceipt && (
        <CapNhatXuatKhoDialog
          open={openEditDialog}
          onClose={() => {
            setOpenEditDialog(false);
            setSelectedReceipt(null);
          }}
          phieuXuat={selectedReceipt}
        />
      )}

      <Card className="mt-4">
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thời gian tạo</TableCell>
                <TableCell>Mã phiếu</TableCell>
                <TableCell>Tên phiếu</TableCell>
                <TableCell>Tên kho</TableCell>
                {/* <TableCell>Giá trị xuất</TableCell> */}
                <TableCell>Người tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                {/* <TableCell>Hành động</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReceipts.map((phieu) => {
                return (
                  <TableRow key={phieu.id}>
                    <TableCell>
                      {dayjs(phieu.thoiGianTao).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell>{phieu.id}</TableCell>
                    <TableCell>{phieu.maPhieu}</TableCell>
                    {/* <TableCell>{phieu.tenPhieu}</TableCell> */}
                    <TableCell>{phieu.khoHang.tenKhoHang}</TableCell>
                    <TableCell>{phieu.nguoiXuat?.hoTen || "N/A"}</TableCell>
                    <TableCell>
                      <span className={getTrangThaiStyle()}>
                        Xuất kho
                      </span>
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

export default XuatKho;
