import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Building,
  Building2,
  Home,
  Share2,
  Globe,
  Workflow,
  Video,
  Play,
  CheckCircle2,
  ArrowRight,
  Layers,
  TrendingUp,
  Maximize2,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { ServiceDefinition } from '../data/servicesData';
import { GoogleGenAI } from '@google/genai';

interface ServiceViewProps {
  service: ServiceDefinition;
  subrouteId: string;
  onNavigateSubroute: (subrouteId: string) => void;
  onOpenConsultationModal?: () => void;
}

export function ServiceView({ service, subrouteId, onNavigateSubroute, onOpenConsultationModal }: ServiceViewProps) {
  const activeSub = service.subroutes.find(s => s.id === subrouteId) || service.subroutes[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Service Subroute Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800/80 custom-scrollbar">
        {service.subroutes.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onNavigateSubroute(sub.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              subrouteId === sub.id
                ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20 font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 border border-zinc-800'
            }`}
          >
            <span>{sub.name}</span>
            {sub.badge && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                subrouteId === sub.id ? 'bg-zinc-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {sub.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Header Summary Panel */}
      <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.category} • Subruta: /{activeSub.id}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
              {service.title}
            </h1>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              {activeSub.description}
            </p>
          </div>

          <button
            onClick={onOpenConsultationModal}
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 shrink-0 flex items-center gap-2"
          >
            <span>{service.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-800/80">
          {service.stats.map((stat, idx) => (
            <div key={idx} className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4">
              <div className="text-xs text-zinc-500 font-medium mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-zinc-100 tracking-tight">{stat.value}</div>
              {stat.change && (
                <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {stat.change}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Subroute Content Renderer */}
      <div className="min-h-[400px]">
        {renderSubrouteContent(service.id, subrouteId, service, onOpenConsultationModal)}
      </div>
    </div>
  );
}

function renderSubrouteContent(serviceId: string, subrouteId: string, service: ServiceDefinition, onOpenConsultationModal?: () => void) {
  switch (serviceId) {
    case 'ai-generator':
      return <AIGeneratorSubroutes subrouteId={subrouteId} service={service} />;
    case 'growth-hack':
      return <GrowthHackSubroutes subrouteId={subrouteId} service={service} />;
    case 'inventory':
      return <InventorySubroutes subrouteId={subrouteId} service={service} />;
    case 'crm-funnel':
      return <CRMFunnelSubroutes subrouteId={subrouteId} service={service} />;
    case 'vr-scheduling':
      return <VRSchedulingSubroutes subrouteId={subrouteId} service={service} />;
    case 'fpv-renders':
      return <FPVRendersSubroutes subrouteId={subrouteId} service={service} />;
    case 'property-360':
      return <Property360Subroutes subrouteId={subrouteId} service={service} />;
    default:
      return <DefaultOverviewSubroute service={service} />;
  }
}

function AIGeneratorSubroutes({ subrouteId, service }: { subrouteId: string; service: ServiceDefinition }) {
  const [width, setWidth] = useState('25');
  const [length, setLength] = useState('40');
  const [devType, setDevType] = useState('edificio');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ prompt: string; image: string } | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey.trim() !== '') {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Actúa como arquitecto e ingeniero inmobiliario. Genera un prompt descriptivo en inglés y español para Midjourney/Sora para un desarrollo tipo "${devType}" de terreno ${width}m de frente por ${length}m de fondo con especificaciones LOD BMI.`,
        });
        const promptText = response.text || '';
        setResult({
          prompt: promptText.trim(),
          image: getMockBlueprintImage(devType)
        });
      } else {
        throw new Error('No API Key configured');
      }
    } catch {
      setResult({
        prompt: `Cinematic 8k architectural exterior shot of a luxury ${devType.toUpperCase()} development built on a ${width}x${length}m plot. Biophilic design, floor-to-ceiling glass balconies, ambient dusk illumination, hyper-realistic renders, LOD 400 BMI specs --ar 16:9 --v 6.0`,
        image: getMockBlueprintImage(devType)
      });
    } finally {
      setIsGenerating(false);
    }
  };

  function getMockBlueprintImage(type: string) {
    switch (type) {
      case 'edificio': return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';
      case 'condos': return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
      case 'villas': return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80';
      default: return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80';
    }
  }

  if (subrouteId === 'generator') {
    return (
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <Sparkles className="w-5 h-5" />
            <span>Simulador Paramétrico de Superficie</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">Frente (Metros)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 font-mono text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">Fondo (Metros)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 font-mono text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-2">Tipo de Tipología</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'edificio', label: 'Edificio Vertical', icon: <Building className="w-4 h-4" /> },
                { id: 'condos', label: 'Condominio', icon: <Building2 className="w-4 h-4" /> },
                { id: 'villas', label: 'Villas de Lujo', icon: <Home className="w-4 h-4" /> },
                { id: 'masterplan', label: 'Master Plan', icon: <MapPin className="w-4 h-4" /> }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setDevType(t.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                    devType === t.id
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono space-y-1">
            <div className="text-zinc-500">Superficie Total Estimada:</div>
            <div className="text-lg font-bold text-emerald-400">{Number(width) * Number(length)} m²</div>
            <div className="text-[11px] text-zinc-400">Coeficiente Ocupación (COS 70%): {(Number(width) * Number(length) * 0.7).toFixed(0)} m²</div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? <Sparkles className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {isGenerating ? 'Generando Blueprint IA...' : 'Generar Blueprint Paramétrico'}
          </button>
        </div>

        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <h3 className="text-sm font-bold text-zinc-200 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Resultado del Blueprint & Prompting AI (LOD BMI)</span>
          </h3>

          {result ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group">
                <img src={result.image} alt="Blueprint AI" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-mono text-emerald-400 bg-zinc-950/90 px-3 py-1 rounded-md border border-emerald-500/30">
                    Blueprint LOD BMI • {width}x{length}m • {devType.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400">Prompt Optimizado para Sora / Midjourney:</label>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-300 leading-relaxed">
                  {result.prompt}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(result.prompt)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 mt-2"
                >
                  <Share2 className="w-3.5 h-3.5" /> Copiar Prompt al Portapapeles
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-800 rounded-xl">
              <Sparkles className="w-12 h-12 text-zinc-700 mb-4 animate-pulse" />
              <p className="text-sm text-zinc-400 max-w-sm">
                Ajusta las dimensiones a la izquierda y presiona <strong className="text-zinc-200">Generar Blueprint Paramétrico</strong> para previsualizar el modelo.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (subrouteId === 'specs') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-zinc-100">Especificaciones Técnicas LOD BMI</h3>
        <p className="text-sm text-zinc-400">
          Asignación de Nivel de Desarrollo (LOD) optimizado para preventa inmobiliaria.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { level: 'LOD 100 - Esquemático', desc: 'Volumetría conceptual de la masa construida y alineación con normativa.' },
            { level: 'LOD 300 - Pre-Factibilidad', desc: 'Sistemas estructurales preliminares, plantas arquitectónicas y acabados base.' },
            { level: 'LOD 400 - Hiperrealismo IA', desc: 'Generación de gemelos digitales listos para campañas de mercadeo y recorridos 3D.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold">{item.level}</div>
              <p className="text-xs text-zinc-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <DefaultOverviewSubroute service={service} />;
}

function GrowthHackSubroutes({ subrouteId, service }: { subrouteId: string; service: ServiceDefinition }) {
  if (subrouteId === 'portals-map') {
    const portals = [
      { name: 'Zillow', country: 'Estados Unidos', status: 'Sincronizado', leads: '1,420/mes' },
      { name: 'Realtor.com', country: 'Estados Unidos', status: 'Sincronizado', leads: '980/mes' },
      { name: 'Inmuebles24', country: 'México', status: 'Sincronizado', leads: '2,100/mes' },
      { name: 'Idealista', country: 'España / Europa', status: 'Sincronizado', leads: '750/mes' },
      { name: 'JamesEdition', country: 'Global Luxury', status: 'Sincronizado', leads: '340/mes' },
      { name: 'Lamudi', country: 'Latinoamérica', status: 'Sincronizado', leads: '1,150/mes' }
    ];

    return (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portals.map((p, idx) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-100">{p.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {p.status}
                </span>
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-zinc-500" /> {p.country}
              </div>
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-300">
                <span>Promedio Leads:</span>
                <span className="text-emerald-400 font-bold">{p.leads}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <DefaultOverviewSubroute service={service} />;
}

function InventorySubroutes({ subrouteId, service }: { subrouteId: string; service: ServiceDefinition }) {
  if (subrouteId === 'unit-matrix') {
    const units = Array.from({ length: 16 }).map((_, i) => ({
      id: `UN-${101 + i}`,
      type: i % 3 === 0 ? 'Penthouse' : i % 2 === 0 ? '2 Recámaras' : '1 Recámara',
      price: `$${(180000 + i * 15000).toLocaleString()} USD`,
      status: i % 4 === 0 ? 'Vendido' : i % 3 === 0 ? 'Apartado' : 'Disponible'
    }));

    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-100">Matriz de Inventario en Tiempo Real</h3>
            <p className="text-xs text-zinc-400">Parrilla sincronizada desde Google Sheets / Drive</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Disponible</span>
            <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-400" /> Apartado</span>
            <span className="flex items-center gap-1 text-rose-500"><span className="w-2 h-2 rounded-full bg-rose-500" /> Vendido</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {units.map((u) => (
            <div
              key={u.id}
              className={`p-4 rounded-xl border transition-all text-xs font-mono space-y-1 ${
                u.status === 'Disponible'
                  ? 'bg-zinc-950 border-emerald-500/40 text-emerald-400 hover:border-emerald-400'
                  : u.status === 'Apartado'
                  ? 'bg-zinc-950 border-amber-500/40 text-amber-400'
                  : 'bg-zinc-950/40 border-zinc-800 text-zinc-600 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>{u.id}</span>
                <span className="text-[10px]">{u.type}</span>
              </div>
              <div className="text-sm text-zinc-200 font-bold">{u.price}</div>
              <div className="text-[10px] uppercase font-sans font-semibold tracking-wide">{u.status}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <DefaultOverviewSubroute service={service} />;
}

function CRMFunnelSubroutes({ subrouteId, service }: { subrouteId: string; service: ServiceDefinition }) {
  if (subrouteId === 'pipeline') {
    const columns = [
      { name: 'Lead Nuevo', count: 42, color: 'border-cyan-500' },
      { name: 'VR Tour Realizado', count: 18, color: 'border-purple-500' },
      { name: 'Cotización Enviada', count: 9, color: 'border-emerald-500' },
      { name: 'Reserva / Apartado', count: 5, color: 'border-amber-500' }
    ];

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
            <div className={`flex items-center justify-between pb-2 border-b-2 ${col.color}`}>
              <span className="text-xs font-bold text-zinc-200">{col.name}</span>
              <span className="text-xs font-mono bg-zinc-950 px-2 py-0.5 rounded text-zinc-400">{col.count}</span>
            </div>

            <div className="space-y-2.5">
              {[1, 2].map((i) => (
                <div key={i} className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-3 text-xs space-y-2">
                  <div className="font-bold text-zinc-100">Cliente Interesado #{i + idx * 2}</div>
                  <div className="text-[11px] text-zinc-400">Interés: Penthouse 201 • $240,000 USD</div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                    <span>Score IA: 94/100</span>
                    <span>Hoy</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <DefaultOverviewSubroute service={service} />;
}

function VRSchedulingSubroutes({ subrouteId, service }: { subrouteId: string; service: ServiceDefinition }) {
  if (subrouteId === 'vr-analytics') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <h3 className="text-sm font-bold text-zinc-100">Mapa de Calor e Interacción en Recorrido Virtual 3D</h3>

        <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="VR Heatmap"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute top-1/3 left-1/4 animate-bounce">
            <div className="px-2 py-1 rounded bg-rose-500 text-white text-[10px] font-mono font-bold shadow-lg">
              Hotspot Balcón • 4m 12s
            </div>
          </div>
          <div className="absolute top-1/2 right-1/3">
            <div className="px-2 py-1 rounded bg-amber-500 text-zinc-950 text-[10px] font-mono font-bold shadow-lg">
              Hotspot Cocina • 2m 45s
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <DefaultOverviewSubroute service={service} />;
}

function FPVRendersSubroutes({ subrouteId, service }: { subrouteId: string; service: ServiceDefinition }) {
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-2">
            <Video className="w-4 h-4" /> Visualizador FPV Drone + IA Overlays
          </span>
          <span className="text-xs font-mono text-zinc-500">4K 60FPS Sync</span>
        </div>
        <div className="aspect-video w-full bg-zinc-950">
          <iframe
            width="100%"
            height="100%"
            src={service.videoUrl || "https://www.youtube.com/embed/_QfS8rxNFMU?autoplay=1&mute=1&loop=1&playlist=_QfS8rxNFMU"}
            title="FPV Drone Real Estate"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

function Property360Subroutes({ subrouteId, service }: { subrouteId: string; service: ServiceDefinition }) {
  const [activeRoom, setActiveSubRoom] = useState('Sala Principal');

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-zinc-100">Visor Esférico Property 360° Interactivo</h3>
          <p className="text-xs text-zinc-400">Navegación panorámica por ambientes con hotspots de acabados</p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          {['Sala Principal', 'Master Suite', 'Terraza Panoramic', 'Cocina Gourmet'].map((room) => (
            <button
              key={room}
              onClick={() => setActiveSubRoom(room)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeRoom === room
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group bg-zinc-950">
        <img
          src={service.heroImage}
          alt="360 View"
          className="w-full h-full object-cover filter brightness-90 transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent flex items-end justify-between p-6">
          <div className="text-xs font-mono text-zinc-200 bg-zinc-950/90 px-3 py-1.5 rounded-lg border border-zinc-800 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Ambiente: {activeRoom} (Navegación Panorámica Active)</span>
          </div>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" /> Pantalla Completa 360
          </button>
        </div>
      </div>
    </div>
  );
}

function DefaultOverviewSubroute({ service }: { service: ServiceDefinition }) {
  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
        <h3 className="text-lg font-bold text-zinc-100">Características Clave del Módulo</h3>

        <div className="space-y-4">
          {service.keyFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">Vista de Referencia</h3>
          <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800 relative group">
            <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent flex items-end p-4">
              <span className="text-xs font-mono text-emerald-400">{service.category}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> Despliegue Autocontenido
          </div>
          <p className="leading-relaxed">
            Este servicio opera en el enrutador interno con rendimiento instantáneo y compatibilidad 100% web.
          </p>
        </div>
      </div>
    </div>
  );
}
