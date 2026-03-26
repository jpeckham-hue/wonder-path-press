"use client";

import { useTransition, useState } from "react";
import { createAuthor, updateAuthor } from "@/app/admin/(dashboard)/authors/actions";
import Link from "next/link";

export function AuthorForm({ initialData = null }: { initialData?: any }) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData;

  const [imageType, setImageType] = useState<"url" | "upload">(
    initialData?.avatarUrl?.startsWith("data:image") ? "upload" : "url"
  );
  const [base64Image, setBase64Image] = useState(
    initialData?.avatarUrl?.startsWith("data:image") ? initialData.avatarUrl : ""
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          setBase64Image(canvas.toDataURL("image/jpeg", 0.7)); // Compress to 70% JPEG
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete("avatarUpload");
    
    if (imageType === "upload" && base64Image) {
      formData.set("avatarUrl", base64Image);
    }

    startTransition(async () => {
      try {
        if (isEditing) {
          await updateAuthor(initialData.id, formData);
        } else {
          await createAuthor(formData);
        }
      } catch (error) {
        if ((error as any)?.message?.includes("NEXT_REDIRECT")) {
          throw error;
        }
        alert("Error: " + ((error as any)?.message || String(error) || "Unknown error"));
        console.error(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            defaultValue={initialData?.name || ""}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="bio" className="text-sm font-medium">Biography</label>
          <textarea 
            id="bio" 
            name="bio" 
            rows={5}
            defaultValue={initialData?.bio || ""}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid gap-4 p-4 border rounded-xl bg-card">
          <div className="flex items-center justify-between">
             <label className="text-sm font-medium">Profile Image (Avatar URL)</label>
             <div className="flex bg-muted rounded-md p-1">
               <button 
                  type="button" 
                  onClick={() => setImageType("url")} 
                  className={`text-xs px-3 py-1 rounded-sm font-medium transition-colors ${imageType === 'url' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
               >
                 Image URL
               </button>
               <button 
                  type="button" 
                  onClick={() => setImageType("upload")} 
                  className={`text-xs px-3 py-1 rounded-sm font-medium transition-colors ${imageType === 'upload' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
               >
                 Upload File
               </button>
             </div>
          </div>
          
          {imageType === "url" ? (
             <input 
               type="url" 
               id="avatarUrl" 
               name="avatarUrl" 
               defaultValue={!initialData?.avatarUrl?.startsWith("data:image") ? (initialData?.avatarUrl || "") : ""}
               placeholder="https://example.com/headshot.jpg"
               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
               onChange={() => {}}
             />
          ) : (
             <div className="space-y-2">
               <input 
                 type="file" 
                 id="avatarUpload" 
                 name="avatarUpload" 
                 accept="image/*"
                 onChange={handleImageUpload}
                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:pt-1 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
               />
               {base64Image && (
                  <p className="text-xs text-primary font-medium">Avatar queued for upload.</p>
               )}
             </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {isPending ? "Saving..." : isEditing ? "Update Author" : "Create Author"}
        </button>
        <Link 
          href="/admin/authors"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
