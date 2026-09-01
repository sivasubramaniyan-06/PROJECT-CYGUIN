export type RouteId =
  | 'dashboard'
  | 'incident-center'
  | 'digital-twin'
  | 'memory-twin'
  | 'ai-copilot'
  | 'simulation-lab'
  | 'assets'
  | 'reports'
  | 'settings';

export type SeverityLevel = 'critical' | 'medium-risk' | 'warning' | 'healthy';

export interface Incident {
  id: string;
  title: string;
  severity: SeverityLevel;
  status: 'active' | 'investigating' | 'contained' | 'resolved';
  category: string;
  targetEntity: string;
  timestamp: string;
  score: number;
  mitreTechnique: string;
  mitreTactic: string;
  description: string;
  rootCause: string;
  killChainStage: 'Initial Access' | 'Execution' | 'Persistence' | 'Lateral Movement' | 'Exfiltration';
  affectedAssets: string[];
  recommendedAction: string;
  slaMinutesRemaining: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'Endpoint' | 'Server' | 'Cloud Resource' | 'Database' | 'Network Gateway';
  ipAddress: string;
  osOrPlatform: string;
  location: string;
  ownerOrDept: string;
  status: 'healthy' | 'warning' | 'medium-risk' | 'critical';
  riskScore: number;
  lastTelemetry: string;
  agentVersion: string;
  vulnerabilitiesCount: number;
}

export interface AIRecommendation {
  id: string;
  title: string;
  category: 'Containment' | 'Policy Hardening' | 'Twin Optimization' | 'Blast Radius Reduction';
  confidence: number;
  description: string;
  target: string;
  riskReductionDelta: string;
  operationalImpact: 'Zero Downtime' | 'Low Impact' | 'Requires Reboot';
  status: 'pending' | 'applied' | 'simulated';
}

export interface ThreatVelocityPoint {
  time: string;
  critical: number;
  medium: number;
  mitigated: number;
}

export interface SimulationScenario {
  id: string;
  name: string;
  targetSystem: string;
  proposedAction: string;
  riskReductionPct: number;
  downtimeMinutes: number;
  businessImpactScore: number;
  aiVerdict: 'Approved' | 'Requires CISO Review' | 'Not Recommended';
  affectedServices: string[];
}
