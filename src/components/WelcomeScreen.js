import React from 'react';
import { useTheme } from '../context/ThemeContext';

const WelcomeScreen = () => {
  const { theme, isLight, toggleTheme } = useTheme();

  return (
    <div className="welcome-container" style={{ color: theme.text }}>
      <div className="welcome-header">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {isLight ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="illustration">
        <div className="large-notebook"></div>
        {['person-1', 'person-2', 'person-3', 'person-4'].map((className, i) => (
          <div key={i} className={`person ${className}`}>
            <div className="person-body"></div>
            <div className={i % 2 === 0 ? 'pencil' : 'notebook'}></div>
          </div>
        ))}
      </div>

      <h1 className="main-title">Pocket Notes</h1>
      <p className="main-description">
        Send and receive messages without keeping your phone online.<br />
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </p>

      <div className="encryption-notice">
        <span className="lock-icon">🔒</span>
        <span>end-to-end encrypted</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;