const a = {
  mcp: !1,
  force2DGraph: !1,
  gulfRenderer: !1,
  consistentUI: !1,
  agentMode: !1,
  opalAdk: !1,
  outputTemplates: !1,
  googleOne: !1,
  requireConsentForGetWebpage: !1,
  requireConsentForOpenWebpage: !1,
  streamPlanner: !1,
  streamGenWebpage: !1,
  enableDrivePickerInLiteMode: !1,
  enableGoogleDriveTools: !1,
  enableResumeAgentRun: !1
};
function o(e) {
  return {
    ...e,
    flags: { ...a, ...e?.flags }
  };
}
function l() {
  const e = globalThis.document?.querySelector("template")?.content?.firstElementChild?.textContent;
  if (!e)
    return console.warn(
      "Failed to discover deployment config: DOM element not found."
    ), o({});
  try {
    return o(JSON.parse(e));
  } catch (n) {
    return console.warn("Failed to discover deployment config:", n.message), o({});
  }
}
const r = l(), t = (
  // TODO(b/466454650) Rename ALLOWED_REDIRECT_ORIGINS to ALLOWED_EMBEDDER_ORIGINS.
  new Set(r.ALLOWED_REDIRECT_ORIGINS ?? [])
), s = t.size && window.self !== window.top ? window.top : void 0;
function i(e) {
  if (s)
    for (const n of t)
      s.postMessage(e, n);
}
function f(e) {
  s && window.addEventListener("message", (n) => {
    t.has(n.origin) && e(n.data);
  });
}
const d = "oauth-popup-message";
export {
  r as C,
  d as O,
  f as a,
  i as s
};
