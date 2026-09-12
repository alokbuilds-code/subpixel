/* ==========================================================================
   TESLA LUXURY AUTOMOTIVE EXPERIENCE - CORE APPLICATION ENGINE (app.js)
   Single Source of Truth, Zero DOM Cloning, Zero Duplication
   ========================================================================== */

(function () {
  'use strict';

  // Prevent multiple executions / re-initializations
  if (window.__TESLA_APP_INITIALIZED__) return;
  window.__TESLA_APP_INITIALIZED__ = true;

  // Vehicle Database (Single Source of Truth)
  const vehicleData = {
    modelS: {
      name: 'Model S',
      tagline: 'Relentless Performance. Timeless Design.',
      desc: 'Experience the next generation of electric driving with industry-leading range, cutting-edge technology, and a design that moves the world forward.',
      accel: '1.99s',
      range: '405 mi',
      topSpeed: '200 mph',
      power: '1,020 hp',
      price: '$74,990',
      heroImage: 'hero-clean.jpg',
      showroomImage: 'hero-clean.jpg'
    },
    model3: {
      name: 'Model 3',
      tagline: 'Upgraded for Pure Driving Dynamics.',
      desc: 'Refined styling with maximum aerodynamics, upgraded acoustic glass cabin, and premium rear touchscreen entertainment.',
      accel: '2.9s',
      range: '363 mi',
      topSpeed: '163 mph',
      power: '510 hp',
      price: '$38,990',
      heroImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
      showroomImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop'
    },
    modelX: {
      name: 'Model X',
      tagline: 'Beyond Utility. Pure Exhilaration.',
      desc: 'Falcon Wing doors, expansive panoramic windshield, seating for up to seven, and unmatched electric utility.',
      accel: '2.5s',
      range: '335 mi',
      topSpeed: '163 mph',
      power: '1,020 hp',
      price: '$79,990',
      heroImage: 'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?q=80&w=2064&auto=format&fit=crop',
      showroomImage: 'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?q=80&w=2064&auto=format&fit=crop'
    },
    modelY: {
      name: 'Model Y',
      tagline: 'The World’s Best-Selling Vehicle.',
      desc: 'Versatility meets pure electric performance. Expansive cargo capacity, all-weather all-wheel drive, and maximum safety.',
      accel: '3.5s',
      range: '320 mi',
      topSpeed: '155 mph',
      power: '455 hp',
      price: '$44,990',
      heroImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
      showroomImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'
    },
    cybertruck: {
      name: 'Cybertruck',
      tagline: 'Built for Any Planet.',
      desc: 'Ultra-hard 30X cold-rolled stainless steel exoskeleton, shatter-resistant armor glass, and sports car acceleration with truck utility.',
      accel: '2.6s',
      range: '340 mi',
      topSpeed: '130 mph',
      power: '845 hp',
      price: '$79,990',
      heroImage: 'https://images.unsplash.com/photo-1698877544079-c5cfaad2e52a?q=80&w=2070&auto=format&fit=crop',
      showroomImage: 'https://images.unsplash.com/photo-1698877544079-c5cfaad2e52a?q=80&w=2070&auto=format&fit=crop'
    }
  };

  const modelKeys = ['modelS', 'model3', 'modelX', 'modelY'];
  let currentModelIndex = 0;

  // Global Configurator State
  const configState = {
    model: 'modelS',
    trim: 'plaid',
    color: 'black',
    wheel: 'arachnid',
    interior: 'black',
    fsd: true,
    basePrices: {
      modelS: { longRange: 74990, plaid: 89990 },
      model3: { longRange: 38990, plaid: 53990 },
      modelX: { longRange: 79990, plaid: 94990 },
      modelY: { longRange: 44990, plaid: 54990 },
      cybertruck: { longRange: 79990, plaid: 99990 }
    },
    colorPrices: { white: 0, black: 1500, silver: 1500, blue: 1500, red: 2500, grey: 0 },
    wheelPrices: { tempest: 0, arachnid: 4500 },
    interiorPrices: { black: 0, white: 1000, cream: 1000 },
    fsdPrice: 8000
  };

  const colorNames = {
    white: 'Pearl White Multi-Coat',
    black: 'Solid Black',
    silver: 'Midnight Silver Metallic',
    blue: 'Deep Blue Metallic',
    red: 'Ultra Red',
    grey: 'Stealth Grey'
  };

  // Web Audio Synthesizer
  let audioCtx = null;
  let soundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playUiSound(type) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'whoosh') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(420, now + 0.2);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
      }
    } catch (e) {
      // Ignore audio synthesis restrictions
    }
  }

  // DOM Elements (Single Reference)
  const introOverlay = document.getElementById('tesla-intro');
  const wordmark = document.getElementById('tesla-wordmark') || document.querySelector('.tesla-wordmark');
  const skipBtn = document.getElementById('skip-intro');
  const websiteRoot = document.getElementById('website');
  const replayBtn = document.getElementById('replay-intro-btn');

  // Hero Progressive Reveal Elements
  const siteHeader = document.getElementById('site-header');
  const heroBackdropImg = document.getElementById('hero-backdrop-img');
  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroModelHeadline = document.getElementById('hero-model-headline');
  const heroSubheadline = document.getElementById('hero-subheadline');
  const heroDescription = document.getElementById('hero-description');
  const heroCtaGroup = document.querySelector('.hero-cta-group');
  const heroMetricsPanel = document.querySelector('.hero-metrics-panel');
  const heroVehicleSelector = document.querySelector('.hero-vehicle-selector');
  const heroFeatureCards = document.querySelector('.hero-feature-cards-container');

  const heroAccel = document.getElementById('hero-accel-val');
  const heroRange = document.getElementById('hero-range-val');
  const heroTopSpeed = document.getElementById('hero-top-speed-val');
  const selectorCounter = document.getElementById('selector-counter');
  const vehicleStackItems = document.querySelectorAll('.vehicle-stack-item');

  // ==========================================================================
  // 1. FULL-SCREEN CINEMATIC TESLA INTRO (Total Duration: 2.25s)
  // ==========================================================================
  let introTimeouts = [];

  function scheduleIntro(fn, delay) {
    const id = setTimeout(fn, delay);
    introTimeouts.push(id);
    return id;
  }

  function clearAllIntroTimeouts() {
    introTimeouts.forEach(id => clearTimeout(id));
    introTimeouts = [];
  }

  function revealWebsiteInstantly() {
    clearAllIntroTimeouts();
    if (introOverlay) {
      introOverlay.classList.add('fade-out');
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 300);
    }
    if (websiteRoot) websiteRoot.classList.add('revealed');
    if (heroBackdropImg) heroBackdropImg.classList.add('revealed');
    if (siteHeader) siteHeader.classList.add('revealed');
    if (heroEyebrow) heroEyebrow.classList.add('revealed');
    if (heroModelHeadline) heroModelHeadline.classList.add('revealed');
    if (heroSubheadline) heroSubheadline.classList.add('revealed');
    if (heroDescription) heroDescription.classList.add('revealed');
    if (heroCtaGroup) heroCtaGroup.classList.add('revealed');
    if (heroMetricsPanel) heroMetricsPanel.classList.add('revealed');
    if (heroVehicleSelector) heroVehicleSelector.classList.add('revealed');
    if (heroFeatureCards) heroFeatureCards.classList.add('revealed');
  }

  // Animation Sequence:
  // 1. Black screen appears first.
  // 2. TESLA fades in with subtle scale: 0.96 -> 1.
  // 3. Hold briefly.
  // 4. TESLA fades out with subtle scale: 1 -> 1.04.
  // 5. Remove the black overlay and reveal the website smoothly.
  function runTeslaIntroSequence() {
    if (!introOverlay) {
      revealWebsiteInstantly();
      return;
    }

    clearAllIntroTimeouts();

    // 1. Black screen appears first
    introOverlay.style.display = 'flex';
    introOverlay.classList.remove('fade-out');

    // 2. Trigger GPU-accelerated keyframe animation (0.96 -> 1 -> hold -> 1.04)
    if (wordmark) {
      wordmark.style.animation = 'none';
      void wordmark.offsetWidth; // Force reflow
      wordmark.style.animation = 'teslaIntroAnim 2.0s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    }

    // Conceal website elements during intro
    if (websiteRoot) websiteRoot.classList.remove('revealed');
    if (heroBackdropImg) heroBackdropImg.classList.remove('revealed');
    if (siteHeader) siteHeader.classList.remove('revealed');
    if (heroEyebrow) heroEyebrow.classList.remove('revealed');
    if (heroModelHeadline) heroModelHeadline.classList.remove('revealed');
    if (heroSubheadline) heroSubheadline.classList.remove('revealed');
    if (heroDescription) heroDescription.classList.remove('revealed');
    if (heroCtaGroup) heroCtaGroup.classList.remove('revealed');
    if (heroMetricsPanel) heroMetricsPanel.classList.remove('revealed');
    if (heroVehicleSelector) heroVehicleSelector.classList.remove('revealed');
    if (heroFeatureCards) heroFeatureCards.classList.remove('revealed');

    // 5. Remove the black overlay and reveal the website smoothly (~1.75s -> 2.25s)
    scheduleIntro(() => {
      introOverlay.classList.add('fade-out');

      // Website reveals smoothly without layout shift
      if (websiteRoot) websiteRoot.classList.add('revealed');
      if (heroBackdropImg) heroBackdropImg.classList.add('revealed');
      if (siteHeader) siteHeader.classList.add('revealed');
      if (heroEyebrow) heroEyebrow.classList.add('revealed');
      if (heroModelHeadline) heroModelHeadline.classList.add('revealed');
      if (heroSubheadline) heroSubheadline.classList.add('revealed');
      if (heroDescription) heroDescription.classList.add('revealed');
      if (heroCtaGroup) heroCtaGroup.classList.add('revealed');
      if (heroMetricsPanel) heroMetricsPanel.classList.add('revealed');
      if (heroVehicleSelector) heroVehicleSelector.classList.add('revealed');
      if (heroFeatureCards) heroFeatureCards.classList.add('revealed');

      // Cleanup overlay after transition completes (2.25s total duration)
      setTimeout(() => {
        if (introOverlay) introOverlay.style.display = 'none';
      }, 500);
    }, 1750);
  }

  // Footer Replay Intro Button
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playUiSound('click');
      window.scrollTo({ top: 0, behavior: 'instant' });
      runTeslaIntroSequence();
    });
  }

  // Global helper for console/developer testing
  window.replayTeslaIntro = function () {
    location.reload();
  };

  // Intro runs once per page load
  runTeslaIntroSequence();

  // ==========================================================================
  // 2. VEHICLE SWITCHING (Strict In-Place Updates — Zero Duplication)
  // ==========================================================================
  function switchVehicle(modelKey) {
    const v = vehicleData[modelKey];
    if (!v) return;

    playUiSound('click');

    // 1. Update text content in place
    if (heroModelHeadline) heroModelHeadline.textContent = v.name;
    if (heroSubheadline) heroSubheadline.textContent = v.tagline;
    if (heroDescription) heroDescription.textContent = v.desc;

    // 2. Update specs in place
    if (heroAccel) heroAccel.textContent = v.accel;
    if (heroRange) heroRange.textContent = v.range;
    if (heroTopSpeed) heroTopSpeed.textContent = v.topSpeed;

    // 3. Update counter and active class
    currentModelIndex = modelKeys.indexOf(modelKey);
    if (selectorCounter && currentModelIndex !== -1) {
      selectorCounter.textContent = `0${currentModelIndex + 1} / 04`;
    }

    vehicleStackItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-model') === modelKey);
    });

    // 4. Smooth image transition
    if (heroBackdropImg) {
      heroBackdropImg.style.opacity = '0.35';
      setTimeout(() => {
        heroBackdropImg.src = v.heroImage;
        heroBackdropImg.style.opacity = '1';
      }, 220);
    }
  }

  vehicleStackItems.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-model');
      switchVehicle(key);
    });
  });

  const prevBtn = document.getElementById('selector-prev');
  const nextBtn = document.getElementById('selector-next');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentModelIndex = (currentModelIndex - 1 + modelKeys.length) % modelKeys.length;
      switchVehicle(modelKeys[currentModelIndex]);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentModelIndex = (currentModelIndex + 1) % modelKeys.length;
      switchVehicle(modelKeys[currentModelIndex]);
    });
  }

  // ==========================================================================
  // 3. 3D FEATURE CARDS INTERACTION (Physics Tilt & Smooth Navigation)
  // ==========================================================================
  const cards = document.querySelectorAll('.feature-3d-card');
  cards.forEach(card => {
    const reflection = card.querySelector('.card-reflection');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;

      card.style.transform = `perspective(1000px) rotateX(${normY * -10}deg) rotateY(${normX * 12}deg) translateZ(6px)`;

      if (reflection) {
        reflection.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.25) 0%, transparent 65%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });

    card.addEventListener('click', () => {
      playUiSound('click');
      const targetId = card.getAttribute('data-target-section');
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================================================
  // 4. CINEMATIC SCROLL-DRIVEN 3D CAMERA & PARALLAX ENGINE (60 FPS LERP)
  // ==========================================================================
  let targetScrollY = window.scrollY;
  let currentScrollY = window.scrollY;
  let isScrollLoopActive = false;

  const heroSection = document.getElementById('hero');
  const heroBackdropContainer = document.querySelector('.hero-backdrop-container');
  const heroAtmosphere = document.querySelector('.hero-gradient-overlay');
  const heroVignette = document.querySelector('.hero-vignette-overlay');
  const heroContentContainer = document.querySelector('.hero-content');
  const heroSelectorContainer = document.querySelector('.hero-vehicle-selector');
  const heroCardsContainer = document.querySelector('.hero-feature-cards-container');

  const showroomVehicleImg = document.getElementById('showroom-vehicle-img');
  const cinematicSections = document.querySelectorAll('.section-wrapper');
  const loopBtn = document.getElementById('cinematic-loop-btn');

  function renderParallaxFrame() {
    // Smooth LERP interpolation
    const delta = targetScrollY - currentScrollY;
    currentScrollY += delta * 0.085;

    const sy = currentScrollY;
    const vh = window.innerHeight;

    // Navbar frosted glass morphing
    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', sy > 40);
    }

    // 1. HERO MULTI-PLANE DEPTH PARALLAX
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight || vh;
      if (sy < heroHeight * 1.3) {
        const hp = Math.min(1.2, Math.max(0, sy / heroHeight));

        // Vehicle advances subtly toward camera (16% scale push + slight forward vertical drift)
        if (heroBackdropContainer) {
          const vScale = 1 + hp * 0.16;
          const vY = hp * 38;
          heroBackdropContainer.style.transform = `scale3d(${vScale}, ${vScale}, 1) translate3d(0, ${vY}px, 0)`;
        }

        // Atmosphere layers shift with deeper mountain parallax
        if (heroAtmosphere) {
          heroAtmosphere.style.transform = `translate3d(0, ${hp * 85}px, 0)`;
        }
        if (heroVignette) {
          heroVignette.style.transform = `translate3d(0, ${hp * 70}px, 0)`;
        }

        // Content panels smoothly rise, scale, and dissolve with photographic depth blur
        const cFade = Math.max(0, 1 - hp * 1.55);
        const cBlur = hp * 5.5;
        const cRise = -hp * 65;

        if (heroContentContainer) {
          heroContentContainer.style.transform = `translate3d(0, ${cRise}px, ${hp * 25}px)`;
          heroContentContainer.style.opacity = cFade;
          heroContentContainer.style.filter = cBlur > 0.3 ? `blur(${cBlur}px)` : 'none';
        }
        if (heroSelectorContainer) {
          heroSelectorContainer.style.transform = `translate3d(${hp * 35}px, ${cRise * 0.8}px, 0)`;
          heroSelectorContainer.style.opacity = cFade;
          heroSelectorContainer.style.filter = cBlur > 0.3 ? `blur(${cBlur * 0.8}px)` : 'none';
        }
        if (heroCardsContainer) {
          heroCardsContainer.style.transform = `translate3d(0, ${hp * 55}px, 0)`;
          heroCardsContainer.style.opacity = cFade;
          heroCardsContainer.style.filter = cBlur > 0.3 ? `blur(${cBlur * 0.8}px)` : 'none';
        }
      }
    }

    // 2. CONTENT SECTIONS 3D CHOREOGRAPHY (Smooth Rise, 3D Tilt & Magnetic Dissolve)
    cinematicSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const secCenter = rect.top + rect.height * 0.5;
      const screenCenter = vh * 0.5;
      const dist = (secCenter - screenCenter) / (vh * 0.85);
      const clamped = Math.max(-1.35, Math.min(1.35, dist));

      // Active in or near view
      if (rect.bottom >= -80 && rect.top <= vh + 80) {
        const tilt = clamped * 3.4; // 3.4deg max 3D rotation
        const translateY = clamped * 32; // 32px rise
        const scale = 1 - Math.abs(clamped) * 0.032; // 3.2% scale delta
        const blur = Math.min(3.5, Math.abs(clamped) * 2.8);
        const opacity = Math.min(1, Math.max(0.3, 1 - Math.abs(clamped) * 0.6));

        sec.style.transform = `perspective(1200px) rotateX(${tilt}deg) translateY(${translateY}px) scale3d(${scale}, ${scale}, 1)`;
        sec.style.opacity = opacity;
        sec.style.filter = blur > 0.4 ? `blur(${blur}px)` : 'none';
      } else {
        sec.style.filter = 'none';
        sec.style.opacity = '1';
      }
    });

    // 3. SHOWROOM STAGE VEHICLE CAMERA PUSH
    if (showroomVehicleImg) {
      const sRect = showroomVehicleImg.getBoundingClientRect();
      if (sRect.bottom >= 0 && sRect.top <= vh) {
        const sCenter = sRect.top + sRect.height * 0.5;
        const sDist = (sCenter - vh * 0.5) / (vh * 0.65);
        const sClamped = Math.max(-1, Math.min(1, sDist));
        const sScale = 1 + (1 - Math.abs(sClamped)) * 0.06;
        showroomVehicleImg.style.transform = `scale3d(${sScale}, ${sScale}, 1) translate3d(0, ${-sClamped * 18}px, 0)`;
      }
    }

    // 4. LERP SLEEP OR NEXT FRAME
    if (Math.abs(delta) > 0.12) {
      requestAnimationFrame(renderParallaxFrame);
    } else {
      currentScrollY = targetScrollY;
      isScrollLoopActive = false;
    }
  }

  function triggerScrollLoop() {
    targetScrollY = window.scrollY;
    if (!isScrollLoopActive) {
      isScrollLoopActive = true;
      requestAnimationFrame(renderParallaxFrame);
    }
  }

  window.addEventListener('scroll', triggerScrollLoop, { passive: true });
  window.addEventListener('resize', triggerScrollLoop);

  // Seamless Continuous Loop Return-to-Top Button
  if (loopBtn) {
    loopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playUiSound('whoosh');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Audio Toggle Button
  const audioToggle = document.getElementById('audio-toggle');
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      audioToggle.classList.toggle('playing', soundEnabled);
      const lbl = audioToggle.querySelector('.audio-label');
      if (lbl) lbl.textContent = soundEnabled ? 'Sound On' : 'Sound Off';
      if (soundEnabled) playUiSound('click');
    });
  }

  // ==========================================================================
  // 5. INTERACTIVE CANVASES (Torque Vectoring & Tesla Vision)
  // ==========================================================================
  const torqueCanvas = document.getElementById('torque-canvas');
  if (torqueCanvas) {
    const ctx = torqueCanvas.getContext('2d');
    let mode = 'plaid';
    let particles = [];

    function resizeTorque() {
      torqueCanvas.width = torqueCanvas.offsetWidth * (window.devicePixelRatio || 1);
      torqueCanvas.height = torqueCanvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    window.addEventListener('resize', resizeTorque);
    resizeTorque();

    for (let i = 0; i < 35; i++) {
      particles.push({ wheel: Math.floor(Math.random() * 4), progress: Math.random() });
    }

    function drawTorque() {
      const w = torqueCanvas.offsetWidth;
      const h = torqueCanvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Chassis outline
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 65, cy - 130, 130, 260);

      // Battery pack area
      ctx.fillStyle = mode === 'plaid' ? 'rgba(232, 33, 39, 0.12)' : 'rgba(0, 240, 255, 0.08)';
      ctx.fillRect(cx - 50, cy - 90, 100, 180);

      // Wheels
      const wheels = [
        { x: cx - 85, y: cy - 110 },
        { x: cx + 65, y: cy - 110 },
        { x: cx - 85, y: cy + 70 },
        { x: cx + 65, y: cy + 70 }
      ];

      const mult = mode === 'plaid' ? 1.0 : (mode === 'sport' ? 0.75 : 0.45);

      wheels.forEach(wh => {
        ctx.fillStyle = '#161922';
        ctx.strokeStyle = mode === 'plaid' ? '#e82127' : '#00f0ff';
        ctx.lineWidth = 2;
        ctx.fillRect(wh.x, wh.y, 20, 40);
        ctx.strokeRect(wh.x, wh.y, 20, 40);
      });

      // Energy flow particles
      particles.forEach(p => {
        p.progress += 0.015 * mult;
        if (p.progress > 1) p.progress = 0;
        const tw = wheels[p.wheel];
        const px = cx + (tw.x + 10 - cx) * p.progress;
        const py = (cy + (p.wheel < 2 ? -90 : 80)) + (tw.y + 20 - (cy + (p.wheel < 2 ? -90 : 80))) * p.progress;

        ctx.fillStyle = mode === 'plaid' ? '#ff4d4f' : '#00f0ff';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      requestAnimationFrame(drawTorque);
    }
    requestAnimationFrame(drawTorque);

    document.querySelectorAll('.mode-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        playUiSound('click');
        document.querySelectorAll('.mode-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        mode = pill.getAttribute('data-mode');
        const badge = document.querySelector('.canvas-status-badge');
        if (badge) badge.textContent = mode.toUpperCase() + ' TORQUE ENGAGED';
      });
    });
  }

  // Tesla Vision Canvas
  const visionCanvas = document.getElementById('vision-canvas');
  if (visionCanvas) {
    const ctx = visionCanvas.getContext('2d');
    let offset = 0;

    function resizeVision() {
      visionCanvas.width = visionCanvas.offsetWidth * (window.devicePixelRatio || 1);
      visionCanvas.height = visionCanvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    window.addEventListener('resize', resizeVision);
    resizeVision();

    function drawVision() {
      const w = visionCanvas.offsetWidth;
      const h = visionCanvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      offset = (offset + 3) % 40;
      const horizonY = h * 0.42;

      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;

      // Road lanes
      [-200, -70, 70, 200].forEach(lx => {
        ctx.beginPath();
        ctx.moveTo(w / 2 + lx * 0.1, horizonY);
        ctx.lineTo(w / 2 + lx * 1.5, h);
        ctx.stroke();
      });

      // Dashed lane lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      ctx.setLineDash([18, 22]);
      ctx.lineDashOffset = -offset;
      ctx.beginPath();
      ctx.moveTo(w / 2, horizonY);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3D Lead Vehicle representation
      const boxW = 54;
      const boxH = 34;
      const bx = w / 2 - boxW / 2;
      const by = horizonY + 60;

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, by, boxW, boxH);
      ctx.fillStyle = '#00f0ff';
      ctx.font = '10px monospace';
      ctx.fillText('45m [65 MPH]', bx - 10, by - 6);

      // Ego car
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w / 2 - 20, h - 45, 40, 35);

      ctx.restore();
      requestAnimationFrame(drawVision);
    }
    requestAnimationFrame(drawVision);
  }

  // ==========================================================================
  // 6. CHARGING TRIP CALCULATOR
  // ==========================================================================
  const tripSlider = document.getElementById('trip-slider');
  const tripDisplay = document.getElementById('trip-distance-display');
  const chargeTime = document.getElementById('calc-charge-time');
  const gasSavings = document.getElementById('calc-gas-savings');
  const superchargers = document.getElementById('calc-superchargers');

  if (tripSlider) {
    tripSlider.addEventListener('input', () => {
      const dist = parseInt(tripSlider.value, 10);
      if (tripDisplay) tripDisplay.textContent = `${dist} miles`;
      const mins = Math.max(15, Math.round((dist / 200) * 15));
      if (chargeTime) chargeTime.textContent = `${mins} min`;
      if (gasSavings) gasSavings.textContent = `$${Math.round(dist * 0.13 * 52).toLocaleString()}`;
      if (superchargers) superchargers.textContent = `${Math.max(1, Math.round(dist / 110))} on route`;
    });
  }

  // ==========================================================================
  // 7. VEHICLE CONFIGURATOR
  // ==========================================================================
  const configVehicleImg = document.getElementById('config-vehicle-img');
  const configModelTitle = document.getElementById('config-model-title');
  const configModelSubtitle = document.getElementById('config-model-subtitle');
  const configTotalPrice = document.getElementById('config-total-price');
  const configMonthlyEst = document.getElementById('config-monthly-est');
  const activeColorName = document.getElementById('active-color-name');

  function updateConfigurator() {
    const cur = configState.model;
    const info = vehicleData[cur];
    if (!info) return;

    const base = configState.basePrices[cur][configState.trim];
    const colorAdd = configState.colorPrices[configState.color] || 0;
    const wheelAdd = configState.wheelPrices[configState.wheel] || 0;
    const interiorAdd = configState.interiorPrices[configState.interior] || 0;
    const fsdAdd = configState.fsd ? configState.fsdPrice : 0;

    const total = base + colorAdd + wheelAdd + interiorAdd + fsdAdd;
    const monthly = Math.round(total / 72);

    if (configModelTitle) configModelTitle.textContent = info.name;
    if (configModelSubtitle) configModelSubtitle.textContent = configState.trim === 'plaid' ? 'Plaid Tri-Motor All-Wheel Drive' : 'Long Range Dual Motor All-Wheel Drive';
    if (configTotalPrice) configTotalPrice.textContent = `$${total.toLocaleString()}`;
    if (configMonthlyEst) configMonthlyEst.textContent = `Est. $${monthly}/mo`;
    if (activeColorName) activeColorName.textContent = colorNames[configState.color];

    if (configVehicleImg) {
      if (configState.color === 'white') {
        configVehicleImg.style.filter = 'brightness(1.1) contrast(1.05)';
      } else if (configState.color === 'black') {
        configVehicleImg.style.filter = 'brightness(0.9) contrast(1.15)';
      } else if (configState.color === 'silver') {
        configVehicleImg.style.filter = 'brightness(1.0) contrast(1.08) saturate(0.5)';
      } else if (configState.color === 'blue') {
        configVehicleImg.style.filter = 'hue-rotate(210deg) saturate(1.2)';
      } else if (configState.color === 'red') {
        configVehicleImg.style.filter = 'hue-rotate(345deg) saturate(1.4)';
      } else if (configState.color === 'grey') {
        configVehicleImg.style.filter = 'brightness(0.95) saturate(0.2)';
      }
    }
  }

  document.querySelectorAll('[data-config-model]').forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      document.querySelectorAll('[data-config-model]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      configState.model = btn.getAttribute('data-config-model');
      updateConfigurator();
    });
  });

  document.querySelectorAll('.trim-card').forEach(card => {
    card.addEventListener('click', () => {
      playUiSound('click');
      document.querySelectorAll('.trim-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      configState.trim = card.getAttribute('data-trim');
      updateConfigurator();
    });
  });

  document.querySelectorAll('.color-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      configState.color = btn.getAttribute('data-color');
      updateConfigurator();
    });
  });

  document.querySelectorAll('.wheel-card').forEach(card => {
    card.addEventListener('click', () => {
      playUiSound('click');
      document.querySelectorAll('.wheel-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      configState.wheel = card.getAttribute('data-wheel');
      updateConfigurator();
    });
  });

  document.querySelectorAll('.interior-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('click');
      document.querySelectorAll('.interior-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      configState.interior = btn.getAttribute('data-interior');
      updateConfigurator();
    });
  });

  const fsdCard = document.querySelector('.fsd-feature-card');
  if (fsdCard) {
    fsdCard.addEventListener('click', () => {
      playUiSound('click');
      configState.fsd = !configState.fsd;
      fsdCard.classList.toggle('active', configState.fsd);
      updateConfigurator();
    });
  }

  updateConfigurator();

  // ==========================================================================
  // 8. CHECKOUT MODAL
  // ==========================================================================
  const modal = document.getElementById('checkout-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  function openModal() {
    playUiSound('whoosh');
    if (!modal) return;
    const v = vehicleData[configState.model];
    const carName = document.getElementById('modal-car-name');
    const trimName = document.getElementById('modal-trim-name');
    const paintName = document.getElementById('modal-paint-name');
    const totalDue = document.getElementById('modal-total-due');

    if (carName) carName.textContent = v.name;
    if (trimName) trimName.textContent = configState.trim === 'plaid' ? 'Plaid Tri-Motor' : 'Long Range Dual Motor';
    if (paintName) paintName.textContent = colorNames[configState.color];
    if (totalDue && configTotalPrice) totalDue.textContent = configTotalPrice.textContent;

    modal.classList.add('open');
  }

  function closeModal() {
    playUiSound('click');
    if (modal) modal.classList.remove('open');
  }

  document.querySelectorAll('.open-checkout-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.querySelectorAll('.pay-button').forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound('whoosh');
      btn.innerHTML = '<span style="color:#00f0ff">✓ Reservation Confirmed</span>';
      setTimeout(() => {
        closeModal();
        btn.innerHTML = btn.getAttribute('data-original-text') || 'Order Placed';
      }, 1500);
    });
  });

  // Mobile Menu
  const mobileTrigger = document.getElementById('mobile-menu-trigger');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileClose = document.getElementById('mobile-nav-close');

  if (mobileTrigger && mobileOverlay) {
    mobileTrigger.addEventListener('click', () => {
      playUiSound('click');
      mobileOverlay.classList.add('open');
    });
  }
  if (mobileClose && mobileOverlay) {
    mobileClose.addEventListener('click', () => {
      playUiSound('click');
      mobileOverlay.classList.remove('open');
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const tid = a.getAttribute('href');
      if (tid && tid !== '#') {
        const el = document.querySelector(tid);
        if (el) {
          e.preventDefault();
          playUiSound('click');
          if (mobileOverlay) mobileOverlay.classList.remove('open');
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

})();
