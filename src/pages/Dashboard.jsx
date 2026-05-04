import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerCard from '../components/CustomerCard';
import { AddCustomerModal } from '../components/AddCustomerModal';

const STATUS_ORDER = ['at-risk', 'needs-attention', 'healthy'];

export default function Dashboard({ dataHook, search }) {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();
  const { data, addCustomer } = dataHook;

  const filtered = data.customers
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.primaryContact || '').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));

  const counts = {
    healthy: data.customers.filter((c) => c.status === 'healthy').length,
    'needs-attention': data.customers.filter((c) => c.status === 'needs-attention').length,
    'at-risk': data.customers.filter((c) => c.status === 'at-risk').length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-stats">
          <div className="stat stat-healthy"><span className="stat-num">{counts.healthy}</span><span>Healthy</span></div>
          <div className="stat stat-attention"><span className="stat-num">{counts['needs-attention']}</span><span>Needs Attention</span></div>
          <div className="stat stat-risk"><span className="stat-num">{counts['at-risk']}</span><span>At Risk</span></div>
          <div className="stat stat-total"><span className="stat-num">{data.customers.length}</span><span>Total</span></div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Customer</button>
      </div>

      <div className="customer-grid">
        {filtered.map((c) => (
          <CustomerCard key={c.id} customer={c} onClick={() => navigate(`/customer/${c.id}`)} />
        ))}
        {filtered.length === 0 && (
          <p className="empty-state">No customers found. Add your first customer to get started.</p>
        )}
      </div>

      {showAdd && (
        <AddCustomerModal
          onSave={(c) => { addCustomer(c); setShowAdd(false); }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}
