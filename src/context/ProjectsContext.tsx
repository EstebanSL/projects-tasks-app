import { createContext, useEffect, useState } from 'react';
import {
  createProjectService,
  deleteProjectService,
  getProjectDetailsService,
  getProjectsService,
  updateProjectService,
} from '../pages/projects/services/projects.service';
import { useAuth, useFetchAndLoad } from '../hooks';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext({});

export const ProjectsContextProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<any>([]);
  const [project, setProject] = useState<any>([]);
  const [modalFormTaskVisibility, SetModaFormTaskVisibility] =
    useState<any>(false);

  const [modalDeleteTaskVisibility, setModalDeleteTaskVisibility] =
    useState<any>(false);

  const [task, setTask] = useState({});

  const { auth } = useAuth();
  const { loading, callEndpoint } = useFetchAndLoad();
  const navigate = useNavigate();

  const getProjects = async () => {
    if (auth._id) {
      const data = await callEndpoint(getProjectsService());
      setProjects(data);
    }
  };

  const getProjectDetails = async (id: string) => {
    if (auth._id) {
      const data = await callEndpoint(getProjectDetailsService(id));
      setProject(data);
    }
  };

  const submitProject = async (project: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const data = await callEndpoint(createProjectService(project));
      setProjects([...projects, data]);
    } catch (error) {}
  };

  const updateProject = async (updatedProject: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const data = await callEndpoint(
        updateProjectService(project._id, updatedProject)
      );
      const updatedProjects = projects.map((projectState: any) => {
        return projectState._id === data ? data : projectState;
      });
      console.log(updatedProjects);
      setProjects(updatedProjects);
    } catch (error) {}
  };

  const deleteProject = async (projectId: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await callEndpoint(deleteProjectService(projectId));
      const updatedProjects = projects.filter((projectState: any) => {
        return projectState._id !== projectId;
      });
      setProjects(updatedProjects);
      console.log(updatedProjects);
      navigate('/projects');
    } catch (error) {}
  };

  const updateTasksContext = (updatedTask: any) => {
    const updatedProject = { ...project };
    updatedProject.tasks = updatedProject.tasks?.map((task: any) => {
      return updatedTask._id === task._id ? updatedTask : task;
    });
    setProject(updatedProject);
  };

  const handleModalFormTaskVisibility = () => {
    setTask({});
    SetModaFormTaskVisibility(!modalFormTaskVisibility);
  };

  const handleModalEditTask = (task: any) => {
    setTask(task);
    SetModaFormTaskVisibility(!modalFormTaskVisibility);
  };

  const handleModalDeleteTaskVisibility = (task: any) => {
    setTask(task);
    setModalDeleteTaskVisibility(!modalDeleteTaskVisibility);
  };

  useEffect(() => {
    getProjects();
  }, [auth]);

  return (
    <ProjectsContext.Provider
      value={{
        deleteProject,
        getProjectDetails,
        getProjects,
        handleModalDeleteTaskVisibility,
        handleModalEditTask,
        handleModalFormTaskVisibility,
        loading,
        modalDeleteTaskVisibility,
        modalFormTaskVisibility,
        project,
        projects,
        setProject,
        setProjects,
        submitProject,
        task,
        updateProject,
        updateTasksContext,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext };
