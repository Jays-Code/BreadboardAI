class r {
  constructor(t, s, n = !1) {
    this.name = t, this.values = s, this.warnIfMissing = n;
  }
  from(t) {
    return typeof this.values[t] == "string" ? this.values[t] : typeof this.values[t] == "object" && this.values[t] !== null ? this.values[t].str : (this.warnIfMissing && console.warn(
      `Missing language pack key "${t}" from section ${this.name}`
    ), t.toUpperCase());
  }
}
let e;
async function o(i) {
  e = i;
}
function a(i) {
  return e || (e = {
    ActivityLog: {},
    AssetOrganizer: {},
    AppPreview: {},
    AudioHandler: {},
    CommandPalette: {},
    ComponentSelector: {},
    Editor: {},
    FocusEditor: {},
    Global: {},
    KitSelector: {},
    ProjectListing: {},
    UIController: {},
    WorkspaceOutline: {}
  }), new r(i, e[i]);
}
export {
  a as forSection,
  o as initFrom
};
