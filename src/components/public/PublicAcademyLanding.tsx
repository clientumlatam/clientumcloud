import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Clock, BarChart3, ChevronRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  duration: string;
  level: string;
  badge: string;
}

const courses: Course[] = [
  { id: 'crm-ventas', title: 'CRM Clientum: Ventas, Kanban y...', duration: '4 semanas', level: 'Básico a Intermedio', badge: 'MÁS POPULAR' },
  { id: 'whatsapp-api', title: 'WhatsApp Business API & Chatbots...', duration: '4 semanas', level: 'Intermedio', badge: 'DESTACADO' },
  { id: 'copiloto-marketing', title: 'Copiloto IA de Marketing: Ads, ICP &...', duration: '3 semanas', level: 'Todos los niveles', badge: 'INNOVACIÓN' },
  { id: 'outbound-email', title: 'Outbound & Email Marketing...', duration: '3 semanas', level: 'Intermedio', badge: 'NUEVO' },
  { id: 'seo-local', title: 'SEO Local & Prospección Inteligente...', duration: '3 semanas', level: 'Todos los niveles', badge: 'FINALIZADO' },
  { id: 'facturacion-afip', title: 'Facturación AFIP & Cobros Mercado...', duration: '2 semanas', level: 'Básico a Intermedio', badge: 'ESENCIAL' },
  { id: 'bi-metricas', title: 'Business Intelligence, ROI y Métricas...', duration: '3 semanas', level: 'Intermedio a Avanzado', badge: 'DIRECTIVO' },
  { id: 'creacion-brochures', title: 'Creación de Brochures y Material de...', duration: '2 semanas', level: 'Básico', badge: 'EXPRESS' },
  { id: 'marketing-principiantes', title: 'Marketing Digital para Principiantes', duration: '3 semanas', level: 'Principiante', badge: 'NUEVA COHORTE' },
];

export const PublicAcademyLanding: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'dashboard'>('catalog');

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Formación Interactiva en CRM & AI Marketing</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Cursos prácticos diseñados para pymes y profesionales del Alto Valle. Aprendé a operar herramientas de automatización comercial, marketing outbound y prospección inteligente con simuladores en tiempo real.
          </p>
        </div>

        <div className="flex justify-center mb-8 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`px-6 py-3 font-semibold ${activeTab === 'catalog' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600'}`}>
            Catálogo de Cursos
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-semibold ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600'}`}>
            Mi Dashboard de Estudiante
          </button>
        </div>

        {activeTab === 'catalog' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <motion.div 
                key={course.id}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <BookOpen className="text-blue-600" />
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{course.badge}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-1">{course.duration}</p>
                  <p className="text-sm text-slate-500">{course.level}</p>
                </div>
                <button 
                  onClick={() => onNavigate(`/academia/${course.id}`)}
                  className="mt-4 flex items-center justify-center w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">
                  Ver detalle <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
