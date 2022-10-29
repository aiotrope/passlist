import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const authHeader = () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser && currentUser.token) {
      return {
        Authorization: "Bearer " + currentUser.token,
      };
    } else {
      return {};
    }
  } catch (error) {}
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const userService = {
  login,
  authHeader,
};

export default userService;
