import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ConfirmDialog from "../components/ConfirmDialog";
import OrderDetails from "../components/OrderDetails";
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maKhachHang, setMaKhachHang] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);  // Trạng thái dialog xác nhận hủy
  const [selectedOrder, setSelectedOrder] = useState(null);
	const [orderToCancel, setOrderToCancel] = useState(null);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const getStatusColor = (trangThai) => {
    if (trangThai === "Đã hủy") {
      return "text-red-700";
    } else if (trangThai === "Đã giao") {
      return "text-blue-700";
    } else {
      return "text-green-700";
    }
  };

  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
  };

  const handleConfirmCancel = async () => {
		try {
			await axios.put(`http://localhost:8080/api/donhang/huydon/${orderToCancel}`);
			toast.success("Hủy đơn thành công!");
			setOrders((prev) =>
				prev.map((order) =>
					order.maDonHang === orderToCancel
						? { ...order, trangThai: 0 }
						: order
				)
			);
		} catch (err) {
			toast.error("Hủy đơn thất bại.");
		}
		setOrderToCancel(null);           // Đóng ConfirmDialog
	};

  const handleCancel = () => {
    setIsCancelDialogOpen(false); // Đóng dialog nếu người dùng nhấn "Không"
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

	console.log(user);
	console.log(orders);

  if (!user)
    return <div className="p-4 pt-28">Vui lòng đăng nhập để xem đơn hàng.</div>;

  return (
    <div>
      <ToastContainer />
      <div className="pl-10 pt-10">
        <Link to="/">
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
                className="bg-gradient-to-r from-slate-50 to-orange-50 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 w-full transform hover:scale-105 hover:to-slate-100"
              >
                <div className="space-y-3 font-serif">
                  <p>
                    <span className="font-semibold text-black">Mã đơn hàng:</span>{" "}
                    <span className="text-yellow-300">{order.maDonHang}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-black">Ngày đặt:</span>{" "}
                    <span className="text-yellow-300">{order.ngayDat}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-yellow-100 ">Trạng thái:</span>{" "}
                    <span
                      className={`font-bold ${getStatusColor(order.trangThaiGiaoHang)}`}
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
                  {order.trangThaiGiaoHang === "Đã đặt" && (
                    <button
                      onClick={() => handleCancelOrder(order.maDonHang)}
                      className="mt-4 px-3 py-1 text-sm justify-end inline-block bg-yellow hover:bg-yellow-600 text-black hover:text-white font-semibold rounded-lg transition duration-300"
                    >
                      Hủy đơn
                    </button>
                  )}
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

							<h3 className="text-2xl font-bold text-center mb-4 text-yellow">
								Chi tiết đơn hàng #{selectedOrder.maDonHang}
							</h3>

							<div className="space-y-2 text-black font-serif">
								<OrderDetails orderId={selectedOrder.maDonHang} />
							</div>
						</div>
					</div>
				)}
      </div>

      {orderToCancel && (
				<ConfirmDialog
					message="Bạn có chắc muốn hủy đơn hàng này?"
					onConfirm={handleConfirmCancel}
					onCancel={() => setOrderToCancel(null)}
				/>
			)}
    </div>
  );
};

export default Orders;
