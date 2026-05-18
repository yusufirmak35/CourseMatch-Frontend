"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Search, Filter, MoreHorizontal, Building2, MapPin, ShieldCheck } from "lucide-react";

export default function UniversitiesPage() {
  // İleride veritabanından gelecek örnek üniversite listesi
  const [universities] = useState([
    { id: 1, name: "Kütahya Dumlupınar Üniversitesi", city: "Kütahya", type: "Devlet", faculties: 14, courses: 850, status: "Aktif" },
    { id: 2, name: "Orta Doğu Teknik Üniversitesi", city: "Ankara", type: "Devlet", faculties: 5, courses: 1240, status: "Aktif" },
    { id: 3, name: "Boğaziçi Üniversitesi", city: "İstanbul", type: "Devlet", faculties: 6, courses: 980, status: "Aktif" },
    { id: 4, name: "Bilkent Üniversitesi", city: "Ankara", type: "Vakıf", faculties: 10, courses: 1100, status: "Aktif" },
    { id: 5, name: "Hacettepe Üniversitesi", city: "Ankara", type: "Devlet", faculties: 16, courses: 1450, status: "Bakımda" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Sistemdeki Üniversiteler</h2>
            <p className="text-gray-500 mt-2">Ders eşleştirme ağına dahil olan üniversiteleri yönetin.</p>
          </div>
          
          {/* Yeni Üniversite Ekle Butonu */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <Building2 className="w-5 h-5" />
            Yeni Kurum Ekle
          </button>
        </div>

        {/* Filtre ve Arama Alanı */}
        <div className="bg-white p-4 rounded-t-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Üniversite adı veya şehir ara..." 
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
                  <th className="py-4 px-6 font-semibold">Kurum Adı</th>
                  <th className="py-4 px-6 font-semibold">Şehir</th>
                  <th className="py-4 px-6 font-semibold">Tür</th>
                  <th className="py-4 px-6 font-semibold">Fakülte / Ders Sayısı</th>
                  <th className="py-4 px-6 font-semibold">Durum</th>
                  <th className="py-4 px-6 font-semibold text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUniversities.length > 0 ? (
                  filteredUniversities.map((uni) => (
                    <tr key={uni.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-gray-900">{uni.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {uni.city}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        <span className={`py-1 px-2.5 rounded-md text-sm font-medium ${
                          uni.type === 'Devlet' ? 'bg-indigo-50 text-indigo-700' : 'bg-purple-50 text-purple-700'
                        }`}>
                          {uni.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        {uni.faculties} Fakülte <span className="text-gray-400 mx-1">•</span> {uni.courses} Ders
                      </td>
                      <td className="py-4 px-6">
                        <span className={`flex items-center gap-1.5 text-sm font-medium ${
                          uni.status === 'Aktif' ? 'text-green-600' : 'text-orange-500'
                        }`}>
                          {uni.status === 'Aktif' ? <ShieldCheck className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />}
                          {uni.status}
                        </span>
                      </td>
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
                      Arama kriterlerinize uygun üniversite bulunamadı.
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