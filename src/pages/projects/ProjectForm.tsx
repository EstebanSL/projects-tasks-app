import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../../hooks';
import { ButtonComponent, InputComponent } from '../../components';
import { useForm } from 'react-hook-form';

export const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const { submitProject, updateProject, project } = useProjects();

  const params = useParams();

  const createProject = async (data: any) => {
    const { name, description, deliveryDate, client } = data;

    !params.id
      ? await submitProject({ name, description, deliveryDate, client })
      : await updateProject({ name, description, deliveryDate, client });
  };

  const handleCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (params.id && project.name) {
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('deliveryDate', project.deliveryDate?.split('T')[0]);
      setValue('client', project.client);
    }
  }, [params, project]);

  return (
    <form
      onSubmit={handleSubmit(createProject)}
      className="flex flex-col gap-4"
    >
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
        labelText="Delivery date"
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

      <div className="flex mt-8 gap-4">
      <ButtonComponent
        type="button"
        btnText='Cancel'
        addtionalStyles="ml-auto"
        styleType="destructive"
        onClick={() => handleCancel()}
      />
      <ButtonComponent
        type="submit"
        btnText={params.id ? 'Update project' : 'Create project'}
        styleType="primary"
      />
      </div>
    </form>
  );
};
