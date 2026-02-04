import { A as Yt, R as Qt, t as Xt, B as Zt, c as er, n as tr, C as rr, E as or, F as ar, H as nr, T as $, J as sr, K as ir, L as lr, x as cr, G as dr, S as V, M as vt, e as hr, u as gr, k as ur, N as pr, O as br, p as R, l as fr, P as mr, g as vr, Q as wr, j as yr, q as kr, h as Sr, s as _r } from "./project-DMClisrJ.js";
import { n as xr, s as Cr, e as Tr, o as Er } from "./opal-shell-guest-CavlCYO8.js";
import { p as M, C as Rr, s as Ar, l as K, n as Ir, g as zr, t as Ur, u as Or, i as Pr, m as Mr, O as Dr, B as D, x as Nr, v as Gr, y as Hr, w as Wr, z as $r } from "./logger-BR29-LuY.js";
import "./connection-broker-CilcgYmS.js";
import { forSection as Lr } from "./helper-EFXUwdnr.js";
import { i as jr, r as Ee, h as N, n as te, b as G, A as Br, a as Fr } from "./map-z4l6LcMf.js";
import { c as re, a as Re, M as Jr, i as qr, b as Vr, d as Kr, e as v, C as Yr, g as wt, s as Qr } from "./sca-BIsLGxhn.js";
const Xr = xr("bb-settings-helper");
class yt {
  constructor(e) {
    this.spec = e;
  }
  async apply(e) {
    const r = /* @__PURE__ */ new Map();
    for (const n of this.spec)
      if (n.type === "removeedge") {
        const { graphId: s, edge: i } = n;
        if (!i.in?.startsWith("p-z-")) continue;
        a(s).edges.set(i.from, i.to);
      } else if (n.type === "removenode") {
        const { graphId: s, id: i } = n;
        a(s).nodes.add(i);
      }
    const o = await e.apply(this.spec, "First pass: Edits");
    if (!o) return o;
    for (const [n, s] of r.entries()) {
      const i = await new Yt(
        n,
        (l, c) => {
          const { path: h, type: g, instance: w } = l;
          return s.nodes.has(h) || c === s.edges.get(h) ? { ...l, invalid: !0 } : g === "tool" && h === Qt && w === s.edges.get(c) ? { ...l, invalid: !0 } : null;
        },
        'Marking "@" in port as invalid',
        /* nodeTransformer */
        void 0,
        /* skippedNodes */
        [...s.nodes]
      ).apply(e);
      if (!i.success) return i;
    }
    return { success: !0 };
    function a(n) {
      let s = r.get(n);
      return s || (s = { nodes: /* @__PURE__ */ new Set(), edges: /* @__PURE__ */ new Map() }, r.set(n, s)), s;
    }
  }
}
const Zr = [
  Xt,
  Zt,
  er,
  tr,
  jr`
    * {
      box-sizing: border-box;
    }

    :host {
      --header-height: var(--bb-grid-size-14);
      flex: 1 0 auto;
      display: flex;
    }

    #container {
      display: grid;
      flex: 1 1 auto;
      background-color: var(--light-dark-n-100);
      grid-template-rows: var(--header-height) auto;
    }

    bb-ve-header {
      z-index: 150;
      display: block;
    }

    #status-update-bar {
      z-index: 180;
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100svw;
      overflow: hidden;
      top: 0;
      left: 0;
      padding: var(--bb-grid-size-3) var(--bb-grid-size-6);
      border: none;
      user-select: none;
      opacity: 0;
      animation: fadeIn 0.4s cubic-bezier(0, 0, 0.3, 1) 1 forwards;

      > div {
        display: flex;
        align-items: center;
        flex: 1;
        padding-right: var(--bb-grid-size-10);

        & p {
          display: inline;
          margin: 0;

          &::after {
            content: " More information";
            cursor: pointer;
            font-weight: 500;
          }
        }

        & > .g-icon {
          flex: 0 0 auto;
          width: 20px;
          height: 20px;
          margin-right: var(--bb-grid-size-2);
        }
      }

      &.urgent {
        background: var(--light-dark-e-90);
        color: var(--light-dark-e-40);
      }

      &.warning {
        background: var(--ui-warning-background-color);
        color: var(--ui-warning-text-color);
      }

      & .close {
        padding: 0;
        margin: 0;
        background: none;
        border: none;
        cursor: pointer;
      }
    }

    @media (min-width: 620px) {
      :host {
        --header-height: var(--bb-grid-size-14);
      }

      #container {
        grid-template-rows: var(--header-height) auto;
      }

      bb-ve-header {
        display: block;
      }

      #status-update-bar {
        top: var(--bb-grid-size-14);
      }
    }

    bb-toast {
      z-index: 2000;
    }

    .close-board {
      font-size: 0;
      width: 24px;
      height: 24px;
      background: var(--bb-icon-close) center center no-repeat;
      background-size: 16px 16px;
      border: 2px solid transparent;
      opacity: 0.6;
      transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1);
      border-radius: 50%;
    }

    .close-board:not([disabled]):hover {
      transition-duration: 0.1s;
      opacity: 1;
      background-color: var(--light-dark-n-90);
      border: 2px solid var(--light-dark-n-90);
    }

    #tab-edit {
      margin: 0 var(--bb-grid-size-4);
      width: var(--bb-grid-size-5);
      height: var(--bb-grid-size-5);
      font-size: 0;
      cursor: pointer;
      background: transparent var(--bb-icon-edit) center center / 20px 20px
        no-repeat;
      opacity: 0.6;
      border: none;
      transition: opacity 0.2s cubic-bezier(0, 0, 0.3, 1);
    }

    #tab-edit:focus,
    #tab-edit:hover {
      opacity: 1;
    }

    #new-board {
      font-size: var(--bb-text-nano);
    }

    #undo,
    #redo,
    #save-board,
    #toggle-preview,
    #toggle-settings,
    #toggle-overflow-menu {
      color: var(--light-dark-n-40);
      padding: 0 16px 0 42px;
      font-size: var(--bb-text-medium);
      margin: 0 var(--bb-grid-size-4) 0 0;
      cursor: pointer;
      background: 12px center var(--bb-icon-download);
      background-repeat: no-repeat;
      height: var(--bb-grid-size-7);
      display: flex;
      align-items: center;
      text-decoration: none;
      border-radius: 20px;
      border: none;
      flex: 0 0 auto;
    }

    #toggle-board-item {
      height: var(--bb-grid-size-7);
      border: 1px solid var(--light-dark-n-90);
      padding: 0 var(--bb-grid-size-3) 0 var(--bb-grid-size-8);
      font: 400 var(--bb-body-small) / var(--bb-body-line-height-small)
        var(--bb-font-family);
      border-radius: var(--bb-grid-size-16);
      margin: 0 var(--bb-grid-size-2) 0 0;
      background: var(--light-dark-n-100);
      cursor: pointer;

      &.flow {
        background: var(--bb-icon-flowchart) 8px center / 20px 20px no-repeat;
      }

      &.step {
        background: var(--bb-icon-step) 8px center / 20px 20px no-repeat;
      }

      &.code {
        background: var(--bb-icon-code) 8px center / 20px 20px no-repeat;
      }
    }

    #undo:not([disabled]):hover,
    #redo:not([disabled]):hover,
    #undo:not([disabled]):focus,
    #redo:not([disabled]):focus,
    #save-board:not([disabled]):hover,
    #toggle-preview:not([disabled]):hover,
    #toggle-settings:not([disabled]):hover,
    #toggle-overflow-menu:not([disabled]):hover,
    #save-board:not([disabled]):focus,
    #toggle-preview:not([disabled]):focus,
    #toggle-settings:not([disabled]):focus,
    #toggle-overflow-menu:not([disabled]):focus {
      background-color: rgba(0, 0, 0, 0.1);
    }

    #save-board {
      background: 12px center var(--bb-icon-save-inverted);
      background-repeat: no-repeat;
    }

    #toggle-preview {
      background: 12px center var(--bb-icon-preview);
      background-repeat: no-repeat;
    }

    #undo,
    #redo,
    #toggle-overflow-menu {
      padding: 8px;
      font-size: 0;
      margin-right: 0;
      background: center center var(--bb-icon-more-vert);
      background-repeat: no-repeat;
      width: 32px;
    }

    #undo {
      background-image: var(--bb-icon-undo);
    }

    #redo {
      background-image: var(--bb-icon-redo);
    }

    #undo[disabled],
    #redo[disabled] {
      opacity: 0.5;
    }

    #toggle-preview.active {
      background-color: var(--light-dark-p-20);
    }

    #toggle-settings {
      padding: var(--bb-grid-size-2);
      width: 32px;
      margin-right: 0;
      background: var(--bb-icon-settings) center center / 20px 20px no-repeat;
      font-size: 0;
    }

    #toggle-settings.active {
      background-color: var(--light-dark-n-98);
    }

    #new-board {
      font-size: var(--bb-text-small);
      text-decoration: underline;
    }

    #new-board:active {
      color: rgb(90, 64, 119);
    }

    #save-board[disabled],
    #get-log[disabled],
    #get-board[disabled],
    #toggle-preview[disabled],
    #save-board[disabled]:hover,
    #get-log[disabled]:hover,
    #get-board[disabled]:hover,
    #toggle-preview[disabled]:hover {
      opacity: 0.5;
      background-color: rgba(0, 0, 0, 0);
      pointer-events: none;
      cursor: auto;
    }

    bb-board-list {
      grid-column: 1 / 3;
    }

    header {
      background: var(--light-dark-n-100);
      border-bottom: 1px solid var(--light-dark-n-90);
      display: block;
      color: var(--light-dark-n-40);
      z-index: 1;
      width: 100%;
      overflow: hidden;
      height: 100%;
    }

    #missing-share-dialog,
    #tos-dialog {
      max-width: 480px;
      border-radius: var(--bb-grid-size-4);
      border: none;
      padding: 0;
      font: 400 var(--bb-body-small) / var(--bb-body-line-height-small)
        var(--bb-font-family);

      form {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        max-width: 90svw;
        margin: auto;
        font: 400 var(--bb-body-small) / var(--bb-body-line-height-small)
          var(--bb-font-family);
      }

      h1 {
        display: flex;
        align-items: center;
        margin: 0;
        font: 400 var(--bb-title-small) / var(--bb-title-line-height-small)
          var(--bb-font-family);
        height: var(--bb-grid-size-14);
        border-bottom: 1px solid var(--light-dark-n-98);
        padding: 0 var(--bb-grid-size-6);
      }

      .share-content,
      .tos-content {
        flex-grow: 1;
        overflow-y: auto;
        max-height: 440px;
        padding: var(--bb-grid-size-4) var(--bb-grid-size-6);
        font: 400 var(--bb-body-large) / var(--bb-body-line-height-large)
          var(--bb-font-family);
        outline: none;
      }

      .controls {
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid var(--light-dark-n-98);
        padding: var(--bb-grid-size-6);
      }

      button {
        padding: var(--bb-grid-size-2);
        border: none;
        border-radius: var(--bb-grid-size);
        background-color: var(--light-dark-p-40);
        color: white;

        &[disabled] {
          opacity: 0.5;
        }

        &:not([disabled]) {
          cursor: pointer;
        }
      }
    }

    #header-bar {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0 var(--bb-grid-size-2) 0 0;

      & #tab-info {
        flex: 1;
        display: flex;
        align-items: center;
        height: 100%;

        & #logo {
          color: #404041;
          font-family: var(--bb-font-family);
          font-size: 20px;
          font-weight: 500;
          border: none;
          width: 24px;
          height: 24px;
          margin: 0 var(--bb-grid-size-4);
          background: var(--bb-logo) left center / 24px 24px no-repeat;
          padding: 0;

          & > .product-name {
            padding-left: 40px;
          }

          &:not([disabled]) {
            cursor: pointer;
          }
        }
      }

      & #tab-toggle {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        & button {
          display: flex;
          height: var(--bb-grid-size-7);
          align-items: center;
          font-size: 0;
          padding: 0;
          margin: 0;
          background: var(--light-dark-n-98);
          border: 1px solid var(--light-dark-n-90);
          border-radius: var(--bb-grid-size-16);

          &::before,
          &::after {
            display: flex;
            align-items: center;
            border-radius: var(--bb-grid-size-16);
            padding: 0 var(--bb-grid-size-4) 0 var(--bb-grid-size-9);
            text-align: left;
            flex: 1;
            font: 400 var(--bb-body-small) / var(--bb-body-line-height-small)
              var(--bb-font-family);
            height: calc(var(--bb-grid-size-7) - 2px);
          }

          &::before {
            content: "Create";
            background: var(--bb-icon-flowchart) 10px center / 20px 20px
              no-repeat;
          }

          &::after {
            content: "App";
            background: var(--bb-icon-phone) 10px center / 20px 20px no-repeat;
          }

          &.create::before {
            background: var(--light-dark-p-50) var(--bb-icon-flowchart-inverted)
              10px center / 20px 20px no-repeat;
            color: var(--light-dark-n-100);
          }

          &.deploy::after {
            background: var(--light-dark-p-50) var(--bb-icon-phone-inverted)
              10px center / 20px 20px no-repeat;
            color: var(--light-dark-n-100);
          }
        }
      }

      & #tab-controls {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        & #toggle-user-menu {
          height: var(--bb-grid-size-7);
          padding: 0;
          margin: 0 var(--bb-grid-size-2) 0 var(--bb-grid-size-2);
          background: none;
          border: none;
          cursor: pointer;

          & #user-pic {
            display: block;
            width: var(--bb-grid-size-7);
            height: var(--bb-grid-size-7);
            border-radius: 50%;
            pointer-events: none;
          }
        }
      }

      & bb-homepage-search-button {
        margin-right: var(--bb-grid-size-8);
      }
    }

    #header-bar[data-active="true"] h1::after {
      content: "";
      width: 48px;
      height: 1px;
      background: var(--light-dark-p-30);
      bottom: -1px;
      left: 0;
      position: absolute;
    }

    #header-bar #tab-container {
      flex-grow: 1;
      display: flex;
      align-items: flex-end;
      margin: 0;
      height: 100%;
      overflow: hidden;
    }

    #tab-container .tab {
      font: 400 var(--bb-label-medium) / var(--bb-label-line-height-medium)
        var(--bb-font-family);
      background: linear-gradient(
        var(--light-dark-n-100) 86%,
        var(--light-dark-n-98)
      );
      color: var(--light-dark-n-20);
      margin: 0;
      height: calc(100% - var(--bb-grid-size) * 2);
      border-radius: var(--bb-grid-size-2) var(--bb-grid-size-2) 0 0;
      padding: var(--bb-grid-size);
      display: grid;
      grid-template-columns: 1fr 24px 32px;
      align-items: center;
      justify-items: center;
      user-select: none;
      margin-right: var(--bb-grid-size-2);
      opacity: 0.7;
      transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1);
    }

    .tab-title {
      font: 400 var(--bb-title-medium) / var(--bb-title-line-height-medium)
        var(--bb-font-family);
      padding: var(--bb-grid-size) var(--bb-grid-size);
      border: 1px solid transparent;
      border-radius: var(--bb-grid-size);
      max-width: 320px;
      min-width: 10%;
      field-sizing: content;
      color: var(--light-dark-n-20);
      margin-right: var(--bb-grid-size-2);
      outline: none;
      background: transparent;

      &:hover {
        border: 1px solid var(--light-dark-n-98);
      }

      &:focus {
        border: 1px solid var(--light-dark-n-40);
      }
    }

    .save-status {
      display: none;
      align-items: center;
      height: var(--bb-grid-size-10);
      background: transparent;
      padding-left: var(--bb-grid-size-5);
      font: 400 var(--bb-body-x-small) / var(--bb-body-line-height-x-small)
        var(--bb-font-family);
      color: var(--light-dark-n-50);
    }

    .save-status.can-save,
    .save-status.readonly {
      display: flex;
    }

    .save-status.saving {
      background: transparent url(/images/progress-ui.svg) left center / 16px
        16px no-repeat;
    }

    .save-status.unsaved {
      background: transparent var(--bb-icon-pending) left center / 12px 12px
        no-repeat;
    }

    .save-status.saved {
      background: transparent var(--bb-icon-saved-local) left center / 16px 16px
        no-repeat;
    }

    .save-status.error {
      background: transparent var(--bb-icon-warning) left center / 16px 16px
        no-repeat;
    }

    .save-status.saved.remote {
      background: transparent var(--bb-icon-saved-remote) left center / 16px
        16px no-repeat;
    }

    .save-status.readonly {
      background: transparent var(--bb-icon-saved-readonly) left center / 16px
        16px no-repeat;
    }

    #content {
      background: var(--light-dark-n-95);
      max-height: calc(100svh - var(--header-height));
      display: flex;
      flex-direction: column;
      position: relative;
    }

    iframe {
      grid-row: 1 / 3;
      grid-column: 1 / 3;
      margin: 0;
      border: none;
      width: 100%;
      height: 100%;
      display: block;
    }

    bb-overlay iframe {
      width: 80vw;
      height: 80vh;
      border-radius: 8px;
    }

    bb-board-activity-overlay {
      display: none;
    }

    :host([showboardactivityoverlay="true"]) bb-board-activity-overlay {
      display: block;
    }

    #user-overflow,
    #board-overflow,
    #board-items-overflow,
    bb-new-workspace-item-overlay {
      position: fixed;
      right: auto;
      bottom: auto;
      z-index: 20;
    }

    bb-app-controller {
      position: absolute;
      height: 100%;
      width: 100svw;
      left: 0;
      top: 0;
      overflow: hidden;
      display: none;

      &.active {
        z-index: 100;
        display: block;
      }
    }

    bb-project-listing {
      position: absolute;
      height: 100%;
      width: 100svw;
      left: 0;
      top: 0;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    bb-focus-editor {
      z-index: 10;
    }

    bb-settings-edit-overlay {
      position: fixed;
    }

    #remix {
      height: var(--bb-grid-size-7);
      padding: 0 var(--bb-grid-size-4) 0 var(--bb-grid-size-9);
      border-radius: var(--bb-grid-size-16);
      margin: 0 var(--bb-grid-size-2) 0 0;
      background: var(--light-dark-n-100);
      cursor: pointer;

      color: #004a77;
      font: 500 var(--bb-title-small) / var(--bb-title-line-height-small)
        var(--bb-font-family);
      display: flex;
      align-items: center;
      border-radius: 100px;
      border: none;
      transition: background 0.2s cubic-bezier(0, 0, 0.3, 1);
      cursor: pointer;

      background: var(--bb-icon-remix) var(--bb-grid-size-3) center / 18px 18px
        no-repeat #c2e7ff;

      &:hover,
      &:focus {
        background-color: #96d6ff;
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
], eo = {
  bubbles: !0,
  cancelable: !0,
  composed: !0
};
class Q extends Event {
  constructor(e, r, o) {
    super(Q.eventName, { ...eo }), this.selectionChangeId = e, this.selectionState = r, this.moveToSelection = o;
  }
  static {
    this.eventName = "runtimeselectionchange";
  }
}
class to extends EventTarget {
  #r = /* @__PURE__ */ new Map();
  #o(e) {
    let r = this.#r.get(e);
    return r || (r = re(), this.#r.set(e, r)), r;
  }
  #s(e, r) {
    let o = e.graphs.get(r);
    return o || (o = Re(), e.graphs.set(r, o)), o;
  }
  #a(e) {
    this.#r.set(e, re());
  }
  #e(e, r, o = !1) {
    const a = this.#o(e);
    this.dispatchEvent(
      new Q(r, a, o)
    );
  }
  #i(e, r, o) {
    const a = this.#o(e);
    return this.#s(
      a,
      r
    )[o];
  }
  #l(e, r) {
    this.#o(e).modules.add(r);
  }
  #c(e, r) {
    this.#o(e).modules.delete(r);
  }
  #t(e, r, o, a) {
    this.#i(e, r, o).add(a);
  }
  #n(e, r, o, a) {
    this.#i(e, r, o).delete(a);
  }
  generateId() {
    return crypto.randomUUID();
  }
  addNode(e, r, o, a) {
    this.#t(e, o, "nodes", a), this.#e(e, r);
  }
  removeNode(e, r, o, a) {
    this.#n(e, o, "nodes", a), this.#e(e, r);
  }
  addComment(e, r, o, a) {
    this.#t(e, o, "comments", a), this.#e(e, r);
  }
  removeComment(e, r, o, a) {
    this.#n(e, o, "comments", a), this.#e(e, r);
  }
  addEdge(e, r, o, a) {
    this.#t(e, o, "edges", a), this.#e(e, r);
  }
  removeEdge(e, r, o, a) {
    this.#n(e, o, "edges", a), this.#e(e, r);
  }
  addModule(e, r, o) {
    this.#l(e, o), this.#e(e, r);
  }
  removeModule(e, r, o) {
    this.#c(e, o), this.#e(e, r);
  }
  processSelections(e, r, o, a = !0, n = !1) {
    if (o === null) {
      this.#a(e), this.#e(e, r);
      return;
    }
    a && this.#a(e);
    for (const [s, i] of o.graphs) {
      const l = this.#o(e);
      this.#s(l, s);
      for (const c of i.nodes)
        this.#t(e, s, "nodes", c);
      for (const c of i.comments)
        this.#t(e, s, "comments", c);
      for (const c of i.edges)
        this.#t(e, s, "edges", c);
      for (const c of i.references)
        this.#t(e, s, "references", c);
      for (const c of i.assets)
        this.#t(e, s, "assets", c);
      for (const c of i.assetEdges)
        this.#t(e, s, "assetEdges", c);
    }
    for (const s of o.modules)
      this.#l(e, s);
    this.#e(e, r, n);
  }
  selectNode(e, r, o, a) {
    this.#a(e), this.#t(e, o, "nodes", a), this.#e(e, r);
  }
  selectNodes(e, r, o, a) {
    this.#a(e);
    for (const n of a)
      this.#t(e, o, "nodes", n);
    this.#e(e, r);
  }
  selectAll(e, r, o) {
    if (!e)
      return;
    const a = re(), n = (s) => {
      const i = Re();
      for (const l of s.nodes()) {
        i.nodes.add(l.descriptor.id);
        const c = l.currentPorts().inputs.ports.filter(
          (h) => qr(h.schema) || Vr(h.schema)
        );
        for (const h of c)
          if (Array.isArray(h.value))
            for (let g = 0; g < h.value.length; g++)
              i.references.add(
                `${l.descriptor.id}|${h.name}|${g}`
              );
          else
            i.references.add(`${l.descriptor.id}|${h.name}|0`);
      }
      for (const l of s.edges())
        i.edges.add(Kr(l));
      for (const l of s.metadata()?.comments ?? [])
        i.comments.add(l.id);
      for (const l of (s.assets() ?? /* @__PURE__ */ new Map()).keys())
        i.comments.add(l);
      return i;
    };
    a.graphs.set(Jr, n(o));
    for (const [s, i] of Object.entries(o.graphs() || {}))
      a.graphs.set(s, n(i));
    this.processSelections(e, r, a);
  }
  deselectAll(e, r) {
    this.#a(e), this.#e(e, r);
  }
  refresh(e, r) {
    this.#e(e, r);
  }
}
var ro = Object.create, kt = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, ao = (t, e) => (e = Symbol[t]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + t), B = (t) => {
  throw TypeError(t);
}, no = (t, e, r) => e in t ? kt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, so = (t) => [, , , ro(null)], St = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], H = (t) => t !== void 0 && typeof t != "function" ? B("Function expected") : t, io = (t, e, r, o, a) => ({ kind: St[t], name: e, metadata: o, addInitializer: (n) => r._ ? B("Already initialized") : a.push(H(n || null)) }), lo = (t, e) => no(e, ao("metadata"), t[3]), Ae = (t, e, r, o) => {
  for (var a = 0, n = t[e >> 1], s = n && n.length; a < s; a++) e & 1 ? n[a].call(r) : o = n[a].call(r, o);
  return o;
}, co = (t, e, r, o, a, n) => {
  for (var s, i, l, c, h, g = e & 7, w = !1, f = !1, x = t.length + 1, A = St[g + 5], X = t[x - 1] = [], Z = t[x] || (t[x] = []), y = (a = a.prototype, oo({ get [r]() {
    return ae(this, n);
  }, set [r](k) {
    return ne(this, n, k);
  } }, r)), I = o.length - 1; I >= 0; I--)
    c = io(g, r, l = {}, t[3], Z), c.static = w, c.private = f, h = c.access = { has: (k) => r in k }, h.get = (k) => k[r], h.set = (k, ee) => k[r] = ee, i = (0, o[I])({ get: y.get, set: y.set }, c), l._ = 1, i === void 0 ? H(i) && (y[A] = i) : typeof i != "object" || i === null ? B("Object expected") : (H(s = i.get) && (y.get = s), H(s = i.set) && (y.set = s), H(s = i.init) && X.unshift(s));
  return y && kt(a, r, y), a;
}, _t = (t, e, r) => e.has(t) || B("Cannot " + r), ae = (t, e, r) => (_t(t, e, "read from private field"), e.get(t)), Ie = (t, e, r) => e.has(t) ? B("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), ne = (t, e, r, o) => (_t(t, e, "write to private field"), e.set(t, r), r), xt, z, j, ge;
xt = [Cr];
class ue {
  constructor(e) {
    this.__sca = e, Ie(this, z, null), Ie(this, ge, Ae(j, 8, this, null)), Ae(j, 11, this), this.flowGenerator = void 0, this.flowGenerator = e.services.flowGenerator;
  }
  /**
   * Syncs project state from the SCA controller.
   * Called directly after load/close actions.
   */
  syncProjectState() {
    const e = this.__sca.controller.editor.graph.asTab();
    if (!e) {
      ae(this, z) && (ne(this, z, null), this.project = null);
      return;
    }
    const r = e.mainGraphId;
    if (r === ae(this, z)) return;
    ne(this, z, r);
    const o = this.__sca.controller.editor.graph.editor;
    this.project = this.createProjectState(o);
  }
  get router() {
    return this.__sca.controller.router;
  }
  createProjectState(e) {
    return e ? rr(
      this.__sca.services.fetchWithCreds,
      this.__sca.services.googleDriveBoardServer,
      this.__sca.services.actionTracker,
      this.__sca.services.mcpClientManager,
      e
    ) : (console.warn("No editable graph provided: cannot create project state"), null);
  }
}
j = so();
z = /* @__PURE__ */ new WeakMap();
ge = /* @__PURE__ */ new WeakMap();
co(j, 4, "project", xt, ue, ge);
lo(j, ue);
class ho extends EventTarget {
  constructor(e) {
    super();
    const r = e.sca;
    if (!r) throw new Error("Expected SCA");
    this.select = new to(), this.state = new ue(r);
  }
}
class go {
  constructor(e, r, o, a) {
    this.args = e, this.globalConfig = r, this.gDriveClient = o, this.signinAdapter = a, window.location.hash?.includes("owner-tools") && (window.o = this), this.testing = new uo();
  }
  help() {
    return {
      args: "MainArguments instance",
      env: "Environment instance",
      // TODO(volodya): Implement.
      publish: "await publish({[fileId]}) publishes the current (or specified) board to the featured gallery.",
      gdrive: this.gdrive.help(),
      cache: this.cache.help()
    };
  }
  get project() {
    return this.runtime.state.project;
  }
  #r() {
    return this.driveBoardServer;
  }
  get gdrive() {
    return {
      help: () => ({
        info: "Returns basic information about Google Drive board server"
      }),
      info: async () => ({
        folderId: await this.#r().ops.findFolder()
      })
    };
  }
  get cache() {
    return {
      help() {
        return {
          invalidate: "Hard refresh by deleting all caching data and reloading lists",
          update: "Gentle refresh - fetching list of changed files from Google Drive and notifying caches"
        };
      },
      invalidate: async () => (await this.#r().ops.forceRefreshCaches(), "Caches reloaded")
    };
  }
}
class uo {
  // #originalToken?: Function;
  setupLoginBypass() {
    throw new Error("Not implemented");
  }
  // static #fakeToken(): Promise<ValidTokenResult> {
  //   return Promise.resolve({
  //     state: "valid",
  //     grant: {
  //       client_id: "ui-tests",
  //       access_token: "ui-test-only",
  //       expires_in: 3600,
  //       issue_time: Date.now(),
  //       domain: undefined,
  //       scopes: undefined,
  //     },
  //   });
  // }
}
class po {
  constructor(e, r) {
    this.graphUrl = e, this.graphStore = r;
  }
  async read() {
    const e = await navigator.clipboard.read();
    for (const r of e)
      for (const o of r.types) {
        if (o === "text/plain")
          return this.readText();
        if (o.startsWith("image") || o.startsWith("video") || o.startsWith("audio") || o === "application/pdf" || o === "text/html")
          return {
            inlineData: {
              mimeType: o,
              data: await or(await r.getType(o))
            }
          };
      }
    return this.unknown();
  }
  unknown() {
    return { unknown: !0 };
  }
  async isGraphUrl(e) {
    return (await this.graphStore.load(e, {})).success;
  }
  async readText() {
    const e = await navigator.clipboard.readText(), r = mo(e);
    if (r && bo(r))
      return { graphDescriptor: r };
    if (wo(e, this.graphUrl)) {
      const o = e, a = fo(o);
      return a ? { fileData: { fileUri: a, mimeType: "video/mp4" } } : await this.isGraphUrl(o) ? { graphUrl: o } : {
        fileData: { fileUri: o, mimeType: "application/octet-stream" }
      };
    }
    return { text: e };
  }
}
function bo(t) {
  return t.nodes && t.edges && t.title;
}
function fo(t) {
  let e = t;
  const {
    isEmbedUri: r,
    isShareUri: o,
    isWatchUri: a,
    convertShareUriToEmbedUri: n,
    convertWatchOrShortsUriToEmbedUri: s
  } = ar;
  return a(e) || nr(e) ? e = s(e) : o(e) ? e = n(e) : r(e) || (e = null), e;
}
function mo(t) {
  try {
    return JSON.parse(t);
  } catch {
    return;
  }
}
const vo = "canParse";
function wo(t, e) {
  const r = t.startsWith("#");
  if (vo in URL)
    return r ? URL.canParse(t, e) : URL.canParse(t);
  try {
    return r ? new URL(t, e) : new URL(t), !0;
  } catch {
    return !1;
  }
}
function T(t) {
  return t.composedPath().some((e) => e instanceof lr);
}
const ze = {
  keys: ["Cmd+s", "Ctrl+s"],
  willHandle(t) {
    return t !== null;
  },
  async do({ sca: t, tab: e, strings: r }) {
    e?.readOnly || !e?.graphIsMine || await t.actions.board.save({
      start: r.from("STATUS_SAVING_PROJECT"),
      end: r.from("STATUS_PROJECT_SAVED")
    });
  }
}, Ue = {
  keys: ["Cmd+z", "Ctrl+z"],
  willHandle(t, e) {
    return t !== null && T(e);
  },
  async do({ sca: t, tab: e }) {
    e?.readOnly || !e?.graphIsMine || t.actions.graph.undo();
  }
}, Oe = {
  keys: ["Cmd+Shift+z", "Ctrl+Shift+z"],
  willHandle(t, e) {
    return t !== null && T(e);
  },
  async do({ sca: t, tab: e }) {
    e?.readOnly || !e?.graphIsMine || t.actions.graph.redo();
  }
}, Pe = {
  keys: ["Delete", "Backspace"],
  willHandle(t, e) {
    return t !== null && T(e);
  },
  async do({
    runtime: t,
    sca: e,
    selectionState: r,
    tab: o,
    originalEvent: a
  }) {
    if (o?.readOnly || !T(a))
      return;
    const n = e.controller.editor.graph.editor;
    if (!n)
      throw new Error("Unable to edit");
    if (!o || !r || !o.moduleId && r.selectionState.graphs.size === 0)
      throw new Error("Nothing to delete");
    const s = n.inspect(""), i = v.generateDeleteEditSpecFrom(
      r.selectionState,
      s
    );
    let l = null;
    for (const c of r.selectionState.graphs.values()) {
      if (c.assetEdges.size) {
        const h = s.assetEdges();
        if (Array.isArray(h))
          for (const g of c.assetEdges)
            for (const w of h)
              g === sr(w) && await n.apply(
                new Yr("remove", "", {
                  assetPath: w.assetPath,
                  direction: w.direction,
                  nodeId: w.node.descriptor.id
                })
              );
      }
      if (c.assets.size) {
        if (l || (l = t.state.project), !l)
          continue;
        for (const h of c.assets)
          await l.organizer.removeGraphAsset(h);
      }
    }
    await n.apply(
      new yt(i)
    ), t.select.deselectAll(
      o.id,
      v.createWorkspaceSelectionChangeId()
    );
  }
};
let Me = "Enabled";
const De = {
  keys: ["Cmd+Shift+e", "Ctrl+Shift+e"],
  alwaysNotify: !0,
  get messageComplete() {
    return `Experimental Components ${Me}`;
  },
  willHandle() {
    return !0;
  },
  async do({ sca: t }) {
    t.controller.global.main.experimentalComponents = !t.controller.global.main.experimentalComponents, Me = t.controller.global.main.experimentalComponents ? "Enabled" : "Disabled";
  }
};
let Ne = "Enabled";
const Ge = {
  keys: ["Cmd+Shift+d", "Ctrl+Shift+d"],
  alwaysNotify: !0,
  get messageComplete() {
    return `Debug ${Ne}`;
  },
  willHandle() {
    return !0;
  },
  async do({ sca: t }) {
    t.controller.global.debug.enabled = !t.controller.global.debug.enabled, Ne = t.controller.global.debug.enabled ? "Enabled" : "Disabled";
  }
}, He = {
  keys: ["Cmd+Shift+x", "Ctrl+Shift+x"],
  alwaysNotify: !0,
  messagePending: "Downloading agent traces...",
  messageComplete: "Agent traces downloaded",
  messageType: $.INFORMATION,
  willHandle() {
    return !0;
  },
  async do({ sca: t }) {
    const e = t.services.agentContext.exportTraces();
    if (e.length === 0)
      return;
    const r = new Blob([JSON.stringify(e, null, 2)], {
      type: "application/json"
    }), o = URL.createObjectURL(r), a = document.createElement("a");
    a.href = o;
    const n = /* @__PURE__ */ new Date(), s = (l) => l.toString().padStart(2, "0"), i = `${n.getFullYear()}-${s(n.getMonth() + 1)}-${s(n.getDate())}-${s(n.getHours())}-${s(n.getMinutes())}-${s(n.getSeconds())}`;
    a.download = `agent-traces-${i}.log.json`, a.click(), URL.revokeObjectURL(o);
  }
}, We = {
  keys: ["Cmd+a", "Ctrl+a"],
  willHandle(t, e) {
    return t !== null && T(e);
  },
  async do({
    runtime: t,
    tab: e,
    originalEvent: r,
    sca: o
  }) {
    if (!T(r))
      return;
    const a = o.controller.editor.graph.editor;
    if (!a)
      return;
    if (!e)
      throw new Error("Nothing to select");
    const n = a.inspect("");
    t.select.selectAll(e.id, t.select.generateId(), n);
  }
}, $e = {
  keys: ["Cmd+c", "Ctrl+c"],
  messagePending: "Copying to clipboard",
  messageComplete: "Copied to clipboard",
  messageType: $.INFORMATION,
  alwaysNotify: !0,
  willHandle(t, e) {
    const r = window.getSelection();
    return r && r.toString().length > 0 ? !1 : t !== null && T(e);
  },
  async do({
    selectionState: t,
    tab: e,
    originalEvent: r,
    sca: o
  }) {
    if (!T(r))
      return;
    const a = o.controller.editor.graph.editor;
    if (!a)
      throw new Error("Unable to edit graph");
    if (!e || !t || t.selectionState.graphs.size === 0)
      throw new Error("Nothing to copy");
    const n = a.inspect(""), s = v.generateBoardFrom(
      t.selectionState,
      n
    );
    await navigator.clipboard.writeText(JSON.stringify(s, null, 2));
  }
}, Le = {
  keys: ["Cmd+x", "Ctrl+x"],
  willHandle(t, e) {
    return t !== null && T(e);
  },
  async do({
    selectionState: t,
    tab: e,
    originalEvent: r,
    sca: o
  }) {
    if (!T(r) || e?.readOnly)
      return;
    const a = o.controller.editor.graph.editor;
    if (!a)
      throw new Error("Unable to edit");
    if (!e || !t || t.selectionState.graphs.size === 0)
      throw new Error("Nothing to cut");
    const n = a.inspect(""), s = v.generateBoardFrom(
      t.selectionState,
      n
    ), i = v.generateDeleteEditSpecFrom(
      t.selectionState,
      n
    );
    await Promise.all([
      navigator.clipboard.writeText(JSON.stringify(s, null, 2)),
      await a.apply(
        new yt(i)
      )
    ]);
  }
}, je = {
  keys: ["Cmd+v", "Ctrl+v"],
  willHandle(t) {
    return t !== null;
  },
  async do({
    runtime: t,
    tab: e,
    selectionState: r,
    pointerLocation: o,
    sca: a
  }) {
    if (e?.readOnly)
      return;
    const n = await new po(
      e?.graph.url,
      a.services.graphStore
    ).read();
    let s, i, l;
    if ("graphUrl" in n ? i = n.graphUrl : "graphDescriptor" in n ? s = n.graphDescriptor : "text" in n && (l = n.text), e) {
      const c = a.controller.editor.graph.editor;
      if (!c)
        throw new Error("Unable to edit graph");
      const h = c.inspect("");
      let g = [];
      if (s) {
        const f = [];
        if (r)
          for (const x of r.selectionState.graphs.keys()) {
            const A = r.selectionState.graphs.get(x);
            if (!(!A || A.edges.size === 0 && A.nodes.size === 0 && A.comments.size === 0)) {
              if (x === wt) {
                f.push("");
                continue;
              }
              f.push(x);
            }
          }
        f.length === 0 && f.push(""), g = v.generateAddEditSpecFromDescriptor(
          s,
          h,
          o,
          f
        );
      } else if (i)
        g = v.generateAddEditSpecFromURL(
          i,
          h,
          o
        );
      else if (l) {
        const f = ir.find(
          (x) => x.title === "Generate"
        );
        if (!f)
          return;
        g = v.generateAddEditSpecFromDescriptor(
          {
            edges: [],
            nodes: [
              {
                type: f.url,
                id: globalThis.crypto.randomUUID(),
                metadata: {
                  title: "Pasted content"
                },
                configuration: {
                  config$prompt: {
                    role: "user",
                    parts: [
                      {
                        text: l
                      }
                    ]
                  }
                }
              }
            ]
          },
          h,
          o,
          [""]
        );
      } else
        return;
      await c.edit(g, v.createEditChangeId());
      const w = v.generateSelectionFrom(g);
      t.select.processSelections(
        e.id,
        v.createWorkspaceSelectionChangeId(),
        w
      );
    }
  }
}, Be = {
  keys: ["Cmd+d", "Ctrl+d"],
  willHandle(t, e) {
    return t !== null && T(e);
  },
  async do({
    runtime: t,
    tab: e,
    selectionState: r,
    pointerLocation: o,
    originalEvent: a,
    sca: n
  }) {
    if (!T(a))
      return;
    const s = n.controller.editor.graph.editor;
    if (!s)
      throw new Error("Unable to edit graph");
    if (!e || !r || r.selectionState.graphs.size === 0)
      throw new Error("Nothing to duplicate");
    if (e?.readOnly)
      return;
    const i = s.inspect(""), l = v.generateBoardFrom(
      r.selectionState,
      i
    );
    let c = [];
    if (l) {
      const g = [];
      if (r)
        for (const w of r.selectionState.graphs.keys()) {
          const f = r.selectionState.graphs.get(w);
          if (!(!f || f.edges.size === 0 && f.nodes.size === 0 && f.comments.size === 0)) {
            if (w === wt) {
              g.push("");
              continue;
            }
            g.push(w);
          }
        }
      g.length === 0 && g.push(""), c = v.generateAddEditSpecFromDescriptor(
        l,
        i,
        o,
        g
      );
    }
    await s.edit(c, v.createEditChangeId());
    const h = v.generateSelectionFrom(c);
    t.select.processSelections(
      e.id,
      v.createWorkspaceSelectionChangeId(),
      h
    );
  }
}, yo = /* @__PURE__ */ new Map([
  [ze.keys, ze],
  [Pe.keys, Pe],
  [We.keys, We],
  [$e.keys, $e],
  [Le.keys, Le],
  [je.keys, je],
  [
    De.keys,
    De
  ],
  [Ge.keys, Ge],
  [He.keys, He],
  [Ue.keys, Ue],
  [Oe.keys, Oe],
  [Be.keys, Be]
]), Fe = {
  event: "host.modetoggle",
  async do({ sca: t, originalEvent: e }) {
    const r = M(window.location.href);
    if (r.page === "graph") {
      const o = e.detail.mode;
      o !== r.mode && t.controller.router.go({ ...r, mode: o });
    }
    return !1;
  }
}, Je = {
  event: "host.selectionstatechange",
  async do({ runtime: t, originalEvent: e, tab: r }) {
    return r && t.select.processSelections(
      r.id,
      e.detail.selectionChangeId,
      e.detail.selections,
      e.detail.replaceExistingSelections,
      e.detail.moveToSelection
    ), !1;
  }
}, qe = {
  event: "host.lock",
  async do({ sca: t }) {
    return t.controller.global.main.blockingAction = !0, !1;
  }
}, Ve = {
  event: "host.unlock",
  async do({ sca: t }) {
    return t.controller.global.main.blockingAction = !1, !1;
  }
}, Ke = {
  event: "host.flagchange",
  async do({ sca: t, originalEvent: e }) {
    return typeof e.detail.value < "u" ? await t.controller.global.flags.override(
      e.detail.flag,
      e.detail.value
    ) : await t.controller.global.flags.clearOverride(e.detail.flag), !1;
  }
}, Ye = {
  event: "host.usersignin",
  async do() {
    return !1;
  }
}, se = {
  event: "board.run",
  async do({ tab: t, settings: e, askUserToSignInIfNeeded: r, boardServer: o, sca: a }) {
    if (!t)
      return console.warn("Unable to prepare run: no Tab provided"), !1;
    if (!e)
      return console.warn("Unable to prepare run: no settings store provided"), !1;
    if (await r() !== "success")
      return !1;
    if (!a.controller.run.main.hasRunner)
      return console.warn("Run not prepared - runner not available"), !1;
    if ((await a.controller.global.flags.flags()).requireConsentForGetWebpage) {
      const s = a.controller.editor.graph.editor?.inspect(""), i = t.graph.url;
      if (!(o instanceof dr && i && o.galleryGraphs.has(i)) && !t.graphIsMine && s?.usesTool("embed://a2/tools.bgl.json#module:get-webpage") && !await a.controller.global.consent.queryConsent(
        {
          type: Rr.GET_ANY_WEBPAGE,
          scope: {},
          graphUrl: t.graph.url
        },
        Ar.IN_APP
      ))
        return !1;
    }
    return a.controller.run.main.start(), !1;
  }
}, Qe = {
  event: "board.load",
  async do({ originalEvent: t, sca: e }) {
    return cr(() => e.controller.global.main.mode) && await e.controller.global.main.isHydrated, e.controller.router.go({
      page: "graph",
      mode: e.controller.global.main.mode,
      flow: t.detail.url,
      resourceKey: void 0,
      dev: M(window.location.href).dev,
      guestPrefixed: !0
    }), e.controller.home.recent.add({ url: t.detail.url }), !1;
  }
}, Xe = {
  event: "board.undo",
  async do({ tab: t, sca: e }) {
    return t?.readOnly || !t?.graphIsMine || e.actions.graph.undo(), !1;
  }
}, Ze = {
  event: "board.redo",
  async do({ sca: t, tab: e }) {
    return e?.readOnly || !e?.graphIsMine || t.actions.graph.redo(), !1;
  }
}, et = {
  event: "board.togglepin",
  async do({ sca: t, originalEvent: e }) {
    return t.controller.home.recent.setPin(
      e.detail.url,
      e.detail.status === "pin"
    ), !1;
  }
}, ie = {
  event: "board.stop",
  async do({ tab: t, runtime: e, sca: r, settings: o }) {
    if (!t)
      return !1;
    if (t.finalOutputValues) {
      t.finalOutputValues = void 0;
      const n = new URL(document.URL);
      n.searchParams.has("results") && (n.searchParams.delete("results"), history.pushState(null, "", n));
    }
    r.controller.run.main.stop(), e.state.project?.resetRun();
    const a = t.graph.url;
    return a && o && r.actions.run.prepare({
      graph: t.graph,
      url: a,
      settings: o,
      fetchWithCreds: r.services.fetchWithCreds,
      flags: r.controller.global.flags,
      getProjectRunState: () => e.state.project?.run,
      connectToProject: (n, s) => {
        e.state.project?.connectHarnessRunner(n, s);
      }
    }), !0;
  }
}, tt = {
  event: "board.restart",
  async do({
    tab: t,
    runtime: e,
    settings: r,
    googleDriveClient: o,
    sca: a,
    askUserToSignInIfNeeded: n,
    boardServer: s,
    actionTracker: i
  }) {
    return await ie.do({
      tab: t,
      runtime: e,
      originalEvent: new V({
        eventType: "board.stop"
      }),
      settings: r,
      googleDriveClient: o,
      sca: a,
      askUserToSignInIfNeeded: n,
      boardServer: s
    }), i?.runApp(t?.graph.url, "console"), await se.do({
      tab: t,
      runtime: e,
      originalEvent: new V({
        eventType: "board.run"
      }),
      settings: r,
      googleDriveClient: o,
      sca: a,
      askUserToSignInIfNeeded: n,
      boardServer: s
    }), !1;
  }
}, rt = {
  event: "board.input",
  async do({ tab: t, settings: e, originalEvent: r, sca: o }) {
    if (!e || !t)
      return !1;
    const a = o.controller.run.main.runner;
    if (!a)
      throw new Error("Can't send input, no runner");
    const n = r.detail.data;
    return a.running() || a.resumeWithInputs(n), !1;
  }
}, ot = {
  event: "board.rename",
  async do({ originalEvent: t, sca: e }) {
    try {
      e.controller.global.main.blockingAction = !0, await e.actions.graph.updateBoardTitleAndDescription(
        t.detail.title,
        t.detail.description
      );
    } finally {
      e.controller.global.main.blockingAction = !1;
    }
    return !1;
  }
}, at = {
  event: "board.create",
  async do({ sca: t, originalEvent: e, askUserToSignInIfNeeded: r, embedHandler: o }) {
    if (await r() !== "success")
      return t.controller.global.snackbars.unsnackbar(), !1;
    t.controller.global.main.blockingAction = !0;
    const a = await t.actions.board.saveAs(
      e.detail.graph,
      e.detail.messages
    );
    if (t.controller.global.main.blockingAction = !1, !a?.url)
      return !1;
    const { lite: n, dev: s } = M(window.location.href);
    return t.controller.router.go({
      page: "graph",
      // Ensure we always go back to the canvas when a board is created.
      mode: "canvas",
      // Ensure that we correctly preserve the "lite" mode.
      lite: n,
      flow: a.url.href,
      // Resource key not required because we know the current user
      // created it.
      resourceKey: void 0,
      dev: s,
      guestPrefixed: !0
    }), o?.sendToEmbedder({
      type: "board_id_created",
      id: a.url.href
    }), !1;
  }
}, nt = {
  event: "board.remix",
  async do(t) {
    const { originalEvent: e, sca: r, embedHandler: o } = t;
    r.controller.global.main.blockingAction = !0;
    const a = await r.actions.board.remix(
      e.detail.url,
      e.detail.messages
    );
    if (r.controller.global.main.blockingAction = !1, !a?.success)
      return !1;
    const { lite: n, dev: s } = M(window.location.href);
    return r.controller.router.go({
      page: "graph",
      // Ensure we always go back to the canvas when a board is created.
      mode: "canvas",
      // Ensure that we correctly preserve the "lite" mode.
      lite: n,
      flow: a.url.href,
      // Resource key not required because we know the current user
      // created it.
      resourceKey: void 0,
      dev: s,
      guestPrefixed: !0
    }), o?.sendToEmbedder({
      type: "board_id_created",
      id: a.url.href
    }), !1;
  }
}, st = {
  event: "board.delete",
  async do(t) {
    const { tab: e, runtime: r, originalEvent: o, sca: a } = t;
    if (!confirm(o.detail.messages.query) || (a.controller.global.main.blockingAction = !0, await a.actions.board.deleteBoard(
      o.detail.url,
      o.detail.messages
    ), a.controller.home.recent.remove(o.detail.url), await a.controller.home.recent.isSettled, a.controller.global.main.blockingAction = !1, e && r.select.deselectAll(e.id, r.select.generateId()), a.controller.router.parsedUrl.page === "home")) return !1;
    const { lite: n, dev: s } = M(window.location.href);
    return a.controller.router.go({
      page: "home",
      lite: n,
      dev: s,
      guestPrefixed: !0
    }), !1;
  }
}, it = {
  event: "board.replace",
  async do(t) {
    const { originalEvent: e, googleDriveClient: r, sca: o } = t, { replacement: a, theme: n, creator: s } = e.detail;
    return await o.actions.graph.replaceWithTheme({
      replacement: a,
      theme: n,
      creator: s,
      googleDriveClient: r
    }), !1;
  }
}, lt = {
  event: "flowgen.generate",
  async do({ originalEvent: t, sca: e, actionTracker: r }) {
    const { intent: o, projectState: a } = t.detail, n = e.controller.editor.graph.editor?.raw();
    if (!n)
      return console.warn("Unable to generate: no active graph"), !1;
    e.controller.global.main.blockingAction = !0, e.controller.run.main.stop(), e.controller.global.flowgenInput.state = { status: "generating" }, r?.flowGenEdit(n.url);
    try {
      await e.actions.flowgen.generate(o, a);
    } finally {
      e.controller.global.main.blockingAction = !1;
    }
    return !0;
  }
}, ct = {
  event: "asset.changeedge",
  async do({ originalEvent: t, sca: e }) {
    e.controller.global.main.blockingAction = !0;
    try {
      await e.actions.graph.changeAssetEdge(
        t.detail.changeType,
        t.detail.assetEdge,
        t.detail.subGraphId
      );
    } finally {
      e.controller.global.main.blockingAction = !1;
    }
    return !1;
  }
}, ko = 250, dt = {
  event: "asset.add",
  async do({ runtime: t, sca: e, tab: r, originalEvent: o, googleDriveClient: a }) {
    if (!r || !a)
      return !1;
    const n = t.state.project;
    if (!n)
      return !1;
    let s;
    const i = window.setTimeout(() => {
      s = globalThis.crypto.randomUUID(), e.controller.global.snackbars.snackbar(
        "Processing assets, please wait...",
        K.PENDING,
        [],
        !0,
        s,
        !0
      );
    }, ko);
    return await Promise.all(
      o.detail.assets.map((l) => {
        const c = {
          title: l.name,
          type: l.type,
          visual: l.visual,
          managed: l.managed
        };
        return l.subType && (c.subType = l.subType), n?.organizer.addGraphAsset({
          path: l.path,
          metadata: c,
          data: [l.data]
        });
      })
    ), window.clearTimeout(i), s && e.controller.global.snackbars.snackbar(
      "Processed assets",
      K.INFORMATION,
      [],
      !1,
      s,
      !0
    ), !1;
  }
}, ht = {
  event: "node.change",
  async do({ runtime: t, tab: e, originalEvent: r, sca: o }) {
    if (e?.readOnly)
      return !1;
    o.controller.global.main.blockingAction = !0;
    try {
      await o.actions.graph.changeNodeConfiguration(
        r.detail.id,
        r.detail.subGraphId ?? "",
        r.detail.configurationPart,
        r.detail.metadata,
        r.detail.ins
      );
    } catch (a) {
      console.warn("Failed to change node configuration", a);
    }
    return o.controller.global.main.blockingAction = !1, !1;
  }
}, gt = {
  event: "node.add",
  async do({ runtime: t, tab: e, originalEvent: r, sca: o }) {
    if (!e)
      return !1;
    o.controller.global.main.blockingAction = !0;
    try {
      await o.actions.graph.addNode(
        r.detail.node,
        r.detail.graphId
      ), t.select.selectNodes(
        e.id,
        t.select.generateId(),
        r.detail.graphId || vt,
        [r.detail.node.id]
      );
    } finally {
      o.controller.global.main.blockingAction = !1;
    }
    return !1;
  }
}, ut = {
  event: "node.moveselection",
  async do({ originalEvent: t, sca: e }) {
    e.controller.global.main.blockingAction = !0;
    try {
      await e.actions.graph.moveSelectionPositions(
        t.detail.updates
      );
    } finally {
      e.controller.global.main.blockingAction = !1;
    }
    return !1;
  }
}, pt = {
  event: "node.changeedge",
  async do({ originalEvent: t, sca: e }) {
    return e.controller.global.main.blockingAction = !0, await e.actions.graph.changeEdge(
      t.detail.changeType,
      t.detail.from,
      t.detail.to,
      t.detail.subGraphId
    ), e.controller.global.main.blockingAction = !1, !1;
  }
}, bt = {
  event: "node.changeedgeattachmentpoint",
  async do({ originalEvent: t, sca: e }) {
    const { graphId: r } = t.detail;
    e.controller.global.main.blockingAction = !0;
    try {
      await e.actions.graph.changeEdgeAttachmentPoint(
        r === vt ? "" : r,
        t.detail.edge,
        t.detail.which,
        t.detail.attachmentPoint
      );
    } finally {
      e.controller.global.main.blockingAction = !1;
    }
    return !1;
  }
}, ft = {
  event: "node.action",
  async do({ runtime: t, sca: e, originalEvent: r }) {
    e.controller.global.main.blockingAction = !0;
    try {
      const o = t.state.project;
      if (!o)
        return console.warn('No project for "node.action"'), !1;
      const a = await o.run.handleUserAction(r.payload);
      return Ir(a) || console.warn(a.$error), !1;
    } finally {
      e.controller.global.main.blockingAction = !1;
    }
  }
}, oe = /* @__PURE__ */ new Map([
  /** Host */
  [Fe.event, Fe],
  [Je.event, Je],
  [qe.event, qe],
  [Ve.event, Ve],
  [Ke.event, Ke],
  [Ye.event, Ye],
  /** Board */
  [at.event, at],
  [st.event, st],
  [rt.event, rt],
  [Qe.event, Qe],
  [nt.event, nt],
  [ot.event, ot],
  [se.event, se],
  [ie.event, ie],
  [tt.event, tt],
  [it.event, it],
  [et.event, et],
  [Xe.event, Xe],
  [Ze.event, Ze],
  /** Flowgen */
  [lt.event, lt],
  /** Node */
  [ft.event, ft],
  [gt.event, gt],
  [ht.event, ht],
  [ut.event, ut],
  [pt.event, pt],
  [
    bt.event,
    bt
  ],
  /** Asset */
  [dt.event, dt],
  [ct.event, ct]
]);
var So = Object.create, Ct = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, Tt = (t, e) => (e = Symbol[t]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + t), F = (t) => {
  throw TypeError(t);
}, xo = (t, e, r) => e in t ? Ct(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Co = (t) => [, , , So(t?.[Tt("metadata")] ?? null)], Et = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], W = (t) => t !== void 0 && typeof t != "function" ? F("Function expected") : t, To = (t, e, r, o, a) => ({ kind: Et[t], name: e, metadata: o, addInitializer: (n) => r._ ? F("Already initialized") : a.push(W(n || null)) }), Eo = (t, e) => xo(e, Tt("metadata"), t[3]), u = (t, e, r, o) => {
  for (var a = 0, n = t[e >> 1], s = n && n.length; a < s; a++) e & 1 ? n[a].call(r) : o = n[a].call(r, o);
  return o;
}, E = (t, e, r, o, a, n) => {
  for (var s, i, l, c, h, g = e & 7, w = !1, f = !1, x = t.length + 1, A = Et[g + 5], X = t[x - 1] = [], Z = t[x] || (t[x] = []), y = (a = a.prototype, _o({ get [r]() {
    return C(this, n);
  }, set [r](k) {
    return P(this, n, k);
  } }, r)), I = o.length - 1; I >= 0; I--)
    c = To(g, r, l = {}, t[3], Z), c.static = w, c.private = f, h = c.access = { has: (k) => r in k }, h.get = (k) => k[r], h.set = (k, ee) => k[r] = ee, i = (0, o[I])({ get: y.get, set: y.set }, c), l._ = 1, i === void 0 ? W(i) && (y[A] = i) : typeof i != "object" || i === null ? F("Object expected") : (W(s = i.get) && (y.get = s), W(s = i.set) && (y.set = s), W(s = i.init) && X.unshift(s));
  return y && Ct(a, r, y), a;
}, pe = (t, e, r) => e.has(t) || F("Cannot " + r), C = (t, e, r) => (pe(t, e, "read from private field"), e.get(t)), b = (t, e, r) => e.has(t) ? F("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), P = (t, e, r, o) => (pe(t, e, "write to private field"), e.set(t, r), r), S = (t, e, r) => (pe(t, e, "access private method"), r), Rt, At, It, zt, Ut, Ot, Pt, Mt, Dt, Nt, Gt, Ht, le, d, be, fe, me, ve, we, ye, ke, Se, _e, xe, Ce, Te, J, U, q, O, Y, m, Wt, $t, ce, Lt, de, he, jt, Bt, Ft, Jt, qt, L, Vt;
const p = Lr("Global"), Ro = 1250, Kt = "bb-has-sign-in-consent";
class _ extends (le = hr(Fr), Ht = [R({ context: fr })], Gt = [R({ context: Xr })], Nt = [R({ context: mr })], Dt = [R({ context: vr })], Mt = [R({ context: wr })], Pt = [R({ context: yr })], Ot = [R({ context: Er })], Ut = [R({ context: kr })], zt = [R({ context: Sr })], It = [R({ context: _r })], At = [Ee()], Rt = [Ee()], le) {
  constructor(e) {
    super(), b(this, m), b(this, be, u(d, 8, this)), u(d, 11, this), b(this, fe, u(d, 12, this)), u(d, 15, this), b(this, me, u(d, 16, this)), u(d, 19, this), b(this, ve, u(d, 20, this)), u(d, 23, this), b(this, we, u(d, 24, this)), u(d, 27, this), b(this, ye, u(d, 28, this)), u(d, 31, this), b(this, ke, u(d, 32, this)), u(d, 35, this), b(this, Se, u(d, 36, this)), u(d, 39, this), b(this, _e, u(d, 40, this)), u(d, 43, this), b(this, xe, u(d, 44, this)), u(d, 47, this), b(this, Ce, u(d, 48, this, 0)), u(d, 51, this), b(this, Te, u(d, 52, this, null)), u(d, 55, this), this.selectionState = null, this.runtime = void 0, this.snackbarRef = N(), this.lastPointerPosition = { x: 0, y: 0 }, this.tooltipRef = N(), this.canvasControllerRef = N(), this.feedbackPanelRef = N(), this.embedHandler = void 0, this.settings = void 0, this.hostOrigin = void 0, this.logger = zr(), b(this, J, S(this, m, Ft).bind(this)), b(this, U, S(this, m, Jt).bind(this)), b(this, q, S(this, m, Vt).bind(this)), b(this, O, null), b(this, Y, null), b(this, L, !1), this.signInModalRef = N(), this.globalConfig = e.globalConfig, this.guestConfiguration = e.guestConfiguration, this.settings = e.settings, this.settingsHelper = new Ur(this.settings), this.opalShell = e.shellHost, this.hostOrigin = e.hostOrigin;
    const r = {
      globalConfig: this.globalConfig,
      guestConfig: this.guestConfiguration,
      settings: this.settings,
      shellHost: this.opalShell,
      env: e.env,
      appName: p.from("APP_NAME"),
      appSubName: p.from("SUB_APP_NAME")
    };
    this.sca = Qr(r, e.globalConfig.flags), this.sca.controller.global.debug.isHydrated.then(() => {
      this.sca.controller.global.debug.enabled = !0;
    }), Or(this.sca.controller), r.sca = this.sca, this.runtime = new ho(r), this.googleDriveClient = this.sca.services.googleDriveClient, this.sca.services.signinAdapter.state.then((a) => {
      a === "signedin" && (this.actionTracker.updateSignedInStatus(!0), this.sca.services.signinAdapter.checkAppAccess().then(this.handleAppAccessCheckResult.bind(this)), this.opalShell.validateScopes().then(this.handleValidateScopesResult.bind(this)));
    }), this.flowGenerator = this.sca.services.flowGenerator, this.actionTracker = this.sca.services.actionTracker, this.embedHandler = e.embedHandler, S(this, m, $t).call(this), this.boardServer = this.sca.services.googleDriveBoardServer, this.globalConfig.ENABLE_EMAIL_OPT_IN && this.sca.services.emailPrefsManager.refreshPrefs().then(() => {
      this.sca.services.emailPrefsManager.prefsValid && !this.sca.services.emailPrefsManager.hasStoredPreferences && this.sca.controller.global.main.show.add("WarmWelcome");
    });
    const o = new go(
      e,
      this.globalConfig,
      this.googleDriveClient,
      this.sca.services.signinAdapter
    );
    o.runtime = this.runtime, o.settingsHelper = this.settingsHelper, this.sca.services.graphStore.addEventListener("update", (a) => {
      const { mainGraphId: n } = a, s = this.tab?.mainGraphId;
      !s || n !== s && !a.affectedGraphs.includes(s) || this.graphTopologyUpdateId++;
    }), this.sca.services.signinAdapter.state.then(
      (a) => this.embedHandler?.sendToEmbedder({
        type: "home_loaded",
        isSignedIn: a === "signedin"
      })
    ), S(this, m, Wt).call(this), this.logger.log(
      Pr("Visual Editor Initialized"),
      p.from("APP_NAME"),
      !1
    ), S(this, m, ce).call(this), P(this, O, gr(() => {
      S(this, m, ce).call(this);
    })), this.doPostInitWork();
  }
  // Computed from SCA controller - no longer stored
  get tab() {
    return this.sca.controller.editor.graph.asTab();
  }
  async handleValidateScopesResult(e) {
    !e.ok && await this.sca.services.signinAdapter.state === "signedin" && (console.log(
      "[signin] oauth scopes were missing or the user revoked access, forcing signin.",
      e
    ), await this.sca.services.signinAdapter.signOut(), window.location.href = Mr({
      page: "landing",
      redirect: M(window.location.href),
      missingScopes: e.code === "missing-scopes",
      oauthRedirect: new URL(window.location.href).searchParams.get(Dr) ?? void 0,
      guestPrefixed: !0
    }));
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("bbshowtooltip", C(this, J)), window.addEventListener("bbhidetooltip", C(this, U)), window.addEventListener("pointerdown", C(this, U)), window.addEventListener("keydown", C(this, q)), this.embedHandler && (this.embedState = Tr()), this.embedHandler?.addEventListener(
      "toggle_iterate_on_prompt",
      ({ message: e }) => {
        this.embedState.showIterateOnPrompt = e.on;
      }
    ), this.embedHandler?.addEventListener("create_new_board", ({ message: e }) => {
      e.prompt ? S(this, m, Lt).call(this, e.prompt).then((r) => S(this, m, de).call(this, r)).catch((r) => console.error("Error generating board", r)) : S(this, m, de).call(this, ur());
    }), this.embedHandler?.sendToEmbedder({ type: "handshake_ready" });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("bbshowtooltip", C(this, J)), window.removeEventListener("bbhidetooltip", C(this, U)), window.removeEventListener("pointerdown", C(this, U)), window.removeEventListener("keydown", C(this, q)), C(this, O) && (C(this, O).call(this), P(this, O, null));
  }
  /**
   * @deprecated File drop to create new tab is no longer supported
   */
  attemptImportFromDrop(e) {
  }
  getRenderValues() {
    const e = this.sca.controller.run.main.status;
    let r = 0;
    if (this.tab?.graph?.metadata?.visual?.presentation?.themes && this.tab?.graph?.metadata?.visual?.presentation?.theme) {
      const s = this.tab.graph.metadata.visual.presentation.theme, i = this.tab.graph.metadata.visual.presentation.themes;
      i[s] && (r = pr(i[s]));
    }
    const o = this.runtime.state.project;
    if (o && this.tab?.finalOutputValues) {
      const s = new br("", void 0);
      s.status = "complete";
      const i = {
        output: this.tab.finalOutputValues,
        schema: {}
      };
      s.outputs.set("final", i), o.run.app.screens.set("final", s);
    }
    let a = !1;
    if (this.tab && !this.tab.readOnly) {
      const s = this.sca.controller.editor.graph.url;
      if (s) {
        const l = this.sca.services.googleDriveBoardServer?.canProvide(new URL(s));
        a = l !== !1 && !!l?.save;
      }
    }
    let n = D.ERROR;
    if (this.tab)
      switch (this.sca.controller.editor.graph.saveStatus) {
        case "saving":
          n = D.SAVING;
          break;
        case "saved":
          n = D.SAVED;
          break;
        case "unsaved":
          n = D.UNSAVED;
          break;
        case "error":
          n = D.ERROR;
          break;
      }
    return {
      canSave: a,
      projectState: o,
      saveStatus: n,
      showingOverlay: this.sca.controller.global.main.show.size > 0,
      themeHash: r,
      tabStatus: e
    };
  }
  collectEventRouteDeps(e) {
    return {
      originalEvent: e,
      runtime: this.runtime,
      settings: this.settings,
      tab: this.tab,
      googleDriveClient: this.googleDriveClient,
      askUserToSignInIfNeeded: (r) => this.askUserToSignInIfNeeded(r),
      boardServer: this.boardServer,
      actionTracker: this.actionTracker,
      embedHandler: this.embedHandler,
      sca: this.sca
    };
  }
  willUpdate() {
    this.sca.controller.global.main && (this.tosStatus && !this.tosStatus.canAccess ? this.sca.controller.global.main.show.add("TOS") : this.sca.controller.global.main.show.delete("TOS"));
  }
  renderTooltip() {
    return G`<bb-tooltip ${te(this.tooltipRef)}></bb-tooltip>`;
  }
  async invokeRemixEventRouteWith(e, r = {
    start: p.from("STATUS_REMIXING_PROJECT"),
    end: p.from("STATUS_PROJECT_CREATED"),
    error: p.from("ERROR_UNABLE_TO_CREATE_PROJECT")
  }) {
    await oe.get("board.remix")?.do(
      this.collectEventRouteDeps(
        new V({
          eventType: "board.remix",
          messages: r,
          url: e
        })
      )
    ) && requestAnimationFrame(() => {
      this.requestUpdate();
    });
  }
  async invokeDeleteEventRouteWith(e) {
    this.sca.controller.global.main.blockingAction = !0;
    const o = await oe.get("board.delete")?.do(
      this.collectEventRouteDeps(
        new V({
          eventType: "board.delete",
          messages: {
            query: p.from("QUERY_DELETE_PROJECT"),
            start: p.from("STATUS_DELETING_PROJECT"),
            end: p.from("STATUS_PROJECT_DELETED"),
            error: p.from("ERROR_UNABLE_TO_CREATE_PROJECT")
          },
          url: e
        })
      )
    );
    this.sca.controller.global.main.blockingAction = !1, o && requestAnimationFrame(() => {
      this.requestUpdate();
    });
  }
  renderSnackbar() {
    return G`<bb-snackbar
      ${te(this.snackbarRef)}
      @bbsnackbaraction=${async (e) => {
      switch ("callback" in e && e.callback && await e.callback(), e.action) {
        case "remix": {
          if (!e.value || typeof e.value != "string")
            return;
          this.invokeRemixEventRouteWith(e.value);
          break;
        }
        case "details": {
          this.sca.controller.global.snackbars.lastDetailsInfo = e.value ?? null, this.sca.controller.global.main.show.add("SnackbarDetailsModal");
          break;
        }
        case "dismiss": {
          this.runtime.state.project?.run?.dismissError();
          break;
        }
      }
    }}
    ></bb-snackbar>`;
  }
  async askUserToSignInIfNeeded(e) {
    const r = async () => {
      if (!e?.length)
        return !0;
      const n = await this.sca.services.signinAdapter.scopes;
      return !!(n && e.every(
        (s) => n.has(Nr(s))
      ));
    };
    if (await this.sca.services.signinAdapter.state === "signedin" && await r()) {
      if (!this.guestConfiguration.consentMessage || Ao())
        return "success";
      {
        this.sca.controller.global.main.show.add("SignInModal"), await this.updateComplete;
        const n = this.signInModalRef.value;
        return n ? await n.openAndWaitForConsent() === "success" ? (mt(), "success") : "failure" : (console.warn("Could not find sign-in modal."), "failure");
      }
    }
    this.sca.controller.global.main.show.add("SignInModal"), await this.updateComplete;
    const o = this.signInModalRef.value;
    if (!o)
      return console.warn("Could not find sign-in modal."), "failure";
    const a = await o.openAndWaitForSignIn(e);
    return a === "success" && mt(), a;
  }
  renderSignInModal(e = !0) {
    return G`
      <bb-sign-in-modal
        ${te(this.signInModalRef)}
        .consentMessage=${this.guestConfiguration.consentMessage}
        .blurBackground=${e}
        @bbmodaldismissed=${() => {
      this.sca.controller.global.main.show.delete("SignInModal");
    }}
      ></bb-sign-in-modal>
    `;
  }
  renderSnackbarDetailsModal() {
    return G`<bb-snackbar-details-modal
      .details=${this.sca.controller.global.snackbars.lastDetailsInfo}
      @bbmodaldismissed=${() => {
      this.sca.controller.global.snackbars.lastDetailsInfo = null, this.sca.controller.global.main.show.delete("SnackbarDetailsModal");
    }}
    ></bb-snackbar-details-modal>`;
  }
  renderConsentRequests() {
    return this.sca.controller.global.consent.pendingModal.length === 0 ? Br : G`
      <bb-consent-request-modal
        .consentRequest=${this.sca.controller.global.consent.pendingModal[0]}
      ></bb-consent-request-modal>
    `;
  }
  async handleRoutedEvent(e) {
    const r = oe.get(e.detail.eventType);
    if (!r) {
      console.warn(`No event handler for "${e.detail.eventType}"`);
      return;
    }
    await r.do(this.collectEventRouteDeps(e)) && requestAnimationFrame(() => {
      this.requestUpdate();
    });
  }
}
d = Co(le);
be = /* @__PURE__ */ new WeakMap();
fe = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakMap();
ve = /* @__PURE__ */ new WeakMap();
we = /* @__PURE__ */ new WeakMap();
ye = /* @__PURE__ */ new WeakMap();
ke = /* @__PURE__ */ new WeakMap();
Se = /* @__PURE__ */ new WeakMap();
_e = /* @__PURE__ */ new WeakMap();
xe = /* @__PURE__ */ new WeakMap();
Ce = /* @__PURE__ */ new WeakMap();
Te = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakMap();
O = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakSet();
Wt = async function() {
  try {
    if (await this.sca.controller.isHydrated, (await this.sca.controller.global.flags.flags()).googleOne) {
      this.logger.log(
        Gr("Checking subscriber status"),
        "Google One"
      );
      const e = await this.sca.services.apiClient.getG1SubscriptionStatus({
        include_credit_data: !0
      });
      this.sca.controller.global.main.subscriptionStatus = e.is_member ? "subscribed" : "not-subscribed", this.sca.controller.global.main.subscriptionCredits = e.remaining_credits;
    }
  } catch (t) {
    console.warn(t), this.sca.controller.global.main.subscriptionStatus = "error", this.sca.controller.global.main.subscriptionCredits = -2;
  }
};
$t = function() {
  if (!this.runtime) {
    console.error("No runtime found");
    return;
  }
  this.runtime.select.addEventListener(
    Q.eventName,
    (t) => {
      this.sca.controller.editor.selection.bumpSelectionId(), this.selectionState = {
        selectionChangeId: t.selectionChangeId,
        selectionState: t.selectionState,
        moveToSelection: t.moveToSelection
      }, this.requestUpdate();
    }
  );
};
ce = async function() {
  const t = this.sca.controller.router.parsedUrl, e = window.location.href;
  if (e !== C(this, Y))
    if (P(this, Y, e), "mode" in t && t.mode && (this.sca.controller.global.main.mode = t.mode), t.page === "home" ? this.sca.services.actionTracker.load("home") : this.sca.services.actionTracker.load(
      this.sca.controller.global.main.mode
    ), t.page === "home") {
      this.tab?.id && (this.sca.controller.run.main.setStatus(
        Hr.STOPPED
      ), this.sca.controller.run.main.abortController?.abort()), this.sca.actions.board.close(), await S(this, m, he).call(this);
      return;
    } else {
      const r = t.page === "graph" ? t.flow : void 0;
      if (!r || r === this.tab?.graph.url)
        return;
      let o;
      const a = setTimeout(() => {
        o = globalThis.crypto.randomUUID(), this.sca.controller.global.snackbars.snackbar(
          p.from("STATUS_GENERIC_LOADING"),
          K.PENDING,
          [],
          !0,
          o,
          !0
        );
      }, Ro);
      this.sca.controller.global.main.loadState = "Loading";
      const n = await this.sca.actions.board.load(r, {
        resultsFileId: t.page === "graph" ? t.results : void 0
      });
      if (clearTimeout(a), o && this.sca.controller.global.snackbars.unsnackbar(o), n.success)
        await S(this, m, he).call(this);
      else
        switch (this.logger.log(
          Wr(
            `Failed to load board: ${n.reason}`
          ),
          "Main Base"
        ), n.reason) {
          case "load-failed": {
            this.sca.controller.router.parsedUrl.page === "graph" ? this.sca.controller.global.main.show.add("MissingShare") : this.sca.controller.global.snackbars.snackbar(
              p.from("ERROR_UNABLE_TO_LOAD_PROJECT"),
              K.WARNING,
              [],
              !0,
              globalThis.crypto.randomUUID(),
              !0
            ), this.sca.controller.global.main.loadState = "Error", this.sca.controller.global.main.viewError = p.from(
              "ERROR_UNABLE_TO_LOAD_PROJECT"
            );
            break;
          }
          case "invalid-url":
            this.sca.controller.global.main.loadState = "Home";
            break;
        }
    }
};
Lt = async function(t) {
  const e = await this.flowGenerator.oneShot({ intent: t });
  if ("error" in e)
    throw new Error(e.error);
  return e.flow;
};
de = async function(t) {
  const e = await this.sca.actions.board.saveAs(t, {
    start: p.from("STATUS_CREATING_PROJECT"),
    end: p.from("STATUS_PROJECT_CREATED"),
    error: p.from("ERROR_UNABLE_TO_CREATE_PROJECT")
  });
  if (!(!e || !e.result || !e.url) && this.embedHandler) {
    const { url: r } = e;
    await this.sca.services.googleDriveBoardServer.flushSaveQueue(r.href), this.embedHandler.sendToEmbedder({
      type: "board_id_created",
      id: r.href
    });
  }
};
he = async function() {
  this.runtime.state.syncProjectState();
  const t = this.tab;
  if (S(this, m, jt).call(this), t) {
    const e = t.graph.url;
    if (e && this.sca.actions.run.prepare({
      graph: t.graph,
      url: e,
      settings: this.settings,
      fetchWithCreds: this.sca.services.fetchWithCreds,
      flags: this.sca.controller.global.flags,
      getProjectRunState: () => this.runtime.state.project?.run,
      connectToProject: (r, o) => {
        const a = this.runtime.state.project;
        a && a.connectHarnessRunner(r, o);
      }
    }), t.graph.url && t.graphIsMine) {
      const r = { url: t.graph.url };
      t.graph.title && (r.title = t.graph.title), this.sca.controller.home.recent.add(r);
    }
    this.sca.controller.global.main.loadState = "Loaded", this.runtime.select.refresh(
      t.id,
      v.createWorkspaceSelectionChangeId()
    );
  } else
    this.sca.controller.router.clearFlowParameters();
};
jt = function() {
  this.tab === null && (this.sca.controller.global.main.loadState = "Home"), this.sca.controller.global.main.loadState === "Home" && (S(this, m, Bt).call(this), this.sca.controller.global.snackbars.unsnackbar());
};
Bt = function() {
  this.sca.controller.global.main.show.delete("BoardEditModal"), this.sca.controller.global.main.show.delete("BetterOnDesktopModal"), this.sca.controller.global.main.show.delete("MissingShare"), this.sca.controller.global.main.show.delete("StatusUpdateModal"), this.sca.controller.global.main.show.delete("VideoModal");
};
Ft = function(t) {
  const e = t;
  !this.tooltipRef.value || !this.settings.getItem(
    $r.GENERAL,
    "Show Tooltips"
  )?.value || (this.tooltipRef.value.x = e.x, this.tooltipRef.value.y = e.y, this.tooltipRef.value.message = e.message, this.tooltipRef.value.status = e.extendedOptions.status, this.tooltipRef.value.visible = !0);
};
Jt = function() {
  this.tooltipRef.value && (this.tooltipRef.value.visible = !1);
};
qt = function(t) {
  return t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement || t instanceof HTMLCanvasElement || t instanceof HTMLElement && (t.contentEditable === "true" || t.contentEditable === "plaintext-only");
};
L = /* @__PURE__ */ new WeakMap();
Vt = async function(t) {
  if (C(this, L) || t.composedPath().some((o) => S(this, m, qt).call(this, o)))
    return;
  let e = t.key;
  if (e === "Meta" || e === "Ctrl" || e === "Shift")
    return;
  t.shiftKey && (e = `Shift+${e}`), t.metaKey && (e = `Cmd+${e}`), t.ctrlKey && (e = `Ctrl+${e}`);
  const r = {
    runtime: this.runtime,
    sca: this.sca,
    selectionState: this.selectionState,
    tab: this.tab,
    originalEvent: t,
    pointerLocation: this.lastPointerPosition,
    settings: this.settings,
    strings: p
  };
  for (const [o, a] of yo)
    if (o.includes(e) && a.willHandle(this.tab, t)) {
      t.preventDefault(), t.stopImmediatePropagation(), P(this, L, !0);
      let n;
      const s = () => {
        n = this.sca.controller.global.toasts.toast(
          a.messagePending ?? p.from("STATUS_GENERIC_WORKING"),
          $.PENDING,
          !0
        );
      };
      let i;
      a.alwaysNotify ? s() : i = setTimeout(
        s,
        a.messageTimeout ?? 500
      );
      try {
        this.sca.controller.global.main.blockingAction = !0, await a.do(r), this.sca.controller.global.main.blockingAction = !1, n && this.sca.controller.global.toasts.toast(
          a.messageComplete ?? p.from("STATUS_GENERIC_WORKING"),
          a.messageType ?? $.INFORMATION,
          !1,
          n
        );
      } catch (l) {
        const c = l;
        this.sca.controller.global.toasts.toast(
          c.message ?? p.from("ERROR_GENERIC"),
          $.ERROR,
          !1,
          n
        );
      } finally {
        i && clearTimeout(i), this.sca.controller.global.main.blockingAction = !1;
      }
      P(this, L, !1);
      break;
    }
};
E(d, 4, "globalConfig", Ht, _, be);
E(d, 4, "settingsHelper", Gt, _, fe);
E(d, 4, "flowGenerator", Nt, _, me);
E(d, 4, "googleDriveClient", Dt, _, ve);
E(d, 4, "embedState", Mt, _, we);
E(d, 4, "boardServer", Pt, _, ye);
E(d, 4, "opalShell", Ot, _, ke);
E(d, 4, "guestConfiguration", Ut, _, Se);
E(d, 4, "actionTracker", zt, _, _e);
E(d, 4, "sca", It, _, xe);
E(d, 4, "graphTopologyUpdateId", At, _, Ce);
E(d, 4, "tosStatus", Rt, _, Te);
Eo(d, _);
_.styles = Zr;
function Ao() {
  return localStorage.getItem(Kt) === "true";
}
function mt() {
  localStorage.setItem(Kt, "true");
}
export {
  _ as M,
  oe as e
};
