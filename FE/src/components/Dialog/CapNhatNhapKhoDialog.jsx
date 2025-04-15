import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import NhapNguyenLieuDialog from "./NhapNguyenLieuDialog";
import NhapNhaCungCapDialog from "./NhapNhaCungCapDialog";
import { Snackbar, Alert } from "@mui/material";
import NhaCungCap from "../../pages/admin/NhaCungCap";


export default function CapNhatNhapKhoDialog({ open, onClose, phieuNhap }) {

	const [selectedPhieuNhap, setSelectedPhieuNhap] = useState(phieuNhap);
  const [note, setNote] = useState(phieuNhap.ghiChu || "");
  const [file, setFile] = useState(phieuNhap.fileChungTu || null);
  const [paymentRecorded, setPaymentRecorded] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);
  const [filteredIngredients, setFilteredIngredients] = useState(selectedIngredients);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [tenPhieuInput, setTenPhieuInput] = useState(phieuNhap.tenPhieu || "");
  const [maPhieuInput, setMaPhieuInput] = useState(phieuNhap.maPhieu || "");
	
	useEffect(() => {
		if (selectedPhieuNhap?.id) {
			fetch("http://localhost:8080/api/chi-tiet-phieu-nhap/list-get")
				.then((response) => response.json())
				.then((data) => {
          console.log("Filtered Data:", data);
					const filteredData = data
						.filter(item => item.phieuNhap?.id === selectedPhieuNhap.id)
						.map(item => ({
              id: item.id,
							maNguyenLieu: item.nguyenLieu.maNguyenLieu,
							ten: item.nguyenLieu.ten,
							donVi: item.nguyenLieu.donVi,
							hinhAnh: item.nguyenLieu.hinhAnh,
							soLuong: item.soLuong,
							giaNhap: item.giaNhap
						}));
            
					setSelectedIngredients(filteredData);
				})
				.catch((error) => {
					console.error("Error fetching data:", error);
				});
		}
	}, [selectedPhieuNhap]);
	
	useEffect(() => {
		if (selectedPhieuNhap?.nhaCungCap?.maNhaCungCap) {
			fetch(`http://localhost:8080/api/nhacungcap/${selectedPhieuNhap.nhaCungCap.maNhaCungCap}`)
				.then((res) => res.json())
				.then((data) => {
					setSelectedSupplier(data);
					// console.log("Data nhà cung cấp:", data);
				})
				.catch((err) => console.error("Lỗi khi lấy nhà cung cấp:", err));
		}
		
	}, [selectedPhieuNhap]);

	const handleOrder = async (trangThai = "DAT_HANG") => {
    if (!selectedSupplier || selectedIngredients.length === 0) {
      setErrorMessage("Vui lòng chọn đầy đủ nhà cung cấp và nguyên liệu.");
      setShowError(true);
      return;
    }
  
    const hasInvalidQty = selectedIngredients.some((item) => !item.soLuong || item.soLuong <= 0);
    if (hasInvalidQty) {
      setErrorMessage("Số lượng nguyên liệu phải lớn hơn 0.");
      setShowError(true);
      return;
    }
  
    const phieuNhap = {
      maPhieu: maPhieuInput,
      tenPhieu: tenPhieuInput,
      fileChungTu: file?.name || null,
      ghiChu: note,
      nhaCungCap: { maNhaCungCap: selectedSupplier.maNhaCungCap },
      trangThai,
			thoiGianTao: selectedPhieuNhap.thoiGianTao,
      thoiGianCapNhat: new Date().toISOString(),
      thoiGianHuy: null,
      nguoiNhap: {
        maNhanVien: 1, // hoặc id, tùy theo thuộc tính bạn dùng trong entity NhanVien
      }, 
      nguoiHuy: null
    };
  
    try {

      let response = await fetch(`http://localhost:8080/api/phieu-nhap/${selectedPhieuNhap.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(phieuNhap),
      });
  
      // Kiểm tra nếu phản hồi không thành công
      if (!response.ok) {
        throw new Error("Cập nhật phiếu nhập thất bại");
      }
  
      // Nhận phản hồi phiếu nhập đã cập nhật
      let updatedPhieuNhap = await response.json();
      setSelectedPhieuNhap(updatedPhieuNhap);
  
      // Kiểm tra sự hợp lệ của phản hồi
      if (!updatedPhieuNhap || !updatedPhieuNhap.id) {
        throw new Error("Dữ liệu phiếu nhập không hợp lệ.");
      }
      
      const params = new URLSearchParams();
      params.append("trangThai", phieuNhap.trangThai);
      params.append("nguoiNhapId", phieuNhap.nguoiNhap?.maNhanVien);

      if (phieuNhap.nguoiHuy?.maNhanVien) {
        params.append("nguoiHuyId", phieuNhap.nguoiHuy.maNhanVien);
      }

      response = await fetch(`http://localhost:8080/api/phieu-nhap/${selectedPhieuNhap.id}/trang-thai?${params.toString()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok){
        throw new Error("Cập nhật trạng thái phiếu nhập thất bại");
      }


      const message = await response.text();
      setSelectedPhieuNhap(updatedPhieuNhap);

      // Tạo danh sách chi tiết phiếu nhập
      const chiTietList = selectedIngredients.map((item) => ({
        id: item.id || null,
        phieuNhap: { id: updatedPhieuNhap.id }, // Dùng ID phiếu nhập mới
        nguyenLieu: { maNguyenLieu: item.maNguyenLieu },
        soLuong: item.soLuong,
        giaNhap: item.giaNhap,
      }));
  
      console.log("Chi tiết phiếu nhập: ", chiTietList);
  
      const chiTietResponse = await fetch("http://localhost:8080/api/chi-tiet-phieu-nhap/list-update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chiTietList),
      });

      // Kiểm tra phản hồi chi tiết phiếu nhập
      if (!chiTietResponse.ok) {
        throw new Error("Cập nhật chi tiết phiếu nhập thất bại");
      }
  
      const updatedChiTiet = await chiTietResponse.json();
      console.log("Chi tiết phản hồi: ", updatedChiTiet);
  
      // Cập nhật lại UI với thông tin mới
      setSelectedIngredients(updatedChiTiet); // Cập nhật lại state UI
      
      onClose(); // Đóng modal sau khi hoàn tất
  
    } catch (error) {
      setErrorMessage(`Lỗi: ${error.message}`);
      setShowError(true);
    }

	};
  
  useEffect(() => {
    setFilteredIngredients(selectedIngredients);
  }, [selectedIngredients]);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIngredientsDialogConfirm = (newSelectedList) => {
    setSelectedIngredients((prevList) => {
      const updatedList = [...prevList];
  
      newSelectedList.forEach((newItem) => {
        const index = updatedList.findIndex(item => item.maNguyenLieu === newItem.maNguyenLieu);
        if (index !== -1) {
          // Nếu đã có thì cập nhật số lượng
          updatedList[index].soLuong = newItem.soLuong;
        } else {
          // Nếu chưa có thì thêm mới
          updatedList.push(newItem);
        }
      });
      console.log(updatedList);
      return updatedList;
    });
  };

  const handleSuppliersDialogConfirm = (selected) => {
		setSelectedSupplier(selected[0]); // Cập nhật đối tượng nhà cung cấp duy nhất
  };

  const handleSearchIngredients = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredIngredients = selectedIngredients.filter(({ nguyenLieu }) =>
			nguyenLieu.ten.trim().toLowerCase().includes(query)
		);
    setFilteredIngredients(filteredIngredients);
  }
  
  const tongCong = filteredIngredients.reduce((tong, item) => {
    return tong + item.soLuong * item.giaNhap;
  }, 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="text-xl font-semibold">Thêm mới phiếu nhập</DialogTitle>
      <DialogContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 flex-grow mt-3">

          <TextField label="Mã phiếu" value={maPhieuInput} onChange={(e) => setMaPhieuInput(e.target.value)} disabled/>
          <TextField label="Tên phiếu" value={tenPhieuInput} onChange={(e) => setTenPhieuInput(e.target.value)}/>

          <div className="flex items-center gap-4">
            <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
              Tải file chứng từ
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {file && <Typography className="text-sm">{file.name}</Typography>}
          </div>

        </div>

        <div>
      
          <div className="justify-center items-center flex">
            <p className="text-lg font-semibold mb-4 mt-6">Nhà cung cấp</p>
          </div>

          <div className="flex items-center gap-8 mb-4 justify-end">
            <Button onClick={() => setSupplierDialogOpen(true)} variant="contained" color="primary"
            sx={{ textTransform: "none", px: "1rem", py: "1rem" }}>
              Nhập nhà cung cấp
            </Button>
          </div>

          <Paper variant="outlined">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Mã nhà cung cấp</TableCell>
                  <TableCell>Tên nhà cung cấp</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                </TableRow>
              </TableHead>
            
          <TableBody>
            {!selectedSupplier ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không có nhà cung cấp nào
                </TableCell>
              </TableRow>
            ) : (
              
                <TableRow key={selectedSupplier.maNhaCungCap}>
                  <TableCell>{selectedSupplier.maNhaCungCap}</TableCell>
                  <TableCell>{selectedSupplier.tenNhaCungCap}</TableCell>
                  <TableCell>{selectedSupplier.soDienThoai}</TableCell>
                  <TableCell>{selectedSupplier.email}</TableCell>
                  <TableCell>{selectedSupplier.diaChi}</TableCell>
                  <TableCell>{selectedSupplier.ngayTao}</TableCell>
                </TableRow>
              
            )}
            </TableBody>
            </Table>
          </Paper>

          <div className="justify-center items-center flex">
            <p className="text-lg font-semibold mb-4 mt-6 pt-8">Nguyên liệu</p>
          </div>

          <div className="flex gap-8 mb-4 justify-end">
            <TextField placeholder="Tìm nguyên liệu" className="flex-grow" onChange={(e) => {handleSearchIngredients(e)}}/>
            <Button onClick={() => setIngredientDialogOpen(true)} variant="contained" color="primary"
            sx={{ textTransform: "none", px: "1rem", py: "1rem" }}>
              Nhập nguyên liệu
            </Button>
              
          </div>
          
          <Paper variant="outlined">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Mã nguyên liệu</TableCell>
                  <TableCell>Tên nguyên liệu</TableCell>
                  <TableCell>Đơn vị</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Đơn giá</TableCell>
                  <TableCell>Hình ảnh</TableCell>
                </TableRow>
              </TableHead>
            
            <TableBody>
            {filteredIngredients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không có nguyên liệu nào
                </TableCell>
              </TableRow>
            ) : (
              filteredIngredients.map((item, index) => (
								<TableRow key={item.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{item.ten}</TableCell>
								<TableCell>{item.donVi}</TableCell>
								<TableCell>{item.soLuong}</TableCell>
								<TableCell>{item.giaNhap.toLocaleString()} đ</TableCell>
								<TableCell>
									<img
										src={item.hinhAnh}
										alt={item.ten}
										className="w-10 h-10 object-cover rounded"
									/>
									</TableCell>
								</TableRow>
              ))
            )}
            </TableBody>
          </Table>
        </Paper>
        
        <div className="flex mt-4 items-end justify-end">
          <p className="font-semibold text-xl text-green-700">TỔNG CỘNG: {tongCong.toLocaleString('vi-VN')} đ</p>
        </div>
        </div>

        <div className="flex items-center gap-4">
          <Typography>Ghi nhận thanh toán</Typography>
          <Switch
            checked={paymentRecorded}
            onChange={(e) => setPaymentRecorded(e.target.checked)}
          />
        </div>

        <TextField
          label="Ghi chú"
          placeholder="Nhập ghi chú"
          fullWidth
          multiline
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="outlined" onClick={() => handleOrder("DAT_HANG")}>Cập nhật</Button>
        <Button variant="contained" onClick={() => handleOrder("NHAP_KHO")}>Nhập kho</Button>
				<Button variant="contained" color="error" onClick={() => handleOrder("HUY")}>Hủy phiếu nhập</Button>
      </DialogActions>
			

      <NhapNguyenLieuDialog
        open={ingredientDialogOpen}
        onClose={() => setIngredientDialogOpen(false)}
        onConfirm={handleIngredientsDialogConfirm}
        defaultSelected={selectedIngredients}
      />
      
      <NhapNhaCungCapDialog
        open={supplierDialogOpen}
        onClose={() => setSupplierDialogOpen(false)}
        onConfirm={handleSuppliersDialogConfirm}
        defaultSelected={selectedSupplier ? [selectedSupplier] : []}
      />

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

    </Dialog>
  );
}

