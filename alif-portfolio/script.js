/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   alif.dev — Portfolio JavaScript
   All animations, interactions, gallery modal, toasts, etc.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

// ── Global scroll observer (shared) ──
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });


// ── 0. Page Loader ──
(function initLoader() {
  const loader = document.getElementById('page-loader');
  const percentEl = document.getElementById('loader-percent');
  const barEl = document.getElementById('loader-bar');
  const statusEl = document.getElementById('loader-status');
  const arcEl = document.getElementById('loader-arc');
  const circumference = 2 * Math.PI * 52; // ~326.73
  const DURATION = 3000;

  // Lock scroll
  document.documentElement.style.overflow = 'hidden';

  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const pct = Math.min(elapsed / DURATION, 1);
    const eased = 1 - Math.pow(1 - pct, 3); // ease-out cubic
    const percent = Math.round(eased * 100);

    percentEl.textContent = percent;
    barEl.style.width = percent + '%';
    arcEl.setAttribute('stroke-dashoffset', String(circumference * (1 - eased)));

    if (pct < 1) {
      requestAnimationFrame(tick);
    } else {
      statusEl.textContent = 'Ready';
      setTimeout(() => {
        loader.classList.add('exit');
        document.documentElement.style.overflow = '';
        setTimeout(() => { loader.style.display = 'none'; }, 600);
      }, 500);
    }
  }

  requestAnimationFrame(tick);
})();

// ── 0.1 Feature Cards Mouse Trace ──
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ── 0.3 Magnetic Elements ──
document.querySelectorAll('.social-sidebar a, .nav-links a, .nav-hire').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});


// ── 1. Observe all existing scroll-animated elements ──
document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));


