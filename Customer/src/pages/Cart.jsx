import React from "react";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItems from "../components/CartItems"; // Đảm bảo đã import CartItems

import { useSelector } from "react-redux";

const Cart = () => {
  // Lấy trực tiếp cartItems từ Redux store và đảm bảo nó là một mảng
  const cartItems = useSelector((state) => state.cart.cart) || [];
  console.log(cartItems)
  // Kiểm tra nếu cartItems là một mảng hợp lệ
  if (!Array.isArray(cartItems)) {
    console.error("cartItems không phải là một mảng:", cartItems);
    return <div>Lỗi khi tải giỏ hàng.</div>;
  }

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  // Format tiền
  const formattedTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalPrice);

  return (
    <>
      <Navbar />
      <div className="pt-28">
      <div className="flex flex-col max-w-3xl mx-auto space-y-4 sm:p-10 sm:px-2">
        <div className="px-4 md:px-8">
          <h2 className="text-3xl font-bold">Giỏ hàng của bạn</h2>
          <p className="mt-3 text-sm font-medium text-gray-700">
            Kiểm tra lại các món trước khi đặt hàng nhé!
          </p>
        </div>

        {/* Danh sách sản phẩm trong giỏ */}
        <div>
          <Scrollbars style={{ height: 350 }}>
            {cartItems.length > 0 ? (
              cartItems.map((food) => (
                <CartItems
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  price={food.price}
                  img={food.img}
                  qty={food.qty}
                />
              ))
            ) : (
              <h1 className="flex justify-center text-2xl pt-20 font-bold">
                Giỏ hàng đang trống!
              </h1>
            )}
          </Scrollbars>
        </div>

        {/* Tổng tiền & hành động */}
        <div className="px-4 md:px-8">
          <div className="space-y-1 text-right md:my-2">
            <p>
              Tổng cộng:
              <span className="font-semibold ml-2">{formattedTotal}</span>
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <Link to="/menu">
              <button
                type="button"
                className="px-3 py-2 text-sm font-semibold text-black border border-black rounded-md shadow-sm"
              >
                Quay lại mua hàng
              </button>
            </Link>
            
            { cartItems.some(item => item.qty > 0) &&(
            <Link to="/transaction">
              <button
                type="button"
                className="px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black hover:text-white"
              >
                Thanh toán
              </button>
            </Link>
            )
            }
            
          </div>
        </div>
      </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
