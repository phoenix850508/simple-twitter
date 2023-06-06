import "styles/App.css";
import "styles/reset.scss";
import "styles/base.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HomaPage, LoginPage, SignupPage} from 'pages'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomaPage/>}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="signup" element={<SignupPage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
