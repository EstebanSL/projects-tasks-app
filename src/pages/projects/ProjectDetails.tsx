import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../../hooks';
import { ButtonComponent } from '../../components';
import ContentWrapper from '../../components/ContentWrapper';
import { ModalFormTasks } from './components/ModalFormTasks';
import PreviewTaskCard from './components/PreviewTaskCard';
import { ModalDeleteTask } from './components/ModalDeleteTask';

export const ProjectDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const { project, loading, getProjectDetails, deleteProject, handleModalFormTaskVisibility } = useProjects();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(params.id);
    } else {
      console.log('no');
    }
  };

  useEffect(() => {
    getProjectDetails(params.id);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ContentWrapper>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-sky-800">{project.name}</h1>
        <div
          className="ml-auto flex font-bold text-gray-600 hover:text-black cursor-pointer"
          onClick={() => navigate(`/projects/edit-project/${project._id}`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <p>Edit</p>
        </div>
        <div>
          <button
            onClick={() => handleDelete()}
            className="ml-auto flex font-bold text-gray-600 hover:text-red-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
      <ButtonComponent btnText="AddTask" addtionalStyles="mt-6 mb-4" onClick={() => handleModalFormTaskVisibility()} type='button'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </ButtonComponent>

      <p className='font-black text-2xl mt-8 mb-4'>Project tasks</p>

      <div>
        {
          project.tasks?.length < 1 ? <p>There is not tasks in this projects</p> : 
          (
            project.tasks?.map((task: any) => {
              return <PreviewTaskCard task={task} key={task._id} />
            })
          )
        }
      </div>

      <ModalFormTasks />
      <ModalDeleteTask />
    </ContentWrapper>
  );
};

export default ProjectDetails;
