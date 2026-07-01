// 1. Force Browser to Always Load & Refresh at the Very Top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  // Ensure top scroll injection holds after DOM elements finish rendering
  window.scrollTo(0, 0);

  // Initialize Lucide Icons
  lucide.createIcons();

  // 2. Scroll Progress Bar Engine Logic
  const progressLine = document.getElementById("scroll-progress");
  if (progressLine) {
    window.addEventListener("scroll", () => {
      const windowScroll = document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (windowScroll / totalHeight) * 100;
      progressLine.style.width = scrollPercentage + "%";
    });
  }

  // 3. Carousel Component Structural Control Logic with Hard Boundaries
  const carouselTrack = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  
  if (carouselTrack && prevBtn && nextBtn) {
    const slides = Array.from(carouselTrack.children);
    let currentIndex = 0;

    const updateButtonsState = () => {
      if (currentIndex === 0) {
        prevBtn.disabled = true;
        prevBtn.classList.add("opacity-30", "pointer-events-none");
      } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove("opacity-30", "pointer-events-none");
      }

      if (currentIndex === slides.length - 1) {
        nextBtn.disabled = true;
        nextBtn.classList.add("opacity-30", "pointer-events-none");
      } else {
        nextBtn.disabled = false;
        nextBtn.classList.remove("opacity-30", "pointer-events-none");
      }
    };

    const updateSlidePosition = () => {
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateButtonsState();
    };

    nextBtn.addEventListener("click", () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlidePosition();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
      }
    });

    window.addEventListener("resize", updateSlidePosition);
    updateButtonsState();
  }

  // 4. Lightbox Image Modal Control Logic
  const experienceImages = document.querySelectorAll("#experience img");
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (experienceImages.length > 0 && lightboxModal && lightboxImg && lightboxClose) {
    experienceImages.forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Enlarged View";
        lightboxModal.classList.remove("hidden");
        lightboxModal.classList.add("flex");
        setTimeout(() => {
          lightboxModal.classList.remove("opacity-0");
        }, 10);
      });
    });

    const closeModal = () => {
      lightboxModal.classList.add("opacity-0");
      setTimeout(() => {
        lightboxModal.classList.add("hidden");
        lightboxModal.classList.remove("flex");
        lightboxImg.src = "";
      }, 300);
    };

    lightboxClose.addEventListener("click", closeModal);
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        closeModal();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightboxModal.classList.contains("hidden")) {
        closeModal();
      }
    });
  }

  // 5. Typewriter Effect Logic
  const words = ["Developer", "UI/UX Designer", "Software and Data Enthusiast"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.getElementById("typewriter");

  function typeEffect() {
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800; 
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; 
      speed = 400; 
    }

    setTimeout(typeEffect, speed);
  }

  if (typewriterElement) {
    typeEffect();
  }

  // 6. Live Dashboard Clock Logic (Forced 24-Hour & Strict Colon Separators)
  const clockElement = document.getElementById("dashboard-clock");
  if (clockElement) {
    const updateClock = () => {
      const now = new Date();
      
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).formatToParts(now);

      const hour = parts.find(p => p.type === "hour").value;
      const minute = parts.find(p => p.type === "minute").value;
      const second = parts.find(p => p.type === "second").value;

      clockElement.textContent = `${hour}:${minute}:${second} WIB`;
    };
    
    setInterval(updateClock, 1000);
    updateClock(); 
  }

  // 7. Native Scroll Animation Reveal Controller
  const animatedElements = document.querySelectorAll('.scroll-reveal');
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  animatedElements.forEach(el => animationObserver.observe(el));

  // 8. Mobile Bottom Sheet Menu Control Logic
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const bottomSheet = document.getElementById("bottom-sheet");
  const bottomSheetOverlay = document.getElementById("bottom-sheet-overlay");
  const mobileSheetLinks = document.querySelectorAll(".mobile-sheet-link");

  if (mobileMenuBtn && bottomSheet && bottomSheetOverlay) {
    const openBottomSheet = () => {
      bottomSheetOverlay.classList.remove("hidden");
      setTimeout(() => {
        bottomSheetOverlay.classList.add("opacity-100");
        bottomSheet.classList.remove("translate-y-full");
        bottomSheet.classList.add("translate-y-0");
      }, 10);
    };

    const closeBottomSheet = () => {
      bottomSheetOverlay.classList.remove("opacity-100");
      bottomSheet.classList.remove("translate-y-0");
      bottomSheet.classList.add("translate-y-full");
      setTimeout(() => {
        bottomSheetOverlay.classList.add("hidden");
      }, 300);
    };

    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (bottomSheet.classList.contains("translate-y-full")) {
        openBottomSheet();
      } else {
        closeBottomSheet();
      }
    });

    bottomSheetOverlay.addEventListener("click", closeBottomSheet);

    mobileSheetLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeBottomSheet();
      });
    });
  }

  // 9. Back-to-Top Interaction Logic
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});