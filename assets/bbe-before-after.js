(function () {
  const selectors = {
    slider: '[data-before-after]',
    handle: '[data-handle]',
    after:  '[data-after-pane]',
  };

  const KEYBOARD_STEP = 2;

  function BeforeAfterSlider(sliderEl) {
    const handle   = sliderEl.querySelector(selectors.handle);
    const afterEl  = sliderEl.querySelector(selectors.after);

    if (!handle || !afterEl) return;

    let isDragging = false;
    let position   = 50;

    function setPosition(pct) {
      position = Math.min(100, Math.max(0, pct));
      afterEl.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
      handle.style.left = `${position}%`;
      handle.setAttribute('aria-valuenow', Math.round(position));
    }

    function getPositionFromEvent(e) {
      const rect  = sliderEl.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onMove(e) {
      if (!isDragging) return;
      requestAnimationFrame(() => setPosition(getPositionFromEvent(e)));
    }

    function onStart(e) {
      isDragging = true;
      setPosition(getPositionFromEvent(e));
    }

    function onEnd() {
      isDragging = false;
    }

    sliderEl.addEventListener('mousedown',  onStart);
    sliderEl.addEventListener('touchstart', onStart, { passive: true });

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('touchmove',  onMove, { passive: true });

    window.addEventListener('mouseup',  onEnd);
    window.addEventListener('touchend', onEnd);

    handle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  setPosition(position - KEYBOARD_STEP);
      if (e.key === 'ArrowRight') setPosition(position + KEYBOARD_STEP);
    });

    setPosition(50);
  }

  document.querySelectorAll(selectors.slider).forEach((el) => new BeforeAfterSlider(el));
})();
