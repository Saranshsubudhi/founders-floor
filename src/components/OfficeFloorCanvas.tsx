import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Floor, Founder, FITTTeamMember, EnvelopeFlight, MeetingRoom, CommonArea } from '../types';
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
    y: 395,
    dir: 'down',
    isMoving: false
  });

  const [hoveredEntity, setHoveredEntity] = useState<{ type: 'founder' | 'room' | 'common_area' | 'fitt'; data: any } | null>(null);
  const [playerEmote, setPlayerEmote] = useState<{ text: string; timer: number } | null>(null);

  // Proximity calculation (derived before effects)
  let nearbyFounder: Founder | null = null;
  let minDist = 110;
  for (const founder of floor.founders) {
    const dist = Math.hypot(playerPos.x - founder.deskCoord.x, playerPos.y - founder.deskCoord.y);
    if (dist < minDist) {
      minDist = dist;
      nearbyFounder = founder;
    }
  }

  const targetPosRef = useRef<{ x: number; y: number } | null>(null);
  const stepSoundThrottle = useRef<number>(0);

  // Set up crisp HiDPI canvas resolution
  useEffect(() => {
    const updateCanvasDPI = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.max(window.devicePixelRatio || 1, 2);
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

    // 1. Elevator
    const elevator = floor.commonAreas.find(a => a.type === 'elevator');
    if (elevator && clickX >= elevator.x && clickX <= elevator.x + elevator.width && clickY >= elevator.y && clickY <= elevator.y + elevator.height) {
      soundEffects.playElevatorDing();
      onOpenElevator();
      return;
    }

    // 2. Meeting rooms
    for (const room of floor.rooms) {
      if (clickX >= room.x && clickX <= room.x + room.width && clickY >= room.y && clickY <= room.y + room.height) {
        soundEffects.playDing();
        onEnterMeetingRoom(room);
        return;
      }
    }

    // 3. Common areas & Exciting Zones (Arcade, Ping Pong, Server Room, 3D Printer, Lounge, Arena, Cafe, Watercooler, Gong)
    for (const area of floor.commonAreas) {
      if (clickX >= area.x && clickX <= area.x + area.width && clickY >= area.y && clickY <= area.y + area.height) {
        if (area.type === 'arcade') soundEffects.playArcadeBlip();
        else if (area.type === 'pingpong') soundEffects.playPingPongBounce();
        else if (area.type === 'pitch_gong') soundEffects.playGong();
        else if (area.type === 'server_room' || area.type === 'prototyping_bench') soundEffects.playSciFiChirp();
        else if (area.type === 'watercooler') soundEffects.playWaterGulp();
        else soundEffects.playDing();

        const emoteMsg = area.interactEmote || `📍 Interacting with ${area.name}`;
        setPlayerEmote({ text: emoteMsg, timer: Date.now() + 3500 });
        
        // Move towards front of area
        const destY = area.y > 380 ? Math.max(40, area.y - 25) : Math.min(LOGICAL_HEIGHT - 40, area.y + area.height + 25);
        targetPosRef.current = { x: area.x + area.width / 2, y: destY };
        return;
      }
    }

    // 4. Founder desks
    for (const founder of floor.founders) {
      const dx = clickX - founder.deskCoord.x;
      const dy = clickY - founder.deskCoord.y;
      if (Math.abs(dx) <= 60 && Math.abs(dy) <= 50) {
        soundEffects.playKnockKnock();
        onSelectFounder(founder);
        targetPosRef.current = { x: founder.deskCoord.x + 35, y: founder.deskCoord.y + 60 };
        return;
      }
    }

    // 5. FITT desks (on floor 4)
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

    // 6. Normal floor walk
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
      if (Math.abs(dx) <= 60 && Math.abs(dy) <= 50) {
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

    for (const area of floor.commonAreas) {
      if (mx >= area.x && mx <= area.x + area.width && my >= area.y && my <= area.y + area.height) {
        setHoveredEntity({ type: 'common_area', data: area });
        canvas.style.cursor = 'pointer';
        return;
      }
    }

    if (floor.id === 4) {
      for (const fitt of fittTeam) {
        const dx = mx - fitt.officeDeskCoord.x;
        const dy = my - fitt.officeDeskCoord.y;
        if (Math.abs(dx) <= 50 && Math.abs(dy) <= 40) {
          setHoveredEntity({ type: 'fitt', data: fitt });
          canvas.style.cursor = 'pointer';
          return;
        }
      }
    }

    setHoveredEntity(null);
    canvas.style.cursor = 'crosshair';
  };



  // Main rendering loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 2);

    // Smooth walking interpolation
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

    // Reset transform & scale for Retina / 4K Displays
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Clear & Background
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

    // 2. Perimeter Walls & Architectural safety line
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, LOGICAL_WIDTH - 20, LOGICAL_HEIGHT - 20);

    ctx.strokeStyle = '#D8CFBC';
    ctx.lineWidth = 1;
    ctx.strokeRect(18, 18, LOGICAL_WIDTH - 36, LOGICAL_HEIGHT - 36);

    // 3. Render Common Areas & Exciting Floor Amenities
    floor.commonAreas.forEach(area => {
      ctx.save();
      if (area.type === 'elevator') {
        drawElevator(ctx, area, floor.id);
      } else if (area.type === 'coffee_bar') {
        drawCoffeeBar(ctx, area, floor.id);
      } else if (area.type === 'watercooler') {
        drawWatercooler(ctx, area);
      } else if (area.type === 'server_room' || area.type === 'feature_pod') {
        drawServerOrFeaturePod(ctx, area, floor.id);
      } else if (area.type === 'prototyping_bench') {
        drawPrototypingBench(ctx, area, floor.id);
      } else if (area.type === 'arcade') {
        drawArcade(ctx, area);
      } else if (area.type === 'pingpong') {
        drawPingPong(ctx, area);
      } else if (area.type === 'whiteboard') {
        drawWhiteboard(ctx, area, floor.id);
      } else if (area.type === 'pitch_gong') {
        drawPitchGong(ctx, area);
      } else if (area.type === 'lounge') {
        drawLounge(ctx, area);
      } else if (area.type === 'special_arena') {
        drawSpecialArena(ctx, area, floor.id);
      }
      ctx.restore();
    });

    // 4. Render Meeting Rooms
    floor.rooms.forEach(room => {
      ctx.save();
      drawMeetingRoom(ctx, room);
      ctx.restore();
    });

    // 5. Render Founder Desks
    floor.founders.forEach(founder => {
      const isSelected = selectedFounder?.id === founder.id;
      const isNearby = nearbyFounder?.id === founder.id;
      const isHovered = hoveredEntity?.type === 'founder' && hoveredEntity.data.id === founder.id;

      ctx.save();
      drawFounderDesk(ctx, founder, isSelected, isNearby, isHovered);
      ctx.restore();
    });

    // 6. On Floor 4: Render FITT Team Desks
    if (floor.id === 4) {
      fittTeam.forEach((fitt) => {
        ctx.save();
        drawFITTDesk(ctx, fitt);
        ctx.restore();
      });
    }

    // 7. Render Animated Flying Envelopes
    activeEnvelopes.forEach(envelope => {
      ctx.save();
      const currentX = envelope.fromX + (envelope.toX - envelope.fromX) * envelope.progress;
      const currentY = envelope.fromY + (envelope.toY - envelope.fromY) * envelope.progress;
      const arcHeight = Math.sin(envelope.progress * Math.PI) * 55;
      const renderY = currentY - arcHeight;

      // Drop shadow on floor
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(currentX, currentY + 10, 14 * (1 - arcHeight / 100), 7 * (1 - arcHeight / 100), 0, 0, Math.PI * 2);
      ctx.fill();

      // Envelope body
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
    ctx.fillStyle = 'rgba(26, 26, 26, 0.25)';
    ctx.beginPath();
    ctx.ellipse(playerPos.x, playerPos.y + 16, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    const playerAvatarStyle = userRole === 'fitt_team'
      ? { skinTone: '#F1C27D', hairColor: '#1A1A1A', shirtColor: '#9E1B32', accessory: 'glasses' as const }
      : { skinTone: '#E0AC69', hairColor: '#3B2016', shirtColor: '#2563EB', accessory: 'headphones' as const };

    drawAvatar(ctx, playerPos.x, playerPos.y, playerAvatarStyle, playerPos.dir, playerPos.isMoving);

    // Player name badge above head
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(playerPos.x - 36, playerPos.y - 34, 72, 16);
    ctx.fillStyle = '#FFDE59';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(userRole === 'fitt_team' ? '★ YOU (FITT)' : 'YOU (FOUNDER)', playerPos.x, playerPos.y - 26);

    // Render Player emote popup if active
    if (playerEmote && Date.now() < playerEmote.timer) {
      ctx.font = 'bold 10.5px "Plus Jakarta Sans", sans-serif';
      const emoteW = ctx.measureText(playerEmote.text).width + 20;
      const emoteX = playerPos.x - emoteW / 2;
      const emoteY = playerPos.y - 64;

      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(emoteX + 3, emoteY + 3, emoteW, 22);

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

    // 9. Nearby Desk Interaction Prompt
    if (nearbyFounder) {
      ctx.save();
      const calloutX = nearbyFounder.deskCoord.x;
      const calloutY = nearbyFounder.deskCoord.y - 70;

      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      const promptText = `⚡ PRESS [E] OR CLICK TO MEET ${nearbyFounder.name.split(' ')[0].toUpperCase()} (#${nearbyFounder.deskNumber})`;
      const calloutW = ctx.measureText(promptText).width + 24;
      const calloutH = 26;

      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(calloutX - calloutW / 2 + 3, calloutY + 3, calloutW, calloutH);

      ctx.fillStyle = '#FFDE59';
      ctx.fillRect(calloutX - calloutW / 2, calloutY, calloutW, calloutH);
      ctx.strokeStyle = '#1A1A1A';
      ctx.lineWidth = 2;
      ctx.strokeRect(calloutX - calloutW / 2, calloutY, calloutW, calloutH);

      ctx.fillStyle = '#1A1A1A';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(promptText, calloutX, calloutY + calloutH / 2);
      ctx.restore();
    }

  }, [floor, fittTeam, selectedFounder, nearbyFounder, hoveredEntity, activeEnvelopes, playerPos, playerEmote, userRole]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      render();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => {
      if (animId) cancelAnimationFrame(animId);
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
        <span className="divider">|</span>
        <span>Click 3D Printer, Server Racks, Arcade, Table Tennis & Lounges to interact!</span>
      </div>
    </div>
  );
};

// ============================================================================
// DRAWING ROUTINES: RETRO ARCHITECTURAL / BLUEPRINT GRAPHICS
// ============================================================================

// Meeting Room Renderer
function drawMeetingRoom(ctx: CanvasRenderingContext2D, room: MeetingRoom) {
  // Shadow
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(room.x + 3, room.y + 3, room.width, room.height);

  // Glass enclosure body
  ctx.fillStyle = room.isOccupied ? '#FEF9C3' : '#EFF6FF';
  ctx.fillRect(room.x, room.y, room.width, room.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(room.x, room.y, room.width, room.height);

  // Top Title Bar
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(room.x, room.y, room.width, 24);

  // Room Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const truncTitle = room.name.length > 20 ? room.name.slice(0, 18) + '..' : room.name;
  ctx.fillText(`🚪 ${truncTitle}`, room.x + 8, room.y + 12);

  // Status Badge
  const statusW = room.isOccupied ? 80 : 72;
  const statusX = room.x + room.width - statusW - 4;
  ctx.fillStyle = room.isOccupied ? '#DC2626' : '#10B981';
  ctx.fillRect(statusX, room.y + 4, statusW, 16);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(room.isOccupied ? '🔴 IN SESSION' : '🟢 AVAILABLE', statusX + statusW / 2, room.y + 12);

  // Conference Table in Center
  const tableW = room.width - 50;
  const tableH = room.height - 62;
  const tableX = room.x + 25;
  const tableY = room.y + 36;

  ctx.fillStyle = '#E2D9C8';
  ctx.fillRect(tableX, tableY, tableW, tableH);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(tableX, tableY, tableW, tableH);

  // Chairs
  const chairCount = 3;
  for (let i = 0; i < chairCount; i++) {
    const cx = tableX + 14 + i * ((tableW - 28) / (chairCount - 1));
    ctx.fillStyle = '#475569';
    ctx.fillRect(cx - 7, tableY - 7, 14, 6);
    ctx.fillRect(cx - 7, tableY + tableH + 1, 14, 6);
  }

  // Door notch
  ctx.clearRect(room.x + room.width / 2 - 16, room.y + room.height - 2, 32, 4);
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(room.x + room.width / 2 - 16, room.y + room.height);
  ctx.lineTo(room.x + room.width / 2 - 4, room.y + room.height - 7);
  ctx.stroke();
}

// Elevator Shaft Renderer
function drawElevator(ctx: CanvasRenderingContext2D, area: CommonArea, floorId: number) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#E6E1D6';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Doors
  const doorW = (area.width - 24) / 2;
  ctx.fillStyle = '#D6CEBC';
  ctx.fillRect(area.x + 8, area.y + 24, doorW, area.height - 32);
  ctx.fillRect(area.x + 8 + doorW + 4, area.y + 24, doorW, area.height - 32);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(area.x + 8, area.y + 24, doorW, area.height - 32);
  ctx.strokeRect(area.x + 8 + doorW + 4, area.y + 24, doorW, area.height - 32);

  // Screen
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + area.width / 2 - 28, area.y + 6, 56, 14);
  ctx.fillStyle = '#FFDE59';
  ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`FL 0${floorId} ▲`, area.x + area.width / 2, area.y + 13);

  // Label
  ctx.fillStyle = '#1A1A1A';
  ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
  ctx.fillText('LIFT BAY [CLICK]', area.x + area.width / 2, area.y + area.height + 15);
}

// Coffee Bar Renderer
function drawCoffeeBar(ctx: CanvasRenderingContext2D, area: CommonArea, floorId: number) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#F5EDE0';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Countertop
  ctx.fillStyle = '#78350F';
  ctx.fillRect(area.x + 10, area.y + 16, area.width - 20, 26);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(area.x + 10, area.y + 16, area.width - 20, 26);

  // Espresso machine
  ctx.fillStyle = '#334155';
  ctx.fillRect(area.x + 22, area.y + 10, 38, 20);
  ctx.fillStyle = '#EF4444';
  ctx.fillRect(area.x + 52, area.y + 13, 4, 4);

  // Animated steam puff
  const steamPhase = (Date.now() / 350) % 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.arc(area.x + 38, area.y + 3 - steamPhase * 4, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Cups & Pastry Display
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(area.x + 72, area.y + 20, 10, 12);
  ctx.fillRect(area.x + 86, area.y + 20, 10, 12);
  ctx.fillStyle = '#D97706';
  ctx.fillRect(area.x + 108, area.y + 22, 18, 9); // croissant tray

  // Label
  ctx.fillStyle = '#1A1A1A';
  ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const cafeLabel = floorId === 1 ? '☕ NEURAL CAFFEINE BAR' :
                    floorId === 2 ? '🍵 ORGANIC HERBAL BAR' :
                    floorId === 3 ? '☕ NITRO COLD BREW BAR' : '☕ EXECUTIVE TEA SALON';
  ctx.fillText(cafeLabel, area.x + area.width / 2, area.y + area.height - 14);
}

// Water Cooler Renderer
function drawWatercooler(ctx: CanvasRenderingContext2D, area: CommonArea) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#E0F2FE';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Water bottle with animated rising bubbles
  const bubbleY = (Date.now() / 250) % 12;
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath();
  ctx.arc(area.x + area.width / 2, area.y + 28, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Bubble
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(area.x + area.width / 2 + 3, area.y + 34 - bubbleY, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Dispenser stand
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(area.x + area.width / 2 - 14, area.y + 45, 28, 22);
  ctx.strokeStyle = '#1A1A1A';
  ctx.strokeRect(area.x + area.width / 2 - 14, area.y + 45, 28, 22);

  ctx.fillStyle = '#1A1A1A';
  ctx.font = 'bold 9px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WATERCOOLER', area.x + area.width / 2, area.y + area.height - 12);
}

// Top Center Feature: Server Room / Genomic Sequencer / Ticker Wall / Unicorn Hall of Fame
function drawServerOrFeaturePod(ctx: CanvasRenderingContext2D, area: CommonArea, floorId: number) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  // Background body
  ctx.fillStyle = floorId === 1 ? '#0F172A' : floorId === 2 ? '#F0FDF4' : floorId === 3 ? '#EFF6FF' : '#FFFBEB';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Top Title Bar
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x, area.y, area.width, 22);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 9px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  const titleText = floorId === 1 ? '⚡ H100 NEURAL GPU CLUSTER' :
                    floorId === 2 ? '🧬 GENOMIC SEQUENCER POD' :
                    floorId === 3 ? '📈 GLOBAL LIQUIDITY WAR ROOM' : '🏆 FITT UNICORN HALL OF FAME';
  ctx.fillText(titleText, area.x + 8, area.y + 11);

  // Badge pill
  ctx.fillStyle = '#FFDE59';
  ctx.fillRect(area.x + area.width - 76, area.y + 4, 72, 14);
  ctx.fillStyle = '#1A1A1A';
  ctx.font = 'bold 8px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(area.badge || 'SYSTEM', area.x + area.width - 40, area.y + 11);

  if (floorId === 1) {
    // 4 Server Racks with matrix blinking LEDs
    const rackW = 48;
    const rackGap = 10;
    const startX = area.x + 12;
    for (let r = 0; r < 4; r++) {
      const rx = startX + r * (rackW + rackGap);
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(rx, area.y + 30, rackW, area.height - 42);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(rx, area.y + 30, rackW, area.height - 42);

      // Blinking LEDs
      const tick = Math.floor(Date.now() / 200) + r * 3;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          const isLedOn = (tick + row * 2 + col) % 3 === 0;
          ctx.fillStyle = isLedOn ? (col === 0 ? '#22C55E' : col === 1 ? '#38BDF8' : '#F59E0B') : '#0F172A';
          ctx.fillRect(rx + 8 + col * 12, area.y + 38 + row * 12, 5, 5);
        }
      }
    }
  } else if (floorId === 2) {
    // Genomic Sequencer Instrument & Petri Dishes
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(area.x + 20, area.y + 32, 100, area.height - 46);
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(area.x + 20, area.y + 32, 100, area.height - 46);

    // Laser Window
    const laserGlow = (Math.sin(Date.now() / 250) + 1) / 2;
    ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + laserGlow * 0.5})`;
    ctx.fillRect(area.x + 32, area.y + 44, 76, 30);
    ctx.fillStyle = '#065F46';
    ctx.font = 'bold 8px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FLOW CELL B (Q30)', area.x + 70, area.y + 60);

    // Agar Petri Dishes on Right
    ctx.fillStyle = '#FEE2E2';
    ctx.beginPath();
    ctx.arc(area.x + 160, area.y + 60, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1A1A1A';
    ctx.stroke();

    ctx.fillStyle = '#FEF08A';
    ctx.beginPath();
    ctx.arc(area.x + 205, area.y + 65, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Red colonies
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(area.x + 155, area.y + 55, 3, 3);
    ctx.fillRect(area.x + 163, area.y + 64, 3, 3);
  } else if (floorId === 3) {
    // Candlestick Chart Display
    ctx.fillStyle = '#0B1329';
    ctx.fillRect(area.x + 14, area.y + 30, area.width - 28, area.height - 42);

    // Draw 8 green & red candles
    const candleCount = 9;
    const cWidth = 14;
    for (let c = 0; c < candleCount; c++) {
      const cx = area.x + 26 + c * 22;
      const isGreen = (c * 7) % 3 !== 0;
      const highY = area.y + 40 + ((c * 13) % 20);
      const lowY = area.y + 75 + ((c * 9) % 20);
      const bodyTop = highY + 6;
      const bodyH = Math.max(8, lowY - highY - 12);

      ctx.strokeStyle = isGreen ? '#22C55E' : '#EF4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + cWidth / 2, highY);
      ctx.lineTo(cx + cWidth / 2, lowY);
      ctx.stroke();

      ctx.fillStyle = isGreen ? '#22C55E' : '#EF4444';
      ctx.fillRect(cx, bodyTop, cWidth, bodyH);
    }
  } else {
    // Floor 4: Unicorn Trophy Vault
    ctx.fillStyle = '#78350F'; // Mahogany cabinet
    ctx.fillRect(area.x + 15, area.y + 32, area.width - 30, area.height - 44);
    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 2;
    ctx.strokeRect(area.x + 15, area.y + 32, area.width - 30, area.height - 44);

    // 3 Golden Trophies
    for (let t = 0; t < 3; t++) {
      const tx = area.x + 45 + t * 68;
      const ty = area.y + 50;

      // Cup
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(tx, ty, 13, 0, Math.PI);
      ctx.fill();
      ctx.fillRect(tx - 13, ty - 8, 26, 8);

      // Pedestal
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(tx - 10, ty + 12, 20, 8);
      ctx.fillStyle = '#FFDE59';
      ctx.font = 'bold 8px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(t === 0 ? '🏆 1B' : t === 1 ? '🥇 500M' : '🎖️ NIDHI', tx, ty + 18);
    }
  }
}

// Upper East Prototyping Bench / Cryo Lab / Arcade
function drawPrototypingBench(ctx: CanvasRenderingContext2D, area: CommonArea, floorId: number) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#F1F5F9';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Title bar
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x, area.y, area.width, 20);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(floorId === 1 ? '🖨️ 3D PRINTER FARM' : '❄️ -80°C CRYO-VAULT', area.x + 8, area.y + 10);

  if (floorId === 1) {
    // 3D Printer enclosure with moving printhead
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(area.x + 15, area.y + 30, 85, 75);
    ctx.fillStyle = '#38BDF8';
    ctx.fillRect(area.x + 22, area.y + 38, 71, 58); // clear acrylic

    // Moving extruder head
    const extruderX = area.x + 35 + Math.sin(Date.now() / 300) * 20;
    ctx.fillStyle = '#EF4444';
    ctx.fillRect(extruderX, area.y + 55, 12, 10);

    // Robotic arm on right
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(area.x + 130, area.y + 88);
    ctx.lineTo(area.x + 150, area.y + 55);
    ctx.lineTo(area.x + 175, area.y + 70);
    ctx.stroke();

    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(area.x + 172, area.y + 68, 12, 8); // gripper
  } else {
    // -80°C Cryo Freezer with digital LED
    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(area.x + 20, area.y + 30, 95, 75);
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 2;
    ctx.strokeRect(area.x + 20, area.y + 30, 95, 75);

    // Digital LED display
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(area.x + 35, area.y + 40, 65, 18);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('-80.2°C', area.x + 67, area.y + 50);

    // Nitrogen dewar tank on right
    ctx.fillStyle = '#94A3B8';
    ctx.beginPath();
    ctx.roundRect(area.x + 140, area.y + 40, 36, 60, [12, 12, 4, 4]);
    ctx.fill();
    ctx.strokeStyle = '#1A1A1A';
    ctx.stroke();
  }
}

// Retro Arcade Machine (Floor 3)
function drawArcade(ctx: CanvasRenderingContext2D, area: CommonArea) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#18181B';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Top Neon Marquee
  const neonPulse = (Math.sin(Date.now() / 200) + 1) / 2;
  ctx.fillStyle = neonPulse > 0.5 ? '#EC4899' : '#06B6D4';
  ctx.fillRect(area.x, area.y, area.width, 22);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🕹️ FOUNDER KOMBAT', area.x + area.width / 2, area.y + 11);

  // CRT Arcade Screen with animated starfield
  ctx.fillStyle = '#09090B';
  ctx.fillRect(area.x + 20, area.y + 32, 100, 65);
  ctx.strokeStyle = '#06B6D4';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(area.x + 20, area.y + 32, 100, 65);

  // Pixels on CRT
  ctx.fillStyle = '#22C55E';
  ctx.fillRect(area.x + 50, area.y + 55, 12, 12);
  ctx.fillStyle = '#EF4444';
  ctx.fillRect(area.x + 85, area.y + 55, 12, 12);

  // Control panel with joystick and colorful buttons
  ctx.fillStyle = '#3F3F46';
  ctx.fillRect(area.x + 130, area.y + 40, 55, 55);
  ctx.strokeStyle = '#1A1A1A';
  ctx.strokeRect(area.x + 130, area.y + 40, 55, 55);

  // Red Joystick knob
  ctx.fillStyle = '#DC2626';
  ctx.beginPath();
  ctx.arc(area.x + 145, area.y + 55, 6, 0, Math.PI * 2);
  ctx.fill();

  // Buttons
  ctx.fillStyle = '#3B82F6';
  ctx.fillRect(area.x + 162, area.y + 50, 6, 6);
  ctx.fillStyle = '#F59E0B';
  ctx.fillRect(area.x + 172, area.y + 50, 6, 6);
  ctx.fillStyle = '#10B981';
  ctx.fillRect(area.x + 162, area.y + 64, 6, 6);

  ctx.fillStyle = '#FFDE59';
  ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('INSERT COIN [142K PTS]', area.x + area.width / 2, area.y + area.height - 8);
}

// Table Tennis / Ping Pong (Floor 3)
function drawPingPong(ctx: CanvasRenderingContext2D, area: CommonArea) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Title bar
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x, area.y, area.width, 20);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('🏓 TABLE TENNIS POD', area.x + 8, area.y + 10);

  // Table surface (ITTF green)
  const tblX = area.x + 15;
  const tblY = area.y + 30;
  const tblW = area.width - 30;
  const tblH = area.height - 42;

  ctx.fillStyle = '#065F46';
  ctx.fillRect(tblX, tblY, tblW, tblH);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(tblX, tblY, tblW, tblH);

  // Center white line
  ctx.beginPath();
  ctx.moveTo(tblX, tblY + tblH / 2);
  ctx.lineTo(tblX + tblW, tblY + tblH / 2);
  ctx.stroke();

  // Mesh Net in middle
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tblX + tblW / 2, tblY - 3);
  ctx.lineTo(tblX + tblW / 2, tblY + tblH + 3);
  ctx.stroke();

  // Bouncing ping pong ball
  const ballPhase = (Date.now() / 400) % Math.PI;
  const ballX = tblX + 25 + ((Date.now() / 800) % 1) * (tblW - 50);
  const ballY = tblY + tblH / 2 - Math.sin(ballPhase) * 16;

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(ballX, ballY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Red & Blue rackets
  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(tblX + 18, tblY + 22, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#3B82F6';
  ctx.beginPath();
  ctx.arc(tblX + tblW - 18, tblY + tblH - 22, 6, 0, Math.PI * 2);
  ctx.fill();
}

// Whiteboard Brainstorm Wall
function drawWhiteboard(ctx: CanvasRenderingContext2D, area: CommonArea, floorId: number) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Aluminium frame top
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(area.x, area.y, area.width, 18);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(floorId === 1 ? '📋 AI ARCHITECTURE BOARD' : '📋 FITT PIPELINE BOARD', area.x + 8, area.y + 9);

  // Colorful sticky notes
  const notes = [
    { x: area.x + 14, y: area.y + 28, color: '#FEF08A', text: '4-bit Quantize' },
    { x: area.x + 72, y: area.y + 32, color: '#FBCFE8', text: 'MoE Routing' },
    { x: area.x + 130, y: area.y + 26, color: '#BAE6FD', text: '₹25L Grant' },
    { x: area.x + 30, y: area.y + 70, color: '#BBF7D0', text: 'Docker PTY' },
    { x: area.x + 95, y: area.y + 68, color: '#FED7AA', text: 'AIIMS Demo' }
  ];

  notes.forEach(note => {
    ctx.fillStyle = note.color;
    ctx.fillRect(note.x, note.y, 48, 30);
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 1;
    ctx.strokeRect(note.x, note.y, 48, 30);

    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 7px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(note.text, note.x + 24, note.y + 15);
  });
}

// Ceremonial Seed Investment Gong (Floor 4)
function drawPitchGong(ctx: CanvasRenderingContext2D, area: CommonArea) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#FEF3C7';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Heavy Teak Gantry Frame
  ctx.fillStyle = '#78350F';
  ctx.fillRect(area.x + 12, area.y + 12, 8, area.height - 24);
  ctx.fillRect(area.x + area.width - 20, area.y + 12, 8, area.height - 24);
  ctx.fillRect(area.x + 12, area.y + 12, area.width - 24, 8);

  // Golden Brass Gong Disc in Center
  const gongX = area.x + area.width / 2;
  const gongY = area.y + area.height / 2 + 2;
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(gongX, gongY, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#B45309';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Center nipple
  ctx.fillStyle = '#D97706';
  ctx.beginPath();
  ctx.arc(gongX, gongY, 8, 0, Math.PI * 2);
  ctx.fill();

  // Red felt striker mallet
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(gongX + 16, gongY + 12, 10, 10);
  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gongX + 21, gongY + 22);
  ctx.lineTo(gongX + 28, gongY + 36);
  ctx.stroke();

  ctx.fillStyle = '#1A1A1A';
  ctx.font = 'bold 8px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SEED GONG [CLICK]', gongX, area.y + area.height - 6);
}

// Chill Founder Lounge (Beanbags, Coffee Table, Startup Books)
function drawLounge(ctx: CanvasRenderingContext2D, area: CommonArea) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Soft geometric floor rug
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(area.x + 15, area.y + 20, area.width - 30, area.height - 40);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 1;
  ctx.strokeRect(area.x + 15, area.y + 20, area.width - 30, area.height - 40);

  // Low Scandinavian Coffee Table
  ctx.fillStyle = '#B45309';
  ctx.fillRect(area.x + area.width / 2 - 35, area.y + 40, 70, 36);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(area.x + area.width / 2 - 35, area.y + 40, 70, 36);

  // Mini startup books on table
  ctx.fillStyle = '#F97316'; // YC Orange
  ctx.fillRect(area.x + area.width / 2 - 25, area.y + 46, 14, 20);
  ctx.fillStyle = '#0284C7'; // TechCrunch
  ctx.fillRect(area.x + area.width / 2 - 8, area.y + 48, 14, 18);

  // 3 Colorful Beanbags
  // Coral Beanbag (Left)
  ctx.fillStyle = '#F43F5E';
  ctx.beginPath();
  ctx.ellipse(area.x + 40, area.y + 55, 18, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#BE123C';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Amber Beanbag (Right)
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.ellipse(area.x + area.width - 40, area.y + 55, 18, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#B45309';
  ctx.stroke();

  // Cobalt Beanbag (Bottom)
  ctx.fillStyle = '#3B82F6';
  ctx.beginPath();
  ctx.ellipse(area.x + area.width / 2, area.y + area.height - 30, 20, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1D4ED8';
  ctx.stroke();

  // Potted Monstera Plant in corner
  ctx.fillStyle = '#15803D';
  ctx.beginPath();
  ctx.arc(area.x + 22, area.y + area.height - 22, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#A16207'; // Pot
  ctx.fillRect(area.x + 18, area.y + area.height - 18, 8, 8);

  ctx.fillStyle = '#1A1A1A';
  ctx.font = 'bold 9px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ZEN FOUNDER LOUNGE', area.x + area.width / 2, area.y + 14);
}

// Special Arena: Robotics Testing Arena / Botanical Wall / Podcast Studio / Rooftop Overlook
function drawSpecialArena(ctx: CanvasRenderingContext2D, area: CommonArea, floorId: number) {
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x + 3, area.y + 3, area.width, area.height);

  ctx.fillStyle = floorId === 1 ? '#FEF08A' : floorId === 2 ? '#ECFDF5' : floorId === 3 ? '#1E1B4B' : '#FEF3C7';
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = '#1A1A1A';
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);

  // Title bar
  ctx.fillStyle = '#1A1A1A';
  ctx.fillRect(area.x, area.y, area.width, 20);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  const arenaTitle = floorId === 1 ? '🤖 ROBOTICS ARENA' :
                     floorId === 2 ? '🌿 HYDROPONIC LIVING WALL' :
                     floorId === 3 ? '🎙️ PITCH PODCAST STUDIO' : '🔭 OVERLOOK TERRACE';
  ctx.fillText(arenaTitle, area.x + 8, area.y + 10);

  if (floorId === 1) {
    // Yellow/Black safety hazard border
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 3;
    ctx.strokeRect(area.x + 12, area.y + 28, area.width - 24, area.height - 38);

    // Obstacle cones
    ctx.fillStyle = '#F97316';
    ctx.fillRect(area.x + 35, area.y + 45, 12, 14);
    ctx.fillRect(area.x + 110, area.y + 60, 12, 14);
    ctx.fillRect(area.x + 190, area.y + 45, 12, 14);

    // Rover Mk-3 on docking pad
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(area.x + 65, area.y + 65, 34, 22);
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(area.x + 82, area.y + 60, 4, 0, Math.PI * 2); // lidar spinning head
    ctx.fill();
  } else if (floorId === 2) {
    // Vertical Hydroponic Green Wall with LED grow lights
    ctx.fillStyle = '#065F46';
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        ctx.beginPath();
        ctx.arc(area.x + 25 + c * 28, area.y + 38 + r * 20, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Violet LED grow light bar
    ctx.fillStyle = '#C084FC';
    ctx.fillRect(area.x + 14, area.y + 24, area.width - 28, 4);
  } else if (floorId === 3) {
    // Stage with wooden planks & broadcast microphone
    ctx.fillStyle = '#78350F';
    ctx.fillRect(area.x + 15, area.y + 30, area.width - 30, area.height - 40);

    // Glowing '● ON AIR' neon box
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(area.x + area.width - 65, area.y + 36, 45, 14);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 7.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('● ON AIR', area.x + area.width - 42, area.y + 43);

    // Cardioid boom microphone
    ctx.fillStyle = '#E2E8F0';
    ctx.beginPath();
    ctx.arc(area.x + 60, area.y + 60, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(area.x + 60, area.y + 67);
    ctx.lineTo(area.x + 60, area.y + 88);
    ctx.stroke();
  } else {
    // Overlook Terrace: Teak Deck & Brass Telescope
    ctx.fillStyle = '#9A3412';
    ctx.fillRect(area.x + 15, area.y + 30, area.width - 30, area.height - 40);

    // Brass telescope
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(area.x + 80, area.y + 70);
    ctx.lineTo(area.x + 115, area.y + 50);
    ctx.stroke();

    // Tripod legs
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(area.x + 95, area.y + 60);
    ctx.lineTo(area.x + 85, area.y + 85);
    ctx.moveTo(area.x + 95, area.y + 60);
    ctx.lineTo(area.x + 105, area.y + 85);
    ctx.stroke();
  }
}

// Founder Desk Renderer
function drawFounderDesk(
  ctx: CanvasRenderingContext2D,
  founder: Founder,
  isSelected: boolean,
  isNearby: boolean,
  isHovered: boolean
) {
  const { x, y } = founder.deskCoord;

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

  // Desk Nameplate
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

    ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
    const bubbleW = ctx.measureText(snippet).width + 14;
    const bubbleX = x - bubbleW / 2;
    const bubbleY = y - 52;

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
}

// Floor 4 FITT Desk Renderer
function drawFITTDesk(ctx: CanvasRenderingContext2D, fitt: FITTTeamMember) {
  const { x, y } = fitt.officeDeskCoord;

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
  ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`★ ${fitt.name.split(' ')[0]} (FITT)`, x, y + 35);

  // Avatar
  drawAvatar(ctx, x, y - 2, fitt.avatar, 'left', false);
}

// Vector Pixel Avatar Renderer
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
