import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Snackbar,Alert } from "@mui/material";

const clientId =
  "1041605160701-9q21rn06djjtsdlck5ks2mur96eckti0.apps.googleusercontent.com";

const handleSuccess = async (credentialResponse, api, setIsLoggedIn, setSnackbar) => {
  try {
    const token = credentialResponse.credential; // Token từ Google

    if (!token) {
      setSnackbar({ open: true, message: "Không nhận được token từ Google.", severity: "error"}); 
      return;
    }

    const response = await axios.post(`http://localhost:8080/api/${api}`, {
      token, // Gửi token tới backend
    });

    if (response.status === 200) {
      alert("Đăng nhập thành công"); // Hiển thị thông báo từ backend
      localStorage.setItem("taiKhoan", JSON.stringify(response.data));
      setIsLoggedIn(true);
    } else {
      setSnackbar({ open: true, message:"Đăng nhập không thành công. Vui lòng thử lại!" , severity: "error"}); 
    }
  } catch (error) {
    console.error("Lỗi:", error);
    if (error.response) {
      setSnackbar({ open: true, message:`Lỗi từ máy chủ: ${error.response.data}` , severity: "error"}); 
    } else {
      setSnackbar({ open: true, message:"Đăng nhập thất bại. Vui lòng kiểm tra kết nối mạng hoặc thử lại." , severity: "error"}); 
    }
  }
};

const handleError = (setSnackbar) => {
  setSnackbar({ open: true, message:"Đăng nhập Google thất bại." , severity: "error"}); 
};

const LoginCustomer = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center h-screen">
        <GoogleLogin
          onSuccess={(credentialResponse) =>
            handleSuccess(credentialResponse, "login-customer")
          }
          onError={handleError(handleCloseSnackbar)}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

const LoginAdmin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập với username và password
    if (username === "admin" && password === "123456") {
      setSnackbar({ open: true, message: "Đăng nhập thành công!", severity: "success" });
      setIsLoggedIn(true);
    } else {
      setSnackbar({ open: true, message: "Tên đăng nhập hoặc mật khẩu không đúng.", severity: "error"}); 
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Đăng nhập dành cho Admin
          </h1>
          <p className="text-gray-600 mb-6">
            Sử dụng tài khoản Google hoặc nhập thông tin để đăng nhập.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Đăng nhập
            </button>
          </form>
          <div className="my-4 text-gray-500">Hoặc</div>
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleSuccess(credentialResponse, "login-admin", setIsLoggedIn,setSnackbar)
            }
            onError={() => handleError(setSnackbar)}
          />
          <p className="text-gray-500 mt-4 text-sm">
            Nếu gặp vấn đề khi đăng nhập, hãy liên hệ với bộ phận hỗ trợ.
          </p>
        </div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000} // Thời gian tự đóng (3 giây)
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </GoogleOAuthProvider>
  );
};

export { LoginCustomer, LoginAdmin };
