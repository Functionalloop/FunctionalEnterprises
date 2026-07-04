"use client";

import { useState } from "react";
import type { ProcessStep } from "@/lib/db/content";
import { saveProcessSteps } from "@/app/admin/actions";
import { AdminBtn, AdminInput, AdminTextarea, FieldLabel } from "@/app/admin/components";

export default function ProcessEditor({ steps }: { steps: ProcessStep[] }) {
  const [items, setItems] = useState(steps);
  const [isPending, setIsPending] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(id: string, key: "title" | "description", val: string) {
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: val } : s))
    );
    setSaved(false);
  }

  async function handleSave() {
    setIsPending(true);
    const fd = new FormData();
    fd.append("steps", JSON.stringify(items.map(({ id, title, description }) => ({ id, title, description }))));
    await saveProcessSteps(fd);
    setIsPending(false);
    setSaved(true);
  }

  return (
    <div>
      <div className="flex flex-col gap-6 mb-8">
        {items.map((step) => (
          <div key={step.id} className="border border-border-dark p-6 bg-surface-dark flex gap-6 items-start">
            <div className="font-display font-extrabold text-5xl text-muted-darker leading-none w-16 shrink-0 select-none">
              {step.num}
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <FieldLabel htmlFor={`title-${step.id}`}>Step Title</FieldLabel>
                <AdminInput
                  id={`title-${step.id}`}
                  value={step.title}
                  onChange={(e) => update(step.id, "title", e.target.value)}
                />
              </div>
              <div>
                <FieldLabel htmlFor={`desc-${step.id}`}>Description</FieldLabel>
                <AdminTextarea
                  id={`desc-${step.id}`}
                  value={step.description}
                  onChange={(e) => update(step.id, "description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <AdminBtn onClick={handleSave} disabled={isPending}>
          {isPending ? "Saving…" : "Save All Steps"}
        </AdminBtn>
        {saved && <span className="font-body text-xs text-green-400">Saved ✓</span>}
      </div>
    </div>
  );
}

