import { Link } from 'react-router-dom';
import { exportData, importData } from '../data/store';

const ONEDRIVE_PATH = 'OneDrive - SAP SE/CSM Tracker';

export default function Navbar({ search, setSearch, dataHook }) {
  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    importData(file).then((newData) => dataHook.update(newData));
    e.target.value = '';
  }

  function handleExport() {
    exportData();
    setTimeout(() => {
      alert(`Save the downloaded file to:\n${ONEDRIVE_PATH}\n\nThis keeps your data backed up and synced via OneDrive.`);
    }, 300);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">CSM Tracker</Link>
      <input
        className="navbar-search"
        type="search"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="navbar-actions">
        <button className="btn btn-ghost" onClick={handleExport} title={`Save backup to ${ONEDRIVE_PATH}`}>Export to OneDrive</button>
        <label className="btn btn-ghost" style={{ cursor: 'pointer' }}>
          Import
          <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
        </label>
      </div>
    </nav>
  );
}
