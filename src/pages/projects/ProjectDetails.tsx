import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../../hooks";
import { ButtonComponent } from "../../components";
import ContentWrapper from "../../components/ContentWrapper";
import { ModalFormTasks } from "./components/ModalFormTasks";
import PreviewTaskCard from "./components/PreviewTaskCard";
import { ModalDeleteTask } from "./components/ModalDeleteTask";
import { PreviewPartnerCard } from "./components/PreviewPartnerCard";
import { ModalDeletePartner } from "./components/ModalDeletePartner";
import { useModals } from "../../hooks/useModals";
import useAdmin from "../../hooks/useAdmin";
import { io } from "socket.io-client";
import Loader from "../../components/Loader";
import { Button } from "@/components/ui/button";
import { ClipboardPlus, Plus, Trash2, UserPlus } from "lucide-react";

let socket: any;
export const ProjectDetails = () => {
  const params = useParams();
  const {
    project,
    loading,
    getProjectDetails,
    deleteProject,
    error,
    setError,
    setProject,
    updateTasksContext,
    updateNewUsersTasks,
    updateDeleteUsersTasks,
    updateDeleteUsersProjects,
  } = useProjects();

  const { handleModalFormTaskVisibility } = useModals();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(params.id);
    } else {
      console.log("no");
    }
  };

  const admin = useAdmin();

  useEffect(() => {
    getProjectDetails(params.id);
    return () => {
      setError(null);
      setProject({});
    };
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("openProject", params.id);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on("addedTask", (newTask: any) => {
      if (newTask.project === project._id) {
        updateNewUsersTasks(newTask);
      }
    });
    socket?.on("deletedTask", (deletedTask: any) => {
      if (deletedTask.project === project._id) {
        updateDeleteUsersTasks(deletedTask);
      }
    });
    socket?.on("deletedProject", (deletedProject: any) => {
      if (deletedProject.project === project._id) {
        updateDeleteUsersProjects(deletedProject);
      }
    });
    socket?.on("editedTask", (editedTask: any) => {
      if (editedTask.project._id === project._id) {
        updateTasksContext(editedTask);
      }
    });
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <ContentWrapper>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-col flex">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {project.name}
          </h1>
          <p>Client: {project.client}</p>
          <p>Delivery date: {project.deliveryDate}</p>
        </div>
        {admin && (
          <div className="ml-auto flex gap-4">
            <Button
              onClick={() => navigate(`/projects/edit-project/${project._id}`)}
            >
              <Plus className="mr-2" />
              Edit
            </Button>
            <Button variant="destructive" onClick={() => handleDelete()}>
              <Trash2 className="mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-6 mt-8 mb-4">
          <p className="font-black text-2xl">Project tasks</p>
          {admin && (
            <Button
              variant="outline"
              onClick={() => handleModalFormTaskVisibility()}
            >
              <ClipboardPlus className="mr-2" />
              Add Task
            </Button>
          )}
        </div>
        {project.tasks?.length < 1 ? (
          <p>There is not tasks in this projects</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.tasks?.map((task: any) => {
              return <PreviewTaskCard task={task} key={task._id} />;
            })}
          </div>
        )}
      </div>

      {admin && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 mt-8 mb-4">
            <p className="font-black text-2xl">Project partners</p>
            <Button
              variant="outline"
              onClick={() => navigate(`/projects/new-partner/${project._id}`)}
            >
              <UserPlus className="mr-2" /> Add collaborator
            </Button>
          </div>

          <div>
            <div>
              {project.partners?.length < 1 ? (
                <p>There is not partners in this projects</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {project.partners?.map((partner: any) => {
                    return (
                      <PreviewPartnerCard partner={partner} key={partner._id} />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ModalFormTasks />
      <ModalDeleteTask />
      <ModalDeletePartner />
    </ContentWrapper>
  );
};

export default ProjectDetails;
