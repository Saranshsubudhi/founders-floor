import React, { useState } from 'react';
import type { Founder, FITTTeamMember } from '../types';
import { soundEffects } from '../services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  X, 
  Terminal, 
  Mail, 
  Award, 
  Presentation, 
  Video, 
  Send, 
  CheckCircle, 
  DollarSign, 
  Users, 
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface DeskDetailModalProps {
  founder: Founder;
  fittTeam?: FITTTeamMember[];
  onClose: () => void;
  onStartMeeting: (founder: Founder) => void;
  onSendEnvelope: (toFounder: Founder, subject: string, message: string) => void;
  onUpdateStatus?: (founderId: string, status: any, message: string) => void;
  onApproveMilestone: (founderId: string, milestoneId: string) => void;
  userRole?: 'fitt_team' | 'founder' | 'visitor';
}

export const DeskDetailModal: React.FC<DeskDetailModalProps> = ({
  founder,
  onClose,
  onStartMeeting,
  onSendEnvelope,
  onApproveMilestone,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'terminal' | 'mailbox' | 'milestones'>('overview');
  const [activeSlide, setActiveSlide] = useState(0);

  // Mail composer state
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  // Terminal interactive command state
  const [customCmd, setCustomCmd] = useState('');
  const [logs, setLogs] = useState(founder.terminalLogs);

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeSubject.trim() || !composeBody.trim()) return;

    onSendEnvelope(founder, composeSubject, composeBody);
    setSendSuccess(true);
    setComposeSubject('');
    setComposeBody('');
    soundEffects.playEnvelopeWhoosh();

    setTimeout(() => {
      setSendSuccess(false);
    }, 3000);
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCmd.trim()) return;

    const newLog = {
      id: 'cmd-' + Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      text: `$ ${customCmd}`,
      type: 'commit' as const
    };

    const simResponse = {
      id: 'res-' + Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      text: `[agent] executing "${customCmd}" on cluster... completed with exit code 0`,
      type: 'success' as const
    };

    setLogs(prev => [...prev, newLog, simResponse]);
    setCustomCmd('');
    soundEffects.playFootstep();
  };

  const handleMilestoneClick = (milestoneId: string, alreadyCompleted: boolean) => {
    if (alreadyCompleted) return;
    onApproveMilestone(founder.id, milestoneId);
    soundEffects.playSuccessChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="desk-modal-window" onClick={e => e.stopPropagation()}>
        {/* Title Bar */}
        <div className="modal-title-bar">
          <div className="title-left">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="window-title-text">
              DESK #{founder.deskNumber} — {founder.startupName.toUpperCase()}
            </span>
          </div>
          <button className="close-btn" onClick={onClose} title="Close">
            <X size={16} />
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="modal-hero-header">
          <div className="hero-founder-info">
            <div className="avatar-preview-box" style={{ borderColor: founder.avatar.shirtColor }}>
              <div className="avatar-initials">
                {founder.startupName.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="founder-meta">
              <div className="founder-headline">
                <h2>{founder.startupName}</h2>
                <span className="sector-tag">{founder.sector}</span>
                <span className={`status-pill status-${founder.status}`}>
                  {founder.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="founder-byline">
                Founded by <strong>{founder.name}</strong> ({founder.role}) • Floor {founder.floorId}
              </p>
              <p className="founder-status-msg">
                "{founder.statusMessage}"
              </p>
            </div>
          </div>

          <div className="hero-quick-actions">
            <button 
              className="action-btn-primary btn-meet"
              onClick={() => onStartMeeting(founder)}
            >
              <Video size={16} />
              <span>Start 1:1 Meeting</span>
            </button>
            <button 
              className="action-btn-secondary"
              onClick={() => setActiveTab('mailbox')}
            >
              <Mail size={16} />
              <span>Send Mail</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="modal-tab-bar">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Presentation size={15} />
            <span>Overview & Deck</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <Terminal size={15} />
            <span>Live Terminal ({logs.length})</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'mailbox' ? 'active' : ''}`}
            onClick={() => setActiveTab('mailbox')}
          >
            <Mail size={15} />
            <span>Desk Mailbox ({founder.mailbox.length})</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'milestones' ? 'active' : ''}`}
            onClick={() => setActiveTab('milestones')}
          >
            <Award size={15} />
            <span>FITT Milestones & Grants</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="modal-body-scroll">
          {/* TAB 1: OVERVIEW & PITCH DECK */}
          {activeTab === 'overview' && (
            <div className="tab-overview">
              {/* Metrics Grid */}
              <div className="metrics-strip">
                <div className="metric-box">
                  <div className="metric-label"><DollarSign size={13} /> STAGE</div>
                  <div className="metric-value">{founder.stage}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-label"><DollarSign size={13} /> MRR / REV</div>
                  <div className="metric-value">{founder.mrr}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-label"><Users size={13} /> TEAM SIZE</div>
                  <div className="metric-value">{founder.teamSize} Members</div>
                </div>
                <div className="metric-box">
                  <div className="metric-label"><Award size={13} /> FITT GRANT</div>
                  <div className="metric-value fitt-accent">{founder.fittGrantAwarded}</div>
                </div>
              </div>

              {/* Tagline & Description */}
              <div className="overview-section card-box">
                <h4 className="section-title">The Innovation</h4>
                <p className="overview-tagline"><strong>{founder.tagline}</strong></p>
                <p className="overview-desc">{founder.description}</p>
                
                <div className="tech-stack-row">
                  <span className="tech-label"><Layers size={13} /> Tech Stack:</span>
                  {founder.techStack.map(tech => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Pitch Deck Viewer */}
              <div className="pitch-deck-container card-box">
                <div className="deck-header">
                  <div>
                    <h4 className="section-title">Startup Pitch Presentation</h4>
                    <span className="deck-title-sub">{founder.pitchDeck.title}</span>
                  </div>
                  <div className="deck-controls">
                    <button 
                      className="deck-nav-btn" 
                      disabled={activeSlide === 0}
                      onClick={() => setActiveSlide(s => Math.max(0, s - 1))}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="slide-counter">
                      Slide {activeSlide + 1} of {founder.pitchDeck.slides.length}
                    </span>
                    <button 
                      className="deck-nav-btn" 
                      disabled={activeSlide === founder.pitchDeck.slides.length - 1}
                      onClick={() => setActiveSlide(s => Math.min(founder.pitchDeck.slides.length - 1, s + 1))}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Current Slide Display */}
                {founder.pitchDeck.slides[activeSlide] && (
                  <div className="slide-viewport">
                    <div className="slide-top">
                      <h3>{founder.pitchDeck.slides[activeSlide].title}</h3>
                      {founder.pitchDeck.slides[activeSlide].subtitle && (
                        <p className="slide-subtitle">{founder.pitchDeck.slides[activeSlide].subtitle}</p>
                      )}
                    </div>
                    <ul className="slide-bullet-list">
                      {founder.pitchDeck.slides[activeSlide].points.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                    {founder.pitchDeck.slides[activeSlide].metric && (
                      <div className="slide-metric-badge">
                        🎯 KEY TRACTION: <strong>{founder.pitchDeck.slides[activeSlide].metric}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE TERMINAL */}
          {activeTab === 'terminal' && (
            <div className="tab-terminal">
              <div className="terminal-shell">
                <div className="terminal-topbar">
                  <span>bash — founder-agent-pty:fitt-cluster-#{founder.deskNumber}</span>
                  <span className="terminal-status-dot">● LIVE AGENT STREAM</span>
                </div>
                <div className="terminal-feed">
                  <div className="log-line log-info">
                    [00:00:01] Initializing founder agent harness for {founder.startupName}...
                  </div>
                  <div className="log-line log-info">
                    [00:00:02] Connected to IIT Delhi Bharti HPC cluster gateway. Memory recall engine ready.
                  </div>
                  {logs.map(log => (
                    <div key={log.id} className={`log-line log-${log.type}`}>
                      <span className="log-timestamp">[{log.time}]</span> {log.text}
                    </div>
                  ))}
                </div>
                <form className="terminal-input-bar" onSubmit={handleRunCommand}>
                  <span className="prompt-label">$</span>
                  <input 
                    type="text" 
                    value={customCmd}
                    onChange={e => setCustomCmd(e.target.value)}
                    placeholder="Enter command to trigger founder's agent (e.g. 'run tests', 'eval loss', 'git status')..."
                  />
                  <button type="submit" className="terminal-run-btn">Execute</button>
                </form>
              </div>
              <p className="terminal-hint">
                💡 Byte-for-byte stream powered by <code>xterm.js</code> + <code>node-pty</code> agent harness.
              </p>
            </div>
          )}

          {/* TAB 3: DESK MAILBOX */}
          {activeTab === 'mailbox' && (
            <div className="tab-mailbox">
              {/* Send New Mail Form */}
              <div className="compose-box card-box">
                <h4 className="section-title">✉️ Dispatch Letter to {founder.name}'s Desk</h4>
                <p className="compose-sub">
                  Sending will animate a physical retro envelope flying across the 2D office floor to their desk!
                </p>
                {sendSuccess && (
                  <div className="alert-success">
                    ✓ Letter dispatched! Watch the envelope fly across the floor canvas.
                  </div>
                )}
                <form onSubmit={handleSendMail}>
                  <div className="form-group">
                    <label>Subject</label>
                    <input 
                      type="text" 
                      value={composeSubject}
                      onChange={e => setComposeSubject(e.target.value)}
                      placeholder="e.g. Schedule FITT Grant Review, Seed Co-investment intro..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Message Content</label>
                    <textarea 
                      rows={3}
                      value={composeBody}
                      onChange={e => setComposeBody(e.target.value)}
                      placeholder="Write your note, feedback, or meeting request here..."
                    />
                  </div>
                  <button type="submit" className="action-btn-primary">
                    <Send size={15} />
                    <span>Send Flying Envelope</span>
                  </button>
                </form>
              </div>

              {/* Mailbox List */}
              <div className="mailbox-list card-box">
                <h4 className="section-title">Desk Inquiries & Notices ({founder.mailbox.length})</h4>
                {founder.mailbox.length === 0 ? (
                  <p className="empty-state">No letters received yet. Be the first to drop an envelope!</p>
                ) : (
                  <div className="mail-items">
                    {founder.mailbox.map(mail => (
                      <div key={mail.id} className="mail-item">
                        <div className="mail-item-header">
                          <div>
                            <strong className="mail-from">{mail.from}</strong>
                            <span className="mail-role">({mail.fromRole})</span>
                          </div>
                          <span className="mail-time">{mail.time}</span>
                        </div>
                        <div className="mail-subject">{mail.subject}</div>
                        <p className="mail-body">{mail.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: FITT MILESTONES & GRANTS */}
          {activeTab === 'milestones' && (
            <div className="tab-milestones">
              <div className="grant-card-hero">
                <div className="grant-hero-left">
                  <span className="eyebrow">— FITT INCUBATION ENDORSEMENT</span>
                  <h3>NIDHI-SSS / BIRAC Seed Support Grant</h3>
                  <p>Awarded: <strong>{founder.fittGrantAwarded}</strong> • Status: {founder.fittGrantApproved ? 'Active Disbursement' : 'Pending Technical Board'}</p>
                </div>
                <div className="grant-badge">
                  {founder.fittGrantApproved ? '✓ APPROVED' : 'UNDER REVIEW'}
                </div>
              </div>

              <div className="milestones-list card-box">
                <h4 className="section-title">Incubation Deliverable Milestones</h4>
                <div className="milestone-cards">
                  {founder.milestones.map(m => (
                    <div key={m.id} className={`milestone-row ${m.completed ? 'completed' : 'pending'}`}>
                      <div className="milestone-check">
                        <input 
                          type="checkbox" 
                          checked={m.completed} 
                          onChange={() => handleMilestoneClick(m.id, m.completed)}
                          disabled={m.completed}
                          id={`ms-${m.id}`}
                        />
                      </div>
                      <div className="milestone-details">
                        <label htmlFor={`ms-${m.id}`} className="milestone-title">{m.title}</label>
                        <div className="milestone-meta">
                          <span>Target: {m.targetDate}</span>
                          {m.grantTranche && <span className="tranche-tag">{m.grantTranche}</span>}
                          {m.approvedBy && <span className="approver-tag">Signed: {m.approvedBy}</span>}
                        </div>
                      </div>
                      <div className="milestone-action">
                        {m.completed ? (
                          <span className="status-tag-green">
                            <CheckCircle size={14} /> Completed
                          </span>
                        ) : (
                          <button 
                            className="btn-approve-milestone"
                            onClick={() => handleMilestoneClick(m.id, false)}
                          >
                            Sign & Approve Tranche
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
