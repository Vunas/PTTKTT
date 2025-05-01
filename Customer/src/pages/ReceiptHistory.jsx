import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReceiptHistory = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("khachHang"));

    if (user && user.maKhachHang) {
      axios
        .get(`http://localhost:8080/api/hoadon/khach-hang/${user.maKhachHang}`)
        .then((res) => setInvoices(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const getStatusLabel = (status) => {
    if (status === 1) return "Đã thanh toán";
    if (status === 0) return "Đã hủy";
    return "Không xác định";
  };

  const getStatusColor = (status) => {
    if (status === 1) return "text-green-600";
    if (status === 0) return "text-red-600";
    return "text-gray-500";
  };

  return (
    <div className="max-w-full mx-auto p-4 pt-28">

      <div className="pl-10 pt-10">
        <Link to="/">
          <p className="ml-10">← Quay về trang chủ</p>
        </Link>
      </div>
      
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">
        Lịch sử giao dịch
      </h2>

      {invoices.length === 0 ? (
        <p className="text-center text-black text-xl font-serif">
          Bạn chưa có giao dịch nào.
        </p>
      ) : (
        <div className="gap-6 flex flex-col ml-10 mr-10">
          {invoices.map((invoice) => (
            <div
              key={invoice.maHoaDon}
              className="bg-gradient-to-r from-slate-50 to-orange-50 border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 w-full transform hover:scale-105 hover:to-slate-100"
            >
              <div className="space-y-3 font-serif">
                <p>
                  <span className="font-semibold text-black">Mã hóa đơn:</span>{" "}
                  <span className="text-yellow-300">{invoice.maHoaDon}</span>
                </p>
                <p>
                  <span className="font-semibold text-black">Mã đơn hàng:</span>{" "}
                  <span className="text-yellow-300">{invoice.maDonHang}</span>
                </p>
                <p>
                  <span className="font-semibold text-black">Ngày xuất:</span>{" "}
                  <span className="text-yellow-300">
                    {invoice.ngayXuatHoaDon}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-black">Tổng tiền:</span>{" "}
                  <span className="text-black">
                    {invoice.tongTien?.toLocaleString("vi-VN")}₫
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-black">Nhân viên xử lý:</span>{" "}
                  <span className="text-black">{invoice.maNhanVien}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceiptHistory;
