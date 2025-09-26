import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { hexToRgba } from '../utils/helpers';

const NotesView = ({ selectedGroup, notes, onAddNote, onUpdateNote, onDeleteNote, onEditGroup,onDeleteGroup }) => {
  const [currentNote, setCurrentNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState('');
  const { theme } = useTheme();

  const handleSend = () => {
    if (!currentNote.trim()) return;
    onAddNote(currentNote);
    setCurrentNote('');
  };

  const startEdit = (note) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (editContent.trim()) {
      onUpdateNote(editingNote, editContent);
    }
    setEditingNote(null);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setEditContent('');
  };

  return (
    <div className="notes-container">
      <div className="notes-header" style={{backgroundColor: hexToRgba(selectedGroup.color, 0.6)}}>
        <div className="group-avatar-large" style={{ backgroundColor: selectedGroup.color }}>
          {selectedGroup.initials}
        </div>
        <h2 className="selected-group-name">{selectedGroup.name}</h2>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => onEditGroup(selectedGroup)} title="Edit group">
            ✏️
          </button>
          <button className="icon-btn" onClick={() => onDeleteGroup(selectedGroup.id)} title="Delete group">🗑️</button>
        </div>
      </div>

      <div className="notes-list" style={{ backgroundColor: theme.bg }}>
        {notes.length === 0 ? (
          <div className="no-notes" style={{ color: theme.text }}>No notes yet. Start writing!</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-item">
              {editingNote === note.id ? (
                <div className="edit-note">
                  <textarea 
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), saveEdit())}
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="note-header">
                    <div className="note-actions">
                      <button onClick={() => startEdit(note)} title="Edit">✏️</button>
                      <button onClick={() => onDeleteNote(note.id)} title="Delete">🗑️</button>
                    </div>
                  </div>
                  <p className="note-content">{note.content}</p>
                  <div className="note-meta">
                    <span>{note.date} • {note.time}</span>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <div className="note-input-container" style={{ backgroundColor: selectedGroup.color }}>
        <div className="note-input-wrapper">
          <textarea
            value={currentNote}
            onChange={e => setCurrentNote(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Enter your text here..........."
            rows={3}
          />
          <button 
            className={`send-btn ${currentNote.trim() ? 'active' : ''}`}
            onClick={handleSend}
            disabled={!currentNote.trim()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesView;