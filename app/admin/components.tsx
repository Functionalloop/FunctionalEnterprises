import { cn } from "@/lib/utils";

// ── Page header ──────────────────────────────────────────────────────────────
export function AdminHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display font-bold text-white text-2xl tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="font-body text-sm text-muted-dark mt-1">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="bg-surface-dark border border-border-dark p-6">
      <p className="font-body text-[10px] text-muted-darker tracking-[0.2em] uppercase mb-2">
        {label}
      </p>
      <p
        className={cn(
          "font-display font-bold text-3xl tracking-tight",
          accent ? "text-accent" : "text-white"
        )}
      >
        {value}
      </p>
    </div>
  );
}

// ── Table ────────────────────────────────────────────────────────────────────
export function AdminTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border-dark overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-dark bg-surface-dark">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left font-body text-[10px] text-muted-darker tracking-[0.18em] uppercase px-4 py-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function AdminTr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-border-dark last:border-b-0 hover:bg-white/[0.02] transition-colors">
      {children}
    </tr>
  );
}

export function AdminTd({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <td
      className={cn(
        "px-4 py-3 font-body text-sm",
        muted ? "text-muted-dark" : "text-white"
      )}
    >
      {children}
    </td>
  );
}

// ── Form fields ──────────────────────────────────────────────────────────────
const fieldBase =
  "w-full bg-[#0D0D0D] border border-border-dark text-white font-body text-sm px-3 py-2.5 placeholder:text-muted-darker focus:outline-none focus:border-accent transition-colors duration-200";

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, props.className)} />;
}

export function AdminTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={cn(fieldBase, "resize-y min-h-[100px]", props.className)}
    />
  );
}

export function AdminSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select {...props} className={cn(fieldBase, "cursor-pointer", props.className)} />
  );
}

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-body text-[10px] text-muted-darker tracking-[0.18em] uppercase mb-1.5"
    >
      {children}
    </label>
  );
}

// ── Buttons ──────────────────────────────────────────────────────────────────
export function AdminBtn({
  children,
  variant = "primary",
  size = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "default" | "sm";
}) {
  return (
    <button
      {...props}
      className={cn(
        "font-display font-semibold tracking-widest uppercase transition-all duration-150 disabled:opacity-40",
        size === "sm" ? "text-[9px] px-3 py-1.5" : "text-xs px-5 py-2.5",
        variant === "primary" &&
          "bg-accent text-foreground-dark hover:bg-accent/90",
        variant === "ghost" &&
          "border border-border-dark text-muted-dark hover:text-white hover:border-muted-dark bg-transparent",
        variant === "danger" &&
          "border border-red-900 text-red-400 hover:bg-red-900/20 bg-transparent",
        className
      )}
    >
      {children}
    </button>
  );
}

// ── Badge ────────────────────────────────────────────────────────────────────
export function Badge({
  children,
  color = "default",
}: {
  children: React.ReactNode;
  color?: "default" | "green" | "red" | "yellow";
}) {
  return (
    <span
      className={cn(
        "inline-block font-body text-[9px] tracking-widest uppercase px-2 py-0.5",
        color === "default" && "bg-surface-dark text-muted-dark",
        color === "green" && "bg-green-900/30 text-green-400",
        color === "red" && "bg-red-900/30 text-red-400",
        color === "yellow" && "bg-yellow-900/30 text-yellow-400"
      )}
    >
      {children}
    </span>
  );
}

// ── Page wrapper ─────────────────────────────────────────────────────────────
export function AdminPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 p-6 md:p-10 max-w-6xl">
      {children}
    </div>
  );
}

