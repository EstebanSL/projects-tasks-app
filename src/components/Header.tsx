import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonComponent, InputComponent } from '.';
import SarchBox from './SearchBox';
import { useModals } from '../hooks/useModals';
import { useAuth, useProjects } from '../hooks';

export const Header = () => {
  const { closeSessionProjects } = useProjects();
  const { closeSessionAuth } = useAuth();

  const closeSession = () => {
    localStorage.clear();
    closeSessionProjects();
    closeSessionAuth();
  };

  const { handleModalSearchBoxVisibility } = useModals();
  return (
    <div className="shadow-md p-4 bg-white rounded-br-xl flex justify-between items-center drop-shadow-md z-50 fixed w-full">
      <Link
        to="/projects"
        className="text-3xl font-black"
      >
        ProTaskApp
      </Link>

      <div className="flex items-center gap-4">
        <ButtonComponent
          type="button"
          btnText="Search project"
          onClick={() => handleModalSearchBoxVisibility()}
          addtionalStyles="rounded-md"
          styleType="primary"
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </ButtonComponent>
        <ButtonComponent
          type="button"
          btnText="Log out"
          onClick={() => closeSession()}
          addtionalStyles="rounded-md"
          styleType="destructive"
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
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </ButtonComponent>
      </div>
      <SarchBox />
    </div>
  );
};
