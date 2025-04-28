import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderDetails = ({ orderId }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        setLoading(true);
  
        // Bước 1: Lấy danh sách chi tiết đơn hàng
        const response = await axios.get(`http://localhost:8080/api/chitietdonhang/donhang/${orderId}`);
        const chiTietList = response.data;
  
        // Bước 2: Lấy tên sản phẩm cho từng mã sản phẩm
        const enrichedItems = await Promise.all(
          chiTietList.map(async (item) => {
            try {
              const resSP = await axios.get(`http://localhost:8080/api/sanpham/${item.maSanPham}`);
              return {
                ...item,
                tenSanPham: resSP.data.tenSanPham, // hoặc resSP.data nếu là string
                hinhAnh: resSP.data.hinhAnh
              };
            } catch (error) {
              return {
                ...item,
                tenSanPham: "Không rõ",
              };
            }
          })
        );
  
        setOrderItems(enrichedItems);
      } catch (err) {
        setError("Không thể tải chi tiết mặt hàng");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderItems();
  }, [orderId]);

  console.log(orderItems);  // Kiểm tra dữ liệu của orderItems

  if (loading) return <div>Đang tải chi tiết...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-items">
      {orderItems.length === 0 ? (
        <p>Không có mặt hàng nào trong đơn hàng này.</p>
      ) : (
        <ul>
          {orderItems.map((item) => (
            <li key={item.maChiTiet}>  {/* Dùng maChiTiet làm key */}
              
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <p>
                    <strong>Tên sản phẩm:</strong> {item.tenSanPham || "Chưa có tên sản phẩm"}
                  </p>
                  <p>
                    <strong>Số lượng:</strong> {item.soLuong || "Chưa có số lượng"}
                  </p>
                  <p>
                    <strong>Đơn giá:</strong> {item.donGia ? item.donGia.toLocaleString("vi-VN") : "Chưa có đơn giá"}₫
                  </p>
                  <p>
                    <strong>Thành tiền:</strong> {item.thanhTien ? item.thanhTien.toLocaleString("vi-VN") : "Chưa có thành tiền"}₫
                  </p>
                </div>

                <img
                  src={item.hinhAnh}
                  alt={item.tenSanPham}
                  className="w-24 h-24 object-cover rounded shadow"
                />
              </div>
              <br></br>
              <hr></hr>
              <br></br>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderDetails;
