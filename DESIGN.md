---
name: CYGUIN Mission-Critical Cyber OS Design System
colors:
  surface: '#050608'
  surface-dim: '#030406'
  surface-bright: '#0e131a'
  surface-container-lowest: '#020304'
  surface-container-low: '#070a0e'
  surface-container: '#090c10'
  surface-container-high: '#11161d'
  surface-container-highest: '#151b24'
  on-surface: '#f1f5f9'
  on-surface-variant: '#94a3b8'
  inverse-surface: '#f8fafc'
  inverse-on-surface: '#050608'
  outline: 'rgba(255, 255, 255, 0.05)'
  outline-variant: 'rgba(0, 229, 255, 0.15)'
  surface-tint: '#00e5ff'
  primary: '#2d7cff'
  on-primary: '#ffffff'
  primary-container: 'rgba(45, 124, 255, 0.15)'
  on-primary-container: '#93c5fd'
  inverse-primary: '#60a5fa'
  secondary: '#00e5ff'
  on-secondary: '#020e14'
  secondary-container: 'rgba(0, 229, 255, 0.12)'
  on-secondary-container: '#67e8f9'
  tertiary: '#38bdf8'
  on-tertiary: '#020a12'
  tertiary-container: 'rgba(56, 189, 248, 0.12)'
  on-tertiary-container: '#bae6fd'
  error: '#ff4d57'
  on-error: '#ffffff'
  error-container: 'rgba(255, 77, 87, 0.15)'
  on-error-container: '#fca5a5'
  warning: '#ffc83d'
  on-warning: '#050608'
  warning-container: 'rgba(255, 200, 61, 0.15)'
  on-warning-container: '#fde68a'
  risk-medium: '#ff7d3b'
  on-risk-medium: '#ffffff'
  risk-medium-container: 'rgba(255, 125, 59, 0.15)'
  on-risk-medium-container: '#fed7aa'
  success: '#15e88a'
  on-success: '#021208'
  success-container: 'rgba(21, 232, 138, 0.15)'
  on-success-container: '#a7f3d0'
  background: '#050608'
  on-background: '#f1f5f9'
  surface-variant: '#11161d'
typography:
  display:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '44px'
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '32px'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '24px'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '20px'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '22px'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '18px'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '16px'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '16px'
    letterSpacing: 0.04em
  mono-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '16px'
    letterSpacing: -0.01em
rounded:
  sm: 0.375rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.125rem
  full: 9999px
spacing:
  container-max: 1600px
  gutter: 1.25rem
  sidebar-width: 260px
  sidebar-collapsed: 76px
  header-height: 64px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  stack-xl: 32px
---

# Design System: CYGUIN Enterprise Cybersecurity Operating System

## 1. Visual Theme & Atmosphere
A stealth, mission-critical cybersecurity operating system tailored for military-grade and tier-1 enterprise Security Operations Centers (inspired by Microsoft Defender XDR, CrowdStrike Falcon, Palo Alto Cortex, SentinelOne, Wiz, and Google Chronicle). The visual atmosphere communicates absolute precision, instant threat recognition, and tactical calm.

## 2. Color Palette & Roles
- **Primary Canvas (`#050608`)** — Pitch black foundation that eliminates eye strain and makes cyber telemetry pop.
- **Secondary Surface (`#090C10`)** — Subtle structural container background.
- **Cards & Modules (`#11161D`)** — Modern elevated card containers with ultra-thin 1px borders.
- **Floating Panels & Drawers (`#151B24`)** — Floating overlays and inspection sheets.
- **Electric Cyan (`#00E5FF`)** — Primary telemetry accent, laser lines, moving packet flows, and AI reasoning indicators.
- **Cyber Blue (`#2D7CFF`)** — Action trigger buttons and primary interactive nodes.
- **Neon Emerald / Healthy (`#15E88A`)** — Secured assets, passing compliance controls, and operational health.
- **Vibrant Amber / Warning (`#FFC83D`)** — Policy drifts, unpatched CVEs, and anomalous probes.
- **Crimson Laser / Critical (`#FF4D57`)** — Active breach vectors, live lateral movements, and critical alerts.

## 3. Micro-Interactions & Motion
- **Packet Flow Animations:** Animated SVG stroke-dash dashes and travelling photons along network edges.
- **Radar Sweeps:** Rotating sensor sweep halos on telemetry monitors.
- **Live Status LEDs:** Micro-pulsing glow circles with 3-layer radial blur.
- **Interactive Topology:** 3D-depth node elevation on hover with dynamic blast-radius highlighting.
