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

const policyDemoVideos = [
  { id: "act_pick_up_right_fail", model: "ACT", family: "Task-trained", task: "Pick up right card", condition: "Standard", outcome: "Fail" },
  { id: "act_pull_100_disruptive_fail", model: "ACT", family: "Task-trained", task: "Pull 100 chip", condition: "Disruptive", outcome: "Fail" },
  { id: "act_push_100_success", model: "ACT", family: "Task-trained", task: "Push 100 chip", condition: "Standard", outcome: "Success" },
  { id: "act_show_right_disruptive_fail", model: "ACT", family: "Task-trained", task: "Show right card", condition: "Disruptive", outcome: "Fail" },
  { id: "baku_pick_up_left_success", model: "BAKU", family: "Task-trained", task: "Pick up left card", condition: "Standard", outcome: "Success" },
  { id: "baku_pull_10_fail", model: "BAKU", family: "Task-trained", task: "Pull 10 chip", condition: "Standard", outcome: "Fail" },
  { id: "baku_push_10_fail", model: "BAKU", family: "Task-trained", task: "Push 10 chip", condition: "Standard", outcome: "Fail" },
  { id: "baku_push_5_fail", model: "BAKU", family: "Task-trained", task: "Push 5 chip", condition: "Standard", outcome: "Fail" },
  { id: "baku_put_down_left_success", model: "BAKU", family: "Task-trained", task: "Put down left card", condition: "Standard", outcome: "Success" },
  { id: "dp_trans_pick_up_left_fail", model: "DP-Transformer", family: "Task-trained", task: "Pick up left card", condition: "Standard", outcome: "Fail" },
  { id: "dp_trans_pull_10_disruptive_success", model: "DP-Transformer", family: "Task-trained", task: "Pull 10 chip", condition: "Disruptive", outcome: "Success" },
  { id: "dp_trans_push_10_disruptive_fail", model: "DP-Transformer", family: "Task-trained", task: "Push 10 chip", condition: "Disruptive", outcome: "Fail" },
  { id: "dp_unet_disruptive_fail", model: "DP-UNet", family: "Task-trained", task: "Disruptive rollout", condition: "Disruptive", outcome: "Fail" },
  { id: "dp_unet_fail", model: "DP-UNet", family: "Task-trained", task: "Standard rollout", condition: "Standard", outcome: "Fail" },
  { id: "dpdino_pick_up_left_success", model: "DP (DINO)", family: "Task-trained", task: "Pick up left card", condition: "Standard", outcome: "Success" },
  { id: "dpdino_pull_5_success", model: "DP (DINO)", family: "Task-trained", task: "Pull 5 chip", condition: "Standard", outcome: "Success" },
  { id: "dpdino_push_5_fail", model: "DP (DINO)", family: "Task-trained", task: "Push 5 chip", condition: "Standard", outcome: "Fail" },
  { id: "dpdino_put_down_left_success", model: "DP (DINO)", family: "Task-trained", task: "Put down left card", condition: "Standard", outcome: "Success" },
  { id: "pi0.5_pick_left_card_fail", model: "pi0.5", family: "VLA", task: "Pick left card", condition: "Standard", outcome: "Fail" },
  { id: "pi0.5_pick_right_card_success", model: "pi0.5", family: "VLA", task: "Pick right card", condition: "Standard", outcome: "Success" },
  { id: "pi0.5_pull_5_disruptive_fail", model: "pi0.5", family: "VLA", task: "Pull 5 chip", condition: "Disruptive", outcome: "Fail" },
  { id: "pi0.5_pull_5_fail", model: "pi0.5", family: "VLA", task: "Pull 5 chip", condition: "Standard", outcome: "Fail" },
  { id: "pi0.5_push_50_disruptive_success", model: "pi0.5", family: "VLA", task: "Push 50 chip", condition: "Disruptive", outcome: "Success" },
  { id: "pi0.5_put_down_right_disruptive_success", model: "pi0.5", family: "VLA", task: "Put down right card", condition: "Disruptive", outcome: "Success" },
  { id: "pi0_lift_left_card_success", model: "pi0", family: "VLA", task: "Lift left card", condition: "Standard", outcome: "Success" },
  { id: "pi0_pull_100_fail", model: "pi0", family: "VLA", task: "Pull 100 chip", condition: "Standard", outcome: "Fail" },
  { id: "pi0_push_10_fail", model: "pi0", family: "VLA", task: "Push 10 chip", condition: "Standard", outcome: "Fail" },
  { id: "pi0_put_down_left_card_success", model: "pi0", family: "VLA", task: "Put down left card", condition: "Standard", outcome: "Success" },
  { id: "rdt_ft_pick_up_left_fail", model: "RDT", family: "Robot-pretrained", task: "Pick up left card", condition: "Standard", outcome: "Fail" },
  { id: "rdt_ft_pull_50_success", model: "RDT", family: "Robot-pretrained", task: "Pull 50 chip", condition: "Standard", outcome: "Success" },
  { id: "rdt_ft_push_100_fail", model: "RDT", family: "Robot-pretrained", task: "Push 100 chip", condition: "Standard", outcome: "Fail" },
  { id: "rdt_ft_show_left_success", model: "RDT", family: "Robot-pretrained", task: "Show left card", condition: "Standard", outcome: "Success" },
  { id: "rdt_small_pick_up_left_disruptive_fail", model: "RDT-small", family: "Task-trained", task: "Pick up left card", condition: "Disruptive", outcome: "Fail" },
  { id: "rdt_small_pull_5_disruptive_fail", model: "RDT-small", family: "Task-trained", task: "Pull 5 chip", condition: "Disruptive", outcome: "Fail" },
  { id: "rdt_small_push_10_fail", model: "RDT-small", family: "Task-trained", task: "Push 10 chip", condition: "Standard", outcome: "Fail" },
  { id: "rdt_small_put_down_left_success", model: "RDT-small", family: "Task-trained", task: "Put down left card", condition: "Standard", outcome: "Success" },
];

