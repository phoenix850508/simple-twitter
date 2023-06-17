// 引用 React Hook
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// 引用 context
import { AuthContext } from 'context/AuthContext.jsx'

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  // 撈取 localStorage 中的 userInfo
  let savedUserInfo = {}
  let role = ''

  if (localStorage.getItem("userInfo")) {
    savedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    role = savedUserInfo.role
  }


  useEffect(() => {
    if (isAuthenticated && role === 'user') {
      navigate('/main');
    } else if (isAuthenticated && role === 'admin') {
      navigate('/admin_users');
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated, role]);

  return <div>HomePage</div>;
};

export default HomePage;