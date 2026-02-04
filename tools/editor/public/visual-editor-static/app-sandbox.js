import "./modulepreload-polyfill-DvzacyrX.js";
import { i as r, a as s } from "./app-sandbox-protocol-DoIm-8jE.js";
if (window === window.parent)
  throw new Error("[app-sandbox-bootstrap] Not iframed");
const a = document.body.querySelector(
  "#app-sandbox-inner-iframe"
);
if (!a)
  throw new Error(
    "[app-sandbox-bootstrap] Could not find #app-sandbox-inner-iframe"
  );
window.addEventListener("message", (o) => {
  if (i(o) && r(o.data)) {
    const { srcdoc: n } = o.data;
    console.debug(
      `[app-sandbox-bootstrap] Received srcdoc (length ${n.length})`
    ), a.srcdoc = n;
  } else d(o) && s(o.data) && (console.debug(
    `[app-sandbox-bootstrap] Forwarding "${o.data.type}" message`
  ), window.parent.postMessage(o.data, window.location.origin));
});
console.debug("[app-sandbox-bootstrap] Sending ready message", window);
window.parent.postMessage(
  { type: "app-sandbox-ready" },
  window.location.origin
);
function i(o) {
  return o.isTrusted && o.source === window.parent && o.origin === window.location.origin;
}
function d(o) {
  return o.isTrusted && o.source != null && o.source === a?.contentWindow;
}
