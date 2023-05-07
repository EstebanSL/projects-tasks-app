import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';

const AuthLayout = () => {
  const { auth, loadingAuthentication } = useAuth()
  return (
    <>
      {
        !auth._id ? 
        <main className="container mx-auto px-8 md:flex md:justify-center box-border">
        <div className='w-full flex justify-center'>
          <Outlet />
        </div>
      </main>
      : <Navigate to='/projects' />
      }
    </>
  );
};

export default AuthLayout;
