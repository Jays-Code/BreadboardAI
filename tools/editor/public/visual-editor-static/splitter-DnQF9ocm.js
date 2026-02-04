import { i as gt, n as wt, e as kt, b as O, A as it, a as bt, h as St, t as zt, d as y } from "./map-z4l6LcMf.js";
var xt = Object.create, Q = Object.defineProperty, yt = Object.getOwnPropertyDescriptor, nt = (t, e) => (e = Symbol[t]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + t), C = (t) => {
  throw TypeError(t);
}, Mt = (t, e, i) => e in t ? Q(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i, st = (t, e) => Q(t, "name", { value: e, configurable: !0 }), Ct = (t) => [, , , xt(t?.[nt("metadata")] ?? null)], rt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], E = (t) => t !== void 0 && typeof t != "function" ? C("Function expected") : t, $t = (t, e, i, r, a) => ({ kind: rt[t], name: e, metadata: r, addInitializer: (o) => i._ ? C("Already initialized") : a.push(E(o || null)) }), Et = (t, e) => Mt(e, nt("metadata"), t[3]), v = (t, e, i, r) => {
  for (var a = 0, o = t[e >> 1], n = o && o.length; a < n; a++) e & 1 ? o[a].call(i) : r = o[a].call(i, r);
  return r;
}, z = (t, e, i, r, a, o) => {
  var n, h, x, $, R, l = e & 7, N = !!(e & 8), w = !!(e & 16), L = l > 3 ? t.length + 1 : l ? N ? 1 : 2 : 0, tt = rt[l + 5], et = l > 3 && (t[L - 1] = []), mt = t[L] || (t[L] = []), g = l && (!w && !N && (a = a.prototype), l < 5 && (l > 3 || !w) && yt(l < 4 ? a : { get [i]() {
    return s(this, o);
  }, set [i](_) {
    return S(this, o, _);
  } }, i));
  l ? w && l < 4 && st(o, (l > 2 ? "set " : l > 1 ? "get " : "") + i) : st(a, i);
  for (var B = r.length - 1; B >= 0; B--)
    $ = $t(l, i, x = {}, t[3], mt), l && ($.static = N, $.private = w, R = $.access = { has: w ? (_) => Tt(a, _) : (_) => i in _ }, l ^ 3 && (R.get = w ? (_) => (l ^ 1 ? s : p)(_, a, l ^ 4 ? o : g.get) : (_) => _[i]), l > 2 && (R.set = w ? (_, D) => S(_, a, D, l ^ 4 ? o : g.set) : (_, D) => _[i] = D)), h = (0, r[B])(l ? l < 4 ? w ? o : g[tt] : l > 4 ? void 0 : { get: g.get, set: g.set } : a, $), x._ = 1, l ^ 4 || h === void 0 ? E(h) && (l > 4 ? et.unshift(h) : l ? w ? o = h : g[tt] = h : a = h) : typeof h != "object" || h === null ? C("Object expected") : (E(n = h.get) && (g.get = n), E(n = h.set) && (g.set = n), E(n = h.init) && et.unshift(n));
  return l || Et(t, a), g && Q(a, i, g), w ? l ^ 4 ? o : g : a;
}, V = (t, e, i) => e.has(t) || C("Cannot " + i), Tt = (t, e) => Object(e) !== e ? C('Cannot use the "in" operator on this value') : t.has(e), s = (t, e, i) => (V(t, e, "read from private field"), i ? i.call(t) : e.get(t)), f = (t, e, i) => e.has(t) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), S = (t, e, i, r) => (V(t, e, "write to private field"), r ? r.call(t, i) : e.set(t, i), i), p = (t, e, i) => (V(t, e, "access private method"), i), at, ot, lt, ht, ct, dt, U, pt, c, J, X, G, Y, K, Z, M, m, k, I, j, T, u, W, d, ut, F, q, ft, _t, vt, A, P;
const H = "bb-split", At = 300;
pt = [zt("bb-splitter")];
class b extends (U = bt, dt = [y({ reflect: !0, attribute: !0 })], ct = [y({ reflect: !0, attribute: !0 })], ht = [y({ reflect: !0, attribute: !0, type: "number" })], lt = [y({ reflect: !0, attribute: !0, type: "number" })], ot = [y({
  reflect: !0,
  attribute: !0,
  type: Array,
  hasChanged(e) {
    return !Array.isArray(e) || e.length < 2 ? (console.warn(
      `A splitter needs two or more sections; ${JSON.stringify(
        e
      )} was provided`
    ), !1) : !0;
  }
})], at = [y({ reflect: !0 })], U) {
  constructor() {
    super(...arguments), f(this, d), f(this, J, v(
      c,
      8,
      this,
      "horizontal"
      /* HORIZONTAL */
    )), v(c, 11, this), f(this, X, v(c, 12, this, "")), v(c, 15, this), f(this, G, v(c, 16, this, 360)), v(c, 19, this), f(this, Y, v(c, 20, this, 200)), v(c, 23, this), f(this, K, v(c, 24, this, [0.5, 0.5])), v(c, 27, this), f(this, Z, v(c, 28, this, !1)), v(c, 31, this), f(this, M, St()), f(this, m, null), f(this, k, new DOMRect(0, 0, 0, 0)), f(this, I, p(this, d, _t).bind(this)), f(this, j, p(this, d, vt).bind(this)), f(this, T, !1), f(this, u, 0.1), f(this, W, new ResizeObserver((e) => {
      if (e.length === 0)
        return;
      const [i] = e;
      this.direction === "horizontal" ? S(this, u, this.minSegmentSizeHorizontal / i.contentRect.width) : S(this, u, this.minSegmentSizeVertical / i.contentRect.height), p(this, d, q).call(this);
    }));
  }
  connectedCallback() {
    super.connectedCallback(), s(this, W).observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), s(this, W).disconnect();
  }
  firstUpdated() {
    if (!this.name) {
      console.warn("Splitter has no name; it won't have any values stored.");
      return;
    }
    const e = globalThis.sessionStorage.getItem(
      `${H}-${this.name}`
    );
    if (e) {
      const i = JSON.parse(e);
      if (Array.isArray(i))
        if (i.length === this.split.length)
          for (let r = 0; r < i.length; r++)
            this.split[r] = i[r];
        else
          console.warn(
            "Stored splitter value differs from configured value - resetting"
          ), globalThis.sessionStorage.removeItem(
            `${H}-${this.name}`
          );
    }
    p(this, d, P).call(this);
  }
  willUpdate(e) {
    e.has("direction") && p(this, d, P).call(this);
  }
  render() {
    const e = this.split[0] <= 1 - s(this, u) ? "collapse" : "expand";
    return O`${this.split.map((i, r) => {
      const a = r < this.split.length - 1 && this.split.length === 2 ? O`<button
              id="quick-expand"
              ${wt(s(this, M))}
              class=${kt({ [e]: !0 })}
              @click=${() => {
        this.split[0] < 1 - s(this, u) ? p(this, d, F).call(this, 1 - s(this, u)) : p(this, d, F).call(this, s(this, u));
      }}
            >
              Quick expand
            </button>` : it, o = r < this.split.length - 1 ? O`<div
              @pointerdown=${p(this, d, ft)}
              class="drag-handle"
              data-idx="${r}"
            >
              ${a}
            </div>` : it;
      return O`<slot name="slot-${r}"></slot>${o}`;
    })}`;
  }
}
c = Ct(U);
J = /* @__PURE__ */ new WeakMap();
X = /* @__PURE__ */ new WeakMap();
G = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakMap();
K = /* @__PURE__ */ new WeakMap();
Z = /* @__PURE__ */ new WeakMap();
M = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
k = /* @__PURE__ */ new WeakMap();
I = /* @__PURE__ */ new WeakMap();
j = /* @__PURE__ */ new WeakMap();
T = /* @__PURE__ */ new WeakMap();
u = /* @__PURE__ */ new WeakMap();
W = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
ut = function(t, e = 3) {
  return 1 - Math.pow(1 - t, e);
};
F = function(t) {
  if (this.split.length !== 2)
    return;
  S(this, T, !0);
  const e = window.performance.now(), i = this.split[0], r = t - this.split[0], a = () => {
    const o = (window.performance.now() - e) / At, n = p(this, d, A).call(this, o, 0, 1);
    this.split[0] = i + r * p(this, d, ut).call(this, n), this.split[1] = 1 - this.split[0], n === 1 ? (this.split[0] = t, this.split[1] = 1 - t, S(this, T, !1)) : requestAnimationFrame(a), p(this, d, q).call(this);
  };
  requestAnimationFrame(a);
};
q = function() {
  this.name && globalThis.sessionStorage.setItem(
    `${H}-${this.name}`,
    JSON.stringify(this.split)
  ), p(this, d, P).call(this);
};
ft = function(t) {
  if (s(this, T))
    return;
  const [e] = t.composedPath();
  if (!(e instanceof HTMLElement))
    return;
  const i = Number.parseInt(e.dataset.idx || "");
  if (Number.isNaN(i))
    return;
  S(this, m, i);
  const r = this.children[s(this, m)], a = this.children[s(this, m) + 1];
  if (!r || !a)
    return;
  const o = r.getBoundingClientRect(), n = a.getBoundingClientRect();
  s(this, k).x = Math.min(o.x, n.x), s(this, k).y = Math.min(o.y, n.y), s(this, k).width = n.right - o.left, s(this, k).height = n.bottom - o.top, this.style.userSelect = "none", this.classList.add("active"), e.setPointerCapture(t.pointerId), window.addEventListener("pointermove", s(this, I)), window.addEventListener("pointerup", s(this, j), {
    once: !0
  });
};
_t = function(t) {
  if (s(this, m) === null)
    return;
  let e = (t.pageX - s(this, k).x) / s(this, k).width, i = (t.pageY - s(this, k).y) / s(this, k).height;
  const r = this.split[s(this, m)] + this.split[s(this, m) + 1];
  switch (this.direction) {
    case "horizontal": {
      e = p(this, d, A).call(this, e, s(this, u), 1 - s(this, u)), this.split[s(this, m)] = e * r, this.split[s(this, m) + 1] = (1 - e) * r;
      break;
    }
    case "vertical": {
      i = p(this, d, A).call(this, i, s(this, u), 1 - s(this, u)), this.split[s(this, m)] = i * r, this.split[s(this, m) + 1] = (1 - i) * r;
      break;
    }
  }
  p(this, d, q).call(this);
};
vt = function() {
  S(this, m, null), this.style.userSelect = "initial", this.classList.remove("active"), window.removeEventListener("pointermove", s(this, I));
};
A = function(t, e, i) {
  return t < e && (t = e), t > i && (t = i), t;
};
P = function() {
  const t = [...this.split], e = [];
  let i = 0;
  for (let n = 0; n < t.length; n++) {
    if (t[n] < s(this, u)) {
      i += s(this, u) - t[n], t[n] = s(this, u);
      continue;
    }
    e.push(n);
  }
  if (i > 0) {
    const n = e.reduce(
      (h, x) => h + t[x],
      0
    );
    for (let h = 0; h < e.length; h++) {
      const x = t[e[h]] / n * i;
      t[e[h]] = p(this, d, A).call(this, this.split[e[h]] - x, s(this, u), 1);
    }
  }
  const r = t.reduce((n, h) => n + h, 0);
  for (let n = 0; n < t.length; n++)
    t[n] = t[n] / r;
  const a = t.map((n, h) => `var(--slot-${h})`).join(" 0px ");
  switch (this.direction) {
    case "vertical": {
      this.style.gridTemplateColumns = "", this.style.gridTemplateRows = a;
      break;
    }
    case "horizontal": {
      this.style.gridTemplateRows = "", this.style.gridTemplateColumns = a;
      break;
    }
  }
  for (let n = 0; n < t.length; n++) {
    const h = t[n];
    this.style.setProperty(`--slot-${n}`, `${h}fr`);
  }
  if (!s(this, M).value)
    return;
  const o = t[0] < 1 - s(this, u);
  s(this, M).value.classList.toggle(
    "collapse",
    o
  ), s(this, M).value.classList.toggle(
    "expand",
    !o
  );
};
z(c, 4, "direction", dt, b, J);
z(c, 4, "name", ct, b, X);
z(c, 4, "minSegmentSizeHorizontal", ht, b, G);
z(c, 4, "minSegmentSizeVertical", lt, b, Y);
z(c, 4, "split", ot, b, K);
z(c, 4, "showQuickExpandCollapse", at, b, Z);
b = z(c, 0, "Splitter", pt, b);
b.styles = gt`
    :host {
      display: grid;
      grid-auto-rows: minmax(0, 1fr);
      overflow: auto;
      --handle-size: 16px;
      position: relative;
      container-type: size;
      contain: strict;
    }

    .drag-handle {
      z-index: 10;
      position: relative;
    }

    :host([direction="horizontal"].active) {
      cursor: ew-resize;
    }

    :host([direction="vertical"].active) {
      cursor: ns-resize;
    }

    :host([direction="horizontal"]) .drag-handle {
      cursor: ew-resize;
      width: var(--handle-size);
      translate: calc(var(--handle-size) * -0.5) 0;
    }

    :host([direction="vertical"]) .drag-handle {
      cursor: ns-resize;
      height: var(--handle-size);
      translate: 0 calc(var(--handle-size) * -0.5);
    }

    #quick-expand {
      position: absolute;
      width: 36px;
      height: 36px;
      font-size: 0;
      cursor: pointer;
      border: 1px solid var(--light-dark-n-90);
      border-radius: 50% 0 0 50%;
    }

    #quick-expand.expand {
      background: var(--light-dark-n-100) var(--bb-icon-before) center center /
        16px 16px no-repeat;
    }

    #quick-expand.collapse {
      background: var(--light-dark-n-100) var(--bb-icon-next) center center /
        16px 16px no-repeat;
    }

    :host([showQuickExpandCollapse="false"]) #quick-expand {
      display: none;
    }

    :host([direction="horizontal"]) #quick-expand {
      right: calc(var(--handle-size) * 0.5);
      top: 11px;
    }

    :host([direction="vertical"]) #quick-expand {
      bottom: calc(var(--handle-size) * 0.5);
      left: 50%;
      transform: translateX(-50%) rotate(90deg);
    }
  `;
v(c, 1, b);
