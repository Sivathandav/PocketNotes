import { useState, useEffect, useCallback } from 'react';
import { storage } from '../services/storage';
import { STORAGE_KEYS, COLORS } from '../utils/constants';
import { getInitials, formatDateTime } from '../utils/helpers';

export const useGroups = () => {
  const [groups, setGroups] = useState(() => storage.get(STORAGE_KEYS.GROUPS));

  const saveGroups = useCallback((newGroups) => {
    setGroups(newGroups);
    storage.set(STORAGE_KEYS.GROUPS, newGroups);
  }, []);

  const createGroup = useCallback((name, color) => {
    if (name.trim().length < 2) throw new Error('Group name must be at least 2 characters');
    if (groups.some(g => g.name.toLowerCase() === name.trim().toLowerCase())) 
      throw new Error('Group already exists');

    const newGroup = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      initials: getInitials(name.trim()),
      createdAt: new Date().toISOString()
    };
    saveGroups([...groups, newGroup]);
    return newGroup;
  }, [groups, saveGroups]);

  const updateGroup = useCallback((id, updates) => {
    const updated = groups.map(g => g.id === id ? { ...g, ...updates } : g);
    saveGroups(updated);
  }, [groups, saveGroups]);

  const deleteGroup = useCallback((id) => {
    saveGroups(groups.filter(g => g.id !== id));
    const notes = storage.get(STORAGE_KEYS.NOTES);
    delete notes[id];
    storage.set(STORAGE_KEYS.NOTES, notes);
  }, [groups, saveGroups]);

  return { groups, createGroup, updateGroup, deleteGroup };
};

export const useNotes = (groupId) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!groupId) return setNotes([]);
    const allNotes = storage.get(STORAGE_KEYS.NOTES);
    setNotes(allNotes[groupId] || []);
  }, [groupId]);

  const saveNotes = useCallback((newNotes) => {
    if (!groupId) return;
    const allNotes = storage.get(STORAGE_KEYS.NOTES);
    allNotes[groupId] = newNotes;
    storage.set(STORAGE_KEYS.NOTES, allNotes);
    setNotes(newNotes);
  }, [groupId]);

  const addNote = useCallback((content) => {
    const { date, time } = formatDateTime();
    const newNote = {
      id: Date.now().toString(),
      content: content.trim(),
      date, time,
      createdAt: new Date().toISOString()
    };
    saveNotes([...notes, newNote]);
  }, [notes, saveNotes]);

  const updateNote = useCallback((id, content) => {
    const { date, time } = formatDateTime();
    const updated = notes.map(n => n.id === id ? 
      { ...n, content: content.trim(), date, time, updatedAt: new Date().toISOString() } : n);
    saveNotes(updated);
  }, [notes, saveNotes]);

  const deleteNote = useCallback((id) => {
    saveNotes(notes.filter(n => n.id !== id));
  }, [notes, saveNotes]);

  return { notes, addNote, updateNote, deleteNote };
};

export const useModal = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev)
  };
};