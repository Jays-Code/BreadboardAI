import "./modulepreload-polyfill-DvzacyrX.js";
import { C as h, a as m } from "./oauth-bA5gMzvn.js";
import { S as L, b as f, g as _, f as w, i as r, j as A, h as I, e as H, c as R } from "./logger-BR29-LuY.js";
N();
async function N() {
  const i = h.SHELL_GUEST_ORIGIN;
  if (!i || i === "*")
    return;
  const g = document.querySelector("iframe#opal-app");
  if (!g?.contentWindow) {
    console.error("Could not find #opal-app iframe");
    return;
  }
  const a = "Shell Host", l = h.SHELL_PREFIX, s = new URL(window.location.href), E = l && (s.pathname === l || s.pathname.startsWith(`${l}/`)) ? s.pathname.slice(l.length) : s.pathname, p = new URL(
    "_app" + E + s.search + s.hash,
    i
  );
  p.searchParams.set(L, window.location.origin), g.src = p.href;
  const u = new f(), o = {}, t = _(), n = !1;
  window.addEventListener("message", (e) => {
    if (e.isTrusted && e.source === g.contentWindow && e.origin === i && typeof e.data == "object" && e.data !== null && e.data.type === w) {
      t.log(
        r(
          "Received establish MessageChannel request from",
          e.origin
        ),
        a,
        n
      ), o.value ? (t.log(
        r(
          "Discarding previous guest, iframe must have navigated"
        ),
        a,
        n
      ), o.value.guest[A](), o.value.port.close()) : m(
        (S) => (
          // Note we box the guest so that this callback doesn't need to be
          // re-attached when the guest is replaced due to navigation.
          o.value?.guest.receiveFromEmbedder(S)
        )
      ), t.log(
        r(
          "Sending establish MessageChannel response"
        ),
        a,
        n
      );
      const c = e.ports[0];
      c.postMessage({ type: I }), t.log(
        r("Exposing host API"),
        a,
        n
      ), H(u, c), t.log(
        r("Connecting to guest API"),
        a,
        n
      );
      const d = R(c);
      o.value = { port: c, guest: d };
    }
  });
}
