import React, { useState } from 'react';
import type { Founder, Floor } from '../types';
import { soundEffects } from '../services/soundEffects';
import confetti from 'canvas-confetti';
import { X, Plus, Sparkles } from 'lucide-react';

interface ClaimDeskModalProps {
  floors: Floor[];
  activeFloorId: number;
  onClaimDesk: (newFounder: Founder) => void;
  onClose: () => void;
}

export const ClaimDeskModal: React.FC<ClaimDeskModalProps> = ({
  floors,
  activeFloorId,
  onClaimDesk,
  onClose
}) => {
  const [founderName, setFounderName] = useState('');
  const [role, setRole] = useState('Founder & CEO');
  const [startupName, setStartupName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState<'AI & DeepTech' | 'BioTech & Health' | 'FinTech & Web3' | 'Hardware & Robotics' | 'SaaS & Enterprise'>('AI & DeepTech');
  const [selectedFloor, setSelectedFloor] = useState<number>(activeFloorId);
  const [techStackInput, setTechStackInput] = useState('Python, PyTorch, React, Docker');
  const [shirtColor, setShirtColor] = useState('#2563EB');
  const [accessory, setAccessory] = useState<'glasses' | 'headphones' | 'cap' | 'none'>('headphones');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!founderName.trim() || !startupName.trim()) return;

    // Determine target floor and next desk coordinates
    const targetFloor = floors.find(f => f.id === selectedFloor) || floors[0];
    const deskCount = targetFloor.founders.length;
    
    // Calculate reasonable open desk position on grid
    const startX = 100;
    const startY = deskCount >= 4 ? 340 : 220;
    const deskX = startX + ((deskCount % 4) * 160);
    const deskY = startY;

    const newFounder: Founder = {
      id: 'custom-founder-' + Date.now(),
      name: founderName.trim(),
      role: role.trim(),
      avatar: {
        skinTone: '#E0AC69',
        hairColor: '#1A1A1A',
        shirtColor: shirtColor,
        accessory: accessory,
        genderStyle: 'short_hair'
      },
      startupName: startupName.trim(),
      tagline: tagline.trim() || 'Next-generation incubation venture',
      description: description.trim() || 'Building frontier technology at FITT IIT Delhi incubation lab.',
      sector: sector,
      floorId: selectedFloor,
      deskNumber: selectedFloor * 100 + (deskCount + 1),
      deskCoord: { x: deskX, y: deskY },
      status: 'coding',
      statusMessage: 'Setting up developer workstation on floor',
      stage: 'Prototype',
      mrr: '$0 (Early Stage)',
      teamSize: 3,
      techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
      fittIncubatedSince: 'Mar 2025',
      fittGrantAwarded: '₹15,00,000 (FITT Seed)',
      fittGrantApproved: true,
      pitchDeck: {
        title: `${startupName}: Pitch Presentation`,
        slides: [
          {
            title: 'The Problem Statement',
            subtitle: 'Critical industry challenge',
            points: [
              'High friction and lack of modern automated infrastructure in sector',
              'Proprietary algorithm designed at IIT Delhi provides 10x throughput boost',
              'Accelerating product-market fit with FITT incubation grant'
            ],
            metric: 'Initial Pilot Stage'
          }
        ]
      },
      milestones: [
        { id: 'm-cust-1', title: 'Complete MVP Architecture & Benchmarking', targetDate: 'Q2 2025', completed: true },
        { id: 'm-cust-2', title: 'First 10 Design Partner Deployments', targetDate: 'Q3 2025', completed: false }
      ],
      terminalLogs: [
        { id: 'log-cust-1', time: '12:00:00', text: `spawned workspace harness for ${startupName}`, type: 'info' },
        { id: 'log-cust-2', time: '12:00:15', text: 'git init && npm install dependencies: 0 vulnerabilities', type: 'success' }
      ],
      mailbox: [
        {
          id: 'mail-welcome',
          from: 'Dr. Anil Varma',
          fromRole: 'Managing Director, FITT',
          subject: 'Welcome to FITT Incubator!',
          body: `Welcome ${founderName}! Your dedicated desk has been reserved on Floor 0${selectedFloor}. Drop by the FITT office on Floor 4 for induction and lab access cards.`,
          time: 'Just Now',
          unread: true,
          type: 'mentor_note'
        }
      ]
    };

    onClaimDesk(newFounder);
    soundEffects.playSuccessChime();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="claim-desk-window" onClick={e => e.stopPropagation()}>
        {/* Title Bar */}
        <div className="modal-title-bar">
          <div className="title-left">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="window-title-text">
              CLAIM AN OPEN-SOURCE OFFICE SPACE DESK
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="claim-form-body">
          <div className="claim-intro-callout">
            <Sparkles size={18} className="sparkle-icon" />
            <div>
              <strong>Open Source Your Startup Office Space</strong>
              <p>Every founder gets an interactive 2D desk, live agent terminal, mailbox, and direct connectivity to the FITT mentorship & grant team.</p>
            </div>
          </div>

          <div className="form-grid-two">
            <div className="form-group">
              <label>Founder Full Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Maya Sunder" 
                value={founderName} 
                onChange={e => setFounderName(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Founder Role</label>
              <input 
                type="text" 
                placeholder="e.g. Co-Founder & AI Lead" 
                value={role} 
                onChange={e => setRole(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-grid-two">
            <div className="form-group">
              <label>Startup / Company Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. QuantumEdge Labs" 
                value={startupName} 
                onChange={e => setStartupName(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Select Incubator Floor *</label>
              <select 
                value={selectedFloor} 
                onChange={e => setSelectedFloor(Number(e.target.value))}
              >
                <option value={1}>Floor 1 — DeepTech & AI Launchpad</option>
                <option value={2}>Floor 2 — BioTech & MedTech Labs</option>
                <option value={3}>Floor 3 — FinTech & SaaS Tower</option>
                <option value={4}>Floor 4 — FITT Executive Hub</option>
              </select>
            </div>
          </div>

          <div className="form-grid-two">
            <div className="form-group">
              <label>Sector Category</label>
              <select 
                value={sector} 
                onChange={e => setSector(e.target.value as any)}
              >
                <option value="AI & DeepTech">AI & DeepTech</option>
                <option value="BioTech & Health">BioTech & Health</option>
                <option value="FinTech & Web3">FinTech & Web3</option>
                <option value="Hardware & Robotics">Hardware & Robotics</option>
                <option value="SaaS & Enterprise">SaaS & Enterprise</option>
              </select>
            </div>

            <div className="form-group">
              <label>One-Line Tagline</label>
              <input 
                type="text" 
                placeholder="e.g. Autonomous edge silicon compiler for robotics" 
                value={tagline} 
                onChange={e => setTagline(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Detailed Startup Description</label>
            <input 
              type="text" 
              placeholder="e.g. Compressing 70B parameter models down to 2-watt edge hardware..." 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Tech Stack / Tools (Comma-separated)</label>
            <input 
              type="text" 
              placeholder="e.g. Rust, PyTorch, CUDA, Next.js" 
              value={techStackInput} 
              onChange={e => setTechStackInput(e.target.value)} 
            />
          </div>

          {/* Avatar Styling */}
          <div className="form-grid-two avatar-customizer-box">
            <div className="form-group">
              <label>Avatar Shirt Color</label>
              <div className="color-swatches">
                {['#2563EB', '#059669', '#DC2626', '#7C3AED', '#D97706', '#9E1B32', '#0284C7'].map(c => (
                  <button 
                    type="button" 
                    key={c} 
                    className={`color-swatch-btn ${shirtColor === c ? 'selected' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setShirtColor(c)}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Avatar Accessory</label>
              <select 
                value={accessory} 
                onChange={e => setAccessory(e.target.value as any)}
              >
                <option value="headphones">🎧 Headphones</option>
                <option value="glasses">👓 Glasses</option>
                <option value="cap">🧢 Baseball Cap</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="claim-modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="action-btn-primary">
              <Plus size={16} />
              <span>Claim Desk & Spawn Avatar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
