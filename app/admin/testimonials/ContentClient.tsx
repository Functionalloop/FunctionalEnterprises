"use client";

import { useState } from "react";
import { saveTestimonial, deleteTestimonial, saveService, deleteService } from "@/app/admin/actions";
import {
  AdminTable, AdminTr, AdminTd, Badge, AdminBtn,
  AdminInput, AdminTextarea, FieldLabel,
} from "@/app/admin/components";

type T = { id: string; [key: string]: unknown };

export default function ContentClient({
  type,
  items,
}: {
  type: "testimonials" | "services";
  items: T[];
}) {
  const [editing, setEditing] = useState<T | null>(null);
  const [adding, setAdding] = useState(false);

  const saveAction = type === "testimonials" ? saveTestimonial : saveService;
  const deleteAction = type === "testimonials" ? deleteTestimonial : deleteService;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <AdminBtn onClick={() => setAdding(true)}>
          + Add {type === "testimonials" ? "Testimonial" : "Service"}
        </AdminBtn>
      </div>

      {(adding || editing) && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto">
          <div className="bg-foreground-dark border border-border-dark w-full max-w-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">
                {editing ? "Edit" : "New"} {type === "testimonials" ? "Testimonial" : "Service"}
              </h2>
              <button onClick={() => { setEditing(null); setAdding(false); }} className="text-muted-dark hover:text-white text-xl">✕</button>
            </div>
            <form action={async (fd) => { await saveAction(fd); setEditing(null); setAdding(false); }} className="flex flex-col gap-4">
              {editing && <input type="hidden" name="id" value={editing.id} />}

              {type === "testimonials" ? (
                <>
                  <div>
                    <FieldLabel htmlFor="quote">Quote *</FieldLabel>
                    <AdminTextarea id="quote" name="quote" defaultValue={editing?.quote as string} required rows={4} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><FieldLabel htmlFor="author">Author *</FieldLabel><AdminInput id="author" name="author" defaultValue={editing?.author as string} required /></div>
                    <div><FieldLabel htmlFor="role">Role *</FieldLabel><AdminInput id="role" name="role" defaultValue={editing?.role as string} required /></div>
                    <div><FieldLabel htmlFor="company">Company *</FieldLabel><AdminInput id="company" name="company" defaultValue={editing?.company as string} required /></div>
                    <div><FieldLabel htmlFor="projectSlug">Project Slug</FieldLabel><AdminInput id="projectSlug" name="projectSlug" defaultValue={editing?.projectSlug as string} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel htmlFor="published">Published</FieldLabel>
                      <select name="published" id="published" defaultValue={String(editing?.published ?? true)}
                        className="w-full bg-[#0D0D0D] border border-border-dark text-white font-body text-sm px-3 py-2.5 focus:outline-none focus:border-accent">
                        <option value="true">Yes</option><option value="false">No</option>
                      </select>
                    </div>
                    <div><FieldLabel htmlFor="order">Order</FieldLabel><AdminInput id="order" name="order" type="number" defaultValue={String(editing?.order ?? 0)} /></div>
                  </div>
                </>
              ) : (
                <>
                  <div><FieldLabel htmlFor="title">Title *</FieldLabel><AdminInput id="title" name="title" defaultValue={editing?.title as string} required /></div>
                  <div><FieldLabel htmlFor="description">Description *</FieldLabel><AdminTextarea id="description" name="description" defaultValue={editing?.description as string} required rows={4} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><FieldLabel htmlFor="icon">Icon Key</FieldLabel><AdminInput id="icon" name="icon" defaultValue={editing?.icon as string} placeholder="monitor" /></div>
                    <div><FieldLabel htmlFor="order">Order</FieldLabel><AdminInput id="order" name="order" type="number" defaultValue={String(editing?.order ?? 0)} /></div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-border-dark">
                <AdminBtn type="button" variant="ghost" onClick={() => { setEditing(null); setAdding(false); }}>Cancel</AdminBtn>
                <AdminBtn type="submit">Save</AdminBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminTable headers={type === "testimonials" ? ["Author", "Company", "Status", "Actions"] : ["Title", "Icon", "Order", "Actions"]}>
        {items.map((item) => (
          <AdminTr key={item.id}>
            {type === "testimonials" ? (
              <>
                <AdminTd>{item.author as string}</AdminTd>
                <AdminTd muted>{item.company as string}</AdminTd>
                <AdminTd><Badge color={(item.published as boolean) ? "green" : "red"}>{(item.published as boolean) ? "Published" : "Hidden"}</Badge></AdminTd>
              </>
            ) : (
              <>
                <AdminTd>{item.title as string}</AdminTd>
                <AdminTd muted>{item.icon as string}</AdminTd>
                <AdminTd muted>{String(item.order)}</AdminTd>
              </>
            )}
            <AdminTd>
              <div className="flex gap-2">
                <AdminBtn size="sm" variant="ghost" onClick={() => setEditing(item)}>Edit</AdminBtn>
                <form action={async () => { if (confirm("Delete?")) await deleteAction(item.id); }}>
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

