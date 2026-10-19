(() => {
  const filters = document.querySelector('.publication-filters');
  const buttons = filters.querySelectorAll('[data-publication-filter]');
  const publications = document.querySelectorAll('#publication-list .publication');
  const emptyMessage = document.querySelector('#publication-empty');

  function setFilter(filter) {
    let visibleCount = 0;

    publications.forEach((publication) => {
      publication.hidden = filter === 'selected' && publication.dataset.selected !== 'true';
      if (!publication.hidden) visibleCount += 1;
    });

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.publicationFilter === filter));
    });

    emptyMessage.hidden = visibleCount > 0;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.publicationFilter));
  });

  setFilter('selected');
  filters.hidden = false;
})();
