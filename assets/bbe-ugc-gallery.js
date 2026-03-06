(function () {
  const selectors = {
    section:  '.bbe-ugc-gallery',
    viewport: '[data-ugc-viewport]',
    track:    '[data-ugc-track]',
    prevBtn:  '[data-ugc-prev]',
    nextBtn:  '[data-ugc-next]',
  };

  const SCROLL_AMOUNT = 260;

  function UGCGallery(sectionEl) {
    const viewport = sectionEl.querySelector(selectors.viewport);
    const prevBtn  = sectionEl.querySelector(selectors.prevBtn);
    const nextBtn  = sectionEl.querySelector(selectors.nextBtn);

    if (!viewport) return;

    function scrollBy(direction) {
      viewport.scrollBy({ left: SCROLL_AMOUNT * direction, behavior: 'smooth' });
    }

    function updateArrows() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = viewport.scrollLeft <= 0;
      nextBtn.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1;
    }

    prevBtn && prevBtn.addEventListener('click', () => scrollBy(-1));
    nextBtn && nextBtn.addEventListener('click', () => scrollBy(1));

    viewport.addEventListener('scroll', updateArrows, { passive: true });

    updateArrows();
  }

  document.querySelectorAll(selectors.section).forEach((el) => new UGCGallery(el));
})();
