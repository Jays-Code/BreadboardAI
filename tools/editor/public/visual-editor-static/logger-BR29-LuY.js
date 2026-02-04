import { C as u, s as Ke, O as Ye } from "./oauth-bA5gMzvn.js";
const Y = (e, t) => t.some((s) => e instanceof s);
let ce, le;
function Xe() {
  return ce || (ce = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Qe() {
  return le || (le = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const X = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap();
function Ze(e) {
  const t = new Promise((s, o) => {
    const r = () => {
      e.removeEventListener("success", n), e.removeEventListener("error", a);
    }, n = () => {
      s(v(e.result)), r();
    }, a = () => {
      o(e.error), r();
    };
    e.addEventListener("success", n), e.addEventListener("error", a);
  });
  return W.set(t, e), t;
}
function et(e) {
  if (X.has(e))
    return;
  const t = new Promise((s, o) => {
    const r = () => {
      e.removeEventListener("complete", n), e.removeEventListener("error", a), e.removeEventListener("abort", a);
    }, n = () => {
      s(), r();
    }, a = () => {
      o(e.error || new DOMException("AbortError", "AbortError")), r();
    };
    e.addEventListener("complete", n), e.addEventListener("error", a), e.addEventListener("abort", a);
  });
  X.set(e, t);
}
let Q = {
  get(e, t, s) {
    if (e instanceof IDBTransaction) {
      if (t === "done")
        return X.get(e);
      if (t === "store")
        return s.objectStoreNames[1] ? void 0 : s.objectStore(s.objectStoreNames[0]);
    }
    return v(e[t]);
  },
  set(e, t, s) {
    return e[t] = s, !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
  }
};
function Oe(e) {
  Q = e(Q);
}
function tt(e) {
  return Qe().includes(e) ? function(...t) {
    return e.apply(Z(this), t), v(this.request);
  } : function(...t) {
    return v(e.apply(Z(this), t));
  };
}
function st(e) {
  return typeof e == "function" ? tt(e) : (e instanceof IDBTransaction && et(e), Y(e, Xe()) ? new Proxy(e, Q) : e);
}
function v(e) {
  if (e instanceof IDBRequest)
    return Ze(e);
  if (H.has(e))
    return H.get(e);
  const t = st(e);
  return t !== e && (H.set(e, t), W.set(t, e)), t;
}
const Z = (e) => W.get(e);
function V(e, t, { blocked: s, upgrade: o, blocking: r, terminated: n } = {}) {
  const a = indexedDB.open(e, t), i = v(a);
  return o && a.addEventListener("upgradeneeded", (c) => {
    o(v(a.result), c.oldVersion, c.newVersion, v(a.transaction), c);
  }), s && a.addEventListener("blocked", (c) => s(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    c.oldVersion,
    c.newVersion,
    c
  )), i.then((c) => {
    n && c.addEventListener("close", () => n()), r && c.addEventListener("versionchange", (l) => r(l.oldVersion, l.newVersion, l));
  }).catch(() => {
  }), i;
}
function nt(e, { blocked: t } = {}) {
  const s = indexedDB.deleteDatabase(e);
  return t && s.addEventListener("blocked", (o) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    o.oldVersion,
    o
  )), v(s).then(() => {
  });
}
const rt = ["get", "getKey", "getAll", "getAllKeys", "count"], ot = ["put", "add", "delete", "clear"], $ = /* @__PURE__ */ new Map();
function de(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if ($.get(t))
    return $.get(t);
  const s = t.replace(/FromIndex$/, ""), o = t !== s, r = ot.includes(s);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(s in (o ? IDBIndex : IDBObjectStore).prototype) || !(r || rt.includes(s))
  )
    return;
  const n = async function(a, ...i) {
    const c = this.transaction(a, r ? "readwrite" : "readonly");
    let l = c.store;
    return o && (l = l.index(i.shift())), (await Promise.all([
      l[s](...i),
      r && c.done
    ]))[0];
  };
  return $.set(t, n), n;
}
Oe((e) => ({
  ...e,
  get: (t, s, o) => de(t, s) || e.get(t, s, o),
  has: (t, s) => !!de(t, s) || e.has(t, s)
}));
const at = ["continue", "continuePrimaryKey", "advance"], ue = {}, ee = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), it = {
  get(e, t) {
    if (!at.includes(t))
      return e[t];
    let s = ue[t];
    return s || (s = ue[t] = function(...o) {
      ee.set(this, Re.get(this)[t](...o));
    }), s;
  }
};
async function* ct(...e) {
  let t = this;
  if (t instanceof IDBCursor || (t = await t.openCursor(...e)), !t)
    return;
  t = t;
  const s = new Proxy(t, it);
  for (Re.set(s, t), W.set(s, Z(t)); t; )
    yield s, t = await (ee.get(s) || t.continue()), ee.delete(s);
}
function he(e, t) {
  return t === Symbol.asyncIterator && Y(e, [IDBIndex, IDBObjectStore, IDBCursor]) || t === "iterate" && Y(e, [IDBIndex, IDBObjectStore]);
}
Oe((e) => ({
  ...e,
  get(t, s, o) {
    return he(t, s) ? ct : e.get(t, s, o);
  },
  has(t, s) {
    return he(t, s) || e.has(t, s);
  }
}));
function Ps(e, t, s) {
  const o = (i) => new TextEncoder().encode(i).length;
  let r = 0, n = t.length - 1, a;
  for (; r <= n; ) {
    const i = Math.floor((r + n) / 2), c = t.slice(0, i + 1), l = o(e + c);
    if (l == s)
      return c;
    l < s ? (r = i + 1, a = r) : (n = i - 1, a = n);
  }
  return t.slice(0, a);
}
function Ae(e) {
  return e.match(/^drive:\/?(.+)/)?.[1] ?? null;
}
function bs(e) {
  const t = {
    title: e.properties?.title || e.appProperties?.title,
    description: e.properties?.description || e.appProperties?.description || "",
    tags: e.properties?.tags || e.appProperties?.tags,
    thumbnailUrl: e.properties?.thumbnailUrl || e.appProperties?.thumbnailUrl,
    latestSharedVersion: e.properties?.latestSharedVersion || e.appProperties?.latestSharedVersion
  };
  let s = [];
  try {
    s = t.tags ? JSON.parse(t.tags) : [], Array.isArray(s) || (s = []);
  } catch (o) {
    console.info("Exception when parsing DriveFile.tags", o);
  }
  return {
    title: t.title ?? "",
    description: t.description ?? "",
    tags: s,
    thumbnailUrl: t.thumbnailUrl,
    latestSharedVersion: t.latestSharedVersion
  };
}
function _s(e) {
  const t = /* @__PURE__ */ new Map();
  if (e.assets)
    for (const o of Object.values(e.assets)) {
      const r = o.data[0]?.parts?.[0];
      if (r) {
        const n = ge(r);
        n && t.set(n.id, {
          fileId: n,
          managed: o.metadata?.managed ?? !1,
          part: r
        });
      }
    }
  const s = e.metadata?.visual?.presentation?.themes;
  if (s) {
    for (const { splashScreen: o } of Object.values(s))
      if (o) {
        const r = ge(o);
        r && t.set(r.id, {
          fileId: r,
          managed: !0,
          part: o
        });
      }
  }
  return [...t.values()];
}
function ge(e) {
  if ("storedData" in e) {
    const { handle: t, resourceKey: s } = e.storedData, o = Ae(t);
    if (o)
      return { id: o, resourceKey: s };
  } else if ("fileData" in e) {
    const { fileUri: t, resourceKey: s } = e.fileData;
    if (t.match(/^[a-zA-Z0-9_-]+$/))
      return { id: t, resourceKey: s };
  }
}
function Is(e) {
  const t = e.actual.filter(({ role: n }) => n !== "owner"), s = e.expected.filter(({ role: n }) => n !== "owner"), o = [];
  {
    const n = new Set(t.map(I));
    for (const a of s)
      n.has(I(a)) || o.push(a);
  }
  const r = [];
  {
    const n = new Set(s.map(I));
    for (const a of t)
      n.has(I(a)) || r.push(a);
  }
  return { missing: o, excess: r };
}
function I(e) {
  return JSON.stringify({
    type: e.type,
    domain: e.domain ?? void 0,
    emailAddress: e.emailAddress ?? void 0
  });
}
function Os(e, t) {
  const s = I(e);
  for (const o of t)
    if (s === I(o))
      return !0;
  return !1;
}
function Rs() {
  return oe(window.location.href).dev ?? {};
}
const ke = "flow", lt = "tab0", Te = "mode", U = "lite", Le = "new", Ce = "remix", j = "color-scheme", f = "light", w = "dark", Ne = "results", Ue = "geo-restriction", De = "missing-scopes", M = "resourcekey", Me = "oauth_redirect", te = "dev-";
function dt(e, t = window.location.href, s = u.ENABLE_NEW_URL_SCHEME) {
  const o = typeof t == "string" ? new URL(t).origin : t.origin, r = new URL(o), { page: n } = e;
  if (e?.oauthRedirect && r.searchParams.set(Me, e.oauthRedirect), n === "home")
    r.pathname = "/", e.lite && r.searchParams.set(U, e.lite === !0 ? "true" : "false"), (e.colorScheme === f || e.colorScheme === w) && r.searchParams.set(
      j,
      e.colorScheme === f ? f : w
    ), e.new && r.searchParams.set(Le, e.new === !0 ? "true" : "false");
  else if (n === "graph")
    if (s || r.searchParams.set(ke, e.flow), e.resourceKey && r.searchParams.set(M, e.resourceKey), e.remix && r.searchParams.set(Ce, e.remix ? "true" : "false"), e.results && r.searchParams.set(Ne, e.results), e.lite && r.searchParams.set(U, e.lite === !0 ? "true" : "false"), (e.colorScheme === f || e.colorScheme === w) && r.searchParams.set(
      j,
      e.colorScheme === f ? f : w
    ), !s)
      r.searchParams.set(Te, e.mode);
    else {
      const a = Ae(e.flow);
      if (!a)
        throw new Error("unsupported graph id " + e.flow);
      if (e.mode === "app")
        r.pathname = "app/" + encodeURIComponent(a);
      else if (e.mode === "canvas")
        r.pathname = "edit/" + encodeURIComponent(a);
      else
        throw e.mode, new Error("unsupported mode " + e.mode);
    }
  else if (n === "landing") {
    if (r.pathname = "landing/", e.geoRestriction && r.searchParams.set(Ue, "true"), e.missingScopes && r.searchParams.set(De, "true"), e.lite && r.searchParams.set(U, e.lite === !0 ? "true" : "false"), (e.colorScheme === f || e.colorScheme === w) && r.searchParams.set(
      j,
      e.colorScheme === f ? f : w
    ), e.redirect.page === "graph") {
      const a = new URL(dt(e.redirect, t));
      for (const [i, c] of a.searchParams)
        r.searchParams.set(i, c);
    }
  } else if (n === "open")
    r.pathname = `open/${encodeURIComponent(e.fileId)}`, e.resourceKey && r.searchParams.set(M, e.resourceKey);
  else
    throw new Error(
      `unhandled page ${JSON.stringify(n)} from ${JSON.stringify(e)}`
    );
  if (e.dev)
    for (const [a, i] of Object.entries(
      e.dev
    ))
      r.searchParams.set(te + a, i);
  return e.guestPrefixed && (r.pathname = "/_app" + r.pathname), r.href.replace("drive%3A%2F", "drive:/");
}
function oe(e) {
  typeof e == "string" && (e = new URL(e));
  let t;
  const s = e.searchParams.get(Me);
  for (const [n, a] of e.searchParams)
    if (n.startsWith(te)) {
      t ??= {};
      const i = n.slice(te.length);
      t[i] = a;
    }
  const o = e.pathname.startsWith("/_app/"), r = o ? e.pathname.slice(5) : e.pathname;
  if (r === "/landing/") {
    const n = new URL(e);
    n.pathname = "/";
    const a = oe(n), i = {
      page: "landing",
      redirect: a.page === "landing" || a.page === "open" ? {
        page: "home",
        redirectFromLanding: !0,
        guestPrefixed: !0
      } : {
        ...a,
        redirectFromLanding: !0,
        guestPrefixed: !0
      },
      guestPrefixed: o
    };
    return e.searchParams.has(Ue) && (i.geoRestriction = !0), e.searchParams.has(De) && (i.missingScopes = !0), s && (i.oauthRedirect = s), t && (i.dev = t), i;
  } else {
    if (r.startsWith("/open/"))
      return {
        page: "open",
        fileId: r.slice(6),
        resourceKey: e.searchParams.get(M) ?? void 0,
        guestPrefixed: o
      };
    {
      let n = e.searchParams.get(ke) || e.searchParams.get(lt) || r.startsWith("/app/") && r.slice(5) || r.startsWith("/edit/") && r.slice(6);
      if (n && !n.startsWith("drive:/") && (r.startsWith("/app/") || r.startsWith("/edit/")) && (n = "drive:/" + n), !n) {
        const d = {
          page: "home",
          lite: e.searchParams.get("lite") === "true",
          colorScheme: e.searchParams.get("color-scheme") === f ? f : e.searchParams.get("color-scheme") === w ? w : void 0,
          new: e.searchParams.get(Le) === "true",
          guestPrefixed: o
        };
        return t && (d.dev = t), s && (d.oauthRedirect = s), d;
      }
      const i = {
        page: "graph",
        mode: e.searchParams.get(Te) === "app" || r.startsWith("/app/") ? "app" : "canvas",
        lite: e.searchParams.get(U) === "true",
        colorScheme: e.searchParams.get("color-scheme") === f ? f : e.searchParams.get("color-scheme") === w ? w : void 0,
        flow: n,
        resourceKey: e.searchParams.get(M) ?? void 0,
        guestPrefixed: o
      }, c = e.searchParams.get(Ce);
      c && (i.remix = c === "true");
      const l = e.searchParams.get(Ne);
      return l && (i.results = l), t && (i.dev = t), s && (i.oauthRedirect = s), i;
    }
  }
}
const As = "shellOrigin", ks = "opal_shell_establish_message_channel_request", Ts = "opal_shell_establish_message_channel_response";
const xe = /* @__PURE__ */ Symbol("Comlink.proxy"), ut = /* @__PURE__ */ Symbol("Comlink.endpoint"), ht = /* @__PURE__ */ Symbol("Comlink.releaseProxy"), z = /* @__PURE__ */ Symbol("Comlink.finalizer"), D = /* @__PURE__ */ Symbol("Comlink.thrown"), Ge = (e) => typeof e == "object" && e !== null || typeof e == "function", gt = {
  canHandle: (e) => Ge(e) && e[xe],
  serialize(e) {
    const { port1: t, port2: s } = new MessageChannel();
    return Fe(e, t), [s, [s]];
  },
  deserialize(e) {
    return e.start(), wt(e);
  }
}, ft = {
  canHandle: (e) => Ge(e) && D in e,
  serialize({ value: e }) {
    let t;
    return e instanceof Error ? t = {
      isError: !0,
      value: {
        message: e.message,
        name: e.name,
        stack: e.stack
      }
    } : t = { isError: !1, value: e }, [t, []];
  },
  deserialize(e) {
    throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value;
  }
}, T = /* @__PURE__ */ new Map([
  ["proxy", gt],
  ["throw", ft]
]);
function pt(e, t) {
  for (const s of e)
    if (t === s || s === "*" || s instanceof RegExp && s.test(t))
      return !0;
  return !1;
}
function Fe(e, t = globalThis, s = ["*"]) {
  t.addEventListener("message", function o(r) {
    if (!r || !r.data)
      return;
    if (!pt(s, r.origin)) {
      console.warn(`Invalid origin '${r.origin}' for comlink proxy`);
      return;
    }
    const { id: n, type: a, path: i } = Object.assign({ path: [] }, r.data), c = (r.data.argumentList || []).map(P);
    let l;
    try {
      const d = i.slice(0, -1).reduce((h, E) => h[E], e), g = i.reduce((h, E) => h[E], e);
      switch (a) {
        case "GET":
          l = g;
          break;
        case "SET":
          d[i.slice(-1)[0]] = P(r.data.value), l = !0;
          break;
        case "APPLY":
          l = g.apply(d, c);
          break;
        case "CONSTRUCT":
          {
            const h = new g(...c);
            l = Pt(h);
          }
          break;
        case "ENDPOINT":
          {
            const { port1: h, port2: E } = new MessageChannel();
            Fe(e, E), l = vt(h, [h]);
          }
          break;
        case "RELEASE":
          l = void 0;
          break;
        default:
          return;
      }
    } catch (d) {
      l = { value: d, [D]: 0 };
    }
    Promise.resolve(l).catch((d) => ({ value: d, [D]: 0 })).then((d) => {
      const [g, h] = F(d);
      t.postMessage(Object.assign(Object.assign({}, g), { id: n }), h), a === "RELEASE" && (t.removeEventListener("message", o), We(t), z in e && typeof e[z] == "function" && e[z]());
    }).catch((d) => {
      const [g, h] = F({
        value: new TypeError("Unserializable return value"),
        [D]: 0
      });
      t.postMessage(Object.assign(Object.assign({}, g), { id: n }), h);
    });
  }), t.start && t.start();
}
function mt(e) {
  return e.constructor.name === "MessagePort";
}
function We(e) {
  mt(e) && e.close();
}
function wt(e, t) {
  const s = /* @__PURE__ */ new Map();
  return e.addEventListener("message", function(r) {
    const { data: n } = r;
    if (!n || !n.id)
      return;
    const a = s.get(n.id);
    if (a)
      try {
        a(n);
      } finally {
        s.delete(n.id);
      }
  }), se(e, s, [], t);
}
function C(e) {
  if (e)
    throw new Error("Proxy has been released and is not useable");
}
function Be(e) {
  return _(e, /* @__PURE__ */ new Map(), {
    type: "RELEASE"
  }).then(() => {
    We(e);
  });
}
const x = /* @__PURE__ */ new WeakMap(), G = "FinalizationRegistry" in globalThis && new FinalizationRegistry((e) => {
  const t = (x.get(e) || 0) - 1;
  x.set(e, t), t === 0 && Be(e);
});
function yt(e, t) {
  const s = (x.get(t) || 0) + 1;
  x.set(t, s), G && G.register(e, t, e);
}
function Et(e) {
  G && G.unregister(e);
}
function se(e, t, s = [], o = function() {
}) {
  let r = !1;
  const n = new Proxy(o, {
    get(a, i) {
      if (C(r), i === ht)
        return () => {
          Et(n), Be(e), t.clear(), r = !0;
        };
      if (i === "then") {
        if (s.length === 0)
          return { then: () => n };
        const c = _(e, t, {
          type: "GET",
          path: s.map((l) => l.toString())
        }).then(P);
        return c.then.bind(c);
      }
      return se(e, t, [...s, i]);
    },
    set(a, i, c) {
      C(r);
      const [l, d] = F(c);
      return _(e, t, {
        type: "SET",
        path: [...s, i].map((g) => g.toString()),
        value: l
      }, d).then(P);
    },
    apply(a, i, c) {
      C(r);
      const l = s[s.length - 1];
      if (l === ut)
        return _(e, t, {
          type: "ENDPOINT"
        }).then(P);
      if (l === "bind")
        return se(e, t, s.slice(0, -1));
      const [d, g] = fe(c);
      return _(e, t, {
        type: "APPLY",
        path: s.map((h) => h.toString()),
        argumentList: d
      }, g).then(P);
    },
    construct(a, i) {
      C(r);
      const [c, l] = fe(i);
      return _(e, t, {
        type: "CONSTRUCT",
        path: s.map((d) => d.toString()),
        argumentList: c
      }, l).then(P);
    }
  });
  return yt(n, e), n;
}
function St(e) {
  return Array.prototype.concat.apply([], e);
}
function fe(e) {
  const t = e.map(F);
  return [t.map((s) => s[0]), St(t.map((s) => s[1]))];
}
const He = /* @__PURE__ */ new WeakMap();
function vt(e, t) {
  return He.set(e, t), e;
}
function Pt(e) {
  return Object.assign(e, { [xe]: !0 });
}
function F(e) {
  for (const [t, s] of T)
    if (s.canHandle(e)) {
      const [o, r] = s.serialize(e);
      return [
        {
          type: "HANDLER",
          name: t,
          value: o
        },
        r
      ];
    }
  return [
    {
      type: "RAW",
      value: e
    },
    He.get(e) || []
  ];
}
function P(e) {
  switch (e.type) {
    case "HANDLER":
      return T.get(e.name).deserialize(e.value);
    case "RAW":
      return e.value;
  }
}
function _(e, t, s, o) {
  return new Promise((r) => {
    const n = bt();
    t.set(n, r), e.start && e.start(), e.postMessage(Object.assign({ id: n }, s), o);
  });
}
function bt() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
const _t = /* @__PURE__ */ new Set([204, 205, 304]);
console.debug(
  `[shell ${window === window.parent ? "host" : "guest"}] Installing comlink transfer handlers`
);
T.set("URL", {
  canHandle: (e) => e instanceof URL,
  serialize: (e) => [e.href, []],
  deserialize: (e) => new URL(e)
});
const It = (() => {
  const e = new ReadableStream(), { port1: t } = new MessageChannel();
  try {
    return t.postMessage(e, [e]), !0;
  } catch {
    return !1;
  }
})();
T.set("Response", {
  canHandle: (e) => e instanceof Response,
  serialize: (e) => {
    const { headers: t, status: s, statusText: o } = e;
    let r;
    if (e.body === null || _t.has(s))
      r = null;
    else if (It)
      r = e.body;
    else {
      const n = new MessageChannel();
      Ot(e.body.getReader(), n.port1), r = n.port2;
    }
    return [
      {
        body: r,
        init: {
          // Headers instances are not cloneable, but their entries arrays are,
          // and conveniently those arrays are also valid as headers, so we can
          // just convert.
          headers: [...t],
          status: s,
          statusText: o
        }
      },
      r ? [r] : []
    ];
  },
  deserialize: ({ body: e, init: t }) => new Response(
    e instanceof MessagePort ? Rt(e) : e,
    t
  )
});
async function Ot(e, t) {
  for (; ; ) {
    const { done: s, value: o } = await e.read();
    if (s)
      break;
    t.postMessage(
      {
        done: !1,
        value: o.buffer
      },
      [o.buffer]
    );
  }
  e.releaseLock(), t.postMessage({ done: !0 }), t.close();
}
function Rt(e) {
  const t = new TransformStream(), s = t.writable.getWriter(), o = new AbortController();
  return e.addEventListener(
    "message",
    (r) => {
      const n = r.data;
      n.done ? (s.close(), o.abort()) : s.write(new Uint8Array(n.value));
    },
    { signal: o.signal }
  ), e.start(), t.readable;
}
const At = new FinalizationRegistry(
  (e) => e.close()
);
T.set("RequestInit", {
  canHandle: (e) => (
    // RequestInits are plain objects, so this is a good-enough detection
    // heuristic.
    typeof e == "object" && e !== null && ("headers" in e || "body" in e || "signal" in e) && // Response objects also match the above heuristic, and we handle those
    // separately (technically we don't need this as long as this handler is
    // installed after the Response handler, so this check is just defensive).
    !(e instanceof Response)
  ),
  serialize: (e) => {
    e = { ...e };
    const t = { init: e }, s = [];
    if (e.headers instanceof Headers && (e.headers = [...e.headers]), e.body instanceof FormData && (t.formData = [...e.body], delete e.body), e.signal) {
      const o = e.signal, r = new MessageChannel(), { port1: n, port2: a } = r;
      At.register(e.signal, n), delete e.signal, t.signal = a, s.push(a), n.start(), o.aborted ? (n.postMessage(o.reason), n.close()) : o.addEventListener(
        "abort",
        () => {
          n.postMessage(o.reason), n.close();
        },
        { once: !0 }
      );
    }
    return [t, s];
  },
  deserialize: (e) => {
    const t = { ...e.init };
    if (e.formData) {
      t.body = new FormData();
      for (const [s, o] of e.formData)
        t.body.set(s, o);
    }
    if (e.signal) {
      const s = new AbortController();
      t.signal = s.signal;
      const o = e.signal;
      o.addEventListener(
        "message",
        ({ data: r }) => {
          s.abort(r), o.close();
        },
        { once: !0 }
      ), o.start();
    }
    return t;
  }
});
const Ve = {
  // https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
  openid: {
    category: "Google Account",
    // Always required according to the OpenID Connect Core spec.
    required: !0
  },
  // https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
  profile: {
    aliases: ["https://www.googleapis.com/auth/userinfo.profile"],
    category: "Google Account"
  },
  // https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
  email: {
    aliases: ["https://www.googleapis.com/auth/userinfo.email"],
    category: "Google Account",
    // Required for checking geo-location.
    required: !0
  },
  // https://developers.google.com/workspace/drive/api/guides/api-specific-auth#drive-scopes
  "https://www.googleapis.com/auth/drive.readonly": {
    category: "Google Drive",
    // TODO(aomarks) Make this incremental.
    required: !0
  },
  // https://developers.google.com/workspace/drive/api/guides/api-specific-auth#drive-scopes
  "https://www.googleapis.com/auth/drive.file": {
    category: "Google Drive",
    // TODO(aomarks) Make this incremental.
    required: !0
  },
  // https://ai.google.dev/gemini-api/docs/oauth
  "https://www.googleapis.com/auth/generative-language.retriever": {
    category: "Gemini",
    required: !0
  },
  // https://developers.google.com/workspace/calendar/api/auth
  "https://www.googleapis.com/auth/calendar.readonly": {
    category: "Google Calendar"
  },
  // https://developers.google.com/workspace/calendar/api/auth
  "https://www.googleapis.com/auth/calendar.events.owned": {
    category: "Google Calendar"
  },
  // https://developers.google.com/workspace/gmail/api/auth/scopes
  "https://www.googleapis.com/auth/gmail.modify": {
    category: "Gmail"
  }
}, q = Object.entries(Ve).filter(([, e]) => "required" in e && e.required).map(([e]) => e), $e = /* @__PURE__ */ new Map();
for (const [e, t] of Object.entries(Ve))
  if ("aliases" in t)
    for (const s of t.aliases)
      $e.set(s, e);
function O(e) {
  return $e.get(e) ?? e;
}
const kt = (
  /* 1 minute */
  6e4
);
class Tt {
  #t;
  #e;
  constructor(t, s) {
    this.#t = t, this.#e = s;
  }
  getToken() {
    const t = this.#t.get();
    if (t === void 0)
      return { state: "signedout" };
    const s = JSON.parse(t);
    if (!!s.refresh_token)
      return { state: "signedout" };
    const r = s.client_id === void 0;
    return Lt(s) || r ? {
      state: "expired",
      grant: s,
      refresh: (n) => this.#n(s, n?.signal)
    } : { state: "valid", grant: s };
  }
  async #n(t, s) {
    t.client_id === void 0 && (t = await this.#r(t));
    const o = new URL("/connection/refresh/", window.location.origin), r = Date.now(), n = await fetch(o, {
      signal: s,
      credentials: "include"
    });
    if (!n.ok) {
      if (n.status === 401 && (await n.json()).error?.includes("missing cookie: "))
        return this.#t.set(void 0), { state: "signedout" };
      throw new Error(
        `Failed to refresh token, status: ${n.status} ${n.statusText}`
      );
    }
    const a = await n.json();
    if (a.error !== void 0)
      throw new Error(`Failed to refresh token, error: ${a.error}`);
    const i = {
      client_id: t.client_id,
      access_token: a.access_token,
      expires_in: a.expires_in,
      issue_time: r,
      id: t.id,
      picture: t.picture,
      name: t.name,
      domain: t.domain,
      scopes: t.scopes
    };
    return await this.#t.set(JSON.stringify(i)), { state: "valid", grant: i };
  }
  async #r(t) {
    return {
      ...t,
      client_id: this.#e.OAUTH_CLIENT
    };
  }
}
function Lt(e) {
  return /* absolute milliseconds */ e.issue_time + /* relative seconds */
  e.expires_in * 1e3 - /* unix milliseconds */
  Date.now() <= kt;
}
class Ct {
  #t;
  constructor(t) {
    this.#t = t;
  }
  get(t, s) {
    return this.#t.values[t].items.get(s);
  }
  async set(t, s, o) {
    const r = this.#t.values;
    r[t].items.set(s, o), await this.#t.save(r);
  }
  async delete(t, s) {
    const o = this.#t.values;
    o[t].items.delete(s), await this.#t.save(o);
  }
}
var Nt = /* @__PURE__ */ ((e) => (e.RUNNING = "running", e.PAUSED = "paused", e.STOPPED = "stopped", e))(Nt || {}), Ut = /* @__PURE__ */ ((e) => (e.UNSAVED = "unsaved", e.SAVING = "saving", e.SAVED = "saved", e.ERROR = "error", e))(Ut || {}), p = /* @__PURE__ */ ((e) => (e.SECRETS = "Secrets", e.GENERAL = "General", e.INPUTS = "Inputs", e.NODE_PROXY_SERVERS = "Node Proxy Servers", e.CONNECTIONS = "Connections", e))(p || {}), Dt = /* @__PURE__ */ ((e) => (e.NONE = "none", e.INFORMATION = "information", e.WARNING = "warning", e.ERROR = "error", e.PENDING = "pending", e))(Dt || {});
const R = "settings", J = 7;
class B {
  static #t;
  static restoredInstance() {
    return this.#t ??= (async () => {
      const t = new B();
      return await t.restore(), t;
    })();
  }
  #e = {
    [p.GENERAL]: {
      configuration: {
        extensible: !1,
        description: "General Breadboard settings",
        nameEditable: !1,
        nameVisible: !0
      },
      items: /* @__PURE__ */ new Map([
        [
          "Save Secrets",
          {
            name: "Save Secrets",
            description: "Whether you wish to have secrets saved automatically",
            value: !0
          }
        ],
        [
          "Auto Save Boards",
          {
            name: "Auto Save Boards",
            description: "Whether you wish to try and save boards automatically when they change",
            value: !0
          }
        ],
        [
          "Show Tooltips",
          {
            name: "Show Tooltips",
            description: "Toggles the tooltips on UI items",
            value: !0
          }
        ],
        [
          "Collapse Nodes by Default",
          {
            name: "Collapse Nodes by Default",
            description: "Whether you wish to have nodes in the graph collapsed by default",
            value: !1
          }
        ],
        [
          "Hide Embedded Board Selector When Empty",
          {
            name: "Hide Embedded Board Selector When Empty",
            description: "If there are no embedded boards in the current one, hide the selector",
            value: !0
          }
        ],
        [
          "Hide Advanced Ports on Nodes",
          {
            name: "Hide Advanced Ports on Nodes",
            description: "Toggles the visibility of $error, star (*), and control ports on nodes (unless connected)",
            value: !0
          }
        ],
        [
          "Show Experimental Components",
          {
            name: "Show Experimental Components",
            description: "Toggles the visibility of experimental features & steps",
            value: !1
          }
        ],
        [
          "Show Node Shortcuts",
          {
            name: "Show Node Shortcuts",
            description: "Toggles the visibility of common nodes next to the node selector",
            value: !0
          }
        ],
        [
          "Show Node Preview Values",
          {
            name: "Show Node Preview Values",
            description: "Toggles the visibility of configuration values in the graph",
            value: !0
          }
        ],
        [
          "Show Port Tooltips",
          {
            name: "Show Port Tooltips",
            description: "Toggles whether hovering over a port shows a tooltip with advanced port details",
            value: !1
          }
        ],
        [
          "Highlight Invalid Wires",
          {
            name: "Highlight Invalid Wires",
            description: "Toggles whether wires that have incompatible schema will be shown in red.",
            value: !1
          }
        ],
        [
          "Invert Zoom Scroll Direction",
          {
            name: "Invert Zoom Scroll Direction",
            description: "Inverts the board zoom scroll direction",
            value: !1
          }
        ],
        [
          "Show Port Types in Configuration",
          {
            name: "Show Port Types in Configuration",
            description: "Toggles whether or not to show a port's type information in the Component Configuration pane",
            value: !1
          }
        ],
        [
          "Use Local Secrets Only",
          {
            name: "Use Local Secrets Only",
            description: "When unchecked (default), the board server's secrets and locally-stored secrets will be used to run the board from that server. When checked, only locally-stored secrets will be used.",
            value: !1
          }
        ],
        [
          "Offer Configuration Enhancements",
          {
            name: "Offer Configuration Enhancements",
            description: "Toggles showing the component enhancement button",
            value: !1
          }
        ],
        [
          "Use TypeScript as Module default language",
          {
            name: "Use TypeScript as Module default language",
            description: "Sets TypeScript as the language when creating new modules",
            value: !0
          }
        ],
        [
          "Show subgraphs inline",
          {
            name: "Show subgraphs inline",
            description: "Shows subgraphs alongside the main graph",
            value: !1
          }
        ],
        [
          "Show additional sources",
          {
            name: "Show additional sources",
            description: "Toggles showing other locations to load from",
            value: !1
          }
        ],
        [
          "Enable Custom Step Creation",
          {
            name: "Enable Custom Step Creation",
            description: "Enables the creation of custom steps",
            value: !1
          }
        ]
      ])
    },
    [p.SECRETS]: {
      configuration: {
        extensible: !0,
        description: "Secrets that you want to store locally, such as API keys. When calling an API, the API provider's applicable privacy policy and terms apply. Please note that items in this list should have unique names. ",
        nameEditable: !0,
        nameVisible: !0
      },
      items: /* @__PURE__ */ new Map([])
    },
    [p.INPUTS]: {
      configuration: {
        extensible: !0,
        description: 'Inputs that the boards ask for in the middle of the run (also known as "bubbled inputs"), such as model names',
        nameEditable: !0,
        nameVisible: !0
      },
      items: /* @__PURE__ */ new Map([])
    },
    [p.NODE_PROXY_SERVERS]: {
      configuration: {
        extensible: !0,
        description: "Node proxy servers to use when running boards. Put the URL of the node proxy server in the first field and a comma-separated list of nodes to proxy in the second field.",
        nameEditable: !0,
        nameVisible: !0
      },
      items: /* @__PURE__ */ new Map([])
    },
    [p.CONNECTIONS]: {
      configuration: {
        extensible: !1,
        description: "Third-party services boards can access. When you are signed into a service, any board can access and modify your data on that service.",
        nameEditable: !1,
        nameVisible: !1
      },
      items: /* @__PURE__ */ new Map([])
    }
  };
  get values() {
    return structuredClone(this.#e);
  }
  getSection(t) {
    return this.#e[t];
  }
  getItem(t, s) {
    return this.#e[t].items.get(s);
  }
  setItem(t, s, o) {
    return this.#e[t].items.set(s, o);
  }
  constructor() {
  }
  async saveItem(t, s) {
    const o = await V(
      R,
      J
    ), r = o.transaction(t, "readwrite");
    r.store.put(s), await r.done, o.close();
  }
  async save(t) {
    const s = await V(
      R,
      J
    ), o = Object.keys(t).filter((n) => {
      const a = s.objectStoreNames.contains(n);
      return a || console.error(
        `[settings] Expected IDB object store ${JSON.stringify(n)} to exist, but it did not. Settings for this store will be lost. A schema upgrade is probably required.`
      ), a;
    }), r = s.transaction(o, "readwrite");
    await Promise.all(
      o.map(async (n) => {
        const a = r.objectStore(n);
        await a.clear();
        const i = t[n];
        await Promise.all(
          [...i.items.values()].map((c) => a.put(c))
        );
      })
    ), r.commit(), await r.done, s.close(), this.#e = t;
  }
  async restore() {
    let t = !0;
    const s = this.#e, o = await V(
      R,
      J,
      {
        upgrade(n, a, i) {
          console.log("[settings] Upgrading IndexedDB", {
            oldVersion: a,
            newVersion: i,
            objectStoreNames: [...n.objectStoreNames]
          }), t = !1;
          for (const c of Object.keys(s)) {
            const l = c;
            n.objectStoreNames.contains(l) || n.createObjectStore(l, {
              keyPath: "id",
              autoIncrement: !0
            });
          }
        }
      }
    );
    let r = !1;
    for (const n of o.objectStoreNames) {
      const a = await o.getAll(n);
      for (const i of a)
        if (this.#e[n]) {
          if (n === p.GENERAL && !this.#e[n].items.get(i.name)) {
            r = !0, console.info(`[Settings] Skipping setting "${i.name}"`);
            continue;
          }
          this.#e[n].items.set(i.name, i);
        }
    }
    o.close(), r && console.info(
      "[Settings] Re-save your settings to remove deprecated values"
    ), t || await this.save(this.#e);
  }
  async delete() {
    console.log(`[settings] Deleting ${R} IndexedDB`), await nt(R), await this.restore();
  }
}
const Ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SettingsStore: B
}, Symbol.toStringTag, { value: "Module" })), pe = window.trustedTypes?.createPolicy("opal-gapi-url", {
  createScriptURL: je
}), Mt = pe?.createScriptURL.bind(pe) ?? je;
function je() {
  return "https://apis.google.com/js/api.js";
}
let xt;
async function ze() {
  return xt ??= (async () => (await Ht(Mt("")), globalThis.gapi))();
}
let Gt;
async function Ft() {
  return Gt ??= (async () => {
    const e = await ze();
    return await new Promise((t) => e.load("picker", t)), globalThis.google.picker;
  })();
}
let Wt;
async function Bt() {
  return Wt ??= (async () => {
    const e = await ze();
    return await new Promise((t) => e.load("drive-share", t)), e.drive.share.ShareClient;
  })();
}
async function Ht(e) {
  const t = document.createElement("script");
  t.async = !0, t.src = e;
  let s, o;
  const r = new Promise((a, i) => {
    s = a, o = i;
  }), n = new AbortController();
  return t.addEventListener(
    "load",
    () => {
      s(), n.abort();
    },
    { once: !0, signal: n.signal }
  ), t.addEventListener(
    "error",
    () => {
      o(), n.abort();
    },
    { once: !0, signal: n.signal }
  ), document.head.appendChild(t), r;
}
const me = "oauth_redirect";
function Vt() {
  const e = $t();
  return e ? e.origin : window.location.origin;
}
function $t() {
  const e = new URLSearchParams(window.location.search);
  if (!e.has(me))
    return null;
  const t = new URL(e.get(me));
  return (u.ALLOWED_REDIRECT_ORIGINS ?? []).includes(t.origin) ? t : null;
}
const jt = "https://appcatalyst.pa.googleapis.com", L = "https://www.googleapis.com/drive/v3/files", zt = "https://www.googleapis.com/upload/drive/v3/files", qt = "https://www.googleapis.com/calendar/v3/calendars", Jt = "https://gmail.googleapis.com", Kt = "https://generativelanguage.googleapis.com/v1beta/models", Yt = "https://docs.googleapis.com/v1/documents", Xt = "https://slides.googleapis.com/v1/presentations", Qt = "https://sheets.googleapis.com/v4/spreadsheets", Zt = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar.events.owned"
], A = [
  "https://www.googleapis.com/auth/drive.readonly"
], es = [
  "https://www.googleapis.com/auth/gmail.modify"
], we = [
  "https://www.googleapis.com/auth/generative-language.retriever"
];
function b(e) {
  return e ? new URL(e) : void 0;
}
const ts = [
  {
    canonicalPrefix: new URL(jt),
    scopes: we,
    remapOrigin: b(u.BACKEND_API_ENDPOINT),
    shouldAddAccessTokenToJsonBody: (e) => e.endsWith("/uploadGeminiFile") || e.endsWith("/uploadBlobFile") || e.includes("/generateWebpageStream")
  },
  {
    canonicalPrefix: new URL(L),
    scopes: A,
    remapOrigin: b(
      u.GOOGLE_DRIVE_API_ENDPOINT
    ),
    allowQueryParams: (e) => !e.has("q")
  },
  {
    canonicalPrefix: new URL(zt),
    scopes: A,
    remapOrigin: b(
      u.GOOGLE_DRIVE_API_ENDPOINT
    )
  },
  {
    canonicalPrefix: new URL(Yt),
    scopes: A,
    remapOrigin: b(
      u.GOOGLE_DOCS_API_ENDPOINT
    )
  },
  {
    canonicalPrefix: new URL(Xt),
    scopes: A,
    remapOrigin: b(
      u.GOOGLE_SLIDES_API_ENDPOINT
    )
  },
  {
    canonicalPrefix: new URL(Qt),
    scopes: A,
    remapOrigin: b(
      u.GOOGLE_SHEETS_API_ENDPOINT
    )
  },
  {
    canonicalPrefix: new URL(Kt),
    scopes: we,
    // Not currently configurable
    remapOrigin: void 0
  },
  {
    canonicalPrefix: new URL(qt),
    scopes: Zt,
    // Not currently configurable
    remapOrigin: void 0
  },
  {
    canonicalPrefix: new URL(Jt),
    scopes: es,
    // Not currently configurable
    remapOrigin: void 0
  }
];
function ye(e) {
  const t = new URL(e);
  for (const s of ts) {
    const {
      canonicalPrefix: o,
      scopes: r,
      remapOrigin: n,
      shouldAddAccessTokenToJsonBody: a,
      allowQueryParams: i
    } = s;
    if (t.origin === o.origin && t.pathname.startsWith(o.pathname)) {
      if (i && !i(t.searchParams))
        return;
      let c;
      return n && n.origin !== t.origin && (c = new URL(
        n.origin + t.pathname + t.search + t.hash
      )), {
        scopes: r,
        remappedUrl: c,
        shouldAddAccessTokenToJsonBody: !!a?.(e)
      };
    }
  }
}
var Ee;
(function(e) {
  e.Ordinary = "ordinary", e.Constant = "constant", e.Control = "control", e.Star = "star";
})(Ee || (Ee = {}));
var Se;
(function(e) {
  e.Indeterminate = "indeterminate", e.Connected = "connected", e.Ready = "ready", e.Missing = "missing", e.Dangling = "dangling";
})(Se || (Se = {}));
var ve;
(function(e) {
  e.GET_ANY_WEBPAGE = "GET_ANY_WEBPAGE", e.OPEN_WEBPAGE = "OPEN_WEBPAGE";
})(ve || (ve = {}));
var Pe;
(function(e) {
  e.ALLOW = "allow", e.DENY = "deny", e.ALWAYS_ALLOW = "alwaysAllow", e.ALWAYS_DENY = "alwaysDeny";
})(Pe || (Pe = {}));
var be;
(function(e) {
  e.MODAL = "MODAL", e.IN_APP = "IN_APP";
})(be || (be = {}));
const ss = 200;
async function ns(e, t, s, o = 3) {
  function r(a) {
    return 500 <= a.status && a.status <= 599;
  }
  async function n(a) {
    a -= 1;
    let i = null;
    try {
      if (i = await e(t, s), r(i))
        console.warn(`Error in fetch(${t}). Attempts left: ${a}/${o}. Response:`, i);
      else
        return i;
    } catch (c) {
      console.warn(`Exception in fetch(${t}). Attempts left: ${a}/${o}`, c), i = new Response(null, {
        status: 403
      });
    }
    return a <= 0 ? i : await new Promise((c) => {
      setTimeout(async () => {
        c(await n(a));
      }, ss);
    });
  }
  return n(o);
}
const _e = "application/vnd.google-apps.folder", rs = "application/vnd.breadboard.graph+json", os = "isShareableCopy", as = "application/vnd.google-apps.document", is = "application/vnd.google-apps.spreadsheet", cs = "application/vnd.google-apps.presentation";
async function ls(e) {
  const { userFolderName: t, fetchWithCreds: s } = e, o = `name=${ne(t)}
  and mimeType="${_e}"
  and trashed=false`, r = new URL(L);
  r.searchParams.set("q", o), r.searchParams.set("fields", "files(id, mimeType)"), r.searchParams.set("orderBy", "createdTime desc");
  try {
    const n = await ae(r, s);
    if ("error" in n)
      return { ok: !1, error: n.error.message };
    const a = n.files.filter(
      (i) => i.mimeType === _e
    );
    if (a.length > 0) {
      a.length > 1 && console.warn(
        "[Google Drive] Multiple candidate root folders found, picking the first created one arbitrarily:",
        a
      );
      const i = a[0].id;
      return console.log("[Google Drive] Found existing root folder", i), { ok: !0, id: i };
    }
    return { ok: !1, error: "No root folder found" };
  } catch (n) {
    return console.error("Failed to find root folder", n), {
      ok: !1,
      error: n instanceof Error ? n.message : "Failed to find root folder"
    };
  }
}
async function ds(e) {
  const { isTestApi: t, fetchWithCreds: s } = e, o = [
    "id",
    "name",
    "modifiedTime",
    "properties",
    "appProperties",
    "isAppAuthorized"
  ], r = `mimeType = ${ne(rs)}
and trashed = false
and not properties has {
  key = ${ne(os)}
  and value = "true"
}
and 'me' in owners
  `, n = new URL(L);
  n.searchParams.set("q", r), n.searchParams.set("fields", `files(${o.join(",")})`), n.searchParams.set("orderBy", "modifiedTime desc");
  try {
    const a = await ae(n, s);
    return "error" in a ? { ok: !1, error: a.error.message } : { ok: !0, files: a.files.filter(
      (c) => (
        // Filter down to graphs created by whatever the current OAuth app is.
        // Otherwise, graphs from different OAuth apps will appear in this list
        // too, and if they are selected, we won't be able to edit them. Note
        // there is no way to do this in the query itself.
        c.isAppAuthorized || // Note when running on testGaia, isAppAuthorized seems to always be false
        // so just allow all files in that case (they should all be from the test
        // client anyway)
        t
      )
    ) };
  } catch (a) {
    return console.error("Failed to list opals", a), {
      ok: !1,
      error: a instanceof Error ? a.message : "Failed to list opals"
    };
  }
}
async function us(e) {
  const { mimeType: t, connectorId: s, graphId: o, fetchWithCreds: r } = e, a = `appProperties has { key = 'google-drive-connector' and value = '${`${hs(t)}${s}${o}`}' } and trashed = false`, i = new URL(L);
  i.searchParams.set("q", a);
  try {
    const c = await ae(i, r);
    if ("error" in c)
      return { ok: !1, error: c.error.message };
    const l = c.files;
    return l.length > 0 ? { ok: !0, id: l[0].id } : { ok: !0, id: null };
  } catch (c) {
    return console.error("Failed to get drive collector file", c), {
      ok: !1,
      error: c instanceof Error ? c.message : "Failed to get drive collector file"
    };
  }
}
function hs(e) {
  return e === as ? "doc" : e === is ? "sheet" : e === cs ? "slides" : "";
}
function ne(e) {
  return `'${e.replace(/'/g, "\\'")}'`;
}
function ae(e, t) {
  return ns(t, e).then(
    (s) => s.json()
  );
}
function gs(e) {
  return !(e && typeof e == "object" && "$error" in e);
}
function Cs(e, t) {
  return { $error: e, ...t };
}
function K(e) {
  return async (t, s) => {
    const o = new Request(t, s), r = await e(o.url);
    if (!gs(r))
      throw new Error(`Unauthenticated: ${r.$error}`);
    const n = Object.fromEntries(o.headers.entries()), a = new Request(o, {
      headers: {
        ...n,
        Authorization: `Bearer ${r}`
      }
    });
    return fetch(a);
  };
}
const Ie = window.trustedTypes?.createPolicy(
  "opal-analytics-url",
  { createScriptURL: qe }
), fs = Ie?.createScriptURL.bind(Ie) ?? qe;
function qe(e) {
  const t = new URL("https://www.googletagmanager.com/gtag/js");
  return t.searchParams.set("id", e), t.href;
}
function re() {
  return "ga_user_id";
}
async function ps(e, t) {
  window.dataLayer = window.dataLayer || [], window.gtag = function() {
    window.dataLayer.push(arguments);
  }, window.gtag("js", /* @__PURE__ */ new Date());
  const s = document.createElement("script");
  s.src = fs(e), s.async = !0, document.body.appendChild(s);
  const r = await t() ? { user_id: a() } : {}, n = oe(window.location.href).lite ? "lite" : "standard";
  window.gtag("config", e, {
    site_mode: n,
    anonymize_ip: !0,
    cookie_flags: "SameSite=None; Secure",
    ...r
  });
  function a() {
    let i = window.localStorage.getItem(re());
    return i || (i = crypto.randomUUID(), window.localStorage.setItem(re(), i)), i;
  }
}
class ms {
  constructor(t, s) {
    t && (this.initialized = ps(t, s));
  }
  async setProperties(t) {
    this.initialized && (await this.initialized, globalThis.gtag?.("set", "user_properties", t), globalThis.gtag?.("event", "user_property_update", t));
  }
  async sendEvent(t, s) {
    this.initialized && (await this.initialized, (t === "sign_out_success" || t === "sign_in_success") && Je(), ws(t, s));
  }
}
function ws(e, t) {
  (e === "sign_out_success" || e === "sign_in_success") && Je(), globalThis.gtag?.("event", e, t);
}
function Je() {
  window.localStorage.removeItem(re());
}
const y = "$sign-in", ys = "https://accounts.google.com/o/oauth2/auth", Es = u.GOOGLE_OAUTH_AUTH_ENDPOINT || ys;
class Ns {
  constructor() {
    this.#t = B.restoredInstance(), this.#e = this.#t.then(
      (t) => new Ct(t)
    ), this.#n = this.#e.then(
      (t) => new Tt(
        {
          get: () => t.get(p.CONNECTIONS, y)?.value,
          set: async (s) => t.set(
            p.CONNECTIONS,
            y,
            {
              name: y,
              value: s
            }
          )
        },
        { OAUTH_CLIENT: u.OAUTH_CLIENT }
      )
    ), this.getSignInState = async () => this.#r ??= (async () => {
      const s = (await this.#n).getToken();
      return s.state === "signedout" ? { status: "signedout" } : (s.state, this.#a(s.grant));
    })(), this.validateScopes = async () => {
      const t = await this.#c();
      if (!t.ok)
        return {
          ok: !1,
          code: t.code === "access-revoked" ? "signed-out" : t.code,
          error: t.error
        };
      const s = t.value, o = /* @__PURE__ */ new Set();
      for (const a of s)
        o.add(O(a));
      {
        const a = await this.#e, i = (await a.get(
          p.CONNECTIONS,
          y
        ))?.value;
        if (i) {
          const c = JSON.parse(i);
          c.scopes || (console.info("[signin] Upgrading signin storage to include scopes"), await a.set(
            p.CONNECTIONS,
            y,
            {
              name: y,
              value: JSON.stringify({
                ...c,
                scopes: s
              })
            }
          ));
        }
      }
      const n = [...new Set(
        q.map((a) => O(a))
      )].filter(
        (a) => !o.has(a)
      );
      return n.length > 0 ? {
        ok: !1,
        code: "missing-scopes",
        error: `Missing scopes: ${n.join(", ")}`
      } : { ok: !0 };
    }, this.getConfiguration = async () => ({
      consentMessage: "",
      isTestApi: ye(L)?.remappedUrl?.origin === "https://test-www.sandbox.googleapis.com",
      shareSurface: void 0,
      shareSurfaceUrlTemplates: u.SHARE_SURFACE_URL_TEMPLATES
    }), this.fetchWithCreds = async (t, s = {}) => {
      const o = t instanceof Request ? t.url : t instanceof URL ? t.href : t;
      try {
        new URL(o);
      } catch {
        return new Response(
          `Only valid absolute URLs can be used with fetchWithCreds: ${o}`,
          { status: 400 }
        );
      }
      const r = ye(o);
      if (!r) {
        const c = `URL is not in fetchWithCreds allowlist: ${o}`;
        return console.error(`[shell host] ${c}`), new Response(c, { status: 403 });
      }
      r.remappedUrl && (t = t instanceof Request ? { ...t, url: r.remappedUrl.href } : r.remappedUrl.href);
      const n = await this.#s(r.scopes);
      if (n.state === "signedout")
        return new Response("User is signed-out", { status: 401 });
      if (n.state === "missing-scopes")
        return new Response(
          `User is signed-in but missing scopes: ${n.scopes.join(", ")}`,
          { status: 401 }
        );
      const a = n.grant.access_token;
      r.shouldAddAccessTokenToJsonBody && (s = this.#l(s, a));
      const i = new Headers(s.headers);
      return i.set("Authorization", `Bearer ${a}`), fetch(t, { ...s, headers: i });
    }, this.signIn = async (t = []) => {
      const { url: s, nonce: o } = this.#d(t), r = 900, n = 850, a = window.open(
        s,
        "Sign in to Google",
        `
      width=${r}
      height=${n}
      left=${window.screenX + window.innerWidth / 2 - r / 2}
      top=${window.screenY + window.innerHeight / 2 - n / 2 + /* A little extra to account for the tabs, url bar etc.*/
        60}
      `
      );
      return a ? await this.#h(o, t, a) : this.#u(t);
    }, this.signOut = async () => {
      if ((await this.getSignInState()).status === "signedout")
        return;
      await (await this.#e).delete(
        p.CONNECTIONS,
        y
      ), this.#r = Promise.resolve({ status: "signedout" });
    }, this.setUrl = async (t) => {
      const { pathname: s, search: o, hash: r } = new URL(t);
      history.replaceState(
        null,
        "",
        new URL(
          (u.SHELL_PREFIX || "") + s + o + r,
          window.location.origin
        )
      );
    }, this.pickDriveFiles = async (t) => {
      console.info("[shell host] opening drive picker");
      const [s, o] = await Promise.all([
        Ft(),
        this.#s(["https://www.googleapis.com/auth/drive.readonly"])
      ]);
      if (o.state !== "valid")
        return {
          action: "error",
          error: `Could not open drive picker with token state ${o.state}`
        };
      const r = new s.DocsView();
      r.setMimeTypes(t.mimeTypes.join(",")), r.setIncludeFolders(!0), r.setSelectFolderEnabled(!1), r.setOwnedByMe(!0), r.setMode(google.picker.DocsViewMode.GRID);
      const n = new s.DocsView();
      n.setMimeTypes(t.mimeTypes.join(",")), n.setIncludeFolders(!0), n.setSelectFolderEnabled(!1), n.setOwnedByMe(!1), n.setMode(google.picker.DocsViewMode.GRID);
      const a = await new Promise(
        (i) => {
          new s.PickerBuilder().setOrigin(Vt()).addView(r).addView(n).setAppId(o.grant.client_id).setOAuthToken(o.grant.access_token).setCallback((c) => {
            c.action !== "loaded" && i(c);
          }).build().setVisible(!0);
        }
      );
      return console.info("[shell host] drive picker result", a), a.action === "picked" ? { action: "picked", docs: a.docs ?? [] } : a.action === "cancel" ? { action: "cancel" } : a.action === "error" ? { action: "error", error: "Unknown error from drive picker" } : {
        action: "error",
        error: `Unhandled result action ${a.action}`
      };
    }, this.shareDriveFiles = async (t) => {
      const s = this.#s([
        "https://www.googleapis.com/auth/drive.file"
      ]);
      if (!this.#o) {
        const l = await Bt();
        this.#o = new l();
      }
      const o = await s;
      if (o.state !== "valid")
        throw new Error("User is signed-out or doesn't have sufficient scope");
      this.#o.setItemIds(t.fileIds), this.#o.setOAuthToken(o.grant.access_token);
      let r = "opening", n;
      const a = new AbortController(), i = Promise.withResolvers(), c = () => {
        n?.disconnect(), a.abort(), r = "closed", i.resolve();
      };
      n = new MutationObserver(() => {
        const l = document.body.querySelector(
          '[guidedhelpid="drive_share_dialog"]'
        );
        if (l) {
          const d = l.getAttribute("aria-hidden");
          r === "opening" && d !== "true" ? r = "open" : r === "open" && d === "true" && c();
        }
      }), n.observe(document.body, {
        childList: !0,
        attributes: !0,
        subtree: !0
      }), window.addEventListener(
        "keydown",
        ({ key: l }) => {
          l === "Escape" && r === "opening" && c();
        },
        {
          // Capture so that we see this event before the ShareClient.
          capture: !0,
          signal: a.signal
        }
      ), this.#o.showSettingsDialog(), await i.promise;
    }, this.checkAppAccess = async () => {
      const t = await this.#s();
      return t.state === "valid" ? await this.#i(t.grant.access_token) : {
        canAccess: !1,
        accessStatus: "ACCESS_STATUS_UNSPECIFIED"
      };
    }, this.sendToEmbedder = async (t) => {
      Ke(t);
    }, this.findUserOpalFolder = async () => {
      const t = await this.#s([
        "https://www.googleapis.com/auth/drive.readonly"
      ]);
      if (t.state !== "valid")
        return {
          ok: !1,
          error: "User is signed out or doesn't have sufficient scope"
        };
      const s = u.GOOGLE_DRIVE_USER_FOLDER_NAME || "Breadboard";
      return ls({
        userFolderName: s,
        fetchWithCreds: K(
          async () => t.grant.access_token
        )
      });
    }, this.listUserOpals = async () => {
      const t = await this.#s([
        "https://www.googleapis.com/auth/drive.readonly"
      ]);
      if (t.state !== "valid")
        return {
          ok: !1,
          error: "User is signed out or doesn't have sufficient scope"
        };
      const s = !!(await this.getConfiguration()).isTestApi;
      return ds({
        isTestApi: s,
        fetchWithCreds: K(
          async () => t.grant.access_token
        )
      });
    }, this.getDriveCollectorFile = async (t, s, o) => {
      const r = await this.#s([
        "https://www.googleapis.com/auth/drive.readonly"
      ]);
      return r.state !== "valid" ? {
        ok: !1,
        error: "User is signed out or doesn't have sufficient scope"
      } : us({
        mimeType: t,
        connectorId: s,
        graphId: o,
        fetchWithCreds: K(
          async () => r.grant.access_token
        )
      });
    }, this.actionEventSender = new ms(
      u.MEASUREMENT_ID,
      async () => (await this.getSignInState()).status === "signedin"
    ), this.trackAction = async (t, s) => {
      this.actionEventSender.sendEvent(t, s);
    }, this.trackProperties = async (t) => {
      this.actionEventSender.setProperties(t);
    };
  }
  #t;
  #e;
  #n;
  #r;
  /** See https://cloud.google.com/docs/authentication/token-types#access */
  async #c() {
    const t = new URL("https://oauth2.googleapis.com/tokeninfo");
    let s;
    try {
      s = await this.#s();
    } catch (n) {
      return { ok: !1, code: "signed-out", error: String(n) };
    }
    if (s.state === "signedout")
      return { ok: !1, code: "signed-out", error: "User was signed out" };
    t.searchParams.set("access_token", s.grant.access_token);
    let o;
    try {
      o = await fetch(t);
    } catch (n) {
      return { ok: !1, code: "other", error: `Network error: ${n}` };
    }
    if (!o.ok) {
      try {
        const n = await o.json();
        if (n.error === "invalid_token")
          return {
            ok: !1,
            code: "access-revoked",
            error: JSON.stringify(n)
          };
        console.debug("Unhandled tokeninfo error", n);
      } catch {
      }
      return {
        ok: !1,
        code: "other",
        error: `HTTP ${o.status} error`
      };
    }
    let r;
    try {
      r = await o.json();
    } catch (n) {
      return { ok: !1, code: "other", error: `JSON parse error: ${n}` };
    }
    return { ok: !0, value: r.scope.split(" ") };
  }
  /**
   * Adds the access token to the body of the request.
   */
  #l(t, s) {
    const o = t.body;
    if (typeof o != "string")
      return console.warn("When augmenting request, body is not string, bailing..."), t;
    try {
      const r = JSON.parse(o);
      return {
        ...t,
        body: JSON.stringify({ ...r, accessToken: s })
      };
    } catch {
      return console.warn(
        "When augmenting request, body is not JSON parsable, bailing"
      ), t;
    }
  }
  #d(t = []) {
    console.info("[shell host] Generating sign-in URL and nonce");
    const s = crypto.randomUUID(), o = [
      .../* @__PURE__ */ new Set([...q, ...t])
    ], r = new URL(Es), n = r.searchParams;
    return n.set("client_id", u.OAUTH_CLIENT), n.set("redirect_uri", new URL("/oauth/", window.location.origin).href), n.set("scope", o.join(" ")), n.set(
      "state",
      JSON.stringify({ nonce: s })
    ), n.set("response_type", "code"), n.set("access_type", "offline"), n.set("prompt", "consent"), n.set("include_granted_scopes", "true"), { url: r.href, nonce: s };
  }
  /**
     * Display a sign-in dialog as fallback for when we were blocked from
     * immediately calling window.open.
  
     * Safari has a much shorter navigator.userActivation.isActive timeout than
     * Chrome and Firefox, which means that too much time can elapse between the
     * guest asking for a sign-in and the host calling window.open.
     */
  #u(t) {
    const s = document.createElement("dialog");
    s.id = "fallback-sign-in-dialog";
    const o = document.createElement("h1");
    o.textContent = "Sign in to use Opal", s.appendChild(o);
    const r = document.createElement("p");
    r.textContent = "To continue, you'll need to sign in with your Google account.", s.appendChild(r);
    const n = document.createElement("button");
    return n.appendChild(document.createTextNode("Sign in with Google")), s.appendChild(n), s.addEventListener("close", () => s.remove(), { once: !0 }), document.body.appendChild(s), new Promise((a) => {
      n.addEventListener(
        "click",
        () => {
          s.close(), a(this.signIn(t));
        },
        { once: !0 }
      ), s.showModal();
    });
  }
  async #h(t, s, o) {
    console.info("[shell host] Awaiting grant response");
    const r = new AbortController(), n = await new Promise((S) => {
      window.addEventListener(
        "message",
        (m) => {
          m.isTrusted && m.source === o && m.origin === window.location.origin && typeof m.data == "object" && m.data !== null && m.data.type === Ye && (S(m.data), r.abort());
        },
        { signal: r.signal }
      );
    });
    if (n.nonce !== t)
      return {
        ok: !1,
        error: { code: "other", userMessage: "Verification failed" }
      };
    const { grantResponse: a } = n, i = Date.now();
    if (console.info("[shell host] Received grant response"), a.error !== void 0)
      return a.error === "access_denied" ? (console.info("[shell host] User cancelled sign-in"), { ok: !1, error: { code: "user-cancelled" } }) : (console.error("[shell host] Unknown grant error", a.error), {
        ok: !1,
        error: {
          code: "other",
          userMessage: `Unknown grant error ${JSON.stringify(a.error)}`
        }
      });
    if (!a.access_token)
      return console.error("[shell host] Missing access token", a), {
        ok: !1,
        error: { code: "other", userMessage: "Missing access token" }
      };
    console.info("[shell host] Checking geo restriction");
    try {
      if (!(await this.#i(
        a.access_token
      )).canAccess)
        return console.info("[shell host] User is geo restricted"), { ok: !1, error: { code: "geo-restriction" } };
    } catch (S) {
      return console.error("[shell host] Error checking geo access", S), {
        ok: !1,
        error: { code: "other", userMessage: "Error checking geo access" }
      };
    }
    const c = s.length ? s : q, l = new Set(a.scopes ?? []), d = c.filter(
      (S) => !l.has(S)
    );
    if (d.length > 0)
      return console.info("[shell host] Missing scopes", d), {
        ok: !1,
        error: { code: "missing-scopes", missingScopes: d }
      };
    const g = {
      client_id: u.OAUTH_CLIENT,
      access_token: a.access_token,
      expires_in: a.expires_in,
      issue_time: i,
      name: a.name,
      picture: a.picture,
      id: a.id,
      domain: a.domain,
      scopes: a.scopes
    };
    console.info("[shell host] Updating storage");
    const h = await this.#e, E = () => h.set(p.CONNECTIONS, y, {
      name: y,
      value: JSON.stringify(g)
    });
    try {
      await E();
    } catch (S) {
      console.warn(
        "[shell host] Error updating storage, deleting storage and retrying:",
        S
      );
      try {
        await (await this.#t).delete(), await E();
      } catch (m) {
        return console.error(
          "[shell host] Error updating storage even after deleting:",
          m
        ), {
          ok: !1,
          error: {
            code: "other",
            userMessage: "Error updating storage after delete"
          }
        };
      }
    }
    const ie = this.#a(g);
    return this.#r = Promise.resolve(ie), console.info("[shell host] Sign-in complete"), { ok: !0, state: ie };
  }
  #a(t) {
    return {
      status: "signedin",
      id: t.id,
      name: t.name,
      picture: t.picture,
      domain: t.domain,
      scopes: (t.scopes ?? []).map(
        (s) => O(s)
      )
    };
  }
  async #s(t) {
    let o = (await this.#n).getToken();
    if (o.state === "expired" && (o = await o.refresh()), o.state === "valid" && t?.length) {
      const r = new Set(
        (o.grant.scopes ?? []).map((a) => O(a))
      ), n = t.filter(
        (a) => !r.has(O(a))
      );
      if (n.length)
        return { state: "missing-scopes", scopes: n };
    }
    return o;
  }
  /**
   * Re-use the same ShareClient instance across all calls to
   * {@link shareDriveFiles} because it always dumps bunch of new DOM into the
   * body every time it's opened, and never cleans it up.
   */
  #o;
  async #i(t) {
    if ((await this.getConfiguration()).isTestApi)
      return console.info(
        "[shell host] Using test gaia; Skipping geo restriction check"
      ), { canAccess: !0, accessStatus: "ACCESS_STATUS_OK" };
    const s = async () => {
      const i = await fetch(
        new URL(
          "/v1beta1/checkAppAccess",
          u.BACKEND_API_ENDPOINT
        ),
        { headers: { Authorization: `Bearer ${t}` } }
      );
      if (!i.ok)
        throw new Error(
          `HTTP ${i.status} error checking geo restriction`
        );
      return await i.json();
    }, o = 4, r = 5e3;
    let n = 0, a = 1e3;
    for (; ; )
      try {
        return await s();
      } catch (i) {
        if (n++, n < o)
          console.log(
            `[shell host] checkAppAccess error, retrying in ${a}ms.`,
            i
          ), await new Promise((c) => setTimeout(c, a)), a = Math.min(a * 1.5, r);
        else
          throw console.log(
            "[shell host] checkAppAccess error, too many retries.",
            i
          ), i;
      }
  }
}
function Us(...e) {
  return { type: "error", args: e };
}
function Ds(...e) {
  return { type: "info", args: e };
}
function Ms(...e) {
  return { type: "verbose", args: e };
}
function xs(...e) {
  return { type: "warning", args: e };
}
let N = null, k = null;
function Gs(e) {
  k = e;
}
function Fs(e = null) {
  return e && (k = e), N || (N = new Ss(), N);
}
class Ss {
  constructor() {
    this.warned = !1;
  }
  log(t, s = "", o = !0) {
    this.logItem(
      t.type,
      "",
      s,
      o,
      ...t.args
    );
  }
  logItem(t, s, o, r = !0, ...n) {
    if (r && (!k && !this.warned && (this.warned = !0, console.warn("Logger called without app controller")), k && !k.global.debug.enabled))
      return;
    const a = "\x1B[m";
    let i, c = console.log;
    switch (t) {
      case "warning":
        i = "\x1B[43;97m", c = console.warn;
        break;
      case "error":
        i = "\x1B[41;97m", c = console.error;
        break;
      case "info":
        i = "\x1B[104;97m", c = console.info;
        break;
      case "verbose":
        i = "\x1B[42;97m", c = console.debug;
        break;
    }
    c.call(
      console,
      `[${i} ${o}${s ? `:${s}` : ""} ${a}]`,
      ...n
    );
  }
}
export {
  ns as A,
  Ut as B,
  ve as C,
  zt as D,
  Yt as E,
  Xt as F,
  L as G,
  Qt as H,
  Ee as I,
  Pe as J,
  Is as K,
  Os as L,
  _s as M,
  Ps as N,
  Me as O,
  Se as P,
  Rs as Q,
  Kt as R,
  As as S,
  ge as T,
  qt as U,
  Jt as V,
  Ls as W,
  jt as a,
  Ns as b,
  wt as c,
  Us as d,
  Fe as e,
  ks as f,
  Fs as g,
  Ts as h,
  Ds as i,
  ht as j,
  Cs as k,
  Dt as l,
  dt as m,
  gs as n,
  V as o,
  oe as p,
  Ae as q,
  bs as r,
  be as s,
  Ct as t,
  Gs as u,
  Ms as v,
  xs as w,
  O as x,
  Nt as y,
  p as z
};
