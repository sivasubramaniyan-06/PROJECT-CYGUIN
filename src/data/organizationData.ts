import { Incident, Asset, AIRecommendation, ThreatVelocityPoint, SimulationScenario } from '../types';

export const ORG_METADATA = {
  name: 'ABC Technologies Pvt Ltd',
  tier: 'Enterprise SOC Sentinel',
  totalEmployees: 250,
  endpointsCount: 120,
  serversCount: 15,
  cloudFootprint: 'AWS Cloud (us-east-1, eu-west-1)',
  gateway: 'GlobalProtect VPN Gateway',
  primaryDatabases: 'PostgreSQL Finance DB, Workday HR System',
  internalNetwork: 'Corporate VLAN 10.200.0.0/16, DMZ 172.16.0.0/24',
  overallSecurityScore: 84,
  scoreDelta: '+3.2%',
  defconLevel: 'DEFCON 3 — Elevated Monitoring',
  sentinelStatus: 'Telemetry Online (12ms latency, 99.99% ingestion rate)'
};

export const THREAT_VELOCITY_DATA: ThreatVelocityPoint[] = [
  { time: '00:00', critical: 1, medium: 4, mitigated: 12 },
  { time: '04:00', critical: 0, medium: 2, mitigated: 9 },
  { time: '08:00', critical: 2, medium: 7, mitigated: 24 },
  { time: '12:00', critical: 4, medium: 11, mitigated: 38 },
  { time: '16:00', critical: 3, medium: 8, mitigated: 31 },
  { time: '20:00', critical: 1, medium: 5, mitigated: 19 }
];

export const INCIDENTS_DATA: Incident[] = [
  {
    id: 'INC-2026-8902',
    title: 'Suspicious Lateral Kerberoasting Attempt toward Finance DB',
    severity: 'critical',
    status: 'active',
    category: 'Credential Access',
    targetEntity: 'AWS RDS Finance DB (eu-west-1)',
    timestamp: '14 mins ago',
    score: 94,
    mitreTechnique: 'T1558.003 - Steal or Forge Kerberos Tickets',
    mitreTactic: 'Credential Access',
    description: 'Anomalous SPN ticket request observed from internal workstation ABC-WS-088 targeting Service Account svc_finance_db.',
    rootCause: 'Compromised workstation credential via phishing email payload on employee laptop.',
    killChainStage: 'Lateral Movement',
    affectedAssets: ['ABC-WS-088 (10.200.4.88)', 'SRV-AD-01 (10.200.1.10)', 'RDS-FIN-DB (10.200.20.5)'],
    recommendedAction: 'Isolate ABC-WS-088 from internal subnet and rotate svc_finance_db Kerberos keytab.',
    slaMinutesRemaining: 18
  },
  {
    id: 'INC-2026-8897',
    title: 'Unauthorized IAM Policy Escalation in AWS Production VPC',
    severity: 'critical',
    status: 'investigating',
    category: 'Cloud Security',
    targetEntity: 'AWS IAM Role (Prod-EC2-Worker)',
    timestamp: '42 mins ago',
    score: 91,
    mitreTechnique: 'T1098 - Account Manipulation',
    mitreTactic: 'Persistence',
    description: 'Attached AdministratorAccess inline policy to instance profile outside of Terraform CI/CD pipeline.',
    rootCause: 'Stolen AWS access key associated with developer workstation ABC-DEV-014.',
    killChainStage: 'Persistence',
    affectedAssets: ['AWS Prod VPC (us-east-1)', 'ABC-DEV-014 (10.200.8.14)'],
    recommendedAction: 'Detach AdministratorAccess inline policy and invalidate IAM session tokens.',
    slaMinutesRemaining: 34
  },
  {
    id: 'INC-2026-8884',
    title: 'Abnormal Egress Beaconing from VPN Gateway',
    severity: 'medium-risk',
    status: 'investigating',
    category: 'Command & Control',
    targetEntity: 'ABC-VPN-GW01 (172.16.0.1)',
    timestamp: '2h 15m ago',
    score: 72,
    mitreTechnique: 'T1071.001 - Web Protocols (Encrypted C2)',
    mitreTactic: 'Command & Control',
    description: 'Repetitive 120-second outbound TLS handshake to uncategorized IP in Eastern Europe (185.220.101.44).',
    rootCause: 'Misconfigured gateway split-tunneling allowing direct egress.',
    killChainStage: 'Lateral Movement',
    affectedAssets: ['ABC-VPN-GW01 (172.16.0.1)'],
    recommendedAction: 'Block egress destination at perimeter edge and force re-authentication for all 45 active VPN sessions.',
    slaMinutesRemaining: 85
  },
  {
    id: 'INC-2026-8871',
    title: 'HR System OAuth Token Replay from Unrecognized ASN',
    severity: 'warning',
    status: 'contained',
    category: 'Identity Anomaly',
    targetEntity: 'Workday HR Integration (SaaS)',
    timestamp: '4h 30m ago',
    score: 58,
    mitreTechnique: 'T1550.001 - Application Access Token',
    mitreTactic: 'Defense Evasion',
    description: 'Bearer token issued to hr_admin@abctech.com used from residential proxy network.',
    rootCause: 'Session hijacking via infostealer on unmanaged BYOD device.',
    killChainStage: 'Initial Access',
    affectedAssets: ['HR SaaS Connector', 'User: hr_admin@abctech.com'],
    recommendedAction: 'Revoke active OAuth token family and prompt hardware FIDO2 key re-verification.',
    slaMinutesRemaining: 140
  }
];

