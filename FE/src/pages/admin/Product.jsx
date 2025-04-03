import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const Products = () => {
  const products = [
    { id: 1, name: "Sản phẩm 1", price: "100,000 VND", status: "Còn hàng" },
    { id: 2, name: "Sản phẩm 2", price: "200,000 VND", status: "Hết hàng" },
    { id: 3, name: "Sản phẩm 3", price: "150,000 VND", status: "Còn hàng" },
  ];

  return (
    <TableContainer component={Paper}>
      <h1 style={{ padding: "16px", textAlign: "center" }}>Quản trị - Products</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" style={{ marginRight: "8px" }}>
                  Sửa
                </Button>
                <Button variant="contained" color="secondary">
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Products;