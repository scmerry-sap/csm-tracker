import { useState } from 'react';

const STAGES = ['Onboarding', 'Adoption', 'Value Realization', 'Expansion', 'Renewal', 'Churned'];
const STATUSES = [{ value: 'healthy', label: 'Healthy' }, { value: 'needs-attention', label: 'Needs Attention' }, { value: 'at-risk', label: 'At Risk' }];

function Field({ label, children }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

function CustomerForm({ initial, onSave, onClose, title }) {
  const [form, setForm] = useState(initial);
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

        <div className="form-row">
          <Field label="Company Name">
            <input className="input" placeholder="e.g. Acme Corp" value={form.name} onChange={set('name')} />
          </Field>
          <Field label="Health Status">
            <select className="input" value={form.status} onChange={set('status')}>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
        </div>

        <div className="form-row">
          <Field label="Industry">
            <input className="input" placeholder="e.g. Manufacturing" value={form.industry} onChange={set('industry')} />
          </Field>
          <Field label="ARR">
            <input className="input" placeholder="e.g. $120,000" value={form.arr} onChange={set('arr')} />
          </Field>
        </div>

        <div className="form-row">
          <Field label="CS Stage">
            <select className="input" value={form.csStage} onChange={set('csStage')}>
              <option value="">Select stage</option>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Renewal Date">
            <input className="input" type="date" value={form.renewalDate} onChange={set('renewalDate')} />
          </Field>
        </div>

        <div className="form-row">
          <Field label="Primary Contact Name">
            <input className="input" placeholder="e.g. Jane Smith" value={form.primaryContact} onChange={set('primaryContact')} />
          </Field>
          <Field label="Primary Contact Email">
            <input className="input" placeholder="e.g. jane@acme.com" value={form.primaryContactEmail} onChange={set('primaryContactEmail')} />
          </Field>
        </div>

        <Field label="Partner">
          <input className="input" placeholder="e.g. Deloitte, Accenture" value={form.partner} onChange={set('partner')} />
        </Field>

        <div className="form-row">
          <Field label="Data & AI Products">
            <input className="input" placeholder="e.g. SAP Datasphere, SAP AI Core" value={form.dataAiProducts} onChange={(e) => setForm((f) => ({ ...f, dataAiProducts: e.target.value }))} />
          </Field>
          <Field label="Other SAP Products">
            <input className="input" placeholder="e.g. SAP S/4HANA, SAP BTP" value={form.otherProducts} onChange={(e) => setForm((f) => ({ ...f, otherProducts: e.target.value }))} />
          </Field>
        </div>

        <Field label="Notes / Future Plans">
          <textarea className="textarea" placeholder="Background context, strategic notes..." rows={3} value={form.notes} onChange={set('notes')} />
        </Field>

        <div className="form-buttons">
          <button className="btn btn-primary" onClick={() => {
            if (!form.name) return;
            const dataAiProducts = typeof form.dataAiProducts === 'string'
              ? form.dataAiProducts.split(',').map((p) => p.trim()).filter(Boolean)
              : form.dataAiProducts;
            const otherProducts = typeof form.otherProducts === 'string'
              ? form.otherProducts.split(',').map((p) => p.trim()).filter(Boolean)
              : form.otherProducts;
            onSave({ ...form, dataAiProducts, otherProducts });
          }}>Save</button>
          <button className="btn btn-ghost back-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const EMPTY = { name: '', industry: '', arr: '', renewalDate: '', status: 'healthy', csStage: '', partner: '', primaryContact: '', primaryContactEmail: '', dataAiProducts: '', otherProducts: '', notes: '' };

export function AddCustomerModal({ onSave, onClose }) {
  return <CustomerForm initial={EMPTY} onSave={onSave} onClose={onClose} title="Add Customer" />;
}

export default function EditCustomerModal({ customer, onSave, onClose }) {
  const initial = {
    ...customer,
    dataAiProducts: (customer.dataAiProducts || []).join(', '),
    otherProducts: (customer.otherProducts || []).join(', '),
  };
  return <CustomerForm initial={initial} onSave={onSave} onClose={onClose} title="Edit Customer" />;
}