export const ASSETS_DATA: Asset[] = [
  {
    id: 'AST-001',
    name: 'RDS-FIN-DB (PostgreSQL 16)',
    type: 'Database',
    ipAddress: '10.200.20.5',
    osOrPlatform: 'AWS RDS Aurora PostgreSQL',
    location: 'AWS eu-west-1 (Private Subnet)',
    ownerOrDept: 'Finance Operations',
    status: 'critical',
    riskScore: 94,
    lastTelemetry: '10s ago',
    agentVersion: 'CYGUIN Sentinel Agent v2.4.1',
    vulnerabilitiesCount: 3
  },
  {
    id: 'AST-002',
    name: 'SRV-HR-APP01 (Internal HR Portal)',
    type: 'Server',
    ipAddress: '10.200.10.12',
    osOrPlatform: 'Ubuntu 24.04 LTS',
    location: 'Internal Server Room (Rack B)',
    ownerOrDept: 'People & HR Ops',
    status: 'healthy',
    riskScore: 18,
    lastTelemetry: '4s ago',
    agentVersion: 'CYGUIN Sentinel Agent v2.4.1',
    vulnerabilitiesCount: 0
  },
  {
    id: 'AST-003',
    name: 'ABC-VPN-GW01 (Edge Firewall)',
    type: 'Network Gateway',
    ipAddress: '172.16.0.1',
    osOrPlatform: 'PAN-OS 11.1 Enterprise',
    location: 'HQ Data Center (DMZ)',
    ownerOrDept: 'Network Infrastructure',
    status: 'medium-risk',
    riskScore: 72,
    lastTelemetry: '2s ago',
    agentVersion: 'SNMP Telemetry Stream',
    vulnerabilitiesCount: 1
  },
  {
    id: 'AST-004',
    name: 'SRV-DC-01 (Primary Active Directory)',
    type: 'Server',
    ipAddress: '10.200.1.10',
    osOrPlatform: 'Windows Server 2022 Datacenter',
    location: 'HQ Data Center',
    ownerOrDept: 'IT Core Infrastructure',
    status: 'warning',
    riskScore: 64,
    lastTelemetry: '1s ago',
    agentVersion: 'CYGUIN Sentinel Agent v2.4.1',
    vulnerabilitiesCount: 2
  },
  {
    id: 'AST-005',
    name: 'AWS-EKS-PROD-CLUSTER',
    type: 'Cloud Resource',
    ipAddress: '10.100.0.0/16',
    osOrPlatform: 'Amazon EKS v1.30',
    location: 'AWS us-east-1',
    ownerOrDept: 'Cloud Engineering',
    status: 'healthy',
    riskScore: 24,
    lastTelemetry: '8s ago',
    agentVersion: 'CYGUIN Kube-Daemon v2.4.0',
    vulnerabilitiesCount: 1
  },
  {
    id: 'AST-006',
    name: 'ABC-WS-088 (Finance Executive Laptop)',
    type: 'Endpoint',
    ipAddress: '10.200.4.88',
    osOrPlatform: 'macOS Sonoma 14.5 (Apple Silicon)',
    location: 'HQ 3rd Floor (Finance Wing)',
    ownerOrDept: 'Finance - Sarah Jenkins',
    status: 'critical',
    riskScore: 92,
    lastTelemetry: '12s ago',
    agentVersion: 'CYGUIN Sentinel Agent v2.4.1',
    vulnerabilitiesCount: 4
  },
  {
    id: 'AST-007',
    name: 'ABC-DEV-014 (Lead Dev Workstation)',
    type: 'Endpoint',
    ipAddress: '10.200.8.14',
    osOrPlatform: 'Windows 11 Enterprise (23H2)',
    location: 'Remote (Bangalore, IN)',
    ownerOrDept: 'Product Engineering',
    status: 'medium-risk',
    riskScore: 78,
    lastTelemetry: '15s ago',
    agentVersion: 'CYGUIN Sentinel Agent v2.4.1',
    vulnerabilitiesCount: 5
  },
  {
    id: 'AST-008',
    name: 'SRV-FILE-02 (Internal Documents Share)',
    type: 'Server',
    ipAddress: '10.200.1.25',
    osOrPlatform: 'Debian 12 Bookworm',
    location: 'HQ Data Center',
    ownerOrDept: 'IT Core Infrastructure',
    status: 'healthy',
    riskScore: 12,
    lastTelemetry: '6s ago',
    agentVersion: 'CYGUIN Sentinel Agent v2.4.1',
    vulnerabilitiesCount: 0
  }
];

