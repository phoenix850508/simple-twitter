import { login } from "api/auth.js";
import { createContext, useState, useContext } from "react";
import * as jwt from "jsonwebtoken";

const defaultAuthContext = {
  currentUser: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  return (
    <AuthProvider
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
          const autToken = response.data.token;
          const status = response.data.status;
          const temPayload = jwt.decode(autToken);
          if (temPayload) {
            setPayload(temPayload);
            setIsAuthenticated(true);
          } else {
            setPayload(null);
            setIsAuthenticated(null);
          }
          return status;
        },
        logout: () => {
          localStorage.removeItem("authToken");
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthProvider>
  );
};
