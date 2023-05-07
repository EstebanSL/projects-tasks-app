import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonComponent, InputComponent } from '.';
import SarchBox from './SearchBox';
import { useModals } from '../hooks/useModals';
import { useAuth, useProjects } from '../hooks';

export const Header = () => {

  const { closeSessionProjects } = useProjects()
  const { closeSessionAuth } = useAuth()

  const closeSession = () => {
    localStorage.clear()
    closeSessionProjects()
    closeSessionAuth()
    
  }

  const { handleModalSearchBoxVisibility } = useModals()
  return (
    <div className="p-4 bg-white flex justify-between items-center drop-shadow-md z-100">
      <h1 className="text-3xl text-sky-600 font-black">ProTaskApp</h1>

      

      <div className="flex items-center gap-4">
        <p onClick={() => handleModalSearchBoxVisibility()}>Search project</p>
        <Link
          to="/projects"
          className="text-sky-600 font-bold px-4 py-1 border-2 border-solid border-sky-600 hover:bg-sky-600 hover:text-white"
        >
          Projects
        </Link>
        <ButtonComponent
          type="button"
          btnText="Log out"
          onClick={() => closeSession()}
        />
      </div>
      <SarchBox />
    </div>
  );
};
