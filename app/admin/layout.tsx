import type { Metadata } from "next";
import AdminNav from "./AdminNav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

