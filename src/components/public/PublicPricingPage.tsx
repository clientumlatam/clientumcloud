import React, { useState } from 'react';
import {
  Check,
  Receipt,
  HelpCircle,
  Sparkles,
  Clock,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { PublicRoutePath } from './publicRoutes';
import { ClientumPlanId } from '../../types';

interface PublicPricingPageProps {
  currency: 'ARS' | 'USD';
  onToggleCurrency: () => void;
  onNavigate: (path: PublicRoutePath) => void;
  onOpenWizard: () => void;
}

export const PublicPricingPage: React.FC<PublicPricingPageProps> = ({
  currency,
  onToggleCurrency,
  onNavigate,
  onOpenWizard,
}) => {
  const {
    enterApp,
    trialSubscription,
    startFreeTrial,
    openMercadoPagoCheckout,
    showToast,
  } = useCRM();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const isAnnual = billingCycle === 'annual';

  const displayPlans = [
    {
      id: 'starter' as ClientumPlanId,
      name: 'Starter',
      tagline: 'Para PyMEs en crecimiento que necesitan ordenar su operación comercial.',
      priceUSD: isAnnual ? 25 : 29,
      priceARS: isAnnual ? 12665 : 14900,
      badge: null,
      popular: false,
      features: [
        'WhatsApp CRM para 2 usuarios',
        'Pipeline Kanban y gestión de tratos',
        'Directorio de contactos y empresas',
        'Prospección con Google Maps',
        'Soporte técnico por email en español',
      ],
    },
    {
      id: 'professional' as ClientumPlanId,
      name: 'Professional',
      tagline: 'Para empresas que están escalando ventas y automatización integral.',
      priceUSD: isAnnual ? 57 : 69,
      priceARS: isAnnual ? 25415 : 29900,
      badge: 'Más Elegido',
      popular: true,
      features: [
        '5 usuarios comerciales incluidos',
        'Chatbot IA 24/7 con Gemini 3.6 Flash',
        'Facturación AFIP con CAE (Factura A y B)',
        'Workflows automáticos sin código (DAG)',
        'Email cadences y seguimiento webmail',
        'Soporte prioritario por WhatsApp',
      ],
    },
    {
      id: 'enterprise' as ClientumPlanId,
      name: 'Enterprise',
      tagline: 'Para grandes operaciones con procesos, metadatos y equipos a medida.',
      priceUSD: isAnnual ? 139 : 169,
      priceARS: isAnnual ? 50915 : 59900,
      badge: 'Escala Total',
      popular: false,
      features: [
        'Usuarios comerciales ilimitados',
        'Custom Objects Studio & metadatos',
        'Agente OS autónomo (14 roles IA)',
        'Zona DNS y Cloudflare custom',
        'SLA garantizado del 99.9%',
        'Gerente de cuenta dedicado 24/7',
      ],
    },
  ];

  const services = [
    {
      title: 'Onboarding Express (< 5 días)',
      desc: 'Configuración llave en mano de etapas, embudos y migración de contactos desde Excel.',
      price: '$90.000 ARS / Pago Único',
    },
    {
      title: 'Entrenamiento de Bot WhatsApp IA',
      desc: 'Carga de catálogo, árbol de decisiones, FAQs complejas y conexión a API oficial.',
      price: '$140.000 ARS / Pago Único',
    },
    {
      title: 'Homologación Fiscal AFIP Llave en Mano',
      desc: 'Puesta en marcha de certificados digitales AFIP y puntos de venta electrónicos.',
      price: '$70.000 ARS / Pago Único',
    },
  ];

  const handleStartTrialAction = (planId: ClientumPlanId) => {
    startFreeTrial(planId);
    showToast('¡Comenzaste tu Free Trial de 7 días con acceso Pro!', 'success');
    enterApp(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900">
      
      {/* 7-DAY FREE TRIAL HERO HIGHLIGHT */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Free Trial de 1 Semana (7 Días) • 100% Gratis</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Probá todo el poder de Clientum durante 7 días sin costo
          </h2>

          <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
            Sin tarjeta de crédito requerida. Accedé al CRM completo, WhatsApp comercial, bot IA y facturación AFIP. Si te gusta, te suscribís en cualquier momento mediante <strong className="text-white underline decoration-blue-400">Mercado Pago</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleStartTrialAction('professional')}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Comenzar Prueba Gratuita (7 Días)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => openMercadoPagoCheckout('professional')}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-blue-300" />
              <span>Suscribirme directo con Mercado Pago</span>
            </button>
          </div>
        </div>

        {/* Decorative corner background badge */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
      </section>

      {/* Title & Controls */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 shadow-xs">
          <Receipt className="w-3.5 h-3.5 text-blue-600" />
          <span>Precios Transparentes • Facturación Oficial AFIP</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Planes adaptados a tu escala comercial
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Pagos procesados de forma segura con <strong>Mercado Pago</strong> en Pesos Argentinos (ARS). Emisión automática de Factura A o B con CAE directo de AFIP.
        </p>

        {/* Toggles: Monthly/Annual + Currency */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Billing Cycle */}
          <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1 text-xs font-bold shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Pago Anual</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold">
                -15% OFF
              </span>
            </button>
          </div>

          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            Ver en {currency === 'ARS' ? 'USD (Dólares)' : 'ARS (Pesos)'}
          </button>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {displayPlans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
              plan.popular
                ? 'bg-blue-50/40 border-2 border-blue-600 shadow-xl shadow-blue-500/10'
                : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-md uppercase tracking-wider">
                {plan.badge}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.tagline}</p>
              </div>

              {/* Price display */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {currency === 'ARS'
                      ? `$${plan.priceARS.toLocaleString('es-AR')}`
                      : `$${plan.priceUSD}`}
                  </span>
                  <span className="text-xs text-slate-500">/ mes</span>
                </div>
                <div className="text-[11px] text-blue-600 font-semibold mt-0.5">
                  {isAnnual ? 'Facturado anualmente (-15% de ahorro)' : 'Suscripción mensual recurrente'}
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="pt-4 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Incluye:
                </span>
                <ul className="space-y-2 text-xs text-slate-600">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions: Free Trial + Mercado Pago checkout */}
            <div className="pt-6 space-y-2">
              <button
                type="button"
                onClick={() => handleStartTrialAction(plan.id)}
                className="w-full py-3 rounded-xl font-bold text-xs tracking-wide bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Probar 7 Días Gratis</span>
              </button>

              <button
                type="button"
                onClick={() => openMercadoPagoCheckout(plan.id)}
                className="w-full py-2.5 rounded-xl font-bold text-xs tracking-wide bg-[#009ee3] hover:bg-[#0089c7] text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs shadow-[#009ee3]/20"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Suscribirme con Mercado Pago</span>
              </button>

              <div className="text-center text-[10px] text-slate-400 pt-1">
                7 días gratis • Débito automático en ARS
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Mercado Pago Security Trust Banner */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#009ee3]/10 text-[#009ee3] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Pagos 100% Protegidos con Mercado Pago
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xl leading-relaxed">
              Tus suscripciones se procesan mediante débito recurrente de Mercado Pago. Podés pagar con dinero en cuenta, tarjetas bancarias o transferencia CBU/CVU.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-slate-700">Factura Oficial:</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800">
            AFIP RG 4291
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
            CAE Inmediato
          </span>
        </div>
      </section>

      {/* Implementation Services Row */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Servicios Adicionales
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Puesta en Marcha Llave en Mano & Migración Asistida
          </h2>
          <p className="text-xs text-slate-600">
            Nuestro equipo de consultores e ingenieros se encarga de dejar tu sistema 100% operativo sin requerir departamento de IT interno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((srv, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 shadow-xs">
              <div className="font-bold text-slate-900 text-xs">{srv.title}</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{srv.desc}</p>
              <div className="pt-1 text-xs font-bold text-blue-600">{srv.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ on Billing */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">Preguntas Frecuentes sobre el Free Trial y Mercado Pago</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-1">
            <div className="font-bold text-slate-900">¿Cómo funciona la semana de prueba gratis (Free Trial)?</div>
            <div>Tenés 7 días completos desde el momento de registro para usar todas las herramientas Pro sin pagar nada ni ingresar tarjeta de crédito. Pasados los 7 días, podés suscribirte mediante Mercado Pago para mantener activa tu cuenta.</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-900">¿Cómo se procesa el cobro con Mercado Pago?</div>
            <div>El cobro se realiza automáticamente mes a mes o año a año según el ciclo elegido. Podés abonar con dinero en cuenta de Mercado Pago, tarjeta de débito/crédito o transferencia con CBU/CVU.</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-900">¿Emiten Factura A en Argentina?</div>
            <div>Sí. Al suscribirte ingresás tu CUIT y Razón Social, y el sistema genera automáticamente tu Factura A o B electrónica con código de autorización CAE de AFIP.</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-900">¿Puedo cancelar la suscripción cuando quiera?</div>
            <div>Sí. No hay contratos de permanencia mínima ni penalizaciones. Podés pausar o cancelar tu suscripción desde el panel de suscripciones con un solo clic.</div>
          </div>
        </div>
      </section>

    </div>
  );
};
