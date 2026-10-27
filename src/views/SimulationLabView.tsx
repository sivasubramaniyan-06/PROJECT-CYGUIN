import React, { useState } from 'react';
import {
  FlaskConical,
  Play,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Zap,
  Activity,
  Sliders
} from 'lucide-react';
import { RouteId, SimulationScenario } from '../types';
import { SIMULATION_SCENARIOS, ORG_METADATA } from '../data/organizationData';

interface SimulationLabViewProps {
  onNavigate: (route: RouteId) => void;
}

export const SimulationLabView: React.FC<SimulationLabViewProps> = ({ onNavigate }) => {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(SIMULATION_SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 1200);
  };

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <FlaskConical size={24} color="var(--color-tertiary)" />
            <span>Simulation Lab: Cyber Decision Sandbox</span>
            <span className="brand-badge">Pre-Deployment Twin</span>
          </h1>
          <p className="view-description">
            Test policy changes, isolation runbooks, and firewall rules in a digital sandbox before live deployment on{' '}
            <strong>{ORG_METADATA.name}</strong> infrastructure.
          </p>
        </div>
        <div className="view-actions-group">
          <button
            className="btn-primary"
            onClick={handleRunSimulation}
            disabled={isSimulating}
          >
            {isSimulating ? (
              <>
                <RotateCcw size={14} className="animate-pulse-subtle" />
                <span>Simulating Digital Twin...</span>
              </>
            ) : (
              <>
                <Play size={14} />
                <span>Execute Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="glass-card" style={{ padding: '20px 24px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          SELECT PRE-DEPLOYMENT DECISION SCENARIO
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {SIMULATION_SCENARIOS.map((scen) => {
            const isSelected = scen.id === selectedScenario.id;
            return (
              <div
                key={scen.id}
                onClick={() => {
                  setSelectedScenario(scen);
                  setSimulationComplete(false);
                }}
                style={{
                  padding: '16px',
                  backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 255, 255, 0.015)',
                  border: `1px solid ${isSelected ? 'var(--color-secondary)' : 'var(--color-border-subtle)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: isSelected ? '0 0 20px rgba(0, 229, 255, 0.15)' : undefined
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                    {scen.name}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: scen.aiVerdict === 'Approved' ? 'var(--color-status-healthy-dim)' : 'var(--color-status-warning-dim)',
                      color: scen.aiVerdict === 'Approved' ? 'var(--color-status-healthy)' : 'var(--color-status-warning)',
                      border: `1px solid ${scen.aiVerdict === 'Approved' ? 'var(--color-status-healthy-border)' : 'var(--color-status-warning-border)'}`
                    }}
                  >
                    {scen.aiVerdict}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Target: {scen.targetSystem}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="simulation-split-grid">
        {/* Current State */}
        <div className="sim-comparison-card current-state">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={18} color="var(--color-status-critical)" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                Current Production State (Uncontained)
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-status-critical)', fontWeight: 700 }}>
              Active Vector
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', fontSize: '12px', lineHeight: 1.5 }}>
              Host <strong>ABC-WS-088</strong> holds valid unrevoked Kerberos tickets targeting <strong>RDS-FIN-DB</strong>.
              Lateral traversal actively progressing.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ padding: '14px', backgroundColor: 'rgba(255, 77, 87, 0.08)', border: '1px solid rgba(255, 77, 87, 0.2)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Breach Probability</span>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-status-critical)', marginTop: '4px' }}>
                  89%
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-status-critical)' }}>Within 45 mins</span>
              </div>

              <div style={{ padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Threat Blast Radius</span>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                  4 Nodes
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Finance Subnet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-Simulated State */}
        <div className="sim-comparison-card simulated-state">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="var(--color-status-healthy)" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                Simulated Sandbox Outcome
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-status-healthy)', fontWeight: 700 }}>
              {simulationComplete ? 'Simulation Validated' : 'Ready to Run'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '14px', backgroundColor: 'rgba(21, 232, 138, 0.06)', border: '1px solid rgba(21, 232, 138, 0.2)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#d1fae5', lineHeight: 1.5 }}>
              <strong>Proposed Action:</strong> {selectedScenario.proposedAction}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ padding: '14px', backgroundColor: 'rgba(21, 232, 138, 0.08)', border: '1px solid rgba(21, 232, 138, 0.2)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Risk Reduction</span>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-status-healthy)', marginTop: '4px' }}>
                  -{selectedScenario.riskReductionPct}%
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-status-healthy)' }}>Immediate Delta</span>
              </div>

              <div style={{ padding: '14px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Est. Downtime</span>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                  {selectedScenario.downtimeMinutes} min
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                  {selectedScenario.downtimeMinutes === 0 ? 'Zero Impact' : 'Low Impact'}
                </span>
              </div>

              <div style={{ padding: '14px', backgroundColor: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Business Impact</span>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-secondary)', marginTop: '4px' }}>
                  {selectedScenario.businessImpactScore}/100
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-secondary)' }}>Acceptable Threshold</span>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              <strong>Impacted Dependent Services:</strong> {selectedScenario.affectedServices.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Action Bar */}
      <div
        className="glass-card"
        style={{
          padding: '18px 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={18} color="var(--color-secondary)" />
          <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 700 }}>
            CYGUIN AI Verdict: {selectedScenario.aiVerdict} for immediate deployment on {ORG_METADATA.name} infrastructure.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={() => onNavigate('digital-twin')}>
            <span>Verify in Digital Twin</span>
          </button>
          <button className="btn-primary" onClick={() => alert('Decision approved. Playbook queued for deployment.')}>
            <CheckCircle2 size={14} />
            <span>Approve & Deploy to Sentinel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
