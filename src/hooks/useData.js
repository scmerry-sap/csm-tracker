import { useState, useCallback } from 'react';
import { loadData, saveData } from '../data/store';

export function useData() {
  const [data, setData] = useState(() => loadData());

  const update = useCallback((newData) => {
    setData(newData);
    saveData(newData);
  }, []);

  const addCustomer = useCallback((customer) => {
    const newData = {
      ...data,
      customers: [...data.customers, { ...customer, id: crypto.randomUUID(), actionItems: [], meetings: [], stakeholders: [], escalations: [] }],
    };
    update(newData);
  }, [data, update]);

  const updateCustomer = useCallback((id, changes) => {
    const newData = {
      ...data,
      customers: data.customers.map((c) => (c.id === id ? { ...c, ...changes } : c)),
    };
    update(newData);
  }, [data, update]);

  const deleteCustomer = useCallback((id) => {
    const newData = { ...data, customers: data.customers.filter((c) => c.id !== id) };
    update(newData);
  }, [data, update]);

  const addMeeting = useCallback((customerId, meeting) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    const newMeeting = { ...meeting, id: crypto.randomUUID(), date: meeting.date || new Date().toISOString().slice(0, 10) };
    updateCustomer(customerId, { meetings: [newMeeting, ...(customer.meetings || [])] });
  }, [data, updateCustomer]);

  const updateMeeting = useCallback((customerId, meetingId, changes) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, {
      meetings: customer.meetings.map((m) => (m.id === meetingId ? { ...m, ...changes } : m)),
    });
  }, [data, updateCustomer]);

  const deleteMeeting = useCallback((customerId, meetingId) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, { meetings: customer.meetings.filter((m) => m.id !== meetingId) });
  }, [data, updateCustomer]);

  const addActionItem = useCallback((customerId, item) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    const newItem = { ...item, id: crypto.randomUUID(), done: false, createdAt: new Date().toISOString().slice(0, 10) };
    updateCustomer(customerId, { actionItems: [...(customer.actionItems || []), newItem] });
  }, [data, updateCustomer]);

  const updateActionItem = useCallback((customerId, itemId, changes) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, {
      actionItems: customer.actionItems.map((a) => (a.id === itemId ? { ...a, ...changes } : a)),
    });
  }, [data, updateCustomer]);

  const toggleActionItem = useCallback((customerId, itemId) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, {
      actionItems: customer.actionItems.map((a) => (a.id === itemId ? { ...a, done: !a.done } : a)),
    });
  }, [data, updateCustomer]);

  const deleteActionItem = useCallback((customerId, itemId) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, { actionItems: customer.actionItems.filter((a) => a.id !== itemId) });
  }, [data, updateCustomer]);

  const addStakeholder = useCallback((customerId, stakeholder) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    const newItem = { ...stakeholder, id: crypto.randomUUID() };
    updateCustomer(customerId, { stakeholders: [...(customer.stakeholders || []), newItem] });
  }, [data, updateCustomer]);

  const updateStakeholder = useCallback((customerId, stakeholderId, changes) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, {
      stakeholders: customer.stakeholders.map((s) => (s.id === stakeholderId ? { ...s, ...changes } : s)),
    });
  }, [data, updateCustomer]);

  const deleteStakeholder = useCallback((customerId, stakeholderId) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, { stakeholders: customer.stakeholders.filter((s) => s.id !== stakeholderId) });
  }, [data, updateCustomer]);

  const addEscalation = useCallback((customerId, escalation) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    const newItem = { ...escalation, id: crypto.randomUUID(), status: 'open' };
    updateCustomer(customerId, { escalations: [newItem, ...(customer.escalations || [])] });
  }, [data, updateCustomer]);

  const closeEscalation = useCallback((customerId, escalationId) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, {
      escalations: customer.escalations.map((e) =>
        e.id === escalationId ? { ...e, status: 'closed', dateClosed: new Date().toISOString().slice(0, 10) } : e
      ),
    });
  }, [data, updateCustomer]);

  const deleteEscalation = useCallback((customerId, escalationId) => {
    const customer = data.customers.find((c) => c.id === customerId);
    if (!customer) return;
    updateCustomer(customerId, { escalations: customer.escalations.filter((e) => e.id !== escalationId) });
  }, [data, updateCustomer]);

  return {
    data,
    update,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    addActionItem,
    updateActionItem,
    toggleActionItem,
    deleteActionItem,
    addStakeholder,
    updateStakeholder,
    deleteStakeholder,
    addEscalation,
    closeEscalation,
    deleteEscalation,
  };
}
