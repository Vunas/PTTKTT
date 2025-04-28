import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice"; // báo lỗi nhưng vẫn chạy được, đừng xóa
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/sanpham/${id}`);
        const data = res.data;

        const productData = {
          id: data.maSanPham,
          name: data.tenSanPham,
          price: data.giaBan,
          desc: data.moTa,
          img: data.hinhAnh,
        };

        setProduct(productData);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const user = localStorage.getItem("taiKhoan");
    if (!user) return window.location.href = "/signIn";

    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (!product) return <div className="text-center mt-10">Đang tải sản phẩm...</div>;

  return (
    <div className="pt-28">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <p className="text-xl text-yellow-600 font-semibold mb-4">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </p>
          <p className="text-gray-700 text-md mb-6">{product.desc || "Không có mô tả chi tiết."}</p>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 w-fit bg-yellow hover:bg-yellow-600 text-black hover:text-white font-semibold rounded-lg transition duration-300"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Hiển thị Toast */}
      <ToastContainer />
    </div>
  );
};

export default FoodDetails;
