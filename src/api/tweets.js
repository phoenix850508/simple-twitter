// axios 設定檔
import axios from "axios";
// 舊部署
// const baseUrl = "https://mighty-woodland-74272.herokuapp.com/api";
// 新部署
const baseUrl = "https://simple-twitter-02dbeaafb59f.herokuapp.com/api";

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

// （管理員）瀏覽所有 tweets
// api/admin/getAdminTweets
export const getAllTweetsAdmin = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/admin/getAdminTweets`);
    console.log("tweets.js 裡的 getAllTweetsAdmin 回傳值: ", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get AllTweets failed]: ", error.response.data.message);
  }
};

// （管理員）刪除特定推文
export const deleteTweetAdmin = async (authToken, id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/admin/tweets/${id}`, {
      headers: { Authorization: "Bearer " + authToken },
    });
    return data;
  } catch (error) {
    console.error("[deleteTweetAdmin failed]", error.response.data.message);
  }
};

// 瀏覽所有 tweets（一般使用者）
export const getAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    console.log("tweets.js 裡的 getAllTweets 回傳值: ", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get AllTweets failed]: ", error.response.data.message);
  }
};

// 瀏覽某一使用者的 tweets
// GET /api/users/:id/tweets
export const getUserTweets = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/tweets`);
    console.log("tweets.js 裡的 getUserTweets 回傳值: ", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get AllTweets failed]: ", error.response.data.message);
  }
};

// 瀏覽某一則 tweets 資訊
// GET /api/tweets/:id
export const getSingleTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${tweetId}`);
    console.log("tweets.js 裡的 getSingleTweet 回傳值: ", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get TweetReplyList failed]: ", error.response.data.message);
  }
};

// 點擊某一則 tweet 可以到 reply list 頁面並查看該推文細節
// GET api/tweets/:id/replies
export const getTweetReplyList = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${tweetId}/replies`);
    console.log("tweets.js 裡的 getTweetReplyList 回傳值: ", res);
    // 這邊要注意回傳內容，只有一層 data
    return res.data;
  } catch (error) {
    console.error("[Get TweetReplyList failed]: ", error.response.data.message);
  }
};

// user self 可以切換到回覆區塊並查看所有已回覆內容
// GET api/users/:id/replied_tweets
export const getUserReplies = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/users/${id}/replied_tweets`
    );
    console.log("tweets.js 裡的 getUserReplies 回傳值: ", response.data);
    return response.data;
  } catch (error) {
    console.error("[Get User Replies failed]: ", error.response.data.message);
  }
};

// get某位使用者資料
export const getUser = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}`);
    return res;
  } catch (error) {
    console.error("[Get user failed]", error.response.data.message);
  }
};

// get某位使用者的 followings 資料
export const getUserFollowings = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followings`);
    console.log("tweets.js 裡的 getUserFollowings 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get user followings failed]", error.response.data.message);
  }
};

// get某位使用者的 followers 資料
export const getUserFollowers = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${id}/followers`);
    console.log("tweets.js 裡的 getUserFollowers 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get user followers failed]", error.response.data.message);
  }
};

// get 追蹤數前 10 名的使用者資料
export const getTopUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/topUsers`);
    console.log("tweets.js 裡的 getTopUsers 回傳值: ", res.data);
    return res.data;
  } catch (error) {
    console.error("[Get user followers failed]", error.response.data.message);
  }
};

// 跟隨
export const postUserFollow = async (authToken, id) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/followships`,
      { id },
      { headers: { Authorization: "Bearer " + authToken } }
    );
    return data;
  } catch (error) {
    console.error("[postUserFollow failed]", error.response.data.message);
  }
};

// 取消跟隨
export const deleteUserFollow = async (authToken, id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/followships/${id}`, {
      headers: { Authorization: "Bearer " + authToken },
    });
    return data;
  } catch (error) {
    console.error("[deleteUserFollow failed]", error.response.data.message);
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
    return res;
  } catch (error) {
    console.error("[Put user failed]", error.response.data.message);
    return error;
  }
};

//新增推文給後端
export const postTweets = async ({ description }) => {
  try {
    const res = axiosInstance.post(`${baseUrl}/tweets`, { description });
    return res;
  } catch (error) {
    console.error("[Post Tweets failed]", error.response.data.message);
  }
};

//瀏覽某一使用者喜歡過的貼文
export const getUserLikes = async (id) => {
  try {
    const res = axiosInstance.get(`${baseUrl}/users/${id}/likes`);
    console.log("tweets.js 裡的 getUserLikes 回傳值: ", res);
    return res;
  } catch (error) {
    console.error("[Get user like failed]: ", error.response.data.message);
  }
};

//新增回覆推文
export const postReply = async (id, { comment }) => {
  try {
    const res = axiosInstance.post(`${baseUrl}/tweets/${id}/replies`, {
      comment,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error("[Post reply tweet failed]: ", error.response.data.message);
  }
};

//新增愛心
export const postLike = async (id) => {
  try {
    const res = axiosInstance.post(`/tweets/${id}/like`);
    console.log(res);
    return res;
  } catch (error) {
    console.error("[Post like tweet failed]: ", error.response.data.message);
  }
};

//取消愛心
export const postUnlike = async (id) => {
  try {
    const res = axiosInstance.post(`/tweets/${id}/unlike`);
    console.log(res);
    return res;
  } catch (error) {
    console.error("[Post unlike tweet failed]: ", error.response.data.message);
  }
};

// admin取得所有使用者資料
export const getAllUsers = async () => {
  try {
    const res = axiosInstance.get("admin/users");
    console.log(res);
    return res;
  } catch (error) {
    console.error("[Get all users failed]: ", error.response.data.message);
  }
};
