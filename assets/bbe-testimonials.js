(function () {
  const selectors = {
    section:  '.bbe-testimonials',
    playBtn:  '[data-play-btn]',
  };

  function TestimonialsCarousel(sectionEl) {
    sectionEl.querySelectorAll(selectors.playBtn).forEach((btn) => {
      const video = btn.closest('.bbe-testimonials__media--video')?.querySelector('video');
      if (!video) return;

      btn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          btn.setAttribute('aria-label', 'Pause video');
          btn.innerHTML = '&#9646;&#9646;';
        } else {
          video.pause();
          btn.setAttribute('aria-label', 'Play video');
          btn.innerHTML = '&#9654;';
        }
      });
    });
  }

  document.querySelectorAll(selectors.section).forEach((el) => new TestimonialsCarousel(el));
})();
