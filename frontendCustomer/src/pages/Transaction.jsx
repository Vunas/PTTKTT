import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar"; // Đảm bảo đã import Navbar
import { ToastContainer, toast } from "react-toastify"; // Nếu cần thông báo
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

const Transaction = () => {
  // Lấy trực tiếp dữ liệu cart từ store
  const cartItems = useSelector((state) => state.cart.cart) || [];
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  
  const [userInfo, setUserInfo] = useState(() => {
      const user = localStorage.getItem("taiKhoan");
      return user ? JSON.parse(user) : null;
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const [form, setForm] = useState({
    hoTen: "",
    gioiTinh: "",
    soDienThoai: "",
    diaChi: "",
    paymentMethod: "Tiền mặt",
    ghiChu: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newKhachHang = {
      hoTen: form.hoTen,
      gioiTinh: form.gioiTinh,
      soDienThoai: form.soDienThoai,
      email: userInfo.email,
      diaChi: form.diaChi,
      trangThai: 1,
      ngayTao: new Date().toISOString().split("T")[0]
    };

    try {
      // 1. Kiểm tra hoặc tạo khách hàng
      const checkRes = await fetch(
        `http://localhost:8080/api/khachhang/find?email=${form.email}&soDienThoai=${form.soDienThoai}`
      );

      let khachHangData = null;

      if (checkRes.ok) {
        khachHangData = await checkRes.json();
      } else {
        const resKhachHang = await fetch("http://localhost:8080/api/khachhang", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newKhachHang),
        });

        if (!resKhachHang.ok) throw new Error("Không thể tạo khách hàng");

        khachHangData = await resKhachHang.json();
        localStorage.setItem("khachHang", JSON.stringify(khachHangData));
      }
  
      // 2. Tạo đơn hàng
      const donHangData = {
        maKhachHang: khachHangData.maKhachHang,
        ngayDat: new Date().toISOString().slice(0, 16),
        trangThaiGiaoHang: "Đã đặt",
        tongGia: totalPrice,
        diaChiGiaoHang: form.diaChi,
        phuongThucThanhToan: form.paymentMethod,
        ghiChu: form.ghiChu || "",
        trangThai: 1
      };
  
      const resDonHang = await fetch("http://localhost:8080/api/donhang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donHangData),
      });
  
      if (!resDonHang.ok) throw new Error("Không thể tạo đơn hàng");
  
      const donHang = await resDonHang.json();
      const maDonHangMoi = donHang.maDonHang;
  
      // 3. Tạo danh sách chi tiết đơn hàng
      const chiTietList = cartItems.map(item => ({
        maDonHang: maDonHangMoi,
        maSanPham: item.id,
        soLuong: item.qty,
        donGia: item.price,
        thanhTien: item.qty * item.price,
        trangThai: 1
      }));

      const resChiTiet = await fetch("http://localhost:8080/api/chitietdonhang/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chiTietList),
      });
  
      if (!resChiTiet.ok) throw new Error("Không thể tạo chi tiết đơn hàng");
      toast.success("Đặt hàng thành công!", { position: "top-right", autoClose: 2000 });
      dispatch(clearCart());
      setButtonDisabled(true);
      setTimeout(() => navigate("/"), 2000);

    } catch (error) {
      console.error("Lỗi submit:", error);
      toast.error("Lỗi xử lý đơn hàng: " + error.message, { position: "top-right" });
    }
  };  
  

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-28">
        <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md"
        >
          {/* Các trường nhập liệu thông tin cá nhân */}
          <div className="flex flex-col">
            <label htmlFor="hoTen" className="font-medium text-sm mb-1">Họ và tên</label>
            <input
              id="hoTen"
              name="hoTen"
              type="text"
              value={form.hoTen}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gioiTinh" className="font-medium text-sm mb-1">Giới tính</label>
            <select
              id="gioiTinh"
              name="gioiTinh"
              value={form.gioiTinh}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="soDienThoai" className="font-medium text-sm mb-1">Số điện thoại</label>
            <input
              id="soDienThoai"
              name="soDienThoai"
              type="tel"
              value={form.soDienThoai}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium text-sm mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={userInfo.email}
            disabled
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="diaChi" className="font-medium text-sm mb-1">Địa chỉ</label>
            <input
              id="diaChi"
              name="diaChi"
              type="text"
              value={form.diaChi}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              required
            />
          </div>

        <div className="flex flex-col md:col-span-2">
          <label htmlFor="ghiChu" className="font-medium text-sm mb-1">Ghi chú</label>
          <input
            id="ghiChu"
            name="ghiChu"
            type="text"
            value={form.ghiChu}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>


        {/* Chọn phương thức thanh toán */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="paymentMethod" className="font-medium text-sm mb-1">Phương thức thanh toán</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="Tiền mặt">Thanh toán khi nhận hàng</option>
            <option value="Thẻ ngân hàng">Thanh toán thẻ ngân hàng</option>
            <option value="Ví điện tử">Thanh toán ví điện tử</option>
          </select>
        </div>


          {/* Chọn phương thức thanh toán */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="paymentMethod" className="font-medium text-sm mb-1">Phương thức thanh toán</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="Tiền mặt">Thanh toán khi nhận hàng</option>
              <option value="Thẻ ngân hàng">Thanh toán thẻ ngân hàng</option>
              <option value="Ví điện tử">Thanh toán ví điện tử</option>
            </select>
          </div>

          {/* Danh sách sản phẩm đã chọn */}
          <div className="md:col-span-2 mt-4">
            <h2 className="font-semibold text-lg mb-2">Sản phẩm đã chọn</h2>
            {cartItems.length === 0 ? (
              <p>Không có sản phẩm trong giỏ hàng.</p>
            ) : (
              <ul className="space-y-2">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between border-b pb-2">
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span>{(item.price * item.qty).toLocaleString()} đ</span>
                  </li>
                ))}
                <li className="flex justify-between font-bold mt-2">
                  <span>Tổng cộng:</span>
                  <span>{totalPrice.toLocaleString()} đ</span>
                </li>
              </ul>
            )}
          </div>

        {/* Submit button */}
        <div className="md:col-span-2 flex justify-center">
          {!buttonDisabled && (
        <button
          type="submit"
          className="bg-yellow text-white py-2 px-6 rounded-lg"
        >
          Xác nhận đơn hàng
        </button>
      )}
        </div>
      </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Transaction;