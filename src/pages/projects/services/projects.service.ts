import { clientAxios } from '../../../utilities';

const projectsURL = '/projects';

export const getProjectsService = async (): Promise<any> => {
  return await clientAxios.get(projectsURL);
};

export const createProjectService = async (value: any): Promise<any> => {
  return await clientAxios.post(projectsURL, value);
};

export const updateProjectService = async (
  id: number,
  value: any
): Promise<any> => {
  return await clientAxios.put(`${projectsURL}/${id}`, value);
};

export const deleteProjectService = async (
  id: number
): Promise<any> => {
  return await clientAxios.delete(`${projectsURL}/${id}`);
};

export const getProjectDetailsService = async (id: any): Promise<any> => {
  return await clientAxios.get(`${projectsURL}/${id}`);
};
