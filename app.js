const TESTS = {
  burnout: {
    id: "burnout",
    title: "Wapipay Staff Burnout Self-Assessment",
    category: "Workplace wellbeing",
    meta: "15 questions",
    estimate: "3-4 min",
    intro:
      "A focused workplace wellbeing screen for emotional drain, workload pressure, recovery, support, and motivation.",
    note:
      "This is an internal wellbeing screening tool, not a medical diagnosis.",
    fields: [
      { id: "name", label: "Staff member name or initials", placeholder: "e.g. A.N." },
      { id: "department", label: "Department or team", placeholder: "e.g. Operations" },
    ],
    items: [
      { type: "rating", prompt: "How emotionally drained do you feel after work?" },
      { type: "rating", prompt: "How often do you feel overwhelmed by your workload?" },
      { type: "rating", prompt: "How often do you struggle to concentrate at work?" },
      { type: "rating", prompt: "How often do you feel physically tired during the workday?" },
      { type: "rating", prompt: "How often do you feel disconnected from your work?" },
      { type: "rating", prompt: "How often do you feel under pressure to meet deadlines?" },
      { type: "rating", prompt: "How often do you find it hard to recover after work?" },
      { type: "rating", prompt: "How often do you feel your work-life balance is poor?" },
      { type: "rating", prompt: "How often do you feel unsupported at work?" },
      { type: "rating", prompt: "How often do you feel your effort is not recognized?" },
      {
        type: "yesno",
        prompt: "Have you recently considered taking sick leave because of stress?",
      },
      { type: "yesno", prompt: "Have you been losing sleep because of work?" },
      {
        type: "yesno",
        prompt: "Have you become more irritable with colleagues or clients?",
      },
      { type: "yesno", prompt: "Have you noticed a drop in your motivation?" },
      {
        type: "yesno",
        prompt: "Have you felt like quitting or changing roles due to stress?",
      },
    ],
    scale: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    score(fields, answers, items) {
      const ratingScore = items
        .filter((item) => item.type === "rating")
        .reduce((sum, item) => sum + Number(answers[item.key] || 0), 0);
      const yesScore = items
        .filter((item) => item.type === "yesno")
        .reduce((sum, item) => sum + (answers[item.key] === "yes" ? 1 : 0), 0);
      const total = ratingScore + yesScore * 3;
      const max = 65;
      const percentage = (total / max) * 100;

      let level = "Low";
      let advice = "Maintain healthy routines and regular check-ins.";
      if (percentage >= 65) {
        level = "High";
        advice =
          "Recommend immediate support discussion with HR or a manager and time to recover.";
      } else if (percentage >= 35) {
        level = "Moderate";
        advice = "Consider workload review, rest, and manager support.";
      }

      return {
        type: "burnout",
        person: fields.name || "Anonymous",
        department: fields.department || "Unspecified team",
        total,
        max,
        percentage,
        level,
        advice,
        note: this.note,
      };
    },
  },
  "big-five": {
    id: "big-five",
    title: "Big Five Personality Test",
    category: "Personality profile",
    meta: "30 questions",
    estimate: "5-7 min",
    intro:
      "A concise profile across openness, conscientiousness, extraversion, agreeableness, and neuroticism.",
    note: "Self-assessment only. Not a clinical diagnosis.",
    fields: [
      { id: "name", label: "Name or initials", placeholder: "e.g. A.N." },
    ],
    randomize: true,
    scale: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
    items: [
      {
        prompt: "I enjoy trying new ideas and experiences.",
        trait: "Openness",
        reverse: false,
      },
      { prompt: "I have a vivid imagination.", trait: "Openness", reverse: false },
      {
        prompt: "I prefer routine over new experiences.",
        trait: "Openness",
        reverse: true,
      },
      {
        prompt: "I enjoy learning about abstract or complex topics.",
        trait: "Openness",
        reverse: false,
      },
      {
        prompt: "I am curious about many different things.",
        trait: "Openness",
        reverse: false,
      },
      {
        prompt: "I enjoy creative activities such as writing, music, or design.",
        trait: "Openness",
        reverse: false,
      },
      {
        prompt: "I am organized and prepared.",
        trait: "Conscientiousness",
        reverse: false,
      },
      {
        prompt: "I pay attention to details.",
        trait: "Conscientiousness",
        reverse: false,
      },
      {
        prompt: "I often leave tasks unfinished.",
        trait: "Conscientiousness",
        reverse: true,
      },
      {
        prompt: "I follow through on my commitments.",
        trait: "Conscientiousness",
        reverse: false,
      },
      {
        prompt: "I plan my work before starting.",
        trait: "Conscientiousness",
        reverse: false,
      },
      {
        prompt: "I get distracted easily when working on important tasks.",
        trait: "Conscientiousness",
        reverse: true,
      },
      {
        prompt: "I feel energized around other people.",
        trait: "Extraversion",
        reverse: false,
      },
      {
        prompt: "I enjoy being the center of attention.",
        trait: "Extraversion",
        reverse: false,
      },
      {
        prompt: "I prefer to stay quiet in groups.",
        trait: "Extraversion",
        reverse: true,
      },
      { prompt: "I start conversations easily.", trait: "Extraversion", reverse: false },
      { prompt: "I enjoy meeting new people.", trait: "Extraversion", reverse: false },
      {
        prompt: "I prefer working alone most of the time.",
        trait: "Extraversion",
        reverse: true,
      },
      {
        prompt: "I am considerate of other people's feelings.",
        trait: "Agreeableness",
        reverse: false,
      },
      { prompt: "I like helping others.", trait: "Agreeableness", reverse: false },
      {
        prompt: "I can be critical or harsh toward others.",
        trait: "Agreeableness",
        reverse: true,
      },
      {
        prompt: "I try to avoid unnecessary conflict.",
        trait: "Agreeableness",
        reverse: false,
      },
      {
        prompt: "I trust people's intentions unless given a reason not to.",
        trait: "Agreeableness",
        reverse: false,
      },
      {
        prompt: "I find it easy to cooperate with different personalities.",
        trait: "Agreeableness",
        reverse: false,
      },
      { prompt: "I get stressed easily.", trait: "Neuroticism", reverse: false },
      { prompt: "I worry about many things.", trait: "Neuroticism", reverse: false },
      { prompt: "I stay calm under pressure.", trait: "Neuroticism", reverse: true },
      { prompt: "My mood changes easily.", trait: "Neuroticism", reverse: false },
      {
        prompt: "I often feel tense or anxious.",
        trait: "Neuroticism",
        reverse: false,
      },
      {
        prompt: "I recover quickly after stressful situations.",
        trait: "Neuroticism",
        reverse: true,
      },
    ],
    score(fields, answers, items) {
      return scoreTraits(this, fields, answers, items, [
        "Openness",
        "Conscientiousness",
        "Extraversion",
        "Agreeableness",
        "Neuroticism",
      ]);
    },
  },
  "dark-triad": {
    id: "dark-triad",
    title: "Dark Triad Personality Self-Assessment",
    category: "Personality reflection",
    meta: "18 questions",
    estimate: "4-5 min",
    intro:
      "A self-reflection screen across Machiavellianism, narcissism, and psychopathy traits.",
    note:
      "Self-reflection only. Not a medical or psychological diagnosis.",
    fields: [
      { id: "name", label: "Name or initials", placeholder: "e.g. A.N." },
    ],
    randomize: true,
    scale: [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree",
    ],
    items: [
      {
        prompt: "It is wise to keep useful information to yourself.",
        trait: "Machiavellianism",
        reverse: false,
      },
      {
        prompt: "I can persuade people to do what I want.",
        trait: "Machiavellianism",
        reverse: false,
      },
      {
        prompt: "I avoid manipulating people, even when it would benefit me.",
        trait: "Machiavellianism",
        reverse: true,
      },
      {
        prompt: "I believe strategy is more important than honesty in some situations.",
        trait: "Machiavellianism",
        reverse: false,
      },
      {
        prompt: "I sometimes flatter people to get what I want.",
        trait: "Machiavellianism",
        reverse: false,
      },
      {
        prompt: "I prefer being fully honest rather than being strategic with people.",
        trait: "Machiavellianism",
        reverse: true,
      },
      { prompt: "I like being admired by others.", trait: "Narcissism", reverse: false },
      {
        prompt: "I believe I have qualities that make me stand out.",
        trait: "Narcissism",
        reverse: false,
      },
      { prompt: "I enjoy receiving attention.", trait: "Narcissism", reverse: false },
      {
        prompt: "I rarely feel the need to impress people.",
        trait: "Narcissism",
        reverse: true,
      },
      {
        prompt: "I think I deserve special recognition when I do well.",
        trait: "Narcissism",
        reverse: false,
      },
      {
        prompt: "I am comfortable not being noticed.",
        trait: "Narcissism",
        reverse: true,
      },
      {
        prompt: "I can stay calm even when others are upset.",
        trait: "Psychopathy",
        reverse: false,
      },
      {
        prompt: "I sometimes take risks without thinking much about the consequences.",
        trait: "Psychopathy",
        reverse: false,
      },
      { prompt: "I do not feel guilty easily.", trait: "Psychopathy", reverse: false },
      {
        prompt: "I usually think carefully before doing something risky.",
        trait: "Psychopathy",
        reverse: true,
      },
      {
        prompt: "I can be emotionally detached in difficult situations.",
        trait: "Psychopathy",
        reverse: false,
      },
      {
        prompt: "I feel bad when my actions hurt someone.",
        trait: "Psychopathy",
        reverse: true,
      },
    ],
    score(fields, answers, items) {
      return scoreTraits(this, fields, answers, items, [
        "Machiavellianism",
        "Narcissism",
        "Psychopathy",
      ]);
    },
  },
};

