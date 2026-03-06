(function () {
  const selectors = {
    section:   '[data-autoplay]',
    track:     '[data-reviews-track]',
    slides:    '[data-review-slide]',
    prevBtn:   '[data-reviews-prev]',
    nextBtn:   '[data-reviews-next]',
  };

  function ReviewsCarousel(sectionEl) {
    const slides      = Array.from(sectionEl.querySelectorAll(selectors.slides));
    const prevBtn     = sectionEl.querySelector(selectors.prevBtn);
    const nextBtn     = sectionEl.querySelector(selectors.nextBtn);
    const autoplay    = sectionEl.dataset.autoplay === 'true';
    const speed       = parseInt(sectionEl.dataset.autoplaySpeed, 10) || 4000;

    let currentIndex  = 0;
    let timer         = null;

    if (slides.length === 0) return;

    function goTo(index) {
      slides[currentIndex].classList.remove('is-active');
      slides[currentIndex].setAttribute('aria-hidden', 'true');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add('is-active');
      slides[currentIndex].setAttribute('aria-hidden', 'false');
    }

    function startAutoplay() {
      if (!autoplay) return;
      timer = setInterval(() => goTo(currentIndex + 1), speed);
    }

    function stopAutoplay() {
      clearInterval(timer);
    }

    prevBtn && prevBtn.addEventListener('click', () => {
      stopAutoplay();
      goTo(currentIndex - 1);
      startAutoplay();
    });

    nextBtn && nextBtn.addEventListener('click', () => {
      stopAutoplay();
      goTo(currentIndex + 1);
      startAutoplay();
    });

    sectionEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { stopAutoplay(); goTo(currentIndex - 1); startAutoplay(); }
      if (e.key === 'ArrowRight') { stopAutoplay(); goTo(currentIndex + 1); startAutoplay(); }
    });

    goTo(0);
    startAutoplay();
  }

  document.querySelectorAll(selectors.section).forEach((el) => new ReviewsCarousel(el));
})();
