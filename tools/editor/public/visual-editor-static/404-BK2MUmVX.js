import { a as w, i as F, b as N, t as O } from "./map-z4l6LcMf.js";
import "./project-DMClisrJ.js";
import "./connection-broker-CilcgYmS.js";
import "./opal-shell-guest-CavlCYO8.js";
import { forSection as z } from "./helper-EFXUwdnr.js";
import "./logger-BR29-LuY.js";
var E = Object.create, s = Object.defineProperty, j = Object.getOwnPropertyDescriptor, h = (e, r) => (r = Symbol[e]) ? r : /* @__PURE__ */ Symbol.for("Symbol." + e), g = (e) => {
  throw TypeError(e);
}, A = (e, r, o) => r in e ? s(e, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[r] = o, I = (e, r) => s(e, "name", { value: r, configurable: !0 }), D = (e) => [, , , E(e?.[h("metadata")] ?? null)], M = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], P = (e) => e !== void 0 && typeof e != "function" ? g("Function expected") : e, $ = (e, r, o, n, t) => ({ kind: M[e], name: r, metadata: n, addInitializer: (a) => o._ ? g("Already initialized") : t.push(P(a || null)) }), k = (e, r) => A(r, h("metadata"), e[3]), C = (e, r, o, n) => {
  for (var t = 0, a = e[r >> 1], i = a && a.length; t < i; t++) a[t].call(o);
  return n;
}, G = (e, r, o, n, t, a) => {
  var i, v, u, l = r & 7, m = !1, f = 0, S = e[f] || (e[f] = []), _ = l && (t = t.prototype, l < 5 && (l > 3 || !m) && j(t, o));
  I(t, o);
  for (var c = n.length - 1; c >= 0; c--)
    u = $(l, o, v = {}, e[3], S), i = (0, n[c])(t, u), v._ = 1, P(i) && (t = i);
  return k(e, t), _ && s(t, o, _), m ? l ^ 4 ? a : _ : t;
}, b, p, x;
const y = z("Global");
console.log(y);
b = [O("page-not-found")];
class d extends (x = w) {
  static {
    this.styles = F`
    :host {
      display: flex;
      flex-direction: column;
      width: 100svw;
      height: 100svh;
      align-items: center;
      justify-content: center;
    }

    h1 {
      margin: 0 0 12px 0;
    }
  `;
  }
  render() {
    return N`<h1>Page not found</h1>
      <p>Please go to the <a href="/">${y.from("APP_NAME")} Home</a></p>`;
  }
}
p = D(x);
d = G(p, 0, "PageNotFound", b, d);
C(p, 1, d);
export {
  d as PageNotFound
};
