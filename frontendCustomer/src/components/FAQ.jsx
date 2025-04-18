import React from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
   return (
      <section className="px-4 py-10 mx-auto max-w-7xl ">
         <div>
            <div className="max-w-3xl mx-auto lg:text-center">
               <h2 className="text-3xl font-bold te:xt-black lg:leading-tight sm:text-4xl lg:text-5xl">
                  Câu hỏi thường gặp{" "}
                  <span className="font-serif text-yellow">FAQ</span>
               </h2>
            </div>
            <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 md:mt-16 md:grid-cols-2">
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     Bạn có những biện pháp gì để đảm bảo an toàn và vệ sinh thực phẩm?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Đảm bảo an toàn và vệ sinh thực phẩm là ưu tiên hàng đầu của chúng tôi.
                     Chúng tôi tuân thủ nghiêm ngặt các quy định về an toàn thực phẩm và nhân viên
                     được đào tạo để duy trì các tiêu chuẩn vệ sinh cao nhất.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     Khu vực giao hàng của bạn là ở đâu?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Hiện tại chúng tôi giao hàng trong phạm vi 10 km tính từ cửa hàng. 
                     Bạn có thể kiểm tra khu vực giao hàng bằng cách nhập địa chỉ trong quá trình thanh toán.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     Tôi có thể theo dõi đơn hàng của mình như thế nào?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Bạn có thể theo dõi đơn hàng 
                     trên website trong mục "Tình trạng đơn hàng".
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     Tôi có thể tùy chỉnh đơn hàng không?{" "}
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Có, chúng tôi hiểu rằng mỗi người đều có sở thích riêng.
                     Bạn có thể tùy chỉnh đơn hàng bằng cách thêm ghi chú hoặc hướng dẫn đặc biệt
                     trong quá trình thanh toán.
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
};

export default FAQ;
