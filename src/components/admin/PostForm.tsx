"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/app/admin/(dashboard)/blog/actions";

type Author = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  authorId: string;
  published: boolean;
};

export default function PostForm({
  authors,
  post,
}: {
  authors: Author[];
  post?: Post;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      if (post) {
        await updatePost(post.id, formData);
      } else {
        await createPost(formData);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold font-serif text-foreground">
          {post ? "Edit Post" : "New Post"}
        </h2>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Title</label>
          <input
            name="title"
            defaultValue={post?.title}
            required
            className="w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Slug (URL friendly)</label>
          <input
            name="slug"
            defaultValue={post?.slug}
            required
            className="w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Author</label>
          <select
            name="authorId"
            defaultValue={post?.authorId || ""}
            required
            className="w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="" disabled>Select an author</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Cover Image URL</label>
          <input
            name="coverImage"
            defaultValue={post?.coverImage || ""}
            className="w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Excerpt</label>
          <textarea
            name="excerpt"
            defaultValue={post?.excerpt || ""}
            rows={3}
            className="w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Content (Markdown compatible)</label>
          <textarea
            name="content"
            defaultValue={post?.content}
            required
            rows={12}
            className="w-full rounded-md border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm font-mono"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="published"
            id="published"
            defaultChecked={post?.published}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="text-sm font-medium text-foreground">
            Publish this post live
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isLoading}
            className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>
    </form>
  );
}

