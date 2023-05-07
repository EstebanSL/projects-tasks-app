import React from 'react';
import { ButtonComponent, InputComponent } from '../../components';
import { useForm } from 'react-hook-form';
import { useFetchAndLoad, useProjects } from '../../hooks';
import { searchPartnersService } from './services';

export const SearchPartnerForm = ({ setSearchedPartner }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { searchUsers } = useProjects();

  const { loading, callEndpoint } = useFetchAndLoad();

  const searchPartner = async ({ email }: any) => {
    try {
      const data = await callEndpoint(searchPartnersService({ email }));
      setSearchedPartner({value: data, error: false});
    } catch (error) {
      setSearchedPartner({value: {}, error: true});
    }
  };

  return (
    <form onSubmit={handleSubmit(searchPartner)}>
      <InputComponent
        labelText="User email"
        id="email"
        type="email"
        placeholder="User email"
        register={register}
        validationSchema={{
          required: {
            value: true,
            message: 'User email is required',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'invalid email address',
          },
        }}
        errors={errors}
      />
      <ButtonComponent
        loading={loading}
        type="submit"
        btnText="Search partner"
        addtionalStyles="mt-4 mx-auto w-full"
      />
    </form>
  );
};
