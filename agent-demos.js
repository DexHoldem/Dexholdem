(function () {
  const providerKeys = new Set(["bilibili", "youtube"]);

  document.querySelectorAll(".agent-demo-card").forEach((card) => {
    const iframe = card.querySelector("iframe[data-bilibili-src][data-youtube-src]");
    const buttons = Array.from(card.querySelectorAll("[data-video-provider]"));
    if (!iframe || buttons.length === 0) return;

    function setProvider(provider) {
      if (!providerKeys.has(provider)) return;

      const src = provider === "youtube" ? iframe.dataset.youtubeSrc : iframe.dataset.bilibiliSrc;
      if (src && iframe.getAttribute("src") !== src) {
        iframe.setAttribute("src", src);
      }

      iframe.dataset.provider = provider;
      buttons.forEach((button) => {
        const isActive = button.dataset.videoProvider === provider;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => setProvider(button.dataset.videoProvider));
    });

    setProvider(iframe.dataset.provider || "bilibili");
  });
})();
