import { s as p, O as m } from "./oauth-bA5gMzvn.js";
class f extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
    window.opener || (console.error("window.opener is not available, closing early."), window.close());
    const h = this.shadowRoot, o = (r) => {
      const w = document.createElement("p");
      w.textContent = `Error: ${r} Please close this window and try to sign in again.`, h.appendChild(w), p({
        type: "oauth_redirect",
        success: !1
      });
    }, n = new URL(window.location.href), s = n.searchParams.get("state");
    if (!s) {
      o('No "state" parameter could be found in the URL.');
      return;
    }
    let a;
    try {
      a = JSON.parse(s);
    } catch {
      o('"state" contained invalid JSON.');
      return;
    }
    const c = a.nonce;
    if (!c) {
      o(
        'No "number used once" parameter could be found in "state".'
      );
      return;
    }
    function i(r) {
      window.opener.postMessage(
        { type: m, nonce: c, grantResponse: r },
        window.location.origin
      );
    }
    const d = n.searchParams.get("error");
    if (d) {
      i({ error: d }), window.close();
      return;
    }
    const l = n.searchParams.get("code");
    if (!l) {
      o('No "code" parameter could be found in the URL.');
      return;
    }
    const t = new URL("/connection/grant/", window.location.origin);
    t.searchParams.set("code", l), t.searchParams.set(
      "redirect_path",
      new URL(window.location.href).pathname
    );
    const u = await fetch(t, { credentials: "include" });
    let e;
    try {
      e = await u.json();
    } catch {
      e = {
        error: "Invalid response from connection server"
      };
    }
    e.error === void 0 && (e.scopes = n.searchParams.get("scope")?.trim().split(/ +/) ?? []), i(e), p({
      type: "oauth_redirect",
      success: !0
    }), window.close();
  }
}
customElements.define("bb-connection-broker", f);
