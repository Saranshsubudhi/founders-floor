import React from 'react';
import { X, GitBranch, Terminal, Cpu, Building2, Code2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface OpenSourceFloorInfoModalProps {
  onClose: () => void;
}

export const OpenSourceFloorInfoModal: React.FC<OpenSourceFloorInfoModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const cloneSnippet = `git clone https://github.com/founders-floor/founders-floor.git
cd founders-floor
npm install
npm run dev`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="opensource-modal-window" onClick={e => e.stopPropagation()}>
        {/* Title Bar */}
        <div className="modal-title-bar">
          <div className="title-left">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="window-title-text">
              OPEN SOURCE INCUBATOR ARCHITECTURE — FOUNDERS FLOOR
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="opensource-modal-body">
          <div className="os-hero-box">
            <div className="os-brand-row">
              <GitBranch size={24} />
              <h2>FoundersFloor: The Open-Source Virtual Workspace</h2>
            </div>
            <p className="os-hero-text">
              An open-source multi-floor office simulation designed for startup incubators. Every founder gets a dedicated physical workspace, interactive desk, live streaming terminal, and real-time connectivity with the FITT mentorship and investment board.
            </p>
          </div>

          <div className="os-features-grid">
            <div className="os-feature-card">
              <div className="os-icon-title">
                <Building2 size={18} />
                <h4>Multi-Floor Office Building</h4>
              </div>
              <p>
                Organized across 4 specialized floors (AI & DeepTech, BioTech Labs, SaaS & FinTech, and FITT Executive Hub) with an Otis elevator transit system.
              </p>
            </div>

            <div className="os-feature-card">
              <div className="os-icon-title">
                <Terminal size={18} />
                <h4>Founder Desks & Agent Terminal</h4>
              </div>
              <p>
                Every founder desk has a computer terminal displaying live commit logs and test passes, a pitch deck presentation viewer, and traction milestones.
              </p>
            </div>

            <div className="os-feature-card">
              <div className="os-icon-title">
                <Code2 size={18} />
                <h4>Flying Envelope Mailbox</h4>
              </div>
              <p>
                Letters, review notices, and grant updates physically fly across the 2D canvas in a parabolic arc from desk to desk with sound effects.
              </p>
            </div>

            <div className="os-feature-card">
              <div className="os-icon-title">
                <Cpu size={18} />
                <h4>FITT 1:1 Boardroom Suite</h4>
              </div>
              <p>
                Instant audio/video meeting room with slide presentation, collaborative meeting notes, and formal NIDHI-SSS / BIRAC grant disbursement signing.
              </p>
            </div>
          </div>

          {/* Quick Clone & Run Terminal Box */}
          <div className="os-code-box card-box">
            <div className="os-code-header">
              <span>GETTING STARTED / LOCAL DEPLOYMENT</span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="os-code-content">
              <code>{cloneSnippet}</code>
            </pre>
          </div>

          <div className="os-footer-links">
            <span>Ecosystem: Foundation for Innovation and Technology Transfer (FITT) IIT Delhi</span>
            <span>•</span>
            <span>License: MIT Open Source</span>
          </div>
        </div>
      </div>
    </div>
  );
};
