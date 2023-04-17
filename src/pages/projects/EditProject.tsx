import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../../hooks';
import { ProjectForm } from './';

export const EditProject = () => {
  const params = useParams();
  const { getProjectDetails } = useProjects();

  const getProject = async () => getProjectDetails(params.id);

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <div>EditProject</div>
      <ProjectForm />
    </>
  );
};
