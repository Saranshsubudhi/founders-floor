export type StartupStage = 'Ideation' | 'Prototype' | 'MVP / Pilot' | 'Early Revenue' | 'Seed' | 'Growth';

export type FounderStatus = 
  | 'coding' 
  | 'meeting' 
  | 'pitching' 
  | 'coffee' 
  | 'open_for_chat' 
  | 'seeking_grant' 
  | 'deep_focus';

export interface PitchSlide {
  title: string;
  points: string[];
  metric?: string;
  subtitle?: string;
}

export interface TerminalLog {
  id: string;
  time: string;
  text: string;
  type: 'info' | 'commit' | 'test' | 'build' | 'success' | 'warn';
}

export interface MailItem {
  id: string;
  from: string;
  fromRole: string;
  subject: string;
  body: string;
  time: string;
  unread: boolean;
  type: 'general' | 'fitt_grant' | 'mentor_note' | 'investor_ping';
}

export interface MilestoneItem {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
  grantTranche?: string;
  approvedBy?: string;
}

export interface AvatarStyle {
  skinTone: string;
  hairColor: string;
  shirtColor: string;
  accessory?: 'glasses' | 'headphones' | 'cap' | 'none';
  genderStyle?: 'short_hair' | 'long_hair' | 'curly';
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  avatar: AvatarStyle;
  startupName: string;
  tagline: string;
  description: string;
  sector: 'AI & DeepTech' | 'BioTech & Health' | 'FinTech & Web3' | 'Hardware & Robotics' | 'SaaS & Enterprise';
  floorId: number;
  deskNumber: number;
  deskCoord: { x: number; y: number };
  status: FounderStatus;
  statusMessage: string;
  stage: StartupStage;
  mrr: string;
  teamSize: number;
  techStack: string[];
  fittIncubatedSince: string;
  fittGrantAwarded: string;
  fittGrantApproved: boolean;
  pitchDeck: {
    title: string;
    slides: PitchSlide[];
  };
  milestones: MilestoneItem[];
  terminalLogs: TerminalLog[];
  mailbox: MailItem[];
}

export interface FITTTeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  avatar: AvatarStyle;
  status: 'online' | 'in_office_hours' | 'reviewing_grants';
  officeDeskCoord: { x: number; y: number };
}

export interface MeetingRoom {
  id: string;
  name: string;
  floorId: number;
  capacity: number;
  isOccupied: boolean;
  currentMeeting?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'boardroom' | 'pitch_hall' | 'huddle_pod' | 'lab';
}

export interface CommonArea {
  id: string;
  name: string;
  type: 
    | 'coffee_bar' 
    | 'watercooler' 
    | 'lounge' 
    | 'server_room' 
    | 'elevator'
    | 'feature_pod'
    | 'prototyping_bench'
    | 'arcade'
    | 'pingpong'
    | 'whiteboard'
    | 'pitch_gong'
    | 'special_arena';
  x: number;
  y: number;
  width: number;
  height: number;
  interactEmote?: string;
  badge?: string;
  subtext?: string;
}

export interface Floor {
  id: number;
  name: string;
  badge: string;
  subtitle: string;
  description: string;
  accentColor: string;
  tagColor: string;
  founders: Founder[];
  rooms: MeetingRoom[];
  commonAreas: CommonArea[];
}

export interface EnvelopeFlight {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  senderName: string;
  recipientName: string;
  messagePreview: string;
  progress: number; // 0 to 1
  createdAt: number;
}

export interface Announcement {
  id: string;
  text: string;
  author: string;
  authorRole: string;
  floorId: number | 'all';
  timestamp: string;
  urgent?: boolean;
}

export interface ActiveMeetingState {
  isOpen: boolean;
  founder: Founder | null;
  fittMember: FITTTeamMember;
  roomName: string;
  agenda: string[];
  notes: string;
  isCamOn: boolean;
  isMicOn: boolean;
  isScreenSharing: boolean;
  activeSlideIndex: number;
  chatMessages: Array<{ sender: string; text: string; time: string; isFitt?: boolean }>;
}
