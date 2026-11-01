/**
 * SHIVAM.EXE — 3D IMMERSIVE DEVELOPER PORTFOLIO
 * Main Coordinator & Hero 3D Orbital Core Engine
 * Pure Vanilla HTML5 Canvas 3D Spatial Mathematics (Zero External Dependencies)
 */

(function () {
  'use strict';

  console.log('%c[SHIVAM.EXE] SYSTEM ONLINE // CORE KERNEL v2.5 ACTIVE', 'color: #00F0FF; font-weight: bold; font-family: monospace; font-size: 13px;');

  const heroCanvas = document.getElementById('hero-3d-canvas');
  if (!heroCanvas) return;

  const ctx = heroCanvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;

  function resizeHero() {
    const parent = heroCanvas.parentElement;
    width = heroCanvas.width = (parent && parent.clientWidth) ? parent.clientWidth : 500;
    height = heroCanvas.height = (parent && parent.clientHeight) ? parent.clientHeight : 500;
  }

  resizeHero();
  window.addEventListener('resize', resizeHero);

  // 3D Rotation State
  let rotX = 0.25;
  let rotY = 0.35;
  let targetRotX = 0.25;
  let targetRotY = 0.35;
  let isDragging = false;
  let lastPos = { x: 0, y: 0 };
  let clock = 0;

  // 3D Perspective Projection Function
  function projectPoint(x, y, z) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y1 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    const fov = 380;
    const cameraDist = 320;
    const dist = cameraDist + z2;
    const scale = fov / Math.max(dist, 10);

    return {
      px: width / 2 + x1 * scale,
      py: height / 2 + y1 * scale,
      scale: scale,
      z: z2
    };
  }

  // 3D Ambient Dust Particles
  const dustCount = 80;
  const dustParticles = Array.from({ length: dustCount }, () => ({
    x: (Math.random() - 0.5) * 360,
    y: (Math.random() - 0.5) * 360,
    z: (Math.random() - 0.5) * 360,
    radius: Math.random() * 1.6 + 0.6,
    alpha: Math.random() * 0.6 + 0.2
  }));

  // Orbital Ring Points Generator
  function getRingPoints(radius, segments = 64, plane = 'xy') {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      if (plane === 'xy') {
        points.push({ x: Math.cos(theta) * radius, y: Math.sin(theta) * radius, z: 0 });
      } else if (plane === 'xz') {
        points.push({ x: Math.cos(theta) * radius, y: 0, z: Math.sin(theta) * radius });
      } else if (plane === 'yz') {
        points.push({ x: 0, y: Math.cos(theta) * radius, z: Math.sin(theta) * radius });
      } else if (plane === 'diag1') {
        const c = Math.cos(theta) * radius;
        const s = Math.sin(theta) * radius;
        points.push({ x: c * 0.866 - s * 0.5 * 0.5, y: s * 0.866, z: c * 0.5 + s * 0.5 * 0.866 });
      } else if (plane === 'diag2') {
        const c = Math.cos(theta) * radius;
        const s = Math.sin(theta) * radius;
        points.push({ x: c * 0.707, y: s, z: -c * 0.707 });
      }
    }
    return points;
  }

  const ring1 = getRingPoints(105, 72, 'xz');
  const ring2 = getRingPoints(120, 72, 'diag1');
  const ring3 = getRingPoints(135, 72, 'diag2');

  // Nucleus Icosahedron / Lattice Vertices
  const phi = (1 + Math.sqrt(5)) / 2;
  const s = 42;
  const nucleusVertices = [
    { x: -s, y: phi * s, z: 0 },
    { x: s, y: phi * s, z: 0 },
    { x: -s, y: -phi * s, z: 0 },
    { x: s, y: -phi * s, z: 0 },
    { x: 0, y: -s, z: phi * s },
    { x: 0, y: s, z: phi * s },
    { x: 0, y: -s, z: -phi * s },
    { x: 0, y: s, z: -phi * s },
    { x: phi * s, y: 0, z: -s },
    { x: phi * s, y: 0, z: s },
    { x: -phi * s, y: 0, z: -s },
    { x: -phi * s, y: 0, z: s }
  ];

  // Mouse Interaction
  heroCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      targetRotY += dx * 0.007;
      targetRotX += dy * 0.007;
      lastPos = { x: e.clientX, y: e.clientY };
    }
  });

  // Touch Support
  heroCanvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - lastPos.x;
      const dy = e.touches[0].clientY - lastPos.y;
      targetRotY += dx * 0.008;
      targetRotX += dy * 0.008;
      lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  // Main Render Animation Loop
  function renderHeroCore() {
    requestAnimationFrame(renderHeroCore);
    clock += 0.016;

    // Smooth angle lerping
    rotY += (targetRotY - rotY) * 0.07;
    rotX += (targetRotX - rotX) * 0.07;

    // Automatic smooth idle rotation
    if (!isDragging) {
      targetRotY += 0.003;
      targetRotX = 0.22 + Math.sin(clock * 0.8) * 0.08;
    }

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    // 1. Ambient Background Glow Behind Sphere
    const bgGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
    bgGlow.addColorStop(0, 'rgba(8, 123, 255, 0.22)');
    bgGlow.addColorStop(0.6, 'rgba(66, 184, 255, 0.06)');
    bgGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, 180, 0, Math.PI * 2);
    ctx.fill();

    // 2. Draw Dust Particles
    dustParticles.forEach(p => {
      const proj = projectPoint(p.x, p.y, p.z);
      if (proj.scale > 0) {
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, p.radius * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(66, 184, 255, ${p.alpha * 0.7})`;
        ctx.fill();
      }
    });

    // Helper to draw projected ring
    function drawRing(points, strokeStyle, lineWidth) {
      ctx.beginPath();
      let first = true;
      points.forEach(pt => {
        const pr = projectPoint(pt.x, pt.y, pt.z);
        if (first) {
          ctx.moveTo(pr.px, pr.py);
          first = false;
        } else {
          ctx.lineTo(pr.px, pr.py);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    // 3. Draw 3D Orbital Rings
    drawRing(ring1, 'rgba(0, 240, 255, 0.75)', 1.5);
    drawRing(ring2, 'rgba(8, 123, 255, 0.65)', 1.5);
    drawRing(ring3, 'rgba(66, 184, 255, 0.45)', 1.2);

    // 4. Central Solid Nucleus Core
    const coreProj = projectPoint(0, 0, 0);
    const coreRadius = Math.max(16, 32 * coreProj.scale);

    const coreGrad = ctx.createRadialGradient(
      coreProj.px - coreRadius * 0.3,
      coreProj.py - coreRadius * 0.3,
      coreRadius * 0.1,
      coreProj.px,
      coreProj.py,
      coreRadius
    );
    coreGrad.addColorStop(0, '#FFFFFF');
    coreGrad.addColorStop(0.35, '#42B8FF');
    coreGrad.addColorStop(0.85, '#087BFF');
    coreGrad.addColorStop(1, '#05070D');

    ctx.beginPath();
    ctx.arc(coreProj.px, coreProj.py, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = coreGrad;
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 24;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 5. Nucleus Wireframe Edges
    const projVerts = nucleusVertices.map(v => projectPoint(v.x, v.y, v.z));
    ctx.beginPath();
    for (let i = 0; i < projVerts.length; i++) {
      for (let j = i + 1; j < projVerts.length; j++) {
        const d = Math.hypot(
          nucleusVertices[i].x - nucleusVertices[j].x,
          nucleusVertices[i].y - nucleusVertices[j].y,
          nucleusVertices[i].z - nucleusVertices[j].z
        );
        if (d < 95) {
          ctx.moveTo(projVerts[i].px, projVerts[i].py);
          ctx.lineTo(projVerts[j].px, projVerts[j].py);
        }
      }
    }
    ctx.strokeStyle = 'rgba(66, 184, 255, 0.55)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Vertices dots
    projVerts.forEach(pv => {
      ctx.beginPath();
      ctx.arc(pv.px, pv.py, Math.max(1.5, 3 * pv.scale), 0, Math.PI * 2);
      ctx.fillStyle = '#00F0FF';
      ctx.fill();
    });

    // 6. Orbiting Satellites
    const satellites = [
      { r: 105, speed: 1.2, plane: 'xz', color: '#00F0FF' },
      { r: 120, speed: -0.9, plane: 'diag1', color: '#42B8FF' },
      { r: 135, speed: 0.7, plane: 'diag2', color: '#FFFFFF' }
    ];

    satellites.forEach((sat, idx) => {
      const angle = clock * sat.speed + (idx * Math.PI * 0.7);
      let sx = 0, sy = 0, sz = 0;

      if (sat.plane === 'xz') {
        sx = Math.cos(angle) * sat.r;
        sz = Math.sin(angle) * sat.r;
      } else if (sat.plane === 'diag1') {
        const c = Math.cos(angle) * sat.r;
        const sn = Math.sin(angle) * sat.r;
        sx = c * 0.866 - sn * 0.25;
        sy = sn * 0.866;
        sz = c * 0.5 + sn * 0.433;
      } else if (sat.plane === 'diag2') {
        const c = Math.cos(angle) * sat.r;
        const sn = Math.sin(angle) * sat.r;
        sx = c * 0.707;
        sy = sn;
        sz = -c * 0.707;
      }

      const sp = projectPoint(sx, sy, sz);
      const sRadius = Math.max(3, 5 * sp.scale);

      // Glow
      ctx.beginPath();
      ctx.arc(sp.px, sp.py, sRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.fill();

      // Satellite body
      ctx.beginPath();
      ctx.arc(sp.px, sp.py, sRadius, 0, Math.PI * 2);
      ctx.fillStyle = sat.color;
      ctx.shadowColor = sat.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  renderHeroCore();

})();
