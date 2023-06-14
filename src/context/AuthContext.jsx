import { login } from "api/auth.js";
import { createContext, useState, useEffect } from "react";
import * as jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";
import {postTweets, putUserSelf, getUser, getUserReplies, getUserLikes} from 'api/tweets.js'
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
  const [isUpdatedLike, setIsUpdatedLikes] = useState(false)
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
    //更新更新過喜歡推文後，要把isUpdatedLikes退回false
    setIsUpdatedLikes(false)
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
  }, [pathname, navigate, isTweetUpdated, isUserEdited]);


  console.log('AuthProvider 重新渲染')
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
        isUserEdited, 
        isUpdatedLike,
        isUpdatedReplies,
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
        logout: () => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("tweetId");
          localStorage.removeItem("otherUserId");
          localStorage.removeItem("followContent");
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
          if (!response.response) setIsUserEdited(true)
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
          if(response.data) setIsUpdatedLikes(true)
          return response
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }