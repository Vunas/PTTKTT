import React from "react";
import { DollarSign, Zap, Moon, Filter } from "lucide-react";

const Features = () => {
   return (
      <div className="px-4 py-5 mx-auto my-10 max-w-7xl sm:px-6 lg:px-8">
         <div className="max-w-xl mx-auto text-center">
            <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
               Food Zone giúp bạn tìm kiếm
               <span className="font-serif text-yellow"> món ăn ngon </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
               Khám phá, tận hưởng và nâng tầm trải nghiệm ẩm thực của bạn với Food Zone.
               Chúng tôi không chỉ giúp bạn tìm được món ăn ngon – chúng tôi còn khiến nó trở nên tuyệt vời hơn.
               Hãy đồng hành cùng chúng tôi trong hành trình đầy hương vị này.
            </p>
         </div>
         <div className="grid grid-cols-1 p-4 mt-12 mb-6 text-center shadow-xl gap-y-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 rounded-2xl bg-gray">
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <DollarSign className="text-gray-700 h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-black">
                  Thanh toán an toàn
               </h3>
               <p className="mt-4 text-sm text-gray-600">
                  Mua sắm an tâm – thanh toán bảo mật cho trải nghiệm trực tuyến không lo lắng.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Zap className="text-gray-700 h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-black">
                  Tìm kiếm nhanh chóng & dễ dàng
               </h3>
               <p className="mt-4 text-sm text-gray-600">
                  Thỏa mãn tức thì: Tìm món ăn nhanh chóng, dễ dàng chỉ với vài cú nhấp chuột.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Moon className="text-gray-700 h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-black">
                  Giao hàng đêm
               </h3>
               <p className="mt-4 text-sm text-gray-600">
                  Đáp ứng cơn thèm bất cứ lúc nào – giao hàng ban đêm cũng có,
                  vì chúng tôi hiểu rằng cơn đói không theo giờ giấc cố định.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Filter className="text-gray-700 h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-black">
                  Lọc món ăn theo ý thích
               </h3>
               <p className="mt-4 text-sm text-gray-600">
                  Tùy chỉnh khẩu vị của bạn một cách chính xác – lọc món ăn theo sở thích
                  để có trải nghiệm ẩm thực phù hợp và tuyệt vời nhất.
               </p>
            </div>
         </div>
      </div>
   );
};

export default Features;
