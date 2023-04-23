import ContentWrapper from '../../components/ContentWrapper';
import { ProjectForm } from './';

export const CreateProject = () => {
  return (
    <ContentWrapper>
      <h1 className="text-4xl font-bold text-sky-800 mt-4 mb-8 text-center">
        Create project
      </h1>
      <ProjectForm />
    </ContentWrapper>
  );
};
