import ContentWrapper from '../../components/ContentWrapper';
import Loader from '../../components/Loader';
import { useProjects } from '../../hooks';
import { PreviewProjectCard } from './';
import { ModalDeleteProject } from './components/ModalDeleteProject';

export const Projects = () => {
  // Variables
  const { projects, loading } = useProjects();

  // Conditional template
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // Template
  return (
    <>
      <ContentWrapper>
        <h1 className="text-4xl font-bold mb-8 mt-4 text-center text-slate-900">
          Projects
        </h1>
        <div className="flex flex-col auto-cols-max gap-4 justify-center">
          {projects.length === 0 ? (
            <p>No projects found</p>
          ) : (
            projects.map((project: any) => {
              return <PreviewProjectCard key={project._id} data={project} />;
            })
          )}
        </div>
      </ContentWrapper>
    </>
  );
};
