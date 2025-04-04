import axios from "axios";

const fetchData = async (url, setList, setLoading, setError) => {
  try {
    const response = await axios.get(url);
    setList(response.data);
  } catch (error) {
    console.error(`Error while fetching data from ${url}:`, error);
    setError("Cannot fetch data from server.");
    setLoading(false);
  }
};

export default fetchData;
