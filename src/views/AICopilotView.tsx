import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  Play,
  Copy,
  Check,
  RotateCw,
  ShieldAlert,
  Server,
  Network
} from 'lucide-react';
import { RouteId } from '../types';
import { ORG_METADATA } from '../data/organizationData';

interface AICopilotViewProps {
  onNavigate: (route: RouteId) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  actionableContext?: {
    incidentId?: string;
    target?: string;
    confidence?: number;
    blastRadiusScore?: string;
  };
}

export const AICopilotView: React.FC<AICopilotViewProps> = ({ onNavigate }) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'MSG-01',
      sender: 'assistant',
      text: `Hello Commander Alex. I am CYGUIN Decision Intelligence Copilot, synchronized with **${ORG_METADATA.name}** Security Digital Twin & Memory Twin.

I have detected **2 active critical attack paths** targeting the **AWS RDS Finance Database** and **Active Directory (SRV-AD-01)**. What would you like to analyze or simulate?`,
      time: '18:00',
      actionableContext: {
        incidentId: 'INC-2026-8902',
        target: 'RDS-FIN-DB (10.200.20.5)',
        confidence: 98.4,
        blastRadiusScore: 'High Risk (4 Systems)'
      }
    },
    {
      id: 'MSG-02',
      sender: 'user',
      text: 'Analyze the attack vector on ABC-WS-088 and what happens if we isolate the host immediately.',
      time: '18:02'
    },
    {
      id: 'MSG-03',
      sender: 'assistant',
      text: `### 🎯 Threat Analysis & Blast Radius Projection

1. **Root Cause:** Host \`ABC-WS-088\` (10.200.4.88) was compromised via a weaponized PDF payload. A Kerberos SPN ticket was requested for Service Account \`svc_finance_db\`.
2. **Attack Progression:** Without containment, lateral traversal to \`SRV-AD-01\` is estimated at **89% probability within 45 minutes**.
3. **Pre-Simulated Isolation Impact:**
   - **Risk Reduction:** **-34% Enterprise Risk** instantly.
   - **Business Downtime:** **Zero Downtime** for Finance operations (User Sarah Jenkins can switch to backup MDM virtual desktop).
   - **Recommendation:** Isolate \`ABC-WS-088\` immediately and trigger Kerberos ticket revocation.`,
      time: '18:03',
      actionableContext: {
        incidentId: 'INC-2026-8902',
        target: 'ABC-WS-088 -> RDS-FIN-DB',
        confidence: 98.4,
        blastRadiusScore: 'Zero Downtime / -34% Risk'
      }
    }
  ]);

  const quickPrompts = [
    'Simulate isolating host ABC-WS-088 in Sandbox',
    'Assess lateral attack path to AWS RDS Finance DB',
    'Generate executive SOC briefing for CISO',
    'Compare VPN Gateway reset vs zero-downtime policy'
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `USER-${Date.now()}`,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `AI-${Date.now()}`,
        sender: 'assistant',
        text: `### 🤖 Decision Intelligence Synthesis

Based on real-time telemetry from **${ORG_METADATA.name}** (120 Endpoints, 15 Servers, AWS Cloud):

- **Query Analysis:** Processing request for: "${userMsg.text}".
- **Digital Twin Simulation:** Mapped across corporate subnet \`10.200.0.0/16\` and DMZ \`172.16.0.0/24\`.
- **Confidence Metric:** **96.8% statistical confidence** with zero predicted infrastructure regression.
- **Recommended Next Step:** Run pre-deployment sandbox simulation to preview precise delta changes.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionableContext: {
          target: 'ABC Technologies Network',
          confidence: 96.8,
          blastRadiusScore: 'Optimal Security Delta'
        }
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="view-content">
      {/* Header Row */}
      <div className="view-header-row">
        <div className="view-heading-group">
          <h1 className="view-title">
            <Bot size={22} color="var(--color-secondary)" />
            <span>AI Copilot: SOC Decision Intelligence Assistant</span>
            <span className="brand-badge">Autonomous Twin Reasoning</span>
          </h1>
          <p className="view-description">
            Conversational cybersecurity decision intelligence with real-time access to{' '}
            <strong>{ORG_METADATA.name}</strong> digital infrastructure.
          </p>
        </div>
        <div className="view-actions-group">
          <button className="btn-secondary" onClick={() => setMessages([messages[0]])}>
            <RotateCw size={14} />
            <span>Reset Session</span>
          </button>
          <button className="btn-primary" onClick={() => onNavigate('simulation-lab')}>
            <Play size={14} />
            <span>Open Simulation Lab</span>
          </button>
        </div>
      </div>

      {/* Copilot Layout: Chat Area + Side Context Panel */}
      <div className="copilot-container">
        {/* Chat Stream Area */}
        <div className="copilot-chat-area">
          <div className="copilot-messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className={`copilot-message-bubble ${msg.sender}`}>
                <div className={`copilot-avatar ${msg.sender === 'user' ? 'user-avatar' : ''}`}>
                  {msg.sender === 'assistant' ? <Bot size={16} /> : 'AM'}
                </div>

                <div className="copilot-bubble-body">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '11px',
                      color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)'
                    }}
                  >
                    <span>{msg.sender === 'assistant' ? 'CYGUIN Decision Intelligence' : 'Alex Morgan (SOC)'}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{msg.time}</span>
                      {msg.sender === 'assistant' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}
                          title="Copy message"
                        >
                          {copiedId === msg.id ? <Check size={12} color="var(--color-status-healthy)" /> : <Copy size={12} />}
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ whiteSpace: 'pre-line', fontSize: '13px', lineHeight: 1.5 }}>
                    {msg.text}
                  </div>

                  {msg.actionableContext && (
                    <div
                      style={{
                        marginTop: '12px',
                        padding: '10px 12px',
                        backgroundColor: 'rgba(0, 229, 255, 0.08)',
                        border: '1px solid rgba(0, 229, 255, 0.2)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={13} color="var(--color-secondary)" />
                        <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 600 }}>
                          Target: {msg.actionableContext.target}
                        </span>
                      </div>
                      <button
                        className="btn-primary"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                        onClick={() => onNavigate('simulation-lab')}
                      >
                        <Play size={11} />
                        <span>Simulate Decision</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div
            style={{
              padding: '8px 18px',
              backgroundColor: 'rgba(14, 21, 36, 0.5)',
              borderTop: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto'
            }}
          >
            {quickPrompts.map((p, pIdx) => (
              <button
                key={pIdx}
                onClick={() => setInputText(p)}
                style={{
                  padding: '4px 10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 102, 255, 0.15)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="copilot-input-bar">
            <input
              type="text"
              className="copilot-text-input"
              placeholder="Ask CYGUIN Copilot to simulate a decision or investigate telemetry..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button className="btn-primary" onClick={handleSend} style={{ padding: '9px 14px' }}>
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Right Context & Telemetry Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={16} color="var(--color-secondary)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                Active Telemetry Context
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Enterprise:</span>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{ORG_METADATA.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Monitored Nodes:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>135 (100% Online)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Digital Twin Model:</span>
                <span style={{ color: 'var(--color-secondary)' }}>CYGUIN-Twin-v2.4</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Memory Twin Cache:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>1,420 Patterns</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '10px' }}>
              QUICK INVESTIGATION TARGETS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  padding: '8px 10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setInputText('Analyze Kerberoasting attack path on RDS-FIN-DB')}
              >
                <ShieldAlert size={14} color="var(--color-status-critical)" />
                <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 500 }}>
                  RDS-FIN-DB (10.200.20.5)
                </span>
              </div>
              <div
                style={{
                  padding: '8px 10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setInputText('Inspect IAM Role Prod-EC2-Worker')}
              >
                <Server size={14} color="var(--color-primary)" />
                <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 500 }}>
                  AWS Prod VPC IAM Escalation
                </span>
              </div>
              <div
                style={{
                  padding: '8px 10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setInputText('Check VPN Gateway egress beaconing')}
              >
                <Network size={14} color="var(--color-status-warning)" />
                <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 500 }}>
                  ABC-VPN-GW01 (172.16.0.1)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
