import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Header, Sidebar } from '../components';

export const ProtectedRoute = () => {
  const { auth, loadingAuthentication } = useAuth()

  if (loadingAuthentication) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {auth._id ? (
        <div>
          <Header />
          <div className='flex min-h-screen z-10'>
            <Sidebar />
            <main className='p-6 flex-1'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
