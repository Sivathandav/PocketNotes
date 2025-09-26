import React, { useState, useEffect } from 'react';
import { COLORS } from '../utils/constants';

const Modal = ({ isOpen, onClose, onSubmit, title, initialData = {} }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialData.name || '');
      setColor(initialData.color || COLORS[0]);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      await onSubmit(name, color);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <div className="form-group">
          <label>Group Name</label>
          <input 
            value={name} 
            onChange={e => setName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter group name"
            autoFocus
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="form-group">
          <label>Choose colour</label>
          <div className="color-options">
            {COLORS.map(c => (
              <div 
                key={c}
                className={`color-option ${color === c ? 'selected' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
        <button className="create-btn" onClick={handleSubmit}>
          {initialData.name ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default Modal;