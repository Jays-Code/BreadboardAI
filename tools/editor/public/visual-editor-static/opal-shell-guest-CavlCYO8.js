import { o as _t, r as mt, g as St, i as K, b as Ct, c as Et, e as yt, S as _e, d as Ge, v as Ot, f as It, h as Nt } from "./logger-BR29-LuY.js";
import { a as bt, C as Tt } from "./oauth-bA5gMzvn.js";
var At = Object.defineProperty, Mt = (e, t, r) => t in e ? At(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, me = (e, t, r) => (Mt(e, typeof t != "symbol" ? t + "" : t, r), r), Pt = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, Se = (e, t) => {
  if (Object(t) !== t)
    throw TypeError('Cannot use the "in" operator on this value');
  return e.has(t);
}, ae = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Ue = (e, t, r) => (Pt(e, t, "access private method"), r);
function qe(e, t) {
  return Object.is(e, t);
}
let f = null, X = !1, ue = 1;
const pe = /* @__PURE__ */ Symbol("SIGNAL");
function z(e) {
  const t = f;
  return f = e, t;
}
function Wt() {
  return f;
}
function kt() {
  return X;
}
const Ae = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {
  },
  consumerMarkedDirty: () => {
  },
  consumerOnSignalRead: () => {
  }
};
function ve(e) {
  if (X)
    throw new Error(
      typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : ""
    );
  if (f === null)
    return;
  f.consumerOnSignalRead(e);
  const t = f.nextProducerIndex++;
  if (V(f), t < f.producerNode.length && f.producerNode[t] !== e && Ne(f)) {
    const r = f.producerNode[t];
    ge(r, f.producerIndexOfThis[t]);
  }
  f.producerNode[t] !== e && (f.producerNode[t] = e, f.producerIndexOfThis[t] = Ne(f) ? Qe(e, f, t) : 0), f.producerLastReadVersion[t] = e.version;
}
function xt() {
  ue++;
}
function je(e) {
  if (!(!e.dirty && e.lastCleanEpoch === ue)) {
    if (!e.producerMustRecompute(e) && !Gt(e)) {
      e.dirty = !1, e.lastCleanEpoch = ue;
      return;
    }
    e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = ue;
  }
}
function Be(e) {
  if (e.liveConsumerNode === void 0)
    return;
  const t = X;
  X = !0;
  try {
    for (const r of e.liveConsumerNode)
      r.dirty || Lt(r);
  } finally {
    X = t;
  }
}
function Rt() {
  return f?.consumerAllowSignalWrites !== !1;
}
function Lt(e) {
  var t;
  e.dirty = !0, Be(e), (t = e.consumerMarkedDirty) == null || t.call(e.wrapper ?? e);
}
function Dt(e) {
  return e && (e.nextProducerIndex = 0), z(e);
}
function $t(e, t) {
  if (z(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
    if (Ne(e))
      for (let r = e.nextProducerIndex; r < e.producerNode.length; r++)
        ge(e.producerNode[r], e.producerIndexOfThis[r]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
  }
}
function Gt(e) {
  V(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    const r = e.producerNode[t], s = e.producerLastReadVersion[t];
    if (s !== r.version || (je(r), s !== r.version))
      return !0;
  }
  return !1;
}
function Qe(e, t, r) {
  var s;
  if (Me(e), V(e), e.liveConsumerNode.length === 0) {
    (s = e.watched) == null || s.call(e.wrapper);
    for (let i = 0; i < e.producerNode.length; i++)
      e.producerIndexOfThis[i] = Qe(e.producerNode[i], e, i);
  }
  return e.liveConsumerIndexOfThis.push(r), e.liveConsumerNode.push(t) - 1;
}
function ge(e, t) {
  var r;
  if (Me(e), V(e), typeof ngDevMode < "u" && ngDevMode && t >= e.liveConsumerNode.length)
    throw new Error(
      `Assertion error: active consumer index ${t} is out of bounds of ${e.liveConsumerNode.length} consumers)`
    );
  if (e.liveConsumerNode.length === 1) {
    (r = e.unwatched) == null || r.call(e.wrapper);
    for (let i = 0; i < e.producerNode.length; i++)
      ge(e.producerNode[i], e.producerIndexOfThis[i]);
  }
  const s = e.liveConsumerNode.length - 1;
  if (e.liveConsumerNode[t] = e.liveConsumerNode[s], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[s], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
    const i = e.liveConsumerIndexOfThis[t], o = e.liveConsumerNode[t];
    V(o), o.producerIndexOfThis[i] = t;
  }
}
function Ne(e) {
  var t;
  return e.consumerIsAlwaysLive || (((t = e?.liveConsumerNode) == null ? void 0 : t.length) ?? 0) > 0;
}
function V(e) {
  e.producerNode ?? (e.producerNode = []), e.producerIndexOfThis ?? (e.producerIndexOfThis = []), e.producerLastReadVersion ?? (e.producerLastReadVersion = []);
}
function Me(e) {
  e.liveConsumerNode ?? (e.liveConsumerNode = []), e.liveConsumerIndexOfThis ?? (e.liveConsumerIndexOfThis = []);
}
function Ye(e) {
  if (je(e), ve(e), e.value === be)
    throw e.error;
  return e.value;
}
function Ut(e) {
  const t = Object.create(Ht);
  t.computation = e;
  const r = () => Ye(t);
  return r[pe] = t, r;
}
const Ce = /* @__PURE__ */ Symbol("UNSET"), Ee = /* @__PURE__ */ Symbol("COMPUTING"), be = /* @__PURE__ */ Symbol("ERRORED"), Ht = {
  ...Ae,
  value: Ce,
  dirty: !0,
  error: null,
  equal: qe,
  producerMustRecompute(e) {
    return e.value === Ce || e.value === Ee;
  },
  producerRecomputeValue(e) {
    if (e.value === Ee)
      throw new Error("Detected cycle in computations.");
    const t = e.value;
    e.value = Ee;
    const r = Dt(e);
    let s, i = !1;
    try {
      s = e.computation.call(e.wrapper), i = t !== Ce && t !== be && e.equal.call(e.wrapper, t, s);
    } catch (o) {
      s = be, e.error = o;
    } finally {
      $t(e, r);
    }
    if (i) {
      e.value = t;
      return;
    }
    e.value = s, e.version++;
  }
};
function zt() {
  throw new Error();
}
let Ft = zt;
function Vt() {
  Ft();
}
function qt(e) {
  const t = Object.create(Qt);
  t.value = e;
  const r = () => (ve(t), t.value);
  return r[pe] = t, r;
}
function jt() {
  return ve(this), this.value;
}
function Bt(e, t) {
  Rt() || Vt(), e.equal.call(e.wrapper, e.value, t) || (e.value = t, Yt(e));
}
const Qt = {
  ...Ae,
  equal: qe,
  value: void 0
};
function Yt(e) {
  e.version++, xt(), Be(e);
}
const w = /* @__PURE__ */ Symbol("node");
var te;
((e) => {
  var t, r, s, i;
  class o {
    constructor(m, d = {}) {
      ae(this, r), me(this, t);
      const n = qt(m)[pe];
      if (this[w] = n, n.wrapper = this, d) {
        const C = d.equals;
        C && (n.equal = C), n.watched = d[e.subtle.watched], n.unwatched = d[e.subtle.unwatched];
      }
    }
    get() {
      if (!(0, e.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.get");
      return jt.call(this[w]);
    }
    set(m) {
      if (!(0, e.isState)(this))
        throw new TypeError("Wrong receiver type for Signal.State.prototype.set");
      if (kt())
        throw new Error("Writes to signals not permitted during Watcher callback");
      const d = this[w];
      Bt(d, m);
    }
  }
  t = w, r = /* @__PURE__ */ new WeakSet(), e.isState = (l) => typeof l == "object" && Se(r, l), e.State = o;
  class p {
    // Create a Signal which evaluates to the value returned by the callback.
    // Callback is called with this signal as the parameter.
    constructor(m, d) {
      ae(this, i), me(this, s);
      const n = Ut(m)[pe];
      if (n.consumerAllowSignalWrites = !0, this[w] = n, n.wrapper = this, d) {
        const C = d.equals;
        C && (n.equal = C), n.watched = d[e.subtle.watched], n.unwatched = d[e.subtle.unwatched];
      }
    }
    get() {
      if (!(0, e.isComputed)(this))
        throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");
      return Ye(this[w]);
    }
  }
  s = w, i = /* @__PURE__ */ new WeakSet(), e.isComputed = (l) => typeof l == "object" && Se(i, l), e.Computed = p, ((l) => {
    var m, d, S, n;
    function C(u) {
      let a, c = null;
      try {
        c = z(null), a = u();
      } finally {
        z(c);
      }
      return a;
    }
    l.untrack = C;
    function _(u) {
      var a;
      if (!(0, e.isComputed)(u) && !(0, e.isWatcher)(u))
        throw new TypeError("Called introspectSources without a Computed or Watcher argument");
      return ((a = u[w].producerNode) == null ? void 0 : a.map((c) => c.wrapper)) ?? [];
    }
    l.introspectSources = _;
    function A(u) {
      var a;
      if (!(0, e.isComputed)(u) && !(0, e.isState)(u))
        throw new TypeError("Called introspectSinks without a Signal argument");
      return ((a = u[w].liveConsumerNode) == null ? void 0 : a.map((c) => c.wrapper)) ?? [];
    }
    l.introspectSinks = A;
    function U(u) {
      if (!(0, e.isComputed)(u) && !(0, e.isState)(u))
        throw new TypeError("Called hasSinks without a Signal argument");
      const a = u[w].liveConsumerNode;
      return a ? a.length > 0 : !1;
    }
    l.hasSinks = U;
    function H(u) {
      if (!(0, e.isComputed)(u) && !(0, e.isWatcher)(u))
        throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const a = u[w].producerNode;
      return a ? a.length > 0 : !1;
    }
    l.hasSources = H;
    class E {
      // When a (recursive) source of Watcher is written to, call this callback,
      // if it hasn't already been called since the last `watch` call.
      // No signals may be read or written during the notify.
      constructor(a) {
        ae(this, d), ae(this, S), me(this, m);
        let c = Object.create(Ae);
        c.wrapper = this, c.consumerMarkedDirty = a, c.consumerIsAlwaysLive = !0, c.consumerAllowSignalWrites = !1, c.producerNode = [], this[w] = c;
      }
      // Add these signals to the Watcher's set, and set the watcher to run its
      // notify callback next time any signal in the set (or one of its dependencies) changes.
      // Can be called with no arguments just to reset the "notified" state, so that
      // the notify callback will be invoked again.
      watch(...a) {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        Ue(this, S, n).call(this, a);
        const c = this[w];
        c.dirty = !1;
        const y = z(c);
        for (const ne of a)
          ve(ne[w]);
        z(y);
      }
      // Remove these signals from the watched set (e.g., for an effect which is disposed)
      unwatch(...a) {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        Ue(this, S, n).call(this, a);
        const c = this[w];
        V(c);
        for (let y = c.producerNode.length - 1; y >= 0; y--)
          if (a.includes(c.producerNode[y].wrapper)) {
            ge(c.producerNode[y], c.producerIndexOfThis[y]);
            const ne = c.producerNode.length - 1;
            if (c.producerNode[y] = c.producerNode[ne], c.producerIndexOfThis[y] = c.producerIndexOfThis[ne], c.producerNode.length--, c.producerIndexOfThis.length--, c.nextProducerIndex--, y < c.producerNode.length) {
              const wt = c.producerIndexOfThis[y], $e = c.producerNode[y];
              Me($e), $e.liveConsumerIndexOfThis[wt] = y;
            }
          }
      }
      // Returns the set of computeds in the Watcher's set which are still yet
      // to be re-evaluated
      getPending() {
        if (!(0, e.isWatcher)(this))
          throw new TypeError("Called getPending without Watcher receiver");
        return this[w].producerNode.filter((c) => c.dirty).map((c) => c.wrapper);
      }
    }
    m = w, d = /* @__PURE__ */ new WeakSet(), S = /* @__PURE__ */ new WeakSet(), n = function(u) {
      for (const a of u)
        if (!(0, e.isComputed)(a) && !(0, e.isState)(a))
          throw new TypeError("Called watch/unwatch without a Computed or State argument");
    }, e.isWatcher = (u) => Se(d, u), l.Watcher = E;
    function g() {
      var u;
      return (u = Wt()) == null ? void 0 : u.wrapper;
    }
    l.currentComputed = g, l.watched = /* @__PURE__ */ Symbol("watched"), l.unwatched = /* @__PURE__ */ Symbol("unwatched");
  })(e.subtle || (e.subtle = {}));
})(te || (te = {}));
function D(...e) {
  if (e[1].kind === "accessor")
    return Jt(...e);
  if (e[1].kind === "getter")
    return Kt(...e);
  throw new Error("@signal can only be used on accessors or getters");
}
function Jt(e, t) {
  const {
    get: r
  } = e;
  if (t.kind !== "accessor")
    throw new Error("Expected to be used on an accessor property");
  return {
    get() {
      return r.call(this).get();
    },
    set(s) {
      r.call(this).set(s);
    },
    init(s) {
      return new te.State(s);
    }
  };
}
function Kt(e, t) {
  if (t.kind !== "getter")
    throw new Error("Can only use @cached on getters.");
  const s = /* @__PURE__ */ new WeakMap();
  return function() {
    let i = s.get(e);
    i || (i = /* @__PURE__ */ new WeakMap(), s.set(e, i));
    let o = i.get(this);
    return o || (o = new te.Computed(() => e.call(this)), i.set(this, o)), o.get();
  };
}
const He = (e = null) => new te.State(e, {
  equals: () => !1
});
class Je {
  collection = He();
  storages = /* @__PURE__ */ new Map();
  vals;
  readStorageFor(t) {
    const {
      storages: r
    } = this;
    let s = r.get(t);
    s === void 0 && (s = He(), r.set(t, s)), s.get();
  }
  dirtyStorageFor(t) {
    const r = this.storages.get(t);
    r && r.set(null);
  }
  constructor(t) {
    this.vals = t ? new Map(t) : /* @__PURE__ */ new Map();
  }
  // **** KEY GETTERS ****
  get(t) {
    return this.readStorageFor(t), this.vals.get(t);
  }
  has(t) {
    return this.readStorageFor(t), this.vals.has(t);
  }
  // **** ALL GETTERS ****
  entries() {
    return this.collection.get(), this.vals.entries();
  }
  keys() {
    return this.collection.get(), this.vals.keys();
  }
  values() {
    return this.collection.get(), this.vals.values();
  }
  forEach(t) {
    this.collection.get(), this.vals.forEach(t);
  }
  get size() {
    return this.collection.get(), this.vals.size;
  }
  [Symbol.iterator]() {
    return this.collection.get(), this.vals[Symbol.iterator]();
  }
  get [Symbol.toStringTag]() {
    return this.vals[Symbol.toStringTag];
  }
  // **** KEY SETTERS ****
  set(t, r) {
    return this.dirtyStorageFor(t), this.collection.set(null), this.vals.set(t, r), this;
  }
  delete(t) {
    return this.dirtyStorageFor(t), this.collection.set(null), this.vals.delete(t);
  }
  // **** ALL SETTERS ****
  clear() {
    this.storages.forEach((t) => t.set(null)), this.collection.set(null), this.vals.clear();
  }
}
Object.setPrototypeOf(Je.prototype, Map.prototype);
var Xt = Object.create, Ke = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, er = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), q = (e) => {
  throw TypeError(e);
}, tr = (e, t, r) => t in e ? Ke(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, rr = (e) => [, , , Xt(null)], sr = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Q = (e) => e !== void 0 && typeof e != "function" ? q("Function expected") : e, ir = (e, t, r, s, i) => ({ kind: sr[e], name: t, metadata: s, addInitializer: (o) => r._ ? q("Already initialized") : i.push(Q(o || null)) }), or = (e, t) => tr(t, er("metadata"), e[3]), ce = (e, t, r, s) => {
  for (var i = 0, o = e[t >> 1], p = o && o.length; i < p; i++) t & 1 ? o[i].call(r) : s = o[i].call(r, s);
  return s;
}, Xe = (e, t, r, s, i, o) => {
  for (var p, l, m, d, S, n = t & 7, C = !1, _ = !0, A = e.length + 1, U = e[A - 1] = [], H = e[A] || (e[A] = []), E = n && n < 5 && (n > 3 || !_) && Zt({ get [r]() {
    return h(this, o);
  }, set [r](u) {
    return P(this, o, u);
  } }, r), g = s.length - 1; g >= 0; g--)
    d = ir(n, r, m = {}, e[3], H), d.static = C, d.private = _, S = d.access = { has: (u) => nr(i, u) }, S.get = (u) => h(u, i, E.get), S.set = (u, a) => P(u, i, a, E.set), l = (0, s[g])({ get: E.get, set: E.set }, d), m._ = 1, l === void 0 ? Q(l) && (o = l) : typeof l != "object" || l === null ? q("Object expected") : (Q(p = l.get) && (E.get = p), Q(p = l.set) && (E.set = p), Q(p = l.init) && U.unshift(p));
  return E && Ke(i, r, E), _ ? n ^ 4 ? o : E : i;
}, Pe = (e, t, r) => t.has(e) || q("Cannot " + r), nr = (e, t) => Object(t) !== t ? q('Cannot use the "in" operator on this value') : e.has(t), h = (e, t, r) => (Pe(e, t, "read from private field"), r ? r.call(e) : t.get(e)), N = (e, t, r) => t.has(e) ? q("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), P = (e, t, r, s) => (Pe(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r), W = (e, t, r) => (Pe(e, t, "access private method"), r), Ze, et, b, M, We, ye, ke, Te, v, re, xe, Oe, tt, rt, we, Z, F, st, it, ot, se, ee, fe, nt, at;
const ar = "graph-cache", $ = "user-graphs", G = "user-metadata", cr = 1440 * 60 * 1e3, lr = 7 * cr;
function ct() {
  return _t(ar, 1, {
    upgrade: (e) => {
      e.createObjectStore($, {
        keyPath: "url"
      }), e.createObjectStore(G);
    }
  });
}
async function ur() {
  const e = await ct(), t = e.transaction(
    [$, G],
    "readwrite"
  ), r = t.objectStore($), s = t.objectStore(G);
  await Promise.all([r.clear(), s.clear()]), await t.done, e.close();
}
et = [D], Ze = [D];
class hr {
  constructor(t) {
    this.listUserOpals = t, N(this, v), N(this, b, new Je()), N(this, We, ce(M, 8, this, !0)), ce(M, 11, this), N(this, re, Promise.withResolvers()), N(this, xe, ce(M, 12, this)), ce(M, 15, this), N(this, we, ct()), N(this, Z, !1), N(this, F, []), N(this, se, []), N(this, ee, !1), W(this, v, st).call(this);
  }
  has(t) {
    return h(this, b).has(t);
  }
  entries() {
    return h(this, b).entries();
  }
  get size() {
    return h(this, b).size;
  }
  get loading() {
    return h(this, v, ke);
  }
  get loaded() {
    return h(this, re).promise;
  }
  get error() {
    return h(this, v, tt);
  }
  put(t) {
    h(this, b).set(t.url, t), h(this, Z) ? W(this, v, fe).call(this, ({ graphs: r }) => r.put(t)) : h(this, F).push(() => this.put(t));
  }
  delete(t) {
    const r = h(this, b).delete(t);
    return h(this, Z) ? W(this, v, fe).call(this, ({ graphs: s }) => s.delete(t)) : h(this, F).push(() => this.delete(t)), r;
  }
}
M = rr();
b = /* @__PURE__ */ new WeakMap();
We = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakSet();
re = /* @__PURE__ */ new WeakMap();
xe = /* @__PURE__ */ new WeakMap();
we = /* @__PURE__ */ new WeakMap();
Z = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
st = async function() {
  const e = W(this, v, ot).call(this), t = await W(this, v, it).call(this);
  if (t !== void 0) {
    for (const s of t)
      h(this, b).set(s.url, s);
    P(this, v, !1, Te), h(this, re).resolve();
  }
  const r = await e;
  h(this, b).clear();
  for (const s of r)
    h(this, b).set(s.url, s);
  for (await W(this, v, fe).call(this, async ({ graphs: s, metadata: i }) => {
    await s.clear(), await Promise.all(r.map((o) => s.put(o))), await i.put(Date.now(), "lastAuthoritativeSyncMillis");
  }), P(this, Z, !0); h(this, F).length > 0; )
    h(this, F).pop()();
  h(this, v, ke) && (P(this, v, !1, Te), h(this, re).resolve());
};
it = async function() {
  const t = (await h(this, we)).transaction(
    [$, G],
    "readonly"
  ), s = await (await t.objectStore(G)).get(
    "lastAuthoritativeSyncMillis"
  );
  return s === void 0 || s < Date.now() - lr ? void 0 : await t.objectStore($).getAll();
};
ot = async function() {
  const e = await this.listUserOpals();
  return e.ok ? e.files.map((t) => {
    const r = `drive:/${t.id}`, s = mt(t);
    return {
      url: r,
      title: t.name,
      description: s.description,
      thumbnail: s.thumbnailUrl,
      mine: !0,
      readonly: !1,
      handle: null
    };
  }) : (W(this, v, at).call(this, new AggregateError([e.error], "error while listing user opals")), []);
};
se = /* @__PURE__ */ new WeakMap();
ee = /* @__PURE__ */ new WeakMap();
fe = function(e) {
  const t = Promise.withResolvers();
  return h(this, se).push({ done: t, func: e }), W(this, v, nt).call(this), t.promise;
};
nt = async function() {
  if (h(this, ee))
    return;
  P(this, ee, !0);
  const e = await h(this, we);
  for (; h(this, se).length > 0; ) {
    const { func: t, done: r } = h(this, se).pop(), s = e.transaction(
      [$, G],
      "readwrite"
    );
    try {
      const i = s.objectStore($), o = s.objectStore(G);
      await t({ graphs: i, metadata: o }), await s.done;
    } catch (i) {
      s.abort(), r.reject(i);
    }
    r.resolve();
  }
  P(this, ee, !1);
};
at = function(e) {
  console.error(`[user graphs] ${e.message}`, e), P(this, v, e, rt);
};
ye = Xe(M, 20, "#loading", et, v, We), ke = ye.get, Te = ye.set;
Oe = Xe(M, 20, "#error", Ze, v, xe), tt = Oe.get, rt = Oe.set;
or(M, hr);
var dr = Object.create, Re = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, fr = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), j = (e) => {
  throw TypeError(e);
}, vr = (e, t, r) => t in e ? Re(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ze = (e, t) => Re(e, "name", { value: t, configurable: !0 }), gr = (e) => [, , , dr(null)], lt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Y = (e) => e !== void 0 && typeof e != "function" ? j("Function expected") : e, wr = (e, t, r, s, i) => ({ kind: lt[e], name: t, metadata: s, addInitializer: (o) => r._ ? j("Already initialized") : i.push(Y(o || null)) }), ut = (e, t) => vr(t, fr("metadata"), e[3]), Ie = (e, t, r, s) => {
  for (var i = 0, o = e[t >> 1], p = o && o.length; i < p; i++) t & 1 ? o[i].call(r) : s = o[i].call(r, s);
  return s;
}, oe = (e, t, r, s, i, o) => {
  var p, l, m, d, S, n = t & 7, C = !!(t & 8), _ = !!(t & 16), A = n > 3 ? e.length + 1 : n ? C ? 1 : 2 : 0, U = lt[n + 5], H = n > 3 && (e[A - 1] = []), E = e[A] || (e[A] = []), g = n && (!_ && !C && (i = i.prototype), n < 5 && (n > 3 || !_) && pr(n < 4 ? i : { get [r]() {
    return O(this, o);
  }, set [r](a) {
    return ie(this, o, a);
  } }, r));
  n ? _ && n < 4 && ze(o, (n > 2 ? "set " : n > 1 ? "get " : "") + r) : ze(i, r);
  for (var u = s.length - 1; u >= 0; u--)
    d = wr(n, r, m = {}, e[3], E), n && (d.static = C, d.private = _, S = d.access = { has: _ ? (a) => _r(i, a) : (a) => r in a }, n ^ 3 && (S.get = _ ? (a) => (n ^ 1 ? O : he)(a, i, n ^ 4 ? o : g.get) : (a) => a[r]), n > 2 && (S.set = _ ? (a, c) => ie(a, i, c, n ^ 4 ? o : g.set) : (a, c) => a[r] = c)), l = (0, s[u])(n ? n < 4 ? _ ? o : g[U] : n > 4 ? void 0 : { get: g.get, set: g.set } : i, d), m._ = 1, n ^ 4 || l === void 0 ? Y(l) && (n > 4 ? H.unshift(l) : n ? _ ? o = l : g[U] = l : i = l) : typeof l != "object" || l === null ? j("Object expected") : (Y(p = l.get) && (g.get = p), Y(p = l.set) && (g.set = p), Y(p = l.init) && H.unshift(p));
  return n || ut(e, i), g && Re(i, r, g), _ ? n ^ 4 ? o : g : i;
}, Le = (e, t, r) => t.has(e) || j("Cannot " + r), _r = (e, t) => Object(t) !== t ? j('Cannot use the "in" operator on this value') : e.has(t), O = (e, t, r) => (Le(e, t, "read from private field"), r ? r.call(e) : t.get(e)), le = (e, t, r) => t.has(e) ? j("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), ie = (e, t, r, s) => (Le(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r), he = (e, t, r) => (Le(e, t, "access private method"), r), ht, dt, pt, ft, vt, L, I, J, de, T, De;
vt = [D], ft = [D], pt = [D], dt = [D], ht = [D];
class B {
  constructor(t) {
    Ie(T, 5, this), le(this, J), le(this, L), le(this, I), this.fetchWithCreds = void 0, le(this, De, Ie(T, 8, this)), Ie(T, 11, this), ie(this, L, t), this.fetchWithCreds = t.fetchWithCreds.bind(t), ie(this, I, t.getSignInState()), he(this, J, de).call(this, O(this, I));
  }
  get state() {
    return O(this, I).then(({ status: t }) => t);
  }
  get nameSignal() {
    return this.stateSignal?.status === "signedin" ? this.stateSignal.name : void 0;
  }
  get name() {
    return O(this, I).then(() => this.nameSignal);
  }
  get pictureSignal() {
    return this.stateSignal?.status === "signedin" ? this.stateSignal.picture : void 0;
  }
  get picture() {
    return O(this, I).then(() => this.pictureSignal);
  }
  get domainSignal() {
    return this.stateSignal?.status === "signedin" ? this.stateSignal.domain : void 0;
  }
  get domain() {
    return O(this, I).then(() => this.domainSignal);
  }
  get scopesSignal() {
    return this.stateSignal?.status === "signedin" ? new Set(this.stateSignal.scopes) : void 0;
  }
  get scopes() {
    return O(this, I).then(() => this.scopesSignal);
  }
  async signIn(t = []) {
    const r = await O(this, L).signIn(t);
    return r.ok && he(this, J, de).call(this, Promise.resolve(r.state)), r;
  }
  async signOut() {
    await Promise.all([
      O(this, L).signOut(),
      // Clear caches on signout because they contain user-specific data, like
      // the user's graphs, which we must not share across different signins.
      ur(),
      (async () => Promise.all(
        (await globalThis.caches.keys()).map(
          (t) => globalThis.caches.delete(t)
        )
      ))()
    ]), he(this, J, de).call(this, Promise.resolve({ status: "signedout" }));
  }
  checkAppAccess() {
    return O(this, L).checkAppAccess();
  }
  validateScopes() {
    return O(this, L).validateScopes();
  }
}
T = gr();
L = /* @__PURE__ */ new WeakMap();
I = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakSet();
de = function(e) {
  ie(this, I, e), e.then((t) => {
    O(this, I) === e && (this.stateSignal = t);
  });
};
De = /* @__PURE__ */ new WeakMap();
oe(T, 4, "stateSignal", vt, B, De);
oe(T, 2, "nameSignal", ft, B);
oe(T, 2, "pictureSignal", pt, B);
oe(T, 2, "domainSignal", dt, B);
oe(T, 2, "scopesSignal", ht, B);
ut(T, B);
function Ir(e) {
  return e;
}
function Nr() {
  return {
    showIterateOnPrompt: !1
  };
}
class Fe extends EventTarget {
  constructor(t) {
    super(), this.debug = !1, this.#e = t;
  }
  #e;
  #t(...t) {
    this.debug && console.log(t);
  }
  async sendToEmbedder(t) {
    this.#t("[Embed handler sending]: ", t), this.#e.sendToEmbedder(t);
  }
}
globalThis.URLPattern || await import("./index-Drt_wd52.js");
const br = "OpalShell", Ve = "shellOrigin", k = St(), x = "Shell Guest", R = !1;
async function Tr() {
  const e = await Cr();
  if (!e) {
    k.log(
      K("Creating legacy host"),
      x,
      R
    );
    const i = new Ct(), o = new Fe(i);
    return bt(
      (p) => o.dispatchEvent(new gt(p))
    ), { shellHost: i, embedHandler: o, hostOrigin: new URL(location.origin) };
  }
  const t = await mr(e);
  k.log(
    K("Connecting to host API"),
    x,
    R
  );
  const r = Et(t);
  Er(r), k.log(
    K("Exposing guest API"),
    x,
    R
  );
  const s = new Fe(r);
  return yt(
    new Sr(s),
    t
  ), { shellHost: r, embedHandler: s, hostOrigin: new URL(e) };
}
async function mr(e) {
  const { port1: t, port2: r } = new MessageChannel();
  k.log(
    K(
      "Sending establish MessageChannel request to",
      e
    ),
    x,
    R
  ), window.parent.postMessage(
    { type: It },
    e,
    [r]
  );
  const s = Promise.withResolvers(), i = new AbortController();
  return t.start(), t.addEventListener(
    "message",
    (o) => {
      o.isTrusted && typeof o.data == "object" && o.data !== null && o.data.type === Nt && (k.log(
        K(
          "Received establish MessageChannel response"
        ),
        x,
        R
      ), s.resolve(), i.abort());
    },
    { signal: i.signal }
  ), await s.promise, t;
}
class Sr {
  constructor(t) {
    this.receiveFromEmbedder = async (r) => {
      this.#e.dispatchEvent(new gt(r));
    }, this.#e = t;
  }
  #e;
}
class gt extends Event {
  constructor(t) {
    super(t.type), this.message = t;
  }
}
async function Cr() {
  const e = Tt.SHELL_HOST_ORIGINS;
  if (!e?.length || /* not iframed */
  window === window.parent)
    return;
  const t = new URL(window.location.href), r = t.searchParams.get(
    _e
  );
  r && (t.searchParams.delete(_e), history.replaceState(history.state, "", t));
  const s = r || sessionStorage.getItem(Ve);
  if (!s) {
    k.log(
      Ge(
        `Could not find shell origin because shell did not set the ${JSON.stringify(_e)} URL parameter.`
      ),
      x,
      R
    );
    return;
  }
  for (const i of e)
    if (new URLPattern(i).test(s))
      return k.log(
        Ot(
          `${s} matched allowed origin ${i}`
        ),
        x,
        R
      ), r && sessionStorage.setItem(
        Ve,
        r
      ), s;
  k.log(
    Ge(
      "Shell origin was not in allowlist",
      s
    ),
    x,
    R
  );
}
function Er(e) {
  const t = () => {
    const r = new URL(window.location.href);
    r.pathname = r.pathname.replace(/^\/_app/, ""), e.setUrl(r.href);
  };
  for (const r of [
    "pushState",
    "replaceState",
    "back",
    "forward",
    "go"
  ]) {
    const s = history[r].bind(history);
    history[r] = (...i) => {
      const o = s(...i);
      return t(), o;
    };
  }
  window.addEventListener("popstate", t), t();
}
export {
  hr as D,
  B as S,
  te as a,
  Je as b,
  Tr as c,
  He as d,
  Nr as e,
  Ir as n,
  br as o,
  D as s
};
