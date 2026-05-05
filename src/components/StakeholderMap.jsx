import { useState } from 'react';

const SAP_ROLES = ['Data & AI AE', 'BTP CSM', 'IAE', 'AI Partner', 'Solution Architect', 'Support', 'Other (SAP)'];
const CUSTOMER_ROLES = ['Executive Sponsor', 'Economic Buyer', 'Champion', 'Technical Lead', 'Primary Contact', 'Detractor', 'Other (Customer)'];
const SENTIMENTS = [{ value: 'positive', label: 'Positive' }, { value: 'neutral', label: 'Neutral' }, { value: 'negative', label: 'Negative' }, { value: 'unknown', label: 'Unknown' }];
const EMPTY_FORM = { name: '', type: 'customer', role: '', email: '', sentiment: 'unknown', notes: '' };

function StakeholderForm({ initial, onSave, onCancel, saveLabel }) {
  const [form, setForm] = useState(initial);
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const roles = form.type === 'sap' ? SAP_ROLES : CUSTOMER_ROLES;
  const isSap = form.type === 'sap';

  return (
    <div className="form-card">
      <div className="form-row">
        <div className="form-field" style={{ flex: 'none' }}>
          <label className="form-label">Type</label>
          <div className="type-toggle">
            <button
              className={`type-btn ${form.type === 'customer' ? 'active-customer' : ''}`}
              onClick={() => setForm((f) => ({ ...f, type: 'customer', role: '' }))}
              type="button"
            >Customer</button>
            <button
              className={`type-btn ${form.type === 'sap' ? 'active-sap' : ''}`}
              onClick={() => setForm((f) => ({ ...f, type: 'sap', role: '' }))}
              type="button"
            >SAP</button>
          </div>
        </div>
        <div className="form-field" style={{ flex: 1 }}>
          <label className="form-label">Name</label>
          <input className="input" placeholder="Full name *" value={form.name} onChange={set('name')} autoFocus />
        </div>
        <div className="form-field" style={{ flex: 1 }}>
          <label className="form-label">Role</label>
          <select className="input" value={form.role} onChange={set('role')}>
            <option value="">Select role</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
      {!isSap && (
        <div className="form-row">
          <input className="input" placeholder="Email" value={form.email} onChange={set('email')} />
          <select className="input" value={form.sentiment} onChange={set('sentiment')}>
            {SENTIMENTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      )}
      <input className="input" placeholder="Notes (influence, concerns, relationship...)" value={form.notes} onChange={set('notes')} />
      <div className="form-buttons">
        <button className="btn btn-primary" onClick={() => { if (form.name) onSave(form); }}>{saveLabel}</button>
        <button className="btn btn-ghost back-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function StakeholderCard({ s, editing, onEdit, onSaveEdit, onCancelEdit, onDelete }) {
  const isSap = s.type === 'sap';
  if (editing) {
    return (
      <StakeholderForm
        initial={s}
        saveLabel="Save"
        onSave={onSaveEdit}
        onCancel={onCancelEdit}
      />
    );
  }
  return (
    <div className={`stakeholder-row ${isSap ? 'stakeholder-sap' : 'stakeholder-customer'}`}>
      {!isSap && <div className={`sentiment-dot sentiment-${s.sentiment}`} title={s.sentiment} />}
      <div className="stakeholder-body">
        <span className="stakeholder-name">{s.name}</span>
        {s.role && <span className={`stakeholder-role ${isSap ? 'role-sap' : 'role-customer'}`}>{s.role}</span>}
        {!isSap && s.email && <a className="stakeholder-email" href={`mailto:${s.email}`}>{s.email}</a>}
        {s.notes && <span className="stakeholder-notes">{s.notes}</span>}
      </div>
      <button className="btn-icon" title="Edit" onClick={onEdit}>✎</button>
      <button className="btn-icon" title="Delete" onClick={() => { if (window.confirm(`Delete ${s.name}?`)) onDelete(); }}>✕</button>
    </div>
  );
}

export default function StakeholderMap({ stakeholders = [], onAdd, onUpdate, onDelete }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const customerContacts = stakeholders.filter((s) => s.type !== 'sap');
  const sapContacts = stakeholders.filter((s) => s.type === 'sap');

  return (
    <section className="detail-section">
      <div className="section-header">
        <h2>Stakeholder Map</h2>
        <button className="btn btn-primary btn-sm" onClick={() => { setShowAddForm(true); setEditingId(null); }}>+ Add</button>
      </div>

      {showAddForm && (
        <StakeholderForm
          initial={EMPTY_FORM}
          saveLabel="Add Stakeholder"
          onSave={(form) => { onAdd(form); setShowAddForm(false); }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {stakeholders.length === 0 && !showAddForm && <p className="empty-state-sm">No stakeholders added yet.</p>}

      {stakeholders.length > 0 && (
        <div className="stakeholder-columns">
          <div className="stakeholder-column">
            <div className="stakeholder-col-header stakeholder-col-customer">Customer Contacts</div>
            {customerContacts.length === 0 && <p className="empty-state-sm">None added.</p>}
            {customerContacts.map((s) => (
              <StakeholderCard
                key={s.id}
                s={s}
                editing={editingId === s.id}
                onEdit={() => { setEditingId(s.id); setShowAddForm(false); }}
                onSaveEdit={(changes) => { onUpdate(s.id, changes); setEditingId(null); }}
                onCancelEdit={() => setEditingId(null)}
                onDelete={() => onDelete(s.id)}
              />
            ))}
          </div>
          <div className="stakeholder-column">
            <div className="stakeholder-col-header stakeholder-col-sap">SAP Contacts</div>
            {sapContacts.length === 0 && <p className="empty-state-sm">None added.</p>}
            {sapContacts.map((s) => (
              <StakeholderCard
                key={s.id}
                s={s}
                editing={editingId === s.id}
                onEdit={() => { setEditingId(s.id); setShowAddForm(false); }}
                onSaveEdit={(changes) => { onUpdate(s.id, changes); setEditingId(null); }}
                onCancelEdit={() => setEditingId(null)}
                onDelete={() => onDelete(s.id)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
