import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice"; // báo lỗi nhưng vẫn chạy được, đừng xóa
import { Navigate, useNavigate } from "react-router-dom";

const FoodCard = ({ id, name, price, desc, img, handleToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleAddToCart = () => {
    const user = localStorage.getItem("taiKhoan");

    if (!user) {
      // Nếu chưa đăng nhập → điều hướng đến trang đăng nhập
      navigate("/signIn");
      return;
    }

    dispatch(addToCart({ id, name, price, img, qty: 1 }));
    handleToast(name);
  };

  // Ensure `desc` is a string and has a value
  const displayDesc = typeof desc === 'string' ? desc.slice(0, 50) : "Mô tả không có sẵn"; // Fallback if desc is undefined or not a string

  return (
    <div className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-2xl gap-2 shadow-xl">
      <img
        src={img}
        alt={name}
        className="w-auto h-[130px] object-cover hover:scale-110 cursor-grab transition-all duration-500 ease-in-out rounded-md"
      />

      <div className="flex justify-between text-sm">
        <h2 className="truncate max-w-[140px]">{name}</h2>
        <span className="text-yellow">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </span>
      </div>

      <p className="text-sm font-normal text-gray-700">{displayDesc}...</p>

      <div className="flex between gap-4">
        <button
          onClick={() => navigate(`/product/${id}`)}
          className="px-3 py-1 text-sm text-white rounded-lg bg-yellow hover:text-black"
        >
          Xem chi tiết
        </button>
        <button
          onClick={handleAddToCart}
          className="px-3 py-1 text-sm text-white rounded-lg bg-yellow hover:text-black"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default FoodCard;