// ── 2. Parallax effect on content wrapper ──
(function initParallax() {
  const wrapper = document.getElementById('content-wrapper');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return;

  function onScroll() {
    const scrollY = window.scrollY;
    const y = Math.max(-120, (scrollY / 500) * -120);
    wrapper.style.transform = `translateY(${y}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

(function initHeroMouseParallax() {
  const hero = document.getElementById('top');
  const cards = document.querySelectorAll('.hero-card-float .hero-card-inner');
  const textStack = document.querySelector('.hero-text-stack');
  const blobs = document.querySelectorAll('.blob');

  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { width, height } = hero.getBoundingClientRect();
    const xPct = (clientX / width - 0.5) * 2; // -1 to 1
    const yPct = (clientY / height - 0.5) * 2; // -1 to 1

    // Parallax text
    textStack.style.transform = `translate3d(${xPct * 20}px, ${yPct * 20}px, 0) rotateY(${xPct * 5}deg) rotateX(${-yPct * 5}deg)`;

    // Parallax cards (more intense)
    cards.forEach((card, idx) => {
      const factor = (idx + 1) * 30;
      card.style.transform = `translate3d(${xPct * factor}px, ${yPct * factor}px, 50px) rotateY(${xPct * 10}deg) rotateX(${-yPct * 10}deg)`;
    });

    // Parallax blobs (slower, deeper)
    blobs.forEach((blob, idx) => {
      const factor = (idx + 1) * -40;
      blob.style.transform = `translate3d(${xPct * factor}px, ${yPct * factor}px, 0)`;
    });
  });

  // Reset on leave
  hero.addEventListener('mouseleave', () => {
    textStack.style.transform = '';
    cards.forEach(card => card.style.transform = '');
    blobs.forEach(blob => blob.style.transform = '');
  });
})();


// ── 3. Social Links — Mobile Toggle ──
(function initSocialMobile() {
  const btn = document.getElementById('social-mobile-btn');
  const backdrop = document.getElementById('social-mobile-backdrop');
  const list = document.getElementById('social-mobile-list');
  let open = false;

  function toggle() {
    open = !open;
    if (open) {
      btn.classList.add('active');
      backdrop.classList.add('show');
      list.classList.add('show');
    } else {
      btn.classList.remove('active');
      backdrop.classList.remove('show');
      list.classList.remove('show');
    }
  }

  btn.addEventListener('click', toggle);
  backdrop.addEventListener('click', toggle);
})();


// ── 4. Gallery — Bento Grid + Modal ──
(function initGallery() {
  const mediaItems = [
    { id: 1, type: 'image', title: 'Cat Coding', desc: '',
      url: 'Gallery/gallery1.webp', bgColor: '#cfc9bc', textColor: '#000000',
      span: 'bento-item md-col2 md-row2 sm-col2 sm-row2' },
    { id: 4, type: 'image', title: 'AI Exploration', desc: '',
      url: 'Gallery/fotonew1.jpg', bgColor: '#cd5842', textColor: '#ffffff',
      span: 'bento-item md-col2 md-row2 sm-col2 sm-row2', objectPosition: 'center' },
    { id: 2, type: 'video', title: 'UI Interaction', desc: '',
      url: 'Gallery/video4.mp4', bgColor: '#181818', textColor: '#ffffff',
      span: 'bento-item md-col1 md-row2 sm-col1 sm-row2' },
    { id: 3, type: 'video', title: 'Motion Design', desc: '',
      url: 'Gallery/vidnew1.mp4', bgColor: '#111215', textColor: '#ffffff',
      span: 'bento-item md-col1 md-row2 sm-col1 sm-row2' },
    { id: 5, type: 'video', title: 'Creative Reel', desc: '',
      url: 'Gallery/vidnew2.mp4', bgColor: '#dce0e3', textColor: '#000000',
      span: 'bento-item md-col1 md-row2 sm-col1 sm-row2' },
    { id: 6, type: 'image', title: 'Visual Quotes', desc: '',
      url: 'Gallery/gallery4.jpg', bgColor: '#f4f2ee', textColor: '#000000',
      span: 'bento-item md-col1 md-row2 sm-col1 sm-row2' },
    { id: 7, type: 'image', title: 'Web Experience', desc: '',
      url: 'Gallery/web_experience_v2.png', bgColor: '#2C3E50', textColor: '#ffffff',
      span: 'bento-item md-col2 md-row2 sm-col2 sm-row2' },
    { id: 8, type: 'image', title: 'Brand Identity', desc: '',
      url: 'Gallery/brand_identity_v2.png', bgColor: '#D2B48C', textColor: '#000000',
      span: 'bento-item md-col2 md-row2 sm-col1 sm-row2' },
  ];

  const grid = document.getElementById('bento-grid');
  const modalRoot = document.getElementById('gallery-modal-root');

  // Build grid items
  mediaItems.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'bento-item';
    div.style.animationDelay = (idx * 0.1) + 's';

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.url;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      // IntersectionObserver for autoplay
      const vObs = new IntersectionObserver(entries => {
        entries.forEach(e => { e.isIntersecting ? video.play().catch(() => {}) : video.pause(); });
      }, { threshold: 0.3 });
      vObs.observe(div);
      div.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.title;
      img.loading = 'lazy';
      if (item.objectPosition) {
        img.style.objectPosition = item.objectPosition;
      }
      div.appendChild(img);
    }

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'bento-overlay';
    overlay.innerHTML = `<div class="bento-title">${item.title}</div><div class="bento-desc">${item.desc}</div>`;
    div.appendChild(overlay);

    // Click to open modal
    div.addEventListener('click', () => openGalleryModal(item.id));

    grid.appendChild(div);
  });

  // Apply responsive grid spans
  applyGridSpans();
  window.addEventListener('resize', applyGridSpans);

  function applyGridSpans() {
    const items = grid.children;
    const w = window.innerWidth;
    const spanMap = mediaItems.map(item => item.span);

    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      const parts = spanMap[i].split(' ');
      let col = '', row = '';

      if (w >= 1024) {
        parts.forEach(p => {
          if (p.startsWith('md-col')) col = 'span ' + p.replace('md-col', '');
          if (p.startsWith('md-row')) row = 'span ' + p.replace('md-row', '');
        });
      } else if (w >= 640) {
        parts.forEach(p => {
          if (p.startsWith('sm-col')) col = 'span ' + p.replace('sm-col', '');
          if (p.startsWith('sm-row')) row = 'span ' + p.replace('sm-row', '');
        });
      }

      el.style.gridColumn = col || '';
      el.style.gridRow = row || '';
    }
  }

  // Gallery Modal
  let currentIdx = 0;

  let modalBackdrop;
  let modalContent;
  let mediaContainer;
  let infoContainer;
  let thumbsContainer;

  function openGalleryModal(itemId) {
    currentIdx = mediaItems.findIndex(m => m.id === itemId);
    
    modalRoot.innerHTML = '';
    
    modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'gallery-modal-backdrop';
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop || e.target === modalContent) closeModal();
    });

    modalContent = document.createElement('div');
    modalContent.className = 'gallery-modal';

    // Info Container
    infoContainer = document.createElement('div');
    infoContainer.className = 'modal-info';
    modalContent.appendChild(infoContainer);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', closeModal);
    modalContent.appendChild(closeBtn);

    // Media Wrapper
    mediaContainer = document.createElement('div');
    mediaContainer.className = 'modal-media';
    modalContent.appendChild(mediaContainer);

    // Thumbnails
    thumbsContainer = document.createElement('div');
    thumbsContainer.className = 'modal-thumbs no-scrollbar';
    
    mediaItems.forEach((m, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      if (m.type === 'video') {
        const tv = document.createElement('video');
        tv.src = m.url;
        tv.muted = true;
        tv.preload = 'metadata';
        thumb.appendChild(tv);
      } else {
        const ti = document.createElement('img');
        ti.src = m.url;
        ti.alt = m.title;
        thumb.appendChild(ti);
      }
      thumb.addEventListener('click', () => { 
        if (currentIdx !== i) {
          currentIdx = i;
          updateModalContent();
        }
      });
      thumbsContainer.appendChild(thumb);
    });
    modalContent.appendChild(thumbsContainer);

    modalBackdrop.appendChild(modalContent);
    modalRoot.appendChild(modalBackdrop);

    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', modalKeyHandler);

    updateModalContent();
  }

  function updateModalContent() {
    const item = mediaItems[currentIdx];

    // Fade out
    mediaContainer.style.opacity = '0';
    infoContainer.style.opacity = '0';

    if (item.bgColor) {
      modalContent.style.background = item.bgColor;
      modalContent.style.borderColor = item.bgColor; 
    }
    const isDarkText = item.textColor === '#000000';
    modalContent.style.setProperty('--clr-text', item.textColor);
    modalContent.style.setProperty('--clr-text-muted', isDarkText ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)');
    modalContent.style.setProperty('--btn-bg', isDarkText ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.15)');
    modalContent.style.setProperty('--btn-border', isDarkText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)');
    modalContent.style.setProperty('--btn-hover', isDarkText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.3)');
    modalContent.style.setProperty('--thumb-bg', isDarkText ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)');

    setTimeout(() => {
      infoContainer.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p>`;

      mediaContainer.innerHTML = '';
      if (item.type === 'video') {
        const v = document.createElement('video');
        v.src = item.url;
        v.controls = true;
        v.autoplay = true;
        v.muted = true;
        v.loop = true;
        v.style.maxWidth = '100%';
        v.style.maxHeight = '100%';
        mediaContainer.appendChild(v);
      } else {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.title;
        mediaContainer.appendChild(img);
      }

      mediaContainer.style.opacity = '1';
      infoContainer.style.opacity = '1';
    }, 250);

    Array.from(thumbsContainer.children).forEach((el, i) => {
      if (i === currentIdx) {
        el.classList.add('active');
        if (el.scrollIntoViewIfNeeded) { el.scrollIntoViewIfNeeded(); } 
        else { el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }
      } else {
        el.classList.remove('active');
      }
    });
  }

  function closeModal() {
    modalRoot.innerHTML = '';
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', modalKeyHandler);
  }

  function modalKeyHandler(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') { currentIdx = (currentIdx + 1) % mediaItems.length; renderModal(); }
    if (e.key === 'ArrowLeft') { currentIdx = (currentIdx - 1 + mediaItems.length) % mediaItems.length; renderModal(); }
  }
})();