let selectedId = getInitialTestId();
let shareMode = "site";
let session = null;
let toastTimer = 0;

const nodes = {
  testList: document.querySelector("#test-list"),
  title: document.querySelector("#test-title"),
  category: document.querySelector("#test-category"),
  meta: document.querySelector("#test-meta"),
  stepper: document.querySelector("#stepper"),
  flowState: document.querySelector("#flow-state"),
  stage: document.querySelector("#stage"),
  qrFrame: document.querySelector("#qr-frame"),
  shareLink: document.querySelector("#share-link"),
  shareLinkLabel: document.querySelector("#share-link-label"),
  shareNote: document.querySelector("#share-note"),
  copyLink: document.querySelector("#copy-link"),
  shareModal: document.querySelector("#share-modal"),
  shareSheet: document.querySelector("#share-sheet"),
  openShare: document.querySelector("#open-share"),
};

document.addEventListener("click", handleClick);
document.addEventListener("submit", handleSubmit);
document.addEventListener("keydown", handleKeydown);
window.addEventListener("hashchange", () => {
  const nextId = getInitialTestId();
  if (nextId !== selectedId) {
    selectedId = nextId;
    session = null;
    render();
  }
});

render();

function getCurrentStep() {
  if (!session) return "details";
  if (session.result) return "results";
  return "assessment";
}

