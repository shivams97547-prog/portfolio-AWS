/**
 * SHIVAM.EXE — 3D IMMERSIVE DEVELOPER PORTFOLIO
 * Signature Feature: Developer Journey Universe (3D Canvas Engine) & Skills Constellation
 * Pure Vanilla HTML5 Canvas 3D Spatial Mathematics (Zero External Dependencies)
 */

(function () {
  'use strict';

  /* ==========================================================================
     PART 1: DEVELOPER JOURNEY UNIVERSE (3D CANVAS ENGINE)
     ========================================================================== */

  const journeyNodesData = [
    {
      id: 0,
      name: 'HTML',
      title: 'HTML Foundation',
      stage: 'Milestone 01 // Structural Blueprint',
      color: '#087BFF',
      description: 'The structural origin of my web journey. Learning semantic document architecture, web standards, accessibility principles, and clean document outlines that form the solid foundation of every web experience.',
      next: 'Propagating to: CSS (Visual Architecture & Styling)',
      status: 'CORE KERNEL',
      x: -160, y: 30, z: 20
    },
    {
      id: 1,
      name: 'CSS',
      title: 'CSS Architecture',
      stage: 'Milestone 02 // Visual Hierarchy & Styling',
      color: '#42B8FF',
      description: 'Mastering the visual realm of frontend engineering. Constructing responsive grids, flexbox layouts, glassmorphic optics, depth layers, custom properties, and fluid typography across every viewport dimension.',
      next: 'Propagating to: JavaScript (Interactive Computation)',
      status: 'AESTHETIC STACK',
      x: -95, y: -65, z: -35
    },
    {
      id: 2,
      name: 'JavaScript',
      title: 'JavaScript Logic Engine',
      stage: 'Milestone 03 // Dynamic Interaction',
      color: '#00F0FF',
      description: 'Synthesizing programmatic interaction. Exploring ES6+ syntax, asynchronous promises, event loops, DOM orchestration, spatial canvas rendering, and reactive interface feedback.',
      next: 'Propagating to: GitHub (Collaborative Version Control)',
      status: 'LOGIC SYNTHESIS',
      x: 0, y: 75, z: 50
    },
    {
      id: 3,
      name: 'GitHub',
      title: 'Git & GitHub Nexus',
      stage: 'Milestone 04 // Version Control & Open Source',
      color: '#818CF8',
      description: 'Establishing version control hygiene. Practicing branch isolation, pull request reviews, Git workflow protocols, and open collaborative repository structures.',
      next: 'Propagating to: Projects (Engineering Deployments)',
      status: 'VERSION CONTROL',
      x: 95, y: -45, z: -25
    },
    {
      id: 4,
      name: 'Projects',
      title: 'Production Proving Grounds',
      stage: 'Milestone 05 // Real-World Applications',
      color: '#38BDF8',
      description: 'Translating knowledge into practical products — developing the Afghani Momos culinary application, engineering this 3D portfolio SHIVAM.EXE, and prototyping CSE IoT interfaces.',
      next: 'Propagating to: AWS (Cloud Infrastructure & Static Hosting)',
      status: 'DEPLOYED APPLICATIONS',
      x: 165, y: 55, z: 15
    },
    {
      id: 5,
      name: 'AWS',
      title: 'AWS Cloud Architecture',
      stage: 'Milestone 06 // Cloud Frontier & Scalability',
      color: '#F59E0B',
      description: 'Deploying static frontend architectures using AWS S3, CloudFront global edge CDN distribution, Route 53 custom domain routing, and exploring future cloud integrations for IoT telemetry.',
      next: 'Cycle Complete // Continuous Growth & Evolution',
      status: 'CLOUD FRONTIER',
      x: 235, y: -30, z: 45
    }
  ];

  let currentActiveNode = 0;
  const canvasUniverse = document.getElementById('universe-3d-canvas');
  const drawer = document.getElementById('universe-drawer');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerStage = document.getElementById('drawer-stage');
  const drawerDesc = document.getElementById('drawer-desc');
  const drawerSphere = document.getElementById('drawer-sphere');
  const drawerConnectionText = document.getElementById('drawer-connection-text');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const quickNodeButtons = document.querySelectorAll('.universe-node-btn');

  function updateUniverseDrawer(nodeIndex) {
    const data = journeyNodesData[nodeIndex];
    if (!data) return;

    currentActiveNode = nodeIndex;

    if (drawerTitle) drawerTitle.textContent = data.title;
    if (drawerStage) drawerStage.textContent = data.stage;
    if (drawerDesc) drawerDesc.textContent = data.description;
    if (drawerConnectionText) drawerConnectionText.textContent = data.next;
    if (drawerSphere) {
      drawerSphere.style.backgroundColor = data.color;
      drawerSphere.style.boxShadow = `0 0 14px ${data.color}`;
    }

    if (drawer) {
      drawer.style.display = 'block';
      drawer.style.opacity = '1';
      drawer.style.transform = 'translateY(0)';
    }

    quickNodeButtons.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === nodeIndex);
    });
  }

  if (drawerCloseBtn && drawer) {
    drawerCloseBtn.addEventListener('click', () => {
      drawer.style.opacity = '0';
      drawer.style.transform = 'translateY(15px)';
      setTimeout(() => {
        drawer.style.display = 'none';
      }, 300);
    });
  }

  let focusUniverseNode = function (nodeIdx) {
    updateUniverseDrawer(nodeIdx);
  };

  quickNodeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const nodeIdx = parseInt(e.currentTarget.getAttribute('data-node'), 10);
      focusUniverseNode(nodeIdx);
    });
  });

  // Initialize drawer with HTML milestone
  updateUniverseDrawer(0);

  /* --- 3D Canvas Spatial Engine for Universe --- */
  if (canvasUniverse) {
    init3DUniverseEngine();
  }

  function init3DUniverseEngine() {
    const ctx = canvasUniverse.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resizeCanvas() {
      const parent = canvasUniverse.parentElement;
      width = canvasUniverse.width = (parent && parent.clientWidth) ? parent.clientWidth : window.innerWidth;
      height = canvasUniverse.height = (parent && parent.clientHeight) ? parent.clientHeight : 540;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D Spatial Angles & Inertia
    let rotY = 0.2;
    let rotX = 0.15;
    let targetRotY = 0.2;
    let targetRotX = 0.15;
    let isDragging = false;
    let lastMousePos = { x: 0, y: 0 };
    let clock = 0;

    // Cosmic Starfield (3D coordinates)
    const starCount = 140;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 800,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3
    }));

    // Focus camera onto selected node
    focusUniverseNode = function (nodeIdx) {
      updateUniverseDrawer(nodeIdx);
      const node = journeyNodesData[nodeIdx];
      if (!node) return;

      // Calculate angle to bring this node toward the front (+Z)
      targetRotY = -Math.atan2(node.x, node.z + 100);
      targetRotX = Math.atan2(node.y, 240) * 0.5;
    };

    // 3D Rotation & Perspective Projection
    function project3D(x, y, z) {
      // Rotation around Y axis
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotation around X axis
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const fov = 420;
      const cameraDistance = 380;
      const dist = cameraDistance + z2;
      const scale = fov / Math.max(dist, 10);

      return {
        px: width / 2 + x1 * scale,
        py: height / 2 + y1 * scale,
        scale: scale,
        z: z2
      };
    }

    // Mouse Interaction
    canvasUniverse.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        targetRotY += dx * 0.006;
        targetRotX += dy * 0.006;
        lastMousePos = { x: e.clientX, y: e.clientY };
      }
    });

    // Mobile Touch Support
    canvasUniverse.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - lastMousePos.x;
        const dy = e.touches[0].clientY - lastMousePos.y;
        targetRotY += dx * 0.007;
        targetRotX += dy * 0.007;
        lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    // Click Detection on Nodes
    canvasUniverse.addEventListener('click', (e) => {
      const rect = canvasUniverse.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let closestIdx = -1;
      let minDistance = 36; // Click target radius

      journeyNodesData.forEach((node, idx) => {
        const proj = project3D(node.x, node.y, node.z);
        const dist = Math.hypot(clickX - proj.px, clickY - proj.py);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== -1) {
        focusUniverseNode(closestIdx);
      }
    });

    // 3D Animation Loop
    function renderUniverse() {
      requestAnimationFrame(renderUniverse);
      clock += 0.016;

      // Smooth camera interpolation
      rotY += (targetRotY - rotY) * 0.06;
      rotX += (targetRotX - rotX) * 0.06;

      // Gentle natural cosmic drift when idle
      if (!isDragging) {
        targetRotY += 0.0012;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Space Stars
      stars.forEach(star => {
        const proj = project3D(star.x, star.y, star.z);
        if (proj.scale > 0) {
          const r = Math.max(0.6, star.radius * proj.scale);
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(66, 184, 255, ${star.alpha * 0.6})`;
          ctx.fill();
        }
      });

      // 2. Project Milestone Nodes
      const projectedNodes = journeyNodesData.map((node, index) => {
        // Subtle floating bob
        const floatingY = node.y + Math.sin(clock * 2 + index) * 4;
        const proj = project3D(node.x, floatingY, node.z);
        return {
          ...node,
          floatingY,
          ...proj,
          index
        };
      });

      // 3. Draw Connecting Spline Web Between Sequential Nodes
      ctx.beginPath();
      projectedNodes.forEach((node, idx) => {
        if (idx === 0) {
          ctx.moveTo(node.px, node.py);
        } else {
          const prev = projectedNodes[idx - 1];
          const midX = (prev.px + node.px) / 2;
          const midY = (prev.py + node.py) / 2;
          ctx.quadraticCurveTo(prev.px, prev.py, midX, midY);
        }
      });
      // Complete to last
      if (projectedNodes.length > 1) {
        const last = projectedNodes[projectedNodes.length - 1];
        ctx.lineTo(last.px, last.py);
      }
      ctx.strokeStyle = 'rgba(8, 123, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Second thinner glowing spline trace
      ctx.beginPath();
      projectedNodes.forEach((node, idx) => {
        if (idx === 0) ctx.moveTo(node.px, node.py);
        else ctx.lineTo(node.px, node.py);
      });
      ctx.strokeStyle = 'rgba(66, 184, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Energy Pulses Flowing Along Segments
      for (let s = 0; s < projectedNodes.length - 1; s++) {
        const nA = projectedNodes[s];
        const nB = projectedNodes[s + 1];
        const pulseT = (clock * 0.6 + s * 0.3) % 1;
        const pulseX = nA.px + (nB.px - nA.px) * pulseT;
        const pulseY = nA.py + (nB.py - nA.py) * pulseT;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00F0FF';
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Draw Planetary Milestone Nodes (Depth Sorted)
      projectedNodes.sort((a, b) => b.z - a.z).forEach((node) => {
        const isActive = node.index === currentActiveNode;
        const baseRadius = 14 * node.scale;
        const radius = Math.max(8, baseRadius * (isActive ? 1.3 : 1.0));

        // Outer Glow Halo
        const glowRad = radius * 2.2;
        const glowGrad = ctx.createRadialGradient(node.px, node.py, radius * 0.5, node.px, node.py, glowRad);
        glowGrad.addColorStop(0, node.color);
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(node.px, node.py, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Orbital Ring around Node
        ctx.save();
        ctx.translate(node.px, node.py);
        ctx.rotate(clock * 0.8 + node.index);
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.8, radius * 0.7, Math.PI / 4, 0, Math.PI * 2);
        ctx.strokeStyle = isActive ? '#00F0FF' : node.color;
        ctx.lineWidth = isActive ? 1.8 : 1.2;
        ctx.stroke();
        ctx.restore();

        // Core Solid Planet Sphere
        ctx.beginPath();
        ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0B1220';
        ctx.strokeStyle = isActive ? '#FFFFFF' : node.color;
        ctx.lineWidth = isActive ? 2.5 : 1.8;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isActive ? 25 : 10;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner Core Glow
        ctx.beginPath();
        ctx.arc(node.px, node.py, radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Label Badge
        ctx.font = `${isActive ? '700' : '600'} 12px "Space Grotesk", sans-serif`;
        ctx.fillStyle = isActive ? '#FFFFFF' : '#94A3B8';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.px, node.py - radius - 10);

        if (isActive) {
          ctx.font = '500 10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#00F0FF';
          ctx.fillText(`[${node.status}]`, node.px, node.py + radius + 16);
        }
      });
    }

    renderUniverse();
  }


  /* ==========================================================================
     PART 2: SKILLS CONSTELLATION INTERACTIVE MAP
     ========================================================================== */

  const skillsData = {
    javascript: {
      title: 'JavaScript',
      category: 'Core Language & Dynamic Logic',
      description: 'The computational engine powering rich interactive experiences. Dedicated to modern ES6+ standards, asynchronous architecture, event loops, DOM orchestration, spatial canvas graphics, and component state management.',
      tags: ['ES6+', 'Async / Await', 'DOM APIs', 'Canvas 2D/3D', 'Event Loops']
    },
    html5: {
      title: 'HTML5',
      category: 'Semantic Architecture & Structure',
      description: 'The bedrock of web standards. Crafting strict semantic document outlines, accessible landmarks for screen readers (WCAG conformance), optimized asset loading strategies, and SEO-friendly structures.',
      tags: ['Semantic HTML', 'WCAG Accessibility', 'DOM Tree', 'SEO Best Practices']
    },
    css3: {
      title: 'CSS3',
      category: 'Visual Hierarchy & Styling Systems',
      description: 'Advanced responsive design and aesthetic engineering. Utilizing modern CSS Grid, Flexbox, custom CSS properties (variables), glassmorphic backdrops, hardware-accelerated transforms, and keyframe animations.',
      tags: ['CSS Grid & Flexbox', 'Custom Properties', 'Glassmorphism', 'Keyframe Animations']
    },
    git: {
      title: 'Git',
      category: 'Version Control Protocol',
      description: 'Foundational distributed version control discipline. Managing branch isolation, feature development workflows, commit cleanliness, merging, rebasing, and local development repositories.',
      tags: ['Branching Strategy', 'Commit Hygiene', 'Merge Conflict Resolution', 'CLI Git']
    },
    github: {
      title: 'GitHub',
      category: 'Collaboration & Repository Management',
      description: 'Hosting projects, configuring GitHub Actions CI workflows, documenting repositories with comprehensive README specs, tracking issues, and preparing codebases for static deployment.',
      tags: ['Repository Architecture', 'Pull Requests', 'Static Hosting Integration', 'Documentation']
    },
    responsive: {
      title: 'Responsive Web Design',
      category: 'Multi-Device Experience Design',
      description: 'Ensuring flawless layouts across 320px mobile screens, standard tablets, 1080p monitors, and 4K displays. Fluid typography using clamp(), responsive image sets, and zero horizontal overflow.',
      tags: ['Mobile-First', 'Fluid clamp() Scaling', 'Breakpoints (320px-4K)', 'Touch Friendliness']
    }
  };

  const skillsCanvas = document.getElementById('skills-canvas');
  const skillTitle = document.getElementById('skill-detail-title');
  const skillCategory = document.getElementById('skill-detail-category');
  const skillDesc = document.getElementById('skill-detail-desc');
  const skillTags = document.getElementById('skill-detail-tags');
  const skillPanel = document.getElementById('skill-detail-panel');
  const skillTabButtons = document.querySelectorAll('.skill-tab-btn');

  function updateSkillPanel(skillKey) {
    const data = skillsData[skillKey];
    if (!data) return;

    if (skillTitle) skillTitle.textContent = data.title;
    if (skillCategory) skillCategory.textContent = data.category;
    if (skillDesc) skillDesc.textContent = data.description;

    if (skillTags) {
      skillTags.innerHTML = data.tags.map(t => `<span class="skill-pill">${t}</span>`).join('');
    }

    if (skillPanel) {
      skillPanel.classList.add('highlighted');
      setTimeout(() => skillPanel.classList.remove('highlighted'), 350);
    }

    skillTabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-skill') === skillKey);
    });
  }

  skillTabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.getAttribute('data-skill');
      updateSkillPanel(key);
    });
  });

  if (skillsCanvas) {
    initSkillsConstellation();
  }

  function initSkillsConstellation() {
    const ctx = skillsCanvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resizeSkills() {
      const parent = skillsCanvas.parentElement;
      width = skillsCanvas.width = (parent && parent.clientWidth) ? parent.clientWidth : 500;
      height = skillsCanvas.height = (parent && parent.clientHeight) ? parent.clientHeight : 500;
    }

    resizeSkills();
    window.addEventListener('resize', resizeSkills);

    const constellationNodes = [
      { key: 'html5', label: 'HTML5', xRatio: 0.22, yRatio: 0.35, vx: 0.14, vy: 0.12, radius: 24, color: '#087BFF' },
      { key: 'css3', label: 'CSS3', xRatio: 0.48, yRatio: 0.22, vx: -0.12, vy: 0.16, radius: 24, color: '#42B8FF' },
      { key: 'javascript', label: 'JavaScript', xRatio: 0.54, yRatio: 0.58, vx: 0.18, vy: -0.14, radius: 30, color: '#00F0FF' },
      { key: 'git', label: 'Git', xRatio: 0.8, yRatio: 0.32, vx: -0.16, vy: -0.12, radius: 22, color: '#818CF8' },
      { key: 'github', label: 'GitHub', xRatio: 0.78, yRatio: 0.68, vx: 0.14, vy: 0.15, radius: 26, color: '#38BDF8' },
      { key: 'responsive', label: 'Responsive', xRatio: 0.28, yRatio: 0.72, vx: -0.14, vy: -0.14, radius: 28, color: '#60A5FA' }
    ];

    let currentSkillKey = 'javascript';

    // Particle Background
    const backgroundStars = Array.from({ length: 35 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2
    }));

    function renderConstellation() {
      requestAnimationFrame(renderConstellation);

      ctx.clearRect(0, 0, width, height);

      // Background stars
      backgroundStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(66, 184, 255, ${star.alpha})`;
        ctx.fill();
      });

      // Update positions
      constellationNodes.forEach(node => {
        node.xRatio += (node.vx * 0.001);
        node.yRatio += (node.vy * 0.001);

        if (node.xRatio < 0.14 || node.xRatio > 0.86) node.vx *= -1;
        if (node.yRatio < 0.14 || node.yRatio > 0.86) node.vy *= -1;

        node.computedX = node.xRatio * width;
        node.computedY = node.yRatio * height;
      });

      // Connecting lines
      for (let i = 0; i < constellationNodes.length; i++) {
        for (let j = i + 1; j < constellationNodes.length; j++) {
          const a = constellationNodes[i];
          const b = constellationNodes[j];
          const dist = Math.hypot(a.computedX - b.computedX, a.computedY - b.computedY);

          if (dist < 260) {
            const alpha = 1 - dist / 260;
            ctx.beginPath();
            ctx.moveTo(a.computedX, a.computedY);
            ctx.lineTo(b.computedX, b.computedY);
            ctx.strokeStyle = `rgba(8, 123, 255, ${alpha * 0.35})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      constellationNodes.forEach(node => {
        const isSelected = node.key === currentSkillKey;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.computedX, node.computedY, node.radius + (isSelected ? 8 : 4), 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(8, 123, 255, 0.25)' : 'rgba(8, 123, 255, 0.08)';
        ctx.fill();

        // Node Circle
        ctx.beginPath();
        ctx.arc(node.computedX, node.computedY, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0B1220';
        ctx.strokeStyle = isSelected ? '#00F0FF' : node.color;
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelected ? 20 : 8;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = '600 11px "Space Grotesk", sans-serif';
        ctx.fillStyle = isSelected ? '#ffffff' : '#94A3B8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.computedX, node.computedY);
      });
    }

    renderConstellation();

    // Canvas Click
    skillsCanvas.addEventListener('click', (e) => {
      const rect = skillsCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      constellationNodes.forEach(node => {
        const dist = Math.hypot(clickX - node.computedX, clickY - node.computedY);
        if (dist <= node.radius + 12) {
          currentSkillKey = node.key;
          updateSkillPanel(node.key);
        }
      });
    });
  }

})();
