import axios from "axios";

const addItem = async (url, data, fetchList, setSnackbar) => {
  try {
    const response = await axios.post(url, data);
    fetchList(); // Refresh danh sách
    setSnackbar({ open: true, message: response.data, type: "success" });
  } catch (error) {
    const errorMessage = error.response?.data || "Có lỗi xảy ra khi thêm.";
    setSnackbar({ open: true, message: errorMessage, type: "error" });
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

const deleteItem = async (url, id, setList, setSnackbar, keyField) => {
  try {
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

export { addItem, editItem, deleteItem };
