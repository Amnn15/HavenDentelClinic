
document.addEventListener('DOMContentLoaded', () => {
    AOS.init(); // Initialize AOS

    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gallerySubsections = document.querySelectorAll('.gallery-subsection');

    let currentCategory = '';
    let currentImageIndex = 0;
    let currentImages = [];

    let openModalTimeout;
    let closeModalTimeout;
    const HOVER_DELAY_MS = 200; // Delay before modal opens on hover
    const MOUSE_LEAVE_GRACE_PERIOD_MS = 300; // Time to allow mouse to move into modal before it closes

    // Function to open the modal
    function openModal(category, index) {
        clearTimeout(closeModalTimeout); // Clear any pending close
        currentCategory = category;
        currentImages = galleryImages[currentCategory];
        currentImageIndex = index;

        modalImage.src = currentImages[currentImageIndex];
        galleryModal.classList.add('active'); // Add 'active' class to show modal with animation
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
    }

    // Function to close the modal
    function closeModal() {
        clearTimeout(openModalTimeout); // Clear any pending open
        galleryModal.classList.remove('active'); // Remove 'active' class to hide modal with animation
        document.body.style.overflow = ''; // Restore body scrolling
    }

    // Function to show next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        modalImage.style.opacity = 0; // Fade out current image
        setTimeout(() => {
            modalImage.src = currentImages[currentImageIndex];
            modalImage.style.opacity = 1; // Fade in new image
        }, 200);
    }

    // Function to show previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        modalImage.style.opacity = 0; // Fade out current image
        setTimeout(() => {
            modalImage.src = currentImages[currentImageIndex];
            modalImage.style.opacity = 1; // Fade in new image
        }, 200);
    }

    // Event Listeners for each gallery subsection (Modal on Hover)
    gallerySubsections.forEach(subsection => {
        subsection.addEventListener('mouseenter', () => {
            clearTimeout(closeModalTimeout); // Stop any pending close
            openModalTimeout = setTimeout(() => {
                const category = subsection.dataset.category;
                openModal(category, 0); // Always start with the first image of the category
            }, HOVER_DELAY_MS);
        });

        subsection.addEventListener('mouseleave', () => {
            clearTimeout(openModalTimeout); // Cancel pending open
            closeModalTimeout = setTimeout(() => {
                // Only close if the mouse is not now over the modal itself
                if (!galleryModal.contains(event.relatedTarget)) {
                    closeModal();
                }
            }, MOUSE_LEAVE_GRACE_PERIOD_MS);
        });
    });

    // Prevent modal from closing if mouse moves from subsection to modal content
    galleryModal.addEventListener('mouseenter', () => {
        clearTimeout(closeModalTimeout); // Cancel close if mouse enters modal
    });

    galleryModal.addEventListener('mouseleave', () => {
        closeModalTimeout = setTimeout(closeModal, MOUSE_LEAVE_GRACE_PERIOD_MS);
    });

    // Event Listeners for modal controls (unchanged)
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation (optional)
    document.addEventListener('keydown', (event) => {
        if (galleryModal.classList.contains('active')) {
            if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            } else if (event.key === 'Escape') {
                closeModal();
            }
        }
    });
});

// script.js


document.addEventListener("DOMContentLoaded", function () {
  // Logic for the "Show More" button in the Services section
  const btn = document.getElementById("showMoreBtn");
  const extraServices = document.querySelectorAll(".extra-service");

  if (btn && extraServices.length > 0) {
    btn.addEventListener("click", () => {
      const isHidden = extraServices[0].classList.contains("hidden");

      extraServices.forEach(service => {
        if (isHidden) {
          service.classList.remove("hidden");
          service.classList.add("fade-in");

          // Remove animation class after it plays (to allow replay later)
          setTimeout(() => {
            service.classList.remove("fade-in");
          }, 700);
        } else {
          service.classList.add("hidden");
        }
      });

      btn.textContent = isHidden ? "Show Less" : "Show More";
    });
  }
});

// Smooth scroll to section on load if hash is present
window.addEventListener('load', function() {
  if (window.location.hash) {
    const section = document.querySelector(window.location.hash);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Logo text/image switching animation
window.addEventListener('DOMContentLoaded', () => {
  const textEl = document.getElementById('logo-text');
  const imgEl = document.getElementById('logo-img');
  let showingText = true;

  const switchLogo = () => {
    if (!textEl || !imgEl) return; // Exit if elements not found

    if (showingText) {
      // Fade out text
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.style.display = 'none';
        imgEl.style.display = 'inline-block';
        setTimeout(() => {
          imgEl.style.opacity = '1';
        }, 50);
      }, 500);
    } else {
      // Fade out image
      imgEl.style.opacity = '0';
      setTimeout(() => {
        imgEl.style.display = 'none';
        textEl.style.display = 'inline-block';
        setTimeout(() => {
          textEl.style.opacity = '1';
        }, 50);
      }, 500);
    }
    showingText = !showingText;
  };

  // Initial delay before first switch
  if (textEl && imgEl) { // Only run if both elements exist
    setTimeout(() => {
      switchLogo();
      setInterval(switchLogo, 3000);
    }, 3000);
  }
});

// Initialize AOS (Animate On Scroll) library
// This needs to be called after all content is loaded, typically at the end of the HTML body or within a DOMContentLoaded listener.
// As it's already in the HTML and you requested no changes to HTML, it will remain there.
// AOS.init();
AOS.init({
  duration: 0,
  delay: 0,
  once: true
});

  document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('show-answer');
      });
    });
  });
