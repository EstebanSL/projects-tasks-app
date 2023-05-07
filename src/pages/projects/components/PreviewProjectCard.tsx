import { Link } from 'react-router-dom';
import { useAuth, useProjects } from '../../../hooks';

export const PreviewProjectCard = ({ data }: any) => {
  const { auth } = useAuth();

  return (
     <div className="px-4 py-6 bg-gray-200 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black m-auto gap-1">
          {data.name}
        </h2>
        <span className="text-gray-500 font-regular text-center md:text-start">{data.client}</span>
      </div>
      {auth._id !== data.creator && <div className='ml-0 md:ml-4 bg-sky-400 rounded-full px-2'>Partner</div>}
      <Link
        to={`${data._id}`}
        className="ml-0 md:ml-auto w-full md:w-fit py-2 px-4 text-center font-bold text-sky-600 border-2 border-solid border-sky-600 hover:bg-sky-600 hover:text-white"
      >
        Open project
      </Link>
    </div>
  );
};
