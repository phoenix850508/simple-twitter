import axios from "axios";

const authURL = "https://mighty-woodland-74272.herokuapp.com";

export const login = async ({ account, password }) => {
  try {
    const response = await axios.post(`${authURL}/api/users/signin`, {
      account,
      password,
    });
    return response;
  } catch (error) {
    console.error("[Login Failed]", error);
    return error;
  }
};

export const signup = async ({
  email,
  account,
  name,
  password,
  checkPassword,
}) => {
  try {
    const response = await axios.post(`${authURL}/api/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });
    return response;
  } catch (error) {
    console.error("[Signup Failed]", error);
    return error;
  }
};

export const adminLogin = async ({ account, password }) => {
  try {
    const response = await axios.post(`${authURL}/api/admin/signin`, {
      account,
      password,
    });
    return response;
  } catch (error) {
    console.error("[Login Failed]", error);
    return error;
  }
};
