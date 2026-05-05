const DATA_KEY = 'csm_tracker_data';

const defaultData = {
  customers: [
    {
      id: '1',
      name: 'Allegiant Travel Company',
      industry: 'Travel',
      arr: '$72,000',
      renewalDate: '2026-12-31',
      status: 'needs-attention',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['DI (CPEA)', 'SAP BusinessObjects Enterprise'],
      otherProducts: [],
      notes: 'DI (CPEA) ~6K/month, ~72K ACV. Pretty MIA/unresponsive.',
      currentStatus: '',
      actionItems: [],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Steve Strawbridge', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'Mark Briscoe', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
      ],
      escalations: [],
    },
    {
      id: '2',
      name: 'Amkor Technology, Inc',
      industry: 'Semiconductor',
      arr: '$693,101',
      renewalDate: '2027-12-31',
      status: 'healthy',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['AI Units', 'Joule Embedded', 'SAC BI', 'Datasphere', 'HANA Cloud', 'BDC Core Capacity'],
      otherProducts: [],
      notes: '',
      currentStatus: '',
      actionItems: [],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Jonathan Poon', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'Taj Majeed', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
        { id: 's3', name: 'Chandu', role: 'Other', email: '', sentiment: 'unknown', notes: 'BTP CSM' },
      ],
      escalations: [],
    },
    {
      id: '3',
      name: 'Applied Materials, Inc.',
      industry: 'Semiconductor',
      arr: '$66,806',
      renewalDate: '2027-01-31',
      status: 'healthy',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: 'Yaw Mak',
      primaryContactEmail: '',
      dataAiProducts: ['AI Units', 'BDC Core Capacity', 'Customer Managed DP', 'Memory'],
      otherProducts: [],
      notes: 'Weekly Connect that I join - Chris and Yaw are on - BDC POC currently working on.',
      currentStatus: 'BDC POC in progress. DSP POC: Yaw Mak and Chris Franz pulling data from GTS, delta sharing into Databricks.',
      actionItems: [
        { id: 'a1', title: 'AI Units — Anoopa\'s team working on demo, interested in GTS use cases', owner: 'Anoopa Bedral', dueDate: '', done: false, createdAt: '2026-04-23' },
        { id: 'a2', title: 'DSP POC — use DSP to pull data from GTS and delta share into Databricks', owner: 'Yaw Mak', dueDate: '', done: false, createdAt: '2026-04-23' },
        { id: 'a3', title: 'Data Product Table Limits — product team identified issue, need customer confirmation', owner: '', dueDate: '', done: false, createdAt: '2026-04-27' },
      ],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Dasha Dearing', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'BDC AE' },
        { id: 's2', name: 'Anupam Tiwari', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
        { id: 's3', name: 'Anoopa Bedral', role: 'Other', email: '', sentiment: 'unknown', notes: 'AI Partner' },
        { id: 's4', name: 'Chris Franz', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Customer contact — BDC POC' },
      ],
      escalations: [],
    },
    {
      id: '4',
      name: 'PetSmart',
      industry: 'Retail',
      arr: '',
      renewalDate: '',
      status: 'healthy',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['SAP HANA EE', 'BDC Core Capacity', 'Custom DP'],
      otherProducts: [],
      notes: '',
      currentStatus: '',
      actionItems: [],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Jeff Knaus', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'Dan Dobson', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
        { id: 's3', name: 'Samantha Vuong', role: 'Other', email: '', sentiment: 'unknown', notes: 'BTP CSM' },
      ],
      escalations: [],
    },
    {
      id: '5',
      name: 'Palo Alto Networks',
      industry: 'Cybersecurity',
      arr: '$220,000',
      renewalDate: '2027-12-31',
      status: 'healthy',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['Datasphere', 'DI', 'DSP (CPEA)', 'SAC Cloud'],
      otherProducts: [],
      notes: 'SAC Cloud Test tenant dedicated CF - 100 licenses ~45K ACV. DSP (CPEA) ~10K/month. DI (CPEA) ~5K/month. ~220K ACV.',
      currentStatus: '',
      actionItems: [
        { id: 'a1', title: 'Prod Capacity Upgrade — emailed Max, check back in May', owner: '', dueDate: '2026-05-31', done: false, createdAt: '2026-04-22' },
        { id: 'a2', title: 'Just Ask — PANW gave access to Andrea', owner: '', dueDate: '', done: false, createdAt: '2026-04-23' },
        { id: 'a3', title: 'Joule for SAC — check sign-up page periodically', owner: '', dueDate: '', done: false, createdAt: '2026-04-21' },
        { id: 'a4', title: 'Vendor Assessment — Lata to check for actions in One Trust', owner: 'Lata', dueDate: '', done: false, createdAt: '2026-04-21' },
        { id: 'a5', title: 'Excel Add-In PM Connect — regular calls with PM Jeanne Bigonnet', owner: '', dueDate: '', done: false, createdAt: '2026-04-01' },
      ],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Jonathan Poon', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'Ryan Collins', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
        { id: 's3', name: 'Mandeepak', role: 'Other', email: '', sentiment: 'unknown', notes: 'BTP CSM' },
      ],
      escalations: [],
    },
    {
      id: '6',
      name: 'Calibre Scientific',
      industry: 'Life Sciences',
      arr: '$267,479',
      renewalDate: '2027-03-31',
      status: 'needs-attention',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['SAC BI', 'Datasphere'],
      otherProducts: [],
      notes: 'DSP renewal coming up. Very "immature" when it comes to BDC — work with Jeff on enablement and what could be.',
      currentStatus: '',
      actionItems: [],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Jeff Ludes', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'John Lindsay', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
      ],
      escalations: [],
    },
    {
      id: '7',
      name: 'Hamilton Company',
      industry: 'Manufacturing',
      arr: '$306,068',
      renewalDate: '2030-12-31',
      status: 'healthy',
      csStage: 'Onboarding',
      executiveSponsor: '',
      primaryContact: 'Daniel Di Loreto',
      primaryContactEmail: '',
      dataAiProducts: ['AI Units', 'HANA', 'HANA for MDG', 'BDC Core Capacity', 'Customer Managed DP'],
      otherProducts: [],
      notes: 'Just getting started with S/4 project.',
      currentStatus: '',
      actionItems: [
        { id: 'a1', title: 'AI Units — AI Partner reached out, Vitalia shared contact info', owner: 'Vitalia Quinn', dueDate: '', done: false, createdAt: '2026-04-29' },
        { id: 'a2', title: 'AnswerThink — still asking for access to partner and project plan', owner: '', dueDate: '', done: false, createdAt: '2026-04-01' },
      ],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Vitalia Quinn', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
        { id: 's2', name: 'Daniel Di Loreto', role: 'Primary Contact', email: '', sentiment: 'unknown', notes: 'S-user: S0027458066' },
      ],
      escalations: [],
    },
    {
      id: '8',
      name: 'Hensel Phelps Construction Co',
      industry: 'Construction',
      arr: '$264,038',
      renewalDate: '2030-12-31',
      status: 'healthy',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['J4D', 'Joule Base', 'AI Units', 'DSP'],
      otherProducts: [],
      notes: 'BDC on the back-burner.',
      currentStatus: '',
      actionItems: [],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Alexander Scurlock', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'Robby Jones', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
        { id: 's3', name: 'Jake Jarvis', role: 'Other', email: '', sentiment: 'unknown', notes: 'BTP CSM' },
      ],
      escalations: [],
    },
    {
      id: '9',
      name: 'Hunter Douglas, Inc.',
      industry: 'Manufacturing',
      arr: '$184,371',
      renewalDate: '2026-12-31',
      status: 'needs-attention',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['J4D', 'SAC BI', 'HANA Cloud'],
      otherProducts: ['IBP', 'BTPEA'],
      notes: 'BTPEA renews 2028.',
      currentStatus: '',
      actionItems: [
        { id: 'a1', title: 'BDC Opportunity — get included in use case/sizing conversations with Steve', owner: '', dueDate: '', done: false, createdAt: '2026-04-01' },
        { id: 'a2', title: 'SAP HANA Cloud — owned since 2021, never used, customer wants to remove', owner: '', dueDate: '', done: false, createdAt: '2026-04-01' },
        { id: 'a3', title: 'BDC Discovery Workshop — request submitted', owner: '', dueDate: '', done: false, createdAt: '2026-04-01' },
      ],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Steve Strawbridge', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'Brady Dubois', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
        { id: 's3', name: 'Chandu', role: 'Other', email: '', sentiment: 'unknown', notes: 'BTP CSM' },
      ],
      escalations: [],
    },
    {
      id: '10',
      name: 'SanDisk Technologies, Inc.',
      industry: 'Technology',
      arr: '$490,919',
      renewalDate: '2028-12-31',
      status: 'needs-attention',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['Customer Managed DP', 'BDC Core Capacity', 'SAP LT RS', 'Cloud Memory'],
      otherProducts: [],
      notes: 'Huge BDC deal closed last year but didn\'t really have any use cases. J. Poon is selling them Cloud ERP Intelligent App.',
      currentStatus: '',
      actionItems: [],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Jonathan Poon', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'Ryan Collins', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
      ],
      escalations: [],
    },
    {
      id: '11',
      name: 'The Capital Group Companies, Inc.',
      industry: 'Financial Services',
      arr: '$118,196',
      renewalDate: '2029-12-31',
      status: 'healthy',
      csStage: 'Adoption',
      executiveSponsor: '',
      primaryContact: '',
      primaryContactEmail: '',
      dataAiProducts: ['J4D', 'DSP via CPEA', 'Joule Base', 'SAC BI', 'Cloud Memory'],
      otherProducts: [],
      notes: 'DISP (CPEA) ~20K/month = ~$240K/year. ~72K ACV.',
      currentStatus: '',
      actionItems: [],
      meetings: [],
      stakeholders: [
        { id: 's1', name: 'Michael Rebibo', role: 'Technical Lead', email: '', sentiment: 'unknown', notes: 'Data & AI AE' },
        { id: 's2', name: 'Anthony Acosta', role: 'Other', email: '', sentiment: 'unknown', notes: 'IAE' },
        { id: 's3', name: 'Chandu', role: 'Other', email: '', sentiment: 'unknown', notes: 'BTP CSM' },
      ],
      escalations: [],
    },
  ],
};


export function loadData() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    return raw ? JSON.parse(raw) : defaultData;
  } catch {
    return defaultData;
  }
}

export function saveData(data) {
  const json = JSON.stringify(data);
  localStorage.setItem(DATA_KEY, json);
  fetch('http://127.0.0.1:27153/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data, null, 2),
  }).then((r) => r.json()).then((r) => {
    if (r.ok) window.dispatchEvent(new CustomEvent('csm-autosaved', { detail: r.savedAt }));
  }).catch(() => {});
}

export function exportData() {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'csm-tracker.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        saveData(data);
        resolve(data);
      } catch {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.readAsText(file);
  });
}
