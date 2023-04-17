import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto p-5 md:flex md:justify-center">
        <div className='w-full flex justify-center'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
