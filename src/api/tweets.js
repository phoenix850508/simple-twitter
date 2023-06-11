// axios 設定檔
import axios from "axios";
const baseUrl = "https://mighty-woodland-74272.herokuapp.com/api";

// 新增一個 instance，使用方法可見 axios interceptor readme
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// 在axiosInstance 使用 interceptors 方法
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// 因為還沒做 Context，這邊可先用 user1 去 login 測試
// 瀏覽 tweets
export const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    console.log(res);
    // 這邊要注意回傳內容，要有兩層 data 才抓得到
    return res.data.data;
  } catch (error) {
    console.error("[Get Tweets failed]: ", error);
  }
};

export const putUserSelf = async ({ id, formData, name, introduction }) => {
  try {
    // 先設定資料要帶入的contetnt type + header
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(config);
    // 這邊需要帶入使用者的id，才能讓後端知道目前的self指的是哪一位使用者
    const res = await axiosInstance.put(`${baseUrl}/user/${id}`, config, {
      id,
      formData,
      name,
      introduction,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error("[Post User-Self failed]", error);
    return error;
  }
};
