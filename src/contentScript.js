import confetti from 'canvas-confetti';

console.log('🚀 GitHub Confetti content script loaded');

chrome.storage.sync.get(['confettiActive', 'soundActive'], (result) => {
  const confettiActive = !!result.confettiActive;
  const soundActive = !!result.soundActive;

  if (!confettiActive) {
    console.log('⚙️ Confetti is inactive — skipping setup');
    return;
  }

  const confettiNoWorker = confetti.create(null, { resize: true, useWorker: false });

  function playSound() {
    if (!soundActive) return;
    const audio = new Audio(chrome.runtime.getURL('sounds/confetti-pop.mp3'));
    audio.volume = 0.8;
    audio.play().catch((err) => console.warn('Sound play blocked:', err));
  }

  function attachMergeConfetti() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
      const labelSpan = btn.querySelector('span[data-component="text"]');
      const labelText = labelSpan?.innerText?.trim();

      if (labelText === 'Confirm merge' && !btn.dataset.confettiAttached) {
        btn.dataset.confettiAttached = 'true';
        console.log('🎯 Confetti attached to Merge pull request button');

        btn.addEventListener('click', () => {
          console.log('💥 Merge button clicked!');
          playSound(); // 🔊 play the sound first

          confettiNoWorker({
            particleCount: 300,
            spread: 120,
            origin: { x: 0, y: 1 },
          });
          confettiNoWorker({
            particleCount: 300,
            spread: 120,
            origin: { x: 1, y: 1 },
          });
        });
      }
    });
  }

  setTimeout(attachMergeConfetti, 2000);
  const observer = new MutationObserver(() => attachMergeConfetti());
  observer.observe(document.body, { childList: true, subtree: true });
});
