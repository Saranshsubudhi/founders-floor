import React from 'react';
import type { Floor } from '../types';
import { soundEffects } from '../services/soundEffects';
import { X, ArrowUp, ArrowDown, Users, DoorOpen } from 'lucide-react';

interface FloorSwitcherElevatorModalProps {
  floors: Floor[];
  activeFloorId: number;
  onSelectFloor: (floorId: number) => void;
  onClose: () => void;
}

export const FloorSwitcherElevatorModal: React.FC<FloorSwitcherElevatorModalProps> = ({
  floors,
  activeFloorId,
  onSelectFloor,
  onClose
}) => {
  const handleFloorClick = (id: number) => {
    soundEffects.playElevatorDing();
    onSelectFloor(id);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="elevator-panel-window" onClick={e => e.stopPropagation()}>
        {/* Title Bar */}
        <div className="modal-title-bar">
          <div className="title-left">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="window-title-text">
              FITT OTIS DUAL-SPEED HIGH-BAY ELEVATOR PANEL
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Vintage Elevator Display Screen */}
        <div className="elevator-display-screen">
          <div className="lift-arrows">
            <ArrowUp className="lift-arrow-glow" size={24} />
            <ArrowDown className="lift-arrow-dim" size={24} />
          </div>
          <div className="lift-current-num">
            {activeFloorId}
          </div>
          <div className="lift-current-desc">
            <div className="lift-brand">FITT INCUBATION TOWER</div>
            <div className="lift-status-text">
              CURRENTLY AT FLOOR 0{activeFloorId}
            </div>
          </div>
        </div>

        {/* Floor Selection Cards */}
        <div className="elevator-buttons-grid">
          {floors.map(floor => {
            const isCurrent = floor.id === activeFloorId;
            return (
              <div 
                key={floor.id} 
                className={`elevator-floor-card ${isCurrent ? 'current-floor' : ''}`}
                onClick={() => handleFloorClick(floor.id)}
              >
                <div className="floor-dial-btn">
                  <span>0{floor.id}</span>
                  {isCurrent && <span className="dial-active-dot" />}
                </div>

                <div className="floor-card-info">
                  <div className="floor-card-badge">{floor.badge}</div>
                  <h3 className="floor-card-title">{floor.name}</h3>
                  <p className="floor-card-desc">{floor.description}</p>
                  
                  <div className="floor-card-stats">
                    <span><Users size={12} /> {floor.founders.length} Founder Desks</span>
                    <span><DoorOpen size={12} /> {floor.rooms.length} Meeting Rooms</span>
                  </div>
                </div>

                <div className="floor-card-action">
                  {isCurrent ? (
                    <span className="btn-here">YOU ARE HERE</span>
                  ) : (
                    <button className="btn-ride-lift">PRESS 0{floor.id} ➔</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="elevator-footer-note">
          <span>💡 Select any floor to ride the elevator and explore other founder workspaces.</span>
        </div>
      </div>
    </div>
  );
};
