import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clientAxios from '../utilities/axiosClient';

const AuthContext = createContext({});

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});
  const [loadingAuthentication, setLoadingAuthentication] = useState(true);
  const navigate = useNavigate();

  const authenticateUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingAuthentication(false);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await clientAxios('/users/profile', config);
      setAuth(data);
      navigate('/projects');
    } catch (error) {
      console.log(error);
      setAuth({});
    } finally {
      setLoadingAuthentication(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loadingAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