const policyVideoGrid = document.getElementById("policy-video-grid");
const policyModelFilter = document.getElementById("policy-model-filter");
const policyOutcomeFilter = document.getElementById("policy-outcome-filter");
const policyVideoCount = document.getElementById("policy-video-count");

function appendText(parent, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  parent.append(element);
  return element;
}

function renderPolicyVideoCard(demo) {
  const card = document.createElement("article");
  card.className = "policy-video-card";
  card.dataset.model = demo.model;
  card.dataset.outcome = demo.outcome;

  const video = document.createElement("video");
  video.controls = true;
  video.preload = "none";
  video.playsInline = true;
  video.poster = `assets/videos/policy-bench/posters/${demo.id}.jpg`;
  video.setAttribute("aria-label", `${demo.model} ${demo.task} ${demo.condition} ${demo.outcome}`);

  const source = document.createElement("source");
  source.src = `assets/videos/policy-bench/${demo.id}.mp4`;
  source.type = "video/mp4";
  video.append(source);
  card.append(video);

  const copy = document.createElement("div");
  copy.className = "policy-video-copy";

  const topline = document.createElement("div");
  topline.className = "policy-video-topline";
  appendText(topline, "span", "policy-model", demo.model);
  appendText(topline, "span", `outcome-badge ${demo.outcome.toLowerCase()}`, demo.outcome);
  copy.append(topline);

  appendText(copy, "h4", "", demo.task);

  const tags = document.createElement("div");
  tags.className = "policy-video-tags";
  appendText(tags, "span", `condition-badge ${demo.condition.toLowerCase()}`, demo.condition);
  appendText(tags, "span", "condition-badge", demo.family);
  copy.append(tags);

  const sourceName = appendText(copy, "code", "source-name", `${demo.id}.MOV`);
  sourceName.title = `${demo.id}.MOV`;

  card.append(copy);
  return card;
}

function updatePolicyVideoFilter() {
  if (!policyVideoGrid) return;

  const model = policyModelFilter?.value || "all";
  const outcome = policyOutcomeFilter?.value || "all";
  let visibleCount = 0;

  policyVideoGrid.querySelectorAll(".policy-video-card").forEach((card) => {
    const matchesModel = model === "all" || card.dataset.model === model;
    const matchesOutcome = outcome === "all" || card.dataset.outcome === outcome;
    const isVisible = matchesModel && matchesOutcome;
    card.classList.toggle("is-hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  if (policyVideoCount) {
    policyVideoCount.value = `${visibleCount} / ${policyDemoVideos.length} videos`;
  }
}

if (policyVideoGrid && policyModelFilter && policyOutcomeFilter) {
  policyModelFilter.append(new Option("All models", "all"));
  Array.from(new Set(policyDemoVideos.map((demo) => demo.model))).forEach((model) => {
    policyModelFilter.append(new Option(model, model));
  });

  policyDemoVideos.forEach((demo) => {
    const card = renderPolicyVideoCard(demo);
    const video = card.querySelector("video");
    video.addEventListener("play", () => {
      policyVideoGrid.querySelectorAll("video").forEach((other) => {
        if (other !== video) other.pause();
      });
    });
    policyVideoGrid.append(card);
  });

  policyModelFilter.addEventListener("change", updatePolicyVideoFilter);
  policyOutcomeFilter.addEventListener("change", updatePolicyVideoFilter);
  updatePolicyVideoFilter();
}

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
