import { AdminPage, AdminHeader } from "../../components";
import BlogPostForm from "../BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <AdminPage>
      <AdminHeader title="New Blog Post" />
      <BlogPostForm />
    </AdminPage>
  );
}

