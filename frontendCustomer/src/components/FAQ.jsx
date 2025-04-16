import React from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
   return (
      <section className="px-4 py-10 mx-auto max-w-7xl ">
         <div>
            <div className="max-w-3xl mx-auto lg:text-center">
               <h2 className="text-3xl font-bold te:xt-black lg:leading-tight sm:text-4xl lg:text-5xl">
                  Frequently Asked{" "}
                  <span className="font-serif text-yellow">Questions</span>
               </h2>
            </div>
            <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 md:mt-16 md:grid-cols-2">
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     What precautions are you taking for food safety and
                     hygiene?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Ensuring the safety and hygiene of our food is our top
                     priority. We follow strict food safety guidelines, and our
                     staff is trained to maintain the highest standards of
                     cleanliness.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     What is your delivery radius?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     We currently deliver to [list of areas/cities]. You can
                     check if we deliver to your location by entering your
                     address during the checkout process.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     How can I track my order?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Once your order is confirmed, you will receive a
                     confirmation email with a link to track your delivery in
                     real-time. You can also track your order on our website
                     under the "Order Status" section.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     Can I customize my order?{" "}
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Yes, we understand that everyone has unique preferences.
                     You can customize your order by adding special instructions
                     or notes during the checkout process.
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
};

export default FAQ;
