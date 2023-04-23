import { clientAxios } from '../../../utilities';

const tasksURL = '/tasks';

// export const getProjectsService = async (): Promise<any> => {
//   return await clientAxios.get(projectsURL);
// };

export const createTaskService = async (value: any): Promise<any> => {
  return await clientAxios.post(tasksURL, value);
};

export const updateTaskService = async (
  value: any,
  id: number
): Promise<any> => {
  return await clientAxios.put(`${tasksURL}/${id}`, value);
};

export const deleteTaskService = async (
  id: number
): Promise<any> => {
  return await clientAxios.delete(`${tasksURL}/${id}`);
};
