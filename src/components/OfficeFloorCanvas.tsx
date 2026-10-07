import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Floor, Founder, FITTTeamMember, EnvelopeFlight, MeetingRoom } from '../types';
import { soundEffects } from '../services/soundEffects';

interface OfficeFloorCanvasProps {
  floor: Floor;
  fittTeam: FITTTeamMember[];
  selectedFounder: Founder | null;
  onSelectFounder: (founder: Founder) => void;
  onEnterMeetingRoom: (room: MeetingRoom) => void;
  onOpenElevator: () => void;
  activeEnvelopes: EnvelopeFlight[];
  onEnvelopeLanded?: (id: string) => void;
  userRole: 'fitt_team' | 'founder' | 'visitor';
}

const LOGICAL_WIDTH = 960;
const LOGICAL_HEIGHT = 620;

export const OfficeFloorCanvas: React.FC<OfficeFloorCanvasProps> = ({
  floor,
  fittTeam,
  selectedFounder,
  onSelectFounder,
  onEnterMeetingRoom,
  onOpenElevator,
  activeEnvelopes,
  userRole
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Player position state
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number; dir: 'up' | 'down' | 'left' | 'right'; isMoving: boolean }>({
    x: 480,
    y: 380,
    dir: 'down',
    isMoving: false
  });

  const [hoveredEntity, setHoveredEntity] = useState<{ type: 'founder' | 'room' | 'cafe' | 'elevator' | 'fitt'; data: any } | null>(null);
  const [nearbyFounder, setNearbyFounder] = useState<Founder | null>(null);
  const [playerEmote, setPlayerEmote] = useState<{ text: string; timer: number } | null>(null);

  const targetPosRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const stepSoundThrottle = useRef<number>(0);

  // Set up crisp HiDPI canvas resolution
  useEffect(() => {
    const updateCanvasDPI = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.max(window.devicePixelRatio || 1, 2); // support 2x/3x Retina & Windows Display Scaling (125%, 150%, 200%)
      canvas.width = Math.round(LOGICAL_WIDTH * dpr);
      canvas.height = Math.round(LOGICAL_HEIGHT * dpr);
      canvas.style.width = `${LOGICAL_WIDTH}px`;
      canvas.style.height = `${LOGICAL_HEIGHT}px`;
    };

    updateCanvasDPI();
    window.addEventListener('resize', updateCanvasDPI);
    return () => window.removeEventListener('resize', updateCanvasDPI);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const speed = 14;
      let dx = 0;
      let dy = 0;
      let newDir = playerPos.dir;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        dy = -speed;
        newDir = 'up';
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        dy = speed;
        newDir = 'down';
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        dx = -speed;
        newDir = 'left';
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        dx = speed;
        newDir = 'right';
      } else if ((e.key === 'e' || e.key === 'E') && nearbyFounder) {
        onSelectFounder(nearbyFounder);
        soundEffects.playKnockKnock();
        return;
      }

      if (dx !== 0 || dy !== 0) {
        e.preventDefault();
        targetPosRef.current = null;
        setPlayerPos(prev => {
          const nextX = Math.max(35, Math.min(LOGICAL_WIDTH - 35, prev.x + dx));
          const nextY = Math.max(35, Math.min(LOGICAL_HEIGHT - 35, prev.y + dy));
          return { x: nextX, y: nextY, dir: newDir, isMoving: true };
        });

        const now = Date.now();
        if (now - stepSoundThrottle.current > 200) {
          soundEffects.playFootstep();
          stepSoundThrottle.current = now;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'].includes(e.key)) {
        setPlayerPos(prev => ({ ...prev, isMoving: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPos.dir, nearbyFounder, onSelectFounder]);

  // Translate mouse event to logical canvas coordinates
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * LOGICAL_WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * LOGICAL_HEIGHT;
    return { x, y };
  };

  // Click on floor to walk or interact
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x: clickX, y: clickY } = getCanvasCoords(e);

    // Elevator
    const elevator = floor.commonAreas.find(a => a.type === 'elevator');
    if (elevator && clickX >= elevator.x && clickX <= elevator.x + elevator.width && clickY >= elevator.y && clickY <= elevator.y + elevator.height) {
      soundEffects.playElevatorDing();
      onOpenElevator();
      return;
    }

    // Meeting rooms
    for (const room of floor.rooms) {
      if (clickX >= room.x && clickX <= room.x + room.width && clickY >= room.y && clickY <= room.y + room.height) {
        soundEffects.playDing();
        onEnterMeetingRoom(room);
        return;
      }
    }

    // Coffee bar
    const coffeeBar = floor.commonAreas.find(a => a.type === 'coffee_bar');
    if (coffeeBar && clickX >= coffeeBar.x && clickX <= coffeeBar.x + coffeeBar.width && clickY >= coffeeBar.y && clickY <= coffeeBar.y + coffeeBar.height) {
      soundEffects.playDing();
      setPlayerEmote({ text: '☕ Grabbed freshly brewed espresso!', timer: Date.now() + 3000 });
      targetPosRef.current = { x: coffeeBar.x + coffeeBar.width / 2, y: coffeeBar.y + coffeeBar.height / 2 };
      return;
    }

    // Founder desks
    for (const founder of floor.founders) {
      const dx = clickX - founder.deskCoord.x;
      const dy = clickY - founder.deskCoord.y;
      if (Math.abs(dx) <= 65 && Math.abs(dy) <= 55) {
        soundEffects.playKnockKnock();
        onSelectFounder(founder);
        targetPosRef.current = { x: founder.deskCoord.x + 40, y: founder.deskCoord.y + 65 };
        return;
      }
    }

    // FITT desks (on floor 4)
    if (floor.id === 4) {
      for (const fitt of fittTeam) {
        const dx = clickX - fitt.officeDeskCoord.x;
        const dy = clickY - fitt.officeDeskCoord.y;
        if (Math.abs(dx) <= 50 && Math.abs(dy) <= 40) {
          soundEffects.playDing();
          setPlayerEmote({ text: `👋 Meeting with ${fitt.name} (${fitt.title})`, timer: Date.now() + 3000 });
          targetPosRef.current = { x: fitt.officeDeskCoord.x - 40, y: fitt.officeDeskCoord.y };
          return;
        }
      }
    }

    // Normal floor walk
    targetPosRef.current = { x: clickX, y: clickY };
    soundEffects.playFootstep();
  };

  // Hover detection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x: mx, y: my } = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (const founder of floor.founders) {
      const dx = mx - founder.deskCoord.x;
      const dy = my - founder.deskCoord.y;
      if (Math.abs(dx) <= 65 && Math.abs(dy) <= 55) {
        setHoveredEntity({ type: 'founder', data: founder });
        canvas.style.cursor = 'pointer';
        return;
      }
    }

    for (const room of floor.rooms) {
      if (mx >= room.x && mx <= room.x + room.width && my >= room.y && my <= room.y + room.height) {
        setHoveredEntity({ type: 'room', data: room });
        canvas.style.cursor = 'pointer';
        return;
      }
    }

    const elevator = floor.commonAreas.find(a => a.type === 'elevator');
    if (elevator && mx >= elevator.x && mx <= elevator.x + elevator.width && my >= elevator.y && my <= elevator.y + elevator.height) {
      setHoveredEntity({ type: 'elevator', data: elevator });
      canvas.style.cursor = 'pointer';
      return;
    }

    const coffee = floor.commonAreas.find(a => a.type === 'coffee_bar');
    if (coffee && mx >= coffee.x && mx <= coffee.x + coffee.width && my >= coffee.y && my <= coffee.y + coffee.height) {
      setHoveredEntity({ type: 'cafe', data: coffee });
      canvas.style.cursor = 'pointer';
      return;
    }

    setHoveredEntity(null);
    canvas.style.cursor = 'crosshair';
  };

  // Proximity calculation loop
  useEffect(() => {
    let closest: Founder | null = null;
    let minDist = 120;

    for (const founder of floor.founders) {
      const dist = Math.hypot(playerPos.x - founder.deskCoord.x, playerPos.y - founder.deskCoord.y);
      if (dist < minDist) {
        minDist = dist;
        closest = founder;
      }
    }

    setNearbyFounder(closest);
  }, [playerPos.x, playerPos.y, floor.founders]);

  // Main rendering loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 2);

    // Handle smooth interpolation towards targetPosRef
    if (targetPosRef.current) {
      const dx = targetPosRef.current.x - playerPos.x;
      const dy = targetPosRef.current.y - playerPos.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 4) {
        targetPosRef.current = null;
        setPlayerPos(p => ({ ...p, isMoving: false }));
      } else {
        const step = Math.min(dist, 5.5);
        const nx = playerPos.x + (dx / dist) * step;
        const ny = playerPos.y + (dy / dist) * step;
        let dir = playerPos.dir;
        if (Math.abs(dx) > Math.abs(dy)) {
          dir = dx > 0 ? 'right' : 'left';
        } else {
          dir = dy > 0 ? 'down' : 'up';
        }

        const now = Date.now();
        if (now - stepSoundThrottle.current > 220) {
          soundEffects.playFootstep();
          stepSoundThrottle.current = now;
        }

        setPlayerPos({ x: nx, y: ny, dir, isMoving: true });
      }
    }

    // Reset transform and apply DPR scaling for crisp razor-sharp rendering
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // High quality subpixel text rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Clear & Background Floor
    ctx.fillStyle = '#FAF7EE'; // warm paper tone
    ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);

    // Architectural grid dots
    ctx.fillStyle = '#E2DBCB';
    const dotSpacing = 24;
    for (let x = 12; x < LOGICAL_WIDTH; x += dotSpacing) {
      for (let y = 12; y < LOGICAL_HEIGHT; y += dotSpacing) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    // 2. Floor Border & Perimeter Wall
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, LOGICAL_WIDTH - 20, LOGICAL_HEIGHT - 20);

    // Inner architectural safety line
    ctx.strokeStyle = '#D8CFBC';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, LOGICAL_WIDTH - 40, LOGICAL_HEIGHT - 40);

    // 3. Render Common Areas (Elevator, Coffee Bar, Water Cooler)
    floor.commonAreas.forEach(area => {
      ctx.save();
      if (area.type === 'elevator') {
        // Elevator Shaft with drop shadow
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

        ctx.fillStyle = '#E6E1D6';
        ctx.fillRect(area.x, area.y, area.width, area.height);
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 2;
        ctx.strokeRect(area.x, area.y, area.width, area.height);

        // Elevator Doors
        const doorW = (area.width - 24) / 2;
        ctx.fillStyle = '#D6CEBC';
        ctx.fillRect(area.x + 8, area.y + 24, doorW, area.height - 32);
        ctx.fillRect(area.x + 8 + doorW + 4, area.y + 24, doorW, area.height - 32);
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(area.x + 8, area.y + 24, doorW, area.height - 32);
        ctx.strokeRect(area.x + 8 + doorW + 4, area.y + 24, doorW, area.height - 32);

        // Indicator Screen
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(area.x + area.width / 2 - 28, area.y + 6, 56, 14);
        ctx.fillStyle = '#FFDE59';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`FL 0${floor.id} ▲`, area.x + area.width / 2, area.y + 13);

        // Label
        ctx.fillStyle = '#1A1A1A';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.fillText('LIFT BAY [CLICK]', area.x + area.width / 2, area.y + area.height + 15);
      } else if (area.type === 'coffee_bar') {
        // Coffee Lounge
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

        ctx.fillStyle = '#F5EDE0';
        ctx.fillRect(area.x, area.y, area.width, area.height);
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 2;
        ctx.strokeRect(area.x, area.y, area.width, area.height);

        // Countertop
        ctx.fillStyle = '#78350F';
        ctx.fillRect(area.x + 10, area.y + 15, area.width - 20, 24);
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(area.x + 10, area.y + 15, area.width - 20, 24);

        // Espresso Machine
        ctx.fillStyle = '#334155';
        ctx.fillRect(area.x + 25, area.y + 10, 36, 18);
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(area.x + 54, area.y + 13, 3, 3); // red LED

        // Steam puff
        const steamPhase = (Date.now() / 400) % 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(area.x + 40, area.y + 4 - steamPhase * 4, 3, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#1A1A1A';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('☕ CAFE LOUNGE', area.x + area.width / 2, area.y + area.height - 14);
      } else if (area.type === 'watercooler') {
        // Water Cooler with shadow
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

        ctx.fillStyle = '#E0F2FE';
        ctx.fillRect(area.x, area.y, area.width, area.height);
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 2;
        ctx.strokeRect(area.x, area.y, area.width, area.height);

        // Water Bottle
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.arc(area.x + area.width / 2, area.y + 26, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#1A1A1A';
        ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('WATERCOOLER', area.x + area.width / 2, area.y + area.height - 12);
      }
      ctx.restore();
    });

    // 4. Render Meeting Rooms (With Clean Integrated Title Bar so text never overlaps!)
    floor.rooms.forEach(room => {
      ctx.save();

      // Shadow
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(room.x + 3, room.y + 3, room.width, room.height);

      // Glass enclosure body
      ctx.fillStyle = room.isOccupied ? '#FEF9C3' : '#EFF6FF';
      ctx.fillRect(room.x, room.y, room.width, room.height);
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 2;
      ctx.strokeRect(room.x, room.y, room.width, room.height);

      // Dedicated Top Title Bar
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(room.x, room.y, room.width, 24);

      // Room Title (Left aligned)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const truncatedRoomName = room.name.length > 20 ? room.name.slice(0, 18) + '...' : room.name;
      ctx.fillText(`🚪 ${truncatedRoomName}`, room.x + 8, room.y + 12);

      // Room Status Badge (Right aligned, completely separated from title)
      const statusPillW = room.isOccupied ? 82 : 74;
      const statusPillX = room.x + room.width - statusPillW - 4;
      ctx.fillStyle = room.isOccupied ? '#DC2626' : '#10B981';
      ctx.fillRect(statusPillX, room.y + 4, statusPillW, 16);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(room.isOccupied ? '🔴 IN SESSION' : '🟢 AVAILABLE', statusPillX + statusPillW / 2, room.y + 12);

      // Conference Table in Center
      const tableW = room.width - 60;
      const tableH = room.height - 65;
      const tableX = room.x + 30;
      const tableY = room.y + 36;

      ctx.fillStyle = '#E2D9C8';
      ctx.fillRect(tableX, tableY, tableW, tableH);
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(tableX, tableY, tableW, tableH);

      // Conference chairs around table
      const chairCount = 3;
      for (let i = 0; i < chairCount; i++) {
        const cx = tableX + 16 + i * ((tableW - 32) / (chairCount - 1));
        ctx.fillStyle = '#475569';
        ctx.fillRect(cx - 7, tableY - 7, 14, 6);
        ctx.fillRect(cx - 7, tableY + tableH + 1, 14, 6);
      }

      // Glass door notch at bottom
      ctx.clearRect(room.x + room.width / 2 - 18, room.y + room.height - 2, 36, 4);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(room.x + room.width / 2 - 18, room.y + room.height);
      ctx.lineTo(room.x + room.width / 2 - 6, room.y + room.height - 8);
      ctx.stroke();

      ctx.restore();
    });

    // 5. Render Founder Desks
    floor.founders.forEach(founder => {
      const { x, y } = founder.deskCoord;
      const isSelected = selectedFounder?.id === founder.id;
      const isNearby = nearbyFounder?.id === founder.id;
      const isHovered = hoveredEntity?.type === 'founder' && hoveredEntity.data.id === founder.id;

      ctx.save();

      // Nearby / Selected Ring
      if (isSelected || isNearby || isHovered) {
        ctx.fillStyle = isSelected ? 'rgba(79, 70, 229, 0.18)' : 'rgba(255, 202, 84, 0.25)';
        ctx.beginPath();
        ctx.roundRect(x - 52, y - 42, 104, 98, [8]);
        ctx.fill();

        ctx.strokeStyle = isSelected ? '#4F46E5' : '#D97706';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Hard offset shadow for desk
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(x - 42 + 4, y - 28 + 4, 84, 56);

      // Desk Surface (Wood tone)
      ctx.fillStyle = '#F4EDE0';
      ctx.fillRect(x - 42, y - 28, 84, 56);
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 42, y - 28, 84, 56);

      // Main Computer Monitor
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(x - 30, y - 22, 34, 20);
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x - 30, y - 22, 34, 20);

      // Monitor Screen (green code lines)
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(x - 28, y - 20, 30, 16);
      ctx.fillStyle = '#22C55E';
      ctx.fillRect(x - 25, y - 17, 14, 1.5);
      ctx.fillRect(x - 25, y - 13, 20, 1.5);
      ctx.fillRect(x - 25, y - 9, 10, 1.5);

      // Second Vertical Monitor
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(x + 10, y - 26, 18, 24);
      ctx.strokeRect(x + 10, y - 26, 18, 24);
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(x + 12, y - 24, 14, 20);
      ctx.fillStyle = '#38BDF8';
      ctx.fillRect(x + 14, y - 20, 10, 1.5);
      ctx.fillRect(x + 14, y - 16, 8, 1.5);

      // Keyboard & Mouse
      ctx.fillStyle = '#64748B';
      ctx.fillRect(x - 22, y + 2, 22, 8);
      ctx.fillRect(x + 8, y + 4, 6, 6);

      // Coffee Mug
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(x + 28, y + 14, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Desk Nameplate (Crisp, High-contrast, cleanly proportioned)
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(x - 48, y + 32, 96, 18);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const cleanStartupLabel = `#${founder.deskNumber} ${founder.startupName.length > 10 ? founder.startupName.slice(0, 9) + '..' : founder.startupName}`;
      ctx.fillText(cleanStartupLabel, x, y + 41);

      // Founder Avatar sitting behind desk
      drawAvatar(ctx, x, y - 4, founder.avatar, 'up', false);

      // Status Indicator Bead on Desk Corner
      let statusColor = '#22C55E';
      if (founder.status === 'meeting') statusColor = '#A855F7';
      if (founder.status === 'pitching') statusColor = '#EAB308';
      if (founder.status === 'seeking_grant') statusColor = '#EC4899';
      if (founder.status === 'coffee') statusColor = '#F97316';

      ctx.fillStyle = statusColor;
      ctx.beginPath();
      ctx.arc(x + 34, y - 22, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Speech bubble snippet floating above desk
      const bubbleTime = (Date.now() / 1000 + founder.deskNumber) % 8;
      if (bubbleTime < 5) {
        let snippet = '💻 coding';
        if (founder.status === 'meeting') snippet = '🤝 in meet';
        if (founder.status === 'pitching') snippet = '🚀 pitch';
        if (founder.status === 'seeking_grant') snippet = '📜 grant req';
        if (founder.status === 'open_for_chat') snippet = '👋 open to chat';

        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        const bubbleW = ctx.measureText(snippet).width + 14;
        const bubbleX = x - bubbleW / 2;
        const bubbleY = y - 54;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(bubbleX, bubbleY, bubbleW, 16);
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(bubbleX, bubbleY, bubbleW, 16);

        ctx.fillStyle = '#1A1A1A';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(snippet, x, bubbleY + 8);
      }

      ctx.restore();
    });

    // 6. On Floor 4: Render FITT Team Desks
    if (floor.id === 4) {
      fittTeam.forEach((fitt) => {
        const { x, y } = fitt.officeDeskCoord;
        ctx.save();

        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(x - 32 + 3, y - 22 + 3, 64, 44);

        // FITT Crimson Executive Desk
        ctx.fillStyle = '#FCE7F3';
        ctx.fillRect(x - 32, y - 22, 64, 44);
        ctx.strokeStyle = '#9E1B32';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(x - 32, y - 22, 64, 44);

        // Laptop
        ctx.fillStyle = '#334155';
        ctx.fillRect(x - 16, y - 16, 32, 18);
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(x - 14, y - 14, 28, 14);
        ctx.fillStyle = '#9E1B32';
        ctx.fillRect(x - 12, y - 10, 24, 2);

        // FITT Executive Nameplate
        ctx.fillStyle = '#9E1B32';
        ctx.fillRect(x - 42, y + 26, 84, 18);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`★ ${fitt.name.split(' ')[0]} (FITT)`, x, y + 35);

        // Avatar
        drawAvatar(ctx, x, y - 2, fitt.avatar, 'left', false);

        ctx.restore();
      });
    }

    // 7. Render Animated Flying Envelopes
    activeEnvelopes.forEach(envelope => {
      ctx.save();
      const currentX = envelope.fromX + (envelope.toX - envelope.fromX) * envelope.progress;
      const currentY = envelope.fromY + (envelope.toY - envelope.fromY) * envelope.progress;
      const arcHeight = Math.sin(envelope.progress * Math.PI) * 60;
      const renderY = currentY - arcHeight;

      // Drop shadow on floor
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(currentX, currentY + 10, 14 * (1 - arcHeight / 100), 7 * (1 - arcHeight / 100), 0, 0, Math.PI * 2);
      ctx.fill();

      // Envelope Body
      ctx.fillStyle = '#FFFBEB';
      ctx.fillRect(currentX - 14, renderY - 10, 28, 20);
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 2;
      ctx.strokeRect(currentX - 14, renderY - 10, 28, 20);

      // Flap crease
      ctx.beginPath();
      ctx.moveTo(currentX - 14, renderY - 10);
      ctx.lineTo(currentX, renderY);
      ctx.lineTo(currentX + 14, renderY - 10);
      ctx.stroke();

      // Red Wax Seal Stamp
      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.arc(currentX, renderY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    // 8. Render Player Avatar
    ctx.save();
    // Shadow under player
    ctx.fillStyle = 'rgba(26, 26, 26, 0.25)';
    ctx.beginPath();
    ctx.ellipse(playerPos.x, playerPos.y + 16, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw user avatar based on role
    const playerAvatarStyle = userRole === 'fitt_team'
      ? { skinTone: '#F1C27D', hairColor: '#1A1A1A', shirtColor: '#9E1B32', accessory: 'glasses' as const }
      : { skinTone: '#E0AC69', hairColor: '#3B2016', shirtColor: '#2563EB', accessory: 'headphones' as const };

    drawAvatar(ctx, playerPos.x, playerPos.y, playerAvatarStyle, playerPos.dir, playerPos.isMoving);

    // Player name badge above head (Clean pill styling)
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(playerPos.x - 34, playerPos.y - 34, 68, 16);
    ctx.fillStyle = '#FFDE59';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(userRole === 'fitt_team' ? '★ YOU (FITT)' : 'YOU (FOUNDER)', playerPos.x, playerPos.y - 26);

    // Render Player emote popup if active
    if (playerEmote && Date.now() < playerEmote.timer) {
      ctx.font = 'bold 10.5px "Plus Jakarta Sans", sans-serif';
      const emoteW = ctx.measureText(playerEmote.text).width + 18;
      const emoteX = playerPos.x - emoteW / 2;
      const emoteY = playerPos.y - 62;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(emoteX, emoteY, emoteW, 22);
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 2;
      ctx.strokeRect(emoteX, emoteY, emoteW, 22);

      ctx.fillStyle = '#1A1A1A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(playerEmote.text, playerPos.x, emoteY + 11);
    }

    ctx.restore();

    // 9. Floating Nearby Interaction Callout (High visibility, cleanly elevated)
    if (nearbyFounder) {
      ctx.save();
      const calloutX = nearbyFounder.deskCoord.x;
      const calloutY = nearbyFounder.deskCoord.y - 74;

      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      const promptText = `⚡ PRESS [E] OR CLICK TO MEET ${nearbyFounder.name.split(' ')[0].toUpperCase()}`;
      const calloutW = ctx.measureText(promptText).width + 24;
      const calloutH = 28;

      // Shadow
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(calloutX - calloutW / 2 + 4, calloutY + 4, calloutW, calloutH);

      // Box
      ctx.fillStyle = '#FFDE59';
      ctx.fillRect(calloutX - calloutW / 2, calloutY, calloutW, calloutH);
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 2;
      ctx.strokeRect(calloutX - calloutW / 2, calloutY, calloutW, calloutH);

      // Text
      ctx.fillStyle = '#1A1A1A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(promptText, calloutX, calloutY + calloutH / 2);
      ctx.restore();
    }

    // Schedule next frame
    animFrameRef.current = requestAnimationFrame(render);
  }, [floor, fittTeam, selectedFounder, nearbyFounder, hoveredEntity, activeEnvelopes, playerPos, playerEmote, userRole]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [render]);

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        className="office-floor-canvas"
      />
      <div className="canvas-controls-hint">
        <span className="key-tag">W</span>
        <span className="key-tag">A</span>
        <span className="key-tag">S</span>
        <span className="key-tag">D</span>
        <span>or Click floor to walk</span>
        <span className="divider">|</span>
        <span className="key-tag">E</span>
        <span>to interact with desk</span>
      </div>
    </div>
  );
};

// Helper: Custom vector pixel avatar renderer with leg animation and facing direction
function drawAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  avatar: { skinTone: string; hairColor: string; shirtColor: string; accessory?: string },
  dir: 'up' | 'down' | 'left' | 'right',
  isMoving: boolean
) {
  const stepOffset = isMoving ? Math.sin(Date.now() / 100) * 3 : 0;

  // Legs / Trousers
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(x - 5, y + 10, 4, 8 + stepOffset);
  ctx.fillRect(x + 1, y + 10, 4, 8 - stepOffset);

  // Shoes
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(x - 6, y + 18 + stepOffset, 5, 3);
  ctx.fillRect(x + 1, y + 18 - stepOffset, 5, 3);

  // Shirt / Torso
  ctx.fillStyle = avatar.shirtColor;
  ctx.fillRect(x - 8, y - 2, 16, 13);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x - 8, y - 2, 16, 13);

  // Collar detail
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(x - 3, y - 2);
  ctx.lineTo(x, y + 2);
  ctx.lineTo(x + 3, y - 2);
  ctx.fill();

  // Head (Skin)
  ctx.fillStyle = avatar.skinTone;
  ctx.beginPath();
  ctx.arc(x, y - 10, 7.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Hair
  ctx.fillStyle = avatar.hairColor;
  if (dir !== 'up') {
    ctx.beginPath();
    ctx.arc(x, y - 12, 7.5, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x - 7.5, y - 12, 15, 3);
  } else {
    ctx.beginPath();
    ctx.arc(x, y - 11, 7.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Eyes and glasses
  if (dir !== 'up') {
    if (avatar.accessory === 'glasses') {
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x - 5, y - 11, 4, 3);
      ctx.strokeRect(x + 1, y - 11, 4, 3);
      ctx.beginPath();
      ctx.moveTo(x - 1, y - 10);
      ctx.lineTo(x + 1, y - 10);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(x - 4, y - 10, 2, 2);
      ctx.fillRect(x + 2, y - 10, 2, 2);
    }
  }

  // Headphones accessory
  if (avatar.accessory === 'headphones') {
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x, y - 11, 9, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(x - 9, y - 12, 3, 5);
    ctx.fillRect(x + 6, y - 12, 3, 5);
  }
}