export const AI_RECOMMENDATIONS_DATA: AIRecommendation[] = [
  {
    id: 'REC-01',
    title: 'Isolate Host ABC-WS-088 & Sever Kerberos Ticket Relay',
    category: 'Containment',
    confidence: 98.4,
    description: 'Digital Twin simulation projects an 89% probability of lateral breach into Finance DB within 45 minutes if uncontained.',
    target: 'ABC-WS-088 -> RDS-FIN-DB',
    riskReductionDelta: '-34% Enterprise Risk',
    operationalImpact: 'Zero Downtime',
    status: 'pending'
  },
  {
    id: 'REC-02',
    title: 'Revoke AWS IAM Session Prod-EC2-Worker & Enforce MFA Boundary',
    category: 'Blast Radius Reduction',
    confidence: 96.1,
    description: 'Enforces conditional access policy for all AWS CLI sessions originating from non-gateway IPs.',
    target: 'AWS Prod VPC (us-east-1)',
    riskReductionDelta: '-22% Cloud Exposure',
    operationalImpact: 'Low Impact',
    status: 'pending'
  },
  {
    id: 'REC-03',
    title: 'Deploy Memory Twin Behavioral Rule for SPN Harvesting',
    category: 'Policy Hardening',
    confidence: 92.7,
    description: 'Synthesize automatic signature to trap similar Kerberoasting probes across 120 endpoints.',
    target: 'All Endpoints (120 nodes)',
    riskReductionDelta: '-15% Recurrent Vulnerability',
    operationalImpact: 'Zero Downtime',
    status: 'pending'
  }
];

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'SIM-01',
    name: 'Scenario A: Immediate Network Isolation of Finance Subnet (10.200.20.0/24)',
    targetSystem: 'AWS RDS Finance DB & 4 App Nodes',
    proposedAction: 'Apply emergency security group rule cutting all ingress except SOC bastion.',
    riskReductionPct: 92,
    downtimeMinutes: 0,
    businessImpactScore: 15,
    aiVerdict: 'Approved',
    affectedServices: ['Finance Reporting API', 'Internal Billing Scheduler']
  },
  {
    id: 'SIM-02',
    name: 'Scenario B: Global VPN Gateway Force Reset & Credential Cycle',
    targetSystem: 'ABC-VPN-GW01 (172.16.0.1)',
    proposedAction: 'Terminate 45 active tunnel sessions and enforce mandatory re-authentication.',
    riskReductionPct: 78,
    downtimeMinutes: 4,
    businessImpactScore: 45,
    aiVerdict: 'Requires CISO Review',
    affectedServices: ['Remote Workforce VPN Access (45 users)']
  },
  {
    id: 'SIM-03',
    name: 'Scenario C: Automated Active Directory Forest Kerberos Password Reset',
    targetSystem: 'SRV-DC-01 & krbtgt Account',
    proposedAction: 'Double-reset krbtgt password twice within 10 minutes to invalidate golden tickets.',
    riskReductionPct: 98,
    downtimeMinutes: 12,
    businessImpactScore: 68,
    aiVerdict: 'Requires CISO Review',
    affectedServices: ['Domain Authentication Services', 'Single Sign-On (SSO)']
  }
];

export const AUDIT_TIMELINE_DATA = [
  {
    id: 'AUD-01',
    time: '18:04:12',
    type: 'critical',
    title: 'Sentinel Threat Detection Alert',
    detail: 'Anomalous Kerberos Ticket Request flagged from ABC-WS-088. Confidence 94%.'
  },
  {
    id: 'AUD-02',
    time: '17:58:30',
    type: 'cyan',
    title: 'Security Digital Twin Recalculation',
    detail: 'Attack graph path mapped: ABC-WS-088 -> SRV-AD-01 -> RDS-FIN-DB.'
  },
  {
    id: 'AUD-03',
    time: '17:45:10',
    type: 'warning',
    title: 'Policy Drift Detected in AWS us-east-1',
    detail: 'IAM role Prod-EC2-Worker modified outside Terraform state.'
  },
  {
    id: 'AUD-04',
    time: '17:20:00',
    type: 'healthy',
    title: 'Automated Micro-Patch Deployed',
    detail: 'OpenSSL vulnerability patched across 15 production Linux servers.'
  }
];
