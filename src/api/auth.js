import axios from "axios";

// const authURL = "https://dry-lowlands-06766.herokuapp.com";
const authURL = "https://todo-list.alphacamp.io/api/auth";

// 這裡的account先用email來取代，等後端把account這筆資料建立起來後可以把email改成account
export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${authURL}/login`, {
      username,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("[Login Failed]", error);
  }
};

export const signup = async ({ account, name, email, password }) => {
  try {
    const response = await axios.post(`${authURL}/users`, {
      account,
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
