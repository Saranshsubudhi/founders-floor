import type { Floor, FITTTeamMember, Announcement } from '../types';

export const INITIAL_FITT_TEAM: FITTTeamMember[] = [
  {
    id: 'fitt-1',
    name: 'Dr. Anil Varma',
    title: 'Managing Director, FITT',
    department: 'Incubation Executive Board',
    email: 'anil.varma@fitt-iitd.in',
    avatar: {
      skinTone: '#E0AC69',
      hairColor: '#2B2B2B',
      shirtColor: '#8A1C2E',
      accessory: 'glasses',
      genderStyle: 'short_hair'
    },
    status: 'online',
    officeDeskCoord: { x: 745, y: 170 }
  },
  {
    id: 'fitt-2',
    name: 'Priya Sharma',
    title: 'Head of Startup Incubation & EIR',
    department: 'Founder Relations & Cohorts',
    email: 'priya.s@fitt-iitd.in',
    avatar: {
      skinTone: '#F1C27D',
      hairColor: '#1A1A1A',
      shirtColor: '#2E5B88',
      accessory: 'glasses',
      genderStyle: 'long_hair'
    },
    status: 'online',
    officeDeskCoord: { x: 745, y: 230 }
  },
  {
    id: 'fitt-3',
    name: 'Vikramaditya Roy',
    title: 'Chief Seed Fund Evaluator',
    department: 'Venture Capital & Grant Allocations',
    email: 'vikram.roy@fitt-iitd.in',
    avatar: {
      skinTone: '#C68642',
      hairColor: '#4A3B32',
      shirtColor: '#2A7B62',
      accessory: 'none',
      genderStyle: 'short_hair'
    },
    status: 'online',
    officeDeskCoord: { x: 745, y: 290 }
  },
  {
    id: 'fitt-4',
    name: 'Adv. Neha Gupta',
    title: 'Patent & IPR General Counsel',
    department: 'Intellectual Property Cell',
    email: 'neha.ipr@fitt-iitd.in',
    avatar: {
      skinTone: '#FFDBAC',
      hairColor: '#3D2314',
      shirtColor: '#784384',
      accessory: 'glasses',
      genderStyle: 'curly'
    },
    status: 'reviewing_grants',
    officeDeskCoord: { x: 745, y: 350 }
  },
  {
    id: 'fitt-5',
    name: 'Siddharth Bose',
    title: 'TDB & NIDHI Grant Officer',
    department: 'Government DeepTech Grants',
    email: 'siddharth.b@fitt-iitd.in',
    avatar: {
      skinTone: '#D4AA7D',
      hairColor: '#1C1C1C',
      shirtColor: '#D97706',
      accessory: 'headphones',
      genderStyle: 'short_hair'
    },
    status: 'in_office_hours',
    officeDeskCoord: { x: 745, y: 410 }
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    text: '📢 Seed Pitch Rehearsals today at 4:30 PM in Floor 4 Vikram Sarabhai Boardroom. Mentors and Angels attending.',
    author: 'Priya Sharma',
    authorRole: 'Head of Startup Incubation',
    floorId: 'all',
    timestamp: '11:45 AM',
    urgent: true
  },
  {
    id: 'ann-2',
    text: '💡 NIDHI-SSS ₹25L Grant tranche approvals are being finalized. Check your desk mailbox for sign-off forms.',
    author: 'Vikramaditya Roy',
    authorRole: 'Chief Seed Fund Evaluator',
    floorId: 'all',
    timestamp: '10:15 AM',
    urgent: false
  },
  {
    id: 'ann-3',
    text: '🚀 Hardware Prototyping Lab & 3D Printer Farm upgraded on Floor 1. Submit CAD print requests to Kabir or Pooja.',
    author: 'Kabir Singhania',
    authorRole: 'Q-Robotics & Lab Lead',
    floorId: 'all',
    timestamp: '09:30 AM',
    urgent: false
  }
];

