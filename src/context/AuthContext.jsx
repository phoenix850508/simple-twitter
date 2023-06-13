import { login } from "api/auth.js";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import * as jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";
import {postTweets} from 'api/tweets.js'

// const defaultAuthContext = {
//   currentUser: null,
//   isAuthenticated: false,
//   login: null,
//   logout: null,
//   tweetId: null,
// };

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

  const { pathname } = useLocation();

  // 儲存點擊的 tweetId
  function handleSetTweetIdClick(tweetIdReceived) {
    setTweetId(tweetIdReceived);
    localStorage.setItem("tweetId", tweetIdReceived);
  };

  // 現在每條 API 都會驗證身份，要再測試一下被擋後的回傳值是什麼，再做對應畫面
  // 換頁要驗證 token
  useEffect(() => {
    setIsTweetUpdated(false)
    const checkTokenIsValid = async () => {
      // 從 localStorage 拿 token
      const authToken = localStorage.getItem("authToken");
      // 如果 token 不存在則進行相關設定
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      // 若 token 存在則驗證其有效性
      // 這邊似乎交給後端驗證？
      // const result = await checkPermission(authToken);

      // 如果有 token（但似乎要給後端檢核是否有效）
      if (authToken) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
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
      }
    };
    checkTokenIsValid();
  }, [pathname, isTweetUpdated]);


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
          setPayload(null);
          setIsAuthenticated(false);
        },
        postTweets: async(data) => {
          const response = await postTweets({description: data.description})
          if (response.data) setIsTweetUpdated(true)
          return response
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }