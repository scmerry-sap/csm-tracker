const STATUS_LABELS = { healthy: 'Healthy', 'needs-attention': 'Needs Attention', 'at-risk': 'At Risk' };

export default function CustomerCard({ customer, onClick }) {
  const openItems = (customer.actionItems || []).filter((a) => !a.done).length;
  const lastMeeting = (customer.meetings || [])[0];

  return (
    <div className={`customer-card status-${customer.status}`} onClick={onClick}>
      <div className="card-header">
        <h3 className="card-name">{customer.name}</h3>
        <span className={`status-badge status-${customer.status}`}>{STATUS_LABELS[customer.status]}</span>
      </div>
      <div className="card-meta">
        <span>{customer.csStage || '—'}</span>
        <span>{customer.arr || '—'}</span>
      </div>
      <div className="card-meta">
        <span>Renews: {customer.renewalDate || '—'}</span>
        {customer.primaryContact && <span>{customer.primaryContact}</span>}
      </div>
      {(customer.dataAiProducts?.length > 0 || customer.otherProducts?.length > 0) && (
        <div className="card-tags">
          {(customer.dataAiProducts || []).map((p) => <span key={p} className="tag tag-ai">{p}</span>)}
          {(customer.otherProducts || []).map((p) => <span key={p} className="tag">{p}</span>)}
        </div>
      )}
      <div className="card-footer">
        {openItems > 0 && <span className="badge-action">{openItems} open action{openItems !== 1 ? 's' : ''}</span>}
        {lastMeeting && <span className="card-last-meeting">Last: {lastMeeting.date}</span>}
      </div>
    </div>
  );
}
