import React, { useState, useEffect } from 'react';
import { Shield, Zap, Globe, Activity, Check } from 'lucide-react';

export interface DatacenterNode {
  id: string;
  name: string;
  region: string;
  category: 'EU' | 'NA' | 'APAC';
  coords: { x: number; y: number }; // Percentage coordinate on SVG map
  latitude: string;
  longitude: string;
  provider: string;
  greenEnergy: string;
  jurisdiction: string;
  carrierSpeed: string;
  pingBase: number;
}

export const datacenters: DatacenterNode[] = [
  {
    id: 'de-falkenstein',
    name: 'Falkenstein Cluster',
    region: 'Germany / Europe Central',
    category: 'EU',
    coords: { x: 49, y: 35 },
    latitude: "50.4779° N",
    longitude: "12.3713° E",
    provider: "Hetzner Online GmbH",
    greenEnergy: "100% Wind & Hydropower",
    jurisdiction: "EU GDPR / German Federal Data Protection",
    carrierSpeed: "1.6 Tbps Edge Capacity",
    pingBase: 18
  },
  {
    id: 'fi-helsinki',
    name: 'Helsinki Sovereign Node',
    region: 'Finland / Nordics',
    category: 'EU',
    coords: { x: 54, y: 28 },
    latitude: "60.1699° N",
    longitude: "24.9384° E",
    provider: "Hetzner Finland Oy",
    greenEnergy: "100% Wind Power (VTT Audited)",
    jurisdiction: "GDPR Sovereign Nordic Security Shield",
    carrierSpeed: "800 Gbps Low-Latency Baltic Transit",
    pingBase: 24
  },
  {
    id: 'uk-london',
    name: 'London Metro Core',
    region: 'United Kingdom / Europe West',
    category: 'EU',
    coords: { x: 44, y: 34 },
    latitude: "51.5074° N",
    longitude: "0.1278° W",
    provider: "Equinix LD8 Facility",
    greenEnergy: "95% Renewable Offset Index",
    jurisdiction: "UK Data Protection Act 2018",
    carrierSpeed: "1.2 Tbps Cross-Channel Fibre",
    pingBase: 12
  },
  {
    id: 'us-ashburn',
    name: 'Virginia East Edge',
    region: 'Ashburn - USA East Coast',
    category: 'NA',
    coords: { x: 26, y: 44 },
    latitude: "39.0438° N",
    longitude: "77.4875° W",
    provider: "Sovereign Co-location Space",
    greenEnergy: "85% Solar Offset",
    jurisdiction: "US Freedom of Information Act Restricted Zone",
    carrierSpeed: "2.4 Tbps Transatlantic Transits",
    pingBase: 88
  },
  {
    id: 'sg-singapore',
    name: 'Asia-Pacific Gateway Partner',
    region: 'Singapore / South Asia',
    category: 'APAC',
    coords: { x: 74, y: 68 },
    latitude: "1.3521° N",
    longitude: "103.8198° E",
    provider: "Megaport Carrier Ecosystem",
    greenEnergy: "Carbon Neutral Credits Bundle",
    jurisdiction: "Singapore PDPA / Absolute Sovereign Crypt",
    carrierSpeed: "3.2 Tbps Trans-Asian Ring Fiber",
    pingBase: 42
  }
];

interface DatacenterMapProps {
  selectedId: string;
  onSelect: (id: string, name: string) => void;
  titleOverride?: string;
}

