import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { useModals } from '../hooks/useModals';
import { useProjects } from '../hooks';
import { useNavigate } from 'react-router-dom';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const SarchBox = () => {
  const { modalSearchBoxVisibility, handleModalSearchBoxVisibility } = useModals();
  const [search, setSearch] = useState<any>('');
  const { projects } = useProjects()
  const navigate = useNavigate()

  const filteredProjects = search === '' ? [] : projects.filter((project: any) => project.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <Transition.Root
      show={modalSearchBoxVisibility}
      as={Fragment}
      afterLeave={() => setSearch('')}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20"
        onClose={() =>handleModalSearchBoxVisibility()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            onChange={(project: any) => (navigate(`/projects/${project._id}`))}
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Buscar..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                  {
                    filteredProjects.map((project: any) => 
                      <Combobox.Option
                        key={project._id}
                        value={project}
                        className={({active}) => classNames('cursor-default select-none px-4 py-2', active && 'bg-sky-600 text-white')}
                      >
                        {project.name}
                      </Combobox.Option>
                    )
                  }
                {projects.name}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default SarchBox;
