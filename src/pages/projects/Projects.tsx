import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper";
import Loader from "../../components/Loader";
import { useProjects } from "../../hooks";
import { PreviewProjectCard } from "./";
import { ModalDeleteProject } from "./components/ModalDeleteProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ButtonComponent } from '../../components/ButtonComponent';

export const Projects = () => {
  // Variables
  const { projects, loading } = useProjects();
  const navigate = useNavigate();

  // Conditional template
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // Template
  return (
    <>
      <ContentWrapper>
        <div className="flex gap-4 flex-wrap items-center justify-between mb-4">
          <div>
            <h2 className="text-4xl text-primary my-1">My projects</h2>
            <p>You can create a new project or edit an existing one</p>
          </div>
          <ButtonComponent type="button" onClick={() => navigate("create-project")}>
            <Plus className="mr-2 h-4 w-4" /> Create project
          </ButtonComponent>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Projects List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.length === 0 ? (
                  <p>No projects found</p>
                ) : (
                  projects.map((project: any) => (
                    <PreviewProjectCard data={project} key={project._id} />
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* <h1 className="text-4xl font-bold mb-8 mt-4 text-center text-slate-900">
          Projects
        </h1>
        <div className="flex flex-col auto-cols-max gap-4 justify-center">
          {projects.length === 0 ? (
            <p>No projects found</p>
          ) : (
            projects.map((project: any) => {
              return <PreviewProjectCard key={project._id} data={project} />;
            })
          )}
        </div> */}
      </ContentWrapper>
    </>
  );
};
