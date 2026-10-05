/**
 * Main Application Logic - Hrithik Sarkar Portfolio
 * Controls interactions, audio synthesis, theme switcher, project rendering, modals, and forms.
 */

// 1. Futuristic Web Audio API Sound Synthesizer
class SoundFX {
  constructor() {
    this.enabled = localStorage.getItem("hrithik_portfolio_audio") === "true";
    this.ctx = null;
    this.updateToggleUI();
  }

  initContext() {
    if (!this.ctx && typeof AudioContext !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem("hrithik_portfolio_audio", this.enabled);
    this.updateToggleUI();
    if (this.enabled) {
      this.play("click");
    }
  }

  updateToggleUI() {
    const btn = document.getElementById("audio-toggle-btn");
    if (btn) {
      btn.innerHTML = this.enabled 
        ? `<i class="ph ph-speaker-high"></i> <span>Audio: ON</span>` 
        : `<i class="ph ph-speaker-slash"></i> <span>Audio: OFF</span>`;
      btn.classList.toggle("active", this.enabled);
    }
  }

  play(type) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "hover") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "open") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "close") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "receive") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "send") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  }
}

window.soundFX = new SoundFX();

// 2. Global State & DOM Setup
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Neural Particle Canvas
  const neuralCanvas = new NeuralCanvas("neural-canvas");

  // Initialize Theme Accent Selector
  initThemeSwitcher(neuralCanvas);

  // Initialize Projects Gallery
  initProjectsGallery();

  // Initialize Skills Matrix
  initSkillsMatrix();

  // Initialize Modals (Project & Resume)
  initModals();

  // Initialize Metrics Counter
  initMetricsCounter();

  // Initialize Contact & Clipboard
  initContactFeatures();

  // Smooth Back-to-Top and Brand Logo click
  document.querySelectorAll('a[href="#top"], .brand-logo, #footer-back-to-top').forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Floating Quick-Contact Dock Trigger
  const dockFormBtn = document.getElementById("dock-contact-trigger");
  if (dockFormBtn) {
    dockFormBtn.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const nameInput = document.getElementById("contact-name");
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  }

  // Freelance Hero CTA Smooth Flow
  const freelanceCta = document.getElementById("hero-freelance-cta");
  if (freelanceCta) {
    freelanceCta.addEventListener("click", (e) => {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        const typeSelect = document.getElementById("contact-type");
        if (typeSelect) {
          typeSelect.value = "Freelance Project";
        }
        setTimeout(() => {
          const nameInput = document.getElementById("contact-name");
          if (nameInput) nameInput.focus();
        }, 600);
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      window.soundFX.play("click");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Active Navigation link on scroll
  initScrollSpy();
});

// 3. Theme Switcher Engine
function initThemeSwitcher(neuralCanvas) {
  const root = document.documentElement;
  const themeBtns = document.querySelectorAll(".theme-color-btn");
  const savedTheme = localStorage.getItem("hrithik_portfolio_theme") || "cyan";

  const themes = {
    cyan: {
      accent: "#00f0ff",
      accentGlow: "rgba(0, 240, 255, 0.4)",
      accentDim: "rgba(0, 240, 255, 0.12)",
      gradient: "linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)"
    },
    violet: {
      accent: "#a855f7",
      accentGlow: "rgba(168, 85, 247, 0.4)",
      accentDim: "rgba(168, 85, 247, 0.12)",
      gradient: "linear-gradient(135deg, #c084fc 0%, #7e22ce 100%)"
    },
    emerald: {
      accent: "#10b981",
      accentGlow: "rgba(16, 185, 129, 0.4)",
      accentDim: "rgba(16, 185, 129, 0.12)",
      gradient: "linear-gradient(135deg, #34d399 0%, #059669 100%)"
    },
    amber: {
      accent: "#f59e0b",
      accentGlow: "rgba(245, 158, 11, 0.4)",
      accentDim: "rgba(245, 158, 11, 0.12)",
      gradient: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)"
    }
  };

  function applyTheme(name) {
    const t = themes[name] || themes.cyan;
    root.style.setProperty("--accent-primary", t.accent);
    root.style.setProperty("--accent-glow", t.accentGlow);
    root.style.setProperty("--accent-dim", t.accentDim);
    root.style.setProperty("--accent-gradient", t.gradient);

    themeBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-theme") === name);
    });

    if (neuralCanvas) {
      neuralCanvas.setThemeColor(name);
    }
    localStorage.setItem("hrithik_portfolio_theme", name);
  }

  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme");
      applyTheme(theme);
      window.soundFX.play("click");
    });
  });

  applyTheme(savedTheme);
}

