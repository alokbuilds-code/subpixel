# tesla-kinetic

> A 60 FPS, scroll-driven 3D web experience and digital showroom built with vanilla HTML, CSS 3D transforms, and zero runtime dependencies.

---

### Highlights

- **First-Load Monolith Intro** — Pure `#000000` sequence with responsive `clamp()` typography, `0.96 → 1.0 → 1.04` scale curve, and sub-pixel optical kerning compensation.
- **Scroll-Driven 3D Camera** — Multi-plane parallax engine where the vehicle advances toward the viewer (`scale3d: 1.0 → 1.16`) while atmospheric layers drift at differential rates.
- **Continuous 3D Section Choreography** — Content sections smoothly rise, tilt in 3D perspective (`rotateX`), and dissolve using hardware-composited blur and scale transitions.
- **60 FPS LERP Physics** — Linear interpolation engine (`delta * 0.085`) with automatic RAF sleep when idle ($\Delta < 0.12\text{px}$) to preserve 100% CPU/GPU resources.
- **Interactive Canvases** — Real-time Tri-Motor torque vectoring simulation and Hardware 4 Tesla Vision neural perception HUD.
- **Full Studio Configurator** — Real-time vehicle builder supporting trims, paint swatches, aero wheel options, interior themes, and dynamic pricing telemetry.
- **Zero Framework Overhead** — 100% pure vanilla JavaScript, CSS custom properties, and semantic HTML5. No build tools, bundlers, or external libraries required.

---

## Motion & Camera Architecture

```
User Scroll
   │
   ▼
[Target Scroll State]
   │
   ▼
[60 FPS LERP Physics Loop]  ──(current += (target - current) * 0.085)
   │
   ├── Hero Vehicle Advance     [scale3d(1.0 → 1.16) + translate3d forward]
   ├── Atmospheric Depth        [translate3d differential mountain rate]
   ├── Floating HUD Dissolve    [translate3d(0, -y, +z) + depth-of-field blur]
   ├── Section Staging          [translateY + rotateX(3.4°) + scale + blur]
   └── Showroom Lighting        [ambient exposure + platform advance]
   │
   ▼
[Delta Check] ──(Δ < 0.12px?) ──► [Halt RAF / Sleep Mode: 0% Idle CPU]
```

### Depth Mechanics

| Layer | Transform / Filter | Purpose |
| :--- | :--- | :--- |
| **Foreground Vehicle** | `scale3d(1 + p*0.16) translate3d(0, p*38px, 0)` | Simulates camera dolly advancing toward the car |
| **Atmosphere Overlay** | `translate3d(0, p*85px, 0)` | Slower parallax rate creates optical separation |
| **HUD & Content** | `translate3d(0, -p*65px, p*25px) blur(p*5.5px)` | Floats forward into camera plane while dissipating |
| **Incoming Sections** | `translateY(32px) rotateX(3.4deg) scale(0.968)` | Natural perspective rise as the user scrolls |

---

## Interactive Systems

### 1. Tri-Motor Torque Vectoring Canvas
An HTML5 canvas simulating real-time power distribution across all three drive units (single front induction, dual rear permanent magnet motors). Toggle between **Chill**, **Sport**, and **Plaid** modes to visualize instantaneous wheel slip and microsecond torque adjustments.

### 2. Tesla Vision Neural Perception HUD
Interactive neural network perception overlay modeling Hardware 4 sensor suites. Simulates 360-degree object detection bounding boxes, drivable space segmentation vectors, and confidence telemetry.

### 3. Real-Time Vehicle Configurator
Complete vehicle design studio featuring:
- **Models**: Model S, Model 3, Model X, Model Y, Cybertruck
- **Powertrains**: Long Range (Dual Motor) vs. Plaid (Tri-Motor AWD)
- **Finishes**: Pearl White, Solid Black, Midnight Silver, Deep Blue, Ultra Red, Stealth Grey
- **Wheels**: 19" Tempest vs. 21" Arachnid
- **Cabins**: All Black, Black & White, Cream
- **Autopilot**: Full Self-Driving (Supervised) package toggle with live price synchronization and modal reservation checkout

### 4. Ambient Web Audio
Custom multi-oscillator synthesizer providing ambient powertrain drone and haptic UI feedback clicks without external audio files.

---

## Repository Structure

```
├── index.html        # Semantic single-instance DOM & section hierarchy
├── styles.css        # Design tokens, 3D perspective rules, responsive layout
├── app.js            # LERP scroll engine, canvas renderers, configurator state
├── assets/           # Vector iconography, vehicle silhouettes, and badges
├── hero-clean.jpg    # High-resolution clean automotive render
└── README.md         # Documentation
```

---

## Quickstart

No Node.js, package manager, or compilation step is required.

### Local Development

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/tesla-kinetic.git
   cd tesla-kinetic
   ```

2. Serve with any static web server:

   **Python 3:**
   ```bash
   python -m http.server 3000
   ```

   **Node / npx:**
   ```bash
   npx serve .
   ```

   **VS Code:**
   Launch with the **Live Server** extension.

3. Open `http://localhost:3000` in any modern web browser.

---

## Performance Considerations

- **Composite-Only Animations**: The continuous scroll loop strictly mutates `transform` (3D hardware-accelerated), `opacity`, and `filter`. No layout properties (`width`, `margin`, `top`) are triggered during RAF execution.
- **Sub-Pixel Kerning Neutralization**: Negative trailing margins cancel the rightward bias of wide `letter-spacing` on large display headings, ensuring true horizontal centering across viewports.
- **Zero Idle Overhead**: The RAF loop automatically sleeps when scroll inertia drops below $0.12\text{px}$, preventing battery drain on mobile devices and laptops.

---

## Browser Support

- Chrome / Chromium 90+
- Safari 15.4+ (Full WebKit 3D transform & backdrop-filter support)
- Firefox 95+
- Edge 90+

---

## Disclaimer

This project is an independent design and engineering study created for educational and portfolio demonstration purposes. All trademarks, vehicle names, and brand identifiers are property of Tesla, Inc.
