"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowRight, CheckCircle2, XCircle, RefreshCw, Layers } from "lucide-react";

export default function ComparePage() {
  const [isCompared, setIsCompared] = useState(false);

  // Bu veriler ileride arkadaşının yazacağı backend'den gelecek
  const mockAnalysis = {
    score: 78,
    source: {
      uni: "Dumlupınar Üniversitesi",
      name: "Veri Tabanı Yönetim Sistemleri",
      ects: 6,
    },
    target: {
      uni: "ODTÜ",
      name: "Database Systems",
      ects: 6,
    },
    commonTopics: ["SQL", "ER Modeli", "Normalizasyon"],
    missingTopics: ["Transaction Management", "NoSQL", "Concurrency Control"],
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Ders Karşılaştırma Analizi</h2>
          <p className="text-gray-500 mt-2">Farklı üniversitelerdeki derslerin içerik ve AKTS uyumunu analiz edin.</p>
        </div>

        {/* Ders Seçim Alanı */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kendi Dersiniz</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500">
              <option>DPÜ - Veri Tabanı Yönetim Sistemleri (BİL201)</option>
            </select>
          </div>

          <ArrowRight className="w-8 h-8 text-gray-300 hidden md:block mt-6" />

          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hedef Ders</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500">
              <option>ODTÜ - Database Systems (CENG302)</option>
            </select>
          </div>

          <button 
            onClick={() => setIsCompared(true)}
            className="mt-6 md:mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${isCompared ? "animate-spin" : ""}`} />
            Analiz Et
          </button>
        </div>

        {/* Sonuç Alanı (Sadece butona basılınca görünür) */}
        {isCompared && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            
            {/* Skor Kartı */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <h3 className="text-lg font-medium text-gray-500 mb-4">Sistem Eşleşme Skoru</h3>
              <div className="flex items-center justify-center gap-4">
                <div className="text-6xl font-extrabold text-blue-600">%{mockAnalysis.score}</div>
              </div>
              <div className="w-full max-w-md mx-auto bg-gray-100 rounded-full h-3 mt-6">
                <div className="bg-blue-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${mockAnalysis.score}%` }}></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Bu iki ders içerik ve kredi açısından <span className="text-green-600 font-bold">Büyük Ölçüde Uyumlu</span> görünmektedir.</p>
            </div>

            {/* Konu Detayları Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Ortak Konular */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-green-500">
                <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                  <CheckCircle2 className="text-green-500" /> Ortak İşlenen Konular
                </h4>
                <ul className="space-y-3">
                  {mockAnalysis.commonTopics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 bg-green-50 p-2 rounded-md">
                      <Layers className="w-4 h-4 text-green-600" /> {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eksik Konular */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-500">
                <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                  <XCircle className="text-red-500" /> Hedefte Olup Bizde Olmayanlar
                </h4>
                <ul className="space-y-3">
                  {mockAnalysis.missingTopics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 bg-red-50 p-2 rounded-md">
                      <Layers className="w-4 h-4 text-red-600" /> {topic}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}