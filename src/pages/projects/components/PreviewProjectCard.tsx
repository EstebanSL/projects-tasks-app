import { Link } from 'react-router-dom';

export const PreviewProjectCard = ({ data }: any) => {
  return (
    <div className="px-4 py-6 bg-gray-200 rounded-md flex flex-col sm:flex-row gap-2">
      <h2 className="flex flex-col text-xl flex-1 text-2xl font-black m-auto gap-1">
        {data.name}
        <span className="text-md font-semibold text-xl font-black text-gray-500">
          {data.client}
        </span>
      </h2>
      <Link
        to={`${data._id}`}
        className="m-auto py-2 px-4 font-bold text-sky-600 border-2 border-solid border-sky-600 rounded-md hover:bg-sky-600 hover:text-white"
      >
        Open project
      </Link>
    </div>
  );
};
