import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const QuyenDetails = ({ selectedQuyen }) => {
  return (
    <div className="p-4">
      {selectedQuyen ? (
        <Box>
          <Typography variant="h6" component="h2" className="font-bold mb-4">
            Chi tiết quyền: {selectedQuyen.tenQuyen}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell className="p-2 font-bold">Trang/Quyền</TableCell>
                  <TableCell className="p-2 font-bold text-center">Truy Cập</TableCell>
                  <TableCell className="p-2 font-bold text-center">Thêm</TableCell>
                  <TableCell className="p-2 font-bold text-center">Sửa</TableCell>
                  <TableCell className="p-2 font-bold text-center">Xóa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedQuyen.danhSachChucNang.split(";").map((entry) => {
                  const [category, actions] = entry.split(":");
                  const actionsArray = actions ? actions.split(",").map((action) => action.trim()) : [];
                  return (
                    <TableRow key={category}>
                      <TableCell className="p-2">{category.trim()}</TableCell>
                      <TableCell className="p-2 text-center">
                        {actionsArray.includes("access") ? "Có" : "Không"}
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        {actionsArray.includes("create") ? "Có" : "Không"}
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        {actionsArray.includes("fix") ? "Có" : "Không"}
                      </TableCell>
                      <TableCell className="p-2 text-center">
                        {actionsArray.includes("delete") ? "Có" : "Không"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box textAlign="center" className="text-center">
          <Typography variant="body1">Chọn một quyền để xem chi tiết</Typography>
        </Box>
      )}
    </div>
  );
};

export default QuyenDetails;