// 4. Projects Gallery & Filter Engine
function initProjectsGallery() {
  const container = document.getElementById("projects-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("project-search-input");
  if (!container || !PROJECTS_DATA) return;

  let currentCategory = "all";
  let searchQuery = "";

  function render() {
    container.innerHTML = "";

    const filtered = PROJECTS_DATA.filter(p => {
      const matchCat = currentCategory === "all" || p.category === currentCategory;
      const matchSearch = searchQuery === "" || 
        p.title.toLowerCase().includes(searchQuery) ||
        p.tagline.toLowerCase().includes(searchQuery) ||
        p.summary.toLowerCase().includes(searchQuery) ||
        p.stack.some(s => s.toLowerCase().includes(searchQuery));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-projects-state">
          <i class="ph ph-magnifying-glass"></i>
          <p>No projects match "${searchQuery}".</p>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('project-search-input').value=''; document.getElementById('project-search-input').dispatchEvent(new Event('input'));">Clear Search</button>
        </div>
      `;
      return;
    }

    filtered.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "project-card glass-panel";
      card.style.animationDelay = `${index * 0.08}s`;

      const stackBadges = project.stack.slice(0, 4).map(tech => 
        `<span class="tech-badge">${tech}</span>`
      ).join("");

      const metricsList = project.metrics.slice(0, 3).map(m => `
        <div class="project-metric-item">
          <span class="m-val">${m.value}</span>
          <span class="m-lbl">${m.label}</span>
        </div>
      `).join("");

      card.innerHTML = `
        <div class="project-media-wrapper" data-project-id="${project.id}">
          <img src="${project.image}" alt="${project.title} live screenshot" class="project-img" loading="lazy"/>
          <div class="project-overlay">
            <span class="inspect-pill"><i class="ph ph-code"></i> Deep Architecture Specs</span>
          </div>
          <span class="project-category-badge">${project.categoryLabel}</span>
          <span class="project-status-dot"></span>
        </div>
        <div class="project-body">
          <div class="project-header">
            <h3 class="project-title" data-project-id="${project.id}">${project.title}</h3>
            <span class="project-live-badge">${project.badge}</span>
          </div>
          <p class="project-tagline">${project.tagline}</p>
          <p class="project-summary">${project.summary}</p>
          
          <div class="project-metrics-row">
            ${metricsList}
          </div>

          <div class="project-stack-pills">
            ${stackBadges}
            ${project.stack.length > 4 ? `<span class="tech-badge tech-more">+${project.stack.length - 4}</span>` : ""}
          </div>

          <div class="project-footer-actions">
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm project-live-link">
              <span>Visit Live Website</span>
              <i class="ph ph-arrow-up-right"></i>
            </a>
            <button class="btn btn-ghost btn-sm inspect-btn" data-project-id="${project.id}">
              <i class="ph ph-info"></i>
              <span>Details</span>
            </button>
          </div>
        </div>
      `;

      // Modal open listeners
      card.querySelector(".project-media-wrapper").addEventListener("click", () => {
        openProjectModal(project.id);
      });
      card.querySelector(".project-title").addEventListener("click", () => {
        openProjectModal(project.id);
      });
      card.querySelector(".inspect-btn").addEventListener("click", () => {
        openProjectModal(project.id);
      });

      container.appendChild(card);
    });

    updateProjectCounts();
  }

  function updateProjectCounts() {
    const heroCounter = document.getElementById("hero-project-counter");
    if (heroCounter) {
      heroCounter.setAttribute("data-target", PROJECTS_DATA.length);
      heroCounter.textContent = PROJECTS_DATA.length;
    }
    const filterCount = document.getElementById("all-projects-count");
    if (filterCount) {
      filterCount.textContent = `${PROJECTS_DATA.length}+`;
    }
  }

  window.refreshProjectsView = () => {
    render();
    updateProjectCounts();
  };

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      window.soundFX.play("click");
      render();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      render();
    });
  }

  render();
}

// 5. Skills Matrix Renderer
function initSkillsMatrix() {
  const container = document.getElementById("skills-container");
  if (!container || !TECH_SKILLS) return;

  container.innerHTML = "";

  TECH_SKILLS.forEach(cat => {
    const card = document.createElement("div");
    card.className = "skill-category-card glass-panel";

    const skillsHtml = cat.skills.map(s => `
      <div class="skill-item">
        <div class="skill-header">
          <span class="skill-name">${s.name}</span>
          <span class="skill-tag">${s.tag}</span>
        </div>
        <div class="skill-bar-wrapper">
          <div class="skill-bar-fill" style="width: ${s.level}%;"></div>
        </div>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="skill-cat-header">
        <div class="skill-icon-wrap">
          <i class="ph ph-${cat.icon}"></i>
        </div>
        <h4 class="skill-cat-title">${cat.category}</h4>
      </div>
      <div class="skill-list">
        ${skillsHtml}
      </div>
    `;

    container.appendChild(card);
  });
}

// 6. Modals Controller
function initModals() {
  const projectModal = document.getElementById("project-modal");
  const resumeModal = document.getElementById("resume-modal");

  // Project Modal Close
  document.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach(btn => {
    btn.addEventListener("click", () => {
      closeAllModals();
    });
  });

  // Resume Open Buttons
  document.querySelectorAll(".open-resume-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  // Print Resume Button
  const printBtn = document.getElementById("print-resume-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Close with Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });
}

function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const body = document.getElementById("project-modal-body");
  if (!modal || !body) return;

  const metricsHtml = project.metrics.map(m => `
    <div class="modal-metric-card">
      <span class="modal-m-val">${m.value}</span>
      <span class="modal-m-lbl">${m.label}</span>
    </div>
  `).join("");

  const highlightsHtml = project.highlights.map(h => `
    <li><i class="ph ph-check-circle"></i> <span>${h}</span></li>
  `).join("");

  const stackHtml = project.stack.map(s => `
    <span class="tech-badge">${s}</span>
  `).join("");

  body.innerHTML = `
    <div class="modal-hero-cover">
      <img src="${project.image}" alt="${project.title}" class="modal-cover-img"/>
      <div class="modal-cover-overlay">
        <span class="project-category-badge">${project.categoryLabel}</span>
        <h2 class="modal-project-title">${project.title}</h2>
        <p class="modal-project-tagline">${project.tagline}</p>
      </div>
    </div>

    <div class="modal-content-grid">
      <div class="modal-main-column">
        <div class="modal-section">
          <h4 class="modal-sec-title"><i class="ph ph-cpu"></i> System Overview</h4>
          <p class="modal-description">${project.summary}</p>
        </div>

        <div class="modal-section">
          <h4 class="modal-sec-title"><i class="ph ph-chart-line-up"></i> Key Engineering Highlights</h4>
          <ul class="modal-highlights-list">
            ${highlightsHtml}
          </ul>
        </div>

        <div class="modal-section">
          <h4 class="modal-sec-title"><i class="ph ph-stack"></i> Architectural Details</h4>
          <div class="modal-arch-specs glass-panel">
            <div class="arch-row">
              <span class="arch-k">Framework & Logic:</span>
              <span class="arch-v">${project.architectureDetails.framework || "Modern Full-Stack Architecture"}</span>
            </div>
            <div class="arch-row">
              <span class="arch-k">Rendering & Speed:</span>
              <span class="arch-v">${project.architectureDetails.rendering || project.architectureDetails.frontend || "Server-rendered & CDN Cached"}</span>
            </div>
            <div class="arch-row">
              <span class="arch-k">Infrastructure:</span>
              <span class="arch-v">${project.architectureDetails.infrastructure || project.architectureDetails.hosting || "Vercel / Cloud Edge"}</span>
            </div>
            <div class="arch-row">
              <span class="arch-k">Key Features:</span>
              <span class="arch-v">${project.architectureDetails.features || "Responsive, Interactive, Accessible"}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-sidebar-column">
        <div class="modal-metrics-box glass-panel">
          <h4 class="modal-sidebar-title">Performance Metrics</h4>
          <div class="modal-metrics-grid">
            ${metricsHtml}
          </div>
        </div>

        <div class="modal-tech-box glass-panel">
          <h4 class="modal-sidebar-title">Technology Stack</h4>
          <div class="modal-tech-pills">
            ${stackHtml}
          </div>
        </div>

        <div class="modal-action-box">
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">
            <span>Launch Live Deployment</span>
            <i class="ph ph-arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  window.soundFX.play("open");
}

function openResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (!modal) return;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  window.soundFX.play("open");
}

function closeAllModals() {
  document.querySelectorAll(".modal-container.open").forEach(m => {
    m.classList.remove("open");
  });
  document.body.style.overflow = "";
  window.soundFX.play("close");
}

// 7. Animated Metrics Counter
function initMetricsCounter() {
  const counters = document.querySelectorAll(".counter-val");
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute("data-target"));
      const isDecimal = target % 1 !== 0;
      const duration = 1600;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeProgress;

        if (isDecimal) {
          counter.textContent = currentVal.toFixed(2);
        } else {
          counter.textContent = Math.floor(currentVal);
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = isDecimal ? target.toFixed(2) : target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounters();
      }
    });
  }, { threshold: 0.2 });

  const metricsSection = document.getElementById("impact-metrics");
  if (metricsSection) {
    observer.observe(metricsSection);
  } else {
    runCounters();
  }
}

