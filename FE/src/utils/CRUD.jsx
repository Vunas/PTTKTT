import axios from "axios";

const addItem = async (url, data, setList, setSnackbar) => {
  try {
    const response = await axios.post(url, data);
    setList((prevList) => [...prevList, response.data]); // Cập nhật danh sách
    setSnackbar({ open: true, message: "Thêm thành công!", type: "success" });
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    const errorMessage = error.response?.data || "Có lỗi xảy ra khi thêm.";
    setSnackbar({ open: true, message: errorMessage, type: "error" });
    throw error; // Ném lỗi để xử lý phía gọi hàm
  }
};

const addList = async (url, data, setSnackbar) => {
  try {
    const response = await axios.post(url, data);
    setSnackbar({ open: true, message: "Thêm thành công!", type: "success" });
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    const errorMessage = error.response?.data || "Có lỗi xảy ra khi thêm.";
    setSnackbar({ open: true, message: errorMessage, type: "error" });
    throw error; // Ném lỗi để xử lý phía gọi hàm
  }
};


const editItem = async (url, id, data, setList, setSnackbar, keyField) => {
  try {
    const response = await axios.put(`${url}/${id}`, data);
    setList((prevList) =>
      prevList.map((item) => (item[keyField] === id ? data : item))
    );
    const message =
      typeof response.data === "string"
        ? response.data
        : "Cập nhật thành công!";
    setSnackbar({ open: true, message, type: "success" });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Có lỗi xảy ra khi cập nhật.";
    setSnackbar({ open: true, message: errorMessage, type: "error" });
  }
};

const editList = async (url, data, setError) => {
  try {
    const response = await axios.put(`${url}`, data);
    return response.data;
  } catch (error) {
    setError(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật.");
  }
};

const deleteItem = async (url, id, setList, setSnackbar, keyField) => {
  try {
    if (!window.confirm("Bạn có chắc chắn muốn xóa mục này?")) {
      return; // If the user cancels, do nothing
    }
    const response = await axios.delete(`${url}/${id}`);
    setList((prevList) => prevList.filter((item) => item[keyField] !== id));
    const message =
      typeof response.data === "string" ? response.data : "Xóa thành công!";
    setSnackbar({ open: true, message, type: "success" });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Có lỗi xảy ra khi xóa.";
    setSnackbar({ open: true, message: errorMessage, type: "error" });
  }
};

export { addItem, editItem, deleteItem, addList, editList };
