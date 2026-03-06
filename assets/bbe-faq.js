(function () {
  const selectors = {
    section: '[data-single-open]',
    btn:     '[data-faq-btn]',
    answer:  '[data-faq-answer]',
  };

  function FAQAccordion(sectionEl) {
    const singleOpen = sectionEl.dataset.singleOpen === 'true';
    const items      = Array.from(sectionEl.querySelectorAll('.bbe-faq__item'));

    function openItem(btn, answer) {
      btn.setAttribute('aria-expanded', 'true');
      answer.removeAttribute('hidden');
    }

    function closeItem(btn, answer) {
      btn.setAttribute('aria-expanded', 'false');
      answer.setAttribute('hidden', '');
    }

    function closeAll() {
      items.forEach((item) => {
        const btn    = item.querySelector(selectors.btn);
        const answer = item.querySelector(selectors.answer);
        if (btn && answer) closeItem(btn, answer);
      });
    }

    items.forEach((item) => {
      const btn    = item.querySelector(selectors.btn);
      const answer = item.querySelector(selectors.answer);

      if (!btn || !answer) return;

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        if (singleOpen) closeAll();

        if (isOpen) {
          closeItem(btn, answer);
        } else {
          openItem(btn, answer);
        }
      });
    });
  }

  document.querySelectorAll(selectors.section).forEach((el) => new FAQAccordion(el));
})();
