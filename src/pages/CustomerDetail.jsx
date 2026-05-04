import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MeetingForm from '../components/MeetingForm';
import ActionItemForm from '../components/ActionItemForm';
import EditCustomerModal from '../components/EditCustomerModal';
import StakeholderMap from '../components/StakeholderMap';
import Escalations from '../components/Escalations';

const STATUS_LABELS = { healthy: 'Healthy', 'needs-attention': 'Needs Attention', 'at-risk': 'At Risk' };

function ActionItemRow({ item, editing, onEdit, onSaveEdit, onCancelEdit, onToggle, onDelete }) {
  if (editing) {
    return (
      <li>
        <ActionItemForm
          initial={item}
          saveLabel="Save"
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
        />
      </li>
    );
  }
  return (
    <li className={`action-item ${item.done ? 'done' : ''}`}>
      <input type="checkbox" checked={item.done} onChange={onToggle} />
      <div className="action-body">
        <span className="action-title">{item.title}</span>
        <div className="action-dates">
          {item.owner && <span className="action-meta">Owner: {item.owner}</span>}
          {item.createdAt && <span className="action-meta">Created: {item.createdAt}</span>}
          {item.dueDate && <span className="action-meta">Due: {item.dueDate}</span>}
        </div>
      </div>
      <button className="btn-icon" title="Edit" onClick={onEdit}>✎</button>
      <button className="btn-icon" title="Delete" onClick={onDelete}>✕</button>
    </li>
  );
}

export default function CustomerDetail({ dataHook }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data, updateCustomer, deleteCustomer,
    addMeeting, deleteMeeting,
    addActionItem, updateActionItem, toggleActionItem, deleteActionItem,
    addStakeholder, updateStakeholder, deleteStakeholder,
    addEscalation, closeEscalation, deleteEscalation,
  } = dataHook;
  const customer = data.customers.find((c) => c.id === id);

  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [showActionForm, setShowActionForm] = useState(false);
  const [editingActionId, setEditingActionId] = useState(null);
  const [showCompletedActions, setShowCompletedActions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [editingStatus, setEditingStatus] = useState(false);
  const [statusDraft, setStatusDraft] = useState('');

  if (!customer) return <div className="empty-state">Customer not found.</div>;

  function handleDelete() {
    if (window.confirm(`Delete ${customer.name}? This cannot be undone.`)) {
      deleteCustomer(id);
      navigate('/');
    }
  }

  function startEditStatus() {
    setStatusDraft(customer.currentStatus || '');
    setEditingStatus(true);
  }

  function saveStatus() {
    updateCustomer(id, { currentStatus: statusDraft });
    setEditingStatus(false);
  }

  return (
    <div className="detail-page">
      <button className="btn back-btn" onClick={() => navigate('/')}>← Back</button>

      <div className="detail-header">
        <div>
          <h1 className="detail-name">{customer.name}</h1>
          <div className="detail-meta">
            <span className={`status-badge status-${customer.status}`}>{STATUS_LABELS[customer.status]}</span>
            <span>{customer.industry}</span>
            <span>{customer.csStage}</span>
            <span>{customer.arr}</span>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-secondary" onClick={() => setShowEdit(true)}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {/* Current Status */}
      <section className="detail-section current-status-section">
        <div className="section-header">
          <h2>Current Status</h2>
          {!editingStatus && <button className="btn btn-secondary btn-sm" onClick={startEditStatus}>Edit</button>}
        </div>
        {editingStatus ? (
          <div>
            <textarea
              className="textarea"
              rows={3}
              autoFocus
              placeholder="What is the team currently working on for this customer? Key initiatives, blockers, focus areas..."
              value={statusDraft}
              onChange={(e) => setStatusDraft(e.target.value)}
            />
            <div className="form-buttons" style={{ marginTop: 8 }}>
              <button className="btn btn-primary" onClick={saveStatus}>Save</button>
              <button className="btn btn-ghost back-btn" onClick={() => setEditingStatus(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <p className={customer.currentStatus ? 'current-status-text' : 'empty-state-sm'}>
            {customer.currentStatus || 'No current status set. Click Edit to add one.'}
          </p>
        )}
      </section>

      <div className="detail-grid">
        {/* Account Info */}
        <section className="detail-section">
          <h2>Account Info</h2>
          <dl className="info-list">
            <dt>Renewal Date</dt><dd>{customer.renewalDate || '—'}</dd>
            <dt>Partner</dt><dd>{customer.partner || '—'}</dd>
            <dt>Primary Contact</dt>
            <dd>
              {customer.primaryContact || '—'}
              {customer.primaryContactEmail && <> · <a href={`mailto:${customer.primaryContactEmail}`}>{customer.primaryContactEmail}</a></>}
            </dd>
            <dt>Data & AI Products</dt>
            <dd>{customer.dataAiProducts?.length ? customer.dataAiProducts.join(', ') : '—'}</dd>
            <dt>Other Products</dt>
            <dd>{customer.otherProducts?.length ? customer.otherProducts.join(', ') : '—'}</dd>
          </dl>
          {customer.notes && (
            <>
              <h3>Notes</h3>
              <p className="notes-text">{customer.notes}</p>
            </>
          )}
        </section>

        {/* Action Items */}
        <section className="detail-section">
          <div className="section-header">
            <h2>Action Items</h2>
            <button className="btn btn-primary btn-sm" onClick={() => { setShowActionForm(true); setEditingActionId(null); }}>+ Add</button>
          </div>
          {showActionForm && (
            <ActionItemForm
              saveLabel="Add"
              onSave={(item) => { addActionItem(id, item); setShowActionForm(false); }}
              onCancel={() => setShowActionForm(false)}
            />
          )}
          <ul className="action-list">
            {(customer.actionItems || []).filter((a) => !a.done).length === 0 && !showCompletedActions && (
              <li className="empty-state-sm">No open action items.</li>
            )}
            {(customer.actionItems || []).filter((a) => !a.done).map((item) => (
              <ActionItemRow
                key={item.id}
                item={item}
                editing={editingActionId === item.id}
                onEdit={() => { setEditingActionId(item.id); setShowActionForm(false); }}
                onSaveEdit={(changes) => { updateActionItem(id, item.id, changes); setEditingActionId(null); }}
                onCancelEdit={() => setEditingActionId(null)}
                onToggle={() => toggleActionItem(id, item.id)}
                onDelete={() => deleteActionItem(id, item.id)}
              />
            ))}
          </ul>

          {(customer.actionItems || []).filter((a) => a.done).length > 0 && (
            <>
              <button className="btn-toggle-closed" onClick={() => setShowCompletedActions((v) => !v)}>
                {showCompletedActions ? '▾' : '▸'} {(customer.actionItems || []).filter((a) => a.done).length} completed
              </button>
              {showCompletedActions && (
                <ul className="action-list">
                  {(customer.actionItems || []).filter((a) => a.done).map((item) => (
                    <ActionItemRow
                      key={item.id}
                      item={item}
                      editing={editingActionId === item.id}
                      onEdit={() => { setEditingActionId(item.id); setShowActionForm(false); }}
                      onSaveEdit={(changes) => { updateActionItem(id, item.id, changes); setEditingActionId(null); }}
                      onCancelEdit={() => setEditingActionId(null)}
                      onToggle={() => toggleActionItem(id, item.id)}
                      onDelete={() => deleteActionItem(id, item.id)}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      </div>

      {/* Stakeholder Map */}
      <StakeholderMap
        stakeholders={customer.stakeholders || []}
        onAdd={(s) => addStakeholder(id, s)}
        onUpdate={(sid, changes) => updateStakeholder(id, sid, changes)}
        onDelete={(sid) => deleteStakeholder(id, sid)}
      />

      {/* Escalations */}
      <Escalations
        escalations={customer.escalations || []}
        onAdd={(e) => addEscalation(id, e)}
        onClose={(eid) => closeEscalation(id, eid)}
        onDelete={(eid) => deleteEscalation(id, eid)}
      />

      {/* Meeting Notes */}
      <section className="detail-section">
        <div className="section-header">
          <h2>Meeting Notes</h2>
          <button className="btn btn-primary btn-sm" onClick={() => setShowMeetingForm(true)}>+ Add Meeting</button>
        </div>
        {showMeetingForm && (
          <MeetingForm
            onSave={(m) => { addMeeting(id, m); setShowMeetingForm(false); }}
            onCancel={() => setShowMeetingForm(false)}
          />
        )}
        <div className="meeting-list">
          {(customer.meetings || []).length === 0 && <p className="empty-state-sm">No meetings recorded.</p>}
          {(customer.meetings || []).map((m) => (
            <div key={m.id} className="meeting-card">
              <div className="meeting-header" onClick={() => setExpandedMeeting(expandedMeeting === m.id ? null : m.id)}>
                <div>
                  <strong>{m.title || 'Meeting'}</strong>
                  <span className="meeting-date">{m.date}</span>
                  {m.attendees && <span className="meeting-meta">Attendees: {m.attendees}</span>}
                </div>
                <div className="meeting-controls">
                  <span>{expandedMeeting === m.id ? '▲' : '▼'}</span>
                  <button className="btn-icon" onClick={(e) => { e.stopPropagation(); deleteMeeting(id, m.id); }}>✕</button>
                </div>
              </div>
              {expandedMeeting === m.id && (
                <div className="meeting-body">
                  {m.summary && <><h4>Summary</h4><p>{m.summary}</p></>}
                  {m.actionItems && <><h4>Action Items from Meeting</h4><p>{m.actionItems}</p></>}
                  {m.nextSteps && <><h4>Next Steps</h4><p>{m.nextSteps}</p></>}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {showEdit && (
        <EditCustomerModal
          customer={customer}
          onSave={(changes) => { updateCustomer(id, changes); setShowEdit(false); }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </div>
  );
}
