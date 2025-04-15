import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Radio,
} from "@mui/material";

const NhapNhaCungCapDialog = ({ open, onClose, onConfirm, defaultSelected }) => {
  const [selected, setSelected] = useState(null);
  const [nhaCungCap, setNhaCungCap] = useState([]);

  // Gọi API để lấy danh sách nhà cung cấp
  useEffect(() => {
    fetch("http://localhost:8080/api/nhacungcap")
      .then((response) => response.json())
      .then((data) => setNhaCungCap(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Đồng bộ dữ liệu được chọn nếu có
  useEffect(() => {
    if (Array.isArray(defaultSelected) && defaultSelected.length > 0) {
      setSelected(defaultSelected[0].maNhaCungCap);
    }
  }, [defaultSelected]);

  const handleToggle = (maNhaCungCap) => {
    setSelected(maNhaCungCap); // Chỉ giữ 1 mã được chọn
  };

  const handleConfirm = () => {
    const selectedSupplier = nhaCungCap.find(
      (item) => item.maNhaCungCap === selected
    );
    if (selectedSupplier) {
      onConfirm([selectedSupplier]); // vẫn trả về mảng để giữ định dạng đồng nhất
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chọn nhà cung cấp</DialogTitle>
      <DialogContent dividers>
        <List>
          {nhaCungCap.map((item) => (
            <ListItem key={item.maNhaCungCap} disablePadding>
              <ListItemButton onClick={() => handleToggle(item.maNhaCungCap)}>
                <ListItemIcon>
                  <Radio
                    edge="start"
                    checked={selected === item.maNhaCungCap}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.ten}
                  secondary={`${item.maNhaCungCap} - ${item.tenNhaCungCap}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleConfirm} variant="contained" disabled={!selected}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NhapNhaCungCapDialog;