import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../../hooks';
import { ProjectForm } from './';
import ContentWrapper from '../../components/ContentWrapper';

export const EditProject = () => {
  const params = useParams();
  const { getProjectDetails } = useProjects();

  const getProject = async () => getProjectDetails(params.id);

  useEffect(() => {
    getProject();
  }, []);

  return (
    <ContentWrapper>
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-8 text-center">Edit Project</h1>
      </div>

      <ProjectForm />
    </ContentWrapper>
  );
};
