import { useState, useEffect } from 'react';
import type { Floor, Founder, FITTTeamMember, EnvelopeFlight, Announcement, MeetingRoom } from './types';
import { INITIAL_FLOORS, INITIAL_FITT_TEAM, INITIAL_ANNOUNCEMENTS } from './data/initialData';
import { soundEffects } from './services/soundEffects';
import { OfficeFloorCanvas } from './components/OfficeFloorCanvas';
import { HeaderBar } from './components/HeaderBar';
import { DeskDetailModal } from './components/DeskDetailModal';
import { InteractiveMeetingModal } from './components/InteractiveMeetingModal';
import { FloorSwitcherElevatorModal } from './components/FloorSwitcherElevatorModal';
import { ClaimDeskModal } from './components/ClaimDeskModal';
import { FITTCommandCenterModal } from './components/FITTCommandCenterModal';
import { OpenSourceFloorInfoModal } from './components/OpenSourceFloorInfoModal';
import { 
  Megaphone, 
  X, 
  Video, 
  ChevronRight
} from 'lucide-react';
import './App.css';

export default function App() {
  const [floors, setFloors] = useState<Floor[]>(INITIAL_FLOORS);
  const [fittTeam] = useState<FITTTeamMember[]>(INITIAL_FITT_TEAM);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [activeFloorId, setActiveFloorId] = useState<number>(1);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  // Active meeting state
  const [meetingSession, setMeetingSession] = useState<{
    isOpen: boolean;
    founder: Founder | null;
    fittMember: FITTTeamMember;
    roomName: string;
  }>({
    isOpen: false,
    founder: null,
    fittMember: INITIAL_FITT_TEAM[1], // Priya Sharma (Head of Incubation)
    roomName: 'Vikram Sarabhai Boardroom'
  });

  // Modal toggles
  const [isElevatorOpen, setIsElevatorOpen] = useState(false);
  const [isClaimDeskOpen, setIsClaimDeskOpen] = useState(false);
  const [isFITTConsoleOpen, setIsFITTConsoleOpen] = useState(false);
  const [isOpenSourceInfoOpen, setIsOpenSourceInfoOpen] = useState(false);

  // Filters & Settings
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userRole, setUserRole] = useState<'fitt_team' | 'founder' | 'visitor'>('fitt_team');

  // Animated flying envelopes
  const [activeEnvelopes, setActiveEnvelopes] = useState<EnvelopeFlight[]>([]);

  // Active floor
  const currentFloor = floors.find(f => f.id === activeFloorId) || floors[0];

  // Envelope flight animation tick loop
  useEffect(() => {
    if (activeEnvelopes.length === 0) return;

    const interval = setInterval(() => {
      setActiveEnvelopes(prevEnvelopes => {
        const nextList: EnvelopeFlight[] = [];

        prevEnvelopes.forEach(env => {
          const newProgress = env.progress + 0.035;
          if (newProgress >= 1) {
            // Envelope has landed at destination desk!
            soundEffects.playDing();
            // Automatically add letter to recipient's mailbox
            setFloors(prevFloors => prevFloors.map(fl => ({
              ...fl,
              founders: fl.founders.map(fdr => {
                if (fdr.name === env.recipientName || fdr.startupName === env.recipientName) {
                  return {
                    ...fdr,
                    mailbox: [
                      {
                        id: 'mail-delivered-' + Date.now(),
                        from: env.senderName,
                        fromRole: 'FITT Incubation Officer',
                        subject: 'Notice: ' + env.messagePreview.slice(0, 30),
                        body: env.messagePreview,
                        time: 'Just Now',
                        unread: true,
                        type: 'fitt_grant'
                      },
                      ...fdr.mailbox
                    ]
                  };
                }
                return fdr;
              })
            })));
          } else {
            nextList.push({ ...env, progress: newProgress });
          }
        });

        return nextList;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [activeEnvelopes]);

  // Dispatch flying envelope handler
  const handleSendEnvelope = (toFounder: Founder, subject: string, message: string) => {
    // Start envelope flight from elevator or current player position towards target desk
    const newEnvelope: EnvelopeFlight = {
      id: 'env-' + Date.now(),
      fromX: 740,
      fromY: 120,
      toX: toFounder.deskCoord.x,
      toY: toFounder.deskCoord.y,
      senderName: userRole === 'fitt_team' ? 'Priya Sharma (FITT)' : 'Fellow Founder',
      recipientName: toFounder.name,
      messagePreview: `${subject}: ${message}`,
      progress: 0,
      createdAt: Date.now()
    };

    setActiveEnvelopes(prev => [...prev, newEnvelope]);
    soundEffects.playEnvelopeWhoosh();
  };

  // Launch 1:1 meeting with founder
  const handleStartMeeting = (founder: Founder) => {
    setSelectedFounder(null); // close desk drawer
    const matchingRoom = currentFloor.rooms[0] || { name: 'Vikram Sarabhai Boardroom' };
    setMeetingSession({
      isOpen: true,
      founder: founder,
      fittMember: fittTeam[1], // Priya Sharma
      roomName: matchingRoom.name
    });
    soundEffects.playDing();
  };

  // Enter meeting room from floor click
  const handleEnterMeetingRoom = (room: MeetingRoom) => {
    // Pick the first founder on this floor for instant interactive session
    const founder = currentFloor.founders[0];
    if (founder) {
      setMeetingSession({
        isOpen: true,
        founder: founder,
        fittMember: fittTeam[0],
        roomName: room.name
      });
    }
  };

  // Claim new desk handler
  const handleClaimDesk = (newFounder: Founder) => {
    setFloors(prevFloors => prevFloors.map(fl => {
      if (fl.id === newFounder.floorId) {
        return {
          ...fl,
          founders: [...fl.founders, newFounder]
        };
      }
      return fl;
    }));

    setActiveFloorId(newFounder.floorId);
    setSelectedFounder(newFounder);
  };

  // Approve milestone & grant tranche
  const handleApproveMilestone = (founderId: string, milestoneId: string) => {
    setFloors(prevFloors => prevFloors.map(fl => ({
      ...fl,
      founders: fl.founders.map(fdr => {
        if (fdr.id === founderId) {
          return {
            ...fdr,
            milestones: fdr.milestones.map(m => m.id === milestoneId ? { ...m, completed: true, approvedBy: 'Dr. Anil Varma (FITT)' } : m)
          };
        }
        return fdr;
      })
    })));

    // Also update selected founder if currently open
    setSelectedFounder(prev => {
      if (!prev || prev.id !== founderId) return prev;
      return {
        ...prev,
        milestones: prev.milestones.map(m => m.id === milestoneId ? { ...m, completed: true, approvedBy: 'Dr. Anil Varma (FITT)' } : m)
      };
    });
  };

  const handleApproveGrantTranche = (founderId: string) => {
    setFloors(prevFloors => prevFloors.map(fl => ({
      ...fl,
      founders: fl.founders.map(fdr => {
        if (fdr.id === founderId) {
          return {
            ...fdr,
            fittGrantApproved: true
          };
        }
        return fdr;
      })
    })));
  };

  // Broadcast intercom PA announcement
  const handleBroadcastAnnouncement = (text: string, urgent: boolean) => {
    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      text,
      author: userRole === 'fitt_team' ? 'Priya Sharma (FITT Incubation Lead)' : 'Incubation Committee',
      authorRole: 'FITT Command Center',
      floorId: 'all',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      urgent
    };

    setAnnouncements(prev => [newAnn, ...prev]);
  };

  // Filter founders on current floor
  const filteredFounders = currentFloor.founders.filter(f => {
    const matchesSearch = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSector = selectedSector === 'ALL' || f.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  return (
    <div className="app-container">
      {/* Top Header Bar */}
      <HeaderBar 
        floors={floors}
        activeFloorId={activeFloorId}
        onSelectFloor={setActiveFloorId}
        onOpenElevator={() => setIsElevatorOpen(true)}
        onOpenClaimDesk={() => setIsClaimDeskOpen(true)}
        onOpenFITTConsole={() => setIsFITTConsoleOpen(true)}
        onOpenOpenSourceInfo={() => setIsOpenSourceInfoOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(soundEffects.toggleSound())}
        userRole={userRole}
        onRoleChange={setUserRole}
      />

      {/* Live PA Announcement Intercom Ticker */}
      {announcements.length > 0 && (
        <div className={`announcement-banner ${announcements[0].urgent ? 'urgent' : ''}`}>
          <div className="banner-content">
            <Megaphone size={15} className="banner-icon" />
            <span className="banner-text">
              <strong>{announcements[0].author}:</strong> {announcements[0].text}
            </span>
            <span className="banner-time">[{announcements[0].timestamp}]</span>
          </div>
          <button 
            className="banner-close" 
            onClick={() => setAnnouncements(a => a.slice(1))}
            title="Dismiss Announcement"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Simulation Viewport */}
      <main className="main-viewport">
        {/* The 2D Interactive Office Floor Canvas */}
        <div className="floor-canvas-container">
          <OfficeFloorCanvas 
            floor={{ ...currentFloor, founders: filteredFounders }}
            fittTeam={fittTeam}
            selectedFounder={selectedFounder}
            onSelectFounder={setSelectedFounder}
            onEnterMeetingRoom={handleEnterMeetingRoom}
            onOpenElevator={() => setIsElevatorOpen(true)}
            activeEnvelopes={activeEnvelopes}
            onEnvelopeLanded={() => {}}
            userRole={userRole}
          />
        </div>

        {/* Sidebar / Bottom Quick Roster Strip */}
        <aside className="quick-roster-sidebar">
          <div className="roster-header-row">
            <div className="roster-heading-left">
              <span className="roster-badge">DESK ROSTER</span>
              <h3>Floor 0{currentFloor.id} Founders ({filteredFounders.length})</h3>
            </div>
            <button 
              className="btn-add-desk-mini"
              onClick={() => setIsClaimDeskOpen(true)}
            >
              + Add Founder
            </button>
          </div>

          <div className="roster-cards-list">
            {filteredFounders.map(f => (
              <div 
                key={f.id} 
                className={`roster-desk-card ${selectedFounder?.id === f.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedFounder(f);
                  soundEffects.playKnockKnock();
                }}
              >
                <div className="card-top">
                  <div className="card-desk-num">#{f.deskNumber}</div>
                  <span className={`status-dot status-${f.status}`} />
                  <span className="status-label">{f.status.replace('_', ' ')}</span>
                </div>

                <div className="card-body">
                  <h4 className="card-startup-name">{f.startupName}</h4>
                  <div className="card-founder-name">{f.name} ({f.role})</div>
                  <p className="card-tagline">{f.tagline}</p>
                </div>

                <div className="card-footer">
                  <span className="card-stage-chip">{f.stage}</span>
                  <div className="card-actions">
                    <button 
                      className="btn-meet-card"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartMeeting(f);
                      }}
                      title="1:1 Meet"
                    >
                      <Video size={13} />
                      <span>Meet</span>
                    </button>
                    <ChevronRight size={14} className="card-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FITT On-Duty Mentors Card */}
          <div className="fitt-roster-footer">
            <div className="fitt-footer-title">
              ★ FITT ON-DUTY MENTORS
            </div>
            <div className="fitt-mentors-mini-list">
              {fittTeam.slice(0, 3).map(m => (
                <div key={m.id} className="fitt-mini-item">
                  <div className="fitt-mini-avatar" style={{ backgroundColor: m.avatar.shirtColor }}>
                    {m.name[0]}
                  </div>
                  <div className="fitt-mini-info">
                    <span className="fitt-mini-name">{m.name}</span>
                    <span className="fitt-mini-role">{m.title}</span>
                  </div>
                  <span className="fitt-online-dot" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Desk Command Center Modal */}
      {selectedFounder && (
        <DeskDetailModal 
          founder={selectedFounder}
          fittTeam={fittTeam}
          onClose={() => setSelectedFounder(null)}
          onStartMeeting={handleStartMeeting}
          onSendEnvelope={handleSendEnvelope}
          onUpdateStatus={() => {}}
          onApproveMilestone={handleApproveMilestone}
          userRole={userRole}
        />
      )}

      {/* Interactive 1:1 Meeting Room Modal */}
      {meetingSession.isOpen && meetingSession.founder && (
        <InteractiveMeetingModal 
          founder={meetingSession.founder}
          fittMember={meetingSession.fittMember}
          roomName={meetingSession.roomName}
          onClose={() => setMeetingSession(s => ({ ...s, isOpen: false, founder: null }))}
          onApproveGrantTranche={handleApproveGrantTranche}
        />
      )}

      {/* Otis Elevator Panel Modal */}
      {isElevatorOpen && (
        <FloorSwitcherElevatorModal 
          floors={floors}
          activeFloorId={activeFloorId}
          onSelectFloor={setActiveFloorId}
          onClose={() => setIsElevatorOpen(false)}
        />
      )}

      {/* Claim Desk Modal */}
      {isClaimDeskOpen && (
        <ClaimDeskModal 
          floors={floors}
          activeFloorId={activeFloorId}
          onClaimDesk={handleClaimDesk}
          onClose={() => setIsClaimDeskOpen(false)}
        />
      )}

      {/* FITT Command Suite Modal */}
      {isFITTConsoleOpen && (
        <FITTCommandCenterModal 
          floors={floors}
          fittTeam={fittTeam}
          onBroadcastAnnouncement={handleBroadcastAnnouncement}
          onSelectFounder={(f, flId) => {
            setActiveFloorId(flId);
            setSelectedFounder(f);
          }}
          onStartMeeting={handleStartMeeting}
          onClose={() => setIsFITTConsoleOpen(false)}
        />
      )}

      {/* Open Source Info Modal */}
      {isOpenSourceInfoOpen && (
        <OpenSourceFloorInfoModal 
          onClose={() => setIsOpenSourceInfoOpen(false)}
        />
      )}
    </div>
  );
}
