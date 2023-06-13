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
    console.log("get all tweets", res);
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
    console.log("get all user tweets", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get AllTweets failed]: ", error);
  }
};

// 瀏覽某一則 tweets 資訊
// GET /api/tweets/:id
export const getSingleTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${tweetId}`);
    console.log("get single tweet", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get TweetReplyList failed]: ", error);
  }
};

// 點擊某一則 tweet 可以到 reply list 頁面並查看該推文細節
// GET api/tweets/:id/replies
export const getTweetReplyList = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${tweetId}/replies`);
    console.log("get tweet replylist", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get TweetReplyList failed]: ", error);
  }
};

// user self 可以切換到回覆區塊並查看所有已回覆內容
// GET api/users/:id/replied_tweets
export const getUserReplies = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/users/${id}/replied_tweets`
    );
    console.log("get all user replies", response);
    return response.data;
  } catch (error) {
    console.error("[Get User Replies failed]: ", error);
  }
};

// get某位使用者資料
export const getUser = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}`);
    console.log("get user's data", res);
    return res;
  } catch (error) {
    console.error("[Get user failed]", error);
  }
};

// 編輯個人資料
export const putUserSelf = async (id, formData) => {
  try {
    // 先設定資料要帶入的content type + header
    const res = await axiosInstance.put(`${baseUrl}/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("edit user info", res);
    return res;
  } catch (error) {
    console.error("[Put user failed]", error);
    return error;
  }
};

//新增推文給後端
export const postTweets = async ({ description }) => {
  try {
    const res = axiosInstance.post(`${baseUrl}/tweets`, { description });
    console.log("post new tweet", res);
    return res;
  } catch (error) {
    console.error("[Post Tweets failed]", error);
  }
};

//瀏覽某一使用者喜歡過的貼文
export const getUserLikes = async (id) => {
  try {
    const res = axiosInstance.get(`${baseUrl}/users/${id}/likes`);
    console.log("get all user likes", res);
    return res;
  } catch (error) {
    console.error("[Get user like failed]: ", error);
  }
};

//新增回覆推文
export const postReply = async (id, { comment }) => {
  try {
    const res = axiosInstance.post(`${baseUrl}/tweets/${id}/replies`, {
      comment,
    });
    return res;
  } catch (error) {
    console.error("[Post reply tweet failed]: ", error);
  }
};
