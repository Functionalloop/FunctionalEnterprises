"use client";

import { useState } from "react";
import type { Stat } from "@/lib/db/content";
import { saveStats } from "@/app/admin/actions";
import { AdminBtn, AdminInput, FieldLabel } from "@/app/admin/components";

export default function StatsEditor({ stats }: { stats: Stat[] }) {
  const [items, setItems] = useState(stats);
  const [isPending, setIsPending] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(id: string, key: "value" | "label", val: string) {
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: val } : s))
    );
    setSaved(false);
  }

  async function handleSave() {
    setIsPending(true);
    const fd = new FormData();
    fd.append("stats", JSON.stringify(items.map(({ id, value, label }) => ({ id, value, label }))));
    await saveStats(fd);
    setIsPending(false);
    setSaved(true);
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {items.map((stat) => (
          <div key={stat.id} className="border border-border-dark p-6 bg-surface-dark">
            <div className="mb-4">
              <FieldLabel htmlFor={`val-${stat.id}`}>Value</FieldLabel>
              <AdminInput
                id={`val-${stat.id}`}
                value={stat.value}
                onChange={(e) => update(stat.id, "value", e.target.value)}
                placeholder="42+"
              />
            </div>
            <div>
              <FieldLabel htmlFor={`lbl-${stat.id}`}>Label</FieldLabel>
              <AdminInput
                id={`lbl-${stat.id}`}
                value={stat.label}
                onChange={(e) => update(stat.id, "label", e.target.value)}
                placeholder="Projects Delivered"
              />
            </div>
            {/* Preview */}
            <div className="mt-4 pt-4 border-t border-border-dark flex flex-col items-center text-center">
              <span className="font-display font-extrabold text-accent text-3xl leading-none">{stat.value}</span>
              <span className="font-body text-[10px] text-muted-dark tracking-widest uppercase mt-1">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <AdminBtn onClick={handleSave} disabled={isPending}>
          {isPending ? "Saving…" : "Save All Stats"}
        </AdminBtn>
        {saved && <span className="font-body text-xs text-green-400">Saved ✓</span>}
      </div>
    </div>
  );
}

