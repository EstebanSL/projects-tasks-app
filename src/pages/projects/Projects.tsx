import ContentWrapper from '../../components/ContentWrapper';
import { useProjects } from '../../hooks';
import { PreviewProjectCard } from './';

export const Projects = () => {
  // Variables
  const { projects, loading } = useProjects();

  // Conditional template
  if (loading) {
    return (
      <>
        <h1 className="text-4xl font-bold m-8">Projects</h1>
        <p>Loading...</p>
      </>
    );
  }

  // Template
  return (
    <>
      <ContentWrapper>
        <h1 className="text-4xl font-bold mb-8 mt-4 text-center text-sky-800">
          Projects
        </h1>
        <div className="flex flex-col gap-2">
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
