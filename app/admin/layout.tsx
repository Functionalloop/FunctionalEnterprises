import type { Metadata } from "next";
import { headers } from "next/headers";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import AdminNav from "./AdminNav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // H-3: Defence-in-depth — verify session server-side in the layout,
  // not only in middleware. This protects against middleware misconfigurations.
  //
  // We read the x-pathname header (set by middleware.ts) to skip the auth
  // check on the login page itself, which lives inside this layout.
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  if (!pathname.startsWith("/admin/login")) {
    await requireAdmin();
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Sidebar */}
      <AdminNav />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {children}
      </div>
    </div>
  );
}
