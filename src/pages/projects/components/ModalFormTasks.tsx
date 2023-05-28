import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useFetchAndLoad, useProjects } from '../../../hooks';
import { Alert, ButtonComponent, InputComponent } from '../../../components';
import {
  createTaskService,
  updateTaskService,
} from '../services/tasks.service';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useModals } from '../../../hooks/useModals';
import { successToast } from '../../../utilities/toasts';

export const ModalFormTasks = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { socket } = useProjects();

  const { modalFormTaskVisibility, handleModalFormTaskVisibility } =
    useModals();

  const params = useParams();

  const { task, updateTasksContext } = useProjects();

  const { loading, callEndpoint } = useFetchAndLoad();

  const PRIORITIES = ['low', 'medium', 'high'];

  useEffect(() => {
    if (task?._id) {
      setValue('name', task.name);
      setValue('description', task.description);
      setValue('deliveryDate', task.deliveryDate.split('T')[0]);
      setValue('priority', task.priority);
    } else {
      setValue('name', '');
      setValue('description', '');
      setValue('deliveryDate', '');
      setValue('priority', '');
    }
  }, [task]);

  const addTask = async (data: any) => {
    if (task._id) {
      await editTask(data);
    } else {
      await createTask(data);
    }
  };

  const editTask = async (data: any) => {
    const { name, description, priority, deliveryDate } = data;
    try {
      const updatedTask = await callEndpoint(
        updateTaskService(
          {
            name,
            description,
            priority,
            deliveryDate,
            project: params.id,
          },
          task._id
        )
      );
      console.log(updatedTask);
      successToast('Task edited successfully');
      handleModalFormTaskVisibility();
      socket.emit('editTask', updatedTask)
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    reset({
      name: '',
      description: '',
      deliveryDate: '',
      priority: '',
    });
  };

  const createTask = async (data: any) => {
    const { name, description, priority, deliveryDate } = data;
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
      handleModalFormTaskVisibility();
      socket.emit('createTask', savedTask)
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show={modalFormTaskVisibility} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {
          handleModalFormTaskVisibility();
          resetForm();
        }}
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
            <div className="inline-block align-bottom bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    handleModalFormTaskVisibility();
                    resetForm();
                  }}
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
                    onSubmit={handleSubmit(addTask)}
                    className="bg-white p-4 py-8 flex flex-col gap-2"
                  >
                    <InputComponent
                      labelText="Name"
                      id="name"
                      type="text"
                      placeholder="Name"
                      register={register}
                      additionalInputStyles={errors.name && 'border-b-red-500'}
                      validationSchema={{
                        required: {
                          value: true,
                          message: 'Email is required',
                        },
                        minLength: {
                          value: 3,
                          message: 'Please enter a minimum of 3 characters',
                        },
                      }}
                      errors={errors}
                    />

                    <InputComponent
                      labelText="Description"
                      id="description"
                      type="text"
                      placeholder="Description"
                      register={register}
                      additionalInputStyles={
                        errors.description && 'border-b-red-500'
                      }
                      validationSchema={{
                        required: {
                          value: true,
                          message: 'Description is required',
                        },
                        minLength: {
                          value: 3,
                          message: 'Please enter a minimum of 3 characters',
                        },
                      }}
                      errors={errors}
                    />

                    <InputComponent
                      labelText="DeliveryDate"
                      id="deliveryDate"
                      type="date"
                      placeholder="Name"
                      register={register}
                      additionalInputStyles={errors.name && 'border-b-red-500'}
                      validationSchema={{
                        required: {
                          value: true,
                          message: 'Delivery date is required',
                        },
                      }}
                      errors={errors}
                    />

                    <label
                      htmlFor="priority"
                      className="font-bold text-slate-900"
                    >
                      Priority
                    </label>
                    <select
                      className="w-full text-slate-900 px-4 py-2 border-2 border-gray-300 outline-none focus:border-sky-900 focus:border-2 bg-gray-200"
                      id="priority"
                      {...register('priority', {
                        required: {
                          value: true,
                          message: 'Priority is required',
                        },
                      })}
                    >
                      <option value=""> -- Select priority --</option>
                      {PRIORITIES.map((priority) => {
                        return <option key={priority}>{priority}</option>;
                      })}
                    </select>
                    {errors.priority?.message && (
                      <Alert msg={errors.priority?.message} />
                    )}

                    <ButtonComponent
                      loading={loading}
                      type="submit"
                      btnText={`${task?._id ? 'Edit' : 'Create'} task`}
                      addtionalStyles="mt-4"
                    />
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
