import React from 'react';
import { ButtonComponent } from '../../../components';
import { formatDate } from '../../../utilities/formatDates';
import { useProjects } from '../../../hooks';

const PreviewTaskCard = ({ task }: any) => {

  const { handleModalEditTask, handleModalDeleteTaskVisibility } = useProjects()

  return (
    <div className="">
      <div>
        <p className="text-xl font-bold">{task.name}</p>
        <p className="text-xl text-gray-500">{task.description}</p>
        <p className="text-xl text-gray-500">{formatDate(task.deliveryDate)}</p>
        <p className="text-xl font-bold">{task.priority}</p>
      </div>
      <div>
        <ButtonComponent
          addtionalStyles="bg-sky-600"
          btnText="Edit"
          type="button"
          onClick={() => handleModalEditTask(task)}
        >
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

        {task.status ? (
          <ButtonComponent
            addtionalStyles="bg-green-500"
            btnText="Complete"
            type="button"
            onClick={() => console.log('xd')}
          >
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
        ) : (
          <ButtonComponent
            addtionalStyles="bg-purple-500"
            btnText="Uncomplete"
            type="button"
            onClick={() => console.log('xd')}
          >
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
        )}

        <ButtonComponent
          addtionalStyles="bg-red-500"
          btnText="Delete"
          type="button"
          onClick={() => handleModalDeleteTaskVisibility(task)}
        >
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
      </div>
    </div>
  );
};

export default PreviewTaskCard;
