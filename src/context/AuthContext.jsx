import { login, adminLogin } from "api/auth.js";
import { createContext, useState, useEffect } from "react";
import * as jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";
import {postTweets, putUserSelf, getUser, getUserReplies, getUserLikes, postReply, postLike, postUnlike} from 'api/tweets.js'
import { useNavigate } from "react-router-dom";


const AuthContext = createContext('');
// export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  // 儲存 userInfo 物件方便運用，裡面包含 account、avatar、banner、name 等
  const [userInfo, setUserInfo] = useState({});
  // 儲存使用者點擊想看的 tweetId
  const [tweetId, setTweetId] = useState(null);
  // 儲存使用者所有已回覆的 tweet
  const [userReplyList, setUserReplyList] = useState([]);
  // 若自己有Tweet更新
  const [isTweetUpdated, setIsTweetUpdated] = useState(false)
  // 若有更動過個人資料
  const [isUserEdited, setIsUserEdited] = useState(false)
  // 若有更新過喜歡推文
  const [isUpdateLikes, setIsUpdateLikes] = useState(false)
  // 若有更新過回覆推文
  const [isUpdatedReplies, setIsUpdatedReplies] = useState(false)
  const { pathname } = useLocation();
  const navigate = useNavigate()

  // 儲存點擊的 tweetId
  function handleSetTweetIdClick(tweetIdReceived) {
    setTweetId(tweetIdReceived);
    localStorage.setItem("tweetId", tweetIdReceived);
  };

  // 現在每條 API 都會驗證身份，要再測試一下被擋後的回傳值是什麼，再做對應畫面
  // 換頁要驗證 token
  useEffect(() => {
    //如果換頁要去的目的是登入/註冊頁面的話，請不用認證token
    if (pathname === "/login" || pathname === "/signup" || pathname === "/admin") return
    //更新完Tweet後，要把isTweetUpdated退回false狀態
    setIsTweetUpdated(false)
    //更新完個人編輯資料後，要把isUserEdited退回false
    setIsUserEdited(false)
    //更新過回覆推文後，要把isUpdatedReplies退回false
    setIsUpdatedReplies(false)
    //更新過回覆推文後，要把isUpdateLikes退回false
    setIsUpdateLikes(false)
    const checkTokenIsValid = async () => {
      // 從 localStorage 拿 token
      const authToken = localStorage.getItem("authToken");
      // 如果 token 不存在則進行相關設定
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return navigate('/login')
      }
      // 若 token 存在則驗證其有效性
      // 這邊似乎交給後端驗證？
      // const result = await checkPermission(authToken);

      // 如果有 token（但似乎要給後端檢核是否有效）
      if (authToken) {
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
        //分析jwt解密的payload是否真的有此使用者
        if (!tempPayload) {
          setIsAuthenticated(false);
          setPayload(null);
          return navigate('/login')
        }
        setIsAuthenticated(true);
        // 使用 localStorage 中的 userInfo 來初始化
        const savedUserInfo = localStorage.getItem("userInfo");
        if (savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo));
        }
        // 使用 localStorage 中的 tweetId 來初始化
        const savedTweetId = localStorage.getItem("tweetId");
        if (savedTweetId) {
          setTweetId(savedTweetId);
        }
      } else {
        // 無效
        setIsAuthenticated(false);
        setPayload(null);
        navigate('/login')
      }
    };
    checkTokenIsValid();
  }, [pathname, isUserEdited, navigate]);


  // console.log('AuthProvider 重新渲染')
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        userInfo,
        tweetId,
        handleSetTweetIdClick,
        userReplyList,
        setUserReplyList,
        isTweetUpdated,
        setIsTweetUpdated,
        isUserEdited, 
        isUpdatedReplies,
        setIsUpdatedReplies,
        isUpdateLikes,
        setIsUpdateLikes,
        login: async (data) => {
          const response = await login({
            account: data.account,
            password: data.password,
          });
          //若成功可以把payload的資料讓所有頁面看到
          if (response.data) {
            if (response.data.status === "success") {
              const authToken = response.data.token;
              const temPayload = jwt.decode(authToken);
              setPayload(temPayload);
              setIsAuthenticated(true);
              setCurrentUser({
                id: temPayload.id,
              })
              localStorage.setItem("authToken", authToken);
              // 儲存使用者資訊到 state 與 localStorage
              setUserInfo(response.data.user);
              localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            }
          }
          //若獲得的response不符合上面條件，回傳response讓LoginPage去做錯誤顯示
          else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return response;
        },
        adminLogin: async(data) => {
          const response = await adminLogin({
            account: data.account, password: data.password
          })
          //若成功可以把payload的資料讓所有頁面看到
          if (response.data) {
            if (response.data.status === "success") {
              const authToken = response.data.token;
              const temPayload = jwt.decode(authToken);
              setPayload(temPayload);
              setIsAuthenticated(true);
              setCurrentUser({
                id: temPayload.id,
              })
              localStorage.setItem("authToken", authToken);
              // 儲存使用者資訊到 state 與 localStorage
              setUserInfo(response.data.admin);
              localStorage.setItem("userInfo", JSON.stringify(response.data.admin));
            }
          }
          //若獲得的response不符合上面條件，回傳response讓LoginPage去做錯誤顯示
          else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return response;
        },
        logout: () => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("tweetId");
          localStorage.removeItem("otherUserId");
          localStorage.removeItem("followContent");
          localStorage.removeItem("fromPage");
          setPayload(null);
          setIsAuthenticated(false);
        },
        postTweets: async (data) => {
          const response = await postTweets({ description: data.description })
          if (response.data) setIsTweetUpdated(true)
          return response
        }, 
        putUserSelf: async(id, formData) => {
          const response = await putUserSelf(id, formData)
          // 若成功更新user資料 把isUserEdited設為true
          if (!response.response) setIsUserEdited(true)
          // 順便更新其他地方的avatar，需更動localStorage的內容
          const savedUserInfo = localStorage.getItem("userInfo")
          let savedUserInfoParsed = JSON.parse(savedUserInfo)
          savedUserInfoParsed.avatar = response.data.avatar
          const modifiedSavedUserInfo = JSON.stringify(savedUserInfoParsed);
          localStorage.setItem("userInfo", modifiedSavedUserInfo)
          return response
        }, 
        getUser: async(id) => {
          const response = await getUser(id)
          console.log("get all user data", response)
          return response
        }, 
        getUserReplies: async(id) => {
          const response = await getUserReplies(id)
          console.log("get all user replies", response)
          if(response.data) setIsUpdatedReplies(true)
          return response
        },
        getUserLikes: async(id) => {
          const response = await getUserLikes(id)
          console.log("get all user likes", response)
          return response
        },
        postReply: async(id, {comment}) => {
          const response = await postReply(id, {comment})
          console.log("post a reply", response)
          if(response.data) setIsUpdatedReplies(true)
          return response
        },
        postLike: async(id) => {
          const response = await postLike(id)
          console.log("post a like", response)
          if(response.data) setIsUpdateLikes(true)
          return response
        },
        postUnlike: async(id) => {
          const response = await postUnlike(id)
          console.log("post an unlike", response)
          if(response.data) setIsUpdateLikes(true)
          return response
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }