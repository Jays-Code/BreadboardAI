import { k as a } from "./logger-BR29-LuY.js";
class u {
  constructor(t) {
    this.backend = t;
  }
  async query(t, e) {
    const s = this.backend.query?.(t, e);
    return s || a('Method "query" not implemented');
  }
  async read(t, e, s) {
    const r = this.backend.read?.(t, e, s);
    return r || a('Method "read" not implemented');
  }
  async write(t, e, s) {
    const r = this.backend.write?.(t, e, s);
    return r || a('Method "write" not implemented');
  }
  async append(t, e, s) {
    const r = this.backend.append?.(t, e, s);
    return r || a('Method "append" not implemented');
  }
  async delete(t, e, s) {
    const r = this.backend.delete?.(t, e, s);
    return r || a('Method "delete" not implemented');
  }
  async copy(t, e, s) {
    const r = this.backend.copy?.(t, e, s);
    return r || a('Method "copy" not implemented');
  }
  async move(t, e, s) {
    const r = this.backend.move?.(t, e, s);
    return r || a('Method "move" not implemented');
  }
  async onEndRun() {
    return this.backend.onEndRun?.();
  }
}
const p = "ga_stats";
class _ {
  constructor(t) {
    this.host = t;
  }
  // Property tracking
  trackProperty(t) {
    d((e) => {
      const { update: s, props: r } = t(e);
      let n = { ...e, ...s };
      return r !== null && (this.host.trackProperties(r), n = { ...n, props: r }), n;
    });
  }
  incrementVisitedPages() {
    this.trackProperty(({ props: t, visitedPages: e }) => {
      let s = null;
      return t.user_type === "one_time" && (e === 0 ? s = { user_type: "one_time" } : s = { user_type: "visitor" }), { update: { visitedPages: e + 1 }, props: s };
    });
  }
  updateSignedInStatus(t) {
    this.trackProperty(({ props: e, visitedPages: s }) => {
      let r = null;
      if (t) {
        const { user_type: o } = e;
        o !== "signed_in" && o !== "can_access" && o !== "engaged" && (r = { user_type: "signed_in" });
      } else
        s < 2 ? r = { user_type: "one_time" } : r = { user_type: "visitor" };
      return { update: { signedIn: t }, props: r };
    });
  }
  updateCanAccessStatus(t) {
    this.trackProperty(
      ({
        props: e,
        createdOpals: s,
        startedOpals: r
      }) => {
        let n = null;
        if (t) {
          const { user_type: c } = e;
          c !== "can_access" && c !== "engaged" && (r > 0 || s > 0 ? n = { user_type: "engaged" } : n = { user_type: "can_access" });
        } else
          n = { user_type: "signed_in" };
        return { update: { canAccess: t }, props: n };
      }
    );
  }
  incrementStartedOpals() {
    this.trackProperty(({ props: t, startedOpals: e }) => {
      let s = null;
      return e++, t.user_type === "can_access" && e > 0 && (s = { user_type: "engaged" }), { update: { startedOpals: e }, props: s };
    });
  }
  incrementCreatedOpals() {
    this.trackProperty(({ props: t, createdOpals: e }) => {
      let s = null;
      return e++, t.user_type === "can_access" && e > 0 && (s = { user_type: "engaged" }), { update: { createdOpals: e }, props: s };
    });
  }
  // Event tracking
  load(t) {
    this.host.trackAction(`app_load_${t}`), this.incrementVisitedPages();
  }
  openApp(t, e) {
    this.host.trackAction("app_open", { url: t, source: e }), this.host.trackAction("app_engage", { url: t }), e === "gallery" ? this.host.trackAction("app_open_gallery", { url: t }) : e === "user" && this.host.trackAction("app_open_user", { url: t });
  }
  remixApp(t, e) {
    switch (this.host.trackAction("app_remix", { url: t, source: e }), this.host.trackAction("app_engage", { url: t }), this.incrementCreatedOpals(), e) {
      case "gallery":
        this.host.trackAction("app_remix_gallery", { url: t });
        break;
      case "user":
        this.host.trackAction("app_remix_user", { url: t });
        break;
      case "editor":
        this.host.trackAction("app_remix_editor", { url: t });
        break;
    }
  }
  createNew() {
    this.host.trackAction("app_create_new"), this.host.trackAction("app_engage", { url: "new" }), this.incrementCreatedOpals();
  }
  flowGenCreate() {
    this.host.trackAction("app_flowgen_create"), this.host.trackAction("app_engage", { url: "new_flowgen" }), this.incrementCreatedOpals();
  }
  flowGenEdit(t) {
    t ? (this.host.trackAction("app_flowgen_edit", { url: t }), this.host.trackAction("app_engage", { url: t })) : this.flowGenCreate();
  }
  runApp(t, e) {
    switch (this.host.trackAction("app_run", { url: t, source: e }), this.host.trackAction("app_engage", { url: t }), this.incrementStartedOpals(), e) {
      case "app_preview":
        this.host.trackAction("app_run_preview", { url: t });
        break;
      case "app_view":
        this.host.trackAction("app_run_view", { url: t });
        break;
      case "console":
        this.host.trackAction("app_run_console", { url: t });
        break;
    }
  }
  publishApp(t) {
    this.host.trackAction("app_publish", { url: t }), this.host.trackAction("app_engage", { url: t });
  }
  signOutSuccess() {
    this.host.trackAction("sign_out_success"), this.updateSignedInStatus(!1);
  }
  signInSuccess() {
    this.host.trackAction("sign_in_success"), this.updateSignedInStatus(!0);
  }
  errorUnknown() {
    this.host.trackAction("error_unknown");
  }
  errorConfig() {
    this.host.trackAction("error_config");
  }
  errorRecitation() {
    this.host.trackAction("error_recitation");
  }
  errorCapacity(t) {
    this.host.trackAction("error_capacity", { medium: t });
  }
  errorSafety() {
    this.host.trackAction("error_safety");
  }
  addNewStep(t) {
    this.host.trackAction(
      `add_step_${t?.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, "_") || "unknown"}`
    );
  }
  editStep(t) {
    this.host.trackAction(`edit_step_${t}`);
  }
  shareResults(t) {
    this.host.trackAction(`share_results_${t}`);
  }
}
function d(i) {
  let t;
  const e = globalThis.localStorage.getItem(
    p
  );
  if (!e)
    t = h();
  else
    try {
      t = JSON.parse(e);
    } catch {
      t = h();
    }
  const s = i(t), r = JSON.stringify(s);
  globalThis.localStorage.setItem(
    p,
    r
  );
}
function h() {
  return {
    visitedPages: 0,
    signedIn: !1,
    canAccess: !1,
    startedOpals: 0,
    createdOpals: 0,
    props: { user_type: "one_time" }
  };
}
function k(i) {
  return new _(i);
}
function g() {
  return new u({
    async write(i, t, e) {
      const s = t.split("/").at(-1);
      globalThis.gtag?.("event", `step_run_${s}`);
    }
  });
}
export {
  g as a,
  k as c
};
