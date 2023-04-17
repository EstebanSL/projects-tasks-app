import { Link } from 'react-router-dom';

export const PreviewProjectCard = ({ data }: any) => {
  return (
    <div className="px-4 py-6 bg-white rounded-mg flex">
      <p className="flex-1 font-bold">
        {' '}
        {data.name}
        <span className=" ml-4 font-semibold text-gray-500">{data.client}</span>
      </p>
      <Link
        to={`${data._id}`}
        className="font-bold text-sky-800 hover:underline"
      >
        Open project
      </Link>
    </div>
  );
};
