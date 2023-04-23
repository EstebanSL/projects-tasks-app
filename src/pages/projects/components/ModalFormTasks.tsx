import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useFetchAndLoad, useProjects } from '../../../hooks';
import { Alert, ButtonComponent, InputComponent } from '../../../components';
import { createTaskService, updateTaskService } from '../services/tasks.service';
import { useParams } from 'react-router-dom';

export const ModalFormTasks = () => {
  const {
    modalFormTaskVisibility,
    handleModalFormTaskVisibility,
    project,
    setProject,
  } = useProjects();

  const params = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [alert, setAlert] = useState<any>({});

  const { task, updateTasksContext } = useProjects();

  const { loading, callEndpoint } = useFetchAndLoad();

  const PRIORITIES = ['low', 'medium', 'high'];

  useEffect(() => {
    if (task?._id) {
      setName(task.name);
      setDescription(task.description);
      setDeliveryDate(task.deliveryDate.split('T')[0]);
      setPriority(task.priority);
    } else {
      setName('');
      setDescription('');
      setDeliveryDate('');
      setPriority('');
    }
  }, [task]);

  console.log('xd')

  const addTask = async (e: any) => {
    e.preventDefault();

    if ([name, description, priority, deliveryDate].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }
    if (task._id) {
      await editTask()
    } else {
      await createTask()
    }
  };

  const editTask = async () => {
    console.log(task._id);
    try {
      const updatedTask = await callEndpoint(
        updateTaskService({
          name,
          description,
          priority,
          deliveryDate,
          project: params.id,
        }, task._id)
      );
      updateTasksContext(updatedTask)
      setAlert({})
      handleModalFormTaskVisibility();
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    console.log(task._id);
    try {
      const savedTask = await callEndpoint(
        createTaskService({
          name,
          description,
          priority,
          deliveryDate,
          project: params.id,
        })
      );
      const updatedProject = { ...project };
      updatedProject.tasks = [...project.tasks, savedTask];
      setProject(updatedProject);
      setAlert({})
      handleModalFormTaskVisibility();
    } catch (error) {
      console.log(error);
    }
  };

  const { msg } = alert;

  return (
    <Transition.Root show={modalFormTaskVisibility} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => handleModalFormTaskVisibility()}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => handleModalFormTaskVisibility()}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    <p className="text-4xl">
                      {task?._id ? 'Edit' : 'Create'} task
                    </p>
                  </Dialog.Title>
                  <form
                    onSubmit={addTask}
                    className="bg-white p-4 py-8 rounded-md flex flex-col gap-2"
                  >
                    <InputComponent
                      labelText="Name"
                      id="Name"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e: any) => setName(e.target.value)}
                    />

                    <InputComponent
                      labelText="Description"
                      id="Description"
                      type="Description"
                      placeholder="Description"
                      value={description}
                      onChange={(e: any) => setDescription(e.target.value)}
                    />

                    <InputComponent
                      labelText="DeliveryDate"
                      id="DeliveryDate"
                      type="date"
                      placeholder="DeliveryDate"
                      value={deliveryDate}
                      onChange={(e: any) => setDeliveryDate(e.target.value)}
                    />

                    <label
                      htmlFor={priority}
                      className="font-bold text-sky-900"
                    >
                      Priority
                    </label>
                    <select
                      className="w-full text-sky-900 px-4 py-2 rounded-md border-2 border-gray-300 outline-none focus:border-sky-900 focus:border-2 bg-gray-200"
                      name="priority"
                      id="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value=""> -- Select priority --</option>
                      {PRIORITIES.map((priority) => {
                        return <option key={priority}>{priority}</option>;
                      })}
                    </select>

                    <ButtonComponent
                      type="submit"
                      btnText={`${task?._id ? 'Edit' : 'Create'} task`}
                      addtionalStyles="mt-4"
                    />
                    {msg && <Alert alert={alert} />}
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
