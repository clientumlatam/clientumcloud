import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RefreshCw,
  Copy,
  Check,
  Minimize2,
  Maximize2,
  Zap,
  CheckSquare,
  MessageSquare,
  TrendingUp,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { getClientumAuthJsonHeaders } from '../../lib/api';

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedAction?: {
    type: 'task' | 'note';
    label: string;
  };
}

export const AICopilotFloating: React.FC = () => {
  const {
    opportunities,
    companies,
    tasks,
    activeTab,
    currentUser,
    addTask,
    showToast,
    triggerConfetti,
  } = useCRM();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Diagnóstico del contexto actual del usuario
  const userRole = currentUser?.role || 'Administrador';
  const userName = currentUser?.name || 'Alex Morgan';

  // Métricas del contexto del CRM
  const totalPipelineAmount = opportunities.reduce((acc, o) => acc + (o.amount || 0), 0);
  const activeOpportunitiesCount = opportunities.filter((o) => o.stage !== 'won' && o.stage !== 'lost').length;
  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;

  const getScreenContextName = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Panel Ejecutivo & Métricas';
      case 'opportunities':
        return 'Pipeline Kanban de Ventas';
      case 'googleMaps':
        return 'Prospección B2B con Google Maps';
      case 'ecosystemHub':
        return 'Módulos & Ecosistema (docs/migrations)';
      case 'companies':
      case 'people':
        return 'Directorio de Empresas y Contactos';
      case 'tasks':
        return 'Gestión de Tareas y Agenda';
      case 'propuestas':
        return 'Generador de Propuestas Comerciales';
      case 'whatsapp':
        return 'Bandeja Omnicanal WhatsApp';
      case 'erp':
        return 'Facturación y Órdenes ERP';
      default:
        return 'Navegación General CRM';
    }
  };

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `👋 ¡Hola ${userName.split(' ')[0]}! Soy tu **Copilot de Ventas Gemini**. Conozco tu pipeline actual (${activeOpportunitiesCount} tratos activos por $${totalPipelineAmount.toLocaleString()}) y la vista actual (${getScreenContextName()}). ¿En qué puedo potenciar tu gestión hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const authHeaders = await getClientumAuthJsonHeaders();
      const topDeals = opportunities.slice(0, 5).map((o) => ({
        titulo: o.name,
        empresa: o.companyName,
        monto: o.amount,
        etapa: o.stage,
        probabilidad: o.probability,
      }));

      const contextPayload = {
        usuario: {
          nombre: userName,
          rol: userRole,
        },
        pantallaActual: activeTab,
        descripcionPantalla: getScreenContextName(),
        metricasCRM: {
          totalOportunidades: opportunities.length,
          oportunidadesActivas: activeOpportunitiesCount,
          montoTotalPipeline: totalPipelineAmount,
          tareasPendientes: pendingTasksCount,
          totalEmpresas: companies.length,
        },
        tratosPrincipales: topDeals,
        preguntaUsuario: query,
      };

      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          prompt: `Eres el Asistente AI Copilot de Clientum CRM, potenciado por Gemini.
Contexto actual del usuario en la plataforma:
${JSON.stringify(contextPayload, null, 2)}

Instrucción del usuario: "${query}"

