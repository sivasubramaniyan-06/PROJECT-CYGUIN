---
name: CYGUIN Enterprise Security Design System
colors:
  surface: '#080c14'
  surface-dim: '#060910'
  surface-bright: '#101726'
  surface-container-lowest: '#04060a'
  surface-container-low: '#0a101b'
  surface-container: '#0e1524'
  surface-container-high: '#131d30'
  surface-container-highest: '#1a263d'
  on-surface: '#f1f5f9'
  on-surface-variant: '#94a3b8'
  inverse-surface: '#f8fafc'
  inverse-on-surface: '#0f172a'
  outline: '#1e293b'
  outline-variant: '#334155'
  surface-tint: '#0066ff'
  primary: '#0066ff'
  on-primary: '#ffffff'
  primary-container: '#0f2759'
  on-primary-container: '#93c5fd'
  inverse-primary: '#60a5fa'
  secondary: '#00e5ff'
  on-secondary: '#041724'
  secondary-container: '#083344'
  on-secondary-container: '#67e8f9'
  tertiary: '#38bdf8'
  on-tertiary: '#081726'
  tertiary-container: '#0c2d48'
  on-tertiary-container: '#bae6fd'
  error: '#ef4444'
  on-error: '#ffffff'
  error-container: '#450a0a'
  on-error-container: '#fca5a5'
  warning: '#f59e0b'
  on-warning: '#ffffff'
  warning-container: '#451a03'
  on-warning-container: '#fde68a'
  risk-medium: '#f97316'
  on-risk-medium: '#ffffff'
  risk-medium-container: '#431407'
  on-risk-medium-container: '#fed7aa'
  success: '#10b981'
  on-success: '#ffffff'
  success-container: '#022c22'
  on-success-container: '#a7f3d0'
  background: '#080c14'
  on-background: '#f1f5f9'
  surface-variant: '#121b2d'
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
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.25rem
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

# Design System: CYGUIN Enterprise Cybersecurity Intelligence Platform

## 1. Visual Theme & Atmosphere
A high-agency, executive-grade Security Operations Center cockpit engineered for decision intelligence. The atmosphere communicates clinical authority, real-time threat perception, and unshakeable institutional trust. The visual grammar draws inspiration from CrowdStrike Falcon, Microsoft Defender XDR, Cortex XDR, and Wiz — characterized by deep charcoal canvas layers, high-contrast typography, sharp telemetry metrics, and subtle 1px border highlights without neon oversaturation or gaming tropes.

## 2. Color Palette & Roles
- **Canvas Charcoal (`#080C14`)** — The ultra-deep foundation background for low eye fatigue during extended SOC shifts.
- **Panel Surface (`#0E1524`)** — The structural container surface for sidebars, top nav, and primary section wrappers.
- **Card Surface (`#121B2D`)** — Main content cards with subtle 1px structural borders.
- **Card Elevated (`#172338`)** — Elevated cards, interactive modals, flyouts, and dropdowns.
- **Cyber Blue (`#0066FF`)** — Primary brand anchor for primary actions, active navigation tabs, and key focus rings.
- **Electric Cyan (`#00E5FF`)** — Secondary telemetry accent for AI Twin insights, decision simulations, and attack path highlights.
- **Emerald Green / Healthy (`#10B981`)** — Clear operational health, passing compliance controls, and secured assets.
- **Amber Yellow / Warning (`#F59E0B`)** — Low-priority anomalies, pending firmware patches, and policy drifts.
- **Vibrant Orange / Medium Risk (`#F97316`)** — Elevated vulnerability posture and suspicious lateral movements.
- **Crimson Red / Critical (`#EF4444`)** — Immediate incident triage, confirmed breach attempts, and active exploit vectors.

## 3. Typography Rules
- **Display & Headings:** `Outfit` and `Plus Jakarta Sans` with tight tracking (`-0.02em`) for crisp, executive-grade legibility.
- **Body & Content:** `Plus Jakarta Sans` (13px–14px) with relaxed leading for dense, scannable data layouts.
- **Security Telemetry & Monospace:** `JetBrains Mono` for IP addresses (`10.200.4.12`), CVE identifiers (`CVE-2024-38856`), SHA-256 hashes, timestamps, and JSON payloads.
- **Banned:** Generic serif fonts, `Inter` default templates, unstructured letter-spacing.

## 4. Component Stylings
- **Cards:** Crisp 12px–16px rounded corners (`rounded-lg` / `rounded-xl`) with 1px border (`rgba(255, 255, 255, 0.08)` / `rgba(56, 189, 248, 0.14)`). Soft ambient dark shadow (`0 4px 20px -2px rgba(0, 0, 0, 0.45)`).
- **Status Badges:** Pill-shaped (`rounded-full`) with 10–15% background tint, 1px border in matching status color, and a live glowing ping indicator dot.
- **Metric Cards:** Dual-layer visual hierarchy with large prominent metric numbers, trend sparkline/indicator, and small secondary caption.
- **Buttons:** Solid Cyber Blue (`#0066FF`) with crisp white text for primary actions; Ghost outline with subtle hover lift for secondary actions.
- **Tables & Lists:** High-density scannable rows with alternating subtle hover highlight (`#1A263D`), monospace metadata columns, and 1-click triage quick actions.
- **Modals & Drawers:** High-contrast dark backdrop blur (`backdrop-blur-md`), sliding from right for incident inspection and scenario sandboxing.

## 5. Layout Principles
- Persistent left sidebar (260px expanded, 76px collapsed) with clear functional categorization: Overview, Threat Operations, Intelligence Twins, AI & Decision Lab, Management.
- Top navigation bar (64px) with persistent breadcrumbs, SOC DEFCON status, `⌘K` Omnibar Search, organization switcher (`ABC Technologies Pvt Ltd`), and Sentinel telemetry stream status.
- Responsive grid container (max 1600px) with 16px–24px gutters.

## 6. Anti-Patterns (Forbidden)
- ❌ No gaming UI or neon glowing wireframes.
- ❌ No terminal green-on-black hacker aesthetics.
- ❌ No generic bootstrap light themes.
- ❌ No generic placeholder names ("Acme Corp", "John Doe"); use **ABC Technologies Pvt Ltd** and realistic SOC roles.
- ❌ No fabricated, meaningless numbers; all metrics must reflect the realistic enterprise footprint (250 employees, 120 endpoints, 15 servers, AWS cloud).