export const INITIAL_FLOORS: Floor[] = [
  // =========================================================================
  // FLOOR 1: DeepTech & AI Launchpad
  // =========================================================================
  {
    id: 1,
    name: 'Floor 1 — DeepTech & AI Launchpad',
    badge: 'AI & SILICON POD',
    subtitle: 'Autonomous agents, foundation models, robotics & quantum simulators',
    description: 'Home to IIT Delhi incubatees engineering agentic software, neural chips, and autonomous systems.',
    accentColor: '#4F46E5',
    tagColor: '#E0E7FF',
    rooms: [
      {
        id: 'room-101',
        name: 'Alan Turing AI Lab',
        floorId: 1,
        capacity: 8,
        isOccupied: false,
        x: 50,
        y: 35,
        width: 230,
        height: 135,
        type: 'huddle_pod'
      },
      {
        id: 'room-102',
        name: 'GPU Cluster Server Alcove',
        floorId: 1,
        capacity: 4,
        isOccupied: true,
        currentMeeting: 'NeuroSynthetix Benchmarking',
        x: 295,
        y: 35,
        width: 180,
        height: 135,
        type: 'lab'
      }
    ],
    commonAreas: [
      {
        id: 'cluster-1',
        name: 'H100 Neural GPU Cluster',
        type: 'server_room',
        x: 490,
        y: 35,
        width: 245,
        height: 135,
        badge: 'AI COMPUTE',
        subtext: '48x H100 SXM5 Racks',
        interactEmote: '⚡ H100 Cluster: 94% utilized running transformer pretraining!'
      },
      {
        id: 'elev-1',
        name: 'High-Speed Lift Bay',
        type: 'elevator',
        x: 755,
        y: 35,
        width: 125,
        height: 110
      },
      {
        id: 'bench-1',
        name: '3D Printer Farm & Robotics Bench',
        type: 'prototyping_bench',
        x: 700,
        y: 165,
        width: 200,
        height: 120,
        badge: 'FAB LAB',
        subtext: 'Rapid Carbon Extrusion',
        interactEmote: '🖨️ 3D Printing drone propeller prototype (92% extruded)!'
      },
      {
        id: 'board-1',
        name: 'AI Architecture & Sprint Board',
        type: 'whiteboard',
        x: 700,
        y: 295,
        width: 200,
        height: 125,
        badge: 'BRAINSTORM',
        subtext: 'Neural Mesh Architecture',
        interactEmote: '📋 Brainstorm Wall: Deploy 4-bit quantized weights to edge TPU!'
      },
      {
        id: 'cafe-1',
        name: 'Neural Caffeine Bar',
        type: 'coffee_bar',
        x: 50,
        y: 450,
        width: 175,
        height: 130,
        interactEmote: '☕ Grabbed freshly brewed double espresso at the Neural Bar!'
      },
      {
        id: 'lounge-1',
        name: 'DeepTech Founder Chill Lounge',
        type: 'lounge',
        x: 245,
        y: 455,
        width: 250,
        height: 125,
        badge: 'ZEN LOUNGE',
        subtext: 'Beanbags & Tech Books',
        interactEmote: '🛋️ Relaxing on the beanbag lounge reading YC Playbook.'
      },
      {
        id: 'water-1',
        name: 'High-Speed Hydration Well',
        type: 'watercooler',
        x: 515,
        y: 460,
        width: 110,
        height: 115,
        interactEmote: '💧 Cold filtered water. Hydrated and ready to write kernels!'
      },
      {
        id: 'arena-1',
        name: 'Robotics Swarm Testing Arena',
        type: 'special_arena',
        x: 645,
        y: 455,
        width: 255,
        height: 125,
        badge: 'ROVER ARENA',
        subtext: 'Obstacle Course & Dock',
        interactEmote: '🤖 Autonomous Rover Mk-3 docking test in progress!'
      }
    ],
    founders: [
      {
        id: 'founder-1',
        name: 'Aarav Mehta',
        role: 'Founder & AI Architect',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#1A1A1A',
          shirtColor: '#4F46E5',
          accessory: 'headphones',
          genderStyle: 'short_hair'
        },
        startupName: 'NeuroSynthetix',
        tagline: 'Edge AI inference compiler for neuromorphic sensors',
        description: 'Compressing 70B parameter models down to 2-watt edge hardware for micro-drones and industrial IoT.',
        sector: 'AI & DeepTech',
        floorId: 1,
        deskNumber: 101,
        deskCoord: { x: 100, y: 215 },
        status: 'coding',
        statusMessage: 'Profiling CUDA tensor cores on Jetson Orin',
        stage: 'Seed',
        mrr: '$14,200',
        teamSize: 5,
        techStack: ['PyTorch', 'Rust', 'CUDA', 'Triton', 'TensorRT'],
        fittIncubatedSince: 'Jan 2025',
        fittGrantAwarded: '₹25,00,000 (NIDHI-SSS)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'NeuroSynthetix: Intelligence at the Silicon Edge',
          slides: [
            {
              title: 'The Edge Latency Barrier',
              subtitle: 'Cloud round-trips kill robotics and autonomous flight',
              points: [
                'Current edge devices suffer from 120ms network latency to centralized LLM APIs',
                'NeuroSynthetix delivers sub-5ms local token streaming on $99 embedded silicon',
                'Zero bandwidth cost with total on-prem privacy'
              ],
              metric: '<5ms Latency'
            },
            {
              title: 'Traction & Hardware Benchmarks',
              subtitle: 'Benchmarked across 4 autonomous drone manufacturers',
              points: [
                '3x power efficiency over standard TensorRT-LLM',
                'Signed pilots with 2 Indian defence drone suppliers',
                'Secured ₹25L NIDHI-SSS seed tranche from FITT'
              ],
              metric: '3x Power Gain'
            }
          ]
        },
        milestones: [
          { id: 'm1', title: 'Compile Llama-3 8B onto Jetson Orin Nano', targetDate: 'Q1 2025', completed: true, grantTranche: 'Tranche 1', approvedBy: 'Dr. Anil Varma' },
          { id: 'm2', title: 'Hardware-in-the-Loop Flight Test', targetDate: 'Q2 2025', completed: true, grantTranche: 'Tranche 2', approvedBy: 'Priya Sharma' },
          { id: 'm3', title: 'Deploy on 100 Commercial Drones', targetDate: 'Q3 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'l1', time: '11:42:01', text: 'nvcc -O3 neuro_kernel.cu -o neuro_kernel.o', type: 'commit' },
          { id: 'l2', time: '11:45:12', text: 'bench_run: 48.2 tokens/sec on 12W power ceiling', type: 'success' },
          { id: 'l3', time: '11:48:33', text: 'fitt_grant_audit: signed tranche 2 utilization certificate', type: 'info' }
        ],
        mailbox: [
          {
            id: 'm-ns-1',
            from: 'Priya Sharma',
            fromRole: 'Head of Startup Incubation',
            subject: 'FITT Seed Grant Tranche 2 Sign-off',
            body: 'Aarav, your utilization certificate for the ₹12.5L second tranche has been approved by the committee. The funds will be credited to NeuroSynthetix account by Thursday.',
            time: '10:30 AM',
            unread: true,
            type: 'fitt_grant'
          }
        ]
      },
      {
        id: 'founder-2',
        name: 'Tanvi Kulkarni',
        role: 'Co-Founder & System Lead',
        avatar: {
          skinTone: '#F1C27D',
          hairColor: '#3A2016',
          shirtColor: '#059669',
          accessory: 'glasses',
          genderStyle: 'long_hair'
        },
        startupName: 'AgenticMesh',
        tagline: 'Decentralized blackboard protocol for autonomous AI coding swarms',
        description: 'Enabling groups of autonomous AI developers to collaborate on enterprise codebases with shared semantic memory.',
        sector: 'AI & DeepTech',
        floorId: 1,
        deskNumber: 102,
        deskCoord: { x: 250, y: 215 },
        status: 'open_for_chat',
        statusMessage: 'Reviewing PR for PTY terminal orchestration',
        stage: 'Early Revenue',
        mrr: '$28,400',
        teamSize: 4,
        techStack: ['TypeScript', 'Rust', 'WebAssembly', 'LibP2P', 'SQLite'],
        fittIncubatedSince: 'Nov 2024',
        fittGrantAwarded: '₹20,00,000 (PRISM Grant)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'AgenticMesh: Orchestrating Autonomous Swarms',
          slides: [
            {
              title: 'Agent Isolation vs Swarm Synergy',
              subtitle: 'Today’s coding agents work in silos',
              points: [
                'Developers run 4 different terminal CLIs with zero shared context',
                'AgenticMesh creates an in-memory blackboard and mailbox routing layer',
                'Autonomous work sessions continue even while the human is asleep'
              ],
              metric: '4x Developer Velocity'
            }
          ]
        },
        milestones: [
          { id: 'am1', title: 'Core Multi-PTY Orchestrator Release', targetDate: 'Q1 2025', completed: true, grantTranche: 'Tranche 1' },
          { id: 'am2', title: '5 Enterprise Pilot Deployments', targetDate: 'Q2 2025', completed: true, grantTranche: 'Tranche 2' }
        ],
        terminalLogs: [
          { id: 'al1', time: '11:30:11', text: 'agent_daemon: routing message from #claude to #gemini_critic', type: 'info' },
          { id: 'al2', time: '11:34:40', text: 'git push origin main (v0.4.2 released)', type: 'commit' }
        ],
        mailbox: []
      },
      {
        id: 'founder-3',
        name: 'Kabir Singhania',
        role: 'Founder & Robotics Lead',
        avatar: {
          skinTone: '#C68642',
          hairColor: '#2B2B2B',
          shirtColor: '#DC2626',
          accessory: 'cap',
          genderStyle: 'short_hair'
        },
        startupName: 'Q-Robotics',
        tagline: 'Autonomous precision mobile manipulators for cleanrooms',
        description: 'Sub-millimeter autonomous rovers navigating semiconductor and bio-tech cleanrooms without magnetic tape.',
        sector: 'Hardware & Robotics',
        floorId: 1,
        deskNumber: 103,
        deskCoord: { x: 400, y: 215 },
        status: 'deep_focus',
        statusMessage: 'Calibrating lidar SLAM filters on Rover Mk-3',
        stage: 'Prototype',
        mrr: '$0 (Pre-rev)',
        teamSize: 6,
        techStack: ['ROS 2', 'C++', 'Gazebo', 'RTAB-Map', 'SolidWorks'],
        fittIncubatedSince: 'Aug 2024',
        fittGrantAwarded: '₹30,00,000 (BIG BIRAC / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'Q-Robotics: Cleanroom Automation',
          slides: [
            {
              title: 'Cleanroom Human Contamination',
              subtitle: '78% of silicon wafer defects arise from human shed',
              points: [
                'Manual wafer transport leads to millions in yield loss',
                'Q-Rover offers ISO Class 1 certified autonomous manipulation',
                'Proprietary non-magnetic SLAM with sub-millimeter precision docking'
              ],
              metric: '0.2mm Docking Accuracy'
            }
          ]
        },
        milestones: [
          { id: 'qr1', title: 'Chassis Fabrication at IITD Central Workshop', targetDate: 'Q4 2024', completed: true },
          { id: 'qr2', title: 'ISO Class 1 Particle Chamber Test', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'ql1', time: '11:15:02', text: 'ros2 launch q_robotics_bringup slam.launch.py', type: 'info' },
          { id: 'ql2', time: '11:22:45', text: 'lidar_odom_error: 0.003m within tolerance', type: 'success' }
        ],
        mailbox: []
      },
      {
        id: 'founder-4',
        name: 'Rhea Deshmukh',
        role: 'Chief Quantum Scientist',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#4A2C2A',
          shirtColor: '#9333EA',
          accessory: 'glasses',
          genderStyle: 'curly'
        },
        startupName: 'PhotonAI',
        tagline: 'Silicon photonics matrix multipliers for AI data centers',
        description: 'Replacing copper interconnects with waveguide optics to reduce generative AI inference power consumption by 90%.',
        sector: 'AI & DeepTech',
        floorId: 1,
        deskNumber: 104,
        deskCoord: { x: 550, y: 215 },
        status: 'seeking_grant',
        statusMessage: 'Drafting Semi-Conductor Mission Grant proposal',
        stage: 'Ideation',
        mrr: '$0',
        teamSize: 3,
        techStack: ['Lumerical', 'Python', 'KLayout', 'Cadence', 'Verilog-A'],
        fittIncubatedSince: 'Feb 2025',
        fittGrantAwarded: '₹10,00,000 (FITT Seed Exploratory)',
        fittGrantApproved: false,
        pitchDeck: {
          title: 'PhotonAI: Light-Speed Deep Learning',
          slides: [
            {
              title: 'The AI Power Wall',
              subtitle: 'Data centers will consume 8% of global electricity by 2030',
              points: [
                'Electrical interconnects generate massive thermal waste',
                'Optical matrix multiplication occurs at the speed of light with near-zero heat',
                'Fabrication compatible with standard 28nm CMOS foundries'
              ],
              metric: '10x Energy Efficiency'
            }
          ]
        },
        milestones: [
          { id: 'p1', title: 'Photonic Ring Resonator Simulation', targetDate: 'Q1 2025', completed: true },
          { id: 'p2', title: 'Foundry Tape-out with TSMC/Tower', targetDate: 'Q4 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'pl1', time: '10:50:11', text: 'fdtd_sim: waveguide loss = 0.8dB/cm @ 1550nm', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-105',
        name: 'Ananya Rao',
        role: 'Founder & CV Architect',
        avatar: {
          skinTone: '#FFDBAC',
          hairColor: '#1A1A1A',
          shirtColor: '#059669',
          accessory: 'glasses',
          genderStyle: 'curly'
        },
        startupName: 'VoxelVision',
        tagline: 'Real-time 3D Gaussian splatting for industrial inspection drones',
        description: 'Reconstructing industrial plants into millimeter-accurate photorealistic 3D digital twins from drone flight video in under 60 seconds.',
        sector: 'AI & DeepTech',
        floorId: 1,
        deskNumber: 105,
        deskCoord: { x: 100, y: 335 },
        status: 'coding',
        statusMessage: 'Quantizing 3DGS radiance field for Nvidia Orin edge',
        stage: 'Seed',
        mrr: '$14,800',
        teamSize: 5,
        techStack: ['PyTorch', 'CUDA C++', '3D Gaussian Splatting', 'ROS 2', 'Nvidia Jetson'],
        fittIncubatedSince: 'Oct 2024',
        fittGrantAwarded: '₹25,00,000 (DST NIDHI-SSS)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'VoxelVision: Real-time Photorealistic 3D Twins',
          slides: [
            {
              title: 'Industrial Asset Inspection Downtime',
              subtitle: 'Refineries lose $2M daily during manual scaffolding inspections',
              points: [
                'Photogrammetry takes 8 hours of cloud compute per plant section',
                'VoxelVision 3D Gaussian Splatting reconstructs sub-millimeter corrosion in 60 seconds',
                'Runs entirely offline on an edge ruggedized drone box'
              ],
              metric: '60s 3D Reconstruction'
            }
          ]
        },
        milestones: [
          { id: 'vv1', title: 'ONNX 3DGS Engine Deployment', targetDate: 'Q4 2024', completed: true },
          { id: 'vv2', title: 'HPCL Refinery Pilot Testing', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'vvl1', time: '11:12:00', text: 'gaussian_rasterize: 1.2M splats rendered @ 85 FPS', type: 'success' },
          { id: 'vvl2', time: '11:29:40', text: 'depth_error_map: residual variance < 0.4mm across pipeline weld', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-106',
        name: 'Nikhil Nair',
        role: 'Co-Founder & Speech Scientist',
        avatar: {
          skinTone: '#C68642',
          hairColor: '#3B2016',
          shirtColor: '#F59E0B',
          accessory: 'headphones',
          genderStyle: 'short_hair'
        },
        startupName: 'SynthiaVoice',
        tagline: 'Zero-shot voice synthesis in 14 Indian languages with emotional nuance',
        description: 'Low-latency diffusion vocoders powering conversational banking IVR and AI agents in Hindi, Tamil, Telugu, and Bengali.',
        sector: 'AI & DeepTech',
        floorId: 1,
        deskNumber: 106,
        deskCoord: { x: 250, y: 335 },
        status: 'meeting',
        statusMessage: 'In pitch with Bhashini Gov portal consortium',
        stage: 'Early Revenue',
        mrr: '$21,000',
        teamSize: 6,
        techStack: ['Diffusion Vocoders', 'ONNX Runtime', 'Python', 'WebRTC', 'Triton'],
        fittIncubatedSince: 'Sep 2024',
        fittGrantAwarded: '₹30,00,000 (MeitY TIDE 2.0 / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'SynthiaVoice: Humanizing Indic Speech AI',
          slides: [
            {
              title: 'The Vernacular Voice Gap',
              subtitle: '70% of Indian internet users cannot use English voice bots',
              points: [
                'Legacy TTS systems sound robotic and lack native dialect inflections',
                'SynthiaVoice clones high-fidelity speaker voices with just 3 seconds of audio',
                'Sub-140ms time-to-first-audio on affordable CPU servers'
              ],
              metric: '140ms Latency'
            }
          ]
        },
        milestones: [
          { id: 'sv1', title: '14 Indic Phoneme Dictionary Release', targetDate: 'Q1 2025', completed: true },
          { id: 'sv2', title: 'Bhashini Government API Onboarding', targetDate: 'Q2 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'svl1', time: '10:48:00', text: 'vocoder_stream: audio chunk generated in 18ms (Hindi female speaker #4)', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-107',
        name: 'Devashish Sengupta',
        role: 'Founder & Quantum Theorist',
        avatar: {
          skinTone: '#D4AA7D',
          hairColor: '#2B2B2B',
          shirtColor: '#6366F1',
          accessory: 'glasses',
          genderStyle: 'short_hair'
        },
        startupName: 'QuBitra',
        tagline: 'Quantum annealing compiler for mega-fleet logistics routing',
        description: 'Solving NP-hard Traveling Salesperson and supply chain graph problems using hybrid classical-quantum annealing solvers.',
        sector: 'AI & DeepTech',
        floorId: 1,
        deskNumber: 107,
        deskCoord: { x: 400, y: 335 },
        status: 'deep_focus',
        statusMessage: 'Benchmarking QUBO Hamiltonian mapping on D-Wave',
        stage: 'Prototype',
        mrr: '$0',
        teamSize: 4,
        techStack: ['Qiskit', 'D-Wave Ocean', 'C++', 'Python', 'NumPy'],
        fittIncubatedSince: 'Dec 2024',
        fittGrantAwarded: '₹20,00,000 (National Quantum Mission / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'QuBitra: Quantum Supply Chain Optimization',
          slides: [
            {
              title: 'Combinatorial Explosion in Logistics',
              subtitle: 'Routing 1,000 delivery vehicles takes hours on classical supercomputers',
              points: [
                'QUBO reformulation unlocks sub-second global optimal solutions on quantum annealers',
                'Saves 18% in diesel fuel costs for interstate trucking logistics fleets',
                'Hybrid classical-quantum cloud API accessible via simple REST calls'
              ],
              metric: '18% Fuel Savings'
            }
          ]
        },
        milestones: [
          { id: 'qb1', title: 'QUBO Graph Mapping Algorithm Benchmark', targetDate: 'Q1 2025', completed: true },
          { id: 'qb2', title: 'Pilot with Delhivery Express', targetDate: 'Q3 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'qbl1', time: '11:05:12', text: 'dwave_solver: 2048 variables embedded on Pegasus topology', type: 'info' },
          { id: 'qbl2', time: '11:34:00', text: 'anneal_sample: minimum energy ground state found with 99.8% probability', type: 'success' }
        ],
        mailbox: []
      },
      {
        id: 'founder-108',
        name: 'Pooja Hegde',
        role: 'Co-Founder & Flight Autonomy Lead',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#1A1A1A',
          shirtColor: '#EF4444',
          accessory: 'cap',
          genderStyle: 'long_hair'
        },
        startupName: 'AeroSwarm',
        tagline: 'GPS-denied autonomous drone swarms for subterranean mining tunnels',
        description: 'Decentralized drone swarms exploring deep underground mines without GPS, radio signal, or human piloting.',
        sector: 'Hardware & Robotics',
        floorId: 1,
        deskNumber: 108,
        deskCoord: { x: 550, y: 335 },
        status: 'open_for_chat',
        statusMessage: 'Demoing optical flow indoor tunnel hold',
        stage: 'Seed',
        mrr: '$16,500',
        teamSize: 7,
        techStack: ['PX4 Autopilot', 'C++', 'MAVLink', 'Optical Flow', 'SolidWorks'],
        fittIncubatedSince: 'Jul 2024',
        fittGrantAwarded: '₹35,00,000 (iDEX Defence Innovation / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'AeroSwarm: Subterranean Autonomy',
          slides: [
            {
              title: 'Mining Disaster Risk',
              subtitle: 'Rescue workers risk lives entering unmapped cave-ins',
              points: [
                'AeroSwarm deploys 6 cooperative micro-quadrotors that map tunnels cooperatively',
                'Proprietary visual-inertial odometry resistant to dust, fog, and zero-light conditions',
                'Awarded iDEX defence innovation contract for tunnel reconnaissance'
              ],
              metric: '100% GPS-Free Autonomy'
            }
          ]
        },
        milestones: [
          { id: 'as1', title: 'Underground Coal Mine Autonomous Trial', targetDate: 'Q4 2024', completed: true },
          { id: 'as2', title: 'Production Swarm Delivery to Coal India', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'asl1', time: '11:15:30', text: 'swarm_mesh: 6 drones linked via 2.4GHz ad-hoc radio', type: 'info' },
          { id: 'asl2', time: '11:41:20', text: 'tunnel_explored: 450 meters 3D mapped with zero collisions', type: 'success' }
        ],
        mailbox: []
      }
    ]
  },

  // =========================================================================
  // FLOOR 2: BioTech, MedTech & Hardware Labs
  // =========================================================================
  {
    id: 2,
    name: 'Floor 2 — BioTech, MedTech & Hardware Labs',
    badge: 'LIFE SCIENCES WING',
    subtitle: 'Point-of-care diagnostics, synthetic biology, molecular therapeutics',
    description: 'Equipped with BSL-2 laminar hoods, spectrophotometers, and rapid prototyping 3D microfluidics.',
    accentColor: '#059669',
    tagColor: '#D1FAE5',
    rooms: [
      {
        id: 'room-201',
        name: 'CV Raman Analytical Cleanroom',
        floorId: 2,
        capacity: 10,
        isOccupied: false,
        x: 50,
        y: 35,
        width: 230,
        height: 135,
        type: 'lab'
      },
      {
        id: 'room-202',
        name: 'Clinical Validation Huddle',
        floorId: 2,
        capacity: 6,
        isOccupied: true,
        currentMeeting: 'NanoBioDx AIIMS Trial Review',
        x: 295,
        y: 35,
        width: 180,
        height: 135,
        type: 'huddle_pod'
      }
    ],
    commonAreas: [
      {
        id: 'sequencer-2',
        name: 'Genomic Sequencer & BSL-2 Hood Pod',
        type: 'feature_pod',
        x: 490,
        y: 35,
        width: 245,
        height: 135,
        badge: 'GENOMICS',
        subtext: 'NextSeq 2000 System',
        interactEmote: '🧬 NextGen Sequencer: 48M paired-end reads analyzed at Q30 quality!'
      },
      {
        id: 'elev-2',
        name: 'High-Speed Lift Bay',
        type: 'elevator',
        x: 755,
        y: 35,
        width: 125,
        height: 110
      },
      {
        id: 'coldvault-2',
        name: '-80°C Cryovault & Specimen Storage',
        type: 'prototyping_bench',
        x: 700,
        y: 165,
        width: 200,
        height: 120,
        badge: 'CRYO LAB',
        subtext: 'Ultra-low Bio Repository',
        interactEmote: '❄️ -80°C Cryovault: 450 clinical cardiac serum samples secured.'
      },
      {
        id: 'pipette-2',
        name: 'Micro-Pipetting & Centrifuge Bench',
        type: 'prototyping_bench',
        x: 700,
        y: 295,
        width: 200,
        height: 125,
        badge: 'CHEM LAB',
        subtext: 'Spectrophotometry Station',
        interactEmote: '🧪 Micro-pipetting: Enzyme catalytic run completed in 12.4 seconds!'
      },
      {
        id: 'cafe-2',
        name: 'Organic Herbal & Kombucha Bar',
        type: 'coffee_bar',
        x: 50,
        y: 450,
        width: 175,
        height: 130,
        interactEmote: '🍵 Poured fresh organic chamomile green tea with ginger honey!'
      },
      {
        id: 'lounge-2',
        name: 'BioTech Innovation Tea Lounge',
        type: 'lounge',
        x: 245,
        y: 455,
        width: 250,
        height: 125,
        badge: 'HERBAL LOUNGE',
        subtext: 'Nature BioTech & Tea Pod',
        interactEmote: '🛋️ Resting in the herbal lounge reviewing clinical trial protocol.'
      },
      {
        id: 'water-2',
        name: 'De-ionized Distilled Water Well',
        type: 'watercooler',
        x: 515,
        y: 460,
        width: 110,
        height: 115,
        interactEmote: '💧 Pure de-ionized milli-Q water. Ultra-pure for life science experiments!'
      },
      {
        id: 'botanical-2',
        name: 'Plant Tissue Culture Living Wall',
        type: 'special_arena',
        x: 645,
        y: 455,
        width: 255,
        height: 125,
        badge: 'BIO WALL',
        subtext: 'Vertical Hydroponics',
        interactEmote: '🌿 Hydroponic living wall: Therapeutic plant tissue culture thriving!'
      }
    ],
    founders: [
      {
        id: 'founder-5',
        name: 'Dr. Devika Sen',
        role: 'Founder & CSO',
        avatar: {
          skinTone: '#F1C27D',
          hairColor: '#1A1A1A',
          shirtColor: '#0D9488',
          accessory: 'glasses',
          genderStyle: 'long_hair'
        },
        startupName: 'NanoBioDx',
        tagline: '10-minute handheld microfluidic troponin biomarker reader',
        description: 'Point-of-care quantitative cardiac arrest detection for rural PHCs, saving vital golden-hour minutes.',
        sector: 'BioTech & Health',
        floorId: 2,
        deskNumber: 201,
        deskCoord: { x: 100, y: 215 },
        status: 'meeting',
        statusMessage: 'In clinical review with AIIMS cardiology team',
        stage: 'Early Revenue',
        mrr: '$19,500',
        teamSize: 8,
        techStack: ['Microfluidics', 'Embedded C', 'BLE 5.2', 'React Native', 'ISO 13485'],
        fittIncubatedSince: 'May 2024',
        fittGrantAwarded: '₹50,00,000 (BIRAC BIG + FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'NanoBioDx: Golden-Hour Diagnostics',
          slides: [
            {
              title: 'Cardiac Arrest in Rural India',
              subtitle: '70% of mortality occurs due to 4+ hour lab delays',
              points: [
                'Current chemiluminescence assays take 3 to 6 hours in centralized labs',
                'NanoBioDx handheld cartridge delivers lab-grade quantitative Troponin-I in 8 minutes',
                'Cost per test reduced by 82% ($3.50 vs $22)'
              ],
              metric: '8 Min Diagnostic Speed'
            }
          ]
        },
        milestones: [
          { id: 'nb1', title: 'Cartridge Mold Production', targetDate: 'Q3 2024', completed: true },
          { id: 'nb2', title: 'AIIMS Phase-1 Clinical Trial', targetDate: 'Q4 2024', completed: true, approvedBy: 'Dr. Anil Varma' }
        ],
        terminalLogs: [
          { id: 'nl1', time: '11:20:00', text: 'calibrating optical photodiode sensor array (channel 4)', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-6',
        name: 'Arjun Venkatesh',
        role: 'Co-Founder & Lead Chemist',
        avatar: {
          skinTone: '#C68642',
          hairColor: '#2B2B2B',
          shirtColor: '#10B981',
          accessory: 'none',
          genderStyle: 'short_hair'
        },
        startupName: 'BioForge',
        tagline: 'Engineered biocatalysts for green API pharma synthesis',
        description: 'Replacing heavy metal palladium catalysts with directed-evolution enzymes, cutting toxic pharmaceutical waste by 95%.',
        sector: 'BioTech & Health',
        floorId: 2,
        deskNumber: 202,
        deskCoord: { x: 250, y: 215 },
        status: 'open_for_chat',
        statusMessage: 'At desk analyzing bioreactor HPLC fraction peaks',
        stage: 'Seed',
        mrr: '$11,000',
        teamSize: 5,
        techStack: ['Directed Evolution', 'AlphaFold 3', 'HPLC', 'Fermentation'],
        fittIncubatedSince: 'Sep 2024',
        fittGrantAwarded: '₹25,00,000 (DBT / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'BioForge: Zero-Waste Pharma Chemistry',
          slides: [
            {
              title: 'Heavy Metal Catalyst Bottlenecks',
              subtitle: 'Pharma synthesis burns through billions in platinum-group metals',
              points: [
                'High greenhouse emissions and strict effluent norms restrict manufacturing',
                'BioForge uses machine-learning directed enzyme evolution to create tailored lipases',
                'Eliminates organic solvents while doubling chemical enantiomeric excess'
              ],
              metric: '95% Waste Reduction'
            }
          ]
        },
        milestones: [
          { id: 'bf1', title: '50-Liter Fermentation Run', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'bfl1', time: '10:45:00', text: 'bioreactor_temp: 37.1 C | dissolved_o2: 44%', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-7',
        name: 'Zoya Khan',
        role: 'Founder & Biomedical Engineer',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#1A1A1A',
          shirtColor: '#EC4899',
          accessory: 'headphones',
          genderStyle: 'long_hair'
        },
        startupName: 'CardioVibe',
        tagline: 'Continuous arterial stiffness patch with ultrasound array',
        description: 'Wearable adhesive patch using micromachined ultrasound transducers (PMUT) for continuous central blood pressure monitoring.',
        sector: 'BioTech & Health',
        floorId: 2,
        deskNumber: 203,
        deskCoord: { x: 400, y: 215 },
        status: 'coding',
        statusMessage: 'Signal processing filters on arterial pulse waves',
        stage: 'Prototype',
        mrr: '$0',
        teamSize: 4,
        techStack: ['PMUT MEMS', 'DSP', 'MATLAB', 'Nordic nRF5340', 'Swift'],
        fittIncubatedSince: 'Dec 2024',
        fittGrantAwarded: '₹20,00,000 (DST NIDHI-PRAYAS)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'CardioVibe: Wearable Hemodynamics',
          slides: [
            {
              title: 'Silent Cardiovascular Deterioration',
              subtitle: 'Cuff-based BP misses episodic nocturnal hypertension',
              points: [
                'Ultrasound patch measures deep carotid artery wall displacement in real time',
                'Unobtrusive 24-hour hemodynamic profiling for ICU and post-op recovery',
                'MEMS transducers manufactured using IIT Delhi Nanoscale Research Facility (NRF)'
              ],
              metric: '24-Hour Continuous BP'
            }
          ]
        },
        milestones: [
          { id: 'cv1', title: 'IITD NRF Cleanroom Transducer Fab', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'cvl1', time: '11:00:22', text: 'dsp_filter: bandpass 0.5Hz - 25Hz applied to carotid echo signal', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-8',
        name: 'Manish Rawat',
        role: 'Founder & Material Scientist',
        avatar: {
          skinTone: '#D4AA7D',
          hairColor: '#3A2016',
          shirtColor: '#EAB308',
          accessory: 'glasses',
          genderStyle: 'short_hair'
        },
        startupName: 'CelluGenix',
        tagline: 'Bacterial cellulose scaffolds for skin graft regeneration',
        description: 'Fermented bacterial cellulose membranes with micro-porosity designed for painless diabetic ulcer healing and burns.',
        sector: 'BioTech & Health',
        floorId: 2,
        deskNumber: 204,
        deskCoord: { x: 550, y: 215 },
        status: 'coffee',
        statusMessage: 'At herbal lounge discussing patent claims with Neha',
        stage: 'MVP / Pilot',
        mrr: '$4,200',
        teamSize: 3,
        techStack: ['Biopolymers', 'Microbiology', 'SEM Analysis', 'Hydrogels'],
        fittIncubatedSince: 'Jul 2024',
        fittGrantAwarded: '₹15,00,000 (FITT Innovation)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'CelluGenix: Painless Tissue Repair',
          slides: [
            {
              title: 'Chronic Diabetic Wounds',
              subtitle: 'Millions suffer from amputations due to non-healing ulcers',
              points: [
                'CelluGenix creates bio-compatible cellulose mesh with natural antimicrobial properties',
                '90% faster epithelialization in clinical evaluations',
                'Zero animal-derived collagen, vegan and culturally universally accepted'
              ],
              metric: '90% Faster Healing'
            }
          ]
        },
        milestones: [
          { id: 'cg1', title: 'Biocompatibility Cytotoxicity Assay ISO 10993', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'cgl1', time: '09:40:11', text: 'autoclave_cycle: 121 C for 30min completed for 500 batches', type: 'success' }
        ],
        mailbox: []
      },
      {
        id: 'founder-205',
        name: 'Dr. Pradeep Nair',
        role: 'Founder & Neuro-Engineer',
        avatar: {
          skinTone: '#C68642',
          hairColor: '#1A1A1A',
          shirtColor: '#8B5CF6',
          accessory: 'headphones',
          genderStyle: 'short_hair'
        },
        startupName: 'NeuroSync EEG',
        tagline: '64-channel wireless brain-computer interface headband',
        description: 'Dry-electrode BCI headband detecting absence seizures and neurological focus states in real time with edge ML.',
        sector: 'BioTech & Health',
        floorId: 2,
        deskNumber: 205,
        deskCoord: { x: 100, y: 335 },
        status: 'coding',
        statusMessage: 'Filtering 50Hz mains noise on motor-cortex EEG spikes',
        stage: 'Prototype',
        mrr: '$0',
        teamSize: 4,
        techStack: ['Analog AFE', 'DSP', 'Python MNE', 'Nordic BLE', 'ISO 60601'],
        fittIncubatedSince: 'Aug 2024',
        fittGrantAwarded: '₹25,00,000 (BIRAC BIG / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'NeuroSync: Wearable Brain Diagnostics',
          slides: [
            {
              title: 'Clinical EEG Inconvenience',
              subtitle: 'Conductive gels and 1-hour prep times prevent ambulatory monitoring',
              points: [
                'Dry polymer silver electrodes establish impedance under 15kΩ in seconds',
                'Real-time edge micro-controller flags epileptiform spikes 2 hours prior to clinical onset',
                'Designed for pediatric neuro-clinics and cognitive rehab'
              ],
              metric: '64 Dry Electrodes'
            }
          ]
        },
        milestones: [
          { id: 'ns1', title: 'Dry Electrode Impedance Characterization', targetDate: 'Q4 2024', completed: true },
          { id: 'ns2', title: 'Clinical Trial at AIIMS Neurology', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'nsl1', time: '11:04:19', text: 'eeg_stream: 64 channels streaming at 500Hz via BLE 5.3', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-206',
        name: 'Shweta Iyer',
        role: 'CSO & Molecular Biologist',
        avatar: {
          skinTone: '#F1C27D',
          hairColor: '#4A2C2A',
          shirtColor: '#10B981',
          accessory: 'glasses',
          genderStyle: 'long_hair'
        },
        startupName: 'GeneTarget CRISPR',
        tagline: 'Targeted epigenetic Cas13 vectors for rare genetic RNA therapeutics',
        description: 'Programmable RNA-targeting CRISPR enzymes correcting splicing defects without double-stranded DNA breaks.',
        sector: 'BioTech & Health',
        floorId: 2,
        deskNumber: 206,
        deskCoord: { x: 250, y: 335 },
        status: 'meeting',
        statusMessage: 'Reviewing off-target sequencing with AIIMS genetics',
        stage: 'Seed',
        mrr: '$15,000',
        teamSize: 5,
        techStack: ['Cas13d', 'NGS', 'BioPython', 'AlphaFold', 'Flow Cytometry'],
        fittIncubatedSince: 'Oct 2024',
        fittGrantAwarded: '₹40,00,000 (DBT / FITT Healthcare)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'GeneTarget: Reversible Epigenetic Medicine',
          slides: [
            {
              title: 'Permanent DNA Editing Risks',
              subtitle: 'Off-target Cas9 double-stranded cuts cause chromosomal translocations',
              points: [
                'Cas13d transiently edits mRNA transcripts with zero genomic DNA alterations',
                'Lipid nanoparticle delivery system engineered at IIT Delhi chemical labs',
                'Orphan drug designation pathway targeted for spinal muscular atrophy'
              ],
              metric: 'Zero Genomic Cuts'
            }
          ]
        },
        milestones: [
          { id: 'gt1', title: 'In-vitro Cas13 Knockdown Assay (96% efficiency)', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'gtl1', time: '10:55:00', text: 'off_target_scan: 0 unintended splice alterations in human primary fibroblasts', type: 'success' }
        ],
        mailbox: []
      },
      {
        id: 'founder-207',
        name: 'Varun Kulkarni',
        role: 'Co-Founder & Biomechatronics Lead',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#2B2B2B',
          shirtColor: '#3B82F6',
          accessory: 'none',
          genderStyle: 'short_hair'
        },
        startupName: 'BionicLimb',
        tagline: 'AI myoelectric prosthetic hand with closed-loop haptic touch feedback',
        description: 'Multi-articulated carbon-fiber bionic hand translating residual forearm nerve signals into individual finger dexterity.',
        sector: 'Hardware & Robotics',
        floorId: 2,
        deskNumber: 207,
        deskCoord: { x: 400, y: 335 },
        status: 'deep_focus',
        statusMessage: 'Calibrating tendon tension sensors on prosthetic fingers',
        stage: 'MVP / Pilot',
        mrr: '$9,200',
        teamSize: 6,
        techStack: ['SolidWorks', 'sEMG', 'Embedded C', '3D Printing Nylon', 'BLDC Motors'],
        fittIncubatedSince: 'Jul 2024',
        fittGrantAwarded: '₹30,00,000 (TDB / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'BionicLimb: Restoring Natural Grasp',
          slides: [
            {
              title: 'Prohibitive Cost of Imported Prosthetics',
              subtitle: 'Imported bionic hands cost ₹25+ Lakhs ($30,000)',
              points: [
                'BionicLimb delivers 14 programmable grasp patterns at 1/10th the cost (₹2.2 Lakhs)',
                'Haptic vibration actuators on the residual limb allow amputees to feel fragile eggs',
                'Custom socket 3D-scanned and printed in 4 hours'
              ],
              metric: '1/10th Market Cost'
            }
          ]
        },
        milestones: [
          { id: 'bl1', title: '14-Grasp AI Pattern Recognition Accuracy > 98%', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'bll1', time: '11:18:22', text: 'emg_calib: pinch grasp response latency = 42ms', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-208',
        name: 'Dr. Ananya Mukherjee',
        role: 'Founder & Oncologist',
        avatar: {
          skinTone: '#FFDBAC',
          hairColor: '#1C1C1C',
          shirtColor: '#EC4899',
          accessory: 'glasses',
          genderStyle: 'curly'
        },
        startupName: 'OncoDetect',
        tagline: 'Liquid biopsy microfluidic chip detecting circulating tumor DNA (ctDNA)',
        description: 'Ultra-sensitive droplet digital microfluidic cartridge detecting cancer recurrence from a routine 5mL blood draw 9 months earlier than CT scans.',
        sector: 'BioTech & Health',
        floorId: 2,
        deskNumber: 208,
        deskCoord: { x: 550, y: 335 },
        status: 'seeking_grant',
        statusMessage: 'Drafting ICMR oncology multicentric validation proposal',
        stage: 'Seed',
        mrr: '$12,000',
        teamSize: 5,
        techStack: ['Digital PCR', 'Microfluidics', 'NextSeq', 'R Bioconductor'],
        fittIncubatedSince: 'Nov 2024',
        fittGrantAwarded: '₹35,00,000 (BIRAC / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'OncoDetect: Earliest Cancer Recurrence Interception',
          slides: [
            {
              title: 'The Radiation & Scan Blindspot',
              subtitle: 'Tumors must grow to 5mm before conventional PET/CT scans detect them',
              points: [
                'OncoDetect counts single mutant ctDNA fragments in plasma down to 0.01% variant allele frequency',
                'Gives oncologists a 9-month headstart to initiate targeted adjuvant therapies',
                'Completed 200-sample pilot trial with Rajiv Gandhi Cancer Institute'
              ],
              metric: '0.01% ctDNA Limit'
            }
          ]
        },
        milestones: [
          { id: 'od1', title: 'Silicon Droplet Generator Tape-out', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'odl1', time: '10:35:10', text: 'ddpcr_reader: 20,000 micro-droplets scanned per sample in 90 seconds', type: 'success' }
        ],
        mailbox: []
      }
    ]
  },

  // =========================================================================
  // FLOOR 3: FinTech, SaaS & Growth Startups
  // =========================================================================
  {
    id: 3,
    name: 'Floor 3 — FinTech, SaaS & Growth Startups',
    badge: 'COMMERCE & SCALE TOWER',
    subtitle: 'Cross-border payment corridors, automated compliance, developer tooling',
    description: 'High-energy floor housing high-velocity SaaS products, B2B marketplaces, and automated ledger infrastructure.',
    accentColor: '#2563EB',
    tagColor: '#DBEAFE',
    rooms: [
      {
        id: 'room-301',
        name: 'Growth Metrics War Room',
        floorId: 3,
        capacity: 8,
        isOccupied: false,
        x: 50,
        y: 35,
        width: 230,
        height: 135,
        type: 'boardroom'
      },
      {
        id: 'room-302',
        name: 'Investor Pitch Booth',
        floorId: 3,
        capacity: 4,
        isOccupied: false,
        x: 295,
        y: 35,
        width: 180,
        height: 135,
        type: 'pitch_hall'
      }
    ],
    commonAreas: [
      {
        id: 'ticker-3',
        name: 'Global Liquidity & Live Ticker Wall',
        type: 'feature_pod',
        x: 490,
        y: 35,
        width: 245,
        height: 135,
        badge: 'WAR ROOM',
        subtext: 'Live UPI/SEPA Ticker',
        interactEmote: '📈 War Room Display: PayFlow settled $142k across 320 global wire transfers!'
      },
      {
        id: 'elev-3',
        name: 'High-Speed Lift Bay',
        type: 'elevator',
        x: 755,
        y: 35,
        width: 125,
        height: 110
      },
      {
        id: 'arcade-3',
        name: 'Retro Founder Arcade (FOUNDER KOMBAT)',
        type: 'arcade',
        x: 700,
        y: 165,
        width: 200,
        height: 120,
        badge: 'ARCADE',
        subtext: 'High Score: 142k pts',
        interactEmote: '🕹️ Inserted token into FOUNDER KOMBAT! High Score: 142,000 pts (CloudSentry)!'
      },
      {
        id: 'pingpong-3',
        name: 'Championship Founder Table Tennis',
        type: 'pingpong',
        x: 700,
        y: 295,
        width: 200,
        height: 125,
        badge: 'PING PONG',
        subtext: 'Live Match: Rohan vs Karan',
        interactEmote: '🏓 Table Tennis Break! Fast rally: Rohan defeated Karan 21-19 in deuce!'
      },
      {
        id: 'cafe-3',
        name: 'Nitro Cold Brew & Energy Bar',
        type: 'coffee_bar',
        x: 50,
        y: 450,
        width: 175,
        height: 130,
        interactEmote: '☕ Poured a chilled nitro cold brew on tap with creamy foam!'
      },
      {
        id: 'lounge-3',
        name: 'SaaS Brainstorm Beanbag Pit',
        type: 'lounge',
        x: 245,
        y: 455,
        width: 250,
        height: 125,
        badge: 'SAAS LOUNGE',
        subtext: 'PLG Loops & Metrics',
        interactEmote: '🛋️ Resting in the SaaS beanbag pit discussing PLG conversion loops.'
      },
      {
        id: 'water-3',
        name: 'Sparkling Mineral Water Well',
        type: 'watercooler',
        x: 515,
        y: 460,
        width: 110,
        height: 115,
        interactEmote: '💧 Chilled sparkling mineral water with lime essence!'
      },
      {
        id: 'podcast-3',
        name: 'Founder Pitch Stage & Podcast Studio',
        type: 'special_arena',
        x: 645,
        y: 455,
        width: 255,
        height: 125,
        badge: 'STUDIO',
        subtext: '● ON AIR Live Stream',
        interactEmote: '🎙️ Podcast Studio: Recording "Founders Floor Ep. 42: Scaling to $1M ARR"!'
      }
    ],
    founders: [
      {
        id: 'founder-9',
        name: 'Rohan Mehra',
        role: 'CEO & Founder',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#1A1A1A',
          shirtColor: '#2563EB',
          accessory: 'glasses',
          genderStyle: 'short_hair'
        },
        startupName: 'PayFlow Global',
        tagline: 'Instant cross-border B2B settlement on UPI rails',
        description: 'Connecting Indian exporters directly to European SEPA and US FedNow corridors with automated e-BRC generation.',
        sector: 'FinTech & Web3',
        floorId: 3,
        deskNumber: 301,
        deskCoord: { x: 100, y: 215 },
        status: 'coding',
        statusMessage: 'Integrating RBI regulatory sandbox webhook verification',
        stage: 'Growth',
        mrr: '$48,000',
        teamSize: 12,
        techStack: ['Go', 'PostgreSQL', 'Kafka', 'React', 'Docker'],
        fittIncubatedSince: 'Mar 2024',
        fittGrantAwarded: '₹25,00,000 (FITT Seed)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'PayFlow Global: Zero-Spread Export FX',
          slides: [
            {
              title: 'The Indian Exporter FX Drag',
              subtitle: 'SWIFT wire fees and 3.5% FX spreads bleed SME exporters dry',
              points: [
                'Small engineering exporters lose $12B annually in opaque conversion fees',
                'PayFlow provides sub-30-minute settlement directly into local INR current accounts',
                'Automated EDPMS reconciliation with customs portal'
              ],
              metric: '$4.2M Monthly Volume'
            }
          ]
        },
        milestones: [
          { id: 'pf1', title: 'RBI Regulatory Sandbox Cohort Entry', targetDate: 'Q2 2024', completed: true },
          { id: 'pf2', title: '$1M Monthly Processing Volume', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'pfl1', time: '11:50:00', text: 'kafka_consumer: ingested 420 SEPA instant payment packets', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-10',
        name: 'Sanya Kapoor',
        role: 'Founder & CTO',
        avatar: {
          skinTone: '#FFDBAC',
          hairColor: '#3A2016',
          shirtColor: '#7C3AED',
          accessory: 'none',
          genderStyle: 'long_hair'
        },
        startupName: 'CloudSentry',
        tagline: 'Autonomous AI agent for continuous SOC2 & GDPR compliance',
        description: 'Continuously monitors AWS, GCP, GitHub, and Jira, automatically creating remediation pull requests for security drifts.',
        sector: 'SaaS & Enterprise',
        floorId: 3,
        deskNumber: 302,
        deskCoord: { x: 250, y: 215 },
        status: 'open_for_chat',
        statusMessage: 'Available to demo SOC2 auto-evidence collector',
        stage: 'Seed',
        mrr: '$22,400',
        teamSize: 5,
        techStack: ['TypeScript', 'Next.js', 'Python', 'Terraform', 'Postgres'],
        fittIncubatedSince: 'Jun 2024',
        fittGrantAwarded: '₹20,00,000 (FITT Seed)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'CloudSentry: Self-Healing Compliance',
          slides: [
            {
              title: 'Manual Audits Are Broken',
              subtitle: 'Startups spend 400 engineering hours on compliance spreadsheets',
              points: [
                'Auditors charge $25k to take manual screenshots that are outdated the next day',
                'CloudSentry hooks directly into GitHub CI/CD and cloud IAM',
                'Fixes misconfigured S3 buckets, missing MFA, and unencrypted databases autonomously'
              ],
              metric: '40+ Enterprise Customers'
            }
          ]
        },
        milestones: [
          { id: 'cs1', title: 'SOC2 Type II Certification for Own Platform', targetDate: 'Q3 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'csl1', time: '11:10:00', text: 'scanner: AWS us-east-1 audited -> 2 findings auto-fixed via IAM policy PR', type: 'success' }
        ],
        mailbox: []
      },
      {
        id: 'founder-11',
        name: 'Karan Bhasin',
        role: 'Co-Founder & Product Head',
        avatar: {
          skinTone: '#C68642',
          hairColor: '#1A1A1A',
          shirtColor: '#F97316',
          accessory: 'cap',
          genderStyle: 'short_hair'
        },
        startupName: 'OmniStack',
        tagline: 'Single-binary observability for Kubernetes microservices',
        description: 'Drop-in eBPF observability agent with zero bytecode instrumentation overhead, giving sub-microsecond tracing.',
        sector: 'SaaS & Enterprise',
        floorId: 3,
        deskNumber: 303,
        deskCoord: { x: 400, y: 215 },
        status: 'deep_focus',
        statusMessage: 'Writing eBPF kprobe filters for Linux kernel 6.8',
        stage: 'MVP / Pilot',
        mrr: '$8,900',
        teamSize: 4,
        techStack: ['Rust', 'eBPF', 'C', 'ClickHouse', 'Grafana'],
        fittIncubatedSince: 'Oct 2024',
        fittGrantAwarded: '₹15,00,000 (FITT Tech)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'OmniStack: Zero-Overhead eBPF Tracing',
          slides: [
            {
              title: 'APM Performance Tax',
              subtitle: 'Existing Datadog/NewRelic agents consume 15% CPU overhead',
              points: [
                'Traditional agents wrap JVM and Python runtimes, causing latency spikes',
                'OmniStack uses Linux kernel eBPF probes for zero-overhead packet interception',
                'Reduces telemetry cloud infrastructure bill by 60%'
              ],
              metric: '<0.5% CPU Overhead'
            }
          ]
        },
        milestones: [
          { id: 'os1', title: 'eBPF Kernel Probes Benchmarked on AWS EKS', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'osl1', time: '11:35:12', text: 'cargo build --release --target bpfel-unknown-unknown', type: 'build' }
        ],
        mailbox: []
      },
      {
        id: 'founder-12',
        name: 'Aditi Vashist',
        role: 'Founder & CEO',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#2B2B2B',
          shirtColor: '#14B8A6',
          accessory: 'glasses',
          genderStyle: 'curly'
        },
        startupName: 'LedgerPulse',
        tagline: 'AI copilot for GST compliance and invoice reconciliation',
        description: 'Auto-reconciles GSTR-2B with ERP ledgers, reclaiming blocked input tax credit for manufacturing enterprises.',
        sector: 'FinTech & Web3',
        floorId: 3,
        deskNumber: 304,
        deskCoord: { x: 550, y: 215 },
        status: 'pitching',
        statusMessage: 'Pitching CFO of Tata Steel on invoice match rate',
        stage: 'Seed',
        mrr: '$31,000',
        teamSize: 7,
        techStack: ['Python', 'FastAPI', 'React', 'PaddleOCR', 'PostgreSQL'],
        fittIncubatedSince: 'Apr 2024',
        fittGrantAwarded: '₹20,00,000 (FITT Seed)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'LedgerPulse: Autonomous Tax Operations',
          slides: [
            {
              title: 'Blocked Input Tax Credit in Indian Manufacturing',
              subtitle: '₹50,000 Crores trapped in mismatch disputes between vendors and buyers',
              points: [
                'Manual GST matching fails when vendors upload wrong HSN codes or GSTIN numbers',
                'LedgerPulse scans millions of invoices with LLM-powered fuzzy OCR matching',
                'Recovers average ₹42 Lakhs of blocked cash flow per enterprise annually'
              ],
              metric: '₹42L Reclaimed per Client'
            }
          ]
        },
        milestones: [
          { id: 'lp1', title: 'GSTN API Production GSP Access License', targetDate: 'Q2 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'lpl1', time: '11:12:00', text: 'gsp_fetch: downloaded 14,000 GSTR-2B line items for client TATA-04', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-305',
        name: 'Aditya Saxena',
        role: 'Founder & Security Lead',
        avatar: {
          skinTone: '#C68642',
          hairColor: '#1A1A1A',
          shirtColor: '#10B981',
          accessory: 'glasses',
          genderStyle: 'short_hair'
        },
        startupName: 'AuthMatrix',
        tagline: 'Passwordless passkey authentication SDK with zero-knowledge proofs',
        description: 'Drop-in FIDO2 WebAuthn authentication widget eliminating SMS OTP vulnerabilities and phishing attacks.',
        sector: 'SaaS & Enterprise',
        floorId: 3,
        deskNumber: 305,
        deskCoord: { x: 100, y: 335 },
        status: 'coding',
        statusMessage: 'FIDO2 WebAuthn attestation testing on Android 15',
        stage: 'Seed',
        mrr: '$24,500',
        teamSize: 6,
        techStack: ['Rust', 'WebAuthn', 'TypeScript', 'PostgreSQL', 'Docker'],
        fittIncubatedSince: 'May 2024',
        fittGrantAwarded: '₹20,00,000 (FITT Seed)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'AuthMatrix: Phishing-Proof Customer Identity',
          slides: [
            {
              title: 'SMS OTP Fraud in Digital Banking',
              subtitle: 'SIM swaps and phishing cost Indian fintechs ₹1,800 Cr annually',
              points: [
                'Passkeys utilize hardware cryptographic chips inside smartphones (Secure Enclave)',
                '1-tap biometric login with 0% credential stuffing vulnerability',
                'Increases customer checkout conversion by 28%'
              ],
              metric: '1-Tap Passkey Login'
            }
          ]
        },
        milestones: [
          { id: 'amx1', title: 'FIDO Alliance Level 2 Certification', targetDate: 'Q3 2024', completed: true },
          { id: 'amx2', title: '1 Million Biometric Logins Processed', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'amxl1', time: '11:24:00', text: 'webauthn_verify: passkey signed by Android KeyStore hardware root', type: 'success' }
        ],
        mailbox: []
      },
      {
        id: 'founder-306',
        name: 'Radhika Goel',
        role: 'Co-Founder & AI Engineer',
        avatar: {
          skinTone: '#FFDBAC',
          hairColor: '#3B2016',
          shirtColor: '#F43F5E',
          accessory: 'headphones',
          genderStyle: 'long_hair'
        },
        startupName: 'DevRefactor AI',
        tagline: 'Autonomous GitHub PR bot that auto-upgrades legacy tech debt',
        description: 'Scans legacy Java Spring Boot, Node, and Python codebases, generating compiles-first pull requests to migrate to modern runtimes.',
        sector: 'SaaS & Enterprise',
        floorId: 3,
        deskNumber: 306,
        deskCoord: { x: 250, y: 335 },
        status: 'pitching',
        statusMessage: 'Pitching Head of Engineering at Flipkart on auto-PRs',
        stage: 'Early Revenue',
        mrr: '$18,200',
        teamSize: 5,
        techStack: ['AST Parsing', 'Tree-sitter', 'LLMs', 'GitHub Apps', 'Python'],
        fittIncubatedSince: 'Aug 2024',
        fittGrantAwarded: '₹15,00,000 (FITT Tech Innovation)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'DevRefactor: Eradicating Technical Debt',
          slides: [
            {
              title: 'Legacy Framework Migration Tax',
              subtitle: 'Enterprises spend 30% of engineering bandwidth on framework upgrades',
              points: [
                'Automated AST transformations combine with test suite execution in sandbox containers',
                'Guarantees backward compatibility with automated unit test generation',
                'Migrated 140,000 lines of Java 8 to Java 21 for leading bank'
              ],
              metric: '140k Lines Migrated'
            }
          ]
        },
        milestones: [
          { id: 'dr1', title: 'Tree-sitter Java to Rust Transpiler Ruleset', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'drl1', time: '11:32:15', text: 'github_app: created PR #204 (Migrated Spring Boot 2.7 -> 3.2)', type: 'commit' }
        ],
        mailbox: []
      },
      {
        id: 'founder-307',
        name: 'Chirag Singhal',
        role: 'Founder & Web3 Architect',
        avatar: {
          skinTone: '#D4AA7D',
          hairColor: '#2B2B2B',
          shirtColor: '#8B5CF6',
          accessory: 'cap',
          genderStyle: 'short_hair'
        },
        startupName: 'ChainOracle',
        tagline: 'Real-world asset commodity tokenization with IoT custody verification',
        description: 'Connecting agricultural warehouse receipt bonds to institutional debt markets with tamper-proof RFID sensor oracles.',
        sector: 'FinTech & Web3',
        floorId: 3,
        deskNumber: 307,
        deskCoord: { x: 400, y: 335 },
        status: 'open_for_chat',
        statusMessage: 'Demoing coffee bean warehouse RFID smart contract',
        stage: 'Seed',
        mrr: '$13,500',
        teamSize: 4,
        techStack: ['Solidity', 'Foundry', 'Go', 'Chainlink', 'Polygon'],
        fittIncubatedSince: 'Jul 2024',
        fittGrantAwarded: '₹25,00,000 (FITT Web3 Grant)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'ChainOracle: Verifiable Commodity Credit',
          slides: [
            {
              title: 'Collateral Fraud in Agro Warehousing',
              subtitle: 'Banks lose ₹3,000 Cr to fake warehouse storage receipts',
              points: [
                'IoT moisture and weight sensors publish continuous cryptographic proofs of reserve',
                'Enables rural warehouse operators to unlock 8.5% interest working capital loans',
                'Total asset value secured: ₹42 Crores'
              ],
              metric: '₹42 Cr Asset Value'
            }
          ]
        },
        milestones: [
          { id: 'co1', title: 'Smart Contract Audit by OpenZeppelin', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'col1', time: '10:50:00', text: 'oracle_relay: batch 812 proof-of-reserve signed on Polygon PoS', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-308',
        name: 'Neha Parikh',
        role: 'Founder & CPO',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#1A1A1A',
          shirtColor: '#0EA5E9',
          accessory: 'glasses',
          genderStyle: 'curly'
        },
        startupName: 'MetricsPulse',
        tagline: 'AI copilot for product analytics and churn intervention',
        description: 'Ingests clickstream event logs into high-speed columnar databases, autonomously flagging accounts likely to churn before they leave.',
        sector: 'SaaS & Enterprise',
        floorId: 3,
        deskNumber: 308,
        deskCoord: { x: 550, y: 335 },
        status: 'deep_focus',
        statusMessage: 'Analyzing cohort retention curves for 14 SaaS clients',
        stage: 'Growth',
        mrr: '$36,000',
        teamSize: 8,
        techStack: ['ClickHouse', 'DuckDB', 'React', 'FastAPI', 'Cube.js'],
        fittIncubatedSince: 'Mar 2024',
        fittGrantAwarded: '₹20,00,000 (FITT Growth Fund)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'MetricsPulse: Predictive Churn Intervention',
          slides: [
            {
              title: 'Silent Enterprise Churn',
              subtitle: '70% of enterprise churn happens without the customer complaining',
              points: [
                'MetricsPulse tracks subtle feature engagement decay over 14-day rolling windows',
                'Auto-triggers in-app re-engagement playbooks and Slack notifications to account managers',
                'Saved over $2.1M in ARR for B2B subscription software clients'
              ],
              metric: '32% Churn Reduction'
            }
          ]
        },
        milestones: [
          { id: 'mp1', title: 'ClickHouse Ingestion Benchmark: 10M events/sec', targetDate: 'Q3 2024', completed: true },
          { id: 'mp2', title: 'Crossed $30,000 MRR Milestone', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'mpl1', time: '11:15:00', text: 'clickhouse_cluster: 4.8 billion events queried in 420ms', type: 'success' }
        ],
        mailbox: []
      }
    ]
  },

  // =========================================================================
  // FLOOR 4: FITT Executive Hub & Investor Boardroom
  // =========================================================================
  {
    id: 4,
    name: 'Floor 4 — FITT Executive Hub & Investor Boardroom',
    badge: 'COMMAND HQ & INVESTOR SUITE',
    subtitle: 'Incubation leadership, EIRs, IP attorneys, grant officers & angel boardroom',
    description: 'The administrative heart of FITT IIT Delhi: where grants are audited, patents drafted, and seed capital allocated.',
    accentColor: '#9E1B32',
    tagColor: '#FFE4E6',
    rooms: [
      {
        id: 'room-401',
        name: 'Vikram Sarabhai Investor Boardroom',
        floorId: 4,
        capacity: 16,
        isOccupied: false,
        x: 50,
        y: 35,
        width: 230,
        height: 135,
        type: 'boardroom'
      },
      {
        id: 'room-402',
        name: 'FITT IPR & Grant Signing Alcove',
        floorId: 4,
        capacity: 6,
        isOccupied: false,
        x: 295,
        y: 35,
        width: 180,
        height: 135,
        type: 'huddle_pod'
      }
    ],
    commonAreas: [
      {
        id: 'fame-4',
        name: 'FITT Unicorn Hall of Fame & Patent Vault',
        type: 'feature_pod',
        x: 490,
        y: 35,
        width: 245,
        height: 135,
        badge: 'HALL OF FAME',
        subtext: 'IIT Delhi Patents & Startups',
        interactEmote: '🏆 Hall of Fame: 140+ Startups Incubated, 42 Patents Filed, 3 Unicorns!'
      },
      {
        id: 'elev-4',
        name: 'High-Speed Lift Bay',
        type: 'elevator',
        x: 755,
        y: 35,
        width: 125,
        height: 110
      },
      {
        id: 'gong-4',
        name: 'Ceremonial Seed Investment Gong',
        type: 'pitch_gong',
        x: 840,
        y: 165,
        width: 90,
        height: 95,
        badge: 'INVESTMENT GONG',
        subtext: 'Strike For Funding',
        interactEmote: '🔔 GONG! Struck the investment bell celebrating ₹25L seed tranche release!'
      },
      {
        id: 'whiteboard-4',
        name: 'FITT EIR Cohort & Grant Allocation Board',
        type: 'whiteboard',
        x: 840,
        y: 280,
        width: 90,
        height: 130,
        badge: 'FITT EIR',
        subtext: 'Cohort Pipeline Map',
        interactEmote: '📋 FITT Board: Evaluating 18 new deep-tech incubator applications.'
      },
      {
        id: 'cafe-4',
        name: 'Executive Espresso & High Tea Salon',
        type: 'coffee_bar',
        x: 50,
        y: 450,
        width: 175,
        height: 130,
        interactEmote: '☕ Savoring executive Darjeeling first-flush tea with FITT advisors!'
      },
      {
        id: 'lounge-4',
        name: 'Executive VIP Mentor Lounge',
        type: 'lounge',
        x: 245,
        y: 455,
        width: 250,
        height: 125,
        badge: 'VIP LOUNGE',
        subtext: 'Angels & Mentors',
        interactEmote: '🛋️ Resting in the VIP mentor lounge discussing spin-off technology transfer.'
      },
      {
        id: 'water-4',
        name: 'FITT Executive Water Cooler',
        type: 'watercooler',
        x: 515,
        y: 460,
        width: 110,
        height: 115,
        interactEmote: '💧 Chilled alkaline mineral water from the executive dispenser.'
      },
      {
        id: 'overlook-4',
        name: 'Angel Investor Rooftop Terrace Overlook',
        type: 'special_arena',
        x: 645,
        y: 455,
        width: 255,
        height: 125,
        badge: 'OVERLOOK',
        subtext: 'Campus Panoramic View',
        interactEmote: '🔭 Overlook Terrace: Reviewing IIT Delhi campus tech transfer pipeline!'
      }
    ],
    founders: [
      {
        id: 'founder-13',
        name: 'Sameer Joshi',
        role: 'Founder & CEO (EIR Alum)',
        avatar: {
          skinTone: '#E0AC69',
          hairColor: '#1A1A1A',
          shirtColor: '#9E1B32',
          accessory: 'glasses',
          genderStyle: 'short_hair'
        },
        startupName: 'VayuSense',
        tagline: 'Hyper-local optical air quality tomography for smart cities',
        description: 'Laser absorption sensors mapping PM2.5 and NO2 plumes at 10-meter city grid resolution for Delhi NCR.',
        sector: 'Hardware & Robotics',
        floorId: 4,
        deskNumber: 401,
        deskCoord: { x: 100, y: 215 },
        status: 'open_for_chat',
        statusMessage: 'Reviewing Municipal Corporation pilot deployment with FITT',
        stage: 'Early Revenue',
        mrr: '$28,000',
        teamSize: 9,
        techStack: ['Laser Spectroscopy', 'Python', 'FastAPI', 'Mapbox', 'Edge TPU'],
        fittIncubatedSince: 'Jan 2024',
        fittGrantAwarded: '₹35,00,000 (DST NIDHI)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'VayuSense: Laser Tomography for Urban Air',
          slides: [
            {
              title: 'Urban Air Pollution Blindspots',
              subtitle: 'Traditional static stations are spaced 5km apart, missing toxic hotspot plumes',
              points: [
                'VayuSense deploys rooftop eye-safe open-path laser transceivers',
                'Produces 3D volumetric pollution maps updated every 3 minutes',
                'Contracted by Delhi Pollution Control Committee for pilot monitoring'
              ],
              metric: '10m Spatial Resolution'
            }
          ]
        },
        milestones: [
          { id: 'vs1', title: 'IIT Delhi Campus 5-Node Array Operational', targetDate: 'Q3 2024', completed: true, approvedBy: 'Dr. Anil Varma' }
        ],
        terminalLogs: [
          { id: 'vsl1', time: '11:22:10', text: 'laser_spectrometer: reading path length 420m -> PM2.5: 184 ug/m3', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-14',
        name: 'Meera Chawla',
        role: 'Co-Founder & Chief Product Officer',
        avatar: {
          skinTone: '#F1C27D',
          hairColor: '#3A2016',
          shirtColor: '#B45309',
          accessory: 'headphones',
          genderStyle: 'long_hair'
        },
        startupName: 'AgroPulse',
        tagline: 'Satellite SAR and soil moisture radar for farm credit underwriting',
        description: 'Synthetic Aperture Radar (SAR) analytics verifying crop health through cloud cover, unlocking rural bank loans for 50,000 farmers.',
        sector: 'AI & DeepTech',
        floorId: 4,
        deskNumber: 402,
        deskCoord: { x: 250, y: 215 },
        status: 'pitching',
        statusMessage: 'In boardroom with NABARD venture team',
        stage: 'Seed',
        mrr: '$18,500',
        teamSize: 6,
        techStack: ['Sentinel-1 SAR', 'PyTorch', 'GeoPandas', 'Google Earth Engine'],
        fittIncubatedSince: 'Mar 2024',
        fittGrantAwarded: '₹25,00,000 (FITT Seed)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'AgroPulse: Radar Intelligence for Farmers',
          slides: [
            {
              title: 'Monsoon Cloud Cover Blinds Optical Satellites',
              subtitle: 'Kharif season crop insurance claims get stuck for months',
              points: [
                'Optical satellites cannot pierce monsoon rain clouds',
                'AgroPulse radar passes through cloud cover 24/7 with zero interruption',
                'Underwritten over 120,000 acres of paddy and sugarcane with SBI Agri'
              ],
              metric: '100% All-Weather Coverage'
            }
          ]
        },
        milestones: [
          { id: 'ap1', title: 'NABARD Rural Pilot in Haryana', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'apl1', time: '11:15:30', text: 'sentinel1_fetch: downloaded interferometric wide swath scene over Punjab', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-15',
        name: 'Tarun Mathur',
        role: 'Founder & Hardware Architect',
        avatar: {
          skinTone: '#C68642',
          hairColor: '#1A1A1A',
          shirtColor: '#475569',
          accessory: 'none',
          genderStyle: 'short_hair'
        },
        startupName: 'VoltCharge',
        tagline: '15-minute liquid-cooled battery packs for electric 3-wheelers',
        description: 'Direct immersion liquid-cooled cylindrical battery packs engineered for extreme 48°C Indian summer ambient temperatures.',
        sector: 'Hardware & Robotics',
        floorId: 4,
        deskNumber: 403,
        deskCoord: { x: 400, y: 215 },
        status: 'coding',
        statusMessage: 'Thermal simulation model on cell cooling loops',
        stage: 'Prototype',
        mrr: '$0',
        teamSize: 5,
        techStack: ['ANSYS Fluent', 'CAN Bus', 'TI C2000', 'Altium', 'Python'],
        fittIncubatedSince: 'Aug 2024',
        fittGrantAwarded: '₹30,00,000 (TDB / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'VoltCharge: Heat-Proof EV Batteries',
          slides: [
            {
              title: 'Thermal Runaway in Indian Ambient Conditions',
              subtitle: 'Air-cooled EV batteries degrade 4x faster in North Indian summers',
              points: [
                'Immersion dielectric fluid keeps cells within 2°C delta throughout 2C fast charge',
                'Pack life extended from 1,200 cycles to over 3,500 cycles',
                'AIS-156 Amendment 3 certified fire prevention safety architecture'
              ],
              metric: '3,500+ Cycle Life'
            }
          ]
        },
        milestones: [
          { id: 'vc1', title: 'AIS-156 Phase 2 Thermal Shock Test', targetDate: 'Q1 2025', completed: true, approvedBy: 'Dr. Anil Varma' }
        ],
        terminalLogs: [
          { id: 'vcl1', time: '10:55:00', text: 'can_bus_bms: pack voltage 51.2V | max cell temp 31.4 C', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-16',
        name: 'Divya Nair',
        role: 'Founder & CEO',
        avatar: {
          skinTone: '#FFDBAC',
          hairColor: '#4A2C2A',
          shirtColor: '#0284C7',
          accessory: 'glasses',
          genderStyle: 'long_hair'
        },
        startupName: 'CryoGenix Space',
        tagline: 'Miniaturized cryogenic Stirling coolers for earth observation satellites',
        description: 'Vibration-isolated pulse tube cryocoolers cooling infrared satellite sensors to 77 Kelvin for space tech primes.',
        sector: 'Hardware & Robotics',
        floorId: 4,
        deskNumber: 404,
        deskCoord: { x: 550, y: 215 },
        status: 'open_for_chat',
        statusMessage: 'At desk ready for FITT mentor review on IN-SPACe grant',
        stage: 'Seed',
        mrr: '$12,000',
        teamSize: 5,
        techStack: ['Cryogenics', 'FEA', 'SolidWorks', 'LabVIEW', 'Vacuum Tech'],
        fittIncubatedSince: 'Feb 2024',
        fittGrantAwarded: '₹40,00,000 (IN-SPACe / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'CryoGenix: Deep Cooling for SmallSats',
          slides: [
            {
              title: 'Earth Observation Hyperspectral Thirst',
              subtitle: 'Cooled SWIR detectors provide 10x higher signal-to-noise than uncooled bolometers',
              points: [
                'Legacy coolers weigh 3kg and cost $150k each',
                'CryoGenix 450-gram cooler fits inside 3U CubeSat envelopes',
                'Selected for upcoming ISRO PSLV orbital demo flight'
              ],
              metric: '450 Gram Cooler Weight'
            }
          ]
        },
        milestones: [
          { id: 'cgx1', title: 'Thermal Vacuum Chamber 77K Cool-down Test', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'cgxl1', time: '11:05:00', text: 'stirling_compressor: frequency 62.4 Hz | cold finger temp: 77.4 Kelvin', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-405',
        name: 'Dr. Abhinav Sen',
        role: 'Founder & Electro-chemist',
        avatar: {
          skinTone: '#C68642',
          hairColor: '#2B2B2B',
          shirtColor: '#D97706',
          accessory: 'glasses',
          genderStyle: 'short_hair'
        },
        startupName: 'SolidVolt',
        tagline: 'All-solid-state lithium-metal batteries with non-flammable ceramic electrolytes',
        description: 'Pioneering garnet-type LLZO ceramic solid electrolytes providing 450 Wh/kg energy density with zero thermal runaway fire risk.',
        sector: 'Hardware & Robotics',
        floorId: 4,
        deskNumber: 405,
        deskCoord: { x: 100, y: 335 },
        status: 'coding',
        statusMessage: 'Impedance spectroscopy on LLZO solid electrolyte pellets',
        stage: 'Prototype',
        mrr: '$0',
        teamSize: 6,
        techStack: ['Electrochemistry', 'COMSOL', 'Potentiostat', 'SEM', 'SolidWorks'],
        fittIncubatedSince: 'Jun 2024',
        fittGrantAwarded: '₹50,00,000 (DST / FITT Energy Mission)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'SolidVolt: Fire-Proof Energy Density',
          slides: [
            {
              title: 'Liquid Electrolyte Dendrite Hazards',
              subtitle: 'Volatile liquid electrolytes explode when punctured or overcharged',
              points: [
                'SolidVolt ceramic separator mechanically stops lithium dendrites from piercing the anode',
                'Operates safely up to 120°C without liquid boiling or ignition',
                'Pilot pouch cells cycling with 92% retention over 800 cycles'
              ],
              metric: '450 Wh/kg Energy Density'
            }
          ]
        },
        milestones: [
          { id: 'svlt1', title: '1Ah Solid State Pouch Cell Cycling Verification', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'svltl1', time: '11:10:00', text: 'potentiostat_sweep: ionic conductivity 1.2 mS/cm at room temp verified', type: 'success' }
        ],
        mailbox: []
      },
      {
        id: 'founder-406',
        name: 'Sunita Rao',
        role: 'Co-Founder & Radar Architect',
        avatar: {
          skinTone: '#F1C27D',
          hairColor: '#1A1A1A',
          shirtColor: '#475569',
          accessory: 'headphones',
          genderStyle: 'long_hair'
        },
        startupName: 'AeroDefense AI',
        tagline: 'Counter-UAS micro-Doppler radar with directional smart RF neutralization',
        description: 'Detecting stealth miniature drones and rogue swarms using radar micro-Doppler wingbeat signatures and precision jamming.',
        sector: 'Hardware & Robotics',
        floorId: 4,
        deskNumber: 406,
        deskCoord: { x: 250, y: 335 },
        status: 'meeting',
        statusMessage: 'Reviewing field demo results with Indian Army Northern Command',
        stage: 'Seed',
        mrr: '$32,000',
        teamSize: 8,
        techStack: ['SDR', 'GNU Radio', 'RF Engineering', 'C++', 'PyTorch'],
        fittIncubatedSince: 'May 2024',
        fittGrantAwarded: '₹45,00,000 (iDEX DISC 10 / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'AeroDefense: Airspace Sovereignty',
          slides: [
            {
              title: 'Rogue Drone Infiltration Threat',
              subtitle: 'Asymmetric cheap drone attacks bypass traditional radar nets',
              points: [
                'Micro-Doppler classification distinguishes quadcopters from birds at 3km range',
                'Precision GNSS spoofing and directional control link suppression',
                'Successfully guarded Republic Day VIP perimeters'
              ],
              metric: '3km Drone Detection'
            }
          ]
        },
        milestones: [
          { id: 'ad1', title: 'High-Altitude Field Trial at Ladakh', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'adl1', time: '10:40:00', text: 'rf_jammer: smart band neutralization verified in shielded chamber', type: 'info' }
        ],
        mailbox: []
      },
      {
        id: 'founder-407',
        name: 'Kartik Sundaram',
        role: 'Founder & Power Systems EIR',
        avatar: {
          skinTone: '#D4AA7D',
          hairColor: '#3B2016',
          shirtColor: '#059669',
          accessory: 'none',
          genderStyle: 'short_hair'
        },
        startupName: 'OptiGrid',
        tagline: 'Grid-scale reinforcement learning for renewable solar & wind power dispatch',
        description: 'Balancing regional electricity grids in real time under volatile solar and wind intermittency, preventing curtailment.',
        sector: 'AI & DeepTech',
        floorId: 4,
        deskNumber: 407,
        deskCoord: { x: 400, y: 335 },
        status: 'open_for_chat',
        statusMessage: 'Available to demo national grid frequency stabilizer',
        stage: 'Seed',
        mrr: '$21,000',
        teamSize: 5,
        techStack: ['RLlib', 'Pandapower', 'Python', 'FastAPI', 'TimescaleDB'],
        fittIncubatedSince: 'Sep 2024',
        fittGrantAwarded: '₹25,00,000 (FITT Cleantech)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'OptiGrid: Autopilot for Green Power Grids',
          slides: [
            {
              title: 'Renewable Power Curtailment Waste',
              subtitle: 'India wastes 15% of solar energy during peak sunshine midday hours',
              points: [
                'OptiGrid predicts transformer branch loads 30 minutes in advance with deep RL',
                'Dynamically re-routes electricity into battery storage and pumped hydro reserves',
                'Prevented 42 brownouts across Gujarat renewable corridor pilot'
              ],
              metric: '42 Brownouts Prevented'
            }
          ]
        },
        milestones: [
          { id: 'og1', title: '500MW Substation Simulation Model', targetDate: 'Q4 2024', completed: true }
        ],
        terminalLogs: [
          { id: 'ogl1', time: '11:25:00', text: 'grid_state_estimator: solved 1,200 bus power flow in 34ms', type: 'success' }
        ],
        mailbox: []
      },
      {
        id: 'founder-408',
        name: 'Ishita Mathur',
        role: 'Founder & Rocket Propulsion Lead',
        avatar: {
          skinTone: '#FFDBAC',
          hairColor: '#4A2C2A',
          shirtColor: '#DC2626',
          accessory: 'glasses',
          genderStyle: 'curly'
        },
        startupName: 'HyperPropulsion',
        tagline: 'Non-toxic green monopropellant thrusters for satellite orbital maneuvering',
        description: 'Replacing toxic carcinogenic hydrazine with hydroxylammonium nitrate (HAN) based green chemical propulsion for commercial space satellites.',
        sector: 'Hardware & Robotics',
        floorId: 4,
        deskNumber: 408,
        deskCoord: { x: 550, y: 335 },
        status: 'pitching',
        statusMessage: 'Pitching ISRO IN-SPACe seed venture committee in boardroom',
        stage: 'Prototype',
        mrr: '$0',
        teamSize: 5,
        techStack: ['CFD', 'Ansys Fluent', 'Propulsion Test Stand', 'LabVIEW', 'SolidWorks'],
        fittIncubatedSince: 'Jan 2025',
        fittGrantAwarded: '₹40,00,000 (IN-SPACe / FITT)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'HyperPropulsion: Clean Satellite Orbit Raising',
          slides: [
            {
              title: 'The Hydrazine Toxic Nightmare',
              subtitle: 'Hydrazine propellant fueling requires $50k hazardous hazmat suits',
              points: [
                'HyperPropulsion green monopropellant has 25% higher specific impulse than hydrazine',
                'Can be safely handled in standard cleanrooms with zero environmental hazard',
                'Completed 20 hot-fire test pulses at IIT Delhi rocket propulsion stand'
              ],
              metric: '25% Higher Isp'
            }
          ]
        },
        milestones: [
          { id: 'hp1', title: '5N Green Thruster Hot-Fire Test Stand Ignition', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'hpl1', time: '11:40:00', text: 'hot_fire_telemetry: chamber pressure 18.2 bar | thrust 5.12N verified', type: 'success' }
        ],
        mailbox: []
      }
    ]
  }
];
