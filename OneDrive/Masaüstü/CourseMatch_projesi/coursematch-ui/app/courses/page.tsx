"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Search, Filter, MoreHorizontal, BookOpen } from "lucide-react";

export default function CoursesPage() {
  // İleride veritabanından gelecek örnek ders listesi
  const [courses] = useState([
    { id: 1, code: "BİL201", name: "Veri Tabanı Yönetim Sistemleri", uni: "Dumlupınar Üniversitesi", ects: 6, lang: "Türkçe" },
    { id: 2, code: "CENG302", name: "Database Systems", uni: "ODTÜ", ects: 6, lang: "İngilizce" },
    { id: 3, code: "BIL105", name: "Algoritma ve Programlama", uni: "Dumlupınar Üniversitesi", ects: 5, lang: "Türkçe" },
    { id: 4, code: "CS101", name: "Introduction to Computer Science", uni: "Boğaziçi Üniversitesi", ects: 6, lang: "İngilizce" },
    { id: 5, code: "CENG218", name: "Data Structures", uni: "Hacettepe Üniversitesi", ects: 7, lang: "İngilizce" },
  ]);

  // Arama çubuğuna yazılan metni tuttuğumuz state
  const [searchTerm, setSearchTerm] = useState("");

  // Arama çubuğuna göre listeyi filtreleme mantığı
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.uni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Sistemdeki Dersler</h2>
            <p className="text-gray-500 mt-2">Tüm üniversitelerden eklenen dersleri arayın ve filtreleyin.</p>
          </div>
          
          {/* Yeni Ders Ekle Butonu */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            Yeni Ders Ekle
          </button>
        </div>

        {/* Filtre ve Arama Alanı */}
        <div className="bg-white p-4 rounded-t-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Ders adı, kodu veya üniversite ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" /> Filtrele
          </button>
        </div>

        {/* Tablo */}
        <div className="bg-white shadow-sm border-x border-b border-gray-100 rounded-b-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Ders Kodu</th>
                  <th className="py-4 px-6 font-semibold">Ders Adı</th>
                  <th className="py-4 px-6 font-semibold">Üniversite</th>
                  <th className="py-4 px-6 font-semibold">AKTS</th>
                  <th className="py-4 px-6 font-semibold">Dil</th>
                  <th className="py-4 px-6 font-semibold text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-blue-600">{course.code}</td>
                      <td className="py-4 px-6 text-gray-900 font-medium">{course.name}</td>
                      <td className="py-4 px-6 text-gray-600">{course.uni}</td>
                      <td className="py-4 px-6 text-gray-600">
                        <span className="bg-gray-100 text-gray-700 py-1 px-2.5 rounded-md text-sm font-medium">
                          {course.ects}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{course.lang}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      Arama kriterlerinize uygun ders bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}