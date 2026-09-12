import React, { useEffect, useRef, useState } from "react";
import {
  SiPython,
  SiGo,
  SiCplusplus,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFastapi,
  SiExpress,
  SiThreedotjs,
  SiTailwindcss,
  SiHtml5,
  SiRedis,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiClickhouse,
  SiKubernetes,
  SiDocker,
  SiTerraform,
  SiAmazonwebservices,
  SiGit,
  SiApachekafka,
  SiPrisma,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import "./styles/TechStack.css";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ size?: number | string; color?: string }>;
  color: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#FFD43B" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "Java", icon: FaJava, color: "#EA2D2E" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "FastAPI", icon: SiFastapi, color: "#05998B" },
  { name: "Express", icon: SiExpress, color: "#E5E5E5" },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "K8s", icon: SiKubernetes, color: "#326CE5" },
  { name: "Terraform", icon: SiTerraform, color: "#844FBA" },
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Kafka", icon: SiApachekafka, color: "#FFFFFF" },
  { name: "Redis", icon: SiRedis, color: "#FF4438" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "ClickHouse", icon: SiClickhouse, color: "#FFCC01" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

// Precompute Fibonacci sphere distribution on unit sphere
const ITEM_POSITIONS = TECH_ITEMS.map((_, i) => {
  const n = TECH_ITEMS.length;
  const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.sin(phi) * Math.sin(theta),
    z: Math.cos(phi),
  };
});

