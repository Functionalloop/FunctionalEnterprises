"use client";

import { useState } from "react";
import type { Project, BlogPost } from "@prisma/client";
import { logout, saveProject, deleteProject, saveBlogPost, deleteBlogPost } from "./actions";

export default function AdminDashboard({ projects: initialProjects, blogs: initialBlogs }: { projects: Project[], blogs: BlogPost[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [activeTab, setActiveTab] = useState("projects");
  
  // State for Modals
  const [editingProject, setEditingProject] = useState<Project | Partial<Project> | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | Partial<BlogPost> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleLogout() {
    await logout();
    window.location.reload();
  }

  async function handleSaveProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        id: fd.get("id") as string || undefined,
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
      alert("Project saved successfully! Reloading to show changes.");
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
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete project");
    }
  }

  async function handleSaveBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data = {
        id: fd.get("id") as string || undefined,
        title: fd.get("title") as string,
        slug: fd.get("slug") as string,
        excerpt: fd.get("excerpt") as string,
        content: fd.get("content") as string,
        category: fd.get("category") as string,
        coverImage: fd.get("coverImage") as string || "",
        readTime: parseInt(fd.get("readTime") as string) || 5,
        published: fd.get("published") === "true",
      };
      
      await saveBlogPost(data);
      alert("Blog post saved successfully! Reloading to show changes.");
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
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err) {
      alert("Failed to delete blog post");
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border-dark pb-6 mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl">Admin Dashboard</h1>
          <p className="text-muted-dark text-sm mt-1">Manage your portfolio and site content.</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border-dark mb-8">
        <button
          onClick={() => setActiveTab("projects")}
          className={`pb-3 font-display font-bold text-sm tracking-wide ${activeTab === "projects" ? "text-white border-b-2 border-white" : "text-muted-dark hover:text-white"}`}
        >
          PROJECTS
        </button>
        <button
          onClick={() => setActiveTab("blogs")}
          className={`pb-3 font-display font-bold text-sm tracking-wide ${activeTab === "blogs" ? "text-white border-b-2 border-white" : "text-muted-dark hover:text-white"}`}
        >
          BLOGS
        </button>
      </div>

      {/* Projects Content */}
      {activeTab === "projects" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingProject({})}
              className="bg-white text-black font-display font-bold px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              + New Project
            </button>
          </div>

          <div className="bg-surface-dark border border-border-dark">
            <table className="w-full text-left">
              <thead className="border-b border-border-dark text-xs uppercase tracking-widest text-muted-dark">
                <tr>
                  <th className="p-4 font-body font-normal">Title</th>
                  <th className="p-4 font-body font-normal hidden md:table-cell">Client</th>
                  <th className="p-4 font-body font-normal hidden lg:table-cell">Tags</th>
                  <th className="p-4 font-body font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-border-dark">
                {projects.map(p => (
                  <tr key={p.id}>
                    <td className="p-4 font-semibold">{p.title}</td>
                    <td className="p-4 text-muted-light hidden md:table-cell">{p.client}</td>
                    <td className="p-4 text-muted-dark hidden lg:table-cell truncate max-w-[200px]">{p.tags}</td>
                    <td className="p-4 flex gap-3">
                      <button onClick={() => setEditingProject(p)} className="text-accent hover:text-white">Edit</button>
                      <button onClick={() => handleDeleteProject(p.id)} className="text-red-500 hover:text-red-400">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blogs Content */}
      {activeTab === "blogs" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setEditingBlog({})}
              className="bg-white text-black font-display font-bold px-4 py-2 hover:bg-gray-200 transition-colors"
            >
              + New Post
            </button>
          </div>

          <div className="bg-surface-dark border border-border-dark">
            <table className="w-full text-left">
              <thead className="border-b border-border-dark text-xs uppercase tracking-widest text-muted-dark">
                <tr>
                  <th className="p-4 font-body font-normal">Title</th>
                  <th className="p-4 font-body font-normal hidden md:table-cell">Category</th>
                  <th className="p-4 font-body font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-border-dark">
                {blogs.map(b => (
                  <tr key={b.id}>
                    <td className="p-4 font-semibold">{b.title}</td>
                    <td className="p-4 text-muted-light hidden md:table-cell">{b.category}</td>
                    <td className="p-4 flex gap-3">
                      <button onClick={() => setEditingBlog(b)} className="text-accent hover:text-white">Edit</button>
                      <button onClick={() => handleDeleteBlog(b.id)} className="text-red-500 hover:text-red-400">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-foreground-dark border border-border-dark w-full max-w-2xl p-8 mb-10">
            <h2 className="font-display font-bold text-xl mb-6">
              {editingProject.id ? "Edit Project" : "New Project"}
            </h2>
            <form onSubmit={handleSaveProject} className="flex flex-col gap-4">
              {editingProject.id && <input type="hidden" name="id" value={editingProject.id} />}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Title *</label>
                  <input name="title" defaultValue={editingProject.title} required className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Slug *</label>
                  <input name="slug" defaultValue={editingProject.slug} required className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Client *</label>
                  <input name="client" defaultValue={editingProject.client} required className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Tags (Comma Separated)</label>
                  <input name="tags" defaultValue={editingProject.tags} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Cover Image URL</label>
                  <input name="coverImage" defaultValue={editingProject.coverImage} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Problem *</label>
                  <textarea name="problem" defaultValue={editingProject.problem} required rows={3} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Solution *</label>
                  <textarea name="solution" defaultValue={editingProject.solution} required rows={3} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Result *</label>
                  <input name="result" defaultValue={editingProject.result} required className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Year</label>
                  <input name="year" type="number" defaultValue={editingProject.year || new Date().getFullYear()} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Published</label>
                  <select name="published" defaultValue={editingProject.published === false ? "false" : "true"} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white">
                    <option value="true">Yes</option>
                    <option value="false">No (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-border-dark">
                <button type="button" onClick={() => setEditingProject(null)} className="text-muted-dark hover:text-white px-4">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-white text-black font-display font-bold px-6 py-2 hover:bg-gray-200">
                  {isSaving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="bg-foreground-dark border border-border-dark w-full max-w-2xl p-8 mb-10">
            <h2 className="font-display font-bold text-xl mb-6">
              {editingBlog.id ? "Edit Blog Post" : "New Blog Post"}
            </h2>
            <form onSubmit={handleSaveBlog} className="flex flex-col gap-4">
              {editingBlog.id && <input type="hidden" name="id" value={editingBlog.id} />}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Title *</label>
                  <input name="title" defaultValue={editingBlog.title} required className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Slug *</label>
                  <input name="slug" defaultValue={editingBlog.slug} required className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Category *</label>
                  <input name="category" defaultValue={editingBlog.category} required className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Excerpt *</label>
                  <textarea name="excerpt" defaultValue={editingBlog.excerpt} required rows={2} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Content (Markdown) *</label>
                  <textarea name="content" defaultValue={editingBlog.content} required rows={8} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white font-mono text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Cover Image URL</label>
                  <input name="coverImage" defaultValue={editingBlog.coverImage || ""} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Read Time (Mins)</label>
                  <input name="readTime" type="number" defaultValue={editingBlog.readTime || 5} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-dark mb-1">Published</label>
                  <select name="published" defaultValue={editingBlog.published === false ? "false" : "true"} className="w-full bg-[#0D0D0D] border border-border-dark p-3 text-white">
                    <option value="true">Yes</option>
                    <option value="false">No (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-border-dark">
                <button type="button" onClick={() => setEditingBlog(null)} className="text-muted-dark hover:text-white px-4">Cancel</button>
                <button type="submit" disabled={isSaving} className="bg-white text-black font-display font-bold px-6 py-2 hover:bg-gray-200">
                  {isSaving ? "Saving..." : "Save Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
