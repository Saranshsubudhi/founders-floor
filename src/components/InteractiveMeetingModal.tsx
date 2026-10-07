import React, { useState, useEffect } from 'react';
import type { Founder, FITTTeamMember } from '../types';
import { soundEffects } from '../services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  X, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ScreenShare, 
  PhoneOff, 
  CheckSquare, 
  FileText, 
  MessageSquare, 
  Award, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

interface InteractiveMeetingModalProps {
  founder: Founder;
  fittMember: FITTTeamMember;
  roomName: string;
  onClose: () => void;
  onApproveGrantTranche: (founderId: string) => void;
}

export const InteractiveMeetingModal: React.FC<InteractiveMeetingModalProps> = ({
  founder,
  fittMember,
  roomName,
  onClose,
  onApproveGrantTranche
}) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenShareOn, setScreenShareOn] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [sideTab, setSideTab] = useState<'agenda' | 'notes' | 'chat'>('agenda');
  const [meetingSeconds, setMeetingSeconds] = useState(82); // simulated timer

  // Agenda items
  const [agendaItems, setAgendaItems] = useState([
    { id: 'ag1', text: 'Review Q1 Hardware / Architecture Milestone', done: true },
    { id: 'ag2', text: 'Evaluate FITT NIDHI-SSS Grant Tranche 2 Requisition', done: false },
    { id: 'ag3', text: 'Patent Search & IPR Cell Filing Status', done: false },
    { id: 'ag4', text: 'Angel Investor Demo Day Rehearsal Feedback', done: false }
  ]);

  // Meeting notes
  const [meetingNotes, setMeetingNotes] = useState(
    `FITT Incubation Mentorship Session Notes:\n- Date: ${new Date().toLocaleDateString()}\n- Founder: ${founder.name} (${founder.startupName})\n- Mentor: ${fittMember.name} (${fittMember.title})\n\nAction items discussed:\n1. Technical architecture demonstrates 99.4% stability.\n2. Proceed with Tranche 2 grant disbursement upon CA certificate submission.\n3. Introduced to Blume Ventures deep-tech partner.`
  );

  // Chat messages
  const [chatLog, setChatLog] = useState([
    { sender: fittMember.name, role: fittMember.title, text: `Hello ${founder.name}, welcome to the ${roomName}. Let us begin with your milestone evaluation.`, time: '11:46 AM' },
    { sender: founder.name, role: founder.role, text: `Thank you ${fittMember.name.split(' ')[0]}! I have loaded our latest architecture deck and deployment metrics on the screen share.`, time: '11:47 AM' }
  ]);
  const [newMsg, setNewMsg] = useState('');
  const [grantApproved, setGrantApproved] = useState(founder.fittGrantApproved);

  // Timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleAgendaItem = (id: string) => {
    setAgendaItems(items => items.map(item => item.id === id ? { ...item, done: !item.done } : item));
    soundEffects.playFootstep();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    setChatLog(prev => [
      ...prev,
      {
        sender: 'You',
        role: 'Participant',
        text: newMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMsg('');
    soundEffects.playFootstep();
  };

  const handleApproveGrant = () => {
    setGrantApproved(true);
    onApproveGrantTranche(founder.id);
    soundEffects.playSuccessChime();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    setChatLog(prev => [
      ...prev,
      {
        sender: fittMember.name,
        role: fittMember.title,
        text: `🎉 Formal Approval Granted! Tranche 2 disbursement voucher for ₹10,00,000 has been signed off in the FITT Incubation Portal.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleEmote = (emoji: string) => {
    soundEffects.playDing();
    setChatLog(prev => [
      ...prev,
      {
        sender: 'You',
        role: 'Participant',
        text: emoji,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="meeting-modal-window" onClick={e => e.stopPropagation()}>
        {/* Meeting Header Bar */}
        <div className="meeting-title-bar">
          <div className="meeting-title-left">
            <span className="rec-badge">● REC</span>
            <span className="room-name-text">
              {roomName.toUpperCase()} — FITT 1:1 INCUBATOR SESSION
            </span>
            <span className="timer-badge">{formatTimer(meetingSeconds)}</span>
          </div>
          <button className="close-btn" onClick={onClose} title="Leave Meeting">
            <X size={16} />
          </button>
        </div>

        {/* Meeting Main Content Split */}
        <div className="meeting-stage-container">
          {/* Main Stage (Screen Share / Video Tiles) */}
          <div className="meeting-main-stage">
            {/* Screen Share Slide Presentation */}
            {screenShareOn && (
              <div className="screen-share-viewport">
                <div className="screen-share-banner">
                  <span>📺 {founder.startupName} Pitch Deck Presentation</span>
                  <div className="slide-nav-mini">
                    <button 
                      disabled={currentSlideIndex === 0}
                      onClick={() => setCurrentSlideIndex(s => Math.max(0, s - 1))}
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span>{currentSlideIndex + 1} / {founder.pitchDeck.slides.length}</span>
                    <button 
                      disabled={currentSlideIndex === founder.pitchDeck.slides.length - 1}
                      onClick={() => setCurrentSlideIndex(s => Math.min(founder.pitchDeck.slides.length - 1, s + 1))}
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {founder.pitchDeck.slides[currentSlideIndex] && (
                  <div className="shared-slide-card">
                    <h2 className="slide-deck-title">{founder.pitchDeck.slides[currentSlideIndex].title}</h2>
                    <p className="slide-deck-sub">{founder.pitchDeck.slides[currentSlideIndex].subtitle}</p>
                    <ul className="slide-deck-bullets">
                      {founder.pitchDeck.slides[currentSlideIndex].points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                    {founder.pitchDeck.slides[currentSlideIndex].metric && (
                      <div className="slide-deck-metric">
                        🎯 Traction Benchmark: <strong>{founder.pitchDeck.slides[currentSlideIndex].metric}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Video Feed Grid */}
            <div className={`video-tiles-grid ${screenShareOn ? 'strip-layout' : 'grid-layout'}`}>
              {/* Founder Video Tile */}
              <div className="video-tile founder-tile">
                <div className="video-feed-placeholder" style={{ backgroundColor: '#1E293B' }}>
                  <div className="avatar-big" style={{ backgroundColor: founder.avatar.shirtColor }}>
                    {founder.name.slice(0, 2).toUpperCase()}
                  </div>
                  {/* Audio wave indicator */}
                  <div className="audio-wave">
                    <span className="wave-bar" />
                    <span className="wave-bar active" />
                    <span className="wave-bar" />
                    <span className="wave-bar active" />
                  </div>
                </div>
                <div className="tile-footer">
                  <span className="tile-name">{founder.name} ({founder.startupName})</span>
                  <span className="tile-status-icon">🎙️</span>
                </div>
              </div>

              {/* FITT Team Member Video Tile */}
              <div className="video-tile fitt-tile">
                <div className="video-feed-placeholder" style={{ backgroundColor: '#450A0A' }}>
                  <div className="avatar-big" style={{ backgroundColor: '#9E1B32' }}>
                    ★
                  </div>
                  <div className="audio-wave">
                    <span className="wave-bar active" />
                    <span className="wave-bar" />
                    <span className="wave-bar active" />
                    <span className="wave-bar" />
                  </div>
                </div>
                <div className="tile-footer">
                  <span className="tile-name">{fittMember.name} (FITT EIR)</span>
                  <span className="tile-status-icon">🎙️</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="meeting-controls-bar">
              <div className="controls-group">
                <button 
                  className={`ctrl-btn ${micOn ? 'btn-active' : 'btn-danger'}`}
                  onClick={() => { setMicOn(!micOn); soundEffects.playDing(); }}
                  title="Toggle Microphone"
                >
                  {micOn ? <Mic size={18} /> : <MicOff size={18} />}
                  <span>{micOn ? 'Mute' : 'Unmute'}</span>
                </button>
                <button 
                  className={`ctrl-btn ${camOn ? 'btn-active' : 'btn-off'}`}
                  onClick={() => { setCamOn(!camOn); soundEffects.playDing(); }}
                  title="Toggle Camera"
                >
                  {camOn ? <Video size={18} /> : <VideoOff size={18} />}
                  <span>{camOn ? 'Stop Cam' : 'Start Cam'}</span>
                </button>
                <button 
                  className={`ctrl-btn ${screenShareOn ? 'btn-share' : 'btn-off'}`}
                  onClick={() => { setScreenShareOn(!screenShareOn); soundEffects.playDing(); }}
                  title="Share Screen Deck"
                >
                  <ScreenShare size={18} />
                  <span>{screenShareOn ? 'Hide Deck' : 'Present Deck'}</span>
                </button>
              </div>

              {/* Quick Reactions */}
              <div className="reaction-pills">
                {['👏', '🚀', '💡', '🔥', '☕'].map(emoji => (
                  <button key={emoji} className="react-btn" onClick={() => handleEmote(emoji)}>
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="controls-group">
                <button className="ctrl-btn btn-leave" onClick={onClose}>
                  <PhoneOff size={18} />
                  <span>End Meeting</span>
                </button>
              </div>
            </div>
          </div>

          {/* Side Drawer (Agenda, Notes, Chat) */}
          <div className="meeting-side-panel">
            <div className="side-panel-tabs">
              <button 
                className={`panel-tab ${sideTab === 'agenda' ? 'active' : ''}`}
                onClick={() => setSideTab('agenda')}
              >
                <CheckSquare size={14} />
                <span>Agenda</span>
              </button>
              <button 
                className={`panel-tab ${sideTab === 'notes' ? 'active' : ''}`}
                onClick={() => setSideTab('notes')}
              >
                <FileText size={14} />
                <span>Minutes</span>
              </button>
              <button 
                className={`panel-tab ${sideTab === 'chat' ? 'active' : ''}`}
                onClick={() => setSideTab('chat')}
              >
                <MessageSquare size={14} />
                <span>Chat ({chatLog.length})</span>
              </button>
            </div>

            <div className="side-panel-content">
              {/* TAB 1: AGENDA & GRANT SIGN-OFF */}
              {sideTab === 'agenda' && (
                <div className="side-agenda">
                  <h4 className="side-heading">Meeting Objectives & Deliverables</h4>
                  <div className="agenda-checklist">
                    {agendaItems.map(item => (
                      <div 
                        key={item.id} 
                        className={`agenda-item-row ${item.done ? 'done' : ''}`}
                        onClick={() => toggleAgendaItem(item.id)}
                      >
                        <input 
                          type="checkbox" 
                          checked={item.done} 
                          onChange={() => toggleAgendaItem(item.id)}
                          id={item.id}
                        />
                        <label htmlFor={item.id}>{item.text}</label>
                      </div>
                    ))}
                  </div>

                  {/* FITT Executive Sign-off Box */}
                  <div className="grant-action-box">
                    <span className="eyebrow">— FITT GRANT COMMITTEE SIGN-OFF</span>
                    <p className="grant-eval-text">
                      Authorizing NIDHI-SSS / BIRAC Tranche 2 release of ₹10,00,000 for {founder.startupName}.
                    </p>
                    {grantApproved ? (
                      <div className="grant-signed-badge">
                        ✓ TRANCHE 2 FORMALLY APPROVED BY FITT
                      </div>
                    ) : (
                      <button className="btn-approve-grant-full" onClick={handleApproveGrant}>
                        <Award size={16} />
                        <span>Sign & Disburse Grant Tranche</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE MINUTES & NOTES */}
              {sideTab === 'notes' && (
                <div className="side-notes">
                  <h4 className="side-heading">Live Meeting Minutes</h4>
                  <textarea 
                    className="notes-textarea"
                    rows={14}
                    value={meetingNotes}
                    onChange={e => setMeetingNotes(e.target.value)}
                    placeholder="Type notes and action items here..."
                  />
                  <span className="notes-autosave">✓ Auto-saved to FITT incubation ledger</span>
                </div>
              )}

              {/* TAB 3: CHAT */}
              {sideTab === 'chat' && (
                <div className="side-chat">
                  <div className="chat-messages-scroll">
                    {chatLog.map((chat, idx) => (
                      <div key={idx} className="chat-msg-row">
                        <div className="chat-msg-header">
                          <strong className="chat-sender">{chat.sender}</strong>
                          <span className="chat-time">{chat.time}</span>
                        </div>
                        <div className="chat-msg-text">{chat.text}</div>
                      </div>
                    ))}
                  </div>
                  <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <input 
                      type="text" 
                      value={newMsg}
                      onChange={e => setNewMsg(e.target.value)}
                      placeholder="Send message to meeting room..."
                    />
                    <button type="submit" className="chat-send-btn">Send</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
