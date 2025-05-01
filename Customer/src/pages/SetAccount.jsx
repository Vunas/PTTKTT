import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SetAccount = () => {
  const [userId, setUserId] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("taiKhoan"));
		if (userData) {
			setUserId(userData.maTaiKhoan);
			setCurrentUsername(userData.tenDangNhap); // sửa lại tên đúng field
			setCurrentEmail(userData.email);
			setNewUsername(userData.tenDangNhap); // điền vào input
			setNewEmail(userData.email);
		}
	}, []);

  const handleSubmit = async (e) => {
		e.preventDefault();
	
		const userData = JSON.parse(localStorage.getItem("taiKhoan"));
	
		try {
			const response = await fetch(`http://localhost:8080/api/taikhoan/${userId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					maTaiKhoan: userId,
					tenDangNhap: newUsername,
					matKhau: userData.matKhau,
					email: newEmail,
					maPhanQuyen: userData.maPhanQuyen,
					trangThai: userData.trangThai,
					ngayTao: userData.ngayTao,
				}),
			});
	
			if (!response.ok) {
				throw new Error("Có lỗi xảy ra khi cập nhật tài khoản.");
			}
	
			console.log("Cập nhật tài khoản thành công!");
			navigate("/signIn");
	
		} catch (error) {
			console.error("Error:", error);
			setError("Có lỗi xảy ra khi cập nhật tài khoản.");
		}
	};

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Chỉnh sửa tài khoản
      </h2>

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Tên đăng nhập hiện tại:</h3>
        <div className="text-gray-800 font-semibold">{currentUsername}</div>

        <h3 className="text-sm font-medium text-gray-500 mt-4 mb-1">Email hiện tại:</h3>
        <div className="text-gray-800 font-semibold">{currentEmail}</div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Tên đăng nhập mới */}
        <div className="mb-4">
          <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">
            Tên đăng nhập mới
          </label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Nhập tên đăng nhập mới"
          />
        </div>

        {/* Email mới */}
        <div className="mb-4">
          <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
            Email mới
          </label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Nhập email mới"
          />
        </div>

        {/* Nút Submit */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetAccount;
