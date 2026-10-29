/**
 * ClearSky Web Design - Script
 * High performance, accessible, responsive behaviors
 */

// =============================================================================
// 1. CONFIGURATION SETTINGS
// =============================================================================

/**
 * Facebook Messenger URL setting.
 * To enable the Messenger button, replace 'YOUR_FACEBOOK_PAGE_USERNAME' with
 * your actual Facebook page username or slug (e.g., 'https://m.me/ClearSkyHVACWebsites').
 *
 * If left as the placeholder, the Messenger button remains hidden and
 * only direct email contact is displayed.
 */
const FACEBOOK_MESSENGER_URL = "https://m.me/YOUR_FACEBOOK_PAGE_USERNAME";

/**
 * Recipient business owner email address
 */
const OWNER_EMAIL = "csinput@gmail.com";


// =============================================================================
// 2. INITIALIZATION ON DOM CONTENT LOADED
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initCopyrightYear();
  initMessengerButton();
  initMobileNavigation();
  initContactForm();
  initHeroVideo();
  initStickyContactBar();
});


// =============================================================================
// 3. COPYRIGHT YEAR
// =============================================================================
function initCopyrightYear() {
  const yearElement = document.getElementById("copyrightYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}


// =============================================================================
// 4. MESSENGER BUTTON VISIBILITY
// =============================================================================
function initMessengerButton() {
  const container = document.getElementById("messengerContainer");
  const button = document.getElementById("messengerBtn");

  if (!container || !button) return;

  // Determine if URL is a placeholder or unconfigured
  const isPlaceholder = 
    !FACEBOOK_MESSENGER_URL ||
    FACEBOOK_MESSENGER_URL.includes("YOUR_FACEBOOK_PAGE_USERNAME") ||
    FACEBOOK_MESSENGER_URL.trim() === "https://m.me/" ||
    FACEBOOK_MESSENGER_URL.trim() === "";

  if (!isPlaceholder) {
    button.setAttribute("href", FACEBOOK_MESSENGER_URL.trim());
    container.removeAttribute("hidden");
  } else {
    // Keep Messenger button completely hidden and leave email visible
    container.setAttribute("hidden", "true");
  }
}


// =============================================================================
// 5. MOBILE NAVIGATION TOGGLE
// =============================================================================
function initMobileNavigation() {
  const toggleBtn = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  const navLinks = document.querySelectorAll(".nav-link, .header-action a");

  if (!toggleBtn || !nav) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : toggleBtn.getAttribute("aria-expanded") !== "true";
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    nav.classList.toggle("is-open", isOpen);
  };

  toggleBtn.addEventListener("click", () => toggleMenu());

  // Close mobile nav when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu(false);
    });
  });

  // Close when pressing Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });

  // Close when clicking outside of header
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}


// =============================================================================
// 6. CONTACT FORM VALIDATION & MAILTO PREPARATION
// =============================================================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const businessInput = document.getElementById("contactBusiness");
  const locationInput = document.getElementById("contactLocation");
  const needSelect = document.getElementById("contactNeed");
  const detailsTextarea = document.getElementById("contactDetails");
  const formAlert = document.getElementById("formAlert");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");

  if (!form || !nameInput || !emailInput) return;

  // Clear errors on input
  nameInput.addEventListener("input", () => clearFieldError(nameInput, nameError));
  emailInput.addEventListener("input", () => clearFieldError(emailInput, emailError));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    hideFormAlert();

    // Validate Name
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      setFieldError(nameInput, nameError, "Please enter your name.");
      isValid = false;
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      setFieldError(emailInput, emailError, "Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(emailVal)) {
      setFieldError(emailInput, emailError, "Please enter a valid email address (e.g. name@domain.com).");
      isValid = false;
    }

    if (!isValid) {
      // Focus on first invalid input
      if (!nameVal) {
        nameInput.focus();
      } else {
        emailInput.focus();
      }
      return;
    }

    // Gather form values
    const businessVal = businessInput ? businessInput.value.trim() : "";
    const locationVal = locationInput ? locationInput.value.trim() : "";
    const needVal = needSelect ? needSelect.value : "A new website";
    const detailsVal = detailsTextarea ? detailsTextarea.value.trim() : "";

    // Build pre-addressed email
    const subject = `Website Review Request - ${businessVal || nameVal}`;
    const bodyContent = [
      `Hi ClearSky Web Design,`,
      ``,
      `I'd like to request a website review for my HVAC business. Here are my details:`,
      ``,
      `• Name: ${nameVal}`,
      `• Business Name: ${businessVal || "Not provided"}`,
      `• Email: ${emailVal}`,
      `• City and State: ${locationVal || "Not provided"}`,
      `• Need: ${needVal}`,
      ``,
      `• Business Details:`,
      `${detailsVal || "None provided"}`,
      ``,
      `Looking forward to hearing from you.`
    ].join("\n");

    const mailtoUrl = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

    // Display honest feedback note (no false "message sent" confirmation)
    showFormAlert(
      `Your email app has been prompted to open with your message details pre-filled. If your email application did not launch automatically, <a href="${mailtoUrl}" class="direct-email-link">click here to open it directly</a>, or email me at <a href="mailto:${OWNER_EMAIL}" class="direct-email-link">${OWNER_EMAIL}</a>.`,
      "alert-info"
    );

    // Open user's email client
    window.location.href = mailtoUrl;
  });

  function setFieldError(input, errorElement, message) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearFieldError(input, errorElement) {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  function showFormAlert(htmlContent, alertClass) {
    if (!formAlert) return;
    formAlert.className = `form-alert ${alertClass}`;
    formAlert.innerHTML = htmlContent;
    formAlert.removeAttribute("hidden");
  }

  function hideFormAlert() {
    if (!formAlert) return;
    formAlert.setAttribute("hidden", "true");
    formAlert.innerHTML = "";
  }

  function isValidEmail(email) {
    // Standard robust email pattern
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
  }
}


// =============================================================================
// 7. HERO VIDEO & REDUCED MOTION HANDLING
// =============================================================================
function initHeroVideo() {
  const video = document.getElementById("heroVideo");
  if (!video) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const handleMotionPreference = () => {
    if (motionQuery.matches) {
      video.pause();
      video.removeAttribute("autoplay");
    } else {
      // Attempt playback if allowed
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Playback might be blocked or file not yet loaded; CSS handles fallback gracefully
        });
      }
    }
  };

  handleMotionPreference();

  // Listen for user motion preference changes
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", handleMotionPreference);
  } else if (motionQuery.addListener) {
    motionQuery.addListener(handleMotionPreference);
  }
}


// =============================================================================
// 8. MOBILE STICKY CONTACT BAR VISIBILITY
// =============================================================================
function initStickyContactBar() {
  const stickyBar = document.getElementById("mobileStickyBar");
  const contactSection = document.getElementById("contact");

  if (!stickyBar || !contactSection) return;

  // When user is viewing the contact section, hide the sticky button to avoid covering the form
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stickyBar.classList.add("is-hidden");
          } else {
            stickyBar.classList.remove("is-hidden");
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(contactSection);
  }
}
