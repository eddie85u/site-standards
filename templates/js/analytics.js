/* Consent-gated analytics: GA4 (gtag.js, Consent Mode v2) + Microsoft Clarity.

   Nothing loads, and no request is made, until the visitor accepts analytics
   AND the page is on the live host AND the matching ID is set. */

import { consentGranted } from "./consent.js";

export const GA4_ID = "";      // "G-XXXXXXXXXX"; empty keeps GA4 off
export const CLARITY_ID = "";  // Clarity project ID; empty keeps Clarity off
const LIVE_HOST = /(^|\.){{DOMAIN_REGEX}}$/.test(location.hostname); // e.g. example\.com

let gaLoaded = false;
let clarityLoaded = false;

function gtag() { window.dataLayer.push(arguments); }

function googleConsent() {
  const ads = consentGranted("ads") ? "granted" : "denied";
  return {
    analytics_storage: consentGranted("analytics") ? "granted" : "denied",
    ad_storage: ads, ad_user_data: ads, ad_personalization: ads,
  };
}

function loadGA() {
  if (gaLoaded || !GA4_ID) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || gtag;
  window.gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("consent", "update", googleConsent());
  window.gtag("config", GA4_ID);
}

function clarityConsent() {
  window.clarity("consentv2", {
    analytics_Storage: consentGranted("analytics") ? "granted" : "denied",
    ad_Storage: consentGranted("ads") ? "granted" : "denied",
  });
}

function loadClarity() {
  if (clarityLoaded || !CLARITY_ID) return;
  clarityLoaded = true;
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
  clarityConsent();
}

function sync() {
  if (!LIVE_HOST) return;
  if (consentGranted("analytics")) {
    loadGA();
    loadClarity();
    if (gaLoaded) { window["ga-disable-" + GA4_ID] = false; window.gtag("consent", "update", googleConsent()); }
    if (clarityLoaded) clarityConsent();
  } else {
    if (gaLoaded) { window["ga-disable-" + GA4_ID] = true; window.gtag("consent", "update", googleConsent()); }
    if (clarityLoaded) clarityConsent();
  }
}

/* A GA4 event, mirrored to Clarity so recordings can be filtered by it. */
export function track(name, params) {
  if (!consentGranted("analytics")) return;
  if (clarityLoaded && window.clarity) window.clarity("event", name);
  if (gaLoaded && window.gtag) window.gtag("event", name, params || {});
}

/* UTM parameters from the landing URL, kept for the session so forms and
   bookings can send them with the lead. */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
export function getUtms() {
  try { return JSON.parse(sessionStorage.getItem("utms")) || {}; } catch (e) { return {}; }
}
function captureUtms() {
  const q = new URLSearchParams(location.search);
  const found = {};
  for (const k of UTM_KEYS) if (q.get(k)) found[k] = q.get(k).slice(0, 100);
  if (Object.keys(found).length) {
    found.landing_page = location.pathname;
    try { sessionStorage.setItem("utms", JSON.stringify(found)); } catch (e) {}
  }
}

let started = false;
export function initAnalytics() {
  if (started) return;
  started = true;
  captureUtms();
  window.addEventListener("consent:change", sync);
  sync();
}
