import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import FoodCard from "./FoodCard";
import Loading from "./state/Loading";  // Assuming you have a Loading component

const FoodItems = () => {
  const [sanPhamList, setSanPhamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Từ khóa tìm kiếm

  const handleToast = (name) => toast.success(`Đã thêm ${name} vào giỏ hàng`);

  const fetchProductList = useCallback(() => {
    fetch("http://localhost:8080/api/sanpham")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Lỗi: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSanPhamList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API sản phẩm:", err);
        setError("Không thể tải danh sách sản phẩm");
        setLoading(false);
        toast.error("Không thể tải danh sách sản phẩm");
      });
  }, []);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  // Lọc sản phẩm theo tên
  const filteredSanPhamList = sanPhamList.filter((food) =>
    food.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="py-24">
        <span className="flex flex-col items-center justify-center text-center lg:my-14 px-4">
          <h1 className="text-2xl font-bold lg:text-5xl text-center">
            Khám phá <span className="font-serif text-yellow">món ngon</span> hôm nay
          </h1>
          {/* Thanh tìm kiếm */}
          <input
            type="text"
            placeholder="Tìm món ăn..."
            className="mt-6 w-80 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </span>

        <div className="min-h-[200px] flex flex-wrap justify-center items-center gap-10 mt-10 px-4 lg:px-20">
          {filteredSanPhamList.length > 0 ? (
            filteredSanPhamList.map((food, index) => (
              <FoodCard
                key={index}
                id={food.maSanPham}
                name={food.tenSanPham}
                price={food.giaBan}
                desc={food.moTa}
                img={food.hinhAnh}
                handleToast={handleToast}
              />
            ))
          ) : (
            <div className="text-center w-full">
              <p className="text-gray-500">Không tìm thấy món ăn phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FoodItems;
