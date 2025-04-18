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
  Checkbox,
  ListItemIcon,
  ListItemButton,
  TextField,
} from "@mui/material";

const NhapSanPhamDialog = ({ open, onClose, onConfirm, defaultSelected }) => {
  const [selected, setSelected] = useState([]);
  const [sanPhamList, setSanPhamList] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    fetch("http://localhost:8080/api/sanpham")
      .then((response) => response.json())
      .then((data) => {
        setSanPhamList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Đồng bộ sản phẩm đã chọn nếu có
  useEffect(() => {
    const selectedIds = defaultSelected.map((item) => item.maSanPham);
    setSelected(selectedIds);
  }, [defaultSelected]);

  const handleToggle = (maSanPham) => {
    setSelected((prev) => {
      const newSelected = prev.includes(maSanPham)
        ? prev.filter((id) => id !== maSanPham)
        : [...prev, maSanPham];

      // Nếu thêm mới thì set số lượng mặc định là 1
      if (!prev.includes(maSanPham)) {
        setQuantities((prevQty) => ({ ...prevQty, [maSanPham]: 1 }));
      } else {
        setQuantities((prevQty) => {
          const newQty = { ...prevQty };
          delete newQty[maSanPham];
          return newQty;
        });
      }

      return newSelected;
    });
  };

  const handleConfirm = () => {
    const selectedProducts = sanPhamList
      .filter((item) => selected.includes(item.maSanPham))
      .map((item) => ({
        ...item,
        soLuong: quantities[item.maSanPham] || 1,
      }));

    onConfirm(selectedProducts);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chọn sản phẩm</DialogTitle>
      <DialogContent dividers>
        <List>
          {sanPhamList.map((item) => (
            <ListItem key={item.maSanPham} disablePadding>
              <ListItemButton onClick={() => handleToggle(item.maSanPham)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selected.includes(item.maSanPham)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.tenSanPham}
                  secondary={`${item.giaBan.toLocaleString()} đ`}
                />
              </ListItemButton>

              {selected.includes(item.maSanPham) && (
                <TextField
                  type="number"
                  size="small"
                  value={quantities[item.maSanPham] || 1}
                  onChange={(e) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item.maSanPham]: parseInt(e.target.value) || 1,
                    }))
                  }
                  inputProps={{ min: 1 }}
                  style={{ width: 80, marginRight: 16 }}
                  label="Số lượng"
                />
              )}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NhapSanPhamDialog;