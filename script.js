// 1. Force Browser to Always Load & Refresh at the Very Top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);

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

  // 3. Lightbox Image Modal Control Logic
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

  // 4. Typewriter Effect Logic
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

  // 5. Live Dashboard Clock Logic
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

  // 6. Native Scroll Animation Reveal Controller
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

  // 7. Core Navigation Active State Engine Logic
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeSheetBtn = document.getElementById("close-sheet-btn");
  const bottomSheet = document.getElementById("bottom-sheet");
  const bottomSheetOverlay = document.getElementById("bottom-sheet-overlay");
  const mobileSheetLinks = document.querySelectorAll(".mobile-sheet-link");
  const navItemContainers = document.querySelectorAll(".nav-item-container");

  const clearNavActiveStates = () => {
    navItemContainers.forEach(el => el.classList.remove("active-state"));
  };

  if (mobileMenuBtn && bottomSheet && bottomSheetOverlay) {
    const openBottomSheet = () => {
      bottomSheetOverlay.classList.remove("hidden");
      setTimeout(() => {
        bottomSheetOverlay.classList.add("opacity-100");
        bottomSheet.classList.remove("translate-y-full", "opacity-0", "invisible");
        bottomSheet.classList.add("translate-y-0", "opacity-100", "visible");
        clearNavActiveStates();
        mobileMenuBtn.classList.add("active-state");
      }, 10);
    };

    const closeBottomSheet = () => {
      bottomSheetOverlay.classList.remove("opacity-100");
      bottomSheet.classList.remove("translate-y-0", "opacity-100", "visible");
      bottomSheet.classList.add("translate-y-full", "opacity-0", "invisible");
      setTimeout(() => {
        bottomSheetOverlay.classList.add("hidden");
        clearNavActiveStates();
        const aboutLink = document.querySelector('a[href="#about"]');
        if (aboutLink) aboutLink.classList.add("active-state");
      }, 300);
    };

    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isClosed = bottomSheet.classList.contains("invisible");
      if (isClosed) {
        openBottomSheet();
      } else {
        closeBottomSheet();
      }
    });

    if (closeSheetBtn) closeSheetBtn.addEventListener("click", closeBottomSheet);
    bottomSheetOverlay.addEventListener("click", closeBottomSheet);

    mobileSheetLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeBottomSheet();
      });
    });
  }

  // 8. Desktop / Mobile App View Anchor Active Switch Engine
  document.querySelectorAll('a.nav-item-container').forEach(anchorLink => {
    anchorLink.addEventListener("click", () => {
      if (bottomSheet) {
        bottomSheet.classList.add("translate-y-full", "opacity-0", "invisible");
        if (bottomSheetOverlay) bottomSheetOverlay.classList.add("hidden");
      }
      clearNavActiveStates();
      anchorLink.classList.add("active-state");
    });
  });

  // 9. Core Theme Toggling System (Icon & Custom Toggle Switch Trackers)
  const desktopThemeBtn = document.getElementById("desktop-theme-btn");
  const mobileThemeBtn = document.getElementById("mobile-theme-btn");
  const desktopThemeIcon = document.getElementById("desktop-theme-icon");
  const toggleSlider = document.getElementById("toggle-slider");

  const syncThemeUI = (isDark) => {
    if (isDark) {
      document.body.classList.add("dark-mode");
      if (desktopThemeIcon) desktopThemeIcon.className = "ri-sun-line text-lg";
      if (mobileThemeBtn) {
        mobileThemeBtn.setAttribute("aria-checked", "true");
      }
      if (toggleSlider) {
        toggleSlider.classList.remove("translate-x-0");
        toggleSlider.classList.add("translate-x-5");
      }
    } else {
      document.body.classList.remove("dark-mode");
      if (desktopThemeIcon) desktopThemeIcon.className = "ri-moon-clear-line text-lg";
      if (mobileThemeBtn) {
        mobileThemeBtn.setAttribute("aria-checked", "false");
      }
      if (toggleSlider) {
        toggleSlider.classList.remove("translate-x-5");
        toggleSlider.classList.add("translate-x-0");
      }
    }
  };

  let currentThemeState = localStorage.getItem("portfolio-theme") === "dark";
  syncThemeUI(currentThemeState);

  const toggleThemeState = (e) => {
    e.preventDefault();
    currentThemeState = !currentThemeState;
    localStorage.setItem("portfolio-theme", currentThemeState ? "dark" : "light");
    syncThemeUI(currentThemeState);
  };

  if (desktopThemeBtn) desktopThemeBtn.addEventListener("click", toggleThemeState);
  if (mobileThemeBtn) mobileThemeBtn.addEventListener("click", toggleThemeState);
});