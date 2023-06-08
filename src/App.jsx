import "styles/App.css";
import "styles/reset.scss";
import "styles/base.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, SignupPage, MainPage, UserSelfPage } from 'pages'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="user/self" element={<UserSelfPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
