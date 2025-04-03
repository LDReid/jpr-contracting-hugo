document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('show');
      
      // Toggle aria-expanded attribute for accessibility
      const expanded = mobileMenu.classList.contains('show');
      this.setAttribute('aria-expanded', expanded);
      
      // Block body scroll when menu is open
      if (expanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when a link is clicked
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuButton.classList.remove('active');
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (mobileMenu.classList.contains('show') && 
          !mobileMenu.contains(event.target) && 
          !mobileMenuButton.contains(event.target)) {
        mobileMenuButton.classList.remove('active');
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }
  
  // FAQ Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');
      
      // Close all FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const otherAnswer = item.querySelector('.faq-answer');
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });
      
      // If the clicked FAQ wasn't active, open it
      if (!isActive) {
        faqItem.classList.add('active');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      }
    });
  });
  
  // Portfolio Filter
  const filterButtons = document.querySelectorAll('.filter-button');
  const portfolioItems = document.querySelectorAll('.project-card, .portfolio-item');
  
  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter items
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Testimonials Slider
  const testimonialSlider = document.getElementById('testimonials-slider');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  
  if (testimonialSlider && prevButton && nextButton) {
    const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
      let currentIndex = 0;
      let cardWidth;
      let cardsPerView;
      let autoScrollInterval;
      
      // Function to update slider dimensions based on viewport
      const updateSliderDimensions = () => {
        const viewportWidth = window.innerWidth;
        cardWidth = testimonialCards[0].offsetWidth + parseInt(getComputedStyle(testimonialCards[0]).marginRight);
        
        if (viewportWidth < 640) {
          cardsPerView = 1;
        } else if (viewportWidth < 1024) {
          cardsPerView = 2;
        } else {
          cardsPerView = 3;
        }
      };
      
      // Initial setup
      updateSliderDimensions();
      
      // Function to scroll to a specific index
      const scrollToIndex = (index) => {
        // Ensure index is within bounds
        if (index < 0) index = 0;
        if (index > testimonialCards.length - cardsPerView) index = testimonialCards.length - cardsPerView;
        
        currentIndex = index;
        testimonialSlider.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
      };
      
      // Previous button click
      prevButton.addEventListener('click', () => {
        scrollToIndex(currentIndex - 1);
        resetAutoScroll();
      });
      
      // Next button click
      nextButton.addEventListener('click', () => {
        scrollToIndex(currentIndex + 1);
        resetAutoScroll();
      });
      
      // Handle manual scroll
      testimonialSlider.addEventListener('scroll', () => {
        const scrollPosition = testimonialSlider.scrollLeft;
        currentIndex = Math.round(scrollPosition / cardWidth);
      });
      
      // Update dimensions on resize
      window.addEventListener('resize', () => {
        updateSliderDimensions();
        scrollToIndex(currentIndex);
      });
      
      // Set up auto-scrolling
      const startAutoScroll = () => {
        if (testimonialCards.length > cardsPerView) {
          autoScrollInterval = setInterval(() => {
            if (currentIndex >= testimonialCards.length - cardsPerView) {
              scrollToIndex(0);
            } else {
              scrollToIndex(currentIndex + 1);
            }
          }, 5000);
        }
      };
      
      const resetAutoScroll = () => {
        clearInterval(autoScrollInterval);
        startAutoScroll();
      };
      
      // Start auto-scrolling
      startAutoScroll();
      
      // Pause auto-scrolling when interacting with the slider
      testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
      });
      
      testimonialSlider.addEventListener('mouseleave', () => {
        startAutoScroll();
      });
      
      // Touch events for mobile
      testimonialSlider.addEventListener('touchstart', () => {
        clearInterval(autoScrollInterval);
      });
      
      testimonialSlider.addEventListener('touchend', () => {
        startAutoScroll();
      });
    }
  }
});
