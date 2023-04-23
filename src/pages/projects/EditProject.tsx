import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../../hooks';
import { ProjectForm } from './';
import ContentWrapper from '../../components/ContentWrapper';

export const EditProject = () => {
  const params = useParams();
  const { getProjectDetails, deleteProject } = useProjects();

  const getProject = async () => getProjectDetails(params.id);

  useEffect(() => {
    getProject();
  }, []);

  return (
    <ContentWrapper>
      <div>
        <h1 className="text-4xl font-bold text-sky-800 mt-4 mb-8 text-center">EditProject</h1>
      </div>

      <ProjectForm />
    </ContentWrapper>
  );
};
