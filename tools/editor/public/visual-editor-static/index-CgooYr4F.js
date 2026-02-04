import { b as r, A as i, e as y, n as h, g as E, t as O } from "./map-z4l6LcMf.js";
import { x as T, y as k, z as x, I as P, T as D } from "./project-DMClisrJ.js";
import { M as N } from "./main-base-DBkNTlZy.js";
import { g as W, l as j, m as p, p as G } from "./logger-BR29-LuY.js";
import "./connection-broker-CilcgYmS.js";
import "./opal-shell-guest-CavlCYO8.js";
import { forSection as H } from "./helper-EFXUwdnr.js";
var F = Object.create, m = Object.defineProperty, B = Object.getOwnPropertyDescriptor, M = (o, e) => (e = Symbol[o]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + o), C = (o) => {
  throw TypeError(o);
}, L = (o, e, t) => e in o ? m(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, J = (o, e) => m(o, "name", { value: e, configurable: !0 }), z = (o) => [, , , F(o?.[M("metadata")] ?? null)], q = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], I = (o) => o !== void 0 && typeof o != "function" ? C("Function expected") : o, K = (o, e, t, a, s) => ({ kind: q[o], name: e, metadata: a, addInitializer: (l) => t._ ? C("Already initialized") : s.push(I(l || null)) }), V = (o, e) => L(e, M("metadata"), o[3]), X = (o, e, t, a) => {
  for (var s = 0, l = o[e >> 1], n = l && l.length; s < n; s++) l[s].call(t);
  return a;
}, Q = (o, e, t, a, s, l) => {
  var n, v, w, d = e & 7, $ = !1, S = 0, A = o[S] || (o[S] = []), b = d && (s = s.prototype, d < 5 && (d > 3 || !$) && B(s, t));
  J(s, t);
  for (var g = a.length - 1; g >= 0; g--)
    w = K(d, t, v = {}, o[3], A), n = (0, a[g])(s, w), v._ = 1, I(n) && (s = n);
  return V(o, s), b && m(s, t, b), $ ? d ^ 4 ? l : b : s;
}, R, f, U;
const c = H("Global"), _ = G(window.location.href);
R = [O("bb-main")];
class u extends (U = N) {
  async doPostInitWork() {
    await Promise.all([
      this.sca.controller.global.performMigrations(),
      this.sca.controller.global.debug.isHydrated
    ]), this.maybeNotifyAboutPreferredUrlForDomain(), this.addExperimentalToggleToWindow();
  }
  addExperimentalToggleToWindow() {
    const e = globalThis.window;
    e.toggleExperimentalFeatures = async () => T(
      () => this.sca.controller.global.main.experimentalComponents
    ) ? void 0 : (this.sca.controller.global.main.experimentalComponents = !this.sca.controller.global.main.experimentalComponents, await this.sca.controller.global.main.isSettled, W().logItem(
      "info",
      "",
      "Experimental Features",
      !1,
      this.sca.controller.global.main.experimentalComponents ? "Enabled" : "Disabled"
    ), this.sca.controller.global.main.experimentalComponents.valueOf()), e.downloadAgentTraces = () => {
      const t = this.sca.services.agentContext.exportTraces(), a = new Blob([JSON.stringify(t, null, 2)], {
        type: "application/json"
      }), s = URL.createObjectURL(a), l = document.createElement("a");
      return l.href = s, l.download = `agent-traces-${Date.now()}.json`, l.click(), URL.revokeObjectURL(s), t;
    }, e.getAgentRuns = () => this.sca.services.agentContext.getAllRuns();
  }
  async maybeNotifyAboutPreferredUrlForDomain() {
    const e = await this.sca.services.signinAdapter.domain;
    if (!e)
      return;
    const t = this.globalConfig.domains?.[e]?.preferredUrl;
    t && this.sca.controller.global.snackbars.snackbar(
      r`
        Users from ${e} should prefer
        <a href="${t}" target="_blank">${new URL(t).hostname}</a>
      `,
      j.WARNING,
      [],
      !0
    );
  }
  async handleAppAccessCheckResult(e) {
    this.actionTracker.updateCanAccessStatus(e.canAccess), e.canAccess || (await this.sca.services.signinAdapter.signOut(), window.history.pushState(
      void 0,
      "",
      p({
        page: "landing",
        geoRestriction: !0,
        redirect: {
          page: "home",
          guestPrefixed: !0
        },
        guestPrefixed: !0
      })
    ), window.location.reload());
  }
  render() {
    const e = this.getRenderValues(), t = r`<div
      id="content"
      ?inert=${e.showingOverlay || this.sca.controller.global.main.blockingAction}
    >
      ${this.sca.controller.global.main.show.has("TOS") || this.sca.controller.global.main.show.has("MissingShare") ? i : [
      this.#s(e),
      this.#a(e),
      this.#t(),
      this.sca.controller.global.statusUpdates.showStatusUpdateChip ? this.#i() : i
    ]}
    </div>`;
    return r`<div
      id="container"
      @bbevent=${async (a) => this.handleRoutedEvent(a)}
      @bbsnackbar=${(a) => {
      this.sca.controller.global.snackbars.snackbar(
        a.message,
        a.snackType,
        a.actions,
        a.persistent,
        a.snackbarId,
        a.replaceAll
      );
    }}
      @bbunsnackbar=${(a) => {
      this.sca.controller.global.snackbars.unsnackbar(a.snackbarId);
    }}
      @bbtoast=${(a) => {
      this.sca.controller.global.toasts.toast(
        a.message,
        a.toastType
      );
    }}
      @dragover=${(a) => {
      a.preventDefault();
    }}
      @drop=${(a) => {
      a.preventDefault(), this.attemptImportFromDrop(a);
    }}
    >
      ${[
      this.#p(e),
      t,
      this.sca.controller.global.main.show.has("MissingShare") ? this.#d() : i,
      this.sca.controller.global.main.show.has("TOS") ? this.#h() : i,
      this.sca.controller.global.main.show.has("BoardEditModal") ? this.#o() : i,
      this.sca.controller.global.main.show.has("SnackbarDetailsModal") ? this.renderSnackbarDetailsModal() : i,
      this.sca.controller.global.main.show.has("VideoModal") ? this.#r() : i,
      this.sca.controller.global.main.show.has("StatusUpdateModal") ? this.#l() : i,
      this.sca.controller.global.main.show.has("GlobalSettings") ? this.#n(e) : i,
      this.sca.controller.global.main.show.has("WarmWelcome") ? this.#c() : i,
      this.sca.controller.global.main.show.has("SignInModal") ? this.renderSignInModal() : i,
      this.renderTooltip(),
      this.#g(),
      this.renderSnackbar(),
      this.#b(),
      this.renderConsentRequests(),
      this.#e()
    ]}
    </div>`;
  }
  #e() {
    return i;
  }
  #t() {
    return this.sca.controller.global.main.loadState !== "Home" ? i : r`<bb-project-listing></bb-project-listing>`;
  }
  #a(e) {
    const t = k(this.tab?.graph ?? null), a = this.sca.controller.global.main.mode === "app" && this.sca.controller.global.main.loadState !== "Home";
    return r`<bb-app-controller
      class=${y({ active: a })}
      .graph=${this.tab?.graph ?? null}
      .graphIsEmpty=${t}
      .graphTopologyUpdateId=${this.graphTopologyUpdateId}
      .isMine=${this.tab?.graphIsMine ?? !1}
      .projectRun=${e.projectState?.run}
      .readOnly=${!0}
      .runtimeFlags=${this.sca.controller.global.flags}
      .settings=${this.settings}
      .showGDrive=${this.sca.services.signinAdapter.stateSignal?.status === "signedin"}
      .status=${e.tabStatus}
      .themeHash=${e.themeHash}
    >
    </bb-app-controller>`;
  }
  #s(e) {
    return r` <bb-canvas-controller
      ${h(this.canvasControllerRef)}
      ?inert=${e.showingOverlay}
      .canRun=${this.sca.controller.global.main.canRunMain}
      .editor=${this.sca.controller.editor.graph.editor}
      .graph=${this.tab?.graph ?? null}
      .graphIsMine=${this.tab?.graphIsMine ?? !1}
      .graphTopologyUpdateId=${this.graphTopologyUpdateId}
      .history=${this.sca.controller.editor.graph.editor?.history() ?? null}
      .mainGraphId=${this.tab?.mainGraphId}
      .projectState=${e.projectState}
      .readOnly=${this.tab?.readOnly ?? !0}
      .selectionState=${this.selectionState}
      .settings=${this.settings}
      .signedIn=${this.sca.services.signinAdapter.stateSignal?.status === "signedin"}
      .status=${e.tabStatus}
      .themeHash=${e.themeHash}
      @bbshowvideomodal=${() => {
      this.sca.controller.global.main.show.add("VideoModal");
    }}
      @bbeditorpositionchange=${(t) => {
      this.lastPointerPosition.x = t.x, this.lastPointerPosition.y = t.y;
    }}
      @bbiterateonprompt=${(t) => {
      const a = {
        type: "iterate_on_prompt",
        title: t.title,
        promptTemplate: t.promptTemplate,
        boardId: t.boardId,
        nodeId: t.nodeId,
        modelId: t.modelId
      };
      this.embedHandler?.sendToEmbedder(a);
    }}
    ></bb-canvas-controller>`;
  }
  #o() {
    return r`<bb-edit-board-modal
      .boardTitle=${this.tab?.graph.title ?? null}
      .boardDescription=${this.tab?.graph.description ?? null}
      @bbmodaldismissed=${() => {
      this.sca.controller.global.main.show.delete("BoardEditModal");
    }}
    ></bb-edit-board-modal>`;
  }
  #r() {
    return r`<bb-video-modal
      @bbmodaldismissed=${() => {
      this.sca.controller.global.main.show.delete("VideoModal");
    }}
    ></bb-video-modal>`;
  }
  #i() {
    const e = { "md-body-medium": !0 }, t = this.sca.controller.global.statusUpdates.updates.at(0);
    if (!t)
      return i;
    e[t.type] = !0;
    let a;
    switch (t.type) {
      case "info":
        a = r`info`;
        break;
      case "warning":
        a = r`warning`;
        break;
      case "urgent":
        a = r`error`;
        break;
      default:
        a = i;
        break;
    }
    return r`<div
      id="status-update-bar"
      class=${y(e)}
      aria-role="button"
      @click=${() => {
      this.sca.controller.global.main.show.add("StatusUpdateModal"), this.sca.controller.global.statusUpdates.showStatusUpdateChip = !1;
    }}
    >
      <div>
        <span class="g-icon round filled">${a}</span>
        <p>${t.text}</p>
      </div>
      <button
        class="close"
        @click=${(s) => {
      s.preventDefault(), s.stopImmediatePropagation(), this.sca.controller.global.statusUpdates.showStatusUpdateChip = !1;
    }}
      >
        <span class="g-icon round filled">close</span>
      </button>
    </div>`;
  }
  #l() {
    return r`<bb-status-update-modal
      .updates=${this.sca.controller.global.statusUpdates.updates}
      @bbmodaldismissed=${() => {
      this.sca.controller.global.main.show.delete("StatusUpdateModal"), this.sca.controller.global.statusUpdates.showStatusUpdateChip = !1;
    }}
    ></bb-status-update-modal>`;
  }
  #n(e) {
    return r`<bb-global-settings-modal
      .flags=${this.sca.controller.global.flags.flags()}
      .project=${e.projectState}
      .uiState=${this.sca.controller.global.main}
      .emailPrefsManager=${this.sca.services.emailPrefsManager}
      @bbmodaldismissed=${() => {
      this.sca.controller.global.main.show.delete("GlobalSettings");
    }}
    ></bb-global-settings-modal>`;
  }
  #c() {
    return r`<bb-warm-welcome-modal
      .emailPrefsManager=${this.sca.services.emailPrefsManager}
      @bbmodaldismissed=${() => {
      this.sca.controller.global.main.show.delete("WarmWelcome");
    }}
    ></bb-warm-welcome-modal>`;
  }
  #d() {
    return r`<dialog
      id="missing-share-dialog"
      @keydown=${(e) => {
      e.key === "Escape" && e.preventDefault();
    }}
      ${h((e) => {
      requestAnimationFrame(() => {
        if (e && this.sca.controller.global.main.show.has("MissingShare") && e.isConnected) {
          const a = e;
          a.open || a.showModal();
        }
      });
    })}
    >
      <form method="dialog">
        <h1>Oops, something went wrong</h1>
        <p class="share-content">
          It has not been possible to open this app. Please ask the author to
          check that the app was published successfully and then try again.
        </p>
      </form>
    </dialog>`;
  }
  #h() {
    const e = c.from("TOS_TITLE");
    let t = "", a = 0;
    return (!this.tosStatus || !this.tosStatus.canAccess) && (t = this.tosStatus?.termsOfService?.terms ?? "Unable to retrieve TOS", a = this.tosStatus?.termsOfService?.version ?? 0), r`<dialog
      id="tos-dialog"
      @keydown=${(s) => {
      s.key === "Escape" && s.preventDefault();
    }}
      ${h((s) => {
      requestAnimationFrame(() => {
        if (s && this.sca.controller.global.main.show.has("TOS") && s.isConnected) {
          const n = s;
          n.open || n.showModal();
        }
      });
    })}
    >
      <form method="dialog">
        <h1>${e}</h1>
        <div class="tos-content">${x(t)}</div>
        <div class="controls">
          <button
            @click=${async (s) => {
      s.target instanceof HTMLButtonElement && (s.target.disabled = !0, await this.sca.services.apiClient.acceptTos(a, !0), this.tosStatus = await this.sca.services.apiClient.checkTos());
    }}
          >
            Continue
          </button>
        </div>
      </form>
    </dialog>`;
  }
  #b() {
    return r`
      <bb-feedback-panel ${h(this.feedbackPanelRef)}></bb-feedback-panel>
    `;
  }
  #g() {
    if (T(() => this.sca.controller.global.toasts.toasts))
      return i;
    const e = this.sca.controller.global.toasts.toasts.size;
    return r`${E(
      this.sca.controller.global.toasts.toasts,
      ([t]) => t,
      ([t, a], s) => {
        const l = e - s - 1;
        return r`<bb-toast
          .toastId=${t}
          .offset=${l}
          .message=${a.message}
          .type=${a.type}
          .closing=${a.state === "closing"}
        ></bb-toast>`;
      }
    )}`;
  }
  #p(e) {
    return r`<bb-ve-header
      ?inert=${e.showingOverlay || this.sca.controller.global.main.blockingAction}
      .signinAdapter=${this.sca.services.signinAdapter}
      .hasActiveTab=${this.tab !== null}
      .tabTitle=${this.tab?.graph?.title ?? null}
      .url=${this.tab?.graph?.url ?? null}
      .loadState=${this.sca.controller.global.main.loadState}
      .canSave=${e.canSave}
      .isMine=${this.tab?.graph.url ? this.sca.services.googleDriveBoardServer.isMine(
      new URL(this.tab.graph.url)
    ) : !1}
      .saveStatus=${e.saveStatus}
      .mode=${this.sca.controller.global.main.mode}
      .graphIsEmpty=${k(this.tab?.graph ?? null)}
      @bbsignout=${async () => {
      await this.sca.services.signinAdapter.signOut(), this.sca.services.actionTracker.signOutSuccess(), window.location.href = p({
        page: "landing",
        redirect: {
          page: "home",
          guestPrefixed: !0
        },
        guestPrefixed: !0
      });
    }}
      @bbclose=${async () => {
      if (!this.tab)
        return;
      this.embedHandler?.sendToEmbedder({
        type: "back_clicked"
      });
      const t = {
        page: "home",
        dev: _.dev,
        guestPrefixed: !0
      };
      await this.sca.services.signinAdapter.state === "signedin" ? this.sca.controller.router.go(t) : window.location.assign(
        p({
          page: "landing",
          dev: _.dev,
          redirect: t,
          guestPrefixed: !0
        })
      );
    }}
      @bbsubscribercreditrefresh=${async () => {
      try {
        this.sca.controller.global.main.subscriptionCredits = -1;
        const t = await this.sca.services.apiClient.getG1Credits();
        this.sca.controller.global.main.subscriptionCredits = t.remaining_credits ?? 0;
      } catch (t) {
        this.sca.controller.global.main.subscriptionCredits = -2, console.warn(t);
      }
    }}
      @bbsharerequested=${() => {
      this.canvasControllerRef.value && this.canvasControllerRef.value.openSharePanel();
    }}
      @change=${async (t) => {
      const [a] = t.composedPath();
      if (a instanceof P)
        switch (a.value) {
          case "edit-title-and-description": {
            if (!this.tab)
              return;
            this.sca.controller.global.main.show.add("BoardEditModal");
            break;
          }
          case "delete": {
            if (!this.tab?.graph || !this.tab.graph.url)
              return;
            this.invokeDeleteEventRouteWith(this.tab.graph.url);
            break;
          }
          case "duplicate": {
            if (!this.tab?.graph || !this.tab.graph.url)
              return;
            this.sca.services.actionTracker.remixApp(
              this.tab.graph.url,
              "editor"
            ), this.invokeRemixEventRouteWith(this.tab.graph.url, {
              start: c.from("STATUS_GENERIC_WORKING"),
              end: c.from("STATUS_PROJECT_CREATED"),
              error: c.from("ERROR_GENERIC")
            });
            break;
          }
          case "feedback": {
            this.sca.controller.global.feedback.open(this.globalConfig);
            break;
          }
          case "chat": {
            window.open("https://discord.gg/googlelabs", "_blank");
            break;
          }
          case "documentation": {
            window.open("https://developers.google.com/opal", "_blank");
            break;
          }
          case "demo-video": {
            this.sca.controller.global.main.show.add("VideoModal");
            break;
          }
          case "history": {
            if (!this.canvasControllerRef.value)
              return;
            this.canvasControllerRef.value.sideNavItem = "edit-history";
            break;
          }
          case "show-global-settings": {
            this.sca.controller.global.main.show.add("GlobalSettings");
            break;
          }
          case "status-update": {
            this.sca.controller.global.main.show.add("StatusUpdateModal"), this.sca.controller.global.statusUpdates.showStatusUpdateChip = !1;
            break;
          }
          case "copy-board-contents": {
            if (!this.tab)
              return;
            await navigator.clipboard.writeText(
              JSON.stringify(this.tab.graph, null, 2)
            ), this.sca.controller.global.toasts.toast(
              c.from("STATUS_PROJECT_CONTENTS_COPIED"),
              D.INFORMATION
            );
            break;
          }
          case "share": {
            this.canvasControllerRef.value?.openSharePanel();
            break;
          }
          case "remix": {
            if (!this.tab?.graph.url)
              return;
            this.sca.services.actionTracker.remixApp(
              this.tab.graph.url,
              "editor"
            ), this.invokeRemixEventRouteWith(this.tab.graph.url, {
              start: c.from("STATUS_REMIXING_PROJECT"),
              end: c.from("STATUS_PROJECT_CREATED"),
              error: c.from("ERROR_UNABLE_TO_CREATE_PROJECT")
            });
            break;
          }
          default: {
            console.log("Action:", a.value);
            break;
          }
        }
    }}
    >
    </bb-ve-header>`;
  }
}
f = z(U);
u = Q(f, 0, "Main", R, u);
X(f, 1, u);
export {
  u as Main
};
