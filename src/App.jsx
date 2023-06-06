import "styles/App.css";
import "styles/reset.scss";
import "styles/base.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HomaPage, LoginPage} from 'pages'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomaPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
