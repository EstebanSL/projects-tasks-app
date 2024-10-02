import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Header, Sidebar } from '../components';
import { ModalContextProvider, ProjectsContextProvider } from '../context';
import Loader from '../components/Loader';

export const ProtectedRoute = () => {
  const { auth, loadingAuthentication } = useAuth();

  if (loadingAuthentication) {
    return <Loader />;
  }

  return (
    <ProjectsContextProvider>
      <ModalContextProvider>
        {auth?._id ? (
          <div>
            <Header />
            <div className="flex min-h-[calc(100vh-72px)] z-10">
              <main className="p-6 flex-1 relative mt-[56px] min-h-[calc(100vh-72px)]">
                <Outlet />
              </main>
            </div>
          </div>
        ) : (
          <Navigate to="/" />
        )}
      </ModalContextProvider>
    </ProjectsContextProvider>
  );
};

export default ProtectedRoute;
