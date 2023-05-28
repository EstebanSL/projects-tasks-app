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
import { errorToast, successToast } from '../utilities/toasts';
import { io } from 'socket.io-client';

let socket: any;

const ProjectsContext = createContext({});

export const ProjectsContextProvider = ({ children }: any) => {
  // VARIABLES - STATES

  /**
   * Hook to navigate on the app
   */
  const navigate = useNavigate();

  /**
   * Gets the authenticated user information
   */
  const { auth } = useAuth();

  /**
   * Custom hook that allows to fetch information and know when its loading
   */
  const { loading, callEndpoint } = useFetchAndLoad();

  /**
   * Stores and updates the projects list
   */
  const [projects, setProjects] = useState<any>([]);

  /**
   * Store and update the active project
   */
  const [project, setProject] = useState<any>({});

  const [error, setError] = useState<any>(null);
  const [partner, setPartner] = useState({});
  const [task, setTask] = useState({});

  // FUNCTIONS

  /**
   * Fetchs the projects list from the server
   * @returns {Promise<void>}
   */
  const getProjects = async (): Promise<void> => {
    if (auth._id) {
      const data = await callEndpoint(getProjectsService());
      setProjects(data);
    }
  };

  /**
   * Fetchs the project information from the server
   * @param {string } id - Project identifier
   */
  const getProjectDetails = async (id: string) => {
    if (auth._id) {
      try {
        const data = await callEndpoint(getProjectDetailsService(id));
        setProject(data);
      } catch (error) {
        navigate('/projects');
        errorToast('Your dont have permission to access this project');
        setError(error);
      }
    }
  };

  /**
   * Saves a new project in db and updates the list of projects
   * @param {Project} project - new project information
   * @returns
   */
  const submitProject = async (project: Project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const data = await callEndpoint(createProjectService(project));
      setProjects([...projects, data]);
      successToast('Project created successfully');
      navigate('/projects');
    } catch (error) {
      errorToast('error creating project')
    }
  };

  /**
   * Saves the edited information inf the project in db and updates the list of projects
   * @param {updatedProject} updatedProject - Project information updated
   * @returns
   */
  const updateProject = async (updatedProject: Project) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const data = await callEndpoint(
        updateProjectService(project._id, updatedProject)
      );
      const updatedProjects = projects.map((projectState: any) => {
        return projectState._id === data._id ? data : projectState;
      });
      setProjects(updatedProjects);
      successToast('Project edited successfully');
      navigate(`/projects/${project._id}`)
    } catch (error) {
      errorToast('Error while updating project')
    }
  };

  /**
   * Delete a project from the server and updates the prokects
   * @param {string} projectId - Project identifier
   * @returns {Promise<void>}
   */
  const deleteProject = async (projectId: string): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await callEndpoint(deleteProjectService(projectId));
      const updatedProjects = projects.filter((projectState: Project) => {
        return projectState._id !== projectId;
      });
      setProjects(updatedProjects);
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

  const updateNewUsersTasks = (savedTask: any) => {
    const updatedProject = { ...project };
    updatedProject.tasks = [...updatedProject.tasks, savedTask];
    setProject(updatedProject);
  };

  const updateDeleteUsersTasks = (deletedTask: any) => {
    const updatedProject: Project = { ...project };
    updatedProject.tasks = updatedProject.tasks?.filter(
      (StateTask: any) => StateTask._id !== deletedTask._id
    );
    setProject(updatedProject);
  };

  const updateDeleteUsersProject = (deletedProject: any) => {
    let updatedProjects: Project[] = { ...projects };
    updatedProjects = projects.filter(
      (project: any) => project._id !== deletedProject._id
    );

    setProjects(updatedProjects);
  };

  const closeSessionProjects = () => {
    setProjects([])
    setProject({})
  }

  // EFFECTS
  useEffect(() => {

    getProjects();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  //TEMPLATE

  return (
    <ProjectsContext.Provider
      value={{
        project,
        projects,
        setProject,
        setProjects,
        getProjectDetails,
        getProjects,
        submitProject,
        updateProject,
        deleteProject,
        loading,
        task,
        setTask,
        updateTasksContext,
        partner,
        setPartner,
        error,
        setError,
        updateNewUsersTasks,
        updateDeleteUsersTasks,
        socket,
        closeSessionProjects,
        updateDeleteUsersProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext };
