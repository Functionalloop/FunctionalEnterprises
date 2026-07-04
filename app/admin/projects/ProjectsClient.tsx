"use client";

import { useState } from "react";
import type { Project } from "@/lib/db/projects";
import { saveProject, deleteProject } from "@/app/admin/actions";
import {
  AdminTable, AdminTr, AdminTd, Badge, AdminBtn,
  AdminInput, AdminTextarea, FieldLabel,
} from "@/app/admin/components";

type Mode = "table" | "add-btn";

export default function ProjectsClient({
  projects,
  mode,
}: {
  projects: Project[];
  mode: Mode;
}) {
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);

  if (mode === "add-btn") {
    return (
      <AdminBtn onClick={() => setAdding(true)}>+ New Project</AdminBtn>
    );
  }

  return (
    <div>
      {(adding || editing) && (
        <ProjectForm
          project={editing ?? undefined}
          onClose={() => { setEditing(null); setAdding(false); }}
        />
      )}

      <AdminTable
        headers={["Title", "Client", "Year", "Tags", "Status", "Actions"]}
      >
        {projects.map((p) => (
          <AdminTr key={p.id}>
            <AdminTd>
              <span className="font-semibold">{p.title}</span>
            </AdminTd>
            <AdminTd muted>{p.client}</AdminTd>
            <AdminTd muted>{p.year}</AdminTd>
            <AdminTd muted>
              <span className="truncate max-w-[180px] inline-block">{p.tags.join(", ")}</span>
            </AdminTd>
            <AdminTd>
              <Badge color={p.published ? "green" : "red"}>
                {p.published ? "Published" : "Draft"}
              </Badge>
            </AdminTd>
            <AdminTd>
              <div className="flex gap-2">
                <AdminBtn size="sm" variant="ghost" onClick={() => setEditing(p)}>
                  Edit
                </AdminBtn>
                <form action={async () => {
                  if (confirm("Delete this project?")) await deleteProject(p.id);
                }}>
                  <AdminBtn size="sm" variant="danger" type="submit">Delete</AdminBtn>
                </form>
              </div>
            </AdminTd>
          </AdminTr>
        ))}
      </AdminTable>
    </div>
  );
}

function ProjectForm({
  project,
  onClose,
}: {
  project?: Project;
  onClose: () => void;
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    await saveProject(formData);
    setIsPending(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto">
      <div className="bg-foreground-dark border border-border-dark w-full max-w-2xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-white text-xl">
            {project ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="text-muted-dark hover:text-white text-xl">✕</button>
        </div>

        <form action={handleSubmit} className="grid grid-cols-2 gap-4">
          {project && <input type="hidden" name="id" value={project.id} />}

          <div className="col-span-2">
            <FieldLabel htmlFor="title">Title *</FieldLabel>
            <AdminInput id="title" name="title" defaultValue={project?.title} required />
          </div>
          <div>
            <FieldLabel htmlFor="slug">Slug *</FieldLabel>
            <AdminInput id="slug" name="slug" defaultValue={project?.slug} required placeholder="my-project-slug" />
          </div>
          <div>
            <FieldLabel htmlFor="client">Client *</FieldLabel>
            <AdminInput id="client" name="client" defaultValue={project?.client} required />
          </div>
          <div>
            <FieldLabel htmlFor="year">Year</FieldLabel>
            <AdminInput id="year" name="year" type="number" defaultValue={project?.year ?? new Date().getFullYear()} />
          </div>
          <div>
            <FieldLabel htmlFor="order">Display Order</FieldLabel>
            <AdminInput id="order" name="order" type="number" defaultValue={project?.order ?? 0} />
          </div>
          <div className="col-span-2">
            <FieldLabel htmlFor="coverImage">Cover Image URL</FieldLabel>
            <AdminInput id="coverImage" name="coverImage" defaultValue={project?.coverImage} placeholder="/images/projects/my-project.jpg" />
          </div>
          <div className="col-span-2">
            <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
            <AdminInput id="tags" name="tags" defaultValue={project?.tags.join(", ")} placeholder="Branding, Next.js, Design" />
          </div>
          <div className="col-span-2">
            <FieldLabel htmlFor="problem">Problem / Challenge *</FieldLabel>
            <AdminTextarea id="problem" name="problem" defaultValue={project?.problem} required rows={3} />
          </div>
          <div className="col-span-2">
            <FieldLabel htmlFor="solution">Solution *</FieldLabel>
            <AdminTextarea id="solution" name="solution" defaultValue={project?.solution} required rows={3} />
          </div>
          <div className="col-span-2">
            <FieldLabel htmlFor="result">Result / Outcome *</FieldLabel>
            <AdminInput id="result" name="result" defaultValue={project?.result} required />
          </div>
          <div>
            <FieldLabel htmlFor="published">Published</FieldLabel>
            <select name="published" id="published" defaultValue={String(project?.published ?? true)}
              className="w-full bg-[#0D0D0D] border border-border-dark text-white font-body text-sm px-3 py-2.5 focus:outline-none focus:border-accent">
              <option value="true">Yes</option>
              <option value="false">No (Draft)</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-end gap-3 pt-4 border-t border-border-dark mt-2">
            <AdminBtn type="button" variant="ghost" onClick={onClose}>Cancel</AdminBtn>
            <AdminBtn type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save Project"}
            </AdminBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

