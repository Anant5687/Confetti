import React from 'react';
import confetti from 'canvas-confetti';

const Confetti = () => {
  const TriggerConfetti = () => {
    confetti({
      particleCount: 1000,
      spread: 120,
      origin: { y: 1, x: 0 },
    });
    confetti({
      particleCount: 1000,
      spread: 120,
      origin: { y: 1, x: 1 },
    });
    
  };

  return (
    <div
      className="p-4 flex justify-center items-center flex-col"
      id="container"
    >
      <h1 className="text-base font-bold p-4">Confetti</h1>
      <button
        onClick={TriggerConfetti}
        id="btn"
        className="bg-blue-0 text-white p-2 text-sm rounded-[8px]"
      >

        Trigger
      </button>
    </div>
  );
};

export default Confetti;
