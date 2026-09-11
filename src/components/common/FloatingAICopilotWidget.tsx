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
  ChevronDown,
  Minimize2,
  Maximize2,
  Zap,
  CheckSquare,
  Mail,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { getClientumAuthJsonHeaders } from '../../lib/api';

interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionItem?: {
    type: 'task' | 'email' | 'stage';
    label: string;
    payload?: any;
  };
}

export { AICopilotFloating } from './AICopilotFloating';

export const FloatingAICopilotWidget: React.FC = () => {
  const {
    opportunities,
    companies,
    tasks,
    activeTab,
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

  // Context-aware subtitle based on active screen
  const getScreenContext = () => {
    switch (activeTab) {
      case 'opportunities':
        return 'Modo: Pipeline de Ventas & Negociación';
      case 'googleMaps':
        return 'Modo: Prospección Cartográfica B2B';
      case 'companies':
      case 'people':
        return 'Modo: Directorio de Cuentas';
      case 'tasks':
        return 'Modo: Productividad & Agenda';
      case 'propuestas':
        return 'Modo: Cierre & Propuestas Comerciales';
      default:
        return 'Modo: Inteligencia General de Negocios';
    }
  };

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-copilot-welcome',
      role: 'assistant',
      content:
        '👋 ¡Hola! Soy tu **Copilot de Ventas Gemini** en Clientum. Analizo tu pipeline en tiempo real, redacto correos de seguimiento con objeciones y genero tareas de cierre con 1 clic. ¿En qué te ayudo ahora?',
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
        name: o.name,
        company: o.companyName,
        amount: o.amount,
        stage: o.stage,
        probability: o.probability,
      }));

      const payload = {
        prompt: `El usuario está en la vista "${activeTab}" de Clientum CRM.
Contexto de negocios clave: ${JSON.stringify(topDeals)}.
Total de tareas pendientes: ${tasks.filter((t) => t.status !== 'Completed').length}.
Total de empresas: ${companies.length}.

Pregunta o instrucción del usuario: "${query}"

Responde como un asesor comercial sénior, muy conciso, accionable y profesional. Si sugiere una tarea o correo, formatéalo claramente.`,
        temperature: 0.4,
      };

      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: CopilotMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.text || data.response || 'Estrategia procesada.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API Copilot response error');
      }
    } catch (err) {
      console.warn('Fallback Copilot locally generated:', err);
      // Fallback inteligente contextual
      let fallbackText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('pipeline') || qLower.includes('salud') || qLower.includes('tratos')) {
        const total = opportunities.reduce((s, o) => s + o.amount, 0);
        fallbackText = `📊 **Diagnóstico del Pipeline en Tiempo Real**:\n- **Valor total**: $${total.toLocaleString()}\n- **Oportunidades activas**: ${opportunities.length}\n- **Recomendación prioritaria**: Focalizar esfuerzos en los tratos de etapa *Propuesta* para cerrar antes de fin de mes.`;
      } else if (qLower.includes('email') || qLower.includes('correo') || qLower.includes('whatsapp') || qLower.includes('mensaje')) {
        fallbackText = `✉️ **Borrador de Seguimiento Comercial**:\n\n"Hola [Nombre], ¿cómo estás? Te contacto para ver si pudiste revisar la propuesta que te compartimos el otro día. Podemos coordinar 10 minutos este jueves para resolver cualquier duda con el equipo técnico. ¿Qué horario te queda más cómodo?"`;
      } else if (qLower.includes('tarea') || qLower.includes('agendar') || qLower.includes('reunion')) {
        fallbackText = `✅ He detectado tu intención de agendar un seguimiento. Puedes usar el botón de abajo para registrarla al instante en tu agenda comercial.`;
      } else {
        fallbackText = `🎯 **Análisis Estratégico**:\nPara la consulta sobre "${query}", te sugiero revisar las métricas del embudo y verificar los prospectos con más de 5 días sin contacto directo.`;
      }

      const aiMsg: CopilotMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: fallbackText,
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

  const handleCreateSuggestedTask = () => {
    const today = new Date().toISOString().split('T')[0];
    addTask({
      title: 'Seguimiento prioritario sugerido por Copilot',
      description: 'Llamar al cliente para revisar dudas de propuesta comercial y agendar demo final.',
      dueDate: today,
      priority: 'High',
      status: 'Todo',
      assignedTo: 'Alex Morgan',
    });
    triggerConfetti();
    showToast('Tarea creada y añadida a tu agenda con prioridad Alta', 'success');
  };

  return (
    <aside
      id="clientum-floating-copilot-container"
      aria-label="Asistente de ventas Copilot"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end"
    >
      {/* Expanded Floating Drawer / Panel */}
      {isOpen && (
        <section
          id="clientum-floating-copilot-window"
          aria-label="Panel de chat Copilot"
          className={`mb-3 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col transition-all duration-200 animate-in slide-in-from-bottom-5 ${
            isExpanded ? 'w-[440px] sm:w-[500px] h-[650px]' : 'w-[360px] sm:w-[400px] h-[520px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-3.5 text-white flex items-center justify-between select-none shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-xs tracking-wide">Clientum Copilot</h2>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono font-semibold">
                    Gemini 2.5
                  </span>
                </div>
                <p className="text-[10px] text-blue-100/90 font-medium">
                  {getScreenContext()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title={isExpanded ? 'Reducir tamaño' : 'Expandir ventana'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Minimizar Copilot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/70 text-xs custom-scrollbar">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div key={m.id} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-3 leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>{m.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopy(m.content, m.id)}
                          className="hover:text-slate-700 flex items-center gap-1 font-semibold cursor-pointer"
                          title="Copiar texto"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copiar</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 border border-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-blue-600 text-[11px] p-2 bg-blue-50/80 rounded-lg border border-blue-100 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analizando datos comerciales con Gemini...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
            <button
              onClick={() => handleSendMessage('¿Cuáles son los 3 tratos prioritarios para cerrar esta semana?')}
              className="px-2 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-semibold flex items-center gap-1 shrink-0 border border-blue-200/60 cursor-pointer"
            >
              <TrendingUp className="w-3 h-3 text-blue-600" />
              <span>Prioridades de la semana</span>
            </button>
            <button
              onClick={() => handleSendMessage('Redacta un mensaje de WhatsApp para reactivar a un prospecto frío')}
              className="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-semibold flex items-center gap-1 shrink-0 border border-emerald-200/60 cursor-pointer"
            >
              <MessageSquare className="w-3 h-3 text-emerald-600" />
              <span>Copy WhatsApp Reactivación</span>
            </button>
            <button
              onClick={handleCreateSuggestedTask}
              className="px-2 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-semibold flex items-center gap-1 shrink-0 border border-amber-200/60 cursor-pointer"
            >
              <CheckSquare className="w-3 h-3 text-amber-600" />
              <span>Crear tarea rápida</span>
            </button>
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe a Copilot (ej: cómo responder objeción de precio)..."
              disabled={loading}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white shadow-xs transition-all cursor-pointer shrink-0"
              title="Enviar mensaje"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </section>
      )}

      {/* Floating Toggle Bubble */}
      <button
        id="clientum-floating-copilot-bubble"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-xl transition-all duration-200 cursor-pointer border select-none ${
          isOpen
            ? 'bg-slate-900 text-white border-slate-700 shadow-slate-900/30'
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white border-blue-400/30 shadow-blue-600/40 hover:scale-105'
        }`}
        title="Copilot de Ventas Gemini"
      >
        <div className="relative">
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-blue-600 animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-tight">
          {isOpen ? 'Ocultar Copilot' : 'Copilot IA'}
        </span>
      </button>
    </aside>
  );
};