// Build icosahedron vertices and edges for geodesic wireframe cage
function createGeodesicSphere() {
  const t = (1 + Math.sqrt(5)) / 2;
  const baseVerts: [number, number, number][] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ].map(([x, y, z]) => {
    const len = Math.hypot(x, y, z);
    return [x / len, y / len, z / len];
  });

  const baseFaces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ];

  const midMap = new Map<string, number>();
  const verts = [...baseVerts];

  function getMid(p1Idx: number, p2Idx: number): number {
    const min = Math.min(p1Idx, p2Idx);
    const max = Math.max(p1Idx, p2Idx);
    const key = `${min}_${max}`;
    if (midMap.has(key)) return midMap.get(key)!;

    const p1 = verts[p1Idx];
    const p2 = verts[p2Idx];
    const mx = (p1[0] + p2[0]) / 2;
    const my = (p1[1] + p2[1]) / 2;
    const mz = (p1[2] + p2[2]) / 2;
    const len = Math.hypot(mx, my, mz);
    const newIdx = verts.length;
    verts.push([mx / len, my / len, mz / len]);
    midMap.set(key, newIdx);
    return newIdx;
  }

  const subFaces: [number, number, number][] = [];
  baseFaces.forEach(([a, b, c]) => {
    const ab = getMid(a, b);
    const bc = getMid(b, c);
    const ca = getMid(c, a);
    subFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  });

  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  subFaces.forEach(([a, b, c]) => {
    [[a, b], [b, c], [c, a]].forEach(([p1, p2]) => {
      const min = Math.min(p1, p2);
      const max = Math.max(p1, p2);
      const key = `${min}_${max}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([min, max]);
      }
    });
  });

  return { verts, edges };
}

const GEODESIC = createGeodesicSphere();

const TechStack = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoveredIndexRef = useRef<number | null>(null);
  const [, setHoverTick] = useState(0);

  // 3D rotation state
  const rot = useRef({ x: 0.2, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = wrapper.clientWidth;
    let height = wrapper.clientHeight;

    const handleResize = () => {
      if (!wrapper || !canvas) return;
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const render = () => {
      // Rotation physics - maintain constant steady rotation without slowing down on hover
      if (!isDragging.current) {
        velocity.current.x *= 0.94;
        velocity.current.y *= 0.94;

        const baseSpeedY = 0.0028;
        const baseSpeedX = 0.0008;

        rot.current.y += velocity.current.y + baseSpeedY;
        rot.current.x += velocity.current.x + baseSpeedX;
      }

      const rotX = rot.current.x;
      const rotY = rot.current.y;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Adaptive sphere radius
      const sphereRadius = Math.min(width, height) * (width < 768 ? 0.32 : 0.3);
      const iconRadius = sphereRadius * 1.15;
      const cx = width / 2;
      const cy = height / 2;
      const fov = 750;

      // 1. Render Wireframe Sphere on Canvas
      ctx.clearRect(0, 0, width, height);

      // Rotate all geodesic vertices
      const rotatedVerts = GEODESIC.verts.map(([x, y, z]) => {
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;
        const scale = fov / (fov - z2 * sphereRadius);
        return {
          px: cx + x2 * sphereRadius * scale,
          py: cy + y1 * sphereRadius * scale,
          z: z2,
          scale,
        };
      });

      // Split edges into back and front
      const backEdges: [number, number][] = [];
      const frontEdges: [number, number][] = [];

      GEODESIC.edges.forEach(([p1, p2]) => {
        const avgZ = (rotatedVerts[p1].z + rotatedVerts[p2].z) / 2;
        if (avgZ < 0) {
          backEdges.push([p1, p2]);
        } else {
          frontEdges.push([p1, p2]);
        }
      });

      // Draw back wireframe lines (dimmed)
      ctx.beginPath();
      backEdges.forEach(([p1, p2]) => {
        const a = rotatedVerts[p1];
        const b = rotatedVerts[p2];
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
      });
      ctx.strokeStyle = "rgba(180, 130, 240, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw central semi-opaque dark sphere core to create depth occlusion
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphereRadius * 0.98);
      coreGrad.addColorStop(0, "rgba(20, 14, 30, 0.94)");
      coreGrad.addColorStop(0.65, "rgba(12, 8, 20, 0.96)");
      coreGrad.addColorStop(0.92, "rgba(60, 35, 95, 0.35)");
      coreGrad.addColorStop(1, "rgba(194, 164, 255, 0.08)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 0.98, 0, Math.PI * 2);
      ctx.fill();

      // Draw front wireframe lines (brighter)
      ctx.beginPath();
      frontEdges.forEach(([p1, p2]) => {
        const a = rotatedVerts[p1];
        const b = rotatedVerts[p2];
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
      });
      ctx.strokeStyle = "rgba(215, 175, 255, 0.32)";
      ctx.lineWidth = 1.25;
      ctx.stroke();

      // Draw vertex nodes
      rotatedVerts.forEach((p) => {
        if (p.z > 0.05) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, 2 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(235, 195, 255, ${0.4 + 0.5 * p.z})`;
          ctx.fill();
        }
      });

      // 2. Project and Position Tech Stack DOM Items
      ITEM_POSITIONS.forEach((pos, idx) => {
        const el = itemRefs.current[idx];
        if (!el) return;

        const y1 = pos.y * cosX - pos.z * sinX;
        const z1 = pos.y * sinX + pos.z * cosX;
        const x2 = pos.x * cosY + z1 * sinY;
        const z2 = -pos.x * sinY + z1 * cosY;
        const y2 = y1;

        const rz = z2 * iconRadius;
        const scale = fov / (fov - rz);
        const screenX = cx + x2 * iconRadius * scale;
        const screenY = cy + y2 * iconRadius * scale;

        // Depth normalization: 0 at far back, 1 at direct front
        const normZ = (z2 + 1) / 2;

        // FRONT-SIDE ONLY HOVER:
        // An item is only hoverable / interactable if it is facing the viewer (z2 >= 0.02)
        const isFront = z2 >= 0.02;
        const isHovered = hoveredIndexRef.current === idx && isFront;

        // If an active item rotated to the back, clear its hover state
        if (hoveredIndexRef.current === idx && !isFront) {
          hoveredIndexRef.current = null;
        }

        const finalScale = (0.7 + 0.35 * normZ) * scale * (isHovered ? 1.3 : 1.0);
        const opacity = isHovered
          ? 1.0
          : Math.max(0.18, Math.min(1.0, 0.18 + 0.82 * Math.pow(normZ, 1.4)));
        const zIndex = isHovered ? 1000 : Math.round(normZ * 100);

        el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${finalScale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
        // Disable mouse interaction for back-side items so cursor only hovers front items
        el.style.pointerEvents = isFront ? "auto" : "none";
        el.style.filter =
          !isHovered && z2 < -0.2 ? `blur(${(1 - normZ) * 1.5}px)` : "none";
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;

    velocity.current = { x: dy * 0.0035, y: dx * 0.0035 };
    rot.current.x += velocity.current.x;
    rot.current.y += velocity.current.y;

    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className="techstack" id="techstack">
      <div className="techstack-title-wrap">
        <h2>My Techstack</h2>
        <div className="techstack-subtitle">Interactive 3D Skill Cloud</div>
      </div>

      <div
        ref={wrapperRef}
        className="tech-sphere-wrapper"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <canvas ref={canvasRef} className="tech-wireframe-canvas" />

        <div className="tech-icons-layer">
          {TECH_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="tech-sphere-item"
                style={
                  {
                    "--item-color": item.color,
                  } as React.CSSProperties
                }
                onMouseEnter={() => {
                  hoveredIndexRef.current = idx;
                  setHoverTick((t) => t + 1);
                }}
                onMouseLeave={() => {
                  if (hoveredIndexRef.current === idx) {
                    hoveredIndexRef.current = null;
                    setHoverTick((t) => t + 1);
                  }
                }}
              >
                <div className="tech-icon-circle">
                  <Icon color={item.color} />
                </div>
                <span className="tech-icon-label">{item.name}</span>
              </div>
            );
          })}
        </div>

        <div className="tech-hint-pill">
          <span>✦ Drag to rotate & explore</span>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
