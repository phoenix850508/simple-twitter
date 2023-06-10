import "styles/App.css";
import "styles/reset.scss";
import "styles/base.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, SignupPage, MainPage, AdminPage, AdminUsersPage, UserSelfPage, ReplyListPage, UserSelfFollowPage, UserOtherPage, AdminMainPage, SettingPage } from 'pages'

function App() {
  const basename = process.env.PUBLIC_URL
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="admin_users" element={<AdminUsersPage />} />
          <Route path="user/self" element={<UserSelfPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="replylist" element={<ReplyListPage />} />
          <Route path="user/self/follow" element={<UserSelfFollowPage />} />
          <Route path="user/other" element={<UserOtherPage />} />
          <Route path="admin_main" element={<AdminMainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
