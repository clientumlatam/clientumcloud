import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AICopilot } from '../ai/AICopilot';

export const AICopilotFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="clientum-ai-copilot-floating"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 border border-white/20 cursor-pointer hover:scale-105 active:scale-95"
          title="Abrir Clientum AI Copilot"
        >
          <div className="w-5 h-5 rounded-full bg-[var(--bg-card)]/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </div>
          <span>Copilot IA</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {isOpen && (
        <div className="w-[345px] max-w-[92vw] h-[520px] max-h-[85vh] shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col">
          <AICopilot onClose={() => setIsOpen(false)} embedded={true} />
        </div>
      )}
    </div>
  );
};

export default AICopilotFloating;
