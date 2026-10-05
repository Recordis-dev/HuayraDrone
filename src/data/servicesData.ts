export interface ServiceSubroute {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

export interface ServiceDefinition {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  iconName: string;
  accentColor: string;
  subroutes: ServiceSubroute[];
  heroImage: string;
  videoUrl?: string;
  stats: { label: string; value: string; change?: string }[];
  keyFeatures: string[];
  ctaText: string;
}

export const SERVICES_CATALOG: ServiceDefinition[] = [
  {
    id: 'ai-generator',
    title: 'Agentes e IA Generator (LOD BMI)',
    shortDescription: 'Generación paramétrica de blueprints, análisis de cabida y prompts para video e imagen hiperrealista.',
    category: 'Inteligencia Artificial',
    iconName: 'Cpu',
    accentColor: 'emerald',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Tiempo de Modelado', value: '< 2 min', change: '-95% vs tradicional' },
      { label: 'Precisión Dimensional', value: '99.4%', change: 'LOD BMI Standard' },
      { label: 'Prompts Generados/Mes', value: '+14,500', change: '+240% conversión' }
    ],
    keyFeatures: [
      'Cálculo automático de superficie (Frente x Fondo x Coeficiente de Edificabilidad)',
      'Generación de Prompts para Midjourney/Sora/Runway optimizados para bienes raíces',
      'Exportación de planos esquemáticos en PDF/CAD y renderizado preliminar',
      'Integración con API Gemini de Google para análisis contextual de suelo'
    ],
    ctaText: 'Probar Simulador de Pre-Factibilidad',
    subroutes: [
      { id: 'overview', name: 'Visión General', description: 'Resumen ejecutivo del motor de IA y capacidades de pre-factibilidad.' },
      { id: 'generator', name: 'Simulador Paramétrico', description: 'Configura dimensiones, tipo de suelo y genera el blueprint con IA.', badge: 'IA Live' },
      { id: 'specs', name: 'Especificaciones LOD BMI', description: 'Detalle técnico de niveles de desarrollo e integración BIM.' },
      { id: 'export', name: 'Exportación y API', description: 'Descarga reportes ejecutivos en PDF, CAD y conectores API.' }
    ]
  },
  {
    id: 'growth-hack',
    title: 'Growth Hack & 30+ Portales Internacionales',
    shortDescription: 'Sindicación automatizada y posicionamiento orgánico/pago en portales inmobiliarios líderes de América y Europa.',
    category: 'Distribución Global',
    iconName: 'Globe',
    accentColor: 'cyan',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Portales Sincronizados', value: '38', change: 'Red Global Activa' },
      { label: 'Alcance Internacional', value: '2.4M', change: 'Leads calificados/mes' },
      { label: 'Tiempo de Sincronización', value: 'Instantáneo', change: 'Webhook en tiempo real' }
    ],
    keyFeatures: [
      'Multi-publicación en Zillow, Realtor, JamesEdition, Inmuebles24, Idealista y más',
      'Traducción automática y contextualización de precios en multilabora/divisas',
      'Normalización de datos de inmuebles según estándar de cada portal',
      'Atribución de origen de leads con píxeles de seguimiento unificados'
    ],
    ctaText: 'Ver Mapa de Cobertura Global',
    subroutes: [
      { id: 'overview', name: 'Visión General', description: 'Estadísticas globales de alcance e impacto en ventas internacionales.' },
      { id: 'portals-map', name: 'Mapa de Portales', description: 'Explora la red de 30+ plataformas conectadas por región.' },
      { id: 'analytics', name: 'Métricas de Tráfico', description: 'Análisis comparativo de rendimiento por portal y país.' },
      { id: 'campaigns', name: 'Campañas Automatizadas', description: 'Configuración de reglas de disparo de presupuesto y destacamento.' }
    ]
  },
  {
    id: 'inventory',
    title: 'Manejo de Inventario Centralizado',
    shortDescription: 'Sincronización en tiempo real desde Google Drive, Dropbox y OneDrive hacia el canal de ventas.',
    category: 'Operaciones',
    iconName: 'Workflow',
    accentColor: 'indigo',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Unidades Bajo Gestión', value: '8,400+', change: 'Sin sobreventas' },
      { label: 'Latencia de Cambio Estado', value: '0.4s', change: 'Multi-broker sync' },
      { label: 'Carpetas Sincronizadas', value: '100%', change: 'Auto-etiquetado IA' }
    ],
    keyFeatures: [
      'Lectura automática de listas de precios y disponibilidad desde Hojas de Cálculo / Excel',
      'Control de bloqueos y apartado de unidades en tiempo real con firmas de reserva',
      'Estructura de permisos jerárquicos para asesores internos y máster brokers externos',
      'Historial de cambios auditables e integración directa con CRM'
    ],
    ctaText: 'Conectar Mi Drive / Almacenamiento',
    subroutes: [
      { id: 'overview', name: 'Visión General', description: 'Estatus del inventario consolidado y disponibilidad general.' },
      { id: 'drive-sync', name: 'Conector de Archivos', description: 'Sincroniza carpetas compartidas y Hojas de Cálculo automáticas.' },
      { id: 'unit-matrix', name: 'Matriz de Disponibilidad', description: 'Plano interactivo tipo parrilla para apartado de unidades.' },
      { id: 'permissions', name: 'Permisos & Roles', description: 'Control de accesos para brokers, vendedores y administración.' }
    ]
  },
  {
    id: 'crm-funnel',
    title: 'Funnel & CRM Inmobiliario Integrado',
    shortDescription: 'Pipeline automatizado especializado en desarrollos, con scoring por IA y seguimiento omnicanal.',
    category: 'Ventas & CRM',
    iconName: 'CalendarCheck',
    accentColor: 'emerald',
    heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Conversión a Cita', value: '38.2%', change: '+18% vs CRM genérico' },
      { label: 'Respuesta Automática', value: '< 15 seg', change: 'WhatsApp Bot IA' },
      { label: 'Nivel de Satisfacción', value: '4.9/5', change: 'Experiencia comprador' }
    ],
    keyFeatures: [
      'Funnel visual adaptable desde primer contacto hasta firma de escrituras',
      'Nutrición omnicanal por WhatsApp, Email y llamadas automáticas dirigidas por IA',
      'Scoring predictivo que identifica compradores con alta intención financiera',
      'Dashboard financiero con proyecciones de flujo de caja y comisiones'
    ],
    ctaText: 'Explorar Pipeline de Ventas',
    subroutes: [
      { id: 'overview', name: 'Visión General', description: 'Métricas de conversión y volumen de prospectos en el embudo.' },
      { id: 'pipeline', name: 'Kanban de Ventas', description: 'Gestión drag-and-drop de prospectos en cada etapa comercial.' },
      { id: 'lead-scoring', name: 'Scoring por IA', description: 'Clasificación inteligente de prospectos según comportamiento.' },
      { id: 'automations', name: 'Reglas de Automatización', description: 'Flujos de trabajo, plantillas de WhatsApp y recordatorios.' }
    ]
  },
  {
    id: 'vr-scheduling',
    title: 'Calendarización & Scoring Post-VR Tour',
    shortDescription: 'Monitoreo de comportamiento dentro del recorrido virtual 3D y agendamiento automático inteligente.',
    category: 'Engagement 3D',
    iconName: 'Sparkles',
    accentColor: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Tiempo Promedio en Tour', value: '8m 42s', change: '3x engagement' },
      { label: 'Citas Auto-Agendadas', value: '64%', change: 'Sin intervención humana' },
      { label: 'Mapas de Calor Generados', value: '100%', change: 'Precisión por habitación' }
    ],
    keyFeatures: [
      'Análisis de mapa de calor de atención del cliente dentro del Tour Virtual 3D',
      'Disparo de Pop-ups inteligentes y agendamiento de cita en momentos de mayor interés',
      'Sincronización bidireccional con Google Calendar y Outlook de la fuerza de ventas',
      'Notificaciones inmediatas al asesor con el resumen del interés del cliente'
    ],
    ctaText: 'Ver Demostración VR Scoring',
    subroutes: [
      { id: 'overview', name: 'Visión General', description: 'Métricas de engagement e interacción en recorridos virtuales.' },
      { id: 'calendar', name: 'Gestor de Citas', description: 'Calendario inteligente sincronizado con disponibilidad en tiempo real.' },
      { id: 'vr-analytics', name: 'Heatmaps & Comportamiento', description: 'Descubre qué zonas de la propiedad atraen mayor atención.' },
      { id: 'booking-flow', name: 'Configuración del Widget', description: 'Personaliza el flujo de reserva dentro del recorrido VR.' }
    ]
  },
  {
    id: 'fpv-renders',
    title: 'Videos FPV + Renders IA Overlays',
    shortDescription: 'Toma aérea/FPV fluida combinada con capas IA de renderizado arquitectónico hiperrealista.',
    category: 'Video & Media',
    iconName: 'Video',
    accentColor: 'cyan',
    heroImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/_QfS8rxNFMU?autoplay=1&mute=1&loop=1&playlist=_QfS8rxNFMU',
    stats: [
      { label: 'Costo por Minuto', value: '-80%', change: 'vs Render 3D tradicional' },
      { label: 'Retención de Video', value: '92%', change: 'Viral en redes sociales' },
      { label: 'Resolución de Entrega', value: '4K 60fps', change: 'Master cinematográfico' }
    ],
    keyFeatures: [
      'Superposición de modelos arquitectónicos sobre video real en movimiento (Matchmoving IA)',
      'Simulación de diferentes horas del día, acabados y ambientes de vegetación',
      'Formatos optimizados para Instagram Reels, TikTok, YouTube Shorts y Pantallas LED',
      'Incrustación de datos de proyecto y llamadas a la acción dinámicas'
    ],
    ctaText: 'Reproducir Video FPV Demo',
    subroutes: [
      { id: 'overview', name: 'Visión General', description: 'Muestra interactiva de la fusión de video drone y render IA.' },
      { id: 'video-player', name: 'Reproductor FPV Interactivo', description: 'Visualizador en vivo con controles de reproducción y zoom.' },
      { id: 'ai-overlays', name: 'Capas de Render IA', description: 'Compara el estado actual del terreno vs. el proyecto terminado.' },
      { id: 'render-presets', name: 'Estilos de Iluminación', description: 'Elige entre presets Atardecer, Día Soleado, Noche o Fuego.' }
    ]
  },
  {
    id: 'property-360',
    title: 'Property 360° & Video Tour Interactivo',
    shortDescription: 'Experiencia inmersiva 360° panorámica con hotspots interactivos, fichas técnicas y reservas en vivo.',
    category: 'Experiencia Inmersiva',
    iconName: 'Share2',
    accentColor: 'amber',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Ángulo de Visión', value: '360° x 180°', change: 'Inmersión Total' },
      { label: 'Compatibilidad', value: '100% Web', change: 'Sin Plugins ni Apps' },
      { label: 'Aumento de Ventas en Pre-venta', value: '+45%', change: 'Compradores remotos' }
    ],
    keyFeatures: [
      'Visor esférico 360° ultra-fluido con aceleración por hardware CSS/Canvas',
      'Hotspots interactivos con videos de acabados, especificaciones de materiales y cotizador',
      'Navegación por planos de planta 2D vinculados dinámicamente con los nodos 360°',
      'Integración para consultas de disponibilidad en tiempo real y asesoría por video llamada'
    ],
    ctaText: 'Iniciar Tour 360° Interactivo',
    subroutes: [
      { id: 'overview', name: 'Visión General', description: 'Presentación de la tecnología de Recorridos 360 y beneficios.' },
      { id: 'viewer-360', name: 'Visor 360° Interactivo', description: 'Explora una residencia modelo en 360° con puntos de interés.' },
      { id: 'hotspots', name: 'Hotspots & Fichas', description: 'Configura ventanas emergentes con información de valor.' },
      { id: 'tour-builder', name: 'Constructor de Tour', description: 'Herramienta para vincular fotografías 360 panorámicas.' }
    ]
  }
];
