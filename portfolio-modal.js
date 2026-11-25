
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  if (!cards.length) return;

  const modal = document.createElement("div");
  modal.className = "wex-video-modal";

  modal.innerHTML = `
    <div class="wex-video-panel">
      <button class="wex-video-close" aria-label="Close">&times;</button>

      <video controls playsinline preload="metadata">
        <source src="" type="video/mp4">
        Your browser does not support video playback.
      </video>

      <div class="wex-video-caption">WEXEN Project</div>
    </div>
  `;

  document.body.appendChild(modal);

  const video = modal.querySelector("video");
  const videoSource = modal.querySelector("video source");
  const closeButton = modal.querySelector(".wex-video-close");
  const caption = modal.querySelector(".wex-video-caption");

  const projects = [
    {
      video: "assets/01_website.mp4.mp4",
      title: "WEXEN — Website Development"
    },
    {
      video: "assets/02_app.mp4.mp4",
      title: "WEXEN — App Development"
    },
    {
      video: "assets/03_uiux.mp4.mp4",
      title: "WEXEN — UI/UX Design"
    },
    {
      video: "assets/04_branding.mp4.mp4",
      title: "WEXEN — Branding & Design"
    },
    {
      video: "assets/05_marketing.mp4.mp4.mp4",
      title: "WEXEN — Digital Marketing"
    },
    {
      video: "assets/06_ai_automation.mp4.mp4",
      title: "WEXEN — AI & Automation"
    },
    {
      video: "assets/07_ai_voice.mp4.mp4",
      title: "WEXEN — AI Voice Calling"
    },
    {
      video: "assets/08_chatbot.mp4.mp4",
      title: "WEXEN — AI Chatbots"
    },
    {
      video: "assets/09_business_automation.mp4.mp4",
      title: "WEXEN — Business Automation"
    }
  ];

  function openVideo(project) {
    video.pause();

    videoSource.src = project.video;
    caption.textContent = project.title;

    video.load();
    modal.classList.add("active");

    video.play().catch(() => {});
  }

  function closeVideo() {
    video.pause();
    video.currentTime = 0;
    modal.classList.remove("active");
  }

  cards.forEach((card, index) => {
    if (!projects[index]) return;

    card.addEventListener("click", () => {
      openVideo(projects[index]);
    });
  });

  closeButton.addEventListener("click", closeVideo);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeVideo();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVideo();
    }
  });
});
