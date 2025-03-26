import { Link } from "lucide-react";
import React from "react";

export default function BotonPage() {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
            
            
            <div className="space-y-4">
              {/* Botón básico */}
              
  
              {/* Botón con estilo alternativo */}
              <button className="w-48 px-6 py-3 bg-emerald-500 text-white rounded-lg 
                           hover:bg-emerald-600 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-emerald-400
                           active:bg-emerald-700">
                Botón Verde
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }