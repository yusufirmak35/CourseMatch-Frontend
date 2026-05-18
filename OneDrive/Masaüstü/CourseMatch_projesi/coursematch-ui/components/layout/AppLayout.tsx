import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex">
      <Sidebar />
      {/* Sidebar 64 birim genişliğinde, içeriği sağa kaydırıyoruz */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}