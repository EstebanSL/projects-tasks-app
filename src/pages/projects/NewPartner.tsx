import React, { useState } from 'react';
import { SearchPartnerForm } from './SearchPartnerForm';
import { useFetchAndLoad, useProjects } from '../../hooks';
import { ButtonComponent } from '../../components';
import { useParams } from 'react-router-dom';
import { addPartnersService } from './services';
import { useEffect } from 'react';
import { errorToast } from '../../utilities/toasts';

export const NewPartner = () => {
  const { project, getProjectDetails, setProject } = useProjects();

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
    } catch (error: any) {
      errorToast(error.response.data.msg)
      
    }
  };

  useEffect(() => {
    getProjectDetails(params.id);
    return () => {
      setProject({});
    };
  }, []);

  return (
    <div className="bg-white p-8 flex flex-col gap-2 box-border">
      <h1 className="text-4xl text-center mb-6 font-bold text-black">
        Add partner to: {project.name}
      </h1>

      <SearchPartnerForm setSearchedPartner={setSearchedPartner} />

      {searchedPartner?.value?.email && (
        <div className='flex justify-between py-4'>
          <p>{searchedPartner.value.username}</p>
          <ButtonComponent
            type="button"
            btnText=""
            onClick={() => addPartner()}
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
          Add
          </ButtonComponent>
        </div>
      )}
    </div>
  );
};
