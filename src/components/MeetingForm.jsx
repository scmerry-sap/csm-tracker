import { useState } from 'react';

export default function MeetingForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    date: new Date().toISOString().slice(0, 10),
    attendees: '',
    summary: '',
    actionItems: '',
    nextSteps: '',
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="form-card">
      <div className="form-row">
        <input className="input" placeholder="Meeting title" value={form.title} onChange={set('title')} />
        <input className="input" type="date" value={form.date} onChange={set('date')} />
      </div>
      <input className="input" placeholder="Attendees (comma separated)" value={form.attendees} onChange={set('attendees')} />
      <textarea className="textarea" placeholder="Summary" rows={3} value={form.summary} onChange={set('summary')} />
      <textarea className="textarea" placeholder="Action items from this meeting" rows={2} value={form.actionItems} onChange={set('actionItems')} />
      <textarea className="textarea" placeholder="Next steps / follow-up" rows={2} value={form.nextSteps} onChange={set('nextSteps')} />
      <div className="form-buttons">
        <button className="btn btn-primary" onClick={() => onSave(form)}>Save Meeting</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
