import React from "react";
import { Link } from "react-router-dom";

const Join = () => {
   return (
      <div className="lg:flex lg:w-full lg:h-[40vw] lg:items-center lg:justify-center lg:bg-yellow lg:-my-10">
         <section className="pt-10 my-10 ">
            <div className="mx-auto max-w-7xl">
               <div className="max-w-2xl mx-auto text-center">
                  <div className="flex justify-center -space-x-2 isolate">
                     <img
                        className="relative z-30 inline-block rounded-full h-14 w-14 ring-4 ring-white"
                        src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg"
                        alt="Dan_Abromov"
                     />
                     <img
                        className="relative z-0 inline-block rounded-full h-14 w-14 ring-4 ring-white"
                        src="https://nextjs.org/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F35255%2F1665059775-delba.jpg&w=640&q=75"
                        alt="Delba"
                     />
                  </div>

                  <h2 className="mt-8 text-2xl font-bold leading-tight text-black sm:text-4xl lg:mt-12 lg:text-5xl">
                     Tham gia cùng <span className="border-b-8 border-white">1.482</span>{" "}
                     người đam mê ẩm thực khác
                  </h2>
                  <p className="max-w-xl mx-auto mt-6 text-base text-gray-600 md:mt-10 lg:text-xl">
                     Đắm chìm trong thế giới hương vị. Tham gia cùng chúng tôi tại{" "}
                     <span className="text-white">Food Zone</span> và tận hưởng những khoảnh khắc ẩm thực tuyệt vời. Hạnh phúc ẩm thực đang chờ bạn – đăng ký ngay hôm nay!
                  </p>
                  <button>
                     <Link
                        to={"/signIn"}
                        type="button"
                        className="px-3 py-2 mt-8 text-sm font-semibold text-white bg-black rounded-md shadow-sm hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                        Tham gia ngay
                     </Link>
                  </button>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Join;
