"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowRight, CheckCircle2, XCircle, RefreshCw, Layers, Languages, Scale, FileCheck, Loader2, Bot } from "lucide-react";

export default function ComparePage() {
  const [isCompared, setIsCompared] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Yeni yüklenme state'imiz

  const mockAnalysis = {
    score: 78,
    source: { uni: "Dumlupınar Üniversitesi", name: "Veri Tabanı Yönetim Sistemleri", ects: 6, lang: "Türkçe" },
    target: { uni: "ODTÜ", name: "Database Systems", ects: 6, lang: "İngilizce" },
    commonTopics: ["SQL", "ER Modeli", "Normalizasyon"],
    missingTopics: ["Transaction Management", "NoSQL", "Concurrency Control"],
    ectsMatch: true, 
    langMatch: false,
    decision: "Kurul İncelemesi Gerekir",
    decisionDesc: "İçerik %78 uyumlu ancak eğitim dili farklılığı sebebiyle doğrudan muafiyet verilemez. Bölüm başkanlığı onayı gereklidir."
  };

  // Butona basıldığında çalışacak fonksiyon
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setIsCompared(false);

    // Yapay Zeka analizini simüle ediyoruz (2 Saniye bekleyecek)
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsCompared(true);
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Ders Karşılaştırma Analizi</h2>
          <p className="text-gray-500 mt-2">Farklı üniversitelerdeki derslerin içerik, AKTS ve dil uyumunu yapay zeka destekli analiz edin.</p>
        </div>

        {/* Ders Seçim Alanı */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kendi Dersiniz</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" disabled={isAnalyzing}>
              <option>DPÜ - Veri Tabanı Yönetim Sistemleri (BİL201)</option>
            </select>
          </div>

          <ArrowRight className="w-8 h-8 text-gray-300 hidden md:block mt-6" />

          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hedef Ders</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" disabled={isAnalyzing}>
              <option>ODTÜ - Database Systems (CENG302)</option>
            </select>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="mt-6 md:mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {isAnalyzing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Analiz Ediliyor...</>
            ) : (
              <><RefreshCw className="w-5 h-5" /> Analiz Et</>
            )}
          </button>
        </div>

        {/* Yapay Zeka Yüklenme Durumu */}
        {isAnalyzing && (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-blue-600 animate-in fade-in duration-300">
            <Bot className="w-16 h-16 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Yapay Zeka İçerikleri Karşılaştırıyor</h3>
            <p className="text-gray-500">Müfredat, AKTS ve öğrenme çıktıları taranıyor. Lütfen bekleyin...</p>
            <div className="w-48 bg-gray-200 rounded-full h-2 mt-6 overflow-hidden">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        )}

        {/* Sonuç Alanı */}
        {isCompared && !isAnalyzing && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
            
            {/* Üst Kısım: Skor ve Karar Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center col-span-1 md:col-span-1 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Genel Uyum Skoru</h3>
                <div className="text-6xl font-extrabold text-blue-600 mb-4">%{mockAnalysis.score}</div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${mockAnalysis.score}%` }}></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-4">
                  <div className="bg-orange-100 p-2 rounded-lg mt-1">
                    <FileCheck className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-800 text-lg">Öneri: {mockAnalysis.decision}</h4>
                    <p className="text-orange-700/80 text-sm mt-1">{mockAnalysis.decisionDesc}</p>
                  </div>
                </div>

                <div className="border border-gray-100 p-4 rounded-xl flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${mockAnalysis.ectsMatch ? 'bg-green-50' : 'bg-red-50'}`}>
                    <Scale className={`w-6 h-6 ${mockAnalysis.ectsMatch ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">AKTS Uyumu</p>
                    <p className="font-bold text-gray-800 mt-0.5">{mockAnalysis.source.ects} Kredi ➔ {mockAnalysis.target.ects} Kredi</p>
                  </div>
                </div>

                <div className="border border-gray-100 p-4 rounded-xl flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${mockAnalysis.langMatch ? 'bg-green-50' : 'bg-red-50'}`}>
                    <Languages className={`w-6 h-6 ${mockAnalysis.langMatch ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Eğitim Dili</p>
                    <p className="font-bold text-gray-800 mt-0.5">{mockAnalysis.source.lang} ➔ {mockAnalysis.target.lang}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Konu Detayları Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-green-500">
                <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                  <CheckCircle2 className="text-green-500" /> Ortak İşlenen Konular
                </h4>
                <ul className="space-y-3">
                  {mockAnalysis.commonTopics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 bg-green-50 p-2.5 rounded-lg text-sm font-medium">
                      <Layers className="w-4 h-4 text-green-600" /> {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-red-500">
                <h4 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
                  <XCircle className="text-red-500" /> Hedefte Olup Bizde Olmayanlar
                </h4>
                <ul className="space-y-3">
                  {mockAnalysis.missingTopics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 bg-red-50 p-2.5 rounded-lg text-sm font-medium">
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