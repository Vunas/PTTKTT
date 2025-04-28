import React from "react";

const Dashboard = () => {

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tiêu đề */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard - Quản trị
        </h1>
        <p className="text-gray-600">Quản lý thông tin bán hàng đồ ăn nhanh</p>
      </header>

      {/* Nội dung chính */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget Doanh thu */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Doanh thu hôm nay
          </h2>
          <p className="text-2xl font-bold text-green-500 mt-4">₫20,000,000</p>
          <p className="text-sm text-gray-500">+10% so với hôm qua</p>
        </div>

        {/* Widget Sản phẩm bán chạy */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Sản phẩm bán chạy
          </h2>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between text-gray-600">
              <span>Burger bò</span> <span>120 suất</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Gà chiên</span> <span>90 suất</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Khoai tây chiên</span> <span>75 suất</span>
            </li>
          </ul>
        </div>

        {/* Widget Đơn hàng đang xử lý */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Đơn hàng đang xử lý
          </h2>
          <p className="text-2xl font-bold text-yellow-500 mt-4">15 đơn</p>
          <p className="text-sm text-gray-500">Chờ xác nhận hoặc vận chuyển</p>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Biểu đồ doanh thu
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          **Ghi chú**: Đây là nơi bạn có thể tích hợp biểu đồ doanh thu bằng thư
          viện như `Chart.js` hoặc `Recharts`.
        </p>
      </div>

    </div>
  );
};

export default Dashboard;
