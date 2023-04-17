import { useProjects } from "../../hooks";
import {PreviewProjectCard} from "./";

export const Projects = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <>
        <h1 className="text-4xl font-bold m-8">Projects</h1>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold m-8">Projects</h1>
      <div className="flex flex-col gap-1">
        {projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          projects.map((project: any) => {
            return <PreviewProjectCard key={project._id} data={project} />;
          })
        )}
      </div>
    </>
  );
};