// 8. Contact & Clipboard Hub
function initContactFeatures() {
  // One-click copy email
  const copyEmailBtns = document.querySelectorAll(".copy-email-btn");
  copyEmailBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      copyToClipboard("hrithiksarkar04@gmail.com", "Email copied to clipboard: hrithiksarkar04@gmail.com");
    });
  });

  // Contact Form with Free Direct Email Delivery via FormSubmit AJAX
  const contactForm = document.getElementById("portfolio-contact-form");
  const formSuccess = document.getElementById("contact-form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
      
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const projectType = document.getElementById("contact-type").value;
      const message = document.getElementById("contact-message").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.", "error");
        return;
      }

      // Store in localStorage as offline backup
      try {
        const submissions = JSON.parse(localStorage.getItem("hrithik_contact_messages") || "[]");
        submissions.push({
          name,
          email,
          projectType,
          message,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem("hrithik_contact_messages", JSON.stringify(submissions));
      } catch (err) {
        console.warn("Local storage write error:", err);
      }

      // Visual sending indicator
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Transmitting Message...</span>
          <i class="ph ph-circle-notch" style="animation: spin 1s linear infinite;"></i>
        `;
      }

      const mailtoUrl = `mailto:hrithiksarkar04@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${projectType} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`)}`;

      try {
        const response = await fetch("https://formsubmit.co/ajax/hrithiksarkar04@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            projectType: projectType,
            message: message,
            _subject: `[Portfolio Inquiry] ${projectType} from ${name}`,
            _template: "table"
          })
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok && (result.success === "true" || result.success === true)) {
          contactForm.reset();
          if (formSuccess) {
            formSuccess.classList.remove("hidden");
            formSuccess.innerHTML = `
              <div class="success-box glass-panel" style="margin-top: 18px; border-left: 4px solid #10b981; padding: 18px;">
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <i class="ph ph-check-circle" style="font-size: 1.8rem; color: #10b981; flex-shrink: 0; margin-top: 2px;"></i>
                  <div>
                    <strong style="color: #10b981; font-size: 1.05rem;">Message Sent Directly to Hrithik's Inbox!</strong>
                    <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
                      Thank you <strong>${name}</strong>. Your message has been dispatched to <strong>hrithiksarkar04@gmail.com</strong>. Hrithik usually reviews and responds to inquiries within a few hours.
                    </p>
                  </div>
                </div>
              </div>
            `;
          }
          showToast("Message sent directly to Hrithik!", "success");
          window.soundFX.play("receive");
        } else if (result.message && result.message.toLowerCase().includes("activation")) {
          contactForm.reset();
          if (formSuccess) {
            formSuccess.classList.remove("hidden");
            formSuccess.innerHTML = `
              <div class="success-box glass-panel" style="margin-top: 18px; border-left: 4px solid #f59e0b; padding: 18px;">
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <i class="ph ph-envelope-simple" style="font-size: 1.8rem; color: #f59e0b; flex-shrink: 0; margin-top: 2px;"></i>
                  <div>
                    <strong style="color: #f59e0b; font-size: 1.05rem;">One-Time Activation Link Sent!</strong>
                    <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
                      FormSubmit sent an initial activation email to <strong>hrithiksarkar04@gmail.com</strong>. Please check your inbox and click <em>'Activate Form'</em>. Once clicked, all future submissions will arrive instantly without any confirmation!
                    </p>
                  </div>
                </div>
              </div>
            `;
          }
          showToast("One-time activation email sent to your inbox!", "info");
        } else {
          throw new Error(result.message || "FormSubmit server returned error");
        }
      } catch (err) {
        console.warn("Direct form submission fallback:", err);
        if (formSuccess) {
          formSuccess.classList.remove("hidden");
          formSuccess.innerHTML = `
            <div class="success-box glass-panel" style="margin-top: 18px; border-left: 4px solid var(--accent-primary); padding: 18px;">
              <div style="display: flex; gap: 14px; align-items: flex-start;">
                <i class="ph ph-paper-plane-tilt" style="font-size: 1.8rem; color: var(--accent-primary); flex-shrink: 0; margin-top: 2px;"></i>
                <div>
                  <strong style="color: var(--text-highlight);">Message Prepared!</strong>
                  <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
                    Your message was recorded. Click below to instantly send it via your default email client:
                  </p>
                  <a href="${mailtoUrl}" class="btn btn-secondary btn-sm mt-3" style="display: inline-flex; margin-top: 10px;">
                    <i class="ph ph-arrow-up-right"></i> Open Email App Direct
                  </a>
                </div>
              </div>
            </div>
          `;
        }
        showToast("Message recorded! Click 'Open Email App Direct' if needed.", "info");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }
}

function copyToClipboard(text, message) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message, "success");
      window.soundFX.play("click");
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
  showToast(message, "success");
  window.soundFX.play("click");
}

function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type} glass-panel`;
  toast.innerHTML = `
    <i class="ph ph-${type === "success" ? "check-circle" : type === "error" ? "warning-circle" : "info"}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// 9. ScrollSpy for Navigation Links
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

// 10. Project Admin Studio (Deactivated for production stability)
function initAdminStudio() {}
