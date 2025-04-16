import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import avatar from "../assets/account.png";

const Navbar = () => {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Menu", href: "/Menu" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("taiKhoan"));
  const [userInfo, setUserInfo] = useState(() => {
    const user = localStorage.getItem("taiKhoan");
    return user ? JSON.parse(user) : null;
  });

  // Mobile dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("taiKhoan");
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const user = localStorage.getItem("taiKhoan");
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <div className="w-full bg-white shadow-md fixed top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link to={"/"}>
            <div className="inline-flex items-center space-x-2">
              <div className="flex flex-col justify-between my-5 lg:flex-row">
                <div>
                  <div className="font-bold">
                    Food <span className="text-yellow">Zone</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="items-start hidden grow lg:flex">
            <ul className="inline-flex space-x-8 ml-52">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-semibold text-gray-800 transition-all ease-in-out duration-400 hover:text-yellow"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cart Icon */}
          <Link to={"/cart"}>
            <FaShoppingCart className="ml-10 text-xl lg:text-2xl lg:-mx-12 md:ml-96 sm:ml-80" />
          </Link>

          {/* Auth section */}
          <div className="hidden lg:block">
            {!isLoggedIn ? (
              <Link to={"/signIn"}>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white"
                >
                  Sign in
                </button>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-yellow-500 object-cover cursor-pointer"
                  onClick={handleAvatarClick}
                />
                <span className="text-sm font-medium text-gray-700">
                  Xin chào, {userInfo?.tenDangNhap || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="w-6 h-6 cursor-pointer" />
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 p-2 transition origin-top-right transform lg:hidden">
              <div className="bg-white divide-y-2 rounded-lg shadow-lg divide-gray-50 ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 "
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center p-3 -m-3 text-sm font-semibold rounded-md hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile Auth section */}
                  {!isLoggedIn ? (
                    <Link to={"/signIn"}>
                      <button
                        type="button"
                        className="w-full px-3 py-2 mt-4 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white"
                      >
                        Sign in
                      </button>
                    </Link>
                  ) : (
                    <div className="mt-4 space-y-1 text-center">
                      <Link
                        to="/account"
                        className="flex items-center p-3 -m-3 text-sm font-semibold rounded-md hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">Chỉnh sửa tài khoản</span>
                      </Link>
                      <Link
                        to="/transactions"
                        className="flex items-center p-3 -m-3 text-sm font-semibold rounded-md hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">Lịch sử giao dịch</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
						
          )}

					{/* Dropdown menu for account settings */}
					{isDropdownOpen && (
						<div className="absolute top-16 right-10 bg-white shadow-lg p-4 rounded-md w-48 z-50">
							<ul>
								<li>
									<Link to="/setAccount" className="block py-2 text-gray-700 hover:bg-gray-100">
										Chỉnh sửa tài khoản
									</Link>
								</li>
								<li>
									<Link to="/transaction" className="block py-2 text-gray-700 hover:bg-gray-100">
										Lịch sử giao dịch
									</Link>
								</li>
							</ul>
						</div>
					)}
        </div>
      </div>
    </>
  );
};

export default Navbar;
