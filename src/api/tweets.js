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

export const getUserReplies = async () => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/users/14/replied_tweets`
    );
    return response;
  } catch (error) {
    console.error("[Get User Replies failed]: ", error);
  }
};
