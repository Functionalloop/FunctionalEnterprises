"use client";

import { useState } from "react";
import type { Project, BlogPost, Service, Testimonial, Stat, ProcessStep, ContactSubmission, HackathonProject } from "@prisma/client";
import {
  logout,
  saveProject,
  deleteProject,
  saveBlogPost,
  deleteBlogPost,
  saveService,
  deleteService,
  saveTestimonial,
  deleteTestimonial,
  saveStat,
  deleteStat,
  saveProcessStep,
  deleteProcessStep,
  markSubmissionAsRead,
  deleteSubmission,
  saveHackathonProject,
  deleteHackathonProject,
} from "./actions";

interface AdminDashboardProps {
  projects: Project[];
  blogs: BlogPost[];
  services: Service[];
  testimonials: Testimonial[];
  stats: Stat[];
  processSteps: ProcessStep[];
  submissions: ContactSubmission[];
  hackathonProjects: HackathonProject[];
}

export default function AdminDashboard({
  projects: initialProjects,
  blogs: initialBlogs,
  services: initialServices,
  testimonials: initialTestimonials,
  stats: initialStats,
  processSteps: initialProcessSteps,
  submissions: initialSubmissions,
  hackathonProjects: initialHackathonProjects,
}: AdminDashboardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(initialProcessSteps);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions);
  const [hackathonProjects, setHackathonProjects] = useState<HackathonProject[]>(initialHackathonProjects);
  const [activeTab, setActiveTab] = useState("projects");

  // State for Modals
  const [editingProject, setEditingProject] = useState<Project | Partial<Project> | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | Partial<BlogPost> | null>(null);
  const [editingService, setEditingService] = useState<Service | Partial<Service> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | Partial<Testimonial> | null>(null);
  const [editingStat, setEditingStat] = useState<Stat | Partial<Stat> | null>(null);
  const [editingProcessStep, setEditingProcessStep] = useState<ProcessStep | Partial<ProcessStep> | null>(null);
  const [editingHackathon, setEditingHackathon] = useState<HackathonProject | Partial<HackathonProject> | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);

  async function handleLogout() {
    await logout();
    window.location.reload();
  }

  // ── Project Handlers ────────────────────────────────────────────────────────
  async function handleSaveProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        id: (fd.get("id") as string) || undefined,
        title: fd.get("title") as string,
        slug: fd.get("slug") as string,
        client: fd.get("client") as string,
        problem: fd.get("problem") as string,
        solution: fd.get("solution") as string,
        result: fd.get("result") as string,
        tags: fd.get("tags") as string,
        coverImage: fd.get("coverImage") as string,
        year: parseInt(fd.get("year") as string) || 2024,
        order: parseInt(fd.get("order") as string) || 0,
        published: fd.get("published") === "true",
      };

      await saveProject(data);
      alert("Project saved successfully! Reloading...");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteProject(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete project");
    }
  }

  // ── Blog Handlers ──────────────────────────────────────────────────────────
  async function handleSaveBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        id: (fd.get("id") as string) || undefined,
        title: fd.get("title") as string,
        slug: fd.get("slug") as string,
        excerpt: fd.get("excerpt") as string,
        content: fd.get("content") as string,
        category: fd.get("category") as string,
        coverImage: (fd.get("coverImage") as string) || "",
        readTime: parseInt(fd.get("readTime") as string) || 5,
        published: fd.get("published") === "true",
      };

      await saveBlogPost(data);
      alert("Blog post saved successfully! Reloading...");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save blog post");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteBlog(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await deleteBlogPost(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete blog post");
    }
  }

  // ── Service Handlers ────────────────────────────────────────────────────────
  async function handleSaveService(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        id: (fd.get("id") as string) || undefined,
        title: fd.get("title") as string,
        description: fd.get("description") as string,
        icon: fd.get("icon") as string,
        order: parseInt(fd.get("order") as string) || 0,
      };

      await saveService(data);
      alert("Service saved successfully! Reloading...");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save service");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteService(id: string) {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete service");
    }
  }

  // ── Testimonial Handlers ────────────────────────────────────────────────────
  async function handleSaveTestimonial(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        id: (fd.get("id") as string) || undefined,
        quote: fd.get("quote") as string,
        author: fd.get("author") as string,
        role: fd.get("role") as string,
        company: fd.get("company") as string,
        projectSlug: (fd.get("projectSlug") as string) || null,
        published: fd.get("published") === "true",
        order: parseInt(fd.get("order") as string) || 0,
      };

      await saveTestimonial(data);
      alert("Testimonial saved successfully! Reloading...");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save testimonial");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteTestimonial(id: string) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (err) {
      alert("Failed to delete testimonial");
    }
  }

  // ── Stat Handlers ──────────────────────────────────────────────────────────
  async function handleSaveStat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        id: (fd.get("id") as string) || undefined,
        value: fd.get("value") as string,
        label: fd.get("label") as string,
        order: parseInt(fd.get("order") as string) || 0,
      };

      await saveStat(data);
      alert("Stat saved successfully! Reloading...");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save stat");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteStat(id: string) {
    if (!confirm("Are you sure you want to delete this stat?")) return;
    try {
      await deleteStat(id);
      setStats(stats.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete stat");
    }
  }

  // ── Process Step Handlers ───────────────────────────────────────────────────
  async function handleSaveProcessStep(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        id: (fd.get("id") as string) || undefined,
        num: fd.get("num") as string,
        title: fd.get("title") as string,
        description: fd.get("description") as string,
        order: parseInt(fd.get("order") as string) || 0,
      };

      await saveProcessStep(data);
      alert("Process step saved successfully! Reloading...");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save process step");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteProcessStep(id: string) {
    if (!confirm("Are you sure you want to delete this process step?")) return;
    try {
      await deleteProcessStep(id);
      setProcessSteps(processSteps.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete process step");
    }
  }

  // ── Inquiry Handlers ────────────────────────────────────────────────────────
  async function handleMarkRead(id: string) {
    try {
      await markSubmissionAsRead(id);
      setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, read: true } : sub)));
    } catch (err) {
      alert("Failed to mark inquiry as read");
    }
  }

  async function handleDeleteInquiry(id: string) {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteSubmission(id);
      setSubmissions(submissions.filter((sub) => sub.id !== id));
    } catch (err) {
      alert("Failed to delete inquiry");
    }
  }

  // ── FunctionalX Handlers ────────────────────────────────────────────────────
  async function handleSaveHackathon(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const placementRaw = fd.get("placement") as string;
      await saveHackathonProject({
        id: (fd.get("id") as string) || undefined,
        slug: fd.get("slug") as string,
        name: fd.get("name") as string,
        description: fd.get("description") as string,
        tags: fd.get("tags") as string,
        award: (fd.get("award") as string) || null,
        placement: placementRaw ? parseInt(placementRaw) : null,
        event: (fd.get("event") as string) || null,
        year: parseInt(fd.get("year") as string) || new Date().getFullYear(),
        teamMembers: (fd.get("teamMembers") as string) || null,
        githubUrl: (fd.get("githubUrl") as string) || null,
        demoUrl: (fd.get("demoUrl") as string) || null,
        published: fd.get("published") === "true",
      });
      alert("Hackathon project saved! Reloading...");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to save hackathon project");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteHackathon(id: string) {
    if (!confirm("Delete this hackathon project?")) return;
    try {
      await deleteHackathonProject(id);
      setHackathonProjects(hackathonProjects.filter((h) => h.id !== id));
    } catch (err) {
      alert("Failed to delete hackathon project");
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 pb-6 mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-wide">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your website content database synced with Supabase.</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 font-medium">
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 md:gap-6 border-b border-gray-800 mb-8 overflow-x-auto pb-1">
        {["projects", "blogs", "services", "testimonials", "stats", "process", "inquiries", "functionalx"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-display font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-200 ${
              activeTab === tab
                ? tab === "functionalx"
                  ? "text-[#D4FF33] border-b-2 border-[#D4FF33]"
                  : "text-white border-b-2 border-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab === "process" ? "PROCESS STEPS" : tab === "functionalx" ? "FunctionalX" : tab}
          </button>
        ))}
      </div>

      {/* ── PROJECTS TAB ──────────────────────────────────────────────────────── */}
      {activeTab === "projects" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingProject({})}
              className="bg-white text-black font-display font-bold text-sm px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              + New Project
            </button>
          </div>

          <div className="bg-[#0e0e0e] border border-gray-800 rounded">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 bg-black/45">
                <tr>
                  <th className="p-4 font-normal">Title</th>
                  <th className="p-4 font-normal hidden md:table-cell">Client</th>
                  <th className="p-4 font-normal hidden lg:table-cell">Year</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-900">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-semibold">{p.title}</td>
                    <td className="p-4 text-gray-400 hidden md:table-cell">{p.client}</td>
                    <td className="p-4 text-gray-400 hidden lg:table-cell">{p.year}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${p.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <button onClick={() => setEditingProject(p)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                      <button onClick={() => handleDeleteProject(p.id)} className="text-red-500 hover:text-red-400 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── BLOGS TAB ─────────────────────────────────────────────────────────── */}
      {activeTab === "blogs" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingBlog({})}
              className="bg-white text-black font-display font-bold text-sm px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              + New Post
            </button>
          </div>

          <div className="bg-[#0e0e0e] border border-gray-800 rounded">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 bg-black/45">
                <tr>
                  <th className="p-4 font-normal">Title</th>
                  <th className="p-4 font-normal hidden md:table-cell">Category</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-900">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-semibold">{b.title}</td>
                    <td className="p-4 text-gray-400 hidden md:table-cell">{b.category}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${b.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {b.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <button onClick={() => setEditingBlog(b)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                      <button onClick={() => handleDeleteBlog(b.id)} className="text-red-500 hover:text-red-400 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── SERVICES TAB ──────────────────────────────────────────────────────── */}
      {activeTab === "services" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingService({})}
              className="bg-white text-black font-display font-bold text-sm px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              + New Service
            </button>
          </div>

          <div className="bg-[#0e0e0e] border border-gray-800 rounded">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 bg-black/45">
                <tr>
                  <th className="p-4 font-normal">Order</th>
                  <th className="p-4 font-normal">Title</th>
                  <th className="p-4 font-normal hidden md:table-cell">Description</th>
                  <th className="p-4 font-normal">Icon</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-900">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-semibold text-gray-500 w-16">{s.order}</td>
                    <td className="p-4 font-semibold">{s.title}</td>
                    <td className="p-4 text-gray-400 hidden md:table-cell max-w-sm truncate">{s.description}</td>
                    <td className="p-4 text-gray-400 font-mono text-xs">{s.icon}</td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <button onClick={() => setEditingService(s)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                      <button onClick={() => handleDeleteService(s.id)} className="text-red-500 hover:text-red-400 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TESTIMONIALS TAB ──────────────────────────────────────────────────── */}
      {activeTab === "testimonials" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingTestimonial({})}
              className="bg-white text-black font-display font-bold text-sm px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              + New Testimonial
            </button>
          </div>

          <div className="bg-[#0e0e0e] border border-gray-800 rounded">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 bg-black/45">
                <tr>
                  <th className="p-4 font-normal">Author</th>
                  <th className="p-4 font-normal hidden md:table-cell">Role / Company</th>
                  <th className="p-4 font-normal hidden lg:table-cell">Quote</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-900">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-semibold">{t.author}</td>
                    <td className="p-4 text-gray-400 hidden md:table-cell">{t.role} at {t.company}</td>
                    <td className="p-4 text-gray-500 hidden lg:table-cell max-w-sm truncate italic">"{t.quote}"</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${t.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {t.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <button onClick={() => setEditingTestimonial(t)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                      <button onClick={() => handleDeleteTestimonial(t.id)} className="text-red-500 hover:text-red-400 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── STATS TAB ─────────────────────────────────────────────────────────── */}
      {activeTab === "stats" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingStat({})}
              className="bg-white text-black font-display font-bold text-sm px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              + New Stat
            </button>
          </div>

          <div className="bg-[#0e0e0e] border border-gray-800 rounded">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 bg-black/45">
                <tr>
                  <th className="p-4 font-normal w-16">Order</th>
                  <th className="p-4 font-normal">Value</th>
                  <th className="p-4 font-normal">Label</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-900">
                {stats.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-semibold text-gray-500">{s.order}</td>
                    <td className="p-4 font-bold text-lg text-white">{s.value}</td>
                    <td className="p-4 text-gray-400">{s.label}</td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <button onClick={() => setEditingStat(s)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                      <button onClick={() => handleDeleteStat(s.id)} className="text-red-500 hover:text-red-400 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PROCESS STEPS TAB ─────────────────────────────────────────────────── */}
      {activeTab === "process" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingProcessStep({})}
              className="bg-white text-black font-display font-bold text-sm px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              + New Step
            </button>
          </div>

          <div className="bg-[#0e0e0e] border border-gray-800 rounded">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 bg-black/45">
                <tr>
                  <th className="p-4 font-normal w-16">Step #</th>
                  <th className="p-4 font-normal">Title</th>
                  <th className="p-4 font-normal hidden md:table-cell">Description</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-900">
                {processSteps.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-mono font-bold text-gray-400">{s.num}</td>
                    <td className="p-4 font-semibold">{s.title}</td>
                    <td className="p-4 text-gray-400 hidden md:table-cell max-w-md truncate">{s.description}</td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <button onClick={() => setEditingProcessStep(s)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                      <button onClick={() => handleDeleteProcessStep(s.id)} className="text-red-500 hover:text-red-400 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── INQUIRIES TAB ─────────────────────────────────────────────────────── */}
      {activeTab === "inquiries" && (
        <div>
          <div className="bg-[#0e0e0e] border border-gray-800 rounded">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 bg-black/45">
                <tr>
                  <th className="p-4 font-normal">Date</th>
                  <th className="p-4 font-normal">Contact</th>
                  <th className="p-4 font-normal hidden md:table-cell">Budget/Type</th>
                  <th className="p-4 font-normal hidden lg:table-cell">Message</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-900">
                {submissions.map((sub) => (
                  <tr key={sub.id} className={`hover:bg-white/[0.02] ${!sub.read ? "bg-white/[0.01]" : ""}`}>
                    <td className="p-4 text-xs text-gray-400 font-mono">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white flex items-center gap-2">
                        {sub.name}
                        {!sub.read && <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full" title="New Inquiry" />}
                      </div>
                      <div className="text-xs text-gray-500">{sub.email}</div>
                    </td>
                    <td className="p-4 text-gray-400 hidden md:table-cell">
                      <div className="text-xs">{sub.projectType || "N/A"}</div>
                      <div className="text-xs text-gray-500 font-mono">{sub.budget || "N/A"}</div>
                    </td>
                    <td className="p-4 text-gray-400 hidden lg:table-cell max-w-xs truncate" title={sub.message}>
                      {sub.message}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3 items-center min-h-[57px]">
                      {!sub.read && (
                        <button onClick={() => handleMarkRead(sub.id)} className="text-green-400 hover:text-green-300 text-xs">
                          Mark Read
                        </button>
                      )}
                      <button onClick={() => handleDeleteInquiry(sub.id)} className="text-red-500 hover:text-red-400 text-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {submissions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-600 italic">No inquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PROJECT EDIT MODAL ────────────────────────────────────────────────── */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-gray-800 w-full max-w-2xl p-8 mb-10 rounded">
            <h2 className="font-display font-bold text-xl mb-6">
              {editingProject.id ? "Edit Project" : "New Project"}
            </h2>
            <form onSubmit={handleSaveProject} className="flex flex-col gap-4">
              {editingProject.id && <input type="hidden" name="id" value={editingProject.id} />}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Title *</label>
                  <input name="title" defaultValue={editingProject.title} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Slug *</label>
                  <input name="slug" defaultValue={editingProject.slug} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Client *</label>
                  <input name="client" defaultValue={editingProject.client} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Tags (Comma Separated)</label>
                  <input name="tags" defaultValue={editingProject.tags} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Cover Image URL</label>
                  <input name="coverImage" defaultValue={editingProject.coverImage} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Problem *</label>
                  <textarea name="problem" defaultValue={editingProject.problem} required rows={3} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Solution *</label>
                  <textarea name="solution" defaultValue={editingProject.solution} required rows={3} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Result *</label>
                  <input name="result" defaultValue={editingProject.result} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Year</label>
                  <input name="year" type="number" defaultValue={editingProject.year || new Date().getFullYear()} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Order</label>
                  <input name="order" type="number" defaultValue={editingProject.order || 0} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Published</label>
                  <select name="published" defaultValue={editingProject.published === false ? "false" : "true"} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm">
                    <option value="true">Yes</option>
                    <option value="false">No (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
                <button type="button" onClick={() => setEditingProject(null)} className="text-gray-500 hover:text-white px-4 text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-white text-black font-display font-bold px-6 py-2 hover:bg-gray-200 text-sm">
                  {isSaving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── BLOG EDIT MODAL ───────────────────────────────────────────────────── */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-gray-800 w-full max-w-2xl p-8 mb-10 rounded">
            <h2 className="font-display font-bold text-xl mb-6">
              {editingBlog.id ? "Edit Blog Post" : "New Blog Post"}
            </h2>
            <form onSubmit={handleSaveBlog} className="flex flex-col gap-4">
              {editingBlog.id && <input type="hidden" name="id" value={editingBlog.id} />}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Title *</label>
                  <input name="title" defaultValue={editingBlog.title} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Slug *</label>
                  <input name="slug" defaultValue={editingBlog.slug} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Category *</label>
                  <input name="category" defaultValue={editingBlog.category} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Excerpt *</label>
                  <textarea name="excerpt" defaultValue={editingBlog.excerpt} required rows={2} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Content (Markdown) *</label>
                  <textarea name="content" defaultValue={editingBlog.content} required rows={8} className="w-full bg-[#050505] border border-gray-800 p-3 text-white font-mono text-sm focus:outline-none focus:border-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Cover Image URL</label>
                  <input name="coverImage" defaultValue={editingBlog.coverImage || ""} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Read Time (Mins)</label>
                  <input name="readTime" type="number" defaultValue={editingBlog.readTime || 5} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Published</label>
                  <select name="published" defaultValue={editingBlog.published === false ? "false" : "true"} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm">
                    <option value="true">Yes</option>
                    <option value="false">No (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
                <button type="button" onClick={() => setEditingBlog(null)} className="text-gray-500 hover:text-white px-4 text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-white text-black font-display font-bold px-6 py-2 hover:bg-gray-200 text-sm">
                  {isSaving ? "Saving..." : "Save Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SERVICE EDIT MODAL ────────────────────────────────────────────────── */}
      {editingService && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-gray-800 w-full max-w-2xl p-8 mb-10 rounded">
            <h2 className="font-display font-bold text-xl mb-6">
              {editingService.id ? "Edit Service" : "New Service"}
            </h2>
            <form onSubmit={handleSaveService} className="flex flex-col gap-4">
              {editingService.id && <input type="hidden" name="id" value={editingService.id} />}
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Title *</label>
                  <input name="title" defaultValue={editingService.title} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Icon Name (Lucide string like "Layout", "Code", "Sparkles") *</label>
                  <input name="icon" defaultValue={editingService.icon} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Description *</label>
                  <textarea name="description" defaultValue={editingService.description} required rows={3} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Display Order</label>
                  <input name="order" type="number" defaultValue={editingService.order || 0} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
                <button type="button" onClick={() => setEditingService(null)} className="text-gray-500 hover:text-white px-4 text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-white text-black font-display font-bold px-6 py-2 hover:bg-gray-200 text-sm">
                  {isSaving ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── TESTIMONIAL EDIT MODAL ────────────────────────────────────────────── */}
      {editingTestimonial && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-gray-800 w-full max-w-2xl p-8 mb-10 rounded">
            <h2 className="font-display font-bold text-xl mb-6">
              {editingTestimonial.id ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <form onSubmit={handleSaveTestimonial} className="flex flex-col gap-4">
              {editingTestimonial.id && <input type="hidden" name="id" value={editingTestimonial.id} />}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Quote *</label>
                  <textarea name="quote" defaultValue={editingTestimonial.quote} required rows={3} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Author Name *</label>
                  <input name="author" defaultValue={editingTestimonial.author} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Author Role *</label>
                  <input name="role" defaultValue={editingTestimonial.role} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Company *</label>
                  <input name="company" defaultValue={editingTestimonial.company} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Project Slug (Optional Link)</label>
                  <input name="projectSlug" defaultValue={editingTestimonial.projectSlug || ""} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Display Order</label>
                  <input name="order" type="number" defaultValue={editingTestimonial.order || 0} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Published</label>
                  <select name="published" defaultValue={editingTestimonial.published === false ? "false" : "true"} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm">
                    <option value="true">Yes</option>
                    <option value="false">No (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="text-gray-500 hover:text-white px-4 text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-white text-black font-display font-bold px-6 py-2 hover:bg-gray-200 text-sm">
                  {isSaving ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── STAT EDIT MODAL ───────────────────────────────────────────────────── */}
      {editingStat && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-gray-800 w-full max-w-md p-8 mb-10 rounded">
            <h2 className="font-display font-bold text-xl mb-6">
              {editingStat.id ? "Edit Stat" : "New Stat"}
            </h2>
            <form onSubmit={handleSaveStat} className="flex flex-col gap-4">
              {editingStat.id && <input type="hidden" name="id" value={editingStat.id} />}
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Value (e.g. "42+", "98%") *</label>
                  <input name="value" defaultValue={editingStat.value} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Label (e.g. "Projects Delivered") *</label>
                  <input name="label" defaultValue={editingStat.label} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Display Order</label>
                  <input name="order" type="number" defaultValue={editingStat.order || 0} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
                <button type="button" onClick={() => setEditingStat(null)} className="text-gray-500 hover:text-white px-4 text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-white text-black font-display font-bold px-6 py-2 hover:bg-gray-200 text-sm">
                  {isSaving ? "Saving..." : "Save Stat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── PROCESS STEP EDIT MODAL ───────────────────────────────────────────── */}
      {editingProcessStep && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-gray-800 w-full max-w-2xl p-8 mb-10 rounded">
            <h2 className="font-display font-bold text-xl mb-6">
              {editingProcessStep.id ? "Edit Process Step" : "New Process Step"}
            </h2>
            <form onSubmit={handleSaveProcessStep} className="flex flex-col gap-4">
              {editingProcessStep.id && <input type="hidden" name="id" value={editingProcessStep.id} />}
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Step Number (e.g. "01") *</label>
                  <input name="num" defaultValue={editingProcessStep.num} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Title *</label>
                  <input name="title" defaultValue={editingProcessStep.title} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Description *</label>
                  <textarea name="description" defaultValue={editingProcessStep.description} required rows={3} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Display Order</label>
                  <input name="order" type="number" defaultValue={editingProcessStep.order || 0} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-white text-sm" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
                <button type="button" onClick={() => setEditingProcessStep(null)} className="text-gray-500 hover:text-white px-4 text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-white text-black font-display font-bold px-6 py-2 hover:bg-gray-200 text-sm">
                  {isSaving ? "Saving..." : "Save Step"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── FUNCTIONALX TAB ───────────────────────────────────────────────────── */}
      {activeTab === "functionalx" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingHackathon({})}
              className="bg-[#D4FF33] text-black font-display font-bold text-sm px-4 py-2 hover:bg-[#c8f02a] transition-colors"
            >
              + New Project
            </button>
          </div>

          <div className="bg-[#0e0e0e] border border-gray-800 rounded">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-gray-800 text-[10px] uppercase tracking-widest text-gray-500 bg-black/45">
                <tr>
                  <th className="p-4 font-normal">Name</th>
                  <th className="p-4 font-normal hidden md:table-cell">Event</th>
                  <th className="p-4 font-normal hidden lg:table-cell">Award</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-900">
                {hackathonProjects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-600 text-sm">
                      No hackathon projects yet. Add your first one!
                    </td>
                  </tr>
                )}
                {hackathonProjects.map((h) => (
                  <tr key={h.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-semibold">{h.name}</td>
                    <td className="p-4 text-gray-400 hidden md:table-cell">
                      {h.event ? `${h.event} · ${h.year}` : h.year}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      {h.award ? (
                        <span className="text-[#D4FF33] text-xs font-semibold">★ {h.award}</span>
                      ) : (
                        <span className="text-gray-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        h.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {h.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <button onClick={() => setEditingHackathon(h)} className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                      <button onClick={() => handleDeleteHackathon(h.id)} className="text-red-500 hover:text-red-400 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── FUNCTIONALX EDIT MODAL ────────────────────────────────────────────── */}
      {editingHackathon && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-[#0e0e0e] border border-gray-800 w-full max-w-2xl p-8 mb-10 rounded">
            <h2 className="font-display font-bold text-xl mb-2">
              {editingHackathon.id ? "Edit Hackathon Project" : "New Hackathon Project"}
            </h2>
            <p className="text-gray-500 text-xs mb-6">FunctionalX · Hackathon Division</p>

            <form onSubmit={handleSaveHackathon} className="flex flex-col gap-4">
              {editingHackathon.id && <input type="hidden" name="id" value={editingHackathon.id} />}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Project Name *</label>
                  <input name="name" defaultValue={editingHackathon.name} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Slug (URL key) *</label>
                  <input name="slug" defaultValue={editingHackathon.slug} required placeholder="my-project" className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Year *</label>
                  <input name="year" type="number" defaultValue={editingHackathon.year || new Date().getFullYear()} required className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Description *</label>
                  <textarea name="description" defaultValue={editingHackathon.description} required rows={3} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Tech Stack Tags * (comma-separated)</label>
                  <input name="tags" defaultValue={editingHackathon.tags} required placeholder="React, Python, Firebase" className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Hackathon / Event Name</label>
                  <input name="event" defaultValue={editingHackathon.event ?? ""} placeholder="Smart India Hackathon 2025" className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Award Label</label>
                  <input name="award" defaultValue={editingHackathon.award ?? ""} placeholder="1st Place, Best UX, Finalist" className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Placement Rank (1=1st, blank=unranked)</label>
                  <input name="placement" type="number" defaultValue={editingHackathon.placement ?? ""} placeholder="1" min="1" className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Team Members (comma-separated)</label>
                  <input name="teamMembers" defaultValue={editingHackathon.teamMembers ?? ""} placeholder="Taish, Alex, Priya" className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">GitHub URL</label>
                  <input name="githubUrl" type="url" defaultValue={editingHackathon.githubUrl ?? ""} placeholder="https://github.com/..." className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Demo / Live URL</label>
                  <input name="demoUrl" type="url" defaultValue={editingHackathon.demoUrl ?? ""} placeholder="https://..." className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Published</label>
                  <select name="published" defaultValue={String(editingHackathon.published ?? true)} className="w-full bg-[#050505] border border-gray-800 p-3 text-white focus:outline-none focus:border-[#D4FF33] text-sm">
                    <option value="true">Published</option>
                    <option value="false">Draft (hidden)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-800">
                <button type="button" onClick={() => setEditingHackathon(null)} className="text-gray-500 hover:text-white px-4 text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-[#D4FF33] text-black font-display font-bold px-6 py-2 hover:bg-[#c8f02a] text-sm">
                  {isSaving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
