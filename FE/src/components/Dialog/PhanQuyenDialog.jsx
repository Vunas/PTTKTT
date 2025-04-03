import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";

const PhanQuyenDialog = ({ open, onClose, onSave, title, phanQuyen }) => {
  const [tenQuyen, setTenQuyen] = useState(""); // Role name
  const [DanhSachChucNang, setDanhSachChucNang] = useState({}); // Permissions object

  // Parse permissions string when the dialog is opened
  useEffect(() => {
    console.log("Dữ liệu được truyền vào Dialog:", phanQuyen); // Kiểm tra dữ liệu
    if (phanQuyen) {
      setTenQuyen(phanQuyen.tenQuyen || "");
      const parsedPermissions = parsePermissionsString(
        phanQuyen.danhSachChucNang || ""
      );
      setDanhSachChucNang(parsedPermissions);
    } else {
      setTenQuyen("");
      setDanhSachChucNang({
        KhachHang: { truyCap: false, them: false, sua: false, xoa: false },
        NhanVien: { truyCap: false, them: false, sua: false, xoa: false },
        TaiKhoan: { truyCap: false, them: false, sua: false, xoa: false },
      });
    }
  }, [phanQuyen]);

  // Parse permissions string into an object
  const parsePermissionsString = (permissionsString) => {
    if (!permissionsString || typeof permissionsString !== "string") {
      console.warn("DanhSachChucNang không hợp lệ:", permissionsString);
      return {};
    }
    const permissions = {};
    permissionsString.split(";").forEach((entry) => {
      const [category, actions] = entry.split(":");
      if (category && actions) {
        const actionsArray = actions.split(",").map((action) => action.trim());
        permissions[category.trim()] = {
          truyCap: actionsArray.includes("access"),
          them: actionsArray.includes("create"),
          sua: actionsArray.includes("fix"),
          xoa: actionsArray.includes("delete"),
        };
      }
    });
    return permissions;
  };

  // Convert permissions object into string format
  const generatePermissionsString = (permissionsObject) => {
    // Kiểm tra xem đầu vào có hợp lệ không
    if (!permissionsObject || typeof permissionsObject !== "object") {
      return ""; // Nếu null hoặc undefined, trả về chuỗi trống
    }

    const entries = Object.entries(permissionsObject).map(
      ([category, actions]) => {
        const selectedActions = [];
        if (actions.truyCap) selectedActions.push("access");
        if (actions.them) selectedActions.push("create");
        if (actions.sua) selectedActions.push("fix");
        if (actions.xoa) selectedActions.push("delete");

        // Nếu không có hành động nào được chọn, vẫn trả về `category:`
        return `${category}: ${selectedActions.join(", ")}`;
      }
    );

    // Kết hợp các danh mục thành chuỗi với dấu chấm phẩy
    return entries.join("; ");
  };

  // Toggle permissions for categories and actions
  const handlePermissionChange = (category, action) => {
    setDanhSachChucNang((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [action]: !prev[category][action],
      },
    }));
  };

  // Save handler
  const handleSave = () => {
    const permissionsString = generatePermissionsString(DanhSachChucNang);
    const data = { maPhanQuyen: phanQuyen?.maPhanQuyen || null, tenQuyen, danhSachChucNang: permissionsString };
    onSave(data); // Pass data to parent
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Input field for role name */}
        <TextField
          label="Tên Quyền"
          fullWidth
          margin="dense"
          value={tenQuyen}
          onChange={(e) => setTenQuyen(e.target.value)}
        />
        {/* Permissions table */}
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#e0f7fa" }}>
                <TableCell align="center">
                  <strong>Trang/Quyền</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Truy Cập</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Thêm</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Sửa</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Xóa</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(DanhSachChucNang).map((category) => (
                <TableRow key={category}>
                  <TableCell align="center">{category}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={DanhSachChucNang[category]?.truyCap || false}
                      onChange={() =>
                        handlePermissionChange(category, "truyCap")
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={DanhSachChucNang[category]?.them || false}
                      onChange={() => handlePermissionChange(category, "them")}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={DanhSachChucNang[category]?.sua || false}
                      onChange={() => handlePermissionChange(category, "sua")}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={DanhSachChucNang[category]?.xoa || false}
                      onChange={() => handlePermissionChange(category, "xoa")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhanQuyenDialog;
