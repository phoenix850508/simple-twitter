// 引用 React Hook
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// 引用 context
import { AuthContext } from 'context/AuthContext.jsx'

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main');
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return <div>HomePage</div>;
};

export default HomePage;