import { createContext, useState } from 'react';

import { useProjects } from '../hooks';

const ModalsContext = createContext({});

export const ModalContextProvider = ({ children }: any) => {
  const { setTask, setPartner } = useProjects();
  const [modalFormTaskVisibility, SetModalFormTaskVisibility] =
    useState<any>(false);

  const [modalDeleteTaskVisibility, setModalDeleteTaskVisibility] =
    useState<any>(false);

  const [modalDeletePartnerVisibility, setModalDeletePartnerVisibility] =
    useState<any>(false);

  const [modalSearchBoxVisibility, setSearchBoxVisibility] =
    useState<any>(false);

  const handleModalFormTaskVisibility = () => {
    setTask({});
    SetModalFormTaskVisibility(!modalFormTaskVisibility);
  };

  const handleModalEditTask = (task: any) => {
    setTask(task);
    SetModalFormTaskVisibility(!modalFormTaskVisibility);
  };

  const handleModalDeleteTaskVisibility = (task: any) => {
    setTask(task);
    setModalDeleteTaskVisibility(!modalDeleteTaskVisibility);
  };
  const handleModalDeletePartnerVisibility = (partner: any) => {
    setPartner(partner);
    setModalDeletePartnerVisibility(!modalDeletePartnerVisibility);
  };
  const handleModalSearchBoxVisibility = () => {
    setSearchBoxVisibility(!modalSearchBoxVisibility);
  };

  return (
    <ModalsContext.Provider
      value={{
        handleModalDeletePartnerVisibility,
        handleModalDeleteTaskVisibility,
        handleModalEditTask,
        handleModalFormTaskVisibility,
        handleModalSearchBoxVisibility,
        modalDeletePartnerVisibility,
        modalDeleteTaskVisibility,
        modalFormTaskVisibility,
        modalSearchBoxVisibility
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export { ModalsContext };
