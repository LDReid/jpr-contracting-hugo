document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and portfolio items
  const filterButtons = document.querySelectorAll('.filter-button');
  const mobileFilterSelect = document.getElementById('mobile-filter-select');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const modals = document.querySelectorAll('.project-modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  const viewButtons = document.querySelectorAll('.portfolio-view-button');
  
  // Function to handle filtering
  function filterPortfolio(category) {
    portfolioItems.forEach(item => {
      const itemCategories = item.dataset.category.split(' ');
      
      if (category === 'all' || itemCategories.includes(category)) {
        item.style.display = '';
        item.classList.add('show');
        item.classList.remove('hide');
      } else {
        item.style.display = 'none';
        item.classList.add('hide');
        item.classList.remove('show');
      }
    });
  }
  
  // Handle desktop filter button clicks
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      // Update mobile select to match
      if (mobileFilterSelect) {
        mobileFilterSelect.value = button.dataset.filter;
      }
      // Filter the portfolio
      filterPortfolio(button.dataset.filter);
    });
  });
  
  // Handle mobile filter select changes
  if (mobileFilterSelect) {
    mobileFilterSelect.addEventListener('change', () => {
      const selectedCategory = mobileFilterSelect.value;
      // Update desktop buttons to match
      filterButtons.forEach(button => {
        if (button.dataset.filter === selectedCategory) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
      // Filter the portfolio
      filterPortfolio(selectedCategory);
    });
  }
  
  // Modal functionality
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      document.body.style.overflow = 'hidden';
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
    }
  }
  
  function closeModal(modal) {
    document.body.style.overflow = '';
    modal.classList.remove('active');
  }
  
  // Add click event to portfolio items
  portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Only trigger if not clicking the view details button (to prevent double triggering)
      if (!e.target.classList.contains('portfolio-view-button')) {
        const projectId = item.dataset.project;
        openModal(`modal-${projectId}`);
      }
    });
  });
  
  // Add click event to view buttons
  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.dataset.projectId;
      openModal(`modal-${projectId}`);
    });
  });
  
  // Add click event to close buttons
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.project-modal');
      closeModal(modal);
    });
  });
  
  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      // Check if the click is outside the modal content
      if (!e.target.closest('.modal-content') && !e.target.closest('.modal-close')) {
        closeModal(modal);
      }
    });
  });
  
  // Close modal with escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
}); 