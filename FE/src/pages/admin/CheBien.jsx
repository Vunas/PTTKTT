import React, { useEffect, useState } from "react";
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, Input, IconButton } from "@mui/material";
import PhieuCheBienDialog from "../../components/Dialog/PhieuCheBienDialog";
import dayjs from "dayjs";
import VisibilityIcon from '@mui/icons-material/Visibility';

const PhieuCheBien = () => {
  const [cheBienReceipts, setCheBienReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = () => {
    fetch("http://localhost:8080/api/chebien")
      .then((res) => res.json())
      .then((data) => {
        setCheBienReceipts(data);
        setFilteredReceipts(data);
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách phiếu chế biến:", error));
  };

  const handleSearchReceipts = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredReceipts(
      cheBienReceipts.filter(
        (receipt) => receipt.maCheBien.toString().includes(query) || receipt.nguoiCheBien?.hoTen?.toLowerCase().includes(query)
      )
    );
  };

  const handleAddReceipt = () => {
    setSelectedReceipt(null);
    setOpenDialog(true);
  };

  const handleEditReceipt = (receipt) => {
    setSelectedReceipt(receipt);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReceipt(null);
    fetchReceipts();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="text-xl font-semibold">Danh sách phiếu chế biến</div>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Tìm kiếm theo Mã phiếu hoặc Tên người chế biến"
          className="w-96"
          onChange={handleSearchReceipts}
        />
        <Button variant="contained" color="primary" onClick={handleAddReceipt}>
          Thêm phiếu chế biến
        </Button>
      </div>

      <PhieuCheBienDialog open={openDialog} onClose={handleCloseDialog} cheBien={selectedReceipt} />

      <Card className="mt-4">
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thời gian tạo</TableCell>
                <TableCell>Mã phiếu</TableCell>
                <TableCell>Người chế biến</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReceipts.map((phieu) => (
                <TableRow key={phieu.maCheBien}>
                  <TableCell>{dayjs(phieu.ngayCheBien).format("DD/MM/YYYY HH:mm")}</TableCell>
                  <TableCell>{phieu.maCheBien}</TableCell>
                  <TableCell>{phieu.nguoiCheBien?.hoTen || "N/A"}</TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full text-gray-700 bg-gray-100 border border-gray-400 text-sm font-semibold">
                      {phieu.trangThai}
                    </span>
                  </TableCell>
                  <TableCell>
                    <IconButton variant="outlined" size="small" color="primary" onClick={() => handleEditReceipt(phieu)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhieuCheBien;