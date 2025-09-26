import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useGroups, useNotes, useModal } from './hooks/useApp';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import NotesView from './components/NotesView';
import Modal from './components/Modal';
import './App.css';

const AppContent = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { groups, createGroup, updateGroup, deleteGroup } = useGroups();
  const { notes, addNote, updateNote, deleteNote } = useNotes(selectedGroup?.id);
  const createModal = useModal();
  const editModal = useModal();
  const [editingGroup, setEditingGroup] = useState(null);

  const handleCreateGroup = async (name, color) => {
    const group = createGroup(name, color);
    setSelectedGroup(group);
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group);
    editModal.open();
  };

  const handleUpdateGroup = async (name, color) => {
    updateGroup(editingGroup.id, { name, color, initials: require('./utils/helpers').getInitials(name) });
    setSelectedGroup(prev => prev?.id === editingGroup.id ? { ...prev, name, color } : prev);
  };

   const handleDeleteGroup = (groupId) => {
    deleteGroup(groupId);
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null); // Deselect group if deleted
    }
  };

  return (
    <div className="app">
      <Sidebar
        groups={groups}
        selectedGroup={selectedGroup}
        onGroupSelect={setSelectedGroup}
        onCreateGroup={createModal.open}
        onHomeClick={() => setSelectedGroup(null)}
      />

      <div className="main-content">
        {selectedGroup ? (
          <NotesView
            selectedGroup={selectedGroup}
            notes={notes}
            onAddNote={addNote}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
          />
        ) : (
          <WelcomeScreen />
        )}
      </div>

      <Modal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSubmit={handleCreateGroup}
        title="Create New group"
      />

      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        onSubmit={handleUpdateGroup}
        title="Edit Group"
        initialData={editingGroup}
      />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;