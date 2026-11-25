
/* =====================================
   WEXEN - MAIN JAVASCRIPT
   WhatsApp + Email Integration
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(navLinks.classList.contains("active"))
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. FOOTER YEAR
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. SCROLL REVEAL ANIMATION
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // 4. CONTACT FORM - WHATSAPP + EMAIL
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async event => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const submitButton = contactForm.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      const formData = new FormData(contactForm);

      const name = formData.get("name")?.trim() || "";
      const email = formData.get("email")?.trim() || "";
      const phone = formData.get("phone")?.trim() || "";
      const service = formData.get("service")?.trim() || "";
      const message = formData.get("message")?.trim() || "";

      // Prepare WhatsApp message
      const whatsappMessage = [
        "NEW WEXEN WEBSITE ENQUIRY",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        `Message: ${message}`
      ].join("\n");

      const whatsappURL =
        "https://wa.me/917207893116?text=" +
        encodeURIComponent(whatsappMessage);

      // Open WhatsApp tab during the form submission click
      const whatsappWindow = window.open("about:blank", "_blank");

      if (whatsappWindow) {
        whatsappWindow.opener = null;
      }

      if (formStatus) {
        formStatus.textContent = "Sending your enquiry...";
        formStatus.style.color = "#35d6ff";
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      // Prepare email submission
      const emailData = {
        name: name,
        email: email,
        phone: phone,
        service: service,
        message: message,
        _subject: "New WEXEN Website Enquiry",
        _replyto: email,
        _template: "table"
      };

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/contact.wexen@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(emailData)
          }
        );

        const result = await response.json();

        if (String(result.success) !== "true") {
          throw new Error(result.message || "Email submission failed.");
        }

        if (whatsappWindow) {
          whatsappWindow.location.href = whatsappURL;
        }

        if (formStatus) {
          formStatus.textContent =
            "Email submitted successfully! WhatsApp is open too. Please press Send in WhatsApp.";
          formStatus.style.color = "#35d6ff";
        }

      } catch (error) {
        if (whatsappWindow) {
          whatsappWindow.location.href = whatsappURL;
        }

        if (formStatus) {
          formStatus.textContent =
            "WhatsApp is open. Email could not be submitted. Please try again or contact us by email.";
          formStatus.style.color = "#ffb454";
        }

        console.error("WEXEN form error:", error);

      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }
      }
    });
  }

});



/* SEAMLESS PORTFOLIO CARD DUPLICATION */

document.querySelectorAll(".project-row").forEach((row) => {
    if (row.dataset.loopReady === "true") return;

    const originalCards = Array.from(row.children);

    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.remove("reveal");
        clone.setAttribute("aria-hidden", "true");
        row.appendChild(clone);
    });

    row.dataset.loopReady = "true";
});
