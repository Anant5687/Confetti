/* global chrome */

import React, { useEffect, useState } from 'react';

const ConfettiPopup = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSound, setIsSound] = useState(false);

  // Load current states from chrome storage
  useEffect(() => {
    chrome.storage.sync.get(["confettiActive", "soundActive"], (result) => {
      setIsActive(!!result.confettiActive);
      setIsSound(!!result.soundActive);
    });
  }, []);

  const handleToggleConfetti = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    chrome.storage.sync.set({ confettiActive: newValue });
  };

  const handleToggleSound = () => {
    const newValue = !isSound;
    setIsSound(newValue);
    chrome.storage.sync.set({ soundActive: newValue });
  };

  return (
    <div
      style={{
        width: '320px',
        height: '230px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafb',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111' }}>
        🎉 Confetti
      </h2>

      <div style={{ marginTop: '10px', width: '100%', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Confetti: <strong>{isActive ? 'Active ✅' : 'Inactive ❌'}</strong>
        </p>
        <button
          onClick={handleToggleConfetti}
          style={{
            background: isActive ? '#16a34a' : '#ef4444',
            color: '#fff',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            marginBottom: '10px',
          }}
        >
          {isActive ? 'Deactivate Confetti' : 'Activate Confetti'}
        </button>

        <p style={{ fontSize: '14px', color: '#555' }}>
          Sound: <strong>{isSound ? 'On 🔊' : 'Off 🔇'}</strong>
        </p>
        <button
          onClick={handleToggleSound}
          style={{
            background: isSound ? '#3b82f6' : '#9ca3af',
            color: '#fff',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          {isSound ? 'Disable Sound' : 'Enable Sound'}
        </button>
      </div>
    </div>
  );
};

export default ConfettiPopup;
