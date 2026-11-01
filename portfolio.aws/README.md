# SHIVAM.EXE — 3D Immersive Developer Portfolio

> **Status:** System Online &bull; Version 2.5 &bull; Architecture: Static Cloud-Ready  
> **Author:** Shivam Kumar &bull; B.Tech CSE (IoT), Techno International Newtown (Class of 2030)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](#)
[![AWS](https://img.shields.io/badge/AWS-Ready-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](#)

---

## 🌌 Overview

**SHIVAM.EXE** is a futuristic, cinematic, fully responsive 3D developer portfolio crafted for Shivam Kumar. Designed with an advanced cybernetic HUD aesthetic, the website highlights engineering proficiency in modern web development, computer science fundamentals, and Internet of Things (IoT) hardware-software integration.

---

## 🎨 Visual Design System & Aesthetics

- **Style:** 3D Immersive, futuristic, cinematic HUD.
- **Color Palette:**
  - **Deep Space Black (`#05070D`):** Primary canvas background.
  - **Dark Navy (`#0B1220`):** Secondary container surface and glass panels.
  - **Electric Blue (`#087BFF`):** Primary functional action accent.
  - **Ice Blue (`#42B8FF`):** Secondary optical accent and telemetry indicators.
  - **Neon Cyan (`#00F0FF`):** Active orbital nodes and pulse points.
  - **Text:** White (`#FFFFFF`) and soft blue-grey (`#94A3B8`).
- **Typography:** Premium Google Fonts pair — `Space Grotesk` (display, headings, and telemetry badges) + `Inter` (body copy, descriptions, and UI links) + `JetBrains Mono` (terminal logs).
- **Surface Optics:** Glassmorphism (`backdrop-filter: blur`), subtle glowing borders, depth layering, and 3D perspective hover cards.

---

## 🚀 Key Features

### 1. Cinematic Hero Section
- Dynamic headline: **"BUILDING BEYOND THE CODE."**
- Name: **Shivam Kumar**
- Subtitle: **"Aspiring Full-Stack Developer | CSE (IoT) Student"**
- **Interactive 3D Orbital Object:** Real-time 3D cybernetic core with glowing nucleus, icosahedron lattice, orbital rings, and orbiting satellites (Three.js with responsive canvas fallback).
- Floating ambient particles and interactive mouse/touch rotation physics.
- Dual call-to-actions: **"Explore My Work"** and **"View GitHub"**, plus smooth scroll indicators.

### 2. Dossier (About Me)
- Personal introduction highlighting academic discipline at **Techno International Newtown**, branch in **Computer Science and Engineering (IoT)**, and expected graduation in **2030**.
- **Interactive 3D Holographic ID Card:** Physics-based tilt and glare with live telemetry details.
- Clear factual metrics without artificial proficiency percentages.

### 3. Interactive Skills Constellation
- Dynamic orbital constellation map of core web technologies:
  - **HTML5**
  - **CSS3**
  - **JavaScript**
  - **Git**
  - **GitHub**
  - **Responsive Web Design**
- Clickable nodes with interactive connection webs.
- Glassmorphic detail drawer that renders role definitions, architecture layers, and technical breakdowns upon selecting any skill.

### 4. Signature Creative Feature: Developer Journey Universe
- **Interactive 3D Cosmos:** A spatial 3D visualization representing Shivam's developer evolution across 6 interconnected milestone planetary nodes:
  1. `HTML` — Structural Blueprint
  2. `CSS` — Visual Hierarchy & Styling
  3. `JavaScript` — Dynamic Logic Synthesis
  4. `GitHub` — Version Control & Collaboration
  5. `Projects` — Real-World Application Proving Grounds
  6. `AWS` — Cloud Frontier & Scalability
- Real-time Bézier spline connections with traveling light pulses.
- Click-to-focus camera interpolation, orbital drag rotation, mobile touch gestures, and glass HUD information drawer.
- Quick navigation buttons for keyboard and mobile accessibility.

### 5. Featured Projects
- **SHIVAM.EXE — 3D Immersive Portfolio:** Modern personal website engineered with Three.js, responsive layouts, and static deployment structure.
- **Afghani Momos Website:** Responsive culinary web application showcasing menu systems, mobile navigation, and modern brand design.
- **IoT Telemetry & Sensor Node Interface:** CSE IoT academic lab prototype connecting sensor streams with browser telemetry dashboards.

### 6. Achievement Chronology (Milestones)
- Milestone log tracking genuine academic milestones at Techno International Newtown and development launches.
- Configurable placeholder slots ready for upcoming hackathons, competitive coding tournaments, and technical certifications.

### 7. Secure Transmission (Contact)
- Direct verified links:
  - **LinkedIn:** [https://www.linkedin.com/in/shivam-kumar-9ab9a2241/](https://www.linkedin.com/in/shivam-kumar-9ab9a2241/)
  - **GitHub:** Configured repository link.
  - **Email:** Configured direct address with one-click clipboard copy utility.
- Cybernetic terminal contact interface with direct mailto generation.

### 8. Animations & Accessibility
- Respects `prefers-reduced-motion: reduce`.
- Keyboard accessible with visible high-contrast focus rings and skip-to-content link.
- Web Audio API synthesizer for sci-fi hover and click sound effects (toggleable).
- Custom desktop cyber cursor with fluid trailing follower (disabled on touch devices).

---

## 📁 Project Directory Structure

```text
portfolio.aws/
├── index.html                 # Semantic HTML5 single-page application
├── README.md                  # Project documentation & AWS guide
├── css/
│   └── style.css              # Cyberpunk design system, responsive rules, glassmorphism
├── js/
│   ├── main.js                # Hero 3D core engine & coordinator
│   ├── animations.js          # Cursor, tilt physics, sound synth, intersection observer
│   └── universe.js            # Developer Journey Universe 3D engine & skills constellation
└── assets/
    ├── icons/                 # Crisp vector SVG icons
    │   ├── github.svg
    │   ├── linkedin.svg
    │   ├── mail.svg
    │   ├── terminal.svg
    │   ├── cpu.svg
    │   ├── code.svg
    │   ├── orbit.svg
    │   ├── cloud.svg
    │   └── external-link.svg
    └── images/                # Vector project previews & holographic avatar
        ├── portfolio-preview.svg
        ├── afghani-momos.svg
        ├── iot-preview.svg
        └── avatar-shivam.svg
```

---

## 🛠️ Local Development & Quick Start

Because this project is built using vanilla web technologies (HTML5, CSS3, Vanilla ES6+ JavaScript), no build tools or package managers are required.

### 1. Clone the repository
```bash
git clone https://github.com/shivamkumar/portfolio.git
cd portfolio
```

### 2. Run with any local HTTP server
Using Python 3:
```bash
python3 -m http.server 8080
```
Using Node `npx serve`:
```bash
npx serve .
```

Open your browser at `http://localhost:8080`.

---

## ☁️ AWS Cloud Deployment Architecture Guide

The project is structured entirely as a **static frontend application** with clean relative paths, zero hardcoded absolute filesystem links, and lightweight SVG assets, making it suitable for deployment on **Amazon Web Services (AWS)**.

### Target Architecture Overview

```text
[ User / Browser ] 
       │
       ▼ (HTTPS / Port 443)
[ Amazon Route 53 ] (DNS / Domain Management)
       │
       ▼
[ AWS Certificate Manager (ACM) ] (SSL / TLS Encryption)
       │
       ▼
[ Amazon CloudFront CDN ] (Global Edge Caching & Low-Latency Delivery)
       │
       ▼ (Origin Access Control / OAC)
[ Amazon S3 Bucket ] (Static Website Hosting / Private Storage)
```

### Step-by-Step Deployment Procedure

#### Step 1: Create Amazon S3 Bucket
1. Open the [AWS Management Console](https://console.aws.amazon.com/s3/).
2. Create a new S3 bucket (e.g., `shivam-kumar-portfolio`).
3. Select your preferred AWS Region (e.g., `ap-south-1` Mumbai or `us-east-1` N. Virginia).
4. Keep **"Block all public access"** enabled (best practice when fronted by CloudFront using Origin Access Control).

#### Step 2: Upload Files
Using the AWS CLI:
```bash
aws s3 sync . s3://shivam-kumar-portfolio/ \
  --exclude ".git/*" \
  --exclude ".DS_Store" \
  --delete
```

#### Step 3: Configure CloudFront Distribution
1. Navigate to the **CloudFront Console**.
2. Create a distribution:
   - **Origin Domain:** Select your S3 bucket.
   - **Origin Access:** Choose **Origin Access Control (OAC)** and let CloudFront update the bucket policy automatically.
   - **Viewer Protocol Policy:** Choose **Redirect HTTP to HTTPS**.
   - **Default Root Object:** `index.html`.
3. Under **Custom Error Responses**:
   - HTTP Error Code: `403` or `404` &rarr; Customize response to `200` & `index.html` (if client routing is used).

#### Step 4: Configure Custom Domain & SSL (Route 53 + ACM)
1. In `us-east-1`, request a public SSL certificate in **AWS Certificate Manager (ACM)** for your custom domain (e.g., `shivamkumar.dev`).
2. Attach the SSL certificate to your CloudFront distribution.
3. In **Amazon Route 53**, create an `A` record pointing with an **Alias** to the CloudFront distribution domain name.

*(Note: The website is static cloud-ready. AWS hosting is activated once the AWS infrastructure above is provisioned).*

---

## ♿ Accessibility & Device Testing

Tested across standard viewport widths:
- **Mobile (320px – 390px):** Single-column layout, touch-friendly tap targets (>44px), collapsible navigation menu, responsive 3D canvas rendering.
- **Tablet (768px):** Reflowed dual-column layout, adaptive font scaling using `clamp()`.
- **Desktop (1024px – 4K):** Dual-column layouts, 3D card tilt physics, custom cyber cursor, full universe spline trails.
- **Motion Accessibility:** Automatically disables intense animations when `prefers-reduced-motion: reduce` is detected.

---

## 📜 License & Acknowledgments

- Designed & Built by **Shivam Kumar** (2026).
- Powered by modern web standards, HTML5, CSS3, ES6+ JavaScript, and Three.js.
