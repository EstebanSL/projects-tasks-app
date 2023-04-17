import { createContext, useEffect, useState } from 'react';
import {
  createProjectService,
  getProjectDetailsService,
  getProjectsService,
  updateProjectService,
} from '../pages/projects/services/projects.service';
import { useAuth, useFetchAndLoad } from '../hooks';

const ProjectsContext = createContext({});

export const ProjectsContextProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<any>([]);
  const [project, setProject] = useState<any>([]);
  const { auth } = useAuth();
  const { loading, callEndpoint } = useFetchAndLoad();

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
      const data = await callEndpoint(updateProjectService(project._id, updatedProject));
      const updatedProjects = projects.map((projectState: any) => {
        return projectState._id === data ? data : projectState
      })
      console.log(updatedProjects)
      setProjects(updatedProjects)
    } catch (error) {}
  };

  useEffect(() => {
    getProjects();
  }, [auth]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        submitProject,
        updateProject,
        getProjects,
        getProjectDetails,
        loading,
        project,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext };

