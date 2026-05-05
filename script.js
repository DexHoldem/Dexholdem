const header = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 28);
}

function updateActiveNav() {
  const offset = window.scrollY + 140;
  let activeId = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= offset) {
      activeId = section.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
}

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveNav();
});

updateHeader();
updateActiveNav();

const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const leaderboardRows = Array.from(document.querySelectorAll("#leaderboard tbody tr"));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    leaderboardRows.forEach((row) => {
      const matches = filter === "all" || row.dataset.family === filter;
      row.classList.toggle("is-hidden", !matches);
    });
  });
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.innerText.trim());
      button.textContent = "Copied";
      button.classList.add("copied");
      window.setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("copied");
      }, 1600);
    } catch {
      button.textContent = "Select";
      target.focus?.();
    }
  });
});
