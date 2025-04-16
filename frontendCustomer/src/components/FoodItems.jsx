import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import FoodCard from "./FoodCard";
import Loading from "./state/Loading";  // Assuming you have a Loading component

const FoodItems = () => {
  const [sanPhamList, setSanPhamList] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null);  // Manage error state

  // Toast notification for adding an item to the cart
  const handleToast = (name) => toast.success(`Đã thêm ${name} vào giỏ hàng`);

  // Fetch product list with error handling
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
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API sản phẩm:", err);
        setError("Không thể tải danh sách sản phẩm");
        setLoading(false); // Stop loading even if there is an error
        toast.error("Không thể tải danh sách sản phẩm");
      });
  }, []);

  // Call the fetchProductList function once when component mounts
  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);
  console.log("Product: ", sanPhamList);

  if (loading) return <Loading />;  // Show loading component while fetching data
  if (error) return <div>{error}</div>;  // Show error if there's an issue

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="py-5">
        <span className="flex items-center justify-center lg:w-full lg:my-14">
          <h1 className="text-2xl font-bold lg:text-5xl">
            Khám phá <span className="font-serif text-yellow">món ngon</span> hôm nay
          </h1>
        </span>
        <div className="flex flex-wrap justify-center gap-10 lg:mx-20">
          {sanPhamList.map((food, index) => (
            <FoodCard
              key={index}
              id={food.maSanPham}
              name={food.tenSanPham}
              price={food.giaBan}
              desc={food.moTa}
              img={food.hinhAnh}
              handleToast={handleToast}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodItems;
