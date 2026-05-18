import AppLayout from "@/components/layout/AppLayout";
import { GraduationCap, BookOpen, Scale, Users } from "lucide-react";

export default function Home() {
  const stats = [
    { title: "Kayıtlı Üniversite", value: "14", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Toplam Ders", value: "3,240", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-100" },
    { title: "Karşılaştırma", value: "856", icon: Scale, color: "text-green-600", bg: "bg-green-100" },
    { title: "Sistem Kullanıcısı", value: "128", icon: Users, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard</h2>
        <p className="text-gray-500 mt-2 text-lg">Sistemdeki güncel verilerin özeti aşağıdadır.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}