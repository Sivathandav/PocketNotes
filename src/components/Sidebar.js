import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { hexToRgba } from '../utils/helpers';

const Sidebar = ({ groups, selectedGroup, onGroupSelect, onCreateGroup, onHomeClick }) => {
  const { theme, isLight } = useTheme();

  return (
    <div className="sidebar" style={{ backgroundColor: theme.sidebar, borderColor: theme.border }}>
      <div className="sidebar-header">
        <h1 className="app-title" onClick={onHomeClick}>
          Pocket Notes
        </h1>
      </div>

      <div className="sidebar-content">
        {groups.map(group => (
          <div 
            key={group.id}
            className={`group-item ${selectedGroup?.id === group.id ? 'active' : ''}`}
            onClick={() => onGroupSelect(group)}
            style={selectedGroup?.id === group.id ? {
              backgroundColor: hexToRgba(group.color, 0.5)
              // borderRight: `1px solid ${group.color}`
            } : {}}
          >
            <div className="group-avatar" style={{ backgroundColor: group.color }}>
              {group.initials}
            </div>
            <span className="group-name" style={{ color: theme.text }}>
              {group.name}
            </span>
          </div>
        ))}
      </div>

      <button className="create-group-btn-right" onClick={onCreateGroup}>
        <span className="plus-icon">+</span>
      </button>
    </div>
  );
};

export default Sidebar;