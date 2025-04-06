import axios from "axios";

const fetchData = async (url, setList, setLoading, setError) => {
  try {
    setLoading(true); // Bắt đầu trạng thái loading
    const response = await axios.get(url);
    setList(response.data); // Cập nhật danh sách với dữ liệu đã lấy
  } catch (error) {
    console.error(`Error while fetching data from ${url}:`, error);
    setError("Cannot fetch data from server."); // Đặt lỗi
  } finally {
    setLoading(false); // Kết thúc trạng thái loading dù thành công hay gặp lỗi
  }
};

export default fetchData;
