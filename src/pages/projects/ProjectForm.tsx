import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useProjects } from '../../hooks';
import { Alert, ButtonComponent, InputComponent } from '../../components';

export const ProjectForm = () => {
  const { submitProject, updateProject, project } = useProjects();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [client, setClient] = useState('');
  const [alert, setAlert] = useState<any>({});

  const params = useParams();

  const { msg } = alert;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if ([name, description, deliveryDate, client].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }

    !params.id
      ? await submitProject({ name, description, deliveryDate, client })
      : await updateProject({ name, description, deliveryDate, client });

    setAlert({
      msg: `Project was successfully ${params.id ? 'updated' : 'created'}`,
      error: false,
    });

    setName('');
    setDescription('');
    setDeliveryDate('');
    setClient('');
  };

  useEffect(() => {
    if (params.id && project.name) {
      setName(project.name);
      setDescription(project.description);
      setDeliveryDate(project.deliveryDate?.split('T')[0]);
      setClient(project.client);
    } else {
      console.log('create');
    }
  }, [params, project]);

  return (
    <form onSubmit={handleSubmit}>
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
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
      />
      <InputComponent
        labelText="DeliveryDate"
        id="DeliveryDate"
        type="date"
        placeholder="Delivery date"
        value={deliveryDate}
        onChange={(e: any) => setDeliveryDate(e.target.value)}
      />
      <InputComponent
        labelText="Client"
        id="Client"
        type="text"
        placeholder="Client name"
        value={client}
        onChange={(e: any) => setClient(e.target.value)}
      />

      <ButtonComponent
        type="submit"
        btnText={params.id ? 'Update project' : 'Create project'}
        addtionalStyles='mt-8 ml-auto'
      />
      {msg && <Alert alert={alert} />}
    </form>
  );
};