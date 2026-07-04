import { getProjects } from "@/lib/db/projects";
import { AdminPage, AdminHeader, AdminTable, AdminTr, AdminTd, Badge } from "@/app/admin/components";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getProjects(false); // show all including unpublished

  return (
    <AdminPage>
      <AdminHeader
        title="Projects"
        description={`${projects.length} case studies`}
        action={<ProjectsClient projects={projects} mode="add-btn" />}
      />
      <ProjectsClient projects={projects} mode="table" />
    </AdminPage>
  );
}

