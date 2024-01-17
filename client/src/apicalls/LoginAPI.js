import axios from "axios";
export const LoginAPI = async (form) => {
  const { email, password } = form;

  const url = "https://total-home.onrender.com/";

  console.log(url);

  try {
    const body = {
      email: email,
      password: password,
    };

    const response = await axios.post(url + "auth/login", body);

    if (response && response.status === 200) {
      return response.data.message;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    console.error(err.response);
  }
};
