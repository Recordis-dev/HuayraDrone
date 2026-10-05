import React from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Home,
  ChevronRight,
  ArrowLeft,
  Cpu,
  Globe,
  Workflow,
  CalendarCheck,
  Video,
  Share2,
  Menu,
  X
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/servicesData';

interface NavigationProps {
  currentRoute: string; // 'landing' | service.id
  currentSubRoute: string; // subroute.id
  onNavigate: (route: string, subroute?: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Navbar({ currentRoute, currentSubRoute, onNavigate, mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const isLanding = currentRoute === 'landing';
  const activeService = SERVICES_CATALOG.find(s => s.id === currentRoute);
  const activeSubroute = activeService?.subroutes.find(sr => sr.id === currentSubRoute);

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand Logo & Router Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
                Sistema Huayra
              </span>
              <span className="block text-[10px] text-zinc-500 font-mono leading-none">2.0 PropTech Suite</span>
            </div>
          </button>

          {/* Breadcrumbs for Dashboard Routes */}
          {!isLanding && activeService && (
            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-zinc-800 text-xs font-mono text-zinc-400">
              <span className="text-zinc-500">dashboard</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-emerald-400 font-semibold">{activeService.title.split(' ')[0]}</span>
              {activeSubroute && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    /{activeSubroute.id}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-400">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              isLanding ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'hover:text-zinc-100 hover:bg-zinc-900'
            }`}
          >
            <Home className="w-4 h-4" /> Inicio
          </button>

          <button
            onClick={() => onNavigate(SERVICES_CATALOG[0].id, 'overview')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              !isLanding ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'hover:text-zinc-100 hover:bg-zinc-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard de Servicios
          </button>

          <a href="#pricing" onClick={() => { if(!isLanding) onNavigate('landing'); }} className="px-3 py-1.5 hover:text-zinc-100 transition-colors">
            Precios
          </a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {isLanding ? (
            <button
              onClick={() => onNavigate(SERVICES_CATALOG[0].id, 'overview')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" /> Entrar al Dashboard
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="px-4 py-2 text-xs sm:text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 rounded-full transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a Landing
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 border border-zinc-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <button
            onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg bg-zinc-900 text-zinc-200 font-medium flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-emerald-400" /> Página Principal / Landing
          </button>

          <div className="pt-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3">
            Servicios del Dashboard
          </div>

          <div className="space-y-1">
            {SERVICES_CATALOG.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  onNavigate(service.id, 'overview');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                  currentRoute === service.id
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <span>{service.title}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export function Sidebar({ currentRoute, currentSubRoute, onNavigate }: Omit<NavigationProps, 'mobileMenuOpen' | 'setMobileMenuOpen'>) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Workflow': return <Workflow className="w-4 h-4" />;
      case 'CalendarCheck': return <CalendarCheck className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      case 'Share2': return <Share2 className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <aside className="w-full lg:w-72 bg-zinc-950/80 border-r border-zinc-800/80 p-4 flex flex-col shrink-0">
      <div className="px-3 py-2 mb-3">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
          Servicios Huayra
        </span>
        <h2 className="text-sm font-bold text-zinc-200">Catálogo Interactivo</h2>
      </div>

      <nav className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
        {SERVICES_CATALOG.map((service) => {
          const isActive = currentRoute === service.id;
          return (
            <div key={service.id} className="space-y-1">
              <button
                onClick={() => onNavigate(service.id, service.subroutes[0].id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/15 to-cyan-500/5 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'}>
                    {getIcon(service.iconName)}
                  </span>
                  <span className="truncate">{service.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'rotate-90 text-emerald-400' : 'text-zinc-600'}`} />
              </button>

              {/* Accordion Subroutes when Service active */}
              {isActive && (
                <div className="ml-7 pl-3 border-l border-zinc-800/80 space-y-1 my-1">
                  {service.subroutes.map((sub) => {
                    const isSubActive = currentSubRoute === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => onNavigate(service.id, sub.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                          isSubActive
                            ? 'bg-zinc-900 text-emerald-400 font-semibold border border-zinc-800'
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                        }`}
                      >
                        <span>/{sub.id}</span>
                        {sub.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {sub.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Quick Status Info */}
      <div className="mt-6 pt-4 border-t border-zinc-900 text-xs text-zinc-500 font-mono space-y-1 px-3">
        <div className="flex items-center justify-between">
          <span>Estado del Enrutador:</span>
          <span className="text-emerald-400">● Autocontenido</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Modo Render:</span>
          <span className="text-zinc-400">Zero-Heavy Engine</span>
        </div>
      </div>
    </aside>
  );
}