function getStepLabel(step) {
  if (step === "results") return "Results ready";
  if (step === "assessment") return "Assessment in progress";
  return "Participant details";
}

function getInitialTestId() {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const id = params.get("test");
  return TESTS[id] ? id : "burnout";
}

function setSelectedTest(id) {
  if (!TESTS[id]) return;
  selectedId = id;
  session = null;
  const url = new URL(window.location.href);
  url.hash = `test=${id}`;
  history.pushState(null, "", url);
  render();
}

function render() {
  const test = TESTS[selectedId];
  const step = getCurrentStep();
  renderLibrary();
  renderStepper(step);
  nodes.title.textContent = test.title;
  nodes.category.textContent = test.category;
  nodes.meta.textContent = `${test.meta} | ${test.estimate}`;
  nodes.flowState.textContent = getStepLabel(step);
  renderShare(test);

  if (!session) {
    renderIntro(test);
  } else if (session.result) {
    renderResults(test, session.result);
  } else {
    renderQuestion(test);
  }
}

function renderLibrary() {
  nodes.testList.innerHTML = Object.values(TESTS)
    .map(
      (test) => `
        <button class="test-card ${test.id === selectedId ? "active" : ""}" type="button" data-test-id="${test.id}">
          <strong>${escapeHtml(test.title)}</strong>
          <span>${escapeHtml(test.category)} | ${escapeHtml(test.meta)}</span>
        </button>
      `,
    )
    .join("");
}

