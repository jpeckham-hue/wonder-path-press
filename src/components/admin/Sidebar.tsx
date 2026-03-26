"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, PenTool, LogOut, Settings, Users } from "lucide-react";
import clsx from "clsx";

const MENU_ITEMS = [
  { name: "Authors", href: "/admin/authors", icon: Users },
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Books", href: "/admin/books", icon: BookOpen },
  { name: "Blog Posts", href: "/admin/blog", icon: PenTool },
  { name: "Team Settings", href: "/admin/users", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="p-6">
        <h2 className="font-serif text-2xl font-bold text-primary">Backstage</h2>
        <p className="text-xs text-muted-foreground">Wonder Path Press</p>
      </div>
      
      <nav className="flex-1 space-y-1 px-3">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
