import { ButtonComponent } from '.';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const Sidebar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="fixed md:w-60 lg:w-80 flex flex-col items-center h-[calc(100vh-72px)] px-4 py-6 bg-white mt-[72px] z-40">
      <p>Hello, {auth.username}</p>

      <ButtonComponent
        btnText="Create project"
        onClick={() => navigate('create-project')}
        type="button"
        addtionalStyles="mt-4 w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </ButtonComponent>
    </aside>
  );
};