function renderStepper(currentStep) {
  const steps = [
    ["details", "Details"],
    ["assessment", "Assessment"],
    ["results", "Results"],
  ];
  nodes.stepper.innerHTML = steps
    .map(
      ([key, label], index) => `
        <li class="${key === currentStep ? "active" : ""}">
          <b>${index + 1}</b>
          <span>${label}</span>
        </li>
      `,
    )
    .join("");
}

function renderShare(test) {
  const url = shareMode === "site" ? buildSiteUrl() : buildShareUrl(test.id);
  nodes.shareLinkLabel.textContent = shareMode === "site" ? "Site link" : "Selected test link";
  nodes.shareLink.value = url;
  document.querySelectorAll("[data-share-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.shareMode === shareMode);
  });

  try {
    nodes.qrFrame.innerHTML = createQrSvg(url);
    nodes.shareNote.textContent =
      shareMode === "site"
        ? "Scan or copy to open the full assessment portal."
        : "Scan or copy to open this assessment directly.";
  } catch (error) {
    nodes.qrFrame.innerHTML = `<p class="muted">Use link</p>`;
    nodes.shareNote.textContent = "Copy the link instead.";
  }
}

function openSharePanel() {
  nodes.shareModal.hidden = false;
  document.body.classList.add("modal-open");
  nodes.shareSheet.focus();
}

function closeSharePanel() {
  nodes.shareModal.hidden = true;
  document.body.classList.remove("modal-open");
  nodes.openShare.focus();
}

function renderIntro(test) {
  nodes.stage.innerHTML = `
    <section class="setup-view">
      <div class="setup-grid">
        <div class="assessment-summary">
          <div class="summary-row">
            <span>Assessment</span>
            <strong>${escapeHtml(test.category)}</strong>
          </div>
          <div class="summary-row">
            <span>Length</span>
            <strong>${escapeHtml(test.meta)}</strong>
          </div>
          <div class="summary-row">
            <span>Estimated time</span>
            <strong>${escapeHtml(test.estimate)}</strong>
          </div>
          <div class="summary-row">
            <span>Result</span>
            <strong>${test.id === "burnout" ? "Risk level" : "Trait profile"}</strong>
          </div>
        </div>

        <form class="identity-form" id="start-form">
          <h2>Participant</h2>
          ${test.fields
            .map(
              (field) => `
                <div class="field">
                  <label for="${field.id}">${escapeHtml(field.label)}</label>
                  <input id="${field.id}" name="${field.id}" autocomplete="off" placeholder="${escapeHtml(field.placeholder)}" />
                </div>
              `,
            )
            .join("")}
          <button class="primary-button" type="submit">Begin</button>
        </form>
      </div>
    </section>
  `;
}

