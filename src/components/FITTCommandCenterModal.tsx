import React, { useState } from 'react';
import type { Floor, FITTTeamMember, Founder } from '../types';
import { soundEffects } from '../services/soundEffects';
import { 
  X, 
  Megaphone, 
  Send, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Users, 
  Video, 
  CheckCircle2
} from 'lucide-react';

interface FITTCommandCenterModalProps {
  floors: Floor[];
  fittTeam?: FITTTeamMember[];
  onBroadcastAnnouncement: (text: string, urgent: boolean) => void;
  onSelectFounder: (founder: Founder, targetFloorId: number) => void;
  onStartMeeting: (founder: Founder) => void;
  onClose: () => void;
}

export const FITTCommandCenterModal: React.FC<FITTCommandCenterModalProps> = ({
  floors,
  onBroadcastAnnouncement,
  onSelectFounder,
  onStartMeeting,
  onClose
}) => {
  const [broadcastText, setBroadcastText] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [selectedFloorFilter, setSelectedFloorFilter] = useState<number | 'ALL'>('ALL');

  // Compute aggregate stats across incubator
  const allFounders = floors.flatMap(f => f.founders);
  const totalGrantsApproved = allFounders.filter(f => f.fittGrantApproved).length;

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;

    soundEffects.playIntercomChime();
    onBroadcastAnnouncement(broadcastText, isUrgent);
    setBroadcastSent(true);
    setBroadcastText('');

    setTimeout(() => {
      setBroadcastSent(false);
    }, 4000);
  };

  const filteredFounders = selectedFloorFilter === 'ALL' 
    ? allFounders 
    : allFounders.filter(f => f.floorId === selectedFloorFilter);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="fitt-console-window" onClick={e => e.stopPropagation()}>
        {/* Title Bar */}
        <div className="modal-title-bar fitt-title-bar">
          <div className="title-left">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="window-title-text">
              ★ FITT IIT DELHI INCUBATION COMMAND SUITE & DISPATCH
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="fitt-console-body">
          {/* Cohort Stats Ribbon */}
          <div className="fitt-stats-ribbon">
            <div className="fitt-stat-tile">
              <span className="fitt-stat-label"><Users size={13} /> INCUBATED STARTUPS</span>
              <span className="fitt-stat-number">{allFounders.length} Ventures</span>
            </div>
            <div className="fitt-stat-tile">
              <span className="fitt-stat-label"><Award size={13} /> DISBURSED GRANTS</span>
              <span className="fitt-stat-number">₹4.25 Crores</span>
            </div>
            <div className="fitt-stat-tile">
              <span className="fitt-stat-label"><ShieldCheck size={13} /> PATENTS FILED</span>
              <span className="fitt-stat-number">9 IPR Claims</span>
            </div>
            <div className="fitt-stat-tile">
              <span className="fitt-stat-label"><TrendingUp size={13} /> SEED TRANCHES SIGNED</span>
              <span className="fitt-stat-number">{totalGrantsApproved} / {allFounders.length} Active</span>
            </div>
          </div>

          {/* PA Intercom Announcement Broadcast Box */}
          <div className="intercom-broadcast-box card-box">
            <div className="intercom-header">
              <Megaphone size={18} className="megaphone-icon" />
              <div>
                <h4>Office Intercom PA System Broadcast</h4>
                <p>Broadcasts an audible notification chime and top-level bulletin across all four incubator floors.</p>
              </div>
            </div>

            {broadcastSent && (
              <div className="alert-success">
                <CheckCircle2 size={16} />
                <span>Intercom Announcement broadcast successfully across all floors!</span>
              </div>
            )}

            <form onSubmit={handleBroadcast} className="broadcast-form">
              <div className="broadcast-input-row">
                <input 
                  type="text" 
                  value={broadcastText}
                  onChange={e => setBroadcastText(e.target.value)}
                  placeholder="e.g. 'Seed Demo Day Pitch dry-run begins in 15 minutes at Floor 4 Boardroom...'"
                  required
                />
                <button type="submit" className="btn-broadcast-fire">
                  <Send size={15} />
                  <span>Transmit Announcement</span>
                </button>
              </div>
              <div className="broadcast-options-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={isUrgent} 
                    onChange={e => setIsUrgent(e.target.checked)} 
                  />
                  <span>Mark as High-Priority Urgent Notification</span>
                </label>
              </div>
            </form>
          </div>

          {/* Quick Founder Roster & 1:1 Contact Dispatch */}
          <div className="founder-roster-box card-box">
            <div className="roster-header">
              <h4>All Incubator Founders ({filteredFounders.length})</h4>
              <div className="roster-floor-filter">
                <span>Filter Floor:</span>
                <button 
                  className={`filter-chip ${selectedFloorFilter === 'ALL' ? 'active' : ''}`}
                  onClick={() => setSelectedFloorFilter('ALL')}
                >
                  All
                </button>
                {[1, 2, 3, 4].map(fl => (
                  <button 
                    key={fl}
                    className={`filter-chip ${selectedFloorFilter === fl ? 'active' : ''}`}
                    onClick={() => setSelectedFloorFilter(fl)}
                  >
                    Floor 0{fl}
                  </button>
                ))}
              </div>
            </div>

            <div className="roster-table-scroll">
              <table className="roster-table">
                <thead>
                  <tr>
                    <th>Desk</th>
                    <th>Startup</th>
                    <th>Founder</th>
                    <th>Sector</th>
                    <th>Stage</th>
                    <th>FITT Grant</th>
                    <th>Quick Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFounders.map(f => (
                    <tr key={f.id}>
                      <td><strong>#{f.deskNumber}</strong></td>
                      <td>
                        <span className="roster-startup-name">{f.startupName}</span>
                      </td>
                      <td>{f.name}</td>
                      <td><span className="sector-chip-tiny">{f.sector}</span></td>
                      <td>{f.stage}</td>
                      <td><span className="grant-chip-tiny">{f.fittGrantAwarded}</span></td>
                      <td className="roster-actions-cell">
                        <button 
                          className="btn-tiny-meet"
                          onClick={() => {
                            onStartMeeting(f);
                            onClose();
                          }}
                          title="Launch instant 1:1 video session in Boardroom"
                        >
                          <Video size={13} />
                          <span>Meet</span>
                        </button>
                        <button 
                          className="btn-tiny-desk"
                          onClick={() => {
                            onSelectFounder(f, f.floorId);
                            onClose();
                          }}
                          title="Open Desk Command Center"
                        >
                          <span>Desk ➔</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
