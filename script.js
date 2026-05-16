(function() {
  'use strict';

  // ---------- 1. SLIDING TOP BANNER ROTATOR (3 messages) ----------
  const bannerSlides = document.querySelectorAll('.banner-slide');
  let currentBannerIndex = 0;
  let bannerRotationInterval;

  function showBannerSlide(index) {
    if (!bannerSlides.length) return;
    bannerSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextBannerSlide() {
    currentBannerIndex = (currentBannerIndex + 1) % bannerSlides.length;
    showBannerSlide(currentBannerIndex);
  }

  function startBannerRotation() {
    if (bannerRotationInterval) clearInterval(bannerRotationInterval);
    if (bannerSlides.length > 1) {
      bannerRotationInterval = setInterval(nextBannerSlide, 4600);
    }
  }

  // Initialize banner rotation
  if (bannerSlides.length) {
    startBannerRotation();
  }

  // Close banner functionality
  const closeBannerBtn = document.getElementById('closeBannerBtn');
  const topBannerDiv = document.getElementById('topBanner');
  if (closeBannerBtn && topBannerDiv) {
    closeBannerBtn.addEventListener('click', () => {
      topBannerDiv.style.display = 'none';
      if (bannerRotationInterval) clearInterval(bannerRotationInterval);
    });
  }

  // Pause rotation on hover for better UX
  if (topBannerDiv) {
    topBannerDiv.addEventListener('mouseenter', () => {
      if (bannerRotationInterval) clearInterval(bannerRotationInterval);
    });
    topBannerDiv.addEventListener('mouseleave', () => {
      if (topBannerDiv.style.display !== 'none') {
        startBannerRotation();
      }
    });
  }

  // ---------- 2. MOBILE MENU TOGGLE (hamburger) ----------
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  function closeMobileMenu() {
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (menuBtn) {
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    }
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when clicking on any nav link
    const allNavItems = document.querySelectorAll('.nav-links a, .dropdown-btn');
    allNavItems.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 880) {
          closeMobileMenu();
        }
      });
    });

    // Optional: close when clicking outside on mobile
    document.addEventListener('click', (event) => {
      if (window.innerWidth <= 880 && navLinks.classList.contains('active')) {
        if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
          closeMobileMenu();
        }
      }
    });
  }

  // ---------- 3. PLANT TEST (Green paradise / ticket to forest) ----------
  const plantTestButton = document.getElementById('plantTestBtn');
  if (plantTestButton) {
    plantTestButton.addEventListener('click', () => {
      const forestSpirits = [
        '🌲 Ancient Boreal Guardian (Spruce & Fir)',
        '🍂 Moonlit Temperate Storyteller (Maple Monarch)',
        '🌴 Tropical Canopy Dreamer (Fern & Monstera)',
        '🍎 Orchard Keeper (Apple & Pear)',
        '🌸 Cherry Blossom Wanderer (Sakura Spirit)',
        '🍃 Misty Cedar Elder (Cedar of Lebanon)',
        '🌳 Wise Oak Protector'
      ];
      const randomTree = forestSpirits[Math.floor(Math.random() * forestSpirits.length)];
      const userConfirmed = confirm('🌱 “The forest calls you.” Take the plant test and find your sacred tree twin?');
      if (userConfirmed) {
        alert(`✨ Your forest companion: ${randomTree} ✨\n“Collect moments, not things — bring home the magic.” Visit our catalog to welcome it.`);
        // Optional: log to console for fun
        console.log(`[Forest Test] User matched with: ${randomTree}`);
      } else {
        alert('Stay wild! Explore our tree categories to find your connection with nature 🌲');
      }
    });
  }

  // ---------- 4. SHOP ALL BUTTONS (both header & main) ----------
  const shopAllMain = document.getElementById('shopAllBtnMain');
  const shopAllHeader = document.getElementById('shopAllHeaderLink');

  function handleShopAll(e) {
    if (e) e.preventDefault();
    alert('🌳 Step into our full forest collection — from boreal pines to tropical blooms. Every tree tells a story. 🌿');
  }

  if (shopAllMain) shopAllMain.addEventListener('click', handleShopAll);
  if (shopAllHeader) shopAllHeader.addEventListener('click', handleShopAll);

  // ---------- 5. CART ICON INTERACTION ----------
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🛒 Your forest cart awaits! Add trees that capture the call of the wild. Start your green journey 🌱');
    });
  }

  // ---------- 6. FOREST STORIES BUTTON (Learn More) ----------
  const forestLearnBtn = document.getElementById('forestLearnBtn');
  if (forestLearnBtn) {
    forestLearnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🌍 Boreal, Temperate, Tropical — each forest ecosystem holds unique life. Our mission: reforest, educate, and grow a greener tomorrow. Join our rewilding movement!');
    });
  }

  // ---------- 7. NEWSLETTER SUBSCRIPTION (FOOTER) ----------
  const subscribeBtn = document.getElementById('subscribeBtn');
  const emailInput = document.getElementById('footerEmail');

  if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', () => {
      const emailValue = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (emailValue && emailPattern.test(emailValue)) {
        alert(`🌲 Thank you, ${emailValue}! You're now part of the Roots & Revelry canopy. Expect forest stories, seasonal tips, and exclusive offers.`);
        emailInput.value = '';
      } else {
        alert('🌿 Please enter a valid email address to receive forest wisdom and nursery updates.');
      }
    });
  }

  // ---------- 8. CATEGORY CARDS INTERACTION (Forest wonder) ----------
  const categoryCards = document.querySelectorAll('.card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const categoryTitle = card.querySelector('h3')?.innerText || 'Tree collection';
      alert(`🍃 “${categoryTitle}” — rooted in ancient forest wisdom. Discover our selection and bring the wilderness home. 🌳`);
    });
  });

  // ---------- 9. DYNAMIC COPYRIGHT YEAR ----------
  const footerBottomPara = document.querySelector('.footer-bottom p');
  if (footerBottomPara) {
    const currentYear = new Date().getFullYear();
    // avoid duplicate year insertion
    if (!footerBottomPara.innerHTML.includes(currentYear.toString())) {
      footerBottomPara.innerHTML = `© ${currentYear} Roots and Revelry — Inspired by forests, driven by wonder.`;
    } else {
      // update existing year
      footerBottomPara.innerHTML = footerBottomPara.innerHTML.replace(/\d{4}/, currentYear);
    }
  } else {
    const yearSpan = document.getElementById('dynamicYear');
    if (yearSpan) yearSpan.innerText = new Date().getFullYear();
  }

  // ---------- 10. ADD SMOOTH SCROLL FOR INTERNAL ANCHORS (optional) ----------
  const allInternalLinks = document.querySelectorAll('a[href^="#"]');
  allInternalLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && targetId !== '#!') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---------- 11. FOREST THEME: subtle hover effect on hero section (icon pulse) ----------
  const heroIcons = document.querySelectorAll('.hero-sub i');
  heroIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.1)';
      icon.style.transition = 'transform 0.2s';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1)';
    });
  });

  // 12. Prevent dropdown closing issues on mobile (already handled)
  console.log('🌿 Roots & Revelry — Forest theme active. Collect moments, not things.');
})();