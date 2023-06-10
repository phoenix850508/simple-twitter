import { login } from "api/auth.js";
import { createContext, useState, useContext } from "react";
import * as jwt from "jsonwebtoken";

const defaultAuthContext = {
  currentUser: null,
  isAuthenticated: false,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload && {
          id: payload.id,
        },
        login: async (data) => {
          const response = await login({
            account: data.account,
            password: data.password,
          });
          console.log(response);
          //若成功可以把payload的資料讓所有頁面看到
          if (response.data.status === "success") {
            console.log("I'm success");
            const authToken = response.data.token;
            const temPayload = jwt.decode(authToken);
            setPayload(temPayload);
            setIsAuthenticated(true);
            localStorage.setItem("authToken", authToken);
          }
          //若獲得的response不符合上面條件，回傳response讓LoginPage去做錯誤顯示
          else {
            console.log("I'm error");
            setPayload(null);
            setIsAuthenticated(false);
            console.logI("Im error");
            return response;
          }
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
