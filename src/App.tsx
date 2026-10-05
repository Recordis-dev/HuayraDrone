/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  X,
  Send,
  Check
} from 'lucide-react';
import { SERVICES_CATALOG } from './data/servicesData';
import { Navbar, Sidebar } from './components/Navigation';
import { ServiceView } from './components/ServiceViews';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [currentSubRoute, setCurrentSubRoute] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState<boolean>(false);

  const handleNavigate = (route: string, subroute?: string) => {
    setCurrentRoute(route);
    if (subroute) {
      setCurrentSubRoute(subroute);
    } else {
      const activeService = SERVICES_CATALOG.find(s => s.id === route);
      setCurrentSubRoute(activeService ? activeService.subroutes[0].id : 'overview');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeService = SERVICES_CATALOG.find(s => s.id === currentRoute);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 flex flex-col">
      <Navbar
        currentRoute={currentRoute}
        currentSubRoute={currentSubRoute}
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {currentRoute === 'landing' ? (
        <main className="flex-1">
          <Hero onExploreDashboard={() => handleNavigate(SERVICES_CATALOG[0].id, 'overview')} />
          <ServicesGrid onSelectService={(id) => handleNavigate(id, 'overview')} />
          <InteractiveDemoSection onSelectService={(id) => handleNavigate(id, 'overview')} />
          <Pricing onOpenModal={() => setConsultationModalOpen(true)} />
        </main>
      ) : (
        <div className="flex-1 pt-16 flex flex-col lg:flex-row">
          <Sidebar
            currentRoute={currentRoute}
            currentSubRoute={currentSubRoute}
            onNavigate={handleNavigate}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {activeService && (
              <ServiceView
                service={activeService}
                subrouteId={currentSubRoute}
                onNavigateSubroute={(subId) => setCurrentSubRoute(subId)}
                onOpenConsultationModal={() => setConsultationModalOpen(true)}
              />
            )}
          </main>
        </div>
      )}

      <Footer />

      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </div>
  );
}

function Hero({ onExploreDashboard }: { onExploreDashboard: () => void }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950 -z-10" />
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium mb-8 border border-emerald-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Sistema Huayra 2.0 • Ecosistema PropTech de Alta Conversión</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Acelera la Venta de Desarrollos con <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Inteligencia Artificial y 360°
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          7 servicios integrados sin motores de renderizado pesados: Blueprints IA, Growth Hack en 30+ portales, CRM automatizado, VR Lead Scoring, FPV Renders y Recorridos Property 360°.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onExploreDashboard}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            Explorar Dashboard de Servicios <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-semibold rounded-full transition-all border border-zinc-800 text-center"
          >
            Ver Planes de Inversión
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesGrid({ onSelectService }: { onSelectService: (id: string) => void }) {
  return (
    <section className="py-20 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">Servicios Autocontenidos</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">Catálogo Integral Huayra 2.0</h3>
          <p className="text-sm text-zinc-400">
            Haz clic en cualquier servicio para acceder a sus subrutas interactivas, métricas y simuladores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CATALOG.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="group bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-400 border border-zinc-800">
                    {service.subroutes.length} Subrutas
                  </span>
                </div>

                <h4 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h4>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-medium text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Acceder a la Subruta</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractiveDemoSection({ onSelectService }: { onSelectService: (id: string) => void }) {
  return (
    <section className="py-20 bg-zinc-900/40 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Demostración Inmersiva</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 leading-tight">
              Pre-venta Inmobiliaria sin Esperar Renders Tradicionales
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Combinamos tomas cinematográficas con drones FPV, capas generativas de IA y visores panorámicos 360° para comercializar proyectos antes de colocar la primera piedra.
            </p>

            <div className="space-y-3">
              {[
                'Renderizado de pre-factibilidad instantáneo LOD BMI',
                'Sincronización multi-portal con alertas de sobreventa cero',
                'Scoring de clientes por tiempo de retención en tours virtuales'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-medium text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectService('fpv-renders')}
              className="px-6 py-3.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl transition-all text-xs flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Ver Demo Interactivo FPV & 360°
            </button>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative bg-zinc-950">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/_QfS8rxNFMU?autoplay=1&mute=1&loop=1&playlist=_QfS8rxNFMU"
              title="FPV Real Estate Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="pricing" className="py-24 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100">Inversión Inteligente Huayra 2.0</h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Accede a tecnología PropTech valuada en más de $25,000 USD por una tarifa fija accesible.
          </p>
        </div>

        <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-8 md:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 pb-10 border-b border-zinc-800/80">
            <div>
              <div className="text-zinc-500 line-through text-sm font-mono mb-1">Costo Estimado Mercado: $1,000 USD</div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-extrabold text-zinc-100">$100</span>
                <span className="text-zinc-400 text-lg">USD / mes</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20">
                + 2.5% comisión sobre venta efectiva (Revenue Share)
              </div>
            </div>

            <button
              onClick={onOpenModal}
              className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 text-sm shrink-0"
            >
              Comenzar Ahora <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {[
              "Agentes e IA Generator LOD BMI",
              "Growth Hack en 30+ Portales Internacionales",
              "Manejo de Inventario Centralizado en Drive/Share",
              "CRM & Funnel Inmobiliario Omnicanal",
              "VR Lead Scoring & Calendarización de Citas",
              "Videos FPV Drone con Renders IA Overlays",
              "Recorridos Property 360° Interactivos",
              "Soporte Prioritario y Asesoría Técnica"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-zinc-800/80 bg-zinc-950 text-center text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-zinc-300">Sistema Huayra 2.0</span>
        </div>
        <p>© {new Date().getFullYear()} Sistema Huayra PropTech Platform. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

function ConsultationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100">¡Solicitud Recibida!</h3>
            <p className="text-xs text-zinc-400">
              Un especialista del Sistema Huayra se pondrá en contacto contigo a la brevedad para configurar tu cuenta.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 bg-zinc-100 text-zinc-950 text-xs font-bold rounded-xl"
            >
              Cerrar Ventana
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-zinc-100">Agendar Demostración Huayra 2.0</h3>
              <p className="text-xs text-zinc-400">
                Ingresa tus datos para activar la prueba guiada del dashboard de servicios.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Nombre Completo</label>
                <input required type="text" placeholder="Ej. Carlos Mendoza" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Correo Corporativo</label>
                <input required type="email" placeholder="carlos@desarrolladora.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Teléfono / WhatsApp</label>
                <input required type="tel" placeholder="+52 55 1234 5678" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 focus:border-emerald-500 focus:outline-none" />
              </div>

              <button type="submit" className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Solicitar Acceso
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
