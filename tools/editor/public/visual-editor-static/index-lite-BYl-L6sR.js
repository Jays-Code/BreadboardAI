import { u as pe, S as G, k as Oe, v as Le, n as We, c as De, o as Fe, d as Ue, t as Ne, w as Pe } from "./project-DMClisrJ.js";
import "./connection-broker-CilcgYmS.js";
import "./opal-shell-guest-CavlCYO8.js";
import { forSection as Ge } from "./helper-EFXUwdnr.js";
import { q as Ve } from "./logger-BR29-LuY.js";
import { r as ne, A as b, b as d, e as ge, h as oe, n as ue, g as Be, i as je, c as qe, t as He, d as le } from "./map-z4l6LcMf.js";
import "./splitter-DnQF9ocm.js";
import { f as Ye } from "./sca-BIsLGxhn.js";
import { e as ce, M as Ke } from "./main-base-C2DT6WmL.js";
var Xe = Object.create, H = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, be = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), $ = (e) => {
  throw TypeError(e);
}, Qe = (e, t, i) => t in e ? H(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, de = (e, t) => H(e, "name", { value: t, configurable: !0 }), Ze = (e) => [, , , Xe(e?.[be("metadata")] ?? null)], fe = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], A = (e) => e !== void 0 && typeof e != "function" ? $("Function expected") : e, et = (e, t, i, r, s) => ({ kind: fe[e], name: t, metadata: r, addInitializer: (c) => i._ ? $("Already initialized") : s.push(A(c || null)) }), tt = (e, t) => Qe(t, be("metadata"), e[3]), w = (e, t, i, r) => {
  for (var s = 0, c = e[t >> 1], m = c && c.length; s < m; s++) t & 1 ? c[s].call(i) : r = c[s].call(i, r);
  return r;
}, E = (e, t, i, r, s, c) => {
  var m, g, ae, I, D, o = t & 7, F = !!(t & 8), f = !!(t & 16), U = o > 3 ? e.length + 1 : o ? F ? 1 : 2 : 0, re = fe[o + 5], se = o > 3 && (e[U - 1] = []), Ce = e[U] || (e[U] = []), u = o && (!f && !F && (s = s.prototype), o < 5 && (o > 3 || !f) && Je(o < 4 ? s : { get [i]() {
    return l(this, c);
  }, set [i](p) {
    return x(this, c, p);
  } }, i));
  o ? f && o < 4 && de(c, (o > 2 ? "set " : o > 1 ? "get " : "") + i) : de(s, i);
  for (var N = r.length - 1; N >= 0; N--)
    I = et(o, i, ae = {}, e[3], Ce), o && (I.static = F, I.private = f, D = I.access = { has: f ? (p) => it(s, p) : (p) => i in p }, o ^ 3 && (D.get = f ? (p) => (o ^ 1 ? l : n)(p, s, o ^ 4 ? c : u.get) : (p) => p[i]), o > 2 && (D.set = f ? (p, P) => x(p, s, P, o ^ 4 ? c : u.set) : (p, P) => p[i] = P)), g = (0, r[N])(o ? o < 4 ? f ? c : u[re] : o > 4 ? void 0 : { get: u.get, set: u.set } : s, I), ae._ = 1, o ^ 4 || g === void 0 ? A(g) && (o > 4 ? se.unshift(g) : o ? f ? c = g : u[re] = g : s = g) : typeof g != "object" || g === null ? $("Object expected") : (A(m = g.get) && (u.get = m), A(m = g.set) && (u.set = m), A(m = g.init) && se.unshift(m));
  return o || tt(e, s), u && H(s, i, u), f ? o ^ 4 ? c : u : s;
}, Y = (e, t, i) => t.has(e) || $("Cannot " + i), it = (e, t) => Object(t) !== t ? $('Cannot use the "in" operator on this value') : e.has(t), l = (e, t, i) => (Y(e, t, "read from private field"), i ? i.call(e) : t.get(e)), v = (e, t, i) => t.has(e) ? $("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), x = (e, t, i, r) => (Y(e, t, "write to private field"), r ? r.call(e, i) : t.set(e, i), i), n = (e, t, i) => (Y(e, t, "access private method"), i), me, ve, we, _e, B, xe, h, K, X, J, V, ke, C, a, z, M, L, T, k, W, _, ye, $e, j, Se, Q, Z, Ie, Ae, Re, q, Me, O, S, ee, te, Ee, ie, ze;
const R = Ge("Global"), Te = "bb-lite-advanced-editor", he = "bb-lite-show-remix-warning";
xe = [He("bb-lite")];
class y extends (B = Ke, _e = [le()], we = [le()], ve = [ne()], me = [ne()], B) {
  constructor(t) {
    super(t), w(h, 5, this), v(this, a), v(this, K, w(h, 8, this, !1)), w(h, 11, this), v(this, X, w(h, 12, this, !1)), w(h, 15, this), v(this, J, w(h, 16, this, !0)), w(h, 19, this), v(this, z, !1), v(this, M, oe()), v(this, L, oe()), v(this, T, null), this.boardLoaded = void 0, x(this, a, (globalThis.localStorage.getItem(Te) ?? "true") === "true", C), this.showRemixWarning = (globalThis.localStorage.getItem(he) ?? "true") === "true", this.addEventListener("bbevent", (s) => {
      const c = s;
      if (c.detail.eventType === "app.fullscreen") {
        this.showAppFullscreen = c.detail.action === "activate";
        return;
      }
      if (!this.handleUserSignIn(c))
        return this.handleRoutedEvent(c);
    }), this.boardLoaded = n(this, a, j).call(this);
    const i = window.matchMedia("(max-width: 500px)"), r = () => {
      i.matches ? this.compactView = !0 : this.compactView = !1;
    };
    i.addEventListener("change", r), r();
  }
  set showRemixWarning(t) {
    x(this, z, t), globalThis.localStorage.setItem(he, String(t));
  }
  get showRemixWarning() {
    return l(this, z);
  }
  get accessStatus() {
    return l(this, T);
  }
  set accessStatus(t) {
    x(this, T, t);
  }
  async doPostInitWork() {
    await this.sca.controller.global.performMigrations(), await this.sca.controller.isHydrated;
    let t = this.sca.controller.global.main.loadState;
    const i = pe(() => {
      const r = this.sca.controller.global.main.loadState;
      r === "Loaded" && t !== "Loaded" && (n(this, a, $e).call(this), queueMicrotask(() => i())), t = r;
    });
    this.sca.controller.router.parsedUrl.page === "home" && await this.askUserToSignInIfNeeded();
  }
  async handleAppAccessCheckResult(t) {
    if (this.actionTracker.updateCanAccessStatus(t.canAccess), !t.canAccess)
      this.accessStatus = t, this.sca.controller.global.main.show.add("NoAccessModal");
    else {
      const i = this.sca.controller.router.parsedUrl;
      if (i.page !== "graph") return;
      const r = i.remix ? i.flow : null;
      if (!r) return;
      await this.boardLoaded, this.sca.services.actionTracker.remixApp(r, "user"), this.invokeRemixEventRouteWith(r);
    }
  }
  /**
   * This method is called by bb-editor-input-lite whenever it needs to
   * generate a new graph.
   */
  async generate(t) {
    if (await this.askUserToSignInIfNeeded() !== "success")
      return { error: "" };
    let i = this.runtime.state.project;
    if (this.sca.controller.global.flowgenInput.currentExampleIntent = t, !i && (await this.invokeBoardCreateRoute(), await n(this, a, j).call(this), i = this.runtime.state.project, !i))
      return { error: "Failed to create a new opal." };
    const r = this.sca.controller.editor.graph.graph;
    if (!r)
      return { error: "No current graph detected, exting flow generation" };
    if (!this.flowGenerator)
      return { error: "No FlowGenerator was provided" };
    this.dispatchEvent(new G({ eventType: "board.stop" }));
    const s = await Ye(
      this.flowGenerator,
      t,
      r,
      i
    );
    if ("error" in s)
      return s;
    await this.invokeBoardReplaceRoute(s.flow, s.theme);
  }
  renderNoAccessModal() {
    const t = at(
      this.accessStatus,
      this.guestConfiguration
    );
    if (!t) return b;
    const { title: i, message: r } = t;
    return d`
      <bb-modal
        appearance="basic"
        .modalTitle=${i}
        @bbmodaldismissed=${(s) => {
      s.preventDefault();
    }}
        ><section id="container">${r}</section></bb-modal
      >
    `;
  }
  render() {
    const t = l(this, a, k), i = l(this, a, W);
    let r = b;
    switch (t) {
      case "home":
      case "editor":
      case "loading": {
        if (t === "home" && i !== "generating") {
          r = n(this, a, Me).call(this);
          break;
        }
        r = d`${this.showAppFullscreen || this.compactView ? n(this, a, q).call(this) : d` <bb-splitter
              direction=${"horizontal"}
              name="layout-lite"
              split="[0.30, 0.70]"
            >
              ${[n(this, a, Ie).call(this), n(this, a, q).call(this)]}
            </bb-splitter>`}`;
        break;
      }
      case "error":
        return d`<section id="lite-shell" @bbevent=${this.handleUserSignIn}>
          <div id="error">${R.from("ERROR_UNABLE_TO_LOAD_PROJECT")}</div>
          ${n(this, a, O).call(this)}
        </section>`;
      default:
        return console.log("Invalid lite view state"), b;
    }
    return d`<section
        id="lite-shell"
        class=${ge({
      full: this.showAppFullscreen || this.compactView,
      welcome: t === "home"
    })}
        @bbsnackbar=${n(this, a, ee)}
        @bbunsnackbar=${n(this, a, te)}
        @bbsharerequested=${n(this, a, ie)}
      >
        ${r}
      </section>
      ${n(this, a, O).call(this)} ${n(this, a, Ee).call(this)}
      ${this.renderSnackbar()} `;
  }
  async invokeBoardReplaceRoute(t, i) {
    return ce.get("board.replace")?.do(
      this.collectEventRouteDeps(
        new G({
          eventType: "board.replace",
          replacement: t,
          theme: i,
          creator: { role: "assistant" }
        })
      )
    );
  }
  async invokeBoardCreateRoute() {
    return ce.get("board.create")?.do(
      this.collectEventRouteDeps(
        new G({
          eventType: "board.create",
          editHistoryCreator: { role: "user" },
          graph: Oe(),
          messages: {
            start: "",
            end: "",
            error: ""
          }
        })
      )
    );
  }
  handleUserSignIn(t) {
    if (t.detail.eventType !== "host.usersignin") return !1;
    const { result: i } = t.detail;
    return !0;
  }
}
h = Ze(B);
K = /* @__PURE__ */ new WeakMap();
X = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
a = /* @__PURE__ */ new WeakSet();
z = /* @__PURE__ */ new WeakMap();
M = /* @__PURE__ */ new WeakMap();
L = /* @__PURE__ */ new WeakMap();
T = /* @__PURE__ */ new WeakMap();
k = function() {
  return Le(this.sca, this.sca.controller.editor.graph.empty);
};
W = function() {
  return this.sca.controller.global.flowgenInput.state.status;
};
_ = function() {
  return this.sca.controller.editor.graph.graph;
};
ye = function() {
  return this.sca.controller.global.flowgenInput.examples;
};
$e = function() {
  const e = this.tab?.graph.url;
  if (!e)
    return;
  const t = Ve(e);
  if (!t)
    return;
  const i = this.sca.services.googleDriveBoardServer.isMine(new URL(e)), r = (
    // This is a bit hacky and indirect, but an easy way to tell if something
    // is from the public gallery is to check if the GoogleDriveClient has
    // been configured to use the proxy for it.
    this.googleDriveClient.fileIsMarkedForReadingWithPublicProxy(t)
  );
  !i && !r && (this.showAppFullscreen = !0);
};
j = function() {
  return new Promise((e) => {
    const t = pe(() => {
      this.sca.controller.global.main.loadState === "Loaded" && queueMicrotask(() => {
        t(), e();
      });
    });
  });
};
Se = function() {
  const e = this.tab?.graph.metadata?.raw_intent ?? this.tab?.graph.metadata?.intent ?? this.sca.controller.global.flowgenInput.currentExampleIntent ?? null;
  return d`<bb-prompt-view
      .prompt=${e}
      ?inert=${n(this, a, S).call(this)}
    ></bb-prompt-view>`;
};
Q = function() {
  const e = (this.tab?.graphIsMine ?? !1) || l(this, a, k) !== "editor";
  return d`<bb-editor-input-lite
      ?inert=${n(this, a, S).call(this)}
      .controller=${this}
      .editable=${e}
      @bbsnackbar=${n(this, a, ee)}
      @bbunsnackbar=${n(this, a, te)}
    ></bb-editor-input-lite>`;
};
Z = function() {
  const e = (this.tab?.graphIsMine ?? !1) || l(this, a, k) !== "editor";
  return d`<div
      ?disabled=${!e}
      id="message"
      class="w-400 md-body-small sans-flex"
    >
      ${Pe(R.from("LABEL_DISCLAIMER_LITE"))}
    </div>`;
};
Ie = function() {
  return d`<div id="controls" slot="slot-0">
      ${[
    n(this, a, Se).call(this),
    n(this, a, Ae).call(this),
    n(this, a, Q).call(this),
    n(this, a, Z).call(this)
  ]}
    </div>`;
};
Ae = function() {
  return d`
      <bb-step-list-view
        ?inert=${n(this, a, S).call(this)}
        lite
      ></bb-step-list-view>
    `;
};
Re = function() {
  if (this.showRemixWarning && x(this, a, !1, C), !l(this, a, ke) || !l(this, M).value)
    return b;
  const e = l(this, M).value.getBoundingClientRect();
  if (!e.width)
    return b;
  const t = 30, i = Math.round(window.innerWidth - e.right + t), r = Math.round(e.y + e.height + t), s = {
    "--right": `${i}px`,
    "--top": `${r}px`
  };
  return d`<bb-onboarding-tooltip
      @bbonboardingacknowledged=${() => {
    x(this, a, !1, C), globalThis.localStorage.setItem(Te, "false");
  }}
      style=${qe(s)}
      .text=${"To edit or view full prompt, open in advanced editor"}
    ></bb-onboarding-tooltip>`;
};
q = function() {
  const e = this.getRenderValues(), t = l(this, a, k) === "editor" ? this.tab?.graph.title ?? "Untitled app" : "...", i = this.tab?.graphIsMine ?? !1, r = l(this, a, W) === "generating", s = r && l(this, a, _)?.edges.length === 0 && l(this, a, _)?.nodes.length === 0 && l(this, a, _)?.title === "Untitled Opal app", c = [];
  return l(this, a, k) === "editor" && (c.push(
    d`<a
          ${ue(l(this, M))}
          class="w-400 md-title-small sans-flex unvaried"
          id="open-advanced-editor"
          href="${this.guestConfiguration.advancedEditorOrigin || this.hostOrigin}?mode=canvas&flow=${l(this, a, _)?.url}"
          target="_blank"
        >
          <span class="g-icon">open_in_new</span>Open Advanced Editor
        </a>`
  ), i ? c.push(
    d`<button
            class="w-400 md-title-small sans-flex unvaried"
            @click=${n(this, a, ie)}
          >
            <span class="g-icon">share</span>${R.from(
      "COMMAND_COPY_APP_PREVIEW_URL"
    )}
          </button>`
  ) : c.push(
    d`<button
            class="w-400 md-title-small sans-flex unvaried"
            @click=${n(this, a, ze)}
          >
            <span class="g-icon">gesture</span>${R.from("COMMAND_REMIX")}
            ${this.showRemixWarning ? d`<bb-onboarding-tooltip
                  id="show-remix-warning"
                  .text=${"Remix to make a copy and edit the steps"}
                  @bbonboardingacknowledged=${() => {
      this.showRemixWarning = !1;
    }}
                ></bb-onboarding-tooltip>` : b}
          </button>`
  )), d` <section
      id="app-view"
      slot=${this.showAppFullscreen || this.compactView ? b : "slot-1"}
    >
      ${this.showAppFullscreen || this.compactView ? b : d` <header>
            <div class="left w-500 md-title-small sans-flex">
              ${t}

              <span class="sans" id="experiment">Experiment</span>
            </div>
            <div class="right">${c}</div>
          </header>`}
      <bb-app-controller
        ?inert=${n(this, a, S).call(this)}
        class=${ge({ active: !0 })}
        .graph=${l(this, a, _) ?? null}
        .graphIsEmpty=${!1}
        .graphTopologyUpdateId=${this.graphTopologyUpdateId}
        .isMine=${this.tab?.graphIsMine ?? !1}
        .projectRun=${e.projectState?.run}
        .readOnly=${!0}
        .runtimeFlags=${this.sca.controller.global.flags}
        .showGDrive=${this.sca.services.signinAdapter.stateSignal?.status === "signedin"}
        .status=${e.tabStatus}
        .shouldShowFirstRunMessage=${!0}
        .firstRunMessage=${R.from("LABEL_FIRST_RUN_LITE")}
        .themeHash=${e.themeHash}
        .headerConfig=${{
    menu: !1,
    replay: !0,
    fullscreen: this.showAppFullscreen || this.compactView ? this.compactView ? "no-exit" : "active" : "available",
    small: !0
  }}
        .isRefreshingAppTheme=${r}
        .isFreshGraph=${s}
      >
      </bb-app-controller>
      ${n(this, a, O).call(this)} ${this.renderConsentRequests()}
    </section>`;
};
Me = function() {
  return d`<section id="welcome">
      <h1 class="w-400 md-display-small sans-flex">
        Describe the AI mini app you want to build
      </h1>
      <h2 class="w-400 md-title-large sans-flex">
        Looking for inspiration? Try one of our prompts
      </h2>
      <aside id="examples" ?inert=${n(this, a, S).call(this)}>
        <ul>
          ${Be(l(this, a, ye), (e) => d`<li>
              <button
                class="w-400 md-body-small sans-flex"
                @click=${() => {
    this.sca.controller.global.flowgenInput.currentExampleIntent = e.intent;
  }}
              >
                <span class="example-icon">
                  <span class="g-icon filled-heavy round">pentagon</span>
                </span>
                <span>${e.intent}</span>
              </button>
            </li>`)}
        </ul>
      </aside>
      ${[n(this, a, Q).call(this), n(this, a, Z).call(this)]}
    </section>`;
};
O = function() {
  return [
    this.renderTooltip(),
    n(this, a, Re).call(this),
    this.sca.controller.global.main.show.has("NoAccessModal") ? this.renderNoAccessModal() : b,
    this.sca.controller.global.main.show.has("SignInModal") ? this.renderSignInModal(!1) : b,
    this.sca.controller.global.main.show.has("SnackbarDetailsModal") ? this.renderSnackbarDetailsModal() : b
  ];
};
S = function() {
  return this.sca.controller.global.main.blockingAction || l(this, a, W) == "generating" || l(this, a, k) === "loading";
};
ee = function(e) {
  this.sca.controller.global.snackbars.snackbar(
    e.message,
    e.snackType,
    e.actions,
    e.persistent,
    e.snackbarId,
    e.replaceAll
  );
};
te = function(e) {
  this.sca.controller.global.snackbars.unsnackbar(e.snackbarId);
};
Ee = function() {
  return d`
      <bb-share-panel
        .graph=${l(this, a, _)}
        ${ue(l(this, L))}
      >
      </bb-share-panel>
    `;
};
ie = function() {
  l(this, L).value?.open();
};
ze = function() {
  const e = l(this, a, _)?.url;
  e && this.invokeRemixEventRouteWith(e);
};
E(h, 4, "showAppFullscreen", _e, y, K);
E(h, 4, "compactView", we, y, X);
V = E(h, 20, "#showAdvancedEditorOnboardingTooltip", ve, a, J), ke = V.get, C = V.set;
E(h, 3, "showRemixWarning", me, y);
y = E(h, 0, "LiteMain", xe, y);
y.styles = [
  We,
  De,
  Fe,
  Ue,
  Ne,
  je`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: 1;
        background: var(--sys-color--body-background);

        --example-color: var(--sys-color--surface-container-low);
        --example-text-color: light-dark(#575b5f, #ffffff);
        --example-icon-background-color: light-dark(
          #d9d7fd,
          var(--sys-color--on-surface-low)
        );
        --example-icon-color: light-dark(#665ef6, #665ef6);
      }

      #loading,
      #error {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        color: var(--sys-color--on-surface);

        & .g-icon {
          margin-right: var(--bb-grid-size-2);
          animation: rotate 1s linear infinite;
        }
      }

      #lite-shell {
        display: block;
        height: 100%;
        width: 100%;
        padding: var(--bb-grid-size-3) var(--bb-grid-size-3) 0
          var(--bb-grid-size);

        & #controls {
          display: flex;
          flex-direction: column;
          gap: var(--bb-grid-size-2);
          padding-left: var(--bb-grid-size-2);
          padding-bottom: var(--bb-grid-size-3);

          & bb-prompt-view {
            flex: 0 0 auto;
            margin-bottom: var(--bb-grid-size-8);
          }

          & bb-step-list-view {
            flex: 1 1 auto;
            overflow: auto;
          }
        }

        & bb-editor-input-lite {
          flex: 0 0 auto;
          box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.16);
        }

        & #message {
          text-align: center;
          height: var(--bb-grid-size-7);
          margin: var(--bb-grid-size-2) 0;
          color: var(--sys-color--on-surface-variant);

          p {
            margin: 0;
          }

          a {
            color: var(--sys-color--on-surface);
          }

          &[disabled] {
            opacity: 0.3;
          }
        }

        & #app-view {
          position: relative;
          margin: 0 0 0 var(--bb-grid-size-3);
          border-radius: var(--bb-grid-size-4);
          border: 1px solid var(--sys-color--surface-variant);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          margin-bottom: var(--bb-grid-size-16);

          & bb-snackbar {
            width: calc(100% - var(--bb-grid-size-12));
            left: 50%;
            position: absolute;
          }

          & header {
            height: var(--bb-grid-size-16);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 var(--bb-grid-size-5);
            background: var(--sys-color--surface);
            color: var(--sys-color--on-surface);
            container-type: inline-size;

            & .left {
              flex: 1;
              gap: var(--bb-grid-size-2);
            }

            & .right {
              gap: var(--bb-grid-size-8);
            }

            & .left,
            & .right {
              display: flex;
              align-items: center;
              white-space: nowrap;
            }

            button,
            a {
              display: flex;
              align-items: center;
              color: var(--sys-color--on-surface);
              border: none;
              background: none;
              padding: 0;
              cursor: pointer;
              text-decoration: none;
              position: relative;

              & .g-icon {
                margin-right: var(--bb-grid-size-2);
              }

              & bb-onboarding-tooltip {
                z-index: 300;
                white-space: normal;
                --top: calc(100% + var(--bb-grid-size-7) + 2px);
                --right: 0;
              }
            }

            & #experiment {
              display: none;
              font-size: 11px;
              line-height: 1;
              padding: var(--bb-grid-size) var(--bb-grid-size-3);
              border-radius: var(--bb-grid-size-16);
              border: 1px solid light-dark(var(--n-0), var(--n-70));
              text-transform: uppercase;
              color: light-dark(var(--n-0), var(--n-70));
            }

            #open-advanced-editor {
              display: none;
            }
          }

          & bb-app-view-controller {
            flex: 1 1 auto;
          }
        }

        & #welcome {
          display: flex;
          flex-direction: column;
          gap: var(--bb-grid-size-4);
          height: 100%;
          max-width: 800px;
          margin: 0 auto;

          & > h1 {
            color: var(--sys-color--on-surface);
            margin: 0 0 var(--bb-grid-size-11) 0;
          }

          & > h2 {
            color: var(--sys-color--on-surface);
            margin: 0 0 var(--bb-grid-size-4) 0;
          }

          & > #examples {
            flex: 1;
            position: relative;

            ul {
              list-style: none;
              display: grid;
              padding: 0;
              margin: 0;
              gap: var(--bb-grid-size-3);
              grid-template-columns: repeat(4, 1fr);

              li {
                height: 100%;

                & button {
                  display: flex;
                  flex-direction: column;
                  gap: var(--bb-grid-size-3);
                  height: 100%;
                  align-items: start;
                  justify-content: start;
                  padding: var(--bb-grid-size-4);
                  border-radius: var(--bb-grid-size-4);
                  text-align: left;
                  background: var(--example-color);
                  border: none;
                  color: var(--example-text-color);
                  transition: background-color 0.2s cubic-bezier(0, 0, 0.3, 1);

                  &:not([disabled]) {
                    cursor: pointer;

                    &:hover {
                      background: oklch(
                        from var(--example-color) calc(l * 0.98) c h
                      );
                    }
                  }

                  & .example-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 20px;
                    height: 20px;
                    background: var(--example-icon-background-color);
                    border-radius: 50%;

                    & .g-icon {
                      font-size: 14px;
                      position: relative;
                      color: var(--example-icon-color);
                    }
                  }
                }
              }
            }

            & bb-snackbar {
              position: absolute;
              bottom: 0;
            }
          }

          & bb-editor-input-lite {
            max-width: 90%;
            width: 100%;
            margin: 0 auto;
          }

          & #message {
            margin-bottom: var(--bb-grid-size-4);
          }
        }

        &.full {
          padding: 0;

          #app-view {
            height: 100%;
            border: none;
            border-radius: 0;
            margin: 0;
          }
        }

        &.welcome {
          padding: var(--bb-grid-size-3);
        }

        & bb-splitter {
          height: 100%;
          width: 100%;
        }
      }

      bb-app-controller {
        display: none;

        &.active {
          z-index: 100;
          display: block;
        }
      }

      @container (min-width: 450px) {
        #lite-shell #app-view header .right #open-advanced-editor {
          display: flex;
        }
      }

      @container (min-width: 600px) {
        #lite-shell #app-view header .left #experiment {
          display: block;
        }
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
w(h, 1, y);
function at(e, t) {
  const i = "Access Denied";
  if (!e || e.canAccess) return null;
  switch (e.accessStatus) {
    case "ACCESS_STATUS_DASHER_ACCOUNT":
      return {
        title: i,
        message: t?.noAccessDasherMessage || "Switch to a personal Google Account that you use to access Opal"
      };
    case "ACCESS_STATUS_REGION_RESTRICTED":
      return {
        title: i,
        message: t?.noAccessRegionRestrictedMessage || "It looks like Opal isn't available in your country yet. We're working hard to bring Opal to new countries soon."
      };
    default:
      return {
        title: i,
        message: "It looks like this account can't access Opal yet."
      };
  }
}
export {
  y as LiteMain
};