function renderQuestion(test) {
  const item = session.items[session.index];
  const answer = session.answers[item.key];
  const progress = Math.round(((session.index + 1) / session.items.length) * 100);
  const isLast = session.index === session.items.length - 1;
  const canContinue = answer !== undefined;

  nodes.stage.innerHTML = `
    <div class="progress-block">
      <div class="progress-top">
        <span>Question ${session.index + 1} of ${session.items.length}</span>
        <span>${progress}% complete</span>
      </div>
      <div class="progress-track" aria-hidden="true">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
    </div>

    <section class="question-view">
      <div class="question-copy">
        <p class="question-index">Question ${session.index + 1}</p>
        <h2>${escapeHtml(item.prompt)}</h2>
      </div>

      ${item.type === "yesno" ? renderBinary(answer) : renderScale(test.scale, answer)}

      <div class="actions">
        <button class="quiet-button" type="button" data-action="reset">Close</button>
        <div>
          <button class="secondary-button" type="button" data-action="previous" ${session.index === 0 ? "disabled" : ""}>Back</button>
          <button class="primary-button" type="button" data-action="${isLast ? "finish" : "next"}" ${canContinue ? "" : "disabled"}>
            ${isLast ? "Complete" : "Continue"}
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderScale(labels, answer) {
  const firstLabel = labels[0];
  const lastLabel = labels[labels.length - 1];
  return `
    <div class="scale-wrap">
      <div class="scale-labels">
        <span>${escapeHtml(firstLabel)}</span>
        <span>${escapeHtml(lastLabel)}</span>
      </div>
      <div class="scale" role="radiogroup" aria-label="Rating scale">
        ${labels
          .map((label, index) => {
            const value = index + 1;
            return `
              <button class="choice-button ${Number(answer) === value ? "selected" : ""}" type="button" role="radio" aria-label="${escapeHtml(label)}" aria-checked="${Number(answer) === value}" data-answer="${value}">
                <strong>${value}</strong>
              </button>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderBinary(answer) {
  return `
    <div class="binary" role="radiogroup" aria-label="Yes or no">
      <button class="choice-button ${answer === "no" ? "selected" : ""}" type="button" role="radio" aria-checked="${answer === "no"}" data-answer="no">
        <strong>No</strong>
      </button>
      <button class="choice-button ${answer === "yes" ? "selected" : ""}" type="button" role="radio" aria-checked="${answer === "yes"}" data-answer="yes">
        <strong>Yes</strong>
      </button>
    </div>
  `;
}

function renderResults(test, result) {
  if (result.type === "burnout") {
    renderBurnoutResults(result);
    return;
  }

  nodes.stage.innerHTML = `
    <section class="results-view">
      <div class="results-heading">
        <div>
          <p class="eyebrow">Results</p>
          <h2>${escapeHtml(test.title)}</h2>
          <p class="result-person">${escapeHtml(result.person)}</p>
        </div>
        <button class="secondary-button" type="button" data-action="restart">New assessment</button>
      </div>

      <div class="score-grid">
        ${result.traits
          .map(
            (trait) => `
              <article class="score-card">
                <div class="score-head">
                  <strong>${escapeHtml(trait.name)}</strong>
                  <span>${trait.average.toFixed(2)}/5</span>
                </div>
                <div class="bar" aria-hidden="true"><span style="width: ${(trait.average / 5) * 100}%"></span></div>
                <span class="level ${trait.level.toLowerCase()}">${trait.level}</span>
              </article>
            `,
          )
          .join("")}
      </div>

      <p class="result-note">${escapeHtml(result.note)}</p>
    </section>
  `;
}

function renderBurnoutResults(result) {
  const hue = result.level === "High" ? "var(--red)" : result.level === "Moderate" ? "var(--amber)" : "var(--green)";
  nodes.stage.innerHTML = `
    <section class="results-view">
      <div class="results-heading">
        <div>
          <p class="eyebrow">Result</p>
          <h2>Burnout risk: ${escapeHtml(result.level)}</h2>
          <p class="result-person">${escapeHtml(result.person)} | ${escapeHtml(result.department)}</p>
        </div>
        <button class="secondary-button" type="button" data-action="restart">New assessment</button>
      </div>

      <div class="gauge-row">
        <div class="gauge" style="background: conic-gradient(${hue} ${result.percentage}%, #e7ece9 0);">
          <div class="gauge-inner">
            <div>
              <strong>${result.percentage.toFixed(1)}%</strong>
              <span>${result.total}/${result.max}</span>
            </div>
          </div>
        </div>

        <div class="advice">
          <strong>Recommended action</strong>
          <p>${escapeHtml(result.advice)}</p>
        </div>
      </div>

      <p class="result-note">${escapeHtml(result.note)}</p>
    </section>
  `;
}

function handleSubmit(event) {
  if (event.target.id !== "start-form") return;
  event.preventDefault();
  const test = TESTS[selectedId];
  const data = new FormData(event.target);
  const fields = Object.fromEntries(test.fields.map((field) => [field.id, String(data.get(field.id) || "").trim()]));
  const baseItems = test.randomize ? shuffle(test.items) : [...test.items];
  session = {
    fields,
    index: 0,
    answers: {},
    items: baseItems.map((item, index) => ({
      ...item,
      type: item.type || "rating",
      key: `q${index}`,
    })),
    result: null,
  };
  render();
}

function handleClick(event) {
  if (event.target.closest("#open-share")) {
    openSharePanel();
    return;
  }

  if (event.target.closest("[data-share-close]")) {
    closeSharePanel();
    return;
  }

  const shareModeButton = event.target.closest("[data-share-mode]");
  if (shareModeButton) {
    shareMode = shareModeButton.dataset.shareMode;
    renderShare(TESTS[selectedId]);
    return;
  }

  const testButton = event.target.closest("[data-test-id]");
  if (testButton) {
    setSelectedTest(testButton.dataset.testId);
    return;
  }

  if (event.target.closest("#copy-link")) {
    copyShareLink();
    return;
  }

  if (!session) return;

  const answerButton = event.target.closest("[data-answer]");
  if (answerButton) {
    const item = session.items[session.index];
    session.answers[item.key] = answerButton.dataset.answer;
    renderQuestion(TESTS[selectedId]);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "previous" && session.index > 0) {
    session.index -= 1;
  } else if (action === "next" && session.index < session.items.length - 1) {
    session.index += 1;
  } else if (action === "finish") {
    const test = TESTS[selectedId];
    session.result = test.score(session.fields, session.answers, session.items);
  } else if (action === "reset" || action === "restart") {
    session = null;
  }
  render();
}

function handleKeydown(event) {
  if (event.key === "Escape" && !nodes.shareModal.hidden) {
    closeSharePanel();
  }
}

function scoreTraits(test, fields, answers, items, traitOrder) {
  const buckets = Object.fromEntries(traitOrder.map((trait) => [trait, []]));
  items.forEach((item) => {
    const raw = Number(answers[item.key] || 0);
    const score = item.reverse ? 6 - raw : raw;
    buckets[item.trait].push(score);
  });

  return {
    type: "traits",
    person: fields.name || "Anonymous",
    note: test.note,
    traits: traitOrder.map((name) => {
      const values = buckets[name];
      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      return {
        name,
        average,
        level: interpretAverage(average),
      };
    }),
  };
}

function interpretAverage(average) {
  if (average < 2.5) return "Low";
  if (average < 3.5) return "Moderate";
  return "High";
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function buildShareUrl(id) {
  const url = new URL(window.location.href);
  url.hash = `test=${id}`;
  return url.toString();
}

function buildSiteUrl() {
  const url = new URL(window.location.href);
  url.hash = "";
  return url.toString();
}

async function copyShareLink() {
  const value = nodes.shareLink.value;
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    nodes.shareLink.select();
    document.execCommand("copy");
  }
  showToast("Link copied");
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createQrSvg(text) {
  const modules = createQrModules(text);
  const quiet = 4;
  const size = modules.length + quiet * 2;
  let path = "";
  modules.forEach((row, y) => {
    row.forEach((dark, x) => {
      if (dark) path += `M${x + quiet} ${y + quiet}h1v1h-1z`;
    });
  });

  return `
    <svg viewBox="0 0 ${size} ${size}" role="img" aria-label="QR code for selected test" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
      <rect width="${size}" height="${size}" fill="#fff"/>
      <path d="${path}" fill="#1d2421"/>
    </svg>
  `;
}

function createQrModules(text) {
  const version = 6;
  const size = 21 + (version - 1) * 4;
  const dataCapacity = 136;
  const eccLength = 18;
  const blockDataLength = 68;
  const mask = 2;
  const bytes = Array.from(new TextEncoder().encode(text));
  if (bytes.length > 126) {
    throw new Error("URL too long for compact QR");
  }

  const dataCodewords = encodeQrData(bytes, dataCapacity);
  const blocks = [
    dataCodewords.slice(0, blockDataLength),
    dataCodewords.slice(blockDataLength, blockDataLength * 2),
  ];
  const eccBlocks = blocks.map((block) => reedSolomonRemainder(block, eccLength));
  const codewords = [];
  for (let index = 0; index < blockDataLength; index += 1) {
    codewords.push(blocks[0][index], blocks[1][index]);
  }
  for (let index = 0; index < eccLength; index += 1) {
    codewords.push(eccBlocks[0][index], eccBlocks[1][index]);
  }

  const modules = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved = Array.from({ length: size }, () => Array(size).fill(false));
  const setFunction = (x, y, dark) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    modules[y][x] = Boolean(dark);
    reserved[y][x] = true;
  };

  drawFinder(modules, reserved, setFunction, 0, 0);
  drawFinder(modules, reserved, setFunction, size - 7, 0);
  drawFinder(modules, reserved, setFunction, 0, size - 7);
  drawAlignment(setFunction, 34, 34);

  for (let i = 8; i < size - 8; i += 1) {
    const dark = i % 2 === 0;
    setFunction(i, 6, dark);
    setFunction(6, i, dark);
  }

  drawFormatBits(setFunction, size, mask);
  placeQrData(modules, reserved, codewords, mask);
  return modules;
}

function encodeQrData(bytes, capacity) {
  const bits = [];
  appendBits(bits, 0x4, 4);
  appendBits(bits, bytes.length, 8);
  bytes.forEach((byte) => appendBits(bits, byte, 8));

  const maxBits = capacity * 8;
  appendBits(bits, 0, Math.min(4, maxBits - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  const data = [];
  for (let index = 0; index < bits.length; index += 8) {
    data.push(bits.slice(index, index + 8).reduce((value, bit) => (value << 1) | bit, 0));
  }

  const pads = [0xec, 0x11];
  let padIndex = 0;
  while (data.length < capacity) {
    data.push(pads[padIndex % 2]);
    padIndex += 1;
  }
  return data;
}

function appendBits(target, value, length) {
  for (let bit = length - 1; bit >= 0; bit -= 1) {
    target.push((value >>> bit) & 1);
  }
}

function drawFinder(modules, reserved, setFunction, left, top) {
  for (let y = -1; y <= 7; y += 1) {
    for (let x = -1; x <= 7; x += 1) {
      const xx = left + x;
      const yy = top + y;
      if (xx < 0 || yy < 0 || yy >= modules.length || xx >= modules.length) continue;
      const dark =
        x >= 0 &&
        x <= 6 &&
        y >= 0 &&
        y <= 6 &&
        (x === 0 ||
          x === 6 ||
          y === 0 ||
          y === 6 ||
          (x >= 2 && x <= 4 && y >= 2 && y <= 4));
      modules[yy][xx] = dark;
      reserved[yy][xx] = true;
    }
  }
}

function drawAlignment(setFunction, centerX, centerY) {
  for (let y = -2; y <= 2; y += 1) {
    for (let x = -2; x <= 2; x += 1) {
      const dark = Math.max(Math.abs(x), Math.abs(y)) === 2 || (x === 0 && y === 0);
      setFunction(centerX + x, centerY + y, dark);
    }
  }
}

function drawFormatBits(setFunction, size, mask) {
  const bits = getFormatBits(1, mask);
  for (let i = 0; i <= 5; i += 1) setFunction(8, i, getBit(bits, i));
  setFunction(8, 7, getBit(bits, 6));
  setFunction(8, 8, getBit(bits, 7));
  setFunction(7, 8, getBit(bits, 8));
  for (let i = 9; i < 15; i += 1) setFunction(14 - i, 8, getBit(bits, i));

  for (let i = 0; i < 8; i += 1) setFunction(size - 1 - i, 8, getBit(bits, i));
  for (let i = 8; i < 15; i += 1) setFunction(8, size - 15 + i, getBit(bits, i));
  setFunction(8, size - 8, true);
}

function getFormatBits(errorCorrectionBits, mask) {
  const data = (errorCorrectionBits << 3) | mask;
  let remainder = data;
  for (let i = 0; i < 10; i += 1) {
    remainder = (remainder << 1) ^ (((remainder >>> 9) & 1) ? 0x537 : 0);
  }
  return ((data << 10) | (remainder & 0x3ff)) ^ 0x5412;
}

function getBit(value, index) {
  return ((value >>> index) & 1) !== 0;
}

function placeQrData(modules, reserved, codewords, mask) {
  const size = modules.length;
  let bitIndex = 0;
  let upward = true;

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right -= 1;
    for (let vertical = 0; vertical < size; vertical += 1) {
      const y = upward ? size - 1 - vertical : vertical;
      for (let offset = 0; offset < 2; offset += 1) {
        const x = right - offset;
        if (reserved[y][x]) continue;
        const codeword = codewords[bitIndex >>> 3] || 0;
        const bit = ((codeword >>> (7 - (bitIndex & 7))) & 1) !== 0;
        modules[y][x] = bit !== maskApplies(mask, x, y);
        bitIndex += 1;
      }
    }
    upward = !upward;
  }
}

function maskApplies(mask, x, y) {
  if (mask === 2) return x % 3 === 0;
  return (x + y) % 2 === 0;
}

const GF_EXP = Array(512).fill(0);
const GF_LOG = Array(256).fill(0);
let gfValue = 1;
for (let index = 0; index < 255; index += 1) {
  GF_EXP[index] = gfValue;
  GF_LOG[gfValue] = index;
  gfValue <<= 1;
  if (gfValue & 0x100) gfValue ^= 0x11d;
}
for (let index = 255; index < 512; index += 1) {
  GF_EXP[index] = GF_EXP[index - 255];
}

function gfMultiply(left, right) {
  if (left === 0 || right === 0) return 0;
  return GF_EXP[GF_LOG[left] + GF_LOG[right]];
}

function reedSolomonGenerator(degree) {
  let generator = [1];
  for (let index = 0; index < degree; index += 1) {
    const next = Array(generator.length + 1).fill(0);
    generator.forEach((coefficient, coefficientIndex) => {
      next[coefficientIndex] ^= gfMultiply(coefficient, 1);
      next[coefficientIndex + 1] ^= gfMultiply(coefficient, GF_EXP[index]);
    });
    generator = next;
  }
  return generator;
}

function reedSolomonRemainder(data, degree) {
  const generator = reedSolomonGenerator(degree);
  const result = [...data, ...Array(degree).fill(0)];
  data.forEach((_, index) => {
    const factor = result[index];
    if (factor === 0) return;
    for (let genIndex = 1; genIndex < generator.length; genIndex += 1) {
      result[index + genIndex] ^= gfMultiply(generator[genIndex], factor);
    }
  });
  return result.slice(data.length);
}