Proporciona una respuesta precisa, comercialmente estratégica y práctica para acelerar cierres de venta o resolver la duda del CRM.`,
          temperature: 0.4,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: CopilotMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.text || data.response || 'Análisis comercial completado.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('Fallback Copilot Gemini API');
      }
    } catch (err) {
      console.warn('Fallback Copilot Gemini activo:', err);
      // Fallback analítico enriquecido con el contexto real
      let responseText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('pipeline') || qLower.includes('ventas') || qLower.includes('tratos') || qLower.includes('resumen')) {
        responseText = `📊 **Diagnóstico del Pipeline para ${userName}**:\n- **Volumen Total**: $${totalPipelineAmount.toLocaleString()} en ${opportunities.length} oportunidades.\n- **Oportunidades Activas**: ${activeOpportunitiesCount} en etapas de prospección y propuesta.\n- **Tareas Pendientes**: ${pendingTasksCount} acciones por ejecutar.\n\n💡 **Recomendación Gemini**: Enfócate hoy en los tratos con probabilidad mayor al 50% para cerrar el objetivo del trimestre.`;
      } else if (qLower.includes('correo') || qLower.includes('email') || qLower.includes('mensaje') || qLower.includes('whatsapp') || qLower.includes('seguimiento')) {
        responseText = `✉️ **Borrador de Seguimiento de Alto Impacto**:\n\n"Hola [Nombre], estuve revisando los números y el plan de implementación que preparamos para [Empresa]. Nos gustaría coordinar una llamada de 10 minutos esta semana para afinar los últimos detalles y fijar fecha de inicio. ¿Te queda bien este miércoles por la mañana?"`;
      } else if (qLower.includes('mapa') || qLower.includes('prospeccion') || qLower.includes('google')) {
        responseText = `🗺️ **Estrategia de Prospección B2B en Google Maps**:\n- Filtra primero por calificación ★ 4.5+ para garantizar solvencia operativa.\n- Exporta los prospectos directamente al Kanban para que tu equipo comercial inicie el primer contacto por WhatsApp o llamada en menos de 2 horas.`;
      } else {
        responseText = `🎯 **Estrategia Comercial Gemini**:\nPara "${query}", considera que tu ratio de conversión actual se maximiza contactando a los clientes potenciales dentro de las primeras 24 horas. ¿Deseas que creemos una tarea en tu agenda?`;
      }

      const aiMsg: CopilotMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copiado al portapapeles', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateTaskFromAI = () => {
    const today = new Date().toISOString().split('T')[0];
    addTask({
      title: 'Seguimiento prioritario sugerido por Copilot Gemini',
      description: `Acción derivada de consulta en la vista ${getScreenContextName()}. Contactar al prospecto para presentar propuesta.`,
      dueDate: today,
      priority: 'High',
      status: 'Pending',
    });
    triggerConfetti();
    showToast('Tarea creada y añadida a tu agenda comercial', 'success');
  };

  return (
    <div
      id="clientum-ai-copilot-floating"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Botón Flotante de Activación */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 border border-white/20 cursor-pointer hover:scale-105 active:scale-95"
          title="Abrir Copilot IA Gemini"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </div>
          <span>Copilot IA</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Ventana Flotante del Asistente */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden transition-all duration-200 animate-in zoom-in-95 ${
            isExpanded
              ? 'w-[92vw] sm:w-[540px] h-[640px] max-h-[85vh]'
              : 'w-[92vw] sm:w-[380px] h-[480px] max-h-[80vh]'
          }`}
        >
          {/* Header del Chat */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-3.5 text-white flex items-center justify-between border-b border-indigo-900/40">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shrink-0">
                <Bot className="w-4 h-4 text-indigo-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs text-white">Copilot Ventas Gemini</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 truncate font-medium">
                  Contexto: {getScreenContextName()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={isExpanded ? 'Contraer' : 'Expandir'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Cerrar Copilot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Banner de Contexto Activo del Usuario */}
          <div className="px-3.5 py-1.5 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between text-[10px] text-indigo-900 font-medium">
            <span className="truncate">
              👤 {userName} • {userRole}
            </span>
            <span className="font-mono text-indigo-700 shrink-0">
              {activeOpportunitiesCount} tratos (${(totalPipelineAmount / 1000).toFixed(0)}k)
            </span>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-2xs leading-relaxed ${
                      isAssistant
                        ? 'bg-white text-slate-800 border border-slate-200'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    <div
                      className={`flex items-center justify-between mt-1.5 pt-1 text-[9px] ${
                        isAssistant ? 'text-slate-400 border-t border-slate-100' : 'text-blue-200'
                      }`}
                    >
                      <span>{msg.timestamp}</span>

                      {isAssistant && (
                        <div className="flex items-center gap-1.5 ml-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="hover:text-blue-600 transition-colors flex items-center gap-0.5 cursor-pointer"
                            title="Copiar texto"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Gemini analizando contexto comercial...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias Rápidas según la Pantalla Activa */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
              Prompt rápido:
            </span>
            {[
              'Resumen del pipeline',
              'Redactar email de cierre',
              'Sugerir tarea de hoy',
              'Estrategia de prospección',
            ].map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleSendMessage(sug)}
                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 text-[10px] font-medium transition-colors shrink-0 cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Formulario de Entrada */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregúntale a Gemini sobre tu CRM..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-blue-500 outline-hidden transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0 shadow-2xs"
                title="Enviar consulta"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
              <span>Potenciado por Gemini 2.5 Flash</span>
              <button
                type="button"
                onClick={handleCreateTaskFromAI}
                className="text-blue-600 hover:underline font-medium flex items-center gap-1 cursor-pointer"
              >
                <CheckSquare className="w-3 h-3" />
                <span>+ Crear tarea sugerida</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICopilotFloating;
