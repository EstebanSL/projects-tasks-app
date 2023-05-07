import React from 'react';
import { ButtonComponent } from '../../../components';
import { useProjects } from '../../../hooks';
import { useModals } from '../../../hooks/useModals';

export const PreviewPartnerCard = ({ partner }: any) => {
  const { handleModalDeletePartnerVisibility } =
    useModals();

  return (
    <div>
      <p>{partner.username}</p>
      <ButtonComponent
        addtionalStyles="bg-red-500"
        btnText="Delete"
        type="button"
        onClick={() => handleModalDeletePartnerVisibility(partner)}
      ></ButtonComponent>
    </div>
  );
};
