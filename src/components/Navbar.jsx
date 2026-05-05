import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { exportData, importData } from '../data/store';

const AUTOSAVE_KEY = 'csm_tracker_last_autosave';

export default function Navbar({ dataHook }) {
  const [lastSave, setLastSave] = useState(() => localStorage.getItem(AUTOSAVE_KEY));
  const [autoSaveActive, setAutoSaveActive] = useState(false);

  // Check if auto-save server is running
  useEffect(() => {
    fetch('http://127.0.0.1:27153/save', { method: 'OPTIONS' })
      .then(() => setAutoSaveActive(true))
      .catch(() => setAutoSaveActive(false));
  }, []);

  // Listen for auto-save events dispatched by store.js
  useEffect(() => {
    function onAutoSaved(e) {
      const now = e.detail;
      localStorage.setItem(AUTOSAVE_KEY, now);
      setLastSave(now);
    }
    window.addEventListener('csm-autosaved', onAutoSaved);
    return () => window.removeEventListener('csm-autosaved', onAutoSaved);
  }, []);

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    importData(file).then((newData) => dataHook.update(newData));
    e.target.value = '';
  }

  function formatTime(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' at ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Sarah Merry's Customer Tracker</Link>
      <div className="navbar-actions">
        <div className="export-wrapper">
          <div className="autosave-status">
            <span className={`autosave-dot ${autoSaveActive ? 'dot-active' : 'dot-inactive'}`} />
            <span className="autosave-label">
              {autoSaveActive
                ? lastSave ? `Auto-saved ${formatTime(lastSave)}` : 'Auto-save active'
                : 'Auto-save offline'}
            </span>
          </div>
        </div>
        <label className="btn btn-ghost" style={{ cursor: 'pointer' }}>
          Import
          <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
        </label>
      </div>
    </nav>
  );
}