// ── 5. Emoji Rating + Toast ──
(function initRating() {
  const ratingContainer = document.getElementById('emoji-rating');
  const labelEl = document.getElementById('emoji-label');
  const toastContainer = document.getElementById('toast-container');
  const buttons = ratingContainer.querySelectorAll('.emoji-btn');
  let activeRating = 0;

  const LABELS = ['', 'That bad, huh?', 'Room to improve', 'Pretty okay!', 'Glad you liked it!', 'You made my day! 🎉'];

  const TOASTS = {
    1: { type: 'error',   title: 'That bad, huh?',      content: "Sorry to hear that. Your honest feedback helps me improve." },
    2: { type: 'warning', title: 'Room to improve',      content: "Thanks for letting me know. I'll work on making it better!" },
    3: { type: 'help',    title: 'Pretty okay!',         content: "Good to know. Tell me what could make it even better." },
    4: { type: 'success', title: 'Glad you liked it!',   content: "Thanks for the kind rating. Much appreciated!" },
    5: { type: 'success', title: 'You made my day! 🎉', content: "Amazing! Thank you so much for the love." },
  };

  const ICONS = {
    help: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    success: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 12 10 15 17 8"/><polyline points="2 12 5 15 12 8" opacity="0.6"/></svg>`,
    warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`, // Lightning
    error: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>`, // Shield with X
  };

  const COLORS = {
    help:    { bg: '#f97316', blob: '#000000' }, // Orange
    success: { bg: '#0b9c51', blob: '#000000' },
    warning: { bg: '#f97316', blob: '#000000' }, // Orange
    error:   { bg: '#ef4444', blob: '#000000' }, // Pinkish-red
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const rating = parseInt(btn.dataset.rating);
      activeRating = rating;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const burst = document.createElement('span');
      burst.className = 'burst';
      btn.appendChild(burst);
      setTimeout(() => burst.remove(), 600);

      labelEl.textContent = LABELS[rating];
      labelEl.style.opacity = '1';
      labelEl.style.color = 'var(--clr-text)';

      showToast(TOASTS[rating]);
    });
  });

  function showToast(toast) {
    const el = document.createElement('div');
    el.className = 'toast';
    const c = COLORS[toast.type];
    el.style.setProperty('--toast-bg', c.bg);
    el.style.setProperty('--toast-blob', c.blob);

    el.innerHTML = `
      <svg class="toast-blob" viewBox="0 0 200 200" preserveAspectRatio="none" style="opacity: 0.15">
        <!-- Abstract splatter blob at bottom-left -->
        <path d="M0,200 L0,140 C10,135 25,145 35,120 C45,130 65,125 75,110 C80,115 95,115 105,105 C115,120 135,125 155,145 C145,155 150,170 165,175 C160,185 170,200 160,200 Z" />
        <circle cx="20" cy="120" r="4" />
        <circle cx="50" cy="140" r="3" />
        <circle cx="80" cy="160" r="5" />
        <circle cx="110" cy="180" r="6" />
        <circle cx="140" cy="190" r="2" />
        <circle cx="30" cy="180" r="4" />
      </svg>
      <div class="toast-icon">${ICONS[toast.type]}</div>
      <div class="toast-body">
        <div class="toast-title">${toast.title}</div>
        <div class="toast-content">${toast.content}</div>
      </div>
      <button class="toast-close-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      <div class="toast-timer" style="background:rgba(255,255,255,0.3); animation: timerShrink 4s linear forwards;"></div>
    `;

    el.querySelector('.toast-close-btn').addEventListener('click', () => dismissToast(el));

    el.addEventListener('mouseenter', () => {
      const timer = el.querySelector('.toast-timer');
      if (timer) timer.style.animationPlayState = 'paused';
    });
    el.addEventListener('mouseleave', () => {
      const timer = el.querySelector('.toast-timer');
      if (timer) timer.style.animationPlayState = 'running';
    });

    toastContainer.appendChild(el);
    setTimeout(() => dismissToast(el), 4200);
  }

  function dismissToast(el) {
    if (!el.parentNode) return;
    el.classList.add('exiting');
    setTimeout(() => el.remove(), 300);
  }
})();


// ── 6. Feature card hover micro-interactions ──
(function initFeatureInteractions() {
  document.querySelectorAll('.feature-bubble, .feature-badge, .feature-project-box').forEach(el => {
    el.addEventListener('click', function() {
      this.style.transform = 'scale(0.95) rotate(-2deg)';
      setTimeout(() => { this.style.transform = ''; }, 200);
    });
  });
})();


