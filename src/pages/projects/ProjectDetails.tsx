import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../../hooks';

export const ProjectDetails = () => {
  const params = useParams();
  const { project, loading, getProjectDetails } = useProjects();
  const navigate = useNavigate();
  useEffect(() => {
    getProjectDetails(params.id);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {project.name}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
        onClick={() => navigate(`/projects/edit-project/${project._id}`)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </div>
  );
};

export default ProjectDetails;