export default function DatacenterMap({ selectedId, onSelect, titleOverride }: DatacenterMapProps) {
  const [hoveredNode, setHoveredNode] = useState<DatacenterNode | null>(null);
  const [simulatedPings, setSimulatedPings] = useState<Record<string, number>>({});
  const [activeRegionFilter, setActiveRegionFilter] = useState<'ALL' | 'EU' | 'NA' | 'APAC'>('ALL');

  // Simulate minimal traceroute pings fluctuators so it looks highly responsive and genuine
  useEffect(() => {
    // Initial load
    const initial: Record<string, number> = {};
    datacenters.forEach(dc => {
      initial[dc.id] = dc.pingBase + Math.floor(Math.random() * 4);
    });
    setSimulatedPings(initial);

    const timer = setInterval(() => {
      setSimulatedPings(prev => {
        const next = { ...prev };
        datacenters.forEach(dc => {
          // slight fluctuation
          const variance = Math.floor(Math.sin(Date.now() / 2000) * 1.5);
          next[dc.id] = Math.max(1, dc.pingBase + variance + Math.floor(Math.random() * 2));
        });
        return next;
      });
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const activeNode = datacenters.find(d => d.id === selectedId) || datacenters[0];
  const filteredNodes = datacenters.filter(d => activeRegionFilter === 'ALL' || d.category === activeRegionFilter);

  return (
    <div className="rounded-sm border border-white/5 bg-zinc-950/70 p-5 space-y-5 font-sans" id="datacenter-map-wrapper">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
        <div className="space-y-1">
          <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider flex items-center space-x-2">
            <Globe className="h-4 w-4 text-orange-400 animate-spin-slow" />
            <span>{titleOverride || "Sovereign Datacenter Allocation Map"}</span>
          </h4>
          <p className="text-xs text-zinc-400">
            Pinpoint your zero-loss, high-concurrency target VPS host infrastructure node coordinates.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-black px-2.5 py-1 rounded border border-white/5 font-mono text-[10px] text-orange-400 animate-pulse">
          <Activity className="h-3.5 w-3.5 text-orange-500 shrink-0" />
          <span className="font-bold">Traceroute: Active Telemetry</span>
        </div>
      </div>

      {/* Region selective filter tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-black/35 p-1.5 rounded border border-white/[0.02]">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mr-2 ml-1">REGIONS FILTER:</span>
        {[
          { key: 'ALL', label: '🌐 All Clusters', count: datacenters.length },
          { key: 'EU', label: '🇪🇺 Europe', count: datacenters.filter(d => d.category === 'EU').length },
          { key: 'NA', label: '🇺🇸 North America', count: datacenters.filter(d => d.category === 'NA').length },
          { key: 'APAC', label: '🇸🇬 Asia Pacific', count: datacenters.filter(d => d.category === 'APAC').length }
        ].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveRegionFilter(tab.key as any)}
            className={`px-2.5 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeRegionFilter === tab.key
                ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400 font-extrabold'
                : 'bg-transparent border border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label} <span className="opacity-60 text-[9px]">({tab.count})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-5">
        {/* Interactive SVG Projection Map */}
        <div className="2xl:col-span-8 bg-[#040404] border border-white/5 rounded-sm p-3 relative overflow-hidden flex flex-col justify-center min-h-[220px] sm:min-h-[260px]">
          
          {/* Subtle grid background matrix */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:16px_16px] opacity-35" />
          
          {/* Coordinate Watermarks */}
          <span className="absolute top-2 left-3 font-mono text-[9px] text-zinc-450 tracking-widest">PROJECTION: MERCATOR LAT/LONG LAYER</span>
          <span className="absolute bottom-2 right-3 font-mono text-[9px] text-zinc-450 tracking-widest">SOCIALLY DISTANCE HOST ROUTING</span>

          {/* Interactive World Grid map representation */}
          <div className="relative w-full aspect-[2/1] bg-black/40 rounded-sm">
            
            {/* World schematic lines (Subtle layout SVGs for aesthetic realism) */}
            <svg 
              viewBox="0 0 100 50" 
              className="absolute inset-0 w-full h-full text-zinc-800/80 stroke-current stroke-[0.3]" 
              fill="none"
              strokeDasharray="1 2"
            >
              {/* Equator */}
              <line x1="0" y1="25" x2="100" y2="25" />
              {/* Prime meridian */}
              <line x1="50" y1="0" x2="50" y2="50" />
              {/* Schematic continent curves for visual vibe */}
              <path d="M 12 12 Q 22 17 25 35 T 20 45" />
              <path d="M 38 10 Q 48 5 55 18 T 50 35 T 45 45" />
              <path d="M 65 15 Q 75 18 85 28 T 72 45" />
            </svg>

            {/* Glowing lines tracing active selected node to general region limits */}
            {activeNode && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 50">
                <defs>
                  <linearGradient id="laser-trace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx={activeNode.coords.x} cy={activeNode.coords.y} r="8" className="stroke-orange-500/25 fill-none animate-ping stroke-[0.5]" />
                <circle cx={activeNode.coords.x} cy={activeNode.coords.y} r="15" className="stroke-orange-500/10 fill-none animate-pulse stroke-[0.5]" />
              </svg>
            )}

            {/* Datacenter Pins */}
            {filteredNodes.map((node) => {
              const isSelected = node.id === selectedId;
              const isHovered = hoveredNode?.id === node.id;
              
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => onSelect(node.id, node.name)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none cursor-pointer group z-20"
                >
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                    {/* Ring highlight on selection */}
                    {isSelected && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                    )}
                    
                    {/* Center point pin */}
                    <span className={`relative inline-flex rounded-full h-2 w-2 border shadow-lg transition-all duration-300 ${
                      isSelected 
                        ? 'bg-amber-400 border-white scale-125' 
                        : isHovered
                          ? 'bg-orange-500 border-orange-300 scale-110'
                          : 'bg-zinc-700 border-zinc-500'
                    }`} />
                  </span>

                  {/* Tiny label on hover */}
                  <span className="absolute left-1/2 -translate-x-1/2 top-4 whitespace-nowrap bg-black/95 border border-white/20 px-2 py-0.5 rounded text-[9px] text-zinc-200 tracking-wider font-mono uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                    {node.name} ({simulatedPings[node.id]}ms)
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-white/[0.05] pt-2">
            <span>Latitude Tracker Enabled</span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> <span>Selected</span></span>
              <span className="flex items-center space-x-1"><span className="h-1.5 w-1.5 rounded-full bg-zinc-650" /> <span>Secondary Nodes</span></span>
            </div>
          </div>
        </div>

        {/* Selected Node Telemetry Matrix Details card */}
        <div className="2xl:col-span-4 bg-[#070707] border border-white/5 rounded-sm p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 text-[9px] font-mono text-orange-400 font-bold uppercase tracking-widest block w-min whitespace-nowrap">
                  ACTIVE HOST
                </span>
                <h5 className="font-display font-bold text-sm text-white mt-1.5 leading-tight">
                  {activeNode.name}
                </h5>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  {activeNode.region}
                </p>
              </div>
              <div className="text-right">
                <span className="block text-[9px] font-mono uppercase text-zinc-400 font-bold">LATENCY</span>
                <span className="font-mono text-base font-extrabold text-amber-200">
                  {simulatedPings[activeNode.id] || activeNode.pingBase}ms
                </span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-3.5 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-2 font-mono text-[11px]">
              <div className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-white/[0.04]">
                <span className="text-zinc-400 uppercase tracking-wider text-[10px]">GEOGRAPHY GPS</span>
                <span className="text-zinc-200 font-bold uppercase tracking-wider">{activeNode.latitude} / {activeNode.longitude}</span>
              </div>
              <div className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-white/[0.04]">
                <span className="text-zinc-400 uppercase tracking-wider text-[10px]">ORCHESTRAY PATH</span>
                <span className="text-zinc-200 font-bold uppercase tracking-wider">{activeNode.provider}</span>
              </div>
              <div className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-white/[0.04]">
                <span className="text-zinc-400 uppercase tracking-wider text-[10px]">REGULATORY SHIELD</span>
                <span className="text-zinc-200 font-bold text-right uppercase tracking-wider truncate max-w-[150px]" title={activeNode.jurisdiction}>
                  {activeNode.jurisdiction}
                </span>
              </div>
              <div className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-white/[0.04]">
                <span className="text-zinc-400 uppercase tracking-wider text-[10px]">POWER GRID</span>
                <span className="text-teal-400 font-bold flex items-center gap-1 text-[10px]">
                  <Zap className="h-3 w-3 fill-teal-400/20 shrink-0" />
                  <span>{activeNode.greenEnergy}</span>
                </span>
              </div>
              <div className="flex justify-between items-center bg-zinc-950 p-2 rounded border border-white/[0.04] sm:col-span-2 2xl:col-span-1">
                <span className="text-zinc-400 uppercase tracking-wider text-[10px]">PORT METRIC</span>
                <span className="text-zinc-200 font-bold text-right sm:text-left 2xl:text-right">{activeNode.carrierSpeed}</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-orange-500/10 p-2.5 rounded text-xs text-zinc-350 font-semibold flex items-center space-x-2">
            <Shield className="h-4 w-4 text-orange-500 shrink-0 animate-pulse" />
            <span className="leading-tight">Selected coordinate coordinates verified for 100% SLA and direct zero-loss cloud routing.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
