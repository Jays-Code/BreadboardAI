import { e as Me, S as ie, i as Yi, a as qi, b as Ki, c as Ie, d as Oe, t as Le, r as Xi, f as K, s as Pe, g as At, h as Re, j as Nt, k as Qi, l as Wt, G as Zi, n as er, o as tr, p as ee, q as ir } from "./project-DMClisrJ.js";
import { G as rr, k as Ct, l as Et, n as ar } from "./logger-BR29-LuY.js";
import "./connection-broker-CilcgYmS.js";
import { S as nr } from "./opal-shell-guest-CavlCYO8.js";
import { forSection as xe } from "./helper-EFXUwdnr.js";
import { G as or, s as sr } from "./sca-JjdBgCam.js";
import { a as Ae, c as Bt, b as x, A as H, n as ge, e as be, i as Ne, h as $e, t as We, d as k, r as Dt } from "./map-z4l6LcMf.js";
import "./splitter-DnQF9ocm.js";
import { c as lr } from "./action-tracker-BynkYfmK.js";
var cr = Object.create, Be = Object.defineProperty, dr = Object.getOwnPropertyDescriptor, Gt = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), re = (e) => {
  throw TypeError(e);
}, hr = (e, t, i) => t in e ? Be(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, St = (e, t) => Be(e, "name", { value: t, configurable: !0 }), pr = (e) => [, , , cr(e?.[Gt("metadata")] ?? null)], Ut = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], se = (e) => e !== void 0 && typeof e != "function" ? re("Function expected") : e, ur = (e, t, i, n, r) => ({ kind: Ut[e], name: t, metadata: n, addInitializer: (o) => i._ ? re("Already initialized") : r.push(se(o || null)) }), gr = (e, t) => hr(t, Gt("metadata"), e[3]), v = (e, t, i, n) => {
  for (var r = 0, o = e[t >> 1], l = o && o.length; r < l; r++) t & 1 ? o[r].call(i) : n = o[r].call(i, n);
  return n;
}, M = (e, t, i, n, r, o) => {
  var l, s, u, f, m, a = t & 7, P = !!(t & 8), b = !!(t & 16), R = a > 3 ? e.length + 1 : a ? P ? 1 : 2 : 0, F = Ut[a + 5], j = a > 3 && (e[R - 1] = []), oe = e[R] || (e[R] = []), p = a && (!b && !P && (r = r.prototype), a < 5 && (a > 3 || !b) && dr(a < 4 ? r : { get [i]() {
    return g(this, o);
  }, set [i](h) {
    return B(this, o, h);
  } }, i));
  a ? b && a < 4 && St(o, (a > 2 ? "set " : a > 1 ? "get " : "") + i) : St(r, i);
  for (var A = n.length - 1; A >= 0; A--)
    f = ur(a, i, u = {}, e[3], oe), a && (f.static = P, f.private = b, m = f.access = { has: b ? (h) => br(r, h) : (h) => i in h }, a ^ 3 && (m.get = b ? (h) => (a ^ 1 ? g : E)(h, r, a ^ 4 ? o : p.get) : (h) => h[i]), a > 2 && (m.set = b ? (h, N) => B(h, r, N, a ^ 4 ? o : p.set) : (h, N) => h[i] = N)), s = (0, n[A])(a ? a < 4 ? b ? o : p[F] : a > 4 ? void 0 : { get: p.get, set: p.set } : r, f), u._ = 1, a ^ 4 || s === void 0 ? se(s) && (a > 4 ? j.unshift(s) : a ? b ? o = s : p[F] = s : r = s) : typeof s != "object" || s === null ? re("Object expected") : (se(l = s.get) && (p.get = l), se(l = s.set) && (p.set = l), se(l = s.init) && j.unshift(l));
  return a || gr(e, r), p && Be(r, i, p), b ? a ^ 4 ? o : p : r;
}, De = (e, t, i) => t.has(e) || re("Cannot " + i), br = (e, t) => Object(t) !== t ? re('Cannot use the "in" operator on this value') : e.has(t), g = (e, t, i) => (De(e, t, "read from private field"), i ? i.call(e) : t.get(e)), w = (e, t, i) => t.has(e) ? re("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), B = (e, t, i, n) => (De(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i), E = (e, t, i) => (De(e, t, "access private method"), i), Ht, Ft, jt, Jt, Vt, Yt, qt, Kt, Xt, Qt, Zt, ei, ti, ii, Te, ri, z, c, Ge, Ue, He, Fe, je, Je, Ve, Ye, qe, Ke, Xe, le, Qe, Ze, et, ce, de, fe, ve, J, X, _e, T, Ce, ai, ni, oi, si, li, ci, tt, di, ke, hi;
const zt = "gallery-lite-collapsed", Q = xe("Global"), te = xe("ProjectListing");
ri = [We("bb-gallery-lite")];
class $ extends (Te = Me(Ae), ii = [K({ context: Pe })], ti = [K({ context: At })], ei = [K({ context: Re })], Zt = [k({ attribute: !1 })], Qt = [k()], Xt = [k()], Kt = [k({ type: Boolean })], qt = [k({ attribute: !1 })], Yt = [k({ type: Number })], Vt = [k({ type: Boolean })], Jt = [k({ type: Boolean })], jt = [k({ type: Boolean, reflect: !0 })], Ft = [k({ type: Number })], Ht = [k({ reflect: !0, type: Boolean })], Te) {
  constructor() {
    super(), v(c, 5, this), w(this, T), w(this, z, null), w(this, Ge, v(c, 8, this)), v(c, 11, this), w(this, Ue, v(c, 12, this)), v(c, 15, this), w(this, He, v(c, 16, this)), v(c, 19, this), w(this, Fe, v(c, 20, this, null)), v(c, 23, this), w(this, je, v(c, 24, this, null)), v(c, 27, this), w(this, Je, v(c, 28, this, null)), v(c, 31, this), w(this, Ve, v(c, 32, this, !1)), v(c, 35, this), w(this, Ye, v(c, 36, this, null)), v(c, 39, this), w(this, qe, v(c, 40, this, 0)), v(c, 43, this), w(this, Ke, v(c, 44, this, !1)), v(c, 47, this), w(this, Xe, v(c, 48, this, !1)), v(c, 51, this), w(this, le, !0), w(this, Qe, v(c, 52, this, 4)), v(c, 55, this), w(this, Ze, v(c, 56, this, !1)), v(c, 59, this), w(this, et, $e()), w(this, ce, $e()), w(this, de, $e()), w(this, fe, 0), w(this, ve, 0), w(this, J), w(this, X, null), w(this, _e, new ResizeObserver(() => {
      g(this, J) && (!g(this, ce).value || !g(this, de).value || (B(this, fe, g(this, ce).value.offsetHeight), B(this, ve, g(this, de).value.offsetHeight), this.style.setProperty("--collapsed-height", `${g(this, fe)}px`), this.style.setProperty("--expanded-height", `${g(this, ve)}px`)));
    })), this.isCollapsed = sessionStorage.getItem(zt) !== "false";
  }
  set isCollapsed(t) {
    B(this, le, t), sessionStorage.setItem(zt, String(g(this, le)));
  }
  get isCollapsed() {
    return g(this, le);
  }
  render() {
    const t = this.pageSize ?? -1, i = this.pageSize > 0 ? (this.items ?? []).slice(
      this.page * t,
      (this.page + 1) * t
    ) : this.items ?? [];
    let n = H;
    if (this.showOverflowMenu && g(this, z)) {
      const r = E(this, T, Ce).call(this, g(this, z).value), o = [
        {
          title: te.from("COMMAND_DELETE"),
          name: "delete",
          icon: "delete",
          value: g(this, z).value
        },
        {
          title: te.from("COMMAND_DUPLICATE"),
          name: "duplicate",
          icon: "duplicate",
          value: g(this, z).value
        },
        {
          title: r ? te.from("COMMAND_UNPIN") : te.from("COMMAND_PIN"),
          name: "pin",
          icon: r ? "unpin" : "pin",
          value: g(this, z).value
        }
      ];
      n = x`<bb-overflow-menu
        id="board-overflow"
        style=${Bt({
        left: `${g(this, z).x}px`,
        top: `${g(this, z).y}px`
      })}
        .actions=${o}
        .disabled=${!1}
        @bboverflowmenudismissed=${() => {
        this.showOverflowMenu = !1;
      }}
        @bboverflowmenuaction=${async (l) => {
        if (this.showOverflowMenu = !1, !!g(this, z)) {
          switch (l.action) {
            case "delete": {
              this.dispatchEvent(
                new ie({
                  eventType: "board.delete",
                  url: g(this, z).value,
                  messages: {
                    query: Q.from("QUERY_DELETE_PROJECT"),
                    start: Q.from("STATUS_DELETING_PROJECT"),
                    end: Q.from("STATUS_PROJECT_DELETED"),
                    error: Q.from("ERROR_UNABLE_TO_CREATE_PROJECT")
                  }
                })
              );
              break;
            }
            case "duplicate": {
              E(this, T, ke).call(this, l, g(this, z).value);
              break;
            }
            case "pin": {
              this.dispatchEvent(
                new ie({
                  eventType: "board.togglepin",
                  url: g(this, z).value,
                  status: r ? "unpin" : "pin"
                })
              );
              break;
            }
          }
          B(this, z, null);
        }
      }}
      ></bb-overflow-menu>`;
    }
    return g(this, X) && g(this, X).disconnect(), x`
      <section class="gallery-header">
        <h2 class="gallery-title md-title-medium sans-flex w-400">
          ${this.headerText}
          ${this.headerIcon ? x`<span class="g-icon filled-heavy round"
                >${this.headerIcon}</span
              >` : H}
        </h2>
        <slot name="actions"></slot>
        ${this.collapsable ? x`
              <button
                id="show-more-button"
                class="md-title-small sans-flex w-500"
                @click=${E(this, T, ai)}
              >
                ${te.from(
      this.isCollapsed ? "COMMAND_SHOW_MORE" : "COMMAND_SHOW_LESS"
    )}
                <span
                  class=${be({
      "g-icon": !0,
      round: !0,
      collapsed: this.collapsable && this.isCollapsed
    })}
                ></span>
              </button>
            ` : H}
      </section>
      <div
        id="boards"
        ${ge((r) => {
      if (B(this, J, void 0), !(r instanceof HTMLElement)) {
        g(this, _e).disconnect();
        return;
      }
      B(this, J, r), g(this, _e).observe(g(this, J));
      const o = 0.95;
      B(this, X, new IntersectionObserver(
        (l) => {
          for (const s of l)
            s.target instanceof HTMLElement && s.target.classList.toggle(
              "hidden",
              s.intersectionRatio < o
            );
        },
        { root: g(this, J), threshold: o }
      ));
    })}
        class=${be({
      collapsed: this.collapsable && this.isCollapsed,
      empty: i.length === 0
    })}
      >
        <div id="boards-inner">
          ${i.map((r) => {
      const o = E(this, T, Ce).call(this, r[0]);
      return E(this, T, oi).call(this, r, o);
    })}

          <div
            ${ge(g(this, ce))}
            id="sentinel-collapsed"
          ></div>
          <div
            ${ge(g(this, de))}
            id="sentinel-expanded"
          ></div>
        </div>
      </div>
      ${E(this, T, si).call(this)} ${n}
    `;
  }
}
c = pr(Te);
z = /* @__PURE__ */ new WeakMap();
Ge = /* @__PURE__ */ new WeakMap();
Ue = /* @__PURE__ */ new WeakMap();
He = /* @__PURE__ */ new WeakMap();
Fe = /* @__PURE__ */ new WeakMap();
je = /* @__PURE__ */ new WeakMap();
Je = /* @__PURE__ */ new WeakMap();
Ve = /* @__PURE__ */ new WeakMap();
Ye = /* @__PURE__ */ new WeakMap();
qe = /* @__PURE__ */ new WeakMap();
Ke = /* @__PURE__ */ new WeakMap();
Xe = /* @__PURE__ */ new WeakMap();
le = /* @__PURE__ */ new WeakMap();
Qe = /* @__PURE__ */ new WeakMap();
Ze = /* @__PURE__ */ new WeakMap();
et = /* @__PURE__ */ new WeakMap();
ce = /* @__PURE__ */ new WeakMap();
de = /* @__PURE__ */ new WeakMap();
fe = /* @__PURE__ */ new WeakMap();
ve = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
X = /* @__PURE__ */ new WeakMap();
_e = /* @__PURE__ */ new WeakMap();
T = /* @__PURE__ */ new WeakSet();
Ce = function(e) {
  const i = this.sca.controller.home.recent.boards.find((r) => e === r.url);
  let n = !1;
  return i && (n = i.pinned ?? !1), n;
};
ai = async function() {
  g(this, J) && (this.isCollapsed = !this.isCollapsed, await this.updateComplete);
};
ni = async function(e) {
  return await Xi(e, this.googleDriveClient, {
    thumbnail: !0
  });
};
oi = function([e, t], i = !1) {
  const { url: n, mine: r, title: o, description: l, thumbnail: s } = t;
  return x`
      <div
        aria-role="button"
        class=${be({ board: !0, mine: r })}
        tabindex="0"
        @click=${(u) => E(this, T, tt).call(this, u, n)}
        @keydown=${(u) => E(this, T, di).call(this, u, n)}
        ${ge((u) => {
    u && requestAnimationFrame(() => {
      g(this, X) && g(this, X).observe(u);
    });
  })}
      >
        ${Yi(
    s,
    x`${qi(
      [s],
      () => Ki(E(this, T, ni).call(this, s))
    )}`
  )}
        ${r ? x` <button
                class=${be({ "overflow-pin": !0, pinned: i })}
                @click=${(u) => {
    u.preventDefault(), u.stopImmediatePropagation(), this.dispatchEvent(
      new ie({
        eventType: "board.togglepin",
        status: i ? "unpin" : "pin",
        url: n
      })
    );
  }}
              >
                <span class="g-icon filled-heavy"></span>
              </button>
              <button
                class="overflow-menu"
                @click=${(u) => {
    if (u.preventDefault(), u.stopImmediatePropagation(), !(u.target instanceof HTMLButtonElement))
      return;
    const f = u.target.getBoundingClientRect();
    let m = f.x;
    m + 144 > window.innerWidth && (m = window.innerWidth - 144), B(this, z, {
      x: m,
      y: f.bottom,
      value: n
    }), this.showOverflowMenu = !0;
  }}
              >
                <span class="g-icon filled-heavy w-500">more_vert</span>
              </button>` : x` <button
              class=${be({
    "remix-button": !0,
    "sans-flex": !0,
    "w-500": !0,
    "md-body-small": !0,
    persistent: !r
  })}
              @click=${(u) => E(this, T, ke).call(this, u, n)}
              @keydown=${(u) => E(this, T, hi).call(this, u, n)}
            >
              <span class="g-icon filled">gesture</span>
              ${te.from("COMMAND_REMIX")}
            </button>`}
        <div class="info">
          <h4 class="title sans-flex w-500 md-label-large round">
            ${o ?? e}
          </h4>
          <p class="description sans-flex w-400 md-label-small">
            ${l ?? "No description"}
          </p>
        </div>
      </div>
    `;
};
si = function() {
  const e = this.pageSize, t = this.items ?? [], i = t.length % e === 0 ? t.length / e : Math.floor(t.length / e) + 1;
  return i <= 1 ? H : x`
      <menu id="pagination" class="md-label-medium">
        <div id="page-numbers" ${ge(g(this, et))}>
          <input
            @keydown=${(n) => {
    if (n.key !== "Enter" || !(n.target instanceof HTMLInputElement))
      return;
    const r = Number.parseInt(n.target.value);
    Number.isNaN(r) || r === this.page || r < 1 || r > i || (this.page = r - 1);
  }}
            name="page-number"
            class="md-label-medium"
            type="number"
            .value=${this.page + 1}
          />
          of ${i}
        </div>
        <button
          id="prev"
          ?disabled=${this.page === 0}
          @click=${E(this, T, li)}
        >
          <span class="g-icon filled-heavy round">chevron_left</span>
        </button>
        <button
          id="next"
          ?disabled=${this.page === i - 1}
          @click=${E(this, T, ci)}
        >
          <span class="g-icon filled-heavy round">chevron_right</span>
        </button>
      </menu>
    `;
};
li = function() {
  this.page--;
};
ci = function() {
  this.page++;
};
tt = function(e, t) {
  this.actionTracker?.openApp(
    t,
    this.forceCreatorToBeTeam ? "gallery" : "user"
  ), this.dispatchEvent(
    new ie({
      eventType: "board.load",
      url: t,
      shared: this.forceCreatorToBeTeam
    })
  );
};
di = function(e, t) {
  if (e.key === "Enter" || e.key === "Space")
    return E(this, T, tt).call(this, e, t);
};
ke = function(e, t) {
  this.actionTracker?.remixApp(
    t,
    this.forceCreatorToBeTeam ? "gallery" : "user"
  ), e.stopPropagation(), this.dispatchEvent(
    new ie({
      eventType: "board.remix",
      messages: {
        start: Q.from("STATUS_REMIXING_PROJECT"),
        end: Q.from("STATUS_PROJECT_CREATED"),
        error: Q.from("ERROR_UNABLE_TO_CREATE_PROJECT")
      },
      url: t
    })
  );
};
hi = function(e, t) {
  if (e.key === "Enter" || e.key === "Space")
    return e.stopPropagation(), E(this, T, ke).call(this, e, t);
};
M(c, 4, "sca", ii, $, Ge);
M(c, 4, "googleDriveClient", ti, $, Ue);
M(c, 4, "actionTracker", ei, $, He);
M(c, 4, "items", Zt, $, Fe);
M(c, 4, "headerIcon", Qt, $, je);
M(c, 4, "headerText", Xt, $, Je);
M(c, 4, "collapsable", Kt, $, Ve);
M(c, 4, "recentItems", qt, $, Ye);
M(c, 4, "page", Yt, $, qe);
M(c, 4, "showOverflowMenu", Vt, $, Ke);
M(c, 4, "forceCreatorToBeTeam", Jt, $, Xe);
M(c, 3, "isCollapsed", jt, $);
M(c, 4, "pageSize", Ft, $, Qe);
M(c, 4, "isAnimatingHeight", Ht, $, Ze);
$ = M(c, 0, "GalleryLite", ri, $);
$.styles = [
  Ie,
  Oe,
  Le,
  Ne`
      :host {
        display: block;
        overflow: hidden;
      }

      bb-overflow-menu {
        position: fixed;
        right: auto;
        z-index: 100;
      }

      #boards {
        overflow: hidden;
        height: var(--expanded-height);
        transition: height 200ms cubic-bezier(0.2, 0, 0, 1);

        & #boards-inner {
          display: grid;
          grid-template-columns: repeat(var(--items-per-column), 1fr);
          grid-template-rows: auto;
          grid-auto-rows: auto;
          column-gap: var(--column-gap);
          row-gap: var(--row-gap);
          position: relative;

          & #sentinel-collapsed {
            --gap-width: (var(--items-per-column) - 1) * var(--column-gap);
            width: calc((100% - var(--gap-width)) / var(--items-per-column));
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            background: red;
            aspect-ratio: 35 / 39;
            opacity: 0;
            z-index: -1;
          }

          & #sentinel-expanded {
            width: 20px;
            pointer-events: none;
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            background: green;
            opacity: 0;
            z-index: -1;
          }
        }

        &.empty #boards-inner #sentinel-collapsed {
          aspect-ratio: initial;
        }
      }

      :host([iscollapsed]) #boards {
        height: var(--collapsed-height);
      }

      .gallery-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--sys-color--on-surface);
        padding-bottom: var(--bb-grid-size-4);

        & .gallery-title {
          display: flex;
          align-items: center;
          flex: 1 0 0;
          margin: 0;

          & .g-icon {
            margin-left: var(--bb-grid-size-2);
          }
        }
      }

      #show-more-button {
        display: flex;
        align-items: center;
        background: transparent;
        border-radius: var(--bb-grid-size-16);
        border: none;
        height: var(--bb-grid-size-10);
        padding: 0 var(--bb-grid-size-3) 0 var(--bb-grid-size-4);
        color: var(--sys-color--primary);
        cursor: pointer;
        transition: background 0.2s cubic-bezier(0, 0, 0.3, 1);
        position: relative;
        -webkit-font-smoothing: antialiased;

        &:not([disabled]) {
          &:hover,
          &:focus {
            &::after {
              content: "";
              pointer-events: none;
              background: var(--sys-color--primary);
              opacity: 0.08;
              position: absolute;
              inset: 0;
              border-radius: var(--bb-grid-size-16);
            }
          }
        }

        .g-icon {
          font-size: 1.125rem;
          font-variation-settings:
            "ROND" 100,
            "wght" 500;
          margin-left: var(--bb-grid-size-2);

          &::after {
            content: "collapse_all";
          }
          &.collapsed::after {
            content: "expand_all";
          }
        }
      }

      .board {
        position: relative;
        background: light-dark(var(--n-100), var(--n-0));
        outline: 1px solid transparent;
        border-radius: var(--bb-grid-size-3);
        cursor: pointer;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 0;
        text-align: left;
        aspect-ratio: 35/39;
        transition: opacity 450ms cubic-bezier(0, 0, 0.3, 1) 20ms;
        opacity: 1;

        &::before {
          content: "";
          position: absolute;
          pointer-events: none;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;

          background:
            linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.4) 95%),
            linear-gradient(
              200deg,
              rgba(0, 0, 0, 0) 20%,
              rgba(0, 0, 0, 0.8) 70%
            );
        }

        &::after {
          box-sizing: border-box;
          content: "";
          position: absolute;
          pointer-events: none;
          top: 3px;
          left: 3px;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          z-index: 2;
          border-radius: calc(var(--bb-grid-size-3) - 3px);
          outline: 7px solid light-dark(var(--n-0), var(--n-80));
          opacity: 0;
          transition: opacity 0.2s cubic-bezier(0, 0, 0.3, 1);
        }

        &:hover:not(:has(button:hover)),
        &:focus:not(:has(button:focus)) {
          &::after {
            opacity: 1;
          }
        }

        &.hidden {
          opacity: 0;
        }

        .remix-button {
          position: absolute;
          top: var(--bb-grid-size-3);
          left: var(--bb-grid-size-3);
          height: var(--bb-grid-size-8);
          background: light-dark(var(--n-0), var(--n-100));
          color: light-dark(var(--n-100), var(--n-0));
          border-radius: var(--bb-grid-size-16);
          z-index: 10;
          display: flex;
          align-items: center;
          padding: 0 var(--bb-grid-size-4) 0 var(--bb-grid-size-3);
          border: none;
          transition:
            box-shadow 0.2s cubic-bezier(0, 0, 0.3, 1),
            opacity 0.2s cubic-bezier(0, 0, 0.3, 1);
          opacity: 0;
          pointer-events: none;

          & .g-icon {
            margin-right: var(--bb-grid-size-2);
          }

          &:not([disabled]) {
            cursor: pointer;

            &:focus,
            &:hover {
              box-shadow:
                0px 1px 2px rgba(0, 0, 0, 0.3),
                0px 2px 6px 2px rgba(0, 0, 0, 0.15);
            }
          }
        }

        .overflow-pin,
        .overflow-menu {
          position: absolute;
          top: var(--bb-grid-size-6);
          right: var(--bb-grid-size-4);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          padding: 0;
          border: none;
          background: transparent;
          color: var(--light-dark-n-100);
          z-index: 10;

          > * {
            pointer-events: none;
          }

          &:not([disabled]) {
            cursor: pointer;
          }
        }

        .overflow-pin {
          transition: opacity 0.2s cubic-bezier(0, 0, 0.3, 1);
          opacity: 0;
          pointer-events: none;
          opacity: 0;
          right: auto;
          left: var(--bb-grid-size-4);

          & .g-icon::before {
            content: "keep";
          }

          &.pinned {
            opacity: 1;
            pointer-events: auto;
          }
        }

        &:hover {
          & .overflow-pin,
          & .remix-button {
            opacity: 1;
            pointer-events: auto;
          }

          & .overflow-pin.pinned {
            & .g-icon::before {
              content: "keep_off";
            }
          }
        }

        .info {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 10;
          color: var(--light-dark-n-100);
          width: calc(100% - 32px);

          & .title {
            margin: 0;
            max-height: 96px;
            overflow: hidden;
            margin-bottom: var(--bb-grid-size-2);
            /* Line-based truncation with ellipsis */
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: var(--max-title-lines);
            overflow: hidden;
          }

          & .description {
            margin: 0;
            max-height: 60px;

            /* Line-based truncation with ellipsis */
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: var(--max-description-lines);
            overflow: hidden;
          }
        }
      }

      .thumbnail {
        height: 100%;
        width: 100%;
        object-fit: cover;
        background-color: var(--light-dark-n-0);

        &.hidden {
          opacity: 0;
        }

        &.fade {
          animation: fadeIn 0.6s cubic-bezier(0.5, 0, 0.3, 1) forwards;
        }

        &.default {
          background-color: light-dark(var(--n-100), var(--n-0));
          object-fit: contain;
          box-sizing: border-box;
          padding: var(--bb-grid-size-8);
        }
      }

      .details {
        flex: 1;
        min-height: var(--details-min-height);
        padding: var(--bb-grid-size-2) var(--bb-grid-size-3);
        display: flex;
        flex-direction: column;
      }

      .creator {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--bb-grid-size-2);

        > span {
          display: flex;
          align-items: center;
        }

        .pic {
          display: inline-flex;

          .signed-in {
            width: var(--profile-pic-size);
            height: var(--profile-pic-size);
            border-radius: 50%;
          }

          .g-icon {
            width: var(--profile-pic-size);
            height: var(--profile-pic-size);
            color: var(--light-dark-n-100);
            border-radius: 50%;
            background: var(--light-dark-n-0);
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .name {
          color: var(--light-dark-n-100);
          margin: 0 0 0 8px;
          display: inline-flex;
          align-items: center;
        }
      }

      #pagination {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: flex-end;
        justify-self: flex-end;
        margin-top: var(--bb-grid-size-4);
        color: var(--sys-color--on-surface);

        #page-numbers {
          margin-right: var(--bb-grid-size-3);
        }

        & input {
          width: var(--bb-grid-size-4);
          text-align: center;
          field-sizing: content;
          border: 1px solid var(--sys-color--surface-container-highest);
          border-radius: var(--bb-grid-size);
          background: var(--sys-color--surface);
        }

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        & button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: oklch(
            from var(--sys-color--on-surface) l c h / calc(alpha * 0.38)
          );
          transition: color 0.2s cubic-bezier(0, 0, 0.3, 1);
          padding: 0;

          &:not([disabled]) {
            cursor: pointer;

            &:hover,
            &:focus {
              color: var(--sys-color--on-surface);
            }
          }
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }
    `
];
v(c, 1, $);
var fr = Object.create, it = Object.defineProperty, vr = Object.getOwnPropertyDescriptor, pi = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), ae = (e) => {
  throw TypeError(e);
}, _r = (e, t, i) => t in e ? it(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Mt = (e, t) => it(e, "name", { value: t, configurable: !0 }), mr = (e) => [, , , fr(e?.[pi("metadata")] ?? null)], ui = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], he = (e) => e !== void 0 && typeof e != "function" ? ae("Function expected") : e, wr = (e, t, i, n, r) => ({ kind: ui[e], name: t, metadata: n, addInitializer: (o) => i._ ? ae("Already initialized") : r.push(he(o || null)) }), yr = (e, t) => _r(t, pi("metadata"), e[3]), _ = (e, t, i, n) => {
  for (var r = 0, o = e[t >> 1], l = o && o.length; r < l; r++) t & 1 ? o[r].call(i) : n = o[r].call(i, n);
  return n;
}, O = (e, t, i, n, r, o) => {
  var l, s, u, f, m, a = t & 7, P = !!(t & 8), b = !!(t & 16), R = a > 3 ? e.length + 1 : a ? P ? 1 : 2 : 0, F = ui[a + 5], j = a > 3 && (e[R - 1] = []), oe = e[R] || (e[R] = []), p = a && (!b && !P && (r = r.prototype), a < 5 && (a > 3 || !b) && vr(a < 4 ? r : { get [i]() {
    return It(this, o);
  }, set [i](h) {
    return Ot(this, o, h);
  } }, i));
  a ? b && a < 4 && Mt(o, (a > 2 ? "set " : a > 1 ? "get " : "") + i) : Mt(r, i);
  for (var A = n.length - 1; A >= 0; A--)
    f = wr(a, i, u = {}, e[3], oe), a && (f.static = P, f.private = b, m = f.access = { has: b ? (h) => xr(r, h) : (h) => i in h }, a ^ 3 && (m.get = b ? (h) => (a ^ 1 ? It : G)(h, r, a ^ 4 ? o : p.get) : (h) => h[i]), a > 2 && (m.set = b ? (h, N) => Ot(h, r, N, a ^ 4 ? o : p.set) : (h, N) => h[i] = N)), s = (0, n[A])(a ? a < 4 ? b ? o : p[F] : a > 4 ? void 0 : { get: p.get, set: p.set } : r, f), u._ = 1, a ^ 4 || s === void 0 ? he(s) && (a > 4 ? j.unshift(s) : a ? b ? o = s : p[F] = s : r = s) : typeof s != "object" || s === null ? ae("Object expected") : (he(l = s.get) && (p.get = l), he(l = s.set) && (p.set = l), he(l = s.init) && j.unshift(l));
  return a || yr(e, r), p && it(r, i, p), b ? a ^ 4 ? o : p : r;
}, rt = (e, t, i) => t.has(e) || ae("Cannot " + i), xr = (e, t) => Object(t) !== t ? ae('Cannot use the "in" operator on this value') : e.has(t), It = (e, t, i) => (rt(e, t, "read from private field"), i ? i.call(e) : t.get(e)), I = (e, t, i) => t.has(e) ? ae("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Ot = (e, t, i, n) => (rt(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i), G = (e, t, i) => (rt(e, t, "access private method"), i), gi, bi, fi, vi, _i, mi, wi, yi, xi, ki, $i, Ti, Ci, Ee, Ei, d, at, nt, ot, st, lt, ct, dt, ht, pt, ut, gt, bt, ft, D, Si, zi, Mi, Ii, Oi, Li, Pi, Ri;
const V = xe("ProjectListing"), kr = 4, $r = new URL(document.URL).searchParams, Lt = $r.has("forceNoBoards");
Ei = [We("bb-project-listing-lite")];
class C extends (Ee = Me(Ae), Ci = [K({ context: Wt })], Ti = [K({ context: Pe })], $i = [K({ context: Nt, subscribe: !0 }), Dt()], ki = [K({ context: Re })], xi = [k()], yi = [k()], wi = [k()], mi = [k()], _i = [k()], vi = [k()], fi = [k()], bi = [k()], gi = [k({ reflect: !0, type: String })], Ee) {
  constructor() {
    super(...arguments), I(this, D), I(this, at, _(d, 8, this)), _(d, 11, this), I(this, nt, _(d, 12, this)), _(d, 15, this), I(this, ot, _(d, 16, this)), _(d, 19, this), I(this, st, _(d, 20, this)), _(d, 23, this), I(this, lt, _(d, 24, this, null)), _(d, 27, this), I(this, ct, _(d, 28, this, null)), _(d, 31, this), I(this, dt, _(d, 32, this, null)), _(d, 35, this), I(this, ht, _(d, 36, this, null)), _(d, 39, this), I(this, pt, _(d, 40, this, null)), _(d, 43, this), I(this, ut, _(d, 44, this, null)), _(d, 47, this), I(this, gt, _(d, 48, this, null)), _(d, 51, this), I(this, bt, _(d, 52, this, !0)), _(d, 55, this), I(this, ft, _(d, 56, this, null)), _(d, 59, this);
  }
  render() {
    const { boardServer: t } = this;
    return t ? x`
      <div id="board-listing">
        <div id="content">${G(this, D, Si).call(this)}</div>
      </div>
    ` : x`<nav id="menu">
        ${V.from("ERROR_LOADING_PROJECTS")}
      </nav>`;
  }
}
d = mr(Ee);
at = /* @__PURE__ */ new WeakMap();
nt = /* @__PURE__ */ new WeakMap();
ot = /* @__PURE__ */ new WeakMap();
st = /* @__PURE__ */ new WeakMap();
lt = /* @__PURE__ */ new WeakMap();
ct = /* @__PURE__ */ new WeakMap();
dt = /* @__PURE__ */ new WeakMap();
ht = /* @__PURE__ */ new WeakMap();
pt = /* @__PURE__ */ new WeakMap();
ut = /* @__PURE__ */ new WeakMap();
gt = /* @__PURE__ */ new WeakMap();
bt = /* @__PURE__ */ new WeakMap();
ft = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakSet();
Si = function() {
  const e = this.boardServer;
  if (!e)
    return console.error("[homepage] No board server provided"), H;
  const { userGraphs: t, galleryGraphs: i } = e;
  if (!t || !i)
    return console.error(
      "[homepage] Board server was missing userGraphs and/or galleryGraphs"
    ), H;
  if (i.loading)
    return x`
        <div id="loading-message">${V.from("STATUS_LOADING")}</div>
      `;
  const n = G(this, D, zi).call(this, [...i.entries()], this.featuredFilter);
  return n.sort(([, r], [, o]) => {
    const l = r.metadata?.liteModeFeaturedIndex, s = o.metadata?.liteModeFeaturedIndex;
    return l !== void 0 && s !== void 0 ? l - s : l !== void 0 ? -1 : s !== void 0 ? 1 : 0;
  }), [
    G(this, D, Pi).call(this, n),
    G(this, D, Ii).call(this, t)
  ];
};
zi = function(e, t) {
  if (!t)
    return e;
  const i = t ? new RegExp(t, "gim") : void 0;
  return e.filter(
    ([n, r]) => !i || r.title && i.test(r.title) || n && i.test(n)
  );
};
Mi = function(e) {
  const t = this.sca.controller.home.recent.boards;
  return e.sort(([, i], [, n]) => {
    const r = t.find((m) => m.url === i.url), o = t.find((m) => m.url === n.url), l = r && r.pinned, s = o && o.pinned;
    if (l && !s) return -1;
    if (!l && s) return 1;
    const u = t.findIndex((m) => m.url === i.url), f = t.findIndex((m) => m.url === n.url);
    return u !== -1 && f === -1 ? -1 : u === -1 && f !== -1 ? 1 : u !== -1 && f !== -1 ? u - f : i.mine && !n.mine ? -1 : !i.mine && n.mine ? 1 : 0;
  });
};
Ii = function(e) {
  if (!Lt && e.loading)
    return x`
        <div id="loading-message">${V.from("STATUS_LOADING")}</div>
      `;
  const t = Lt ? [] : G(this, D, Mi).call(this, [...e.entries()]), i = this.createNewIcon ? `"${this.createNewIcon}"` : '"add"';
  return x`
      <div class="gallery-wrapper">
        <bb-gallery-lite
          .headerIcon=${this.libraryIcon}
          .headerText=${this.libraryTitle ?? V.from("LABEL_TABLE_DESCRIPTION_YOUR_PROJECTS_LITE")}
          .items=${t}
          .pageSize=${kr}
        >
          ${this.allowCreate ? x`<button
                slot="actions"
                id="create-new-button-inline"
                class="md-title-small sans-flex w-500"
                style=${Bt({
    "--create-new-icon": i
  })}
                @click=${G(this, D, Ri)}
              >
                <span class="g-icon round"></span>
                ${this.createNewTitle ?? V.from("COMMAND_NEW_PROJECT")}
              </button>` : H}
        </bb-gallery-lite>
      </div>
      ${t.length === 0 ? G(this, D, Oi).call(this) : H}
      ${this.allowCreate ? H : G(this, D, Li).call(this)}
    `;
};
Oi = function() {
  return x`
      <div id="no-projects-panel">
        <span class="g-icon">pentagon</span>
        ${this.noLibraryAppsTitle ?? V.from("LABEL_NO_OPALS_LITE")}
      </div>
    `;
};
Li = function() {
  return x`
      <div id="no-create-panel">
        <span class="g-icon">info</span>
        ${V.from("LABEL_NO_CREATE_COMPACT")}
      </div>
    `;
};
Pi = function(e) {
  return x`
      ${e.length === 0 ? x`<div class="gallery-wrapper">
            <h2 class="sans md-title-small w-400 ta-c">There are no items</h2>
          </div>` : x`<bb-gallery-lite
            collapsable
            .headerIcon=${this.galleryIcon}
            .headerText=${this.galleryTitle ?? V.from("LABEL_SAMPLE_GALLERY_TITLE_LITE")}
            .items=${e}
            .pageSize=${/* Unlimited */
  -1}
            forceCreatorToBeTeam
          >
          </bb-gallery-lite>`}
    `;
};
Ri = function(e) {
  e.target instanceof HTMLButtonElement && (this.actionTracker?.createNew(), e.target.disabled = !0, this.dispatchEvent(
    new ie({
      eventType: "board.create",
      editHistoryCreator: { role: "user" },
      graph: Qi(),
      messages: {
        start: "",
        end: "",
        error: ""
      }
    })
  ));
};
O(d, 4, "globalConfig", Ci, C, at);
O(d, 4, "sca", Ti, C, nt);
O(d, 4, "boardServer", $i, C, ot);
O(d, 4, "actionTracker", ki, C, st);
O(d, 4, "featuredFilter", xi, C, lt);
O(d, 4, "libraryTitle", yi, C, ct);
O(d, 4, "libraryIcon", wi, C, dt);
O(d, 4, "noLibraryAppsTitle", mi, C, ht);
O(d, 4, "galleryTitle", _i, C, pt);
O(d, 4, "galleryIcon", vi, C, ut);
O(d, 4, "createNewTitle", fi, C, gt);
O(d, 4, "allowCreate", bi, C, bt);
O(d, 4, "createNewIcon", gi, C, ft);
C = O(d, 0, "ProjectListingLite", Ei, C);
C.styles = [
  Ie,
  Oe,
  Le,
  Ne`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        --items-per-column: 4;
        --column-gap: 10px;
        --row-gap: 10px;
        --items-per-column: 4;
        --max-title-lines: 3;
        --max-description-lines: 3;
        --border: 1px solid var(--light-dark-n-90);
        --thumbnail-height: 175px;
        --details-min-height: 108px;
        --profile-pic-size: 28px;
      }

      @media (min-width: 480px) and (max-width: 800px) {
        :host {
          --items-per-column: 3;
        }
      }
      @media (min-width: 0px) and (max-width: 480px) {
        :host {
          --items-per-column: 2;
        }
      }

      #hero {
        padding: 0 var(--bb-grid-size-16);
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #hero h1 {
        margin: var(--bb-grid-size-9) 0 0 0;
        text-align: center;
      }

      #board-listing {
        margin-top: 24px;
      }

      #loading-message {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--light-dark-n-40);
        font: 400 var(--bb-body-medium) / var(--bb-body-line-height-medium)
          var(--bb-font-family);
        margin: var(--bb-grid-size-10) 0;
      }

      #loading-message::before {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        background: url(/images/progress-ui.svg) center center / 20px 20px
          no-repeat;
        margin-right: var(--bb-grid-size-2);
      }

      #loading-message p {
        margin: 0 0 var(--bb-grid-size) 0;
      }

      #no-projects-panel,
      #no-create-panel {
        background: var(--sys-color--surface-container-low);
        color: var(--sys-color--on-surface-low);
        padding: var(--bb-grid-size-4);
        border-radius: var(--bb-grid-size-3);
        text-align: center;

        .g-icon {
          vertical-align: bottom;
        }
      }

      #no-create-panel {
        margin-top: var(--bb-grid-size-3);
      }

      #create-new-button-inline {
        display: flex;
        align-items: center;
        color: var(--sys-color--on-primary);
        border-radius: var(--bb-grid-size-16);
        border: none;
        background: var(--sys-color--primary);
        height: var(--bb-grid-size-10);
        padding: 0 var(--bb-grid-size-5) 0 var(--bb-grid-size-4);
        transition: background-color 0.2s cubic-bezier(0, 0, 0.3, 1);
        position: relative;
        -webkit-font-smoothing: antialiased;

        &[disabled] .g-icon {
          animation: rotate 1s linear infinite;
        }

        &[disabled] .g-icon::after {
          content: "progress_activity";
        }

        &:not([disabled]) {
          cursor: pointer;
        }

        &:not([disabled]):focus,
        &:not([disabled]):hover {
          box-shadow:
            0 2px 1px -1px rgba(0, 0, 0, 0.2),
            0 1px 1px 0 rgba(0, 0, 0, 0.14),
            0 1px 3px 0 rgba(0, 0, 0, 0.12);

          &::after {
            content: "";
            pointer-events: none;
            background: var(--sys-color--on-primary);
            opacity: 0.08;
            position: absolute;
            inset: 0;
            border-radius: var(--bb-grid-size-16);
          }
        }

        .g-icon {
          font-size: 1.125rem;
          -webkit-font-smoothing: antialiased;

          color: var(--sys-color--on-primary);
          margin-right: var(--bb-grid-size-2);
        }

        .g-icon::after {
          content: var(--create-new-icon, "add");
        }
      }

      #new-project-container {
        display: flex;
        justify-content: center;
      }

      #location-selector-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      #location-selector-container #location-selector-outer {
        display: flex;
        align-items: center;
      }

      #location-selector-container #location-selector-outer #location-selector {
        padding: 0;
        border: none;
      }

      #content {
        display: flex;
        flex-direction: column;
      }

      #content .gallery-wrapper {
        margin-top: var(--bb-grid-size-8);
      }

      #content .gallery-wrapper .gallery-header h2 {
        margin: 0;
      }

      @keyframes rotate {
        from {
          rotate: 0deg;
        }

        to {
          rotate: 360deg;
        }
      }
    `
];
_(d, 1, C);
var Tr = Object.create, vt = Object.defineProperty, Cr = Object.getOwnPropertyDescriptor, Ai = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), ne = (e) => {
  throw TypeError(e);
}, Er = (e, t, i) => t in e ? vt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Pt = (e, t) => vt(e, "name", { value: t, configurable: !0 }), Sr = (e) => [, , , Tr(e?.[Ai("metadata")] ?? null)], Ni = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], pe = (e) => e !== void 0 && typeof e != "function" ? ne("Function expected") : e, zr = (e, t, i, n, r) => ({ kind: Ni[e], name: t, metadata: n, addInitializer: (o) => i._ ? ne("Already initialized") : r.push(pe(o || null)) }), Mr = (e, t) => Er(t, Ai("metadata"), e[3]), S = (e, t, i, n) => {
  for (var r = 0, o = e[t >> 1], l = o && o.length; r < l; r++) t & 1 ? o[r].call(i) : n = o[r].call(i, n);
  return n;
}, Y = (e, t, i, n, r, o) => {
  var l, s, u, f, m, a = t & 7, P = !!(t & 8), b = !!(t & 16), R = a > 3 ? e.length + 1 : a ? P ? 1 : 2 : 0, F = Ni[a + 5], j = a > 3 && (e[R - 1] = []), oe = e[R] || (e[R] = []), p = a && (!b && !P && (r = r.prototype), a < 5 && (a > 3 || !b) && Cr(a < 4 ? r : { get [i]() {
    return U(this, o);
  }, set [i](h) {
    return Z(this, o, h);
  } }, i));
  a ? b && a < 4 && Pt(o, (a > 2 ? "set " : a > 1 ? "get " : "") + i) : Pt(r, i);
  for (var A = n.length - 1; A >= 0; A--)
    f = zr(a, i, u = {}, e[3], oe), a && (f.static = P, f.private = b, m = f.access = { has: b ? (h) => Ir(r, h) : (h) => i in h }, a ^ 3 && (m.get = b ? (h) => (a ^ 1 ? U : Se)(h, r, a ^ 4 ? o : p.get) : (h) => h[i]), a > 2 && (m.set = b ? (h, N) => Z(h, r, N, a ^ 4 ? o : p.set) : (h, N) => h[i] = N)), s = (0, n[A])(a ? a < 4 ? b ? o : p[F] : a > 4 ? void 0 : { get: p.get, set: p.set } : r, f), u._ = 1, a ^ 4 || s === void 0 ? pe(s) && (a > 4 ? j.unshift(s) : a ? b ? o = s : p[F] = s : r = s) : typeof s != "object" || s === null ? ne("Object expected") : (pe(l = s.get) && (p.get = l), pe(l = s.set) && (p.set = l), pe(l = s.init) && j.unshift(l));
  return a || Mr(e, r), p && vt(r, i, p), b ? a ^ 4 ? o : p : r;
}, _t = (e, t, i) => t.has(e) || ne("Cannot " + i), Ir = (e, t) => Object(t) !== t ? ne('Cannot use the "in" operator on this value') : e.has(t), U = (e, t, i) => (_t(e, t, "read from private field"), i ? i.call(e) : t.get(e)), L = (e, t, i) => t.has(e) ? ne("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), Z = (e, t, i, n) => (_t(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i), Se = (e, t, i) => (_t(e, t, "access private method"), i), Wi, Bi, Di, Gi, Ui, Hi, Fi, ze, ji, y, mt, wt, yt, xt, kt, $t, Tt, ue, q, we, ye, me, Ji, Vi;
const Rt = xe("Global"), Or = "Are you sure you want to delete this gem? This cannot be undone", Lr = "Deleting gem", Pr = 250;
ji = [We("bb-lite-home")];
class W extends (ze = Me(Ae), Fi = [ee({ context: Wt })], Hi = [ee({ context: Nt })], Ui = [ee({ context: At })], Gi = [ee({ context: ir })], Di = [ee({ context: Re })], Bi = [Dt()], Wi = [ee({ context: Pe })], ze) {
  constructor(t) {
    super(), L(this, me), L(this, mt, S(y, 8, this)), S(y, 11, this), L(this, wt, S(y, 12, this)), S(y, 15, this), L(this, yt, S(y, 16, this)), S(y, 19, this), L(this, xt, S(y, 20, this)), S(y, 23, this), L(this, kt, S(y, 24, this)), S(y, 27, this), L(this, $t, S(y, 28, this, !1)), S(y, 31, this), L(this, Tt, S(y, 32, this)), S(y, 35, this), L(this, ue, !1), L(this, q), L(this, we, 0), L(this, ye, !0), this.globalConfig = t.globalConfig, Z(this, q, t.embedHandler), this.guestConfiguration = t.guestConfiguration;
    const i = t.shellHost, n = new nr(i);
    this.actionTracker = lr(i);
    const r = new URL(
      "/api/drive-proxy/drive/v3/files",
      window.location.href
    ).href, o = n.state.then(
      (a) => a === "signedout" ? r : rr
    );
    this.googleDriveClient = new or({
      apiBaseUrl: o,
      proxyApiBaseUrl: r,
      fetchWithCreds: i.fetchWithCreds,
      isTestApi: !!t.guestConfiguration.isTestApi
    });
    const l = this.globalConfig.GOOGLE_DRIVE_PUBLISH_PERMISSIONS ?? [], s = this.globalConfig.GOOGLE_DRIVE_USER_FOLDER_NAME || "Breadboard";
    this.boardServer = new Zi(
      // TODO: The first two args are not used but currently required
      "",
      n,
      this.googleDriveClient,
      l,
      s,
      i.findUserOpalFolder,
      i.listUserOpals
    );
    const u = {
      globalConfig: this.globalConfig,
      guestConfig: this.guestConfiguration,
      settings: t.settings,
      shellHost: i,
      env: t.env,
      appName: Rt.from("APP_NAME"),
      appSubName: Rt.from("SUB_APP_NAME")
    };
    this.sca = sr(u, t.globalConfig.flags);
    const f = window.matchMedia("(max-width: 500px)"), m = () => {
      f.matches ? this.compactView = !0 : this.compactView = !1;
    };
    f.addEventListener("change", m), m(), this.actionTracker.load("landing");
  }
  connectedCallback() {
    super.connectedCallback(), new URLSearchParams(window.location.search).get("scroll") === "true" && (this.style.overflow = "auto", this.style.padding = "24px"), Se(this, me, Ji).call(this);
  }
  handleRoutedEvent(t) {
    const { payload: i } = t, { eventType: n } = i, r = (o) => {
      if (ar(o))
        return;
      const l = crypto.randomUUID();
      this.snackbar(o.$error, Et.ERROR, l);
    };
    switch (n) {
      case "board.delete":
        return this.deleteBoard(i.url).then(r);
      case "board.remix":
        return this.remixBoard(i.url).then(r);
      case "board.togglepin":
        return this.togglePin(i.url).then(r);
      case "board.load":
        return this.loadBoard(i.url).then(r);
      case "board.create":
        return this.createBoard().then(r);
      default:
        console.warn("Unknown event type", n, i);
        break;
    }
  }
  /**
   * Removes a URL from the recent boards list.
   * @param url -- url to remove
   */
  async removeRecentBoard(t) {
    await this.sca.controller.home.recent.remove(t);
  }
  async addRecentBoard(t, i) {
    t = t.replace(window.location.origin, ""), await this.sca.controller.home.recent.add({
      title: i,
      url: t
    });
  }
  snackbar(t, i, n) {
    this.sca.controller.global.snackbars.snackbar(
      t,
      i,
      [],
      !1,
      n,
      !0
      // replaceAll
    );
  }
  unsnackbar(t) {
    this.sca.controller.global.snackbars.unsnackbar(t);
  }
  async deleteBoard(t) {
    if (!this.boardServer)
      return Ct("Board server is undefined. Likely a misconfiguration");
    if (U(this, ue)) return;
    Z(this, ue, !0);
    const i = crypto.randomUUID();
    this.snackbar(Lr, Et.PENDING, i);
    try {
      if (!confirm(Or))
        return;
      const n = await this.boardServer.delete(new URL(t));
      if (!n.result)
        return Ct(n.error || `Unable to delete "${t}"`);
      this.removeRecentBoard(t);
    } finally {
      this.unsnackbar(i), Z(this, ue, !1);
    }
  }
  async remixBoard(t) {
    U(this, q)?.sendToEmbedder({
      type: "remix_board",
      boardId: t
    });
  }
  async loadBoard(t) {
    U(this, q)?.sendToEmbedder({
      type: "load_board",
      boardId: t
    });
  }
  async createBoard() {
    U(this, q)?.sendToEmbedder({
      type: "create_board"
    });
  }
  async togglePin(t) {
    t = t.replace(window.location.origin, "");
    const i = this.sca.controller.home.recent.boards.find(
      (n) => n.url === t
    );
    i && await this.sca.controller.home.recent.setPin(t, !i.pinned);
  }
  render() {
    return x`<section id="home">
      <bb-project-listing-lite
        .libraryTitle=${this.guestConfiguration.libraryTitle ?? null}
        .libraryIcon=${this.guestConfiguration.libraryIcon ?? null}
        .noLibraryAppsTitle=${this.guestConfiguration.noLibraryAppsTitle ?? null}
        .galleryTitle=${this.guestConfiguration.galleryTitle ?? null}
        .galleryIcon=${this.guestConfiguration.galleryIcon ?? null}
        .createNewTitle=${this.guestConfiguration.createNewTitle ?? null}
        .createNewIcon=${this.guestConfiguration.createNewIcon ?? null}
        .allowCreate=${!this.compactView}
        @bbevent=${this.handleRoutedEvent}
      ></bb-project-listing-lite>
      ${Se(this, me, Vi).call(this)}
    </section>`;
  }
}
y = Sr(ze);
mt = /* @__PURE__ */ new WeakMap();
wt = /* @__PURE__ */ new WeakMap();
yt = /* @__PURE__ */ new WeakMap();
xt = /* @__PURE__ */ new WeakMap();
kt = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
Tt = /* @__PURE__ */ new WeakMap();
ue = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakMap();
we = /* @__PURE__ */ new WeakMap();
ye = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakSet();
Ji = function() {
  const e = (i = 0) => {
    this.offsetHeight < Pr || (clearTimeout(U(this, we)), Z(this, we, window.setTimeout(() => {
      U(this, q)?.sendToEmbedder({
        type: "resize",
        width: this.offsetWidth,
        height: this.offsetHeight,
        animate: U(this, ye)
      }), Z(this, ye, !1);
    }, i)));
  };
  new ResizeObserver(() => e()).observe(this), e(50);
};
Vi = function() {
  return x`<bb-snackbar
      @bbsnackbaraction=${async (e) => {
    e.callback?.();
  }}
    ></bb-snackbar>`;
};
Y(y, 4, "globalConfig", Fi, W, mt);
Y(y, 4, "boardServer", Hi, W, wt);
Y(y, 4, "googleDriveClient", Ui, W, yt);
Y(y, 4, "guestConfiguration", Gi, W, xt);
Y(y, 4, "actionTracker", Di, W, kt);
Y(y, 4, "compactView", Bi, W, $t);
Y(y, 4, "sca", Wi, W, Tt);
W = Y(y, 0, "LiteHome", ji, W);
W.styles = [
  er,
  Ie,
  tr,
  Oe,
  Le,
  Ne`
      :host {
        display: block;
        background: var(--sys-color--body-background);
      }
    `
];
S(y, 1, W);
export {
  W as LiteHome
};
