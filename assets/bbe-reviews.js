(function () {
  function initReviewsSection(section) {
    if (!section || section.dataset.reviewsReady === 'true') {
      return;
    }

    section.dataset.reviewsReady = 'true';

    const carousel = section.querySelector('[data-reviews-carousel]');
    const slides = Array.from(section.querySelectorAll('[data-review-slide]'));
    const prevButton = section.querySelector('[data-reviews-prev]');
    const nextButton = section.querySelector('[data-reviews-next]');
    const autoplayEnabled = section.dataset.autoplay === 'true';
    const autoplayDelay = parseInt(section.dataset.autoplaySpeed, 10) || 5000;

    let activeIndex = slides.findIndex(function (slide) {
      return slide.classList.contains('is-active');
    });
    let autoplayTimer = null;

    if (!slides.length) {
      return;
    }

    if (activeIndex < 0) {
      activeIndex = 0;
    }

    function setLiveMode(announce) {
      if (!carousel) {
        return;
      }

      carousel.setAttribute('aria-live', announce ? 'polite' : 'off');
    }

    function render(announce) {
      slides.forEach(function (slide, index) {
        const isActive = index === activeIndex;

        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      if (prevButton) {
        prevButton.disabled = slides.length <= 1;
      }

      if (nextButton) {
        nextButton.disabled = slides.length <= 1;
      }

      setLiveMode(announce);
    }

    function goTo(index, announce) {
      activeIndex = (index + slides.length) % slides.length;
      render(announce);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function startAutoplay() {
      if (!autoplayEnabled || slides.length <= 1) {
        return;
      }

      stopAutoplay();
      autoplayTimer = setInterval(function () {
        goTo(activeIndex + 1, false);
      }, autoplayDelay);
    }

    if (prevButton) {
      prevButton.addEventListener('click', function () {
        stopAutoplay();
        goTo(activeIndex - 1, true);
        startAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function () {
        stopAutoplay();
        goTo(activeIndex + 1, true);
        startAutoplay();
      });
    }

    section.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        stopAutoplay();
        goTo(activeIndex - 1, true);
        startAutoplay();
      }

      if (event.key === 'ArrowRight') {
        stopAutoplay();
        goTo(activeIndex + 1, true);
        startAutoplay();
      }
    });

    section.addEventListener('mouseenter', stopAutoplay);
    section.addEventListener('mouseleave', startAutoplay);
    section.addEventListener('focusin', stopAutoplay);
    section.addEventListener('focusout', function (event) {
      if (!section.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    render(false);
    startAutoplay();
  }

  function initAll(root) {
    const scope = root || document;
    const sections = scope.querySelectorAll('[data-bbe-reviews]');

    sections.forEach(initReviewsSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAll(document);
    });
  } else {
    initAll(document);
  }

  document.addEventListener('shopify:section:load', function (event) {
    initAll(event.target);
  });
})();
