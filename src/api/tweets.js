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

// 瀏覽所有 tweets
export const getAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    console.log("getAllTweets: ", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get AllTweets failed]: ", error);
  }
};

// 瀏覽某一使用者的 tweets
// GET /api/users/:id/tweets
export const getUserTweets = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/tweets`);
    // console.log(res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get AllTweets failed]: ", error);
  }
};

// 點擊某一則 tweet 可以到 reply list 頁面並查看該推文細節
// GET /api/tweets/:id
export const getTweetReplyList = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${tweetId}/replies`);
    console.log("tweets 裡的回覆: ", res);
    console.log("tweets 裡的 tweetId : ", tweetId);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get TweetReplyList failed]: ", error);
  }
};
