import "styles/App.css";
import "styles/reset.scss";
import "styles/base.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext.jsx'
import { HomePage, LoginPage, SignupPage, MainPage, AdminPage, AdminUsersPage, UserSelfPage, ReplyListPage, UserSelfFollowPage, UserOtherPage, AdminMainPage, SettingPage, UserOtherFollowPage } from 'pages'

function App() {
  const basename = process.env.PUBLIC_URL
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="user/self" element={<UserSelfPage />} />
            <Route path="user/self/follow" element={<UserSelfFollowPage />} />
            <Route path="user/other" element={<UserOtherPage />} />
            <Route path="user/other/follow" element={<UserOtherFollowPage />} />
            <Route path="replylist" element={<ReplyListPage />} />
            <Route path="setting" element={<SettingPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin_users" element={<AdminUsersPage />} />
            <Route path="admin_main" element={<AdminMainPage />} />
          </Routes>
        </AuthProvider >
      </BrowserRouter>
    </div>
  );
}

export default App;
