"use client";
import React from "react";

/**
 * Basic canvas game:
 * - fish/trash are spawned with positions and move horizontally
 * - hook is dropped/retracted by player; collisions detected with simple distance check
 *
 * Tweak spawn rates, speeds and sizes in the LevelConfig below.
 */

type SpawnType = "fish" | "trash" | "gold";
type SpawnItem = {
  id: string;
  type: SpawnType;
  x: number;
  y: number;
  vx: number;
  speed: number;
  size: number;
  points: number;
  caught?: boolean;
};

type HookState = {
  x: number;
  y: number;
  vy: number;
  active: boolean;
  state: "idle" | "dropping" | "waiting" | "reeling";
};

type Props = {
  width?: number;
  height?: number;
  difficulty: number;
  onCatch: (item: SpawnItem) => void;
  onTrash: (item: SpawnItem) => void;
  onMiss: () => void;
  paused?: boolean;
  power?: { magnet?: boolean }; // magnet optional now
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export default function GameCanvas({
  width = 900,
  height = 480,
  difficulty,
  onCatch,
  onTrash,
  onMiss,
  paused,
  power,
}: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const itemsRef = React.useRef<SpawnItem[]>([]);
  const hookRef = React.useRef<HookState>({
    x: width / 2,
    y: 60,
    vy: 0,
    active: false,
    state: "idle",
  });
  const lastSpawn = React.useRef<number>(0);

  const LEVEL_CONFIG = React.useMemo(() => {
    // Modify these numbers to tweak spawn rate / speeds / points (simple tuning area)
    return {
      baseSpawnInterval: Math.max(500, 1400 - difficulty * 100), // ms
      fishSpeed: 0.4 + difficulty * 0.15,
      trashChance: Math.min(0.35, 0.12 + difficulty * 0.03),
      goldChance: Math.min(0.04, 0.01 + difficulty * 0.008),
      gravity: 0.9 + difficulty * 0.05,
      reelSpeed: 4 + difficulty * 0.6,
    };
  }, [difficulty]);

  // helper create item
  function spawnItem() {
    const side = Math.random() > 0.5 ? -1 : 1;
    const speed = LEVEL_CONFIG.fishSpeed * rand(0.8, 1.4);
    const isTrash = Math.random() < LEVEL_CONFIG.trashChance;
    const isGold = !isTrash && Math.random() < LEVEL_CONFIG.goldChance;

    const type: SpawnType = isGold ? "gold" : isTrash ? "trash" : "fish";
    const size = isGold ? rand(18, 26) : type === "trash" ? rand(14, 22) : rand(12, 20);
    const points = type === "gold" ? 1000 : type === "trash" ? -50 : Math.round(100 * (size / 15) * (1 + difficulty * 0.3));

    const item: SpawnItem = {
      id: String(Math.random()),
      type,
      x: side === -1 ? -40 : width + 40,
      y: rand(height * 0.35, height * 0.8),
      vx: speed * side,
      speed,
      size,
      points,
    };

    itemsRef.current.push(item);
  }

  // collision check between hook and item
  function checkCollision(hx: number, hy: number, item: SpawnItem) {
    const dx = hx - item.x;
    const dy = hy - item.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < item.size + 8;
  }

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let last = performance.now();

    function loop(now: number) {
      const dt = now - last;
      last = now;
      if (!paused) {
        // spawn logic
        if (now - lastSpawn.current > LEVEL_CONFIG.baseSpawnInterval) {
          spawnItem();
          lastSpawn.current = now;
        }

        // update items
        itemsRef.current.forEach((it) => {
          // horizontal movement
          it.x += it.vx * dt;
          // small bobbing
          it.y += Math.sin((now / 500) + it.speed * 10) * 0.3;
        });

        // remove off-screen items
        itemsRef.current = itemsRef.current.filter((it) => it.x > -80 && it.x < width + 80 && !it.caught);

        // update hook
        const hook = hookRef.current;
        if (hook.state === "dropping") {
          hook.vy += LEVEL_CONFIG.gravity * (dt / 16);
          hook.y += hook.vy * (dt / 16);
          // check for collisions
          for (const it of itemsRef.current) {
            if (checkCollision(hook.x, hook.y, it)) {
              it.caught = true;
              // attach to hook: mark position and stop dropping
              hook.state = "waiting";
              // move item to hook
              it.x = hook.x;
              it.y = hook.y + it.size;
              // call handlers
              if (it.type === "trash") {
                onTrash(it);
              } else {
                onCatch(it);
              }
              break;
            }
          }
          // if reaches bottom water limit, go into waiting state then miss
          if (hook.y > height - 20 && hook.state === "dropping") {
            hook.state = "waiting";
            onMiss();
          }
        } else if (hook.state === "reeling") {
          // pull items up
          hook.y -= LEVEL_CONFIG.reelSpeed * (dt / 16);
          // pull any caught items with it
          itemsRef.current.forEach((it) => {
            if (it.caught) {
              it.x = hook.x;
              it.y = hook.y + it.size;
            }
          });
          // if fully retracted
          if (hook.y <= 60) {
            hook.y = 60;
            hook.state = "idle";
            // remove items that were caught (they've been processed by handlers)
            itemsRef.current = itemsRef.current.filter((it) => !it.caught);
          }
        } else if (hook.state === "waiting") {
          // no physics yet until player reels
        }
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw background water gradient
      const g = ctx.createLinearGradient(0, height * 0.4, 0, height);
      g.addColorStop(0, "#aee7ff");
      g.addColorStop(1, "#3aa0d8");
      // Use an intermediate unknown cast to satisfy TypeScript DOM typings
      ctx.fillStyle = (g as unknown) as CanvasPattern | string;
      ctx.fillRect(0, height * 0.4, width, height);

      // draw surface waves (simple sin lines)
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 6) {
          const y = Math.sin((x / 50) + (now / 800) + i) * 6 + height * 0.42 + i * 6;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // draw items (fish/trash/gold)
      itemsRef.current.forEach((it) => {
        if (it.type === "fish") {
          // fish body
          ctx.save();
          ctx.translate(it.x, it.y);
          ctx.rotate(it.vx > 0 ? 0.15 : -0.15);
          ctx.fillStyle = "#ff8c6b";
          ctx.beginPath();
          ctx.ellipse(0, 0, it.size * 0.9, it.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          // eye
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(it.size * 0.4, -it.size * 0.1, it.size * 0.12, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#000";
          ctx.beginPath();
          ctx.arc(it.size * 0.47, -it.size * 0.1, it.size * 0.05, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (it.type === "trash") {
          ctx.save();
          ctx.fillStyle = "#7b7b7b";
          ctx.fillRect(it.x - it.size / 2, it.y - it.size / 2, it.size, it.size * 0.7);
          ctx.restore();
        } else if (it.type === "gold") {
          // shiny gold fish / chest
          ctx.save();
          ctx.fillStyle = "#ffd166";
          ctx.beginPath();
          ctx.ellipse(it.x, it.y, it.size, it.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffb703";
          ctx.fillRect(it.x - it.size * 0.6, it.y - it.size * 0.25, it.size * 1.2, it.size * 0.4);
          ctx.restore();
        }
      });

      // draw boat & character (simple)
      ctx.save();
      const boatX = width / 2;
      ctx.fillStyle = "#6b4f2f";
      ctx.beginPath();
      ctx.moveTo(boatX - 120, 40);
      ctx.quadraticCurveTo(boatX, 5, boatX + 120, 40);
      ctx.lineTo(boatX + 80, 70);
      ctx.lineTo(boatX - 80, 70);
      ctx.closePath();
      ctx.fill();

      // character
      ctx.fillStyle = "#ffd1b3";
      ctx.beginPath();
      ctx.arc(boatX + 10, 20, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // draw hook line
      ctx.save();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(boatX + 10, 34);
      const hx = hookRef.current.x;
      const hy = hookRef.current.y;
      ctx.lineTo(hx, hy - 6);
      ctx.stroke();

      // draw hook
      ctx.fillStyle = "#222";
      ctx.beginPath();
      ctx.arc(hx, hy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, difficulty]);

  // External controls: drop / reel / move
  React.useEffect(() => {
    const handleClick = () => {
      const hook = hookRef.current;
      if (hook.state === "idle") {
        // start drop
        hook.state = "dropping";
        hook.vy = 2;
        hook.active = true;
      } else if (hook.state === "dropping") {
        // tap to try to catch quickly -> start reeling
        hook.state = "reeling";
      } else if (hook.state === "waiting") {
        // reel it up
        hook.state = "reeling";
      }
    };

    window.addEventListener("pointerdown", handleClick);
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handleClick();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("pointerdown", handleClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // magnet power pulls fish towards hook (simple)
  React.useEffect(() => {
    if (power?.magnet) {
      const id = setInterval(() => {
        const hook = hookRef.current;
        itemsRef.current.forEach((it) => {
          if (!it.caught && Math.abs(it.y - hook.y) < 120 && it.type === "fish") {
            // nudge towards hook
            it.x += (hook.x - it.x) * 0.02;
            it.y += (hook.y - it.y) * 0.02;
          }
        });
      }, 50);
      return () => clearInterval(id);
    }
  }, [power?.magnet]);

  // expose some control move (for mobile UI): simple left/right touch area
  React.useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const hook = hookRef.current;
      // move boat / hook x while idle
      if (hook.state === "idle") {
        hook.x = Math.max(80, Math.min(width - 80, x));
      }
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [width]);

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} width={width} height={height} className="rounded-lg shadow-lg border border-slate-200" />
    </div>
  );
}