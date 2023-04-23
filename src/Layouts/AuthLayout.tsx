import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto px-8 md:flex md:justify-center box-border">
        <div className='w-full flex justify-center'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
