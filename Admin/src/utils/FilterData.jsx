import axios from "axios";

const filterData = async (
  url,
  filterParams,
  searchKeyword,
  setList,
  setError
) => {
  try {
    const response = await axios.get(url, { params: filterParams });
    let filteredList = response.data;

    if (searchKeyword.trim()) {
      const lowerKeyword = searchKeyword.toLowerCase();
      filteredList = filteredList.filter((item) =>
        Object.values(item).some(
          (value) =>
            value && value.toString().toLowerCase().includes(lowerKeyword)
        )
      );
    }

    setList(filteredList);
  } catch (error) {
    console.error(`Error while filtering data from ${url}:`, error);
    setError("Cannot filter data from server.");
  }
};

export default filterData;
