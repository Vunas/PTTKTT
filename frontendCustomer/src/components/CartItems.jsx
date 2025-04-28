import React from "react";
import { useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import { FaMinus, FaPlus } from "react-icons/fa";

import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../redux/slices/cartSlice";

const CartItems = ({ id, img, name, price, qty }) => {
  const dispatch = useDispatch();

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

  return (
    <div>
      <ul
        id={id}
        className="flex flex-col px-4 scale-90 shadow-md lg:pr-6 lg:scale-100 lg:px-6 rounded-2xl"
      >
        <li className="flex flex-col py-3 sm:flex-row sm:justify-between ">
          <div className="flex w-full space-x-2 sm:space-x-4">
            <img
              className="flex-shrink-0 object-contain w-20 h-20 rounded sm:h-32 sm:w-32"
              src={img}
              alt={name}
            />
            <div className="flex flex-col justify-between w-full pb-4">
              <div className="flex justify-between w-full space-x-2">
                <div className="space-y-1">
                  <h3 className="font-semibold leading-snug lg:text-lg sm:pr-8">
                    {name}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-semibold lg:text-lg text-yellow">
                    {formattedPrice}
                  </p>
                </div>
              </div>

              {/* Nút xóa và số lượng */}
              <div className="flex justify-between text-sm mt-3">
                {/* Xóa khỏi giỏ */}
                <button
                  onClick={() =>
                    dispatch(removeFromCart({ id, img, name, price, qty }))
                  }
                  type="button"
                  className="flex items-center px-2 py-1 pl-0 space-x-2"
                >
                  <Trash size={16} />
                  <span>Xoá</span>
                </button>

                {/* Thay đổi số lượng */}
                <span className="flex items-center gap-2">
                  <span
                    className="px-2 py-1 rounded-full shadow-xl cursor-pointer bg-yellow"
                    onClick={() => {
                      if (qty > 1) {
                        dispatch(decrementQty({ id }));
                      } else {
                        dispatch(removeFromCart({ id }));
                      }
                    }}
                  >
                    <FaMinus />
                  </span>

                  <span className="font-semibold">{qty}</span>

                  <span
                    className="px-2 py-1 rounded-full shadow-xl cursor-pointer bg-yellow"
                    onClick={() => dispatch(incrementQty({ id }))}
                  >
                    <FaPlus />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CartItems;
