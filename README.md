# ⚡ photonic-dolly

### 🎬 Ultra-Realistic 3D Cinematic Tesla Experience & Digital Showroom

> **A viewport-driven 60 FPS cinematic camera rig featuring multi-plane stereoscopic parallax, forward Z-axis dolly translation, rotational perspective dissipation (`rotateX`), and photographic depth-of-field blur — architected entirely atop hardware-composited CSS 3D context matrixing and sub-pixel LERP physics with zero runtime bundle overhead.**

[![Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20ES6%2B-black?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3 3D](https://img.shields.io/badge/Graphics-CSS3%203D%20Transforms-black?style=for-the-badge&logo=css3&logoColor=1572B6)](https://www.w3.org/TR/css-transforms-2/)
[![Canvas API](https://img.shields.io/badge/Telemetry-HTML5%20Canvas-black?style=for-the-badge&logo=html5&logoColor=E34F26)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Pure%20Native)-black?style=for-the-badge&logo=speedtest&logoColor=00FF66)](.)
[![FPS](https://img.shields.io/badge/Performance-60%20FPS%20Locked-black?style=for-the-badge&logo=googlechrome&logoColor=white)](.)

---

## 🌌 Overview

**photonic-dolly** is a high-concept automotive creative engineering showcase inspired by Tesla’s minimalist luxury-tech design philosophy. It bridges web animation and film cinematography: the entire viewport behaves like a physical motion-control camera dolly gliding through an interactive spatial automotive environment.

Built 100% dependency-free using pure HTML5, CSS3 3D matrix transforms, and vanilla ECMAScript.

---

## ✨ Core Feature Highlights

* 🎬 **First-Load Monolith Intro** — Pure `#000000` sequence with responsive `clamp()` typography, `0.96 → 1.0 → 1.04` scale curve, and sub-pixel optical kerning compensation.
* 🏎️ **Scroll-Driven 3D Dolly Zoom** — As you scroll, the Tesla Model S advances forward into the camera plane (`scale3d: 1.0 → 1.16` + forward vertical drift) while atmospheric layers drift with differential optical parallax.
* 🪐 **Section-to-Section 3D Choreography** — Content sections smoothly rise, tilt in 3D perspective (`rotateX: 3.4°`), and dissolve using hardware-composited blur and scale transitions.
* ⚡ **60 FPS LERP Physics Engine** — Continuous linear interpolation (`delta * 0.085`) with automatic RAF sleep when idle ($\Delta < 0.12\text{px}$) to preserve 100% CPU/GPU resources.
* 🎛️ **Tri-Motor Torque Vectoring Canvas** — Real-time physics canvas simulating microsecond power distribution across three drive units in Chill, Sport, and Plaid modes.
* 👁️ **Tesla Vision Neural Perception HUD** — Interactive Hardware 4 perception overlay modeling 360° object detection, occupancy grids, and neural path vectors.
* 🎨 **Full Studio Configurator** — Real-time vehicle builder supporting trims, multi-coat paint swatches, aero wheels, cabin décors, and live financial estimation.
* 🎧 **Procedural Web Audio Engine** — Synthesizes electric powertrain drone frequencies and haptic UI clicks without any external sound assets.
* 📦 **Zero Framework Overhead** — No React, no Three.js, no Webpack, no node_modules. Pure web native.

---

## 📐 3D Camera & Parallax Architecture

```
User Scroll Event 🖱️
       │
       ▼
[Target Scroll State]
       │
       ▼
[60 FPS LERP Physics Loop]  ──(current += (target - current) * 0.085)
       │
       ├── 🏎️ Hero Vehicle Advance    [scale3d(1.0 → 1.16) + translate3d forward]
       ├── 🏔️ Atmospheric Parallax    [translate3d differential mountain rate]
       ├── 🌫️ Floating HUD Dissolve   [translate3d(0, -y, +z) + depth-of-field blur]
       ├── 📐 Section 3D Staging      [translateY + rotateX(3.4°) + scale + blur]
       └── 💡 Showroom Stage Focus    [ambient exposure + vehicle approach]
       │
       ▼
[Delta Settling Check] ──(Δ < 0.12px?) ──► 💤 [RAF Sleep: 0% Idle CPU Usage]
```

### 🎚️ Multi-Plane Depth Mechanics

| Layer | 3D Matrix / Filter | Cinematographic Role |
| :--- | :--- | :--- |
| **🏎️ Foreground Vehicle** | `scale3d(1 + p*0.16) translate3d(0, p*38px, 0)` | Simulates camera dolly pushing forward toward the vehicle |
| **🏔️ Atmosphere & Mountains** | `translate3d(0, p*85px, 0)` | Differential translation speed creates realistic spatial depth |
| **🌫️ HUD & Metrics** | `translate3d(0, -p*65px, p*25px) blur(p*5.5px)` | Floats forward into camera plane and dissolves into blur |
| **📐 Incoming Content Panels** | `translateY(32px) rotateX(3.4deg) scale(0.968)` | Natural perspective rise as user travels through the page |

---

## 🛠️ Interactive Systems & Canvases

### ⚡ 1. Tri-Motor Torque Vectoring (`#torque-canvas`)
* Interactive canvas simulating instant microsecond torque delivery.
* **Modes**:
  * 🟢 **Chill** — Front-biased smooth power delivery for maximum efficiency.
  * 🟡 **Sport** — Dynamic 50/50 balanced all-wheel drive traction.
  * 🔴 **Plaid** — 1,020 hp full rear-motor bias with carbon-sleeved rotor simulation.

### 👁️ 2. Tesla Vision Neural HUD (`#vision-canvas`)
* Emulates Tesla Hardware 4 (HW4) neural net perception in real time.
* Features live 360° sensor arrays, obstacle vector bounding boxes, dynamic path trajectories, and photon confidence metrics.

### 🎨 3. Studio Vehicle Configurator (`#configurator`)
* **1. Platforms**: Model S, Model 3, Model X, Model Y, Cybertruck
* **2. Powertrains**: Long Range (Dual Motor) vs. Plaid (Tri-Motor AWD)
* **3. Exterior Paint**: Pearl White, Solid Black, Midnight Silver, Deep Blue, Ultra Red, Stealth Grey
* **4. Aero Wheels**: 19" Tempest vs. 21" Arachnid
* **5. Cabin Décor**: All Black, Black & White, Cream
* **6. Autopilot**: Full Self-Driving (Supervised) package toggle with live price synchronization and modal reservation checkout

### 🔋 4. Global Supercharger Trip Planner (`#charging-section`)
* Dynamic trip distance slider calculating real-time charging durations, gas cost offsets, and optimal Supercharger stops along the route.

### 🎧 5. Procedural Web Audio Engine
* Native browser `AudioContext` synthesizer creating deep sub-harmonic electric motor hums and crisp micro-click haptic feedback.

---

## 📁 Project Blueprint

```
├── 📄 index.html          # Clean semantic DOM with single-instance hierarchy
├── 🎨 styles.css          # Design system tokens, 3D perspective, responsive rules
├── ⚡ app.js              # 60 FPS LERP engine, canvas simulations, configurator state
├── 🖼️ hero-clean.jpg      # High-res clean automotive render (no baked text)
├── 📂 assets/             # Vector icons, wheel geometry, vehicle badges
└── 📜 README.md           # Documentation
```

---

## 🚀 Quickstart & Local Setup

Zero build tools, zero dependencies, zero npm packages needed.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/photonic-dolly.git

# 2. Enter directory
cd photonic-dolly

# 3. Serve via any static web server
# Python 3
python -m http.server 3000

# Node / npx
npx serve .

# Or simply open index.html in your browser!
```

---

## 💎 Performance & Engineering Restraint

* 🚀 **Composite-Only Animation Pipelines**: The continuous scroll loop strictly mutates `transform` (3D hardware-accelerated), `opacity`, and `filter`. No layout reflows (`width`, `margin`, `top`) are triggered during RAF execution.
* 🎯 **Sub-Pixel Kerning Neutralization**: Negative trailing margins cancel the rightward bias of wide `letter-spacing` on large display headings, ensuring true horizontal centering across viewports.
* 💤 **Intelligent RAF Sleep**: The animation loop automatically suspends when scroll inertia settles below $0.12\text{px}$, preventing battery drain on mobile devices and laptops.
* 📱 **Fluid Viewport Clamping**: Dynamic typography scales seamlessly from mobile (`320px`) to ultrawide monitors (`3840px`) using CSS `clamp()`.

---

## 🌐 Browser Compatibility

* 🟢 **Chrome / Chromium**: 90+ (Full hardware acceleration)
* 🟢 **Safari / iOS Safari**: 15.4+ (Full WebKit 3D transform & backdrop-filter)
* 🟢 **Firefox**: 95+ (Hardware compositing enabled)
* 🟢 **Edge**: 90+

---

## ⚖️ Disclaimer

*This project is an independent creative design & engineering study created for educational and portfolio demonstration purposes. All trademarks, vehicle names, and brand identifiers belong to Tesla, Inc.*
