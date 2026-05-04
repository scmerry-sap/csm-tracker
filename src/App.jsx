import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useData } from './hooks/useData';
import Dashboard from './pages/Dashboard';
import CustomerDetail from './pages/CustomerDetail';
import Navbar from './components/Navbar';
import './App.css';

export default function App() {
  const dataHook = useData();
  const [search, setSearch] = useState('');

  return (
    <BrowserRouter>
      <Navbar search={search} setSearch={setSearch} dataHook={dataHook} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard dataHook={dataHook} search={search} />} />
          <Route path="/customer/:id" element={<CustomerDetail dataHook={dataHook} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
