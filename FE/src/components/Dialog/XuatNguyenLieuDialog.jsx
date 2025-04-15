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
  TextField
} from "@mui/material";

const XuatNguyenLieuDialog = ({ open, onClose, onConfirm, defaultSelected }) => {
  const [selected, setSelected] = useState([]);
  const [nguyenLieuList, setNguyenLieuList] = useState([]);
  const [quantities, setQuantities] = useState({});


  // Gọi API để lấy danh sách nguyên liệu
  useEffect(() => {
    fetch("http://localhost:8080/api/nguyenlieu")
      .then((response) => response.json())
      .then((data) => {
        setNguyenLieuList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Đồng bộ nguyên liệu đã chọn nếu có
  useEffect(() => {
    const selectedIds = defaultSelected.map((item) => item.maNguyenLieu);
    setSelected(selectedIds);
  }, [defaultSelected]);

  const handleToggle = (maNguyenLieu) => {
    setSelected((prev) => {
      const newSelected = prev.includes(maNguyenLieu)
        ? prev.filter((id) => id !== maNguyenLieu)
        : [...prev, maNguyenLieu];
  
      // Nếu thêm mới thì set số lượng mặc định là 1
      if (!prev.includes(maNguyenLieu)) {
        setQuantities((prevQty) => ({ ...prevQty, [maNguyenLieu]: 1 }));
      } else {
        setQuantities((prevQty) => {
          const newQty = { ...prevQty };
          delete newQty[maNguyenLieu];
          return newQty;
        });
      }
  
      return newSelected;
    });
  };

  const handleConfirm = () => {
    const selectedIngredients = nguyenLieuList
    .filter((item) => selected.includes(item.maNguyenLieu))
    .map((item) => ({
      ...item,
      soLuong: quantities[item.maNguyenLieu] || 1, // Đảm bảo số lượng
    }));

    const uniqueIngredients = selectedIngredients.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.maNguyenLieu === value.maNguyenLieu)
    );

    onConfirm(uniqueIngredients); // Gọi lại onConfirm với danh sách đã lọc
    onClose(); // Đóng modal
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chọn nguyên liệu</DialogTitle>
      <DialogContent dividers>
      <List>
      {nguyenLieuList.map((item) => (
        <ListItem key={item.maNguyenLieu} disablePadding>
          <ListItemButton onClick={() => handleToggle(item.maNguyenLieu)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected.includes(item.maNguyenLieu)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
                          primary={item.ten}
                          secondary={`${item.donVi} - ${item.giaNhap.toLocaleString()} đ`}
                        />
          </ListItemButton>

          {selected.includes(item.maNguyenLieu) && (
            <TextField
              type="number"
              size="small"
              value={quantities[item.maNguyenLieu] || 1}
              onChange={(e) =>
                setQuantities((prev) => ({
                  ...prev,
                  [item.maNguyenLieu]: parseInt(e.target.value) || 1,
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

export default XuatNguyenLieuDialog;