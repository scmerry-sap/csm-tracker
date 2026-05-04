import { useState } from 'react';

const SEVERITIES = [{ value: 'critical', label: 'Critical' }, { value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }];

export default function Escalations({ escalations = [], onAdd, onClose: onCloseEscalation, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [showClosed, setShowClosed] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', severity: 'high', dateOpened: new Date().toISOString().slice(0, 10) });
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  function handleSave() {
    if (!form.title) return;
    onAdd(form);
    setForm({ title: '', description: '', severity: 'high', dateOpened: new Date().toISOString().slice(0, 10) });
    setShowForm(false);
  }

  const open = escalations.filter((e) => e.status === 'open');
  const closed = escalations.filter((e) => e.status === 'closed');

  return (
    <section className="detail-section">
      <div className="section-header">
        <h2>
          Escalations
          {open.length > 0 && <span className="escalation-count">{open.length} open</span>}
        </h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>+ Add</button>
      </div>

      {showForm && (
        <div className="form-card">
          <div className="form-row">
            <input className="input" placeholder="Title *" value={form.title} onChange={set('title')} />
            <select className="input" value={form.severity} onChange={set('severity')}>
              {SEVERITIES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <input className="input" type="date" value={form.dateOpened} onChange={set('dateOpened')} />
          <textarea className="textarea" placeholder="Description — what happened, impact, what's being done" rows={3} value={form.description} onChange={set('description')} />
          <div className="form-buttons">
            <button className="btn btn-primary" onClick={handleSave}>Log Escalation</button>
            <button className="btn btn-ghost back-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="escalation-list">
        {escalations.length === 0 && <p className="empty-state-sm">No escalations recorded.</p>}

        {open.map((e) => (
          <EscalationRow key={e.id} escalation={e} onClose={onCloseEscalation} onDelete={onDelete} />
        ))}

        {closed.length > 0 && (
          <>
            <button className="btn-toggle-closed" onClick={() => setShowClosed((v) => !v)}>
              {showClosed ? '▾' : '▸'} {closed.length} closed escalation{closed.length !== 1 ? 's' : ''}
            </button>
            {showClosed && closed.map((e) => (
              <EscalationRow key={e.id} escalation={e} onClose={onCloseEscalation} onDelete={onDelete} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

function EscalationRow({ escalation: e, onClose, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`escalation-card severity-${e.severity} ${e.status === 'closed' ? 'escalation-closed' : ''}`}>
      <div className="escalation-header" onClick={() => setExpanded((v) => !v)}>
        <div className="escalation-left">
          <span className={`severity-badge severity-${e.severity}`}>{e.severity}</span>
          <span className="escalation-title">{e.title}</span>
        </div>
        <div className="escalation-right">
          <span className="escalation-date">{e.dateOpened}</span>
          {e.status === 'closed' && <span className="escalation-closed-badge">Closed {e.dateClosed}</span>}
          {e.status === 'open' && (
            <button className="btn btn-sm btn-secondary" onClick={(ev) => { ev.stopPropagation(); onClose(e.id); }}>
              Mark Closed
            </button>
          )}
          <button className="btn-icon" onClick={(ev) => { ev.stopPropagation(); onDelete(e.id); }}>✕</button>
          <span>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>
      {expanded && e.description && (
        <div className="escalation-body">
          <p>{e.description}</p>
        </div>
      )}
    </div>
  );
}
