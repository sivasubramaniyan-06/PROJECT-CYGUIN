import React, { useState } from 'react';
import {
  FlaskConical,
  Play,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Sparkles
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
            <FlaskConical size={22} color="var(--color-tertiary)" />
            <span>Simulation Lab: Pre-Deployment Security Sandbox</span>
            <span className="brand-badge">Zero-Downtime Verification</span>
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
                <span>Run Selected Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs / Buttons */}
      <div className="glass-card" style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>
          SELECT PRE-DEPLOYMENT DECISION SCENARIO
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
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
                  padding: '14px',
                  backgroundColor: isSelected ? 'rgba(0, 102, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${isSelected ? 'var(--color-secondary)' : 'var(--color-border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
                    {scen.name}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      backgroundColor: scen.aiVerdict === 'Approved' ? 'var(--color-status-healthy-dim)' : 'var(--color-status-warning-dim)',
                      color: scen.aiVerdict === 'Approved' ? 'var(--color-status-healthy)' : 'var(--color-status-warning)'
                    }}
                  >
                    {scen.aiVerdict}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Target: {scen.targetSystem}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Current State vs Simulated State */}
      <div className="simulation-split-grid">
        {/* Current Production State */}
        <div className="sim-comparison-card current-state">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={16} color="var(--color-status-critical)" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                Current Production State (Uncontained)
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-status-critical)', fontWeight: 600 }}>
              Critical Exposure Active
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', fontSize: '12px', lineHeight: 1.4 }}>
              Host <strong>ABC-WS-088</strong> possesses unrevoked Kerberos tickets targeting <strong>RDS-FIN-DB</strong>.
              Lateral traversal active.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '10px', backgroundColor: 'rgba(239, 68, 68, 0.08)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Attack Probability</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-status-critical)', marginTop: '2px' }}>
                  89%
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-status-critical)' }}>Within 45 mins</span>
              </div>
              <div style={{ padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Asset Blast Radius</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="var(--color-status-healthy)" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                Simulated Sandbox Outcome
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-status-healthy)', fontWeight: 600 }}>
              {simulationComplete ? 'Simulation Validated' : 'Ready to Run'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.06)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#d1fae5', lineHeight: 1.4 }}>
              <strong>Proposed Action:</strong> {selectedScenario.proposedAction}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ padding: '10px', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Risk Reduction</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-status-healthy)', marginTop: '2px' }}>
                  -{selectedScenario.riskReductionPct}%
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-status-healthy)' }}>Immediate Delta</span>
              </div>

              <div style={{ padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Est. Downtime</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  {selectedScenario.downtimeMinutes} min
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                  {selectedScenario.downtimeMinutes === 0 ? 'Zero Impact' : 'Low Impact'}
                </span>
              </div>

              <div style={{ padding: '10px', backgroundColor: 'rgba(0, 229, 255, 0.08)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Business Impact</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-secondary)', marginTop: '2px' }}>
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
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={16} color="var(--color-secondary)" />
          <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
            CYGUIN AI Verdict: {selectedScenario.aiVerdict} for immediate deployment on {ORG_METADATA.name} infrastructure.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
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
