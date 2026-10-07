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
    officeDeskCoord: { x: 740, y: 140 }
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
    officeDeskCoord: { x: 740, y: 220 }
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
    officeDeskCoord: { x: 740, y: 300 }
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
    officeDeskCoord: { x: 740, y: 380 }
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
    officeDeskCoord: { x: 740, y: 460 }
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
  }
];

export const INITIAL_FLOORS: Floor[] = [
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
        x: 60,
        y: 40,
        width: 240,
        height: 140,
        type: 'huddle_pod'
      },
      {
        id: 'room-102',
        name: 'GPU Cluster Server Alcove',
        floorId: 1,
        capacity: 4,
        isOccupied: true,
        currentMeeting: 'NeuroSynthetix Benchmarking',
        x: 320,
        y: 40,
        width: 180,
        height: 140,
        type: 'lab'
      }
    ],
    commonAreas: [
      {
        id: 'cafe-1',
        name: 'Neural Caffeine Bar',
        type: 'coffee_bar',
        x: 60,
        y: 440,
        width: 160,
        height: 120
      },
      {
        id: 'water-1',
        name: 'Watercooler Chill Zone',
        type: 'watercooler',
        x: 540,
        y: 460,
        width: 100,
        height: 80
      },
      {
        id: 'elev-1',
        name: 'High-Speed Lift Bay',
        type: 'elevator',
        x: 760,
        y: 40,
        width: 120,
        height: 110
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
        deskCoord: { x: 100, y: 220 },
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
          title: 'NeuroSynthetix: Zero-Latency Edge AI',
          slides: [
            {
              title: 'The Edge Problem',
              subtitle: 'Cloud AI latency breaks real-time robotics',
              points: [
                'Cloud LLM latency exceeds 350ms, intolerable for robotic control',
                'Edge devices suffer from severe memory and thermal throttling',
                'Our quantization compiler preserves 99.4% FP16 accuracy at 4-bit INT'
              ],
              metric: '8.4x Faster Inference'
            },
            {
              title: 'Proprietary Neuromorphic Engine',
              subtitle: 'Patented sparse activation kernel',
              points: [
                'Joint patent filed via FITT IPR Cell (Ref: IITD/PAT/2025/089)',
                'Achieves 120 tokens/sec on sub-5W embedded ARM silicon',
                'Piloted with 3 industrial drone defense clients'
              ],
              metric: '₹1.1 Cr Signed LOIs'
            },
            {
              title: 'Seed Round & FITT Milestones',
              subtitle: 'Targeting $750k Seed allocation',
              points: [
                'Tranche 1 completed: hardware testbed operational at IIT Delhi Bharti building',
                'Tranche 2 pending: field trials in harsh thermal environments',
                'Hiring 2 Senior Compiler Engineers'
              ],
              metric: '$750k Seed Round'
            }
          ]
        },
        milestones: [
          { id: 'm1', title: 'FPGA Prototype Benchmarking', targetDate: 'Q1 2025', completed: true, grantTranche: 'Tranche 1' },
          { id: 'm2', title: 'FITT IPR Patent Filing', targetDate: 'Q2 2025', completed: true, grantTranche: 'Tranche 1', approvedBy: 'Adv. Neha Gupta' },
          { id: 'm3', title: 'Industrial Drone Field Trial with DRDO', targetDate: 'Q3 2025', completed: false, grantTranche: 'Tranche 2' }
        ],
        terminalLogs: [
          { id: 'l1', time: '11:42:10', text: 'triton_kernel_compile: compiling sparse_matmul.py with 128 warps', type: 'info' },
          { id: 'l2', time: '11:45:04', text: 'eval_loss: 0.0412 | ppl: 3.14 | memory_peak: 1.82GB VRAM', type: 'test' },
          { id: 'l3', time: '11:51:22', text: 'git commit -m "feat(quant): dynamic activation clipping for 4bit"', type: 'commit' },
          { id: 'l4', time: '11:54:10', text: 'unit_tests_pass: 88/88 test suites green on Jetson Nano', type: 'success' }
        ],
        mailbox: [
          {
            id: 'mail-1',
            from: 'Priya Sharma',
            fromRole: 'Head of Startup Incubation',
            subject: 'Re: Drone Trial Permissions at IITD Field',
            body: 'Hi Aarav, the security clearance for the autonomous drone test flight at the SAC grounds has been sanctioned by FITT Director. Please submit the safety checklist before Thursday.',
            time: '10:30 AM',
            unread: false,
            type: 'mentor_note'
          },
          {
            id: 'mail-2',
            from: 'Vikramaditya Roy',
            fromRole: 'Chief Seed Fund Evaluator',
            subject: 'Milestone 2 Sign-off Approved!',
            body: 'Congratulations Aarav! The technical committee has approved Milestone 2. Tranche 2 disbursement voucher of ₹10,00,000 has been sent to accounts.',
            time: 'Yesterday',
            unread: true,
            type: 'fitt_grant'
          }
        ]
      },
      {
        id: 'founder-2',
        name: 'Tanvi Nambiar',
        role: 'Co-Founder & CEO',
        avatar: {
          skinTone: '#F1C27D',
          hairColor: '#3A2016',
          shirtColor: '#059669',
          accessory: 'glasses',
          genderStyle: 'long_hair'
        },
        startupName: 'AgenticMesh',
        tagline: 'Decentralized local LLM orchestration harness',
        description: 'Multi-agent coordination protocol running deterministic coding agent teams with local persistence.',
        sector: 'AI & DeepTech',
        floorId: 1,
        deskNumber: 102,
        deskCoord: { x: 260, y: 220 },
        status: 'open_for_chat',
        statusMessage: 'Ready for mentor drop-in on multi-agent routing',
        stage: 'MVP / Pilot',
        mrr: '$6,800',
        teamSize: 4,
        techStack: ['TypeScript', 'Rust', 'Node-PTY', 'Pixi.js', 'SQLite'],
        fittIncubatedSince: 'Nov 2024',
        fittGrantAwarded: '₹15,00,000 (PRISM Grant)',
        fittGrantApproved: true,
        pitchDeck: {
          title: 'AgenticMesh: The Local Agent Harness',
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
            },
            {
              title: 'Open Source Engine + Enterprise Fleet',
              subtitle: 'Local-first zero telemetry architecture',
              points: [
                'Apache 2.0 core harness running on macOS, Linux, and Windows',
                'Enterprise fleet management plugin for incubation labs and engineering teams',
                'Integrated with FITT IIT Delhi incubation infrastructure'
              ],
              metric: '1,400+ GitHub Stars'
            }
          ]
        },
        milestones: [
          { id: 'am1', title: 'Core Multi-PTY Orchestrator Release', targetDate: 'Q1 2025', completed: true, grantTranche: 'Tranche 1' },
          { id: 'am2', title: '5 Enterprise Pilot Deployments', targetDate: 'Q2 2025', completed: true, grantTranche: 'Tranche 2' },
          { id: 'am3', title: 'Decentralized Mesh Protocol Spec', targetDate: 'Q3 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'al1', time: '11:30:11', text: 'agent_daemon: routing message from #claude to #gemini_critic', type: 'info' },
          { id: 'al2', time: '11:34:40', text: 'git push origin main (v0.4.2 released)', type: 'commit' },
          { id: 'al3', time: '11:49:15', text: 'hive_sync: 12 nodes synchronized across local network mesh', type: 'success' }
        ],
        mailbox: [
          {
            id: 'm-am-1',
            from: 'Siddharth Bose',
            fromRole: 'TDB Grant Officer',
            subject: 'PRISM Grant Utilization Certificate',
            body: 'Hi Tanvi, please share the CA audited utilization certificate for the Q1 PRISM grant by Friday.',
            time: '09:15 AM',
            unread: false,
            type: 'fitt_grant'
          }
        ]
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
        deskCoord: { x: 420, y: 220 },
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
          { id: 'qr2', title: 'ISO Class 1 Particle Chamber Test', targetDate: 'Q1 2025', completed: true },
          { id: 'qr3', title: 'Pilot at SCL Chandigarh Cleanroom', targetDate: 'Q3 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'ql1', time: '11:15:02', text: 'ros2 launch q_robotics_bringup slam.launch.py', type: 'info' },
          { id: 'ql2', time: '11:22:45', text: 'lidar_odom_error: 0.003m within tolerance', type: 'success' },
          { id: 'ql3', time: '11:40:12', text: 'warn: wheel encoder 2 slight slip detected on wet epoxy', type: 'warn' }
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
        deskCoord: { x: 580, y: 220 },
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
          { id: 'pl1', time: '10:50:11', text: 'fdtd_sim: waveguide loss = 0.8dB/cm @ 1550nm', type: 'info' },
          { id: 'pl2', time: '11:10:44', text: 'qsub -I photon_mesh_run_cluster.sh: 16 nodes engaged', type: 'info' }
        ],
        mailbox: [
          {
            id: 'm-p-1',
            from: 'Dr. Anil Varma',
            fromRole: 'Managing Director, FITT',
            subject: 'Semi-Conductor Mission Recommendation Letter',
            body: 'Dear Rhea, FITT has formally endorsed your proposal to the India Semiconductor Mission (ISM) design-linked incentive program. Let us meet in my office to review the IP assignment agreement.',
            time: 'Yesterday',
            unread: true,
            type: 'mentor_note'
          }
        ]
      }
    ]
  },
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
        x: 60,
        y: 40,
        width: 240,
        height: 140,
        type: 'lab'
      },
      {
        id: 'room-202',
        name: 'Clinical Validation Huddle',
        floorId: 2,
        capacity: 6,
        isOccupied: true,
        currentMeeting: 'NanoBioDx AIIMS Trial Review',
        x: 320,
        y: 40,
        width: 180,
        height: 140,
        type: 'huddle_pod'
      }
    ],
    commonAreas: [
      {
        id: 'cafe-2',
        name: 'Organic Herbal Lounge',
        type: 'coffee_bar',
        x: 60,
        y: 440,
        width: 160,
        height: 120
      },
      {
        id: 'water-2',
        name: 'De-ionized Water Station',
        type: 'watercooler',
        x: 540,
        y: 460,
        width: 100,
        height: 80
      },
      {
        id: 'elev-2',
        name: 'High-Speed Lift Bay',
        type: 'elevator',
        x: 760,
        y: 40,
        width: 120,
        height: 110
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
        deskCoord: { x: 100, y: 220 },
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
            },
            {
              title: 'Clinical Validation & CDSCO Status',
              subtitle: '1,200 patient double-blind trial at AIIMS New Delhi',
              points: [
                'Demonstrated 98.6% sensitivity and 99.1% specificity',
                'CDSCO Medical Device Class C manufacturing license applied',
                'Over 40 hospital orders pre-booked across NCR and Punjab'
              ],
              metric: '98.6% Sensitivity'
            }
          ]
        },
        milestones: [
          { id: 'nb1', title: 'Cartridge Mold Production', targetDate: 'Q3 2024', completed: true },
          { id: 'nb2', title: 'AIIMS Phase-1 Clinical Trial', targetDate: 'Q4 2024', completed: true, approvedBy: 'Dr. Anil Varma' },
          { id: 'nb3', title: 'CDSCO Regulatory Sign-off', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'nl1', time: '11:20:00', text: 'calibrating optical photodiode sensor array (channel 4)', type: 'info' },
          { id: 'nl2', time: '11:28:12', text: 'cartridge_fluidic_pressure: 1.22 bar within laminar bounds', type: 'success' },
          { id: 'nl3', time: '11:35:40', text: 'device_firmware: v2.1.0 OTA build deployed to 12 test units', type: 'build' }
        ],
        mailbox: [
          {
            id: 'm-nb-1',
            from: 'Priya Sharma',
            fromRole: 'Head of Startup Incubation',
            subject: 'Meeting with Apollo Hospitals Ventures',
            body: 'Dr. Devika, Apollo Ventures partner wants an in-person demo next Tuesday at FITT Boardroom. Let us prep the deck.',
            time: '08:45 AM',
            unread: false,
            type: 'investor_ping'
          }
        ]
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
        deskCoord: { x: 260, y: 220 },
        status: 'open_for_chat',
        statusMessage: 'At desk analyzing bioreactor HPLC fraction peaks',
        stage: 'Seed',
        mrr: '$11,000',
        teamSize: 5,
        techStack: ['Directed Evolution', 'AlphaFold 3', 'HPLC', 'Fermentation', 'Python Bio'],
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
          { id: 'bf1', title: '50-Liter Fermentation Run', targetDate: 'Q1 2025', completed: true },
          { id: 'bf2', title: 'Joint Pilot with Sun Pharma', targetDate: 'Q3 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'bfl1', time: '10:45:00', text: 'bioreactor_temp: 37.1 C | dissolved_o2: 44% | rpm: 250', type: 'info' },
          { id: 'bfl2', time: '11:15:33', text: 'alphafold_cluster: predicted active site binding energy -9.4 kcal/mol', type: 'success' }
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
        deskCoord: { x: 420, y: 220 },
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
          { id: 'cv1', title: 'IITD NRF Cleanroom Transducer Fab', targetDate: 'Q1 2025', completed: true },
          { id: 'cv2', title: 'Animal Pilot at VPCI', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'cvl1', time: '11:00:22', text: 'dsp_filter: bandpass 0.5Hz - 25Hz applied to carotid echo signal', type: 'info' },
          { id: 'cvl2', time: '11:18:40', text: 'pulse_transit_time: 142ms computed -> systolic 118 mmHg', type: 'test' }
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
        deskCoord: { x: 580, y: 220 },
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
          { id: 'cg1', title: 'Biocompatibility Cytotoxicity Assay ISO 10993', targetDate: 'Q4 2024', completed: true },
          { id: 'cg2', title: '50-Patient Clinical Registry', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'cgl1', time: '09:40:11', text: 'autoclave_cycle: 121 C for 30min completed for 500 batches', type: 'success' }
        ],
        mailbox: []
      }
    ]
  },
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
        x: 60,
        y: 40,
        width: 240,
        height: 140,
        type: 'boardroom'
      },
      {
        id: 'room-302',
        name: 'Investor Pitch Booth',
        floorId: 3,
        capacity: 4,
        isOccupied: false,
        x: 320,
        y: 40,
        width: 180,
        height: 140,
        type: 'pitch_hall'
      }
    ],
    commonAreas: [
      {
        id: 'cafe-3',
        name: 'Espresso Bar & Whiteboard Zone',
        type: 'coffee_bar',
        x: 60,
        y: 440,
        width: 160,
        height: 120
      },
      {
        id: 'water-3',
        name: 'Sparkling Water Station',
        type: 'watercooler',
        x: 540,
        y: 460,
        width: 100,
        height: 80
      },
      {
        id: 'elev-3',
        name: 'High-Speed Lift Bay',
        type: 'elevator',
        x: 760,
        y: 40,
        width: 120,
        height: 110
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
        deskCoord: { x: 100, y: 220 },
        status: 'coding',
        statusMessage: 'Integrating RBI regulatory sandbox webhook verification',
        stage: 'Growth',
        mrr: '$48,000',
        teamSize: 12,
        techStack: ['Go', 'PostgreSQL', 'Kafka', 'React', 'Docker', 'AWS'],
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
            },
            {
              title: 'Revenue & Unit Economics',
              subtitle: '45 bps take rate on gross transaction volume',
              points: [
                'Processing over $4.2M in monthly flow for 180 verified exporters',
                'Current MRR at $48,000 with 35% MoM compound growth',
                'Raising $2M Series A to expand UAE and Singapore corridors'
              ],
              metric: '$48k MRR'
            }
          ]
        },
        milestones: [
          { id: 'pf1', title: 'RBI Regulatory Sandbox Cohort Entry', targetDate: 'Q2 2024', completed: true },
          { id: 'pf2', title: '$1M Monthly Processing Volume', targetDate: 'Q4 2024', completed: true },
          { id: 'pf3', title: 'Series A Term Sheet Closing', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'pfl1', time: '11:50:00', text: 'kafka_consumer: ingested 420 SEPA instant payment packets', type: 'info' },
          { id: 'pfl2', time: '11:52:14', text: 'fx_engine: locked EUR/INR at 90.14 via ICICI Treasury API', type: 'success' },
          { id: 'pfl3', time: '11:55:01', text: 'db_transaction_commit: batch 902 settled with 0 reconciliation errors', type: 'commit' }
        ],
        mailbox: [
          {
            id: 'm-pf-1',
            from: 'Vikramaditya Roy',
            fromRole: 'Chief Seed Fund Evaluator',
            subject: 'Series A Introductions to Peak XV & Blume',
            body: 'Rohan, I spoke with Blume Ventures partners regarding your export remittance engine. They want to see your cohort retention chart. Join me on Floor 4 when free.',
            time: '11:05 AM',
            unread: true,
            type: 'investor_ping'
          }
        ]
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
        deskCoord: { x: 260, y: 220 },
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
          { id: 'cs1', title: 'SOC2 Type II Certification for Own Platform', targetDate: 'Q3 2024', completed: true },
          { id: 'cs2', title: 'Reach $20k MRR Milestone', targetDate: 'Q1 2025', completed: true, approvedBy: 'Priya Sharma' }
        ],
        terminalLogs: [
          { id: 'csl1', time: '11:10:00', text: 'scanner: AWS us-east-1 audited -> 2 findings auto-fixed via IAM policy PR', type: 'success' },
          { id: 'csl2', time: '11:24:19', text: 'github_app_webhook: PR #89 merged by client devops team', type: 'commit' }
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
        deskCoord: { x: 420, y: 220 },
        status: 'deep_focus',
        statusMessage: 'Writing eBPF kprobe filters for Linux kernel 6.8',
        stage: 'MVP / Pilot',
        mrr: '$8,900',
        teamSize: 4,
        techStack: ['Rust', 'eBPF', 'C', 'ClickHouse', 'Grafana', 'Kubernetes'],
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
          { id: 'os1', title: 'eBPF Kernel Probes Benchmarked on AWS EKS', targetDate: 'Q1 2025', completed: true },
          { id: 'os2', title: 'Open-Source Release on Hacker News', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'osl1', time: '11:35:12', text: 'cargo build --release --target bpfel-unknown-unknown', type: 'build' },
          { id: 'osl2', time: '11:41:00', text: 'test_kprobe: captured 1,420,000 syscall events without dropped buffers', type: 'success' }
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
        deskCoord: { x: 580, y: 220 },
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
          { id: 'lp1', title: 'GSTN API Production GSP Access License', targetDate: 'Q2 2024', completed: true },
          { id: 'lp2', title: 'Crossing ₹25 Lakhs MRR', targetDate: 'Q1 2025', completed: true }
        ],
        terminalLogs: [
          { id: 'lpl1', time: '11:12:00', text: 'gsp_fetch: downloaded 14,000 GSTR-2B line items for client TATA-04', type: 'info' },
          { id: 'lpl2', time: '11:19:45', text: 'fuzzy_match: matched 99.4% invoices, flagged 32 fraudulent ITC claims', type: 'success' }
        ],
        mailbox: []
      }
    ]
  },
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
        x: 60,
        y: 40,
        width: 320,
        height: 140,
        type: 'boardroom'
      },
      {
        id: 'room-402',
        name: 'FITT IPR & Grant Signing Alcove',
        floorId: 4,
        capacity: 6,
        isOccupied: false,
        x: 400,
        y: 40,
        width: 180,
        height: 140,
        type: 'huddle_pod'
      }
    ],
    commonAreas: [
      {
        id: 'cafe-4',
        name: 'Executive Tea & Coffee Lounge',
        type: 'coffee_bar',
        x: 60,
        y: 440,
        width: 160,
        height: 120
      },
      {
        id: 'water-4',
        name: 'FITT Central Water Cooler',
        type: 'watercooler',
        x: 540,
        y: 460,
        width: 100,
        height: 80
      },
      {
        id: 'elev-4',
        name: 'High-Speed Lift Bay',
        type: 'elevator',
        x: 760,
        y: 40,
        width: 120,
        height: 110
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
        deskCoord: { x: 100, y: 220 },
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
          { id: 'vs1', title: 'IIT Delhi Campus 5-Node Array Operational', targetDate: 'Q3 2024', completed: true, approvedBy: 'Dr. Anil Varma' },
          { id: 'vs2', title: 'Municipal Corporation Contract Sign-off', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'vsl1', time: '11:22:10', text: 'laser_spectrometer: reading path length 420m -> PM2.5: 184 ug/m3', type: 'info' },
          { id: 'vsl2', time: '11:44:00', text: 'grid_render: updated geospatial raster tiles for South Delhi zone', type: 'success' }
        ],
        mailbox: [
          {
            id: 'm-vs-1',
            from: 'Dr. Anil Varma',
            fromRole: 'Managing Director, FITT',
            subject: 'Meeting with Principal Scientific Advisor',
            body: 'Sameer, the PSA to the Govt of India is visiting IIT Delhi next Monday. Your air quality tomography system will be demonstrated. Please have the live dashboard ready.',
            time: 'Yesterday',
            unread: false,
            type: 'mentor_note'
          }
        ]
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
        deskCoord: { x: 260, y: 220 },
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
          { id: 'ap1', title: 'NABARD Rural Pilot in Haryana', targetDate: 'Q4 2024', completed: true },
          { id: 'ap2', title: 'Automated Loan Disbursal Integration', targetDate: 'Q2 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'apl1', time: '11:15:30', text: 'sentinel1_fetch: downloaded interferometric wide swath scene over Punjab', type: 'info' },
          { id: 'apl2', time: '11:30:19', text: 'soil_moisture_inversion: correlation r=0.91 against ground moisture sensors', type: 'success' }
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
        deskCoord: { x: 420, y: 220 },
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
          { id: 'vc1', title: 'AIS-156 Phase 2 Thermal Shock Test', targetDate: 'Q1 2025', completed: true, approvedBy: 'Dr. Anil Varma' },
          { id: 'vc2', title: 'Delivery Fleet Pilot with Yulu/Euler', targetDate: 'Q3 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'vcl1', time: '10:55:00', text: 'can_bus_bms: pack voltage 51.2V | max cell temp 31.4 C during 120A fast charge', type: 'info' },
          { id: 'vcl2', time: '11:12:44', text: 'cooling_pump_pwm: modulated to 45% -> delta T reduced to 1.1 C', type: 'success' }
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
        deskCoord: { x: 580, y: 220 },
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
          { id: 'cgx1', title: 'Thermal Vacuum Chamber 77K Cool-down Test', targetDate: 'Q4 2024', completed: true },
          { id: 'cgx2', title: 'Vibration Qualification for Launch Loads', targetDate: 'Q1 2025', completed: true, approvedBy: 'Priya Sharma' },
          { id: 'cgx3', title: 'Flight Model Handover to IN-SPACe', targetDate: 'Q3 2025', completed: false }
        ],
        terminalLogs: [
          { id: 'cgxl1', time: '11:05:00', text: 'stirling_compressor: frequency 62.4 Hz | cold finger temp: 77.4 Kelvin', type: 'info' },
          { id: 'cgxl2', time: '11:32:00', text: 'vacuum_gauge: chamber pressure 1.2e-6 mbar verified stable', type: 'success' }
        ],
        mailbox: [
          {
            id: 'm-cgx-1',
            from: 'Adv. Neha Gupta',
            fromRole: 'Patent & IPR General Counsel',
            subject: 'PCT International Patent Filing Complete',
            body: 'Hi Divya, the PCT patent application for your dual-opposed Stirling compressor vibration cancellation mechanism has been published. FITT IPR Cell has covered the filing fees.',
            time: 'Yesterday',
            unread: true,
            type: 'fitt_grant'
          }
        ]
      }
    ]
  }
];
