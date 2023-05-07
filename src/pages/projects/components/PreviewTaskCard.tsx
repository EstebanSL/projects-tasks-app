import React from 'react';
import { ButtonComponent } from '../../../components';
import { formatDate } from '../../../utilities/formatDates';
import { useFetchAndLoad, useProjects } from '../../../hooks';
import { useModals } from '../../../hooks/useModals';
import useAdmin from '../../../hooks/useAdmin';
import { completeTaskService } from '../services/tasks.service';

const PreviewTaskCard = ({ task }: any) => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const { socket } = useProjects();
  const admin = useAdmin();

  const { handleModalEditTask, handleModalDeleteTaskVisibility } = useModals();

  const completeTask = async (taskID: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const data = await callEndpoint(completeTaskService(taskID));
      socket.emit('editTask', data)
    } catch (error) {}
  };

  const { _id } = task;

  return (
    <div className="flex">
      <div>
        <p className="text-xl font-bold">{task.name}</p>
        <p className="text-xl text-gray-500">{task.description}</p>
        <p className="text-xl text-gray-500">{formatDate(task.deliveryDate)}</p>
        <p className="text-xl font-bold">{task.priority}</p>
      {task.status && <p>Completed by: {task.completedBy.username}</p>}
      </div>

      <div className="flex gap-1 items-center">
        {admin && (
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
        )}

        {task.status ? (
          <ButtonComponent
            addtionalStyles="bg-green-500"
            btnText="Complete"
            type="button"
            onClick={() => completeTask(_id)}
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
            onClick={() => completeTask(_id)}
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

        {admin && (
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
        )}
      </div>
    </div>
  );
};

export default PreviewTaskCard;
