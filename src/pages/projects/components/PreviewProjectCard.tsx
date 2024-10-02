import { Link, useNavigate } from "react-router-dom";
import { useAuth, useProjects } from "../../../hooks";
import { useModals } from "../../../hooks/useModals";
import { ModalDeleteProject } from "./ModalDeleteProject";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, FolderOpen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreateProject } from "../CreateProject";

export const PreviewProjectCard = ({ data }: any) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { deleteProject, setProject } = useProjects();

  const { handleModalDeleteProjectVisibility } = useModals();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const handleDelete = () => {
    handleModalDeleteProjectVisibility(data);
  };

  return (
    <>
      <TableRow key={data.id}>
        <TableCell>
          <div className="flex space-x-4">
            <p>{data.name}</p>
            {auth._id !== data.creator && (
              <Badge variant="outline" className="border-blue-500 font-normal">Collaborator</Badge>
            )}
          </div>
        </TableCell>
        <TableCell>{data.description}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleNavigate(`${data._id}`)}
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open project</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleNavigate(`edit-project/${data._id}`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit project</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete()}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <CreateProject />
              </TooltipContent>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
      {/* <div className="px-2 py-2 border-2 border-slate-800 rounded-md bg-slate-900 flex gap-4 w-full justify-between">
        <div className="flex flex-col justify-between px-4">
          <h2 className="text-2xl font-black m-0 gap-1 hyphens-auto text-white text-ellipsis whitespace-nowrap overflow-hidden w-full">
            {data.name}
          </h2>
          <span className="text-gray-100 font-regular text-center md:text-start">
            Client : {data.client}
          </span>
        </div>
        {auth._id !== data.creator && (
          <div className="ml-0 md:ml-4 bg-sky-400 rounded-full px-2">
            Partner
          </div>
        )}
        <div className="flex gap-1">
          <div
            onClick={() => handleNavigate(`${data._id}`)}
            className="w-[80px] rounded-md text-white flex flex-col items-center p-2 flex-1 border-2 border-white hover:border-white hover:bg-white hover:text-slate-900 cursor-pointer"
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
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>
            <p>Open</p>
          </div>
          <div
            onClick={() => handleNavigate(`edit-project/${data._id}`)}
            className="w-[80px] rounded-md text-white flex flex-col items-center p-2 flex-1 border-2 border-white hover:border-white hover:bg-white hover:text-slate-900  cursor-pointer"
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <p>Edit</p>
          </div>
          <div
            onClick={() => handleDelete()}
            className="w-[80px] rounded-md text-white flex flex-col items-center p-2 flex-1 border-2 border-white hover:border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>

            <p>Delete</p>
          </div>
        </div>
        
      </div> */}
      <ModalDeleteProject />
    </>
  );
};
