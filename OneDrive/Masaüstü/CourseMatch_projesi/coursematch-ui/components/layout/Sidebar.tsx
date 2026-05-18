"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, BookOpen, Scale, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Üniversiteler", href: "/universities", icon: GraduationCap },
    { name: "Dersler", href: "/courses", icon: BookOpen },
    { name: "Karşılaştırma", href: "/compare", icon: Scale },
    { name: "Ayarlar", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Scale className="w-7 h-7 text-blue-600 mr-2" />
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Course<span className="text-blue-600">Match</span></h1>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-blue-50 text-blue-700 font-semibold shadow-sm" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}