import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OrderDetails from "./OrderDetails";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maKhachHang, setMaKhachHang] = useState(null);
	

	const [selectedOrder, setSelectedOrder] = useState(null);

	const handleOpenModal = (order) => {
		setSelectedOrder(order);
	};

	const handleCloseModal = () => {
		setSelectedOrder(null);
	};

	const handleCancelOrder = async (orderId) => {
		if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
	
		try {
			await axios.put(`http://localhost:8080/api/donhang/huydon/${orderId}`);
			alert("Hủy đơn thành công!");
			// Cập nhật danh sách đơn hàng sau khi hủy
			setOrders(prev =>
				prev.map(order =>
					order.maDonHang === orderId
						? { ...order, trangThai: 0 }
						: order
				)
			);
		} catch (err) {
			alert("Hủy đơn thất bại.");
		}
	};

  // Lấy thông tin khách hàng từ localStorage
  const user = JSON.parse(localStorage.getItem("khachHang"));

  // Lấy danh sách đơn hàng của khách hàng theo mã khách hàng
  useEffect(() => {
		const user = JSON.parse(localStorage.getItem("khachHang"));
	
		if (!user || !user.maKhachHang) {
			toast.warning("Không tìm thấy thông tin tài khoản");
			setLoading(false);
			return;
		}
	
		const fetchOrders = async () => {
			try {
				const res = await axios.get("http://localhost:8080/api/donhang");
				const userOrders = res.data.filter((order) => order?.maKhachHang === user.maKhachHang);
				setOrders(userOrders);
			} catch (err) {
				toast.error("Không thể tải danh sách đơn hàng");
			} finally {
				setLoading(false);
			}
		};
	
		fetchOrders();
	}, []); 

  if (!user)
    return <div className="p-4 pt-28">Vui lòng đăng nhập để xem đơn hàng.</div>;

  return (
		<div>
		<div className="pl-10 pt-10">
			<Link to="/" >
				<p className="ml-10">← Quay về trang chủ</p>
			</Link>
		</div>
	<div className="max-w-full mx-auto p-4 pt-28">
		
  <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">
    Đơn hàng của bạn
  </h2>

  {orders.length === 0 ? (
    <p className="text-center text-black text-xl font-serif">
      Bạn chưa có đơn hàng nào.
    </p>
  ) : (
    <div className="gap-6 flex flex-col ml-10 mr-10">
      {orders.map((order) => (
        <div
          key={order.maDonHang}
          className="bg-gradient-to-r from-blue-500 to-purple-600 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 w-full transform hover:scale-105 hover:from-purple-600 hover:to-blue-500"
        >
          <div className="space-y-3 font-serif">
            <p>
              <span className="font-semibold text-black">Mã đơn hàng:</span>{" "}
              <span className="text-yellow-300">{order.maDonHang}</span>
            </p>
            <p>
              <span className="font-semibold text-black">Ngày đặt:</span>{" "}
              <span className="text-yellow-300">
								{order.ngayDat}
              </span>
            </p>
            <p>
              <span className="font-semibold text-yellow-100">Trạng thái:</span>{" "}
              <span
                className={`${
                  order.trangThaiGiaoHang === "Đã hủy"
                    ? "text-red-300"
                    : order.trangThaiGiaoHang === "Đã giao"
                    ? "text-blue-300"
                    : "text-green-800"
                } font-bold`}
              >
                {order.trangThaiGiaoHang}
              </span>
            </p>
            <p>
              <span className="font-semibold text-yellow-100">Tổng tiền:</span>{" "}
              <span className="text-black">
                {order.tongGia?.toLocaleString("vi-VN")}₫
              </span>
            </p>
          </div>
					
					<div className="justify-end gap-3 flex flex-row">
					<button
						onClick={() => handleOpenModal(order)}
						className="mt-4 px-3 py-1 text-sm justify-end inline-block bg-yellow hover:bg-yellow-600 text-black hover:text-white font-semibold rounded-lg transition duration-300"
					>
						Xem chi tiết
					</button>
					<button
						onClick={() => handleCancelOrder(order.maDonHang)}
						className="mt-4 px-3 py-1 text-sm justify-end inline-block bg-yellow hover:bg-yellow-600 text-black hover:text-white font-semibold rounded-lg transition duration-300"
					>
						Hủy đơn
					</button>
					</div>
        </div>
      ))}
    </div>
  )}
	{selectedOrder && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl w-full relative">
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl"
      >
        &times;
      </button>

      <h3 className="text-2xl font-bold text-center mb-4 text-purple-600">
        Chi tiết đơn hàng #{selectedOrder.maDonHang} 
      </h3>

      <div className="space-y-2 text-black font-serif">
				<OrderDetails orderId={selectedOrder.maDonHang}/>
      </div>

      {/* Nếu bạn có danh sách sản phẩm trong selectedOrder.sanPhamList */}
      {/* {selectedOrder.sanPhamList && (
				
				<div className="mt-4">
					<h4 className="text-md font-semibold mb-2 text-purple-600">
						Sản phẩm đã mua:
					</h4>
					<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 max-h-40 overflow-y-auto">
						{selectedOrder.sanPhamList.map((item, index) => (
							<li key={index}>
								{item.tenNguyenLieu} - SL: {item.soLuong} - Đơn giá:{" "}
								{item.donGia?.toLocaleString("vi-VN")}₫
							</li>
						))}
						
					</ul>
					
					<OrderDetails orderId={selectedOrder.maDonHang}/>

				</div>
			)} */}
				</div>
			</div>
			
		)}
	</div>
</div>

      
  );
};

export default Orders;
