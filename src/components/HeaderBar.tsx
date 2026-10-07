import React from 'react';
import type { Floor } from '../types';
import { soundEffects } from '../services/soundEffects';
import { 
  Building2, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  Megaphone, 
  Search, 
  ChevronDown,
  Code2
} from 'lucide-react';

interface HeaderBarProps {
  floors: Floor[];
  activeFloorId: number;
  onSelectFloor: (floorId: number) => void;
  onOpenElevator: () => void;
  onOpenClaimDesk: () => void;
  onOpenFITTConsole: () => void;
  onOpenOpenSourceInfo: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSector: string;
  onSectorChange: (s: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  userRole: 'fitt_team' | 'founder' | 'visitor';
  onRoleChange: (r: 'fitt_team' | 'founder' | 'visitor') => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  floors,
  activeFloorId,
  onSelectFloor,
  onOpenElevator,
  onOpenClaimDesk,
  onOpenFITTConsole,
  onOpenOpenSourceInfo,
  searchQuery,
  onSearchChange,
  selectedSector,
  onSectorChange,
  soundEnabled,
  onToggleSound,
  userRole,
  onRoleChange
}) => {
  const currentFloor = floors.find(f => f.id === activeFloorId) || floors[0];

  const handleFloorClick = (id: number) => {
    if (id === activeFloorId) return;
    soundEffects.playElevatorDing();
    onSelectFloor(id);
  };

  return (
    <header className="site-header">
      {/* Top Brand Bar */}
      <div className="brand-strip">
        <div className="brand-left">
          <div className="brand-badge-fitt">FITT</div>
          <div className="brand-title-group">
            <h1 className="brand-title">FOUNDERS FLOOR</h1>
            <span className="brand-tagline">
              VIRTUAL OFFICE FLOOR • IIT DELHI FITT FOUNDER HARNESS
            </span>
          </div>
        </div>

        {/* Central Elevator Quick Selector */}
        <div className="elevator-floor-selector">
          <button className="elevator-lift-btn" onClick={onOpenElevator} title="Open Elevator Lift Panel">
            <Building2 size={16} />
            <span className="lift-text">LIFT</span>
            <ChevronDown size={14} />
          </button>

          <div className="floor-buttons-row">
            {floors.map(floor => {
              const isActive = floor.id === activeFloorId;
              return (
                <button
                  key={floor.id}
                  className={`floor-nav-tab ${isActive ? 'active' : ''}`}
                  onClick={() => handleFloorClick(floor.id)}
                  style={{
                    borderColor: isActive ? '#1A1A1A' : '#D1C7B7',
                    backgroundColor: isActive ? '#FFDE59' : '#FFFDF8'
                  }}
                >
                  <span className="floor-tab-num">0{floor.id}</span>
                  <span className="floor-tab-label">
                    {floor.id === 1 && 'AI & DeepTech'}
                    {floor.id === 2 && 'BioTech Labs'}
                    {floor.id === 3 && 'SaaS & Growth'}
                    {floor.id === 4 && 'FITT Hub'}
                  </span>
                  <span className="floor-occupancy-badge">
                    {floor.founders.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Tools & Role Toggle */}
        <div className="brand-right">
          {/* User Role Switcher */}
          <div className="role-switcher">
            <span className="role-label">VIEW AS:</span>
            <select 
              value={userRole} 
              onChange={e => onRoleChange(e.target.value as any)}
              className="role-select"
            >
              <option value="fitt_team">FITT Incubation Team</option>
              <option value="founder">Incubator Founder</option>
              <option value="visitor">Guest Investor / Visitor</option>
            </select>
          </div>

          {/* Sound Toggle */}
          <button 
            className="icon-tool-btn" 
            onClick={onToggleSound} 
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* FITT PA Announcement Console */}
          <button 
            className="fitt-ops-btn" 
            onClick={onOpenFITTConsole}
            title="Open FITT Command Console & PA Dispatch"
          >
            <Megaphone size={15} />
            <span>FITT Console</span>
          </button>

          {/* Claim Desk Button */}
          <button 
            className="claim-desk-btn" 
            onClick={onOpenClaimDesk}
            title="Claim an Office Space Desk for your Startup"
          >
            <PlusCircle size={15} />
            <span>+ Claim Desk</span>
          </button>

          {/* Open Source Info */}
          <button 
            className="icon-tool-btn github-btn" 
            onClick={onOpenOpenSourceInfo}
            title="Open-Source Architecture & GitHub Info"
          >
            <Code2 size={16} />
          </button>
        </div>
      </div>

      {/* Sub-Header: Search & Floor Metadata Strip */}
      <div className="floor-meta-strip">
        <div className="floor-indicator-left">
          <span className="floor-badge-pill" style={{ backgroundColor: currentFloor.tagColor, color: currentFloor.accentColor }}>
            {currentFloor.badge}
          </span>
          <span className="floor-title-text">{currentFloor.name}</span>
          <span className="floor-desc-text">— {currentFloor.subtitle}</span>
        </div>

        <div className="search-filter-box">
          <div className="search-input-wrap">
            <Search size={14} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search founder, startup, AI stack..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>

          <div className="sector-filter-wrap">
            <select 
              value={selectedSector} 
              onChange={e => onSectorChange(e.target.value)}
              className="sector-select"
            >
              <option value="ALL">All Sectors</option>
              <option value="AI & DeepTech">AI & DeepTech</option>
              <option value="BioTech & Health">BioTech & Health</option>
              <option value="FinTech & Web3">FinTech & Web3</option>
              <option value="Hardware & Robotics">Hardware & Robotics</option>
              <option value="SaaS & Enterprise">SaaS & Enterprise</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
