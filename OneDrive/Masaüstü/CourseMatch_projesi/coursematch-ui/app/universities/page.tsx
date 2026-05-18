"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Search, Filter, MoreHorizontal, Building2, MapPin, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import api from "@/services/api";
import { University } from "@/types";

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Yeni eklediğimiz Backend Durum Yöneticileri
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sayfa açıldığında Backend'e istek atan kısım
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setIsLoading(true);
        // Gerçekte atılacak istek:
        // const response = await api.get('/universities');
        // setUniversities(response.data);

        // ŞİMDİLİK BACKEND HAZIR OLMADIĞI İÇİN SİMÜLASYON YAPIYORUZ (1.5 saniye gecikme)
        setTimeout(() => {
          setUniversities([
            { id: 1, name: "Kütahya Dumlupınar Üniversitesi", city: "Kütahya", type: "Devlet", faculties: 14, courses: 850, status: "Aktif" },
            { id: 2, name: "Orta Doğu Teknik Üniversitesi", city: "Ankara", type: "Devlet", faculties: 5, courses: 1240, status: "Aktif" },
            { id: 3, name: "Boğaziçi Üniversitesi", city: "İstanbul", type: "Devlet", faculties: 6, courses: 980, status: "Aktif" },
          ]);
          setIsLoading(false);
        }, 1500);

      } catch (err) {
        setError("Veriler yüklenirken sunucu ile bağlantı kurulamadı.");
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Building2 className="w-5 h-5" />
            Yeni Kurum Ekle
          </button>
        </div>

        {/* Hata Durumu Ekranı */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center gap-3">
            <AlertCircle className="text-red-500 w-6 h-6" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

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
        </div>

        <div className="bg-white shadow-sm border-x border-b border-gray-100 rounded-b-2xl overflow-hidden min-h-[300px]">
          
          {/* YÜKLENİYOR (LOADING) ANİMASYONU */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-blue-600">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Sunucudan veriler çekiliyor...</p>
            </div>
          ) : (
            <div className="overflow-x-auto animate-in fade-in duration-500">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Kurum Adı</th>
                    <th className="py-4 px-6 font-semibold">Şehir</th>
                    <th className="py-4 px-6 font-semibold">Durum</th>
                    <th className="py-4 px-6 font-semibold text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUniversities.map((uni) => (
                    <tr key={uni.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{uni.name}</td>
                      <td className="py-4 px-6 text-gray-600">{uni.city}</td>
                      <td className="py-4 px-6">
                        <span className="text-green-600 flex items-center gap-1.5 text-sm font-medium">
                          <ShieldCheck className="w-4 h-4" /> {uni.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-gray-400 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}