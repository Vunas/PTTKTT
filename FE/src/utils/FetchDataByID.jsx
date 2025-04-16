import axios from "axios";
// Phương thức lấy dữ liệu theo ID
const fetchDataById = async (url, id, setError) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while fetching data from ${url}/${id}:`, error);
    setError("Cannot fetch data from server.");
  }
};

export default fetchDataById;
