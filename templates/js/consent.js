/* Cookie consent: a small banner with Accept, Reject and Preferences.

   The choice lives in localStorage under KEY as
   {v:1, analytics:boolean, ads:boolean, ts:number}. No stored choice means the
   banner shows. A footer element with [data-consent-open] reopens the
   preferences. Other modules call consentGranted("analytics" | "ads") or listen
   for the window event "consent:change" (detail = the new state).

   Style the .consent classes in your stylesheet; overlay the banner (fixed
   position) so it never shifts the layout. */

const KEY = "site_consent";
const TEXT = {
  label: "Cookie notice",
  banner: "We use cookies to understand how the site is used. You can accept, reject, or choose.",
  policy: "Privacy policy", policyHref: "/privacy",
  accept: "Accept", reject: "Reject", prefs: "Preferences", save: "Save",
  necessary: "Necessary (always on)",
  analytics: "Analytics",
  ads: "Advertising",
};

let root = null;
let opener = null;

export function getConsent() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.v === 1 && typeof s.analytics === "boolean" && typeof s.ads === "boolean") return s;
  } catch (e) {}
  return null;
}

export function consentGranted(kind) {
  const s = getConsent();
  return !!(s && s[kind] === true);
}

function save(analytics, ads) {
  const state = { v: 1, analytics: !!analytics, ads: !!ads, ts: Date.now() };
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  window.dispatchEvent(new CustomEvent("consent:change", { detail: state }));
}

function build() {
  const el = document.createElement("div");
  el.className = "consent";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "false");
  el.setAttribute("aria-label", TEXT.label);
  el.hidden = true;
  el.innerHTML =
    '<p class="consent__text">' + TEXT.banner + ' <a href="' + TEXT.policyHref + '">' + TEXT.policy + '</a></p>' +
    '<div class="consent__prefs" hidden>' +
      '<p>' + TEXT.necessary + '</p>' +
      '<label><input type="checkbox" data-k="analytics"> ' + TEXT.analytics + '</label>' +
      '<label><input type="checkbox" data-k="ads"> ' + TEXT.ads + '</label>' +
    '</div>' +
    '<div class="consent__actions">' +
      '<button type="button" data-a="reject">' + TEXT.reject + '</button>' +
      '<button type="button" data-a="prefs">' + TEXT.prefs + '</button>' +
      '<button type="button" data-a="save" hidden>' + TEXT.save + '</button>' +
      '<button type="button" data-a="accept">' + TEXT.accept + '</button>' +
    '</div>';
  document.body.appendChild(el);

  el.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-a]");
    if (!b) return;
    const a = b.getAttribute("data-a");
    if (a === "accept") { save(true, true); close(); }
    else if (a === "reject") { save(false, false); close(); }
    else if (a === "prefs") { showPrefs(true); }
    else if (a === "save") {
      save(el.querySelector('[data-k="analytics"]').checked, el.querySelector('[data-k="ads"]').checked);
      close();
    }
  });
  return el;
}

function showPrefs(open) {
  root.querySelector(".consent__prefs").hidden = !open;
  root.querySelector('[data-a="prefs"]').hidden = open;
  root.querySelector('[data-a="save"]').hidden = !open;
  if (open) {
    const s = getConsent();
    root.querySelector('[data-k="analytics"]').checked = !!(s && s.analytics);
    root.querySelector('[data-k="ads"]').checked = !!(s && s.ads);
    root.querySelector('[data-k="analytics"]').focus();
  }
}

function open(withPrefs) {
  root.hidden = false;
  showPrefs(!!withPrefs);
}

function close() {
  root.hidden = true;
  showPrefs(false);
  if (opener && document.contains(opener)) opener.focus();
  opener = null;
}

export function initConsent() {
  if (root) return;
  root = build();
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest && ev.target.closest("[data-consent-open]");
    if (b) { opener = b; open(true); }
  });
  // Escape closes a reopened dialog, never a first-visit banner.
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !root.hidden && getConsent()) close();
  });
  if (!getConsent()) open(false);
}
