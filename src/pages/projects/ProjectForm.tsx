import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useProjects } from '../../hooks';
import { Alert, ButtonComponent, InputComponent } from '../../components';
import { useForm } from 'react-hook-form';

export const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { submitProject, updateProject, project } = useProjects();

  const params = useParams();

  const createProject = async (data: any) => {

    const { name, description, deliveryDate, client } = data

    !params.id
      ? await submitProject({ name, description, deliveryDate, client })
      : await updateProject({ name, description, deliveryDate, client });
  };

  useEffect(() => {
    if (params.id && project.name) {
      setValue('name', project.name)
      setValue('description', project.description);
      setValue('deliveryDate', project.deliveryDate?.split('T')[0]);
      setValue('client', project.client);
    } else {
      console.log('create');
    }
  }, [params, project]);

  return (
    <form onSubmit={handleSubmit(createProject)}>
      <InputComponent
        labelText="Name"
        id="name"
        type="text"
        placeholder="Email"
        register={register}
        additionalInputStyles={errors.name && 'border-b-red-500'}
        validationSchema={{
          required: {
            value: true,
            message: 'Name is required',
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
        additionalInputStyles={errors.description && 'border-b-red-500'}
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
        labelText="Date"
        id="deliveryDate"
        type="date"
        placeholder="Delivery date"
        register={register}
        additionalInputStyles={errors.DeliveryDate && 'border-b-red-500'}
        validationSchema={{
          required: {
            value: true,
            message: 'Delivery date is required',
          },
        }}
        errors={errors}
      />
      <InputComponent
        labelText="Client"
        id="client"
        type="text"
        placeholder="Client"
        register={register}
        additionalInputStyles={errors.client && 'border-b-red-500'}
        validationSchema={{
          required: {
            value: true,
            message: 'Client is required',
          },
          minLength: {
            value: 3,
            message: 'Please enter a minimum of 3 characters',
          },
        }}
        errors={errors}
      />

      <ButtonComponent
        type="submit"
        btnText={params.id ? 'Update project' : 'Create project'}
        addtionalStyles="mt-8 ml-auto"
      />
    </form>
  );
};
