import React from "react";
import { DollarSign, Zap, Moon, Filter } from "lucide-react";

const Features = () => {
   return (
      <div className="px-4 py-5 mx-auto my-10 max-w-7xl sm:px-6 lg:px-8">
         <div className="max-w-xl mx-auto text-center">
            <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
               Food Zone helps you find
               <span className="font-serif text-yellow"> Delicious </span>
               Food
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
               Discover, indulge, and elevate your culinary experience with Food
               Zone. We're not just helping you find delicious food; we're
               making it even better. Join us for a flavorful journey like no
               other.
            </p>
         </div>
         <div className="grid grid-cols-1 p-4 mt-12 mb-6 text-center shadow-xl gap-y-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 rounded-2xl bg-gray">
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <DollarSign className="text-gray-700 h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-black">
                  Secured Payments
               </h3>
               <p className="mt-4 text-sm text-gray-600 te">
                  Shop with confidence – enjoy secure payments for a worry-free
                  online experience.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Zap className="text-gray-700 h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-black">
                  Fast & Easy to Search
               </h3>
               <p className="mt-4 text-sm text-gray-600">
                  Effortless indulgence: Fast and easy food searching at your
                  fingertips.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Moon className="text-gray-700 h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-black">
                  Night Delivery
               </h3>
               <p className="mt-4 text-sm text-gray-600">
                  Satisfy your cravings anytime, anywhere – night delivery also
                  here, because we understand your hunger doesn't keep regular
                  hours.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Filter className="text-gray-700 h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-black">
                  Filter your Food
               </h3>
               <p className="mt-4 text-sm text-gray-600">
                  Tailor your cravings with precision – filter your food
                  preferences for a personalized culinary experience that
                  delights
               </p>
            </div>
         </div>
      </div>
   );
};

export default Features;
