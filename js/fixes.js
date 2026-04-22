/* ============================================
   Scale Studio - Standalone Interaction Fixes
   Replaces Webflow IX2 animations & interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // =========================================
  // 1. HAMBURGER MENU (replaces Lottie)
  // =========================================
  document.querySelectorAll('.hamburger').forEach(function (el) {
    // Clear Lottie placeholder and insert CSS hamburger lines
    el.innerHTML = '';
    for (var i = 0; i < 3; i++) {
      var line = document.createElement('span');
      line.className = 'hamburger-line';
      el.appendChild(line);
    }
  });

  // Mobile menu toggle
  document.querySelectorAll('.menu-button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var nav = document.querySelector('.nav-menu');
      var hamburger = btn.querySelector('.hamburger');
      if (nav) {
        nav.classList.toggle('w--open');
      }
      if (hamburger) {
        hamburger.classList.toggle('active');
      }
    });
  });

  // =========================================
  // 2. FAQ DROPDOWNS (replaces Lottie arrows)
  // =========================================
  document.querySelectorAll('.faq-arrow').forEach(function (el) {
    el.innerHTML = ''; // Clear Lottie placeholder
  });

  document.querySelectorAll('.faq-list').forEach(function (faq) {
    var toggle = faq.querySelector('.faq-question');
    var answer = faq.querySelector('.faq-answer');

    if (toggle && answer) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Close other FAQs
        document.querySelectorAll('.faq-list').forEach(function (otherFaq) {
          if (otherFaq !== faq) {
            otherFaq.classList.remove('w--open');
            var otherAnswer = otherFaq.querySelector('.faq-answer');
            if (otherAnswer) {
              otherAnswer.style.display = 'none';
            }
          }
        });

        // Toggle this FAQ
        var isOpen = faq.classList.contains('w--open');
        faq.classList.toggle('w--open');
        answer.style.display = isOpen ? 'none' : 'block';
      });

      // Initialize as closed
      answer.style.display = 'none';
    }
  });

  // =========================================
  // 3. NAVBAR DROPDOWNS
  // =========================================
  document.querySelectorAll('.w-dropdown').forEach(function (dropdown) {
    // Skip FAQ dropdowns
    if (dropdown.classList.contains('faq-list')) return;

    var toggle = dropdown.querySelector('.w-dropdown-toggle');
    var list = dropdown.querySelector('.w-dropdown-list');

    if (toggle && list) {
      // Hover behavior for desktop
      dropdown.addEventListener('mouseenter', function () {
        dropdown.classList.add('w--open');
        list.classList.add('w--open');
      });

      dropdown.addEventListener('mouseleave', function () {
        dropdown.classList.remove('w--open');
        list.classList.remove('w--open');
      });
    }
  });

  // =========================================
  // 4. TEAM SLIDER
  // =========================================
  var sliders = document.querySelectorAll('.w-slider');
  sliders.forEach(function (slider) {
    var mask = slider.querySelector('.w-slider-mask');
    var slides = slider.querySelectorAll('.w-slide');
    var leftArrow = slider.querySelector('.w-slider-arrow-left');
    var rightArrow = slider.querySelector('.w-slider-arrow-right');
    var slideNav = slider.querySelector('.w-slider-nav');
    var currentIndex = 0;
    var totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Set up slide widths
    slides.forEach(function (slide) {
      slide.style.position = 'relative';
      slide.style.display = 'inline-block';
      slide.style.verticalAlign = 'top';
    });

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;

      if (mask) {
        mask.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        mask.style.transition = 'transform 0.5s ease';
      }

      // Update nav dots
      if (slideNav) {
        var dots = slideNav.querySelectorAll('.w-slider-dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('w-active', i === currentIndex);
        });
      }
    }

    // Create nav dots
    if (slideNav) {
      slideNav.innerHTML = '';
      for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('div');
        dot.className = 'w-slider-dot' + (i === 0 ? ' w-active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', function () {
          goToSlide(parseInt(this.dataset.index));
        });
        slideNav.appendChild(dot);
      }
    }

    if (leftArrow) {
      leftArrow.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
      });
    }

    if (rightArrow) {
      rightArrow.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
      });
    }

    goToSlide(0);
  });

  // =========================================
  // 5. PRICING TABS
  // =========================================
  document.querySelectorAll('.w-tab-menu').forEach(function (tabMenu) {
    var tabLinks = tabMenu.querySelectorAll('.w-tab-link');
    var tabContent = tabMenu.closest('.w-tabs');
    if (!tabContent) return;
    var tabPanes = tabContent.querySelectorAll('.w-tab-pane');

    tabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetTab = link.getAttribute('data-w-tab');

        // Update active tab link
        tabLinks.forEach(function (l) {
          l.classList.remove('w--current');
        });
        link.classList.add('w--current');

        // Show correct pane
        tabPanes.forEach(function (pane) {
          if (pane.getAttribute('data-w-tab') === targetTab) {
            pane.classList.add('w--tab-active');
            pane.style.display = 'block';
          } else {
            pane.classList.remove('w--tab-active');
            pane.style.display = 'none';
          }
        });
      });
    });
  });

  // =========================================
  // 6. COUNTER ANIMATIONS (Scroll-triggered)
  // =========================================

  // Initialize BOTH counter groups to starting position
  document.querySelectorAll('.cta-counters').forEach(function (el) {
    el.style.transform = 'translate3d(0, 0%, 0)';
    el.style.willChange = 'transform';
  });

  function animateCounters() {
    var counterGroups = document.querySelectorAll('.cta-counters');

    counterGroups.forEach(function (group) {
      var rect = group.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (group.dataset.animated) return;
        group.dataset.animated = 'true';

        var targetY = -91;
        var duration = 1500;
        var start = performance.now();

        function animate(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = eased * targetY;

          group.style.transform = 'translate3d(0, ' + value + '%, 0)';

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
      }
    });
  }

  // Throttle scroll with rAF to prevent jitter
  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        animateCounters();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
  setTimeout(animateCounters, 300);

  // =========================================
  // 7. IX2 JITTER SMOOTHER
  // Intercepts Webflow IX2 abrupt opacity/transform changes
  // and applies smooth CSS transitions instead
  // =========================================
  (function () {
    // Elements that IX2 fades in — give them smooth transitions
    // so instead of popping in, they glide in
    var ix2Selectors = [
      '.success-title', '.choose-title', '.choose-para', '.choose-buttons',
      '.choose-card', '.choose-bottom', '.pricing-left', '.pricing-bottom',
      '.testimonials-top', '.testimonials-bottom', '.faq-top', '.cta-left',
      '.cta-card', '.cta-line', '.footer-top', '.footer-bottom',
      '.success-left', '.integration-left'
    ];

    ix2Selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        // Pre-apply transition so IX2 changes animate smoothly
        if (!el.style.transition || el.style.transition === '') {
          el.style.transition = 'opacity 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        el.style.willChange = 'opacity, transform';
      });
    });

    // Use MutationObserver to catch IX2 abrupt style injections
    // and smooth them out
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          var el = mutation.target;
          // If element has no transition, add one
          var style = el.style;
          if (style && !style.transition) {
            style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          }
        }
      });
    });

    // Observe the main content area
    var mainContent = document.querySelector('.page-wrapper') || document.body;
    observer.observe(mainContent, {
      attributes: true,
      attributeFilter: ['style'],
      subtree: true
    });
  })();

  // =========================================
  // 8. LIGHTBOX for video
  // =========================================
  document.querySelectorAll('.w-lightbox').forEach(function (lightbox) {
    lightbox.addEventListener('click', function (e) {
      e.preventDefault();
      var jsonEl = lightbox.querySelector('.w-json');
      if (!jsonEl) return;

      try {
        var data = JSON.parse(jsonEl.textContent);
        if (data.items && data.items[0] && data.items[0].url) {
          var overlay = document.createElement('div');
          overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:999999;display:flex;align-items:center;justify-content:center;cursor:pointer;';

          var iframe = document.createElement('iframe');
          iframe.src = data.items[0].url.replace('watch?v=', 'embed/');
          iframe.style.cssText = 'width:80vw;height:45vw;max-height:80vh;border:none;border-radius:12px;';
          iframe.setAttribute('allowfullscreen', 'true');
          iframe.setAttribute('allow', 'autoplay; fullscreen');

          overlay.appendChild(iframe);
          overlay.addEventListener('click', function (ev) {
            if (ev.target === overlay) {
              overlay.remove();
            }
          });

          // Close button
          var closeBtn = document.createElement('div');
          closeBtn.style.cssText = 'position:absolute;top:20px;right:20px;color:white;font-size:32px;cursor:pointer;width:40px;height:40px;display:flex;align-items:center;justify-content:center;';
          closeBtn.innerHTML = '&times;';
          closeBtn.addEventListener('click', function () {
            overlay.remove();
          });
          overlay.appendChild(closeBtn);

          document.body.appendChild(overlay);
        }
      } catch (err) {
        console.error('Lightbox error:', err);
      }
    });
  });

  // =========================================
  // 9. SMOOTH SCROLL for anchor links
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================
  // 10. NAVBAR SCROLL EFFECT
  // =========================================
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.style.backdropFilter = 'blur(12px)';
        navbar.style.webkitBackdropFilter = 'blur(12px)';
      } else {
        navbar.style.backdropFilter = '';
        navbar.style.webkitBackdropFilter = '';
      }
    }, { passive: true });
  }

  // =========================================
  // 11. Initialize Tab Panes visibility
  // =========================================
  document.querySelectorAll('.w-tab-pane').forEach(function (pane) {
    if (!pane.classList.contains('w--tab-active')) {
      pane.style.display = 'none';
    }
  });

  // =========================================
  // 12. Cart button (prevent default)
  // =========================================
  document.querySelectorAll('.cart-button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  console.log('Scale Studio - Site initialized successfully ✓');
});
