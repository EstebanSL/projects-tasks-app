import React from "react";
import { ButtonComponent } from "../../../components";
import { formatDate } from "../../../utilities/formatDates";
import { useFetchAndLoad, useProjects } from "../../../hooks";
import { useModals } from "../../../hooks/useModals";
import useAdmin from "../../../hooks/useAdmin";
import { completeTaskService } from "../services/tasks.service";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  CheckCircle2Icon,
  Edit2Icon,
  Trash2Icon,
  UndoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PreviewTaskCard = ({ task }: any) => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const { socket } = useProjects();
  const admin = useAdmin();

  const { handleModalEditTask, handleModalDeleteTaskVisibility } = useModals();

  const priorityColors: any = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  const completeTask = async (taskID: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await callEndpoint(completeTaskService(taskID));
      socket.emit("editTask", data);
    } catch (error) {}
  };

  const { _id } = task;

  return (
    <Card className={`w-full max-w-md ${task.status ? "bg-gray-100 dark:bg-gray-800" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-lg font-bold ${task.status ? "line-through text-gray-500" : ""}`}>{task.name}</CardTitle>
        <Badge className={`${priorityColors[task.priority]} text-white`}>
          {task.priority}
        </Badge>
        {task.status && (
            <Badge className="bg-blue-500 text-white">Completed</Badge>
          )}
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${task.status ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"}`}>
          {task.description}
        </p>
        <div className={`flex items-center mt-4 text-sm ${task.status ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"}`}>
          <CalendarIcon className="w-4 h-4 mr-1" />
          {task.deliveryDate}
        </div>
        {task.completedBy && (
          <div className="flex items-center mt-4">
            <span className={`text-sm ${task.status ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"}`}>
              Completed by {task.completedBy.username}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between mt-auto">
        {task.status ? (
          <Button variant="outline" size="sm" onClick={() => completeTask(_id)}>
            <UndoIcon className="w-4 h-4 mr-2" />
            Undo Complete
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={() => completeTask(_id)}>
            <CheckCircle2Icon className="w-4 h-4 mr-2" />
            Complete
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => handleModalEditTask(task)}>
          <Edit2Icon className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleModalDeleteTaskVisibility(task)}>
          <Trash2Icon className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
    // <div className="flex justify-between border-2 border-slate-900 p-4">
    //   <div>
    //     <p className="text-xl font-bold">{task.name}</p>
    //     <p className="text-xl text-gray-500">{task.description}</p>
    //     <p className="text-sm text-gray-500">{formatDate(task.deliveryDate)} - <span className="text-sm font-bold">{task.priority}</span></p>
    //     {task.status && <p>Completed by: {task.completedBy.username}</p>}
    //   </div>

    //   <div className="flex gap-1 items-center">
    //     {admin && (
    //       <div className="w-[50px] h-[50px] bg-slate-900 text-white rounded-md flex items-center justify-center cursor-pointer" onClick={() => handleModalEditTask(task)}>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 cursor-pointer"

    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    //           />
    //         </svg>
    //       </div>
    //     )}

    //     {!task.status ? (
    //       <div className="w-[50px] h-[50px] bg-green-600 text-white rounded-md flex items-center justify-center cursor-pointer" onClick={() => completeTask(_id)}>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 cursor-pointer"

    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M4.5 12.75l6 6 9-13.5"
    //           />
    //         </svg>
    //       </div>
    //     ) : (
    //       <div className="w-[50px] h-[50px] bg-orange-400 text-white rounded-md flex items-center justify-center cursor-pointer" onClick={() => completeTask(_id)}>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 cursor-pointer"

    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M6 18L18 6M6 6l12 12"
    //           />
    //         </svg>
    //       </div>
    //     )}

    //     {admin && (
    //       <div className="w-[50px] h-[50px] bg-red-600 text-white rounded-md flex items-center justify-center cursor-pointer"               onClick={() => handleModalDeleteTaskVisibility(task)}
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 cursor-pointer"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    //           />
    //         </svg>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default PreviewTaskCard;
