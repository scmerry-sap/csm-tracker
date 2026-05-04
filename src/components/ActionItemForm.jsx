import { useState } from 'react';

export default function ActionItemForm({ initial, onSave, onCancel, saveLabel = 'Add' }) {
  const [form, setForm] = useState(initial || { title: '', owner: '', dueDate: '', createdAt: '' });
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="form-card">
      <input className="input" placeholder="Action item description *" value={form.title} onChange={set('title')} autoFocus />
      <div className="form-row">
        <input className="input" placeholder="Owner" value={form.owner} onChange={set('owner')} />
        <input className="input" type="date" title="Due date" value={form.dueDate} onChange={set('dueDate')} />
        <input className="input" type="date" title="Created date" value={form.createdAt} onChange={set('createdAt')} />
      </div>
      <div className="form-buttons">
        <button className="btn btn-primary" onClick={() => { if (form.title) onSave(form); }}>{saveLabel}</button>
        <button className="btn btn-ghost back-btn" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
