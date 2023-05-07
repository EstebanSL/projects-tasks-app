import React, { useState } from 'react';
import { SearchPartnerForm } from './SearchPartnerForm';
import { useFetchAndLoad, useProjects } from '../../hooks';
import { ButtonComponent } from '../../components';
import { useParams } from 'react-router-dom';
import { addPartnersService } from './services';

export const NewPartner = () => {
  const { project } = useProjects();

  const [searchedPartner, setSearchedPartner] = useState<any>({
    value: {},
    error: false,
  });

  const { loading, callEndpoint } = useFetchAndLoad();

  const params = useParams();

  const addPartner = async () => {
    try {
      await callEndpoint(
        addPartnersService(params.id!, { email: searchedPartner.value.email })
      );
    } catch (error) {}
  };

  return (
    <div className="bg-white p-8 flex flex-col gap-2 box-border">
      <h1 className="text-4xl text-center mb-6 font-bold text-black">
        Add partner to: {project.name}
      </h1>

      <SearchPartnerForm setSearchedPartner={setSearchedPartner} />

      {searchedPartner?.value?.email && (
        <div>
          <p>{searchedPartner.value.username}</p>
          <ButtonComponent
            type="button"
            btnText="Add"
            onClick={() => addPartner()}
          />
        </div>
      )}
    </div>
  );
};
