import { login } from "api/auth.js";
import { createContext, useContext, useState, useEffect } from "react";
import * as jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";

const defaultAuthContext = {
  currentUser: null,
  isAuthenticated: false,
  login: null,
  logout: null,
  tweetId: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();
  // 儲存 userInfo 物件方便運用，裡面包含 account、avatar、banner、name 等
  const [userInfo, setUserInfo] = useState(null);
  // 儲存使用者點擊想看的 tweetId 與底下回覆
  const [tweetId, setTweetId] = useState(null);
  const [tweetReplyList, setTweetReplyList] = useState([]);

  // 換頁要驗證 token
  useEffect(() => {
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
      } else {
        // 無效
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload && {
          id: payload.id,
        },
        userInfo,
        tweetId,
        setTweetId,
        tweetReplyList,
        setTweetReplyList,
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
              localStorage.setItem("authToken", authToken);
              // 儲存使用者資訊到 state
              setUserInfo(response.data.user);
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
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
