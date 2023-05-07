import { createContext, useEffect, useState } from 'react';
import { useFetchAndLoad } from '../hooks';
import { getProfileService } from '../pages/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<any>({});
  const [loadingAuthentication, setLoadingAuthentication] = useState(true);
  const {loading, callEndpoint} = useFetchAndLoad()

  const authenticateUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingAuthentication(false);
      return;
    }
    try {
      const data = await callEndpoint(getProfileService());
      setAuth(data);
    } catch (error) {
      console.log(error);
      setAuth({});
    } finally {
      setLoadingAuthentication(false);
    }
  };

  const closeSessionAuth = () => {
    setAuth({})
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loadingAuthentication, closeSessionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };