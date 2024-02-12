import axios from "axios";

export const GetMenuDataAPI = async (id) => {
  let url = "http://localhost:3500/menuitem/";

  if (id) {
    url += id;
  }

  try {
    const response = await axios.get(url);

    if (response && response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    return err.response || "An error occurred while fetching restaurant data.";
  }
};
