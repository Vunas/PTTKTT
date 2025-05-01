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

const NhapKhoHangDialog = ({ open, onClose, onConfirm, defaultSelected }) => {
  const [selected, setSelected] = useState(null);
  const [khoHang, setKhoHang] = useState([]);

  // Gọi API để lấy danh sách kho hàng
  useEffect(() => {
    fetch("http://localhost:8080/api/khohang")
      .then((response) => response.json())
      .then((data) => setKhoHang(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (Array.isArray(defaultSelected) && defaultSelected.length > 0) {
      setSelected(defaultSelected[0].maKhoHang);
    }
  }, [defaultSelected]);

  const handleToggle = (maKhoHang) => {
    setSelected(maKhoHang);
  };

  const handleConfirm = () => {
    const selectedWarehouse = khoHang.find(
      (item) => item.maKhoHang === selected
    );
    if (selectedWarehouse) {
        console.log(selectedWarehouse)
      onConfirm([selectedWarehouse]);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chọn kho hàng</DialogTitle>
      <DialogContent dividers>
        <List>
          {khoHang.map((item) => (
            <ListItem key={item.maKhoHang} disablePadding>
              <ListItemButton onClick={() => handleToggle(item.maKhoHang)}>
                <ListItemIcon>
                  <Radio
                    edge="start"
                    checked={selected === item.maKhoHang}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.tenKhoHang}
                  secondary={`${item.maKhoHang} - ${item.tenKhoHang}`}
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
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!selected}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NhapKhoHangDialog;
