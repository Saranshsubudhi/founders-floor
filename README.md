# 🏢 FoundersFloor (FITT Virtual Office Space)

> **An open-source multi-floor virtual office platform for startup incubators.**
> Built for startup ecosystems like **FITT (Foundation for Innovation and Technology Transfer, IIT Delhi)**, where every founder has a dedicated physical workspace on a virtual floor, can run live agentic coding streams, and seamlessly connect with mentors, peers, and incubator leadership.

---

## 🌟 Key Highlights

- **2D Retro-Modern Office Floor Simulation**: Interactive HTML5 Canvas top-down architectural floor with desks, dual monitors, conference rooms, coffee bars, watercoolers, and elevator shafts.
- **Walkable Avatar System**: Control your avatar using `WASD` or Arrow keys, or click anywhere on the floor to walk there with smooth footstep sound synthesis.
- **Proximity Radar Interaction**: Walk within proximity of any founder's desk to trigger a dynamic speech bubble and hit `[E]` to inspect or start a meeting.
- **Multi-Floor Elevator System**:
  - **Floor 1**: *DeepTech & AI Launchpad* (Foundation models, edge neuromorphic silicon, autonomous rovers)
  - **Floor 2**: *BioTech, MedTech & Hardware Labs* (Diagnostics, biocatalysts, biosensors)
  - **Floor 3**: *FinTech, SaaS & Growth Startups* (Export FX, automated SOC2 compliance, eBPF tracing)
  - **Floor 4**: *FITT Executive Hub & Investor Boardroom* (Incubator leadership, EIRs, IP attorneys, NIDHI grants)
- **Desk Command Center**:
  - **Overview & Pitch Deck**: Multi-slide investor pitch viewer with traction benchmarks.
  - **Live Agent Terminal**: Byte-for-byte terminal stream showing real-time agentic commits, test passes, and compile logs powered by an `xterm.js` / `node-pty` harness.
  - **Desk Mailbox & Flying Envelopes**: Send notes or grant reviews; watch envelopes physically take flight in a parabolic curve across the 2D floor to the recipient's desk with sound effects!
  - **FITT Incubation Milestones**: Track and approve NIDHI-SSS / BIRAC grant tranches with celebratory confetti.
- **Interactive 1:1 Meeting Room**:
  - Dual webcam video tiles with live audio wave indicators.
  - Synchronized screen share pitch deck presentation mode.
  - Real-time meeting agenda checklist & auto-saving minutes ledger.
  - Live meeting chat with quick reaction emojis.
  - Formal FITT grant sign-off button.
- **FITT Command Suite**:
  - Broadcast PA intercom announcements to all floors with retro airport chimes.
  - Filter and manage incubator cohort metrics (₹4.25+ Crores disbursed, 9 patents filed).
- **Open-Source Workspace Claiming**:
  - Any founder can claim an open desk on any floor, customize their startup profile, choose an avatar and spawn directly onto the office grid.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/founders-floor/founders-floor.git

# Enter project directory
cd founders-floor

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser at `http://localhost:5173/`.

---

## 🧱 Architecture & Project Structure

```
founders-floor/
├── src/
│   ├── types/
│   │   └── index.ts                 # TypeScript data contracts (Founders, Floors, Meetings)
│   ├── data/
│   │   └── initialData.ts           # Realistic seed data for 4 floors & 16 startup founders
│   ├── services/
│   │   └── soundEffects.ts          # Standalone Web Audio API sound synthesizer
│   ├── components/
│   │   ├── OfficeFloorCanvas.tsx    # 2D interactive canvas floor simulation & avatars
│   │   ├── HeaderBar.tsx            # Elevator floor switcher, search, role controls
│   │   ├── DeskDetailModal.tsx      # Desk Command Center (Pitch, Terminal, Mailbox)
│   │   ├── InteractiveMeetingModal.tsx # Video conference, screen share & grant sign-off
│   │   ├── FloorSwitcherElevatorModal.tsx # Vintage Otis elevator floor panel
│   │   ├── ClaimDeskModal.tsx       # Open-source startup desk claim wizard
│   │   ├── FITTCommandCenterModal.tsx # Intercom PA broadcaster & cohort roster
│   │   └── OpenSourceFloorInfoModal.tsx # Architecture and git guide
│   ├── App.tsx                      # Root application controller
│   ├── App.css                      # Neo-brutalist styling
│   └── index.css                    # CSS tokens, typography & reset
├── index.html
└── package.json
```

---

## 🎨 Design Philosophy

Adopts a **neo-brutalist warm paper** design language:
- **Canvas**: Cream & warm paper background (`#FFFDF8`, `#F5EFE1`).
- **Borders & Shadows**: Crisp ink outlines (`2px solid #1A1A1A`) and hard offset shadows (`4px 4px 0 #1A1A1A`) with zero blur.
- **Typography**: `JetBrains Mono` for structural headers, metrics, and code; `Plus Jakarta Sans` for readable body text.
- **Accents**: FITT Crimson (`#9E1B32`), Golden Yellow CTA (`#FFDE59`), and pastel station blocks (Lilac, Mint, Peach, Sky).

---

## 📜 License & Ecosystem

- Licensed under the **MIT License**.
- Dedicated to the startup ecosystem at **FITT (Foundation for Innovation and Technology Transfer), IIT Delhi**.
