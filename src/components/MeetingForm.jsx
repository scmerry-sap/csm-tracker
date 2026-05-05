import { useState } from 'react';

const PROXY_URL = 'http://localhost:27153/ai';

async function summariseMeetingNotes(rawNotes, customerName) {
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-latest',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a helpful assistant for a Customer Success Manager at SAP. Summarise the following meeting notes for customer "${customerName}" into three short sections.

Return your response as valid JSON with exactly these keys:
- "summary": 2-4 sentences covering what was discussed and key outcomes
- "actionItems": bullet-point list of action items (one per line, starting with "- ")
- "nextSteps": bullet-point list of follow-up or next steps (one per line, starting with "- ")

If a section has nothing relevant, use an empty string.

Meeting notes:
${rawNotes}`,
        },
      ],
    }),
  });

  if (!res.ok) throw new Error(`AI request failed: ${res.status}`);
  const data = await res.json();
  const text = data.content?.[0]?.text || '';

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in AI response');
  return JSON.parse(jsonMatch[0]);
}

export default function MeetingForm({ onSave, onCancel, customerName, initial, saveLabel = 'Save Meeting' }) {
  const [form, setForm] = useState(initial || {
    title: '',
    date: new Date().toISOString().slice(0, 10),
    attendees: '',
    rawNotes: '',
    summary: '',
    actionItems: '',
    nextSteps: '',
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [showRawNotes, setShowRawNotes] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSummarise() {
    if (!form.rawNotes.trim()) return;
    setAiLoading(true);
    setAiError('');
    try {
      const result = await summariseMeetingNotes(form.rawNotes, customerName || 'this customer');
      setForm((f) => ({
        ...f,
        summary: result.summary || f.summary,
        actionItems: result.actionItems || f.actionItems,
        nextSteps: result.nextSteps || f.nextSteps,
      }));
    } catch (err) {
      setAiError('AI summarisation failed. You can still fill in the fields manually.');
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="form-card">
      <div className="form-row">
        <input className="input" placeholder="Meeting title" value={form.title} onChange={set('title')} />
        <input className="input" type="date" value={form.date} onChange={set('date')} />
      </div>
      <input className="input" placeholder="Attendees (comma separated)" value={form.attendees} onChange={set('attendees')} />

      <div className="form-label" style={{ marginBottom: 4, marginTop: 8 }}>Summary</div>
      <textarea className="textarea" placeholder="What was discussed and decided" rows={3} value={form.summary} onChange={set('summary')} />

      <div className="form-label" style={{ marginBottom: 4, marginTop: 8 }}>Action Items from Meeting</div>
      <textarea className="textarea" placeholder="Action items arising from this meeting" rows={2} value={form.actionItems} onChange={set('actionItems')} />

      <div className="form-label" style={{ marginBottom: 4, marginTop: 8 }}>Next Steps</div>
      <textarea className="textarea" placeholder="Next steps / follow-up" rows={2} value={form.nextSteps} onChange={set('nextSteps')} />

      <div className="raw-notes-toggle">
        <button className="btn-toggle-closed" onClick={() => setShowRawNotes((v) => !v)}>
          {showRawNotes ? '▾' : '▸'} Raw Notes & AI Summariser
        </button>
        {showRawNotes && (
          <div className="ai-notes-section" style={{ marginTop: 6 }}>
            <textarea
              className="textarea"
              placeholder="Paste your raw meeting notes here, then click 'Summarise with AI' to auto-fill the fields above…"
              rows={4}
              value={form.rawNotes}
              onChange={set('rawNotes')}
            />
            <button
              className="btn btn-ai"
              onClick={handleSummarise}
              disabled={aiLoading || !form.rawNotes.trim()}
              style={{ marginTop: 6 }}
            >
              {aiLoading ? 'Summarising…' : '✦ Summarise with AI'}
            </button>
            {aiError && <p className="ai-error">{aiError}</p>}
          </div>
        )}
      </div>

      <div className="form-buttons">
        <button className="btn btn-primary" onClick={() => onSave(form)}>{saveLabel}</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
