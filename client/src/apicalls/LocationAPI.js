import axios from "axios";

const weatherCall = async (longitude, latitude) => {
  const apiKey = "WJTBUGMRSMU65YJ8CYVL5NM6J";

  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=us&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      throw Error(createError(response.status));
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw Error("An unexpected error occurred.");
  }
};

const createError = (statusCode) => {
  switch (statusCode) {
    case 404:
      return "City not found. Please check the city name.";
    case 400:
      return "Bad request. Please review your request parameters.";
    case 401:
      return "Unauthorized. Check your API key.";
    case 403:
      return "Access denied. Ensure you have the necessary permissions.";
    case 500:
      return "Internal server error. Please try again later.";
    default:
      return "An unexpected error occurred.";
  }
};

export default weatherCall;
