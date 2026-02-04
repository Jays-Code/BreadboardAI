import { D as b, m as P } from "./project-DMClisrJ.js";
import { t as O } from "./map-z4l6LcMf.js";
import { M as U } from "./main-base-C2DT6WmL.js";
import { p as M, m as R } from "./logger-BR29-LuY.js";
var x = Object.create, u = Object.defineProperty, E = Object.getOwnPropertyDescriptor, w = (e, r) => (r = Symbol[e]) ? r : /* @__PURE__ */ Symbol.for("Symbol." + e), v = (e) => {
  throw TypeError(e);
}, k = (e, r, a) => r in e ? u(e, r, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[r] = a, A = (e, r) => u(e, "name", { value: r, configurable: !0 }), D = (e) => [, , , x(e?.[w("metadata")] ?? null)], T = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], g = (e) => e !== void 0 && typeof e != "function" ? v("Function expected") : e, C = (e, r, a, n, o) => ({ kind: T[e], name: r, metadata: n, addInitializer: (t) => a._ ? v("Already initialized") : o.push(g(t || null)) }), K = (e, r) => k(r, w("metadata"), e[3]), F = (e, r, a, n) => {
  for (var o = 0, t = e[r >> 1], s = t && t.length; o < s; o++) t[o].call(a);
  return n;
}, z = (e, r, a, n, o, t) => {
  var s, l, i, c = r & 7, m = !1, h = 0, I = e[h] || (e[h] = []), d = c && (o = o.prototype, c < 5 && (c > 3 || !m) && E(o, a));
  A(o, a);
  for (var p = n.length - 1; p >= 0; p--)
    i = C(c, a, l = {}, e[3], I), s = (0, n[p])(o, i), l._ = 1, g(s) && (o = s);
  return K(e, o), d && u(o, a, d), m ? c ^ 4 ? t : d : o;
}, y, _, S;
y = [O("bb-open-main")];
class f extends (S = U) {
  async handleAppAccessCheckResult() {
  }
  async doPostInitWork() {
    const r = M(window.location.href);
    if (r.page !== "open") {
      window.location.href = "/_app/";
      return;
    }
    if (await this.askUserToSignInIfNeeded() !== "success") {
      window.location.href = "/_app/";
      return;
    }
    let n;
    try {
      n = await this.googleDriveClient.getFileMetadata(
        { id: r.fileId, resourceKey: r.resourceKey },
        { fields: ["properties"] }
      );
    } catch (i) {
      console.error(`[open] Error reading drive file ${r.fileId}`, i);
    }
    const o = n?.properties?.[b], t = o && this.guestConfiguration.shareSurfaceUrlTemplates?.[o];
    if (t) {
      const i = P({
        urlTemplate: t,
        fileId: r.fileId,
        resourceKey: r.resourceKey
      });
      console.log("[open] Redirecting to share surface", i), window.parent.location.href = i;
      return;
    }
    const s = await this.sca.services.signinAdapter.domain, l = s && this.globalConfig.domains?.[s]?.preferredUrl;
    if (l) {
      const i = new URL(
        window.location.pathname.replace(/^\/_app\//, "") + window.location.search + window.location.hash,
        l
      ).href;
      console.log("[open] Redirecting user to preferred domain", i), window.parent.location = i;
      return;
    }
    window.location.href = R({
      page: "graph",
      mode: "app",
      flow: `drive:/${r.fileId}`,
      resourceKey: r.resourceKey,
      guestPrefixed: !0
    });
  }
  render() {
    return this.renderSignInModal();
  }
}
_ = D(S);
f = z(_, 0, "OpenMain", y, f);
F(_, 1, f);
export {
  f as OpenMain
};
