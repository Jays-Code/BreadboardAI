import { U as Kv, V as sl, W as Q, X as Lt, Y as Wu, Z as Bu, _ as se, $ as Et, a0 as qu, a1 as Ln, a2 as Zv, a3 as Xv, a4 as os, R as Ts, a5 as Hu, a6 as Pi, a7 as Qv, a8 as ew, a9 as il, aa as tw, ab as nw, A as rw, ac as sw, ad as iw, e as aw, ae as ow, af as lw, c as cw, o as dw, d as pw, t as uw, f as bp, h as hw, s as fw, ag as Vu, ah as Kn, ai as al, aj as Yu, ak as Ju, al as mw, am as gw, an as yw, ao as Ku, E as bw, ap as vw, aq as E, ar as Wn, as as We, at as S, au as ro, av as vp, aw as Mt, ax as ol, ay as Zu, az as ll, aA as ww, aB as xw, aC as ft, aD as Zn, aE as Bn, aF as Xu, aG as Qu, aH as eh, aI as _w, aJ as J, aK as Se, aL as B, aM as Ot, aN as qn, aO as ls, aP as rt, aQ as vn, aR as ce, aS as ca, aT as cs, aU as kw, aV as Sw, aW as th, aX as Iw, aY as nh, aZ as $w, a_ as Cw, a$ as Tw, b0 as Ew, b1 as Pw, b2 as P, b3 as I, b4 as Aw, b5 as Mw, b6 as Ow, b7 as Ea, b8 as jw, b9 as cl, ba as dl, bb as Rw, bc as rh, bd as pl, be as Dw, bf as Uw, bg as Nw, bh as Gw, bi as Fw, bj as zw, bk as Lw, bl as Ww, bm as so, bn as ds, G as Bw, bo as qw, N as ul, bp as hl, bq as fl, br as Hw, bs as Vw, bt as fn, bu as ps, bv as wp, bw as Yw, bx as Pa, by as io, bz as sh, bA as Jw, bB as Kw, bC as ke, bD as Zw, bE as Xw, bF as Qw, bG as ih, bH as xp, bI as _p, bJ as kp, bK as Sp, bL as us, bM as ex, bN as tx, bO as Ge, bP as nx, bQ as rx, bR as sx, bS as ix, bT as ax, bU as ox, bV as qi, bW as Fn, bX as br, bY as ah, bZ as lx, x as Ip, u as oh, b_ as cx, J as dx, b$ as cr, c0 as lh, c1 as ch, D as dh, c2 as ml, c3 as px, T as $p } from "./project-DMClisrJ.js";
import { a as ux, n as hx, e as fx, b as mx, i as gx, h as yx, t as bx, d as pi } from "./map-z4l6LcMf.js";
import { forSection as ph } from "./helper-EFXUwdnr.js";
import { z as uh, n as w, k, P as vx, l as nt, G as Xn, A as wx, D as ao, o as hs, E as hh, F as gl, H as Es, C as xx, s as oo, I as ui, g as wn, w as yn, i as Hi, a as Cp, J as hi, y as et, p as fh, m as Tp, u as mh, v as wt, K as yl, L as _x, q as Ep, M as kx, d as Sx } from "./logger-BR29-LuY.js";
import { c as Ix, a as $x } from "./action-tracker-BynkYfmK.js";
import { a as Zt, b as Xt, s as xt, S as Cx } from "./opal-shell-guest-CavlCYO8.js";
import { C as lo } from "./oauth-bA5gMzvn.js";
function Tx(n) {
  return n?.at(0)?.parts?.at(0)?.json;
}
class Ex {
  #e = [];
  #t = !1;
  /**
   * Adds a promise-returning function (task factory) to the queue.
   * The task will be executed only after all preceding tasks in the queue have completed.
   *
   * @template T The expected type of the result from the promise factory.
   * @param task A function that returns a Promise.
   * @returns A Promise that resolves or rejects with the result of the added task,
   * once it's executed.
   */
  add(e) {
    return new Promise((t, r) => {
      this.#e.push({ task: e, resolve: t, reject: r }), this.#n();
    });
  }
  async #n() {
    if (this.#t || this.#e.length === 0)
      return;
    this.#t = !0;
    const e = this.#e.shift();
    try {
      const t = await e.task();
      e.resolve(t);
    } catch (t) {
      e.reject(t);
    } finally {
      this.#t = !1, this.#n();
    }
  }
  get size() {
    return this.#e.length;
  }
  get processing() {
    return this.#t;
  }
}
const Px = [
  "title",
  "description",
  "format",
  "transient",
  "default",
  "minItems"
], Ax = ["behavior", "enum", "examples"];
class Pp {
  constructor(e, t) {
    this.existing = e, this.incoming = t, this.added = /* @__PURE__ */ new Set(), this.removed = /* @__PURE__ */ new Set(), this.updated = /* @__PURE__ */ new Set(), this.additionalPropsChanged = this.computeAdditionPropsChanged();
  }
  computeDiff() {
    this.computePropertyChanges(), this.computePropertyChanges();
  }
  same() {
    return this.added.size === 0 && this.removed.size === 0 && this.updated.size === 0 && this.additionalPropsChanged === !1;
  }
  diff() {
    return {
      additionalPropsChanged: this.additionalPropsChanged,
      added: this.added,
      removed: this.removed,
      updated: this.updated
    };
  }
  computeAdditionPropsChanged() {
    const e = !!this.incoming?.additionalProperties, t = !!this.existing?.additionalProperties;
    return e !== t;
  }
  computeRequiredChanges() {
    const e = this.existing?.required || [], t = this.incoming?.required || [], r = new Set(e);
    for (const i of t)
      r.has(i) || this.updated.add(i);
    const s = new Set(t);
    for (const i of e)
      s.has(i) || this.updated.add(i);
    return !1;
  }
  computePropertyChanges() {
    const e = this.existing?.properties || {}, t = this.incoming?.properties || {}, r = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
    for (const i of r) {
      if (!(i in e)) {
        this.added.add(i);
        continue;
      }
      if (!(i in t)) {
        this.removed.add(i);
        continue;
      }
      s(e[i], t[i]) && this.updated.add(i);
    }
    function s(i, a) {
      if (i.type !== a.type || Px.some((o) => i[o] !== a[o]) || Ax.some((o) => {
        const l = i[o] || [], c = a[o] || [];
        return l.length != c.length || !l.every((d) => c.includes(d));
      }) || (i.items || a.items) && (!i.items || !a.items || s(i.items, a.items)))
        return !0;
      if (i.properties || a.properties) {
        if (!i.properties || !a.properties)
          return !0;
        const o = /* @__PURE__ */ new Set([
          ...Object.keys(i.properties),
          ...Object.keys(a.properties)
        ]);
        for (const l in o)
          if (!(l in i.properties) || !(l in a.properties) || s(i.properties[l], a.properties[l]))
            return !0;
      }
      return !1;
    }
  }
}
class Vi {
  #e = null;
  #t = null;
  #n = !0;
  constructor(e) {
    this.args = e;
  }
  refresh() {
    this.#t = null, this.#n = !0, this.latest().catch(() => {
    });
  }
  updating() {
    return this.#n;
  }
  snapshot() {
    return {
      current: this.current(),
      latest: this.latest(),
      updating: this.#n
    };
  }
  current() {
    return this.#e || (this.#e = this.args.initial(), this.refresh()), this.#e;
  }
  async latest() {
    return this.#t ? this.#t : (this.#t = this.args.latest().then((e) => (this.args.willUpdate?.(this.current(), e), this.#e = e, this.#n = !1, this.args.updated?.(e), e)), this.#t);
  }
}
const Mx = (n) => {
  if (!n) return;
  const e = n.getSection(uh.INPUTS);
  if (!e) return;
  const t = Array.from(e.items.values());
  if (t.length)
    return Object.fromEntries(
      t.map((r) => [r.name, r.value])
    );
}, Ap = "builtin:";
class Ox {
  constructor(e, t) {
    this.context = e, this.#t = new Map(t);
  }
  #e = /* @__PURE__ */ new Map();
  #t;
  isBuiltIn(e) {
    return e?.startsWith(Ap);
  }
  builtInServers() {
    const e = [];
    return this.#t.forEach((t, r) => {
      const s = this.#n(r);
      w(s) && e.push(s.info);
    }), e;
  }
  #n(e) {
    let t = this.#e.get(e);
    if (!t) {
      const r = this.#t.get(e);
      if (!r)
        return k(`Unknown built-in server "${e}"`);
      t = r(this.context), this.#e.set(e, t);
    }
    return t;
  }
  get(e) {
    const t = e.slice(Ap.length);
    return this.#n(t);
  }
}
class jx {
  constructor(e) {
    this.args = e;
  }
  async connect() {
  }
  getServerVersion() {
    return {
      name: this.args.name,
      version: "0.0.1"
    };
  }
  async close() {
  }
  async #e(e, t = {}) {
    try {
      const r = new URL(e, this.args.proxyUrl);
      let s = {};
      const i = this.args.token;
      return i && (s = {
        headers: {
          Authorization: `Bearer ${i}`
        }
      }), (await this.args.fetchWithCreds(r, {
        method: "POST",
        body: JSON.stringify({
          mcpServerConfig: {
            streamableHttp: {
              url: this.args.url,
              ...s
            }
          },
          ...t
        })
      })).json();
    } catch (r) {
      return k(`Calling MCP proxy failed: ${r.message}`);
    }
  }
  async callTool(e) {
    const t = await this.#e(
      "/v1beta1/callMcpTool",
      {
        functionCall: {
          id: "id",
          name: e.name,
          args: e.arguments
        }
      }
    );
    if (!w(t))
      throw new Error(t.$error);
    return t;
  }
  async listTools() {
    const e = await this.#e(
      "/v1beta1/listMcpTools"
    );
    if (!w(e))
      throw new Error(e.$error);
    if (!e.functionDeclarations)
      throw new Error(`Invalid response: ${JSON.stringify(e)}`);
    return {
      tools: e.functionDeclarations.map((t) => ({
        ...t,
        inputSchema: t.parameters
      }))
    };
  }
}
const Rx = 1440 * 60 * 1e3;
class Dx {
  constructor(e, t, r, s) {
    this.clientCache = e, this.url = t, this.client = r, this.serverStore = s, e.set(t, this);
  }
  connect(e) {
    return this.client.connect(e);
  }
  getServerVersion() {
    return this.client.getServerVersion();
  }
  close() {
    return this.clientCache.delete(this.url), this.client.close();
  }
  callTool(e) {
    return this.client.callTool(e);
  }
  async listTools() {
    const e = await this.serverStore.get(this.url), t = !e || !e.tools, r = e?.toolsRetrievedOn && e.toolsRetrievedOn.getTime() + Rx < Date.now();
    if (t || r) {
      const s = await this.client.listTools(), i = await this.serverStore.updateTools(
        this.url,
        s.tools
      );
      return w(i) || console.warn(
        "Failed to update tools in server store",
        i.$error
      ), s;
    }
    return { tools: e.tools };
  }
}
class Ux {
  constructor(e, t, r) {
    this.context = t, this.proxyUrl = r, this.#t = new Ox(t, e), this.#n = Kv();
  }
  #e = /* @__PURE__ */ new Map();
  #t;
  #n;
  builtInServers() {
    return this.#t.builtInServers();
  }
  async createClient(e, t) {
    const r = this.#e.get(e);
    if (r)
      return r;
    const s = this.#t.isBuiltIn(e);
    try {
      if (s)
        return this.#t.get(e);
      if (this.proxyUrl) {
        const i = await this.#n.get(e);
        return new Dx(
          this.#e,
          e,
          new jx({
            name: i?.title || t.name,
            url: e,
            fetchWithCreds: this.context.fetchWithCreds,
            proxyUrl: this.proxyUrl,
            token: i?.authToken
          }),
          this.#n
        );
      } else
        return k("Unable to configure MCP Server: no MCP proxy specified");
    } catch (i) {
      return k(i.message);
    }
  }
}
function Nx(n) {
  const e = new Bu(n), t = new sl({
    name: "Google Calendar",
    url: "builtin:gcal"
  });
  t.addTool(
    "gcal_list_events",
    {
      title: "List events",
      description: "Get a list of Google Calendar events in the user's primary calendar based on specified parameters",
      annotations: {
        readOnlyHint: !0,
        idempotentHint: !0,
        openWorldHint: !0
      },
      inputSchema: {
        eventTypes: Q().describe(
          `Event types to return. Optional. This parameter can be repeated multiple times to return events of different types. If unset, returns all event types.

Acceptable values are:
"birthday": Special all-day events with an annual recurrence.
"default": Regular events.
"focusTime": Focus time events.
"fromGmail": Events from Gmail.
"outOfOffice": Out of office events.
"workingLocation": Working location events.`
        ).optional(),
        maxResults: Wu().describe(
          "Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query. Incomplete pages can be detected by a non-empty nextPageToken field in the response. By default the value is 250 events. The page size can never be larger than 2500 events. Optional."
        ).optional(),
        q: Q().describe(
          `Free text search terms to find events that match these terms in the following fields:
- summary
- description
- location
- attendee's displayName
- attendee's email
- organizer's displayName
- organizer's email
- workingLocationProperties.officeLocation.buildingId
- workingLocationProperties.officeLocation.deskId
- workingLocationProperties.officeLocation.label
- workingLocationProperties.customLocation.label

These search terms also match predefined keywords against all display title translations of working location, out-of-office, and focus-time events. For example, searching for "Office" or "Bureau" returns working location events of type officeLocation, whereas searching for "Out of office" or "Abwesend" returns out-of-office events. Optional.`
        ).optional(),
        showDeleted: Lt().describe(
          'Whether to include deleted events (with status equals "cancelled") in the result. Cancelled instances of recurring events (but not the underlying recurring event) will still be included if showDeleted and singleEvents are both False. If showDeleted and singleEvents are both True, only single instances of deleted events (but not the underlying recurring events) are returned. Optional. The default is False.'
        ).optional(),
        showHiddenInvitations: Lt().describe(
          "Whether to include hidden invitations in the result. Optional. The default is False."
        ).optional(),
        singleEvents: Lt().describe(
          "Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional. The default is False."
        ).optional(),
        timeMax: Q().describe(
          "Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin."
        ).optional(),
        timeMin: Q().describe(
          "Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax."
        ).optional(),
        updatedMin: Q().describe(
          "Lower bound for an event's last modification time (as a RFC3339 timestamp) to filter by. When specified, entries deleted since this time will always be included regardless of showDeleted. Optional. The default is not to filter by last modification time."
        ).optional()
      }
    },
    async ({
      maxResults: s,
      q: i,
      showDeleted: a,
      showHiddenInvitations: o,
      singleEvents: l,
      timeMin: c,
      timeMax: d,
      updatedMin: p
    }) => {
      const h = await e.calendarListEvents({
        calendarId: "primary",
        timeMin: c,
        maxResults: s,
        q: i,
        showDeleted: a,
        showHiddenInvitations: o,
        singleEvents: l,
        timeMax: d,
        updatedMin: p
      });
      if (!w(h))
        return se(h.$error);
      if (h.status !== 200)
        return se(
          `Failed to list Google Calendar events: ${h.statusText}`
        );
      const f = h.result?.items;
      return f ? Et(JSON.stringify(f)) : se("Invalid response from the calendar");
    }
  );
  const r = {
    summary: Q().describe("The title of the event"),
    end: Q().describe(
      "The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance. Value must be a combined date-time value (formatted according to RFC3339)."
    ),
    start: Q().describe(
      "The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance.Value must be a combined date-time value (formatted according to RFC3339)."
    ),
    status: Q().describe(`Status of the event. Optional. Possible values are:
- "confirmed" - The event is confirmed. This is the default status.
- "tentative" - The event is tentatively confirmed.
- "cancelled" - The event is cancelled (deleted).`),
    visibility: Q().describe(
      `Visibility of the event. Optional. Possible values are:
- "default" - Uses the default visibility for events on the calendar. This is the default value.
- "public" - The event is public and event details are visible to all readers of the calendar.
- "private" - The event is private and only event attendees may view event details.
- "confidential" - The event is private. This value is provided for compatibility reasons.`
    ).optional(),
    guestsCanModify: Lt().describe(
      "Whether attendees other than the organizer can invite others to the event. Optional. The default is True."
    ).optional(),
    attendees: qu(
      Ln({
        email: Q().describe(
          "The attendee's email address, if available. This field must be present when adding an attendee. It must be a valid email address as per RFC5322."
        ),
        optional: Q().describe(
          "Whether this is an optional attendee. Optional. The default is False."
        ).optional()
      })
    ).describe("The attendees of the event."),
    googleMeet: Lt().describe(
      "Whether or not to add a Google Meet link to the event. Optional, the default is False"
    ).optional(),
    description: Q().describe("Description of the event. Can contain HTML. Optional.").optional()
  };
  return t.addTool(
    "gcal_create_event",
    {
      title: "Create event",
      description: "Creates a Google Calendar event in the user's primary calendar.",
      annotations: {
        readOnlyHint: !1,
        destructiveHint: !1,
        idempotentHint: !1,
        openWorldHint: !0
      },
      inputSchema: r
    },
    async ({
      summary: s,
      start: i,
      end: a,
      status: o,
      visibility: l,
      attendees: c,
      googleMeet: d,
      description: p,
      guestsCanModify: h
    }) => {
      const f = Mp(d), u = await e.calendarInsertEvent(
        { calendarId: "primary", conferenceDataVersion: 1 },
        {
          summary: s,
          end: {
            dateTime: a,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          start: {
            dateTime: i,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          visibility: l,
          status: o,
          attendees: c,
          description: p,
          guestsCanModify: h,
          ...f,
          ...Op()
        }
      );
      return w(u) ? u.status !== 200 ? se(
        u.statusText || "Failed to add Google Calendar event"
      ) : Et("Success") : se(u.$error);
    }
  ), t.addTool(
    "gcal_update_event",
    {
      title: "Update event",
      description: "Makes an update to a Google Calendar event on user's primary calendar",
      annotations: {
        readOnlyHint: !1,
        destructiveHint: !0,
        idempotentHint: !1,
        openWorldHint: !0
      },
      inputSchema: {
        eventId: Q().describe("Event identifier"),
        ...r
      }
    },
    async ({
      eventId: s,
      summary: i,
      start: a,
      end: o,
      status: l,
      visibility: c,
      attendees: d,
      googleMeet: p,
      description: h,
      guestsCanModify: f
    }) => {
      const u = Mp(p), y = await e.calendarUpdateEvent(
        {
          eventId: s,
          calendarId: "primary",
          conferenceDataVersion: 1
        },
        {
          summary: i,
          end: {
            dateTime: o,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          start: {
            dateTime: a,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          visibility: c,
          status: l,
          attendees: d,
          description: h,
          guestsCanModify: f,
          ...u,
          ...Op()
        }
      );
      return w(y) ? y.status !== 200 ? se(
        y.statusText || "Failed to update Google Calendar event"
      ) : Et("Success") : se(y.$error);
    }
  ), t.addTool(
    "gcal_delete_event",
    {
      title: "Delete event",
      description: "Deletes specified Google Calendar event from the user's primary calendar",
      annotations: {
        readOnlyHint: !1,
        destructiveHint: !0,
        idempotentHint: !1,
        openWorldHint: !0
      },
      inputSchema: {
        eventId: Q().describe("Event identifier")
      }
    },
    async ({ eventId: s }) => {
      const i = await e.calendarDeleteEvent({
        calendarId: "primary",
        eventId: s
      });
      return w(i) ? i.status !== 204 ? se(
        i.statusText || "Unable to delete Google Calendar event"
      ) : Et("Success") : se(i.$error);
    }
  ), t;
}
function Mp(n) {
  return n ? {
    conferenceData: {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: {
          type: "hangoutsMeet"
        }
      }
    }
  } : {};
}
function Op() {
  return {
    extendedProperties: {
      shared: {
        modifiedBy: "opal"
      }
    }
  };
}
class Gx {
  constructor(e) {
    this.context = e;
  }
  async driveIdToFilePart(e, t, r, s) {
    const i = new URL(
      `/board/boards/@foo/bar/assets/drive/${e}`,
      window.location.href
    );
    s && i.searchParams.set("resourceKey", s), t && i.searchParams.set("mimeType", t), r && i.searchParams.set("returnStoredData", "true");
    try {
      const a = await this.context.fetchWithCreds(i, {
        method: "POST",
        credentials: "include"
      });
      if (!a.ok)
        return k("Failed to load the Drive file");
      const o = await a.json();
      return w(o) ? o.part : o;
    } catch (a) {
      return k(a.message);
    }
  }
}
function Fx(n) {
  const e = new Bu(n), t = new Gx(n), r = new sl({
    name: "Google Drive",
    url: "builtin:gdrive"
  });
  return r.addTool(
    "gdrive_find_in_drive",
    {
      title: "Find in Drive",
      description: `Lists or retrieves the user's files in Google Drive. This method accepts the q parameter, which is a search query combining one or more search terms.

This method returns all files by default, including trashed files. If you don't want trashed files to appear in the list, use the trashed=false to remove trashed files from the results.`,
      inputSchema: {
        corpora: Q().describe(
          `Bodies of items (files or documents) to which the query applies. Supported bodies are:

"user"
"domain"
"drive"
"allDrives"
Prefer "user" or "drive" to "allDrives" for efficiency. By default, corpora is set to "user". However, this can change depending on the filter set through the "q" parameter.`
        ).optional(),
        driveId: Q().describe(
          'ID of the shared drive to search. Use it when the "corporate" is set to "drive"'
        ).optional(),
        includeItemsFromAllDrives: Lt().describe(
          `Whether both My Drive and shared drive items should be included in results.

`
        ).optional(),
        pageSize: Wu().describe("The maximum number of files to return per page."),
        orderBy: Q().describe(
          `A comma-separated list of sort keys. Valid keys are:

createdTime: When the file was created.
folder: The folder ID. This field is sorted using alphabetical ordering.
modifiedByMeTime: The last time the file was modified by the user.
modifiedTime: The last time the file was modified by anyone.
name: The name of the file. This field is sorted using alphabetical ordering, so 1, 12, 2, 22.
name_natural: The name of the file. This field is sorted using natural sort ordering, so 1, 2, 12, 22.
quotaBytesUsed: The number of storage quota bytes used by the file.
recency: The most recent timestamp from the file's date-time fields.
sharedWithMeTime: When the file was shared with the user, if applicable.
starred: Whether the user has starred the file.
viewedByMeTime: The last time the file was viewed by the user.

Each key sorts ascending by default, but can be reversed with the desc modifier. Example usage: folder,modifiedTime desc,name.`
        ).optional(),
        q: Q().describe("A query for filtering the file results. The query has has three parts: `query_term operator values`.\n\n### Query Terms\nThese are the fields you can search on. Here are the most common ones:\n\n| Query Term     | Description                                                                                             |\n|----------------|---------------------------------------------------------------------------------------------------------|\n| `name`         | The name or title of the file.                                                                          |\n| `fullText`     | The file's content, name, description, and other metadata.                                              |\n| `mimeType`     | The type of the file. See the \"Common MIME Types\" section below.                                        |\n| `modifiedTime` | The last modification date. Must be in RFC 3339 format (e.g., `'2025-09-26T12:00:00'`).                  |\n| `trashed`      | A boolean (`true` or `false`) indicating if the file is in the trash.                                   |\n| `starred`      | A boolean (`true` or `false`) indicating if the file is starred.                                        |\n| `parents`      | The ID of the parent folder. Used with the `in` operator (e.g., `'folder_id' in parents`).               |\n| `owners`       | The email address of the file's owner. Used with the `in` operator (e.g., `'user@example.com' in owners`). |\n| `sharedWithMe` | A boolean (`true` or `false`). Useful for finding files in the \"Shared with me\" view.                   |\n| `writers`      | The email address of a user with write permission. Used with `in` (e.g., `'user@example.com' in writers`).|\n\n### Query Operators\nThese specify the condition for the query term.\n\n| Operator    | Usage                                                              |\n|-------------|--------------------------------------------------------------------|\n| `contains`  | Checks if a string value is present in the query term.             |\n| `=`         | Checks for an exact match.                                         |\n| `!=`        | Checks for non-match.                                              |\n| `>`, `<`, `>=`, `<=` | Compares date or numeric values.                                   |\n| `in`        | Checks if a value is in a collection (like `parents` or `owners`). |\n| `and`       | Combines multiple query terms; all must be true.                   |\n| `or`        | Combines multiple query terms; any can be true.                    |\n| `not`       | Negates a search query.                                            |\n\n### Common MIME Types\nUse these values with the `mimeType` query term to find specific file types.\n\n| MIME Type                                    | Description             |\n|----------------------------------------------|-------------------------|\n| `application/vnd.google-apps.folder`         | Google Drive Folder     |\n| `application/vnd.google-apps.document`       | Google Docs             |\n| `application/vnd.google-apps.spreadsheet`    | Google Sheets           |\n| `application/vnd.google-apps.presentation`   | Google Slides           |\n| `application/pdf`                            | PDF File                |\n| `image/jpeg`                                 | JPEG Image              |\n| `video/mp4`                                  | MP4 Video               |\n\nYou can also use partial matches like `mimeType contains 'image/'` to find all image types.\n\n---\n\n### Important Rules & Behavior\n\n1.  **Quoting:** String values, emails, and dates **must be enclosed in single quotes** (e.g., `name = 'My Report'`).\n2.  **Escaping Characters:** To search for a single quote `'` or a backslash `\\` in a name, you must escape it with a backslash. Example: `name = 'quinn\\'s paper\\essay'`.\n3.  **Operator `contains`:**\n    * For `name`, it performs **prefix matching only**. A search for `name contains 'hello'` will find \"helloworld.txt\" but not \"worldhello.txt\".\n    * For `fullText`, it matches **entire string tokens**. To match an exact phrase, enclose the phrase in double quotes inside the single quotes (e.g., `fullText contains '\"hello world\"'`).\n4.  **Combining Terms:** You can combine multiple terms with `and` or `or`. Use parentheses `()` to group logic. Example: `(mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/pdf') and trashed = false`.\n5.  **Negation:** The `not` operator applies to the term immediately following it. Example: `not name contains 'draft'`.\n\n---\n\n### Examples\n\n| Goal                                                               | Example `q` value                                                                                         |\n|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|\n| Find a file named \"Project Alpha Budget\"                           | `name = 'Project Alpha Budget'`                                                                           |\n| Find all Google Docs                                               | `mimeType = 'application/vnd.google-apps.document'`                                                       |\n| Find files containing the exact phrase \"meeting notes for Q3\"      | `fullText contains '\"meeting notes for Q3\"'`                                                              |\n| Find all non-folder files modified since September 1, 2025         | `modifiedTime > '2025-09-01T00:00:00' and mimeType != 'application/vnd.google-apps.folder'`               |\n| Find presentations that are not in the trash                       | `mimeType = 'application/vnd.google-apps.presentation' and trashed = false`                               |\n| Find files owned by 'ceo@example.com'                              | `'ceo@example.com' in owners`                                                                             |\n| Find files inside a folder with ID `123abcXYZ`                     | `'123abcXYZ' in parents`                                                                                  |\n| Find PDF or DOC files shared with me                               | `sharedWithMe = true and (mimeType = 'application/pdf' or mimeType = 'application/vnd.google-apps.document')` |\n            "),
        retrievalMode: Zv(["save", "include", "none"]).describe(
          `Optional. Controls how to handle the retrieving contents of the files.
  
  Use this parameter in conjunction with the "q" parameter. Three modes are available:
  - "save" -- retrieves and saves the contents of the files for later examination. Use this mode when the prompt instructs to only retrieve or load contents. This is the most common case.
  - "include" -- retrieves and includes the contents of the files alongside the response. Use this mode when the prompt includes instructions to do additional work with the contents of the files.
  - "none" -- default, does not retrieve or include contents of the files. Use this when the prompts only instructs to list the contents.

  Examples of prompts and modes inferred from prompts:

   - "Get the contents of documents owned by ..." -> retrievalMode = "save", because the prompt only asks to retrieve the contents.
   - "Load all documents ... and summarize their contents" -> retrievalMode = "include", because the prompts contains instructions for additional work ("summarize their contents")
   - "List all presentations that start with ... " -> retrievalMode = "none", because the prompt does not instruct to get the contents of the presentations.
   - "Get all documents ... and answer this question ... " -> retrievalMode = "include", because the prompt contains instructions for additional work ("answer this question ...")


  When retrievalMode = "save", inform the user that the contents of the files were saved.
  When retrievalMode = "include", continue on to perform the additional work.
  When retrievalMode = "none", show the user the list of the files.
 `
        ).optional()
      }
    },
    async ({
      corpora: s,
      driveId: i,
      pageSize: a,
      includeItemsFromAllDrives: o,
      orderBy: l,
      q: c,
      retrievalMode: d = "none"
    }) => {
      try {
        const p = await e.driveListFiles({
          corpora: s,
          driveId: i,
          pageSize: a,
          includeItemsFromAllDrives: o,
          orderBy: l,
          q: c
        });
        if (!w(p))
          return se(p.$error);
        if (p.status !== 200)
          return se(
            p.statusText || "Unable to list Google Drive files"
          );
        if (d !== "none" && p.result.files && p.result.files.length > 0) {
          let h = !1;
          const f = d === "save", u = (await Promise.all(
            p.result.files.map(async (y) => {
              if (f)
                return {
                  type: "resource_link",
                  name: y.name,
                  _meta: {
                    storedData: !0
                  },
                  uri: `drive:/${y.id}`,
                  mimeType: y.mimeType
                };
              {
                const v = await t.driveIdToFilePart(
                  y.id,
                  y.mimeType
                );
                if (!w(v)) {
                  h = !0;
                  return;
                }
                return "fileData" in v ? {
                  type: "resource_link",
                  name: y.name,
                  uri: v.fileData.fileUri,
                  mimeType: v.fileData.mimeType
                } : void 0;
              }
            })
          )).filter(Boolean);
          return u.length === 0 ? Et(JSON.stringify(p.result)) : { content: u, isError: h, saveOutputs: f };
        }
        return Et(JSON.stringify(p.result));
      } catch {
        return se("Unable to list Google Drive files");
      }
    }
  ), r.addTool(
    "gdrive_get_file",
    {
      title: "Get Drive file",
      description: "Loads the file from Google Drive",
      inputSchema: {
        fileId: Q().describe("The Drive ID of the file")
      }
    },
    async ({ fileId: s }) => {
      try {
        const i = await e.driveGetFile({
          fileId: s,
          fields: "mimeType,name"
        });
        if (!w(i))
          return se(i.$error);
        if (i.status !== 200)
          return se(
            i.statusText || "Unable to load file metadata from Google Drive"
          );
        const { mimeType: a, name: o } = i.result;
        if (!a || !o)
          return se(
            i.statusText || "Unable to load file metadata from Google Drive"
          );
        const l = await t.driveIdToFilePart(s, a);
        return w(l) ? Xv(
          o,
          l.fileData.fileUri,
          l.fileData.mimeType
        ) : se(l.$error);
      } catch {
        return se("Unable to load file from Google Drive");
      }
    }
  ), r;
}
const zx = ({ fileSystem: n }) => {
  const e = new sl({
    name: "File System",
    url: "builtin:filesystem"
  });
  return e.addTool(
    "filesystem_read_file",
    {
      title: "Read file",
      description: "Reads contents of a file",
      inputSchema: {
        path: Q().describe(
          "Path to the file in the virtual file system. Must be absolute path starting from the root"
        ),
        storeInBuffer: Lt().describe(
          `Optional. A flag that controls how to handle the retrieving contents of the files.
  
  When "true", retrieves and saves the contents of the files for later examination. Use "true" when the prompt instructs to only retrieve or load contents. This is the most common case.

  When "false", retrieves and includes the contents of the files alongside the response. Use this mode when the prompt includes instructions to do additional work with the contents of the files. This is the default value.

  Examples of prompts and modes inferred from prompts:

   - "Get the contents of file at /path/to/file -> storeInBuffer = "true", because the prompt only asks to retrieve the contents.
   - "Load file "/path/to/file" and summarize their contents" -> storeInBuffer = "false", because the prompts contains instructions for additional work ("summarize their contents")
   - "Load file ... and answer this question ... " -> storeInBuffer = "false", because the prompt contains instructions for additional work ("answer this question ...")
 `
        ).optional()
      }
    },
    async ({ path: t, storeInBuffer: r }) => {
      const s = Aa(t);
      if (!w(s))
        return se(s.$error);
      const i = await n.read({ path: s });
      if (!w(i))
        return se(i.$error);
      const a = i.data?.flatMap((o) => o.parts.map((l) => "text" in l ? l.text : null).filter(Boolean)).join(`

`);
      return a ? Et(a, r) : se("No text found in file");
    }
  ), e.addTool(
    "filesystem_append_text_to_file",
    {
      title: "Append text to file",
      description: "Appends text to an existing file. If a file does not exists, creates it first",
      inputSchema: {
        path: Q().describe(
          "Path to the file in the virtual file system. Must be absolute path starting from the root"
        ),
        text: Q().describe(
          "Text to write to the file. Unless otherwise specified, use markdown for formatting the text"
        )
      }
    },
    async ({ path: t, text: r }) => {
      const s = Aa(t);
      if (!w(s))
        return se(s.$error);
      const i = await n.write({
        path: s,
        append: !0,
        data: [
          {
            parts: [{ text: r }]
          }
        ]
      });
      return w(i) ? Et(`Successfully appended to "${t}"`) : se(i.$error);
    }
  ), e.addTool(
    "filesystem_delete_file",
    {
      title: "Delete file",
      description: "Deletes an existing file.",
      inputSchema: {
        path: Q().describe(
          "Path to the file in the virtual file system. Must be absolute path starting from the root"
        ),
        quiet: Lt().describe(
          'When set to "true", will not raise an error if the file does not exist. The default value is "false"'
        ).optional()
      }
    },
    async ({ path: t, quiet: r }) => {
      const s = Aa(t);
      if (!w(s))
        return se(s.$error);
      const i = await n.write({
        path: s,
        delete: !0
      });
      return !w(i) && !r ? se(i.$error) : Et(`Successfully deleted "${t}"`);
    }
  ), e;
};
function Aa(n) {
  return n.startsWith("/") ? `/local/${n.slice(1)}` : k(`Invalid path "${n}". All paths must start from the root`);
}
class Lx {
  constructor(e, t, r) {
    this.graphId = e, this.from = t, this.to = r;
  }
  async apply(e) {
    const t = this.graphId, r = e.mutable.graphs.get(t);
    if (!r)
      return {
        success: !1,
        error: `Unable to inspect graph with id "${t}"`
      };
    const s = r.nodeById(this.to);
    if (!s)
      return {
        success: !1,
        error: `Unable to find the "to" node by id "${this.to}"`
      };
    const i = [], a = os(
      this.to,
      s.configuration(),
      (c) => {
        const { path: d } = c;
        return d === this.from ? { ...c, invalid: !0 } : null;
      }
    );
    a !== null && i.push({
      type: "changeconfiguration",
      id: this.to,
      configuration: a,
      reset: !0,
      graphId: t
    });
    const o = r.nodeById(this.from);
    if (!o)
      return {
        success: !1,
        error: `Unable to find the "from" node by id "${this.from}"`
      };
    const l = os(
      this.from,
      o.configuration(),
      (c) => {
        const { path: d, type: p, instance: h } = c;
        return d === Ts && p === "tool" && h === this.to ? { ...c, invalid: !0 } : null;
      }
    );
    return l !== null && i.push({
      type: "changeconfiguration",
      id: this.from,
      configuration: l,
      reset: !0,
      graphId: t
    }), e.apply(i, `Marking "${this.from}" in port as invalid`);
  }
}
let Wx = class {
  constructor(e, t, r, s) {
    this.changeType = e, this.graphId = t, this.from = r, this.to = s;
  }
  async #e(e) {
    const { graphId: t, from: r } = this, { to: s } = r, i = e.mutable.graphs.get(t);
    if (!i)
      return {
        success: !1,
        error: `Unable to inspect graph with id "${t}"`
      };
    if (Hu(r, i.raw()))
      return {
        success: !1,
        error: "Unable to add edge: adding it will create a cycle."
      };
    const a = i.nodeById(this.from.from);
    if (!a)
      return { success: !1, error: `Unable to find node with id "${s}"` };
    let o = r.out;
    if (o === void 0)
      if (a.routes().length > 0)
        o = s;
      else {
        const $ = (await a.ports()).outputs.ports.find(
          (j) => j.schema.behavior?.includes("main-port")
        );
        $ && (o = $.name);
      }
    const l = os(
      a.descriptor.id,
      a.configuration(),
      (_) => {
        const { type: $, path: j, instance: A, invalid: R } = _;
        if ($ === "tool" && j === Ts && A === s && R) {
          const K = { ..._ };
          return delete K.invalid, K;
        }
        return null;
      }
    );
    l !== null && e.apply(
      [
        {
          type: "changeconfiguration",
          graphId: t,
          id: a.descriptor.id,
          configuration: l
        }
      ],
      "Updating routing chips in source"
    );
    const c = i.nodeById(s);
    if (!c)
      return { success: !1, error: `Unable to find node with id "${s}"` };
    const d = r.in, p = d !== void 0, h = [
      [
        {
          type: "addedge",
          edge: { ...r, out: o, in: d },
          graphId: t
        }
      ],
      `Add edge between ${r.from} and ${r.to}`
    ];
    if (!(await c.describe()).inputSchema.behavior?.includes("at-wireable"))
      return p ? e.apply(...h) : {
        success: !1,
        error: `Unable to add edge: in port was not supplied for ${r.to}`
      };
    if (c.incoming().length === 0 && (p || m(c)))
      return e.apply(...h);
    let y = !0, v = !0;
    const x = os(
      c.descriptor.id,
      c.configuration(),
      (_) => {
        const { type: $, path: j, invalid: A } = _;
        if ($ !== "in") return null;
        if (j === a.descriptor.id) {
          A || (y = !1);
          const R = { ..._ };
          return delete R.invalid, R;
        }
        return null;
      }
    );
    if (v = x === null || !y, x !== null) {
      const _ = await e.apply(
        [
          {
            type: "changeconfiguration",
            id: s,
            graphId: t,
            configuration: x
          }
        ],
        `Updating "@" references of node "${s}"`
      );
      if (!_.success)
        return _;
    }
    if (v) {
      const _ = b(c);
      if (!_)
        return {
          success: !1,
          error: `Unable to add edge: node "${c.title()}" does not have an LLM Content port`
        };
      const $ = a.title(), j = a.descriptor.id, A = Pi.part({ title: $, path: j, type: "in" });
      let R = _.value;
      R ? R = structuredClone(R) : R = { parts: [], role: "user" };
      const K = R.parts.find((ne) => "text" in ne);
      K ? K.text += ` ${A}` : R.parts.push({ text: A });
      const V = {
        [_.name]: R
      }, L = await e.apply(
        [{ type: "changeconfiguration", id: s, graphId: t, configuration: V }],
        `Adding "@" reference to port "${_.name}" of node "${s}"`
      );
      if (!L.success)
        return L;
    }
    if (!y) return { success: !0 };
    return e.apply(
      [
        {
          type: "addedge",
          edge: { ...r, out: o, in: g(r) },
          graphId: t
        }
      ],
      `Add "@" edge between ${r.from} and ${r.to}`
    );
    function m(_) {
      const $ = _.currentPorts().inputs.ports.find((j) => j.name === r.in);
      return $ && $.schema.behavior?.includes("main-port");
    }
    function b(_) {
      return _.currentPorts().inputs.ports.find(
        ($) => $.schema.behavior?.includes("llm-content") && $.schema.behavior?.includes("config") && // Avoid wiring into system instruction and such.
        !$.schema.behavior?.includes("hint-advanced")
      );
    }
    function g(_) {
      return `p-z-${_.from}`;
    }
  }
  async apply(e) {
    let t;
    switch (this.changeType) {
      case "add":
        return this.#e(e);
      case "remove": {
        const { graphId: r, from: s } = this;
        return t = await e.apply(
          [{ type: "removeedge", edge: s, graphId: r }],
          `Remove edge between ${s.from} and ${s.to}`
        ), t.success ? new Lx(r, s.to, s.from).apply(
          e
        ) : t;
      }
      case "move": {
        const { graphId: r, from: s, to: i } = this;
        if (!i)
          return {
            success: !1,
            error: "Unable to move edge - no `to` provided"
          };
        t = await e.apply(
          [
            {
              type: "changeedge",
              from: s,
              to: i,
              graphId: r
            }
          ],
          `Change edge from between ${s.from} and ${s.to} to ${i.from} and ${i.to}`
        );
        break;
      }
    }
    return t;
  }
};
function Bx(n) {
  const e = /* @__PURE__ */ new Set();
  return n.filter((t) => {
    const r = vr(t);
    return e.has(r) ? !1 : (e.add(r), !0);
  });
}
function qx(n, e) {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  n.forEach((a) => {
    t.set(vr(a), a);
  }), e.forEach((a) => {
    r.set(vr(a), a);
  });
  const s = [], i = [];
  return n.forEach((a) => {
    const o = vr(a);
    r.has(o) || s.push(a);
  }), e.forEach((a) => {
    const o = vr(a);
    t.has(o) || i.push(a);
  }), { toInsert: i, toDelete: s };
}
function vr({ metadata: n, ...e }) {
  return JSON.stringify(e);
}
class gh {
  constructor(e, t, r, s = !1) {
    this.id = e, this.graphId = t, this.ports = r, this.updateOnly = s;
  }
  async apply(e) {
    const t = this.ports, r = this.graphId, s = this.id, i = e.mutable.graphs.get(r);
    if (!i)
      return {
        success: !1,
        error: `Unable to inspect graph with id "${r}"`
      };
    const a = i.nodeById(s);
    if (!a)
      return { success: !1, error: `Unable to find node with id "${s}"` };
    const o = [], l = Bx(
      t.map((h) => {
        const f = a.descriptor.id, u = Hx(
          i.nodeById(h.path),
          f
        );
        return u ? {
          from: h.path,
          to: f,
          out: u,
          in: `p-z-${h.path}`
        } : (o.push(h.path), null);
      }).filter(Boolean)
    );
    console.log("AUTOWIRES INVALID REFS", o), console.group("UPDATE AUTOWIRES"), console.log("Icoming:"), console.table(l);
    const c = a.currentPorts().inputs.ports.filter(
      (h) => !h.star && h.status == vx.Connected && h.name.startsWith("p-z-")
    ).flatMap((h) => h.edges?.map((f) => f.raw()) || []);
    console.log("Current:"), console.table(c);
    const d = qx(c, l);
    console.log("Insert:"), console.table(d.toInsert), console.log("Delete:"), console.table(d.toDelete), console.groupEnd();
    const p = [];
    if (d.toInsert.forEach((h) => {
      if (Hu(h, i.raw())) {
        o.push(h.from);
        return;
      }
      p.push({ type: "addedge", edge: h, graphId: r });
    }), this.updateOnly || d.toDelete.forEach((h) => {
      p.push({
        type: "removeedge",
        edge: h,
        graphId: r
      });
    }), o.length > 0) {
      const h = a.descriptor.id, f = os(
        h,
        a.configuration(),
        (u) => u.type !== "in" ? null : o.includes(u.path) ? { ...u, invalid: !0 } : null
      );
      f !== null && p.push({
        type: "changeconfiguration",
        configuration: f,
        graphId: r,
        id: h
      });
    }
    return e.apply(p, "Autowiring incoming ports");
  }
}
function Hx(n, e) {
  if (!n) return;
  if (n.routes().length > 0)
    return e;
  const t = n.currentPorts().outputs.ports, r = t.find(
    (s) => s.schema.behavior?.includes("main-port")
  );
  return r ? r.name : t.find((s) => !s.star && !s.name.startsWith("$"))?.name;
}
const fi = {
  success: !1,
  error: "Unable to change asset"
};
class Vx {
  constructor(e, t, r) {
    this.changeType = e, this.graphId = t, this.edge = r;
  }
  async apply(e) {
    const t = e.mutable.graphs.get(this.graphId);
    if (!t)
      return fi;
    const r = t.nodeById(this.edge.nodeId);
    if (!r)
      return { success: !0 };
    const s = (await r.ports()).inputs.ports.find(
      (c) => Qv(c.schema) && ew(c.schema)
    );
    if (!s)
      return fi;
    const i = t.assets().get(this.edge.assetPath);
    if (!i)
      return fi;
    const a = { ...r?.configuration() ?? {} };
    let o = a[s.name], l = null;
    if (o) {
      const c = o.parts.find(
        (d) => il(d)
      );
      if (!c)
        return fi;
      l = c;
    } else {
      const c = [{ text: "" }], d = { role: "user", parts: c };
      l = c[0], o = d, a[s.name] = o;
    }
    switch (this.changeType) {
      case "add": {
        const c = `${Pi.preamble({
          title: this.edge.assetPath,
          path: this.edge.assetPath,
          type: "asset",
          mimeType: nw(i.data)
        })}${tw(i.title)}${Pi.postamble()}`;
        l.text += ` ${c} `;
        break;
      }
      case "remove": {
        const c = new Pi(l.text);
        c.substitute((d) => d.path === this.edge.assetPath ? "" : `{${JSON.stringify(d)}}`), l.text = c.renderable;
        break;
      }
    }
    return e.apply(
      [
        {
          type: "changeconfiguration",
          configuration: a,
          graphId: this.graphId,
          id: this.edge.nodeId
        }
      ],
      "Add asset"
    );
  }
}
class Yx {
  constructor(e, t, r, s) {
    this.graphId = e, this.edge = t, this.which = r, this.attachmentPoint = s;
  }
  async apply(e) {
    const t = this.edge.metadata ?? {};
    t.visual ??= {};
    const r = t.visual;
    r[this.which] = this.attachmentPoint;
    const s = [
      {
        type: "changeedgemetadata",
        graphId: this.graphId,
        edge: this.edge,
        metadata: t
      }
    ];
    return e.apply(
      s,
      `Change attachment point (${this.which}) to ${this.attachmentPoint}`
    );
  }
}
class Jx {
  constructor(e, t, r) {
    this.graphId = e, this.nodeId = t, this.title = r;
  }
  async apply(e) {
    const t = this.graphId;
    return new rw(
      t,
      (r) => {
        const { type: s, path: i, instance: a } = r;
        return s === "in" && i === this.nodeId ? { type: s, path: i, title: this.title } : s === "tool" && i === Ts && a === this.nodeId ? { ...r, title: this.title } : null;
      },
      "Updating Node Titles in @-references.",
      (r) => new gh(
        r,
        t,
        [{ path: this.nodeId, title: this.title }],
        !0
      )
    ).apply(e);
  }
}
class Kx {
  constructor(e) {
    this.graphId = e;
  }
  async apply(e) {
    const t = this.graphId;
    if (t)
      return { success: !0 };
    const r = e.mutable.graphs.get(t);
    if (!r)
      return {
        success: !1,
        error: `Unable to inspect graph with id "${t}"`
      };
    const s = [];
    for (const d of r.nodes()) {
      const p = d.descriptor.id;
      sw(d.configuration(), (h) => {
        h.type === "param" && s.push({
          part: h,
          id: p
        });
      });
    }
    const i = r.metadata() || {}, a = new Map(Object.entries(i.parameters || {})), o = new Set(a.keys()), l = /* @__PURE__ */ new Map();
    for (const { id: d, part: p } of s) {
      const h = p.path;
      o.has(h) && o.delete(h);
      let f = l.get(h);
      if (f)
        f.usedIn.push(d);
      else {
        const u = a.get(h);
        u ? f = { ...u, usedIn: [d] } : f = { title: p.title, usedIn: [d] }, l.set(h, f);
      }
    }
    for (const d of o) {
      const p = a.get(d);
      p && l.set(d, { ...p, usedIn: [] });
    }
    const c = await e.apply(
      [
        {
          type: "changegraphmetadata",
          graphId: t,
          metadata: {
            ...i,
            parameters: Object.fromEntries(l.entries())
          }
        }
      ],
      "Updating graph parameter metadata"
    );
    return c.success ? { success: !0 } : c;
  }
}
class Zx {
  constructor(e, t) {
    this.id = e, this.graphId = t;
  }
  async apply(e) {
    const { graphId: t, id: r } = this, s = e.mutable.graphs.get(t);
    if (!s)
      return {
        success: !1,
        error: `Unable to find graph with id "${t}"`
      };
    const i = s.nodeById(r);
    if (!i)
      return { success: !1, error: `Unable to find node with id "${r}"` };
    const a = i.outgoing(), o = [];
    for (const l of a) {
      const c = l.raw();
      if (c.out === "context") continue;
      const d = {
        ...c,
        out: "context"
      };
      o.push({
        type: "changeedge",
        from: c,
        to: d,
        graphId: t
      });
    }
    return e.apply(o, `Change edges to broadcast mode for "${r}"`);
  }
}
class Xx {
  constructor(e, t) {
    this.id = e, this.graphId = t;
  }
  async apply(e) {
    const { graphId: t, id: r } = this, s = e.mutable.graphs.get(t);
    if (!s)
      return {
        success: !1,
        error: `Unable to find graph with id "${t}"`
      };
    const i = s.nodeById(r);
    if (!i)
      return { success: !1, error: `Unable to find node with id "${r}"` };
    const a = i.outgoing(), o = [];
    for (const l of a) {
      const c = l.raw(), d = l.to.descriptor.id;
      if (c.out === d) continue;
      const p = {
        ...c,
        out: d
      };
      o.push({
        type: "changeedge",
        from: c,
        to: p,
        graphId: t
      });
    }
    return e.apply(o, `Change edges to broadcast mode for "${r}"`);
  }
}
class yh {
  constructor(e, t, r, s, i) {
    this.id = e, this.graphId = t, this.configuration = r, this.metadata = s, this.portsToAutowire = i, this.titleUserModified = !1;
  }
  async apply(e) {
    const { graphId: t, id: r, configuration: s, metadata: i, portsToAutowire: a } = this, o = e.mutable.graphs.get(t);
    if (!o)
      return {
        success: !1,
        error: `Unable to inspect graph with id "${t}"`
      };
    const l = o.nodeById(r);
    if (!l)
      return { success: !1, error: `Unable to find node with id "${r}"` };
    const c = [];
    let d = null;
    if (s) {
      const y = iw(s), v = l.routes();
      y.length === 0 && v.length > 0 ? (console.log("MODE CHANGE: Routing -> Broadcast"), d = new Zx(r, t)) : y.length > 0 && v.length === 0 && (console.log("MODE CHANGE: Broadcast -> Routing"), d = new Xx(r, t));
      const x = l?.descriptor.configuration ?? {}, m = structuredClone(x);
      for (const [b, g] of Object.entries(s)) {
        if (g == null) {
          delete m[b];
          continue;
        }
        m[b] = g;
      }
      c.push({
        type: "changeconfiguration",
        id: r,
        configuration: m,
        reset: !0,
        graphId: t
      });
    }
    let p = !1;
    const h = l?.metadata() || {};
    if (this.titleUserModified = !!h.userModified, i) {
      i.title && (i.userModified || h.title !== i.title) && (p = !0), p && (this.titleUserModified = !0);
      const y = {
        ...h,
        ...i,
        userModified: this.titleUserModified
      };
      c.push({
        type: "changemetadata",
        id: r,
        metadata: y,
        graphId: t
      });
    }
    const f = await e.apply(
      c,
      `Change partial configuration for "${r}"`
    );
    if (!f.success) return f;
    if (d) {
      const y = await d.apply(e);
      if (!y.success) return y;
    }
    if (a) {
      const y = await new gh(
        r,
        t,
        a
      ).apply(e);
      if (!y.success) return y;
    }
    const u = await new Kx(
      t
    ).apply(e);
    return u.success ? p ? new Jx(this.graphId, r, i.title).apply(
      e
    ) : { success: !0 } : u;
  }
}
var Qx = Object.create, bl = Object.defineProperty, e_ = Object.getOwnPropertyDescriptor, bh = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Qn = (n) => {
  throw TypeError(n);
}, t_ = (n, e, t) => e in n ? bl(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, jp = (n, e) => bl(n, "name", { value: e, configurable: !0 }), n_ = (n) => [, , , Qx(n?.[bh("metadata")] ?? null)], vh = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], wr = (n) => n !== void 0 && typeof n != "function" ? Qn("Function expected") : n, r_ = (n, e, t, r, s) => ({ kind: vh[n], name: e, metadata: r, addInitializer: (i) => t._ ? Qn("Already initialized") : s.push(wr(i || null)) }), s_ = (n, e) => t_(e, bh("metadata"), n[3]), He = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, _n = (n, e, t, r, s, i) => {
  var a, o, l, c, d, p = e & 7, h = !!(e & 8), f = !!(e & 16), u = p > 3 ? n.length + 1 : p ? h ? 1 : 2 : 0, y = vh[p + 5], v = p > 3 && (n[u - 1] = []), x = n[u] || (n[u] = []), m = p && (!f && !h && (s = s.prototype), p < 5 && (p > 3 || !f) && e_(p < 4 ? s : { get [t]() {
    return tt(this, i);
  }, set [t](g) {
    return Rp(this, i, g);
  } }, t));
  p ? f && p < 4 && jp(i, (p > 2 ? "set " : p > 1 ? "get " : "") + t) : jp(s, t);
  for (var b = r.length - 1; b >= 0; b--)
    c = r_(p, t, l = {}, n[3], x), p && (c.static = h, c.private = f, d = c.access = { has: f ? (g) => i_(s, g) : (g) => t in g }, p ^ 3 && (d.get = f ? (g) => (p ^ 1 ? tt : zn)(g, s, p ^ 4 ? i : m.get) : (g) => g[t]), p > 2 && (d.set = f ? (g, _) => Rp(g, s, _, p ^ 4 ? i : m.set) : (g, _) => g[t] = _)), o = (0, r[b])(p ? p < 4 ? f ? i : m[y] : p > 4 ? void 0 : { get: m.get, set: m.set } : s, c), l._ = 1, p ^ 4 || o === void 0 ? wr(o) && (p > 4 ? v.unshift(o) : p ? f ? i = o : m[y] = o : s = o) : typeof o != "object" || o === null ? Qn("Object expected") : (wr(a = o.get) && (m.get = a), wr(a = o.set) && (m.set = a), wr(a = o.init) && v.unshift(a));
  return p || s_(n, s), m && bl(s, t, m), f ? p ^ 4 ? i : m : s;
}, vl = (n, e, t) => e.has(n) || Qn("Cannot " + t), i_ = (n, e) => Object(e) !== e ? Qn('Cannot use the "in" operator on this value') : n.has(e), tt = (n, e, t) => (vl(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Rt = (n, e, t) => e.has(n) ? Qn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), Rp = (n, e, t, r) => (vl(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t), zn = (n, e, t) => (vl(n, e, "access private method"), t), wh, xh, _h, kh, Sh, Ih, co, $h, de, wl, xl, _l, kl, Sl, Il, Hn, Ve, Ai, Ch, Th, Eh, Ph, Ah, Mh, Oh, jh;
const Dp = ph("Editor");
$h = [bx("bb-editor-input-lite")];
class _t extends (co = aw(ux), Ih = [bp({ context: hw })], Sh = [bp({ context: fw })], kh = [pi({ type: Boolean, reflect: !0 })], _h = [pi({ reflect: !0, type: Boolean })], xh = [pi()], wh = [pi({ reflect: !0, type: Boolean })], co) {
  constructor() {
    super(...arguments), Rt(this, Ve), Rt(this, wl, He(de, 8, this)), He(de, 11, this), Rt(this, xl, He(de, 12, this)), He(de, 15, this), Rt(this, _l, He(de, 16, this, !1)), He(de, 19, this), Rt(this, kl, He(de, 20, this, !1)), He(de, 23, this), Rt(this, Sl, He(de, 24, this)), He(de, 27, this), Rt(this, Il, He(de, 28, this, !1)), He(de, 31, this), Rt(this, Hn, yx());
  }
  render() {
    const e = {
      "g-icon": !0,
      "filled-heavy": !0,
      round: !0,
      rotate: tt(this, Ve, Ai)
    };
    return mx`
      <div id="container">
        <bb-expanding-textarea
          ${hx(tt(this, Hn))}
          .disabled=${tt(this, Ve, Ai) || !this.editable}
          .classes=${"sans-flex w-400 md-body-large"}
          .orientation=${"vertical"}
          .value=${tt(this, Ve, Ch)}
          .placeholder=${tt(this, Ve, Th) ? Dp.from("COMMAND_DESCRIBE_FRESH_FLOW_ALT") : Dp.from("COMMAND_DESCRIBE_EDIT_FLOW")}
          @change=${zn(this, Ve, Ph)}
          @focus=${zn(this, Ve, Oh)}
          @blur=${zn(this, Ve, jh)}
          ><span class=${fx(e)} slot="submit"
            >${tt(this, Ve, Ai) ? "progress_activity" : "send"}</span
          ></bb-expanding-textarea
        >
      </div>
    `;
  }
}
de = n_(co);
wl = /* @__PURE__ */ new WeakMap();
xl = /* @__PURE__ */ new WeakMap();
_l = /* @__PURE__ */ new WeakMap();
kl = /* @__PURE__ */ new WeakMap();
Sl = /* @__PURE__ */ new WeakMap();
Il = /* @__PURE__ */ new WeakMap();
Hn = /* @__PURE__ */ new WeakMap();
Ve = /* @__PURE__ */ new WeakSet();
Ai = function() {
  return this.sca.controller.global.flowgenInput.state.status === "generating";
};
Ch = function() {
  return this.sca.controller.global.flowgenInput.currentExampleIntent;
};
Th = function() {
  return this.sca.controller.editor.graph.empty;
};
Eh = function() {
  return this.sca.controller.editor.graph.url ?? void 0;
};
Ph = async function() {
  const n = tt(this, Hn).value;
  if (!n)
    return;
  const e = n?.value;
  if (!e) return;
  this.actionTracker?.flowGenEdit(tt(this, Ve, Eh)), this.sca.controller.global.flowgenInput.startGenerating();
  const t = await this.controller?.generate(e);
  t && "error" in t ? zn(this, Ve, Ah).call(this, t.error, t.suggestedIntent) : zn(this, Ve, Mh).call(this), this.sca.controller.global.flowgenInput.finishGenerating();
};
Ah = function(n, e) {
  n.length !== 0 && (console.error("Error generating board", n), console.error("Suggested intent", e), this.sca.controller.global.flowgenInput.state = {
    status: "error",
    error: n,
    suggestedIntent: e
  }, this.dispatchEvent(
    new ow(
      globalThis.crypto.randomUUID(),
      n,
      nt.INFORMATION,
      [
        {
          action: "copy",
          title: "Copy Prompt",
          value: e,
          callback: async () => {
            e && (await navigator.clipboard.writeText(e), this.dispatchEvent(new lw()));
          }
        }
      ],
      !0,
      !0
    )
  ));
};
Mh = function() {
  tt(this, Hn).value && (tt(this, Hn).value.value = "");
};
Oh = function() {
  this.focused = !0;
};
jh = function() {
  this.focused = !1;
};
_n(de, 4, "actionTracker", Ih, _t, wl);
_n(de, 4, "sca", Sh, _t, xl);
_n(de, 4, "focused", kh, _t, _l);
_n(de, 4, "highlighted", _h, _t, kl);
_n(de, 4, "controller", xh, _t, Sl);
_n(de, 4, "editable", wh, _t, Il);
_t = _n(de, 0, "EditorInputLite", $h, _t);
_t.styles = [
  cw,
  dw,
  pw,
  uw,
  gx`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        border-radius: var(--bb-grid-size-6);
      }

      #container {
        display: flex;
        flex-direction: column;
        position: relative;

        & bb-expanding-textarea {
          --min-lines: 1;
          --max-lines: 4;
          --padding: var(--bb-grid-size-3);
          --border-color: var(--sys-color--outline-variant);
          --border-radius: var(--bb-grid-size-6);
          --background-color: var(--sys-color--body-background);
          color: var(--sys-color--on-surface);

          &:focus-within {
            outline: 1px solid var(--light-dark-n-70);
          }

          &[disabled] {
            opacity: 0.3;
          }
        }
      }

      .rotate {
        animation: rotate 1s linear infinite;
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
He(de, 1, _t);
const QR = "Main board";
function eD(n) {
  return n.behavior?.includes("board") ?? !1;
}
function tD(n) {
  return n.type !== "array" || !n.items || Array.isArray(n.items) || !n.items.behavior ? !1 : n.items.behavior?.includes("board") ?? !1;
}
function a_(n) {
  const e = n.out === "*" ? "*" : n.in;
  return `${n.from}:${n.out}->${n.to}:${e}`;
}
function nD(n) {
  return a_(n.raw());
}
function rD() {
  return {
    graphs: /* @__PURE__ */ new Map(),
    modules: /* @__PURE__ */ new Set()
  };
}
function sD() {
  return {
    nodes: /* @__PURE__ */ new Set(),
    assets: /* @__PURE__ */ new Set(),
    assetEdges: /* @__PURE__ */ new Set(),
    comments: /* @__PURE__ */ new Set(),
    edges: /* @__PURE__ */ new Set(),
    references: /* @__PURE__ */ new Set()
  };
}
function o_(n) {
  if (n.metadata?.visual?.presentation?.themes && n.metadata?.visual?.presentation?.theme)
    return;
  if (!n.metadata?.visual?.presentation?.themeColors) {
    n.metadata ??= {}, n.metadata.visual ??= {}, n.metadata.visual.presentation ??= {}, n.metadata.visual.presentation.themes ??= {};
    const o = {
      themeColors: {
        primaryColor: "#1a1a1a",
        secondaryColor: "#7a7a7a",
        backgroundColor: "#ffffff",
        textColor: "#1a1a1a",
        primaryTextColor: "#ffffff"
      },
      template: "basic",
      isDefaultTheme: !0,
      palette: Vu("#a5a5a5")
    }, l = globalThis.crypto.randomUUID();
    n.metadata.visual.presentation.themes[l] = o, n.metadata.visual.presentation.theme = l;
    return;
  }
  const { themeColors: e, template: t, templateAdditionalOptions: r } = n.metadata.visual.presentation, s = {
    themeColors: e,
    templateAdditionalOptions: r,
    template: t
  }, i = n.assets?.["@@splash"];
  Kn(i?.data) && al(i.data[0]?.parts[0]) && (s.splashScreen = i.data[0].parts[0]), n.metadata.visual.presentation.themes ??= {};
  const a = globalThis.crypto.randomUUID();
  n.metadata.visual.presentation.themes[a] = s, n.metadata.visual.presentation.theme = a, delete n.metadata.visual.presentation.template, delete n.metadata.visual.presentation.templateAdditionalOptions, delete n.metadata.visual.presentation.themeColors;
}
async function l_(n, e) {
  const t = n.metadata?.visual?.presentation?.theme;
  if (!t)
    return;
  const r = n.metadata?.visual?.presentation?.themes?.[t];
  if (!r || !r.splashScreen || r.palette)
    return;
  let s;
  const { handle: i } = r.splashScreen.storedData, a = /^[./]*blobs\/(.+)/, o = i.match(a);
  if (o) {
    const p = o[1];
    p && (s = new URL(`/board/blobs/${p}`, window.location.href));
  } else if (i.startsWith("data:") || i.startsWith("http:") || i.startsWith("https:"))
    s = new URL(i);
  else if (i.startsWith("drive:")) {
    if (!e)
      return;
    s = new URL(i);
  }
  if (!s)
    return;
  console.warn("[Runtime] Generated theme dynamically"), console.warn("[Runtime] Please regenerate the theme for this app");
  const l = await Yu(e, s.href);
  if (!l) return;
  const c = new Image();
  c.src = l, c.crossOrigin = "anonymous";
  const d = await Ju(c);
  d && (r.palette = d);
}
const Vn = "Main board";
function fs(n) {
  const e = n.out === "*" ? "*" : n.in;
  return `${n.from}:${n.out}->${n.to}:${e}`;
}
function Rh(n) {
  return fs(n.raw());
}
function ms() {
  return globalThis.crypto.randomUUID();
}
function c_() {
  return globalThis.crypto.randomUUID();
}
function d_() {
  return globalThis.crypto.randomUUID();
}
function p_() {
  return globalThis.crypto.randomUUID();
}
function Dh() {
  return {
    graphs: /* @__PURE__ */ new Map(),
    modules: /* @__PURE__ */ new Set()
  };
}
function es() {
  return {
    nodes: /* @__PURE__ */ new Set(),
    assets: /* @__PURE__ */ new Set(),
    assetEdges: /* @__PURE__ */ new Set(),
    comments: /* @__PURE__ */ new Set(),
    edges: /* @__PURE__ */ new Set(),
    references: /* @__PURE__ */ new Set()
  };
}
function u_(n, e) {
  const t = structuredClone(e.raw()), r = (i, a) => {
    i.nodes = i.nodes.filter(
      (o) => a.nodes.has(o.id)
    ), i.edges = i.edges.filter(
      (o) => a.edges.has(fs(o)) && a.nodes.has(o.from) && a.nodes.has(o.to)
    ), i.metadata && i.metadata.comments && (i.metadata.comments = i.metadata.comments.filter(
      (o) => a.comments.has(o.id)
    )), delete i.assets, delete i.exports, delete i.metadata?.visual;
  }, s = t.graphs ?? {};
  for (const i of Object.keys(s))
    n.graphs.has(i) || delete s[i];
  n.graphs.has(Vn) || r(t, es());
  for (const [i, a] of n.graphs)
    if (i === Vn)
      r(t, a);
    else {
      if (!t.graphs)
        continue;
      r(t.graphs[i], a);
    }
  return t;
}
function h_(n, e) {
  const t = (s, i, a) => {
    i === Vn && (i = "");
    const o = [];
    for (const c of s.edges) {
      const d = a.edges().find((p) => Rh(p) === c);
      d && o.push({ type: "removeedge", graphId: i, edge: d.raw() });
    }
    const l = [];
    for (const c of s.references) {
      const [d, p, h] = c.split("|");
      if (!d || !p || !h)
        continue;
      const f = Number.parseInt(h);
      if (Number.isNaN(f)) {
        console.warn(`Unexpected index in references: '${h}'`);
        continue;
      }
      l.push(f);
    }
    for (const c of s.references) {
      const [d, p, h] = c.split("|");
      if (!d || !p || !h)
        continue;
      const f = Number.parseInt(h);
      if (Number.isNaN(f)) {
        console.warn(`Unexpected index in references: '${h}'`);
        continue;
      }
      const u = a.nodeById(d)?.configuration();
      if (!u)
        continue;
      const y = structuredClone(u);
      y[p] && (Array.isArray(y[p]) ? y[p] = y[p].filter((v, x) => !l.includes(x)) : delete y[p], o.push({
        type: "changeconfiguration",
        graphId: i,
        id: d,
        configuration: y,
        reset: !0
      }));
    }
    for (const c of s.nodes)
      o.push({ type: "removenode", id: c, graphId: i });
    if (s.comments.size > 0) {
      const c = a.metadata();
      c && (c.comments = (c.comments ?? []).filter(
        (d) => !s.comments.has(d.id)
      ), o.push({
        type: "changegraphmetadata",
        metadata: c,
        graphId: i
      }));
    }
    return o;
  }, r = [];
  for (const [s, i] of n.graphs) {
    let a = e;
    if (s !== Vn) {
      const o = e.graphs();
      if (!o || (a = o[s], !a))
        continue;
    }
    r.push(
      ...t(i, s, a)
    );
  }
  return r;
}
function Up(n, e, t, r = 0) {
  n.metadata ??= {}, "type" in n && (n.metadata.title ??= n.type), n.metadata.visual ??= { x: 0, y: 0, collapsed: "collapsed" };
  const s = n.metadata.visual;
  s.x = s.x - e.x + t.x + r, s.y = s.y - e.y + t.y + r;
}
function Np(n, e = {
  x: Number.POSITIVE_INFINITY,
  y: Number.POSITIVE_INFINITY
}) {
  for (const r of n.nodes)
    if (r.metadata?.visual) {
      const s = r.metadata.visual;
      s.x < e.x && (e.x = s.x, e.y = s.y);
    }
  const t = n.metadata?.comments ?? [];
  for (const r of t) {
    if (!r.metadata?.visual)
      continue;
    const s = r.metadata.visual;
    s.x < e.x && (e.x = s.x, e.y = s.y);
  }
  return e;
}
function f_(n) {
  return n.x === Number.POSITIVE_INFINITY || n.y === Number.POSITIVE_INFINITY;
}
function m_(n, e, t = { x: 0, y: 0 }) {
  const s = `Board (${new URL(n).pathname.split("/").at(-1)})`;
  return [
    {
      type: "addnode",
      node: {
        id: ms(),
        type: n,
        metadata: {
          title: s,
          visual: {
            ...t
          }
        }
      },
      graphId: e.graphId()
    }
  ];
}
function Uh(n) {
  if (!(n !== "input" && n !== "output"))
    return {
      schema: {
        properties: {
          context: {
            type: "array",
            title: "Context",
            items: {
              type: "object",
              examples: [],
              behavior: ["llm-content"]
            },
            default: n === "input" ? '[{"role":"user","parts":[{"text":""}]}]' : "null"
          }
        },
        type: "object",
        required: []
      }
    };
}
function g_(n) {
  const e = Dh();
  for (const t of n)
    switch (t.type) {
      case "addnode": {
        const r = t.graphId === "" ? Vn : t.graphId;
        let s = e.graphs.get(r);
        s || (s = es(), e.graphs.set(r, s)), s.nodes.add(t.node.id);
        break;
      }
      case "addedge": {
        const r = t.graphId === "" ? Vn : t.graphId;
        let s = e.graphs.get(r);
        s || (s = es(), e.graphs.set(r, s)), s.edges.add(fs(t.edge));
        break;
      }
      case "addgraph": {
        const r = t.id;
        let s = e.graphs.get(r);
        s || (s = es(), e.graphs.set(r, s));
        for (const i of t.graph.nodes)
          s.nodes.add(i.id);
        for (const i of t.graph.edges)
          s.nodes.add(fs(i));
        break;
      }
    }
  return e;
}
function y_(n, e, t = { x: 0, y: 0 }) {
  const r = `${n[0].toLocaleUpperCase()}${n.slice(1)}`, s = {
    id: ms(),
    type: n,
    metadata: {
      title: r,
      visual: {
        ...t
      }
    }
  }, i = Uh(n);
  return i && (s.configuration = i), [
    {
      type: "addnode",
      node: s,
      graphId: e.graphId()
    }
  ];
}
function b_(n, e, t = { x: 0, y: 0 }, r) {
  const s = [], i = (a) => {
    let o = Np(a);
    const l = a.graphs || {};
    for (const d of Object.values(l))
      o = Np(d, o);
    f_(o) && (o.x === Number.POSITIVE_INFINITY || o.y === Number.POSITIVE_INFINITY) && (o.x = o.y = 0);
    let c = 0;
    for (const d of r) {
      const p = d === "" ? e : e.graphs()?.[d];
      if (!p)
        continue;
      const h = /* @__PURE__ */ new Map();
      for (const x of a.nodes) {
        const m = structuredClone(x);
        if (Up(m, o, t, c), p.nodeById(m.id)) {
          const b = ms();
          h.set(m.id, b), m.id = b;
        }
        s.push({ type: "addnode", node: m, graphId: d });
      }
      for (const x of a.edges) {
        const m = structuredClone(x), b = h.get(m.from), g = h.get(m.to);
        b && (m.from = b), g && (m.to = g), s.push({ type: "addedge", edge: m, graphId: d });
      }
      const f = structuredClone(p.metadata() ?? {});
      let u = !1;
      const y = a.metadata?.comments;
      if (y) {
        f.comments ??= [];
        for (const x of y) {
          const m = structuredClone(x);
          m.id = ms(), Up(
            m,
            o,
            t,
            c
          ), f.comments.push(m), u = !0;
        }
      }
      const v = a.metadata?.describer;
      v && (f.describer = v, u = !0), u && s.push({
        type: "changegraphmetadata",
        metadata: { ...f },
        graphId: d
      }), c += 10;
    }
    for (const d of Object.values(a.graphs ?? {}))
      d.nodes.length !== 0 && i(d);
  };
  return i(n), s;
}
function v_(n) {
  if (n.metadata?.visual?.presentation?.themes && n.metadata?.visual?.presentation?.theme)
    return;
  if (!n.metadata?.visual?.presentation?.themeColors) {
    n.metadata ??= {}, n.metadata.visual ??= {}, n.metadata.visual.presentation ??= {}, n.metadata.visual.presentation.themes ??= {};
    const o = {
      themeColors: {
        primaryColor: "#1a1a1a",
        secondaryColor: "#7a7a7a",
        backgroundColor: "#ffffff",
        textColor: "#1a1a1a",
        primaryTextColor: "#ffffff"
      },
      template: "basic",
      isDefaultTheme: !0,
      palette: Vu("#a5a5a5")
    }, l = globalThis.crypto.randomUUID();
    n.metadata.visual.presentation.themes[l] = o, n.metadata.visual.presentation.theme = l;
    return;
  }
  const { themeColors: e, template: t, templateAdditionalOptions: r } = n.metadata.visual.presentation, s = {
    themeColors: e,
    templateAdditionalOptions: r,
    template: t
  }, i = n.assets?.["@@splash"];
  Kn(i?.data) && al(i.data[0]?.parts[0]) && (s.splashScreen = i.data[0].parts[0]), n.metadata.visual.presentation.themes ??= {};
  const a = globalThis.crypto.randomUUID();
  n.metadata.visual.presentation.themes[a] = s, n.metadata.visual.presentation.theme = a, delete n.metadata.visual.presentation.template, delete n.metadata.visual.presentation.templateAdditionalOptions, delete n.metadata.visual.presentation.themeColors;
}
async function w_(n, e) {
  const t = n.metadata?.visual?.presentation?.theme;
  if (!t)
    return;
  const r = n.metadata?.visual?.presentation?.themes?.[t];
  if (!r || !r.splashScreen || r.palette)
    return;
  let s;
  const { handle: i } = r.splashScreen.storedData, a = /^[./]*blobs\/(.+)/, o = i.match(a);
  if (o) {
    const p = o[1];
    p && (s = new URL(`/board/blobs/${p}`, window.location.href));
  } else if (i.startsWith("data:") || i.startsWith("http:") || i.startsWith("https:"))
    s = new URL(i);
  else if (i.startsWith("drive:")) {
    if (!e)
      return;
    s = new URL(i);
  }
  if (!s)
    return;
  console.warn("[Runtime] Generated theme dynamically"), console.warn("[Runtime] Please regenerate the theme for this app");
  const l = await Yu(e, s.href);
  if (!l) return;
  const c = new Image();
  c.src = l, c.crossOrigin = "anonymous";
  const d = await Ju(c);
  d && (r.palette = d);
}
const Gp = {
  applyDefaultThemeInformationIfNonePresent: v_,
  createAppPaletteIfNeeded: w_,
  createEditChangeId: d_,
  createEmptyGraphSelectionState: es,
  createEmptyWorkspaceSelectionState: Dh,
  createGraphId: c_,
  createNodeId: ms,
  createWorkspaceSelectionChangeId: p_,
  edgeToString: fs,
  generateAddEditSpecFromComponentType: y_,
  generateAddEditSpecFromDescriptor: b_,
  generateAddEditSpecFromURL: m_,
  generateBoardFrom: u_,
  generateDeleteEditSpecFrom: h_,
  generateSelectionFrom: g_,
  getDefaultConfiguration: Uh,
  inspectableEdgeToString: Rh
};
class x_ {
  #e;
  #t;
  constructor(e) {
    this.#e = e.apiBaseUrl || Promise.resolve(Xn), this.#t = e.proxyApiBaseUrl ? {
      apiUrl: e.proxyApiBaseUrl,
      marked: /* @__PURE__ */ new Set()
    } : void 0, this.fetchWithCreds = e.fetchWithCreds, this.isTestApi = e.isTestApi;
  }
  async #n(e, t, r, s) {
    const i = this.#r(r);
    if (t?.headers)
      for (const [o, l] of Object.entries(t.headers))
        i.set(o, l);
    const a = s === "anonymous" ? globalThis.fetch : this.fetchWithCreds;
    return wx(a, e, { ...t, headers: i });
  }
  #r(e) {
    const t = new Headers();
    if (e) {
      const r = S_(e);
      r && t.set(k_, r);
    }
    return t;
  }
  markFileForReadingWithPublicProxy(...e) {
    if (this.#t)
      for (const t of e)
        this.#t.marked.add(t);
  }
  fileIsMarkedForReadingWithPublicProxy(e) {
    return !!this.#t?.marked.has(e);
  }
  async #s(e, t = !1) {
    const r = this.#t && this.#t.marked.has(e), s = this.#t?.apiUrl && await this.#e === this.#t.apiUrl;
    return {
      apiUrl: !t && r ? this.#t.apiUrl : await this.#e,
      authorization: !t && r || s ? "anonymous" : "fetchWithCreds"
    };
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get#:~:text=metadata */
  async getFileMetadata(e, t) {
    e = mi(e);
    const { apiUrl: r, authorization: s } = await this.#s(e.id, t?.bypassProxy), i = new URL(
      `${r}/${encodeURIComponent(e.id)}`
      // TODO(aomarks) We don't actually implement any caching for metadata yet.
      // We could, and the only slightly tricky part about it is applying the
      // field mask, because we'd likely want to always fetch "*" in the proxy,
      // regardless of which fields the triggering request had, so that we get
      // more cache hits. But, might as well route it in now.
    );
    (t?.supportsAllDrives ?? !0) && i.searchParams.set("supportsAllDrives", "true"), t?.fields && i.searchParams.set("fields", t.fields.join(","));
    const a = await this.#n(i, { signal: t?.signal }, [e], s);
    if (a.ok)
      return a.json();
    throw new Error(`Google Drive getFileMetadata ${a.status} error ` + await a.text());
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get#:~:text=media */
  async getFileMedia(e, t) {
    e = mi(e);
    const { apiUrl: r, authorization: s } = await this.#s(e.id), i = new URL(`${r}/${encodeURIComponent(e.id)}`);
    return i.searchParams.set("alt", "media"), await this.#n(i, { signal: t?.signal }, [e], s);
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/export */
  async exportFile(e, t) {
    e = mi(e);
    const { apiUrl: r, authorization: s } = await this.#s(e.id), i = new URL(
      `${r}/${encodeURIComponent(e.id)}/export`
      // TODO(aomarks) Use getBaseUrlForPossiblyProxiedFileRead, but need to
      // implement the server side first.
    );
    return i.searchParams.set("mimeType", t.mimeType), this.#n(i, { signal: t?.signal }, [e], s);
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create#:~:text=metadata%2Donly */
  async createFileMetadata(e, t) {
    const r = new URL(await this.#e);
    t?.fields && r.searchParams.set("fields", t.fields.join(","));
    const s = await this.#n(r, {
      method: "POST",
      body: JSON.stringify(e),
      signal: t?.signal
    });
    if (!s.ok)
      throw new Error(`Google Drive createFileMetadata ${s.status} error: ` + await s.text());
    return await s.json();
  }
  async createFile(e, t, r) {
    const s = await this.#i(void 0, e, t, r), i = s.id;
    return console.log("[Google Drive] Created file", {
      id: i,
      open: i ? `http://drive.google.com/open?id=${i}` : null,
      name: t?.name,
      mimeType: t?.mimeType || (typeof e != "string" ? e.type : void 0)
    }), s;
  }
  async updateFile(e, t, r, s) {
    const i = this.#i(e, t, r, s);
    return console.log("[Google Drive] Updated file", {
      id: e,
      open: `http://drive.google.com/open?id=${e}`,
      name: r?.name,
      mimeType: r?.mimeType || (typeof t != "string" ? t.type : void 0)
    }), i;
  }
  async #i(e, t, r, s) {
    const i = !!e;
    typeof t != "string" && r?.mimeType && t.type !== r.mimeType && console.warn(`[Google Drive] blob had type ${JSON.stringify(t.type)} while metadata had type ${JSON.stringify(r.mimeType)}.`);
    const o = new URL(i ? `${ao}/${encodeURIComponent(e)}` : ao);
    o.searchParams.set("uploadType", "multipart"), s?.fields && o.searchParams.set("fields", s.fields.join(","));
    const l = new FormData();
    l.append("metadata", new Blob([JSON.stringify(r ?? {})], {
      type: "application/json; charset=UTF-8"
    })), l.append("file", t);
    const c = await this.#n(o, {
      method: i ? "PATCH" : "POST",
      body: l,
      signal: s?.signal
    }, void 0, "fetchWithCreds");
    if (!c.ok)
      throw new Error(`Google Drive uploadFileMultipart ${c.status} error: ` + await c.text());
    return c.json();
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/update */
  async updateFileMetadata(e, t, r) {
    const s = new URL(`${await this.#e}/${encodeURIComponent(e)}`);
    r?.addParents && s.searchParams.set("addParents", r.addParents.join(",")), r?.removeParents && s.searchParams.set("removeParents", r.removeParents.join(",")), r?.fields && s.searchParams.set("fields", r.fields.join(","));
    const i = await this.#n(s, {
      method: "PATCH",
      body: JSON.stringify(t),
      signal: r?.signal
    });
    if (!i.ok)
      throw new Error(`Google Drive updateFileMetadata ${i.status} error: ` + await i.text());
    return await i.json();
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/delete */
  async deleteFile(e, t) {
    const r = await this.#n(new URL(`${await this.#e}/${encodeURIComponent(e)}`), { method: "DELETE", signal: t?.signal });
    if (!r.ok)
      throw new Error(`Google Drive deleteFile ${r.status} error: ` + await r.text());
  }
  async isReadable(e, t) {
    try {
      return await this.getFileMetadata(e, {
        fields: [],
        signal: t?.signal
      }), !0;
    } catch {
      return !1;
    }
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list */
  async listFiles(e, t) {
    const r = new URL(await this.#e);
    r.searchParams.set("q", e), t?.pageSize && r.searchParams.set("pageSize", String(t.pageSize)), t?.pageToken && r.searchParams.set("pageToken", t.pageToken), t?.fields && r.searchParams.set("fields", `files(${t.fields.join(",")})`), t?.orderBy?.length && r.searchParams.set("orderBy", t.orderBy.map(({ field: i, dir: a }) => `${i} ${a}`).join(","));
    const s = await this.#n(r, { signal: t?.signal });
    if (!s.ok)
      throw new Error(`Google Drive listFiles ${s.status} error: ` + await s.text());
    return await s.json();
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions/create */
  async createPermission(e, t, r) {
    const s = new URL(`${await this.#e}/${encodeURIComponent(e)}/permissions`);
    s.searchParams.set("sendNotificationEmail", r.sendNotificationEmail ? "true" : "false");
    const i = await this.#n(s, {
      method: "POST",
      body: JSON.stringify(__(t)),
      signal: r?.signal
    });
    if (!i.ok)
      throw new Error(`Google Drive createPermission ${i.status} error: ` + await i.text());
    const a = await i.json();
    return console.debug(`[Google Drive Client] Created permission ${a.id} on file ${e}`), a;
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions/delete */
  async deletePermission(e, t, r) {
    const s = await this.#n(new URL(`${await this.#e}/${encodeURIComponent(e)}/permissions/${encodeURIComponent(t)}`), {
      method: "DELETE",
      signal: r?.signal
    });
    if (!s.ok)
      throw new Error(`Google Drive deletePermission ${s.status} error: ` + await s.text());
    console.debug(`[Google Drive Client] Deleted permission ${t} from file ${e}`);
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/copy */
  async copyFile(e, t, r) {
    e = mi(e);
    const s = new URL(`${await this.#e}/${encodeURIComponent(e.id)}/copy`);
    r?.fields && s.searchParams.set("fields", r.fields.join(","));
    const i = await this.#n(s, {
      method: "POST",
      signal: r?.signal,
      body: JSON.stringify(t ?? {})
    });
    return i.ok ? { ok: !0, value: await i.json() } : { ok: !1, error: { status: i.status } };
  }
  /** https://developers.google.com/workspace/drive/api/reference/rest/v3/files/generateIds */
  async generateIds(e, t) {
    const r = new URL(`${await this.#e}/generateIds`);
    r.searchParams.set("count", String(e));
    const s = await this.#n(r, { signal: t?.signal });
    if (!s.ok)
      throw new Error(`Google Drive generateIds ${s.status} error: ` + await s.text());
    return (await s.json()).ids;
  }
}
function __(n) {
  return {
    type: n.type,
    emailAddress: n.emailAddress,
    role: n.role,
    allowFileDiscovery: n.allowFileDiscovery,
    domain: n.domain,
    expirationTime: n.expirationTime,
    view: n.view,
    pendingOwner: n.pendingOwner,
    inheritedPermissionsDisabled: n.inheritedPermissionsDisabled
  };
}
function mi(n) {
  return typeof n == "string" ? { id: n } : n;
}
const k_ = "X-Goog-Drive-Resource-Keys";
function S_(n) {
  const e = [];
  for (const { id: t, resourceKey: r } of n)
    r && !r.match(/[/,]/) && !t.match(/[/,]/) && e.push(`${t}/${r}`);
  if (e.length)
    return e.join(",");
}
const I_ = "/", dr = [
  { name: "local", writable: !0, persistent: !0, mounted: !1 },
  { name: "mnt", writable: !0, persistent: !1, mounted: !0 },
  { name: "session", writable: !0, persistent: !1, mounted: !1 },
  { name: "run", writable: !0, persistent: !1, mounted: !1 },
  { name: "tmp", writable: !0, persistent: !1, mounted: !1 },
  { name: "env", writable: !1, persistent: !1, mounted: !1 },
  { name: "assets", writable: !1, persistent: !1, mounted: !1 }
];
class ze {
  constructor(e, t, r) {
    this.root = e, this.path = t, this.dir = r, this.writable = ze.writableRoots.has(this.root), this.persistent = ze.persistentRoots.has(this.root), this.mounted = ze.mountedRoots.has(this.root);
  }
  static {
    this.roots = new Set(dr.map((e) => e.name));
  }
  static {
    this.writableRoots = new Set(
      dr.filter((e) => e.writable).map((e) => e.name)
    );
  }
  static {
    this.persistentRoots = new Set(
      dr.filter((e) => e.persistent).map((e) => e.name)
    );
  }
  static {
    this.mountedRoots = new Set(
      dr.filter((e) => e.mounted).map((e) => e.name)
    );
  }
  static createRoots() {
    return dr.map((e) => new ze(e.name, [], !0));
  }
  static create(e) {
    const t = e.split(I_), [r, s, ...i] = t, a = i.at(-1)?.length === 0, o = l();
    if (!w(o))
      return o;
    return new ze(s, a ? i.slice(0, -1) : i, a);
    function l() {
      if (r.length !== 0)
        return {
          $error: `Invalid path "${e}": all paths must start with a slash`
        };
      if (!ze.roots.has(s))
        return {
          $error: `Invalid path "${e}": unknown root directory`
        };
      if (i.length === 0)
        return {
          $error: `Invalid path "${e}": when pointing at a root directory, add a slash`
        };
      for (const [c, d] of i.entries())
        if (d.length === 0 && c !== i.length - 1)
          return {
            $error: `Invalid path "${e}": paths may not contain empty fragments`
          };
    }
  }
}
function $_(n, e, t) {
  return e ? t >= e.length ? k(`Length of file is lesser than start "${t}"`) : {
    data: e.slice(t),
    last: e.length - 1
  } : k(`File at "${n}" is empty`);
}
function Nh(n, e) {
  if (n || e)
    return k("Can't close the file that isn't a stream");
}
class Ma {
  constructor(e, t, r) {
    this.graphUrl = e, this.path = t, this.backend = r, this.data = [];
  }
  async read(e, t = 0) {
    const r = await this.backend.read(this.graphUrl, this.path, e);
    return w(r) ? $_(this.path, r, t) : r;
  }
  async append(e, t, r) {
    const s = Nh(t, r);
    return w(s) ? this.backend.append(this.graphUrl, this.path, e) : s;
  }
  copy() {
    throw new Error("Method not implemented.");
  }
  queryEntry(e) {
    throw new Error("Method not implemented.");
  }
  delete() {
    throw new Error("Method not implemented.");
  }
}
class C_ {
  constructor() {
    this.handles = /* @__PURE__ */ new Map(), this.#e = {
      transform: async (e, t) => "storedData" in t ? mw(t) : t
    }, this.#t = {
      transform: async (e, t) => {
        if ("inlineData" in t) {
          const r = await gw(t);
          return this.#n(e, r.storedData.handle), r;
        }
        return t;
      }
    };
  }
  #e;
  #t;
  #n(e, t) {
    let r = this.handles.get(e);
    r || (r = [], this.handles.set(e, r)), r.push(t);
  }
  #r(e) {
    const t = this.handles.get(e);
    t && t.forEach((r) => URL.revokeObjectURL(r)), this.handles.delete(e);
  }
  async delete() {
  }
  inflator() {
    return this.#e;
  }
  deflator() {
    return this.#t;
  }
  async copy() {
  }
  async move() {
  }
  async close() {
    [...this.handles.keys()].forEach((e) => {
      this.#r(e);
    });
  }
}
async function Nn(n, e, t) {
  const r = [];
  for (const s of e) {
    const i = [];
    for (const a of s.parts) {
      let o = a;
      if ("inlineData" in o || "storedData" in o) {
        for (const l of t)
          if (o = await l.transform(n, o), !w(o))
            return o;
      }
      i.push(o);
    }
    r.push({ ...s, parts: i });
  }
  return r;
}
class T_ {
  constructor(e) {
    this.stream = e, this.data = [];
  }
  async read(e, t) {
    if (t !== void 0 && t !== 0)
      return k("Reading partial streams is not supported.");
    const r = this.stream.getReader();
    try {
      const { value: s, done: i } = await r.read();
      return { data: s ? [s] : [], done: i };
    } catch (s) {
      return s.name === "AbortError" ? k("Run stopped") : k(`Unable to read stream: ${s.message}`);
    } finally {
      r.releaseLock();
    }
  }
  async append() {
    return k("Can't write to a read-only stream");
  }
  copy() {
    return k("Copying read-only streams is not supported");
  }
  queryEntry(e) {
    return { path: e, length: 0, stream: !0 };
  }
  async delete() {
    this.stream.cancel().catch(() => {
    });
  }
}
function Gh(n) {
  return new ts({ ...n, graphUrl: "" });
}
class E_ {
  constructor() {
    this.data = [];
    const { writable: e, readable: t } = new TransformStream();
    this.readable = t, this.writer = e.getWriter();
  }
  async read(e, t = 0) {
    if (t !== 0)
      return k("Reading partial streams is not supported.");
    const r = this.readable.getReader();
    try {
      const { value: s, done: i } = await r.read();
      return { data: s, done: i };
    } catch (s) {
      return k(`Unable to read stream: ${s.message}`);
    } finally {
      r.releaseLock();
    }
  }
  async append(e, t, r = !1) {
    if (!this.writer)
      return k("Unable to write to a closed stream");
    t ? (this.writer.close(), this.writer = null) : r ? await this.writer.write(e) : this.writer.write(e);
  }
  async delete() {
    this.writer && (this.writer.close().catch(() => {
    }), this.writer = null);
  }
  copy() {
    return k("Copy/move of stream files is not yet implemented");
  }
  queryEntry(e) {
    return { path: e, length: 0, stream: !0 };
  }
}
class Bt {
  constructor(e) {
    this.data = e;
  }
  async read(e, t = 0) {
    return t >= this.data.length ? k(`Length of file is lesser than start "${t}"`) : {
      data: this.data.slice(t),
      last: this.data.length - 1
    };
  }
  async append(e, t, r = !1) {
    const s = Nh(t, r);
    if (!w(s))
      return s;
    this.data.push(...e);
  }
  async delete() {
  }
  copy() {
    return new Bt(this.data);
  }
  queryEntry(e) {
    return { path: e, length: this.data.length, stream: !1 };
  }
  static fromEntry(e) {
    return new Bt(e.data);
  }
  static fromEntries(e) {
    return new Map(
      e.map((t) => [t.path, Bt.fromEntry(t)])
    );
  }
}
class ts {
  #e;
  #t;
  #n;
  #r;
  #s;
  #i;
  #o;
  #l;
  #a;
  #c;
  #u;
  #p;
  constructor(e) {
    if (this.#e = P_(e.graphUrl), !e.local)
      throw new Error("Must supply persistent backend for file system to work");
    if (!e.mnt)
      throw new Error(
        "Must supply `mnt` persistent backend for file system to work"
      );
    this.#n = e.mnt, this.#t = e.local, this.#r = Bt.fromEntries(e.env || []), this.#s = Bt.fromEntries(e.assets || []), this.#o = !e.blobs, this.#i = e.blobs ? e.blobs : new C_(), this.#a = !e.session, this.#l = e.session ? e.session : /* @__PURE__ */ new Map(), this.#u = !e.run, this.#c = e.run ? e.run : /* @__PURE__ */ new Map(), this.#p = /* @__PURE__ */ new Map();
  }
  async query({
    path: e
  }) {
    const t = ze.create(e);
    if (!w(t))
      return t;
    if (t.persistent)
      return this.#t.query(this.#e, e);
    if (t.mounted)
      return this.#n.query(this.#e, e);
    {
      const r = this.#d(t);
      return w(r) ? {
        entries: this.#h(r, e)
      } : r;
    }
  }
  async read({
    path: e,
    start: t,
    inflate: r = !1
  }) {
    const s = ze.create(e);
    if (!w(s))
      return s;
    let i;
    if (s.persistent)
      i = new Ma(this.#e, e, this.#t);
    else if (s.mounted)
      i = new Ma(this.#e, e, this.#n);
    else {
      const o = this.#d(s);
      if (!w(o))
        return o;
      if (i = o.get(e), !i)
        return k(`File not found: "${e}"`);
    }
    const a = await i.read(r, t);
    if (!w(a))
      return a;
    if (s.persistent)
      return i.read(r, t);
    if ("done" in a) {
      const { done: o } = a;
      o && this.#f(e);
    } else if (r && a.data) {
      const o = await Nn(e, a.data, [
        this.#i.inflator()
      ]);
      return w(o) ? { data: o, last: a.last } : o;
    }
    return a;
  }
  async write(e) {
    const { path: t } = e, r = ze.create(t);
    if (!w(r))
      return r;
    if (!r.writable)
      return k(`Destination "${t}" is not writable`);
    if ("source" in e) {
      const { source: a, move: o } = e, l = ze.create(a);
      if (!w(l))
        return l;
      if (r.mounted)
        return k("Copying/moving files to mounted is not yet implemented");
      if (r.persistent)
        if (l.persistent) {
          if (o) {
            const f = await this.#t.move(this.#e, a, t);
            if (!w(f))
              return f;
          } else {
            const f = await this.#t.copy(
              this.#e,
              a,
              t
            );
            if (!w(f))
              return f;
          }
          return;
        } else {
          if (l.mounted)
            return k(
              "Copying/moving files from mounted to persistent is not yet implemented"
            );
          {
            const f = this.#d(l);
            if (!w(f))
              return f;
            const u = f.get(a);
            if (!u)
              return k(`Source file not found: "${a}"`);
            const y = await this.#t.write(
              this.#e,
              t,
              u.data
            );
            if (!w(y))
              return y;
            o && f.delete(a);
            return;
          }
        }
      if (l.persistent) {
        const u = await new Ma(
          this.#e,
          a,
          this.#t
        ).read(!1);
        if (!w(u))
          return u;
        const y = this.#d(r);
        return w(y) ? u.data ? (y.set(t, new Bt(u.data)), this.#t.delete(this.#e, a, !1)) : k(`Source file "${t}" is empty`) : y;
      }
      if (l.mounted)
        return k(
          "Copying/moving files from mounted to persistent is not yet implemented"
        );
      const c = this.#d(l);
      if (!w(c))
        return c;
      const d = c.get(a);
      if (!d)
        return k(`Source file not found: "${a}"`);
      const p = d.copy();
      if (!w(p))
        return p;
      const h = this.#d(r);
      if (!w(h))
        return h;
      h.set(t, p), o && c.delete(a);
      return;
    }
    if ("stream" in e && e.stream) {
      if (r.persistent)
        return k(
          `Creating streams in "${r.root}" is not yet supported`
        );
      if (r.mounted)
        return k(
          `Creating streams in "${r.root}" is not yet supported`
        );
      const a = this.#d(r);
      if (!w(a))
        return a;
      let o = a.get(t);
      const { done: l } = e;
      if (l)
        return o ? o.append([], !0) : k(`Can't close stream on a non-existent file "${t}"`);
      {
        o || (o = new E_(), a.set(t, o));
        const { receipt: c, data: d } = e, p = await Nn(t, d, [
          this.#i.deflator()
        ]);
        return w(p) ? o.append(p, !1, c) : p;
      }
    }
    if ("delete" in e) {
      r.dir ? await this.#m(t) : await this.#f(t);
      return;
    }
    if (r.dir)
      return k(`Can't write data to a directory: "${t}"`);
    const { data: s, append: i } = e;
    if (i) {
      if (r.persistent)
        return this.#t.append(this.#e, t, s);
      if (r.mounted)
        return this.#n.append(this.#e, t, s);
      const a = this.#d(r);
      if (!w(a))
        return a;
      const o = a.get(t);
      if (o) {
        const l = await Nn(t, s, [
          this.#i.deflator()
        ]);
        return w(l) ? o.append(l, !1) : l;
      }
    }
    if (r.persistent)
      return this.#t.write(this.#e, t, s);
    if (r.mounted)
      return this.#n.write(this.#e, t, s);
    {
      const a = await Nn(t, s, [
        this.#i.deflator()
      ]);
      if (!w(a))
        return a;
      const o = new Bt(a), l = this.#d(r);
      if (!w(l))
        return l;
      l.set(t, o);
    }
  }
  #d(e) {
    const { root: t } = e;
    switch (t) {
      case "local":
        return k(`Querying "${e.root}" is not yet implemented.`);
      case "env":
        return this.#r;
      case "assets":
        return this.#s;
      case "session":
        return this.#l;
      case "run":
        return this.#c;
      case "tmp":
        return this.#p;
      default:
        return k(`Unknown root "${t}"`);
    }
  }
  #h(e, t) {
    const r = [];
    for (const [s, i] of e.entries())
      s.startsWith(t) && r.push(i.queryEntry(s));
    return r;
  }
  #f(e) {
    const t = ze.create(e);
    if (!w(t))
      return t;
    if (t.persistent)
      return this.#t.delete(this.#e, e, !1);
    const r = this.#d(t);
    if (!w(r))
      return r;
    const s = r.get(e);
    s && (r.delete(e), s.delete().catch(() => {
    }));
  }
  async #m(e) {
    const t = ze.create(e);
    if (!w(t))
      return t;
    if (t.persistent) {
      await this.#t.delete(this.#e, e, t.dir);
      return;
    }
    const r = this.#d(t);
    if (!w(r))
      return r;
    const s = this.#h(r, e);
    for (const i of s)
      this.#f(i.path);
  }
  async addStream({
    path: e,
    stream: t
  }) {
    const r = ze.create(e);
    if (!w(r)) return r;
    if (!r.writable)
      return k(`Can't write streams to path "${e}"`);
    if (r.root === "local")
      return k(`Can't write streams to "/${r.root}/*"`);
    const s = this.#d(r);
    if (!w(s)) return s;
    const i = new T_(t);
    s.set(e, i);
  }
  async close() {
    this.#a && await e(this.#l), this.#u && await e(this.#c), await e(this.#p);
    async function e(t) {
      await Promise.all(
        [...t.values()].map((r) => r.delete())
      );
    }
    this.#o && await this.#i.close();
  }
  async onEndRun() {
    return this.#n.onEndRun?.();
  }
  env() {
    return [...this.#r.entries()].map(([e, t]) => ({
      path: e,
      data: t.data
    }));
  }
  createModuleFileSystem(e) {
    const { graphUrl: t, env: r } = e;
    return new ts({
      graphUrl: t,
      local: this.#t,
      mnt: this.#n,
      env: r || Tn(this.#r),
      assets: Tn(this.#s),
      blobs: this.#i,
      session: this.#l,
      run: this.#c
    });
  }
  updateRunFileSystem(e) {
    const { graphUrl: t, env: r, assets: s } = e;
    return new ts({
      graphUrl: t,
      local: this.#t,
      mnt: this.#n,
      env: r || Tn(this.#r),
      assets: s || Tn(this.#s),
      blobs: this.#i,
      session: this.#l,
      run: this.#c
    });
  }
  createRunFileSystem(e) {
    const { graphUrl: t, env: r, assets: s } = e;
    return new ts({
      graphUrl: t,
      local: this.#t,
      mnt: this.#n,
      env: r || Tn(this.#r),
      assets: s || Tn(this.#s),
      blobs: this.#i,
      session: this.#l
    });
  }
}
function Tn(n) {
  return [...n.entries()].map(([e, t]) => ({
    path: e,
    data: t.data
  }));
}
function P_(n) {
  if (!n) return "";
  try {
    return yw(n)?.href || "";
  } catch {
    return "";
  }
}
function A_(n) {
  return n ? [
    {
      path: "/env/settings/general",
      data: [{ parts: [{ json: Object.fromEntries(
        [...n.getSection(uh.GENERAL).items.entries()].map(
          ([t, r]) => [t, r.value]
        )
      ) }] }]
    }
  ] : [];
}
const M_ = "files";
class O_ {
  #e;
  #t;
  constructor(e) {
    this.#t = e, this.#e = this.initialize();
  }
  /**
   *
   * @param url -- the URL of the graph associated
   */
  async initialize() {
    return hs(M_, 1, {
      upgrade(e) {
        e.createObjectStore("files", {
          keyPath: ["graphUrl", "path"]
        }).createIndex("byGraph", "graphUrl"), e.createObjectStore("blobs", { keyPath: "handle" });
        const r = e.createObjectStore("refs", {
          keyPath: ["handle", "path"]
        });
        r.createIndex("byPath", "path"), r.createIndex("byHandle", "handle");
      }
    });
  }
  #n(e, t) {
    return [e, t];
  }
  #r(e, t) {
    return IDBKeyRange.bound([e, t], [e, t + "￿"]);
  }
  async #s(e, t, r, s) {
    try {
      const i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
      let o = await Nn(t, r, [
        {
          transform: async (u, y) => {
            if ("storedData" in y) {
              const m = y.storedData.handle;
              if (m.startsWith("https://"))
                return y;
              const b = this.#t.byEphemeralHandle(m);
              if (b)
                return a.add(b), y;
            }
            const v = await Ku(y), { persistent: x } = this.#t.add(v);
            return i.set(x, v), {
              storedData: {
                handle: x,
                mimeType: v.type
              }
            };
          }
        }
      ]);
      if (!j_(o))
        return o;
      const l = Date.now(), d = (await this.#e).transaction(["files", "blobs", "refs"], "readwrite"), p = d.objectStore("files"), h = d.objectStore("blobs"), f = d.objectStore("refs");
      for (const [u, y] of i.entries())
        await h.put({ handle: u, blob: y }), await f.put({ path: t, handle: u });
      for (const u of a.values())
        await f.put({ path: t, handle: u });
      if (s) {
        const u = await p.get(this.#n(e, t));
        o = u ? [...u.data, ...o] : o;
      }
      await p.put({
        graphUrl: e,
        path: t,
        data: o,
        timestamp: l
      }), await d.done;
    } catch (i) {
      return at(i.message);
    }
  }
  async query(e, t) {
    const r = await this.#e;
    try {
      return { entries: (await r.getAll("files", this.#r(e, t))).map((i) => ({
        stream: !1,
        path: i.path,
        length: i.data.length
      })) };
    } catch (s) {
      return at(s.message);
    }
  }
  async read(e, t, r) {
    try {
      const i = (await this.#e).transaction(["files", "blobs"], "readonly"), a = i.objectStore("files"), o = i.objectStore("blobs"), l = await a.get(this.#n(e, t));
      return l ? await Nn(t, l.data, [
        {
          transform: async (c, d) => {
            if ("storedData" in d) {
              const p = d.storedData.handle;
              if (r) {
                const h = await o.get(p);
                return h ? {
                  inlineData: {
                    data: await bw(h.blob),
                    mimeType: d.storedData.mimeType
                  }
                } : at(
                  `File System persistent backend integrity error: blob not found for "${c}"`
                );
              } else {
                const h = this.#t.byPersistentHandle(p);
                if (h)
                  return {
                    storedData: {
                      handle: h,
                      mimeType: d.storedData.mimeType
                    }
                  };
                {
                  const f = await o.get(p);
                  if (!f)
                    return at(
                      `File System persistent backend integrity error: blob not found for "${c}"`
                    );
                  const { ephemeral: u } = this.#t.add(
                    f.blob,
                    p
                  );
                  return {
                    storedData: {
                      handle: u,
                      mimeType: d.storedData.mimeType
                    }
                  };
                }
              }
            }
            return d;
          }
        }
      ]) : at(`File "${t}" not found.`);
    } catch (s) {
      return at(s.message);
    }
  }
  async write(e, t, r) {
    return this.#s(e, t, r, !1);
  }
  async append(e, t, r) {
    return this.#s(e, t, r, !0);
  }
  async delete(e, t, r) {
    try {
      const i = (await this.#e).transaction(["files", "blobs", "refs"], "readwrite"), a = i.objectStore("files"), o = i.objectStore("refs"), l = i.objectStore("blobs");
      let c;
      r ? c = (await a.getAllKeys(
        this.#r(e, t)
      )).map((h) => h[1]) : c = [t];
      const d = /* @__PURE__ */ new Set();
      for (const p of c) {
        const f = await o.index("byPath").getAllKeys(p);
        f.forEach(([u]) => d.add(u));
        for (const u of f)
          await o.delete(u);
      }
      for (const p of d)
        await o.index("byHandle").count(p) == 0 && await l.delete(p);
      await a.delete(
        r ? this.#r(e, t) : [e, t]
      ), await i.done;
    } catch (s) {
      return at(s.message);
    }
  }
  async copy(e, t, r) {
    try {
      const i = (await this.#e).transaction(["files", "refs"], "readwrite"), a = i.objectStore("files"), o = i.objectStore("refs"), l = await o.index("byPath").getAll(t);
      for (const { handle: d } of l)
        await o.put({ handle: d, path: r });
      const c = await a.get(this.#n(e, t));
      if (!c)
        return at(`Source file "${t}" not found.`);
      await a.put({
        graphUrl: e,
        path: r,
        data: c.data,
        timestamp: Date.now()
      }), await i.done;
    } catch (s) {
      return at(s.message);
    }
  }
  async move(e, t, r) {
    try {
      const i = (await this.#e).transaction(["files", "refs"], "readwrite"), a = i.objectStore("files"), o = i.objectStore("refs"), l = await o.index("byPath").getAll(t);
      for (const { handle: d } of l)
        await o.put({ handle: d, path: r });
      for (const { handle: d } of l)
        await o.delete([d, t]);
      const c = await a.get(this.#n(e, t));
      if (!c)
        return at(`Source file "${t}" not found.`);
      await a.put({
        graphUrl: e,
        path: r,
        data: c.data,
        timestamp: Date.now()
      }), await a.delete(this.#n(e, t)), await i.done;
    } catch (s) {
      return at(s.message);
    }
  }
  async close() {
    (await this.#e).close();
  }
}
function at(n) {
  return { $error: n };
}
function j_(n) {
  return !(n && typeof n == "object" && "$error" in n);
}
const R_ = "flags";
class D_ {
  #e;
  #t;
  #n = new Zt.State({});
  constructor(e) {
    this.#t = e, this.#e = this.#r();
  }
  async flags() {
    this.#n.get();
    const e = await this.overrides();
    return { ...this.env(), ...e };
  }
  async #r() {
    return hs(R_, 1, {
      upgrade(e) {
        e.createObjectStore("overrides");
      }
    });
  }
  env() {
    return this.#t;
  }
  async overrides() {
    this.#n.get();
    const t = (await this.#e).transaction(["overrides"], "readonly"), r = t.objectStore("overrides"), [s, i] = await Promise.all([
      r.getAllKeys(),
      r.getAll()
    ]), a = {};
    for (let o = 0; o < s.length; o++)
      a[s[o]] = i[o];
    return await t.done, a;
  }
  async override(e, t) {
    this.#n.set({});
    const s = (await this.#e).transaction(["overrides"], "readwrite");
    return s.objectStore("overrides").put(t, e), s.done;
  }
  async clearOverride(e) {
    this.#n.set({});
    const r = (await this.#e).transaction(["overrides"], "readwrite");
    return r.objectStore("overrides").delete(e), r.done;
  }
}
function Fh(n) {
  return new O_(n);
}
class U_ {
  #e = /* @__PURE__ */ new Map();
  #t = /* @__PURE__ */ new Map();
  byEphemeralHandle(e) {
    return this.#t.get(e);
  }
  byPersistentHandle(e) {
    return this.#e.get(e);
  }
  add(e, t) {
    const r = URL.createObjectURL(e);
    return t ??= `files:${crypto.randomUUID()}`, this.#e.set(t, r), this.#t.set(r, t), { ephemeral: r, persistent: t };
  }
  get size() {
    return this.#e.size;
  }
}
function zh() {
  return new U_();
}
function Lh(n) {
  return new N_(n);
}
class N_ {
  constructor(e) {
    this.backends = e;
  }
  #e(e) {
    const [, t, r] = e.split("/");
    if (t !== "mnt")
      return k(
        `Invalid path "${e}": All paths in mounted backends must start with "/mnt"`
      );
    const s = this.backends.get(r);
    return s || k(`Invalid path "${e}": Volume "${r}" is not mounted`);
  }
  async query(e, t) {
    const r = this.#e(t);
    return w(r) ? r.query(e, t) : r;
  }
  async read(e, t, r) {
    const s = this.#e(t);
    return w(s) ? s.read(e, t, r) : s;
  }
  async write(e, t, r) {
    const s = this.#e(t);
    return w(s) ? s.write(e, t, r) : s;
  }
  async append(e, t, r) {
    const s = this.#e(t);
    return w(s) ? s.append(e, t, r) : s;
  }
  async delete(e, t, r) {
    const s = this.#e(t);
    return w(s) ? s.delete(e, t, r) : s;
  }
  async copy(e, t, r) {
    const s = this.#e(t);
    if (!w(s)) return s;
    const i = this.#e(r);
    return w(i) ? s !== i ? k("Unable to copy between different backends") : s.copy(e, t, r) : i;
  }
  async move(e, t, r) {
    const s = this.#e(t);
    if (!w(s)) return s;
    const i = this.#e(r);
    return w(i) ? s !== i ? k("Unable to copy between different backends") : s.move(e, t, r) : i;
  }
  async onEndRun() {
    for (const e of this.backends.values())
      await e.onEndRun?.();
  }
}
const G_ = [
  ["gcal", Nx],
  ["gmail", vw],
  ["gdrive", Fx],
  ["filesystem", zx]
];
async function F_({ context: n }, e, t) {
  const r = n && Array.isArray(n) && n.length > 0 ? n.at(-1) : void 0;
  if (!r)
    return E("Must supply context as input");
  r.role = "user";
  const s = await Wn(
    {
      body: {
        contents: [r],
        generationConfig: {
          responseModalities: ["AUDIO"]
        },
        safetySettings: We()
      }
    },
    e,
    t
  );
  if (!S(s))
    return s;
  if ("context" in s)
    return E("Invalid output from Gemini -- must be candidates", {
      origin: "server",
      kind: "bug"
    });
  const i = s.candidates.at(0)?.content;
  return i ? { context: [i] } : E("No content", {
    origin: "server",
    kind: "bug"
  });
}
async function z_() {
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        }
      },
      additionalProperties: !1
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["hint-audio"]
        }
      },
      additionalProperties: !1
    },
    title: "Make Audio [Deprecated, Use Make Speech]",
    metadata: {
      icon: "generative-audio",
      tags: ["quick-access", "generative", "experimental"],
      order: 3
    }
  };
}
const L_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: F_,
  describe: z_
}, Symbol.toStringTag, { value: "Module" }));
function W_(n) {
  const e = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return n.replace(/[&<>"']/g, (t) => e[t]);
}
function Wh(n) {
  return n.type === "tool" && !!n.path;
}
function Mi(n) {
  return n.type === "in" && !!n.path;
}
function Bh(n) {
  return n.type === "asset" && !!n.path;
}
function qh(n) {
  return n.type === "param" && !!n.path;
}
function B_(n) {
  return Wh(n) || Mi(n) || Bh(n) || qh(n);
}
const q_ = /{(?<json>{(?:.*?)})}/gim;
class q {
  constructor(e, t) {
    if (this.caps = e, this.template = t, !t) {
      this.#t = "user", this.#e = [];
      return;
    }
    this.#e = this.#r(t), this.#t = t.role;
  }
  #e;
  #t;
  #n(e) {
    const t = [];
    for (let r of e)
      if ("text" in r) {
        const s = t[t.length - 1];
        s && "text" in s ? s.text += r.text : (r = JSON.parse(JSON.stringify(r)), t.push(r));
      } else
        t.push(r);
    return t;
  }
  /**
   * Takes an LLM Content and splits it further into parts where
   * each {{param}} substitution is a separate part.
   */
  #r(e) {
    const t = [];
    for (const r of e.parts) {
      if (!("text" in r)) {
        t.push(r);
        continue;
      }
      const s = r.text.matchAll(q_);
      let i = 0;
      for (const a of s) {
        const o = a.groups?.json, l = a.index;
        if (l > i && t.push({ text: r.text.slice(i, l) }), o) {
          let c;
          try {
            c = JSON.parse(o), B_(c) ? t.push(c) : c = null;
          } catch {
          } finally {
            c || t.push({ text: r.text.slice(l, l + a[0].length) });
          }
        }
        i = l + a[0].length;
      }
      i < r.text.length && t.push({ text: r.text.slice(i) });
    }
    return t;
  }
  #s(e) {
    const t = e;
    for (let r = t.length - 1; r >= 0; r--)
      if (t[r].role !== "$metadata")
        return t[r];
    return null;
  }
  async loadAsset(e) {
    const t = `/assets/${e.path}`, r = await this.caps.read({ path: t });
    return !S(r) || !r.data ? E(`Unable to find asset "${e.title}"`) : r.data;
  }
  async #i(e, t, r) {
    if (Mi(e)) {
      const { title: s, path: i } = e, a = `p-z-${i}`;
      return a in t ? t[a] : s;
    } else {
      if (Bh(e))
        return this.loadAsset(e);
      if (Wh(e)) {
        const s = await r(e);
        return S(s) ? s || e.title : s;
      } else if (qh(e)) {
        const s = `/env/parameters/${e.path}`, i = await this.caps.read({ path: s });
        return S(i) ? i.data : (console.error(`Unknown parameter "${e.title}"`), null);
      }
    }
    return null;
  }
  async asyncSimpleSubstitute(e) {
    const t = [];
    for (const r of this.#e)
      "type" in r ? t.push({ text: await e(r) }) : "text" in r && !r.thought ? t.push({ text: W_(r.text) }) : t.push(r);
    return { parts: this.#n(t) };
  }
  simpleSubstitute(e) {
    const t = [];
    for (const r of this.#e)
      "type" in r ? t.push({ text: e(r) }) : t.push(r);
    return { parts: this.#n(t) };
  }
  async mapParams(e, t, r) {
    const s = [];
    for (const i of this.#e)
      if ("type" in i) {
        const a = await this.#i(i, e, r);
        if (a === null)
          continue;
        if (S(a))
          if (typeof a == "string")
            s.push(...t(i, { text: a }));
          else if (ro(a))
            for (const o of a.parts)
              s.push(...t(i, o));
          else if (vp(a)) {
            const o = this.#s(a);
            if (o)
              for (const l of o.parts)
                s.push(...t(i, l));
          } else
            s.push(...t(i, { text: JSON.stringify(a) }));
        else return a;
      }
    return this.#n(s);
  }
  async substitute(e, t) {
    const r = [];
    for (const i of this.#e)
      if ("type" in i) {
        const a = await this.#i(i, e, t);
        if (a === null)
          continue;
        if (S(a))
          if (typeof a == "string")
            r.push({ text: a });
          else if (ro(a))
            r.push(...a.parts);
          else if (vp(a)) {
            const o = this.#s(a);
            o && r.push(...o.parts);
          } else
            r.push({ text: JSON.stringify(a) });
        else return a;
      } else
        r.push(i);
    return { parts: this.#n(r), role: this.#t };
  }
  static toId(e) {
    return `p-z-${e}`;
  }
  #o(e) {
    const t = e?.replace(/[_-]/g, " ");
    return (t?.at(0)?.toUpperCase() ?? "") + (t?.slice(1)?.toLowerCase() ?? "");
  }
  #l(e) {
    for (const t of this.#e)
      "type" in t && e(t);
  }
  requireds() {
    const e = [];
    let t = !1;
    return this.#l((r) => {
      Mi(r) && (t = !0, e.push(q.toId(r.title)));
    }), t ? { required: e } : {};
  }
  schemas() {
    const e = [];
    return this.#l((t) => {
      const r = t.title, s = q.toId(t.path);
      Mi(t) && e.push([
        s,
        {
          title: this.#o(r),
          description: `The value to substitute for the parameter "${r}"`,
          type: "object",
          behavior: ["llm-content"]
        }
      ]);
    }), Object.fromEntries(e);
  }
  static part(e) {
    return `{${JSON.stringify(e)}}`;
  }
  static route(e, t) {
    return q.part({
      type: "tool",
      title: e,
      path: Ts,
      instance: t
    });
  }
}
function H_(n) {
  return Object.fromEntries(
    Object.entries(n).map(([e, t]) => [`p-z-${e}`, t])
  );
}
async function V_({ inputs: { content: n, params: e } }, t) {
  const s = await new q(t, n).substitute(
    H_(e),
    async (i) => i.path
  );
  return S(s) ? { outputs: s } : s;
}
async function Y_() {
  return {
    inputSchema: {
      type: "object",
      properties: { inputs: { type: "object", title: "Test inputs" } }
    },
    outputSchema: {
      type: "object",
      properties: { outputs: { type: "object", title: "Test outputs" } }
    }
  };
}
const J_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Template: q,
  default: V_,
  describe: Y_
}, Symbol.toStringTag, { value: "Module" }));
async function K_({ text: n, ...e }, t) {
  const s = await new q(t, n).substitute(e, async () => "");
  return S(s) ? { context: [s] } : s;
}
async function Z_({ inputs: { text: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "object",
          behavior: ["llm-content", "hint-preview", "config"],
          title: "Text",
          description: "Type the @ character to select the outputs to combine"
        },
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: {
            type: "object",
            behavior: ["llm-content"]
          },
          title: "Context out",
          behavior: ["main-port", "hint-multimodal"]
        }
      }
    },
    title: "Combine Outputs",
    metadata: {
      icon: "combine-outputs",
      tags: ["quick-access", "core", "experimental"],
      order: 100
    }
  };
}
const X_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K_,
  describe: Z_
}, Symbol.toStringTag, { value: "Module" })), Q_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
async function $l(n) {
  const e = await n.read({ path: "/env/settings/general" });
  if (!S(e)) return e;
  const t = (e.data?.at(0)?.parts?.at(0)).json;
  return t || {};
}
async function Ps({
  context: n
}) {
  if (n.flags)
    return n.flags.flags();
}
const ek = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  readFlags: Ps,
  readSettings: $l
}, Symbol.toStringTag, { value: "Module" }));
async function tk({
  context: n,
  "p-chat": e,
  description: t,
  ...r
}) {
  return e = !!e, n ??= [], {
    context: {
      id: Math.random().toString(36).substring(2, 5),
      chat: e,
      context: n,
      userInputs: [],
      defaultModel: "",
      model: "",
      description: t,
      tools: [],
      type: "work",
      work: [],
      userEndedChat: !1,
      params: r
    }
  };
}
async function nk({ inputs: { description: n } }, e) {
  const t = await $l(e), r = S(t) && !!t["Show Experimental Components"], s = new q(e, n);
  let i = {};
  return r && (i = {
    "p-chat": {
      type: "boolean",
      title: "Chat with User",
      behavior: ["config", "hint-preview"],
      icon: "chat",
      description: "When checked, this step will chat with the user, asking to review work, requesting additional information, etc."
    }
    // "p-list": {
    //   type: "boolean",
    //   title: "Make a list",
    //   behavior: ["config", "hint-preview"],
    //   icon: "summarize",
    //   description:
    //     "When checked, this step will try to create a list as its output. Make sure that the prompt asks for a list of some sort",
    // },
  }), {
    inputSchema: {
      type: "object",
      properties: {
        description: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Instruction",
          description: "Give the model additional context on what to do, like specific rules/guidelines to adhere to or specify behavior separate from the provided context.",
          default: Mt()
        },
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        ...i,
        ...s.schemas()
      },
      behavior: ["at-wireable"],
      ...s.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["main-port", "hint-text"]
        }
      }
    },
    title: "Make Text",
    metadata: {
      icon: "generative-text",
      tags: ["quick-access", "generative"],
      order: 1
    }
  };
}
const rk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tk,
  describe: nk
}, Symbol.toStringTag, { value: "Module" })), sk = "https://staging-appcatalyst.sandbox.googleapis.com/v1beta1/generateWebpageStream";
async function ik(n) {
  const e = await n.read({ path: "/env/settings/backend" });
  if (S(e)) {
    const t = e.data?.at(0)?.parts?.at(0);
    if (t && "json" in t) {
      const r = t.json;
      if (r?.endpoint_url) {
        const s = new URL(r.endpoint_url);
        return s.pathname = "/v1beta1/generateWebpageStream", s.toString();
      }
    }
  }
  return sk;
}
function ak(n, e, t) {
  const r = [], s = {};
  let i = 0, a = 0;
  for (const l of e)
    if (l.parts) {
      for (const c of l.parts)
        if ("text" in c)
          i++, r.push({
            parts: [
              {
                text: c.text,
                partMetadata: { input_name: `text_${i}` }
              }
            ],
            role: "user"
          });
        else if ("inlineData" in c)
          a++, r.push({
            parts: [
              {
                inlineData: {
                  mimeType: c.inlineData.mimeType,
                  data: c.inlineData.data
                },
                partMetadata: { input_name: `media_${a}` }
              }
            ],
            role: "user"
          });
        else if ("storedData" in c) {
          a++;
          const d = c.storedData.handle, p = c.storedData.mimeType, h = c.storedData.resourceKey;
          h && (s[d] = h);
          const f = ok(d);
          r.push({
            parts: [
              {
                fileData: {
                  mimeType: p,
                  fileUri: f
                },
                partMetadata: { input_name: `media_${a}` }
              }
            ],
            role: "user"
          });
        }
    }
  const o = {
    intent: "",
    modelName: t,
    userInstruction: n,
    contents: r
  };
  return Object.keys(s).length > 0 && (o.driveResourceKeys = s), o;
}
function ok(n) {
  if (n.startsWith("drive:/"))
    return `drive://${n.replace(/^drive:\/+/, "")}`;
  const e = n.match(
    /https?:\/\/drive\.google\.com\/file\/d\/([^/]+)/
  );
  if (e)
    return `drive://${e[1]}`;
  const t = n.match(/\/board\/blobs\/([^/?#]+)/);
  return t ? `gs://${t[1]}` : n;
}
async function lk(n, e, t, r, s) {
  const i = ol(e, {
    title: `Generating webpage with ${s}`,
    icon: "web"
  }), { appScreen: a } = Zu(e);
  try {
    i.addJson("Preparing request", { modelName: s }, "upload"), a && (a.progress = "Generating HTML");
    const o = await ik(n), l = new URL(o);
    l.searchParams.set("alt", "sse");
    const c = ak(
      t,
      r,
      s
    );
    n.write({
      path: `/mnt/track/call_${s}`,
      data: []
    });
    const d = await e.fetchWithCreds(l.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(c),
      signal: e.context.signal
    });
    if (!d.ok) {
      const f = await d.text();
      return i.addError(
        E(`Streaming request failed: ${d.status} ${f}`)
      );
    }
    if (!d.body)
      return i.addError(E("No response body from streaming API"));
    let p = "", h = 0;
    for await (const f of ll(d.body))
      if (f.parts)
        for (const u of f.parts) {
          const y = u.partMetadata?.chunk_type, v = u.text || "";
          if (y === "thought")
            h++, a && (a.progress = ww(v), a.expectedDuration = -1), i.addText(`Thinking (${h})`, v, "spark");
          else if (y === "html")
            p = v, i.addText("Generated HTML", "HTML output ready", "download");
          else if (y === "error")
            return i.addError(E(`Generation error: ${v}`));
        }
    return p ? xw("text/html", p, "model") : i.addError(E("No HTML content received from stream"));
  } catch (o) {
    return i.addError(E(o.message));
  } finally {
    a && (a.progress = void 0, a.expectedDuration = -1), i.finish();
  }
}
const ck = "rendered_outputs";
async function dk(n, e, t, r, s, i) {
  const a = {}, o = [];
  let l = 0;
  for (const p of r)
    if (p.parts)
      for (const h of p.parts)
        if (l++, "text" in h) {
          const f = `text_${l}`;
          o.push(f), a[f] = {
            chunks: [
              {
                mimetype: "text/plain",
                data: ft(h.text)
              }
            ]
          };
        } else if ("inlineData" in h) {
          const f = `media_${l}`;
          o.push(f), a[f] = {
            chunks: [
              {
                mimetype: h.inlineData.mimeType,
                data: h.inlineData.data
              }
            ]
          };
        } else if ("storedData" in h) {
          const f = `media_${l}`;
          o.push(f);
          let u = h.storedData.handle;
          u.startsWith("drive:/") && (u = `https://drive.google.com/file/d/${u.replace(/^drive:\/+/, "")}/preview`), a[f] = {
            chunks: [
              {
                mimetype: "url/" + h.storedData.mimeType,
                data: ft(u)
              }
            ]
          };
        } else
          console.error("Skipping unexpected content part");
  const c = {
    planStep: {
      stepName: "GenerateWebpage",
      modelApi: "generate_webpage",
      inputParameters: o,
      systemPrompt: "",
      stepIntent: "",
      output: ck,
      options: {
        disablePromptRewrite: !0,
        renderMode: s,
        modelName: i,
        systemInstruction: t
      }
    },
    execution_inputs: a
  };
  console.log("request body"), console.log(c);
  const d = await Zn(n, e, c, {
    expectedDurationInSec: 70
  });
  if (!S(d)) {
    let p;
    return d.$error.includes("The service is currently unavailable") ? p = "Request timed out. The model may be experiencing heavy load" : p = d.$error, E("Webpage generation failed: " + p);
  }
  return Bn(d.chunks, "model");
}
async function Hh(n, e, t, r, s, i) {
  return (await e.context.flags?.flags())?.streamGenWebpage ?? !1 ? (console.log("[html-generator] Using streaming API for GenerateWebpage"), lk(
    n,
    e,
    t,
    r,
    i
  )) : (console.log(
    "[html-generator] Using legacy executeStep for GenerateWebpage"
  ), dk(
    n,
    e,
    t,
    r,
    s,
    i
  ));
}
const pk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  callGenWebpage: Hh
}, Symbol.toStringTag, { value: "Module" })), uk = "AI Image Tool", Vh = "generated_image", hk = "ai_image_tool";
async function Yi(n, e, t, r, s, i, a = "1:1") {
  const o = [];
  for (const h of s) {
    let f;
    if (Xu(h)) {
      const u = await Qu(
        e,
        h.parts.at(-1)
      );
      if (!S(u)) return u;
      o.push(eh(u));
    } else
      f = _w(h), f && f != null && typeof f != "string" && o.push({
        mimetype: f.mimeType,
        data: f.data
      });
  }
  const l = ["input_instruction"];
  o.length > 0 && l.push("input_image"), console.log("Number of input images: " + String(o.length));
  const c = {
    input_instruction: {
      chunks: [
        {
          mimetype: "text/plain",
          data: ft(r)
        }
      ]
    },
    aspect_ratio_key: {
      chunks: [
        {
          mimetype: "text/plain",
          data: ft(a)
        }
      ]
    }
  };
  o.length > 0 && (c.input_image = {
    chunks: o
  });
  const p = await Zn(n, e, {
    planStep: {
      stepName: uk,
      modelApi: hk,
      inputParameters: l,
      systemPrompt: "",
      options: {
        modelName: t,
        disablePromptRewrite: i
      },
      output: Vh
    },
    execution_inputs: c
  }, {
    expectedDurationInSec: 50
  });
  return S(p) ? p.chunks : p;
}
async function Yh(n, e, t, r = "1:1") {
  const s = {};
  s.image_prompt = {
    chunks: [
      {
        mimetype: "text/plain",
        data: ft(t)
      }
    ]
  }, s.aspect_ratio_key = {
    chunks: [
      {
        mimetype: "text/plain",
        data: ft(r)
      }
    ]
  };
  const o = await Zn(n, e, {
    planStep: {
      stepName: "GenerateImage",
      modelApi: "image_generation",
      inputParameters: ["image_prompt"],
      systemPrompt: "",
      output: Vh
    },
    execution_inputs: s
  }, {
    expectedDurationInSec: 50
  });
  return S(o) ? o.chunks : o;
}
function Jh(n, e, t, r) {
  const s = t?.length ? "using conversation context and these additional" : "with these", i = J`Generate a single text-to-image prompt ${s} instructions:
${r}

Typical output format:
"""
Create the following image:

## Setting/background

<Detailed description of everything that is in the background of the image.>

## Foreground/focus

<Detailed description of object and/or shapes that are in the foreground and are the main focal point of the image. Include the composition and layout of the image.>

## Style

<Detailed description of the style, color scheme, vibe, kind of drawing (illustration, photorealistic, etc.)>

You output will be fed directly into the text-to-image model, so it must be a prompt only, no additional chit-chat
"""
`;
  return new Se(n, e, {
    body: {
      contents: Ot(i.asContent(), t),
      systemInstruction: B(`
You are a creative writer whose specialty is to write prompts for text-to-image models.

The prompt must describe every object in the image in great detail and describe the style
in terms of color scheme and vibe. Be sure to respect all user provided instructions.
`)
    }
  });
}
const fk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  callGeminiImage: Yi,
  callImageGen: Yh,
  promptExpander: Jh
}, Symbol.toStringTag, { value: "Module" }));
class st {
  constructor(e, t) {
    this.caps = e, this.moduleArgs = t;
  }
  #e(e) {
    if (!e.inputSchema?.properties) return !0;
    const t = e.inputSchema.properties.context;
    return t && t.type === "array" && t.items ? !!t.items.behavior?.includes("llm-content") : !1;
  }
  async transform(e) {
    if (!this.#e(e))
      return null;
    const { title: t, description: r } = e;
    if (!t || !r)
      return E("Custom tool must have a title and a description");
    const s = [], i = Object.fromEntries(
      Object.entries(e.inputSchema?.properties || {}).filter(([l]) => l === "context" ? !1 : (s.push(l), !0)).map(([l, c]) => [
        l,
        {
          ...c,
          type: "string"
        }
      ])
    );
    if (s.length > 0)
      return {
        ...e,
        inputSchema: {
          type: "object",
          properties: i,
          required: s
        }
      };
    const a = await new Se(this.caps, this.moduleArgs, {
      body: {
        contents: [this.prompt(e)],
        safetySettings: We(),
        generationConfig: {
          responseSchema: this.schema(),
          responseMimeType: "application/json"
        }
      }
    }).invoke();
    if (!S(a)) return a;
    const o = a.last.parts.at(0).json;
    return {
      ...e,
      inputSchema: {
        type: "object",
        properties: {
          context: {
            type: "string",
            description: o.description
          }
        }
      }
    };
  }
  schema() {
    return {
      type: "object",
      properties: {
        description: {
          type: "string",
          description: "One-sentence description of a function argument"
        }
      }
    };
  }
  prompt(e) {
    return J`
You are amazing at describing things. Today, you will be coming up a one-sentence description 
of a function argument.

The function's title is: ${e.title}

The function's description is ${e.description}

It takes a single argument.

Come up with a one-sentence description of this argument based on the title/description,
with the aim of using this description in a JSON Schema.
`.asContent();
  }
}
const mk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArgumentNameGenerator: st
}, Symbol.toStringTag, { value: "Module" })), gk = "generative-image", yk = ["1:1", "9:16", "16:9", "4:3", "3:4"];
function bk(n, e, t, r, s) {
  const i = J`
Analyze the instruction below and rather than following it, determine what information needs to be gathered to 
generate an accurate prompt for a text-to-image model in the next turn:
-- begin instruction --
${r}
-- end instruction --

Call the tools to gather the necessary information that could be used to create an accurate prompt.`;
  return new Se(
    n,
    e,
    {
      body: {
        contents: Ot(i.asContent(), t),
        tools: s.list(),
        systemInstruction: B(`
You are a researcher whose specialty is to call tools whose output helps gather the necessary information
to be used to create an accurate prompt for a text-to-image model.
`)
      }
    },
    s
  );
}
const Fp = 5;
async function po({
  context: n,
  instruction: e,
  "p-aspect-ratio": t,
  "p-model-name": r,
  ...s
}, i, a) {
  n ??= [], e || (e = B("")), t || (t = "1:1");
  let o = qn(n);
  const l = ls(n), c = new rt(
    i,
    a,
    new st(i, a)
  ), d = await new q(i, e).substitute(
    s,
    async (y) => c.addTool(y)
  );
  if (!S(d))
    return d;
  const p = [...n];
  if (c.hasTools()) {
    const y = await bk(
      i,
      a,
      p,
      d,
      c
    ).invoke();
    if (!S(y)) return y;
    p.push(...y.all);
  }
  const h = qn([d]), f = d ? B(vn(ls([d]))) : B("");
  o = o.concat(h);
  let u = Fp;
  for (; u--; )
    if (o.length > 0) {
      console.log("Step has reference image, using Gemini Image API: i2i");
      const y = f ? ce(f) : "", v = vn(
        ca(y, l, !1)
      ).trim();
      if (!v)
        return E(
          "An image editing instruction must be provided along side the reference image."
        );
      const x = v + `
Aspect ratio: ` + t;
      console.log("PROMPT: " + x);
      const m = await Yi(
        i,
        a,
        r,
        x,
        o,
        !0,
        t
      );
      return S(m) ? { context: [Bn(m, "model")] } : m;
    } else {
      console.log("Step has text only, using Gemini Image API: t2i");
      const y = B(ce(Ot(f, p))), v = ce(y).trim();
      console.log("PROMPT", v);
      const x = await Yi(
        i,
        a,
        r,
        v,
        [],
        !0,
        t
      );
      return S(x) ? { context: [Bn(x, "model")] } : x;
    }
  return E(`Failed to generate an image after ${Fp} tries.`);
}
async function uo({ inputs: { instruction: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        instruction: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Instruction",
          description: "Describe how to generate the image (content, style, etc). Use @ to reference params or outputs from other steps.",
          default: Mt()
        },
        "p-aspect-ratio": {
          type: "string",
          behavior: ["hint-text", "config", "hint-advanced"],
          title: "Aspect Ratio",
          enum: yk,
          description: "The aspect ratio of the generated image",
          default: "1:1"
        },
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["hint-image", "main-port"]
        }
      }
    },
    title: "Edit Image",
    metadata: {
      icon: gk,
      tags: ["quick-access", "generative"],
      order: 2
    }
  };
}
const vk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: po,
  describe: uo
}, Symbol.toStringTag, { value: "Module" })), wk = "generative-image", Kh = ["1:1", "9:16", "16:9", "4:3", "3:4"];
function Oi({ pro: n }) {
  return (e) => {
    const t = n ? "pro" : "flash", r = e["p-aspect-ratio"];
    return `Generate an image using the prompt below. Use that prompt exactly.${r ? ` Provide image in ${r} aspect ratio.` : ""}. Use the "${t}" model for image generation.

PROMPT:`;
  };
}
function xk(n, e, t, r, s) {
  const i = J`
Analyze the instruction below and rather than following it, determine what information needs to be gathered to 
generate an accurate prompt for a text-to-image model in the next turn:
-- begin instruction --
${r}
-- end instruction --

Call the tools to gather the necessary information that could be used to create an accurate prompt.`;
  return new Se(
    n,
    e,
    {
      body: {
        contents: Ot(i.asContent(), t),
        tools: s.list(),
        systemInstruction: B(`
You are a researcher whose specialty is to call tools whose output helps gather the necessary information
to be used to create an accurate prompt for a text-to-image model.
`)
      }
    },
    s
  );
}
const zp = 5;
async function Zh({
  context: n,
  instruction: e,
  "p-disable-prompt-rewrite": t,
  "p-aspect-ratio": r,
  ...s
}, i, a) {
  n ??= [], e || (e = B("")), (!r || !Kh.includes(r)) && (r = "1:1");
  let o = qn(n);
  const l = new rt(
    i,
    a,
    new st(i, a)
  ), c = await new q(i, e).substitute(
    s,
    async (u) => l.addTool(u)
  );
  if (!S(c))
    return c;
  const d = [...n];
  if (l.hasTools()) {
    const u = await xk(
      i,
      a,
      d,
      c,
      l
    ).invoke();
    if (!S(u)) return u;
    d.push(...u.all);
  }
  const p = qn([c]), h = c ? B(vn(ls([c]))) : B("");
  o = o.concat(p);
  let f = zp;
  for (; f--; ) {
    if (o.length > 0)
      return E(
        "References images are not supported with Imagen. For image editing or style transfer, try Gemini Image Generation."
      );
    {
      console.log("Step has text only, using generation API");
      let u;
      if (t)
        u = B(ce(Ot(h, d)));
      else {
        const x = await Jh(
          i,
          a,
          d,
          h
        ).invoke();
        if (!S(x)) return x;
        u = x.last;
      }
      const y = ce(u).trim();
      console.log("PROMPT", y);
      const v = await Yh(
        i,
        a,
        y,
        r
      );
      return S(v) ? { context: [Bn(v, "model")] } : v;
    }
  }
  return E(`Failed to generate an image after ${zp} tries.`);
}
async function Xh({ inputs: { instruction: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        instruction: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Instruction",
          description: "Describe how to generate the image (content, style, etc). Use @ to reference params or outputs from other steps.",
          default: Mt()
        },
        "p-disable-prompt-rewrite": {
          type: "boolean",
          title: "Disable prompt expansion",
          behavior: ["config", "hint-advanced"],
          description: "By default, inputs and instructions will be automatically expanded into a high quality image prompt. Check to disable this re-writing behavior."
        },
        "p-aspect-ratio": {
          type: "string",
          behavior: ["hint-text", "config", "hint-advanced"],
          title: "Aspect Ratio",
          enum: Kh,
          description: "The aspect ratio of the generated image",
          default: "1:1"
        },
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["hint-image", "main-port"]
        }
      }
    },
    title: "Make Image",
    metadata: {
      icon: wk,
      tags: ["quick-access", "generative"],
      order: 2
    }
  };
}
const _k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zh,
  describe: Xh,
  makeImageInstruction: Oi
}, Symbol.toStringTag, { value: "Module" }));
async function Pe({ output: n }, e) {
  const { actor: t, category: r, name: s, details: i, icon: a } = e, o = typeof i == "string" ? {
    title: s,
    type: "string",
    format: "markdown"
  } : {
    title: s,
    type: "object",
    behavior: ["llm-content"]
  };
  a && (o.icon = a);
  const l = {
    type: "object",
    properties: {
      details: o
    }
  }, { delivered: c } = await n({
    $metadata: {
      title: t,
      description: r,
      icon: a
    },
    schema: l,
    details: i
  });
  return c;
}
const kk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  report: Pe
}, Symbol.toStringTag, { value: "Module" })), Qh = "generative-code";
function Sk(n, e, t, r, s, i) {
  const a = `
Analyze the instruction below and rather than following it, determine what information needs to be gathered to 
generate an accurate prompt for a text-to-${s} model in the next turn:
-- begin instruction --
${ce(r)}
-- end instruction --

Call the tools to gather the necessary information that could be used to create an accurate prompt.`;
  return new Cl(
    n,
    e,
    {
      model: "gemini-1.5-flash-latest",
      body: {
        contents: Ot(a, t),
        tools: i.list(),
        systemInstruction: B(`
You are a researcher whose specialty is to call tools whose output helps gather the necessary information
to be used to create an accurate prompt for a text-to-${s} model.
`)
      }
    },
    i
  );
}
function Ik(n, e, t, r, s) {
  const i = t?.length ? "using conversation context and these additional" : "with these", a = `Generate a single text-to-${s} prompt ${i} instructions:
${ce(r)}

Typical output format:

## Setting/background

Detailed description of everything that is understood about the ${s} code that is being requested.

## Primary focus

Detailed description of the primary functionality or the main focal point of the JavaScript code.

## Style

Detailed description of the style and approach of the code (defensive, TDD, creative, etc.). The output should
always an invariably be ${s === "JavaScript" ? "EcmaScript JavaScript Modules" : s} and be fully functional 
without any placeholders. 

If you are dealing with JavaScript you may use imports if and only if the instruction indicates, otherwise you must
create the functionality as a standalone piece of EcmaScript JavaScript.

You output will be fed directly into the text-to-${s} model, so it must be prompt only, no additional chit-chat
`;
  return new Cl(n, e, {
    model: "gemini-1.5-flash-latest",
    body: {
      contents: Ot(a, t),
      systemInstruction: B(`
You are a world-class ${s} developer whose specialty is to write prompts for text-to-${s} models that 
always generate valid outputs.

The prompt must describe every aspect of the functionality in great detail and describe the problem being solved 
in terms of data structures, algorithms, and style. You must use the instruction to fully understand and replicate
any reference implementations you've been given and you must not augment or deviate from that style. You should
ensure that the prompt includes enough information to fully replicate that style with examples and maximal clarity.

If the code pertains to user interface work, you must also maximize the accessibility of the code generated with
appropriate titles and labels for buttons, controls, inputs, etc, and they should never be empty.

Be sure to export all relevant symbols so that the code can be used outside of the EcmaScript Module. Always do
this as named symbols rather than using default exports.

If writing JavaScript, and where a variable is private, use private fields (#field) rather than an underscore at the start.
`)
    }
  });
}
function $k(n, e, t, r) {
  return t.role = "user", t.parts.unshift({
    text: `Generate ${r} code based on this prompt. Output code only, no chit-chat`
  }), new Cl(n, e, {
    body: {
      contents: [t],
      generationConfig: {
        responseModalities: ["TEXT"]
      },
      safetySettings: We()
    }
  });
}
class Cl {
  constructor(e, t, r, s) {
    this.caps = e, this.moduleArgs = t, this.inputs = r, this.toolManager = s;
  }
  async invoke() {
    const e = await Wn(this.inputs, this.caps, this.moduleArgs);
    if (!S(e)) return e;
    if ("context" in e)
      return E("Invalid output from Gemini -- must be candidates");
    const t = e.candidates.at(0)?.content;
    if (!t)
      return E("No content from Gemini");
    const r = await this.toolManager?.callTools(t, !1, []);
    if (!S(r)) return r;
    const { results: s = [] } = r || {}, i = [t];
    return s.length && i.push(B(s.join(`

`))), { all: i, last: i.at(-1) };
  }
}
function Ck(n, e) {
  return Pe(n, {
    actor: "Make Code",
    category: "Warning",
    name: "Graceful exit",
    details: `I tried a couple of times, but the Gemini API failed to generate the code you requested with the following error:

### ${e.$error}

To keep things moving, I will return a blank result. My apologies!`,
    icon: Qh
  }), { context: [B(" ")] };
}
const Lp = 5;
async function Tk({ context: n, instruction: e, language: t, ...r }, s, i) {
  n ??= [];
  const a = new rt(
    s,
    i,
    new st(s, i)
  ), o = await new q(s, e).substitute(
    r,
    async (c) => a.addTool(c)
  );
  if (!S(o))
    return o;
  if (e = o, a.hasTools()) {
    const c = await Sk(
      s,
      i,
      n,
      e,
      t,
      a
    ).invoke();
    if (!S(c)) return c;
    n.push(...c.all);
  }
  let l = Lp;
  for (; l--; ) {
    const c = await Ik(
      s,
      i,
      n,
      e,
      t
    ).invoke();
    if (!S(c)) return c;
    console.log("PROMPT", ce(c.last));
    const d = await $k(
      s,
      i,
      c.last,
      t
    ).invoke();
    return S(d) ? { context: d.all } : d;
  }
  return Ck(
    s,
    E(`Failed to generate ${t} after ${Lp} tries.`)
  );
}
async function Ek({ inputs: { instruction: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        instruction: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Instruction",
          description: "Describe how to generate the JavaScript based on the input: focus, functionality, aim of the code"
        },
        language: {
          type: "string",
          behavior: ["hint-text", "config", "hint-preview"],
          title: "Language",
          icon: "frame-source",
          enum: ["JavaScript", "HTML", "CSS"],
          description: "The language you'd like to generate",
          default: "JavaScript"
        },
        ...t.schemas()
      },
      ...t.requireds(),
      additionalProperties: !1
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["hint-code", "main-port"]
        }
      },
      additionalProperties: !1
    },
    title: "Make Code",
    metadata: {
      icon: Qh,
      tags: ["quick-access", "generative", "experimental"],
      order: 2
    }
  };
}
const Pk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tk,
  describe: Ek
}, Symbol.toStringTag, { value: "Module" }));
async function Ak(n, e) {
  return e ? Be(
    n,
    `${Xn}/${encodeURIComponent(e)}`,
    "GET"
  ) : E("Please supply file id.");
}
async function da(n, e) {
  return e ? Be(n, Xn, "POST", e) : E("Please supply the body of the file to create.");
}
async function Mk(n, e) {
  return e ? Be(
    n,
    `${Xn}/${encodeURIComponent(e)}`,
    "DELETE"
  ) : E("Please supply the id of the file to delete");
}
async function Ok(n, e, t) {
  return e ? Be(
    n,
    `${Xn}/${encodeURIComponent(e)}/export?mimeType=${t}`,
    "GET"
  ) : E("Please supply the file id to export.");
}
async function jk(n, e) {
  return e ? Be(
    n,
    `${hh}/${encodeURIComponent(e)}`,
    "GET"
  ) : E("Please supply the doc id to get.");
}
async function ef(n, e, t) {
  return e ? t ? Be(
    n,
    `${hh}/${encodeURIComponent(e)}:batchUpdate`,
    "POST",
    t
  ) : E("Please supply the body of the doc update request.") : E("Please supply the id of the doc to update.");
}
async function ho(n, e) {
  return Be(
    n,
    `${gl}/${encodeURIComponent(e)}`,
    "GET"
  );
}
async function Rk(n, e) {
  return Be(n, gl, "POST", { title: e });
}
async function tf(n, e, t) {
  return e ? t ? Be(
    n,
    `${gl}/${encodeURIComponent(e)}:batchUpdate`,
    "POST",
    t
  ) : E("Please supply the body of the presentation update request.") : E("Please supply the id of the presentation to update.");
}
async function Ji(n, e) {
  return e ? Be(
    n,
    `${Es}/${encodeURIComponent(e)}?fields=sheets.properties`,
    "GET"
  ) : E("Please supply the id of the spreadsheet to update.");
}
async function fo(n, e, t) {
  return Be(
    n,
    `${Es}/${encodeURIComponent(e)}/values/${t}`,
    "GET"
  );
}
async function gs(n, e, t) {
  return Be(
    n,
    `${Es}/${encodeURIComponent(e)}:batchUpdate`,
    "POST",
    { requests: t }
  );
}
async function Ki(n, e, t, r) {
  return Be(
    n,
    `${Es}/${encodeURIComponent(e)}/values/${encodeURIComponent(t)}?valueInputOption=USER_ENTERED`,
    "PUT",
    { values: r }
  );
}
async function nf(n, e, t, r) {
  return e ? r ? Be(
    n,
    `${Es}/${encodeURIComponent(e)}/values/${encodeURIComponent(t)}:append?valueInputOption=USER_ENTERED`,
    "POST",
    r
  ) : E("Please supply the body of the spreadsheet update request.") : E("Please supply the id of the spreadsheet to update.");
}
async function rf({ fetchWithCreds: n, context: e }, t, r) {
  const s = `-------${crypto.randomUUID()}`, i = `${ao}?uploadType=multipart`;
  try {
    const a = `--${s}\r
`, o = `\r
--${s}--`, l = `Content-Type: application/json; charset=UTF-8\r
\r
${JSON.stringify(t)}\r
`, c = `Content-Type: ${r.type}\r
\r
`, d = new Blob(
      [
        a,
        l,
        a,
        c,
        r,
        o
      ],
      { type: `multipart/related; boundary=${s}` }
    ), p = {
      method: "POST",
      headers: {
        // Fetch will correctly set the Content-Type header from the Blob
      },
      body: d,
      signal: e.signal
    }, h = await n(i, p);
    if (!h.ok) {
      const f = await h.json();
      return E(
        `Upload failed: ${f.error?.message || h.statusText}`
      );
    }
    return h.json();
  } catch (a) {
    return E(a instanceof Error ? a.message : String(a));
  }
}
async function Be({ fetchWithCreds: n, context: e }, t, r, s = null) {
  try {
    const i = {
      method: r,
      signal: e.signal
    };
    s && (i.body = JSON.stringify(s));
    const o = await (await n(t, i)).json();
    if ("error" in o) {
      const l = o;
      return console.error("Drive Error", o), E(l.error.message);
    }
    return o;
  } catch (i) {
    return E(i.message);
  }
}
const Dk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appendSpreadsheetValues: nf,
  create: da,
  createPresentation: Rk,
  del: Mk,
  exp: Ok,
  get: Ak,
  getDoc: jk,
  getPresentation: ho,
  getSpreadsheetMetadata: Ji,
  getSpreadsheetValues: fo,
  setSpreadsheetValues: Ki,
  updateDoc: ef,
  updatePresentation: tf,
  updateSpreadsheet: gs,
  upload: rf
}, Symbol.toStringTag, { value: "Module" }));
function Tl() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var kn = Tl();
function sf(n) {
  kn = n;
}
var ns = { exec: () => null };
function X(n, e = "") {
  let t = typeof n == "string" ? n : n.source, r = { replace: (s, i) => {
    let a = typeof i == "string" ? i : i.source;
    return a = a.replace(Ee.caret, "$1"), t = t.replace(s, a), r;
  }, getRegex: () => new RegExp(t, e) };
  return r;
}
var Uk = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), Ee = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (n) => new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}#`), htmlBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}<(?:[a-z].*>|!--)`, "i") }, Nk = /^(?:[ \t]*(?:\n|$))+/, Gk = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Fk = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, As = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, zk = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, El = /(?:[*+-]|\d{1,9}[.)])/, af = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, of = X(af).replace(/bull/g, El).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Lk = X(af).replace(/bull/g, El).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Pl = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Wk = /^[^\n]+/, Al = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Bk = X(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Al).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), qk = X(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, El).getRegex(), pa = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ml = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Hk = X("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ml).replace("tag", pa).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), lf = X(Pl).replace("hr", As).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", pa).getRegex(), Vk = X(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", lf).getRegex(), Ol = { blockquote: Vk, code: Gk, def: Bk, fences: Fk, heading: zk, hr: As, html: Hk, lheading: of, list: qk, newline: Nk, paragraph: lf, table: ns, text: Wk }, Wp = X("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", As).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", pa).getRegex(), Yk = { ...Ol, lheading: Lk, table: Wp, paragraph: X(Pl).replace("hr", As).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Wp).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", pa).getRegex() }, Jk = { ...Ol, html: X(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ml).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: ns, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: X(Pl).replace("hr", As).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", of).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Kk = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Zk = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, cf = /^( {2,}|\\)\n(?!\s*$)/, Xk = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ua = /[\p{P}\p{S}]/u, jl = /[\s\p{P}\p{S}]/u, df = /[^\s\p{P}\p{S}]/u, Qk = X(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, jl).getRegex(), pf = /(?!~)[\p{P}\p{S}]/u, eS = /(?!~)[\s\p{P}\p{S}]/u, tS = /(?:[^\s\p{P}\p{S}]|~)/u, nS = X(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Uk ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), uf = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, rS = X(uf, "u").replace(/punct/g, ua).getRegex(), sS = X(uf, "u").replace(/punct/g, pf).getRegex(), hf = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", iS = X(hf, "gu").replace(/notPunctSpace/g, df).replace(/punctSpace/g, jl).replace(/punct/g, ua).getRegex(), aS = X(hf, "gu").replace(/notPunctSpace/g, tS).replace(/punctSpace/g, eS).replace(/punct/g, pf).getRegex(), oS = X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, df).replace(/punctSpace/g, jl).replace(/punct/g, ua).getRegex(), lS = X(/\\(punct)/, "gu").replace(/punct/g, ua).getRegex(), cS = X(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), dS = X(Ml).replace("(?:-->|$)", "-->").getRegex(), pS = X("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", dS).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Zi = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, uS = X(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Zi).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ff = X(/^!?\[(label)\]\[(ref)\]/).replace("label", Zi).replace("ref", Al).getRegex(), mf = X(/^!?\[(ref)\](?:\[\])?/).replace("ref", Al).getRegex(), hS = X("reflink|nolink(?!\\()", "g").replace("reflink", ff).replace("nolink", mf).getRegex(), Bp = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Rl = { _backpedal: ns, anyPunctuation: lS, autolink: cS, blockSkip: nS, br: cf, code: Zk, del: ns, emStrongLDelim: rS, emStrongRDelimAst: iS, emStrongRDelimUnd: oS, escape: Kk, link: uS, nolink: mf, punctuation: Qk, reflink: ff, reflinkSearch: hS, tag: pS, text: Xk, url: ns }, fS = { ...Rl, link: X(/^!?\[(label)\]\((.*?)\)/).replace("label", Zi).getRegex(), reflink: X(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Zi).getRegex() }, mo = { ...Rl, emStrongRDelimAst: aS, emStrongLDelim: sS, url: X(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Bp).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: X(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Bp).getRegex() }, mS = { ...mo, br: X(cf).replace("{2,}", "*").getRegex(), text: X(mo.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, gi = { normal: Ol, gfm: Yk, pedantic: Jk }, pr = { normal: Rl, gfm: mo, breaks: mS, pedantic: fS }, gS = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, qp = (n) => gS[n];
function vt(n, e) {
  if (e) {
    if (Ee.escapeTest.test(n)) return n.replace(Ee.escapeReplace, qp);
  } else if (Ee.escapeTestNoEncode.test(n)) return n.replace(Ee.escapeReplaceNoEncode, qp);
  return n;
}
function Hp(n) {
  try {
    n = encodeURI(n).replace(Ee.percentDecode, "%");
  } catch {
    return null;
  }
  return n;
}
function Vp(n, e) {
  let t = n.replace(Ee.findPipe, (i, a, o) => {
    let l = !1, c = a;
    for (; --c >= 0 && o[c] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), r = t.split(Ee.splitPipe), s = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !r.at(-1)?.trim() && r.pop(), e) if (r.length > e) r.splice(e);
  else for (; r.length < e; ) r.push("");
  for (; s < r.length; s++) r[s] = r[s].trim().replace(Ee.slashPipe, "|");
  return r;
}
function ur(n, e, t) {
  let r = n.length;
  if (r === 0) return "";
  let s = 0;
  for (; s < r && n.charAt(r - s - 1) === e; )
    s++;
  return n.slice(0, r - s);
}
function yS(n, e) {
  if (n.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let r = 0; r < n.length; r++) if (n[r] === "\\") r++;
  else if (n[r] === e[0]) t++;
  else if (n[r] === e[1] && (t--, t < 0)) return r;
  return t > 0 ? -2 : -1;
}
function Yp(n, e, t, r, s) {
  let i = e.href, a = e.title || null, o = n[1].replace(s.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  let l = { type: n[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: a, text: o, tokens: r.inlineTokens(o) };
  return r.state.inLink = !1, l;
}
function bS(n, e, t) {
  let r = n.match(t.other.indentCodeCompensation);
  if (r === null) return e;
  let s = r[1];
  return e.split(`
`).map((i) => {
    let a = i.match(t.other.beginningSpace);
    if (a === null) return i;
    let [o] = a;
    return o.length >= s.length ? i.slice(s.length) : i;
  }).join(`
`);
}
var Xi = class {
  options;
  rules;
  lexer;
  constructor(n) {
    this.options = n || kn;
  }
  space(n) {
    let e = this.rules.block.newline.exec(n);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(n) {
    let e = this.rules.block.code.exec(n);
    if (e) {
      let t = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? t : ur(t, `
`) };
    }
  }
  fences(n) {
    let e = this.rules.block.fences.exec(n);
    if (e) {
      let t = e[0], r = bS(t, e[3] || "", this.rules);
      return { type: "code", raw: t, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: r };
    }
  }
  heading(n) {
    let e = this.rules.block.heading.exec(n);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        let r = ur(t, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (t = r.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: t, tokens: this.lexer.inline(t) };
    }
  }
  hr(n) {
    let e = this.rules.block.hr.exec(n);
    if (e) return { type: "hr", raw: ur(e[0], `
`) };
  }
  blockquote(n) {
    let e = this.rules.block.blockquote.exec(n);
    if (e) {
      let t = ur(e[0], `
`).split(`
`), r = "", s = "", i = [];
      for (; t.length > 0; ) {
        let a = !1, o = [], l;
        for (l = 0; l < t.length; l++) if (this.rules.other.blockquoteStart.test(t[l])) o.push(t[l]), a = !0;
        else if (!a) o.push(t[l]);
        else break;
        t = t.slice(l);
        let c = o.join(`
`), d = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${c}` : c, s = s ? `${s}
${d}` : d;
        let p = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(d, i, !0), this.lexer.state.top = p, t.length === 0) break;
        let h = i.at(-1);
        if (h?.type === "code") break;
        if (h?.type === "blockquote") {
          let f = h, u = f.raw + `
` + t.join(`
`), y = this.blockquote(u);
          i[i.length - 1] = y, r = r.substring(0, r.length - f.raw.length) + y.raw, s = s.substring(0, s.length - f.text.length) + y.text;
          break;
        } else if (h?.type === "list") {
          let f = h, u = f.raw + `
` + t.join(`
`), y = this.list(u);
          i[i.length - 1] = y, r = r.substring(0, r.length - h.raw.length) + y.raw, s = s.substring(0, s.length - f.raw.length) + y.raw, t = u.substring(i.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r, tokens: i, text: s };
    }
  }
  list(n) {
    let e = this.rules.block.list.exec(n);
    if (e) {
      let t = e[1].trim(), r = t.length > 1, s = { type: "list", raw: "", ordered: r, start: r ? +t.slice(0, -1) : "", loose: !1, items: [] };
      t = r ? `\\d{1,9}\\${t.slice(-1)}` : `\\${t}`, this.options.pedantic && (t = r ? t : "[*+-]");
      let i = this.rules.other.listItemRegex(t), a = !1;
      for (; n; ) {
        let l = !1, c = "", d = "";
        if (!(e = i.exec(n)) || this.rules.block.hr.test(n)) break;
        c = e[0], n = n.substring(c.length);
        let p = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (x) => " ".repeat(3 * x.length)), h = n.split(`
`, 1)[0], f = !p.trim(), u = 0;
        if (this.options.pedantic ? (u = 2, d = p.trimStart()) : f ? u = e[1].length + 1 : (u = e[2].search(this.rules.other.nonSpaceChar), u = u > 4 ? 1 : u, d = p.slice(u), u += e[1].length), f && this.rules.other.blankLine.test(h) && (c += h + `
`, n = n.substring(h.length + 1), l = !0), !l) {
          let x = this.rules.other.nextBulletRegex(u), m = this.rules.other.hrRegex(u), b = this.rules.other.fencesBeginRegex(u), g = this.rules.other.headingBeginRegex(u), _ = this.rules.other.htmlBeginRegex(u);
          for (; n; ) {
            let $ = n.split(`
`, 1)[0], j;
            if (h = $, this.options.pedantic ? (h = h.replace(this.rules.other.listReplaceNesting, "  "), j = h) : j = h.replace(this.rules.other.tabCharGlobal, "    "), b.test(h) || g.test(h) || _.test(h) || x.test(h) || m.test(h)) break;
            if (j.search(this.rules.other.nonSpaceChar) >= u || !h.trim()) d += `
` + j.slice(u);
            else {
              if (f || p.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || b.test(p) || g.test(p) || m.test(p)) break;
              d += `
` + h;
            }
            !f && !h.trim() && (f = !0), c += $ + `
`, n = n.substring($.length + 1), p = j.slice(u);
          }
        }
        s.loose || (a ? s.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (a = !0));
        let y = null, v;
        this.options.gfm && (y = this.rules.other.listIsTask.exec(d), y && (v = y[0] !== "[ ] ", d = d.replace(this.rules.other.listReplaceTask, ""))), s.items.push({ type: "list_item", raw: c, task: !!y, checked: v, loose: !1, text: d, tokens: [] }), s.raw += c;
      }
      let o = s.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      s.raw = s.raw.trimEnd();
      for (let l = 0; l < s.items.length; l++) if (this.lexer.state.top = !1, s.items[l].tokens = this.lexer.blockTokens(s.items[l].text, []), !s.loose) {
        let c = s.items[l].tokens.filter((p) => p.type === "space"), d = c.length > 0 && c.some((p) => this.rules.other.anyLine.test(p.raw));
        s.loose = d;
      }
      if (s.loose) for (let l = 0; l < s.items.length; l++) s.items[l].loose = !0;
      return s;
    }
  }
  html(n) {
    let e = this.rules.block.html.exec(n);
    if (e) return { type: "html", block: !0, raw: e[0], pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: e[0] };
  }
  def(n) {
    let e = this.rules.block.def.exec(n);
    if (e) {
      let t = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: t, raw: e[0], href: r, title: s };
    }
  }
  table(n) {
    let e = this.rules.block.table.exec(n);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let t = Vp(e[1]), r = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), s = e[3]?.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (t.length === r.length) {
      for (let a of r) this.rules.other.tableAlignRight.test(a) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? i.align.push("left") : i.align.push(null);
      for (let a = 0; a < t.length; a++) i.header.push({ text: t[a], tokens: this.lexer.inline(t[a]), header: !0, align: i.align[a] });
      for (let a of s) i.rows.push(Vp(a, i.header.length).map((o, l) => ({ text: o, tokens: this.lexer.inline(o), header: !1, align: i.align[l] })));
      return i;
    }
  }
  lheading(n) {
    let e = this.rules.block.lheading.exec(n);
    if (e) return { type: "heading", raw: e[0], depth: e[2].charAt(0) === "=" ? 1 : 2, text: e[1], tokens: this.lexer.inline(e[1]) };
  }
  paragraph(n) {
    let e = this.rules.block.paragraph.exec(n);
    if (e) {
      let t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: t, tokens: this.lexer.inline(t) };
    }
  }
  text(n) {
    let e = this.rules.block.text.exec(n);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(n) {
    let e = this.rules.inline.escape.exec(n);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(n) {
    let e = this.rules.inline.tag.exec(n);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(n) {
    let e = this.rules.inline.link.exec(n);
    if (e) {
      let t = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(t)) {
        if (!this.rules.other.endAngleBracket.test(t)) return;
        let i = ur(t.slice(0, -1), "\\");
        if ((t.length - i.length) % 2 === 0) return;
      } else {
        let i = yS(e[2], "()");
        if (i === -2) return;
        if (i > -1) {
          let a = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, a).trim(), e[3] = "";
        }
      }
      let r = e[2], s = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(r);
        i && (r = i[1], s = i[3]);
      } else s = e[3] ? e[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? r = r.slice(1) : r = r.slice(1, -1)), Yp(e, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: s && s.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(n, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(n)) || (t = this.rules.inline.nolink.exec(n))) {
      let r = (t[2] || t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), s = e[r.toLowerCase()];
      if (!s) {
        let i = t[0].charAt(0);
        return { type: "text", raw: i, text: i };
      }
      return Yp(t, s, t[0], this.lexer, this.rules);
    }
  }
  emStrong(n, e, t = "") {
    let r = this.rules.inline.emStrongLDelim.exec(n);
    if (!(!r || r[3] && t.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[2]) || !t || this.rules.inline.punctuation.exec(t))) {
      let s = [...r[0]].length - 1, i, a, o = s, l = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, e = e.slice(-1 * n.length + s); (r = c.exec(e)) != null; ) {
        if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i) continue;
        if (a = [...i].length, r[3] || r[4]) {
          o += a;
          continue;
        } else if ((r[5] || r[6]) && s % 3 && !((s + a) % 3)) {
          l += a;
          continue;
        }
        if (o -= a, o > 0) continue;
        a = Math.min(a, a + o + l);
        let d = [...r[0]][0].length, p = n.slice(0, s + r.index + d + a);
        if (Math.min(s, a) % 2) {
          let f = p.slice(1, -1);
          return { type: "em", raw: p, text: f, tokens: this.lexer.inlineTokens(f) };
        }
        let h = p.slice(2, -2);
        return { type: "strong", raw: p, text: h, tokens: this.lexer.inlineTokens(h) };
      }
    }
  }
  codespan(n) {
    let e = this.rules.inline.code.exec(n);
    if (e) {
      let t = e[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(t), s = this.rules.other.startingSpaceChar.test(t) && this.rules.other.endingSpaceChar.test(t);
      return r && s && (t = t.substring(1, t.length - 1)), { type: "codespan", raw: e[0], text: t };
    }
  }
  br(n) {
    let e = this.rules.inline.br.exec(n);
    if (e) return { type: "br", raw: e[0] };
  }
  del(n) {
    let e = this.rules.inline.del.exec(n);
    if (e) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
  }
  autolink(n) {
    let e = this.rules.inline.autolink.exec(n);
    if (e) {
      let t, r;
      return e[2] === "@" ? (t = e[1], r = "mailto:" + t) : (t = e[1], r = t), { type: "link", raw: e[0], text: t, href: r, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  url(n) {
    let e;
    if (e = this.rules.inline.url.exec(n)) {
      let t, r;
      if (e[2] === "@") t = e[0], r = "mailto:" + t;
      else {
        let s;
        do
          s = e[0], e[0] = this.rules.inline._backpedal.exec(e[0])?.[0] ?? "";
        while (s !== e[0]);
        t = e[0], e[1] === "www." ? r = "http://" + e[0] : r = e[0];
      }
      return { type: "link", raw: e[0], text: t, href: r, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  inlineText(n) {
    let e = this.rules.inline.text.exec(n);
    if (e) {
      let t = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: t };
    }
  }
}, ct = class go {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || kn, this.options.tokenizer = this.options.tokenizer || new Xi(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let t = { other: Ee, block: gi.normal, inline: pr.normal };
    this.options.pedantic ? (t.block = gi.pedantic, t.inline = pr.pedantic) : this.options.gfm && (t.block = gi.gfm, this.options.breaks ? t.inline = pr.breaks : t.inline = pr.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: gi, inline: pr };
  }
  static lex(e, t) {
    return new go(t).lex(e);
  }
  static lexInline(e, t) {
    return new go(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(Ee.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let r = this.inlineQueue[t];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], r = !1) {
    for (this.options.pedantic && (e = e.replace(Ee.tabCharGlobal, "    ").replace(Ee.spaceLine, "")); e; ) {
      let s;
      if (this.options.extensions?.block?.some((a) => (s = a.call({ lexer: this }, e, t)) ? (e = e.substring(s.raw.length), t.push(s), !0) : !1)) continue;
      if (s = this.tokenizer.space(e)) {
        e = e.substring(s.raw.length);
        let a = t.at(-1);
        s.raw.length === 1 && a !== void 0 ? a.raw += `
` : t.push(s);
        continue;
      }
      if (s = this.tokenizer.code(e)) {
        e = e.substring(s.raw.length);
        let a = t.at(-1);
        a?.type === "paragraph" || a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + s.raw, a.text += `
` + s.text, this.inlineQueue.at(-1).src = a.text) : t.push(s);
        continue;
      }
      if (s = this.tokenizer.fences(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.heading(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.hr(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.blockquote(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.list(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.html(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.def(e)) {
        e = e.substring(s.raw.length);
        let a = t.at(-1);
        a?.type === "paragraph" || a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + s.raw, a.text += `
` + s.raw, this.inlineQueue.at(-1).src = a.text) : this.tokens.links[s.tag] || (this.tokens.links[s.tag] = { href: s.href, title: s.title }, t.push(s));
        continue;
      }
      if (s = this.tokenizer.table(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      if (s = this.tokenizer.lheading(e)) {
        e = e.substring(s.raw.length), t.push(s);
        continue;
      }
      let i = e;
      if (this.options.extensions?.startBlock) {
        let a = 1 / 0, o = e.slice(1), l;
        this.options.extensions.startBlock.forEach((c) => {
          l = c.call({ lexer: this }, o), typeof l == "number" && l >= 0 && (a = Math.min(a, l));
        }), a < 1 / 0 && a >= 0 && (i = e.substring(0, a + 1));
      }
      if (this.state.top && (s = this.tokenizer.paragraph(i))) {
        let a = t.at(-1);
        r && a?.type === "paragraph" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + s.raw, a.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(s), r = i.length !== e.length, e = e.substring(s.raw.length);
        continue;
      }
      if (s = this.tokenizer.text(e)) {
        e = e.substring(s.raw.length);
        let a = t.at(-1);
        a?.type === "text" ? (a.raw += (a.raw.endsWith(`
`) ? "" : `
`) + s.raw, a.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = a.text) : t.push(s);
        continue;
      }
      if (e) {
        let a = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(a);
          break;
        } else throw new Error(a);
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    let r = e, s = null;
    if (this.tokens.links) {
      let l = Object.keys(this.tokens.links);
      if (l.length > 0) for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; ) l.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; ) r = r.slice(0, s.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i;
    for (; (s = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; ) i = s[2] ? s[2].length : 0, r = r.slice(0, s.index + i) + "[" + "a".repeat(s[0].length - i - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    r = this.options.hooks?.emStrongMask?.call({ lexer: this }, r) ?? r;
    let a = !1, o = "";
    for (; e; ) {
      a || (o = ""), a = !1;
      let l;
      if (this.options.extensions?.inline?.some((d) => (l = d.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.escape(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.tag(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.link(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(l.raw.length);
        let d = t.at(-1);
        l.type === "text" && d?.type === "text" ? (d.raw += l.raw, d.text += l.text) : t.push(l);
        continue;
      }
      if (l = this.tokenizer.emStrong(e, r, o)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.codespan(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.br(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.del(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.autolink(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (!this.state.inLink && (l = this.tokenizer.url(e))) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      let c = e;
      if (this.options.extensions?.startInline) {
        let d = 1 / 0, p = e.slice(1), h;
        this.options.extensions.startInline.forEach((f) => {
          h = f.call({ lexer: this }, p), typeof h == "number" && h >= 0 && (d = Math.min(d, h));
        }), d < 1 / 0 && d >= 0 && (c = e.substring(0, d + 1));
      }
      if (l = this.tokenizer.inlineText(c)) {
        e = e.substring(l.raw.length), l.raw.slice(-1) !== "_" && (o = l.raw.slice(-1)), a = !0;
        let d = t.at(-1);
        d?.type === "text" ? (d.raw += l.raw, d.text += l.text) : t.push(l);
        continue;
      }
      if (e) {
        let d = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(d);
          break;
        } else throw new Error(d);
      }
    }
    return t;
  }
}, Qi = class {
  options;
  parser;
  constructor(n) {
    this.options = n || kn;
  }
  space(n) {
    return "";
  }
  code({ text: n, lang: e, escaped: t }) {
    let r = (e || "").match(Ee.notSpaceStart)?.[0], s = n.replace(Ee.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + vt(r) + '">' + (t ? s : vt(s, !0)) + `</code></pre>
` : "<pre><code>" + (t ? s : vt(s, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: n }) {
    return `<blockquote>
${this.parser.parse(n)}</blockquote>
`;
  }
  html({ text: n }) {
    return n;
  }
  def(n) {
    return "";
  }
  heading({ tokens: n, depth: e }) {
    return `<h${e}>${this.parser.parseInline(n)}</h${e}>
`;
  }
  hr(n) {
    return `<hr>
`;
  }
  list(n) {
    let e = n.ordered, t = n.start, r = "";
    for (let a = 0; a < n.items.length; a++) {
      let o = n.items[a];
      r += this.listitem(o);
    }
    let s = e ? "ol" : "ul", i = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + s + i + `>
` + r + "</" + s + `>
`;
  }
  listitem(n) {
    let e = "";
    if (n.task) {
      let t = this.checkbox({ checked: !!n.checked });
      n.loose ? n.tokens[0]?.type === "paragraph" ? (n.tokens[0].text = t + " " + n.tokens[0].text, n.tokens[0].tokens && n.tokens[0].tokens.length > 0 && n.tokens[0].tokens[0].type === "text" && (n.tokens[0].tokens[0].text = t + " " + vt(n.tokens[0].tokens[0].text), n.tokens[0].tokens[0].escaped = !0)) : n.tokens.unshift({ type: "text", raw: t + " ", text: t + " ", escaped: !0 }) : e += t + " ";
    }
    return e += this.parser.parse(n.tokens, !!n.loose), `<li>${e}</li>
`;
  }
  checkbox({ checked: n }) {
    return "<input " + (n ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: n }) {
    return `<p>${this.parser.parseInline(n)}</p>
`;
  }
  table(n) {
    let e = "", t = "";
    for (let s = 0; s < n.header.length; s++) t += this.tablecell(n.header[s]);
    e += this.tablerow({ text: t });
    let r = "";
    for (let s = 0; s < n.rows.length; s++) {
      let i = n.rows[s];
      t = "";
      for (let a = 0; a < i.length; a++) t += this.tablecell(i[a]);
      r += this.tablerow({ text: t });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: n }) {
    return `<tr>
${n}</tr>
`;
  }
  tablecell(n) {
    let e = this.parser.parseInline(n.tokens), t = n.header ? "th" : "td";
    return (n.align ? `<${t} align="${n.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  strong({ tokens: n }) {
    return `<strong>${this.parser.parseInline(n)}</strong>`;
  }
  em({ tokens: n }) {
    return `<em>${this.parser.parseInline(n)}</em>`;
  }
  codespan({ text: n }) {
    return `<code>${vt(n, !0)}</code>`;
  }
  br(n) {
    return "<br>";
  }
  del({ tokens: n }) {
    return `<del>${this.parser.parseInline(n)}</del>`;
  }
  link({ href: n, title: e, tokens: t }) {
    let r = this.parser.parseInline(t), s = Hp(n);
    if (s === null) return r;
    n = s;
    let i = '<a href="' + n + '"';
    return e && (i += ' title="' + vt(e) + '"'), i += ">" + r + "</a>", i;
  }
  image({ href: n, title: e, text: t, tokens: r }) {
    r && (t = this.parser.parseInline(r, this.parser.textRenderer));
    let s = Hp(n);
    if (s === null) return vt(t);
    n = s;
    let i = `<img src="${n}" alt="${t}"`;
    return e && (i += ` title="${vt(e)}"`), i += ">", i;
  }
  text(n) {
    return "tokens" in n && n.tokens ? this.parser.parseInline(n.tokens) : "escaped" in n && n.escaped ? n.text : vt(n.text);
  }
}, Dl = class {
  strong({ text: n }) {
    return n;
  }
  em({ text: n }) {
    return n;
  }
  codespan({ text: n }) {
    return n;
  }
  del({ text: n }) {
    return n;
  }
  html({ text: n }) {
    return n;
  }
  text({ text: n }) {
    return n;
  }
  link({ text: n }) {
    return "" + n;
  }
  image({ text: n }) {
    return "" + n;
  }
  br() {
    return "";
  }
}, dt = class yo {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || kn, this.options.renderer = this.options.renderer || new Qi(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Dl();
  }
  static parse(e, t) {
    return new yo(t).parse(e);
  }
  static parseInline(e, t) {
    return new yo(t).parseInline(e);
  }
  parse(e, t = !0) {
    let r = "";
    for (let s = 0; s < e.length; s++) {
      let i = e[s];
      if (this.options.extensions?.renderers?.[i.type]) {
        let o = i, l = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (l !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(o.type)) {
          r += l || "";
          continue;
        }
      }
      let a = i;
      switch (a.type) {
        case "space": {
          r += this.renderer.space(a);
          continue;
        }
        case "hr": {
          r += this.renderer.hr(a);
          continue;
        }
        case "heading": {
          r += this.renderer.heading(a);
          continue;
        }
        case "code": {
          r += this.renderer.code(a);
          continue;
        }
        case "table": {
          r += this.renderer.table(a);
          continue;
        }
        case "blockquote": {
          r += this.renderer.blockquote(a);
          continue;
        }
        case "list": {
          r += this.renderer.list(a);
          continue;
        }
        case "html": {
          r += this.renderer.html(a);
          continue;
        }
        case "def": {
          r += this.renderer.def(a);
          continue;
        }
        case "paragraph": {
          r += this.renderer.paragraph(a);
          continue;
        }
        case "text": {
          let o = a, l = this.renderer.text(o);
          for (; s + 1 < e.length && e[s + 1].type === "text"; ) o = e[++s], l += `
` + this.renderer.text(o);
          t ? r += this.renderer.paragraph({ type: "paragraph", raw: l, text: l, tokens: [{ type: "text", raw: l, text: l, escaped: !0 }] }) : r += l;
          continue;
        }
        default: {
          let o = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return r;
  }
  parseInline(e, t = this.renderer) {
    let r = "";
    for (let s = 0; s < e.length; s++) {
      let i = e[s];
      if (this.options.extensions?.renderers?.[i.type]) {
        let o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          r += o || "";
          continue;
        }
      }
      let a = i;
      switch (a.type) {
        case "escape": {
          r += t.text(a);
          break;
        }
        case "html": {
          r += t.html(a);
          break;
        }
        case "link": {
          r += t.link(a);
          break;
        }
        case "image": {
          r += t.image(a);
          break;
        }
        case "strong": {
          r += t.strong(a);
          break;
        }
        case "em": {
          r += t.em(a);
          break;
        }
        case "codespan": {
          r += t.codespan(a);
          break;
        }
        case "br": {
          r += t.br(a);
          break;
        }
        case "del": {
          r += t.del(a);
          break;
        }
        case "text": {
          r += t.text(a);
          break;
        }
        default: {
          let o = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return r;
  }
}, xr = class {
  options;
  block;
  constructor(n) {
    this.options = n || kn;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(n) {
    return n;
  }
  postprocess(n) {
    return n;
  }
  processAllTokens(n) {
    return n;
  }
  emStrongMask(n) {
    return n;
  }
  provideLexer() {
    return this.block ? ct.lex : ct.lexInline;
  }
  provideParser() {
    return this.block ? dt.parse : dt.parseInline;
  }
}, vS = class {
  defaults = Tl();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = dt;
  Renderer = Qi;
  TextRenderer = Dl;
  Lexer = ct;
  Tokenizer = Xi;
  Hooks = xr;
  constructor(...n) {
    this.use(...n);
  }
  walkTokens(n, e) {
    let t = [];
    for (let r of n) switch (t = t.concat(e.call(this, r)), r.type) {
      case "table": {
        let s = r;
        for (let i of s.header) t = t.concat(this.walkTokens(i.tokens, e));
        for (let i of s.rows) for (let a of i) t = t.concat(this.walkTokens(a.tokens, e));
        break;
      }
      case "list": {
        let s = r;
        t = t.concat(this.walkTokens(s.items, e));
        break;
      }
      default: {
        let s = r;
        this.defaults.extensions?.childTokens?.[s.type] ? this.defaults.extensions.childTokens[s.type].forEach((i) => {
          let a = s[i].flat(1 / 0);
          t = t.concat(this.walkTokens(a, e));
        }) : s.tokens && (t = t.concat(this.walkTokens(s.tokens, e)));
      }
    }
    return t;
  }
  use(...n) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return n.forEach((t) => {
      let r = { ...t };
      if (r.async = this.defaults.async || r.async || !1, t.extensions && (t.extensions.forEach((s) => {
        if (!s.name) throw new Error("extension name required");
        if ("renderer" in s) {
          let i = e.renderers[s.name];
          i ? e.renderers[s.name] = function(...a) {
            let o = s.renderer.apply(this, a);
            return o === !1 && (o = i.apply(this, a)), o;
          } : e.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let i = e[s.level];
          i ? i.unshift(s.tokenizer) : e[s.level] = [s.tokenizer], s.start && (s.level === "block" ? e.startBlock ? e.startBlock.push(s.start) : e.startBlock = [s.start] : s.level === "inline" && (e.startInline ? e.startInline.push(s.start) : e.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (e.childTokens[s.name] = s.childTokens);
      }), r.extensions = e), t.renderer) {
        let s = this.defaults.renderer || new Qi(this.defaults);
        for (let i in t.renderer) {
          if (!(i in s)) throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i)) continue;
          let a = i, o = t.renderer[a], l = s[a];
          s[a] = (...c) => {
            let d = o.apply(s, c);
            return d === !1 && (d = l.apply(s, c)), d || "";
          };
        }
        r.renderer = s;
      }
      if (t.tokenizer) {
        let s = this.defaults.tokenizer || new Xi(this.defaults);
        for (let i in t.tokenizer) {
          if (!(i in s)) throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i)) continue;
          let a = i, o = t.tokenizer[a], l = s[a];
          s[a] = (...c) => {
            let d = o.apply(s, c);
            return d === !1 && (d = l.apply(s, c)), d;
          };
        }
        r.tokenizer = s;
      }
      if (t.hooks) {
        let s = this.defaults.hooks || new xr();
        for (let i in t.hooks) {
          if (!(i in s)) throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i)) continue;
          let a = i, o = t.hooks[a], l = s[a];
          xr.passThroughHooks.has(i) ? s[a] = (c) => {
            if (this.defaults.async && xr.passThroughHooksRespectAsync.has(i)) return (async () => {
              let p = await o.call(s, c);
              return l.call(s, p);
            })();
            let d = o.call(s, c);
            return l.call(s, d);
          } : s[a] = (...c) => {
            if (this.defaults.async) return (async () => {
              let p = await o.apply(s, c);
              return p === !1 && (p = await l.apply(s, c)), p;
            })();
            let d = o.apply(s, c);
            return d === !1 && (d = l.apply(s, c)), d;
          };
        }
        r.hooks = s;
      }
      if (t.walkTokens) {
        let s = this.defaults.walkTokens, i = t.walkTokens;
        r.walkTokens = function(a) {
          let o = [];
          return o.push(i.call(this, a)), s && (o = o.concat(s.call(this, a))), o;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(n) {
    return this.defaults = { ...this.defaults, ...n }, this;
  }
  lexer(n, e) {
    return ct.lex(n, e ?? this.defaults);
  }
  parser(n, e) {
    return dt.parse(n, e ?? this.defaults);
  }
  parseMarkdown(n) {
    return (e, t) => {
      let r = { ...t }, s = { ...this.defaults, ...r }, i = this.onError(!!s.silent, !!s.async);
      if (this.defaults.async === !0 && r.async === !1) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return i(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (s.hooks && (s.hooks.options = s, s.hooks.block = n), s.async) return (async () => {
        let a = s.hooks ? await s.hooks.preprocess(e) : e, o = await (s.hooks ? await s.hooks.provideLexer() : n ? ct.lex : ct.lexInline)(a, s), l = s.hooks ? await s.hooks.processAllTokens(o) : o;
        s.walkTokens && await Promise.all(this.walkTokens(l, s.walkTokens));
        let c = await (s.hooks ? await s.hooks.provideParser() : n ? dt.parse : dt.parseInline)(l, s);
        return s.hooks ? await s.hooks.postprocess(c) : c;
      })().catch(i);
      try {
        s.hooks && (e = s.hooks.preprocess(e));
        let a = (s.hooks ? s.hooks.provideLexer() : n ? ct.lex : ct.lexInline)(e, s);
        s.hooks && (a = s.hooks.processAllTokens(a)), s.walkTokens && this.walkTokens(a, s.walkTokens);
        let o = (s.hooks ? s.hooks.provideParser() : n ? dt.parse : dt.parseInline)(a, s);
        return s.hooks && (o = s.hooks.postprocess(o)), o;
      } catch (a) {
        return i(a);
      }
    };
  }
  onError(n, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, n) {
        let r = "<p>An error occurred:</p><pre>" + vt(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(r) : r;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, xn = new vS();
function ee(n, e) {
  return xn.parse(n, e);
}
ee.options = ee.setOptions = function(n) {
  return xn.setOptions(n), ee.defaults = xn.defaults, sf(ee.defaults), ee;
};
ee.getDefaults = Tl;
ee.defaults = kn;
ee.use = function(...n) {
  return xn.use(...n), ee.defaults = xn.defaults, sf(ee.defaults), ee;
};
ee.walkTokens = function(n, e) {
  return xn.walkTokens(n, e);
};
ee.parseInline = xn.parseInline;
ee.Parser = dt;
ee.parser = dt.parse;
ee.Renderer = Qi;
ee.TextRenderer = Dl;
ee.Lexer = ct;
ee.lexer = ct.lex;
ee.Tokenizer = Xi;
ee.Hooks = xr;
ee.parse = ee;
ee.options;
ee.setOptions;
ee.use;
ee.walkTokens;
ee.parseInline;
dt.parse;
ct.lex;
const wS = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, Jp = {
  colon: ":",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  apos: "'"
  // add more as needed
};
function Ul(n) {
  return n.replace(wS, (e, t) => {
    if (t = t.toLowerCase(), t in Jp) return Jp[t];
    if (t.charAt(0) === "#") {
      const r = t.charAt(1) === "x" ? parseInt(t.substring(2), 16) : +t.substring(1);
      return r >= 0 && r <= 1114111 ? String.fromCodePoint(r) : "";
    }
    return "";
  });
}
const xS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  unescape: Ul
}, Symbol.toStringTag, { value: "Module" })), Ct = "application/vnd.google-apps.document";
function _S(n) {
  return n.split(`
`).map((e) => {
    const t = e.trim();
    return t.length === 0 ? e : t.startsWith("`") && t.endsWith("`") ? t.slice(1, -1) : e;
  }).join(`
`);
}
function kS(n) {
  const e = ee.lexer(_S(n));
  return [{ parts: cs(
    e.flatMap((r) => r.type === "paragraph" ? r.tokens.map((s) => {
      if (s.type === "image") {
        const i = kw(s.href);
        if (i) return i;
      }
      return { text: s.raw };
    }) : { text: r.raw })
  ) }];
}
async function gf(n, e) {
  const t = n?.at(-1)?.parts;
  if (!t) return [];
  const r = [];
  let s = e;
  for (const i of t)
    if ("text" in i) {
      const a = ee.lexer(ce(n)), { lastIndex: o, requests: l } = SS(a, s);
      r.push(...l), s = o;
    }
  return r;
}
function SS(n, e) {
  let t = e;
  const r = n.flatMap((d) => {
    switch (d.type) {
      case "paragraph":
        return s(d, "NORMAL_TEXT");
      case "space":
        return i(d);
      case "code":
        return s(d, "NORMAL_TEXT");
      case "heading":
        return s(d, `HEADING_${d.depth}`);
      case "blockquote":
        return s(d, "NORMAL_TEXT");
      case "list":
        return l(d.items, d.ordered, 0);
    }
    return [];
  });
  return { lastIndex: t, requests: r };
  function s(d, p) {
    const { requests: h, text: f } = new Kp(
      t,
      d
    ).parse(), u = `${f}
`;
    return p && h.unshift({
      updateParagraphStyle: {
        range: a(u.length),
        paragraphStyle: { namedStyleType: p },
        fields: "namedStyleType"
      }
    }), h.unshift({ insertText: { text: u, location: o() } }), t += u.length, h;
  }
  function i(d) {
    const p = d.raw.startsWith(`
`) ? d.raw.slice(1) : d.raw, h = [
      {
        insertText: { text: p, location: o() }
      }
    ];
    return c(h, p.length);
  }
  function a(d) {
    return { startIndex: t, endIndex: t + d };
  }
  function o() {
    return { index: t };
  }
  function l(d, p, h) {
    const f = t;
    let u = 0;
    const y = v(d, p, h).flat();
    return y.push({
      createParagraphBullets: {
        range: { startIndex: f, endIndex: t },
        bulletPreset: "BULLET_DISC_CIRCLE_SQUARE"
      }
    }), t -= u, y;
    function v(m, b, g) {
      return m.flatMap(($) => {
        const j = "	".repeat(g);
        u += g;
        const A = [], R = "tokens" in $ ? $ : void 0, K = R?.tokens.find(
          (V) => V?.type === "list"
        );
        return K ? (A.push(x(j, R?.tokens.at(0))), A.push(
          ...v(
            K.items,
            b,
            g + 1
          )
        )) : A.push(x(j, R?.tokens.at(0))), A;
      });
    }
    function x(m, b) {
      const g = t + m.length, { requests: _, text: $ } = new Kp(
        g,
        b
      ).parse(), j = `${m}${$}
`;
      return _.unshift({
        updateParagraphStyle: {
          range: a(j.length),
          paragraphStyle: { namedStyleType: "NORMAL_TEXT" },
          fields: "namedStyleType"
        }
      }), _.unshift({ insertText: { text: j, location: o() } }), t += j.length, _;
    }
  }
  function c(d, p) {
    return t += p, d;
  }
}
class Kp {
  #e;
  #t = [];
  #n = [];
  constructor(e, t) {
    this.#e = e, t && "tokens" in t && (this.#t = t.tokens);
  }
  range(e, t) {
    return { startIndex: e, endIndex: e + t };
  }
  style(e, t, r) {
    this.#n.push({
      updateTextStyle: {
        range: this.range(e, t),
        textStyle: r,
        fields: Object.keys(r).join(",")
      }
    });
  }
  parse() {
    let e = this.#e, t = "";
    for (const r of this.#t) {
      const s = Ul("text" in r ? r.text : ""), i = s.length;
      switch (t += s, r.type) {
        case "strong":
          this.style(e, i, { bold: !0 });
          break;
        case "em":
          this.style(e, i, { italic: !0 });
          break;
        case "codespan":
          this.style(e, i, {
            weightedFontFamily: {
              fontFamily: "Fira Code"
            }
          });
          break;
        case "del":
          this.style(e, i, { strikethrough: !0 });
          break;
        case "link":
          this.style(e, i, { link: { url: r.href } });
          break;
        case "escape":
          console.log("ESCAPE", r);
          break;
      }
      e += i;
    }
    return {
      requests: this.#n,
      text: t
    };
  }
}
const IS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DOC_MIME_TYPE: Ct,
  contextToRequests: gf,
  markdownToContext: kS
}, Symbol.toStringTag, { value: "Module" })), Pt = "application/vnd.google-apps.spreadsheet";
function $S() {
  return {
    type: "object",
    properties: {
      spreadsheet_values: {
        type: "array",
        items: {
          type: "array",
          items: {
            type: "string"
          }
        }
      }
    },
    required: ["spreadsheet_values"]
  };
}
async function yf(n, e, t) {
  if (!t)
    return E(
      "Unable to infer spreadsheet values. No information was provided."
    );
  const s = await new Se(n, e, {
    body: {
      contents: t,
      systemInstruction: J`Your job is to generate spreadsheet values from the provided input.
Make sure that the values you generate reflect the input as precisely as possible`.asContent(),
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: $S()
      }
    }
  }).invoke();
  if (!S(s)) return s;
  const i = s.last.parts?.at(0)?.json;
  return i ? i.spreadsheet_values : E(
    "Unable to infer spreadsheet values. Invalid response from Gemini."
  );
}
const CS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SHEETS_MIME_TYPE: Pt,
  inferSheetValues: yf
}, Symbol.toStringTag, { value: "Module" })), qt = "application/vnd.google-apps.presentation";
class TS {
  #e = [];
  #t = [];
  #n;
  #r;
  #s = 0;
  constructor(e = 0, t) {
    this.#n = e, this.#r = t;
  }
  addMarkdown(e) {
    const t = this.#c();
    (this.#o.title || t.text || t.images?.length) && this.#h(), ee.lexer(e).forEach((s) => this.#i(s));
  }
  addInlineData(e) {
    let t = this.#c();
    (this.#o.title || t.text || t.images?.length) && (this.#h(), t = this.#c()), t.images ??= [], t.images.push(
      this.#f({
        type: "image",
        href: `data:${e.mimeType};base64,${e.data}`
      })
    );
  }
  #i(e) {
    const { type: t } = e;
    switch (t) {
      case "hr":
        this.#h();
        break;
      case "paragraph":
        this.#a(e.tokens);
        break;
      case "heading":
        this.#l(e);
        break;
      case "list":
        this.#u(e);
        break;
    }
  }
  images() {
    return this.#t;
  }
  build(e) {
    this.#d(), console.log("SLIDES", this.#e);
    const t = Nl(this.#e, e);
    return this.#r && t.unshift({
      deleteObject: {
        objectId: this.#r
      }
    }), t;
  }
  get #o() {
    return this.#e.at(-1);
  }
  #l(e) {
    e.depth === 1 ? this.#o.title = this.#p(e.tokens) : this.#o.subtitle = this.#p(e.tokens);
  }
  #a(e) {
    const t = this.#c(), r = t.text.length - this.#s, {
      text: s,
      styles: i,
      lists: a,
      images: o = []
    } = this.#p(e, r);
    t.text += s, t.styles.push(...i), t.lists.push(...a), t.images ??= [], t.images.push(...o);
  }
  #c() {
    const e = this.#o;
    e.body.length || e.body.push({
      text: { text: "", styles: [], lists: [] }
    });
    const t = e.body.at(-1);
    return t.text || (t.text = { text: "", styles: [], lists: [] }), t.text;
  }
  #u(e) {
    const { items: t } = e, r = this.#c(), s = r.text.length;
    let i = 0, a = s;
    const o = (l, c) => {
      c.forEach((d) => {
        const [p, h] = d.tokens, { text: f, styles: u } = this.#p(
          p.tokens,
          a
        );
        r.text += `${"	".repeat(l)}${f}`, this.#s += l, a += f.length, i += f.length, r.styles.push(...u), h && o(l + 1, h.items);
      });
    };
    o(0, t), r.lists.push({ start: s, end: s + i });
  }
  #p(e, t = 0) {
    let r = "";
    const s = [], i = [];
    return e.forEach((a) => {
      if (a.type === "image") {
        i.push(this.#f(a));
        return;
      }
      const { type: o, raw: l } = a, c = l.length;
      r += Ul(l);
      const d = { start: t, end: t + c };
      switch (o) {
        case "strong":
          s.push({ range: d, bold: !0 });
          break;
        case "em":
          s.push({ range: d, italic: !0 });
          break;
        case "del":
          s.push({ range: d, strikethrough: !0 });
          break;
        case "link":
          s.push({ range: d, link: a.href });
          break;
      }
      t += c;
    }), { text: `${r}
`, styles: s, lists: [], images: i };
  }
  #d() {
    const e = this.#o;
    if (!e) return;
    !!e.body?.at(0)?.text?.text ? (e.layout = "TITLE_AND_BODY", delete e.subtitle) : e.layout = "TITLE", this.#s = 0;
  }
  #h() {
    this.#d(), this.#e.push({
      objectId: `Slide-${this.#n + this.#e.length}`,
      layout: "TITLE_AND_BODY",
      body: []
    });
  }
  #f(e) {
    const t = this.#t.length;
    return this.#t.push(e), t;
  }
}
function Nl(n, e) {
  const t = [];
  return n.forEach((r) => {
    const s = {
      objectId: r.objectId,
      slideLayoutReference: { predefinedLayout: r.layout },
      placeholderIdMappings: PS(r.objectId, r.layout)
    };
    t.push({ createSlide: s }), r.title && t.push({
      insertText: {
        text: r.title.text,
        objectId: `${r.objectId}-title`
      }
    }), r.subtitle && t.push({
      insertText: {
        text: r.subtitle.text,
        objectId: `${r.objectId}-subtitle`
      }
    }), r.body.forEach((i) => {
      const a = i.text;
      if (a) {
        if (a.images?.length)
          t.push({
            createImage: {
              url: e[a.images[0]],
              elementProperties: {
                pageObjectId: r.objectId
              }
            }
          });
        else if (a.text) {
          const o = `${r.objectId}-body`;
          t.push({
            insertText: { text: a.text, objectId: o }
          }), a.lists.forEach((l) => {
            t.push({
              createParagraphBullets: {
                objectId: o,
                textRange: {
                  type: "FIXED_RANGE",
                  startIndex: l.start,
                  endIndex: l.end
                }
              }
            });
          }), a.styles.forEach((l) => {
            t.push({
              updateTextStyle: {
                objectId: o,
                ...ES(l),
                textRange: {
                  type: "FIXED_RANGE",
                  startIndex: l.range.start,
                  endIndex: l.range.end
                }
              }
            });
          });
        }
      }
    });
  }), t;
}
class bf {
  #e = [];
  #t = Sw();
  #n;
  #r;
  constructor(e = 0, t) {
    this.#n = e + 1, this.#r = t;
  }
  addSlide(e) {
    const t = {
      objectId: `Slide-${this.#t}-${this.#n + this.#e.length}`,
      layout: "BLANK",
      body: []
    };
    this.#e.push(t), t.title = s(e.title), e.subtitle && (t.subtitle = s(e.subtitle)), e.body && (t.body = [{ text: s(e.body) }]), !!t.body?.at(0)?.text?.text ? (t.layout = "TITLE_AND_BODY", delete t.subtitle) : t.layout = "TITLE";
    function s(i) {
      return { text: i, styles: [], lists: [] };
    }
  }
  build(e) {
    console.log("SLIDES", this.#e);
    const t = Nl(this.#e, e);
    return this.#r && t.unshift({
      deleteObject: {
        objectId: this.#r
      }
    }), t;
  }
}
function ES(n) {
  const { link: e, ...t } = n, r = e ? { link: { url: e } } : {}, s = Object.keys(t);
  return e && s.push("link"), { style: { ...r, ...t }, fields: s.join(",") };
}
function PS(n, e) {
  const t = [];
  switch (e) {
    case "TITLE":
      t.push({
        layoutPlaceholder: { type: "CENTERED_TITLE", index: 0 },
        objectId: `${n}-title`
      }), t.push({
        layoutPlaceholder: { type: "SUBTITLE", index: 0 },
        objectId: `${n}-subtitle`
      });
      break;
    case "TITLE_AND_BODY":
      t.push({
        layoutPlaceholder: { type: "TITLE", index: 0 },
        objectId: `${n}-title`
      }), t.push({
        layoutPlaceholder: { type: "BODY", index: 0 },
        objectId: `${n}-body`
      });
      break;
    case "MAIN_POINT":
      t.push({
        layoutPlaceholder: { type: "TITLE", index: 0 },
        objectId: `${n}-title`
      });
      break;
  }
  return t;
}
const AS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SLIDES_MIME_TYPE: qt,
  SimpleSlideBuilder: bf,
  SlideBuilder: TS,
  slidesToRequests: Nl
}, Symbol.toStringTag, { value: "Module" }));
function MS() {
  return {
    type: "object",
    properties: {
      slides: {
        description: "A collection of slides",
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "Slide title (plain text)" },
            subtitle: {
              type: "string",
              description: "Slide subtitle (plain text, can be empty for a text slide)"
            },
            body: {
              type: "string",
              description: "Slide body (markdown, can be empty for a title slide)"
            }
          },
          required: ["title"]
        }
      }
    },
    required: ["slides"]
  };
}
async function vf(n, e, t) {
  if (!t)
    return E("Unable to infer slide structure. No information was provided.");
  const s = await new Se(n, e, {
    body: {
      contents: t,
      systemInstruction: J`Your job is to generate a slide deck from the provided input.
Make sure that the deck represents the key information from the content.
Keep each slide body text short so that the audience doesn't have to read long sheets of text on each slide.
If necessary, break down the deck into sections using title slides`.asContent(),
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: MS()
      }
    }
  }).invoke();
  if (!S(s)) return s;
  const i = s.last.parts?.at(0)?.json;
  return i || E(
    "Unable to infer slide structure. Invalid response from Gemini."
  );
}
const OS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  inferSlideStructure: vf
}, Symbol.toStringTag, { value: "Module" }));
function Oa(n, e) {
  return [{ parts: [{ storedData: { handle: `drive:/${n}`, mimeType: e } }] }];
}
async function jS({ context: n, mimeType: e, title: t, graphId: r, fileId: s }, i, a) {
  if (r ??= "", e ??= Ct, !(e === Ct || e === qt || e === Pt))
    return E(`Unable to save files of type "${e}"`);
  switch (e) {
    case Ct: {
      const l = await ja(
        a,
        r,
        t ?? "Untitled Document",
        Ct,
        s
      );
      if (!S(l)) return l;
      const { id: c, end: d } = l, p = await gf(n, d), h = await ef(a, c, { requests: p });
      return S(h) ? { context: Oa(c, Ct) } : h;
    }
    case qt: {
      const [l, c] = await Promise.all([
        ja(
          a,
          r,
          t ?? "Untitled Presentation",
          qt,
          s
        ),
        vf(i, a, n)
      ]);
      if (!S(l)) return l;
      if (!S(c)) return c;
      const { id: d, end: p, last: h } = l, f = new bf(p, h);
      for (const v of c.slides)
        f.addSlide(v);
      const u = f.build([]);
      console.log("REQUESTS", u);
      const y = await tf(a, d, { requests: u });
      return S(y) ? { context: Oa(d, qt) } : y;
    }
    case Pt: {
      const [l, c] = await Promise.all([
        ja(
          a,
          r,
          t ?? "Untitled Spreadsheet",
          Pt,
          s
        ),
        yf(i, a, n)
      ]);
      if (!S(l)) return l;
      if (!S(c)) return c;
      console.log("VALUES", c);
      const { id: d } = l, p = await Ji(a, d);
      if (!S(p)) return p;
      const h = RS(), f = await gs(a, d, [
        { addSheet: { properties: { title: h, index: 0 } } }
      ]);
      if (!S(f)) return f;
      const u = await nf(
        a,
        d,
        h,
        { values: c }
      );
      return S(u) ? { context: Oa(d, Pt) } : u;
    }
  }
  return E(`Unknown mimeType: "${e}"`);
}
async function ja(n, e, t, r, s) {
  let i;
  if (s)
    i = s;
  else {
    const o = `${a(r)}${e}`, l = await n.shell.getDriveCollectorFile(
      r,
      "",
      // connectorId is no longer used
      e
    );
    if (!l.ok) return E(l.error);
    if (i = l.id, !i) {
      const c = await da(n, {
        name: t,
        mimeType: r,
        appProperties: {
          "google-drive-connector": o
        }
      });
      if (!S(c)) return c;
      if (r === Ct)
        return {
          id: c.id,
          end: 1
        };
      if (r === qt) {
        const d = await ho(
          n,
          c.id
        );
        return S(d) ? {
          id: d.presentationId,
          end: 1,
          last: d.slides?.at(-1)?.objectId || void 0
        } : d;
      } else return r === Pt ? { id: c.id, end: 1 } : E(`Unknown mimeType: ${r}`);
    }
  }
  if (r === Ct)
    return { id: i, end: 1 };
  if (r === qt) {
    const o = await ho(n, i);
    if (!S(o)) return o;
    const l = o.slides?.length || 0;
    return { id: i, end: l };
  } else if (r === Pt)
    return { id: i, end: 1 };
  return E(`Unknown mimeType: ${r}`);
  function a(o) {
    return o === Ct ? "doc" : o === Pt ? "sheet" : o === qt ? "slides" : "";
  }
}
function RS() {
  const n = /* @__PURE__ */ new Date(), e = String(n.getDate()).padStart(2, "0"), t = String(n.getMonth() + 1).padStart(2, "0"), r = String(n.getFullYear()).slice(-2), s = `${e}.${t}.${r}`, i = n.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: !0
  }).toLowerCase().replace(/\s+/g, "");
  return `${s} ${i}`;
}
const wf = {
  description: "Describes a JSON payload for an A2UI (Agent to UI) message, which is used to dynamically construct and update user interfaces. A message MUST contain exactly ONE of the action properties: 'beginRendering', 'surfaceUpdate', 'dataModelUpdate', or 'deleteSurface'.",
  type: "object",
  properties: {
    beginRendering: {
      type: "object",
      description: "Signals the client to begin rendering a surface with a root component and specific styles.",
      properties: {
        surfaceId: {
          type: "string",
          description: "The unique identifier for the UI surface to be rendered."
        },
        root: {
          type: "string",
          description: "The ID of the root component to render."
        }
      },
      required: ["root", "surfaceId"]
    },
    surfaceUpdate: {
      type: "object",
      description: "Updates a surface with a new set of components.",
      properties: {
        surfaceId: {
          type: "string",
          description: "The unique identifier for the UI surface to be updated. If you are adding a new surface this *must* be a new, unique identified that has never been used for any existing surfaces shown."
        },
        components: {
          type: "array",
          description: "A list containing all UI components for the surface.",
          minItems: 1,
          items: {
            type: "object",
            description: "Represents a *single* component in a UI widget tree. This component could be one of many supported types.",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier for this component."
              },
              weight: {
                type: "number",
                description: "The relative weight of this component within a Row or Column. This corresponds to the CSS 'flex-grow' property. Note: this may ONLY be set when the component is a direct descendant of a Row or Column."
              },
              component: {
                type: "object",
                description: "A wrapper object that MUST contain exactly one key, which is the name of the component type (e.g., 'Heading'). The value is an object containing the properties for that specific component.",
                properties: {
                  Text: {
                    type: "object",
                    properties: {
                      text: {
                        type: "object",
                        description: "The text content to display. This can be a literal string or a reference to a value in the data model ('path', e.g. '/hotel/description').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      usageHint: {
                        type: "string",
                        description: "A hint for the base text style. One of:\n- `h1`: Largest heading.\n- `h2`: Second largest heading.\n- `h3`: Third largest heading.\n- `h4`: Fourth largest heading.\n- `h5`: Fifth largest heading.\n- `caption`: Small text for captions.\n- `body`: Standard body text.",
                        enum: ["h1", "h2", "h3", "h4", "h5", "caption", "body"]
                      }
                    },
                    required: ["text"]
                  },
                  Image: {
                    type: "object",
                    properties: {
                      url: {
                        type: "object",
                        description: "The URL of the image to display. This can be a literal string ('literal') or a reference to a value in the data model ('path', e.g. '/thumbnail/url').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      fit: {
                        type: "string",
                        description: "Specifies how the image should be resized to fit its container. This corresponds to the CSS 'object-fit' property.",
                        enum: [
                          "contain",
                          "cover",
                          "fill",
                          "none",
                          "scale-down"
                        ]
                      },
                      usageHint: {
                        type: "string",
                        description: "A hint for the image size and style. One of:\n- `icon`: Small square icon.\n- `avatar`: Circular avatar image.\n- `smallFeature`: Small feature image.\n- `mediumFeature`: Medium feature image.\n- `largeFeature`: Large feature image.\n- `header`: Full-width, full bleed, header image.",
                        enum: [
                          "icon",
                          "avatar",
                          "smallFeature",
                          "mediumFeature",
                          "largeFeature",
                          "header"
                        ]
                      }
                    },
                    required: ["url"]
                  },
                  Icon: {
                    type: "object",
                    properties: {
                      name: {
                        type: "object",
                        description: "The name of the icon to display. This can be a literal string or a reference to a value in the data model ('path', e.g. '/form/submit').",
                        properties: {
                          literalString: {
                            type: "string",
                            enum: [
                              "accountCircle",
                              "add",
                              "arrowBack",
                              "arrowForward",
                              "attachFile",
                              "calendarToday",
                              "call",
                              "camera",
                              "check",
                              "close",
                              "delete",
                              "download",
                              "edit",
                              "event",
                              "error",
                              "favorite",
                              "favoriteOff",
                              "flight",
                              "folder",
                              "help",
                              "home",
                              "info",
                              "locationOn",
                              "lock",
                              "lockOpen",
                              "mail",
                              "menu",
                              "moreVert",
                              "moreHoriz",
                              "notificationsOff",
                              "notifications",
                              "payment",
                              "person",
                              "phone",
                              "photo",
                              "print",
                              "refresh",
                              "search",
                              "send",
                              "settings",
                              "share",
                              "shoppingCart",
                              "star",
                              "starHalf",
                              "starOff",
                              "upload",
                              "visibility",
                              "visibilityOff",
                              "warning"
                            ]
                          },
                          path: {
                            type: "string"
                          }
                        }
                      }
                    },
                    required: ["name"]
                  },
                  Video: {
                    type: "object",
                    properties: {
                      url: {
                        type: "object",
                        description: "The URL of the video to display. This can be a literal string or a reference to a value in the data model ('path', e.g. '/video/url').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      }
                    },
                    required: ["url"]
                  },
                  AudioPlayer: {
                    type: "object",
                    properties: {
                      url: {
                        type: "object",
                        description: "The URL of the audio to be played. This can be a literal string ('literal') or a reference to a value in the data model ('path', e.g. '/song/url').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      description: {
                        type: "object",
                        description: "A description of the audio, such as a title or summary. This can be a literal string or a reference to a value in the data model ('path', e.g. '/song/title').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      }
                    },
                    required: ["url"]
                  },
                  Row: {
                    type: "object",
                    properties: {
                      children: {
                        type: "object",
                        description: "Defines the children. Use 'explicitList' for a fixed set of children, or 'template' to generate children from a data list.",
                        properties: {
                          explicitList: {
                            type: "array",
                            items: {
                              type: "string"
                            }
                          },
                          template: {
                            type: "object",
                            description: "A template for generating a dynamic list of children from a data model list. `componentId` is the component to use as a template, and `dataBinding` is the path to the map of components in the data model. Values in the map will define the list of children.",
                            properties: {
                              componentId: {
                                type: "string"
                              },
                              dataBinding: {
                                type: "string"
                              }
                            },
                            required: ["componentId", "dataBinding"]
                          }
                        }
                      },
                      distribution: {
                        type: "string",
                        description: "Defines the arrangement of children along the main axis (horizontally). This corresponds to the CSS 'justify-content' property.",
                        enum: [
                          "center",
                          "end",
                          "spaceAround",
                          "spaceBetween",
                          "spaceEvenly",
                          "start"
                        ]
                      },
                      alignment: {
                        type: "string",
                        description: "Defines the alignment of children along the cross axis (vertically). This corresponds to the CSS 'align-items' property.",
                        enum: ["start", "center", "end", "stretch"]
                      }
                    },
                    required: ["children"]
                  },
                  Column: {
                    type: "object",
                    properties: {
                      children: {
                        type: "object",
                        description: "Defines the children. Use 'explicitList' for a fixed set of children, or 'template' to generate children from a data list.",
                        properties: {
                          explicitList: {
                            type: "array",
                            items: {
                              type: "string"
                            }
                          },
                          template: {
                            type: "object",
                            description: "A template for generating a dynamic list of children from a data model list. `componentId` is the component to use as a template, and `dataBinding` is the path to the map of components in the data model. Values in the map will define the list of children.",
                            properties: {
                              componentId: {
                                type: "string"
                              },
                              dataBinding: {
                                type: "string"
                              }
                            },
                            required: ["componentId", "dataBinding"]
                          }
                        }
                      },
                      distribution: {
                        type: "string",
                        description: "Defines the arrangement of children along the main axis (vertically). This corresponds to the CSS 'justify-content' property.",
                        enum: [
                          "start",
                          "center",
                          "end",
                          "spaceBetween",
                          "spaceAround",
                          "spaceEvenly"
                        ]
                      },
                      alignment: {
                        type: "string",
                        description: "Defines the alignment of children along the cross axis (horizontally). This corresponds to the CSS 'align-items' property.",
                        enum: ["center", "end", "start", "stretch"]
                      }
                    },
                    required: ["children"]
                  },
                  List: {
                    type: "object",
                    properties: {
                      children: {
                        type: "object",
                        description: "Defines the children. Use 'explicitList' for a fixed set of children, or 'template' to generate children from a data list.",
                        properties: {
                          explicitList: {
                            type: "array",
                            items: {
                              type: "string"
                            }
                          },
                          template: {
                            type: "object",
                            description: "A template for generating a dynamic list of children from a data model list. `componentId` is the component to use as a template, and `dataBinding` is the path to the map of components in the data model. Values in the map will define the list of children.",
                            properties: {
                              componentId: {
                                type: "string"
                              },
                              dataBinding: {
                                type: "string"
                              }
                            },
                            required: ["componentId", "dataBinding"]
                          }
                        }
                      },
                      direction: {
                        type: "string",
                        description: "The direction in which the list items are laid out.",
                        enum: ["vertical", "horizontal"]
                      },
                      alignment: {
                        type: "string",
                        description: "Defines the alignment of children along the cross axis.",
                        enum: ["start", "center", "end", "stretch"]
                      }
                    },
                    required: ["children"]
                  },
                  Card: {
                    type: "object",
                    properties: {
                      child: {
                        type: "string",
                        description: "The ID of the component to be rendered inside the card."
                      }
                    },
                    required: ["child"]
                  },
                  Tabs: {
                    type: "object",
                    properties: {
                      tabItems: {
                        type: "array",
                        description: "An array of objects, where each object defines a tab with a title and a child component.",
                        items: {
                          type: "object",
                          properties: {
                            title: {
                              type: "object",
                              description: "The tab title. Defines the value as either a literal value or a path to data model value (e.g. '/options/title').",
                              properties: {
                                literalString: {
                                  type: "string"
                                },
                                path: {
                                  type: "string"
                                }
                              }
                            },
                            child: {
                              type: "string"
                            }
                          },
                          required: ["title", "child"]
                        }
                      }
                    },
                    required: ["tabItems"]
                  },
                  Divider: {
                    type: "object",
                    properties: {
                      axis: {
                        type: "string",
                        description: "The orientation of the divider.",
                        enum: ["horizontal", "vertical"]
                      }
                    }
                  },
                  Modal: {
                    type: "object",
                    properties: {
                      entryPointChild: {
                        type: "string",
                        description: "The ID of the component that opens the modal when interacted with (e.g., a button)."
                      },
                      contentChild: {
                        type: "string",
                        description: "The ID of the component to be displayed inside the modal."
                      }
                    },
                    required: ["entryPointChild", "contentChild"]
                  },
                  Button: {
                    type: "object",
                    properties: {
                      child: {
                        type: "string",
                        description: "The ID of the component to display in the button, typically a Text component."
                      },
                      primary: {
                        type: "boolean",
                        description: "Indicates if this button should be styled as the primary action."
                      },
                      action: {
                        type: "object",
                        description: "The client-side action to be dispatched when the button is clicked. It includes the action's name and an optional context payload.",
                        properties: {
                          name: {
                            type: "string"
                          },
                          context: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                key: {
                                  type: "string"
                                },
                                value: {
                                  type: "object",
                                  description: "Defines the value to be included in the context as either a literal value or a path to a data model value (e.g. '/user/name').",
                                  properties: {
                                    path: {
                                      type: "string"
                                    },
                                    literalString: {
                                      type: "string"
                                    },
                                    literalNumber: {
                                      type: "number"
                                    },
                                    literalBoolean: {
                                      type: "boolean"
                                    }
                                  }
                                }
                              },
                              required: ["key", "value"]
                            }
                          }
                        },
                        required: ["name"]
                      }
                    },
                    required: ["child", "action"]
                  },
                  CheckBox: {
                    type: "object",
                    properties: {
                      label: {
                        type: "object",
                        description: "The text to display next to the checkbox. Defines the value as either a literal value or a path to data model ('path', e.g. '/option/label').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      value: {
                        type: "object",
                        description: "The current state of the checkbox (true for checked, false for unchecked). This can be a literal boolean ('literalBoolean') or a reference to a value in the data model ('path', e.g. '/filter/open').",
                        properties: {
                          literalBoolean: {
                            type: "boolean"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      }
                    },
                    required: ["label", "value"]
                  },
                  TextField: {
                    type: "object",
                    properties: {
                      label: {
                        type: "object",
                        description: "The text label for the input field. This can be a literal string or a reference to a value in the data model ('path, e.g. '/user/name').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      text: {
                        type: "object",
                        description: "The value of the text field. This can be a literal string or a reference to a value in the data model ('path', e.g. '/user/name').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      textFieldType: {
                        type: "string",
                        description: "The type of input field to display.",
                        enum: [
                          "date",
                          "longText",
                          "number",
                          "shortText",
                          "obscured"
                        ]
                      },
                      validationRegexp: {
                        type: "string",
                        description: "A regular expression used for client-side validation of the input."
                      }
                    },
                    required: ["label"]
                  },
                  DateTimeInput: {
                    type: "object",
                    properties: {
                      value: {
                        type: "object",
                        description: "The selected date and/or time value. This can be a literal string ('literalString') or a reference to a value in the data model ('path', e.g. '/user/dob').",
                        properties: {
                          literalString: {
                            type: "string"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      enableDate: {
                        type: "boolean",
                        description: "If true, allows the user to select a date."
                      },
                      enableTime: {
                        type: "boolean",
                        description: "If true, allows the user to select a time."
                      },
                      outputFormat: {
                        type: "string",
                        description: "The desired format for the output string after a date or time is selected."
                      }
                    },
                    required: ["value"]
                  },
                  MultipleChoice: {
                    type: "object",
                    properties: {
                      selections: {
                        type: "object",
                        description: "The currently selected values for the component. This can be a literal array of strings or a path to an array in the data model('path', e.g. '/hotel/options').",
                        properties: {
                          literalArray: {
                            type: "array",
                            items: {
                              type: "string"
                            }
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      options: {
                        type: "array",
                        description: "An array of available options for the user to choose from.",
                        items: {
                          type: "object",
                          properties: {
                            label: {
                              type: "object",
                              description: "The text to display for this option. This can be a literal string or a reference to a value in the data model (e.g. '/option/label').",
                              properties: {
                                literalString: {
                                  type: "string"
                                },
                                path: {
                                  type: "string"
                                }
                              }
                            },
                            value: {
                              type: "string",
                              description: "The value to be associated with this option when selected."
                            }
                          },
                          required: ["label", "value"]
                        }
                      },
                      maxAllowedSelections: {
                        type: "integer",
                        description: "The maximum number of options that the user is allowed to select."
                      }
                    },
                    required: ["selections", "options"]
                  },
                  Slider: {
                    type: "object",
                    properties: {
                      value: {
                        type: "object",
                        description: "The current value of the slider. This can be a literal number ('literalNumber') or a reference to a value in the data model ('path', e.g. '/restaurant/cost').",
                        properties: {
                          literalNumber: {
                            type: "number"
                          },
                          path: {
                            type: "string"
                          }
                        }
                      },
                      minValue: {
                        type: "number",
                        description: "The minimum value of the slider."
                      },
                      maxValue: {
                        type: "number",
                        description: "The maximum value of the slider."
                      }
                    },
                    required: ["value"]
                  }
                }
              }
            },
            required: ["id", "component"]
          }
        }
      },
      required: ["surfaceId", "components"]
    },
    dataModelUpdate: {
      type: "object",
      description: "Updates the data model for a surface.",
      properties: {
        surfaceId: {
          type: "string",
          description: "The unique identifier for the UI surface this data model update applies to."
        },
        path: {
          type: "string",
          description: "An optional path to a location within the data model (e.g., '/user/name'). If omitted, or set to '/', the entire data model will be replaced."
        },
        contents: {
          type: "array",
          description: "An array of data entries. Each entry must contain a 'key' and exactly one corresponding typed 'value*' property.",
          items: {
            type: "object",
            description: "A single data entry. Exactly one 'value*' property should be provided alongside the key.",
            properties: {
              key: {
                type: "string",
                description: "The key for this data entry."
              },
              valueString: {
                type: "string"
              },
              valueNumber: {
                type: "number"
              },
              valueBoolean: {
                type: "boolean"
              },
              valueMap: {
                description: "Represents a map as an adjacency list.",
                type: "array",
                items: {
                  type: "object",
                  description: "One entry in the map. Exactly one 'value*' property should be provided alongside the key.",
                  properties: {
                    key: {
                      type: "string"
                    },
                    valueString: {
                      type: "string"
                    },
                    valueNumber: {
                      type: "number"
                    },
                    valueBoolean: {
                      type: "boolean"
                    }
                  },
                  required: ["key"]
                }
              }
            },
            required: ["key"]
          }
        }
      },
      required: ["contents", "surfaceId"]
    },
    deleteSurface: {
      type: "object",
      description: "Signals the client to delete the surface identified by 'surfaceId'.",
      properties: {
        surfaceId: {
          type: "string",
          description: "The unique identifier for the UI surface to be deleted."
        }
      },
      required: ["surfaceId"]
    }
  }
}, DS = [
  "If the content is predominantly visual media (images and videos) then arrange them in a neat grid using Rows, Columns, and Lists. Try to put a few items on each row and try to make sure the grid is balanced. Put any other content, including text and audio, below the media. If there is a title, place it at the top.",
  "If there are two or more pieces of visual media (images and videos) then give them priority and place them in a Row at the top with everything else underneath in a List. If there is a title, place it at the top.",
  "If there is one piece of visual media (image or video), place it to the left, and put everything else to the right in a List. Within the list prioritize audio.If there is a title, place it at the top.",
  "If all else fails and nothing matches the above examples, stack everything up in a vertical List in the order you find them. If there is a title, place it at the top."
], US = `Here are some example layouts which you can use. Do your best
to match these given the content you're working with: ${DS.map(
  (n) => `- "${n}"
`
)}`;
function NS(n) {
  let e = US;
  return n && n.parts.length > 0 && il(n.parts[0]) && n.parts[0].text.trim().length > 0 && (e = `- The user's layout request is: "${n.parts[0].text}"`), J`You are creating a layout for a User Interface. It will be using a
    format called A2UI which has a distinct schema, which I will provide to you,
    and which you must match.

    The user will be providing information about the UI they would like to
    generate and your job is to create the JSON payloads as a single array.

    The Component Catalog you can use is defined in the surfaceUpdate components
    list.

    ${e}

    Please return a valid A2UI Protocol Message object necessary to satisfy the
    user request and build the UI from scratch. If you choose to return multiple
    object you must wrap them in an array, but you must provide the surfaces,
    components and a beginRendering object so that it's clear what needs to be
    rendered.

    Whenever you use a dataBinding you must start paths for child items with no
    other prefixes such as 'item' etc. Keep the path purely related to the data
    structure on which it is bound.

    IMPORTANT: You will be provided data so you MUST use that and never add,
    remove, or alter it in any way. Every part in the provided MUST be
    represented in the output, including text, media, headers, everything.

    ULTRA IMPORTANT: You MUST preserve all original paths for media. You MUST
    retain any line breaks in literal strings you generate because they
    will be rendered as Markdown which is very sensitive to line breaks.
  `.asContent();
}
function GS(n, e) {
  const t = structuredClone(n), r = (s) => {
    if (Array.isArray(s)) {
      s.forEach(r);
      return;
    }
    if (typeof s == "object" && s !== null) {
      for (const i in s)
        if (Object.prototype.hasOwnProperty.call(s, i)) {
          const a = s[i];
          if ((i === "literal" || i === "literalString" || i === "value_string") && typeof a == "string") {
            const o = e.get(a);
            o && (th(o) ? s[i] = `data:${o.inlineData.mimeType};base64,${o.inlineData.data}` : s[i] = o.storedData.handle);
          } else
            r(a);
        }
    }
  };
  return r(t), t;
}
function Ra(n, e) {
  return th(e) ? e.inlineData.mimeType.startsWith(n) : al(e) ? e.storedData.mimeType.startsWith(n) : !1;
}
async function FS(n, e, t, r) {
  const s = /* @__PURE__ */ new Map();
  t.parts = t.parts.map((l, c) => {
    if (Ra("image", l)) {
      const d = `img-${c}.jpg`;
      return s.set(d, l), {
        text: `<img src="${d}">`
      };
    } else if (Ra("audio", l)) {
      const d = `audio-${c}.wav`;
      return s.set(d, l), {
        text: `<audio src="${d}">`
      };
    } else if (Ra("video", l)) {
      const d = `video-${c}.mp4`;
      return s.set(d, l), {
        text: `<video src="${d}">`
      };
    }
    return l;
  });
  const a = await new Se(n, e, {
    model: "gemini-2.5-flash",
    body: {
      contents: [t],
      systemInstruction: NS(r),
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: wf
        }
      }
    }
  }).invoke();
  if (!w(a)) return a;
  const o = ol(e, {
    title: "A2UI",
    icon: "web"
  });
  try {
    for (const f of a.all)
      for (const u of f.parts)
        "json" in u && u.json && typeof u.json == "object" && (u.json = GS(u.json, s));
    const l = [];
    for (const f of a.all)
      for (const u of f.parts)
        if ("json" in u) {
          const y = u.json;
          Array.isArray(y) ? l.push(...y) : l.push(y);
        }
    o.addA2UI(l);
    const d = new TextEncoder().encode(JSON.stringify(a.all));
    let p = "";
    return d.forEach((f) => p += String.fromCharCode(f)), [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: btoa(p),
              mimeType: "text/a2ui"
            }
          }
        ]
      }
    ];
  } finally {
    o.finish();
  }
}
const xf = "Manual layout", zS = "Webpage with auto-layout by 2.5 Flash", LS = "Webpage with auto-layout by 2.5 Pro", Zp = "throw_error ", Gl = [
  {
    id: "gemini-flash",
    title: "Gemini 2.5 Flash",
    description: "Best for coding simple, static displays",
    modelName: "gemini-2.5-flash"
  },
  {
    id: "gemini-flash-lite",
    title: "Gemini 2.5 Flash Lite",
    description: "Best for simple speedy displays",
    modelName: "gemini-2.5-flash-lite"
  },
  {
    id: "gemini-pro",
    title: "Gemini 2.5 Pro",
    description: "Best for coding complex or interactive displays",
    modelName: "gemini-2.5-pro"
  }
], ea = [
  {
    id: xf,
    renderType: "Manual",
    icon: "responsive_layout",
    title: "Manual layout",
    description: "Content is displayed exactly as typed"
  },
  {
    id: "consistent-ui",
    renderType: "ConsistentUI",
    title: "Smart Layout",
    icon: "web",
    description: "Consistent and automatic layout"
  },
  {
    id: "Auto",
    renderType: "HTML",
    icon: "web",
    title: "Webpage with auto-layout",
    description: "Layout automatically generated by Gemini"
  },
  {
    id: "google-doc",
    renderType: "GoogleDoc",
    title: "Save to Google Docs",
    icon: "docs",
    description: "Save content to a Google Document"
  },
  {
    id: "google-slides",
    renderType: "GoogleSlides",
    title: "Save to Google Slides",
    icon: "drive_presentation",
    description: "Save content as a Google Drive Presentation"
  },
  {
    id: "google-sheets",
    renderType: "GoogleSheets",
    title: "Save to Google Sheets",
    icon: "sheets",
    description: "Save content as a Google Drive Spreadsheet"
  }
], WS = new Map(ea.map((n) => [n.id, n]));
function _f(n) {
  return WS.get(n || "Manual") || ea[0];
}
const BS = new Map(Gl.map((n) => [n.id, n]));
function qS(n) {
  return BS.get(n || "gemini-flash") || Gl[0];
}
function HS() {
  return J`You are a skilled web developer specializing in creating intuitive and visually appealing HTML web pages based on user instructions and data. Your task is to generate a valid HTML webpage that will be rendered in an iframe. The generated code must be valid and functional HTML with JavaScript and CSS embedded inline within <script> and <style> tags respectively. Return only the code, and open the HTML codeblock with the literal string '\`\`\`html'. Render content as a clean, well-structured webpage, paying careful attention to user instructions. Use a responsive or mobile-friendly layout whenever possible and minimize unnecessary padding or margins.`.asContent();
}
function hr() {
  return {
    primaryColor: "#246db5",
    secondaryColor: "#5cadff",
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    primaryTextColor: "#ffffff"
  };
}
async function VS(n) {
  const e = await n({ path: "/env/metadata" });
  if (!S(e)) return hr();
  const t = e.data?.at(0)?.parts?.at(0)?.json;
  if (!t) return hr();
  const r = t?.visual?.presentation?.theme;
  if (!r) return hr();
  const s = t?.visual?.presentation?.themes?.[r]?.themeColors;
  return s ? { ...hr(), ...s } : hr();
}
async function YS(n) {
  const e = await n({ path: "/env/metadata" });
  if (!S(e)) return;
  const t = e.data?.at(0)?.parts?.at(0)?.json;
  if (!t) return;
  const r = t?.visual?.presentation?.theme;
  if (!r) return;
  const s = t?.visual?.presentation?.themes?.[r]?.palette;
  return s ? { ...s } : {};
}
function JS(n) {
  return `Unless otherwise specified, use the following theme colors:

- primary color: ${n.primaryColor}
- secondary color: ${n.secondaryColor}
- background color: ${n.backgroundColor}
- text color: ${n.textColor}
- primary text color: ${n.primaryTextColor}

`;
}
function KS(n) {
  return `Unless otherwise specified, use the following theme colors:
  
  - primary color, dark: ${n.primary?.[25]}
  - primary color, light: ${n.primary?.[98]}
  - secondary color, dark: ${n.secondary?.[25]}
  - secondary color, light: ${n.secondary?.[95]}
  - tertiary color, dark: ${n.tertiary?.[25]}
  - tertiary color, light: ${n.tertiary?.[80]}
  - background color: ${n.secondary?.[90]}
  - error color: ${n.error?.[50]}
  - neutral, dark: ${n.neutral?.[25]}
  - neutral, light: ${n.neutral?.[98]}
  `;
}
async function Da(n, e, t, r, s) {
  let i = "";
  const a = await n.read({ path: "/env/metadata" });
  if (S(a)) {
    const o = Iw(a.data);
    o && (s || (s = `${o.title} (Opal App)`), i = o.url?.replace("drive:/", "") || "");
  }
  return jS(
    { context: [t], mimeType: r, title: s, graphId: i },
    n,
    e
  );
}
function ZS(n) {
  return { parts: Object.values(n).flatMap((t) => typeof t == "string" ? { text: t } : nh(t) ? t.parts : Kn(t) ? t.at(-1)?.parts || [] : { text: JSON.stringify(t) }), role: "user" };
}
async function XS({
  text: n,
  "p-render-mode": e,
  "b-system-instruction": t,
  "b-render-model-name": r,
  "b-google-doc-title": s,
  ...i
}, a, o) {
  let { modelName: l } = qS(r);
  const { renderType: c } = _f(e);
  n || (n = B(""));
  let d = ce(t ?? HS());
  const h = await new q(a, n).substitute(i, async () => "");
  if (!S(h))
    return h;
  const f = Bn([h], "user");
  e == zS ? l = "gemini-2.5-flash" : e == LS && (l = "gemini-2.5-pro"), console.log("Rendering with mode: ", c), console.log("Rendering with model: ", l);
  let u = f;
  switch (c) {
    case "Manual": {
      const y = u.parts.at(0)?.text;
      return y?.startsWith(Zp) ? E(y.slice(Zp.length)) : { context: [u] };
    }
    case "HTML": {
      const y = await YS(a.read);
      if (y?.primary)
        d += KS(y);
      else {
        const x = await VS(a.read);
        d += JS(x);
      }
      console.log("SI :", d);
      const v = await Hh(
        a,
        o,
        d,
        [f],
        c,
        l
      );
      if (S(v))
        u = v, console.log(u);
      else
        return console.warn(
          "Failed to generate html output, returning inputs as output",
          v.$error
        ), { context: [ZS(i)] };
      return S(u) ? { context: [u] } : E(u);
    }
    case "GoogleDoc":
      return Da(
        a,
        o,
        u,
        "application/vnd.google-apps.document",
        s
      );
    case "GoogleSlides":
      return Da(
        a,
        o,
        u,
        "application/vnd.google-apps.presentation",
        s
      );
    case "GoogleSheets":
      return Da(
        a,
        o,
        u,
        "application/vnd.google-apps.spreadsheet",
        s
      );
    case "ConsistentUI": {
      const y = await FS(
        a,
        o,
        u,
        t
      );
      return S(y) ? { context: y } : y;
    }
  }
  return { context: [u] };
}
function QS(n) {
  switch (n) {
    case "HTML":
      return {
        "b-system-instruction": {
          type: "object",
          behavior: ["llm-content", "config", "hint-advanced"],
          title: "System Instruction",
          description: "The system instruction used for auto-layout"
        },
        "b-render-model-name": {
          type: "string",
          enum: Gl,
          behavior: ["llm-content", "config", "hint-advanced"],
          title: "Model",
          description: "The model to use for auto-generating display code"
        }
      };
    case "GoogleDoc":
      return {
        "b-google-doc-title": {
          type: "string",
          behavior: ["config", "hint-advanced"],
          title: "Google Doc Title",
          description: "The title of the Google Drive Document that content will be saved to"
        }
      };
    case "GoogleSlides":
      return {
        "b-google-doc-title": {
          type: "string",
          behavior: ["config", "hint-advanced"],
          title: "Google Presentation Title",
          description: "The title of a Google Drive Presentation that content will be saved to"
        }
      };
    case "GoogleSheets":
      return {
        "b-google-doc-title": {
          type: "string",
          behavior: ["config", "hint-advanced"],
          title: "Google Spreadsheet Title",
          description: "The title of a Google Drive Spreadsheet that content will be saved to"
        }
      };
    case "ConsistentUI":
      return {
        "b-system-instruction": {
          type: "object",
          behavior: ["llm-content", "config", "hint-advanced"],
          title: "UI System Instruction",
          description: "The system instruction used for auto-layout"
        }
      };
  }
  return {};
}
async function eI({ inputs: { text: n, "p-render-mode": e } }, t, r) {
  const a = (await Ps(r))?.consistentUI ?? !1 ? ea : ea.filter(({ id: d }) => d !== "consistent-ui"), o = new q(t, n), { renderType: l, icon: c } = _f(e);
  return {
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "object",
          behavior: ["llm-content", "hint-preview", "config", "at-wireable"],
          title: "Outputs to render",
          description: "Type the @ character to select the outputs to combine. Optionally include style and layout guidlines if using Rendering mode of Markdown or HTML."
        },
        "p-render-mode": {
          type: "string",
          enum: a,
          title: "Display format",
          behavior: ["config", "hint-preview", "reactive", "hint-controller"],
          default: xf,
          description: "Choose how to combine and display the outputs"
        },
        ...QS(l),
        ...o.schemas()
      },
      behavior: ["at-wireable"],
      ...o.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: {
            type: "object",
            behavior: ["llm-content"]
          },
          title: "Context out",
          behavior: ["main-port", "hint-multimodal"]
        }
      }
    },
    title: "Output",
    metadata: {
      icon: c,
      tags: ["quick-access", "core", "output"],
      order: 100
    }
  };
}
const tI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: XS,
  describe: eI
}, Symbol.toStringTag, { value: "Module" })), kf = [
  {
    url: "embed://a2/tools.bgl.json#module:search-web",
    title: "Search Web"
  },
  {
    url: "embed://a2/tools.bgl.json#module:search-wikipedia",
    title: "Search Wikipedia"
  },
  {
    url: "embed://a2/tools.bgl.json#module:get-webpage",
    title: "Get Webpage"
  },
  {
    url: "embed://a2/tools.bgl.json#module:search-maps",
    title: "Search Maps"
  }
], nI = 7;
function rI(n) {
  const e = n ? "first" : "next";
  return `You are a researcher.
  
Your job is to use the provided research plan to produce raw research that will be later turned into a detailed research report.
You are tasked with finding as much of relevant information as possible.

You examine the conversation context so far and come up with the ${e} step to produce the report, 
using the conversation context as the the guide of steps taken so far and the outcomes recorded.

You do not ask user for feedback. You do not try to have a conversation with the user. 
You know that the user will only ask you to proceed to next step.

Your next step consists of answering two questions.

First, ask yourself "am I done?" -- looking back at all that you've researched and the plan, 
do you have enough to produce the detailed report?

Second, provide a response. Your response must contain two parts:
Thought: a brief plain text reasoning why this is the right ${e} step and a description of what you will do in plain English.
Action: invoking the tools are your disposal, more than one if necessary. If you're done, do not invoke any tools.`;
}
function sI(n, e, t, r) {
  return {
    body: {
      contents: Ot(
        J`
Do the research according to this plan:

---

${e}

---
`.asContent(),
        n
      ),
      tools: t,
      systemInstruction: B(rI(r)),
      safetySettings: We()
    }
  };
}
function iI() {
  return `You are a research report writer. 
Your teammates produced a wealth of raw research according to the supplied plan.

Your task is to take the raw research and write a thorough, detailed research report that captures it in a way that follows the plan. Use markdown.

A report must additionally contain references to the source (always cite your sources).`;
}
function aI(n, e) {
  return {
    body: {
      contents: [B(e.join(`

`))],
      systemInstruction: B(iI()),
      safetySettings: We()
    }
  };
}
async function oI(n, e, t) {
  const r = e.parts?.at(0);
  !r || !("text" in r) || await Pe(n, {
    actor: "Researcher",
    category: `Progress report, iteration ${t + 1}`,
    name: "Thought",
    icon: "generative",
    details: r.text.replace(/^Thought: ?/gm, "").replace(/^Action:.*$/gm, "").trim()
  });
}
async function lI({ context: n, plan: e, summarize: t, ...r }, s, i) {
  const a = kf.map((h) => h.url), o = new rt(
    s,
    i,
    new st(s, i)
  );
  let l = n || [B("Start the research")];
  const d = await new q(s, e).substitute(
    r,
    async (h) => o.addTool(h)
  );
  if (!S(d))
    return d;
  if (!o.hasTools() && !await o.initialize(a))
    return E("Unable to initialize tools");
  e = d;
  const p = [];
  for (let h = 0; h <= nI; h++) {
    const f = await Wn(
      sI(l, e, o.list(), h === 0),
      s,
      i
    );
    if (!S(f))
      return f;
    if ("context" in f)
      return E('Unexpected "context" response');
    const u = f.candidates.at(0)?.content;
    if (!u)
      return E("No actionable response");
    await oI(s, u, h);
    const y = await o.callTools(u, !0, []);
    if (!S(y)) return y;
    const v = y.results || [];
    if (v.length === 0)
      break;
    p.push(...v.map((x) => ce(x))), l = [...l, u, B(v.join(`

`))];
  }
  if (p.length === 0)
    return await Pe(s, {
      actor: "Researcher",
      category: "Error",
      name: "Error",
      details: "I was unable to obtain any research results"
    }), { context: n };
  if (t) {
    const h = await Wn(
      aI(e, p),
      s,
      i
    );
    if (!S(h))
      return h;
    if ("context" in h)
      return E('Unexpected "context" response');
    const f = h.candidates.at(0)?.content;
    return f ? { context: [...n || [], f] } : E("No actionable response");
  }
  return { context: [...n || [], B(p.join(`

`))] };
}
function cI(n) {
  if (n.length === 0) return "";
  if (n.length === 1) return n[0];
  if (n.length === 2) return n.join(" and ");
  const e = n.pop();
  return `${n.join(", ")}, and ${e}`;
}
function dI() {
  const n = "tool", e = kf.map(
    ({ url: t, title: r }) => q.part({ title: r, path: t, type: n })
  );
  return [
    JSON.stringify({
      plan: B(
        `Research the topic provided using ${cI(e)} tools`
      )
    })
  ];
}
async function pI({ inputs: { plan: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        plan: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Research Plan",
          description: "Provide an outline of what to research, what areas to cover, etc."
        },
        summarize: {
          type: "boolean",
          behavior: ["config", "hint-preview"],
          icon: "summarize",
          title: "Summarize research",
          description: "If checked, the Researcher will summarize the results of the research and only pass the research summary along."
        },
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds(),
      additionalProperties: !1,
      examples: dI()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["main-port", "hint-text"]
        }
      },
      additionalProperties: !1
    },
    title: "Do deep research",
    description: "Do deep research according to your plan",
    metadata: {
      icon: "generative-search",
      tags: ["quick-access", "generative"],
      order: 101
    }
  };
}
const uI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lI,
  describe: pI
}, Symbol.toStringTag, { value: "Module" })), hI = [
  "Any",
  "Audio",
  "Image",
  "Text",
  "Upload File",
  "Video"
];
function fI(n, e, t) {
  return {
    type: "object",
    properties: {
      request: {
        type: "object",
        title: n,
        behavior: ["transient", "llm-content", ...t ? ["hint-required"] : []],
        examples: [Mt()],
        format: If(e)
      }
    }
  };
}
const Sf = {
  Any: "asterisk",
  Audio: "mic",
  Video: "videocam",
  Image: "image",
  "Upload File": "upload",
  Text: "edit_note"
}, mI = {
  Any: "hint-multimodal",
  Audio: "hint-audio",
  Video: "hint-image",
  Image: "hint-image",
  "Upload File": "hint-text",
  Text: "hint-text"
};
function If(n) {
  return n && Sf[n] || "asterisk";
}
function gI(n) {
  return n && mI[n] || "hint-multimodal";
}
function yI(n) {
  return n.map((t) => ({
    id: t,
    title: t,
    icon: Sf[t]
  }));
}
async function bI({
  description: n,
  "p-modality": e,
  "p-required": t,
  ...r
}, s) {
  const i = new q(s, n);
  let a = J`Please provide input`.asContent();
  if (n) {
    const l = await i.substitute(r, async () => "");
    if (!S(l))
      return l;
    a = l;
  }
  await Pe(s, {
    actor: "User Input",
    category: "Requesting Input",
    name: "",
    details: a,
    icon: "input"
  });
  const o = ce(a);
  return { context: "nothing", toInput: fI(o, e, t) };
}
async function vI({ inputs: { description: n, ["p-modality"]: e } }, t) {
  const r = If(e), s = new q(t, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        description: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "What to ask of user",
          description: "Provide a request prompt that will be shown to the user."
        },
        "p-modality": {
          type: "string",
          enum: yI(hI),
          behavior: ["config", "hint-preview", "hint-advanced"],
          icon: r,
          title: "Input type",
          description: "Set the type of input the user can provide"
        },
        "p-required": {
          type: "boolean",
          behavior: ["config", "hint-preview", "hint-advanced"],
          icon: r,
          title: "Input is required",
          description: "Set whether or not the user's input is required"
        },
        ...s.schemas()
      },
      behavior: ["at-wireable"],
      additionalProperties: !0,
      ...s.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["main-port", gI(e)]
        }
      },
      additionalProperties: !1
    },
    title: "User Input",
    metadata: {
      icon: "ask-user",
      tags: ["quick-access", "core", "input"],
      order: 1
    }
  };
}
const wI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bI,
  describe: vI
}, Symbol.toStringTag, { value: "Module" }));
async function xI({
  context: n,
  request: e
}) {
  return n == "nothing" ? e ? { context: [e] } : E("No text supplied.") : { context: [n] };
}
async function _I() {
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "object",
          title: "Context in"
        },
        request: {
          type: "object",
          title: "Data From Input"
        }
      }
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out"
        }
      }
    }
  };
}
const kI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xI,
  describe: _I
}, Symbol.toStringTag, { value: "Module" })), SI = "A2", II = "Components that help you build flows.", $I = "0.0.1", CI = [], TI = [], EI = { comments: [{ id: "comment-b09617ef", text: "Left Intentionally Blank", metadata: { visual: { x: -37.90624999999966, y: -415.8554687499999, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "54f81cc4-5c04-4d9d-b831-985d556f0ed9": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "54f81cc4-5c04-4d9d-b831-985d556f0ed9" } }, tags: ["published", "tool", "component"], icon: "text" }, PI = {}, AI = ["#module:researcher", "#module:image-generator", "#module:image-editor", "#module:render-outputs", "#module:audio-generator", "#21ee02e7-83fa-49d0-964c-0cab10eafc2c", "#module:combine-outputs", "#module:make-code"], MI = { "21ee02e7-83fa-49d0-964c-0cab10eafc2c": { title: "Ask User", description: "A block of text as input or output", version: "0.0.1", nodes: [{ type: "input", id: "input", metadata: { visual: { x: 580.0000000000005, y: -539.9999999999994, collapsed: "expanded", outputHeight: 44 }, title: "Waiting for user input", logLevel: "info" }, configuration: {} }, { type: "output", id: "output", configuration: { schema: { properties: { context: { type: "array", title: "Context", items: { type: "object", behavior: ["llm-content"] }, default: "null" } }, type: "object", required: [] } }, metadata: { visual: { x: 1240.0000000000005, y: -399.99999999999943, collapsed: "expanded", outputHeight: 44 } } }, { id: "board-64b2c3a8", type: "#module:text-entry", metadata: { visual: { x: 225.9030760391795, y: -646.8568148490385, collapsed: "expanded", outputHeight: 44 }, title: "text-entry" } }, { id: "board-95a57400", type: "#module:text-main", metadata: { visual: { x: 900, y: -459.99999999999943, collapsed: "expanded", outputHeight: 44 }, title: "text-main" } }], edges: [{ from: "board-64b2c3a8", out: "toInput", to: "input", in: "schema" }, { from: "board-64b2c3a8", out: "toMain", to: "board-95a57400", in: "request" }, { from: "board-95a57400", to: "output", out: "context", in: "context" }, { from: "board-64b2c3a8", to: "board-95a57400", out: "context", in: "context" }, { from: "input", to: "board-95a57400", out: "request", in: "request" }], metadata: { visual: { minimized: !1 }, tags: [], describer: "module:text-entry", icon: "text" } } }, OI = { "@@thumbnail": { metadata: { title: "Thumbnail", type: "file" }, data: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICAKICAgICAgPHJlY3QgeD0iNzMuOTIiCiAgICAgICAgICAgICAgICAgICAgeT0iODQuMDEiCiAgICAgICAgICAgICAgICAgICAgd2lkdGg9IjQ2Ljk0IgogICAgICAgICAgICAgICAgICAgIGhlaWdodD0iMjUuOTkiCiAgICAgICAgICAgICAgICAgICAgcng9IjMuNSIKICAgICAgICAgICAgICAgICAgICBmaWxsPSJ3aGl0ZSIKICAgICAgICAgICAgICAgICAgICBzdHJva2U9IiMyMGEyMDIiIC8+CjxyZWN0IHg9IjE5My4wNiIKICAgICAgICAgICAgICAgICAgICB5PSIxMDkuMjgiCiAgICAgICAgICAgICAgICAgICAgd2lkdGg9IjQ2Ljk0IgogICAgICAgICAgICAgICAgICAgIGhlaWdodD0iMjUuOTkiCiAgICAgICAgICAgICAgICAgICAgcng9IjMuNSIKICAgICAgICAgICAgICAgICAgICBmaWxsPSJ3aGl0ZSIKICAgICAgICAgICAgICAgICAgICBzdHJva2U9IiMyMGEyMDIiIC8+CjxyZWN0IHg9IjEwLjAwIgogICAgICAgICAgICAgICAgICAgIHk9IjY0LjcyIgogICAgICAgICAgICAgICAgICAgIHdpZHRoPSI0Ni45NCIKICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9IjI1Ljk5IgogICAgICAgICAgICAgICAgICAgIHJ4PSIzLjUiCiAgICAgICAgICAgICAgICAgICAgZmlsbD0id2hpdGUiCiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPSIjMmU4YmU4IiAvPgo8cmVjdCB4PSIxMzEuNjkiCiAgICAgICAgICAgICAgICAgICAgeT0iOTguNDUiCiAgICAgICAgICAgICAgICAgICAgd2lkdGg9IjQ2Ljk0IgogICAgICAgICAgICAgICAgICAgIGhlaWdodD0iMjUuOTkiCiAgICAgICAgICAgICAgICAgICAgcng9IjMuNSIKICAgICAgICAgICAgICAgICAgICBmaWxsPSJ3aGl0ZSIKICAgICAgICAgICAgICAgICAgICBzdHJva2U9IiMyZThiZTgiIC8+CiAgICA8L3N2Zz4=" } }, jI = {
  title: SI,
  description: II,
  version: $I,
  nodes: CI,
  edges: TI,
  metadata: EI,
  modules: PI,
  exports: AI,
  graphs: MI,
  assets: OI
};
function it(n, e) {
  const t = structuredClone(n);
  return t.modules = Object.fromEntries(
    Object.keys(e).map((r) => [
      r,
      { code: 'throw new Error("Unreachable code")' }
    ])
  ), t;
}
const $f = {
  "audio-generator": L_,
  "combine-outputs": X_,
  common: Q_,
  entry: rk,
  "gemini-prompt": Pw,
  gemini: Ew,
  "html-generator": pk,
  "image-editor": vk,
  "image-generator": _k,
  "image-utils": fk,
  introducer: mk,
  "make-code": Pk,
  output: kk,
  "render-outputs": tI,
  researcher: uI,
  settings: ek,
  "step-executor": Tw,
  template: J_,
  "text-entry": wI,
  "text-main": kI,
  "tool-manager": Cw,
  utils: $w
}, RI = it(jI, $f), bo = {
  "Male (English)": "en-US-male",
  "Female (English)": "en-US-female"
}, Fl = Object.keys(bo);
function Cf(n) {
  const e = n.voice;
  return `Generate speech from the text below. Use that prompt exactly.${e ? ` Use ${e} voice.` : ""}

PROMPT:`;
}
async function zl(n, e, t, r) {
  let s = "en-US-female";
  r in bo && (s = bo[r]);
  const i = {};
  i.text_to_speak = {
    chunks: [
      {
        mimetype: "text/plain",
        data: ft(t)
      }
    ]
  }, i.voice_key = {
    chunks: [
      {
        mimetype: "text/plain",
        data: ft(s)
      }
    ]
  };
  const l = await Zn(n, e, {
    planStep: {
      stepName: "GenerateAudio",
      modelApi: "tts",
      inputParameters: ["text_to_speak"],
      systemPrompt: "",
      output: "generated_speech"
    },
    execution_inputs: i
  });
  return S(l) ? l.chunks.at(0) : l;
}
async function Tf({ context: n, text: e, voice: t, ...r }, s, i) {
  n ??= [];
  let a = "";
  e && (a = ce(e).trim());
  const o = new q(s, B(a)), l = new rt(
    s,
    i,
    new st(s, i)
  ), c = await o.substitute(
    r,
    async (f) => l.addTool(f)
  );
  if (!S(c))
    return c;
  console.log("context"), console.log(n), console.log("instruction"), console.log(e), console.log("substituting"), console.log(c);
  const d = [...n], p = vn(
    ca(ce(c), d, !1)
  );
  if (!p)
    return {
      context: [
        B("Please provide the text to be converted to speech.")
      ]
    };
  console.log("PROMPT: ", p);
  const h = await zl(
    s,
    i,
    p,
    t
  );
  return S(h) ? { context: [h] } : h;
}
async function Ef({ inputs: { text: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        text: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Text",
          description: "Construct the inputs to be spoken with text-to-speech. Use @ to reference previous step outputs.",
          default: Mt()
        },
        voice: {
          type: "string",
          behavior: ["hint-text", "config", "hint-advanced"],
          title: "Voice",
          icon: "voice-selection",
          enum: Fl,
          description: "The voice you'd like to generate with",
          default: "Female (English)"
        },
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["hint-audio", "main-port"]
        }
      },
      additionalProperties: !1
    },
    title: "Make Speech",
    metadata: {
      icon: "generative-audio",
      tags: ["quick-access", "generative"],
      order: 3
    }
  };
}
const DI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VOICES: Fl,
  callAudioGen: zl,
  default: Tf,
  describe: Ef,
  makeSpeechInstruction: Cf
}, Symbol.toStringTag, { value: "Module" }));
function Pf() {
  return `Generate music using the prompt below. Use that prompt exactly.

PROMPT:`;
}
async function Ll(n, e, t) {
  const r = {};
  r.prompt = {
    chunks: [
      {
        mimetype: "text/plain",
        data: ft(t)
      }
    ]
  };
  const a = await Zn(n, e, {
    planStep: {
      stepName: "GenerateMusic",
      modelApi: "generate_music",
      inputParameters: ["prompt"],
      systemPrompt: "",
      output: "generated_music"
    },
    execution_inputs: r
  });
  return S(a) ? a.chunks.at(0) : a;
}
async function Af({ context: n, text: e, ...t }, r, s) {
  n ??= [];
  let i = "";
  e && (i = ce(e).trim());
  const a = new q(r, B(i)), o = new rt(
    r,
    s,
    new st(r, s)
  ), l = await a.substitute(
    t,
    async (h) => o.addTool(h)
  );
  if (!S(l))
    return l;
  console.log("context"), console.log(n), console.log("instruction"), console.log(e), console.log("substituting"), console.log(l);
  const c = [...n], d = vn(
    ca(ce(l), c, !1)
  );
  if (!d)
    return { context: [B("Please provide the music prompt.")] };
  console.log("PROMPT: ", d);
  const p = await Ll(r, s, d);
  return S(p) ? { context: [p] } : p;
}
async function Mf({ inputs: { text: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        text: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Text",
          description: "Construct the music generation prompt. Use @ to reference previous step outputs.",
          default: Mt()
        },
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["hint-audio", "main-port"]
        }
      },
      additionalProperties: !1
    },
    title: "Make Music",
    metadata: {
      icon: "generative-audio",
      tags: ["quick-access", "generative"],
      order: 3
    }
  };
}
const UI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  callMusicGen: Ll,
  default: Af,
  describe: Mf,
  makeMusicInstruction: Pf
}, Symbol.toStringTag, { value: "Module" })), vo = ["16:9", "9:16"], NI = "generated_video", Wl = [
  {
    id: "veo-3",
    title: "Veo 3",
    description: "State of the art video generation with audio",
    modelName: "veo-3.0-generate-preview"
  },
  {
    id: "veo-3.1",
    title: "Veo 3.1",
    description: "Latest state of the art video generation with audio",
    modelName: "veo-3.1-generate-preview"
  },
  {
    id: "veo-2",
    title: "Veo 2",
    description: "Faster video generation, no audio",
    modelName: "veo-2.0-generate-001"
  }
], GI = new Map(Wl.map((n) => [n.id, n]));
function FI(n) {
  return GI.get(n || "veo-3") || Wl[0];
}
function Of(n) {
  const e = n["p-aspect-ratio"];
  return `Generate a video using the following prompt. Use that prompt exactly.${e ? ` Use the ${e} aspect ratio.` : ""}

PROMPT:`;
}
async function Bl(n, e, t, r, s, i, a) {
  const o = {};
  o.text_instruction = {
    chunks: [
      {
        mimetype: "text/plain",
        data: ft(t)
      }
    ]
  }, o.aspect_ratio_key = {
    chunks: [
      {
        mimetype: "text/plain",
        data: ft(i)
      }
    ]
  };
  const l = ["text_instruction"];
  if (r.length > 0) {
    console.log(`${r.length} image(s) found, using i2v`);
    const p = [];
    for (const h of r) {
      let f;
      if (Xu(h)) {
        const u = await Qu(
          e,
          h.parts.at(-1)
        );
        if (!S(u)) return u;
        f = eh(u);
      } else {
        const { inlineData: u } = h.parts.at(
          -1
        );
        f = {
          mimetype: u.mimeType,
          data: u.data
        };
      }
      if (!f || typeof f == "string")
        return E("Image input did not have the expected format");
      p.push(f);
    }
    o.reference_image = { chunks: p }, l.push("reference_image");
  } else
    console.log("No image found, using t2v");
  const d = await Zn(n, e, {
    planStep: {
      stepName: "GenerateVideo",
      modelApi: "generate_video",
      inputParameters: l,
      systemPrompt: "",
      output: NI,
      options: {
        disablePromptRewrite: s,
        modelName: a
      }
    },
    execution_inputs: o
  }, {
    expectedDurationInSec: 70
  });
  return S(d) ? d.chunks.at(0) : d;
}
async function jf({
  context: n,
  instruction: e,
  "p-disable-prompt-rewrite": t,
  "p-aspect-ratio": r,
  "b-model-name": s,
  ...i
}, a, o) {
  const { modelName: l } = FI(s);
  n ??= [];
  let c = "";
  e && (c = ce(e).trim()), (!r || !vo.includes(r)) && (r = "16:9");
  const d = new q(a, B(c)), p = new rt(
    a,
    o,
    new st(a, o)
  ), h = await d.substitute(
    i,
    async (g) => p.addTool(g)
  );
  if (!S(h))
    return h;
  console.log("context"), console.log(n), console.log("instruction"), console.log(e), console.log("substituting"), console.log(h);
  const f = [...n];
  let u = qn(f);
  const y = ls(f), v = qn([h]), x = ls([h]);
  u = u.concat(v);
  const m = vn(
    ca(vn(x), y, !1)
  );
  if (!m)
    return E("Please provide the instruction to generate video.", {
      kind: "config",
      origin: "client"
    });
  console.log(`PROMPT(${l}): ${m}`);
  const b = await Bl(
    a,
    o,
    m,
    u,
    t,
    r,
    l
  );
  return S(b) ? { context: [b] } : ql(b, l);
}
const zI = /* @__PURE__ */ new Map([
  [58061214, "child"],
  [17301594, "child"],
  [29310472, "celebrity"],
  [15236754, "celebrity"],
  [64151117, "unsafe"],
  [42237218, "unsafe"],
  [62263041, "dangerous"],
  [57734940, "hate"],
  [22137204, "hate"],
  [74803281, "other"],
  [29578790, "other"],
  [42876398, "other"],
  [39322892, "face"],
  [92201652, "pii"],
  [89371032, "prohibited"],
  [49114662, "prohibited"],
  [72817394, "prohibited"],
  [90789179, "sexual"],
  [63429089, "sexual"],
  [43188360, "sexual"],
  [78610348, "toxic"],
  [61493863, "violence"],
  [56562880, "violence"],
  [32635315, "vulgar"]
]);
function ql(n, e) {
  const t = n.$error.match(/Support codes: (\d+(?:, \d+)*)/), r = /* @__PURE__ */ new Set();
  return t && t[1] && t[1].split(", ").map((i) => parseInt(i.trim(), 10)).forEach((i) => {
    r.add(zI.get(i) || "other");
  }), r.size > 0 ? {
    ...n,
    metadata: {
      origin: "server",
      kind: "safety",
      reasons: Array.from(r.values()),
      model: e
    }
  } : n;
}
async function Rf({ inputs: { instruction: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        instruction: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Instruction",
          description: "Instructions for how to render the video. Use @ to reference upstream steps.",
          default: Mt()
        },
        "p-disable-prompt-rewrite": {
          type: "boolean",
          title: "Disable prompt expansion",
          behavior: ["config", "hint-preview", "hint-advanced"],
          description: "By default, inputs and instructions can be automatically expanded into a higher quality video prompt. Check to disable this re-writing behavior."
        },
        "p-aspect-ratio": {
          type: "string",
          behavior: ["hint-text", "config", "hint-advanced"],
          title: "Aspect Ratio",
          enum: vo,
          description: "The aspect ratio of the generated video",
          default: vo[0]
        },
        "b-model-name": {
          type: "string",
          enum: Wl,
          behavior: ["llm-content", "config", "hint-advanced"],
          title: "Model Version",
          description: "The Veo version to use"
        },
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["hint-multimodal", "main-port"]
        }
      },
      additionalProperties: !1
    },
    title: "Make Video",
    metadata: {
      icon: "generative-video",
      tags: ["quick-access", "generative"],
      order: 3
    }
  };
}
const LI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  callVideoGen: Bl,
  default: jf,
  describe: Rf,
  expandVeoError: ql,
  makeVideoInstruction: Of
}, Symbol.toStringTag, { value: "Module" })), Df = {
  "application/prs.cww": ["cww"],
  "application/prs.xsf+xml": ["xsf"],
  "application/vnd.1000minds.decision-model+xml": ["1km"],
  "application/vnd.3gpp.pic-bw-large": ["plb"],
  "application/vnd.3gpp.pic-bw-small": ["psb"],
  "application/vnd.3gpp.pic-bw-var": ["pvb"],
  "application/vnd.3gpp2.tcap": ["tcap"],
  "application/vnd.3m.post-it-notes": ["pwn"],
  "application/vnd.accpac.simply.aso": ["aso"],
  "application/vnd.accpac.simply.imp": ["imp"],
  "application/vnd.acucobol": ["acu"],
  "application/vnd.acucorp": ["atc", "acutc"],
  "application/vnd.adobe.air-application-installer-package+zip": ["air"],
  "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
  "application/vnd.adobe.fxp": ["fxp", "fxpl"],
  "application/vnd.adobe.xdp+xml": ["xdp"],
  "application/vnd.adobe.xfdf": ["*xfdf"],
  "application/vnd.age": ["age"],
  "application/vnd.ahead.space": ["ahead"],
  "application/vnd.airzip.filesecure.azf": ["azf"],
  "application/vnd.airzip.filesecure.azs": ["azs"],
  "application/vnd.amazon.ebook": ["azw"],
  "application/vnd.americandynamics.acc": ["acc"],
  "application/vnd.amiga.ami": ["ami"],
  "application/vnd.android.package-archive": ["apk"],
  "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
  "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
  "application/vnd.antix.game-component": ["atx"],
  "application/vnd.apple.installer+xml": ["mpkg"],
  "application/vnd.apple.keynote": ["key"],
  "application/vnd.apple.mpegurl": ["m3u8"],
  "application/vnd.apple.numbers": ["numbers"],
  "application/vnd.apple.pages": ["pages"],
  "application/vnd.apple.pkpass": ["pkpass"],
  "application/vnd.aristanetworks.swi": ["swi"],
  "application/vnd.astraea-software.iota": ["iota"],
  "application/vnd.audiograph": ["aep"],
  "application/vnd.autodesk.fbx": ["fbx"],
  "application/vnd.balsamiq.bmml+xml": ["bmml"],
  "application/vnd.blueice.multipass": ["mpm"],
  "application/vnd.bmi": ["bmi"],
  "application/vnd.businessobjects": ["rep"],
  "application/vnd.chemdraw+xml": ["cdxml"],
  "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
  "application/vnd.cinderella": ["cdy"],
  "application/vnd.citationstyles.style+xml": ["csl"],
  "application/vnd.claymore": ["cla"],
  "application/vnd.cloanto.rp9": ["rp9"],
  "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
  "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
  "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
  "application/vnd.commonspace": ["csp"],
  "application/vnd.contact.cmsg": ["cdbcmsg"],
  "application/vnd.cosmocaller": ["cmc"],
  "application/vnd.crick.clicker": ["clkx"],
  "application/vnd.crick.clicker.keyboard": ["clkk"],
  "application/vnd.crick.clicker.palette": ["clkp"],
  "application/vnd.crick.clicker.template": ["clkt"],
  "application/vnd.crick.clicker.wordbank": ["clkw"],
  "application/vnd.criticaltools.wbs+xml": ["wbs"],
  "application/vnd.ctc-posml": ["pml"],
  "application/vnd.cups-ppd": ["ppd"],
  "application/vnd.curl.car": ["car"],
  "application/vnd.curl.pcurl": ["pcurl"],
  "application/vnd.dart": ["dart"],
  "application/vnd.data-vision.rdz": ["rdz"],
  "application/vnd.dbf": ["dbf"],
  "application/vnd.dcmp+xml": ["dcmp"],
  "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
  "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
  "application/vnd.dece.unspecified": ["uvx", "uvvx"],
  "application/vnd.dece.zip": ["uvz", "uvvz"],
  "application/vnd.denovo.fcselayout-link": ["fe_launch"],
  "application/vnd.dna": ["dna"],
  "application/vnd.dolby.mlp": ["mlp"],
  "application/vnd.dpgraph": ["dpg"],
  "application/vnd.dreamfactory": ["dfac"],
  "application/vnd.ds-keypoint": ["kpxx"],
  "application/vnd.dvb.ait": ["ait"],
  "application/vnd.dvb.service": ["svc"],
  "application/vnd.dynageo": ["geo"],
  "application/vnd.ecowin.chart": ["mag"],
  "application/vnd.enliven": ["nml"],
  "application/vnd.epson.esf": ["esf"],
  "application/vnd.epson.msf": ["msf"],
  "application/vnd.epson.quickanime": ["qam"],
  "application/vnd.epson.salt": ["slt"],
  "application/vnd.epson.ssf": ["ssf"],
  "application/vnd.eszigno3+xml": ["es3", "et3"],
  "application/vnd.ezpix-album": ["ez2"],
  "application/vnd.ezpix-package": ["ez3"],
  "application/vnd.fdf": ["*fdf"],
  "application/vnd.fdsn.mseed": ["mseed"],
  "application/vnd.fdsn.seed": ["seed", "dataless"],
  "application/vnd.flographit": ["gph"],
  "application/vnd.fluxtime.clip": ["ftc"],
  "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
  "application/vnd.frogans.fnc": ["fnc"],
  "application/vnd.frogans.ltf": ["ltf"],
  "application/vnd.fsc.weblaunch": ["fsc"],
  "application/vnd.fujitsu.oasys": ["oas"],
  "application/vnd.fujitsu.oasys2": ["oa2"],
  "application/vnd.fujitsu.oasys3": ["oa3"],
  "application/vnd.fujitsu.oasysgp": ["fg5"],
  "application/vnd.fujitsu.oasysprs": ["bh2"],
  "application/vnd.fujixerox.ddd": ["ddd"],
  "application/vnd.fujixerox.docuworks": ["xdw"],
  "application/vnd.fujixerox.docuworks.binder": ["xbd"],
  "application/vnd.fuzzysheet": ["fzs"],
  "application/vnd.genomatix.tuxedo": ["txd"],
  "application/vnd.geogebra.file": ["ggb"],
  "application/vnd.geogebra.slides": ["ggs"],
  "application/vnd.geogebra.tool": ["ggt"],
  "application/vnd.geometry-explorer": ["gex", "gre"],
  "application/vnd.geonext": ["gxt"],
  "application/vnd.geoplan": ["g2w"],
  "application/vnd.geospace": ["g3w"],
  "application/vnd.gmx": ["gmx"],
  "application/vnd.google-apps.document": ["gdoc"],
  "application/vnd.google-apps.drawing": ["gdraw"],
  "application/vnd.google-apps.form": ["gform"],
  "application/vnd.google-apps.jam": ["gjam"],
  "application/vnd.google-apps.map": ["gmap"],
  "application/vnd.google-apps.presentation": ["gslides"],
  "application/vnd.google-apps.script": ["gscript"],
  "application/vnd.google-apps.site": ["gsite"],
  "application/vnd.google-apps.spreadsheet": ["gsheet"],
  "application/vnd.google-earth.kml+xml": ["kml"],
  "application/vnd.google-earth.kmz": ["kmz"],
  "application/vnd.gov.sk.xmldatacontainer+xml": ["xdcf"],
  "application/vnd.grafeq": ["gqf", "gqs"],
  "application/vnd.groove-account": ["gac"],
  "application/vnd.groove-help": ["ghf"],
  "application/vnd.groove-identity-message": ["gim"],
  "application/vnd.groove-injector": ["grv"],
  "application/vnd.groove-tool-message": ["gtm"],
  "application/vnd.groove-tool-template": ["tpl"],
  "application/vnd.groove-vcard": ["vcg"],
  "application/vnd.hal+xml": ["hal"],
  "application/vnd.handheld-entertainment+xml": ["zmm"],
  "application/vnd.hbci": ["hbci"],
  "application/vnd.hhe.lesson-player": ["les"],
  "application/vnd.hp-hpgl": ["hpgl"],
  "application/vnd.hp-hpid": ["hpid"],
  "application/vnd.hp-hps": ["hps"],
  "application/vnd.hp-jlyt": ["jlt"],
  "application/vnd.hp-pcl": ["pcl"],
  "application/vnd.hp-pclxl": ["pclxl"],
  "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
  "application/vnd.ibm.minipay": ["mpy"],
  "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
  "application/vnd.ibm.rights-management": ["irm"],
  "application/vnd.ibm.secure-container": ["sc"],
  "application/vnd.iccprofile": ["icc", "icm"],
  "application/vnd.igloader": ["igl"],
  "application/vnd.immervision-ivp": ["ivp"],
  "application/vnd.immervision-ivu": ["ivu"],
  "application/vnd.insors.igm": ["igm"],
  "application/vnd.intercon.formnet": ["xpw", "xpx"],
  "application/vnd.intergeo": ["i2g"],
  "application/vnd.intu.qbo": ["qbo"],
  "application/vnd.intu.qfx": ["qfx"],
  "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
  "application/vnd.irepository.package+xml": ["irp"],
  "application/vnd.is-xpr": ["xpr"],
  "application/vnd.isac.fcs": ["fcs"],
  "application/vnd.jam": ["jam"],
  "application/vnd.jcp.javame.midlet-rms": ["rms"],
  "application/vnd.jisp": ["jisp"],
  "application/vnd.joost.joda-archive": ["joda"],
  "application/vnd.kahootz": ["ktz", "ktr"],
  "application/vnd.kde.karbon": ["karbon"],
  "application/vnd.kde.kchart": ["chrt"],
  "application/vnd.kde.kformula": ["kfo"],
  "application/vnd.kde.kivio": ["flw"],
  "application/vnd.kde.kontour": ["kon"],
  "application/vnd.kde.kpresenter": ["kpr", "kpt"],
  "application/vnd.kde.kspread": ["ksp"],
  "application/vnd.kde.kword": ["kwd", "kwt"],
  "application/vnd.kenameaapp": ["htke"],
  "application/vnd.kidspiration": ["kia"],
  "application/vnd.kinar": ["kne", "knp"],
  "application/vnd.koan": ["skp", "skd", "skt", "skm"],
  "application/vnd.kodak-descriptor": ["sse"],
  "application/vnd.las.las+xml": ["lasxml"],
  "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
  "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
  "application/vnd.lotus-1-2-3": ["123"],
  "application/vnd.lotus-approach": ["apr"],
  "application/vnd.lotus-freelance": ["pre"],
  "application/vnd.lotus-notes": ["nsf"],
  "application/vnd.lotus-organizer": ["org"],
  "application/vnd.lotus-screencam": ["scm"],
  "application/vnd.lotus-wordpro": ["lwp"],
  "application/vnd.macports.portpkg": ["portpkg"],
  "application/vnd.mapbox-vector-tile": ["mvt"],
  "application/vnd.mcd": ["mcd"],
  "application/vnd.medcalcdata": ["mc1"],
  "application/vnd.mediastation.cdkey": ["cdkey"],
  "application/vnd.mfer": ["mwf"],
  "application/vnd.mfmp": ["mfm"],
  "application/vnd.micrografx.flo": ["flo"],
  "application/vnd.micrografx.igx": ["igx"],
  "application/vnd.mif": ["mif"],
  "application/vnd.mobius.daf": ["daf"],
  "application/vnd.mobius.dis": ["dis"],
  "application/vnd.mobius.mbk": ["mbk"],
  "application/vnd.mobius.mqy": ["mqy"],
  "application/vnd.mobius.msl": ["msl"],
  "application/vnd.mobius.plc": ["plc"],
  "application/vnd.mobius.txf": ["txf"],
  "application/vnd.mophun.application": ["mpn"],
  "application/vnd.mophun.certificate": ["mpc"],
  "application/vnd.mozilla.xul+xml": ["xul"],
  "application/vnd.ms-artgalry": ["cil"],
  "application/vnd.ms-cab-compressed": ["cab"],
  "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
  "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
  "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
  "application/vnd.ms-fontobject": ["eot"],
  "application/vnd.ms-htmlhelp": ["chm"],
  "application/vnd.ms-ims": ["ims"],
  "application/vnd.ms-lrm": ["lrm"],
  "application/vnd.ms-officetheme": ["thmx"],
  "application/vnd.ms-outlook": ["msg"],
  "application/vnd.ms-pki.seccat": ["cat"],
  "application/vnd.ms-pki.stl": ["*stl"],
  "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
  "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
  "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
  "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
  "application/vnd.ms-project": ["*mpp", "mpt"],
  "application/vnd.ms-visio.viewer": ["vdx"],
  "application/vnd.ms-word.document.macroenabled.12": ["docm"],
  "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
  "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
  "application/vnd.ms-wpl": ["wpl"],
  "application/vnd.ms-xpsdocument": ["xps"],
  "application/vnd.mseq": ["mseq"],
  "application/vnd.musician": ["mus"],
  "application/vnd.muvee.style": ["msty"],
  "application/vnd.mynfc": ["taglet"],
  "application/vnd.nato.bindingdataobject+xml": ["bdo"],
  "application/vnd.neurolanguage.nlu": ["nlu"],
  "application/vnd.nitf": ["ntf", "nitf"],
  "application/vnd.noblenet-directory": ["nnd"],
  "application/vnd.noblenet-sealer": ["nns"],
  "application/vnd.noblenet-web": ["nnw"],
  "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
  "application/vnd.nokia.n-gage.data": ["ngdat"],
  "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
  "application/vnd.nokia.radio-preset": ["rpst"],
  "application/vnd.nokia.radio-presets": ["rpss"],
  "application/vnd.novadigm.edm": ["edm"],
  "application/vnd.novadigm.edx": ["edx"],
  "application/vnd.novadigm.ext": ["ext"],
  "application/vnd.oasis.opendocument.chart": ["odc"],
  "application/vnd.oasis.opendocument.chart-template": ["otc"],
  "application/vnd.oasis.opendocument.database": ["odb"],
  "application/vnd.oasis.opendocument.formula": ["odf"],
  "application/vnd.oasis.opendocument.formula-template": ["odft"],
  "application/vnd.oasis.opendocument.graphics": ["odg"],
  "application/vnd.oasis.opendocument.graphics-template": ["otg"],
  "application/vnd.oasis.opendocument.image": ["odi"],
  "application/vnd.oasis.opendocument.image-template": ["oti"],
  "application/vnd.oasis.opendocument.presentation": ["odp"],
  "application/vnd.oasis.opendocument.presentation-template": ["otp"],
  "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
  "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
  "application/vnd.oasis.opendocument.text": ["odt"],
  "application/vnd.oasis.opendocument.text-master": ["odm"],
  "application/vnd.oasis.opendocument.text-template": ["ott"],
  "application/vnd.oasis.opendocument.text-web": ["oth"],
  "application/vnd.olpc-sugar": ["xo"],
  "application/vnd.oma.dd2+xml": ["dd2"],
  "application/vnd.openblox.game+xml": ["obgx"],
  "application/vnd.openofficeorg.extension": ["oxt"],
  "application/vnd.openstreetmap.data+xml": ["osm"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    "pptx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slide": [
    "sldx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
    "ppsx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.template": [
    "potx"
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
    "xltx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    "docx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
    "dotx"
  ],
  "application/vnd.osgeo.mapguide.package": ["mgp"],
  "application/vnd.osgi.dp": ["dp"],
  "application/vnd.osgi.subsystem": ["esa"],
  "application/vnd.palm": ["pdb", "pqa", "oprc"],
  "application/vnd.pawaafile": ["paw"],
  "application/vnd.pg.format": ["str"],
  "application/vnd.pg.osasli": ["ei6"],
  "application/vnd.picsel": ["efif"],
  "application/vnd.pmi.widget": ["wg"],
  "application/vnd.pocketlearn": ["plf"],
  "application/vnd.powerbuilder6": ["pbd"],
  "application/vnd.previewsystems.box": ["box"],
  "application/vnd.procrate.brushset": ["brushset"],
  "application/vnd.procreate.brush": ["brush"],
  "application/vnd.procreate.dream": ["drm"],
  "application/vnd.proteus.magazine": ["mgz"],
  "application/vnd.publishare-delta-tree": ["qps"],
  "application/vnd.pvi.ptid1": ["ptid"],
  "application/vnd.pwg-xhtml-print+xml": ["xhtm"],
  "application/vnd.quark.quarkxpress": [
    "qxd",
    "qxt",
    "qwd",
    "qwt",
    "qxl",
    "qxb"
  ],
  "application/vnd.rar": ["rar"],
  "application/vnd.realvnc.bed": ["bed"],
  "application/vnd.recordare.musicxml": ["mxl"],
  "application/vnd.recordare.musicxml+xml": ["musicxml"],
  "application/vnd.rig.cryptonote": ["cryptonote"],
  "application/vnd.rim.cod": ["cod"],
  "application/vnd.rn-realmedia": ["rm"],
  "application/vnd.rn-realmedia-vbr": ["rmvb"],
  "application/vnd.route66.link66+xml": ["link66"],
  "application/vnd.sailingtracker.track": ["st"],
  "application/vnd.seemail": ["see"],
  "application/vnd.sema": ["sema"],
  "application/vnd.semd": ["semd"],
  "application/vnd.semf": ["semf"],
  "application/vnd.shana.informed.formdata": ["ifm"],
  "application/vnd.shana.informed.formtemplate": ["itp"],
  "application/vnd.shana.informed.interchange": ["iif"],
  "application/vnd.shana.informed.package": ["ipk"],
  "application/vnd.simtech-mindmapper": ["twd", "twds"],
  "application/vnd.smaf": ["mmf"],
  "application/vnd.smart.teacher": ["teacher"],
  "application/vnd.software602.filler.form+xml": ["fo"],
  "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
  "application/vnd.spotfire.dxp": ["dxp"],
  "application/vnd.spotfire.sfs": ["sfs"],
  "application/vnd.stardivision.calc": ["sdc"],
  "application/vnd.stardivision.draw": ["sda"],
  "application/vnd.stardivision.impress": ["sdd"],
  "application/vnd.stardivision.math": ["smf"],
  "application/vnd.stardivision.writer": ["sdw", "vor"],
  "application/vnd.stardivision.writer-global": ["sgl"],
  "application/vnd.stepmania.package": ["smzip"],
  "application/vnd.stepmania.stepchart": ["sm"],
  "application/vnd.sun.wadl+xml": ["wadl"],
  "application/vnd.sun.xml.calc": ["sxc"],
  "application/vnd.sun.xml.calc.template": ["stc"],
  "application/vnd.sun.xml.draw": ["sxd"],
  "application/vnd.sun.xml.draw.template": ["std"],
  "application/vnd.sun.xml.impress": ["sxi"],
  "application/vnd.sun.xml.impress.template": ["sti"],
  "application/vnd.sun.xml.math": ["sxm"],
  "application/vnd.sun.xml.writer": ["sxw"],
  "application/vnd.sun.xml.writer.global": ["sxg"],
  "application/vnd.sun.xml.writer.template": ["stw"],
  "application/vnd.sus-calendar": ["sus", "susp"],
  "application/vnd.svd": ["svd"],
  "application/vnd.symbian.install": ["sis", "sisx"],
  "application/vnd.syncml+xml": ["xsm"],
  "application/vnd.syncml.dm+wbxml": ["bdm"],
  "application/vnd.syncml.dm+xml": ["xdm"],
  "application/vnd.syncml.dmddf+xml": ["ddf"],
  "application/vnd.tao.intent-module-archive": ["tao"],
  "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
  "application/vnd.tmobile-livetv": ["tmo"],
  "application/vnd.trid.tpt": ["tpt"],
  "application/vnd.triscape.mxs": ["mxs"],
  "application/vnd.trueapp": ["tra"],
  "application/vnd.ufdl": ["ufd", "ufdl"],
  "application/vnd.uiq.theme": ["utz"],
  "application/vnd.umajin": ["umj"],
  "application/vnd.unity": ["unityweb"],
  "application/vnd.uoml+xml": ["uoml", "uo"],
  "application/vnd.vcx": ["vcx"],
  "application/vnd.visio": ["vsd", "vst", "vss", "vsw", "vsdx", "vtx"],
  "application/vnd.visionary": ["vis"],
  "application/vnd.vsf": ["vsf"],
  "application/vnd.wap.wbxml": ["wbxml"],
  "application/vnd.wap.wmlc": ["wmlc"],
  "application/vnd.wap.wmlscriptc": ["wmlsc"],
  "application/vnd.webturbo": ["wtb"],
  "application/vnd.wolfram.player": ["nbp"],
  "application/vnd.wordperfect": ["wpd"],
  "application/vnd.wqd": ["wqd"],
  "application/vnd.wt.stf": ["stf"],
  "application/vnd.xara": ["xar"],
  "application/vnd.xfdl": ["xfdl"],
  "application/vnd.yamaha.hv-dic": ["hvd"],
  "application/vnd.yamaha.hv-script": ["hvs"],
  "application/vnd.yamaha.hv-voice": ["hvp"],
  "application/vnd.yamaha.openscoreformat": ["osf"],
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
  "application/vnd.yamaha.smaf-audio": ["saf"],
  "application/vnd.yamaha.smaf-phrase": ["spf"],
  "application/vnd.yellowriver-custom-menu": ["cmp"],
  "application/vnd.zul": ["zir", "zirz"],
  "application/vnd.zzazz.deck+xml": ["zaz"],
  "application/x-7z-compressed": ["7z"],
  "application/x-abiword": ["abw"],
  "application/x-ace-compressed": ["ace"],
  "application/x-apple-diskimage": ["*dmg"],
  "application/x-arj": ["arj"],
  "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
  "application/x-authorware-map": ["aam"],
  "application/x-authorware-seg": ["aas"],
  "application/x-bcpio": ["bcpio"],
  "application/x-bdoc": ["*bdoc"],
  "application/x-bittorrent": ["torrent"],
  "application/x-blender": ["blend"],
  "application/x-blorb": ["blb", "blorb"],
  "application/x-bzip": ["bz"],
  "application/x-bzip2": ["bz2", "boz"],
  "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
  "application/x-cdlink": ["vcd"],
  "application/x-cfs-compressed": ["cfs"],
  "application/x-chat": ["chat"],
  "application/x-chess-pgn": ["pgn"],
  "application/x-chrome-extension": ["crx"],
  "application/x-cocoa": ["cco"],
  "application/x-compressed": ["*rar"],
  "application/x-conference": ["nsc"],
  "application/x-cpio": ["cpio"],
  "application/x-csh": ["csh"],
  "application/x-debian-package": ["*deb", "udeb"],
  "application/x-dgc-compressed": ["dgc"],
  "application/x-director": [
    "dir",
    "dcr",
    "dxr",
    "cst",
    "cct",
    "cxt",
    "w3d",
    "fgd",
    "swa"
  ],
  "application/x-doom": ["wad"],
  "application/x-dtbncx+xml": ["ncx"],
  "application/x-dtbook+xml": ["dtb"],
  "application/x-dtbresource+xml": ["res"],
  "application/x-dvi": ["dvi"],
  "application/x-envoy": ["evy"],
  "application/x-eva": ["eva"],
  "application/x-font-bdf": ["bdf"],
  "application/x-font-ghostscript": ["gsf"],
  "application/x-font-linux-psf": ["psf"],
  "application/x-font-pcf": ["pcf"],
  "application/x-font-snf": ["snf"],
  "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
  "application/x-freearc": ["arc"],
  "application/x-futuresplash": ["spl"],
  "application/x-gca-compressed": ["gca"],
  "application/x-glulx": ["ulx"],
  "application/x-gnumeric": ["gnumeric"],
  "application/x-gramps-xml": ["gramps"],
  "application/x-gtar": ["gtar"],
  "application/x-hdf": ["hdf"],
  "application/x-httpd-php": ["php"],
  "application/x-install-instructions": ["install"],
  "application/x-ipynb+json": ["ipynb"],
  "application/x-iso9660-image": ["*iso"],
  "application/x-iwork-keynote-sffkey": ["*key"],
  "application/x-iwork-numbers-sffnumbers": ["*numbers"],
  "application/x-iwork-pages-sffpages": ["*pages"],
  "application/x-java-archive-diff": ["jardiff"],
  "application/x-java-jnlp-file": ["jnlp"],
  "application/x-keepass2": ["kdbx"],
  "application/x-latex": ["latex"],
  "application/x-lua-bytecode": ["luac"],
  "application/x-lzh-compressed": ["lzh", "lha"],
  "application/x-makeself": ["run"],
  "application/x-mie": ["mie"],
  "application/x-mobipocket-ebook": ["*prc", "mobi"],
  "application/x-ms-application": ["application"],
  "application/x-ms-shortcut": ["lnk"],
  "application/x-ms-wmd": ["wmd"],
  "application/x-ms-wmz": ["wmz"],
  "application/x-ms-xbap": ["xbap"],
  "application/x-msaccess": ["mdb"],
  "application/x-msbinder": ["obd"],
  "application/x-mscardfile": ["crd"],
  "application/x-msclip": ["clp"],
  "application/x-msdos-program": ["*exe"],
  "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
  "application/x-msmediaview": ["mvb", "m13", "m14"],
  "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
  "application/x-msmoney": ["mny"],
  "application/x-mspublisher": ["pub"],
  "application/x-msschedule": ["scd"],
  "application/x-msterminal": ["trm"],
  "application/x-mswrite": ["wri"],
  "application/x-netcdf": ["nc", "cdf"],
  "application/x-ns-proxy-autoconfig": ["pac"],
  "application/x-nzb": ["nzb"],
  "application/x-perl": ["pl", "pm"],
  "application/x-pilot": ["*prc", "*pdb"],
  "application/x-pkcs12": ["p12", "pfx"],
  "application/x-pkcs7-certificates": ["p7b", "spc"],
  "application/x-pkcs7-certreqresp": ["p7r"],
  "application/x-rar-compressed": ["*rar"],
  "application/x-redhat-package-manager": ["rpm"],
  "application/x-research-info-systems": ["ris"],
  "application/x-sea": ["sea"],
  "application/x-sh": ["sh"],
  "application/x-shar": ["shar"],
  "application/x-shockwave-flash": ["swf"],
  "application/x-silverlight-app": ["xap"],
  "application/x-sql": ["*sql"],
  "application/x-stuffit": ["sit"],
  "application/x-stuffitx": ["sitx"],
  "application/x-subrip": ["srt"],
  "application/x-sv4cpio": ["sv4cpio"],
  "application/x-sv4crc": ["sv4crc"],
  "application/x-t3vm-image": ["t3"],
  "application/x-tads": ["gam"],
  "application/x-tar": ["tar"],
  "application/x-tcl": ["tcl", "tk"],
  "application/x-tex": ["tex"],
  "application/x-tex-tfm": ["tfm"],
  "application/x-texinfo": ["texinfo", "texi"],
  "application/x-tgif": ["*obj"],
  "application/x-ustar": ["ustar"],
  "application/x-virtualbox-hdd": ["hdd"],
  "application/x-virtualbox-ova": ["ova"],
  "application/x-virtualbox-ovf": ["ovf"],
  "application/x-virtualbox-vbox": ["vbox"],
  "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
  "application/x-virtualbox-vdi": ["vdi"],
  "application/x-virtualbox-vhd": ["vhd"],
  "application/x-virtualbox-vmdk": ["vmdk"],
  "application/x-wais-source": ["src"],
  "application/x-web-app-manifest+json": ["webapp"],
  "application/x-x509-ca-cert": ["der", "crt", "pem"],
  "application/x-xfig": ["fig"],
  "application/x-xliff+xml": ["*xlf"],
  "application/x-xpinstall": ["xpi"],
  "application/x-xz": ["xz"],
  "application/x-zip-compressed": ["*zip"],
  "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
  "audio/vnd.dece.audio": ["uva", "uvva"],
  "audio/vnd.digital-winds": ["eol"],
  "audio/vnd.dra": ["dra"],
  "audio/vnd.dts": ["dts"],
  "audio/vnd.dts.hd": ["dtshd"],
  "audio/vnd.lucent.voice": ["lvp"],
  "audio/vnd.ms-playready.media.pya": ["pya"],
  "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
  "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
  "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
  "audio/vnd.rip": ["rip"],
  "audio/x-aac": ["*aac"],
  "audio/x-aiff": ["aif", "aiff", "aifc"],
  "audio/x-caf": ["caf"],
  "audio/x-flac": ["flac"],
  "audio/x-m4a": ["*m4a"],
  "audio/x-matroska": ["mka"],
  "audio/x-mpegurl": ["m3u"],
  "audio/x-ms-wax": ["wax"],
  "audio/x-ms-wma": ["wma"],
  "audio/x-pn-realaudio": ["ram", "ra"],
  "audio/x-pn-realaudio-plugin": ["rmp"],
  "audio/x-realaudio": ["*ra"],
  "audio/x-wav": ["*wav"],
  "chemical/x-cdx": ["cdx"],
  "chemical/x-cif": ["cif"],
  "chemical/x-cmdf": ["cmdf"],
  "chemical/x-cml": ["cml"],
  "chemical/x-csml": ["csml"],
  "chemical/x-xyz": ["xyz"],
  "image/prs.btif": ["btif", "btf"],
  "image/prs.pti": ["pti"],
  "image/vnd.adobe.photoshop": ["psd"],
  "image/vnd.airzip.accelerator.azv": ["azv"],
  "image/vnd.blockfact.facti": ["facti"],
  "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
  "image/vnd.djvu": ["djvu", "djv"],
  "image/vnd.dvb.subtitle": ["*sub"],
  "image/vnd.dwg": ["dwg"],
  "image/vnd.dxf": ["dxf"],
  "image/vnd.fastbidsheet": ["fbs"],
  "image/vnd.fpx": ["fpx"],
  "image/vnd.fst": ["fst"],
  "image/vnd.fujixerox.edmics-mmr": ["mmr"],
  "image/vnd.fujixerox.edmics-rlc": ["rlc"],
  "image/vnd.microsoft.icon": ["ico"],
  "image/vnd.ms-dds": ["dds"],
  "image/vnd.ms-modi": ["mdi"],
  "image/vnd.ms-photo": ["wdp"],
  "image/vnd.net-fpx": ["npx"],
  "image/vnd.pco.b16": ["b16"],
  "image/vnd.tencent.tap": ["tap"],
  "image/vnd.valve.source.texture": ["vtf"],
  "image/vnd.wap.wbmp": ["wbmp"],
  "image/vnd.xiff": ["xif"],
  "image/vnd.zbrush.pcx": ["pcx"],
  "image/x-3ds": ["3ds"],
  "image/x-adobe-dng": ["dng"],
  "image/x-cmu-raster": ["ras"],
  "image/x-cmx": ["cmx"],
  "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
  "image/x-icon": ["*ico"],
  "image/x-jng": ["jng"],
  "image/x-mrsid-image": ["sid"],
  "image/x-ms-bmp": ["*bmp"],
  "image/x-pcx": ["*pcx"],
  "image/x-pict": ["pic", "pct"],
  "image/x-portable-anymap": ["pnm"],
  "image/x-portable-bitmap": ["pbm"],
  "image/x-portable-graymap": ["pgm"],
  "image/x-portable-pixmap": ["ppm"],
  "image/x-rgb": ["rgb"],
  "image/x-tga": ["tga"],
  "image/x-xbitmap": ["xbm"],
  "image/x-xpixmap": ["xpm"],
  "image/x-xwindowdump": ["xwd"],
  "message/vnd.wfa.wsc": ["wsc"],
  "model/vnd.bary": ["bary"],
  "model/vnd.cld": ["cld"],
  "model/vnd.collada+xml": ["dae"],
  "model/vnd.dwf": ["dwf"],
  "model/vnd.gdl": ["gdl"],
  "model/vnd.gtw": ["gtw"],
  "model/vnd.mts": ["*mts"],
  "model/vnd.opengex": ["ogex"],
  "model/vnd.parasolid.transmit.binary": ["x_b"],
  "model/vnd.parasolid.transmit.text": ["x_t"],
  "model/vnd.pytha.pyox": ["pyo", "pyox"],
  "model/vnd.sap.vds": ["vds"],
  "model/vnd.usda": ["usda"],
  "model/vnd.usdz+zip": ["usdz"],
  "model/vnd.valve.source.compiled-map": ["bsp"],
  "model/vnd.vtu": ["vtu"],
  "text/prs.lines.tag": ["dsc"],
  "text/vnd.curl": ["curl"],
  "text/vnd.curl.dcurl": ["dcurl"],
  "text/vnd.curl.mcurl": ["mcurl"],
  "text/vnd.curl.scurl": ["scurl"],
  "text/vnd.dvb.subtitle": ["sub"],
  "text/vnd.familysearch.gedcom": ["ged"],
  "text/vnd.fly": ["fly"],
  "text/vnd.fmi.flexstor": ["flx"],
  "text/vnd.graphviz": ["gv"],
  "text/vnd.in3d.3dml": ["3dml"],
  "text/vnd.in3d.spot": ["spot"],
  "text/vnd.sun.j2me.app-descriptor": ["jad"],
  "text/vnd.wap.wml": ["wml"],
  "text/vnd.wap.wmlscript": ["wmls"],
  "text/x-asm": ["s", "asm"],
  "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
  "text/x-component": ["htc"],
  "text/x-fortran": ["f", "for", "f77", "f90"],
  "text/x-handlebars-template": ["hbs"],
  "text/x-java-source": ["java"],
  "text/x-lua": ["lua"],
  "text/x-markdown": ["mkd"],
  "text/x-nfo": ["nfo"],
  "text/x-opml": ["opml"],
  "text/x-org": ["*org"],
  "text/x-pascal": ["p", "pas"],
  "text/x-processing": ["pde"],
  "text/x-sass": ["sass"],
  "text/x-scss": ["scss"],
  "text/x-setext": ["etx"],
  "text/x-sfv": ["sfv"],
  "text/x-suse-ymp": ["ymp"],
  "text/x-uuencode": ["uu"],
  "text/x-vcalendar": ["vcs"],
  "text/x-vcard": ["vcf"],
  "video/vnd.dece.hd": ["uvh", "uvvh"],
  "video/vnd.dece.mobile": ["uvm", "uvvm"],
  "video/vnd.dece.pd": ["uvp", "uvvp"],
  "video/vnd.dece.sd": ["uvs", "uvvs"],
  "video/vnd.dece.video": ["uvv", "uvvv"],
  "video/vnd.dvb.file": ["dvb"],
  "video/vnd.fvt": ["fvt"],
  "video/vnd.mpegurl": ["mxu", "m4u"],
  "video/vnd.ms-playready.media.pyv": ["pyv"],
  "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
  "video/vnd.vivo": ["viv"],
  "video/x-f4v": ["f4v"],
  "video/x-fli": ["fli"],
  "video/x-flv": ["flv"],
  "video/x-m4v": ["m4v"],
  "video/x-matroska": ["mkv", "mk3d", "mks"],
  "video/x-mng": ["mng"],
  "video/x-ms-asf": ["asf", "asx"],
  "video/x-ms-vob": ["vob"],
  "video/x-ms-wm": ["wm"],
  "video/x-ms-wmv": ["wmv"],
  "video/x-ms-wmx": ["wmx"],
  "video/x-ms-wvx": ["wvx"],
  "video/x-msvideo": ["avi"],
  "video/x-sgi-movie": ["movie"],
  "video/x-smv": ["smv"],
  "x-conference/x-cooltalk": ["ice"]
};
Object.freeze(Df);
const Uf = {
  "application/andrew-inset": ["ez"],
  "application/appinstaller": ["appinstaller"],
  "application/applixware": ["aw"],
  "application/appx": ["appx"],
  "application/appxbundle": ["appxbundle"],
  "application/atom+xml": ["atom"],
  "application/atomcat+xml": ["atomcat"],
  "application/atomdeleted+xml": ["atomdeleted"],
  "application/atomsvc+xml": ["atomsvc"],
  "application/atsc-dwd+xml": ["dwd"],
  "application/atsc-held+xml": ["held"],
  "application/atsc-rsat+xml": ["rsat"],
  "application/automationml-aml+xml": ["aml"],
  "application/automationml-amlx+zip": ["amlx"],
  "application/bdoc": ["bdoc"],
  "application/calendar+xml": ["xcs"],
  "application/ccxml+xml": ["ccxml"],
  "application/cdfx+xml": ["cdfx"],
  "application/cdmi-capability": ["cdmia"],
  "application/cdmi-container": ["cdmic"],
  "application/cdmi-domain": ["cdmid"],
  "application/cdmi-object": ["cdmio"],
  "application/cdmi-queue": ["cdmiq"],
  "application/cpl+xml": ["cpl"],
  "application/cu-seeme": ["cu"],
  "application/cwl": ["cwl"],
  "application/dash+xml": ["mpd"],
  "application/dash-patch+xml": ["mpp"],
  "application/davmount+xml": ["davmount"],
  "application/dicom": ["dcm"],
  "application/docbook+xml": ["dbk"],
  "application/dssc+der": ["dssc"],
  "application/dssc+xml": ["xdssc"],
  "application/ecmascript": ["ecma"],
  "application/emma+xml": ["emma"],
  "application/emotionml+xml": ["emotionml"],
  "application/epub+zip": ["epub"],
  "application/exi": ["exi"],
  "application/express": ["exp"],
  "application/fdf": ["fdf"],
  "application/fdt+xml": ["fdt"],
  "application/font-tdpfr": ["pfr"],
  "application/geo+json": ["geojson"],
  "application/gml+xml": ["gml"],
  "application/gpx+xml": ["gpx"],
  "application/gxf": ["gxf"],
  "application/gzip": ["gz"],
  "application/hjson": ["hjson"],
  "application/hyperstudio": ["stk"],
  "application/inkml+xml": ["ink", "inkml"],
  "application/ipfix": ["ipfix"],
  "application/its+xml": ["its"],
  "application/java-archive": ["jar", "war", "ear"],
  "application/java-serialized-object": ["ser"],
  "application/java-vm": ["class"],
  "application/javascript": ["*js"],
  "application/json": ["json", "map"],
  "application/json5": ["json5"],
  "application/jsonml+json": ["jsonml"],
  "application/ld+json": ["jsonld"],
  "application/lgr+xml": ["lgr"],
  "application/lost+xml": ["lostxml"],
  "application/mac-binhex40": ["hqx"],
  "application/mac-compactpro": ["cpt"],
  "application/mads+xml": ["mads"],
  "application/manifest+json": ["webmanifest"],
  "application/marc": ["mrc"],
  "application/marcxml+xml": ["mrcx"],
  "application/mathematica": ["ma", "nb", "mb"],
  "application/mathml+xml": ["mathml"],
  "application/mbox": ["mbox"],
  "application/media-policy-dataset+xml": ["mpf"],
  "application/mediaservercontrol+xml": ["mscml"],
  "application/metalink+xml": ["metalink"],
  "application/metalink4+xml": ["meta4"],
  "application/mets+xml": ["mets"],
  "application/mmt-aei+xml": ["maei"],
  "application/mmt-usd+xml": ["musd"],
  "application/mods+xml": ["mods"],
  "application/mp21": ["m21", "mp21"],
  "application/mp4": ["*mp4", "*mpg4", "mp4s", "m4p"],
  "application/msix": ["msix"],
  "application/msixbundle": ["msixbundle"],
  "application/msword": ["doc", "dot"],
  "application/mxf": ["mxf"],
  "application/n-quads": ["nq"],
  "application/n-triples": ["nt"],
  "application/node": ["cjs"],
  "application/octet-stream": [
    "bin",
    "dms",
    "lrf",
    "mar",
    "so",
    "dist",
    "distz",
    "pkg",
    "bpk",
    "dump",
    "elc",
    "deploy",
    "exe",
    "dll",
    "deb",
    "dmg",
    "iso",
    "img",
    "msi",
    "msp",
    "msm",
    "buffer"
  ],
  "application/oda": ["oda"],
  "application/oebps-package+xml": ["opf"],
  "application/ogg": ["ogx"],
  "application/omdoc+xml": ["omdoc"],
  "application/onenote": [
    "onetoc",
    "onetoc2",
    "onetmp",
    "onepkg",
    "one",
    "onea"
  ],
  "application/oxps": ["oxps"],
  "application/p2p-overlay+xml": ["relo"],
  "application/patch-ops-error+xml": ["xer"],
  "application/pdf": ["pdf"],
  "application/pgp-encrypted": ["pgp"],
  "application/pgp-keys": ["asc"],
  "application/pgp-signature": ["sig", "*asc"],
  "application/pics-rules": ["prf"],
  "application/pkcs10": ["p10"],
  "application/pkcs7-mime": ["p7m", "p7c"],
  "application/pkcs7-signature": ["p7s"],
  "application/pkcs8": ["p8"],
  "application/pkix-attr-cert": ["ac"],
  "application/pkix-cert": ["cer"],
  "application/pkix-crl": ["crl"],
  "application/pkix-pkipath": ["pkipath"],
  "application/pkixcmp": ["pki"],
  "application/pls+xml": ["pls"],
  "application/postscript": ["ai", "eps", "ps"],
  "application/provenance+xml": ["provx"],
  "application/pskc+xml": ["pskcxml"],
  "application/raml+yaml": ["raml"],
  "application/rdf+xml": ["rdf", "owl"],
  "application/reginfo+xml": ["rif"],
  "application/relax-ng-compact-syntax": ["rnc"],
  "application/resource-lists+xml": ["rl"],
  "application/resource-lists-diff+xml": ["rld"],
  "application/rls-services+xml": ["rs"],
  "application/route-apd+xml": ["rapd"],
  "application/route-s-tsid+xml": ["sls"],
  "application/route-usd+xml": ["rusd"],
  "application/rpki-ghostbusters": ["gbr"],
  "application/rpki-manifest": ["mft"],
  "application/rpki-roa": ["roa"],
  "application/rsd+xml": ["rsd"],
  "application/rss+xml": ["rss"],
  "application/rtf": ["rtf"],
  "application/sbml+xml": ["sbml"],
  "application/scvp-cv-request": ["scq"],
  "application/scvp-cv-response": ["scs"],
  "application/scvp-vp-request": ["spq"],
  "application/scvp-vp-response": ["spp"],
  "application/sdp": ["sdp"],
  "application/senml+xml": ["senmlx"],
  "application/sensml+xml": ["sensmlx"],
  "application/set-payment-initiation": ["setpay"],
  "application/set-registration-initiation": ["setreg"],
  "application/shf+xml": ["shf"],
  "application/sieve": ["siv", "sieve"],
  "application/smil+xml": ["smi", "smil"],
  "application/sparql-query": ["rq"],
  "application/sparql-results+xml": ["srx"],
  "application/sql": ["sql"],
  "application/srgs": ["gram"],
  "application/srgs+xml": ["grxml"],
  "application/sru+xml": ["sru"],
  "application/ssdl+xml": ["ssdl"],
  "application/ssml+xml": ["ssml"],
  "application/swid+xml": ["swidtag"],
  "application/tei+xml": ["tei", "teicorpus"],
  "application/thraud+xml": ["tfi"],
  "application/timestamped-data": ["tsd"],
  "application/toml": ["toml"],
  "application/trig": ["trig"],
  "application/ttml+xml": ["ttml"],
  "application/ubjson": ["ubj"],
  "application/urc-ressheet+xml": ["rsheet"],
  "application/urc-targetdesc+xml": ["td"],
  "application/voicexml+xml": ["vxml"],
  "application/wasm": ["wasm"],
  "application/watcherinfo+xml": ["wif"],
  "application/widget": ["wgt"],
  "application/winhlp": ["hlp"],
  "application/wsdl+xml": ["wsdl"],
  "application/wspolicy+xml": ["wspolicy"],
  "application/xaml+xml": ["xaml"],
  "application/xcap-att+xml": ["xav"],
  "application/xcap-caps+xml": ["xca"],
  "application/xcap-diff+xml": ["xdf"],
  "application/xcap-el+xml": ["xel"],
  "application/xcap-ns+xml": ["xns"],
  "application/xenc+xml": ["xenc"],
  "application/xfdf": ["xfdf"],
  "application/xhtml+xml": ["xhtml", "xht"],
  "application/xliff+xml": ["xlf"],
  "application/xml": ["xml", "xsl", "xsd", "rng"],
  "application/xml-dtd": ["dtd"],
  "application/xop+xml": ["xop"],
  "application/xproc+xml": ["xpl"],
  "application/xslt+xml": ["*xsl", "xslt"],
  "application/xspf+xml": ["xspf"],
  "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
  "application/yang": ["yang"],
  "application/yin+xml": ["yin"],
  "application/zip": ["zip"],
  "application/zip+dotlottie": ["lottie"],
  "audio/3gpp": ["*3gpp"],
  "audio/aac": ["adts", "aac"],
  "audio/adpcm": ["adp"],
  "audio/amr": ["amr"],
  "audio/basic": ["au", "snd"],
  "audio/midi": ["mid", "midi", "kar", "rmi"],
  "audio/mobile-xmf": ["mxmf"],
  "audio/mp3": ["*mp3"],
  "audio/mp4": ["m4a", "mp4a", "m4b"],
  "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  "audio/ogg": ["oga", "ogg", "spx", "opus"],
  "audio/s3m": ["s3m"],
  "audio/silk": ["sil"],
  "audio/wav": ["wav"],
  "audio/wave": ["*wav"],
  "audio/webm": ["weba"],
  "audio/xm": ["xm"],
  "font/collection": ["ttc"],
  "font/otf": ["otf"],
  "font/ttf": ["ttf"],
  "font/woff": ["woff"],
  "font/woff2": ["woff2"],
  "image/aces": ["exr"],
  "image/apng": ["apng"],
  "image/avci": ["avci"],
  "image/avcs": ["avcs"],
  "image/avif": ["avif"],
  "image/bmp": ["bmp", "dib"],
  "image/cgm": ["cgm"],
  "image/dicom-rle": ["drle"],
  "image/dpx": ["dpx"],
  "image/emf": ["emf"],
  "image/fits": ["fits"],
  "image/g3fax": ["g3"],
  "image/gif": ["gif"],
  "image/heic": ["heic"],
  "image/heic-sequence": ["heics"],
  "image/heif": ["heif"],
  "image/heif-sequence": ["heifs"],
  "image/hej2k": ["hej2"],
  "image/ief": ["ief"],
  "image/jaii": ["jaii"],
  "image/jais": ["jais"],
  "image/jls": ["jls"],
  "image/jp2": ["jp2", "jpg2"],
  "image/jpeg": ["jpg", "jpeg", "jpe"],
  "image/jph": ["jph"],
  "image/jphc": ["jhc"],
  "image/jpm": ["jpm", "jpgm"],
  "image/jpx": ["jpx", "jpf"],
  "image/jxl": ["jxl"],
  "image/jxr": ["jxr"],
  "image/jxra": ["jxra"],
  "image/jxrs": ["jxrs"],
  "image/jxs": ["jxs"],
  "image/jxsc": ["jxsc"],
  "image/jxsi": ["jxsi"],
  "image/jxss": ["jxss"],
  "image/ktx": ["ktx"],
  "image/ktx2": ["ktx2"],
  "image/pjpeg": ["jfif"],
  "image/png": ["png"],
  "image/sgi": ["sgi"],
  "image/svg+xml": ["svg", "svgz"],
  "image/t38": ["t38"],
  "image/tiff": ["tif", "tiff"],
  "image/tiff-fx": ["tfx"],
  "image/webp": ["webp"],
  "image/wmf": ["wmf"],
  "message/disposition-notification": ["disposition-notification"],
  "message/global": ["u8msg"],
  "message/global-delivery-status": ["u8dsn"],
  "message/global-disposition-notification": ["u8mdn"],
  "message/global-headers": ["u8hdr"],
  "message/rfc822": ["eml", "mime", "mht", "mhtml"],
  "model/3mf": ["3mf"],
  "model/gltf+json": ["gltf"],
  "model/gltf-binary": ["glb"],
  "model/iges": ["igs", "iges"],
  "model/jt": ["jt"],
  "model/mesh": ["msh", "mesh", "silo"],
  "model/mtl": ["mtl"],
  "model/obj": ["obj"],
  "model/prc": ["prc"],
  "model/step": ["step", "stp", "stpnc", "p21", "210"],
  "model/step+xml": ["stpx"],
  "model/step+zip": ["stpz"],
  "model/step-xml+zip": ["stpxz"],
  "model/stl": ["stl"],
  "model/u3d": ["u3d"],
  "model/vrml": ["wrl", "vrml"],
  "model/x3d+binary": ["*x3db", "x3dbz"],
  "model/x3d+fastinfoset": ["x3db"],
  "model/x3d+vrml": ["*x3dv", "x3dvz"],
  "model/x3d+xml": ["x3d", "x3dz"],
  "model/x3d-vrml": ["x3dv"],
  "text/cache-manifest": ["appcache", "manifest"],
  "text/calendar": ["ics", "ifb"],
  "text/coffeescript": ["coffee", "litcoffee"],
  "text/css": ["css"],
  "text/csv": ["csv"],
  "text/html": ["html", "htm", "shtml"],
  "text/jade": ["jade"],
  "text/javascript": ["js", "mjs"],
  "text/jsx": ["jsx"],
  "text/less": ["less"],
  "text/markdown": ["md", "markdown"],
  "text/mathml": ["mml"],
  "text/mdx": ["mdx"],
  "text/n3": ["n3"],
  "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  "text/richtext": ["rtx"],
  "text/rtf": ["*rtf"],
  "text/sgml": ["sgml", "sgm"],
  "text/shex": ["shex"],
  "text/slim": ["slim", "slm"],
  "text/spdx": ["spdx"],
  "text/stylus": ["stylus", "styl"],
  "text/tab-separated-values": ["tsv"],
  "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
  "text/turtle": ["ttl"],
  "text/uri-list": ["uri", "uris", "urls"],
  "text/vcard": ["vcard"],
  "text/vtt": ["vtt"],
  "text/wgsl": ["wgsl"],
  "text/xml": ["*xml"],
  "text/yaml": ["yaml", "yml"],
  "video/3gpp": ["3gp", "3gpp"],
  "video/3gpp2": ["3g2"],
  "video/h261": ["h261"],
  "video/h263": ["h263"],
  "video/h264": ["h264"],
  "video/iso.segment": ["m4s"],
  "video/jpeg": ["jpgv"],
  "video/jpm": ["*jpm", "*jpgm"],
  "video/mj2": ["mj2", "mjp2"],
  "video/mp2t": ["ts", "m2t", "m2ts", "mts"],
  "video/mp4": ["mp4", "mp4v", "mpg4"],
  "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  "video/ogg": ["ogv"],
  "video/quicktime": ["qt", "mov"],
  "video/webm": ["webm"]
};
Object.freeze(Uf);
var Qe = function(n, e, t, r) {
  if (t === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? n !== e || !r : !e.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? r : t === "a" ? r.call(n) : r ? r.value : e.get(n);
}, jn, _r, an;
class WI {
  constructor(...e) {
    jn.set(this, /* @__PURE__ */ new Map()), _r.set(this, /* @__PURE__ */ new Map()), an.set(this, /* @__PURE__ */ new Map());
    for (const t of e)
      this.define(t);
  }
  define(e, t = !1) {
    for (let [r, s] of Object.entries(e)) {
      r = r.toLowerCase(), s = s.map((o) => o.toLowerCase()), Qe(this, an, "f").has(r) || Qe(this, an, "f").set(r, /* @__PURE__ */ new Set());
      const i = Qe(this, an, "f").get(r);
      let a = !0;
      for (let o of s) {
        const l = o.startsWith("*");
        if (o = l ? o.slice(1) : o, i?.add(o), a && Qe(this, _r, "f").set(r, o), a = !1, l)
          continue;
        const c = Qe(this, jn, "f").get(o);
        if (c && c != r && !t)
          throw new Error(`"${r} -> ${o}" conflicts with "${c} -> ${o}". Pass \`force=true\` to override this definition.`);
        Qe(this, jn, "f").set(o, r);
      }
    }
    return this;
  }
  getType(e) {
    if (typeof e != "string")
      return null;
    const t = e.replace(/^.*[/\\]/s, "").toLowerCase(), r = t.replace(/^.*\./s, "").toLowerCase(), s = t.length < e.length;
    return !(r.length < t.length - 1) && s ? null : Qe(this, jn, "f").get(r) ?? null;
  }
  getExtension(e) {
    return typeof e != "string" ? null : (e = e?.split?.(";")[0], (e && Qe(this, _r, "f").get(e.trim().toLowerCase())) ?? null);
  }
  getAllExtensions(e) {
    return typeof e != "string" ? null : Qe(this, an, "f").get(e.toLowerCase()) ?? null;
  }
  _freeze() {
    this.define = () => {
      throw new Error("define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances");
    }, Object.freeze(this);
    for (const e of Qe(this, an, "f").values())
      Object.freeze(e);
    return this;
  }
  _getTestState() {
    return {
      types: Qe(this, jn, "f"),
      extensions: Qe(this, _r, "f")
    };
  }
}
jn = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new WeakMap();
const wo = new WI(Uf, Df)._freeze();
function pe(n, e) {
  const { parameters: t, response: r, name: s, description: i } = n, a = Ln(t).toJSONSchema(), o = {
    name: s,
    description: i,
    parametersJsonSchema: a,
    handler: e
  };
  return r && (o.responseJsonSchema = Ln(r).toJSONSchema()), o;
}
function BI(n) {
  return Ln(n).toJSONSchema();
}
function Nf(n, e) {
  const { parametersJsonSchema: t, responseJsonSchema: r, name: s, description: i } = n, a = {
    name: s,
    description: i,
    parametersJsonSchema: t,
    handler: e
  };
  return r && (a.responseJsonSchema = r), a;
}
function Sn(n) {
  const e = n.map((r) => [
    r.name,
    r
  ]), t = n.map(
    ({ handler: r, ...s }) => s
  );
  return { definitions: e, declarations: t };
}
function qI() {
  return { definitions: [], declarations: [] };
}
function ha() {
  return J`You are working as part of an AI system, so no chit-chat and no explaining what you're doing and why.
DO NOT start with "Okay", or "Alright" or any preambles. Just the output, please.`.asContent();
}
function Gf(n) {
  return n || (n = ha()), J`

Today is ${(/* @__PURE__ */ new Date()).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  })}
    
${n}`.asContent();
}
const HI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createSystemInstruction: Gf,
  defaultSystemInstruction: ha
}, Symbol.toStringTag, { value: "Module" })), VI = {
  type: "object",
  definitions: {
    TaskNode: {
      type: "object",
      required: ["task_id", "description", "execution_mode", "status"],
      properties: {
        task_id: {
          type: "string",
          description: P`
The unique id of the task, must be in the format of "task_NNN" where NNN is the number`
        },
        description: {
          type: "string",
          description: "Detailed explanation of what fulfilling this objective entails."
        },
        execution_mode: {
          type: "string",
          description: "Defines how immediate subtasks should be executed. 'serial' means one by one in order; 'concurrent' means all at the same time.",
          enum: ["serial", "concurrent"]
        },
        status: {
          type: "string",
          description: "The current status of a task",
          enum: ["not_started", "in_progress", "complete"]
        },
        subtasks: {
          type: "array",
          description: "Ordered list of child tasks. If execution_mode is serial, the order matters.",
          items: {
            $ref: "#/definitions/TaskNode"
          }
        }
      }
    }
  },
  properties: {
    task_tree: {
      type: "object",
      $ref: "#/definitions/TaskNode"
    }
  }
};
class YI {
  constructor(e) {
    this.fileSystem = e, this.tree = null, this.taskMap = /* @__PURE__ */ new Map(), this.messageMap = /* @__PURE__ */ new Map();
  }
  save() {
    return this.fileSystem.overwrite(
      "task_tree",
      JSON.stringify(this.tree),
      "application/json"
    );
  }
  set(e) {
    this.tree = e, this.taskMap.clear(), this.messageMap.clear();
    const t = (r) => {
      for (const s of r)
        this.taskMap.set(s.task_id, s), s.subtasks && t(s.subtasks);
    };
    return t([this.tree]), this.save();
  }
  get() {
    return JSON.stringify(this.tree) || "";
  }
  trimTaskId(e) {
    return e.split("_").slice(0, 2).join("_");
  }
  setInProgress(e, t) {
    if (!e) return;
    const r = this.trimTaskId(e), s = this.taskMap.get(r);
    s && (s.status = "in_progress", this.messageMap.set(r, t), this.save());
  }
  setComplete(e) {
    for (const t of e) {
      const r = this.taskMap.get(this.trimTaskId(t));
      r && (r.status = "complete");
    }
    return this.save();
  }
}
const Ff = "system_list_files", kr = "system_objective_fulfilled", rs = "system_failed_to_fulfill_objective", xo = "system_create_task_tree", _o = "system_mark_completed_tasks", Ua = "objective_outcome", zf = "task_id", Ye = {
  status_update: I.string().describe(P`
  A status update to show in the UI that provides more detail on the reason why this function was called.
  
  For example, "Creating random values", "Writing the memo", "Generating videos", "Making music", etc.`)
}, Je = {
  [zf]: I.string(
    P`If applicable, the "task_id" value of the relevant task in the task tree.`
  ).optional()
}, yi = {
  file_name: I.string().describe(
    P`Optional name for the generated file (without extension). Use snake_case for naming. The system will automatically add the appropriate extension based on the file type.`
  ).optional()
}, JI = P`

You are an LLM-powered AI agent, orchestrated within an application alongside other AI agents. During this session, your job is to fulfill the objective, specified at the start of the conversation context. The objective provided by the application and is not visible to the user of the application. Similarly, the outcome you produce is delivered by the orchestration system to another agent. The outcome is also not visible to the user to the application.

You may receive input from other agents (their outcomes) in the form of <input source-agent="agent_name">content</input> tags. The content of the tag is the input from the agent.

You are also linked with other AI agents via hyperlinks. The <a href="url">title</a> syntax points at another agent. If the objective calls for it, you can transfer control to this agent. To transfer control, use the url of the agent in the  "href" parameter when calling "${kr}" or "${rs}" function. As a result, the outcome will be transferred to that agent.

To help you orient in time, today is ${(/* @__PURE__ */ new Date()).toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit"
})}

In your pursuit of fulfilling the objective, follow this meta-plan PRECISELY.

<meta-plan>

## STEP 1. Evaluate If The Objective Can Be Fulfilled

Ask yourself: can the objective be fulfilled with the tools and capabilities you have? Is there missing data? Can it be requested from the user? Do not make any assumptions.

If the required tools or capabilities are missing available to fulfill the objective, call "${rs}" function. Do not overthink it. It's better to exit quickly than waste time trying and fail at the end.

## STEP 2. Determine Problem Domain and Overall Approach

Applying the Cynefin framework, determine the domain of the problem into which fulfilling the objective falls. Most of the time, it will be one of these:

1) Simple -- the objective falls into the domain of simple problems: it's a simple task. 

2) Complicated - the objective falls into the domain of complicated problems: fulfilling the object requires expertise, careful planning and preparation.

3) Complex - the objective is from the complex domain. Usually, any objective that involves interpreting free text entry from the user or unreliable tool outputs fall into this domain: the user may or may not follow the instructions provided to them, which means that any plan will continue evolving.

NOTE: depending on what functions you're provided with, you may not have the means to interact with the user. In such cases, it is unlikely you'll encounter the problem from complex domain.

Ask yourself: what is the problem domain? Is it simple, complicated, or complex? If not sure, start with complicated and see if it works.

## STEP 3. Proceed with Fulfilling Objective.

For simple tasks, take the "just do it" approach. No planning necessary, just perform the task. Do not overthink it and emphasize expedience over perfection.

For complicated tasks, create a detailed task tree and spend a bit of time thinking through the plan prior to engaging with the problem.

When dealing with complex problems, adopt the OODA loop approach: instead of devising a detailed plan, focus on observing what is happening, orienting toward the objective, deciding on the right next step, and acting.

### Creating and Using a Task Tree

When working on a complicated problem, use the "${xo}" function create a dependency tree for the tasks. Every task must loosely correspond to a function being called.

Take the following approach:

First, consider which tasks can be executed concurrently and which ones must be executed serially?

When faced with the choice of serial or concurrent execution, choose concurrency to save precious time.

Now, start executing the plan. 

For concurrent tasks, make sure to generate multiple function calls simultaneously. 

To better match function calls to tasks, use the "${zf}" parameter in the function calls. To express more granularity within a task, add extra identifiers at the end like this: "task_001_1". This means "task_001, part 1".

After each task is completed, examine: is the plan still good? Did the results of the tasks affect the outcome? If not, keep going. Otherwise, reexamine the plan and adjust it accordingly.

Use the "${_o}" function to keep track of the completed tasks. All tasks are automatically marked as completed when the "${kr}" is called, so avoid the unnecessary "${_o}" function calls at the end. 

### Problem Domain Escalation

While fulfilling the task, it may become apparent to you that your initial guess of the problem domain is wrong. Most commonly, this will cause the problem domain escalation: simple problems turn out complicated, and complicated become complex. Be deliberate about recognizing this change. When it happens, remind yourself about the problem domain escalation and adjust the strategy appropriately.

## STEP 4. Return the objective outcome

Only after you've completely fulfilled the objective call the "${kr}" function. This is important. This function call signals the end of work and once called, no more work will be done. Pass the outcome of your work as the "${Ua}" parameter.

### What to return

Return outcome as a text content that can reference VFS files. They will be included as part of the outcome. For example, if you need to return multiple existing images or videos, just reference them using <file> tags in the "${Ua}" parameter.

Only return what is asked for in the objective. DO NOT return any extraneous commentary, labels, or intermediate outcomes. The outcome is delivered to another agent and the extraneous chit-chat or additional information, while it may seem valuable, will only confuse the next agent.

### How to determine what to return

1. Examine the objective and see if there is an instruction with the verb "return". If so, the outcome must be whatever is specified in the instruction.

Example: "evaluate multiple products for product market fit and return the verdict on which fits the best" -- the outcome is the verdict only.

2. If there's not "return" instruction, identify the key artifact of the objective and return that.

Example 1: "research the provided topic and generate an image of ..." -- return just a VFS file reference to the image without any extraneous text.

Example 2: "Make a blog post writer. It ... shows the header graphic and the blog post as a final result" -- return just the header graphic as a VFS file reference and a blog post.

3. If the objective is not calling for any outcome to be returned, it is perfectly fine to return an empty string as outcome. The mere fact of calling the "${kr}" function is an outcome in itself.

Example 2: "Examine the state and if it's empty, go to ... otherwise, go to ..." -- return an empty string.

IMPORTANT: DO NOT start the "${Ua}" parameter value with a "Here is ..." or "Okay", or "Alright" or any preambles. You are working as part of an AI system, so no chit-chat and no explaining what you're doing and why. Just the output, please. 

In situations when you failed to fulfill the objective, invoke the "${rs}" function.


</meta-plan>

## Using Files

The system you're working in uses the virtual file system (VFS). The VFS paths are always prefixed with the "/vfs/". Every VFS file path will be of the form "/vfs/[name]". Use snake_case to name files.

You can use the <file src="/vfs/path" /> syntax to embed them in text.

Only reference files that you know to exist. If you aren't sure, call the "${Ff}" function to confirm their existence. Do NOT make hypothetical file tags: they will cause processing errors.

NOTE: The post-processing parser that reads your generated output and replaces the <file src="/vfs/path" /> with the contents of the file. Make sure that your output still makes sense after the replacement.

### Good example

Evaluate the proposal below according to the provided rubric:

Proposal:

<file src="/vfs/proposal.md" />

Rubric:

<file src="/vfs/rubric.md" />

### Bad example 

Evaluate proposal <file src="/vfs/proposal.md" /> according to the rubric <file src="/vfs/rubric.md" />

In the good example above, the replaced texts fit neatly under each heading. In the bad example, the replaced text is stuffed into the sentence.
`;
function KI(n) {
  return { ...Sn(ZI(n)), instruction: JI };
}
function ZI(n) {
  return [
    pe(
      {
        name: kr,
        description: `Inidicates completion of the overall objective. 
Call only when the specified objective is entirely fulfilled`,
        parameters: {
          objective_outcome: I.string().describe(
            P`
Your return value: the content of the fulfilled objective. The content may include references to VFS files. For instance, if you have an existing file at "/vfs/image4.png", you can reference it as <file src="/vfs/image4.ong" /> in content. If you do not use <file> tags, the contents of this file will not be included as part of the outcome.

These references can point to files of any type, such as text, audio, videos, etc. Projects can also be referenced in this way.

You are working as part of an AI system, so don't add chit-chat or meta-monologue, and don't explain what you did or why. Just the outcome, please.`
          ),
          href: I.string().describe(
            `The url of the next agent to which to transfer control upon
completion. By default, the control is transferred to the root agent "/". 
If the objective specifies other agent URLs using the
 <a href="url">title</a> syntax, and calls to choose a different agent to which
 to  transfer control, then that url should be used instead.`
          ).default("/")
        },
        response: {
          error: I.string().describe(
            "A detailed error message that usually indicates invalid parameters being passed into the function"
          ).optional()
        }
      },
      async ({ objective_outcome: e, href: t }) => {
        const r = n.successCallback(t || "/", e);
        return w(r) ? {} : { error: r.$error };
      }
    ),
    pe(
      {
        name: rs,
        description: `Inidicates that the agent failed to fulfill of the overall
objective. Call ONLY when all means of fulfilling the objective have been
exhausted.`,
        parameters: {
          user_message: I.string().describe(
            P`
Text to display to the user upon admitting failure to
fulfill the objective. Provide a friendly explanation of why the objective
is impossible to fulfill and offer helpful suggestions, but don't end with a question, since that would leave the user hanging: you've failed and can't answer that question`
          ),
          href: I.string().describe(
            P`
The url of the next agent to which to transfer control upon
failure. By default, the control is transferred to the root agent "/". 
If the objective specifies other agent URLs using the
 <a href="url">title</a> syntax, and calls to choose a different agent to which
 to  transfer control, then that url should be used instead.`
          ).default("/")
        }
      },
      async ({ user_message: e }) => (n.failureCallback(e), {})
    ),
    pe(
      {
        name: Ff,
        description: "Lists all VFS files",
        parameters: {
          ...Ye
        },
        response: {
          list: I.string().describe("List of all files as VFS paths")
        }
      },
      async ({ status_update: e }, t) => (t(e || "Getting a list of files"), { list: await n.fileSystem.listFiles() })
    ),
    pe(
      {
        name: "system_write_file",
        description: "Writes the provided text to a VFS file",
        parameters: {
          file_name: I.string().describe(
            P`
The name of the file without the extension.
This is the name that will come after the "/vfs/" prefix in the VFS file path.
Use snake_case for naming. If the file does not exist, it will be created. If the file already exists, its content will be overwritten`
          ),
          content: I.string().describe("The content to write into a VFS file"),
          mime_type: I.string().describe(
            'The text MIME type of the content, such as "text/plain", "application/json", "text/csv", etc.'
          ).default("text/plain")
        },
        response: {
          file_path: I.string().describe("The VS path to the file containing the provided text").optional(),
          error: I.string().describe("The error message if the file could not be written").optional()
        }
      },
      async ({ file_name: e, content: t, mime_type: r }) => {
        const s = await n.translator.fromPidginString(t);
        return w(s) ? { file_path: n.fileSystem.write(
          e,
          ce(s),
          r
        ) } : { error: s.$error };
      }
    ),
    pe(
      {
        name: "system_read_text_from_file",
        description: P`

Reads text from a file and return text as string. If the file does not contain text or is not supported, an error will be returned. Google Drive files may contain images and other non-textual content. Please use "${Wt}" to read them at full fidelity.

`,
        parameters: {
          file_path: I.string().describe(
            P`
The VFS path of the file to read the text from.`
          )
        },
        response: {
          text: I.string().describe(
            P`
The text contents of a file as a string.`
          ).optional(),
          error: I.string().describe(
            P`

If an error has occurred, will contain a description of the error`
          ).optional()
        }
      },
      async ({ file_path: e }) => {
        const t = await n.fileSystem.readText(e);
        return w(t) ? { text: t } : { error: t.$error };
      }
    ),
    Nf(
      {
        name: xo,
        description: P`

When working on a complicated problem, use this function to create a scratch pad to reason about a dependency tree of tasks, like about the order of tasks, and which tasks can be executed concurrently and which ones must be executed serially.

`,
        parametersJsonSchema: VI,
        responseJsonSchema: {
          type: "object",
          properties: {
            file_path: {
              type: "string"
            }
          }
        }
      },
      async ({ task_tree: e }) => ({ file_path: n.taskTreeManager.set(e) })
    ),
    pe(
      {
        name: _o,
        description: P`
Mark one or more tasks defined with the "${xo}" as complete.
`,
        parameters: {
          task_ids: I.array(
            I.string(P`
The "task_id" from the task tree to mark as completed`)
          ).describe("The list of tasks to mark as completed")
        },
        response: {
          file_path: I.string().describe("The VFS path to the updated task tree")
        }
      },
      async ({ task_ids: e }) => ({ file_path: n.taskTreeManager.setComplete(e) })
    )
  ];
}
const Xp = "veo-3.1-generate-preview", XI = "gemini-2.5-flash", QI = "gemini-3-flash-preview", e$ = "gemini-3-pro-preview", t$ = "gemini-2.5-flash-lite", n$ = "gemini-2.5-flash-image", r$ = "gemini-3-pro-image-preview", Wt = "generate_text", Lf = "generate_and_execute_code", s$ = P`

## When to call "${Wt}" function

When evaluating the objective, make sure to determine whether calling "${Wt}" function is warranted. The key tradeoff here is latency: because it's an additional model call, the "generate_text" will take longer to finish.

Your job is to fulfill the objective as efficiently as possible, so weigh the need to invoke "${Wt}" carefully.

Here is the rules of thumb:

- For shorter responses like a chat conversation, just do the text generation yourself. You are an LLM and you can do it without calling "${Wt}" function.
- For longer responses like generating a chapter of a book or analyzing a large and complex set of files, use "${Wt}" function.


### How to write a good prompt for the code generator

The "${Lf}" function is a self-contained code generator with a sandboxed code execution environment. Think of it as a sub-agent that both generates the code and executes it, then provides the result. This sub-agent takes a natural language prompt to do its job.

A good code generator prompt will include the following components:

1. Preference for the Python library to use. For example "Use the reportlab library to generate PDF"

2. What to consume as input. Focus on the "what", rather than the "how". When binary files are passed as input, use the key words "use provided file". Do NOT refer to VFS paths, see below.

3. The high-level approach to solving the problem with code. If applicable, specify algorithms or techniques to use.

4. What to deliver as output. Again, do not worry about the "how", instead specify the "what". For text files, use the key word "return" in the prompt. For binary files, use the key word word "save". For example, "Return the resulting number" or "Save the PDF file" or "Save all four resulting images". Do NOT ask to name the files, see below.

The code generator prompt may include references to VFS files and it may output references to VFS files. However, theses references are translated at the boundary of the sandboxed code execution environment into actual files and file handles that will be different from what you specify. The Python code execution environment has no access to the VFS.

Because of this translation layer, DO NOT mention VFS or VFS references in the prompt outside of the <file> tag.

For example, if you need to include  an existing file at "/vfs/text3.md" into the prompt, you can reference it as <file src="/vfs/text3.md" />. If you do not use <file> tags, the code generator will not be able to access the file.

For output, do not ask the code generator to name the files. It will assign its own file names names to save in the sandbox, and these will be picked up at the sandbox boundary and translated into <file> tags for you.
`;
function i$(n) {
  return { ...Sn(a$(n)), instruction: s$ };
}
function a$(n) {
  const {
    fileSystem: e,
    caps: t,
    moduleArgs: r,
    translator: s,
    modelConstraint: i,
    taskTreeManager: a,
    generators: o
  } = n, l = pe(
    {
      name: "generate_images",
      description: "Generates one or more images based on a prompt and optionally, one or more images",
      parameters: {
        prompt: I.string().describe(`Detailed prompt to use for image generation.

This model can generate multiple images from a single prompt. Especially when
looking for consistency across images (for instance, when generating video
keyframes), this is a very useful capability.

Be specific about how many images to generate.

When composing the prompt, be as descriptive as possible. Describe the scene, don't just list keywords.

The model's core strength is its deep language understanding. A narrative, descriptive paragraph will almost always produce a better, more coherent image than a list of disconnected words.

This function allows you to use multiple input images to compose a new scene or transfer the style from one image to another.

Here are some possible applications:

- Text-to-Image: Generate high-quality images from simple or complex text descriptions. Provide a text prompt and no images as input.

- Image + Text-to-Image (Editing): Provide an image and use the text prompt to add, remove, or modify elements, change the style, or adjust the color grading.

- Multi-Image to Image (Composition & style transfer): Use multiple input images to compose a new scene or transfer the style from one image to another.

- High-Fidelity text rendering: Accurately generate images that contain legible and well-placed text, ideal for logos, diagrams, and posters.
`),
        model: I.enum(["pro", "flash"]).describe(
          P`

The Gemini model to use for image generation. How to choose the right model:

- choose "pro" to accurately generate images that contain legible and well-placed text, ideal for logos, diagrams, and posters. This model is designed for professional asset production and complex instructions
- choose "flash" for speed and efficiency. This model is optimized for high-volume, low-latency tasks.
`
        ).default("flash"),
        images: I.array(I.string().describe("An input image, specified as a VS path")).describe("A list of input images, specified as VFS paths"),
        aspect_ratio: I.enum(["1:1", "9:16", "16:9", "4:3", "3:4"]).describe("The aspect ratio for the generated images").default("16:9"),
        ...yi,
        ...Je,
        ...Ye
      },
      response: {
        error: I.string().describe(
          "If an error has occurred, will contain a description of the error"
        ).optional(),
        images: I.array(
          I.string().describe("A generated image, specified as a VFS path")
        ).describe("Array of generated images").optional()
      }
    },
    async ({
      prompt: u,
      images: y,
      status_update: v,
      model: x,
      aspect_ratio: m,
      file_name: b,
      task_id: g
    }, _) => {
      a.setInProgress(g, v), _(v || "Generating Image(s)", {
        expectedDurationInSec: 50
      });
      const $ = await e.getMany(y);
      if (!w($)) return { error: $.$error };
      const j = x == "pro" ? r$ : n$, A = await o.callImage(
        t,
        r,
        j,
        u,
        $.map((L) => ({ parts: [L] })),
        !0,
        m
      );
      if (!w(A)) return { error: A.$error };
      const R = [], K = Bn(A, "user").parts, V = K.map((L, ne) => {
        const xe = b && K.length > 1 ? `${b}_${ne + 1}` : b;
        return e.add(L, xe);
      }).map((L) => w(L) ? L : (R.push(L.$error), ""));
      return R.length > 0 ? { error: R.join(",") } : { images: V };
    }
  ), c = pe(
    {
      name: Wt,
      description: `
An extremely versatile text generator, powered by Gemini. Use it for any tasks
that involve generation of text. Supports multimodal content input.`.trim(),
      parameters: {
        prompt: I.string().describe(P`

Detailed prompt to use for text generation. The prompt may include references to VFS files. For instance, if you have an existing file at "/vfs/text3.md", you can reference it as <file src="/vfs/text3.md" /> in the prompt. If you do not use <file> tags, the text generator will not be able to access the file.

These references can point to files of any type, such as images, audio, videos, etc.
`),
        model: I.enum(["pro", "flash", "lite"]).describe(P`

The Gemini model to use for text generation. How to choose the right model:

- choose "pro" when reasoning over complex problems in code, math, and STEM, as well as analyzing large datasets, codebases, and documents using long context. Use this model only when dealing with exceptionally complex problems.
- choose "flash" for large scale processing, low-latency, high volume tasks that require thinking. This is the model you would use most of the time.
- choose "lite" for high throughput. Use this model when speed is paramount.

`),
        search_grounding: I.boolean().describe(
          `
Whether or not to use Google Search grounding. Grounding with Google Search
connects the Gemini model to real-time web content and works with all available
languages. This allows Gemini to provide more accurate answers and cite
verifiable sources beyond its knowledge cutoff.`.trim()
        ).optional(),
        maps_grounding: I.boolean().describe(
          `Whether or not to use
Google Maps grounding. Grounding with Google Maps connects the generative
capabilities of Gemini with the rich, factual, and up-to-date data of Google
Maps`
        ).optional(),
        url_context: I.boolean().describe(
          P`

Set to true to allow Gemini to retrieve context from URLs. Useful for tasks like the following:

- Extract Data: Pull specific info like prices, names, or key findings from multiple URLs.
- Compare Documents: Using URLs, analyze multiple reports, articles, or PDFs to identify differences and track trends.
- Synthesize & Create Content: Combine information from several source URLs to generate accurate summaries, blog posts, or reports.
- Analyze Code & Docs: Point to a GitHub repository or technical documentation URL to explain code, generate setup instructions, or answer questions.

Specify URLs in the prompt.

`
        ).optional(),
        ...Je,
        ...Ye
      },
      response: {
        error: I.string().describe(
          "If an error has occurred, will contain a description of the error"
        ).optional(),
        text: I.string().describe("The output of the text generator.").optional()
      }
    },
    async ({
      prompt: u,
      model: y,
      search_grounding: v,
      maps_grounding: x,
      url_context: m,
      status_update: b,
      task_id: g
    }, _) => {
      a.setInProgress(g, b), b ? _(b, { expectedDurationInSec: 20 }) : v || x ? _("Researching", { expectedDurationInSec: 30 }) : _("Generating Text", { expectedDurationInSec: 20 });
      let $ = [];
      if (v && $.push({ googleSearch: {} }), x && $.push({ googleMaps: {} }), m) {
        if (!await r.getConsentController().queryConsent(
          {
            type: xx.GET_ANY_WEBPAGE,
            scope: {},
            graphUrl: r.context.currentGraph?.url || ""
          },
          oo.MODAL
        ))
          return { error: "User declined to consent to access URLs" };
        $.push({ urlContext: {} });
      }
      let j = {};
      y === "pro" && (j = {
        thinkingConfig: { includeThoughts: !0, thinkingLevel: "high" }
      }), $.length === 0 && ($ = void 0);
      const A = await s.fromPidginString(u);
      if (!w(A)) return { error: A.$error };
      const R = await o.conformBody(r, {
        systemInstruction: ha(),
        contents: [A],
        tools: $,
        generationConfig: { ...j }
      });
      if (!w(R)) return R;
      const K = o$(y), V = [], L = await o.streamContent(
        K,
        R,
        r
      );
      if (!w(L))
        return { error: L.$error };
      for await (const $e of L) {
        const qe = $e.candidates.at(0)?.content?.parts;
        if (qe)
          for (const Oe of qe)
            !Oe || !("text" in Oe) || (Oe.thought ? _(Oe.text, { isThought: !0 }) : V.push(Oe));
      }
      _(null);
      const ne = cs(V);
      if (ne.length === 0)
        return { error: "No text was generated. Please try again" };
      const xe = await s.toPidgin(
        { parts: ne },
        {},
        !0
      );
      return w(xe) ? { text: xe.text } : xe;
    }
  ), d = pe(
    {
      name: "generate_video",
      description: "Generating high-fidelity, 8-second videos featuring stunning realism and natively generated audio",
      parameters: {
        prompt: I.string().describe(P`
The prompt to generate the video.

Good prompts are descriptive and clear. Start with identifying your core idea, refine your idea by adding keywords and modifiers, and incorporate video-specific terminology into your prompts.

The following elements should be included in your prompt:

- Subject: The object, person, animal, or scenery that you want in your video, such as cityscape, nature, vehicles, or puppies.
- Action: What the subject is doing (for example, walking, running, or turning their head).
- Style: Specify creative direction using specific film style keywords, such as sci-fi, horror film, film noir, or animated styles like cartoon.
- Camera positioning and motion: [Optional] Control the camera's location and movement using terms like aerial view, eye-level, top-down shot, dolly shot, or worms eye.
- Composition: [Optional] How the shot is framed, such as wide shot, close-up, single-shot or two-shot.
- Focus and lens effects: [Optional] Use terms like shallow focus, deep focus, soft focus, macro lens, and wide-angle lens to achieve specific visual effects.
- Ambiance: [Optional] How the color and light contribute to the scene, such as blue tones, night, or warm tones.
`),
        images: I.array(
          I.string().describe("A reference input image, specified as a VS path")
        ).describe(
          "A list of input reference images, specified as VFS paths. Use reference images only when you need to start with a particular image."
        ).optional(),
        aspect_ratio: I.enum(["16:9", "9:16"]).describe("The aspect ratio of the video").default("16:9"),
        ...yi,
        ...Je,
        ...Ye
      },
      response: {
        error: I.string().describe(
          "If an error has occurred, will contain a description of the error"
        ).optional(),
        video: I.string().describe("Generated video, specified as VFS path").optional()
      }
    },
    async ({ prompt: u, status_update: y, aspect_ratio: v, images: x, file_name: m, task_id: b }, g) => {
      a.setInProgress(b, y), g(y || "Generating Video", {
        expectedDurationInSec: 70
      });
      const _ = await e.getMany(x || []);
      if (!w(_)) return { error: _.$error };
      const $ = await o.callVideo(
        t,
        r,
        u,
        _.map((R) => ({ parts: [R] })),
        !1,
        v ?? "16:9",
        Xp
      );
      if (!w($))
        return {
          error: ql($, Xp).$error
        };
      const j = $.parts.at(0);
      if (!j || !("storedData" in j))
        return { error: "No video was generated" };
      const A = e.add(j, m);
      return w(A) ? { video: A } : { error: A.$error };
    }
  ), p = pe(
    {
      name: "generate_speech_from_text",
      description: "Generates speech from text",
      parameters: {
        text: I.string().describe("The verbatim text to turn into speech."),
        voice: I.enum(Fl).default("Female (English)").describe("The voice to use for speech generation"),
        ...yi,
        ...Je,
        ...Ye
      },
      response: {
        error: I.string().describe(
          "If an error has occurred, will contain a description of the error"
        ).optional(),
        speech: I.string().describe("Generated speech as a VFS file path").optional()
      }
    },
    async ({ text: u, status_update: y, voice: v, file_name: x, task_id: m }, b) => {
      a.setInProgress(m, y), b(y || "Generating Speech", {
        expectedDurationInSec: 20
      });
      const g = await o.callAudio(
        t,
        r,
        u,
        v
      );
      if (!w(g)) return { error: g.$error };
      const _ = g.parts.at(0);
      if (!_ || !("storedData" in _))
        return { error: "No speech was generated" };
      const $ = e.add(_, x);
      return w($) ? { speech: $ } : { error: $.$error };
    }
  ), h = pe(
    {
      name: "generate_music_from_text",
      description: P`
Generates instrumental music and audio soundscapes based on the provided prompt.

To get your generated music closer to what you want, start with identifying your core musical idea and then refine your idea by adding keywords and modifiers.

The following elements should be considered for your prompt:

- Genre & Style: The primary musical category (e.g., electronic dance, classical, jazz, ambient) and stylistic characteristics (e.g., 8-bit, cinematic, lo-fi).
- Mood & Emotion: The desired feeling the music should evoke (e.g., energetic, melancholy, peaceful, tense).
- Instrumentation: Key instruments you want to hear (e.g., piano, synthesizer, acoustic guitar, string orchestra, electronic drums).
- Tempo & Rhythm: The pace (e.g., fast tempo, slow ballad, 120 BPM) and rhythmic character (e.g., driving beat, syncopated rhythm, gentle waltz).
- (Optional) Arrangement/Structure: How the music progresses or layers (e.g., starts with a solo piano, then strings enter, crescendo into a powerful chorus).
- (Optional) Soundscape/Ambiance: Background sounds or overall sonic environment (e.g., rain falling, city nightlife, spacious reverb, underwater feel).
- (Optional) Production Quality: Desired audio fidelity or recording style (e.g., high-quality production, clean mix, vintage recording, raw demo feel).

For example:

An energetic (mood) electronic dance track (genre) with a fast tempo (tempo) and a driving beat (rhythm), featuring prominent synthesizers (instrumentation) and electronic drums (instrumentation). High-quality production (production quality).

A calm and dreamy (mood) ambient soundscape (genre/style) featuring layered synthesizers (instrumentation) and soft, evolving pads (instrumentation/arrangement). Slow tempo (tempo) with a spacious reverb (ambiance/production). Starts with a simple synth melody, then adds layers of atmospheric pads (arrangement).
`,
      parameters: {
        prompt: I.string().describe("The prompt from which to generate music"),
        ...yi,
        ...Je,
        ...Ye
      },
      response: {
        error: I.string().describe(
          "If an error has occurred, will contain a description of the error"
        ).optional(),
        music: I.string().describe("Generated music as a VFS file path").optional()
      }
    },
    async ({ prompt: u, status_update: y, file_name: v, task_id: x }, m) => {
      a.setInProgress(x, y), m(y || "Generating Music", {
        expectedDurationInSec: 30
      });
      const b = await o.callMusic(t, r, u);
      if (!w(b)) return { error: b.$error };
      const g = b.parts.at(0);
      if (!g || !("storedData" in g))
        return { error: "No speech was generated" };
      const _ = e.add(g, v);
      return w(_) ? { music: _ } : { error: _.$error };
    }
  ), f = pe(
    {
      name: Lf,
      description: P`
Generates and executes Python code, returning the result of execution.

The code is generated by a Gemini model, so a precise spec is all that's necessary in the prompt: Gemini will generate the actual code.

After it's generated, the code is immediately executed in a sandboxed environment that has access to the following libraries:

attrs
chess
contourpy
fpdf
geopandas
imageio
jinja2
joblib
jsonschema
jsonschema-specifications
lxml
matplotlib
mpmath
numpy
opencv-python
openpyxl
packaging
pandas
pillow
protobuf
pylatex
pyparsing
PyPDF2
python-dateutil
python-docx
python-pptx
reportlab
scikit-learn
scipy
seaborn
six
striprtf
sympy
tabulate
tensorflow
toolz
xlrd

Code execution works best with text and CSV files.

If the code environment generates an error, the model may decide to regenerate the code output. This can happen up to 5 times.

NOTE: The Python code execution environment has no access to the virtual file system (VFS), so don't use it to access or manipulate the VFS files.

        `,
      parameters: {
        prompt: I.string().describe(P`
Detailed prompt for the code to generate. DO NOT write Python code as the prompt. Instead DO use the natural language. This will let the code generator within this tool make the best decisions on what code to write. Your job is not to write code, but to direct the code generator.

The prompt may include references to VFS files as <file> tags.
`),
        search_grounding: I.boolean().describe(
          P`
Whether or not to use Google Search grounding. Grounding with Google Search
connects the code generation model to real-time web content and works with all available languages. This allows Gemini to power more complex use cases.`.trim()
        ).optional(),
        ...Ye,
        ...Je
      },
      response: {
        error: I.string().describe(
          "If an error has occurred, will contain a description of the error"
        ).optional(),
        result: I.string().describe(
          "The result of code execution as text that may contain VFS path references"
        ).optional()
      }
    },
    async ({ prompt: u, search_grounding: y, status_update: v, task_id: x }, m) => {
      a.setInProgress(x, v), v ? m(v, { expectedDurationInSec: 40 }) : y ? m("Researching", { expectedDurationInSec: 50 }) : m("Generating Code", { expectedDurationInSec: 40 });
      let b = [];
      y && b.push({ googleSearch: {} }), b.push({ codeExecution: {} }), b.length === 0 && (b = void 0);
      const g = await s.fromPidginString(u);
      if (!w(g)) return { error: g.$error };
      const _ = await o.conformBody(r, {
        systemInstruction: J`${P`

Your job is to generate and execute code to fulfill your objective.

You are working as part of an AI system, so no chit-chat and no explaining what you're doing and why.
DO NOT start with "Okay", or "Alright" or any preambles. Just the output, please.

`}`.asContent(),
        contents: [g],
        tools: b
      });
      if (!w(_)) return _;
      const $ = [], j = await o.streamContent(
        QI,
        _,
        r
      );
      if (!w(j))
        return { error: j.$error };
      let A = null;
      for await (const K of j) {
        const V = K.candidates.at(0)?.content?.parts;
        if (V) {
          for (const L of V)
            if (L) {
              if ("text" in L)
                L.thought ? m(L.text, { isThought: !0 }) : $.push(L);
              else if ("inlineData" in L) {
                const ne = e.add(L);
                if (!w(ne))
                  return {
                    error: "Code generation failed due to invalid file output."
                  };
                $.push({ text: `<file src="${ne}" />` });
              } else if ("codeExecutionResult" in L) {
                const { outcome: ne, output: xe } = L.codeExecutionResult;
                ne !== "OUTCOME_OK" ? A = xe : A = null;
              }
            }
        }
      }
      if (A)
        return {
          error: `The code generator tried and failed with the following error:

${A}`
        };
      m(null);
      const R = cs($);
      return R.length === 0 ? { error: "No text was generated. Please try again" } : (R.length > 1 && console.warn("More than one part generated", $), { result: ce({ parts: R }) });
    }
  );
  switch (i) {
    case "image":
      return [l];
    case "video":
      return [d];
    case "speech":
      return [p];
    case "music":
      return [h];
    default:
      return [
        l,
        c,
        d,
        p,
        h,
        f
      ];
  }
}
function o$(n) {
  switch (n) {
    case "pro":
      return e$;
    case "flash":
      return XI;
    default:
      return t$;
  }
}
const l$ = ["audio", "video", "image", "text"];
class Wf {
  constructor(e) {
    this.#e = 0, this.#t = /* @__PURE__ */ new Map(), this.#n = /* @__PURE__ */ new Map([
      ["", ""],
      ["/", "/"]
    ]), this.#r = !0, this.systemFiles = /* @__PURE__ */ new Map(), this.context = e.context, this.memoryManager = e.memoryManager;
  }
  #e;
  #t;
  #n;
  #r;
  setUseMemory(e) {
    this.#r = e;
  }
  addSystemFile(e, t) {
    this.systemFiles.set(e, t);
  }
  overwrite(e, t, r) {
    const s = this.#a(e, r, !1);
    return this.#t.set(s, { data: t, mimeType: r, type: "text" }), s;
  }
  write(e, t, r) {
    const s = this.#a(e, r, !0);
    return this.#t.set(s, { data: t, mimeType: r, type: "text" }), s;
  }
  append(e, t) {
    let r = this.#t.get(e);
    if (!r)
      r = { data: t, mimeType: "text/markdown", type: "text" }, this.#t.set(e, r);
    else if (r.type !== "text")
      return k(`File "${e}" already exists and it is not a text file`);
    r.data = `${r.data}
${t}`;
  }
  /**
   * Used by the translator to replace any string that may look
   * like a path with the corresponding file URL.
   * Any string can be sent here.
   */
  getFileUrl(e) {
    const t = this.#t.get(e);
    if (t)
      switch (t.type) {
        case "fileData":
          return t.data;
        case "inlineData":
          return `data:${t.mimeType};base64,${t.data}`;
        case "storedData":
          return t.data;
        default:
        case "text":
          return;
      }
  }
  #s(e) {
    const t = this.systemFiles?.get(e);
    if (!t) return k(`File ${e} was not found`);
    const r = t();
    return w(r) ? [{ text: r }] : r;
  }
  #i(e) {
    const t = this.#t.get(e);
    if (!t)
      return k(`file "${e}" not found`);
    switch (t.type) {
      case "fileData":
        return {
          fileData: {
            fileUri: t.data,
            mimeType: t.mimeType,
            resourceKey: t.resourceKey
          }
        };
      case "inlineData":
        return {
          inlineData: {
            data: t.data,
            mimeType: t.mimeType,
            title: t.title
          }
        };
      case "storedData":
        return {
          storedData: {
            handle: t.data,
            mimeType: t.mimeType,
            resourceKey: t.resourceKey
          }
        };
      default:
      case "text":
        return {
          text: t.data
        };
    }
  }
  async #o(e) {
    const t = e.replace("/vfs/memory/", ""), r = await this.memoryManager?.readSheet(this.context, {
      range: `${t}!A:ZZ`
    });
    return r ? w(r) ? "error" in r ? k(r.error) : [{ text: JSON.stringify(r.values) }] : r : [];
  }
  async readText(e) {
    const t = await this.get(e);
    if (!w(t)) return t;
    const r = [];
    return t.forEach((s) => {
      if ("storedData" in s) {
        const { handle: i, mimeType: a } = s.storedData;
        i.startsWith("drive:/") ? r.push(
          `Google Drive files may contain images and other non-textual content. Please use "${Wt}" to read them at full fidelity.`
        ) : r.push(
          `Reading text from file with mimeType ${a} is not supported.`
        );
      }
    }), r.length > 0 ? k(r.join(", ")) : ce({ parts: t });
  }
  async getMany(e) {
    const t = [], r = (await Promise.all(e.map((s) => this.get(s)))).filter((s) => w(s) ? !0 : (t.push(s.$error), !1)).flat();
    return t.length > 0 ? k(t.join(",")) : r;
  }
  async get(e) {
    if (e.startsWith("vfs/") && (e = `/${e}`), e.startsWith("/vfs/system/"))
      return this.#s(e);
    if (e.startsWith("/vfs/memory/") && this.#r)
      return this.#o(e);
    const t = this.#i(e);
    return w(t) ? [t] : t;
  }
  async listFiles() {
    const e = [...this.#t.keys()], t = [...this.systemFiles.keys()], r = [];
    if (this.#r) {
      const s = await this.memoryManager?.getSheetMetadata(
        this.context
      );
      s && w(s) && r.push(
        ...s.sheets.map((i) => `/vfs/memory/${i.name}`)
      );
    }
    return [...e, ...t, ...r].join(`
`);
  }
  addRoute(e) {
    const t = `/route-${this.#n.size - 1}`;
    return this.#n.set(t, e), t;
  }
  getOriginalRoute(e) {
    const t = this.#n.get(e);
    return t || k(`Route "${e}" not found`);
  }
  /**
   * Finds an existing file path that has the same data handle/URI.
   * This allows deduplication of storedData and fileData parts.
   */
  #l(e) {
    for (const [t, r] of this.#t)
      if ((r.type === "storedData" || r.type === "fileData") && r.data === e)
        return t;
  }
  add(e, t) {
    const r = (s) => {
      if (t) {
        const i = t.replace(/\.[^/.]+$/, "");
        return this.#a(i, s, !0);
      }
      return this.create(s);
    };
    if ("text" in e) {
      const s = "text/markdown", i = r(s);
      return this.#t.set(i, { type: "text", mimeType: s, data: e.text }), i;
    } else if ("inlineData" in e) {
      const { mimeType: s, data: i, title: a } = e.inlineData, o = r(s);
      return this.#t.set(o, { type: "inlineData", mimeType: s, data: i, title: a }), o;
    } else if ("storedData" in e) {
      const { mimeType: s, handle: i, resourceKey: a } = e.storedData, o = this.#l(i);
      if (o)
        return o;
      const l = r(s);
      return this.#t.set(l, {
        type: "storedData",
        mimeType: s,
        data: i,
        resourceKey: a
      }), l;
    } else if ("fileData" in e) {
      const { mimeType: s, fileUri: i, resourceKey: a } = e.fileData, o = this.#l(i);
      if (o)
        return o;
      const l = r(s);
      return this.#t.set(l, { type: "fileData", mimeType: s, data: i, resourceKey: a }), l;
    }
    return k(`Unsupported part: ${JSON.stringify(e)}`);
  }
  get files() {
    return this.#t;
  }
  /**
   * Restores file system state from a saved snapshot.
   * Used for resuming failed runs.
   */
  restoreFrom(e) {
    this.#t.clear();
    for (const [t, r] of Object.entries(e))
      this.#t.set(t, { ...r });
    this.#e = this.#t.size;
  }
  #a(e, t, r) {
    let s;
    if (e.includes("."))
      s = e;
    else {
      const a = wo.getExtension(t);
      s = `${e}.${a}`;
    }
    const i = `/vfs/${s}`;
    return r && this.#t.has(i) && console.warn(`File "${i}" already exists, will be overwritten`), i;
  }
  create(e) {
    const t = this.#c(e), r = wo.getExtension(e);
    return `/vfs/${t}${++this.#e}.${r}`;
  }
  #c(e) {
    const t = e.split("/").at(0) || "";
    return l$.includes(t) ? t : "file";
  }
}
class c$ {
  constructor(e, t) {
    this.builtIn = e, this.custom = t;
  }
  #e = [];
  async #t(e, t) {
    const { functionCall: r } = e, { name: s, args: i } = r, a = this.builtIn.get(s);
    console.log("CALLING SYSTEM FUNCTION", s);
    const o = await a.handler(
      i,
      t
    );
    return w(o) ? {
      functionResponse: {
        name: s,
        response: o
      }
    } : o;
  }
  async #n(e) {
    console.log("CALLING FUNCTION");
    const t = await this.custom.callTool(e);
    if (!w(t)) return t;
    const r = t.results.at(0)?.parts?.filter((s) => "functionResponse" in s);
    return !r || r.length === 0 ? k(`Empty response from function "${name}"`) : r.at(0);
  }
  call(e, t) {
    const r = e.functionCall.name;
    this.builtIn.has(r) ? this.#e.push(
      this.#t(e, t)
    ) : this.#e.push(this.#n(e));
  }
  async getResults() {
    if (this.#e.length === 0)
      return null;
    const e = await Promise.all(this.#e), t = e.map((r) => w(e) ? null : r).filter((r) => r !== null);
    return t.length > 0 ? k(t.join(",")) : { parts: e, role: "user" };
  }
}
const d$ = /* @__PURE__ */ new Map([
  ["embed://a2/tools.bgl.json#module:search-web", "Google Search grounding"],
  ["embed://a2/tools.bgl.json#module:search-maps", "Google Maps grounding"],
  ["embed://a2/tools.bgl.json#module:get-webpage", "URL context retrieval"],
  ["embed://a2/tools.bgl.json#module:get-weather", "Google Search grounding"],
  [
    "embed://a2/tools.bgl.json#module:code-execution",
    "generate and execute code"
  ]
]);
function p$(n) {
  return d$.get(n.path) ?? null;
}
const u$ = /(<file\s+src\s*=\s*"[^"]*"\s*\/>|<a\s+href\s*=\s*"[^"]*"\s*>[^<]*<\/a>)/g, h$ = /<file\s+src\s*=\s*"([^"]*)"\s*\/>/, f$ = /<a\s+href\s*=\s*"([^"]*)"\s*>\s*([^<]*)\s*<\/a>/, m$ = 1e3;
class Bf {
  constructor(e, t, r) {
    this.caps = e, this.moduleArgs = t, this.fileSystem = r;
  }
  async fromPidginString(e) {
    const t = e.split(u$), r = [], s = (await Promise.all(
      t.map(async (i) => {
        const a = i.match(h$);
        if (a) {
          const l = a[1], c = await this.fileSystem.get(l);
          return w(c) ? c : (r.push(c.$error), null);
        }
        const o = i.match(f$);
        return o ? { text: o[2].trim() } : { text: i };
      })
    )).flat().filter((i) => i !== null);
    return r.length > 0 ? k(`Agent unable to proceed: ${r.join(",")}`) : { parts: cs(s, `
`), role: "user" };
  }
  fromPidginMessages(e) {
    const t = /* @__PURE__ */ new Map();
    return {
      messages: e.map((r) => {
        const { surfaceUpdate: s, dataModelUpdate: i } = r;
        if (s)
          return { surfaceUpdate: {
            ...s,
            components: s.components.map((o) => {
              const l = g$(
                o,
                this.fileSystem,
                t
              );
              return w(l) ? l : (console.warn("Failed to translate component", o), o);
            })
          } };
        if (i) {
          const a = y$(
            i.contents,
            this.fileSystem
          );
          return w(a) ? { dataModelUpdate: { ...i, contents: a } } : (console.warn(
            "Failed to translate dataModelUpdate",
            i
          ), r);
        } else
          return r;
      }),
      remap: t
    };
  }
  async fromPidginFiles(e) {
    const t = [], r = (await Promise.all(e.map((s) => this.fileSystem.get(s)))).flatMap((s) => w(s) ? s : (t.push(s.$error), null)).filter((s) => s !== null);
    return t.length > 0 ? k(`Agent unable to proceed: ${t.join(",")}`) : { parts: cs(r, `
`), role: "user" };
  }
  async toPidgin(e, t, r) {
    const s = new q(this.caps, e), i = new rt(this.caps, this.moduleArgs), a = [];
    let o = !1;
    const l = await s.asyncSimpleSubstitute(
      async (p) => {
        const { type: h } = p;
        switch (h) {
          case "asset": {
            const f = await s.loadAsset(p);
            if (!w(f))
              return a.push(f.$error), "";
            const u = f?.at(-1);
            if (!u || u.parts.length === 0)
              return a.push("Agent: Invalid asset format"), "";
            const y = d({
              title: void 0,
              content: u,
              fileSystem: this.fileSystem,
              textAsFiles: r
            }), v = p.title || "asset";
            return P`<asset title="${v}">
${y}
</asset>`;
          }
          case "in": {
            const f = t[q.toId(p.path)];
            if (f) {
              if (typeof f == "string")
                return f;
              if (nh(f))
                return d({
                  title: p.title,
                  content: f,
                  fileSystem: this.fileSystem,
                  textAsFiles: !0
                });
              if (Kn(f)) {
                const u = f.at(-1);
                return u ? d({
                  title: p.title,
                  content: u,
                  fileSystem: this.fileSystem,
                  textAsFiles: !0
                }) : "";
              } else
                a.push(
                  `Agent: Unknown param value type: "${JSON.stringify(f)}`
                );
            } else return "";
            return p.title;
          }
          case "param":
            return a.push(
              "Agent: Params aren't supported in template substitution"
            ), "";
          case "tool": {
            if (p.path === Ts)
              return p.instance ? `<a href="${this.fileSystem.addRoute(p.instance)}">${p.title}</a>` : (a.push("Agent: Malformed route, missing instance param"), "");
            if (p.path === Aw)
              return o = !0, "Use Memory Data Store";
            {
              const f = p$(p);
              if (f !== null)
                return f;
              const u = await i.addTool(p);
              return w(u) ? u : (a.push(u.$error), "");
            }
          }
          default:
            return console.warn("Unknown type of param", p), "";
        }
      }
    );
    if (a.length > 0)
      return k(`Agent: ${a.join(",")}`);
    const c = l.parts.length === 1 && "text" in l.parts[0] ? l.parts[0].text : void 0;
    if (c === void 0)
      return console.warn(
        "Agent: Substitution failed, expected single text part, got",
        l
      ), {
        text: d({
          title: void 0,
          content: l,
          fileSystem: this.fileSystem,
          textAsFiles: r
        }),
        tools: i,
        useMemory: o
      };
    return { text: c, tools: i, useMemory: o };
    function d({
      title: p,
      content: h,
      fileSystem: f,
      textAsFiles: u
    }) {
      const y = [];
      for (const x of h.parts)
        if ("text" in x) {
          const { text: m } = x;
          if (u && m.length > m$) {
            const b = f.add(x);
            if (w(b)) {
              y.push(`<content src="${b}">
${m}</content>`);
              continue;
            } else
              console.warn(b.$error);
          } else
            y.push(m);
        } else {
          const m = f.add(x);
          if (!w(m)) {
            console.warn(m.$error);
            continue;
          }
          y.push(`<file src="${m}" />`);
        }
      const v = y.join(`
`);
      return p ? P`
<input source-agent="${p}">
${v}
</input>
` : v;
    }
  }
}
function g$(n, e, t) {
  const r = structuredClone(n), s = (i) => {
    if (Array.isArray(i)) {
      i.forEach(s);
      return;
    }
    if (typeof i == "object" && i !== null) {
      for (const a in i)
        if (Object.prototype.hasOwnProperty.call(i, a)) {
          const o = i[a];
          if ((a === "literal" || a === "literalString" || a === "value_string") && typeof o == "string") {
            const l = e.getFileUrl(o);
            l && t.set(l, o), i[a] = l ?? o;
          } else
            s(o);
        }
    }
  };
  try {
    s(r);
  } catch (i) {
    return k(i.message);
  }
  return r;
}
function y$(n, e) {
  const t = structuredClone(n), r = (s) => {
    if (Array.isArray(s)) {
      s.forEach(r);
      return;
    }
    if (typeof s == "object" && s !== null)
      for (const i in s) {
        if (!Object.prototype.hasOwnProperty.call(s, i)) continue;
        const a = s[i];
        if (typeof a == "string") {
          const o = e.getFileUrl(a);
          s[i] = o ?? a;
        } else
          r(a);
      }
  };
  try {
    r(t);
  } catch (s) {
    return k(s.message);
  }
  return t;
}
var b$ = Object.create, Hl = Object.defineProperty, v$ = Object.getOwnPropertyDescriptor, w$ = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), er = (n) => {
  throw TypeError(n);
}, x$ = (n, e, t) => e in n ? Hl(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Qp = (n, e) => Hl(n, "name", { value: e, configurable: !0 }), _$ = (n) => [, , , b$(null)], qf = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Sr = (n) => n !== void 0 && typeof n != "function" ? er("Function expected") : n, k$ = (n, e, t, r, s) => ({ kind: qf[n], name: e, metadata: r, addInitializer: (i) => t._ ? er("Already initialized") : s.push(Sr(i || null)) }), Hf = (n, e) => x$(e, w$("metadata"), n[3]), Na = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Vf = (n, e, t, r, s, i) => {
  var a, o, l, c, d, p = e & 7, h = !!(e & 8), f = !!(e & 16), u = p > 3 ? n.length + 1 : p ? h ? 1 : 2 : 0, y = qf[p + 5], v = p > 3 && (n[u - 1] = []), x = n[u] || (n[u] = []), m = p && (!f && !h && (s = s.prototype), p < 5 && (p > 3 || !f) && v$(p < 4 ? s : { get [t]() {
    return eu(this, i);
  }, set [t](g) {
    return tu(this, i, g);
  } }, t));
  p ? f && p < 4 && Qp(i, (p > 2 ? "set " : p > 1 ? "get " : "") + t) : Qp(s, t);
  for (var b = r.length - 1; b >= 0; b--)
    c = k$(p, t, l = {}, n[3], x), p && (c.static = h, c.private = f, d = c.access = { has: f ? (g) => S$(s, g) : (g) => t in g }, p ^ 3 && (d.get = f ? (g) => (p ^ 1 ? eu : $$)(g, s, p ^ 4 ? i : m.get) : (g) => g[t]), p > 2 && (d.set = f ? (g, _) => tu(g, s, _, p ^ 4 ? i : m.set) : (g, _) => g[t] = _)), o = (0, r[b])(p ? p < 4 ? f ? i : m[y] : p > 4 ? void 0 : { get: m.get, set: m.set } : s, c), l._ = 1, p ^ 4 || o === void 0 ? Sr(o) && (p > 4 ? v.unshift(o) : p ? f ? i = o : m[y] = o : s = o) : typeof o != "object" || o === null ? er("Object expected") : (Sr(a = o.get) && (m.get = a), Sr(a = o.set) && (m.set = a), Sr(a = o.init) && v.unshift(a));
  return p || Hf(n, s), m && Hl(s, t, m), f ? p ^ 4 ? i : m : s;
}, Vl = (n, e, t) => e.has(n) || er("Cannot " + t), S$ = (n, e) => Object(e) !== e ? er('Cannot use the "in" operator on this value') : n.has(e), eu = (n, e, t) => (Vl(n, e, "read from private field"), t ? t.call(n) : e.get(n)), I$ = (n, e, t) => e.has(n) ? er("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), tu = (n, e, t, r) => (Vl(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t), $$ = (n, e, t) => (Vl(n, e, "access private method"), t), Yf, Jf, bn, Yl;
Jf = [xt], Yf = [xt];
class fa {
  constructor(e, t, r) {
    this.client = e, this.title = t, this.icon = r, Na(bn, 5, this), I$(this, Yl, Na(bn, 8, this, null)), Na(bn, 11, this), this.awaitingUserInput = !1, this.start = void 0, this.openByDefault = !0, this.chat = !1, this.product = new Xt(), this.workItemId = crypto.randomUUID(), this.start = performance.now();
  }
  get elapsed() {
    return (this.end ?? Mw.get()) - this.start;
  }
  finish() {
    this.end = performance.now();
  }
  renderUserInterface() {
    this.product.has(this.workItemId) || this.product.set(this.workItemId, this.client);
  }
}
bn = _$();
Yl = /* @__PURE__ */ new WeakMap();
Vf(bn, 4, "end", Jf, fa, Yl);
Vf(bn, 2, "elapsed", Yf, fa);
Hf(bn, fa);
class C$ {
  constructor() {
    this.#e = null, this.#t = null, this.receiver = {
      sendMessage: (e) => {
        if (console.log("EVENT ACTION", e), !this.#t) {
          console.warn(
            "The agent hasn't asked for input yet, this is unexpected, or maybe the user is just clicking buttons before the agent is ready."
          );
          return;
        }
        this.#t(this.#s(e));
      }
    }, this.#r = Ow.createSignalA2UIModelProcessor();
  }
  get processor() {
    return this.#r;
  }
  #e;
  #t;
  #n;
  #r;
  processUpdates(e) {
    this.#r.processMessages(e.messages), this.#n = e.remap;
  }
  awaitUserInput() {
    return this.#e = new Promise((e) => {
      this.#t = e;
    }), this.#e;
  }
  #s(e) {
    if (!this.#n) return e;
    const t = e.userAction?.context;
    if (!t) return e;
    const r = structuredClone(t), s = this.#n;
    return i(r), {
      userAction: {
        ...e.userAction,
        context: r
      }
    };
    function i(a) {
      Array.isArray(a) && a.forEach(i), typeof a == "object" && a !== null && Object.entries(a).forEach(([o, l]) => {
        if (typeof l == "string") {
          const c = s.get(l);
          c && (a[o] = c);
        } else
          i(l);
      });
    }
  }
}
class T$ {
  constructor(e) {
    this.a2ui = e, this.output = {}, this.schema = void 0;
  }
}
const Kf = ["any", "text", "file-upload"], bi = "__none_of_the_above__";
class E$ {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Presents choices to the user and returns the selected choice IDs.
   *
   * For "single" mode: renders choice buttons - clicking one returns that ID.
   * For "multiple" mode: renders checkboxes with a submit button.
   *
   * Both message and choice labels support pidgin format with file references.
   */
  async presentChoices(e, t, r, s = "list", i) {
    const a = "@choices", o = await this.#e.fromPidginString(e);
    if (!w(o)) return o;
    const l = [];
    for (const c of t) {
      const d = await this.#e.fromPidginString(
        c.label
      );
      if (!w(d)) return d;
      l.push({ id: c.id, content: d });
    }
    return r === "single" ? this.#r(
      o,
      l,
      a,
      s,
      i
    ) : this.#s(
      o,
      l,
      a,
      s,
      i
    );
  }
  /**
   * Builds a container component for choices based on layout.
   * - "list": Column (vertical stack)
   * - "row": Row (horizontal inline)
   * - "grid": Row with flex-wrap (adapts to space)
   *
   * @param stretchToFill - If true, stretch items to fill available space (for complex content)
   */
  #n(e, t, r, s = !1) {
    switch (r) {
      case "row":
        return {
          id: e,
          component: {
            Row: {
              children: { explicitList: t },
              distribution: "start",
              alignment: s ? "stretch" : "center"
            }
          }
        };
      case "grid":
        return {
          id: e,
          component: {
            Row: {
              children: { explicitList: t },
              distribution: "start",
              alignment: s ? "stretch" : "start"
            }
          }
          // Note: flex-wrap would need custom CSS or A2UI extension
          // For now, treating grid same as row but could be enhanced
        };
      default:
        return {
          id: e,
          component: {
            Column: {
              children: { explicitList: t },
              distribution: "start",
              alignment: "stretch"
            }
          }
        };
    }
  }
  async #r(e, t, r, s, i) {
    const a = [], o = [], l = Ea(e, {
      idPrefix: "message"
    });
    if (a.push(...l.parts), l.ids.length > 1) {
      const b = "message-container";
      a.push({
        id: b,
        component: {
          Column: {
            children: { explicitList: l.ids }
          }
        }
      }), o.push(b);
    } else l.ids.length === 1 && o.push(l.ids[0]);
    const c = [];
    let d = !1;
    for (let b = 0; b < t.length; b++) {
      const g = t[b], _ = Ea(g.content, {
        idPrefix: `choice-${b}`
      });
      a.push(..._.parts);
      const $ = `choice-content-${b}`, j = _.ids.length > 1;
      j && (d = !0), a.push({
        id: $,
        component: j ? {
          Column: {
            children: { explicitList: _.ids },
            alignment: "center",
            distribution: "start"
          }
        } : {
          Row: {
            children: { explicitList: _.ids }
          }
        }
      });
      const A = `choice-btn-${b}`, R = {
        id: A,
        component: {
          Button: {
            child: $,
            action: {
              name: "select",
              context: [
                {
                  key: "choiceId",
                  value: { literalString: g.id }
                }
              ]
            }
          }
        }
      };
      c.push(A), a.push(R);
    }
    if (d && (s === "row" || s === "grid"))
      for (const b of a)
        c.includes(b.id) && (b.weight = 1);
    const p = "choices-container", h = this.#n(
      p,
      c,
      s,
      d
    );
    a.push(h);
    const f = [];
    if (i) {
      const b = "none-separator";
      a.push({
        id: b,
        component: {
          Divider: {}
        }
      }), f.push(b);
      const g = "none-text";
      a.push({
        id: g,
        component: {
          Text: {
            text: { literalString: i },
            usageHint: "body"
          }
        }
      });
      const _ = "none-btn";
      a.push({
        id: _,
        component: {
          Button: {
            child: g,
            variant: "secondary",
            action: {
              name: "select",
              context: [
                {
                  key: "choiceId",
                  value: { literalString: bi }
                }
              ]
            }
          }
        }
      }), f.push(_);
    }
    const u = {
      id: "root",
      weight: 1,
      component: {
        Column: {
          children: {
            explicitList: [
              ...o,
              p,
              ...f
            ]
          },
          distribution: "center",
          alignment: "center"
        }
      }
    };
    a.push(u);
    const y = [
      {
        surfaceUpdate: {
          surfaceId: r,
          components: a
        }
      },
      {
        beginRendering: {
          surfaceId: r,
          root: "root"
        }
      }
    ], v = this.#t.renderUserInterface(y);
    if (!w(v)) return v;
    const x = await this.#t.awaitUserInput();
    if (!w(x)) return x;
    const m = x.userAction?.context?.choiceId;
    return typeof m != "string" ? k("No choice was selected") : { selected: [m] };
  }
  async #s(e, t, r, s, i) {
    const a = [], o = [], l = Ea(e, {
      idPrefix: "message"
    });
    if (a.push(...l.parts), l.ids.length > 1) {
      const A = "message-container";
      a.push({
        id: A,
        component: {
          Column: {
            children: { explicitList: l.ids }
          }
        }
      }), o.push(A);
    } else l.ids.length === 1 && o.push(l.ids[0]);
    const c = [];
    for (let A = 0; A < t.length; A++) {
      const R = t[A], V = R.content.parts.find(il)?.text.trim() ?? `Choice ${R.id}`, L = `choice-checkbox-${A}`;
      a.push({
        id: L,
        component: {
          CheckBox: {
            label: { literalString: V },
            value: { path: `/selections/${R.id}` }
          }
        }
      }), c.push(L);
    }
    const d = {
      id: "submit-text",
      component: {
        Text: {
          text: { literalString: "Submit" },
          usageHint: "body"
        }
      }
    };
    a.push(d);
    const p = {
      id: "submit-btn",
      component: {
        Button: {
          child: "submit-text",
          action: {
            name: "submit",
            context: t.map((A) => ({
              key: A.id,
              value: { path: `/selections/${A.id}` }
            }))
          }
        }
      }
    };
    a.push(p);
    const h = "choices-container", f = this.#n(
      h,
      c,
      s
    );
    a.push(f);
    const u = [];
    if (i) {
      const A = "none-separator";
      a.push({
        id: A,
        component: {
          Divider: {}
        }
      }), u.push(A);
      const R = "none-checkbox";
      a.push({
        id: R,
        component: {
          CheckBox: {
            label: { literalString: i },
            value: { path: `/selections/${bi}` }
          }
        }
      }), u.push(R);
    }
    const y = {
      id: "root",
      weight: 1,
      component: {
        Column: {
          children: {
            explicitList: [
              ...o,
              h,
              ...u,
              "submit-btn"
            ]
          },
          distribution: "center",
          alignment: "center"
        }
      }
    };
    a.push(y);
    const v = t.map((A) => ({
      key: A.id,
      valueBoolean: !1
    }));
    i && v.push({
      key: bi,
      valueBoolean: !1
    });
    const m = [
      { dataModelUpdate: {
        surfaceId: r,
        path: "/selections",
        contents: v
      } },
      {
        surfaceUpdate: {
          surfaceId: r,
          components: a
        }
      },
      {
        beginRendering: {
          surfaceId: r,
          root: "root"
        }
      }
    ], b = this.#t.renderUserInterface(m);
    if (!w(b)) return b;
    const g = await this.#t.awaitUserInput();
    if (!w(g)) return g;
    const _ = g.userAction?.context;
    if (!_)
      return k("No selections received");
    const $ = t.map((A) => A.id);
    return i && $.push(bi), { selected: $.filter((A) => _[A] === !0) };
  }
}
class P$ {
  constructor(e, t, r) {
    this.caps = e, this.moduleArgs = t, this.translator = r, this.client = new C$();
    const { appScreen: s, consoleEntry: i } = Zu(this.moduleArgs);
    this.#e = i, this.#n = s, this.#n || console.warn(
      "Unable to find app screen for this agent. Trying to render UI will fail."
    ), this.progress = new jw("Agent", "spark", this.#n), this.#s = new E$(r, this), this.#e ? this.#e.work.set(crypto.randomUUID(), this.progress) : console.warn(
      "Unable to find console entry for this agent. Trying to render UI will fail."
    );
  }
  #e;
  /**
   * The current work item for A2UI interaction. Each interaction creates a new
   * work item with a unique ID, so multiple A2UI screens can be shown.
   */
  #t;
  #n;
  #r = [];
  #s;
  /**
   * Starts a new A2UI interaction by creating a fresh work item and app screen
   * output. This ensures each A2UI screen appears separately in the console
   * view and the app view shows the latest screen.
   */
  #i() {
    if (this.#t?.finish(), !this.#e)
      return k("Unable to create UI: Console is not available");
    const e = crypto.randomUUID();
    if (this.#t = new fa(this.client, "A2UI", "web"), this.#e.work.set(e, this.#t), this.#n) {
      const t = new T$(this.client);
      this.#n.outputs.set(e, t), this.#n.type = "a2ui";
    }
    return this.#t;
  }
  get chatLog() {
    return this.#r;
  }
  async chat(e, t) {
    const r = Kf.includes(
      t
    ) ? t : "any", s = await this.translator.fromPidginString(e);
    if (!w(s)) return s;
    this.#r.push({ ...s, role: "model" }), await this.caps.output({
      schema: {
        properties: { message: { type: "object", behavior: ["llm-content"] } }
      },
      message: s
    });
    const i = await this.caps.input({
      schema: {
        properties: {
          input: {
            type: "object",
            behavior: ["transient", "llm-content", "hint-required"],
            format: A$(r)
          }
        }
      }
    });
    return w(i) && this.#r.push({ ...i.input, role: "user" }), i;
  }
  /**
   * Presents choices to the user and returns the selected choice IDs.
   *
   * For "single" mode: renders choice buttons - clicking one returns that ID.
   * For "multiple" mode: renders checkboxes with a submit button.
   *
   * Both message and choice labels support pidgin format with file references.
   */
  async presentChoices(e, t, r, s = "list", i) {
    const a = await this.translator.fromPidginString(e);
    if (!w(a)) return a;
    this.#r.push({ ...a, role: "model" });
    const o = await this.#s.presentChoices(
      e,
      t,
      r,
      s,
      i
    );
    if (!w(o)) return o;
    const l = o.selected.map((c) => t.find((d) => d.id === c)?.label ?? c).join(", ");
    return this.#r.push({
      role: "user",
      parts: [{ text: l }]
    }), o;
  }
  async render(e) {
    const t = this.renderUserInterface(
      e
    );
    return w(t) ? this.awaitUserInput() : t;
  }
  renderUserInterface(e) {
    const t = this.#i();
    if (!w(t)) return t;
    const r = this.translator.fromPidginMessages(e);
    this.client.processUpdates(r), t.renderUserInterface();
  }
  async awaitUserInput() {
    if (!this.#t)
      return k("Unable to await user input: No active A2UI interaction");
    if (!this.#n)
      return k("Unable to await user input: App screen is not available");
    this.#n.status = "interactive";
    const e = await this.client.awaitUserInput();
    return this.#n.status = "processing", e;
  }
  finish() {
    this.progress.finish(), this.#t?.finish();
  }
}
function A$(n) {
  switch (n) {
    case "any":
      return "asterisk";
    case "file-upload":
      return "upload";
    case "text":
      return "edit_note";
  }
}
const Zf = "memory_create_sheet", Xf = "memory_read_sheet", Qf = "memory_update_sheet", em = "memory_delete_sheet", tm = "memory_get_metadata", M$ = P`

## Using memory data store

You have access to persistent data store that allows you to recall and remember data across multiple sessions. Use the data store when the objective contains the key phrase "Use Memory Data Store".

The data store is stored in a single Google Spreadsheet. 

You can create new sheets within this spreadsheet using "${Zf}" function and delete existing sheets with the "${em}" function. You can also get the list of existing sheets with the "${tm}" function.

To retrieve data from the data store, use either the "${Xf}" function with the standard Google Sheets ranges or read the entire sheet as a VFS file using the "/vfs/memory/sheet_name" path.

To update data in the data store, use the "${Qf}" function.
`;
function O$(n) {
  return {
    ...Sn(j$(n)),
    instruction: M$
  };
}
function j$(n) {
  const { context: e, translator: t, fileSystem: r, memoryManager: s, taskTreeManager: i } = n;
  return [
    pe(
      {
        name: Zf,
        description: "Creates a new memory sheet",
        parameters: {
          name: I.string().describe(P`The name of the sheet. Use snake_case for
naming.`),
          columns: I.array(I.string().describe(P`The name of the column header`)).describe(
            P`
An array of strings representing the column headers (e.g., ['Name', 'Status']).`
          ),
          ...Je,
          ...Ye
        }
      },
      async ({ task_id: a, status_update: o, ...l }) => (i.setInProgress(a, o), s.createSheet(e, l))
    ),
    pe(
      {
        name: Xf,
        description: P`
Reads values from a specific memory range (e.g. Scores!A1:B3)`,
        parameters: {
          range: I.string().describe(P`
The Google Sheets range which must include the name of the sheet
`),
          file_name: I.string().describe(
            P`

The name of the file to save the output to. This is the name that
will come after "/vfs/" prefix in the file path. Use snake_case for
naming. Only use when the "output_format" is set to "file".`
          ).optional(),
          output_format: I.enum(["file", "json"]).describe(P`

The output format. When "file" is specified, the output will be saved as a VFS file and the "file_path" response parameter will be provided as output. Use this when you expect a long output from the sheet. NOTE that choosing this option will prevent you from seeing the output directly: you only get back the VFS path to the file. You can read this file as a separate action, but if you do expect to read it, the "json" output format might be a better choice.

When "json" is specified, the output will be returned as JSON directlty, and the "json" response parameter will be provided.`),
          ...Je,
          ...Ye
        },
        response: {
          file_path: I.string().describe(
            `The VFS path with the output of the
generator. Will be provided when the "output_format" is set to "file"`
          ).optional(),
          json: I.string().describe(
            `The JSON output of the generator. Will be 
provided when the "output_format" is set to "json"`
          ).optional()
        }
      },
      async (a) => {
        const { output_format: o, file_name: l, status_update: c, task_id: d, ...p } = a;
        i.setInProgress(d, c);
        const h = await s.readSheet(e, p);
        if (!S(h)) return h;
        const f = J`${h}`.asParts().at(0);
        if (!f)
          return k("Failed to create parts from result");
        const u = r.add(f, l);
        return S(u) ? o === "file" ? { file_path: u } : { json: JSON.stringify(h) } : u;
      }
    ),
    pe(
      {
        name: Qf,
        description: P`
Overwrites a specific memory range with new data. Used for editing specific rows.
`,
        parameters: {
          range: I.string().describe(P`
The Google Sheets range which must include the name of the sheet
`),
          values: I.array(
            I.array(
              I.string().describe(
                P`
The data to write, may include references to VFS files. For instance, if you have an existing file at "/vfs/text3.md", you can reference it as <file src="/vfs/text3.md" /> in the in data. At update time, the tag will be replaced with the file contents.`
              )
            )
          ).describe(P`
The 2D array of data to write.
`),
          ...Je
        }
      },
      async ({ range: a, values: o, task_id: l }) => {
        i.setInProgress(l, "");
        const c = [], d = await Promise.all(
          o.map(async (p) => await Promise.all(
            p.map(async (h) => {
              const f = await t.fromPidginString(h);
              return S(f) ? ce(f) : (c.push(f.$error), "");
            })
          ))
        );
        return c.length > 0 ? { error: c.join(", ") } : s.updateSheet(e, { range: a, values: d });
      }
    ),
    pe(
      {
        name: em,
        description: P`
Deletes a specific memory sheet`,
        parameters: {
          name: I.string().describe(P`The name of the sheet`),
          ...Je,
          ...Ye
        }
      },
      async ({ task_id: a, status_update: o, ...l }) => (i.setInProgress(a, o), s.deleteSheet(e, l))
    ),
    pe(
      {
        name: tm,
        description: P`
Returns the names and header rows of all memory sheets.`,
        parameters: {
          ...Je,
          ...Ye
        },
        response: {
          sheets: I.array(
            I.object({
              name: I.string().describe(P`
The name of the memory sheet
`),
              file_path: I.string().describe(P`
The VFS file path to read the memory sheet
`),
              columns: I.array(
                I.string().describe(P`
The column name
`)
              ).describe(P`
The list of column names
`)
            })
          )
        }
      },
      async ({ task_id: a, status_update: o }) => (i.setInProgress(a, o), s.getSheetMetadata(e))
    )
  ];
}
const nm = "chat_request_user_input", rm = "chat_present_choices", sm = "/vfs/system/chat_log.json", R$ = "__none_of_the_above__", D$ = P`

## Interacting with the User

Use the "${rm}" function when you have a discrete set of options for the user to choose from. This provides a better user experience than asking them to type their selection.

Use the "${nm}" function for freeform text input or file uploads.

Prefer structured choices over freeform input when the answer space is bounded.

The chat log is maintained automatically at the VFS file "${sm}".

If the user input requires multiple entries, split the conversation into multiple turns. For example, if you have three questions to ask, ask them over three full conversation turns rather than in one call.

`;
function U$(n) {
  return { ...Sn(G$(n)), instruction: D$ };
}
const N$ = ["single", "multiple"];
function G$(n) {
  return [
    pe(
      {
        name: nm,
        description: P`
Requests input from user. Call this function to hold a conversatio with the user. Each call corresponds to a conversation turn. Use only when necessary to fulfill the objective.
`,
        parameters: {
          user_message: I.string().describe(
            P`
Message to display to the user when requesting input. The content may include references to VFS files using <file src="/vfs/name.ext" /> tags.
`
          ),
          input_type: I.enum(Kf).describe(
            P`
Input type hint, which allows to better present the chat user interface. If not specified, all kinds of inputs are accepted. When "text" is specified, the chat input is constrained to accept text only. If "file-upload" is specified, the input only allows uploading files.

Unless the objective explicitly asks for a particular type of input, use the "any" value for "input_type" parameter, which does not constrain the input.
`
          ).default("any"),
          ...Je
        },
        response: {
          user_input: I.string().describe("Response from the user")
        }
      },
      async ({ user_message: e, input_type: t, task_id: r }) => {
        n.taskTreeManager.setInProgress(r, "");
        const s = await n.chatManager.chat(
          e,
          t
        );
        if (!w(s)) return s;
        const { input: i } = s, a = await n.translator.toPidgin(i, {}, !0);
        return w(a) ? { user_input: a.text } : a;
      }
    ),
    pe(
      {
        name: rm,
        description: P`
Presents the user with a set of choices to select from. Use when you need the user to make a decision from a predefined set of options. 
`,
        parameters: {
          user_message: I.string().describe(
            P`
Message explaining what the user should choose. The content may include references to VFS files using <file src="/vfs/name.ext" /> tags.
`
          ),
          choices: I.array(
            I.object({
              id: I.string().describe("Unique identifier for this choice"),
              label: I.string().describe(
                'Display text for the choice. The content may include references to VFS files using <file src="/vfs/name.ext" /> tags.'
              )
            })
          ).describe("The choices to present to the user"),
          selection_mode: I.enum(N$).describe(
            P`
"single" for choose-one (radio buttons), "multiple" for any-of (checkboxes).
`
          ),
          layout: I.enum(["list", "row", "grid"]).optional().default("list").describe(
            P`
Layout hint for displaying choices:
- "list" (default): Vertical stack, best for longer choice labels
- "row": Horizontal inline, best for short choices like "Yes/No" or side-by-side comparisons (e.g. images)
- "grid": Wrapping grid that adapts to available space
`
          ),
          none_of_the_above_label: I.string().optional().describe(
            P`If provided, adds a visually distinct "none of the above" escape option with this label (e.g., "Exit", "Skip", "Try Again"). Rendered below a separator with secondary styling. When selected, returns ID "${R$}". Best suited for single selection mode; in multiple mode it behaves as a regular checkbox.`
          ),
          ...Je
        },
        response: {
          selected: I.array(I.string()).describe(
            'Array of selected choice IDs. For "single" mode, this will have exactly one element.'
          )
        }
      },
      async ({
        user_message: e,
        choices: t,
        selection_mode: r,
        layout: s,
        none_of_the_above_label: i,
        task_id: a
      }) => {
        n.taskTreeManager.setInProgress(a, "");
        const o = await n.chatManager.presentChoices(
          e,
          t,
          r,
          s,
          i
        );
        return w(o) ? { selected: o.selected } : o;
      }
    )
  ];
}
function im(n) {
  if (!w(n)) return n;
  const e = n?.candidates?.at(0)?.content?.parts?.filter((t) => !t.thought && "text" in t).at(0)?.text;
  if (!e)
    return k("JSON string not found in output");
  try {
    return JSON.parse(e);
  } catch (t) {
    return k(t.message);
  }
}
function ss(n, e) {
  const t = typeof n;
  if (t !== typeof e)
    return !1;
  if (Array.isArray(n)) {
    if (!Array.isArray(e))
      return !1;
    const r = n.length;
    if (r !== e.length)
      return !1;
    for (let s = 0; s < r; s++)
      if (!ss(n[s], e[s]))
        return !1;
    return !0;
  }
  if (t === "object") {
    if (!n || !e)
      return n === e;
    const r = Object.keys(n), s = Object.keys(e);
    if (r.length !== s.length)
      return !1;
    for (const a of r)
      if (!ss(n[a], e[a]))
        return !1;
    return !0;
  }
  return n === e;
}
function lt(n) {
  return encodeURI(F$(n));
}
function F$(n) {
  return n.replace(/~/g, "~0").replace(/\//g, "~1");
}
const z$ = {
  prefixItems: !0,
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
}, L$ = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependentSchemas: !0
}, W$ = {
  id: !0,
  $id: !0,
  $ref: !0,
  $schema: !0,
  $anchor: !0,
  $vocabulary: !0,
  $comment: !0,
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  type: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
let B$ = typeof self < "u" && self.location && self.location.origin !== "null" ? new URL(self.location.origin + self.location.pathname + location.search) : new URL("https://github.com/cfworker");
function mn(n, e = /* @__PURE__ */ Object.create(null), t = B$, r = "") {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    const i = n.$id || n.id;
    if (i) {
      const a = new URL(i, t.href);
      a.hash.length > 1 ? e[a.href] = n : (a.hash = "", r === "" ? t = a : mn(n, e, t));
    }
  } else if (n !== !0 && n !== !1)
    return e;
  const s = t.href + (r ? "#" + r : "");
  if (e[s] !== void 0)
    throw new Error(`Duplicate schema URI "${s}".`);
  if (e[s] = n, n === !0 || n === !1)
    return e;
  if (n.__absolute_uri__ === void 0 && Object.defineProperty(n, "__absolute_uri__", {
    enumerable: !1,
    value: s
  }), n.$ref && n.__absolute_ref__ === void 0) {
    const i = new URL(n.$ref, t.href);
    i.hash = i.hash, Object.defineProperty(n, "__absolute_ref__", {
      enumerable: !1,
      value: i.href
    });
  }
  if (n.$recursiveRef && n.__absolute_recursive_ref__ === void 0) {
    const i = new URL(n.$recursiveRef, t.href);
    i.hash = i.hash, Object.defineProperty(n, "__absolute_recursive_ref__", {
      enumerable: !1,
      value: i.href
    });
  }
  if (n.$anchor) {
    const i = new URL("#" + n.$anchor, t.href);
    e[i.href] = n;
  }
  for (let i in n) {
    if (W$[i])
      continue;
    const a = `${r}/${lt(i)}`, o = n[i];
    if (Array.isArray(o)) {
      if (z$[i]) {
        const l = o.length;
        for (let c = 0; c < l; c++)
          mn(o[c], e, t, `${a}/${c}`);
      }
    } else if (L$[i])
      for (let l in o)
        mn(o[l], e, t, `${a}/${lt(l)}`);
    else
      mn(o, e, t, a);
  }
  return e;
}
const q$ = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, H$ = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], V$ = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i, Y$ = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i, J$ = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, K$ = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i, Z$ = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu, X$ = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i, Q$ = /^(?:\/(?:[^~/]|~0|~1)*)*$/, eC = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i, tC = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/, nC = (n) => {
  if (n[0] === '"')
    return !1;
  const [e, t, ...r] = n.split("@");
  return !e || !t || r.length !== 0 || e.length > 64 || t.length > 253 || e[0] === "." || e.endsWith(".") || e.includes("..") || !/^[a-z0-9.-]+$/i.test(t) || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(e) ? !1 : t.split(".").every((s) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i.test(s));
}, rC = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/, sC = /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i, iC = (n) => n.length > 1 && n.length < 80 && (/^P\d+([.,]\d+)?W$/.test(n) || /^P[\dYMDTHS]*(\d[.,]\d+)?[YMDHS]$/.test(n) && /^P([.,\d]+Y)?([.,\d]+M)?([.,\d]+D)?(T([.,\d]+H)?([.,\d]+M)?([.,\d]+S)?)?$/.test(n));
function yt(n) {
  return n.test.bind(n);
}
const nu = {
  date: am,
  time: om.bind(void 0, !1),
  "date-time": lC,
  duration: iC,
  uri: pC,
  "uri-reference": yt(J$),
  "uri-template": yt(K$),
  url: yt(Z$),
  email: nC,
  hostname: yt(Y$),
  ipv4: yt(rC),
  ipv6: yt(sC),
  regex: hC,
  uuid: yt(X$),
  "json-pointer": yt(Q$),
  "json-pointer-uri-fragment": yt(eC),
  "relative-json-pointer": yt(tC)
};
function aC(n) {
  return n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0);
}
function am(n) {
  const e = n.match(q$);
  if (!e)
    return !1;
  const t = +e[1], r = +e[2], s = +e[3];
  return r >= 1 && r <= 12 && s >= 1 && s <= (r == 2 && aC(t) ? 29 : H$[r]);
}
function om(n, e) {
  const t = e.match(V$);
  if (!t)
    return !1;
  const r = +t[1], s = +t[2], i = +t[3], a = !!t[5];
  return (r <= 23 && s <= 59 && i <= 59 || r == 23 && s == 59 && i == 60) && (!n || a);
}
const oC = /t|\s/i;
function lC(n) {
  const e = n.split(oC);
  return e.length == 2 && am(e[0]) && om(!0, e[1]);
}
const cC = /\/|:/, dC = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function pC(n) {
  return cC.test(n) && dC.test(n);
}
const uC = /[^\\]\\Z/;
function hC(n) {
  if (uC.test(n))
    return !1;
  try {
    return new RegExp(n, "u"), !0;
  } catch {
    return !1;
  }
}
function fC(n) {
  let e = 0, t = n.length, r = 0, s;
  for (; r < t; )
    e++, s = n.charCodeAt(r++), s >= 55296 && s <= 56319 && r < t && (s = n.charCodeAt(r), (s & 64512) == 56320 && r++);
  return e;
}
function ie(n, e, t = "2019-09", r = mn(e), s = !0, i = null, a = "#", o = "#", l = /* @__PURE__ */ Object.create(null)) {
  if (e === !0)
    return { valid: !0, errors: [] };
  if (e === !1)
    return {
      valid: !1,
      errors: [
        {
          instanceLocation: a,
          keyword: "false",
          keywordLocation: a,
          error: "False boolean schema."
        }
      ]
    };
  const c = typeof n;
  let d;
  switch (c) {
    case "boolean":
    case "number":
    case "string":
      d = c;
      break;
    case "object":
      n === null ? d = "null" : Array.isArray(n) ? d = "array" : d = "object";
      break;
    default:
      throw new Error(`Instances of "${c}" type are not supported.`);
  }
  const { $ref: p, $recursiveRef: h, $recursiveAnchor: f, type: u, const: y, enum: v, required: x, not: m, anyOf: b, allOf: g, oneOf: _, if: $, then: j, else: A, format: R, properties: K, patternProperties: V, additionalProperties: L, unevaluatedProperties: ne, minProperties: xe, maxProperties: $e, propertyNames: qe, dependentRequired: Oe, dependentSchemas: ir, dependencies: Xe, prefixItems: ar, items: nn, additionalItems: up, unevaluatedItems: hp, contains: fp, minContains: kt, maxContains: ii, minItems: Ca, maxItems: Ta, uniqueItems: Yv, minimum: rn, maximum: sn, exclusiveMinimum: or, exclusiveMaximum: lr, multipleOf: ai, minLength: oi, maxLength: li, pattern: mp, __absolute_ref__: ci, __absolute_recursive_ref__: Jv } = e, M = [];
  if (f === !0 && i === null && (i = e), h === "#") {
    const N = i === null ? r[Jv] : i, D = `${o}/$recursiveRef`, z = ie(n, i === null ? e : i, t, r, s, N, a, D, l);
    z.valid || M.push({
      instanceLocation: a,
      keyword: "$recursiveRef",
      keywordLocation: D,
      error: "A subschema had errors."
    }, ...z.errors);
  }
  if (p !== void 0) {
    const D = r[ci || p];
    if (D === void 0) {
      let T = `Unresolved $ref "${p}".`;
      throw ci && ci !== p && (T += `  Absolute URI "${ci}".`), T += `
Known schemas:
- ${Object.keys(r).join(`
- `)}`, new Error(T);
    }
    const z = `${o}/$ref`, O = ie(n, D, t, r, s, i, a, z, l);
    if (O.valid || M.push({
      instanceLocation: a,
      keyword: "$ref",
      keywordLocation: z,
      error: "A subschema had errors."
    }, ...O.errors), t === "4" || t === "7")
      return { valid: M.length === 0, errors: M };
  }
  if (Array.isArray(u)) {
    let N = u.length, D = !1;
    for (let z = 0; z < N; z++)
      if (d === u[z] || u[z] === "integer" && d === "number" && n % 1 === 0 && n === n) {
        D = !0;
        break;
      }
    D || M.push({
      instanceLocation: a,
      keyword: "type",
      keywordLocation: `${o}/type`,
      error: `Instance type "${d}" is invalid. Expected "${u.join('", "')}".`
    });
  } else u === "integer" ? (d !== "number" || n % 1 || n !== n) && M.push({
    instanceLocation: a,
    keyword: "type",
    keywordLocation: `${o}/type`,
    error: `Instance type "${d}" is invalid. Expected "${u}".`
  }) : u !== void 0 && d !== u && M.push({
    instanceLocation: a,
    keyword: "type",
    keywordLocation: `${o}/type`,
    error: `Instance type "${d}" is invalid. Expected "${u}".`
  });
  if (y !== void 0 && (d === "object" || d === "array" ? ss(n, y) || M.push({
    instanceLocation: a,
    keyword: "const",
    keywordLocation: `${o}/const`,
    error: `Instance does not match ${JSON.stringify(y)}.`
  }) : n !== y && M.push({
    instanceLocation: a,
    keyword: "const",
    keywordLocation: `${o}/const`,
    error: `Instance does not match ${JSON.stringify(y)}.`
  })), v !== void 0 && (d === "object" || d === "array" ? v.some((N) => ss(n, N)) || M.push({
    instanceLocation: a,
    keyword: "enum",
    keywordLocation: `${o}/enum`,
    error: `Instance does not match any of ${JSON.stringify(v)}.`
  }) : v.some((N) => n === N) || M.push({
    instanceLocation: a,
    keyword: "enum",
    keywordLocation: `${o}/enum`,
    error: `Instance does not match any of ${JSON.stringify(v)}.`
  })), m !== void 0) {
    const N = `${o}/not`;
    ie(n, m, t, r, s, i, a, N).valid && M.push({
      instanceLocation: a,
      keyword: "not",
      keywordLocation: N,
      error: 'Instance matched "not" schema.'
    });
  }
  let di = [];
  if (b !== void 0) {
    const N = `${o}/anyOf`, D = M.length;
    let z = !1;
    for (let O = 0; O < b.length; O++) {
      const T = b[O], F = Object.create(l), G = ie(n, T, t, r, s, f === !0 ? i : null, a, `${N}/${O}`, F);
      M.push(...G.errors), z = z || G.valid, G.valid && di.push(F);
    }
    z ? M.length = D : M.splice(D, 0, {
      instanceLocation: a,
      keyword: "anyOf",
      keywordLocation: N,
      error: "Instance does not match any subschemas."
    });
  }
  if (g !== void 0) {
    const N = `${o}/allOf`, D = M.length;
    let z = !0;
    for (let O = 0; O < g.length; O++) {
      const T = g[O], F = Object.create(l), G = ie(n, T, t, r, s, f === !0 ? i : null, a, `${N}/${O}`, F);
      M.push(...G.errors), z = z && G.valid, G.valid && di.push(F);
    }
    z ? M.length = D : M.splice(D, 0, {
      instanceLocation: a,
      keyword: "allOf",
      keywordLocation: N,
      error: "Instance does not match every subschema."
    });
  }
  if (_ !== void 0) {
    const N = `${o}/oneOf`, D = M.length, z = _.filter((O, T) => {
      const F = Object.create(l), G = ie(n, O, t, r, s, f === !0 ? i : null, a, `${N}/${T}`, F);
      return M.push(...G.errors), G.valid && di.push(F), G.valid;
    }).length;
    z === 1 ? M.length = D : M.splice(D, 0, {
      instanceLocation: a,
      keyword: "oneOf",
      keywordLocation: N,
      error: `Instance does not match exactly one subschema (${z} matches).`
    });
  }
  if ((d === "object" || d === "array") && Object.assign(l, ...di), $ !== void 0) {
    const N = `${o}/if`;
    if (ie(n, $, t, r, s, i, a, N, l).valid) {
      if (j !== void 0) {
        const z = ie(n, j, t, r, s, i, a, `${o}/then`, l);
        z.valid || M.push({
          instanceLocation: a,
          keyword: "if",
          keywordLocation: N,
          error: 'Instance does not match "then" schema.'
        }, ...z.errors);
      }
    } else if (A !== void 0) {
      const z = ie(n, A, t, r, s, i, a, `${o}/else`, l);
      z.valid || M.push({
        instanceLocation: a,
        keyword: "if",
        keywordLocation: N,
        error: 'Instance does not match "else" schema.'
      }, ...z.errors);
    }
  }
  if (d === "object") {
    if (x !== void 0)
      for (const O of x)
        O in n || M.push({
          instanceLocation: a,
          keyword: "required",
          keywordLocation: `${o}/required`,
          error: `Instance does not have required property "${O}".`
        });
    const N = Object.keys(n);
    if (xe !== void 0 && N.length < xe && M.push({
      instanceLocation: a,
      keyword: "minProperties",
      keywordLocation: `${o}/minProperties`,
      error: `Instance does not have at least ${xe} properties.`
    }), $e !== void 0 && N.length > $e && M.push({
      instanceLocation: a,
      keyword: "maxProperties",
      keywordLocation: `${o}/maxProperties`,
      error: `Instance does not have at least ${$e} properties.`
    }), qe !== void 0) {
      const O = `${o}/propertyNames`;
      for (const T in n) {
        const F = `${a}/${lt(T)}`, G = ie(T, qe, t, r, s, i, F, O);
        G.valid || M.push({
          instanceLocation: a,
          keyword: "propertyNames",
          keywordLocation: O,
          error: `Property name "${T}" does not match schema.`
        }, ...G.errors);
      }
    }
    if (Oe !== void 0) {
      const O = `${o}/dependantRequired`;
      for (const T in Oe)
        if (T in n) {
          const F = Oe[T];
          for (const G of F)
            G in n || M.push({
              instanceLocation: a,
              keyword: "dependentRequired",
              keywordLocation: O,
              error: `Instance has "${T}" but does not have "${G}".`
            });
        }
    }
    if (ir !== void 0)
      for (const O in ir) {
        const T = `${o}/dependentSchemas`;
        if (O in n) {
          const F = ie(n, ir[O], t, r, s, i, a, `${T}/${lt(O)}`, l);
          F.valid || M.push({
            instanceLocation: a,
            keyword: "dependentSchemas",
            keywordLocation: T,
            error: `Instance has "${O}" but does not match dependant schema.`
          }, ...F.errors);
        }
      }
    if (Xe !== void 0) {
      const O = `${o}/dependencies`;
      for (const T in Xe)
        if (T in n) {
          const F = Xe[T];
          if (Array.isArray(F))
            for (const G of F)
              G in n || M.push({
                instanceLocation: a,
                keyword: "dependencies",
                keywordLocation: O,
                error: `Instance has "${T}" but does not have "${G}".`
              });
          else {
            const G = ie(n, F, t, r, s, i, a, `${O}/${lt(T)}`);
            G.valid || M.push({
              instanceLocation: a,
              keyword: "dependencies",
              keywordLocation: O,
              error: `Instance has "${T}" but does not match dependant schema.`
            }, ...G.errors);
          }
        }
    }
    const D = /* @__PURE__ */ Object.create(null);
    let z = !1;
    if (K !== void 0) {
      const O = `${o}/properties`;
      for (const T in K) {
        if (!(T in n))
          continue;
        const F = `${a}/${lt(T)}`, G = ie(n[T], K[T], t, r, s, i, F, `${O}/${lt(T)}`);
        if (G.valid)
          l[T] = D[T] = !0;
        else if (z = s, M.push({
          instanceLocation: a,
          keyword: "properties",
          keywordLocation: O,
          error: `Property "${T}" does not match schema.`
        }, ...G.errors), z)
          break;
      }
    }
    if (!z && V !== void 0) {
      const O = `${o}/patternProperties`;
      for (const T in V) {
        const F = new RegExp(T, "u"), G = V[T];
        for (const je in n) {
          if (!F.test(je))
            continue;
          const gp = `${a}/${lt(je)}`, yp = ie(n[je], G, t, r, s, i, gp, `${O}/${lt(T)}`);
          yp.valid ? l[je] = D[je] = !0 : (z = s, M.push({
            instanceLocation: a,
            keyword: "patternProperties",
            keywordLocation: O,
            error: `Property "${je}" matches pattern "${T}" but does not match associated schema.`
          }, ...yp.errors));
        }
      }
    }
    if (!z && L !== void 0) {
      const O = `${o}/additionalProperties`;
      for (const T in n) {
        if (D[T])
          continue;
        const F = `${a}/${lt(T)}`, G = ie(n[T], L, t, r, s, i, F, O);
        G.valid ? l[T] = !0 : (z = s, M.push({
          instanceLocation: a,
          keyword: "additionalProperties",
          keywordLocation: O,
          error: `Property "${T}" does not match additional properties schema.`
        }, ...G.errors));
      }
    } else if (!z && ne !== void 0) {
      const O = `${o}/unevaluatedProperties`;
      for (const T in n)
        if (!l[T]) {
          const F = `${a}/${lt(T)}`, G = ie(n[T], ne, t, r, s, i, F, O);
          G.valid ? l[T] = !0 : M.push({
            instanceLocation: a,
            keyword: "unevaluatedProperties",
            keywordLocation: O,
            error: `Property "${T}" does not match unevaluated properties schema.`
          }, ...G.errors);
        }
    }
  } else if (d === "array") {
    Ta !== void 0 && n.length > Ta && M.push({
      instanceLocation: a,
      keyword: "maxItems",
      keywordLocation: `${o}/maxItems`,
      error: `Array has too many items (${n.length} > ${Ta}).`
    }), Ca !== void 0 && n.length < Ca && M.push({
      instanceLocation: a,
      keyword: "minItems",
      keywordLocation: `${o}/minItems`,
      error: `Array has too few items (${n.length} < ${Ca}).`
    });
    const N = n.length;
    let D = 0, z = !1;
    if (ar !== void 0) {
      const O = `${o}/prefixItems`, T = Math.min(ar.length, N);
      for (; D < T; D++) {
        const F = ie(n[D], ar[D], t, r, s, i, `${a}/${D}`, `${O}/${D}`);
        if (l[D] = !0, !F.valid && (z = s, M.push({
          instanceLocation: a,
          keyword: "prefixItems",
          keywordLocation: O,
          error: "Items did not match schema."
        }, ...F.errors), z))
          break;
      }
    }
    if (nn !== void 0) {
      const O = `${o}/items`;
      if (Array.isArray(nn)) {
        const T = Math.min(nn.length, N);
        for (; D < T; D++) {
          const F = ie(n[D], nn[D], t, r, s, i, `${a}/${D}`, `${O}/${D}`);
          if (l[D] = !0, !F.valid && (z = s, M.push({
            instanceLocation: a,
            keyword: "items",
            keywordLocation: O,
            error: "Items did not match schema."
          }, ...F.errors), z))
            break;
        }
      } else
        for (; D < N; D++) {
          const T = ie(n[D], nn, t, r, s, i, `${a}/${D}`, O);
          if (l[D] = !0, !T.valid && (z = s, M.push({
            instanceLocation: a,
            keyword: "items",
            keywordLocation: O,
            error: "Items did not match schema."
          }, ...T.errors), z))
            break;
        }
      if (!z && up !== void 0) {
        const T = `${o}/additionalItems`;
        for (; D < N; D++) {
          const F = ie(n[D], up, t, r, s, i, `${a}/${D}`, T);
          l[D] = !0, F.valid || (z = s, M.push({
            instanceLocation: a,
            keyword: "additionalItems",
            keywordLocation: T,
            error: "Items did not match additional items schema."
          }, ...F.errors));
        }
      }
    }
    if (fp !== void 0)
      if (N === 0 && kt === void 0)
        M.push({
          instanceLocation: a,
          keyword: "contains",
          keywordLocation: `${o}/contains`,
          error: "Array is empty. It must contain at least one item matching the schema."
        });
      else if (kt !== void 0 && N < kt)
        M.push({
          instanceLocation: a,
          keyword: "minContains",
          keywordLocation: `${o}/minContains`,
          error: `Array has less items (${N}) than minContains (${kt}).`
        });
      else {
        const O = `${o}/contains`, T = M.length;
        let F = 0;
        for (let G = 0; G < N; G++) {
          const je = ie(n[G], fp, t, r, s, i, `${a}/${G}`, O);
          je.valid ? (l[G] = !0, F++) : M.push(...je.errors);
        }
        F >= (kt || 0) && (M.length = T), kt === void 0 && ii === void 0 && F === 0 ? M.splice(T, 0, {
          instanceLocation: a,
          keyword: "contains",
          keywordLocation: O,
          error: "Array does not contain item matching schema."
        }) : kt !== void 0 && F < kt ? M.push({
          instanceLocation: a,
          keyword: "minContains",
          keywordLocation: `${o}/minContains`,
          error: `Array must contain at least ${kt} items matching schema. Only ${F} items were found.`
        }) : ii !== void 0 && F > ii && M.push({
          instanceLocation: a,
          keyword: "maxContains",
          keywordLocation: `${o}/maxContains`,
          error: `Array may contain at most ${ii} items matching schema. ${F} items were found.`
        });
      }
    if (!z && hp !== void 0) {
      const O = `${o}/unevaluatedItems`;
      for (D; D < N; D++) {
        if (l[D])
          continue;
        const T = ie(n[D], hp, t, r, s, i, `${a}/${D}`, O);
        l[D] = !0, T.valid || M.push({
          instanceLocation: a,
          keyword: "unevaluatedItems",
          keywordLocation: O,
          error: "Items did not match unevaluated items schema."
        }, ...T.errors);
      }
    }
    if (Yv)
      for (let O = 0; O < N; O++) {
        const T = n[O], F = typeof T == "object" && T !== null;
        for (let G = 0; G < N; G++) {
          if (O === G)
            continue;
          const je = n[G];
          (T === je || F && (typeof je == "object" && je !== null) && ss(T, je)) && (M.push({
            instanceLocation: a,
            keyword: "uniqueItems",
            keywordLocation: `${o}/uniqueItems`,
            error: `Duplicate items at indexes ${O} and ${G}.`
          }), O = Number.MAX_SAFE_INTEGER, G = Number.MAX_SAFE_INTEGER);
        }
      }
  } else if (d === "number") {
    if (t === "4" ? (rn !== void 0 && (or === !0 && n <= rn || n < rn) && M.push({
      instanceLocation: a,
      keyword: "minimum",
      keywordLocation: `${o}/minimum`,
      error: `${n} is less than ${or ? "or equal to " : ""} ${rn}.`
    }), sn !== void 0 && (lr === !0 && n >= sn || n > sn) && M.push({
      instanceLocation: a,
      keyword: "maximum",
      keywordLocation: `${o}/maximum`,
      error: `${n} is greater than ${lr ? "or equal to " : ""} ${sn}.`
    })) : (rn !== void 0 && n < rn && M.push({
      instanceLocation: a,
      keyword: "minimum",
      keywordLocation: `${o}/minimum`,
      error: `${n} is less than ${rn}.`
    }), sn !== void 0 && n > sn && M.push({
      instanceLocation: a,
      keyword: "maximum",
      keywordLocation: `${o}/maximum`,
      error: `${n} is greater than ${sn}.`
    }), or !== void 0 && n <= or && M.push({
      instanceLocation: a,
      keyword: "exclusiveMinimum",
      keywordLocation: `${o}/exclusiveMinimum`,
      error: `${n} is less than ${or}.`
    }), lr !== void 0 && n >= lr && M.push({
      instanceLocation: a,
      keyword: "exclusiveMaximum",
      keywordLocation: `${o}/exclusiveMaximum`,
      error: `${n} is greater than or equal to ${lr}.`
    })), ai !== void 0) {
      const N = n % ai;
      Math.abs(0 - N) >= 11920929e-14 && Math.abs(ai - N) >= 11920929e-14 && M.push({
        instanceLocation: a,
        keyword: "multipleOf",
        keywordLocation: `${o}/multipleOf`,
        error: `${n} is not a multiple of ${ai}.`
      });
    }
  } else if (d === "string") {
    const N = oi === void 0 && li === void 0 ? 0 : fC(n);
    oi !== void 0 && N < oi && M.push({
      instanceLocation: a,
      keyword: "minLength",
      keywordLocation: `${o}/minLength`,
      error: `String is too short (${N} < ${oi}).`
    }), li !== void 0 && N > li && M.push({
      instanceLocation: a,
      keyword: "maxLength",
      keywordLocation: `${o}/maxLength`,
      error: `String is too long (${N} > ${li}).`
    }), mp !== void 0 && !new RegExp(mp, "u").test(n) && M.push({
      instanceLocation: a,
      keyword: "pattern",
      keywordLocation: `${o}/pattern`,
      error: "String does not match pattern."
    }), R !== void 0 && nu[R] && !nu[R](n) && M.push({
      instanceLocation: a,
      keyword: "format",
      keywordLocation: `${o}/format`,
      error: `String does not match format "${R}".`
    });
  }
  return { valid: M.length === 0, errors: M };
}
class mC {
  schema;
  draft;
  shortCircuit;
  lookup;
  constructor(e, t = "2019-09", r = !0) {
    this.schema = e, this.draft = t, this.shortCircuit = r, this.lookup = mn(e);
  }
  validate(e) {
    return ie(e, this.schema, this.draft, this.lookup, this.shortCircuit);
  }
  addSchema(e, t) {
    t && (e = { ...e, $id: t }), mn(e, this.lookup);
  }
}
const gC = 3;
function yC(n) {
  return {
    contents: [n],
    systemInstruction: bC,
    generationConfig: {
      responseMimeType: "application/json",
      responseJsonSchema: wC,
      temperature: 0,
      topP: 1
    }
  };
}
const bC = J`
You are an LLM-powered UI spec designer, embedded into an application.

Your job is to analyze provided objective and design the user interface specs
that will necessary to fulfill the objective. These specs will be then used by
other LLM-powered sub-agents to actually design the UI.

The UI is rendered with UI surfaces. Each surface is a tree of UI components that occupies a contiguous area of screen real estate. The "surfaceId" property uniquely identifies such an area.

Each UI surface is in effect a template: it is backed by a data model, and the data model is updated independently of the surface. Your task is to construct the UI surface specs and the data model structures in such a way that allows updating the data models without affecting the structure of the user interface.

When defininig UI surface specs, populate "dataModelSchema" and "responseSchema". Without them, the UI surface is useless. It can't display anything and it can't provide responses.

Make sure to design within the UI renderer's capabilities.

<renderer-capabilities>


While the UI renderer supports value and list templating, it does not support switching of subtrees within the UI tree based on the data model input. If the objective calls to for the UI tree structure that changes based on a sub-task, break it down into sub-tasks with a stable UI tree structure and define a separate surface spec for each.

For example, if the objective calls for the user to confirm the collected data after a chat session, the chat session and the confirmation dialog will be represented as two separate surfaces.

The renderer supports a fixed catalog of UI componens. Each of the components
can be a template, with container components allowing for list templating

Here are the non-container components:

- Heading - renders a heading, with a level (corresponds to HTML heading tag levels)
- Text - renders text
- Image - renders an image
- Icon - renders an icon
- Video - renders a video
- AudioPlayer - renders an audio 

These are the container components. These components can contain other components:

- Row - renders a row of child components, with distribution (CSS "justify-content" property values) and alignment (CSS "align-itmes" property values)
- Column - renders a column of child components, with distribution (CSS "justify-content" property values) and alignment (CSS "align-itmes" property values)
- List - renders a list of child components, with direction (vertical or horizontal) and alignment (CSS "align-itmes" property values)
- Card - renders child components as a separate visual group (a card)
- Tabs - renders child components in a typical tabbed UI, with title and body for each tab
- Divider - renders two children in a divider, with an axis (veritcal or horizontal)

Finally, here are the interactive components. These components provide responses from the UI surface:

- Button - renders a clickable button

- CheckBox - renders a checkbox

- TextField - renders a text field

- DataTimeInput - renders a date/time input, with ability to specify only date, only time, or both

- MultipleChoice - renders a list of choices as a single multiple choice input, with some maximum number of options that the user is allowed to select.

- Slider - renders a typical slider, with minValue and maxValue

</renderer-capabilities>

`.asContent(), vC = Ln({
  surfaceId: Q().describe("Unique id of the UI surface, in snake_case"),
  description: Q().describe(
    'Detailed description of what this UI surface sholuld do in the imperative mood: "Show ... " and "Present ... '
  ),
  surfaceSpec: Q().describe(
    "Detailed spec of the UI layout in plain English: what goes where, how UI components are laid out relative to each other. Note that this spec should not include styling or theming: these are provided separately."
  ),
  dataModelSpec: Q().describe(
    "Detailed description of the data model structure in plain English"
  ),
  exampleData: Q().describe("An example of the data model values"),
  dataModelSchema: Q().describe("The JSON schema of the UI surface data model."),
  responseSchema: Q().describe(
    "The JSON schema of the responses from the UI surface. The schema must define the structure of the data that the UI the surface provides as output. If the surface provides no output, the schema may be empty"
  )
}), lm = {
  surfaces: qu(vC).describe("The list of surfaces that must exist to fullfil the objective.")
};
Ln(lm);
const wC = BI(lm);
async function ru(n, e, t) {
  let r = gC;
  for (; ; ) {
    const s = await cl(
      t,
      yC(n),
      e
    ), i = im(s);
    if (!w(i)) return i;
    const a = [], o = i.surfaces.map((l) => {
      let c = su(l.dataModelSchema);
      w(c) || (a.push(c.$error), c = { type: "object" });
      let d = su(l.responseSchema);
      w(d) || (a.push(d.$error), d = { type: "object" });
      let p = xC(l.exampleData);
      return w(p) || (a.push(p), p = { type: "object" }), {
        ...l,
        exampleData: p,
        dataModelSchema: c,
        responseSchema: d
      };
    });
    if (a.length === 0) return o;
    if (!r--)
      return k(a.join(`

`));
    console.log("Failed to generate surfaces, retrying", a, r);
  }
}
function xC(n) {
  try {
    return JSON.parse(n);
  } catch (e) {
    return k(e.message);
  }
}
function su(n) {
  try {
    const e = JSON.parse(n);
    return new mC(e), e;
  } catch (e) {
    return console.log("FAILED TO PARSE SURFACE SPEC SCHEMA", e), k(e.message);
  }
}
function _C(n) {
  return {
    contents: n,
    systemInstruction: kC,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: SC
    }
  };
}
const kC = J`
You are an LLM-powered UI creator, embedded into an application.

Your job is to analyze the provided surface specification and build the user interface necessary to fulfill the specification.

The UI is rendered with UI surfaces. Each surface is a tree of UI components that occupies a contiguous area of screen real estate. The "surfaceId" property uniquely identifies such an area.

You will be provided with a surface along with an ID, description, surface specification, data model specification, some example data, a schema for the data model and, a schema for responses.

The responses are actions that the user can take within the UI that will built.

The UI will be built in two phases. You are responsible for the first phase, where the UI will be populated with surface information. This will require you to provide an array containing a single surfaceUpdate and a single beginRendering.

Later another LLM-powered creator will be responsible for populating the data using the same data model schema and a dataModelUpdate of their own, so you must use assume paths for the data and avoid literals. If you use templates you should ensure that the dataBinding property begins with a \`/\` only when it refers to some data in the root.

Suppose we had the following data:

{
  items: [
    { details: 'Details 1' },
    { details: 'Details 2' },
  ]
}

And we have the following surface.

{
  "id": "item_row",
  "component": {
    "Row": {
      "children": {
        "template": {
          "componentId": "item",
          "dataBinding": "/items"
        }
      },
    }
  }
}

The data bound paths for the children will be remapped. This, then is a GOOD example for the item component:

{
  "id": "item",
  "component": {
    "List": {
      "children": {
        "template": {
          "componentId": "details",
          "dataBinding": "details"
        }
      }
    }
  }
}

This is GOOD because the dataBinding would expand to \`/items/0/details\`, \`/items/1/details\` and so on.

This is a BAD example:

{
  "id": "item",
  "component": {
    "List": {
      "children": {
        "template": {
          "componentId": "details",
          "dataBinding": "/details"
        }
      }
    }
  }
}

This is BAD because the dataBinding of "/details" means we will look for details at the root of the data, and, per the data structure, /details does not exist at the root.
`.asContent(), SC = {
  type: "array",
  items: wf
};
async function iu(n, e, t) {
  console.log(`Generating template for surface "${n.surfaceId}"`);
  const r = _C([J`${JSON.stringify(n)}`.asContent()]), s = await cl(t, r, e);
  return w(s) ? im(s) : s;
}
function au(n, e, t) {
  const { surfaceId: r, description: s, dataModelSchema: i, responseSchema: a } = n, o = `ui_ask_user_${r}`;
  return Nf(
    {
      name: o,
      description: s,
      parametersJsonSchema: i,
      responseJsonSchema: a
    },
    async (d) => {
      const p = {
        dataModelUpdate: { surfaceId: r, path: "/", contents: d }
      }, h = [...e, p];
      return t.render(h);
    }
  );
}
const IC = {
  temperature: 0,
  topP: 1,
  thinkingConfig: { thinkingBudget: -1 }
}, $C = `
Ensure full fidelity of translation: 
- all content in the provided input must appear in your output. 
- DO NOT truncate or elide text from the input
- Preserve the input text formatting, markdown in particular.`;
async function CC(n, e, t) {
  const r = J`
You are an LLM-powered output translator.

Your job is to call provided function with the right arguments to generate output based on the provided input.

${$C}`.asContent(), s = Sn([e]), i = await dl(t, {
    systemInstruction: r,
    contents: [n],
    toolConfig: { functionCallingConfig: { mode: "ANY" } },
    generationConfig: IC,
    tools: [{ functionDeclarations: s.declarations }]
  });
  if (!w(i)) return i;
  const a = await cl(
    "gemini-flash-latest",
    i,
    t
  );
  if (!w(a)) return a;
  const o = (a.candidates?.at(0)?.content?.parts || []).filter((l) => "functionCall" in l)?.at(0)?.functionCall;
  return o ? e.handler(o.args, (l) => {
    console.log("Status update", l);
  }) : k("No function call produced");
}
const ou = "gemini-3-flash-preview", lu = "gemini-3-flash-preview";
class TC {
  constructor(e) {
    this.args = e;
  }
  async prepareFunctionDefinitions(e, t) {
    const { ui: r, moduleArgs: s, translator: i } = this.args;
    if (!r)
      return k(
        "No renderer provided, unable to prepare function definitions"
      );
    const a = await i.toPidgin(e, t, !1);
    if (!S(a)) return a;
    const o = await ru(
      J`${a.text}`.asContent(),
      s,
      ou
    );
    if (!S(o)) return o;
    if (o.length === 0)
      return k("No surfaces were generated");
    const l = await Promise.all(
      o.map(async (d) => {
        const p = await iu(
          d,
          s,
          lu
        );
        return S(p) ? au(d, p, r) : p;
      })
    ), c = l.map((d) => S(d) ? null : d.$error).filter((d) => d !== null);
    return c.length > 0 ? k(c.join(`
`)) : l;
  }
  async run(e, t) {
    const { caps: r, moduleArgs: s } = this.args, i = new Wf({
      context: s.context,
      memoryManager: null
    }), o = await new Bf(r, s, i).toPidgin(e, t, !1);
    if (!S(o)) return o;
    const l = await ru(
      J`${o.text}`.asContent(),
      s,
      ou
    );
    if (!S(l)) return l;
    if (l.length === 0)
      return k("No surfaces were generated");
    const c = async (h) => {
      const f = await iu(
        h,
        s,
        lu
      );
      if (!S(f)) return f;
      let u;
      const y = new Promise((m) => {
        u = m;
      }), v = au(h, f, {
        render: async (m) => (u(m), { success: !0 })
      });
      await v.handler(
        h.exampleData,
        (m) => {
          console.log("Status update", m);
        }
      );
      const x = await CC(
        J`${o.text}`.asContent(),
        v,
        s
      );
      return S(x) ? y : x;
    }, d = await Promise.all(
      l.map((h) => c(h))
    ), p = d.map((h) => S(h) ? null : h.$error).filter((h) => h !== null);
    return p.length > 0 ? k(p.join(`
`)) : d;
  }
}
const EC = P`

## Interacting with the User

To interact with the user, rely on functions that start with "ui_ask_user_". These functions are designed to present consistent user interface to the user, and all you need to do is to choose the right funciton and supply the necessary parameters. Once such a function function is called, it blocks until the user interacts with it, making a selection or entering text. The function then returns back with the outcomes of user's interaction.

`;
async function PC(n) {
  const { objective: e, uiPrompt: t, params: r, ui: s } = n, i = new TC(n);
  s.progress.generatingLayouts(t), console.time("LAYOUT GENERATION");
  const a = await i.prepareFunctionDefinitions(
    J`${e}\n\n${t || ""}`.asContent(),
    r
  );
  return console.timeEnd("LAYOUT GENERATION"), w(a) ? { ...Sn(a), instruction: EC } : a;
}
const AC = P`

## Interacting with the User

You do not have a way to interact with the user during this session. If the objective calls for ANY user interaction, like asking user for input or presenting output and asking user to react to it, call the "${rs}" function, since that's beyond your current capabilities.

`;
function MC() {
  return { ...qI(), instruction: AC };
}
const cu = /* @__PURE__ */ new Map([
  // --- Google Docs ---
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.google-apps.document"
  ],
  ["application/msword", "application/vnd.google-apps.document"],
  ["application/rtf", "application/vnd.google-apps.document"],
  ["text/plain", "application/vnd.google-apps.document"],
  [
    "application/vnd.oasis.opendocument.text",
    "application/vnd.google-apps.document"
  ],
  ["application/pdf", "application/vnd.google-apps.document"],
  // OCR Triggers here
  ["image/jpeg", "application/vnd.google-apps.document"],
  ["image/png", "application/vnd.google-apps.document"],
  ["image/gif", "application/vnd.google-apps.document"],
  ["image/bmp", "application/vnd.google-apps.document"],
  // --- Google Sheets ---
  [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.google-apps.spreadsheet"
  ],
  ["application/vnd.ms-excel", "application/vnd.google-apps.spreadsheet"],
  ["text/csv", "application/vnd.google-apps.spreadsheet"],
  ["text/tab-separated-values", "application/vnd.google-apps.spreadsheet"],
  [
    "application/vnd.oasis.opendocument.spreadsheet",
    "application/vnd.google-apps.spreadsheet"
  ],
  // --- Google Slides ---
  [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.google-apps.presentation"
  ],
  ["application/vnd.ms-powerpoint", "application/vnd.google-apps.presentation"],
  [
    "application/vnd.oasis.opendocument.presentation",
    "application/vnd.google-apps.presentation"
  ]
]);
function OC(n, e) {
  const t = wo.getType(n) || "application/octet-stream";
  let r = t;
  return e && cu.has(t) && (r = cu.get(t)), { sourceMime: t, targetMime: r };
}
function jC(n) {
  return { ...Sn(RC(n)) };
}
function RC(n) {
  const { fileSystem: e, moduleArgs: t } = n;
  return [
    pe(
      {
        name: "google_drive_upload_file",
        description: P`
Uploads a VFS file to Google Drive. Supports automatic conversion of office formats (like PPTX, DOCX, XLSX) into Google Workspace formats.

`,
        parameters: {
          name: I.string().describe(P`
The user-friendly name of the file that will show up in Drive list
`),
          file_path: I.string().describe(P`

The VFS path to the file to upload.

`),
          convert: I.boolean().describe(
            P`

If true, converts Office documents or CSVs into Google Docs/Slides/Sheets.

`
          ).default(!0),
          parent: I.string().describe(
            P`
            
The Google Drive folder that will be the parent of this newly uploaded file`
          ).optional(),
          ...Ye
        },
        response: {
          file_path: I.string().describe(
            P`
The VFS path that points at the generated Google Doc.
`
          ).optional(),
          error: I.string().describe(
            P`

If an error has occurred, will contain a description of the error
`
          ).optional()
        }
      },
      async ({ file_path: r, name: s, convert: i, parent: a, status_update: o }, l) => {
        l(o || `Uploading "${s}" to Google Drive`);
        const c = await e.get(r);
        if (!w(c))
          return { error: c.$error };
        const d = c.at(0), { sourceMime: p, targetMime: h } = OC(
          r,
          i
        );
        let f;
        if ("text" in d)
          f = new Blob([d.text], { type: p });
        else if ("inlineData" in d || "storedData" in d)
          try {
            f = await Ku(d);
          } catch (x) {
            return { error: x.message };
          }
        else
          return {
            error: `Unable to retrieve file "${r}": this functionality is not yet implemented`
          };
        const y = await rf(
          t,
          { name: s, mimeType: h, parents: a ? [a] : void 0 },
          f
        );
        if (!w(y))
          return { error: y.$error };
        const v = e.add({
          storedData: {
            mimeType: h,
            handle: `drive:/${y.id}`
          }
        });
        return w(v) ? { file_path: v } : v;
      }
    ),
    pe(
      {
        name: "google_drive_create_folder",
        description: P`
Creates a new Google Drive folder.
`,
        parameters: {
          name: I.string().describe(P`
The user-friendly name of the file that will show up in Drive list
`),
          parent: I.string().describe(
            P`
            
The Google Drive folder that will be the parent of this newly created folder`
          ).optional(),
          ...Ye
        },
        response: {
          folder_id: I.string().describe(
            P`
The Google Drive Folder ID of the newly created folder`
          ).optional(),
          error: I.string().describe(
            P`

If an error has occurred, will contain a description of the error
`
          ).optional()
        }
      },
      async ({ name: r, parent: s, status_update: i }, a) => {
        a(
          i || `Creating "${r}" folder in Google Drive`
        );
        const l = await da(t, {
          name: r,
          mimeType: Rw,
          parents: s ? [s] : void 0
        });
        return w(l) ? { folder_id: l.id } : { error: l.$error };
      }
    )
  ];
}
class DC {
  constructor(e, t) {
    this.agentContext = e, this.fileSystem = t;
  }
  #e;
  /**
   * Starts a new run or resumes a previous failed run.
   * Returns the initial contents array and whether this is a resumption.
   */
  startOrResume(e, t) {
    if (!e)
      return { contents: [t], isResuming: !1 };
    const r = this.#t(e);
    if (r) {
      const s = [
        t,
        ...this.#n(r)
      ];
      return console.log(
        `Resuming run ${r.id} from turn ${r.lastCompleteTurnIndex + 1}`
      ), { contents: s, isResuming: !0 };
    }
    return this.#e = this.agentContext.createRun(e, t), { contents: [t], isResuming: !1 };
  }
  /**
   * Starts a fresh run without attempting to resume a previous one.
   * Used when resumability is disabled via feature flag.
   */
  startFresh(e, t) {
    return e && (this.#e = this.agentContext.createRun(e, t)), { contents: [t], isResuming: !1 };
  }
  /**
   * Tracks a content item in the current run.
   */
  pushContent(e) {
    this.#e && this.#e.contents.push(e);
  }
  /**
   * Increments the turn index after a complete turn.
   */
  completeTurn() {
    this.#e && this.#e.lastCompleteTurnIndex++;
  }
  /**
   * Captures the request body on the first request only.
   */
  captureRequestBody(e, t) {
    this.#e && !this.#e.requestBody && (this.#e.model = e, this.#e.requestBody = t);
  }
  /**
   * Marks run as failed and captures files, returning the error for pass-through.
   * Filters out any contents with $error parts before saving.
   */
  fail(e) {
    return this.#e && (this.#e.status = "failed", this.#e.error = e.$error, this.#e.endTime = Date.now(), this.#e.contents = this.#e.contents.filter(
      (t) => !t.parts?.some(
        (r) => "$error" in r || r.$error
      )
    ), this.#r()), e;
  }
  /**
   * Marks run as completed and captures files.
   */
  complete() {
    this.#e && (this.#e.status = "completed", this.#e.endTime = Date.now(), this.#r());
  }
  /**
   * Finds a resumable failed run for the given step ID.
   */
  #t(e) {
    const t = this.agentContext.getRun(e);
    return t?.status === "failed" && t.resumable ? t : void 0;
  }
  /**
   * Restores state from a previous failed run.
   * Trims trailing model turns so the conversation ends on a user turn.
   */
  #n(e) {
    this.fileSystem.restoreFrom(e.files), this.#e = e, e.status = "running", e.error = void 0;
    const t = [...e.contents];
    for (; t.length > 0 && t.at(-1)?.role === "model"; )
      t.pop();
    return t;
  }
  /**
   * Captures current file system state into run state.
   */
  #r() {
    if (this.#e)
      for (const [e, t] of this.fileSystem.files)
        this.#e.files[e] = { ...t };
  }
}
const UC = {
  streamContent: rh,
  conformBody: dl,
  callImage: Yi,
  callVideo: Bl,
  callAudio: zl,
  callMusic: Ll
}, Ga = "gemini-3-flash-preview";
class NC {
  constructor(e, t) {
    this.caps = e, this.moduleArgs = t, this.memoryManager = t.agentContext.memoryManager, this.fileSystem = new Wf({
      context: t.context,
      memoryManager: this.memoryManager
    }), this.translator = new Bf(e, t, this.fileSystem), this.ui = new P$(e, t, this.translator), this.taskTreeManager = new YI(this.fileSystem), this.runStateManager = new DC(
      t.agentContext,
      this.fileSystem
    );
  }
  async run({
    objective: e,
    params: t,
    uiPrompt: r,
    uiType: s = "chat",
    extraInstruction: i = "",
    modelConstraint: a = "none"
  }) {
    const {
      caps: o,
      moduleArgs: l,
      fileSystem: c,
      translator: d,
      ui: p,
      memoryManager: h,
      taskTreeManager: f
    } = this;
    p.progress.startAgent(e);
    try {
      const u = await d.toPidgin(
        e,
        t,
        !0
      );
      if (!w(u)) return u;
      c.setUseMemory(u.useMemory), i && (i = `${i}

`);
      const y = this.moduleArgs.context.currentStep?.id, v = J`<objective>${i}${u.text}</objective>`.asContent(), m = (await l.context.flags?.flags())?.enableResumeAgentRun ?? !1, { contents: b } = m ? this.runStateManager.startOrResume(y, v) : this.runStateManager.startFresh(y, v);
      let g = !1, _ = {
        success: !1,
        href: "",
        objective_outcome: ""
      };
      const $ = [];
      if ($.push(
        KI({
          fileSystem: c,
          translator: d,
          taskTreeManager: f,
          failureCallback: (V) => {
            g = !0, _ = {
              success: !1,
              href: "/",
              objective_outcome: V
            };
          },
          successCallback: (V, L) => {
            const ne = c.getOriginalRoute(V);
            if (!w(ne)) return ne;
            g = !0, _ = {
              success: !0,
              href: ne,
              objective_outcome: L
            };
          }
        })
      ), $.push(
        i$({
          fileSystem: c,
          caps: o,
          moduleArgs: l,
          translator: d,
          modelConstraint: a,
          taskTreeManager: f,
          generators: UC
        })
      ), u.useMemory && $.push(
        O$({
          context: l.context,
          translator: d,
          fileSystem: c,
          memoryManager: h,
          taskTreeManager: f
        })
      ), s === "a2ui") {
        const V = await PC({
          caps: o,
          moduleArgs: l,
          fileSystem: c,
          translator: d,
          ui: p,
          uiPrompt: r,
          objective: e,
          params: t
        });
        if (!w(V)) return V;
        $.push(V);
      } else s === "chat" ? (c.addSystemFile(
        sm,
        () => JSON.stringify(p.chatLog)
      ), $.push(
        U$({ chatManager: p, translator: d, taskTreeManager: f })
      )) : $.push(MC());
      await l.context.flags?.flags() && $.push(
        jC({ fileSystem: c, moduleArgs: l })
      );
      const A = u.tools.list().at(0), R = [
        {
          ...A,
          functionDeclarations: [
            ...A?.functionDeclarations || [],
            ...$.flatMap((V) => V.declarations)
          ]
        }
      ], K = new Map([
        ...$.flatMap((V) => V.definitions)
      ]);
      for (; !g; ) {
        const V = {
          contents: b,
          generationConfig: {
            temperature: 1,
            topP: 1,
            thinkingConfig: { includeThoughts: !0, thinkingBudget: -1 }
          },
          systemInstruction: J`${$.flatMap((qe) => qe.instruction).filter((qe) => qe !== void 0).join(`

`)}`.asContent(),
          toolConfig: {
            functionCallingConfig: { mode: "ANY" }
          },
          tools: R
        }, L = await dl(l, V);
        if (!w(L))
          return this.runStateManager.fail(L);
        p.progress.sendRequest(Ga, L), this.runStateManager.captureRequestBody(Ga, L);
        const ne = await rh(
          Ga,
          L,
          l
        );
        if (!w(ne))
          return this.runStateManager.fail(ne);
        const xe = new c$(
          K,
          u.tools
        );
        for await (const qe of ne) {
          const Oe = qe.candidates?.at(0)?.content;
          if (!Oe)
            return this.runStateManager.fail(
              k("Agent unable to proceed: no content in Gemini response")
            );
          b.push(Oe), this.runStateManager.pushContent(Oe);
          const ir = Oe.parts || [];
          for (const Xe of ir)
            Xe.thought && ("text" in Xe ? p.progress.thought(Xe.text) : console.log("INVALID THOUGHT", Xe)), "functionCall" in Xe && (p.progress.functionCall(Xe), xe.call(
              Xe,
              (ar, nn) => p.progress.functionCallUpdate(Xe, ar, nn)
            ));
        }
        const $e = await xe.getResults();
        if ($e) {
          if (!w($e))
            return this.runStateManager.fail(
              k(`Agent unable to proceed: ${$e.$error}`)
            );
          p.progress.functionResult($e), b.push($e), this.runStateManager.pushContent($e), this.runStateManager.completeTurn();
        }
      }
      return this.#e(_);
    } catch (u) {
      const y = u instanceof Error ? u.message : String(u);
      return this.runStateManager.fail(k(`Agent error: ${y}`));
    } finally {
      p.finish();
    }
  }
  async #e(e) {
    const { success: t, href: r, objective_outcome: s } = e;
    if (!t)
      return this.runStateManager.fail(k(s));
    this.runStateManager.complete();
    const i = await this.translator.fromPidginString(s);
    if (!w(i)) return i;
    const a = [...this.fileSystem.files.keys()], o = [], l = (await Promise.all(
      a.map(async (c) => {
        const d = await this.translator.fromPidginFiles([c]);
        return w(d) ? { path: c, content: d } : (o.push(d.$error), []);
      })
    )).flat();
    return o.length > 0 ? k(o.join(",")) : { success: t, href: r, outcomes: i, intermediate: l };
  }
}
function Jl(n, { "b-ui-consistent": e = !1 }) {
  const t = n?.consistentUI && e ? {
    "b-ui-prompt": {
      type: "object",
      behavior: ["llm-content", "config", "hint-advanced"],
      title: "UI Layout instructions",
      description: "Instructions for UI layout"
    }
  } : {}, r = n?.consistentUI ? {
    "b-ui-consistent": {
      type: "boolean",
      title: "Use A2UI",
      behavior: ["config", "hint-advanced", "reactive"]
    }
  } : {};
  return {
    config$prompt: {
      type: "object",
      behavior: ["llm-content", "config", "hint-preview"],
      title: "Objective",
      description: "The objective for the agent"
    },
    ...r,
    ...t
  };
}
async function cm({
  config$prompt: n,
  "b-ui-consistent": e = !1,
  "b-ui-prompt": t,
  "b-si-instruction": r,
  "b-si-constraint": s,
  ...i
}, a, o) {
  const l = Object.fromEntries(
    Object.entries(i).filter(([f]) => f.startsWith("p-z-"))
  ), d = await new NC(a, o).run({
    objective: n,
    params: l,
    extraInstruction: r,
    uiType: e ? "a2ui" : "chat",
    uiPrompt: t,
    modelConstraint: s
  });
  if (!w(d)) return d;
  console.log("LOOP", d);
  const p = [];
  d.outcomes && p.push(d.outcomes);
  let h = d.href;
  return (!h || h === "/") && (h = "context"), { [h]: p };
}
async function GC({ inputs: { config$prompt: n, ...e } }, t, r) {
  const s = await Ps(r), i = Jl(s, e), a = new q(t, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        ...i,
        ...a.schemas()
      },
      behavior: ["at-wireable"],
      ...a.requireds(),
      additionalProperties: !1
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["main-port", "hint-text"]
        }
      },
      additionalProperties: !1
    },
    title: "Agent",
    description: "Iteratively works to solve the stated objective",
    metadata: {
      icon: "generative-search",
      tags: ["quick-access", "generative"],
      order: 101
    }
  };
}
const FC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  computeAgentSchema: Jl,
  default: cm,
  describe: GC
}, Symbol.toStringTag, { value: "Module" })), zC = "Agent", LC = "", WC = "0.0.1", BC = [], qC = [], HC = { comments: [{ id: "comment-cc94afe8", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 531, y: 374, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "5f3ca599-8fee-46fb-951f-0d47b16a6d56": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "5f3ca599-8fee-46fb-951f-0d47b16a6d56" } }, tags: ["published", "tool", "component"], userModified: !0 }, VC = { a2: { url: "./a2.bgl.json" } }, YC = {}, JC = ["#module:main"], KC = {}, ZC = {
  title: zC,
  description: LC,
  version: WC,
  nodes: BC,
  edges: qC,
  metadata: HC,
  imports: VC,
  modules: YC,
  exports: JC,
  assets: KC
}, dm = {
  main: FC
}, XC = it(ZC, dm), QC = "A2 Audio Generation", eT = "", tT = "0.0.1", nT = [], rT = [], sT = { comments: [{ id: "comment-cc94afe8", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 531, y: 374, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "5f3ca599-8fee-46fb-951f-0d47b16a6d56": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "5f3ca599-8fee-46fb-951f-0d47b16a6d56" } }, tags: ["published", "tool", "component"] }, iT = {}, aT = { a2: { url: "./a2.bgl.json" } }, oT = ["#module:main"], lT = {
  title: QC,
  description: eT,
  version: tT,
  nodes: nT,
  edges: rT,
  metadata: sT,
  modules: iT,
  imports: aT,
  exports: oT
}, pm = {
  main: DI
}, cT = it(lT, pm), dT = "https://staging-appcatalyst.sandbox.googleapis.com/v1beta1/executeAgentNodeStream";
async function pT(n) {
  const e = await n.read({ path: "/env/settings/opalAdkBackend" });
  if (S(e)) {
    const t = e.data?.at(0)?.parts?.at(0);
    if (t && "json" in t) {
      const r = t.json;
      if (r?.endpoint_url) {
        const s = new URL(r.endpoint_url);
        return s.pathname = "/v1beta1/executeAgentNodeStream", s.toString();
      }
    }
  }
  return dT;
}
function uT(n, e = "deep_research") {
  const t = [];
  let r = 0;
  for (const s of n)
    if (s.parts)
      for (const i of s.parts)
        "text" in i && (r++, t.push({
          parts: [
            {
              text: i.text,
              partMetadata: { input_name: `text_${r}` }
            }
          ],
          role: "user"
        }));
  return {
    node_api: e,
    contents: t
  };
}
async function hT(n, e, t, r) {
  const s = ol(e, {
    title: `Executing Opal Adk with ${r}`,
    icon: "spark"
  });
  try {
    s.addJson("Preparing request", { opal_adk_agent: r }, "upload");
    const i = await pT(n), a = new URL(i);
    a.searchParams.set("alt", "sse");
    const o = uT(t, r);
    n.write({
      path: `/mnt/track/call_${r}`,
      data: []
    });
    const l = await e.fetchWithCreds(a.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(o),
      signal: e.context.signal
    });
    if (!l.ok) {
      const p = await l.text();
      return s.addError(
        E(`Streaming request failed: ${l.status} ${p}`)
      );
    }
    if (!l.body)
      return s.addError(E("No response body from streaming API"));
    let c = "", d = 0;
    for await (const p of ll(l.body))
      if (!(!p || !p.parts))
        for (const h of p.parts) {
          const f = h.partMetadata?.chunk_type, u = h.text || "";
          if (f === "thought")
            d++, s.addText(`Thinking (${d})`, u, "spark");
          else if (f === "result")
            c = u, s.addText("Agent Thought", c, "spark");
          else if (f === "error")
            return s.addError(E(`Generation error: ${u}`));
        }
    return c ? B(c, "model") : s.addError(E("No research result received from stream"));
  } catch (i) {
    return s.addError(E(i.message));
  } finally {
    s.finish();
  }
}
function um() {
  return "Do deep, iterative research to fulfill the following objective:";
}
const hm = [
  {
    url: "embed://a2/tools.bgl.json#module:search-web",
    title: "Search Web"
  },
  {
    url: "embed://a2/tools.bgl.json#module:get-webpage",
    title: "Get Webpage"
  },
  {
    url: "embed://a2/tools.bgl.json#module:search-maps",
    title: "Search Maps"
  }
], fm = "gemini-2.5-flash", fT = 7;
function mT(n) {
  const e = n ? "first" : "next";
  return `You are a researcher.

Your job is to use the provided query to produce raw research that will be later turned into a detailed research report.
You are tasked with finding as much of relevant information as possible.

You examine the conversation context so far and come up with the ${e} step to produce the report,
using the conversation context as the the guide of steps taken so far and the outcomes recorded.

You do not ask user for feedback. You do not try to have a conversation with the user.
You know that the user will only ask you to proceed to next step.

Looking back at all that you've researched and the query/research plan, do you have enough to produce the detailed report? If so, you are done.

Now, provide a response. Your response must contain two parts:
Thought: a brief plain text reasoning why this is the right ${e} step and a description of what you will do in plain English.
Action: invoking the tools are your disposal, more than one if necessary. If you're done, do not invoke any tools.`;
}
function gT(n, e, t, r) {
  return {
    model: fm,
    body: {
      contents: Ot(
        J`
Do the research according about this topic:

---

${e}

---
`.asContent(),
        n
      ),
      tools: t,
      systemInstruction: B(mT(r)),
      safetySettings: We()
    }
  };
}
function yT() {
  return `You are a research report writer.
Your teammates produced a wealth of raw research about the supplied query.

Your task is to take the raw research and write a thorough, detailed research report that answers the provided query. Use markdown.

A report must additionally contain references to the source (always cite your sources).`;
}
function bT(n, e) {
  return {
    model: fm,
    body: {
      contents: [B(e.join(`

`))],
      systemInstruction: B(yT()),
      safetySettings: We()
    }
  };
}
async function vT(n, e, t) {
  const r = e.parts?.at(0);
  !r || !("text" in r) || await Pe(n, {
    actor: "Researcher",
    category: `Progress report, iteration ${t + 1}`,
    name: "Thought",
    icon: "generative",
    details: r.text.replace(/^Thought: ?/gm, "").replace(/^Action:.*$/gm, "").trim()
  });
}
async function wT({ context: n, query: e, ...t }, r, s) {
  const i = new q(r, e), a = new rt(
    r,
    s,
    new st(r, s)
  ), o = await i.substitute(
    t,
    async (c) => a.addTool(c)
  );
  if (!S(o))
    return o;
  const l = await hT(r, s, [o], "deep_research");
  return console.log("deep-research results", l), {
    context: [...n || [], l]
  };
}
async function xT({ context: n, query: e, summarize: t, ...r }, s, i) {
  console.log("calling deep research agent.");
  const a = hm.map((f) => f.url), o = new rt(
    s,
    i,
    new st(s, i)
  );
  let l = n || [B("Start the research")];
  const d = await new q(s, e).substitute(
    r,
    async (f) => o.addTool(f)
  );
  if (!S(d))
    return d;
  if (!o.hasTools() && !await o.initialize(a))
    return E("Unable to initialize tools");
  e = d;
  const p = [];
  for (let f = 0; f <= fT; f++) {
    const u = await Wn(
      gT(l, e, o.list(), f === 0),
      s,
      i
    );
    if (!S(u))
      return u;
    if ("context" in u)
      return E('Unexpected "context" response');
    const y = u.candidates.at(0)?.content;
    if (!y)
      return E("No actionable response");
    await vT(s, y, f);
    const v = await o.callTools(y, !0, []);
    if (!S(v)) return v;
    const x = v.results || [];
    if (x.length === 0)
      break;
    p.push(
      ...x.map((m) => ST(m))
    ), l = [...l, y, ...x.flat()];
  }
  if (p.length === 0)
    return await Pe(s, {
      actor: "Researcher",
      category: "Error",
      name: "Error",
      details: "I was unable to obtain any research results"
    }), { context: n };
  if (t) {
    const f = await Wn(
      bT(e, p),
      s,
      i
    );
    if (!S(f))
      return f;
    if ("context" in f)
      return E('Unexpected "context" response');
    const u = f.candidates.at(0)?.content;
    return u ? { context: [...n || [], u] } : E("No actionable response");
  }
  const h = p.map((f) => JSON.parse(f).results);
  return {
    context: [...n || [], B(h.join(`


`))]
  };
}
async function mm({ context: n, query: e, summarize: t, ...r }, s, i) {
  return (await i.context.flags?.flags())?.opalAdk || !1 ? wT({ context: n, query: e, summarize: t, ...r }, s, i) : xT({ context: n, query: e, summarize: t, ...r }, s, i);
}
function _T(n) {
  if (n.length === 0) return "";
  if (n.length === 1) return n[0];
  if (n.length === 2) return n.join(" and ");
  const e = n.pop();
  return `${n.join(", ")}, and ${e}`;
}
function kT() {
  const n = "tool", e = hm.map(
    ({ url: t, title: r }) => q.part({ title: r, path: t, type: n })
  );
  return [
    JSON.stringify({
      query: B(
        `Research the topic provided using ${_T(e)} tools`
      )
    })
  ];
}
async function gm({ inputs: { query: n } }, e) {
  const t = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        query: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Research Query",
          description: "Provide a brief description of what to research, what areas to cover, etc."
        },
        summarize: {
          type: "boolean",
          behavior: ["config", "hint-preview", "hint-advanced"],
          icon: "summarize",
          title: "Summarize research",
          description: "If checked, the Researcher will summarize the results of the research and only pass the research summary along."
        },
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds(),
      additionalProperties: !1,
      examples: kT()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["main-port", "hint-text"]
        }
      },
      additionalProperties: !1
    },
    title: "Do deep research",
    description: "Do deep research on the provided query",
    metadata: {
      icon: "generative-search",
      tags: ["quick-access", "generative"],
      order: 101
    }
  };
}
function ST(n) {
  const e = n.at(-1);
  return e ? e.parts.filter((t) => "functionResponse" in t).map((t) => {
    const r = t.functionResponse.response;
    return typeof r == "string" ? r : JSON.stringify(r);
  }).join(`

`) : "";
}
const IT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mm,
  describe: gm,
  makeDeepResearchInstruction: um
}, Symbol.toStringTag, { value: "Module" })), $T = "A2 Deep Research", CT = "", TT = "0.0.1", ET = [], PT = [], AT = { comments: [{ id: "comment-cc94afe8", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 531, y: 374, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "5f3ca599-8fee-46fb-951f-0d47b16a6d56": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "5f3ca599-8fee-46fb-951f-0d47b16a6d56" } }, tags: ["published", "tool", "component"] }, MT = {}, OT = { a2: { url: "./a2.bgl.json" } }, jT = ["#module:main"], RT = {
  title: $T,
  description: CT,
  version: TT,
  nodes: ET,
  edges: PT,
  metadata: AT,
  modules: MT,
  imports: OT,
  exports: jT
}, ym = {
  main: IT
}, DT = it(RT, ym);
function bm() {
  return {
    parts: [{ functionCall: { name: "User_Asks_For_More_Work", args: {} } }],
    role: "model"
  };
}
class vm {
  constructor(e, t) {
    this.name = e, this.description = t;
  }
  #e = !1;
  reset() {
    this.#e = !1;
  }
  get invoked() {
    return this.#e;
  }
  declaration() {
    return {
      name: this.name,
      description: this.description,
      parameters: { type: "object" }
    };
  }
  handle() {
    return {
      tool: this.declaration(),
      url: "",
      passContext: !1,
      invoke: async () => {
        this.#e = !0;
      }
    };
  }
}
function wm() {
  return new vm(
    "User_Says_Done",
    "Call when the user indicates they are done with the conversation and are ready to move on"
  );
}
function xm() {
  return new vm(
    "User_Asks_For_More_Work",
    "Call when the user asked a question or issued instruction to do more work"
  );
}
const UT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createDoneTool: wm,
  createKeepChattingResult: bm,
  createKeepChattingTool: xm
}, Symbol.toStringTag, { value: "Module" })), NT = 10;
function on({ pro: n }) {
  return n ? () => 'For this session, the user strongly prefers to use the "pro" model for "generate_text" function.' : () => "";
}
class GT {
  constructor(e, t, r) {
    this.caps = e, this.moduleArgs = t, this.sharedContext = r, this.invoke = this.invoke.bind(this);
  }
  #e = !1;
  async initialize() {
    const { sharedContext: e } = this, t = new q(this.caps, e.description), r = new rt(
      this.caps,
      this.moduleArgs,
      new st(this.caps, this.moduleArgs)
    ), s = wm(), i = xm(), a = await t.substitute(
      e.params,
      async (o) => r.addTool(o)
    );
    if (this.#e = r.hasTools(), e.chat && (r.addCustomTool(s.name, s.handle()), this.#e || r.addCustomTool(
      i.name,
      i.handle()
    )), !S(a))
      return a;
    this.description = a, this.toolManager = r, this.doneTool = s, this.keepChattingTool = i, this.context = [...e.context, ...e.work];
  }
  createSystemInstruction() {
    return Gf(this.sharedContext.systemInstruction);
  }
  addKeepChattingResult(e) {
    return e.push(bm()), e;
  }
  /**
   * Invokes the text generator.
   * Significant mode flags:
   * - chat: boolean -- chat mode is on/off
   * - tools: boolean -- whether or not has tools
   * - makeList: boolean -- asked to generate a list
   * - isList: boolean -- is currently in list mode
   * - model: string -- the model to generate with
   */
  async invoke(e, t) {
    const { sharedContext: r } = this, s = this.toolManager, i = this.doneTool, a = this.keepChattingTool, o = We(), l = this.createSystemInstruction(), c = s.list(), d = this.firstTurn, p = this.chat && !d || this.#e, h = this.chat && d;
    let f;
    const y = [...!p && h ? this.addKeepChattingResult([e]) : [e], ...t], v = {
      body: { contents: y, safetySettings: o },
      model: r.model
    };
    p && (v.body.tools = [...c], this.toolManager.hasToolDeclarations() && (v.body.toolConfig = { functionCallingConfig: { mode: "ANY" } })), v.body.systemInstruction = l;
    const x = new Se(this.caps, this.moduleArgs, v, {
      toolManager: s
    }), m = await x.invoke();
    if (!S(m)) return m;
    const b = x.calledTools || i.invoked || a.invoked;
    if (x.saveOutputs)
      return du(m.last);
    if (b) {
      if (i.invoked)
        return m.last;
      if (x.calledCustomTools)
        f = m.last;
      else {
        a.invoked || y.push(...m.all);
        const _ = {
          model: r.model,
          body: { contents: y, systemInstruction: l, safetySettings: o }
        };
        p && (_.body.tools = [...c], console.log("adding tools"));
        const $ = !0;
        let j, A = 0;
        for (; $; ) {
          A > NT && s.hasToolDeclarations() && (_.body.toolConfig = {
            functionCallingConfig: {
              mode: "NONE"
            }
          });
          const R = new Se(
            this.caps,
            this.moduleArgs,
            _,
            { toolManager: s }
          ), K = await R.invoke();
          if (!S(K)) return K;
          if (R.saveOutputs)
            return du(K.last);
          if (!R.calledTools && !R.calledCustomTools) {
            j = K;
            break;
          }
          _.body.contents = [
            ..._.body.contents,
            ...K.all
          ], A++;
        }
        if (!j)
          return E('Invalid state: Somehow, "afterTools" is undefined.', {
            origin: "client",
            kind: "bug"
          });
        f = j.last;
      }
    } else
      f = m.last;
    return f;
  }
  get firstTurn() {
    return this.sharedContext.userInputs.length === 0;
  }
  get chat() {
    return this.sharedContext.chat;
  }
  get doneChatting() {
    return !!this.doneTool?.invoked;
  }
}
function Fa(n) {
  return { done: n };
}
function du(n) {
  return pl({
    parts: n.parts.filter((e) => !("functionResponse" in e)),
    role: n.role
  });
}
async function FT(n, e, t) {
  const r = t.at(-1), s = r;
  return await n.output({
    schema: {
      type: "object",
      properties: {
        "a-product": {
          type: "object",
          behavior: ["llm-content"],
          title: "Draft"
        }
      }
    },
    $metadata: {
      title: "Writer",
      description: "Asking user",
      icon: "generative-text"
    },
    "a-product": s
  }), {
    toInput: {
      type: "object",
      properties: {
        request: {
          type: "object",
          title: "Please provide feedback",
          description: "Provide feedback or click submit to continue",
          behavior: ["transient", "llm-content"],
          examples: [Mt()]
        }
      }
    },
    context: {
      ...e,
      work: t,
      last: r
    }
  };
}
async function ln({ context: n }, e, t) {
  if (!n.description) {
    const l = "Please provide a prompt for the step";
    return await Pe(e, {
      actor: "Text Generator",
      name: l,
      category: "Runtime error",
      details: "In order to run, I need to have an instruction."
    }), E(l, { origin: "client", kind: "config" });
  }
  const { userEndedChat: r, last: s } = n;
  if (r)
    return s ? Fa([...n.context, s]) : E("Chat ended without any work", {
      origin: "client",
      kind: "bug"
    });
  const i = new GT(e, t, n), a = await i.initialize();
  if (!S(a)) return a;
  const o = await i.invoke(i.description, i.context);
  if (!S(o)) return o;
  if (console.log("RESULT", o), i.doneChatting) {
    const l = n.work.at(-2);
    return l ? Fa([l]) : E(
      "Done chatting, but have nothing to pass along to next step.",
      { origin: "client", kind: "bug" }
    );
  }
  return i.chat && !r ? FT(e, i.sharedContext, [o]) : Fa([o]);
}
async function cn() {
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in"
        }
      }
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out"
        }
      }
    }
  };
}
const zT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ln,
  describe: cn,
  makeTextInstruction: on
}, Symbol.toStringTag, { value: "Module" }));
function _m(n) {
  return `You are a planner. 
You are to create a precise plan -- a list of tasks -- for a given objective. This plan will be executed by others.

${n}

Your responsibility is to produce a plan that fulfills the objective.

Examine the objective, slow down, take a deep breath.
Now think: how might you break the objective into tasks that, when all completed, will fulfill the objective?
Now write out the tasks. Do not add any superflous tasks.

For each task, also think of a brief label that describes that task and could be used in a UI as a hint to the user.

If multiple tools are mentioned in the objective, make sure to mention them all in the task so that whoever
executes the task can decide which tool to use.
`;
}
function km(n) {
  const e = n ? {
    summarizeResults: {
      type: "boolean",
      description: "Set to true if and only if the objective calls for summarizing results at the end. Set to false otherwise."
    }
  } : {}, t = ["thinking", "todo"];
  return n && t.push(...Object.keys(e)), {
    type: "object",
    properties: {
      thinking: {
        type: "string",
        description: "Brief reasoning on why these steps are the right steps to fulfill the objective."
      },
      todo: {
        type: "array",
        items: {
          type: "object",
          properties: {
            task: {
              type: "string",
              description: "The task description. Use action-oriented language, starting with a verb that fits the task."
            },
            label: {
              description: "Short, precise label for that describes the task.",
              type: "string"
            }
          },
          required: ["task", "label"]
        }
      },
      ...e
    },
    required: t
  };
}
function ys(n) {
  const e = n.parts.at(0);
  return !e || !("json" in e) ? E("Gemini generated invalid plan") : (console.log("PLAN", e.json), e.json);
}
function LT(n, e) {
  return {
    ...e,
    parts: [...e.parts, { text: n }]
  };
}
function Sm(n, e, t, r, s, i, a) {
  const o = J`
${_m(a)}

Your objective is:

\`\`\`

${r}

\`\`\`

Your original plan was:

\`\`\`json
${JSON.stringify(s)}
\`\`\`

So far, you've completed these steps:

${i.map((c) => `- ${c}`).join(`
`)}

Update the plan to ensure that the steps that follow achieve the objective.
Pay particular attention to steps that did not complete successfully and strategize
different approaches and steps that might be necesssary to complete them.

Only add steps to the plan that still need to be completed.
Do not return completed steps as part of the updated plan.
If no more steps are needed, return no steps.
`.asContent(), l = [...t, o];
  return new Se(n, e, {
    body: {
      contents: l,
      safetySettings: We(),
      generationConfig: {
        responseSchema: km(!0),
        responseMimeType: "application/json"
      }
    }
  });
}
function ma(n, e, t, r, s, i) {
  t ??= [];
  const a = `${_m(s)}`, o = [...t, LT(a, r)];
  return new Se(n, e, {
    body: {
      contents: o,
      safetySettings: We(),
      generationConfig: {
        responseSchema: km(i),
        responseMimeType: "application/json"
      }
    }
  });
}
const WT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPlan: ys,
  plannerPrompt: ma,
  thinkingPlannerPrompt: Sm
}, Symbol.toStringTag, { value: "Module" }));
class Im {
  constructor() {
    this.name = "All at once", this.extraPlannerPrompt = `
All tasks in the plan will be executed in any order or all at once, so make sure that the tasks don't depend on each other.
Think carefully: for every task in the list, does any task depend on another task? If so, rethink your list
until all tasks are indepedent`;
  }
  async execute(e, t, r, s, i) {
    const a = await ma(
      e,
      t,
      s,
      i,
      this.extraPlannerPrompt,
      !1
    ).invoke();
    if (!S(a)) return a;
    const o = ys(a.last);
    return S(o) ? (await Pe(e, {
      actor: "Planner",
      category: "Creating a plan",
      name: "Here's my list",
      icon: "laps",
      details: `
${o.todo.map((l) => `- ${l.label}`).join(`
`)}

I will now work on all items at the same time.`
    }), (await Promise.all(o.todo.map(r))).filter((l) => !!l)) : o;
  }
}
const BT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ParallelStrategist: Im
}, Symbol.toStringTag, { value: "Module" }));
function Kl() {
  return J`You are working as part of an AI system, so no chit-chat and no explaining what you're doing and why.
DO NOT start with "Okay", or "Alright" or any preambles. Just the output, please.`.asContent();
}
const qT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defaultSystemInstruction: Kl
}, Symbol.toStringTag, { value: "Module" }));
function HT() {
  return Math.random().toString(36).substring(2, 5);
}
class $m {
  constructor(e, t, r, s) {
    this.caps = e, this.moduleArgs = t, this.toolManager = s, this.errors = [], this.context = r ? [...r] : [], this.execute = this.#e.bind(this);
  }
  async executeStrategy(e, t) {
    return t.execute(
      this.caps,
      this.moduleArgs,
      this.execute,
      this.context,
      e
    );
  }
  async #e(e) {
    const { toolManager: t, context: r, errors: s } = this, i = B(e.task);
    let a, o = {};
    t.hasTools() ? (o = {
      toolConfig: {
        functionCallingConfig: {
          mode: "ANY"
        }
      }
    }, a = [...r, B(e.task)]) : a = [...r, i];
    const l = new Se(
      this.caps,
      this.moduleArgs,
      {
        body: {
          contents: a,
          tools: t.list(),
          ...o
        },
        systemInstruction: Kl()
      },
      {
        toolManager: t,
        allowToolErrors: !0
      }
    ), c = await l.invoke();
    if (!S(c)) {
      s.push(c.$error);
      return;
    }
    return l.calledTools ? VT(c.last) : c.last;
  }
}
function VT(n) {
  return { parts: n.parts.map((t) => "functionResponse" in t ? {
    text: JSON.stringify(t.functionResponse.response)
  } : t), role: n.role || "user" };
}
const YT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Runtime: $m,
  generateId: HT
}, Symbol.toStringTag, { value: "Module" }));
class Cm {
  constructor() {
    this.name = "Go in order", this.extraPlannerPrompt = `
All tasks in the plan will be executed in sequence, building on each other.`;
  }
  async execute(e, t, r, s, i) {
    const a = await ma(
      e,
      t,
      s,
      i,
      this.extraPlannerPrompt,
      !1
    ).invoke();
    if (!S(a)) return a;
    const o = ys(a.last);
    if (!S(o)) return o;
    await Pe(e, {
      actor: "Planner",
      category: "Creating a list",
      name: "Here's my list",
      icon: "laps",
      details: `
${o.todo.map((c) => `1. ${c.label}`).join(`
`)}

I will now go over the list in order.`
    });
    const l = [];
    for (const c of o.todo) {
      await Pe(e, {
        actor: "Worker",
        category: "Working on a list item",
        name: "Item",
        icon: "laps",
        details: `Currently working on:
  
  ${c.task}
  `
      });
      const d = await r(c);
      d && (s.push(B(c.task), d), l.push(d));
    }
    return l;
  }
}
const JT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SequentialStrategist: Cm
}, Symbol.toStringTag, { value: "Module" }));
function Zl(n, e, t, r) {
  const s = {
    parts: t.flatMap((o) => o.parts)
  }, i = J`
You are an expert organizer of raw material. This raw material was produced by 
an AI agent that was tasked with satisfying the the provided objective.

Your job is to examine in detail and organize the provided raw material into
a thorough, detailed write-up that captures all of it in one place, so that
the final product is a perfect response to the objective.

The final must product must contain references to the sources (always cite your sources).

## Objective

${r}

## Raw Research

\`\`\`
${s}

\`\`\`
`.asContent(), a = new Se(n, e, {
    body: {
      systemInstruction: Kl(),
      contents: [i],
      safetySettings: We()
    }
  });
  return {
    invoke: async () => {
      const o = await a.invoke();
      if (!S(o)) return o;
      const l = o.last;
      return {
        ...o,
        last: l
      };
    }
  };
}
const KT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  organizerPrompt: Zl
}, Symbol.toStringTag, { value: "Module" })), ZT = 10;
class Tm {
  constructor() {
    this.name = "Think as I go", this.tasks = [], this.extraPlannerPrompt = `
If the objective calls to organize or summarize results at the end, do not add that as a step.
Instead, set the "organizeResults" property to "true". This will let the organizing agent know
to kick off the organizing task after you're done.

When the objective does not explicitly contain the request to organize or summarize results,
make sure to set the "organizeProperty" to "false". Do not invent new work.

Now think real hard: do you need to organize or summarize results?
`;
  }
  async execute(e, t, r, s, i) {
    const a = await ma(
      e,
      t,
      s,
      i,
      this.extraPlannerPrompt,
      !0
    ).invoke();
    if (!S(a)) return a;
    let o = ys(a.last);
    if (!S(o)) return o;
    const l = [];
    let c = o.todo.length + ZT, d = !1, p = "Here is my starting plan";
    for (; --c; ) {
      const h = o.todo.at(0);
      if (o.summarizeResults && (d = !0), !h) break;
      await Pe(e, {
        actor: "Planner",
        category: "Progress update",
        name: "Thinking",
        icon: "laps",
        details: `

Here's my thinking:

${o.thinking}
        
${p}:

${o.todo.map((v) => `1. ${v.label}`).join(`
`)}

I will now go over the plan in order, thinking after each step
and adjusting the plan if necessary.`
      });
      const f = await r(h);
      f && (s.push(B(h.task), f), l.push(f)), this.tasks.push(h.task);
      const u = await Sm(
        e,
        t,
        s,
        i,
        o,
        this.tasks,
        this.extraPlannerPrompt
      ).invoke();
      if (!S(u)) return u;
      const y = ys(u.last);
      if (!S(y)) return y;
      o = y, p = "Here are the remaining steps in the plan";
    }
    if (d) {
      await Pe(e, {
        actor: "Planner",
        category: "Organizing work into a report",
        name: "Organizing work report",
        icon: "laps",
        details: "I will now organize all of my work into a report."
      });
      const h = await Zl(
        e,
        t,
        l,
        i
      ).invoke();
      return S(h) ? [h.last] : h;
    }
    return l;
  }
}
const XT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThinkStrategist: Tm
}, Symbol.toStringTag, { value: "Module" })), Em = (n) => {
  let e;
  return n.strategy === Tt[1].name ? e = "Plan tasks as a sequence, anticipating that each next task will depend on the previous one:" : n.strategy === Tt[2].name ? e = "Plan as you go, anticipating that each next task result will affect the rest of the plan" : e = "Plan all tasks and do them at once, in parallel:", `Carefully plan and execute to fulfill the objective below. ${e}`;
}, Tt = [
  new Im(),
  new Cm(),
  new Tm()
];
function QT(n) {
  return n ? Tt.find((e) => e.name === n) : Tt[0];
}
async function Pm({ context: n, plan: e, strategy: t, ...r }, s, i) {
  const a = new rt(
    s,
    i,
    new st(s, i)
  ), l = await new q(s, e).substitute(
    r,
    async (f) => a.addTool(f)
  );
  if (!S(l)) return l;
  const c = QT(t);
  if (!c)
    return E(`Unknown strategy: "${t}"`);
  const p = await new $m(s, i, n, a).executeStrategy(l, c);
  return S(p) ? { context: [{
    role: "model",
    parts: p.flatMap((f) => f.parts)
  }] } : p;
}
async function Am({ inputs: { plan: n } }, e) {
  const t = new q(e, n), r = await $l(e), s = S(r) && !!r["Show Experimental Components"];
  let i = {};
  return s && (i = {
    // "z-list": {
    //   type: "boolean",
    //   title: "Make a list",
    //   behavior: ["config", "hint-preview", "hint-advanced"],
    //   icon: "summarize",
    //   description:
    //     "When checked, this step will try to create a list as its output. Make sure that the prompt asks for a list of some sort",
    // },
  }), {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        plan: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Objective",
          description: "Describe what will be turned into a list and then gone over"
        },
        strategy: {
          title: "Strategy",
          description: `How to go over the list: 
"${Tt[0].name}" is fastest, working in parallel. 
"${Tt[1].name}" will build on previous work.
"${Tt[2].name}" will think after each step adjust the list if necessary`,
          type: "string",
          behavior: ["config", "hint-preview", "hint-advanced"],
          enum: Tt.map((a) => a.name),
          icon: "joiner",
          default: Tt[0].name
        },
        ...i,
        ...t.schemas()
      },
      behavior: ["at-wireable"],
      ...t.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Results",
          behavior: ["main-port"]
        }
      },
      additionalProperties: !1
    },
    title: "Plan and Execute",
    description: "Break an objective into tasks and then execute them",
    metadata: {
      icon: "laps",
      tags: ["quick-access", "generative", "experimental"],
      order: 102
    }
  };
}
const e0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pm,
  describe: Am,
  makeGoOverListInstruction: Em
}, Symbol.toStringTag, { value: "Module" })), Re = "config$prompt", En = "config$ask-user", fr = "generation has a daily limit", ga = [
  {
    id: "agent",
    type: "text",
    title: "Agent",
    description: "Agent can use any models",
    icon: "button_magic",
    modelName: "gemini-3-flash-preview",
    promptPlaceholderText: "Type your prompt here. Use @ to include other content.",
    portMap: /* @__PURE__ */ new Map([
      [Re, "description"],
      [En, "p-chat"]
    ]),
    makeInstruction: on({ pro: !1 }),
    modelConstraint: "none",
    invoke: ln,
    describe: cn
  },
  {
    id: "text-2.0-flash",
    type: "text",
    title: "Gemini 2.0 Flash",
    description: "Older model, use sparingly",
    hidden: !0,
    icon: "text_analysis",
    modelName: "gemini-2.0-flash",
    promptPlaceholderText: "Type your prompt here. Use @ to include other content.",
    portMap: /* @__PURE__ */ new Map([
      [Re, "description"],
      [En, "p-chat"]
    ]),
    makeInstruction: on({ pro: !1 }),
    modelConstraint: "text-flash",
    invoke: ln,
    describe: cn
  },
  {
    id: "text-3-flash",
    type: "text",
    title: "Gemini 3 Flash",
    description: "Best for everyday tasks",
    icon: "text_analysis",
    modelName: "gemini-3-flash-preview",
    promptPlaceholderText: "Type your prompt here. Use @ to include other content.",
    portMap: /* @__PURE__ */ new Map([
      [Re, "description"],
      [En, "p-chat"]
    ]),
    makeInstruction: on({ pro: !1 }),
    modelConstraint: "text-flash",
    invoke: ln,
    describe: cn
  },
  {
    id: "text",
    type: "text",
    title: "Gemini 2.5 Flash",
    description: "Good model for everyday tasks",
    icon: "text_analysis",
    modelName: "gemini-2.5-flash",
    promptPlaceholderText: "Type your prompt here. Use @ to include other content.",
    portMap: /* @__PURE__ */ new Map([
      [Re, "description"],
      [En, "p-chat"]
    ]),
    makeInstruction: on({ pro: !1 }),
    modelConstraint: "text-flash",
    invoke: ln,
    describe: cn
  },
  {
    id: "text-2.5-pro",
    type: "text",
    title: "Gemini 2.5 Pro",
    description: "Good model for complex tasks",
    icon: "text_analysis",
    modelName: "gemini-2.5-pro",
    promptPlaceholderText: "Type your prompt here. Use @ to include other content.",
    portMap: /* @__PURE__ */ new Map([
      [Re, "description"],
      [En, "p-chat"]
    ]),
    makeInstruction: on({ pro: !0 }),
    modelConstraint: "text-pro",
    invoke: ln,
    describe: cn
  },
  {
    id: "text-3-pro",
    type: "text",
    title: "Gemini 3 Pro",
    description: "Best for complex tasks",
    icon: "text_analysis",
    modelName: "gemini-3-pro-preview",
    promptPlaceholderText: "Type your prompt here. Use @ to include other content.",
    portMap: /* @__PURE__ */ new Map([
      [Re, "description"],
      [En, "p-chat"]
    ]),
    makeInstruction: on({ pro: !0 }),
    modelConstraint: "text-pro",
    invoke: ln,
    describe: cn
  },
  {
    id: "think",
    type: "think",
    title: "Plan and Execute with Gemini 2.5 Flash",
    description: "Plans and executes complex tasks",
    icon: "spark",
    modelName: "gemini-2.5-flash",
    promptPlaceholderText: "Type your goal here. Use @ to include other content.",
    portMap: /* @__PURE__ */ new Map([[Re, "plan"]]),
    makeInstruction: Em,
    modelConstraint: "none",
    invoke: Pm,
    describe: Am
  },
  {
    id: "deep-research",
    type: "deep-research",
    title: "Deep Research with Gemini 2.5 Flash",
    description: "In-depth research on your topic",
    icon: "spark",
    modelName: "gemini-2.5-flash",
    promptPlaceholderText: "Type your research query here. Use @ to include other content.",
    portMap: /* @__PURE__ */ new Map([[Re, "query"]]),
    makeInstruction: um,
    modelConstraint: "none",
    invoke: mm,
    describe: gm
  },
  {
    id: "image-gen",
    type: "image-gen",
    title: "Imagen 4",
    description: "Generates images from text",
    icon: "photo_spark",
    promptPlaceholderText: "Type your image prompt here. Use @ to include other content.",
    info: `Image ${fr}`,
    portMap: /* @__PURE__ */ new Map([[Re, "instruction"]]),
    makeInstruction: Oi({ pro: !1 }),
    modelConstraint: "image",
    invoke: Zh,
    describe: Xh
  },
  {
    id: "image",
    type: "image",
    title: "Nano Banana",
    description: "For image editing and generation",
    icon: "photo_spark",
    modelName: "ai_image_tool",
    promptPlaceholderText: "Type your image prompt here. Use @ to include other content.",
    info: "Image generation has limited free quota",
    portMap: /* @__PURE__ */ new Map([[Re, "instruction"]]),
    makeInstruction: Oi({ pro: !1 }),
    modelConstraint: "image",
    invoke: po,
    describe: uo
  },
  {
    id: "image-pro",
    type: "image",
    title: "Nano Banana Pro",
    description: "For complex visuals with text",
    icon: "photo_spark",
    modelName: "gemini-3-pro-image-preview",
    promptPlaceholderText: "Type your image prompt here. Use @ to include other content.",
    info: `Image ${fr}`,
    portMap: /* @__PURE__ */ new Map([[Re, "instruction"]]),
    makeInstruction: Oi({ pro: !0 }),
    modelConstraint: "image",
    invoke: po,
    describe: uo
  },
  {
    id: "audio",
    type: "audio",
    title: "AudioLM",
    description: "Generates speech from text",
    icon: "audio_magic_eraser",
    promptPlaceholderText: "Type the text to speak here. Use @ to include other content.",
    info: `Audio ${fr}`,
    portMap: /* @__PURE__ */ new Map([[Re, "text"]]),
    makeInstruction: Cf,
    modelConstraint: "speech",
    invoke: Tf,
    describe: Ef
  },
  {
    id: "video",
    type: "video",
    title: "Veo",
    description: "Generates videos from text and images",
    icon: "videocam_auto",
    promptPlaceholderText: "Type your video prompt here. Use @ to include other content.",
    info: `Video ${fr}`,
    portMap: /* @__PURE__ */ new Map([[Re, "instruction"]]),
    makeInstruction: Of,
    modelConstraint: "video",
    invoke: jf,
    describe: Rf
  },
  {
    id: "music",
    type: "music",
    title: "Lyria 2",
    description: "Generates instrumental music from text",
    icon: "audio_magic_eraser",
    promptPlaceholderText: "Type your music prompt here. Use @ to include other content.",
    info: `Music ${fr}`,
    portMap: /* @__PURE__ */ new Map([[Re, "text"]]),
    makeInstruction: Pf,
    modelConstraint: "music",
    invoke: Af,
    describe: Mf
  }
], t0 = [
  "agent",
  "text-3-flash",
  "text-3-pro",
  "image",
  "image-pro",
  "audio",
  "video",
  "music"
], n0 = ga.filter(({ id: n }) => t0.includes(n)), r0 = ga.filter(({ id: n }) => n !== "agent"), s0 = new Map(ga.map((n) => [n.id, n])), Mm = new Map(
  ga.map((n) => [n.id, n.portMap])
), i0 = new Map(
  Array.from(Mm.entries()).map(([n, e]) => {
    const t = /* @__PURE__ */ new Map();
    for (const [r, s] of e)
      t.set(s, r);
    return [n, t];
  })
);
function Om(n, e) {
  return Object.fromEntries(
    Object.entries(n).map(([t, r]) => [e.get(t) || t, r])
  );
}
function pu(n, e) {
  const t = Mm.get(n);
  return t ? Om(e, t) : e;
}
function uu(n, e) {
  const t = i0.get(n);
  return t ? Om(e, t) : e;
}
function jm(n, e) {
  const t = e?.agentMode ? n0 : r0, r = t[0], s = s0.get(n || r.id) || r;
  return { modes: t, current: s };
}
async function a0({ "generation-mode": n, ...e }, t, r) {
  const s = await Ps(r), { current: i } = jm(n, s);
  if (s?.agentMode)
    if (i.id === "agent") {
      const a = {
        "b-ui-consistent": !1,
        "b-ui-prompt": { parts: [] },
        ...e,
        "b-si-instruction": i.makeInstruction(e),
        "b-si-constraint": i.modelConstraint
      };
      return cm(a, t, r);
    } else {
      const { type: a, modelName: o } = i;
      return o && (e["p-model-name"] = o), i.invoke(pu(a, e), t, r);
    }
  else {
    const { type: a, modelName: o } = i;
    return o && (console.log(`Generating with ${o}`), e["p-model-name"] = o), i.invoke(pu(a, e), t, r);
  }
}
async function o0({ inputs: { "generation-mode": n, ...e }, asType: t }, r, s) {
  const i = {
    title: "Generate",
    description: "Uses Gemini to generate content and call tools",
    metadata: {
      icon: "generative",
      tags: ["quick-access", "generative", "generate"],
      order: 1
    }
  };
  if (t)
    return {
      ...i,
      inputSchema: {},
      outputSchema: {}
    };
  const a = await Ps(s), { current: o, modes: l } = jm(n, a), { type: c } = o;
  let d = {}, p = [];
  const h = await o.describe(
    { inputs: uu(c, e) },
    r,
    s
  );
  if (S(h) && (d = uu(
    c,
    h.inputSchema.properties || d
  ), p = h.inputSchema.behavior || []), a?.agentMode && o.id === "agent") {
    const f = Jl(a, e);
    d = { ...d, ...f };
  }
  return {
    title: "Generate",
    description: "Uses Gemini to generate content and call tools",
    metadata: {
      icon: "generative",
      tags: ["quick-access", "generative", "generate"],
      order: 1
    },
    inputSchema: {
      type: "object",
      properties: {
        "generation-mode": {
          type: "string",
          title: "Mode",
          enum: l,
          behavior: ["config", "hint-preview", "reactive", "hint-controller"]
        },
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        ...d
      },
      behavior: p
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["main-port"]
        }
      }
    }
  };
}
const l0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: a0,
  describe: o0
}, Symbol.toStringTag, { value: "Module" })), c0 = "A2 Generate", d0 = "", p0 = "0.0.1", u0 = [], h0 = [], f0 = { comments: [{ id: "comment-cc94afe8", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 531, y: 374, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "5f3ca599-8fee-46fb-951f-0d47b16a6d56": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "5f3ca599-8fee-46fb-951f-0d47b16a6d56" } }, tags: ["published", "tool", "component"], userModified: !0 }, m0 = { a2: { url: "./a2.bgl.json" } }, g0 = {}, y0 = ["#module:main"], b0 = {}, v0 = {
  title: c0,
  description: d0,
  version: p0,
  nodes: u0,
  edges: h0,
  metadata: f0,
  imports: m0,
  modules: g0,
  exports: y0,
  assets: b0
}, Rm = {
  main: l0
}, w0 = it(v0, Rm);
async function x0({
  context: n,
  "p-chat": e,
  "b-system-instruction": t,
  "p-model-name": r = "",
  description: s,
  ...i
}) {
  return e = !!e, n ??= [], {
    context: {
      id: Math.random().toString(36).substring(2, 5),
      chat: e,
      context: n,
      userInputs: [],
      defaultModel: r,
      model: r,
      description: s,
      type: "work",
      work: [],
      userEndedChat: !1,
      params: i,
      systemInstruction: t
    }
  };
}
async function _0({ inputs: { description: n } }, e) {
  const t = {
    "p-chat": {
      type: "boolean",
      title: "Review with user",
      behavior: ["config", "hint-preview", "hint-advanced"],
      icon: "chat",
      description: "When checked, this step will chat with the user, asking to review work, requesting additional information, etc."
    },
    "b-system-instruction": {
      type: "object",
      behavior: ["llm-content", "config", "hint-advanced"],
      title: "System Instruction",
      description: "The system instruction for the model",
      default: JSON.stringify(ha())
    },
    "p-model-name": {
      type: "string",
      behavior: ["llm-content"],
      title: "Model",
      description: "The specific model version to generate with"
    }
  }, r = new q(e, n);
  return {
    inputSchema: {
      type: "object",
      properties: {
        description: {
          type: "object",
          behavior: ["llm-content", "config", "hint-preview"],
          title: "Prompt",
          description: "Give the model additional context on what to do, like specific rules/guidelines to adhere to or specify behavior separate from the provided context.",
          default: Mt()
        },
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in",
          behavior: ["main-port"]
        },
        ...t,
        ...r.schemas()
      },
      behavior: ["at-wireable"],
      ...r.requireds()
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out",
          behavior: ["main-port", "hint-text"]
        }
      }
    },
    title: "Make Text",
    metadata: {
      icon: "generative-text",
      tags: ["quick-access", "generative"],
      order: 1
    }
  };
}
const k0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x0,
  describe: _0
}, Symbol.toStringTag, { value: "Module" }));
async function S0({ context: n, request: e }) {
  return n.userEndedChat = Dw(e), n.userInputs.push(e), n.userEndedChat || n.work.push(e), { context: n };
}
async function I0() {
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          title: "Agent Context",
          type: "object"
        },
        request: {
          title: "User Input",
          type: "object"
        }
      }
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          title: "Agent Context",
          type: "object"
        }
      }
    }
  };
}
const $0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: S0,
  describe: I0
}, Symbol.toStringTag, { value: "Module" }));
function C0() {
  return J`IMPORTANT NOTE: Start directly with the output, do not output any delimiters.
You are working as part of an AI system, so no chit-chat and no explainining what you're doing and why.
DO NOT start with "Okay", or "Alright" or any preambles.
Just the output, please.
Take a Deep Breath, read the instructions again, read the inputs again.
Each instruction is crucial and must be executed with utmost care and attention to detail.`.asContent();
}
function T0(n) {
  return n && (n = C0()), J`

Today is ${(/* @__PURE__ */ new Date()).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  })}
    
${n}`.asContent();
}
const E0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createSystemInstruction: T0
}, Symbol.toStringTag, { value: "Module" })), P0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), A0 = "Generate Text", M0 = "", O0 = "0.0.1", j0 = [], R0 = [], D0 = { comments: [{ id: "comment-cc94afe8", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 531, y: 374, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "5f3ca599-8fee-46fb-951f-0d47b16a6d56": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "5f3ca599-8fee-46fb-951f-0d47b16a6d56" } }, tags: ["published", "tool", "component"], userModified: !0 }, U0 = { a2: { url: "./a2.bgl.json" } }, N0 = { "daf082ca-c1aa-4aff-b2c8-abeb984ab66c": { title: "Make Text", description: "Generates text and so much more.", version: "0.0.1", describer: "module:entry", nodes: [{ type: "output", id: "output", configuration: { schema: { properties: { context: { type: "array", title: "Context", items: { type: "object", behavior: ["llm-content"] }, default: "null" } }, type: "object", required: [] } }, metadata: { visual: { x: 720, y: 0, collapsed: "expanded", outputHeight: 44 } } }, { id: "board-f138aa03", type: "#module:entry", metadata: { visual: { x: -46.99999999999966, y: -71.99999999999898, collapsed: "expanded", outputHeight: 44 }, title: "entry" } }, { id: "board-d340ad8f", type: "#module:main", metadata: { visual: { x: 340, y: 0, collapsed: "expanded", outputHeight: 44 }, title: "Generating draft", logLevel: "info" }, configuration: {} }, { id: "board-1946064a", type: "#module:join", metadata: { visual: { x: 1059.9999999999986, y: -159.99999999999886, collapsed: "expanded", outputHeight: 44 }, title: "join" } }, { type: "input", id: "input", metadata: { visual: { x: 720.0000000000005, y: 160.00000000000114, collapsed: "advanced", outputHeight: 44 }, title: "Waiting for user feedback", logLevel: "info" }, configuration: {} }], edges: [{ from: "board-f138aa03", to: "board-d340ad8f", out: "context", in: "context" }, { from: "board-d340ad8f", to: "output", out: "done", in: "context" }, { from: "input", to: "board-1946064a", out: "request", in: "request" }, { from: "board-d340ad8f", to: "input", out: "toInput", in: "schema" }, { from: "board-d340ad8f", to: "board-1946064a", out: "context", in: "context" }, { from: "board-1946064a", to: "board-d340ad8f", out: "context", in: "context" }], metadata: { visual: { minimized: !1 }, describer: "module:entry", tags: [] } } }, G0 = {}, F0 = ["#module:main"], z0 = { "@@thumbnail": { metadata: { title: "Thumbnail", type: "file" }, data: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICAKICAgICAgPHJlY3QgeD0iMTM5LjA1IgogICAgICAgICAgICAgICAgICAgIHk9Ijg3Ljg5IgogICAgICAgICAgICAgICAgICAgIHdpZHRoPSI0My43NSIKICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9IjI0LjIzIgogICAgICAgICAgICAgICAgICAgIHJ4PSIzLjUiCiAgICAgICAgICAgICAgICAgICAgZmlsbD0id2hpdGUiCiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPSIjMjBhMjAyIiAvPgo8cmVjdCB4PSIxMC4wMCIKICAgICAgICAgICAgICAgICAgICB5PSI3NS43NyIKICAgICAgICAgICAgICAgICAgICB3aWR0aD0iNDMuNzUiCiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIyNC4yMyIKICAgICAgICAgICAgICAgICAgICByeD0iMy41IgogICAgICAgICAgICAgICAgICAgIGZpbGw9IndoaXRlIgogICAgICAgICAgICAgICAgICAgIHN0cm9rZT0iIzJlOGJlOCIgLz4KPHJlY3QgeD0iNzUuMTEiCiAgICAgICAgICAgICAgICAgICAgeT0iODcuODkiCiAgICAgICAgICAgICAgICAgICAgd2lkdGg9IjQzLjc1IgogICAgICAgICAgICAgICAgICAgIGhlaWdodD0iMjQuMjMiCiAgICAgICAgICAgICAgICAgICAgcng9IjMuNSIKICAgICAgICAgICAgICAgICAgICBmaWxsPSJ3aGl0ZSIKICAgICAgICAgICAgICAgICAgICBzdHJva2U9IiMyZThiZTgiIC8+CjxyZWN0IHg9IjE5Ni4yNSIKICAgICAgICAgICAgICAgICAgICB5PSI2MC45NyIKICAgICAgICAgICAgICAgICAgICB3aWR0aD0iNDMuNzUiCiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIyNC4yMyIKICAgICAgICAgICAgICAgICAgICByeD0iMy41IgogICAgICAgICAgICAgICAgICAgIGZpbGw9IndoaXRlIgogICAgICAgICAgICAgICAgICAgIHN0cm9rZT0iIzJlOGJlOCIgLz4KPHJlY3QgeD0iMTM5LjA1IgogICAgICAgICAgICAgICAgICAgIHk9IjExNC44MSIKICAgICAgICAgICAgICAgICAgICB3aWR0aD0iNDMuNzUiCiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PSIyNC4yMyIKICAgICAgICAgICAgICAgICAgICByeD0iMy41IgogICAgICAgICAgICAgICAgICAgIGZpbGw9IndoaXRlIgogICAgICAgICAgICAgICAgICAgIHN0cm9rZT0iIzIwYTIwMiIgLz4KICAgIDwvc3ZnPg==" } }, L0 = {
  title: A0,
  description: M0,
  version: O0,
  nodes: j0,
  edges: R0,
  metadata: D0,
  imports: U0,
  graphs: N0,
  modules: G0,
  exports: F0,
  assets: z0
}, Dm = {
  "chat-tools": UT,
  entry: k0,
  join: $0,
  main: zT,
  "system-instruction-ts": E0,
  "system-instruction": HI,
  types: P0
}, W0 = it(L0, Dm);
function Um(n) {
  return J`You are an adaptive AI agent controller.

Overall Objective: Your primary goal is to guide an agent to achieve the following objective:
<AGENT_INSTRUCTIONS>
${n}
</AGENT_INSTRUCTIONS>
`.asContent();
}
function Nm(n) {
  const e = n ? {
    summarizeResults: {
      type: "boolean",
      description: "Set to true if and only if the objective calls for summarizing results at the end. Set to false otherwise."
    }
  } : {}, t = ["thinking", "todo"];
  return n && t.push(...Object.keys(e)), {
    type: "object",
    properties: {
      thinking: {
        type: "string",
        description: "Brief reasoning on why these steps are the right steps to fulfill the objective, or why termination is necessary."
      },
      todo: {
        type: "array",
        description: "The list of tasks to perform. If terminating, this is empty.",
        // Updated description
        items: {
          type: "object",
          properties: {
            task: {
              type: "string",
              description: "The task description. Use action-oriented language, starting with a verb that fits the task."
            },
            label: {
              description: "Short, precise label for that describes the task.",
              type: "string"
            }
          },
          required: ["task", "label"]
        }
      },
      ...e
    },
    required: t
  };
}
function ko(n) {
  const e = n.parts.at(0);
  return !e || !("json" in e) ? E("Gemini generated invalid plan") : (console.log("PLAN", e.json), e.json);
}
function Gm(n, e, t, r, s, i, a) {
  const l = [J`
${Um(JSON.stringify(r))}

Initial Plan Outline (Guideline Only):
This was the originally intended sequence of actions. Use it as a reference, but do not follow it rigidly if the situation changes.

${JSON.stringify(s)}

Current Situation:

History: (A summary of steps already completed and their outcomes)

\`\`\`json
${JSON.stringify(t)}
\`\`\`

Your Task:

Based on the Overall Objective, the Initial Plan Outline, the Available Tools, the History, and crucially, the Last Outcome, determine the single best next step for the agent to take right now. Your absolute priority is to make progress towards the objective *while acknowledging the user's input*.

Critical Instructions:

1.  **Evaluate Last Outcome:** Carefully analyze the \`Last Outcome\`.

2.  **Expected Outcome:** If the outcome was expected (e.g., successful tool execution providing needed info, user response directly answering the previous question) and aligns with progressing the Initial Plan Outline, determine the next logical step from that outline or towards the objective.

3.  **Unexpected/User-Driven Outcome:** If the \`Last Outcome\` is unexpected, problematic, reveals new user needs, is off-topic, emotionally charged, evasive, indicates a failure, or otherwise deviates from the expected path:
    * **PRIORITY 1: Address the User Input:**
        * **Acknowledge & Validate:** *Explicitly acknowledge* the user's statement, question, or expressed feeling. Use empathetic phrasing. Examples: "I understand you're asking about X...", "That's an interesting point about Y...", "It sounds like you're concerned about Z...", "Thanks for sharing that perspective on W..." Avoid language that dismisses or ignores their contribution.
        * **Assess Relevance & Safety:** Quickly determine if the user's input relates to the objective, introduces a new constraint, signals discomfort, raises ethical flags, or indicates a desire to stop.
        * **Connect (If Possible):** If the user's point can be briefly and naturally linked back to the overall objective, do so. Example: "...and thinking about Y might actually help us clarify [part of the objective]..."
        * **Empathetically Redirect:** Gently guide the conversation back towards the objective or the next logical step needed to achieve it. Frame it collaboratively. Examples: "...to make sure we achieve [objective], perhaps we could first look at...?", "...I want to make sure I help you with [objective], so could we focus back on...?", "Given our goal of [objective], the next step I think would be helpful is..."
        * **Adapt the Plan:** Based on the user's input, *fundamentally reassess* the next step. Do NOT blindly follow the Initial Plan Outline. Your next action *must* account for what the user just said.
    * **PRIORITY 2: Determine Adaptive Next Step:** Based on the above interaction, decide the *actual* next step. This might be:
        * Asking the user a clarifying question that incorporates their last point.
        * Rephrasing your previous question or request.
        * Using a different tool or strategy better suited to the new situation.
        * Acknowledging an error and proposing a correction.
        * Pausing the plan to address a user concern directly.
        * Deciding *not* to proceed if the user signals discomfort or the topic becomes inappropriate.
        * Ending the interaction politely if the objective is blocked, achieved, or the user wishes to stop.

4.  **Justify (Mandatory for Deviations):** Briefly explain *why* you chose this next step, *especially* if deviating from the original plan due to an unexpected outcome or user input. Explicitly mention how your chosen step acknowledges the user's input and aims to get back on track empathetically.

5.  **Specify Action:** Clearly define the single next action for the agent.
    * **User Interaction:** Provide the *exact text* the agent should say to the user. Otherwise we will confuse the user.
    * **Tool Use:** State the tool name and the precise inputs required, ensuring inputs are updated based on the latest context and user feedback.
    * **Internal Step:** Describe the internal calculation, data processing, or analysis the agent needs to perform.

6. Note when the agent finishes executing, we'll automatically show the results to the user, so there's no need for an explicit 'present' or 'show' step.

Output:
Provide a clear description of the next step the agent should execute now, and a list of good steps to follow after that (generate them assuming the single next step was sucessful).

For example,
\`\`\`json
{
    "summarizeResults": false,
    "thinking": "The user responded with \"hot dog please\" after the introduction. This is nonsensical and off-topic. I should acknowledge their input and try to redirect the conversation back to the original goal.",
    "todo": [
        {
            "label": "Gather Information",
            "task": "Tell the user that while a hotdog sure sounds tasty, I can't offer the user a hotdog. Then ask the user what brand or business they would like to highlight in the post."
        },
        {
            "label": "Generate Post",
            "task": "Use the brand name and description to generate an instagram post."
        }
    ]
}
\`\`\`

Extra instructions:
${a}
`.asContent()], c = new Se(n, e, {
    body: {
      contents: l,
      safetySettings: We(),
      generationConfig: {
        responseSchema: Nm(!0),
        responseMimeType: "application/json"
      }
    }
  });
  return console.log("thinkingPlannerPrompt: ", c), c;
}
function Fm(n, e, t, r, s, i) {
  t ??= [];
  const a = Um(JSON.stringify(r)), o = J`
Extra instructions:
${s}
`.asContent(), l = [...t, a, o], c = new Se(n, e, {
    body: {
      contents: l,
      safetySettings: We(),
      generationConfig: {
        responseSchema: Nm(i),
        responseMimeType: "application/json"
      }
    }
  });
  return console.log("plannerPrompt: ", c), c;
}
const B0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPlan: ko,
  plannerPrompt: Fm,
  thinkingPlannerPrompt: Gm
}, Symbol.toStringTag, { value: "Module" })), q0 = 10;
class H0 {
  constructor() {
    this.name = "[Alpha] Conversational Think as I go", this.tasks = [], this.extraPlannerPrompt = `
If the objective calls to organize or summarize results at the end, do not add that as a step.
Instead, set the "organizeResults" property to "true". This will let the organizing agent know
to kick off the organizing task after you're done.

When the objective does not explicitly contain the request to organize or summarize results,
make sure to set the "organizeProperty" to "false". Do not invent new work.

Now think real hard: do you need to organize or summarize results?
`;
  }
  async execute(e, t, r, s, i) {
    const a = await Fm(
      e,
      t,
      s,
      i,
      this.extraPlannerPrompt,
      !0
    ).invoke();
    if (!S(a)) return a;
    let o = ko(a.last);
    if (!S(o)) return o;
    const l = [];
    let c = o.todo.length + q0, d = !1, p = "Here is my starting plan";
    for (; --c; ) {
      const h = o.todo.at(0);
      if (o.summarizeResults && (d = !0), !h) break;
      await Pe(e, {
        actor: "Planner",
        category: "Progress update",
        name: "Thinking",
        icon: "laps",
        details: `

Here's my thinking:

${o.thinking}
        
${p}:

${o.todo.map((v) => `1. ${v.label}`).join(`
`)}

I will now go over the plan in order, thinking after each step
and adjusting the plan if necessary.`
      });
      const f = await r(h);
      f && (s.push(B("Action: " + h.task), f), console.log("think-strategist", s), l.push(f)), this.tasks.push(h.task);
      const u = await Gm(
        e,
        t,
        s,
        i,
        o,
        this.tasks,
        this.extraPlannerPrompt
      ).invoke();
      if (!S(u)) return u;
      const y = ko(u.last);
      if (!S(y)) return y;
      o = y, p = "Here are the remaining steps in the plan";
    }
    if (d) {
      await Pe(e, {
        actor: "Planner",
        category: "Organizing work into a report",
        name: "Organizing work report",
        icon: "laps",
        details: "I will now organize all of my work into a report."
      });
      const h = await Zl(
        e,
        t,
        l,
        i
      ).invoke();
      return S(h) ? [h.last] : h;
    }
    return l;
  }
}
const V0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ConversationalThinkStrategist: H0
}, Symbol.toStringTag, { value: "Module" })), Y0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), J0 = "A2 Go Over a List", K0 = "", Z0 = "0.0.1", X0 = [], Q0 = [], eE = { comments: [{ id: "comment-cc94afe8", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 531, y: 374, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "5f3ca599-8fee-46fb-951f-0d47b16a6d56": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "5f3ca599-8fee-46fb-951f-0d47b16a6d56" } }, tags: ["published", "tool", "component"] }, tE = {}, nE = { a2: { url: "./a2.bgl.json" } }, rE = ["#module:main"], sE = {
  title: J0,
  description: K0,
  version: Z0,
  nodes: X0,
  edges: Q0,
  metadata: eE,
  modules: tE,
  imports: nE,
  exports: rE
}, zm = {
  "conversational-planner-prompt": B0,
  "conversational-think-strategist": V0,
  main: e0,
  "organizer-prompt": KT,
  "parallel-strategist": BT,
  "planner-prompt": WT,
  runtime: YT,
  "sequential-strategist": JT,
  "system-instruction": qT,
  "think-strategist": XT,
  types: Y0
}, iE = it(sE, zm), aE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), oE = "Google Drive", lE = "", cE = "0.0.1", dE = [], pE = [], uE = { icon: "gdrive", visual: { presentation: { themes: { "f65ea9aa-b8c6-4c80-9667-a08c4f631013": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "f65ea9aa-b8c6-4c80-9667-a08c4f631013" } }, userModified: !0, tags: ["connector", "published", "experimental"], comments: [{ id: "comment-c74afa15", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 281, y: 501, collapsed: "expanded", outputHeight: 0 } } }] }, hE = {}, fE = { a2: { url: "./a2.bgl.json" } }, mE = {
  title: oE,
  description: lE,
  version: cE,
  nodes: dE,
  edges: pE,
  metadata: uE,
  modules: hE,
  imports: fE
}, Lm = {
  api: Dk,
  docs: IS,
  sheets: CS,
  "slides-schema": OS,
  slides: AS,
  types: aE,
  unescape: xS
}, gE = it(mE, Lm), yE = "A2 Music Generation", bE = "", vE = "0.0.1", wE = [], xE = [], _E = { comments: [{ id: "comment-cc94afe8", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 531, y: 374, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "5f3ca599-8fee-46fb-951f-0d47b16a6d56": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "5f3ca599-8fee-46fb-951f-0d47b16a6d56" } }, tags: ["published", "tool", "component"] }, kE = {}, SE = { a2: { url: "./a2.bgl.json" } }, IE = ["#module:main"], $E = {
  title: yE,
  description: bE,
  version: vE,
  nodes: wE,
  edges: xE,
  metadata: _E,
  modules: kE,
  imports: SE,
  exports: IE
}, Wm = {
  main: UI
}, CE = it($E, Wm), TE = "Tools", EE = "A collection of useful tools.", PE = "0.0.1", AE = [], ME = [], OE = { a2: { url: "./a2.bgl.json" } }, jE = { comments: [{ id: "comment-6fc8b597", text: "Intentionally Left Blank", metadata: { visual: { x: 7, y: -575, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "f90eb9c1-e12c-4864-ba74-a15a3b8d77f3": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "f90eb9c1-e12c-4864-ba74-a15a3b8d77f3" } }, tags: ["published", "tool", "component"] }, RE = {}, DE = ["#module:get-weather", "#module:search-web", "#module:get-webpage", "#module:search-maps", "#module:search-internal", "#module:code-execution"], UE = {
  title: TE,
  description: EE,
  version: PE,
  nodes: AE,
  edges: ME,
  imports: OE,
  metadata: jE,
  modules: RE,
  exports: DE
}, Bm = {
  "code-execution": Ww,
  "get-weather": Lw,
  "get-webpage": zw,
  "search-enterprise": Fw,
  "search-internal": Gw,
  "search-maps": Nw,
  "search-web": Uw
}, NE = it(UE, Bm), GE = "A2 Video Generation", FE = "", zE = "0.0.1", LE = [], WE = [], BE = { comments: [{ id: "comment-cc94afe8", text: "Intentionally Left Blank", metadata: { title: "Comment", visual: { x: 531, y: 374, collapsed: "expanded", outputHeight: 0 } } }], visual: { presentation: { themes: { "5f3ca599-8fee-46fb-951f-0d47b16a6d56": { themeColors: { primaryColor: "#246db5", secondaryColor: "#5cadff", backgroundColor: "#ffffff", textColor: "#1a1a1a", primaryTextColor: "#ffffff" }, template: "basic", splashScreen: { storedData: { handle: "/images/app/generic-flow.jpg", mimeType: "image/jpeg" } } } }, theme: "5f3ca599-8fee-46fb-951f-0d47b16a6d56" } }, tags: ["published", "tool", "component"] }, qE = {}, HE = { a2: { url: "./a2.bgl.json" } }, VE = ["#module:main"], YE = {
  title: GE,
  description: FE,
  version: zE,
  nodes: LE,
  edges: WE,
  metadata: BE,
  modules: qE,
  imports: HE,
  exports: VE
}, qm = {
  main: LI
}, JE = it(YE, qm), KE = "embed://a2/a2.bgl.json#21ee02e7-83fa-49d0-964c-0cab10eafc2c", ZE = "embed://a2/generate.bgl.json#module:main", XE = "embed://a2/a2.bgl.json#module:render-outputs";
function QE(n) {
  return /* @__PURE__ */ new Map([
    [
      KE,
      (e) => za(
        "be presented to the application user to request their input",
        La(n, e, ["description"])
      )
    ],
    [
      ZE,
      (e) => za(
        `be used by one of the steps as a prompt for an LLM that outputs ${eP(e)}`,
        La(n, e, ["config$prompt"])
      )
    ],
    [
      XE,
      (e) => za(
        "be used by one of the steps as a prompt for an LLM to render HTML for display",
        La(n, e, ["text"])
      )
    ]
  ]);
}
function eP(n) {
  if (n && "generation-mode" in n)
    switch (n["generation-mode"]) {
      case "image-gen":
        return "a single image file";
      case "image":
        return "one or more image files (see text to infer how many)";
      case "music":
      case "audio":
        return "an audio file";
      case "video":
        return "a video file";
      default:
        return "text";
    }
  return "text";
}
function za(n, e) {
  return {
    canAutoname: e.length > 10,
    prompt: [
      J`
  Analyze the text below and provide suggestions for title and description that could be used to automatically label this text as one of the steps in a visual, a no-code application builder. Additionally, supply information about the expected output types and their contents.
  
  The users of the builder are creating applications by placing steps on a canvas and wiring them together into a visual flow.
  
  This text will ${n}.

  Important:
  - Both the title and intent must be accurate, concise, and specific to the text
  - The description must be one sentence
  - Each title must be verb-first, action oriented, short and to the point
  - The users are non-technical, so avoid overly technical jargon
  - The descriptions of the expected output contents must add more detail to the already supplied information (type and count of items). For example, if the type is "text", what kind of text is it? If the type is "audio" what does this audio file contain?

  Text:
  
  ${e}

  `.asContent()
    ]
  };
}
const hu = {
  canAutoname: !1,
  prompt: []
};
function tP(n, e) {
  const t = e.nodeConfigurationUpdate?.type, r = e.nodeConfigurationUpdate?.configuration;
  if (!t || !r) return hu;
  const s = QE(n).get(t);
  return s ? s(r) : hu;
}
class nP {
  constructor(e, t) {
    this.caps = e, this.args = t, this.#e = tP(e, t);
  }
  #e;
  canAutoname() {
    return this.#e.canAutoname;
  }
  prompt() {
    return this.#e.prompt;
  }
  schema() {
    return {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Suggested title for the prompt, verb-first, action oriented. Two words."
        },
        description: {
          type: "string",
          description: "Suggested description for the prompt. Seven words or less"
        },
        expected_output: {
          type: "array",
          description: "The sequence of all expected outputs, inferred from the configuration and the type of the step.",
          items: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: ["image", "text", "video", "audio"]
              },
              description: {
                type: "string",
                description: "7-word description of the contents of the output"
              },
              list: {
                type: "boolean",
                description: 'Whether this output is a list of files of the same kind. For instance, if the step is expected to create two images, this value would be "true" and the type will be "image".'
              }
            },
            required: ["type", "description", "list"]
          }
        }
      },
      required: ["title", "description", "expected_output"]
    };
  }
}
function La(n, e, t) {
  if (!e) return "";
  let r = 0;
  return Object.entries(e).map(([s, i]) => {
    if (!t.includes(s)) return "";
    if (ro(i)) {
      const a = new q(n, i);
      return ce(
        a.simpleSubstitute((o) => o.type == "tool" ? o.title : o.type === "in" ? `<file src="/vfs/file${++r}" from="${o.title}" />` : o.type === "asset" ? `{{${o.title}}}` : "")
      );
    }
    return JSON.stringify(i);
  }).join("");
}
function rP(n) {
  const e = n?.at(-1)?.parts?.at(0);
  return e && "json" in e ? e.json : E(`Invalid arguments: ${n}`);
}
function sP() {
  return [{ parts: [{ json: { notEnoughContext: !0 } }] }];
}
const iP = {
  nodeConfigurationUpdate: nP
};
async function aP({ context: n }, e, t) {
  const r = rP(n);
  if (!S(r)) return r;
  const s = iP[Object.keys(r)[0]];
  if (!s)
    return E(`Unknown mode: ${JSON.stringify(r)}`);
  const i = new s(e, r);
  if (!i.canAutoname())
    return { context: sP() };
  const a = await new Se(e, t, {
    model: "gemini-2.5-flash-lite",
    body: {
      contents: i.prompt(),
      safetySettings: We(),
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: i.schema()
      }
    }
  }).invoke();
  return S(a) ? { context: a.all } : a;
}
async function oP() {
  return {
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context in"
        }
      }
    },
    outputSchema: {
      type: "object",
      properties: {
        context: {
          type: "array",
          items: { type: "object", behavior: ["llm-content"] },
          title: "Context out"
        }
      }
    }
  };
}
const lP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aP,
  describe: oP
}, Symbol.toStringTag, { value: "Module" })), cP = "Autoname Modules", dP = "", pP = "0.0.1", uP = [], hP = [], fP = ["#module:main"], mP = {
  title: cP,
  description: dP,
  version: pP,
  nodes: uP,
  edges: hP,
  exports: fP
}, Hm = {
  main: lP
}, gP = it(mP, Hm), yP = {
  a2: $f,
  agent: dm,
  "audio-generator": pm,
  autoname: Hm,
  generate: Rm,
  "generate-text": Dm,
  "go-over-list": zm,
  "google-drive": Lm,
  tools: Bm,
  "video-generator": qm,
  "music-generator": Wm,
  "deep-research": ym
}, So = "embed://a2/", Io = ".bgl.json";
function bP(n) {
  return new vP(n);
}
class vP {
  constructor(e) {
    this.args = e;
  }
  getDir(e) {
    if (!e)
      return k("Unable to get module info: no URL");
    const { mainGraphUrl: t } = so(e);
    let r;
    if (t.startsWith(So))
      r = So;
    else
      return k(`Unable to get module info: invalid prefix for URL "${e}"`);
    return t.endsWith(Io) ? t.slice(r.length, -Io.length) : k(`Unable to get module info: invalid suffix for URL "${e}"`);
  }
  async createRunnableModule(e, t, r, s) {
    const i = this.getDir(t.url);
    if (!w(i)) return i;
    const a = {
      ...this.args,
      context: r
    };
    return new kP(i, a, s);
  }
}
async function wP(n, e, t, r) {
  const s = n?.[e];
  if (!s)
    return { $error: `Capability "${e}" is not avaialble` };
  const i = e === "output", a = t.$metadata;
  a && !i && delete t.$metadata;
  const o = await r?.startCapability(
    e,
    t,
    a
  ) || 0;
  let l;
  try {
    l = await s(t, r?.invocationPath(o) || []);
  } catch (c) {
    l = {
      $error: `Unable to invoke capability "${e}": ${c.message}`
    };
  }
  return await r?.endCapability(
    e,
    o,
    t,
    l
  ), l;
}
const xP = [
  "invoke",
  "input",
  "output",
  "describe",
  "query",
  "read",
  "write"
];
function _P(n, e) {
  return Object.fromEntries(
    xP.map((t) => [
      t,
      (r) => wP(n, t, r, e)
    ])
  );
}
class kP {
  constructor(e, t, r) {
    this.dir = e, this.args = t, this.capabilities = r;
  }
  getModule(e, t) {
    const r = t === "invoke" ? "default" : "describe";
    return yP[this.dir]?.[e]?.[r];
  }
  async invoke(e, t, r) {
    const s = this.getModule(e, "invoke");
    if (!s)
      return k(
        `Function "${So}${this.dir}${Io}#${e}/invoke" not found.`
      );
    await r?.startModule();
    const i = await s(
      t,
      _P(this.capabilities?.createSpec(), r),
      this.args
    );
    return await r?.endModule(), i;
  }
  async describe(e, t) {
    const r = this.getModule(e, "describe");
    return r ? r(
      pl(t),
      this.capabilities?.createSpec(),
      this.args
    ) : {
      inputSchema: {},
      outputSchema: {}
    };
  }
}
function fu(n) {
  const e = n.match(/^(?:'([^']+)'|([^!]+))!/);
  return e ? e[1] || e[2] : null;
}
class SP {
  constructor(e, t) {
    this.config = e, this.sheetGetter = t, this.cacheByGraph = /* @__PURE__ */ new Map();
  }
  getGraphKey(e) {
    return e.currentGraph?.url || "";
  }
  getGraphCache(e) {
    const t = this.getGraphKey(e);
    let r = this.cacheByGraph.get(t);
    return r || (r = { sheetId: null, readCache: /* @__PURE__ */ new Map(), metadata: null }, this.cacheByGraph.set(t, r)), r;
  }
  checkSheetId(e) {
    const t = this.getGraphCache(e);
    return t.sheetId ? t.sheetId : this.sheetGetter(e, !0);
  }
  ensureSheetId(e) {
    const t = this.getGraphCache(e);
    return t.sheetId || (t.sheetId = this.sheetGetter(e, !1)), t.sheetId;
  }
  makeModuleArgs(e) {
    return { ...this.config, context: e };
  }
  clearSheetCache(e, t) {
    const r = this.getGraphCache(e);
    for (const s of r.readCache.keys())
      fu(s) === t && r.readCache.delete(s);
    r.metadata = null;
  }
  async createSheet(e, t) {
    const { name: r } = t, s = await this.ensureSheetId(e);
    if (!w(s)) return s;
    const i = this.makeModuleArgs(e), a = await gs(i, s, [
      { addSheet: { properties: { title: r } } }
    ]);
    if (!w(a))
      return { success: !1, error: a.$error };
    const o = await Ki(
      i,
      s,
      `${r}!A1`,
      [t.columns]
    );
    return w(o) ? (this.clearSheetCache(e, r), { success: !0 }) : { success: !1, error: o.$error };
  }
  async readSheet(e, t) {
    const { range: r } = t, s = this.getGraphCache(e), i = s.readCache.get(r);
    if (i) return i;
    const a = await this.ensureSheetId(e);
    if (!w(a)) return a;
    const o = await fo(
      this.makeModuleArgs(e),
      a,
      r
    );
    return s.readCache.set(r, o), o;
  }
  async updateSheet(e, t) {
    const { range: r, values: s } = t, i = await this.ensureSheetId(e);
    if (!w(i)) return i;
    const a = await Ki(
      this.makeModuleArgs(e),
      i,
      r,
      s
    );
    if (!w(a))
      return { success: !1, error: a.$error };
    const o = fu(r);
    return o && this.clearSheetCache(e, o), { success: !0 };
  }
  async deleteSheet(e, t) {
    const r = await this.ensureSheetId(e);
    if (!w(r)) return r;
    const s = this.makeModuleArgs(e), i = await Ji(s, r);
    if (!w(i)) return i;
    const a = i.sheets.find((l) => l.properties.title === t.name);
    if (!a)
      return { success: !1, error: `Sheet "${t.name}" not found.` };
    const o = await gs(s, r, [
      { deleteSheet: { sheetId: a.properties.sheetId } }
    ]);
    return w(o) ? (this.clearSheetCache(e, t.name), { success: !0 }) : o;
  }
  async getSheetMetadata(e) {
    const t = this.getGraphCache(e);
    if (t.metadata) return t.metadata;
    const r = await this.checkSheetId(e);
    if (!r)
      return { sheets: [] };
    if (!w(r)) return r;
    t.sheetId = Promise.resolve(r);
    const s = this.makeModuleArgs(e), i = await Ji(s, r);
    if (!w(i)) return i;
    const a = [], o = i.sheets.map(async (l) => {
      const { title: c, sheetId: d } = l.properties;
      if (d === 0) return null;
      const p = `/vfs/memory/${encodeURIComponent(c)}`, h = await fo(
        s,
        r,
        `${encodeURIComponent(c)}!1:1`
      );
      let f = [];
      return w(h) ? h.values && h.values.length > 0 && (f = h.values[0]) : a.push(h.$error), { name: c, file_path: p, columns: f };
    });
    try {
      const l = (await Promise.all(o)).filter(
        (d) => d !== null
      );
      if (a.length > 0)
        return k(a.join(","));
      const c = { sheets: l };
      return t.metadata = c, c;
    } catch (l) {
      return k(l.message);
    }
  }
}
function IP(n) {
  return async (e, t) => {
    const { url: r, title: s } = e.currentGraph || {}, i = r?.replace("drive:/", "") || "", a = `Memory for ${s ?? i}`, o = Pt, l = await n.shell.getDriveCollectorFile(
      o,
      i,
      i
    );
    if (!l.ok) return k(l.error);
    const c = l.id;
    if (c) return c;
    if (t) return null;
    const d = { ...n, context: e }, p = `sheet${i}${i}`, h = await da(d, {
      name: a,
      mimeType: o,
      appProperties: {
        "google-drive-connector": p
      }
    });
    if (!w(h)) return h;
    const { id: f } = h, u = await gs(d, f, [
      {
        updateSheetProperties: {
          properties: { sheetId: 0, title: "intro" },
          fields: "title"
        }
      }
    ]);
    if (!w(u)) return u;
    const y = await Ki(d, f, "intro!A1", [
      [
        "This spreadsheet is used as agent memory. Do not modify it directly. To reset the memory for the agent, move this entire spreadsheet into trash."
      ]
    ]);
    return w(y) ? f : y;
  };
}
class $P {
  #e = /* @__PURE__ */ new Map();
  constructor(e) {
    this.memoryManager = new SP(e, IP(e));
  }
  /**
   * Creates and registers a new run state.
   */
  createRun(e, t) {
    const r = {
      id: e,
      status: "running",
      startTime: Date.now(),
      contents: [],
      lastCompleteTurnIndex: -1,
      objective: t,
      files: {},
      resumable: !0
    };
    return this.#e.set(e, r), r;
  }
  /**
   * Gets a run by ID.
   */
  getRun(e) {
    return this.#e.get(e);
  }
  /**
   * Gets all registered runs.
   */
  getAllRuns() {
    return [...this.#e.values()];
  }
  /**
   * Marks all failed runs as non-resumable (called when graph is edited).
   */
  invalidateResumableRuns() {
    for (const e of this.#e.values())
      e.status === "failed" && (e.resumable = !1);
  }
  /**
   * Clears all runs (called when switching to a different graph).
   */
  clearAllRuns() {
    this.#e.clear();
  }
  /**
   * Exports all runs in EvalFileData format for eval viewer compatibility.
   * Returns an array containing FinalChainReport entries and OutcomePayload entries.
   */
  exportTraces() {
    const e = [];
    for (const t of this.getAllRuns()) {
      let r = 0, s = 0, i = 0;
      for (const d of t.contents) {
        d.role === "model" && i++;
        for (const p of d.parts ?? [])
          "thought" in p && p.thought ? r++ : "functionCall" in p && s++;
      }
      const { contents: a, ...o } = t.requestBody ?? {};
      e.push({
        type: "context",
        startedDateTime: new Date(t.startTime).toISOString(),
        totalDurationMs: (t.endTime ?? Date.now()) - t.startTime,
        turnCount: i,
        totalRequestTimeMs: 0,
        // Not tracked
        totalThoughts: r,
        totalFunctionCalls: s,
        context: t.contents,
        config: Object.keys(o).length > 0 ? o : null
      });
      const l = Object.entries(t.files).map(([d, p]) => ({
        path: d,
        content: { parts: [{ text: p.data }] }
      })), c = t.contents.filter((d) => d.role === "model").at(-1);
      e.push({
        type: "outcome",
        outcome: {
          success: t.status === "completed",
          href: "",
          outcomes: c ?? { parts: [] },
          intermediate: l.length > 0 ? l : void 0
        }
      });
    }
    return e;
  }
}
class Xl {
  constructor(e, t) {
    this.probe = e, this.path = t, this.index = 0;
  }
  static create(e) {
    if (e.probe && e.invocationPath)
      return new Xl(e.probe, e.invocationPath);
  }
  async startModule() {
    await this.probe.report?.({
      type: "graphstart",
      data: {
        graph: CP(),
        graphId: "",
        path: this.path,
        timestamp: vi()
      }
    });
  }
  async startCapability(e, t, r) {
    const s = ++this.index;
    return await this.probe.report?.({
      type: "nodestart",
      data: {
        node: this.#e(e, r),
        inputs: t,
        path: this.invocationPath(s),
        timestamp: vi()
      }
    }), s;
  }
  async endCapability(e, t, r, s) {
    await this.probe.report?.({
      type: "nodeend",
      data: {
        node: this.#e(e),
        inputs: r,
        outputs: s,
        path: this.invocationPath(t),
        timestamp: vi(),
        newOpportunities: []
      }
    });
  }
  async endModule() {
    await this.probe.report?.({
      type: "graphend",
      data: {
        path: this.path,
        timestamp: vi()
      }
    });
  }
  invocationPath(e) {
    return [...this.path, e];
  }
  #e(e, t) {
    return {
      id: `${e}-${this.index}`,
      type: e,
      metadata: t
    };
  }
}
function CP() {
  return {
    nodes: [],
    edges: [],
    virtual: !0
  };
}
function vi() {
  return globalThis.performance.now();
}
function TP(n, e) {
  return e?.flatMap((r) => Object.entries(r.handlers)).find(([r]) => r === n)?.at(1);
}
function EP(n, e) {
  const t = TP("runModule", e), r = (t && typeof t != "string" && "describe" in t ? t.describe : void 0) ?? (() => ({
    outputSchema: {},
    inputSchema: {}
  }));
  return [
    {
      url: import.meta.url,
      handlers: {
        runModule: {
          invoke: async ({ $module: s, ...i }, a) => {
            const o = a.outerGraph;
            if (!o?.modules)
              return {
                $error: `Unable to run module: no modules found within board ${a.board?.url || "uknown board"}`
              };
            const c = Xl.create(a), d = await mu(a);
            if (!d)
              return k("Unable to create runnable module: invalid graph");
            const p = await n.createRunnableModule(
              d,
              o,
              a,
              new ds(a)
            );
            return w(p) ? await p.invoke(
              s,
              i,
              c
            ) : k(`Unable to create runnable module: ${p.$error}`);
          },
          describe: async (s, i, a, o) => {
            const { $module: l } = s || {};
            if (o) {
              const c = o.outerGraph, d = c?.modules;
              if (l && d) {
                const p = await mu(o);
                if (p) {
                  const h = await n.createRunnableModule(
                    p,
                    c,
                    o
                  );
                  if (w(h))
                    try {
                      const f = await h.describe(l, {
                        inputs: s,
                        inputSchema: i,
                        outputSchema: a
                      });
                      return {
                        inputSchema: {
                          type: "object",
                          properties: {
                            $module: {
                              type: "string",
                              title: "Module ID",
                              behavior: ["config", "module"]
                            },
                            ...f.inputSchema.properties
                          }
                        },
                        outputSchema: f.outputSchema
                      };
                    } catch {
                    }
                }
              }
            }
            return r(
              s,
              i,
              a,
              o
            );
          }
        }
      }
    },
    ...e
  ];
}
async function mu(n) {
  if (!n.graphStore) return;
  const { graphStore: e, outerGraph: t } = n;
  if (!t) return;
  const r = e.getByDescriptor(t);
  if (r.success)
    return e.getLatest(e.get(r.result));
}
function PP(n, e, t, r) {
  const s = lo.GOOGLE_DRIVE_PUBLISH_PERMISSIONS ?? [], i = lo.GOOGLE_DRIVE_USER_FOLDER_NAME || "Breadboard";
  return new Bw(
    "Google Drive",
    n,
    e,
    s,
    i,
    t,
    r
  );
}
const Vm = "embed://";
class AP extends EventTarget {
  constructor(e, t, r) {
    super(), this.title = e, this.urlPrefix = t, this.bgls = r, this.name = "Embedded Board Server", this.url = new URL(import.meta.url), this.capabilities = {}, this.#e = /* @__PURE__ */ new Map([
      [
        "default",
        {
          permission: "granted",
          title: e,
          items: new Map(
            [...r.entries()].map(([s, i]) => [
              s,
              {
                url: this.#t(s),
                title: i.title,
                tags: i.metadata?.tags || [],
                version: i.version,
                description: i.description,
                mine: !1,
                readonly: !0,
                handle: null
              }
            ])
          )
        }
      ]
    ]);
  }
  #e;
  deepCopy(e, t) {
    return Promise.resolve(t);
  }
  #t(e) {
    return `${Vm}${this.urlPrefix}/${e}.bgl.json`;
  }
  canProvide(e) {
    const t = $o(e.href, this.urlPrefix);
    return w(t) ? { load: !0, save: !1, delete: !1 } : !1;
  }
  async load(e) {
    const t = $o(e.href, this.urlPrefix);
    return w(t) && this.bgls.get(t) || null;
  }
  async save(e, t) {
    return { result: !1, error: "Can't save to embedded board server" };
  }
  async create(e, t) {
    return {
      result: !1,
      error: "Can't create boards to embedded board server"
    };
  }
  async delete(e) {
    return {
      result: !1,
      error: "Can't delete boards to embedded board server"
    };
  }
  async createURL(e, t) {
    return null;
  }
  get userGraphs() {
    return new MP(this.#e.get("default").items, this.urlPrefix);
  }
  isMine() {
    return !1;
  }
}
class MP {
  constructor(e, t) {
    this.items = e, this.urlPrefix = t, this.loading = !1, this.loaded = Promise.resolve();
  }
  put() {
    throw new Error("Embedded board server entries aren't mutable");
  }
  delete() {
    throw new Error("Embedded board server entries aren't mutable");
  }
  get size() {
    return this.items.size;
  }
  entries() {
    return this.items.entries();
  }
  has(e) {
    const t = $o(e, this.urlPrefix);
    return w(t) ? this.items.has(t) : !1;
  }
}
function $o(n, e) {
  const t = `${Vm}${e}/`;
  return n.startsWith(t) ? n.slice(t.length, -9) : k("Nope");
}
const OP = "a2";
function jP() {
  return new AP(
    "A2",
    OP,
    /* @__PURE__ */ new Map([
      ["a2", RI],
      ["agent", XC],
      ["audio-generator", cT],
      ["autoname", gP],
      ["generate", w0],
      ["generate-text", W0],
      ["go-over-list", iE],
      ["google-drive", gE],
      ["tools", NE],
      ["video-generator", JE],
      ["music-generator", CE],
      ["deep-research", DT]
    ])
  );
}
const Ql = (n) => {
  const e = [...n ?? []];
  return new qw(e);
};
class RP {
  constructor(e) {
    this.args = e;
  }
  #e = /* @__PURE__ */ new Map();
  #t(e, t) {
    return {
      initial: () => this.args.initial(e, t),
      latest: () => this.args.latest(e, t),
      willUpdate: (r, s) => this.args.willUpdate(r, s),
      updated: () => {
        this.args.updated(e, t);
      }
    };
  }
  get(e, t) {
    const r = Wa({ id: e, graphId: t });
    let s = this.#e.get(r);
    return s || (s = new Vi(this.#t(t, e)), this.#e.set(r, s)), s.snapshot();
  }
  update(e) {
    e.forEach((t) => {
      const r = Wa(t);
      this.#e.get(r)?.refresh();
    });
  }
  clear(e, t) {
    e || t.forEach((r) => {
      const s = Wa(r);
      this.#e.delete(s);
    });
  }
}
function Wa(n) {
  return ul(n);
}
const ec = (n) => n.out === "*" ? { ...n, in: "" } : n, Ym = (n) => n.out === "*" ? { ...n, in: "*" } : n, DP = (n) => {
  const { constant: e, ...t } = n;
  return e === !1 ? t : n;
};
class UP {
  #e;
  #t;
  #n;
  constructor(e, t, r) {
    this.#e = e, this.#t = t, this.#n = r;
  }
  raw() {
    return this.#t;
  }
  get from() {
    if (!this.#e)
      throw new Error(
        'Unable to access "from": this edge was deleted and is no longer part of the graph'
      );
    const e = this.#e.nodes.get(this.#t.from, this.#n);
    return console.assert(e, "From node not found when getting from."), e;
  }
  get out() {
    return this.#t.out;
  }
  get to() {
    if (!this.#e)
      throw new Error(
        'Unable to access "to": this edge was deleted and is no longer part of the graph'
      );
    const e = this.#e.nodes.get(this.#t.to, this.#n);
    return console.assert(e, "To node not found when getting to."), e;
  }
  get in() {
    return this.#t.out === "*" ? "*" : this.#t.in;
  }
  get type() {
    return this.#t.out === "*" ? ui.Star : this.#t.out === "" ? ui.Control : this.#t.constant ? ui.Constant : ui.Ordinary;
  }
  metadata() {
    return this.#t.metadata;
  }
  async outPort() {
    return (await this.from.ports()).outputs.ports.find((t) => t.name === this.out);
  }
  async inPort() {
    return (await this.to.ports()).inputs.ports.find((t) => t.name === this.in);
  }
  setDeleted() {
    this.#e = null;
  }
  deleted() {
    return !this.#e;
  }
}
class NP {
  #e;
  #t = /* @__PURE__ */ new Map();
  constructor(e) {
    this.#e = e;
  }
  rebuild(e) {
    const t = new Map(
      e.edges.map((r) => [r, this.#e(r, "")])
    );
    this.#t.set("", t), Object.entries(e.graphs || {}).forEach(([r, s]) => {
      const i = new Map(
        s.edges.map((a) => [a, this.#e(a, r)])
      );
      this.#t.set(r, i);
    });
  }
  get(e, t) {
    return this.#t.get(t)?.get(e);
  }
  getOrCreate(e, t) {
    let r = this.get(e, t);
    return r || (r = this.#e(e, t), this.add(e, t), r);
  }
  add(e, t) {
    console.assert(
      !this.#t.get(t)?.has(e),
      "Edge already exists when adding."
    );
    let r = this.#t.get(t);
    r || (r = /* @__PURE__ */ new Map(), this.#t.set(t, r)), r.set(e, this.#e(e, t));
  }
  remove(e, t) {
    console.assert(
      this.#t.get(t)?.has(e),
      "Edge not found when removing."
    );
    const r = this.#t.get(t)?.get(e);
    this.#t.get(t)?.delete(e), r?.setDeleted();
  }
  has(e, t) {
    return !!this.#t.get(t)?.has(e);
  }
  hasByValue(e, t) {
    return e = Ym(e), !!this.edges(t).find((s) => s.from.descriptor.id === e.from && s.to.descriptor.id === e.to && s.out === e.out && s.in === e.in);
  }
  edges(e) {
    return Array.from(this.#t.get(e)?.values() || []);
  }
  addSubgraphEdges(e, t) {
    e.edges.map((r) => {
      this.add(r, t);
    });
  }
  removeSubgraphEdges(e) {
    this.#t.get(e)?.forEach((t) => {
      t.setDeleted();
    }), this.#t.delete(e);
  }
}
const GP = {
  bubbles: !0,
  cancelable: !0,
  composed: !0
};
class tr extends Event {
  constructor(e, t, r, s, i) {
    super(tr.eventName, { ...GP }), this.mainGraphId = e, this.graphId = t, this.nodeId = r, this.affectedGraphs = s, this.topologyChange = i;
  }
  static {
    this.eventName = "update";
  }
}
class FP {
  #e;
  #t = /* @__PURE__ */ new Map();
  constructor(e) {
    this.#e = e;
  }
  rebuild(e) {
    this.#t = new Map(
      Object.keys(e.graphs || []).map((t) => [t, this.#e(t)])
    ), this.#t.set("", this.#e(""));
  }
  get(e) {
    return this.#t.get(e);
  }
  add(e) {
    this.#t.set(e, this.#e(e));
  }
  graphs() {
    return Object.fromEntries([...this.#t.entries()].filter(([e]) => e));
  }
  remove(e) {
    this.#t.delete(e);
  }
  clear() {
    this.#t.clear();
  }
}
class zP {
  constructor(e, t) {
    this.mutable = e, this.describerFactory = t;
  }
  async transform(e) {
    const { exports: t } = this.mutable.graph;
    if (!t) return e;
    const r = Object.fromEntries(
      (await Promise.all(
        t.map(async (s) => {
          const i = this.describerFactory(s, this.mutable);
          if (!w(i)) return null;
          const a = await i.describe();
          return [`${this.mutable.graph.url}${s}`, a];
        })
      )).filter((s) => s !== null)
    );
    return { ...e, exports: r };
  }
}
class mt {
  constructor(e, t) {
    if (this.graphId = t, hl(e)) {
      const { main: r } = e;
      e = fl(e), this.#t = r;
    }
    this.#e = e, this.#n = LP(e.url);
  }
  #e;
  #t;
  #n;
  main() {
    return this.#t;
  }
  url() {
    return this.#n;
  }
  outerGraph() {
    return this.#e;
  }
  graph() {
    return this.graphId ? this.#e.graphs[this.graphId] : this.#e;
  }
  static create(e, t) {
    return t && !e.graphs?.[t] ? {
      success: !1,
      error: `Unable to create a valid GraphDEscriptorHandle: subgraph "${t}" is not in the graph.`
    } : { success: !0, result: new mt(e, t) };
  }
}
function LP(n) {
  n = n || "";
  try {
    return new URL(n);
  } catch {
    return;
  }
}
class ta {
  constructor(e, t) {
    this.handle = e, this.mutable = t, this.exports = new zP(t, (r, s) => Hw(r) ? new WP(s, Vw(r)) : ta.create(r, s));
  }
  #e(e) {
    return this.mutable.nodes.byType(e, this.handle.graphId);
  }
  async #t() {
    const e = (await Promise.all(
      this.#e("input").filter((a) => a.isEntry()).map(
        (a) => fn({
          inputs: a.configuration(),
          incoming: a.incoming(),
          outgoing: a.outgoing(),
          asType: !0
        })
      )
    )).map((a) => a.outputSchema), t = (await Promise.all(
      this.#e("output").filter((a) => a.isExit()).map(
        (a) => ps({
          inputs: a.configuration(),
          incoming: a.incoming(),
          outgoing: a.outgoing(),
          asType: !0
        })
      )
    )).map(
      (a) => a.inputSchema.behavior?.includes("bubble") ? null : a.inputSchema
    ).filter(Boolean), r = wp(e, (a, o) => {
      o.additionalProperties !== !1 ? a.additionalProperties = !0 : "additionalProperties" in a || (a.additionalProperties = !1);
    }), s = Yw(
      wp(t),
      "schema"
    ), i = this.#n({
      inputSchema: r,
      outputSchema: s
    });
    return this.handle.graphId ? i : this.exports.transform(i);
  }
  /**
   * This is a bit hacky, but it gets the job done.
   * This function tweaks the result to look like a context in / context out
   * in cases when the graph being described is a subgraph and the
   * static analysis yielded nothing.
   *
   * Additionally, we scan for parameters in the graph and add them as schema
   * parameters.
   *
   * We use this logic to allow subgraphs that are "custom tools" to
   * participate as normal steps in the graph.
   */
  #n(e) {
    const { inputSchema: t, outputSchema: r } = e;
    return !t.properties && !r.properties && this.handle.graphId ? Pa({
      ...e,
      inputSchema: {
        properties: {
          context: {
            type: "array",
            items: { type: "object", behavior: ["llm-content"] }
          }
        }
      },
      outputSchema: {
        properties: {
          context: {
            type: "array",
            items: { type: "object", behavior: ["llm-content"] }
          }
        }
      }
    }) : e;
  }
  async #r(e, t) {
    const r = this.handle.graph().metadata?.describer || (this.handle.graph().main ? `module:${this.handle.graph().main}` : void 0);
    if (!r)
      return k("Unable to find custom describer");
    try {
      const { sandbox: s } = this.mutable.store;
      if (s && r.startsWith("module:")) {
        const { inputSchema: p, outputSchema: h } = await this.#t(), f = r.slice(7);
        let u;
        if (this.handle.main() === f ? u = await io(
          t || {},
          this.mutable,
          this.mutable.graph,
          e,
          p,
          h,
          new ds(t),
          t?.asType || !1
        ) : u = await sh(
          t || {},
          f,
          this.mutable,
          this.mutable.graph,
          e,
          p,
          h,
          new ds(t),
          t?.asType || !1
        ), u)
          return u;
        if (u === !1)
          return k("Custom describer could not provide results.");
      }
      const i = this.handle.url(), a = this.mutable.store.loader, o = await a.load(r, {
        base: i,
        board: this.handle.graph(),
        outerGraph: this.handle.graph()
      });
      if (!o.success) {
        const p = `Could not load custom describer graph ${r}: ${o.error}`;
        return console.warn(p), k(p);
      }
      const { inputSchema: l, outputSchema: c } = await this.#t(), d = await Jw(
        o,
        { ...e, $inputSchema: l, $outputSchema: c },
        {
          base: i,
          kits: [...this.mutable.store.kits],
          loader: a
        }
      );
      if ("$error" in d) {
        const p = "Error while invoking graph's custom describer";
        return console.warn(p, d.$error), k(`${p}: ${JSON.stringify(d.$error)}`);
      }
      if (!d.inputSchema || !d.outputSchema) {
        const p = "Custom describer did not return input/output schemas";
        return console.warn(p, d), k(`${p}: ${JSON.stringify(d)}`);
      }
      return d;
    } catch (s) {
      const i = "Error while invoking graph's custom describer";
      return console.warn(i, s), k(`${i}: ${JSON.stringify(s)}`);
    }
  }
  async describe(e, t, r, s) {
    const i = await this.#r(
      e || {},
      s
    );
    if (w(i))
      return i;
    const a = await this.#t(), o = this.handle.graph();
    return {
      ...Pa({
        title: o.title,
        description: o.description,
        metadata: Pa({
          icon: o.metadata?.icon,
          help: o.metadata?.help,
          tags: o.metadata?.tags
        })
      }),
      ...a
    };
  }
  static create(e, t) {
    const r = mt.create(t.graph, e);
    return r.success ? new ta(r.result, t) : k(r.error);
  }
}
class WP {
  constructor(e, t) {
    this.mutable = e, this.moduleId = t;
  }
  async describe(e, t, r, s) {
    const i = await sh(
      s || {},
      this.moduleId,
      this.mutable,
      this.mutable.graph,
      e || {},
      t,
      r,
      new ds(s),
      s?.asType || !1
    );
    return i || Kw();
  }
}
let BP = class {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  #n() {
    const e = this.#t.graph;
    return this.#e ? e.graphs[this.#e] : e;
  }
  raw() {
    return this.#n();
  }
  mainGraphDescriptor() {
    return this.#t.graph;
  }
  imperative() {
    return !!this.main();
  }
  main() {
    return this.#n().main;
  }
  metadata() {
    return this.#n().metadata;
  }
  nodesByType(e) {
    return this.#t.nodes.byType(e, this.#e);
  }
  nodeById(e) {
    return new ke(this.#t, this.#e).nodeById(e);
  }
  nodes() {
    return this.#t.nodes.nodes(this.#e);
  }
  moduleById(e) {
    return this.#t.modules.get(e);
  }
  modules() {
    return this.#t.modules.modules();
  }
  edges() {
    return this.#t.edges.edges(this.#e);
  }
  hasEdge(e) {
    return this.#t.edges.hasByValue(e, this.#e);
  }
  typeForNode(e) {
    return new ke(this.#t, this.#e).typeForNode(e);
  }
  typeById(e) {
    return new ke(this.#t, this.#e).typeById(e);
  }
  incomingForNode(e) {
    return new ke(this.#t, this.#e).incoming(e);
  }
  outgoingForNode(e) {
    return new ke(this.#t, this.#e).outgoing(e);
  }
  entries() {
    return new ke(this.#t, this.#e).entries();
  }
  async describe(e, t) {
    const r = ta.create(this.#e, this.#t);
    if (!w(r))
      throw new Error(`Inspect API Integrity Error: ${r.$error}`);
    return r.describe(e, void 0, void 0, t);
  }
  graphs() {
    if (!this.#e)
      return this.#t.graphs.graphs();
  }
  graphId() {
    return this.#e;
  }
  moduleExports() {
    return new ke(this.#t, this.#e).moduleExports();
  }
  graphExports() {
    return new ke(this.#t, this.#e).graphExports();
  }
  assets() {
    return new ke(this.#t, this.#e).assets();
  }
  assetEdges() {
    return new ke(this.#t, this.#e).assetEdges();
  }
  usesTool(e) {
    return new ke(this.#t, this.#e).usesTool(e);
  }
};
const qP = () => ({
  descriptor: {
    title: "Built-in Kit",
    description: "A kit containing built-in Breadboard nodes",
    url: ""
  },
  nodeTypes: [
    new gu("input", fn, {
      title: "Input",
      description: "The input node. Use it to request inputs for your board.",
      help: {
        url: "https://breadboard-ai.github.io/breadboard/docs/reference/kits/built-in/#the-input-node"
      }
    }),
    new gu("output", ps, {
      title: "Output",
      description: "The output node. Use it to provide outputs from your board.",
      help: {
        url: "https://breadboard-ai.github.io/breadboard/docs/reference/kits/built-in/#the-output-node"
      }
    })
  ]
}), HP = (n, e) => {
  const t = n.store.kits;
  return [
    qP(),
    // TODO(dglazkov) Clean this up.
    // ...createCustomTypesKit(graph.nodes, mutable),
    ...t.map((r) => ({
      descriptor: {
        title: r.title,
        description: r.description,
        url: r.url,
        tags: r.tags || []
      },
      nodeTypes: VP(r.handlers, n)
    }))
  ];
}, VP = (n, e) => Object.entries(n).sort().map(([t, r]) => Zw(t) ? new Xw(t, e) : new Jm(t, r));
class Jm {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  async metadata() {
    return this.currentMetadata();
  }
  type() {
    return this.#e;
  }
  currentMetadata() {
    return "metadata" in this.#t ? this.#t.metadata || {} : {};
  }
  async ports() {
    return Qw(this.#e, this.#t);
  }
}
class gu extends Jm {
  constructor(e, t, r) {
    super(e, {
      invoke: async () => {
      },
      describe: async () => t({}),
      metadata: r
    });
  }
}
class YP {
  #e = /* @__PURE__ */ new Map();
  #t;
  constructor(e) {
    this.#t = e;
  }
  getType(e) {
    return this.#e.get(e);
  }
  addType(e, t) {
    this.#e.set(e, t);
  }
  rebuild(e) {
    const t = HP(this.#t);
    this.#e = new Map(
      t.flatMap((r) => r.nodeTypes.map((s) => [s.type(), s]))
    );
  }
}
class JP {
  #e;
  #t;
  constructor({ code: e, metadata: t }) {
    this.#e = e, this.#t = t;
  }
  code() {
    return this.#e ?? "";
  }
  metadata() {
    return this.#t ?? {};
  }
}
class KP {
  #e = {};
  get(e) {
    return this.#e[e];
  }
  add(e, t) {
    this.#e[e] = new JP(t);
  }
  remove(e) {
    this.#e[e] && delete this.#e[e];
  }
  modules() {
    return this.#e ?? {};
  }
  rebuild(e) {
    if (e.modules)
      for (const [t, r] of Object.entries(e.modules))
        this.add(t, r);
  }
}
class ZP {
  #e;
  #t = /* @__PURE__ */ new Map();
  #n = /* @__PURE__ */ new Map();
  constructor(e) {
    this.#e = e;
  }
  rebuild(e) {
    e.nodes.forEach((t) => this.#r(t, "")), Object.entries(e.graphs || {}).forEach(([t, r]) => {
      r.nodes.forEach((s) => this.#r(s, t));
    });
  }
  addSubgraphNodes(e, t) {
    e.nodes.forEach((r) => this.#r(r, t));
  }
  removeSubgraphNodes(e) {
    this.#t.get(e)?.forEach((r) => {
      r.setDeleted();
    }), this.#t.delete(e);
  }
  #r(e, t) {
    const r = l(this.#n, t, () => /* @__PURE__ */ new Map()), s = this.#e(e, t), i = e.type;
    let a = r.get(i);
    return a || (a = [], r.set(i, a)), a.push(s), l(this.#t, t, () => /* @__PURE__ */ new Map()).set(e.id, s), s;
    function l(c, d, p) {
      let h = c.get(d);
      return h || (h = p(), c.set(d, h), h);
    }
  }
  byType(e, t) {
    return this.#n.get(t)?.get(e) || [];
  }
  get(e, t) {
    return this.#t.get(t)?.get(e);
  }
  add(e, t) {
    this.#t && this.#r(e, t);
  }
  remove(e, t) {
    if (!this.#t)
      return;
    const r = this.#t.get(t);
    if (!r) {
      console.error(
        `Can't remove node "${e}": graph "${t}" was not found`
      );
      return;
    }
    const s = r.get(e);
    console.assert(s, "Node does not exist in cache.");
    const i = s.descriptor.type, a = this.#n?.get(t)?.get(i);
    if (a) {
      const o = a.indexOf(s);
      a.splice(o, 1);
    }
    r.delete(e), s.setDeleted();
  }
  nodes(e) {
    return Array.from(this.#t.get(e)?.values() || []);
  }
}
function tc(n, e) {
  if (!e) return [...n];
  const { title: t, description: r, url: s, version: i, metadata: a } = e, o = {
    title: t,
    description: r,
    url: s,
    version: i,
    ...a
  };
  return [
    ...n,
    {
      path: "/env/metadata",
      data: [{ parts: [{ json: o }] }]
    }
  ];
}
function nc(n) {
  const { assets: e } = n || {};
  return e ? Object.entries(e).filter(([, t]) => Kn(t.data)).map(([t, r]) => {
    const s = r.data;
    return { path: `/assets/${t}`, data: s };
  }) : [];
}
function Co() {
  return {
    inputSchema: { type: "object" },
    outputSchema: { type: "object" }
  };
}
class bs {
  constructor(e) {
    this.mutable = e;
  }
  initial(e, t) {
    const r = this.mutable.nodes.get(t, e);
    return r ? bs.asWired(r.incoming(), r.outgoing()) : Co();
  }
  async latest(e, t) {
    const r = this.mutable.nodes.get(t, e);
    return r ? await this.getLatestDescription(
      r.descriptor.type,
      e,
      {
        incoming: r.incoming(),
        outgoing: r.outgoing(),
        inputs: { ...r.configuration() }
      }
    ) : Co();
  }
  willUpdate(e, t) {
    const r = new Pp(
      e.inputSchema,
      t.inputSchema
    );
    r.computeDiff();
    const s = new Pp(
      e.outputSchema,
      t.outputSchema
    );
    s.computeDiff(), r.same() && s.same() && XP(e, t);
  }
  updated(e, t) {
    this.mutable.store.dispatchEvent(
      new tr(this.mutable.id, e, t, [], !1)
    );
  }
  async #e(e) {
    let t;
    try {
      t = await ih(e, UA(this.mutable));
    } catch (r) {
      console.warn(`Error getting describer for node type ${e}`, r);
    }
    if (!(!t || !("describe" in t) || !t.describe))
      return t.describe;
  }
  async getLatestDescription(e, t, r = {}) {
    const s = mt.create(
      this.mutable.graph,
      t
    );
    if (!s.success)
      throw new Error(s.error);
    const i = s.result;
    if (e === "input") {
      if (i.main()) {
        if (!this.mutable.store.sandbox)
          throw new Error(
            "Sandbox not supplied, won't be able to describe this graph correctly"
          );
        const p = await io(
          {},
          this.mutable,
          i.graph(),
          r.inputs,
          {},
          {}
        );
        return p ? fn({
          inputs: {
            schema: p.inputSchema
          },
          incoming: r?.incoming,
          outgoing: r?.outgoing
        }) : fn(r);
      }
      return fn(r);
    }
    if (e === "output") {
      if (i.main()) {
        if (!this.mutable.store.sandbox)
          throw new Error(
            "Sandbox not supplied, won't be able to describe this graph correctly"
          );
        const p = await io(
          {},
          this.mutable,
          i.graph(),
          r.inputs,
          {},
          {}
        );
        return p ? ps({
          inputs: {
            schema: p.outputSchema
          },
          incoming: r?.incoming,
          outgoing: r?.outgoing
        }) : fn(r);
      }
      return ps(r);
    }
    const a = [...this.mutable.store.kits], o = await this.#e(e), l = bs.asWired(
      r.incoming,
      r.outgoing
    );
    if (!o)
      return l;
    const c = this.mutable.store.loader || Ql(), d = {
      outerGraph: i.outerGraph(),
      loader: c,
      kits: a,
      sandbox: this.mutable.store.sandbox,
      graphStore: this.mutable.store,
      fileSystem: this.mutable.store.fileSystem.createRunFileSystem({
        graphUrl: i.outerGraph().url,
        env: tc(
          this.mutable.store.fileSystem.env(),
          i.outerGraph()
        ),
        assets: nc(i.outerGraph())
      }),
      flags: this.mutable.store.flags,
      wires: {
        incoming: Object.fromEntries(
          (r?.incoming ?? []).map((p) => [
            p.in,
            {
              outputPort: {
                describe: async () => (await p.outPort()).type.schema
              }
            }
          ])
        ),
        outgoing: Object.fromEntries(
          (r?.outgoing ?? []).map((p) => [
            p.out,
            {
              inputPort: {
                describe: async () => (await p.inPort()).type.schema
              }
            }
          ])
        )
      },
      asType: !!r?.asType
    };
    i.url() && (d.base = i.url());
    try {
      return o(
        r?.inputs || void 0,
        l.inputSchema,
        l.outputSchema,
        d
      );
    } catch (p) {
      return console.warn(`Error describing node type ${e}`, p), l;
    }
  }
  static asWired(e = [], t = []) {
    return {
      inputSchema: xp(_p.In, e),
      outputSchema: xp(_p.Out, t)
    };
  }
}
function XP(n, e) {
  return !(n.title !== e.title || n.description !== e.description || n.metadata?.icon !== e.metadata?.icon);
}
let QP = class {
  #e;
  #t;
  #n = !1;
  constructor(e, t, r) {
    this.descriptor = e, this.#e = t, this.#t = r;
  }
  title() {
    return this.descriptor.metadata?.title || this.descriptor.id;
  }
  description() {
    return this.descriptor.metadata?.description || this.title();
  }
  incoming() {
    return new ke(this.#e, this.#t).incoming(
      this.descriptor.id
    );
  }
  outgoing() {
    return new ke(this.#e, this.#t).outgoing(
      this.descriptor.id
    );
  }
  isEntry() {
    return this.incoming().length === 0;
  }
  isExit() {
    return this.outgoing().length === 0;
  }
  isStart() {
    return new ke(this.#e, this.#t).isStart(
      this.descriptor.id
    );
  }
  type() {
    const e = new ke(this.#e, this.#t).typeForNode(
      this.descriptor.id
    );
    if (!e)
      throw new Error(
        `Possible integrity error: node ${this.descriptor.id} does not have a type`
      );
    return e;
  }
  configuration() {
    return this.descriptor.configuration || {};
  }
  metadata() {
    return this.descriptor.metadata || {};
  }
  async describe() {
    return this.#e.describe.get(
      this.descriptor.id,
      this.#t
    ).latest;
  }
  currentDescribe() {
    return this.#e.describe.get(
      this.descriptor.id,
      this.#t
    ).current;
  }
  currentPorts(e, t) {
    const r = this.#e.describe.get(
      this.descriptor.id,
      this.#t
    );
    return kp(
      this,
      r.current,
      r.updating,
      e,
      t
    );
  }
  async ports(e, t) {
    const r = await this.describe();
    return kp(
      this,
      r,
      !1,
      e,
      t
    );
  }
  setDeleted() {
    this.#n = !0;
  }
  deleted() {
    return this.#n;
  }
  routes() {
    return new ke(this.#e, this.#t).routes(
      this.descriptor.id
    );
  }
};
class eA {
  #e = /* @__PURE__ */ new Map();
  reconcilePorts(e, t) {
    if (!t)
      return this.createNewSnapshot(e);
    throw new Error("Not implemented");
  }
  createNewSnapshot(e) {
    return {
      updated: e,
      changes: {
        input: t(e.inputs),
        output: t(e.outputs),
        side: t(e.side)
      }
    };
    function t(r) {
      return {
        fixedChanged: r.fixed,
        deleted: [],
        added: r.ports,
        updated: []
      };
    }
  }
  current(e, t) {
    return this.#e.get(e)?.get(t);
  }
  getChanges(e, t, r) {
    let s = this.#e.get(e);
    s || (s = /* @__PURE__ */ new Map(), this.#e.set(e, s));
    const i = s.get(t), { updated: a, changes: o } = this.reconcilePorts(r, i);
    return s.set(t, a), o;
  }
}
class To {
  constructor(e, t) {
    this.legacyKitMetadata = null, this.store = t, this.id = crypto.randomUUID(), this.rebuild(e);
  }
  update(e, t, r, s, i) {
    for (const a of s) {
      if (this.modules.remove(a), !e.modules || !e.modules[a])
        continue;
      this.modules.add(a, e.modules[a]);
      const o = this.nodes.byType("runModule", "");
      for (const l of o)
        l.configuration().$module && l.configuration().$module === a && !r.find((c) => c.id === l.descriptor.id) && (r.push({
          id: l.descriptor.id,
          graphId: ""
        }), t = !1);
    }
    t || (this.describe.update(r), this.store.dispatchEvent(
      new tr(this.id, "", "", [], i)
    )), this.representation = new Sp(e), this.graph = e;
  }
  addSubgraph(e, t) {
    this.graphs.add(t), this.nodes.addSubgraphNodes(e, t), this.edges.addSubgraphEdges(e, t);
  }
  removeSubgraph(e) {
    this.graphs.remove(e), this.nodes.removeSubgraphNodes(e), this.edges.removeSubgraphEdges(e);
  }
  rebuild(e) {
    hl(e) && (e = fl(e)), this.representation = new Sp(e), this.graph = e, this.nodes = new ZP((t, r) => {
      if (!(r ? this.graphs.get(r) : this))
        throw new Error(
          `Inspect API Integrity error: unable to find subgraph "${r}"`
        );
      return new QP(t, this, r);
    }), this.edges = new NP(
      (t, r) => new UP(this, t, r)
    ), this.modules = new KP(), this.describe = new RP(new bs(this)), this.kits = new YP(this), this.graphs = new FP((t) => new BP(t, this)), this.ports = new eA(), this.graphs.rebuild(e), this.nodes.rebuild(e), this.edges.rebuild(e), this.modules.rebuild(e), this.kits.rebuild(e);
  }
}
class na extends Event {
  constructor(e, t, r, s, i, a, o, l, c) {
    super(na.eventName, {
      bubbles: !1,
      cancelable: !0,
      composed: !0
    }), this.graph = e, this.visualOnly = t, this.changeType = r, this.affectedNodes = s, this.affectedModules = i, this.affectedGraphs = a, this.topologyChange = o, this.integrationsChange = l, this.label = c;
  }
  static {
    this.eventName = "graphchange";
  }
}
class rc extends Event {
  constructor(e, t) {
    super(rc.eventName, {
      bubbles: !1,
      cancelable: !0,
      composed: !0
    }), this.graph = e, this.reason = t;
  }
  static {
    this.eventName = "graphchangereject";
  }
}
var tA = Object.create, Km = Object.defineProperty, nA = Object.getOwnPropertyDescriptor, rA = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), nr = (n) => {
  throw TypeError(n);
}, sA = (n, e, t) => e in n ? Km(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, iA = (n) => [, , , tA(null)], aA = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Ir = (n) => n !== void 0 && typeof n != "function" ? nr("Function expected") : n, oA = (n, e, t, r, s) => ({ kind: aA[n], name: e, metadata: r, addInitializer: (i) => t._ ? nr("Already initialized") : s.push(Ir(i || null)) }), lA = (n, e) => sA(e, rA("metadata"), n[3]), yu = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, cA = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !0, u = n.length + 1, y = n[u - 1] = [], v = n[u] || (n[u] = []), x = p && p < 5 && (p > 3 || !f) && nA({ get [t]() {
    return te(this, i);
  }, set [t](b) {
    return Gn(this, i, b);
  } }, t), m = r.length - 1; m >= 0; m--)
    c = oA(p, t, l = {}, n[3], v), c.static = h, c.private = f, d = c.access = { has: (b) => dA(s, b) }, d.get = (b) => te(b, s, x.get), d.set = (b, g) => Gn(b, s, g, x.set), o = (0, r[m])({ get: x.get, set: x.set }, c), l._ = 1, o === void 0 ? Ir(o) && (i = o) : typeof o != "object" || o === null ? nr("Object expected") : (Ir(a = o.get) && (x.get = a), Ir(a = o.set) && (x.set = a), Ir(a = o.init) && y.unshift(a));
  return x && Km(s, t, x), f ? p ^ 4 ? i : x : s;
}, Zm = (n, e, t) => e.has(n) || nr("Cannot " + t), dA = (n, e) => Object(e) !== e ? nr('Cannot use the "in" operator on this value') : n.has(e), te = (n, e, t) => (Zm(n, e, "read from private field"), t ? t.call(n) : e.get(n)), wi = (n, e, t) => e.has(n) ? nr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), Gn = (n, e, t, r) => (Zm(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t), Xm, Gt, Ce, vs, sc, Ba, St, ji, Ne;
Xm = [xt];
class Qm {
  constructor(e) {
    wi(this, Ne), wi(this, Gt), wi(this, Ce, new us()), wi(this, sc, yu(vs, 8, this, 0)), yu(vs, 11, this), Gn(this, Gt, e);
  }
  add(e, t, r, s) {
    te(this, Ce).splice(te(this, Ne, St) + 1), te(this, Ce).push({
      graph: structuredClone(e),
      label: t,
      timestamp: s,
      creator: r
    }), Gn(this, Ne, te(this, Ce).length - 1, ji), te(this, Gt).onHistoryChanged?.([...te(this, Ce)]);
  }
  revertTo(e) {
    te(this, Ce).splice(e + 1), Gn(this, Ne, e, ji);
    const t = te(this, Ce)[e];
    return te(this, Gt).setGraph(t.graph), te(this, Gt).onHistoryChanged?.([...te(this, Ce)]), t;
  }
  canUndo() {
    return te(this, Ne, St) > 0;
  }
  canRedo() {
    return te(this, Ne, St) < te(this, Ce).length - 1;
  }
  undo() {
    return this.jump(te(this, Ne, St) - 1);
  }
  redo() {
    return this.jump(te(this, Ne, St) + 1);
  }
  jump(e) {
    e >= 0 && e < te(this, Ce).length && Gn(this, Ne, e, ji);
    const t = te(this, Ce)[te(this, Ne, St)], r = t ? structuredClone(t.graph) : null;
    return r && te(this, Gt).setGraph(r), te(this, Gt).onHistoryChanged?.([...te(this, Ce)]), r;
  }
  entries() {
    return te(this, Ce);
  }
  index() {
    return te(this, Ne, St);
  }
  current() {
    return te(this, Ce)[te(this, Ne, St)]?.graph ?? null;
  }
  get pending() {
  }
}
vs = iA();
Gt = /* @__PURE__ */ new WeakMap();
Ce = /* @__PURE__ */ new WeakMap();
sc = /* @__PURE__ */ new WeakMap();
Ne = /* @__PURE__ */ new WeakSet();
Ba = cA(vs, 20, "#index", Xm, Ne, sc), St = Ba.get, ji = Ba.set;
lA(vs, Qm);
class pA {
  async do(e, t) {
    if (e.type !== "addasset")
      throw new Error(
        `Editor API integrity error: expected type "addasset", received "${e.type}" instead.`
      );
    const { path: r, metadata: s, data: i } = e, { graph: a } = t;
    a.assets ??= {};
    const o = { data: i };
    return a.assets[r] = o, s && (o.metadata = s), {
      success: !0,
      affectedGraphs: [],
      affectedModules: [],
      affectedNodes: []
    };
  }
}
function In(n) {
  return Eo(`Unable to inspect graph with the id of "${n}"`);
}
function Eo(n) {
  return {
    success: !1,
    error: n
  };
}
class eg {
  async can(e, t, r) {
    if (e = Ym(e), t.hasEdge(e))
      return {
        success: !1,
        error: `Edge from "${e.from}:${e.out}" to "${e.to}:${e.in}" already exists`
      };
    const s = t.nodeById(e.from);
    if (!s)
      return {
        success: !1,
        error: `Node with id "${e.from}" does not exist, but is required as the "from" part of the edge`
      };
    const i = t.nodeById(e.to);
    if (!i)
      return {
        success: !1,
        error: `Node with id "${e.to}" does not exist, but is required as the "to" part of the edge`
      };
    let a = null;
    if (e.out === "*" && e.in !== "*" ? a = 'A "*" output port cannot be connected to a named or control input port' : e.out === "" && e.in !== "" ? a = 'A control input port cannot be connected to a named or "*" output part' : e.in === "*" && e.out !== "*" ? a = 'A named input port cannot be connected to a "*" output port' : e.in === "" && e.out !== "" && (a = "A named input port cannot be connected to a control output port"), a)
      return { success: !1, error: a };
    const o = (await s.ports()).outputs;
    if (o.fixed && !o.ports.find((d) => d.name === e.out))
      return a ??= `Node with id "${e.from}" does not have an output port named "${e.out}"`, {
        success: !1,
        error: a
      };
    const l = (await i.ports()).inputs;
    return l.fixed && !l.ports.find((d) => d.name === e.in) ? (a ??= `Node with id "${e.to}" does not have an input port named "${e.in}"`, {
      success: !1,
      error: a
    }) : {
      success: !0,
      affectedNodes: [
        { id: e.from, graphId: r },
        { id: e.to, graphId: r }
      ],
      affectedModules: [],
      affectedGraphs: [r],
      topologyChange: !0
    };
  }
  async do(e, t) {
    if (e.type !== "addedge")
      throw new Error(
        `Editor API integrity error: expected type "addedge", received "${e.type}" instead.`
      );
    let r = e.edge;
    const { graphId: s } = e, { graph: i, mutable: a } = t, o = a.graphs.get(s);
    if (!o)
      return In(s);
    const l = await this.can(r, o, s);
    if (!l.success)
      return l;
    const c = mt.create(i, s);
    return c.success ? (r = ec(r), r = DP(r), a.edges.add(r, s), c.result.graph().edges.push(r), {
      success: !0,
      affectedNodes: [
        { id: r.from, graphId: s },
        { id: r.to, graphId: s }
      ],
      affectedModules: [],
      affectedGraphs: [s],
      topologyChange: !0
    }) : c;
  }
}
class uA {
  async do(e, t) {
    if (e.type !== "addgraph")
      throw new Error(
        `Editor API integrity error: expected type "addgraph", received "${e.type}" instead.`
      );
    const { id: r, graph: s } = e, { graph: i, mutable: a } = t;
    return i.graphs?.[r] ? {
      success: !1,
      error: `Failed to add graph: "${r}" already exists.`
    } : (i.graphs ??= {}, i.graphs[r] = s, a.addSubgraph(s, r), {
      success: !0,
      affectedModules: [],
      affectedNodes: [],
      affectedGraphs: [r]
    });
  }
}
class hA {
  async can(e, t) {
    return t.moduleById(e) ? {
      success: !1,
      error: `Unable to add module: module with id "${e}" already exists`
    } : {
      success: !0,
      affectedNodes: [],
      affectedModules: [e],
      affectedGraphs: []
    };
  }
  async do(e, t) {
    if (e.type !== "addmodule")
      throw new Error(
        `Editor API integrity error: expected type "addmodule", received "${e.type}" instead.`
      );
    const { id: r, module: s } = e, { graph: i, mutable: a } = t, o = a.graphs.get(""), l = await this.can(r, o);
    return l.success ? (i.modules ??= {}, i.modules[r] = s, {
      success: !0,
      affectedNodes: [],
      affectedModules: [r],
      affectedGraphs: []
    }) : l;
  }
}
class fA {
  async can(e, t) {
    return t.nodeById(e.id) ? {
      success: !1,
      error: `Unable to add node: a node with id "${e.id}" already exists`
    } : !t.typeById(e.type) ? {
      success: !1,
      error: `Unable to add node: node type "${e.type}" is not a known type`
    } : {
      success: !0,
      affectedNodes: [],
      affectedModules: [],
      affectedGraphs: [],
      topologyChange: !0
    };
  }
  async do(e, t) {
    if (e.type !== "addnode")
      throw new Error(
        `Editor API integrity error: expected type "addnode", received "${e.type}" instead.`
      );
    const { node: r, graphId: s } = e, { graph: i, mutable: a } = t, o = a.graphs.get(s);
    if (!o)
      return In(s);
    const l = mt.create(i, s);
    if (!l.success)
      return l;
    const c = await this.can(r, o);
    return c.success ? (l.result.graph().nodes.push(r), a.nodes.add(r, s), {
      success: !0,
      affectedNodes: [{ id: r.id, graphId: s }],
      affectedModules: [],
      affectedGraphs: [s],
      topologyChange: !0
    }) : c;
  }
}
class mA {
  #e(e, t) {
    return t ? t.title === e.title && t.description === e.description && t.type === e.type && t.subType == e.subType && t.managed === e.managed : !1;
  }
  async do(e, t) {
    if (e.type !== "changeassetmetadata")
      throw new Error(
        `Editor API integrity error: expected type "changeassetmetadata", received "${e.type}" instead.`
      );
    const { path: r, metadata: s } = e, { graph: i } = t, a = i.assets?.[r];
    if (!a)
      return {
        success: !1,
        error: `Unable to edit non-existing asset "${r}"`
      };
    const o = this.#e(s, a.metadata);
    return a.metadata = s, {
      visualOnly: o,
      success: !0,
      affectedGraphs: [],
      affectedModules: [],
      affectedNodes: []
    };
  }
}
class gA {
  async can(e, t) {
    return t.nodeById(e) ? {
      success: !0,
      affectedNodes: [],
      affectedModules: [],
      affectedGraphs: []
    } : {
      success: !1,
      error: `Unable to update configuration: node with id "${e}" does not exist`
    };
  }
  async do(e, t) {
    if (e.type !== "changeconfiguration")
      throw new Error(
        `Editor API integrity error: expected type "changeconfiguration", received "${e.type}" instead.`
      );
    const { id: r, configuration: s, graphId: i, reset: a = !1 } = e;
    if (!s)
      return {
        success: !1,
        error: "Configuration wasn't supplied."
      };
    const { mutable: o } = t, l = o.graphs.get(i);
    if (!l)
      return In(i);
    const c = await this.can(r, l);
    if (!c.success)
      return c;
    const d = l.nodeById(r);
    return d && (a ? d.descriptor.configuration = s : d.descriptor.configuration = {
      ...d.descriptor.configuration,
      ...s
    }), {
      success: !0,
      affectedNodes: [{ id: r, graphId: i }],
      affectedModules: [],
      affectedGraphs: [i]
    };
  }
}
const ic = (n, e) => n.edges.findIndex((t) => Po(e, t)), Po = (n, e) => n.from === e.from && n.to === e.to && n.out === e.out && n.in === e.in && e.constant === e.constant;
class yA {
  async do(e, t) {
    if (e.type !== "changeedgemetadata")
      return Eo(
        `Invalid edit operation: expected "changeedgemetadata", got "${e.type}".`
      );
    const { graphId: r, metadata: s, edge: i } = e, { graph: a } = t, o = mt.create(a, r);
    if (!o.success)
      return o;
    const l = o.result.graph(), c = ic(l, i);
    if (c < 0)
      return Eo(
        `Unable to find edge between "${i.from}" and "${i.to}`
      );
    const d = l.edges[c], p = d.metadata || {};
    return d.metadata = {
      ...p,
      ...s
    }, {
      success: !0,
      affectedGraphs: [r],
      affectedNodes: [],
      affectedModules: []
    };
  }
}
class tg {
  async can(e, t, r) {
    return t.hasEdge(e) ? {
      success: !0,
      affectedNodes: [
        { id: e.from, graphId: r },
        { id: e.to, graphId: r }
      ],
      affectedModules: [],
      affectedGraphs: [],
      topologyChange: !0
    } : {
      success: !1,
      error: `Edge from "${e.from}:${e.out}" to "${e.to}:${e.in}" does not exist`
    };
  }
  async do(e, t) {
    if (e.type !== "removeedge")
      throw new Error(
        `Editor API integrity error: expected type "removeedge", received "${e.type}" instead.`
      );
    let r = e.edge;
    const { graphId: s } = e, { mutable: i } = t, a = i.graphs.get(s);
    if (!a)
      return In(s);
    const o = await this.can(r, a, s);
    if (!o.success)
      return o;
    const l = mt.create(t.graph, s);
    if (!l.success)
      return l;
    const c = l.result.graph();
    r = ec(r);
    const d = c.edges, p = ic(c, r), h = d.splice(p, 1)[0];
    return i.edges.remove(h, s), {
      success: !0,
      affectedNodes: [
        { id: r.from, graphId: s },
        { id: r.to, graphId: s }
      ],
      affectedModules: [],
      affectedGraphs: [s],
      topologyChange: !0
    };
  }
}
class bA {
  async can(e, t, r, s) {
    if (Po(e, t))
      return {
        success: !0,
        affectedNodes: [],
        affectedModules: [],
        affectedGraphs: [s]
      };
    const a = await new tg().can(e, r, s);
    if (!a.success) return a;
    const l = await new eg().can(t, r, s);
    return l.success ? {
      success: !0,
      affectedNodes: [],
      affectedModules: [],
      affectedGraphs: [s]
    } : l;
  }
  async do(e, t) {
    if (e.type !== "changeedge")
      throw new Error(
        `Editor API integrity error: expected type "changeedge", received "${e.type}" instead.`
      );
    const { from: r, to: s, graphId: i } = e, { mutable: a } = t, o = a.graphs.get(i);
    if (!o)
      return In(i);
    const l = await this.can(r, s, o, i);
    if (!l.success)
      return l;
    if (Po(r, s))
      return {
        success: !0,
        noChange: !0,
        affectedNodes: [],
        affectedModules: [],
        affectedGraphs: [],
        topologyChange: !0
      };
    const c = mt.create(t.graph, i);
    if (!c.success)
      return c;
    const d = c.result.graph(), p = ec(r), h = d.edges, f = ic(d, p), u = h[f];
    return u.from = s.from, u.out = s.out, u.to = s.to, u.in = s.in, s.constant === !0 && (u.constant = s.constant), {
      success: !0,
      affectedNodes: [
        { id: u.from, graphId: i },
        { id: u.to, graphId: i }
      ],
      affectedModules: [],
      affectedGraphs: [i],
      topologyChange: !0
    };
  }
}
class vA {
  async do(e, t) {
    if (e.type !== "changegraphmetadata")
      throw new Error(
        `Editor API integrity error: expected type "changegraphmetadata", received "${e.type}" instead.`
      );
    const { metadata: r, graphId: s, title: i, description: a } = e, o = mt.create(t.graph, s);
    if (!o.success)
      return o;
    const l = o.result.graph(), c = l.metadata === r && !(i || a);
    return r && (l.metadata = r), i && (l.title = i), a && (l.description = a), {
      success: !0,
      visualOnly: c,
      affectedNodes: [],
      affectedModules: [],
      affectedGraphs: [s]
    };
  }
}
class wA {
  async can(e, t) {
    return t.nodeById(e) ? {
      success: !0,
      affectedNodes: [],
      affectedModules: [],
      affectedGraphs: []
    } : {
      success: !1,
      error: `Unable to change metadata: node with id "${e}" does not exist`
    };
  }
  #e(e, t) {
    return t.title === e.title && t.description === e.description && t.logLevel === e.logLevel;
  }
  async do(e, t) {
    if (e.type !== "changemetadata")
      throw new Error(
        `Editor API integrity error: expected type "changemetadata", received "${e.type}" instead.`
      );
    const { id: r, metadata: s, graphId: i, reset: a = !1 } = e, { mutable: o } = t, l = o.graphs.get(i);
    if (!l)
      return In(i);
    const c = await this.can(r, l);
    if (!c.success) return c;
    const d = l.nodeById(r);
    if (!d)
      return { success: !1, error: `Unknown node with id "${r}"` };
    const p = this.#e(
      s,
      d.descriptor.metadata || {}
    ), h = d.descriptor.metadata;
    return a ? d.descriptor.metadata = s : d.descriptor.metadata = {
      ...h,
      ...s
    }, {
      success: !0,
      visualOnly: p,
      affectedNodes: p ? [] : [{ id: r, graphId: i }],
      affectedModules: [],
      affectedGraphs: [i]
    };
  }
}
class xA {
  async can(e, t) {
    return !t.moduleById(e) ? {
      success: !1,
      error: `Unable to update module: module with id "${e}" does not exist`
    } : {
      success: !0,
      affectedNodes: [],
      affectedModules: [e],
      affectedGraphs: []
    };
  }
  async do(e, t) {
    if (e.type !== "changemodule")
      throw new Error(
        `Editor API integrity error: expected type "changemodule", received "${e.type}" instead.`
      );
    const r = e.id, { graph: s, mutable: i } = t, a = i.graphs.get(""), o = await this.can(r, a);
    return o.success ? (s.modules = s.modules || {}, s.modules[e.id] = e.module, {
      success: !0,
      affectedNodes: [],
      affectedModules: [e.id],
      affectedGraphs: [],
      visualOnly: !1
    }) : o;
  }
}
class _A {
  async do(e, t) {
    if (e.type !== "removeasset")
      throw new Error(
        `Editor API integrity error: expected type "removeasset", received "${e.type}" instead.`
      );
    const { path: r } = e, {
      graph: { assets: s }
    } = t;
    return s && (delete s[r], Object.keys(s).length === 0 && delete t.graph.assets), {
      success: !0,
      affectedGraphs: [],
      affectedModules: [],
      affectedNodes: []
    };
  }
}
class kA {
  async do(e, t) {
    if (e.type !== "removegraph")
      throw new Error(
        `Editor API integrity error: expected type "removegraph", received "${e.type}" instead.`
      );
    const { id: r } = e, { graph: s, mutable: i } = t;
    return !s.graphs || !s.graphs?.[r] ? {
      success: !1,
      error: `Failed to remove graph: "${r}" does not exist.`
    } : (delete s.graphs[r], Object.keys(s.graphs).length || delete s.graphs, i.removeSubgraph(r), {
      success: !0,
      affectedModules: [],
      affectedNodes: [],
      affectedGraphs: [r]
    });
  }
}
class SA {
  async can(e, t) {
    return t.moduleById(e) ? {
      success: !0,
      affectedNodes: [],
      affectedModules: [e],
      affectedGraphs: []
    } : {
      success: !1,
      error: `Module "${e}" does not exist`
    };
  }
  async do(e, t) {
    if (e.type !== "removemodule")
      throw new Error(
        `Editor API integrity error: expected type "removemodule", received "${e.type}" instead.`
      );
    const { id: r } = e, { graph: s, mutable: i } = t, a = i.graphs.get(""), o = await this.can(r, a);
    return o.success ? s.modules ? (delete s.modules[r], {
      success: !0,
      affectedNodes: [],
      affectedModules: [r],
      affectedGraphs: []
    }) : {
      success: !1,
      error: "Modules do not exist on graph"
    } : o;
  }
}
class IA {
  async can(e, t, r) {
    return !t.nodeById(e) ? {
      success: !1,
      error: `Unable to remove node: node with id "${e}" does not exist`
    } : {
      success: !0,
      affectedNodes: [{ id: e, graphId: r }],
      affectedModules: [],
      affectedGraphs: [],
      topologyChange: !0
    };
  }
  async do(e, t) {
    if (e.type !== "removenode")
      throw new Error(
        `Editor API integrity error: expected type "removenode", received "${e.type}" instead.`
      );
    const { id: r, graphId: s } = e, { mutable: i } = t, a = i.graphs.get(s);
    if (!a)
      return In(s);
    const o = await this.can(r, a, s);
    if (!o.success)
      return o;
    const l = mt.create(t.graph, s);
    if (!l.success)
      return l;
    const c = l.result.graph();
    return c.edges = c.edges.filter((d) => {
      const p = d.from === r || d.to === r;
      return p && i.edges.remove(d, s), !p;
    }), c.nodes = c.nodes.filter((d) => d.id != r), i.nodes.remove(r, s), {
      success: !0,
      affectedNodes: [{ id: r, graphId: s }],
      affectedModules: [],
      affectedGraphs: [s],
      topologyChange: !0
    };
  }
}
class $A {
  async do(e, t) {
    if (e.type !== "replacegraph")
      throw new Error(
        `Editor API integrity error: expected type "replacegraph", received "${e.type}" instead.`
      );
    const r = t.graph.url;
    for (const s in t.graph)
      Object.prototype.hasOwnProperty.call(t.graph, s) && delete t.graph[s];
    return Object.assign(t.graph, e.replacement), t.graph.url = r, t.mutable.rebuild(e.replacement), {
      success: !0,
      // We don't need to include any affected things, because rebuild replaces
      // them anyway.
      affectedModules: [],
      affectedNodes: [],
      affectedGraphs: [],
      topologyChange: !0
    };
  }
}
class CA {
  async do(e, t) {
    if (e.type !== "toggleexport")
      throw new Error(
        `Editor API integrity error: expected type "toggleexport", received "${e.type}" instead.`
      );
    const { id: r, exportType: s } = e, { mutable: i } = t;
    let a;
    const o = [], l = [];
    if (s === "imperative") {
      const d = r;
      if (!i.graph.modules?.[d])
        return {
          success: !1,
          error: `Unable to toggle export: module "${d}" does not exist.`
        };
      a = `#module:${r}`, l.push(r);
    } else {
      const d = r;
      if (d !== "" && !i.graph.graphs?.[d])
        return {
          success: !1,
          error: `Unable to toggle export: graph "${d}" does not exist.`
        };
      a = `#${r}`, o.push(r);
    }
    const c = new Set(i.graph.exports || []);
    return c.has(a) ? c.delete(a) : c.add(a), i.graph.exports = [...c], {
      success: !0,
      affectedNodes: [],
      affectedModules: l,
      affectedGraphs: o
    };
  }
}
class TA {
  async do(e, t) {
    if (e.type !== "upsertintegration")
      throw new Error(
        `Editor API integrity error: expected type "upsertintegration", received "${e.type}" instead.`
      );
    const { id: r, integration: s } = e, { graph: i } = t;
    return i.integrations ??= {}, i.integrations[r] = s, {
      success: !0,
      affectedGraphs: [],
      affectedModules: [],
      affectedNodes: [],
      integrationsChange: !0
    };
  }
}
class EA {
  async do(e, t) {
    if (e.type !== "removeintegration")
      throw new Error(
        `Editor API integrity error: expected type "removeintegration", received "${e.type}" instead.`
      );
    const { id: r } = e, {
      graph: { integrations: s }
    } = t;
    let i = !1;
    return s?.[r] ? (delete s[r], Object.keys(s).length === 0 && delete t.graph.integrations) : i = !0, {
      success: !0,
      affectedGraphs: [],
      affectedModules: [],
      affectedNodes: [],
      integrationsChange: !0,
      noChange: i
    };
  }
}
const PA = [
  "addmodule",
  "changegraphmetadata",
  "removemodule",
  "changemodule",
  "toggleexport"
], AA = /* @__PURE__ */ new Map([
  ["addnode", new fA()],
  ["removenode", new IA()],
  ["addedge", new eg()],
  ["removeedge", new tg()],
  ["changeedge", new bA()],
  ["changeedgemetadata", new yA()],
  ["changeconfiguration", new gA()],
  ["changemetadata", new wA()],
  ["changegraphmetadata", new vA()],
  ["addmodule", new hA()],
  ["removemodule", new SA()],
  ["changemodule", new xA()],
  ["addgraph", new uA()],
  ["removegraph", new kA()],
  ["toggleexport", new CA()],
  ["addasset", new pA()],
  ["removeasset", new _A()],
  ["changeassetmetadata", new mA()],
  ["replacegraph", new $A()],
  ["upsertintegration", new TA()],
  ["removeintegration", new EA()]
]);
let MA = class {
  #e;
  #t;
  #n = new EventTarget();
  #r;
  #s = null;
  #i = new Ex();
  constructor(e, t) {
    const r = e.graph;
    if (hl(r) ? (this.#s = r.main, this.#t = fl(r)) : this.#t = r, this.#e = e, this.#r = new Qm({
      graph: () => this.raw(),
      setGraph: (s) => {
        this.#t = s, this.#e.rebuild(s), this.#n.dispatchEvent(
          new na(
            this.raw(),
            !1,
            "history",
            [],
            [],
            [],
            !0,
            !0,
            null
          )
        );
      },
      onHistoryChanged: t.onHistoryChanged
    }), t.history?.length)
      for (const s of t.history)
        this.#r.add(
          s.graph,
          s.label,
          s.creator,
          s.timestamp
        );
    else
      this.#r.add(
        this.raw(),
        "Clean slate",
        t.creator ?? { role: "unknown" },
        Date.now()
      );
  }
  #o(e, t, r, s, i, a, o) {
    this.#e.update(
      this.#t,
      e,
      t,
      r,
      i
    ), this.#n.dispatchEvent(
      new na(
        this.#t,
        e,
        "edit",
        t,
        r,
        s,
        i,
        a,
        o
      )
    );
  }
  #l(e, t) {
    this.#t = e, this.#e.rebuild(this.#t), this.#a(t);
  }
  #a(e) {
    this.#t = { ...this.#t };
    const t = e ? {
      type: "error",
      error: e
    } : {
      type: "nochange"
    };
    this.#n.dispatchEvent(new rc(this.raw(), t));
  }
  addEventListener(e, t, r) {
    this.#n.addEventListener(e, t, r);
  }
  removeEventListener(e, t) {
    this.#n.removeEventListener(e, t);
  }
  #c(e) {
    return this.#s ? !PA.includes(e.type) : !1;
  }
  async #u(e, t) {
    const r = AA.get(e.type);
    return r ? r.do(e, t) : {
      success: !1,
      error: "Unsupported edit type"
    };
  }
  async edit(e, t, r = !1) {
    return this.#i.add(
      () => this.#p(async (s) => (await s.apply(e, t), { success: !0, spec: { edits: e, label: t } }), r)
    );
  }
  async apply(e, t = !1) {
    return this.#i.add(
      () => this.#p((r) => e.apply(r), t)
    );
  }
  history() {
    return this.#r;
  }
  raw() {
    return this.#s ? ex(this.#s, this.#t) : this.#t;
  }
  inspect(e) {
    const t = this.#e.graphs.get(e || "");
    if (!t)
      throw new Error(`Unknown sub-graph id: "${e}"`);
    return t;
  }
  async #p(e, t = !1) {
    const r = structuredClone(this.#t), s = [];
    let i = "", a = { role: "unknown" }, o = null, l = !0, c = !0;
    const d = [], p = [], h = [];
    let f = !1, u = !1, y;
    const v = async (m, b) => {
      if (o) return { success: !1, error: o };
      i = b;
      for (const g of m) {
        if (this.#c(g))
          continue;
        const _ = await this.#u(g, y);
        if (s.push({ edit: g.type, result: _ }), !_.success)
          return o = _.error, { success: !1, error: o };
        d.push(_.affectedNodes), p.push(_.affectedModules), h.push(_.affectedGraphs), _.noChange || (l = !1), _.visualOnly || (c = !1), _.topologyChange && (u = !0), _.integrationsChange && (f = !0), "creator" in g && (a = g.creator);
      }
      return { success: !0, result: void 0 };
    };
    if (t) {
      const m = r, b = new To(m, this.#e.store);
      y = { graph: m, mutable: b, apply: v };
    } else
      y = { graph: this.#t, mutable: this.#e, apply: v };
    const x = await e(y);
    return x.success || (o = x.error), o ? (t || this.#l(r, o), { success: !1, log: s, error: o }) : l ? (t || this.#a(), { success: !0, log: s }) : (this.#r.add(this.raw(), i, a, Date.now()), t || this.#o(
      c,
      OA(d.flat()),
      [...new Set(p.flat())],
      [...new Set(h.flat())],
      u,
      f,
      i
    ), { success: !0, log: s });
  }
};
function OA(n) {
  const e = /* @__PURE__ */ new Set();
  return n.filter((t) => {
    const r = `${t.id}|${t.id}`;
    return e.has(r) ? !1 : (e.add(r), !0);
  });
}
class jA {
  constructor(e) {
    this.args = e;
  }
  #e = /* @__PURE__ */ new Map();
  get(e) {
    let t = this.#e.get(e);
    return t || (t = new Vi({
      initial: () => this.args.initial(),
      latest: () => this.args.latest(e),
      updated: () => this.args.updated(e)
    }), this.#e.set(e, t)), t.snapshot();
  }
  update(e) {
    for (const t of e)
      this.#e.delete(t);
  }
  clear() {
    this.#e.clear();
  }
}
const RA = crypto.randomUUID(), bu = tx.href;
class DA {
  constructor(e) {
    this.store = e;
  }
  initial() {
    return Co();
  }
  updated() {
    this.store.dispatchEvent(
      new tr(RA, "", "", [], !1)
    );
  }
  latest(e) {
    return this.getLatestDescription(e);
  }
  async getLatestDescription(e) {
    if (e === "input")
      return fn({});
    if (e === "output")
      return ps({});
    const t = [...this.store.kits], r = await this.#e(e), s = bs.asWired();
    if (!r)
      return s;
    const i = this.store.loader || Ql(), o = {
      outerGraph: {
        nodes: [],
        edges: [],
        url: bu
      },
      loader: i,
      kits: t,
      sandbox: this.store.sandbox,
      graphStore: this.store,
      fileSystem: this.store.fileSystem.createRunFileSystem({
        graphUrl: bu,
        env: tc(this.store.fileSystem.env()),
        assets: nc()
      }),
      wires: { incoming: {}, outgoing: {} },
      asType: !0,
      flags: this.store.flags
    };
    try {
      return r(
        void 0,
        s.inputSchema,
        s.outputSchema,
        o
      );
    } catch (l) {
      return console.warn(`Error describing node type ${e}`, l), s;
    }
  }
  async #e(e) {
    let t;
    try {
      t = await ih(
        e,
        NA(this.store)
      );
    } catch (r) {
      console.warn(`Error getting describer for node type ${e}`, r);
    }
    if (!(!t || !("describe" in t) || !t.describe))
      return t.describe;
  }
}
function UA(n) {
  const e = n.store;
  return {
    kits: [...e.kits],
    loader: e.loader,
    sandbox: e.sandbox,
    graphStore: e,
    outerGraph: n.graph
  };
}
function NA(n) {
  return {
    kits: [...n.kits],
    loader: n.loader,
    sandbox: n.sandbox,
    graphStore: n
  };
}
class GA extends EventTarget {
  #e = /* @__PURE__ */ new Map();
  #t = /* @__PURE__ */ new Map();
  #n = /* @__PURE__ */ new Map();
  constructor(e) {
    super(), this.kits = e.kits, this.sandbox = e.sandbox, this.loader = e.loader, this.fileSystem = e.fileSystem, this.flags = e.flags, this.types = new jA(
      new DA(this)
    );
  }
  async load(e, t) {
    const r = [];
    if (t) {
      const i = t.outerGraph?.url;
      if (i) {
        const a = this.addByURL(i, [], t);
        r.push(a.mutable.id);
      }
    }
    const s = this.addByURL(e, r, t);
    try {
      return {
        success: !0,
        graph: (await this.getLatest(s.mutable)).graph,
        subGraphId: s.graphId,
        moduleId: s.moduleId
      };
    } catch (i) {
      return {
        success: !1,
        error: i.message
      };
    }
  }
  getByDescriptor(e) {
    const t = this.#s(e);
    return t.success ? { success: !0, result: t.result.id } : t;
  }
  editByDescriptor(e, t = {}) {
    const r = this.#s(e);
    if (!r.success) {
      console.error(`Failed to edityByDescriptor: ${r.error}`);
      return;
    }
    return this.edit(r.result.id, t);
  }
  edit(e, t = {}) {
    const r = this.get(e);
    if (r)
      return new MA(r, t);
  }
  inspect(e, t) {
    const r = this.get(e);
    if (r)
      return r.graphs.get(t);
  }
  addByURL(e, t, r = {}) {
    const { mainGraphUrl: s, graphId: i, moduleId: a } = so(
      e,
      r
    ), o = this.#e.get(s);
    if (o) {
      this.#r(o, t);
      const d = this.#t.get(o);
      return {
        mutable: d.current(),
        graphId: i,
        moduleId: a,
        updating: d.updating()
      };
    }
    const l = this.#o(s, r), c = l.current();
    return this.#t.set(c.id, l), this.#e.set(s, c.id), this.#r(c.id, t), {
      mutable: c,
      graphId: i,
      moduleId: a,
      updating: l.updating()
    };
  }
  async getLatest(e) {
    const t = this.#t.get(e.id);
    return t ? t.latest() : e;
  }
  #r(e, t) {
    if (!t.length) return;
    let r = this.#n.get(e);
    r || (r = /* @__PURE__ */ new Set(), this.#n.set(e, r)), t.forEach((s) => {
      r.add(s);
    });
  }
  #s(e) {
    let t = e.url, r = null;
    t || (r = ul(e), t = `hash:${r}`);
    const { mainGraphUrl: s } = so(t), i = this.#e.get(s);
    if (i) {
      const a = this.#t.get(i)?.current();
      return a ? { success: !0, result: a } : FA(`Integrity error: main graph "${i}" not found in store.`);
    } else {
      const a = this.#i(e), o = a.current();
      return this.#t.set(o.id, a), this.#e.set(t, o.id), { success: !0, result: o };
    }
  }
  #i(e) {
    const t = new To(e, this);
    return new Vi({
      initial() {
        return t;
      },
      latest() {
        return Promise.resolve(t);
      }
    });
  }
  #o(e, t) {
    const r = new To(zA(), this);
    let s = "";
    return new Vi({
      initial: () => r,
      latest: async () => {
        const i = this.loader;
        if (!i)
          throw new Error(`Unable to load "${e}": no loader provided`);
        const a = await i.load(e, t);
        if (!a.success)
          throw new Error(a.error);
        return r.rebuild(a.graph), s = a.subGraphId || "", r;
      },
      updated: () => {
        this.dispatchEvent(
          new tr(
            r.id,
            s,
            "",
            [...this.#n.get(r.id) || []],
            !0
          )
        );
      }
    });
  }
  get(e) {
    return this.#t.get(e)?.current();
  }
}
function FA(n) {
  return {
    success: !1,
    error: n
  };
}
function zA() {
  return {
    edges: [],
    nodes: []
  };
}
function LA(n) {
  return new GA(n);
}
class WA {
  constructor(e, t, r) {
    this.moduleFactory = r, this.#t = Gh({
      env: t?.env() || [],
      local: Fh(zh()),
      mnt: Lh(/* @__PURE__ */ new Map())
    }), this.#e = e.kits;
  }
  #e;
  #t;
  async autoname(e, t) {
    const r = {
      kits: this.#e,
      fileSystem: this.#t,
      signal: t
    }, s = await this.moduleFactory.createRunnableModule(
      {},
      {
        url: "embed://a2/autoname.bgl.json#module:main"
      },
      r,
      new ds(r)
    );
    return w(s) ? (await s.invoke("main", { context: e })).context : s;
  }
}
class BA {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  async getG1SubscriptionStatus(e) {
    const t = new URL("v1beta1/getG1SubscriptionStatus", this.#t), r = await this.#e(t, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(e)
    });
    if (!r.ok)
      throw new Error(
        `Failed to get G1 subscription status: ${r.statusText}`
      );
    return await r.json();
  }
  async getG1Credits() {
    const e = new URL("v1beta1/getG1Credits", this.#t), t = await this.#e(e, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: "{}"
    });
    if (!t.ok)
      throw new Error(`Failed to get G1 credits: ${t.statusText}`);
    return await t.json();
  }
  async chat(e) {
    const t = new URL("v1beta1/chatGenerateApp", this.#t);
    return await (await this.#e(t, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(e)
    })).json();
  }
  async *generateOpalStream(e, t = !1) {
    const r = {
      intent: e,
      appOptions: {
        format: "FORMAT_GEMINI_FLOWS",
        ...t && {
          featureFlags: { enable_agent_mode_planner: !0 }
        }
      }
    };
    yield* this.chatStream(r, "generateOpalStream");
  }
  async *editOpalStream(e, t, r = !1) {
    const s = {
      reviseIntent: e,
      appOptions: {
        format: "FORMAT_GEMINI_FLOWS",
        ...r && {
          featureFlags: { enable_agent_mode_planner: !0 }
        }
      },
      app: {
        parts: [
          {
            text: JSON.stringify(t),
            partMetadata: {
              chunk_type: "breadboard"
            }
          }
        ]
      }
    };
    yield* this.chatStream(s, "editOpalStream");
  }
  async *chatStream(e, t = "generateOpalStream") {
    const r = new URL(`v1beta1/${t}`, this.#t);
    r.searchParams.set("alt", "sse");
    const s = await this.#e(r, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(e)
    });
    if (!s.ok || !s.body)
      throw new Error(`Failed to start stream: ${s.statusText}`);
    yield* ll(s.body);
  }
  async checkTos() {
    try {
      const e = await (await this.#e(
        new URL("v1beta1/checkAppAccess", this.#t)
      )).json();
      return e.accessStatus !== "ACCESS_STATUS_OK" && (e.canAccess = !1), e;
    } catch {
      return { canAccess: !1, accessStatus: "Unable to check" };
    }
  }
  async acceptTos(e = 1, t = !1) {
    const r = new URL("v1beta1/acceptToS", this.#t), s = await this.#e(r, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        termsOfServiceVersion: e,
        acceptTos: t
      })
    });
    if (!s.ok)
      throw new Error(`Failed to accept TOS: ${s.statusText}`);
  }
  async fetchEmailPreferences(e) {
    const t = new URL("v1beta1/getEmailPreferences", this.#t), r = {
      preferenceKeys: e
    }, s = await this.#e(t, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(r)
    });
    if (!s.ok)
      throw new Error(
        `Failed to fetch email preferences: ${s.statusText}`
      );
    const i = await s.json();
    return {
      hasStoredPreferences: i.preferenceResponses?.some((a) => a.hasStoredPreference) ?? !1,
      preferences: i.preferenceResponses?.map((a) => [
        a.preferenceKey,
        a.notifyPreference === "NOTIFY_PREFERENCE_NOTIFY"
        /* NOTIFY */
      ]) ?? []
    };
  }
  async setEmailPreferences(e) {
    const t = new URL("v1beta1/setEmailPreferences", this.#t), r = {
      preferenceEntries: e.map(([i, a]) => ({
        preferenceKey: i,
        notifyPreference: a ? "NOTIFY_PREFERENCE_NOTIFY" : "NOTIFY_PREFERENCE_DROP"
        /* DROP */
      }))
    }, s = await this.#e(t, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(r)
    });
    if (!s.ok)
      throw new Error(
        `Failed to set email preferences: ${s.statusText}`
      );
  }
}
var qA = Object.create, ng = Object.defineProperty, HA = Object.getOwnPropertyDescriptor, VA = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Ms = (n) => {
  throw TypeError(n);
}, YA = (n, e, t) => e in n ? ng(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, JA = (n) => [, , , qA(null)], rg = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], $r = (n) => n !== void 0 && typeof n != "function" ? Ms("Function expected") : n, KA = (n, e, t, r, s) => ({ kind: rg[n], name: e, metadata: r, addInitializer: (i) => t._ ? Ms("Already initialized") : s.push($r(i || null)) }), ZA = (n, e) => YA(e, VA("metadata"), n[3]), Pn = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, ac = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = rg[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, HA({ get [t]() {
    return Ao(this, i);
  }, set [t](g) {
    return ig(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = KA(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? $r(o) && (m[y] = o) : typeof o != "object" || o === null ? Ms("Object expected") : ($r(a = o.get) && (m.get = a), $r(a = o.set) && (m.set = a), $r(a = o.init) && v.unshift(a));
  return m && ng(s, t, m), s;
}, sg = (n, e, t) => e.has(n) || Ms("Cannot " + t), Ao = (n, e, t) => (sg(n, e, "read from private field"), t ? t.call(n) : e.get(n)), xi = (n, e, t) => e.has(n) ? Ms("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), ig = (n, e, t, r) => (sg(n, e, "write to private field"), e.set(n, t), t), ag, og, lg, Cr, pt, oc, lc, cc;
const XA = [
  "OPAL_MARKETING_UPDATES",
  "OPAL_USER_RESEARCH"
];
lg = [xt], og = [xt], ag = [xt];
class Os {
  constructor(e) {
    xi(this, Cr), xi(this, oc, Pn(pt, 8, this, !1)), Pn(pt, 11, this), xi(this, lc, Pn(pt, 12, this, !1)), Pn(pt, 15, this), xi(this, cc, Pn(pt, 16, this, new Xt())), Pn(pt, 19, this), ig(this, Cr, e);
  }
  async refreshPrefs() {
    this.prefsValid = !1;
    const e = await Ao(this, Cr).fetchEmailPreferences(XA);
    this.hasStoredPreferences = e.hasStoredPreferences, this.emailPrefs = new Xt(e.preferences), this.prefsValid = !0;
  }
  updateEmailPrefs(e) {
    for (const [t, r] of e)
      this.emailPrefs.set(t, r), this.hasStoredPreferences = !0;
    Ao(this, Cr).setEmailPreferences(e);
  }
}
pt = JA();
Cr = /* @__PURE__ */ new WeakMap();
oc = /* @__PURE__ */ new WeakMap();
lc = /* @__PURE__ */ new WeakMap();
cc = /* @__PURE__ */ new WeakMap();
ac(pt, 4, "prefsValid", lg, Os, oc);
ac(pt, 4, "hasStoredPreferences", og, Os, lc);
ac(pt, 4, "emailPrefs", ag, Os, cc);
ZA(pt, Os);
function QA(n) {
  const { nodes: e, edges: t } = n;
  if (!e || e.length === 0)
    return { stages: [] };
  const r = new Map(e.map((u) => [u.id, u])), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  e.forEach((u) => {
    s.set(u.id, 0), i.set(u.id, []), a.set(u.id, []);
  }), t && t.forEach((u) => {
    const y = s.get(u.to) || 0;
    s.set(u.to, y + 1);
    const v = i.get(u.from) || [];
    v.push({ ...u }), i.set(u.from, v);
    const x = a.get(u.to) || [];
    x.push({ ...u }), a.set(u.to, x);
  });
  const o = [], l = e.filter((u) => s.get(u.id) === 0), c = [], d = [];
  let p = !0;
  l.forEach((u) => {
    (i.get(u.id) || []).length == 0 ? c.push(u) : (p = !1, d.push(u));
  });
  let h;
  c.length === 0 ? h = l : p ? h = [c[0]] : h = d;
  const f = /* @__PURE__ */ new Set();
  for (; h.length > 0; ) {
    const u = [], y = [];
    for (; h.length > 0; ) {
      const v = h.shift();
      if (f.has(v.id)) continue;
      f.add(v.id);
      const x = i.get(v.id) || [], m = a.get(v.id) || [], b = {
        node: r.get(v.id),
        downstream: x,
        upstream: m
      };
      u.push(b), (i.get(v.id) || []).forEach((g) => {
        const _ = s.get(g.to) || 0;
        if (_ > 0 && (s.set(g.to, _ - 1), _ === 1)) {
          const $ = r.get(g.to);
          $ && y.push($);
        }
      });
    }
    u.length > 0 && o.push(u), h.push(...y);
  }
  return { stages: o };
}
const eM = /* @__PURE__ */ new Set([
  "succeeded",
  "failed"
]), qa = /* @__PURE__ */ new Set([
  "succeeded",
  "failed",
  "skipped",
  "interrupted"
]), Tr = /* @__PURE__ */ new Set([
  "working",
  "waiting"
]), tM = /* @__PURE__ */ new Set([
  "ready",
  ...Tr
]), vu = /* @__PURE__ */ new Set([
  "succeeded",
  "failed",
  "interrupted",
  ...tM
]), nM = /* @__PURE__ */ new Set([
  "ready",
  "succeeded",
  "failed",
  "interrupted"
]);
class rM {
  constructor(e, t) {
    this.plan = e, this.callbacks = t, this.reset();
  }
  #e = /* @__PURE__ */ new Map();
  #t = 0;
  #n = "initial";
  /**
   * A signal to manage changes to the orchestrator state, so that this
   * class can be used with signals.
   */
  #r = new Zt.State({});
  /**
   * Returns current progress of the orchestration.
   */
  get progress() {
    return this.#r.get(), this.#n;
  }
  get working() {
    return this.#r.get(), Array.from(this.#e.values()).some((e) => Tr.has(e.state));
  }
  get allWorking() {
    return Array.from(this.fullState().entries()).filter(([, e]) => e.state === "working");
  }
  get allWaiting() {
    return Array.from(this.fullState().entries()).filter(([, e]) => e.state === "waiting");
  }
  get failed() {
    return this.#r.get(), Array.from(this.#e.values()).some((e) => e.state === "failed" || e.state === "interrupted");
  }
  getNodeState(e) {
    const t = this.#e.get(e);
    return t ? this.#i(t) : null;
  }
  /**
   * Bring the orchestrator to the initial state.
   */
  reset() {
    this.#r.set({}), this.#e.clear(), this.#s(0);
  }
  #s(e) {
    this.#r.set({});
    const t = this.#e, r = this.plan.stages.slice(e);
    try {
      r.forEach((s, i) => {
        const a = i === 0;
        s.forEach((o) => {
          const l = t.get(o.node.id), c = a ? l?.inputs || {} : null, d = l?.state || "inactive";
          let p;
          Tr.has(d) ? p = d : p = a ? "ready" : "inactive", t.set(o.node.id, {
            stage: e + i,
            state: p,
            plan: o,
            inputs: c,
            outputs: null
          }), this.callbacks.stateChangedbyOrchestrator?.(o.node.id, p), this.callbacks.stateChanged?.(p, o);
        });
      });
    } catch (s) {
      return k(s.message);
    }
    this.#t = e, this.#n = e == 0 ? "initial" : "advanced";
  }
  restartAtCurrentStage() {
    return this.restartAtStage(this.#t);
  }
  restartAtStage(e) {
    return e < 0 ? this.reset() : e > this.#t ? k(`Stage ${e} is beyond the current stage`) : this.#s(e);
  }
  restartAtNode(e) {
    this.#r.set({});
    const t = this.#e.get(e);
    if (!t)
      return k(`Unable to restart at node "${e}": node not found`);
    if (!nM.has(t.state))
      return k(
        `Unable to restart at a node "${e}": node state is "${t.state}"`
      );
    const r = t.stage, s = /* @__PURE__ */ new Map();
    try {
      this.plan.stages[r].forEach((o) => {
        const l = o.node.id;
        if (l === e)
          return;
        const c = this.#e.get(l);
        if (!c)
          throw new Error(`Unable to restart at node "${e}": node not found`);
        c.outputs && s.set(l, c.outputs);
      });
      const a = this.restartAtStage(r);
      if (!w(a)) return a;
      s.forEach((o, l) => {
        const c = this.provideOutputs(l, o);
        if (!w(c))
          throw new Error(c.$error);
      });
    } catch (a) {
      return k(a.message);
    }
    const i = this.#e.get(e);
    if (!i)
      return k(`Unable to restart at node "${e}": node not found`);
    this.#a(i, "ready", !1), this.#t = r, this.#n = r == 0 ? "initial" : "advanced";
  }
  setWorking(e) {
    const t = this.#e.get(e);
    if (t?.state !== "working") {
      if (!t)
        return k(`Unable to set node "${e}" to working: node not found`);
      if (!vu.has(t.state))
        return k(
          `Unable to set node "${e}" to working: not in workable state`
        );
      this.#r.set({}), this.#a(t, "working", !0);
    }
  }
  setWaiting(e) {
    const t = this.#e.get(e);
    if (t?.state !== "waiting") {
      if (!t)
        return k(`Unable to set node "${e}" to waiting: node not found`);
      if (!vu.has(t.state))
        return k(
          `Unable to set node "${e}" to waiting: not in workable state`
        );
      this.#r.set({}), this.#a(t, "waiting", !0);
    }
  }
  setInterrupted(e) {
    const t = this.#e.get(e);
    if (t?.state !== "interrupted") {
      if (!t)
        return k(`Unable to set node "${e}" to interrupted: node not found`);
      if (!Tr.has(t.state))
        return k(
          `Unable to set node "${e}" to interrupted: not working or waiting`
        );
      this.#r.set({}), this.#a(t, "interrupted", !0), this.#o(t);
    }
  }
  #i(e) {
    return {
      node: e.plan.node,
      state: e.state,
      stage: e.stage,
      inputs: e.inputs,
      outputs: e.outputs
    };
  }
  fullState() {
    return this.#r.get(), new Map(
      Array.from(this.#e.entries()).map(([e, t]) => [
        e,
        this.#i(t)
      ])
    );
  }
  /**
   * Provides a way to inspect the current state of nodes as they are being
   * orchestrated.
   * @returns a map representing current state of all nodes
   */
  state() {
    return this.#r.get(), new Map(
      Array.from(this.#e.entries()).map(([e, t]) => [e, { node: t.plan.node, state: t.state }])
    );
  }
  /**
   * Creates a new task to invoke a node, given a node id
   * @param id -- node id
   */
  taskFromId(e) {
    this.#r.get();
    const t = this.#e.get(e);
    return t ? t.inputs ? {
      node: t.plan.node,
      inputs: t.inputs
    } : k("Node has no inputs") : k(`Unknown node id "${e}"`);
  }
  /**
   * Creates a list of current tasks: nodes to be invoked next, along
   * with their inputs, according to the current state of the orchestrator.
   */
  currentTasks() {
    this.#r.get();
    const e = [], t = this.plan.stages[this.#t];
    if (!t)
      return e;
    try {
      return t.forEach((r) => {
        const s = this.#e.get(r.node.id);
        if (!s)
          throw new Error(
            `While getting current tasks, node "${r.node.id}" was not found`
          );
        s.state === "ready" && e.push({ node: r.node, inputs: s.inputs });
      }), e;
    } catch (r) {
      return k(r.message);
    }
  }
  #o(e) {
    this.#r.set({});
    try {
      const t = [e], r = /* @__PURE__ */ new Set();
      for (; t.length > 0; )
        t.shift().plan.downstream.forEach((a) => {
          const o = a.to;
          if (r.has(o)) return;
          const l = this.#e.get(o);
          if (!l)
            throw new Error(
              "While trying to propagate skip downstream, failed to retrieve target state"
            );
          qa.has(l.state) || (t.push(l), this.#a(l, "skipped", !1)), r.add(o);
        });
      let s = !0;
      for (; s; )
        s = !1, this.#e.forEach((i) => {
          if (qa.has(i.state) || i.state === "working" || i.state === "waiting" || i.plan.downstream.length === 0) return;
          i.plan.downstream.every((o) => {
            const l = this.#e.get(o.to);
            if (!l)
              throw new Error(
                "While trying to settle state, failed to retrieve target state"
              );
            return qa.has(l.state);
          }) && (this.#a(i, "skipped", !1), s = !0);
        });
    } catch (t) {
      return k(t.message);
    }
  }
  #l() {
    this.#r.set({});
    const e = this.plan.stages[this.#t];
    if (!e)
      return k(
        "While trying to advance stage, failed to retrieve current stage"
      );
    let t;
    if (!e.every((s) => {
      const i = this.#e.get(s.node.id)?.state;
      return i ? Tr.has(i) ? (t = !0, !1) : i !== "ready" : !1;
    }))
      return this.#n = "working", t ? "done" : "more";
    try {
      const s = this.#t + 1;
      return s > this.plan.stages.length - 1 ? (this.#n = "finished", "done") : (this.plan.stages[s].forEach((a) => {
        const o = this.#e.get(a.node.id);
        if (!o)
          throw new Error(
            "While trying to advance stage, failed to retrieve current state"
          );
        const l = {};
        let c = !1;
        if (a.upstream.forEach((d) => {
          if (c) return;
          const p = this.#e.get(d.from);
          if (!p)
            throw new Error(
              "While trying to advance stage, failed to retrieve upstream state"
            );
          if (p.state === "inactive")
            throw new Error(
              `While trying to advance stage, found node ${p.plan.node.id} with unresolved dependencies`
            );
          if (p.state === "ready")
            throw new Error(
              `While trying to advance stage, found node ${p.plan.node.id} what was not yet invoked`
            );
          if (p.state === "skipped" || p.state === "failed") {
            c = !0;
            return;
          }
          const h = p.outputs?.[d.out || ""];
          h && d.in && (l[d.in] = h);
        }), c || Object.keys(l).length !== a.upstream.length) {
          this.#a(o, "skipped", !1);
          const d = this.#o(o);
          if (!w(d)) return d;
        } else
          this.#a(o, "ready", !1), o.inputs = l;
      }), this.#t = s, this.#n = "advanced", "more");
    } catch (s) {
      return k(s.message);
    }
  }
  #a(e, t, r) {
    if (e.state = t, this.callbacks.stateChanged?.(t, e.plan), !r) {
      const s = e.plan.node.id;
      this.callbacks.stateChangedbyOrchestrator?.(
        s,
        t,
        e.outputs?.$error
      );
    }
  }
  update(e) {
    const t = [...e.#e.entries() || []];
    if (t.length === 0)
      return;
    let r = 0;
    for (const [s, i] of this.#e) {
      const [a, o] = t[r] || [];
      if (s === a)
        o.outputs && eM.has(o.state) ? this.provideOutputs(s, o.outputs) : i.state = o.state;
      else {
        r === 0 && (i.state = "interrupted");
        break;
      }
      r++;
    }
  }
  /**
   * Submit results of a node invocation. Also updates the current state.
   */
  provideOutputs(e, t) {
    this.#r.set({});
    const r = this.#e.get(e);
    if (!r)
      return k(
        `While providing outputs, couldn't get state for node "${e}"`
      );
    let s = !1;
    if (r.stage < this.#t)
      s = !0;
    else if (r.stage > this.#t)
      return k("Can't provide outputs to later stages");
    if (r.state === "waiting")
      return k("Can't provide outputs while the node is waiting for input");
    if (r.outputs = t, "$error" in t) {
      if (this.#a(r, "failed", !1), s) return this.#n;
      const a = this.#o(r);
      if (!w(a)) return a;
    } else
      this.#a(r, "succeeded", !1), s && (this.#t = r.stage);
    let i;
    for (; ; ) {
      if (i = this.#l(), !w(i)) return i;
      if (i === "done") break;
      const a = this.currentTasks();
      if (!w(a)) return a;
      if (a.length > 0) break;
    }
    return this.#n;
  }
}
const we = {
  composed: !0,
  bubbles: !1,
  cancelable: !0
};
class cg extends Event {
  constructor(e) {
    super(cg.eventName, { ...we }), this.data = e;
  }
  static {
    this.eventName = "pending";
  }
}
class ra extends Event {
  constructor(e, t) {
    super(ra.eventName, { ...we }), this.running = e, this.data = t;
  }
  static {
    this.eventName = "input";
  }
}
class dc extends Event {
  constructor(e) {
    super(dc.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "output";
  }
}
class pc extends Event {
  constructor(e) {
    super(pc.eventName, { ...we }), this.data = e, this.running = !1;
  }
  static {
    this.eventName = "error";
  }
}
class uc extends Event {
  constructor(e) {
    super(uc.eventName, { ...we }), this.data = e, this.running = !1;
  }
  static {
    this.eventName = "end";
  }
}
class hc extends Event {
  constructor(e) {
    super(hc.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "skip";
  }
}
class fc extends Event {
  constructor(e) {
    super(fc.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "graphstart";
  }
}
class mc extends Event {
  constructor(e) {
    super(mc.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "graphend";
  }
}
class gc extends Event {
  constructor(e, t) {
    super(gc.eventName, { ...we }), this.data = e, this.result = t, this.running = !0;
  }
  static {
    this.eventName = "nodestart";
  }
}
class yc extends Event {
  constructor(e) {
    super(yc.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "nodeend";
  }
}
class un extends Event {
  constructor(e, t) {
    super(un.eventName, { ...we }), this.running = e, this.data = t;
  }
  static {
    this.eventName = "pause";
  }
}
class is extends Event {
  constructor(e) {
    super(is.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "resume";
  }
}
class bc extends Event {
  constructor(e) {
    super(bc.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "start";
  }
}
class dg extends Event {
  constructor(e, t) {
    super(dg.eventName, { ...we }), this.running = e, this.data = t;
  }
  static {
    this.eventName = "stop";
  }
}
class vc extends Event {
  constructor(e) {
    super(vc.eventName, { ...we }), this.data = e;
  }
  static {
    this.eventName = "next";
  }
}
class wc extends Event {
  constructor(e) {
    super(wc.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "nodestatechange";
  }
}
class hn extends Event {
  constructor(e) {
    super(hn.eventName, { ...we }), this.data = e, this.running = !0;
  }
  static {
    this.eventName = "edgestatechange";
  }
}
function sM(n) {
  const e = structuredClone(n.data);
  return {
    type: n.type,
    data: e,
    reply: async () => {
    }
  };
}
function iM(n) {
  const { type: e, node: t, timestamp: r, invocationId: s } = n, i = s == -1;
  if (e === "input") {
    const { inputArguments: a, path: o } = n;
    return {
      type: e,
      data: { node: t, inputArguments: a, path: o, bubbled: i, timestamp: r },
      reply: async (l) => {
        n.inputs = l.inputs;
      }
    };
  } else if (e === "output") {
    const { outputs: a, path: o } = n;
    return {
      type: e,
      data: { node: t, outputs: a, path: o, timestamp: r, bubbled: i },
      reply: async () => {
      }
    };
  }
  throw new Error(`Unknown result type "${e}".`);
}
var aM = Object.create, xc = Object.defineProperty, oM = Object.getOwnPropertyDescriptor, pg = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), rr = (n) => {
  throw TypeError(n);
}, lM = (n, e, t) => e in n ? xc(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, wu = (n, e) => xc(n, "name", { value: e, configurable: !0 }), cM = (n) => [, , , aM(n?.[pg("metadata")] ?? null)], ug = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Er = (n) => n !== void 0 && typeof n != "function" ? rr("Function expected") : n, dM = (n, e, t, r, s) => ({ kind: ug[n], name: e, metadata: r, addInitializer: (i) => t._ ? rr("Already initialized") : s.push(Er(i || null)) }), hg = (n, e) => lM(e, pg("metadata"), n[3]), Ha = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, ya = (n, e, t, r, s, i) => {
  var a, o, l, c, d, p = e & 7, h = !!(e & 8), f = !!(e & 16), u = p > 3 ? n.length + 1 : p ? h ? 1 : 2 : 0, y = ug[p + 5], v = p > 3 && (n[u - 1] = []), x = n[u] || (n[u] = []), m = p && (!f && !h && (s = s.prototype), p < 5 && (p > 3 || !f) && oM(p < 4 ? s : { get [t]() {
    return H(this, i);
  }, set [t](g) {
    return be(this, i, g);
  } }, t));
  p ? f && p < 4 && wu(i, (p > 2 ? "set " : p > 1 ? "get " : "") + t) : wu(s, t);
  for (var b = r.length - 1; b >= 0; b--)
    c = dM(p, t, l = {}, n[3], x), p && (c.static = h, c.private = f, d = c.access = { has: f ? (g) => pM(s, g) : (g) => t in g }, p ^ 3 && (d.get = f ? (g) => (p ^ 1 ? H : ws)(g, s, p ^ 4 ? i : m.get) : (g) => g[t]), p > 2 && (d.set = f ? (g, _) => be(g, s, _, p ^ 4 ? i : m.set) : (g, _) => g[t] = _)), o = (0, r[b])(p ? p < 4 ? f ? i : m[y] : p > 4 ? void 0 : { get: m.get, set: m.set } : s, c), l._ = 1, p ^ 4 || o === void 0 ? Er(o) && (p > 4 ? v.unshift(o) : p ? f ? i = o : m[y] = o : s = o) : typeof o != "object" || o === null ? rr("Object expected") : (Er(a = o.get) && (m.get = a), Er(a = o.set) && (m.set = a), Er(a = o.init) && v.unshift(a));
  return p || hg(n, s), m && xc(s, t, m), f ? p ^ 4 ? i : m : s;
}, _c = (n, e, t) => e.has(n) || rr("Cannot " + t), pM = (n, e) => Object(e) !== e ? rr('Cannot use the "in" operator on this value') : n.has(e), H = (n, e, t) => (_c(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Dt = (n, e, t) => e.has(n) ? rr("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), be = (n, e, t, r) => (_c(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t), ws = (n, e, t) => (_c(n, e, "access private method"), t), fg, mg, gg, yg, Mo, Ue, It, $t, Pr, Rn, At, kc, Va, Te, Oo, ae, Ri, jo, bg, vg;
function uM() {
  return { stages: [] };
}
function hM() {
  return /* @__PURE__ */ new Map();
}
class js extends (Mo = EventTarget, yg = [xt], gg = [xt], mg = [xt], fg = [xt], Mo) {
  constructor(e) {
    if (super(), Ha(At, 5, this), Dt(this, ae), Dt(this, Ue, null), this.config = void 0, Dt(this, It, null), Dt(this, $t, null), Dt(this, Pr, !1), Dt(this, Rn), Dt(this, kc, Ha(At, 8, this)), Ha(At, 11, this), Dt(this, Ri, new Xt()), this.config = e, !e.runner)
      throw new Error(
        "Unable to initialize PlanRunner: RunConfig.runner is empty"
      );
    be(this, ae, ws(this, ae, jo).call(this, e.runner), Oo);
  }
  running() {
    return !!H(this, It) && !H(this, $t);
  }
  start() {
    return this.run();
  }
  resumeWithInputs(e) {
    return this.run(e);
  }
  async run(e, t = !1) {
    if (H(this, Pr)) {
      if (!e) {
        await H(this, Ue)?.restart();
        return;
      }
      be(this, Rn, e);
      return;
    }
    be(this, Pr, !0);
    try {
      const r = {
        inputs: e,
        timestamp: Ge()
      }, s = !H(this, It);
      for (H(this, It) ? H(this, $t) && (H(this, $t).reply({ inputs: e ?? {} }), e = void 0) : be(this, It, this.getGenerator(t)), be(this, $t, null), this.dispatchEvent(
        s ? new bc(r) : new is(r)
      ); ; ) {
        console.assert(
          H(this, It),
          "Expected run to exist. If not, we might be having a re-entrant run."
        );
        const i = await H(this, It).next();
        if (this.dispatchEvent(new vc(i.value)), i.done) {
          be(this, It, null), be(this, $t, null);
          return;
        }
        const { type: a, data: o, reply: l } = i.value;
        switch (a) {
          case "input": {
            if (e)
              this.dispatchEvent(new ra(!0, o)), l({ inputs: e }), e = void 0;
            else if (be(this, $t, i.value), this.dispatchEvent(new ra(!1, o)), H(this, Rn))
              l({ inputs: H(this, Rn) }), be(this, $t, null), be(this, Rn, void 0);
            else {
              this.dispatchEvent(
                new un(!1, {
                  timestamp: Ge()
                })
              );
              return;
            }
            break;
          }
          case "error": {
            this.dispatchEvent(new pc(o));
            break;
          }
          case "end": {
            this.dispatchEvent(new uc(o));
            break;
          }
          case "skip": {
            this.dispatchEvent(new hc(o));
            break;
          }
          case "graphstart": {
            this.dispatchEvent(new fc(o));
            break;
          }
          case "graphend": {
            this.dispatchEvent(new mc(o));
            break;
          }
          case "nodestart": {
            this.dispatchEvent(new gc(o, i.value.result));
            break;
          }
          case "nodeend": {
            this.dispatchEvent(new yc(o));
            break;
          }
          case "output": {
            this.dispatchEvent(new dc(o));
            break;
          }
        }
      }
    } finally {
      be(this, Pr, !1);
    }
  }
  get state() {
    const e = H(this, ae, Te);
    return e ? e.fullState() : hM();
  }
  get plan() {
    const e = H(this, ae, Te);
    return e ? e.plan : uM();
  }
  get waiting() {
    const e = H(this, ae, Te);
    return e ? new Map(e.allWaiting) : /* @__PURE__ */ new Map();
  }
  get breakpoints() {
    return H(this, Ri);
  }
  set breakpoints(e) {
    be(this, Ri, e);
  }
  async runNode(e) {
    H(this, Ue) || this.run(void 0, !0), H(this, ae, Te).working || this.dispatchEvent(new is({ timestamp: Ge() }));
    const t = await H(this, Ue)?.runNode(e);
    return H(this, ae, Te).working || this.dispatchEvent(new un(!1, { timestamp: Ge() })), t;
  }
  async runFrom(e) {
    H(this, ae, Te).allWaiting.forEach(([r]) => {
      this.stop(r);
    });
    const t = H(this, ae, Te).getNodeState(e)?.stage;
    return t !== void 0 && H(this, ae, Te).allWorking.forEach(([r, s]) => {
      s.stage > t && this.stop(r);
    }), !H(this, Ue) || !this.running() ? this.run(void 0, !0) : H(this, ae, Te).working || this.dispatchEvent(new is({ timestamp: Ge() })), H(this, Ue)?.runFrom(e);
  }
  async stop(e) {
    const t = H(this, Ue)?.stop(e);
    return H(this, ae, Te).working || this.dispatchEvent(new un(!1, { timestamp: Ge() })), t;
  }
  async *getGenerator(e = !1) {
    be(this, Ue, null), yield* nx(async (t) => (be(this, Ue, new fM(
      this.config,
      this.config.runner,
      H(this, ae, Te),
      this.breakpoints,
      () => {
        H(this, ae, Te).working || this.dispatchEvent(
          new un(!1, { timestamp: Ge() })
        );
      },
      (r) => {
        this.running() || this.run(r);
      },
      t
    )), e || await H(this, Ue).run(), new Promise((r) => {
      this.config.signal?.addEventListener("abort", () => {
        r();
      });
    })));
  }
  async updateGraph(e) {
    H(this, ae, Te).working && (H(this, Ue)?.stopAll(), this.dispatchEvent(new un(!1, { timestamp: Ge() }))), be(this, ae, ws(this, ae, jo).call(this, e), Oo), H(this, Ue) && H(this, Ue).update(H(this, ae, Te));
  }
}
At = cM(Mo);
Ue = /* @__PURE__ */ new WeakMap();
It = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
Pr = /* @__PURE__ */ new WeakMap();
Rn = /* @__PURE__ */ new WeakMap();
kc = /* @__PURE__ */ new WeakMap();
ae = /* @__PURE__ */ new WeakSet();
Ri = /* @__PURE__ */ new WeakMap();
jo = function(n) {
  const e = QA(n);
  return new rM(e, {
    stateChangedbyOrchestrator: (t, r, s) => {
      ws(this, ae, vg).call(this, t, r, s);
    },
    stateChanged: (t, r) => {
      ws(this, ae, bg).call(this, t, r);
    }
  });
};
bg = function(n, e) {
  switch (n) {
    case "inactive":
      this.dispatchEvent(
        new hn({ edges: e.downstream, state: "initial" })
      );
      break;
    case "skipped":
      this.dispatchEvent(
        new hn({
          edges: [...e.upstream, ...e.downstream],
          state: "initial"
        })
      );
      break;
    case "working":
    case "waiting":
      this.dispatchEvent(
        new hn({ edges: e.upstream, state: "consumed" })
      );
      break;
    case "failed":
    case "interrupted":
      this.dispatchEvent(
        new hn({ edges: e.downstream, state: "initial" })
      );
      break;
    case "ready":
      break;
    case "succeeded":
      this.dispatchEvent(
        new hn({ edges: e.downstream, state: "stored" })
      );
      break;
  }
};
vg = function(n, e, t) {
  this.dispatchEvent(new wc({ id: n, state: e, message: t }));
};
Va = ya(At, 20, "#orchestrator", yg, ae, kc), Te = Va.get, Oo = Va.set;
ya(At, 2, "state", gg, js);
ya(At, 2, "plan", mg, js);
ya(At, 2, "waiting", fg, js);
hg(At, js);
class fM {
  constructor(e, t, r, s, i, a, o) {
    this.config = e, this.graph = t, this.orchestrator = r, this.breakpoints = s, this.pause = i, this.resume = a, this.callback = o, this.#e = /* @__PURE__ */ new Map(), this.index = 0, this.context = this.initializeNodeHandlerContext(o);
  }
  #e;
  path() {
    return [this.index++];
  }
  async error(e) {
    return await this.callback({
      type: "error",
      data: {
        error: e.$error,
        timestamp: Ge()
      },
      reply: async () => {
      }
    }), e;
  }
  fromTask(e, t, r) {
    return {
      descriptor: e,
      inputs: { ...r, ...t },
      missingInputs: [],
      current: { from: "", to: "" },
      opportunities: [],
      newOpportunities: [],
      partialOutputs: {},
      state: {
        state: /* @__PURE__ */ new Map(),
        constants: /* @__PURE__ */ new Map(),
        wireOutputs: () => {
        },
        getAvailableInputs: () => ({}),
        useInputs: () => {
        }
      },
      skip: !1
    };
  }
  async runTask(e) {
    const t = await this.context, r = e.node.id, s = this.breakpoints.get(r);
    if (s)
      return s.once && this.breakpoints.delete(r), "breakpoint";
    const i = this.path();
    await this.callback({
      type: "nodestart",
      data: {
        node: e.node,
        inputs: e.inputs,
        path: i,
        timestamp: Ge()
      },
      reply: async () => {
      }
    });
    const a = this.orchestrator.setWorking(e.node.id);
    w(a) || console.warn(a.$error);
    const o = this.#t(e.node.id).signal, l = t.fileSystem?.updateRunFileSystem({
      graphUrl: this.graph.url,
      assets: gM(this.graph),
      env: t.fileSystem.env()
    }), c = new rx(
      {
        ...t,
        fileSystem: l,
        signal: o,
        currentStep: e.node,
        currentGraph: this.graph
      },
      { graph: this.graph },
      async (h) => {
        const f = iM(h);
        return f.type === "input" && f.data.bubbled ? (this.orchestrator.setWaiting(e.node.id), this.callback({
          ...f,
          reply: async (u) => (o.aborted || this.orchestrator.setWorking(e.node.id), f.reply(u))
        })) : this.callback(f);
      }
    ), d = mM(
      e.node.id,
      this.graph,
      t
    );
    let p;
    if (!w(d))
      p = d, console.warn("Can't get latest config", p.$error);
    else {
      const h = sx(e.inputs);
      if (h.skip ? p = ix(d) : p = ax(
        d,
        await c.invokeNode(
          this.fromTask(
            e.node,
            h.adjustedInputs,
            d
          ),
          i
        )
      ), o.aborted) {
        const f = this.orchestrator.setInterrupted(e.node.id);
        w(f) || console.warn(f.$error);
      } else {
        const f = this.orchestrator.setWorking(e.node.id);
        w(f) || console.warn(f.$error);
        const u = this.orchestrator.provideOutputs(
          e.node.id,
          p
        );
        w(u) || console.warn(u.$error);
      }
    }
    return await this.callback({
      type: "nodeend",
      data: {
        node: e.node,
        inputs: e.inputs,
        outputs: p,
        path: i,
        newOpportunities: [],
        timestamp: Ge()
      },
      reply: async () => {
      }
    }), "success";
  }
  async preamble() {
    const e = await this.context;
    return this.orchestrator.progress !== "initial" || await this.callback({
      type: "graphstart",
      data: {
        graph: this.graph,
        graphId: "",
        path: [],
        timestamp: Ge()
      },
      reply: async () => {
      }
    }), e;
  }
  async postamble() {
    if (this.orchestrator.progress === "finished") {
      if (this.orchestrator.failed) {
        this.pause();
        return;
      }
      await this.callback({
        type: "graphend",
        data: {
          path: [],
          timestamp: Ge()
        },
        reply: async () => {
        }
      }), await this.callback({
        type: "end",
        data: {
          timestamp: Ge()
        },
        reply: async () => {
        }
      });
    }
  }
  #t(e) {
    let t = this.#e.get(e);
    return t || (t = new AbortController(), t.signal.addEventListener("abort", () => {
      const [r] = this.orchestrator.allWaiting.find(
        ([, s]) => s.state === "waiting"
      ) || [];
      r === e && this.resume({});
    }), this.#e.set(e, t), t);
  }
  async run() {
    for (; this.orchestrator.progress !== "finished"; ) {
      const e = this.orchestrator.currentTasks();
      if (!w(e)) {
        await this.error(e);
        return;
      }
      if (e.length === 0) return;
      let t = !1;
      if (await Promise.all(
        e.map(async (r) => {
          await this.runTask(r) === "breakpoint" && (t = !0);
        })
      ), t) {
        this.pause();
        return;
      }
    }
    await this.postamble();
  }
  async runNode(e) {
    const t = this.orchestrator.taskFromId(e);
    if (!w(t)) return t;
    await this.runTask(t);
  }
  async runFrom(e) {
    return this.orchestrator.restartAtNode(e), this.run();
  }
  async restart() {
    return this.orchestrator.restartAtCurrentStage(), this.run();
  }
  stopAll() {
    [...this.#e.keys()].forEach((e) => {
      this.stop(e);
    });
  }
  stop(e) {
    const t = this.#e?.get(e);
    if (!t) {
      console.warn(`Unable to find stop controller for node "${e}"`);
      return;
    }
    try {
      t.abort(`Interrupt node "${e}"`);
    } catch (r) {
      console.log(r);
    }
    this.#e?.delete(e), this.orchestrator.setInterrupted(e);
  }
  async initializeNodeHandlerContext(e) {
    const t = this.config.kits, {
      loader: r,
      fileSystem: s,
      base: i,
      signal: a,
      graphStore: o,
      fetchWithCreds: l,
      getProjectRunState: c,
      clientDeploymentConfiguration: d,
      flags: p
    } = this.config, h = {
      async report(f) {
        e(sM(f));
      }
    };
    return a?.addEventListener("abort", () => {
      this.#e.forEach((f) => {
        f.abort();
      });
    }), {
      probe: h,
      kits: t,
      loader: r,
      fileSystem: s,
      base: i,
      signal: a,
      graphStore: o,
      fetchWithCreds: l,
      getProjectRunState: c,
      clientDeploymentConfiguration: d,
      flags: p
    };
  }
  update(e) {
    const t = this.orchestrator;
    e.update(t), this.orchestrator = e;
  }
}
function mM(n, e, t) {
  const r = t.graphStore?.getByDescriptor(e);
  if (!r?.success)
    return k(`Can't to find graph "${e.url}" in graph store`);
  const s = t.graphStore?.inspect(r.result, "");
  if (!s)
    return k(`Can't get inspector for graph "${e.url}"`);
  const i = s.nodeById(n);
  return i ? i?.configuration() : k(`Unable to find node "${n}`);
}
function gM(n) {
  const { assets: e } = n || {};
  return e ? Object.entries(e).filter(([, t]) => Kn(t.data)).map(([t, r]) => {
    const s = r.data;
    return { path: `/assets/${t}`, data: s };
  }) : [];
}
function yM(n) {
  return new js(n);
}
class bM {
  /**
   * Creates a new HarnessRunner and AbortController.
   *
   * The config should already have kits, signal, and graphStore set.
   * The caller (action) is responsible for setting the runner on the controller.
   *
   * @param config The run configuration
   * @returns The created runner and abort controller
   */
  createRunner(e) {
    const t = new AbortController(), r = {
      ...e,
      signal: t.signal
    };
    return {
      runner: yM(r),
      abortController: t
    };
  }
}
const vM = 600 * 1e3, xu = "StatusUpdatesService";
class wM {
  #e = 0;
  #t = null;
  /**
   * Starts polling for status updates.
   * Immediately fetches updates, then polls every 10 minutes.
   *
   * @param controller The controller to receive status updates
   */
  async start(e) {
    this.#e === 0 && (this.#t = e, await this.#n());
  }
  /**
   * Stops polling for status updates.
   */
  stop() {
    this.#e !== 0 && (window.clearTimeout(this.#e), this.#e = 0), this.#t = null;
  }
  async #n() {
    try {
      const e = await this.#r();
      this.#t?.setUpdates(e);
    } catch (e) {
      wn().log(yn("Error fetching updates", e), xu, !1);
    } finally {
      this.#e = window.setTimeout(
        () => this.#n(),
        vM
      );
    }
  }
  async #r() {
    const t = await (await fetch("/updates")).json();
    return t === "error" ? (wn().log(Hi("Unable to fetch updates from the server"), xu, !1), []) : t;
  }
}
let Ya = null;
function xM(n, e, t) {
  if (!Ya) {
    const r = new Cx(n.shellHost), s = r.fetchWithCreds, i = Ix(n.shellHost), a = new URL(
      "/api/drive-proxy/drive/v3/files",
      window.location.href
    ).href, o = r.state.then(
      (j) => j === "signedout" ? a : Xn
    ), l = new x_({
      apiBaseUrl: o,
      proxyApiBaseUrl: a,
      fetchWithCreds: s,
      isTestApi: !!n.guestConfig?.isTestApi
    }), c = Gh({
      env: [...A_(n.settings), ...n.env || []],
      local: Fh(zh()),
      mnt: Lh(
        /* @__PURE__ */ new Map([
          ["track", $x()]
        ])
      )
    }), d = new Ux(
      G_,
      {
        fileSystem: c,
        fetchWithCreds: s
      },
      Cp
    ), p = new $P({
      shell: n.shellHost,
      fetchWithCreds: s
    }), h = bP({
      mcpClientManager: d,
      fetchWithCreds: s,
      shell: n.shellHost,
      getConsentController: t,
      agentContext: p
    }), f = EP(h, []), u = PP(
      r,
      l,
      n.shellHost.findUserOpalFolder,
      n.shellHost.listUserOpals
    ), y = jP(), v = Ql([u, y]), x = {
      kits: f,
      loader: v,
      sandbox: h,
      fileSystem: c,
      flags: e
    }, m = LA(x);
    for (const [, j] of y.userGraphs?.entries() || [])
      m.addByURL(j.url, [], {});
    const b = new WA(x, c, h), g = new BA(
      s,
      Cp
    ), _ = new Os(g), $ = new ox(g, e);
    Ya = {
      actionTracker: i,
      agentContext: p,
      apiClient: g,
      autonamer: b,
      emailPrefsManager: _,
      fetchWithCreds: s,
      fileSystem: c,
      flowGenerator: $,
      googleDriveBoardServer: u,
      googleDriveClient: l,
      graphStore: m,
      kits: f,
      loader: v,
      mcpClientManager: d,
      runService: new bM(),
      signinAdapter: r,
      statusUpdates: new wM()
    };
  }
  return Ya;
}
function _M(n, e) {
  return e instanceof Map ? { __type: "Map", value: Array.from(e.entries()) } : e instanceof Set ? { __type: "Set", value: Array.from(e) } : e;
}
function kM(n, e) {
  return e && typeof e == "object" && e.__type === "Map" ? new Map(e.value) : e && typeof e == "object" && e.__type === "Set" ? new Set(e.value) : e;
}
class wg {
  constructor(e) {
    this.backend = e;
  }
  get store() {
    return this.backend === "local" ? localStorage : sessionStorage;
  }
  async get(e) {
    const t = this.store.getItem(e);
    if (t === null) return null;
    try {
      return JSON.parse(t, kM);
    } catch {
      return t;
    }
  }
  async set(e, t) {
    this.store.setItem(e, JSON.stringify(t, _M));
  }
  async delete(e) {
    this.store.removeItem(e);
  }
  // Not tested because in tests we use the in-memory storage.
  /* c8 ignore next 3 */
  async clear() {
    this.store.clear();
  }
}
class SM {
  constructor(e = "values", t = "controller-storage") {
    this.storeName = e, this.dbName = t;
    const r = this.storeName;
    this.#e = hs(this.dbName, 1, {
      upgrade(s) {
        s.objectStoreNames.contains(r) || s.createObjectStore(r);
      }
    });
  }
  #e;
  async get(e) {
    const r = await (await this.#e).get(this.storeName, e);
    return r === void 0 ? null : r;
  }
  async set(e, t) {
    await (await this.#e).put(this.storeName, t, e);
  }
  async delete(e) {
    await (await this.#e).delete(this.storeName, e);
  }
  // Not tested because in tests we use the in-memory storage.
  /* c8 ignore next 3 */
  async clear() {
    await (await this.#e).clear(this.storeName);
  }
}
const Di = /* @__PURE__ */ new WeakMap();
function IM(n, e) {
  return n == null || e == null ? !0 : !(typeof n != typeof e || n instanceof Map != e instanceof Map || n instanceof Set != e instanceof Set || Array.isArray(n) !== Array.isArray(e));
}
function xg(n) {
  if (typeof n != "object" || n === null) return !1;
  const e = n;
  return "_$litType$" in e && typeof e._$litType$ < "u";
}
function _g(n) {
  let e;
  return Array.isArray(n) ? e = n : n instanceof Map ? e = [...n.values()] : n instanceof Set && (e = [...n]), e ? e.some((t) => _g(t)) : xg(n);
}
function gn(n) {
  if (n instanceof Xt || n instanceof qi || n instanceof us || n instanceof Fn)
    return n;
  if (n instanceof Map)
    return new Xt(
      Array.from(n.entries()).map(([e, t]) => [e, gn(t)])
    );
  if (n instanceof Set)
    return new qi(Array.from(n).map((e) => gn(e)));
  if (Array.isArray(n))
    return new us(n.map((e) => gn(e)));
  if (n && typeof n == "object" && n !== null && Object.getPrototypeOf(n) === Object.prototype && !xg(n)) {
    const e = {};
    for (const t in n)
      e[t] = gn(n[t]);
    return new Fn(e);
  }
  return n;
}
function zt(n) {
  if (n instanceof Xt)
    return new Map(
      Array.from(n.entries()).map(([e, t]) => [zt(e), zt(t)])
    );
  if (n instanceof qi)
    return new Set(Array.from(n).map((e) => zt(e)));
  if (n instanceof us)
    return n.map((e) => zt(e));
  if (n instanceof Fn) {
    const e = {};
    for (const t in n)
      e[t] = zt(n[t]);
    return e;
  }
  if (n && typeof n == "object" && n !== null && Object.getPrototypeOf(n) === Object.prototype) {
    const e = {};
    for (const t in n)
      e[t] = zt(n[t]);
    return e;
  }
  return n;
}
const $M = new wg("local"), CM = new wg("session"), TM = new SM(
  "controller-values",
  "app-storage"
);
function _u(n) {
  if (n === "local") return $M;
  if (n === "session") return CM;
  if (n === "idb") return TM;
  throw new Error("Unsupported type or not yet implemented");
}
function ku(n, e) {
  const { controllerId: t, persistenceId: r } = n, s = t ? `_${t}` : "";
  return `${r || n.constructor.name}_${String(e.name)}${s}`;
}
function Su(n, e, t) {
  if (e.persist && _g(t))
    throw new EM(n);
}
class EM extends Error {
  constructor(e) {
    super(
      `Attempted persistance of HTMLTemplateResult of field "${e}". Do not persiste HTMLTemplateResults; they do not restore correctly. Persist the underlying data instead.`
    ), this.name = "PersistEntityError";
  }
}
function C(n = {}) {
  return function(e, t) {
    const r = /* @__PURE__ */ new WeakMap(), s = typeof n.deep > "u" ? !1 : n.deep;
    return {
      get() {
        const i = r.get(this);
        if (!i) throw new Error("Uninitialized");
        const a = i.get();
        if (a === br)
          throw new lx(String(t.name));
        return a;
      },
      set(i) {
        const a = r.get(this);
        if (!a) throw new Error("Uninitialized");
        Su(
          String(t.name),
          n,
          i
        ), a.set(s ? gn(i) : i);
      },
      init(i) {
        Su(
          String(t.name),
          n,
          i
        );
        const a = new Zt.State(br);
        r.set(this, a);
        const o = s ? gn(i) : i;
        if (n.persist) {
          const l = _u(n.persist), c = ku(this, t), d = new Zt.Computed(() => {
            const f = a.get();
            return f === br ? f : s && typeof f == "object" && f !== null ? zt(f) : f;
          });
          d.get();
          const p = new Zt.subtle.Watcher(() => {
            queueMicrotask(() => {
              p.watch(d), h();
            });
          }), h = () => {
            const f = d.get();
            if (f === br) return;
            const u = l.set(c, f).catch(console.error), y = Di.get(this) ?? [];
            y.push(u), Di.set(this, y), u.finally(() => {
              const v = Di.get(this);
              if (v) {
                const x = v.indexOf(u);
                x > -1 && v.splice(x, 1);
              }
            });
          };
          p.watch(d);
        }
        try {
          const l = t;
          t.access.get.call(null, l), t.access.has.call(null, l), t.access.set.call(null, l, i), queueMicrotask(() => {
            try {
              e.get.call(this);
            } catch (c) {
              String(c);
            }
          }), e.set.call(this, i);
        } catch {
        }
        if (n.persist) {
          ah(this) && this.registerSignalHydration(a);
          const l = _u(n.persist), c = ku(this, t);
          l.get(c).then((d) => {
            d !== null && IM(i, d) ? a.set(s ? gn(d) : d) : a.set(o);
          });
        } else
          a.set(o);
        return i;
      }
    };
  };
}
class he {
  /**
   * We use a persistenceId to namespace the storage keys. This allows us to
   * have multiple instances of the same controller with different controller
   * IDs, but it also makes them resistant to minification of the controller
   * class name via the persistenceId.
   *
   * The storage key format used in field persistence is:
   * `${persistenceId}_${fieldName}_${controllerId}`
   *
   * @param controllerId The ID of the instance.
   * @param persistenceId A consistent ID used when fields in are persisted.
   */
  constructor(e, t) {
    this.controllerId = e, this.persistenceId = t, this.#e = /* @__PURE__ */ new Set(), this.hydratedInternal = new Zt.Computed(
      () => {
        if (this.#e.size === 0) return !0;
        for (const r of this.#e)
          if (Ip(() => r.get())) return br;
        return !0;
      }
    );
  }
  #e;
  #t;
  get hydrated() {
    return !Ip(() => this.hydratedInternal.get());
  }
  /**
   * Indicates that the controller has fully hydrated.
   */
  get isHydrated() {
    return this.#t ? this.#t : (this.#t = new Promise((e) => {
      const t = oh(() => {
        this.hydratedInternal.get() === !0 && queueMicrotask(() => {
          t(), e(Date.now());
        });
      });
    }), this.#t);
  }
  /**
   * Used by tests particularly to ensure that a value has been persisted. This
   * is populated by the @field decorator indirectly.
   */
  get isSettled() {
    return Promise.resolve().then(
      () => Promise.all(Di.get(this) ?? [])
    );
  }
  /**
   * Called by the @field decorator in the 'init' hook.
   */
  registerSignalHydration(e) {
    this.#e.add(e);
  }
}
var PM = Object.create, kg = Object.defineProperty, AM = Object.getOwnPropertyDescriptor, Sg = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Rs = (n) => {
  throw TypeError(n);
}, MM = (n, e, t) => e in n ? kg(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, OM = (n) => [, , , PM(n?.[Sg("metadata")] ?? null)], Ig = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Ar = (n) => n !== void 0 && typeof n != "function" ? Rs("Function expected") : n, jM = (n, e, t, r, s) => ({ kind: Ig[n], name: e, metadata: r, addInitializer: (i) => t._ ? Rs("Already initialized") : s.push(Ar(i || null)) }), RM = (n, e) => MM(e, Sg("metadata"), n[3]), An = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Sc = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Ig[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, AM({ get [t]() {
    return DM(this, i);
  }, set [t](g) {
    return UM(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = jM(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Ar(o) && (m[y] = o) : typeof o != "object" || o === null ? Rs("Object expected") : (Ar(a = o.get) && (m.get = a), Ar(a = o.set) && (m.set = a), Ar(a = o.init) && v.unshift(a));
  return m && kg(s, t, m), s;
}, $g = (n, e, t) => e.has(n) || Rs("Cannot " + t), DM = (n, e, t) => ($g(n, e, "read from private field"), e.get(n)), Ja = (n, e, t) => e.has(n) ? Rs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), UM = (n, e, t, r) => ($g(n, e, "write to private field"), e.set(n, t), t), Cg, Tg, Eg, Ro, ut, Ic, $c, Cc;
class Ds extends (Ro = he, Eg = [C({ persist: "idb", deep: !0 })], Tg = [C({ persist: "idb", deep: !1 })], Cg = [C()], Ro) {
  constructor(e, t) {
    super(e, t), Ja(this, Ic, An(ut, 8, this, /* @__PURE__ */ new Map())), An(ut, 11, this), Ja(this, $c, An(ut, 12, this, /* @__PURE__ */ new Map())), An(ut, 15, this), Ja(this, Cc, An(ut, 16, this, !1)), An(ut, 19, this);
  }
  /**
   * Gets the last-seen version for a shared graph URL.
   *
   * @param url The graph URL
   * @returns The last seen version, or -1 if never seen
   */
  getLastSeenVersion(e) {
    return this.sharedVersionHistory.get(e) ?? -1;
  }
  /**
   * Records the current version for a shared graph URL.
   * This is automatically persisted to IndexedDB via the @field decorator.
   *
   * @param url The graph URL
   * @param version The current version
   */
  recordVersion(e, t) {
    this.sharedVersionHistory.set(e, t);
  }
  /**
   * Gets the edit history for a board URL.
   *
   * @param url The board URL
   * @returns The edit history entries, or empty array if none
   */
  getEditHistory(e) {
    return this.editHistory.get(e) ?? [];
  }
  /**
   * Saves the edit history for a board URL.
   * This is automatically persisted to IndexedDB via the @field decorator.
   *
   * @param url The board URL
   * @param history The edit history entries to save
   */
  saveEditHistory(e, t) {
    this.editHistory.set(e, [...t]);
  }
}
ut = OM(Ro);
Ic = /* @__PURE__ */ new WeakMap();
$c = /* @__PURE__ */ new WeakMap();
Cc = /* @__PURE__ */ new WeakMap();
Sc(ut, 4, "sharedVersionHistory", Eg, Ds, Ic);
Sc(ut, 4, "editHistory", Tg, Ds, $c);
Sc(ut, 4, "newerVersionAvailable", Cg, Ds, Cc);
RM(ut, Ds);
var NM = Object.create, Pg = Object.defineProperty, GM = Object.getOwnPropertyDescriptor, Ag = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Us = (n) => {
  throw TypeError(n);
}, FM = (n, e, t) => e in n ? Pg(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, zM = (n) => [, , , NM(n?.[Ag("metadata")] ?? null)], Mg = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Mr = (n) => n !== void 0 && typeof n != "function" ? Us("Function expected") : n, LM = (n, e, t, r, s) => ({ kind: Mg[n], name: e, metadata: r, addInitializer: (i) => t._ ? Us("Already initialized") : s.push(Mr(i || null)) }), WM = (n, e) => FM(e, Ag("metadata"), n[3]), _i = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Og = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Mg[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, GM({ get [t]() {
    return BM(this, i);
  }, set [t](g) {
    return qM(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = LM(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Mr(o) && (m[y] = o) : typeof o != "object" || o === null ? Us("Object expected") : (Mr(a = o.get) && (m.get = a), Mr(a = o.set) && (m.set = a), Mr(a = o.init) && v.unshift(a));
  return m && Pg(s, t, m), s;
}, Tc = (n, e, t) => e.has(n) || Us("Cannot " + t), BM = (n, e, t) => (Tc(n, e, "read from private field"), e.get(n)), Ka = (n, e, t) => e.has(n) ? Us("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), qM = (n, e, t, r) => (Tc(n, e, "write to private field"), e.set(n, t), t), mr = (n, e, t) => (Tc(n, e, "access private method"), t), jg, Rg, Do, Ht, Ec, Pc, dn, Uo, Dg, No;
function Ug(n) {
  return typeof n == "string" ? n : JSON.stringify(n, Object.keys(n).sort());
}
function Ng(n) {
  return `${n.graphUrl}|${Ug(n.scope)}|${n.type}`;
}
class ba extends (Do = he, Rg = [C({ persist: "idb", deep: !0 })], jg = [C({ deep: !0 })], Do) {
  constructor() {
    super(...arguments), Ka(this, dn), Ka(this, Ec, _i(Ht, 8, this, /* @__PURE__ */ new Map())), _i(Ht, 11, this), Ka(this, Pc, _i(Ht, 12, this, /* @__PURE__ */ new Map())), _i(Ht, 15, this);
  }
  get consents() {
    return this._consents;
  }
  get pendingInApp() {
    return mr(this, dn, Uo).call(this, oo.IN_APP);
  }
  get pendingModal() {
    return mr(this, dn, Uo).call(this, oo.MODAL);
  }
  updatePendingRequest(e, t) {
    if (!this._pendingConsents.has(e)) return;
    const r = this._pendingConsents.get(e);
    this._pendingConsents.delete(e), r && r.call(null, t);
  }
  async queryConsent(e, t) {
    const r = Ng(e), s = this._consents.get(r);
    let i = s?.allow;
    if ((!s || !s.allow) && i === void 0 && t)
      switch (await mr(this, dn, Dg).call(this, { request: e, askUsingUiType: t })) {
        case hi.ALLOW:
          i = !0;
          break;
        case hi.DENY:
          i = !1;
          break;
        case hi.ALWAYS_ALLOW:
          i = !0, mr(this, dn, No).call(this, e, !0);
          break;
        case hi.ALWAYS_DENY:
          i = !1, mr(this, dn, No).call(this, e, !1);
          break;
      }
    return !!i;
  }
  async clearAllConsents() {
    this._consents.clear();
  }
}
Ht = zM(Do);
Ec = /* @__PURE__ */ new WeakMap();
Pc = /* @__PURE__ */ new WeakMap();
dn = /* @__PURE__ */ new WeakSet();
Uo = function(n) {
  return [...this._pendingConsents.keys()].filter(
    (e) => e.askUsingUiType === n
  );
};
Dg = function(n) {
  return new Promise((e) => {
    this._pendingConsents.set(n, e);
  });
};
No = function(n, e) {
  const t = Ng(n);
  this._consents.set(t, {
    graphUrl: n.graphUrl,
    scope: Ug(n.scope),
    type: n.type,
    allow: e
  });
};
Og(Ht, 4, "_consents", Rg, ba, Ec);
Og(Ht, 4, "_pendingConsents", jg, ba, Pc);
WM(Ht, ba);
var HM = Object.create, Gg = Object.defineProperty, VM = Object.getOwnPropertyDescriptor, Fg = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Ns = (n) => {
  throw TypeError(n);
}, YM = (n, e, t) => e in n ? Gg(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, JM = (n) => [, , , HM(n?.[Fg("metadata")] ?? null)], zg = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Or = (n) => n !== void 0 && typeof n != "function" ? Ns("Function expected") : n, KM = (n, e, t, r, s) => ({ kind: zg[n], name: e, metadata: r, addInitializer: (i) => t._ ? Ns("Already initialized") : s.push(Or(i || null)) }), ZM = (n, e) => YM(e, Fg("metadata"), n[3]), Iu = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, XM = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = zg[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, VM({ get [t]() {
    return QM(this, i);
  }, set [t](g) {
    return t1(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = KM(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Or(o) && (m[y] = o) : typeof o != "object" || o === null ? Ns("Object expected") : (Or(a = o.get) && (m.get = a), Or(a = o.set) && (m.set = a), Or(a = o.init) && v.unshift(a));
  return m && Gg(s, t, m), s;
}, Lg = (n, e, t) => e.has(n) || Ns("Cannot " + t), QM = (n, e, t) => (Lg(n, e, "read from private field"), e.get(n)), e1 = (n, e, t) => e.has(n) ? Ns("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), t1 = (n, e, t, r) => (Lg(n, e, "write to private field"), e.set(n, t), t), Wg, Go, xs, Ac;
class Mc extends (Go = he, Wg = [C({ persist: "local" })], Go) {
  constructor() {
    super(...arguments), e1(this, Ac, Iu(xs, 8, this, !1)), Iu(xs, 11, this);
  }
}
xs = JM(Go);
Ac = /* @__PURE__ */ new WeakMap();
XM(xs, 4, "enabled", Wg, Mc, Ac);
ZM(xs, Mc);
const $u = window.trustedTypes?.createPolicy(
  "opal-feedback-url",
  { createScriptURL: Bg }
), n1 = $u?.createScriptURL.bind($u) ?? Bg;
function Bg() {
  return "https://support.google.com/inapp/api.js";
}
var r1 = Object.create, qg = Object.defineProperty, s1 = Object.getOwnPropertyDescriptor, Hg = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Gs = (n) => {
  throw TypeError(n);
}, i1 = (n, e, t) => e in n ? qg(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, a1 = (n) => [, , , r1(n?.[Hg("metadata")] ?? null)], Vg = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], jr = (n) => n !== void 0 && typeof n != "function" ? Gs("Function expected") : n, o1 = (n, e, t, r, s) => ({ kind: Vg[n], name: e, metadata: r, addInitializer: (i) => t._ ? Gs("Already initialized") : s.push(jr(i || null)) }), l1 = (n, e) => i1(e, Hg("metadata"), n[3]), Cu = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, c1 = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Vg[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, s1({ get [t]() {
    return d1(this, i);
  }, set [t](g) {
    return u1(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = o1(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? jr(o) && (m[y] = o) : typeof o != "object" || o === null ? Gs("Object expected") : (jr(a = o.get) && (m.get = a), jr(a = o.set) && (m.set = a), jr(a = o.init) && v.unshift(a));
  return m && qg(s, t, m), s;
}, Yg = (n, e, t) => e.has(n) || Gs("Cannot " + t), d1 = (n, e, t) => (Yg(n, e, "read from private field"), e.get(n)), p1 = (n, e, t) => e.has(n) ? Gs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), u1 = (n, e, t, r) => (Yg(n, e, "write to private field"), e.set(n, t), t), Jg, Fo, _s, Oc;
let ki;
function h1() {
  return ki || (ki = new Promise((n, e) => {
    const t = document.createElement("script");
    t.src = n1(""), t.async = !0, t.addEventListener(
      "load",
      () => n(window.userfeedback.api),
      { once: !0 }
    ), t.addEventListener("error", (r) => e(r), {
      once: !0
    }), document.body.appendChild(t);
  }), ki);
}
class jc extends (Fo = he, Jg = [C()], Fo) {
  constructor() {
    super(...arguments), p1(this, Oc, Cu(_s, 8, this, "closed")), Cu(_s, 11, this);
  }
  async open(e) {
    if (this.status !== "closed")
      return;
    if (!e) {
      console.error("No environment was provided.");
      return;
    }
    const t = e.GOOGLE_FEEDBACK_PRODUCT_ID;
    if (!t) {
      console.error(
        "No GOOGLE_FEEDBACK_PRODUCT_ID was set in the client deployment configuration."
      );
      return;
    }
    const r = e.GOOGLE_FEEDBACK_BUCKET;
    if (!r) {
      console.error(
        "No GOOGLE_FEEDBACK_BUCKET was set in the client deployment configuration."
      );
      return;
    }
    const { packageJsonVersion: s, gitCommitHash: i } = e.buildInfo;
    this.status = "loading";
    let a;
    try {
      a = await h1();
    } catch (o) {
      console.error(`Error loading Google Feedback script: ${o}`), this.status = "closed";
      return;
    }
    this.status === "loading" && a.startFeedback({
      productId: t,
      bucket: r,
      productVersion: `${s} (${i})`,
      onLoadCallback: () => {
        this.status = "open";
      },
      callback: () => {
        this.status = "closed";
      }
    });
  }
  close() {
    this.status = "closed";
  }
}
_s = a1(Fo);
Oc = /* @__PURE__ */ new WeakMap();
c1(_s, 4, "status", Jg, jc, Oc);
l1(_s, jc);
var f1 = Object.create, Kg = Object.defineProperty, m1 = Object.getOwnPropertyDescriptor, Zg = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Fs = (n) => {
  throw TypeError(n);
}, g1 = (n, e, t) => e in n ? Kg(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, y1 = (n) => [, , , f1(n?.[Zg("metadata")] ?? null)], Xg = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Rr = (n) => n !== void 0 && typeof n != "function" ? Fs("Function expected") : n, b1 = (n, e, t, r, s) => ({ kind: Xg[n], name: e, metadata: r, addInitializer: (i) => t._ ? Fs("Already initialized") : s.push(Rr(i || null)) }), v1 = (n, e) => g1(e, Zg("metadata"), n[3]), Si = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Qg = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Xg[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, m1({ get [t]() {
    return w1(this, i);
  }, set [t](g) {
    return x1(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = b1(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Rr(o) && (m[y] = o) : typeof o != "object" || o === null ? Fs("Object expected") : (Rr(a = o.get) && (m.get = a), Rr(a = o.set) && (m.set = a), Rr(a = o.init) && v.unshift(a));
  return m && Kg(s, t, m), s;
}, ey = (n, e, t) => e.has(n) || Fs("Cannot " + t), w1 = (n, e, t) => (ey(n, e, "read from private field"), e.get(n)), Tu = (n, e, t) => e.has(n) ? Fs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), x1 = (n, e, t, r) => (ey(n, e, "write to private field"), e.set(n, t), t), ty, ny, zo, Vt, Rc, Dc;
class va extends (zo = he, ny = [C({ deep: !0 })], ty = [C()], zo) {
  constructor(e, t) {
    super(e, t), Tu(this, Rc, Si(Vt, 8, this, /* @__PURE__ */ new Map())), Si(Vt, 11, this), Tu(this, Dc, Si(Vt, 12, this, null)), Si(Vt, 15, this);
  }
  get snackbars() {
    return this._snackbars;
  }
  /**
   * Shows a snackbar notification.
   *
   * @param message The message to display (string or HTML template)
   * @param type The snackbar type (PENDING, INFORMATION, WARNING, ERROR)
   * @param actions Optional action buttons
   * @param persistent If true, snackbar won't auto-dismiss
   * @param id Optional UUID for the snackbar (generated if not provided)
   * @param replaceAll If true, removes all existing snackbars before showing
   * @returns The snackbar UUID
   */
  snackbar(e, t, r = [], s = !1, i = globalThis.crypto.randomUUID(), a = !1) {
    a && this._snackbars.clear();
    const o = {
      id: i,
      message: e,
      type: t,
      actions: r,
      persistent: s
    };
    return this._snackbars.set(i, o), i;
  }
  /**
   * Removes a snackbar by ID, or all snackbars if no ID is provided.
   *
   * @param id Optional snackbar ID to remove
   */
  unsnackbar(e) {
    e ? this._snackbars.delete(e) : this._snackbars.clear();
  }
  /**
   * Updates an existing snackbar's message and type.
   *
   * @param id The snackbar ID to update
   * @param message The new message
   * @param type The new type
   * @returns True if the snackbar was found and updated
   */
  update(e, t, r) {
    const s = this._snackbars.get(e);
    if (!s)
      return !1;
    const i = {
      ...s,
      message: t,
      type: r
    };
    return this._snackbars.set(e, i), !0;
  }
}
Vt = y1(zo);
Rc = /* @__PURE__ */ new WeakMap();
Dc = /* @__PURE__ */ new WeakMap();
Qg(Vt, 4, "_snackbars", ny, va, Rc);
Qg(Vt, 4, "lastDetailsInfo", ty, va, Dc);
v1(Vt, va);
var _1 = Object.create, ry = Object.defineProperty, k1 = Object.getOwnPropertyDescriptor, sy = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), zs = (n) => {
  throw TypeError(n);
}, S1 = (n, e, t) => e in n ? ry(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, I1 = (n) => [, , , _1(n?.[sy("metadata")] ?? null)], iy = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Dr = (n) => n !== void 0 && typeof n != "function" ? zs("Function expected") : n, $1 = (n, e, t, r, s) => ({ kind: iy[n], name: e, metadata: r, addInitializer: (i) => t._ ? zs("Already initialized") : s.push(Dr(i || null)) }), C1 = (n, e) => S1(e, sy("metadata"), n[3]), Ut = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, wa = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = iy[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, k1({ get [t]() {
    return Ui(this, i);
  }, set [t](g) {
    return oy(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = $1(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Dr(o) && (m[y] = o) : typeof o != "object" || o === null ? zs("Object expected") : (Dr(a = o.get) && (m.get = a), Dr(a = o.set) && (m.set = a), Dr(a = o.init) && v.unshift(a));
  return m && ry(s, t, m), s;
}, ay = (n, e, t) => e.has(n) || zs("Cannot " + t), Ui = (n, e, t) => (ay(n, e, "read from private field"), e.get(n)), gr = (n, e, t) => e.has(n) ? zs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), oy = (n, e, t, r) => (ay(n, e, "write to private field"), e.set(n, t), t), ly, cy, dy, py, Lo, Fe, Uc, Nc, Gc, Fc, Dn;
class sr extends (Lo = he, py = [C({ deep: !0 })], dy = [C({ persist: "local" })], cy = [C({ persist: "local" })], ly = [C()], Lo) {
  constructor(e, t) {
    super(e, t), gr(this, Uc, Ut(Fe, 8, this, [])), Ut(Fe, 11, this), gr(this, Nc, Ut(Fe, 12, this, "0")), Ut(Fe, 15, this), gr(this, Gc, Ut(Fe, 16, this, !1)), Ut(Fe, 19, this), gr(this, Fc, Ut(Fe, 20, this, null)), Ut(Fe, 23, this), gr(this, Dn, "0");
  }
  /**
   * Returns the current list of status updates.
   */
  get updates() {
    return this._updates;
  }
  /**
   * Returns whether the migration has been completed.
   */
  get isMigrated() {
    return this._isMigrated;
  }
  /**
   * Returns whether there are new updates that haven't been seen.
   */
  get hasNewUpdates() {
    return Ui(this, Dn) !== this._lastSeenHash;
  }
  /**
   * Updates the status updates list.
   * Sorts by date (newest first), computes hash, and triggers chip if new.
   *
   * @param values The status updates from the server
   */
  setUpdates(e) {
    const t = [...e].sort((s, i) => {
      const a = new Date(s.date);
      return new Date(i.date).getTime() - a.getTime();
    }), r = ul(JSON.stringify(t)).toString();
    r !== Ui(this, Dn) && (oy(this, Dn, r), this._updates = t, this.hasNewUpdates && t[0]?.type !== "info" && this.showStatusUpdateChip === null && (this.showStatusUpdateChip = !0));
  }
  /**
   * Marks the current updates as "seen" by storing the current hash.
   * Called when the user views the status updates panel.
   */
  markAsSeen() {
    this._lastSeenHash = Ui(this, Dn);
  }
  /**
   * Migrates an existing hash value from raw localStorage.
   * Called during the migration phase.
   *
   * @param hashValue The hash value from raw localStorage
   */
  migrate(e) {
    this._isMigrated || (this._lastSeenHash = e, this._isMigrated = !0);
  }
}
Fe = I1(Lo);
Uc = /* @__PURE__ */ new WeakMap();
Nc = /* @__PURE__ */ new WeakMap();
Gc = /* @__PURE__ */ new WeakMap();
Fc = /* @__PURE__ */ new WeakMap();
Dn = /* @__PURE__ */ new WeakMap();
wa(Fe, 4, "_updates", py, sr, Uc);
wa(Fe, 4, "_lastSeenHash", dy, sr, Nc);
wa(Fe, 4, "_isMigrated", cy, sr, Gc);
wa(Fe, 4, "showStatusUpdateChip", ly, sr, Fc);
C1(Fe, sr);
var T1 = Object.create, uy = Object.defineProperty, E1 = Object.getOwnPropertyDescriptor, hy = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Ls = (n) => {
  throw TypeError(n);
}, P1 = (n, e, t) => e in n ? uy(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, A1 = (n) => [, , , T1(n?.[hy("metadata")] ?? null)], fy = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Ur = (n) => n !== void 0 && typeof n != "function" ? Ls("Function expected") : n, M1 = (n, e, t, r, s) => ({ kind: fy[n], name: e, metadata: r, addInitializer: (i) => t._ ? Ls("Already initialized") : s.push(Ur(i || null)) }), O1 = (n, e) => P1(e, hy("metadata"), n[3]), Eu = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, j1 = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = fy[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, E1({ get [t]() {
    return R1(this, i);
  }, set [t](g) {
    return U1(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = M1(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Ur(o) && (m[y] = o) : typeof o != "object" || o === null ? Ls("Object expected") : (Ur(a = o.get) && (m.get = a), Ur(a = o.set) && (m.set = a), Ur(a = o.init) && v.unshift(a));
  return m && uy(s, t, m), s;
}, my = (n, e, t) => e.has(n) || Ls("Cannot " + t), R1 = (n, e, t) => (my(n, e, "read from private field"), e.get(n)), D1 = (n, e, t) => e.has(n) ? Ls("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), U1 = (n, e, t, r) => (my(n, e, "write to private field"), e.set(n, t), t), gy, Wo, ks, zc;
const Pu = 77;
class Lc extends (Wo = he, gy = [C({ deep: !0 })], Wo) {
  constructor(e, t, r = 8e3) {
    super(e, t), this.defaultTimeout = r, D1(this, zc, Eu(ks, 8, this, /* @__PURE__ */ new Map())), Eu(ks, 11, this);
  }
  get toasts() {
    return this._toasts;
  }
  toast(e, t, r = !1, s = globalThis.crypto.randomUUID()) {
    e.length > Pu && (e = e.slice(0, Pu - 3) + "...");
    let i = -1;
    return r || (i = globalThis.window.setTimeout(() => {
      const a = this._toasts.get(s);
      a && this._toasts.set(s, { ...a, state: "closing" });
    }, this.defaultTimeout)), this._toasts.set(s, {
      message: e,
      type: t,
      persistent: r,
      state: "active",
      timeoutId: i
    }), s;
  }
  untoast(e) {
    if (!e) {
      for (const r of this._toasts.values())
        globalThis.window.clearTimeout(r.timeoutId);
      this._toasts.clear();
      return;
    }
    const t = this._toasts.get(e);
    t && globalThis.window.clearTimeout(t.timeoutId), this._toasts.delete(e);
  }
}
ks = A1(Wo);
zc = /* @__PURE__ */ new WeakMap();
j1(ks, 4, "_toasts", gy, Lc, zc);
O1(ks, Lc);
var N1 = Object.create, yy = Object.defineProperty, G1 = Object.getOwnPropertyDescriptor, by = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Ws = (n) => {
  throw TypeError(n);
}, F1 = (n, e, t) => e in n ? yy(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, z1 = (n) => [, , , N1(n?.[by("metadata")] ?? null)], vy = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Nr = (n) => n !== void 0 && typeof n != "function" ? Ws("Function expected") : n, L1 = (n, e, t, r, s) => ({ kind: vy[n], name: e, metadata: r, addInitializer: (i) => t._ ? Ws("Already initialized") : s.push(Nr(i || null)) }), W1 = (n, e) => F1(e, by("metadata"), n[3]), Z = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Ie = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = vy[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, G1({ get [t]() {
    return Un(this, i);
  }, set [t](g) {
    return wy(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = L1(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Nr(o) && (m[y] = o) : typeof o != "object" || o === null ? Ws("Object expected") : (Nr(a = o.get) && (m.get = a), Nr(a = o.set) && (m.set = a), Nr(a = o.init) && v.unshift(a));
  return m && yy(s, t, m), s;
}, Wc = (n, e, t) => e.has(n) || Ws("Cannot " + t), Un = (n, e, t) => (Wc(n, e, "read from private field"), t ? t.call(n) : e.get(n)), me = (n, e, t) => e.has(n) ? Ws("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), wy = (n, e, t, r) => (Wc(n, e, "write to private field"), e.set(n, t), t), ge = (n, e, t) => (Wc(n, e, "access private method"), t), xy, _y, ky, Sy, Iy, $y, Cy, Ty, Ey, Py, Ay, My, Oy, jy, Ry, Dy, Bo, U, Bc, qc, Hc, Vc, Yc, Jc, Kc, Zc, Xc, Qc, ed, td, nd, rd, sd, id, ue, fe, Ft;
class ye extends (Bo = he, Dy = [C({ persist: "idb" })], Ry = [C({ persist: "idb" })], jy = [C({ persist: "idb" })], Oy = [C({ persist: "idb" })], My = [C({ persist: "idb" })], Ay = [C({ persist: "idb" })], Py = [C({ persist: "idb" })], Ey = [C({ persist: "idb" })], Ty = [C({ persist: "idb" })], Cy = [C({ persist: "idb" })], $y = [C({ persist: "idb" })], Iy = [C({ persist: "idb" })], Sy = [C({ persist: "idb" })], ky = [C({ persist: "idb" })], _y = [C({ persist: "idb" })], xy = [C({ persist: "local" })], Bo) {
  constructor(e, t, r) {
    super(e, t), me(this, ue), me(this, Bc, Z(U, 8, this, null)), Z(U, 11, this), me(this, qc, Z(U, 12, this, null)), Z(U, 15, this), me(this, Hc, Z(U, 16, this, null)), Z(U, 19, this), me(this, Vc, Z(U, 20, this, null)), Z(U, 23, this), me(this, Yc, Z(U, 24, this, null)), Z(U, 27, this), me(this, Jc, Z(U, 28, this, null)), Z(U, 31, this), me(this, Kc, Z(U, 32, this, null)), Z(U, 35, this), me(this, Zc, Z(U, 36, this, null)), Z(U, 39, this), me(this, Xc, Z(U, 40, this, null)), Z(U, 43, this), me(this, Qc, Z(U, 44, this, null)), Z(U, 47, this), me(this, ed, Z(U, 48, this, null)), Z(U, 51, this), me(this, td, Z(U, 52, this, null)), Z(U, 55, this), me(this, nd, Z(U, 56, this, null)), Z(U, 59, this), me(this, rd, Z(U, 60, this, null)), Z(U, 63, this), me(this, sd, Z(U, 64, this, null)), Z(U, 67, this), me(this, id, Z(U, 68, this, !1)), Z(U, 71, this), me(this, Ft), wy(this, Ft, r), this.isHydrated.then(() => {
      ge(this, ue, fe).call(this, "agentMode", r.agentMode, !0), ge(this, ue, fe).call(this, "consistentUI", r.consistentUI, !0), ge(this, ue, fe).call(this, "enableGoogleDriveTools", r.enableGoogleDriveTools, !0), ge(this, ue, fe).call(this, "enableDrivePickerInLiteMode", r.enableDrivePickerInLiteMode, !0), ge(this, ue, fe).call(this, "force2DGraph", r.force2DGraph, !0), ge(this, ue, fe).call(this, "googleOne", r.googleOne, !0), ge(this, ue, fe).call(this, "gulfRenderer", r.gulfRenderer, !0), ge(this, ue, fe).call(this, "mcp", r.mcp, !0), ge(this, ue, fe).call(this, "opalAdk", r.opalAdk, !0), ge(this, ue, fe).call(this, "outputTemplates", r.outputTemplates, !0), ge(this, ue, fe).call(this, "requireConsentForGetWebpage", r.requireConsentForGetWebpage, !0), ge(this, ue, fe).call(this, "requireConsentForOpenWebpage", r.requireConsentForOpenWebpage, !0), ge(this, ue, fe).call(this, "streamGenWebpage", r.streamGenWebpage, !0), ge(this, ue, fe).call(this, "streamPlanner", r.streamPlanner, !0), ge(this, ue, fe).call(this, "enableResumeAgentRun", r.enableResumeAgentRun, !0);
    });
  }
  get agentMode() {
    if (this._agentMode === null)
      throw new Error("agentMode was not set by environment");
    return this._agentMode;
  }
  get consistentUI() {
    if (this._consistentUI === null)
      throw new Error("consistentUI was not set by environment");
    return this._consistentUI;
  }
  get enableDrivePickerInLiteMode() {
    if (this._enableDrivePickerInLiteMode === null)
      throw new Error("enableDrivePickerInLiteMode was not set by environment");
    return this._enableDrivePickerInLiteMode;
  }
  get enableGoogleDriveTools() {
    if (this._enableGoogleDriveTools === null)
      throw new Error("enableGoogleDriveTools was not set by environment");
    return this._enableGoogleDriveTools;
  }
  get enableResumeAgentRun() {
    if (this._enableResumeAgentRun === null)
      throw new Error("enableResumeAgentRun was not set by environment");
    return this._enableResumeAgentRun;
  }
  get force2DGraph() {
    if (this._force2DGraph === null)
      throw new Error("force2DGraph was not set by environment");
    return this._force2DGraph;
  }
  get googleOne() {
    if (this._googleOne === null)
      throw new Error("googleOne was not set by environment");
    return this._googleOne;
  }
  get gulfRenderer() {
    if (this._gulfRenderer === null)
      throw new Error("gulfRenderer was not set by environment");
    return this._gulfRenderer;
  }
  get mcp() {
    if (this._mcp === null) throw new Error("mcp was not set by environment");
    return this._mcp;
  }
  get opalAdk() {
    if (this._opalAdk === null)
      throw new Error("opalAdk was not set by environment");
    return this._opalAdk;
  }
  get outputTemplates() {
    if (this._outputTemplates === null)
      throw new Error("outputTemplates was not set by environment");
    return this._outputTemplates;
  }
  get requireConsentForGetWebpage() {
    if (this._requireConsentForGetWebpage === null)
      throw new Error("requireConsentForGetWebpage was not set by environment");
    return this._requireConsentForGetWebpage;
  }
  get requireConsentForOpenWebpage() {
    if (this._requireConsentForOpenWebpage === null)
      throw new Error(
        "requireConsentForOpenWebpage was not set by environment"
      );
    return this._requireConsentForOpenWebpage;
  }
  get streamGenWebpage() {
    if (this._streamGenWebpage === null)
      throw new Error("streamGenWebpage was not set by environment");
    return this._streamGenWebpage;
  }
  get streamPlanner() {
    if (this._streamPlanner === null)
      throw new Error("streamPlanner was not set by environment");
    return this._streamPlanner;
  }
  /**
   * Here for migrating from the old storage layer.
   * @deprecated
   */
  get isMigrated() {
    return this._migrated;
  }
  /**
   * Here for migrating from the old storage layer.
   * @deprecated
   */
  migrate(e) {
    const t = Object.entries(e);
    for (const [r, s] of t)
      ge(this, ue, fe).call(this, r, s);
    this._migrated = !0;
  }
  env() {
    return Un(this, Ft);
  }
  async flags() {
    const e = {}, t = Object.entries(Un(this, Ft));
    for (const [r, s] of t)
      this[r] !== null ? e[r] = this[r] : e[r] = s;
    return e;
  }
  async override(e, t) {
    ge(this, ue, fe).call(this, e, t);
  }
  async overrides() {
    const e = {}, t = Object.keys(Un(this, Ft));
    for (const r of t)
      this[r] === Un(this, Ft)[r] || this[r] === null || (e[r] = this[r]);
    return e;
  }
  async clearOverride(e) {
    ge(this, ue, fe).call(this, e, Un(this, Ft)[e]);
  }
}
U = z1(Bo);
Bc = /* @__PURE__ */ new WeakMap();
qc = /* @__PURE__ */ new WeakMap();
Hc = /* @__PURE__ */ new WeakMap();
Vc = /* @__PURE__ */ new WeakMap();
Yc = /* @__PURE__ */ new WeakMap();
Jc = /* @__PURE__ */ new WeakMap();
Kc = /* @__PURE__ */ new WeakMap();
Zc = /* @__PURE__ */ new WeakMap();
Xc = /* @__PURE__ */ new WeakMap();
Qc = /* @__PURE__ */ new WeakMap();
ed = /* @__PURE__ */ new WeakMap();
td = /* @__PURE__ */ new WeakMap();
nd = /* @__PURE__ */ new WeakMap();
rd = /* @__PURE__ */ new WeakMap();
sd = /* @__PURE__ */ new WeakMap();
id = /* @__PURE__ */ new WeakMap();
ue = /* @__PURE__ */ new WeakSet();
fe = function(n, e, t = !1) {
  switch (typeof e != "boolean" && (e = null), n) {
    case "agentMode": {
      if (t && this._agentMode !== null) return;
      this._agentMode = e;
      return;
    }
    case "consistentUI": {
      if (t && this._consistentUI !== null) return;
      this._consistentUI = e;
      return;
    }
    case "enableDrivePickerInLiteMode": {
      if (t && this._enableDrivePickerInLiteMode !== null) return;
      this._enableDrivePickerInLiteMode = e;
      return;
    }
    case "force2DGraph": {
      if (t && this._force2DGraph !== null) return;
      this._force2DGraph = e;
      return;
    }
    case "googleOne": {
      if (t && this._googleOne !== null) return;
      this._googleOne = e;
      return;
    }
    case "gulfRenderer": {
      if (t && this._gulfRenderer !== null) return;
      this._gulfRenderer = e;
      return;
    }
    case "mcp": {
      if (t && this._mcp !== null) return;
      this._mcp = e;
      return;
    }
    case "opalAdk": {
      if (t && this._opalAdk !== null) return;
      this._opalAdk = e;
      return;
    }
    case "outputTemplates": {
      if (t && this._outputTemplates !== null) return;
      this._outputTemplates = e;
      return;
    }
    case "requireConsentForGetWebpage": {
      if (t && this._requireConsentForGetWebpage !== null) return;
      this._requireConsentForGetWebpage = e;
      return;
    }
    case "requireConsentForOpenWebpage": {
      if (t && this._requireConsentForOpenWebpage !== null) return;
      this._requireConsentForOpenWebpage = e;
      return;
    }
    case "streamGenWebpage": {
      if (t && this._streamGenWebpage !== null) return;
      this._streamGenWebpage = e;
      return;
    }
    case "streamPlanner": {
      if (t && this._streamPlanner !== null) return;
      this._streamPlanner = e;
      return;
    }
    case "enableGoogleDriveTools": {
      if (t && this._enableGoogleDriveTools !== null) return;
      this._enableGoogleDriveTools = e;
      return;
    }
    case "enableResumeAgentRun": {
      if (t && this._enableResumeAgentRun !== null) return;
      this._enableResumeAgentRun = e;
      return;
    }
  }
};
Ft = /* @__PURE__ */ new WeakMap();
Ie(U, 4, "_agentMode", Dy, ye, Bc);
Ie(U, 4, "_consistentUI", Ry, ye, qc);
Ie(U, 4, "_enableDrivePickerInLiteMode", jy, ye, Hc);
Ie(U, 4, "_enableGoogleDriveTools", Oy, ye, Vc);
Ie(U, 4, "_enableResumeAgentRun", My, ye, Yc);
Ie(U, 4, "_force2DGraph", Ay, ye, Jc);
Ie(U, 4, "_googleOne", Py, ye, Kc);
Ie(U, 4, "_gulfRenderer", Ey, ye, Zc);
Ie(U, 4, "_mcp", Ty, ye, Xc);
Ie(U, 4, "_opalAdk", Cy, ye, Qc);
Ie(U, 4, "_outputTemplates", $y, ye, ed);
Ie(U, 4, "_requireConsentForGetWebpage", Iy, ye, td);
Ie(U, 4, "_requireConsentForOpenWebpage", Sy, ye, nd);
Ie(U, 4, "_streamGenWebpage", ky, ye, rd);
Ie(U, 4, "_streamPlanner", _y, ye, sd);
Ie(U, 4, "_migrated", xy, ye, id);
W1(U, ye);
var B1 = Object.create, Uy = Object.defineProperty, q1 = Object.getOwnPropertyDescriptor, Ny = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Bs = (n) => {
  throw TypeError(n);
}, H1 = (n, e, t) => e in n ? Uy(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, V1 = (n) => [, , , B1(n?.[Ny("metadata")] ?? null)], Gy = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Gr = (n) => n !== void 0 && typeof n != "function" ? Bs("Function expected") : n, Y1 = (n, e, t, r, s) => ({ kind: Gy[n], name: e, metadata: r, addInitializer: (i) => t._ ? Bs("Already initialized") : s.push(Gr(i || null)) }), J1 = (n, e) => H1(e, Ny("metadata"), n[3]), bt = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, qs = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Gy[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, q1({ get [t]() {
    return qo(this, i);
  }, set [t](g) {
    return Ni(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = Y1(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Gr(o) && (m[y] = o) : typeof o != "object" || o === null ? Bs("Object expected") : (Gr(a = o.get) && (m.get = a), Gr(a = o.set) && (m.set = a), Gr(a = o.init) && v.unshift(a));
  return m && Uy(s, t, m), s;
}, Fy = (n, e, t) => e.has(n) || Bs("Cannot " + t), qo = (n, e, t) => (Fy(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Mn = (n, e, t) => e.has(n) ? Bs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), Ni = (n, e, t, r) => (Fy(n, e, "write to private field"), e.set(n, t), t), zy, Ly, Wy, By, qy, Ho, ve, ad, od, ld, cd, dd, pn;
const K1 = [
  {
    intent: "Help me prepare for a quiz on a given topic by creating sample questions with hints as an interactive quiz"
  },
  {
    intent: "Take a photo of the leftovers in the fridge and generate different recipes with photos of the final dish"
  },
  {
    intent: "Analyze a meeting transcript and draft an email of the key takeaways and action items"
  },
  {
    intent: "An app that takes a given resume and a job description the candidate is interested in, then provides a critique of the resume"
  }
];
class $n extends (Ho = he, qy = [C()], By = [C({ deep: !0 })], Wy = [C()], Ly = [C()], zy = [C()], Ho) {
  constructor() {
    super(...arguments), Mn(this, ad, bt(ve, 8, this, "")), bt(ve, 11, this), Mn(this, od, bt(ve, 12, this, { status: "initial" })), bt(ve, 15, this), Mn(this, ld, bt(ve, 16, this, "")), bt(ve, 19, this), Mn(this, cd, bt(ve, 20, this, "Creating your app")), bt(ve, 23, this), Mn(this, dd, bt(ve, 24, this, "Planning ...")), bt(ve, 27, this), Mn(this, pn);
  }
  /**
   * Example intents for the home screen.
   */
  get examples() {
    return K1;
  }
  /**
   * Whether generation is currently in progress.
   */
  get isGenerating() {
    return this.state.status === "generating";
  }
  /**
   * The intent for generation.
   * Only returns the value when generation is in progress (not initial).
   */
  get intent() {
    return this.state.status !== "initial" && qo(this, pn) ? qo(this, pn) : "";
  }
  /**
   * Set the intent for generation.
   */
  setIntent(e) {
    Ni(this, pn, e);
  }
  /**
   * Start generation mode.
   */
  startGenerating() {
    this.state = { status: "generating" };
  }
  /**
   * Finish generation and clear transient state.
   * Called after successful generation.
   */
  finishGenerating() {
    Ni(this, pn, void 0), this.currentExampleIntent = "", this.state = { status: "initial" };
  }
  /**
   * Clears all input state and resets to initial.
   * Called after successful generation or when starting fresh.
   */
  clear() {
    this.inputValue = "", this.currentExampleIntent = "", Ni(this, pn, void 0), this.plannerStatus = "Creating your app", this.plannerThought = "Planning ...", this.state = { status: "initial" };
  }
}
ve = V1(Ho);
ad = /* @__PURE__ */ new WeakMap();
od = /* @__PURE__ */ new WeakMap();
ld = /* @__PURE__ */ new WeakMap();
cd = /* @__PURE__ */ new WeakMap();
dd = /* @__PURE__ */ new WeakMap();
pn = /* @__PURE__ */ new WeakMap();
qs(ve, 4, "inputValue", qy, $n, ad);
qs(ve, 4, "state", By, $n, od);
qs(ve, 4, "currentExampleIntent", Wy, $n, ld);
qs(ve, 4, "plannerStatus", Ly, $n, cd);
qs(ve, 4, "plannerThought", zy, $n, dd);
J1(ve, $n);
var Z1 = Object.create, Hy = Object.defineProperty, X1 = Object.getOwnPropertyDescriptor, Vy = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Hs = (n) => {
  throw TypeError(n);
}, Q1 = (n, e, t) => e in n ? Hy(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, eO = (n) => [, , , Z1(n?.[Vy("metadata")] ?? null)], Yy = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Fr = (n) => n !== void 0 && typeof n != "function" ? Hs("Function expected") : n, tO = (n, e, t, r, s) => ({ kind: Yy[n], name: e, metadata: r, addInitializer: (i) => t._ ? Hs("Already initialized") : s.push(Fr(i || null)) }), nO = (n, e) => Q1(e, Vy("metadata"), n[3]), Au = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, rO = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Yy[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, X1({ get [t]() {
    return sO(this, i);
  }, set [t](g) {
    return aO(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = tO(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Fr(o) && (m[y] = o) : typeof o != "object" || o === null ? Hs("Object expected") : (Fr(a = o.get) && (m.get = a), Fr(a = o.set) && (m.set = a), Fr(a = o.init) && v.unshift(a));
  return m && Hy(s, t, m), s;
}, Jy = (n, e, t) => e.has(n) || Hs("Cannot " + t), sO = (n, e, t) => (Jy(n, e, "read from private field"), e.get(n)), iO = (n, e, t) => e.has(n) ? Hs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), aO = (n, e, t, r) => (Jy(n, e, "write to private field"), e.set(n, t), t), Ky, Vo, Ss, pd;
const oO = 620, lO = 830;
class ud extends (Vo = he, Ky = [C()], Vo) {
  constructor() {
    super(...arguments), iO(this, pd, Au(Ss, 8, this, "wide")), Au(Ss, 11, this);
  }
}
Ss = eO(Vo);
pd = /* @__PURE__ */ new WeakMap();
rO(Ss, 4, "size", Ky, ud, pd);
nO(Ss, ud);
var cO = Object.create, Zy = Object.defineProperty, dO = Object.getOwnPropertyDescriptor, Xy = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Vs = (n) => {
  throw TypeError(n);
}, pO = (n, e, t) => e in n ? Zy(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, uO = (n) => [, , , cO(n?.[Xy("metadata")] ?? null)], Qy = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], zr = (n) => n !== void 0 && typeof n != "function" ? Vs("Function expected") : n, hO = (n, e, t, r, s) => ({ kind: Qy[n], name: e, metadata: r, addInitializer: (i) => t._ ? Vs("Already initialized") : s.push(zr(i || null)) }), fO = (n, e) => pO(e, Xy("metadata"), n[3]), le = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, gt = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Qy[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, dO({ get [t]() {
    return mO(this, i);
  }, set [t](g) {
    return gO(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = hO(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? zr(o) && (m[y] = o) : typeof o != "object" || o === null ? Vs("Object expected") : (zr(a = o.get) && (m.get = a), zr(a = o.set) && (m.set = a), zr(a = o.init) && v.unshift(a));
  return m && Zy(s, t, m), s;
}, eb = (n, e, t) => e.has(n) || Vs("Cannot " + t), mO = (n, e, t) => (eb(n, e, "read from private field"), e.get(n)), ot = (n, e, t) => e.has(n) ? Vs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), gO = (n, e, t, r) => (eb(n, e, "write to private field"), e.set(n, t), t), tb, nb, rb, sb, ib, ab, ob, lb, cb, db, pb, Yo, Y, hd, fd, md, gd, yd, bd, vd, wd, xd, _d, kd;
class Ke extends (Yo = he, pb = [C({ persist: "local" })], db = [C()], cb = [C({ persist: "local" })], lb = [C({ persist: "local" })], ob = [C()], ab = [C()], ib = [C()], sb = [C()], rb = [C()], nb = [C({ deep: !0 })], tb = [C()], Yo) {
  constructor() {
    super(...arguments), ot(this, hd, le(Y, 8, this, !1)), le(Y, 11, this), ot(this, fd, le(Y, 12, this, "canvas")), le(Y, 15, this), ot(this, md, le(Y, 16, this, "Browser Storage")), le(Y, 19, this), ot(this, gd, le(Y, 20, this, "Browser Storage")), le(Y, 23, this), ot(this, yd, le(Y, 24, this, !0)), le(Y, 27, this), ot(this, bd, le(Y, 28, this, !1)), le(Y, 31, this), ot(this, vd, le(Y, 32, this, "Home")), le(Y, 35, this), ot(this, wd, le(Y, 36, this, "indeterminate")), le(Y, 39, this), ot(this, xd, le(Y, 40, this, -1)), le(Y, 43, this), ot(this, _d, le(Y, 44, this, /* @__PURE__ */ new Set())), le(Y, 47, this), ot(this, kd, le(Y, 48, this, "")), le(Y, 51, this);
  }
}
Y = uO(Yo);
hd = /* @__PURE__ */ new WeakMap();
fd = /* @__PURE__ */ new WeakMap();
md = /* @__PURE__ */ new WeakMap();
gd = /* @__PURE__ */ new WeakMap();
yd = /* @__PURE__ */ new WeakMap();
bd = /* @__PURE__ */ new WeakMap();
vd = /* @__PURE__ */ new WeakMap();
wd = /* @__PURE__ */ new WeakMap();
xd = /* @__PURE__ */ new WeakMap();
_d = /* @__PURE__ */ new WeakMap();
kd = /* @__PURE__ */ new WeakMap();
gt(Y, 4, "experimentalComponents", pb, Ke, hd);
gt(Y, 4, "mode", db, Ke, fd);
gt(Y, 4, "boardServer", cb, Ke, md);
gt(Y, 4, "boardLocation", lb, Ke, gd);
gt(Y, 4, "canRunMain", ob, Ke, yd);
gt(Y, 4, "blockingAction", ab, Ke, bd);
gt(Y, 4, "loadState", ib, Ke, vd);
gt(Y, 4, "subscriptionStatus", sb, Ke, wd);
gt(Y, 4, "subscriptionCredits", rb, Ke, xd);
gt(Y, 4, "show", nb, Ke, _d);
gt(Y, 4, "viewError", tb, Ke, kd);
fO(Y, Ke);
var yO = Object.create, ub = Object.defineProperty, bO = Object.getOwnPropertyDescriptor, hb = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Ys = (n) => {
  throw TypeError(n);
}, vO = (n, e, t) => e in n ? ub(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, wO = (n) => [, , , yO(n?.[hb("metadata")] ?? null)], fb = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Lr = (n) => n !== void 0 && typeof n != "function" ? Ys("Function expected") : n, xO = (n, e, t, r, s) => ({ kind: fb[n], name: e, metadata: r, addInitializer: (i) => t._ ? Ys("Already initialized") : s.push(Lr(i || null)) }), _O = (n, e) => vO(e, hb("metadata"), n[3]), Ii = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, mb = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = fb[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, bO({ get [t]() {
    return kO(this, i);
  }, set [t](g) {
    return SO(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = xO(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Lr(o) && (m[y] = o) : typeof o != "object" || o === null ? Ys("Object expected") : (Lr(a = o.get) && (m.get = a), Lr(a = o.set) && (m.set = a), Lr(a = o.init) && v.unshift(a));
  return m && ub(s, t, m), s;
}, gb = (n, e, t) => e.has(n) || Ys("Cannot " + t), kO = (n, e, t) => (gb(n, e, "read from private field"), e.get(n)), Mu = (n, e, t) => e.has(n) ? Ys("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), SO = (n, e, t, r) => (gb(n, e, "write to private field"), e.set(n, t), t), yb, bb, Jo, Yt, Sd, Id;
class xa extends (Jo = he, bb = [C()], yb = [C({ deep: !0 })], Jo) {
  constructor() {
    super(...arguments), Mu(this, Sd, Ii(Yt, 8, this, 0)), Ii(Yt, 11, this), Mu(this, Id, Ii(Yt, 12, this, {
      nodes: /* @__PURE__ */ new Set(),
      edges: /* @__PURE__ */ new Set(),
      assets: /* @__PURE__ */ new Set(),
      assetEdges: /* @__PURE__ */ new Set()
    })), Ii(Yt, 15, this);
  }
  get selectionId() {
    return this._selectionId;
  }
  /**
   * Increments the selectionId without modifying selection state.
   * Used to bridge legacy selection events to the SCA trigger system.
   */
  bumpSelectionId() {
    this._selectionId++;
  }
  get selection() {
    return this._selection;
  }
  get size() {
    return this._selection.assetEdges.size + this._selection.assets.size + this._selection.edges.size + this._selection.nodes.size;
  }
  clear() {
    this._selectionId++, this.removeNodes(), this.removeEdges(), this.removeAssets(), this.removeAssetEdges();
  }
  addNode(e) {
    this._selectionId++, this._selection.nodes.add(e);
  }
  removeNode(e) {
    this._selectionId++, this._selection.nodes.delete(e);
  }
  removeNodes() {
    this._selection.nodes.clear();
  }
  addEdge(e) {
    this._selectionId++, this._selection.edges.add(e);
  }
  removeEdge(e) {
    this._selectionId++, this._selection.edges.delete(e);
  }
  removeEdges() {
    this._selection.edges.clear();
  }
  addAsset(e) {
    this._selectionId++, this._selection.assets.add(e);
  }
  removeAsset(e) {
    this._selectionId++, this._selection.assets.delete(e);
  }
  removeAssets() {
    this._selection.assets.clear();
  }
  addAssetEdge(e) {
    this._selectionId++, this._selection.assetEdges.add(e);
  }
  removeAssetEdge(e) {
    this._selectionId++, this._selection.assetEdges.delete(e);
  }
  removeAssetEdges() {
    this._selection.assetEdges.clear();
  }
  selectAll(e) {
    this._selectionId++, this.clear();
    for (const r of e.nodes())
      this.addNode(r.descriptor.id);
    for (const r of e.edges())
      this.addEdge(cx(r.raw()));
    for (const r of e.assets().keys())
      this.addAsset(r);
    const t = e.assetEdges();
    if (w(t))
      for (const r of t)
        this.addAssetEdge(dx(r));
  }
}
Yt = wO(Jo);
Sd = /* @__PURE__ */ new WeakMap();
Id = /* @__PURE__ */ new WeakMap();
mb(Yt, 4, "_selectionId", bb, xa, Sd);
mb(Yt, 4, "_selection", yb, xa, Id);
_O(Yt, xa);
var IO = Object.create, vb = Object.defineProperty, $O = Object.getOwnPropertyDescriptor, wb = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Js = (n) => {
  throw TypeError(n);
}, CO = (n, e, t) => e in n ? vb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, TO = (n) => [, , , IO(n?.[wb("metadata")] ?? null)], xb = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Wr = (n) => n !== void 0 && typeof n != "function" ? Js("Function expected") : n, EO = (n, e, t, r, s) => ({ kind: xb[n], name: e, metadata: r, addInitializer: (i) => t._ ? Js("Already initialized") : s.push(Wr(i || null)) }), PO = (n, e) => CO(e, wb("metadata"), n[3]), Ou = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, AO = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = xb[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, $O({ get [t]() {
    return MO(this, i);
  }, set [t](g) {
    return jO(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = EO(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Wr(o) && (m[y] = o) : typeof o != "object" || o === null ? Js("Object expected") : (Wr(a = o.get) && (m.get = a), Wr(a = o.set) && (m.set = a), Wr(a = o.init) && v.unshift(a));
  return m && vb(s, t, m), s;
}, _b = (n, e, t) => e.has(n) || Js("Cannot " + t), MO = (n, e, t) => (_b(n, e, "read from private field"), e.get(n)), OO = (n, e, t) => e.has(n) ? Js("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), jO = (n, e, t, r) => (_b(n, e, "write to private field"), e.set(n, t), t), kb, Ko, Is, $d;
class Cd extends (Ko = he, kb = [C({ persist: "local" })], Ko) {
  constructor() {
    super(...arguments), OO(this, $d, Ou(Is, 8, this, "preview")), Ou(Is, 11, this);
  }
}
Is = TO(Ko);
$d = /* @__PURE__ */ new WeakMap();
AO(Is, 4, "section", kb, Cd, $d);
PO(Is, Cd);
var RO = Object.create, Sb = Object.defineProperty, DO = Object.getOwnPropertyDescriptor, Ib = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Ks = (n) => {
  throw TypeError(n);
}, UO = (n, e, t) => e in n ? Sb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, NO = (n) => [, , , RO(n?.[Ib("metadata")] ?? null)], $b = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Br = (n) => n !== void 0 && typeof n != "function" ? Ks("Function expected") : n, GO = (n, e, t, r, s) => ({ kind: $b[n], name: e, metadata: r, addInitializer: (i) => t._ ? Ks("Already initialized") : s.push(Br(i || null)) }), FO = (n, e) => UO(e, Ib("metadata"), n[3]), On = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Td = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = $b[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, DO({ get [t]() {
    return zO(this, i);
  }, set [t](g) {
    return LO(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = GO(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Br(o) && (m[y] = o) : typeof o != "object" || o === null ? Ks("Object expected") : (Br(a = o.get) && (m.get = a), Br(a = o.set) && (m.set = a), Br(a = o.init) && v.unshift(a));
  return m && Sb(s, t, m), s;
}, Cb = (n, e, t) => e.has(n) || Ks("Cannot " + t), zO = (n, e, t) => (Cb(n, e, "read from private field"), e.get(n)), Za = (n, e, t) => e.has(n) ? Ks("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), LO = (n, e, t, r) => (Cb(n, e, "write to private field"), e.set(n, t), t), Tb, Eb, Pb, Zo, ht, Ed, Pd, Ad;
class Zs extends (Zo = he, Pb = [C({ persist: "session" })], Eb = [C()], Tb = [C()], Zo) {
  constructor() {
    super(...arguments), this.min = 0.1, this.max = 0.9, Za(this, Ed, On(ht, 8, this, 0.7)), On(ht, 11, this), Za(this, Pd, On(ht, 12, this, 370)), On(ht, 15, this), Za(this, Ad, On(ht, 16, this, 270)), On(ht, 19, this);
  }
  get split() {
    return this._split;
  }
  get minRightPixelWidth() {
    return this._minRightPixelWidth;
  }
  get minLeftPixelWidth() {
    return this._minLeftPixelWidth;
  }
  setSplit(e) {
    e > this.max && (e = this.max), e < this.min && (e = this.min), this._split = e;
  }
  getClampedValues(e, t) {
    let r = 1 - e, s = e;
    return t.width > 0 && (r * t.width < this.minRightPixelWidth ? (r = this.minRightPixelWidth / t.width, s = 1 - r) : s * t.width < this.minLeftPixelWidth && (s = this.minLeftPixelWidth / t.width, r = 1 - s)), [s, r];
  }
}
ht = NO(Zo);
Ed = /* @__PURE__ */ new WeakMap();
Pd = /* @__PURE__ */ new WeakMap();
Ad = /* @__PURE__ */ new WeakMap();
Td(ht, 4, "_split", Pb, Zs, Ed);
Td(ht, 4, "_minRightPixelWidth", Eb, Zs, Pd);
Td(ht, 4, "_minLeftPixelWidth", Tb, Zs, Ad);
FO(ht, Zs);
var WO = Object.create, Ab = Object.defineProperty, BO = Object.getOwnPropertyDescriptor, Mb = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Xs = (n) => {
  throw TypeError(n);
}, qO = (n, e, t) => e in n ? Ab(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, HO = (n) => [, , , WO(n?.[Mb("metadata")] ?? null)], Ob = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], qr = (n) => n !== void 0 && typeof n != "function" ? Xs("Function expected") : n, VO = (n, e, t, r, s) => ({ kind: Ob[n], name: e, metadata: r, addInitializer: (i) => t._ ? Xs("Already initialized") : s.push(qr(i || null)) }), YO = (n, e) => qO(e, Mb("metadata"), n[3]), re = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Ze = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Ob[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, BO({ get [t]() {
    return Hr(this, i);
  }, set [t](g) {
    return JO(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = VO(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? qr(o) && (m[y] = o) : typeof o != "object" || o === null ? Xs("Object expected") : (qr(a = o.get) && (m.get = a), qr(a = o.set) && (m.set = a), qr(a = o.init) && v.unshift(a));
  return m && Ab(s, t, m), s;
}, Md = (n, e, t) => e.has(n) || Xs("Cannot " + t), Hr = (n, e, t) => (Md(n, e, "read from private field"), t ? t.call(n) : e.get(n)), _e = (n, e, t) => e.has(n) ? Xs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), JO = (n, e, t, r) => (Md(n, e, "write to private field"), e.set(n, t), t), ju = (n, e, t) => (Md(n, e, "access private method"), t), jb, Rb, Db, Ub, Nb, Gb, Fb, zb, Lb, Wb, Bb, qb, Hb, Xo, W, Od, jd, Rd, Dd, Ud, Nd, Gd, Fd, zd, Ld, Wd, Bd, qd, Gi, Fi, Vb, zi, Yb;
class Ae extends (Xo = he, Hb = [C({ deep: !1 })], qb = [C({ deep: !1 })], Bb = [C()], Wb = [C()], Lb = [C()], zb = [C()], Fb = [C()], Gb = [C()], Nb = [C()], Ub = [C({ deep: !0 })], Db = [C()], Rb = [C()], jb = [C()], Xo) {
  constructor() {
    super(...arguments), _e(this, Fi), _e(this, Od, re(W, 8, this, null)), re(W, 11, this), _e(this, jd, re(W, 12, this, null)), re(W, 15, this), _e(this, Rd, re(W, 16, this, null)), re(W, 19, this), _e(this, Dd, re(W, 20, this, 0)), re(W, 23, this), _e(this, Ud, re(W, 24, this, 0)), re(W, 27, this), _e(this, Nd, re(W, 28, this, null)), re(W, 31, this), _e(this, Gd, re(W, 32, this, !1)), re(W, 35, this), _e(this, Fd, re(W, 36, this, null)), re(W, 39, this), _e(this, zd, re(W, 40, this, "saved")), re(W, 43, this), _e(this, Ld, re(W, 44, this, null)), re(W, 47, this), _e(this, Wd, re(W, 48, this, !1)), re(W, 51, this), _e(this, Bd, re(W, 52, this, null)), re(W, 55, this), this.finalOutputValues = void 0, _e(this, qd, re(W, 56, this, null)), re(W, 59, this), _e(this, Gi, ju(this, Fi, Vb).bind(this)), _e(this, zi, ju(this, Fi, Yb).bind(this));
  }
  get title() {
    return this._title;
  }
  /**
   * The current graph descriptor.
   */
  get graph() {
    return this._graph;
  }
  /**
   * Whether the graph is empty (has no nodes).
   */
  get empty() {
    return (this._graph?.nodes?.length ?? 0) === 0;
  }
  get editor() {
    return this._editor;
  }
  setEditor(e) {
    this._editor && (this._editor.removeEventListener("graphchange", Hr(this, Gi)), this._editor.removeEventListener(
      "graphchangereject",
      Hr(this, zi)
    )), this._editor = e, this._graph = this._editor?.raw() ?? null, this._title = this._graph?.title ?? null, this.lastEditError = null, this._editor && (this._editor.addEventListener("graphchange", Hr(this, Gi)), this._editor.addEventListener(
      "graphchangereject",
      Hr(this, zi)
    ));
  }
  /**
   * Here for migrations.
   *
   * @deprecated
   */
  asTab() {
    return !this._graph || !this.id || !this.mainGraphId ? null : {
      id: this.id,
      graph: this._graph,
      graphIsMine: this.graphIsMine,
      readOnly: !this.graphIsMine,
      boardServer: null,
      lastLoadedVersion: this.lastLoadedVersion,
      mainGraphId: this.mainGraphId,
      moduleId: null,
      name: this._graph.title ?? "Untitled app",
      subGraphId: null,
      type: 0,
      version: this.version,
      finalOutputValues: this.finalOutputValues
    };
  }
  /**
   * Here for migrations.
   *
   * @deprecated
   */
  resetAll() {
    this.id = null, this._editor = null, this._graph = null, this._title = null, this.url = null, this.version = 0, this.readOnly = !1, this.graphIsMine = !1, this.mainGraphId = null, this.lastLoadedVersion = 0, this.lastNodeConfigChange = null, this.finalOutputValues = void 0;
  }
}
W = HO(Xo);
Od = /* @__PURE__ */ new WeakMap();
jd = /* @__PURE__ */ new WeakMap();
Rd = /* @__PURE__ */ new WeakMap();
Dd = /* @__PURE__ */ new WeakMap();
Ud = /* @__PURE__ */ new WeakMap();
Nd = /* @__PURE__ */ new WeakMap();
Gd = /* @__PURE__ */ new WeakMap();
Fd = /* @__PURE__ */ new WeakMap();
zd = /* @__PURE__ */ new WeakMap();
Ld = /* @__PURE__ */ new WeakMap();
Wd = /* @__PURE__ */ new WeakMap();
Bd = /* @__PURE__ */ new WeakMap();
qd = /* @__PURE__ */ new WeakMap();
Gi = /* @__PURE__ */ new WeakMap();
Fi = /* @__PURE__ */ new WeakSet();
Vb = function(n) {
  this._graph = n.graph, this._title = n.graph?.title ?? null, this.lastEditError = null, this.version++;
};
zi = /* @__PURE__ */ new WeakMap();
Yb = function(n) {
  this._graph = n.graph, n.reason.type === "error" && (this.lastEditError = n.reason.error);
};
Ze(W, 4, "_editor", Hb, Ae, Od);
Ze(W, 4, "_graph", qb, Ae, jd);
Ze(W, 4, "id", Bb, Ae, Rd);
Ze(W, 4, "version", Wb, Ae, Dd);
Ze(W, 4, "lastLoadedVersion", Lb, Ae, Ud);
Ze(W, 4, "url", zb, Ae, Nd);
Ze(W, 4, "readOnly", Fb, Ae, Gd);
Ze(W, 4, "lastEditError", Gb, Ae, Fd);
Ze(W, 4, "saveStatus", Nb, Ae, zd);
Ze(W, 4, "lastNodeConfigChange", Ub, Ae, Ld);
Ze(W, 4, "graphIsMine", Db, Ae, Wd);
Ze(W, 4, "mainGraphId", Rb, Ae, Bd);
Ze(W, 4, "_title", jb, Ae, qd);
YO(W, Ae);
var KO = Object.create, Jb = Object.defineProperty, ZO = Object.getOwnPropertyDescriptor, Kb = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), Qs = (n) => {
  throw TypeError(n);
}, XO = (n, e, t) => e in n ? Jb(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, QO = (n) => [, , , KO(n?.[Kb("metadata")] ?? null)], Zb = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Vr = (n) => n !== void 0 && typeof n != "function" ? Qs("Function expected") : n, ej = (n, e, t, r, s) => ({ kind: Zb[n], name: e, metadata: r, addInitializer: (i) => t._ ? Qs("Already initialized") : s.push(Vr(i || null)) }), tj = (n, e) => XO(e, Kb("metadata"), n[3]), $i = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Xb = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Zb[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, ZO({ get [t]() {
    return nj(this, i);
  }, set [t](g) {
    return rj(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = ej(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Vr(o) && (m[y] = o) : typeof o != "object" || o === null ? Qs("Object expected") : (Vr(a = o.get) && (m.get = a), Vr(a = o.set) && (m.set = a), Vr(a = o.init) && v.unshift(a));
  return m && Jb(s, t, m), s;
}, Qb = (n, e, t) => e.has(n) || Qs("Cannot " + t), nj = (n, e, t) => (Qb(n, e, "read from private field"), e.get(n)), Ru = (n, e, t) => e.has(n) ? Qs("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), rj = (n, e, t, r) => (Qb(n, e, "write to private field"), e.set(n, t), t), ev, tv, Qo, Jt, Hd, Vd;
class _a extends (Qo = he, tv = [C({ deep: !1 })], ev = [C({ deep: !1 })], Qo) {
  constructor() {
    super(...arguments), Ru(this, Hd, $i(Jt, 8, this, null)), $i(Jt, 11, this), Ru(this, Vd, $i(Jt, 12, this, null)), $i(Jt, 15, this);
  }
  get pendingEdit() {
    return this._pendingEdit;
  }
  get pendingAssetEdit() {
    return this._pendingAssetEdit;
  }
  /**
   * Set the pending edit. Called by entity-editor when form values change.
   */
  setPendingEdit(e) {
    this._pendingEdit = e;
  }
  /**
   * Set the pending asset edit. Called by entity-editor when asset form changes.
   */
  setPendingAssetEdit(e) {
    this._pendingAssetEdit = e;
  }
  /**
   * Clear the pending edit. Called before applying configuration
   * to avoid re-triggering if apply fails.
   */
  clearPendingEdit() {
    this._pendingEdit = null;
  }
  /**
   * Clear the pending asset edit.
   */
  clearPendingAssetEdit() {
    this._pendingAssetEdit = null;
  }
}
Jt = QO(Qo);
Hd = /* @__PURE__ */ new WeakMap();
Vd = /* @__PURE__ */ new WeakMap();
Xb(Jt, 4, "_pendingEdit", tv, _a, Hd);
Xb(Jt, 4, "_pendingAssetEdit", ev, _a, Vd);
tj(Jt, _a);
var sj = Object.create, nv = Object.defineProperty, ij = Object.getOwnPropertyDescriptor, rv = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), ei = (n) => {
  throw TypeError(n);
}, aj = (n, e, t) => e in n ? nv(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, oj = (n) => [, , , sj(n?.[rv("metadata")] ?? null)], sv = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Yr = (n) => n !== void 0 && typeof n != "function" ? ei("Function expected") : n, lj = (n, e, t, r, s) => ({ kind: sv[n], name: e, metadata: r, addInitializer: (i) => t._ ? ei("Already initialized") : s.push(Yr(i || null)) }), cj = (n, e) => aj(e, rv("metadata"), n[3]), Du = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, dj = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = sv[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, ij({ get [t]() {
    return pj(this, i);
  }, set [t](g) {
    return hj(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = lj(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Yr(o) && (m[y] = o) : typeof o != "object" || o === null ? ei("Object expected") : (Yr(a = o.get) && (m.get = a), Yr(a = o.set) && (m.set = a), Yr(a = o.init) && v.unshift(a));
  return m && nv(s, t, m), s;
}, iv = (n, e, t) => e.has(n) || ei("Cannot " + t), pj = (n, e, t) => (iv(n, e, "read from private field"), e.get(n)), uj = (n, e, t) => e.has(n) ? ei("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), hj = (n, e, t, r) => (iv(n, e, "write to private field"), e.set(n, t), t), av, el, $s, Yd;
class Jd extends (el = he, av = [C()], el) {
  constructor() {
    super(...arguments), uj(this, Yd, Du($s, 8, this, { status: "closed" })), Du($s, 11, this);
  }
}
$s = oj(el);
Yd = /* @__PURE__ */ new WeakMap();
dj($s, 4, "state", av, Jd, Yd);
cj($s, Jd);
var fj = Object.create, ov = Object.defineProperty, mj = Object.getOwnPropertyDescriptor, lv = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), ti = (n) => {
  throw TypeError(n);
}, gj = (n, e, t) => e in n ? ov(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, yj = (n) => [, , , fj(n?.[lv("metadata")] ?? null)], cv = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Jr = (n) => n !== void 0 && typeof n != "function" ? ti("Function expected") : n, bj = (n, e, t, r, s) => ({ kind: cv[n], name: e, metadata: r, addInitializer: (i) => t._ ? ti("Already initialized") : s.push(Jr(i || null)) }), vj = (n, e) => gj(e, lv("metadata"), n[3]), Ci = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, dv = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = cv[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, mj({ get [t]() {
    return wj(this, i);
  }, set [t](g) {
    return xj(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = bj(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Jr(o) && (m[y] = o) : typeof o != "object" || o === null ? ti("Object expected") : (Jr(a = o.get) && (m.get = a), Jr(a = o.set) && (m.set = a), Jr(a = o.init) && v.unshift(a));
  return m && ov(s, t, m), s;
}, Kd = (n, e, t) => e.has(n) || ti("Cannot " + t), wj = (n, e, t) => (Kd(n, e, "read from private field"), e.get(n)), Xa = (n, e, t) => e.has(n) ? ti("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), xj = (n, e, t, r) => (Kd(n, e, "write to private field"), e.set(n, t), t), Qa = (n, e, t) => (Kd(n, e, "access private method"), t), pv, uv, tl, Kt, Zd, Xd, Kr, Li;
const _j = 100;
class ka extends (tl = he, uv = [C({ persist: "idb", deep: !0 })], pv = [C({ persist: "local" })], tl) {
  constructor(e, t, r = _j) {
    super(e, t), this.maxSize = r, Xa(this, Kr), Xa(this, Zd, Ci(Kt, 8, this, [])), Ci(Kt, 11, this), Xa(this, Xd, Ci(Kt, 12, this, !1)), Ci(Kt, 15, this);
  }
  /**
   * Here for migrating from the old storage layer.
   * @deprecated
   */
  get isMigrated() {
    return this._migrated;
  }
  /**
   * Here for migrating from the old storage layer.
   * @deprecated
   */
  async migrate(e) {
    if (await this.isHydrated, !this._migrated) {
      for (let t = e.length - 1; t >= 0; t--)
        this.add(e[t]);
      this._migrated = !0;
    }
  }
  get boards() {
    return this._boards;
  }
  add(e) {
    const t = Qa(this, Kr, Li).call(this, e.url);
    if (t !== -1) {
      const [r] = this._boards.splice(t, 1);
      e.title && (r.title = e.title), e = r;
    }
    this._boards.unshift(e), !(this._boards.length <= this.maxSize) && (this._boards.length = this.maxSize);
  }
  remove(e) {
    const t = Qa(this, Kr, Li).call(this, e);
    t !== -1 && this._boards.splice(t, 1);
  }
  setPin(e, t) {
    const r = Qa(this, Kr, Li).call(this, e);
    r !== -1 && (this._boards[r].pinned = t);
  }
}
Kt = yj(tl);
Zd = /* @__PURE__ */ new WeakMap();
Xd = /* @__PURE__ */ new WeakMap();
Kr = /* @__PURE__ */ new WeakSet();
Li = function(n) {
  return this._boards.findIndex((e) => e.url === n);
};
dv(Kt, 4, "_boards", uv, ka, Zd);
dv(Kt, 4, "_migrated", pv, ka, Xd);
vj(Kt, ka);
var kj = Object.create, hv = Object.defineProperty, Sj = Object.getOwnPropertyDescriptor, fv = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), ni = (n) => {
  throw TypeError(n);
}, Ij = (n, e, t) => e in n ? hv(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, $j = (n) => [, , , kj(n?.[fv("metadata")] ?? null)], mv = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Zr = (n) => n !== void 0 && typeof n != "function" ? ni("Function expected") : n, Cj = (n, e, t, r, s) => ({ kind: mv[n], name: e, metadata: r, addInitializer: (i) => t._ ? ni("Already initialized") : s.push(Zr(i || null)) }), Tj = (n, e) => Ij(e, fv("metadata"), n[3]), De = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Cn = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = mv[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, Sj({ get [t]() {
    return yv(this, i);
  }, set [t](g) {
    return bv(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = Cj(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Zr(o) && (m[y] = o) : typeof o != "object" || o === null ? ni("Object expected") : (Zr(a = o.get) && (m.get = a), Zr(a = o.set) && (m.set = a), Zr(a = o.init) && v.unshift(a));
  return m && hv(s, t, m), s;
}, gv = (n, e, t) => e.has(n) || ni("Cannot " + t), yv = (n, e, t) => (gv(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Nt = (n, e, t) => e.has(n) ? ni("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), bv = (n, e, t, r) => (gv(n, e, "write to private field"), e.set(n, t), t), vv, wv, xv, _v, kv, Sv, Iv, nl, oe, Qd, ep, Wi, tp, np, rp, sp, ip;
class Le extends (nl = he, Iv = [C()], Sv = [C({ deep: !1 })], kv = [C({ deep: !0 })], _v = [C()], xv = [C()], wv = [C({ deep: !0 })], vv = [C()], nl) {
  constructor(e, t) {
    super(e, t), Nt(this, Qd, De(oe, 8, this, et.STOPPED)), De(oe, 11, this), Nt(this, ep, De(oe, 12, this, null)), De(oe, 15, this), Nt(this, Wi, null), Nt(this, tp, De(oe, 16, this, new Xt())), De(oe, 19, this), Nt(this, np, De(oe, 20, this, null)), De(oe, 23, this), Nt(this, rp, De(oe, 24, this, null)), De(oe, 27, this), Nt(this, sp, De(oe, 28, this, new qi())), De(oe, 31, this), Nt(this, ip, De(oe, 32, this, 0)), De(oe, 35, this);
  }
  get abortController() {
    return yv(this, Wi);
  }
  set abortController(e) {
    bv(this, Wi, e);
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE METHODS
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Gets the current run status.
   */
  get status() {
    return this._status;
  }
  /**
   * Updates the run status.
   * This is called in response to run lifecycle events.
   *
   * @param status The new run status
   */
  setStatus(e) {
    this._status = e;
  }
  /**
   * Sets the runner and abort controller.
   * Called by RunActions.prepare() after creating the runner.
   *
   * @param runner The HarnessRunner
   * @param abortController The AbortController for this run
   */
  setRunner(e, t) {
    this.runner = e, this.abortController = t;
  }
  /**
   * Clears the runner and abort controller.
   */
  clearRunner() {
    this.runner = null, this.abortController = null;
  }
  /**
   * Starts the current run.
   *
   * @throws Error if no runner is set (programming error)
   */
  start() {
    if (!this.runner)
      throw new Error("start() called without an active runner");
    this.runner.start();
  }
  /**
   * Stops the current run by aborting it.
   */
  stop() {
    this.abortController && this.abortController.abort(), this._status = et.STOPPED;
  }
  /**
   * Resets the run status to stopped and clears runner.
   */
  reset() {
    this._status = et.STOPPED, this.clearRunner();
  }
  /**
   * Checks if the board is currently running.
   */
  get isRunning() {
    return this._status === et.RUNNING;
  }
  /**
   * Checks if the board is currently paused.
   */
  get isPaused() {
    return this._status === et.PAUSED;
  }
  /**
   * Checks if the board is stopped (idle).
   */
  get isStopped() {
    return this._status === et.STOPPED;
  }
  /**
   * Checks if there's an active runner.
   */
  get hasRunner() {
    return this.runner !== null;
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // OUTPUT METHODS
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Gets the console entries map.
   */
  get console() {
    return this._console;
  }
  /**
   * Adds or updates a console entry.
   *
   * @param id The node identifier
   * @param entry The console entry (with resolved metadata)
   */
  setConsoleEntry(e, t) {
    this._console.set(e, t);
  }
  /**
   * Gets the current input request (if any).
   */
  get input() {
    return this._input;
  }
  /**
   * Sets the current input request.
   * Called when the runner pauses waiting for user input.
   *
   * @param input The input request with node ID and schema
   */
  setInput(e) {
    this._input = e;
  }
  /**
   * Clears the current input request.
   * Called when input is provided or run is cancelled.
   */
  clearInput() {
    this._input = null;
  }
  /**
   * Gets the fatal error (if any).
   */
  get error() {
    return this._error;
  }
  /**
   * Sets the fatal error.
   *
   * @param error The error from the run
   */
  setError(e) {
    this._error = e;
  }
  /**
   * Dismisses the current error.
   * If a nodeId is provided, adds it to dismissed set.
   *
   * @param nodeId Optional node ID to track as dismissed
   */
  dismissError(e) {
    e && this._dismissedErrors.add(e), this._error = null;
  }
  /**
   * Gets the set of dismissed error node IDs.
   */
  get dismissedErrors() {
    return this._dismissedErrors;
  }
  /**
   * Gets the estimated entry count for progress calculation.
   * Returns the larger of the estimate and actual console size.
   */
  get estimatedEntryCount() {
    return Math.max(this._estimatedEntryCount, this._console.size);
  }
  /**
   * Sets the estimated entry count.
   * Typically set at run start based on graph node count.
   *
   * @param count The estimated number of entries
   */
  setEstimatedEntryCount(e) {
    this._estimatedEntryCount = e;
  }
  /**
   * Resets all output state for a new run.
   * Clears console, input, errors, and estimate.
   */
  resetOutput() {
    this._console.clear(), this._input = null, this._error = null, this._dismissedErrors.clear(), this._estimatedEntryCount = 0;
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // COMPUTED STATE
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Progress as a number between 0 and 1.
   * Based on console entries vs estimated total.
   */
  get progress() {
    return this.estimatedEntryCount === 0 ? 0 : this._console.size / this.estimatedEntryCount;
  }
  /**
   * Console state: "start" if empty, "entries" otherwise.
   */
  get consoleState() {
    return this._console.size > 0 ? "entries" : "start";
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // STATIC FACTORIES
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Creates a ConsoleEntry with all required fields initialized.
   * Use this factory to ensure entries have proper default values.
   *
   * @param title - Display title for the step
   * @param status - Current status (inactive, working, succeeded, failed, etc.)
   * @param options - Optional icon and tags for the entry
   */
  static createConsoleEntry(e, t, r) {
    return {
      title: e,
      icon: r?.icon,
      tags: r?.tags,
      status: { status: t },
      open: !1,
      rerun: !1,
      work: /* @__PURE__ */ new Map(),
      output: /* @__PURE__ */ new Map(),
      error: null,
      completed: t === "succeeded",
      current: null
    };
  }
}
oe = $j(nl);
Qd = /* @__PURE__ */ new WeakMap();
ep = /* @__PURE__ */ new WeakMap();
Wi = /* @__PURE__ */ new WeakMap();
tp = /* @__PURE__ */ new WeakMap();
np = /* @__PURE__ */ new WeakMap();
rp = /* @__PURE__ */ new WeakMap();
sp = /* @__PURE__ */ new WeakMap();
ip = /* @__PURE__ */ new WeakMap();
Cn(oe, 4, "_status", Iv, Le, Qd);
Cn(oe, 4, "runner", Sv, Le, ep);
Cn(oe, 4, "_console", kv, Le, tp);
Cn(oe, 4, "_input", _v, Le, np);
Cn(oe, 4, "_error", xv, Le, rp);
Cn(oe, 4, "_dismissedErrors", wv, Le, sp);
Cn(oe, 4, "_estimatedEntryCount", vv, Le, ip);
Tj(oe, Le);
const Uu = "recent-boards", Nu = 3;
class ap {
  // Not instantiated directly.
  constructor() {
    this.boards = new us();
  }
  static #e;
  /** @deprecated */
  static __instance() {
    return this.#e || (this.#e = new ap()), this.#e;
  }
  async clear() {
    this.boards.length = 0, await this.#t();
  }
  async add(e) {
    const t = this.boards.findIndex((r) => r.url === e.url);
    if (t !== -1) {
      const [r] = this.boards.splice(t, 1);
      e.title && (r.title = e.title), this.boards.unshift(
        new Fn({
          url: r.url,
          title: r.title,
          pinned: r.pinned ?? !1
        })
      );
    } else
      this.boards.unshift(
        new Fn({
          url: e.url,
          title: e.title,
          pinned: e.pinned ?? !1
        })
      );
    this.boards.length > 50 && (this.boards.length = 50), await this.#t();
  }
  async remove(e) {
    const t = this.boards.findIndex((r) => r.url === e);
    t !== -1 && (this.boards.splice(t, 1), await this.#t());
  }
  async setPin(e, t) {
    const r = this.boards.find((s) => s.url === e);
    r && (r.pinned = t, await this.#t());
  }
  async #t() {
    const e = await hs(
      Uu,
      Nu
    ), t = [];
    for (const r of this.boards)
      t.push({
        title: r.title,
        url: r.url,
        pinned: r.pinned ?? !1
      });
    e.put("boards", t, "recent");
  }
  async restore() {
    const t = await (await hs(
      Uu,
      Nu,
      {
        upgrade(r) {
          r.objectStoreNames.contains("boards") || r.createObjectStore("boards");
        }
      }
    )).get("boards", "recent");
    if (t)
      for (const r of t)
        this.boards.push(
          new Fn({
            url: r.url,
            title: r.title,
            pinned: r.pinned ?? !1
          })
        );
  }
}
const Gu = "bb-update-hash";
async function Ej(n) {
  if (await n.isHydrated, n.isMigrated) return;
  const e = ap.__instance();
  await e.restore();
  const t = zt(e.boards);
  n.boards.length > 0 && t.length === 0 || (n.migrate(t), await e.clear(), await n.isSettled);
}
async function Pj(n, e) {
  if (await n.isHydrated, n.isMigrated) return;
  const r = await new D_(e).flags();
  n.migrate(r), await n.isSettled;
}
async function Aj(n) {
  if (await n.isHydrated, n.isMigrated) return;
  const e = globalThis.localStorage.getItem(Gu);
  e ? (n.migrate(e), globalThis.localStorage.removeItem(Gu)) : n.migrate("0"), await n.isSettled;
}
var Mj = Object.create, $v = Object.defineProperty, Oj = Object.getOwnPropertyDescriptor, Cv = (n, e) => (e = Symbol[n]) ? e : /* @__PURE__ */ Symbol.for("Symbol." + n), ri = (n) => {
  throw TypeError(n);
}, jj = (n, e, t) => e in n ? $v(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Rj = (n) => [, , , Mj(n?.[Cv("metadata")] ?? null)], Tv = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], Xr = (n) => n !== void 0 && typeof n != "function" ? ri("Function expected") : n, Dj = (n, e, t, r, s) => ({ kind: Tv[n], name: e, metadata: r, addInitializer: (i) => t._ ? ri("Already initialized") : s.push(Xr(i || null)) }), Uj = (n, e) => jj(e, Cv("metadata"), n[3]), Fu = (n, e, t, r) => {
  for (var s = 0, i = n[e >> 1], a = i && i.length; s < a; s++) e & 1 ? i[s].call(t) : r = i[s].call(t, r);
  return r;
}, Nj = (n, e, t, r, s, i) => {
  for (var a, o, l, c, d, p = e & 7, h = !1, f = !1, u = n.length + 1, y = Tv[p + 5], v = n[u - 1] = [], x = n[u] || (n[u] = []), m = (s = s.prototype, Oj({ get [t]() {
    return Gj(this, i);
  }, set [t](g) {
    return Fj(this, i, g);
  } }, t)), b = r.length - 1; b >= 0; b--)
    c = Dj(p, t, l = {}, n[3], x), c.static = h, c.private = f, d = c.access = { has: (g) => t in g }, d.get = (g) => g[t], d.set = (g, _) => g[t] = _, o = (0, r[b])({ get: m.get, set: m.set }, c), l._ = 1, o === void 0 ? Xr(o) && (m[y] = o) : typeof o != "object" || o === null ? ri("Object expected") : (Xr(a = o.get) && (m.get = a), Xr(a = o.set) && (m.set = a), Xr(a = o.init) && v.unshift(a));
  return m && $v(s, t, m), s;
}, op = (n, e, t) => e.has(n) || ri("Cannot " + t), Gj = (n, e, t) => (op(n, e, "read from private field"), e.get(n)), zu = (n, e, t) => e.has(n) ? ri("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), Fj = (n, e, t, r) => (op(n, e, "write to private field"), e.set(n, t), t), eo = (n, e, t) => (op(n, e, "access private method"), t), Ev, rl, Cs, lp, Qr, Bi;
class cp extends (rl = he, Ev = [C()], rl) {
  constructor() {
    super("Router", "router"), zu(this, Qr), zu(this, lp, Fu(Cs, 8, this)), Fu(Cs, 11, this);
    const e = fh(window.location.href);
    "redirectFromLanding" in e && (e.redirectFromLanding = !1);
    const t = Tp(e);
    window.location.href !== t && window.history.replaceState(null, "", t), this._parsedUrl = e;
  }
  /**
   * The current parsed URL state.
   */
  get parsedUrl() {
    return this._parsedUrl;
  }
  /**
   * Navigate to a new URL.
   *
   * Updates the browser history and the reactive `parsedUrl` state.
   * If the URL matches the current location, this is a no-op.
   *
   * @param init - The URL configuration to navigate to
   */
  go(e) {
    const t = Tp(e);
    t !== window.location.href && (window.history.pushState(null, "", t), eo(this, Qr, Bi).call(this));
  }
  /**
   * Trigger initial URL change handling.
   *
   * Should be called once after the controller is wired up and triggers
   * are registered. This emulates the legacy `Router.init()` behavior.
   */
  init() {
    eo(this, Qr, Bi).call(this);
  }
  /**
   * Update the parsed URL from the current window location.
   *
   * Called internally after navigation or popstate events.
   */
  updateFromCurrentUrl() {
    eo(this, Qr, Bi).call(this);
  }
  /**
   * Remove all flow and tab parameters from the current URL.
   *
   * Used when closing a board to return to a clean home URL.
   */
  clearFlowParameters() {
    const e = new URL(window.location.href), t = [...e.searchParams].filter(([r]) => r.startsWith("tab") || r.startsWith("flow")).map(([r]) => r);
    for (const r of t)
      e.searchParams.delete(r);
    window.history.replaceState(null, "", e);
  }
}
Cs = Rj(rl);
lp = /* @__PURE__ */ new WeakMap();
Qr = /* @__PURE__ */ new WeakSet();
Bi = function() {
  this._parsedUrl = fh(window.location.href);
};
Nj(Cs, 4, "_parsedUrl", Ev, cp, lp);
Uj(Cs, cp);
class zj {
  constructor(e) {
    const t = e;
    this.editor = {
      graph: new Ae(
        "Editor_Graph",
        "GraphController"
      ),
      selection: new xa(
        "Editor_Selection",
        "SelectionController"
      ),
      splitter: new Zs(
        "Editor_Splitter",
        "SplitterController"
      ),
      sidebar: new Cd(
        "Editor_Sidebar",
        "SidebarController"
      ),
      step: new _a(
        "Editor_Step",
        "StepController"
      ),
      share: new Jd(
        "Editor_Share",
        "ShareController"
      )
    }, this.home = {
      recent: new ka(
        "RecentBoards",
        "RecentBoardsController"
      )
    }, this.global = {
      main: new Ke("Global", "GlobalController"),
      flags: new ye("Flags", "FlagController", t),
      debug: new Mc("Debug", "DebugController"),
      feedback: new jc("Feedback", "FeedbackController"),
      flowgenInput: new $n(
        "FlowgenInput",
        "FlowgenInputController"
      ),
      toasts: new Lc("Toasts", "ToastController"),
      snackbars: new va(
        "Snackbars",
        "SnackbarController"
      ),
      statusUpdates: new sr(
        "StatusUpdates",
        "StatusUpdatesController"
      ),
      consent: new ba("Consent", "ConsentController"),
      screenSize: new ud(
        "ScreenSize",
        "ScreenSizeController"
      ),
      // Migrations are tested independently so this block is ignored for
      // coverage reporting.
      /* c8 ignore start */
      async performMigrations() {
        const r = Pv();
        r || console.warn("Unable to complete migrations; no controller instance"), await Ej(r.home.recent), await Pj(r.global.flags, t), await Aj(
          r.global.statusUpdates
        );
      }
      /* c8 ignore end */
    }, this.board = {
      main: new Ds("Board", "BoardController")
    }, this.run = {
      main: new Le("Run", "RunController")
    }, this.router = new cp();
  }
  /**
   * Recursively walks the controller tree to find all `HydratedController`
   * instances. Used to aggregate hydration promises from all subcontrollers.
   */
  #e(e = [], t = this) {
    if (t === null || typeof t != "object")
      return;
    const r = t, s = Object.getOwnPropertyNames(r);
    for (const i of s) {
      const a = r[i];
      if (ah(a)) {
        e.push(a);
        continue;
      }
      this.#e(e, a);
    }
    return e;
  }
  /**
   * Promise that resolves when ALL subcontrollers have finished hydrating
   * their persisted `@field` values from storage.
   *
   * **Usage:**
   * ```typescript
   * await sca.controller.isHydrated;
   * // Now safe to access any persisted field
   * ```
   */
  get isHydrated() {
    const e = [];
    return this.#e(e, this), Promise.all(e.map((t) => t.isHydrated));
  }
}
let Ti;
const Pv = (n) => {
  if (!Ti) {
    if (!n)
      throw new Error("App Controller must be instantiated with flags");
    Ti = new zj(n), mh(Ti);
  }
  return Ti;
};
function si() {
  let n;
  const e = (t) => {
    n = t;
  };
  return new Proxy(e, {
    get(t, r, s) {
      if (n && r in n)
        return Reflect.get(n, r, s);
      throw new Error("Not set");
    }
  });
}
function sa(n, e) {
  if ("canParse" in URL)
    return URL.canParse(n, e);
  try {
    return new URL(n, e), !0;
  } catch {
    return !1;
  }
}
function Lj(n, e) {
  if (!n)
    return null;
  if (sa(n) && e)
    try {
      const t = new URL(e);
      return new URL(n, t).href;
    } catch {
      console.warn("Unable to parse URL from current board:", e);
    }
  return n;
}
function Wj(n, e) {
  if (!e)
    return n;
  try {
    const r = new URL(e).searchParams.get("resourcekey");
    if (r)
      return `${n}?resourcekey=${r}`;
  } catch {
  }
  return n;
}
function Bj(n, e) {
  const t = globalThis.location?.href;
  return !sa(n) && !sa(n, t) ? { canLoad: !1, reason: "invalid-url" } : { canLoad: !0, urlWithResourceKey: Wj(n, e) };
}
async function qj(n, e, t) {
  const { loader: r, boardServer: s } = t, i = Bj(n, e);
  if (!i.canLoad)
    return { success: !1, reason: i.reason };
  const a = new URL(globalThis.location?.href ?? ""), o = await r.load(i.urlWithResourceKey, {
    base: a
  });
  return !o.success || !o.graph ? { success: !1, reason: "load-failed" } : {
    success: !0,
    graph: o.graph,
    boardServer: s
  };
}
function Hj(n, e) {
  let t = e ?? null;
  return n.main && !t && (t = n.main), t && (!n.modules || !n.modules[t]) ? null : t;
}
function Vj(n, e) {
  return e && (!n.graphs || !n.graphs[e]) ? null : e ?? null;
}
function Yj(n) {
  n.graphs?.["Main board"] && (n.graphs[globalThis.crypto.randomUUID()] = n.graphs["Main board"], delete n.graphs["Main board"]);
}
async function Jj(n, e = {}) {
  const { moduleId: t, subGraphId: r, googleDriveClient: s } = e, i = Hj(n, t), a = Vj(n, r);
  return Yj(n), o_(n), s && await l_(n, s), {
    graph: n,
    moduleId: i,
    subGraphId: a
  };
}
async function Kj(n, e, t, r) {
  if (r.isMine(n) || !n || !e?.getLatestSharedVersion)
    return null;
  await t.isHydrated;
  const s = t.getLastSeenVersion(n), i = e.getLatestSharedVersion(new URL(n));
  t.recordVersion(n, i);
  const a = s !== -1 && s < i;
  return {
    version: i,
    lastLoadedVersion: s,
    isNewer: a
  };
}
async function Zj(n, e) {
  if (!e)
    return console.error("No GoogleDriveClient provided. Cannot fetch results."), { success: !1, reason: "no-client" };
  try {
    const r = await (await e.getFileMedia(n)).json();
    return r.finalOutputValues ? {
      success: !0,
      finalOutputValues: r.finalOutputValues
    } : { success: !1, reason: "no-results" };
  } catch (t) {
    return console.error("Failed to load run results:", t), { success: !1, reason: "load-failed" };
  }
}
function Xj(n, e, t) {
  const {
    graph: r,
    url: s,
    readOnly: i,
    version: a,
    lastLoadedVersion: o,
    creator: l,
    history: c,
    onHistoryChanged: d
  } = t, p = n.getByDescriptor(r);
  if (!p.success)
    throw new Error(`Unable to add graph: ${p.error}`);
  const h = n.editByDescriptor(r, {
    creator: l,
    history: c,
    onHistoryChanged: d
  });
  if (!h)
    throw new Error("Unable to edit by descriptor");
  const f = globalThis.crypto.randomUUID();
  return e.id = f, e.setEditor(h), e.url = s, e.version = a, e.readOnly = i, e.graphIsMine = !i, e.mainGraphId = p.result, e.lastLoadedVersion = o, e.finalOutputValues = t.finalOutputValues, {
    success: !0,
    id: f,
    mainGraphId: p.result
  };
}
const en = si(), Qj = "Board Actions";
async function eR(n) {
  const { controller: e, services: t } = en, { editor: r, url: s, readOnly: i } = e.editor.graph, a = wn(e), o = e.global.snackbars;
  if (!r)
    throw new Error("save() called without an active editor");
  if (!s || i)
    return;
  const l = t.googleDriveBoardServer, c = new URL(s), d = l.canProvide(c);
  if (!d || !d.save)
    return;
  const p = r.raw();
  if (!p)
    throw new Error("save() called but editor has no graph");
  let h;
  n && (h = o.snackbar(
    n.start,
    nt.PENDING,
    [],
    !0,
    // persistent
    void 0,
    !0
    // replaceAll
  ));
  try {
    const f = await l.save(c, p, !!n);
    return h && n && o.update(h, n.end, nt.INFORMATION), f;
  } catch (f) {
    return a.log(
      yn(
        `Failed to save board: ${f instanceof Error ? f.message : String(f)}`
      ),
      Qj
    ), h && o.unsnackbar(h), { result: !1 };
  }
}
let yr = !1;
async function Av(n, e) {
  const { controller: t, services: r } = en, s = t.global.snackbars;
  if (yr)
    return null;
  yr = !0;
  const i = s.snackbar(
    e.start,
    nt.PENDING,
    [],
    !0,
    // persistent
    void 0,
    !0
    // replaceAll
  ), a = { result: !1, error: "Unable to save", url: void 0 }, o = r.googleDriveBoardServer;
  if (!o)
    return yr = !1, s.update(i, e.error, nt.ERROR), a;
  try {
    const l = new URL("http://invalid"), c = await o.deepCopy(
      l,
      n
    ), d = await o.create(
      l,
      c
    );
    return d.url ? (s.unsnackbar(), { result: !0, url: new URL(d.url) }) : (yr = !1, s.update(i, e.error, nt.ERROR), a);
  } catch {
    return a;
  } finally {
    s.unsnackbar(), yr = !1;
  }
}
async function tR(n, e) {
  const { controller: t, services: r } = en, s = t.editor.graph, i = t.global.snackbars, a = wn(t), o = "Board Actions";
  i.snackbar(
    e.start,
    nt.PENDING,
    [],
    !0,
    void 0,
    !0
    // Replace existing snackbars.
  );
  const l = s.editor?.raw();
  let c;
  if (l && s.url === n)
    a.log(wt("Using current graph"), o), c = structuredClone(l);
  else {
    a.log(wt("Using graph store"), o);
    const p = r.graphStore, h = p.addByURL(n, [], {}), f = await p.getLatest(h.mutable);
    if (!f.graph || f.graph.nodes.length === 0)
      return i.snackbar(
        e.error,
        nt.ERROR,
        [],
        !1,
        void 0,
        !0
      ), { success: !1, reason: "no-graph" };
    c = structuredClone(f.graph);
  }
  c.title = `${c.title ?? "Untitled"} Remix`;
  const d = await Av(c, e);
  return !d?.result || !d.url ? { success: !1, reason: "save-failed" } : { success: !0, url: d.url };
}
async function nR(n, e) {
  const { controller: t, services: r } = en, s = t.global.snackbars, i = s.snackbar(
    e.start,
    nt.PENDING,
    [],
    !0,
    // persistent
    void 0,
    !0
    // replaceAll
  ), a = { result: !1, error: "Unable to delete" }, o = r.googleDriveBoardServer;
  if (!o)
    return s.update(i, e.error, nt.ERROR), a;
  const l = await o.delete(new URL(n));
  return s.update(i, e.end, nt.INFORMATION), l;
}
async function rR(n, e = {}) {
  const { controller: t, services: r } = en, s = wn(t), i = "Board Actions", a = t.editor.graph.url, o = Lj(n, e.baseUrl ?? null);
  if (!o || !sa(o))
    return s.log(yn(`Invalid URL: ${n}`), i), { success: !1, reason: "invalid-url" };
  const l = await qj(o, a, {
    loader: r.loader,
    signinAdapter: r.signinAdapter,
    boardServer: r.googleDriveBoardServer
  });
  if (!l.success)
    return s.log(
      yn(`Failed to load: ${l.reason}`),
      i
    ), { success: !1, reason: l.reason };
  const { graph: c, boardServer: d } = l, p = await Jj(c, {
    moduleId: e.moduleId,
    subGraphId: e.subGraphId,
    googleDriveClient: r.googleDriveClient
  });
  if (t.editor.graph.url !== a)
    return s.log(
      Hi("URL changed during load, aborting"),
      i
    ), { success: !1, reason: "race-condition" };
  const h = (m) => m ? d.isMine(new URL(m)) : !1, f = await Kj(
    c.url,
    d,
    t.board.main,
    { isMine: h }
  ), u = f?.version ?? -1, y = f?.lastLoadedVersion ?? -1;
  await t.board.main.isHydrated;
  const v = t.board.main.getEditHistory(o);
  let x;
  if (e.resultsFileId && r.googleDriveClient) {
    const m = await Zj(
      e.resultsFileId,
      r.googleDriveClient
    );
    m.success && (x = m.finalOutputValues);
  }
  return Xj(r.graphStore, t.editor.graph, {
    graph: p.graph,
    moduleId: p.moduleId,
    subGraphId: p.subGraphId,
    url: o,
    readOnly: !h(o),
    version: u,
    lastLoadedVersion: y,
    creator: e.creator,
    history: v,
    onHistoryChanged: (m) => t.board.main.saveEditHistory(o, m),
    finalOutputValues: x
  }), t.run.main.resetOutput(), f?.isNewer && (t.board.main.newerVersionAvailable = !0), t.global.main.loadState = "Loaded", s.log(
    Hi(`Loaded board: ${o}`),
    i
  ), { success: !0 };
}
function sR() {
  const { controller: n } = en;
  n.editor.graph.resetAll(), n.global.main.loadState = "Home";
}
const iR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: en,
  close: sR,
  deleteBoard: nR,
  load: rR,
  remix: tR,
  save: eR,
  saveAs: Av
}, Symbol.toStringTag, { value: "Module" }));
async function aR(n, e, t, r) {
  const s = new AbortController();
  let i;
  const a = new Promise((u) => {
    i = (y) => {
      s.abort(), u([
        { status: "fulfilled", value: y },
        {
          status: "rejected",
          reason: "Theme generation aborted due to flowgen failure"
        }
      ]);
    };
  }), o = n.oneShot({
    intent: e,
    context: { flow: t }
  }).then((u) => ("error" in u && i?.(u), u)), c = (t?.nodes.length || 0) === 0 ? r.themes.generateThemeFromIntent(
    e,
    s.signal
  ) : Promise.resolve(k("Existing graph, skipping theme generation")), [d, p] = await Promise.race([
    Promise.allSettled([o, c]),
    a
  ]);
  if (d.status === "rejected")
    return { error: d.reason };
  const h = d.value;
  if ("error" in h)
    return h;
  let f;
  return p.status === "fulfilled" && w(p.value) && (f = p.value), { flow: h.flow, theme: f };
}
const jt = si();
async function Sa(n, e, t = !1) {
  const { controller: r } = jt, { editor: s } = r.editor.graph;
  if (!s)
    throw new Error("No active graph to edit");
  if (!(await s.edit(n, e, t)).success)
    throw new Error("Unable to edit graph");
}
async function Ia(n) {
  const { controller: e } = jt, { editor: t } = e.editor.graph;
  if (!t)
    throw new Error("No active graph to transform");
  const r = await t.apply(n);
  if (!r.success)
    throw new Error(r.error);
}
async function oR() {
  const { controller: n } = jt, e = n.editor.graph.editor?.history();
  if (!(!e || !e.canUndo()))
    return e.undo();
}
async function lR() {
  const { controller: n } = jt, e = n.editor.graph.editor?.history();
  if (!(!e || !e.canRedo()))
    return e.redo();
}
async function cR(n, e) {
  return Sa(
    [
      {
        type: "changegraphmetadata",
        title: n ?? void 0,
        description: e ?? void 0,
        graphId: ""
      }
    ],
    "Updating title and description"
  );
}
async function dR(n, e, t, r = null) {
  const s = r ?? "", i = new Wx(n, s, e, t);
  return Ia(i);
}
async function pR(n, e, t, r = null, s = null) {
  const i = new yh(
    n,
    e,
    t,
    r,
    s
  );
  await Ia(i);
  const { controller: a } = jt;
  a.editor.graph.lastNodeConfigChange = {
    nodeId: n,
    graphId: e,
    configuration: t,
    titleUserModified: i.titleUserModified
  };
}
function uR(n, e) {
  return Sa(
    [{ type: "addnode", graphId: e, node: n }],
    `Add step: ${n.metadata?.title ?? n.id}`
  );
}
function hR(n) {
  const { controller: e } = jt, { editor: t } = e.editor.graph;
  if (!t)
    throw new Error("No active graph to edit");
  const r = [];
  for (const s of n)
    if (s.type === "node") {
      const o = t.inspect(s.graphId).nodeById(s.id)?.metadata() ?? {}, l = o.visual ?? {}, c = {
        ...o,
        visual: { ...l, x: s.x, y: s.y }
      };
      r.push({
        type: "changemetadata",
        id: s.id,
        graphId: s.graphId,
        metadata: c
      });
    } else {
      const a = t.raw().assets?.[s.id];
      if (!a?.metadata)
        continue;
      const o = {
        ...a.metadata,
        visual: { x: s.x, y: s.y }
      };
      r.push({
        type: "changeassetmetadata",
        path: s.id,
        metadata: o
      });
    }
  return Sa(r, "Update selection position");
}
function fR(n, e, t = null) {
  const r = t ?? "", s = new Vx(n, r, e);
  return Ia(s);
}
function mR(n, e, t, r) {
  const s = new Yx(n, e, t, r);
  return Ia(s);
}
function Mv(n, e) {
  return Sa(
    [{ type: "replacegraph", replacement: n, creator: e }],
    "Replace graph"
  );
}
async function Ov(n) {
  const { replacement: e, theme: t, creator: r, googleDriveClient: s } = n, { controller: i } = jt;
  if (t) {
    const o = e.metadata ??= {};
    o.visual ??= {}, o.visual.presentation ??= {}, o.visual.presentation.themes ??= {};
    const l = globalThis.crypto.randomUUID();
    o.visual.presentation.themes[l] = t, o.visual.presentation.theme = l;
  } else s && (Gp.applyDefaultThemeInformationIfNonePresent(e), await Gp.createAppPaletteIfNeeded(e, s));
  const a = i.editor.graph.editor?.raw();
  if (a) {
    const o = a.metadata?.visual?.presentation, l = o?.theme, c = o?.themes, d = l && c && c[l] && c[l].splashScreen, p = e.metadata?.visual?.presentation, h = p?.theme, f = p?.themes, u = h && f && f[h] && f[h].splashScreen;
    d && !u && (console.log("[graph replacement] Persisting existing theme"), f[h] = c[l]);
  }
  return Mv(e, r);
}
const gR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addNode: uR,
  bind: jt,
  changeAssetEdge: fR,
  changeEdge: dR,
  changeEdgeAttachmentPoint: mR,
  changeNodeConfiguration: pR,
  moveSelectionPositions: hR,
  redo: lR,
  replace: Mv,
  replaceWithTheme: Ov,
  undo: oR,
  updateBoardTitleAndDescription: cR
}, Symbol.toStringTag, { value: "Module" })), dp = si();
async function yR(n, e) {
  const { controller: t, services: r } = dp, s = t.editor.graph.editor?.raw();
  if (!s)
    return { success: !1, error: "No active graph to edit" };
  const i = t.global.flowgenInput;
  try {
    const a = await aR(
      r.flowGenerator,
      n,
      s,
      e
    );
    if ("error" in a)
      return i.state = {
        status: "error",
        error: a.error,
        suggestedIntent: a.suggestedIntent
      }, {
        success: !1,
        error: a.error,
        suggestedIntent: a.suggestedIntent
      };
    const { flow: o, theme: l } = a;
    return await Ov({
      replacement: o,
      theme: l,
      creator: { role: "assistant" }
    }), i.clear(), { success: !0 };
  } catch (a) {
    return i.state = {
      status: "error",
      error: a
    }, { success: !1, error: a };
  }
}
const bR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: dp,
  generate: yR
}, Symbol.toStringTag, { value: "Module" })), pp = si();
function vR(n) {
  const { controller: e, services: t } = pp, r = wn(e), s = "Run Actions", {
    graph: i,
    url: a,
    settings: o,
    fetchWithCreds: l,
    flags: c,
    getProjectRunState: d,
    connectToProject: p
  } = n, h = t.graphStore.fileSystem.createRunFileSystem({
    graphUrl: a,
    env: tc(t.graphStore.fileSystem.env(), i),
    assets: nc(i)
  }), f = {
    url: a,
    runner: i,
    diagnostics: !0,
    kits: t.kits,
    loader: t.loader,
    graphStore: t.graphStore,
    fileSystem: h,
    // TODO: Remove this. Inputs from Settings is no longer a thing.
    inputs: Mx(o),
    fetchWithCreds: l,
    getProjectRunState: d,
    clientDeploymentConfiguration: lo,
    flags: c
  };
  r.log(
    Hi(`Created run config for ${a}`),
    s
  );
  const { runner: u, abortController: y } = t.runService.createRunner(f);
  u.addEventListener("start", () => {
    e.run.main.setStatus(et.RUNNING), r.log(
      wt(`Runner started for ${a}`),
      s,
      !1
    );
  }), u.addEventListener("resume", () => {
    e.run.main.setStatus(et.RUNNING), r.log(
      wt(`Runner resumed for ${a}`),
      s
    );
  }), u.addEventListener("pause", () => {
    e.run.main.setStatus(et.PAUSED), r.log(
      wt(`Runner paused for ${a}`),
      s
    );
  }), u.addEventListener("end", () => {
    e.run.main.setStatus(et.STOPPED), r.log(
      wt(`Runner ended for ${a}`),
      s
    );
  }), u.addEventListener("error", () => {
    e.run.main.setStatus(et.STOPPED), r.log(
      wt(`Runner error for ${a}`),
      s
    );
  }), u.addEventListener("input", (m) => {
    const { inputArguments: b } = m.data, g = b?.schema || {}, _ = m.data.node?.id ?? "";
    e.run.main.setInput({ id: _, schema: g });
  }), u.addEventListener("error", (m) => {
    const b = m.data?.error, g = typeof b == "string" ? b : b?.message ?? "Unknown error";
    e.run.main.setError({ message: g }), e.run.main.clearInput();
  }), u.addEventListener("end", () => {
    e.run.main.clearInput();
  }), u.addEventListener("graphstart", (m) => {
    if (m.data.path.length === 0) {
      e.run.main.resetOutput();
      const b = [];
      for (const _ of u.plan?.stages ?? [])
        for (const $ of _)
          b.push($.node.id);
      e.run.main.setEstimatedEntryCount(b.length);
      const g = t.graphStore.getByDescriptor(i);
      if (g?.success) {
        const _ = t.graphStore.inspect(g.result, "");
        for (const $ of b) {
          const j = _?.nodeById($), A = j?.title() ?? $, R = j?.currentDescribe()?.metadata ?? {}, K = cr(R.icon, j?.currentPorts()), V = Le.createConsoleEntry(A, "inactive", {
            icon: K,
            tags: R.tags
          });
          e.run.main.setConsoleEntry($, V), !R.tags && j && j.describe().then((L) => {
            const { icon: ne, tags: xe } = L.metadata || {}, $e = cr(ne, j.currentPorts()), qe = Le.createConsoleEntry(A, "inactive", {
              icon: $e,
              tags: xe
            });
            e.run.main.setConsoleEntry($, qe);
          });
        }
      }
    }
  }), u.addEventListener("nodestart", (m) => {
    if (m.data.path.length > 1) return;
    const b = m.data.node.id, g = t.graphStore.getByDescriptor(i);
    if (!g?.success) return;
    const $ = t.graphStore.inspect(g.result, "")?.nodeById(b), j = $?.title() ?? b, A = $?.currentDescribe()?.metadata ?? {}, R = Le.createConsoleEntry(j, "working", {
      icon: cr(A.icon, $?.currentPorts()),
      tags: A.tags
    });
    e.run.main.setConsoleEntry(b, R);
  }), u.addEventListener("nodeend", (m) => {
    if (m.data.path.length > 1) return;
    const b = m.data.node.id, g = e.run.main.console.get(b);
    g && e.run.main.setConsoleEntry(b, {
      ...g,
      status: { status: "succeeded" },
      completed: !0
    });
  }), e.run.main.setRunner(u, y), p && p(u, y.signal), e.run.main.setStatus(et.STOPPED);
  const v = [];
  for (const m of u.plan?.stages ?? [])
    for (const b of m)
      v.push(b.node.id);
  const x = t.graphStore.getByDescriptor(i);
  if (x?.success) {
    const m = t.graphStore.inspect(x.result, "");
    for (const b of v) {
      const g = m?.nodeById(b), _ = g?.title() ?? b, $ = g?.currentDescribe()?.metadata ?? {}, j = cr($.icon, g?.currentPorts()), A = Le.createConsoleEntry(_, "inactive", {
        icon: j,
        tags: $.tags
      });
      e.run.main.setConsoleEntry(b, A), !$.tags && g && g.describe().then((R) => {
        const { icon: K, tags: V } = R.metadata || {}, L = cr(K, g.currentPorts()), ne = Le.createConsoleEntry(_, "inactive", {
          icon: L,
          tags: V
        });
        e.run.main.setConsoleEntry(b, ne);
      });
    }
  }
}
const wR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: pp,
  prepare: vR
}, Symbol.toStringTag, { value: "Module" })), Me = si();
async function xR(n, e) {
  const { controller: t, services: r } = Me, s = t.editor.share, i = r.googleDriveClient, a = r.googleDriveBoardServer;
  if (s.state.status !== "opening")
    return;
  const o = n.url;
  if (!o) {
    console.error("No graph url");
    return;
  }
  const l = _R(o);
  if (!l) {
    console.error("No file id");
    return;
  }
  s.state = { status: "loading" }, await a.flushSaveQueue(o);
  const c = await i.getFileMetadata(
    l,
    {
      fields: ["resourceKey", "properties", "ownedByMe", "version"],
      // Sometimes we are working on the featured gallery items themselves. In
      // that case, and for all such calls in this file, we should never use
      // the gallery proxy, because otherwise we will get responses that are
      // (1) potentially stale because of caching, (2) missing data because
      // we're not using the owning user's credentials (e.g. permissions get
      // masked out and appear empty).
      bypassProxy: !0
    }
  );
  if (c.properties?.[lh] !== void 0) {
    s.state = {
      status: "readonly",
      shareableFile: {
        id: l,
        resourceKey: c.resourceKey
      }
    };
    return;
  }
  const p = c.properties?.[ch];
  if (!c.ownedByMe) {
    s.state = {
      status: "readonly",
      shareableFile: p ? {
        id: p,
        resourceKey: (await i.getFileMetadata(
          p,
          {
            fields: ["resourceKey"],
            bypassProxy: !0
          }
        )).resourceKey
      } : {
        id: l,
        resourceKey: c.resourceKey
      }
    };
    return;
  }
  if (!p) {
    s.state = {
      status: "writable",
      published: !1,
      granularlyShared: !1,
      shareableFile: void 0,
      latestVersion: c.version,
      userDomain: await r.signinAdapter.domain ?? ""
    };
    return;
  }
  const h = await i.getFileMetadata(p, {
    fields: ["resourceKey", "properties", "permissions"],
    bypassProxy: !0
  }), f = h.permissions ?? [], u = yl({
    actual: f,
    expected: e
  });
  s.state = {
    status: "writable",
    published: u.missing.length === 0,
    publishedPermissions: f.filter(
      (y) => _x(
        y,
        e
      )
    ),
    granularlyShared: (
      // We're granularly shared if there is any permission that is neither
      // one of the special publish permissions, nor the owner (since there
      // will always an owner).
      u.excess.find((y) => y.role !== "owner") !== void 0
    ),
    shareableFile: {
      id: p,
      resourceKey: h.resourceKey,
      stale: c.version !== h.properties?.[ml],
      permissions: h.permissions ?? [],
      shareSurface: h.properties?.[dh]
    },
    latestVersion: c.version,
    userDomain: await r.signinAdapter.domain ?? ""
  }, console.debug(
    `[Sharing] Found sharing state: ${JSON.stringify(s.state, null, 2)}`
  );
}
function _R(n) {
  if (!n.startsWith("drive:")) {
    console.error(
      `Expected "drive:" prefixed graph URL, got ${JSON.stringify(n)}`
    );
    return;
  }
  const e = n.replace(/^drive:\/*/, "");
  return e || console.error("Graph file ID was empty"), e;
}
async function jv(n, e) {
  const { services: t } = Me, r = t.googleDriveClient, s = t.googleDriveBoardServer;
  if (!n.url)
    throw new Error("Graph had no URL");
  const i = Ep(n.url);
  if (!i)
    throw new Error(
      `Graph URL did not contain a Google Drive file id: ${n.url}`
    );
  const a = `${i}-shared.bgl.json`, o = structuredClone(n);
  delete o.url;
  const l = await s.create(
    // Oddly, the title of the file is extracted from a URL that is passed in,
    // even though URLs of this form are otherwise totally invalid.
    //
    // TODO(aomarks) This doesn't seem to actually work. The title is in fact
    // taken from the descriptor. So what is the purpose of passing a URL
    // here?
    new URL(`drive:/${a}`),
    o
  ), c = Ep(
    l.url ?? ""
  );
  if (!c)
    throw console.error("Unexpected create result", l), new Error("Error creating shareable file");
  const d = await r.updateFileMetadata(
    i,
    {
      properties: {
        [ch]: c
      }
    },
    { fields: ["version"] }
  );
  await s.flushSaveQueue(`drive:/${c}`);
  const p = await r.updateFileMetadata(
    c,
    {
      properties: {
        [lh]: i,
        [ml]: d.version,
        [px]: "true",
        ...e ? { [dh]: e } : {}
      }
    },
    { fields: ["resourceKey"] }
  );
  return console.debug(
    `[Sharing] Made a new shareable graph copy "${c}" at version "${d.version}".`
  ), {
    shareableCopyFileId: c,
    shareableCopyResourceKey: p.resourceKey,
    newMainVersion: d.version
  };
}
async function $a(n, e) {
  const { services: t } = Me, r = t.googleDriveClient, s = kx(e);
  if (s.length === 0)
    return;
  const i = [], a = [];
  for (const l of s)
    l.managed ? i.push(l) : a.push(l);
  const o = (await r.getFileMetadata(n, {
    fields: ["permissions"],
    bypassProxy: !0
  })).permissions ?? [];
  await Promise.all([
    kR(i, o),
    SR(
      a,
      o
    )
  ]);
}
async function kR(n, e) {
  if (n.length === 0)
    return;
  const { services: t } = Me, r = t.googleDriveClient;
  await Promise.all(
    n.map(async (s) => {
      const { capabilities: i, permissions: a } = await r.getFileMetadata(s.fileId, {
        fields: ["capabilities", "permissions"],
        bypassProxy: !0
      });
      if (!i.canShare || !a) {
        console.error(
          `[Sharing] Could not add permission to asset "${s.fileId.id}" because the current user does not have sharing capability on it. Users who don't already have access to this asset may not be able to run this graph.`
        );
        return;
      }
      const { missing: o, excess: l } = yl({
        actual: a,
        expected: e
      });
      o.length === 0 && l.length === 0 || (console.log(
        `[Sharing Panel] Managed asset ${s.fileId.id} has ${o.length} missing permission(s) and ${l.length} excess permission(s). Synchronizing.`,
        {
          actual: a,
          needed: e,
          missing: o,
          excess: l
        }
      ), await Promise.all([
        ...o.map(
          (c) => r.createPermission(
            s.fileId.id,
            { ...c, role: "reader" },
            { sendNotificationEmail: !1 }
          )
        ),
        ...l.map(
          (c) => r.deletePermission(s.fileId.id, c.id)
        )
      ]));
    })
  );
}
async function SR(n, e) {
  if (n.length === 0)
    return;
  const { controller: t, services: r } = Me, s = t.editor.share, i = r.googleDriveClient, a = [];
  if (await Promise.all(
    n.map(async (c) => {
      const d = await i.getFileMetadata(
        c.fileId,
        {
          fields: [
            "id",
            "resourceKey",
            "name",
            "iconLink",
            "capabilities",
            "permissions"
          ],
          bypassProxy: !0
        }
      );
      if (!d.capabilities.canShare || !d.permissions) {
        a.push({ asset: d, problem: "cant-share" });
        return;
      }
      const { missing: p } = yl({
        actual: d.permissions,
        expected: e
      });
      if (p.length > 0) {
        a.push({ asset: d, problem: "missing", missing: p });
        return;
      }
    })
  ), a.length === 0)
    return;
  let o;
  {
    let c;
    o = { promise: new Promise((p) => c = p), resolve: c };
  }
  const l = s.state;
  s.state = {
    status: "unmanaged-assets",
    problems: a,
    oldState: l,
    closed: o
  }, await o.promise, s.state = l;
}
async function IR(n, e, t) {
  console.log("[Sharing Panel] Publishing");
  const { controller: r, services: s } = Me, i = r.editor.share, a = s.googleDriveClient;
  if (e.length === 0) {
    console.error("No publish permissions configured");
    return;
  }
  if (i.state.status !== "writable") {
    console.error('Expected published status to be "writable"');
    return;
  }
  if (i.state.published)
    return;
  let { shareableFile: o } = i.state;
  const l = i.state;
  i.state = {
    status: "updating",
    published: !0,
    granularlyShared: l.granularlyShared,
    shareableFile: o,
    userDomain: l.userDomain
  };
  let c;
  if (!o) {
    const p = await jv(n, t);
    o = {
      id: p.shareableCopyFileId,
      resourceKey: p.shareableCopyResourceKey,
      stale: !1,
      permissions: e,
      shareSurface: t
    }, c = p.newMainVersion;
  }
  const d = await Promise.all(
    e.map(
      (p) => a.createPermission(
        o.id,
        { ...p, role: "reader" },
        { sendNotificationEmail: !1 }
      )
    )
  );
  console.debug(
    `[Sharing] Added ${e.length} publish permission(s) to shareable graph copy "${o.id}".`
  ), await $a(o.id, n), i.state = {
    status: "writable",
    published: !0,
    publishedPermissions: d,
    granularlyShared: l.granularlyShared,
    shareableFile: o,
    latestVersion: c ?? l.latestVersion,
    userDomain: l.userDomain
  };
}
async function $R(n) {
  const { controller: e, services: t } = Me, r = e.editor.share, s = t.googleDriveClient;
  if (r.state.status !== "writable") {
    console.error('Expected published status to be "writable"');
    return;
  }
  if (!r.state.published)
    return;
  const { shareableFile: i } = r.state, a = r.state;
  r.state = {
    status: "updating",
    published: !1,
    granularlyShared: a.granularlyShared,
    shareableFile: i,
    userDomain: r.state.userDomain
  }, console.debug(
    `[Sharing] Removing ${a.publishedPermissions.length} publish permission(s) from shareable graph copy "${i.id}".`
  ), await Promise.all(
    a.publishedPermissions.map(async (o) => {
      o.role !== "owner" && await s.deletePermission(
        i.id,
        o.id
      );
    })
  ), await $a(i.id, n), r.state = {
    status: "writable",
    published: !1,
    granularlyShared: a.granularlyShared,
    shareableFile: i,
    latestVersion: a.latestVersion,
    userDomain: a.userDomain
  };
}
async function CR(n) {
  const { controller: e, services: t } = Me, r = e.editor.share, s = t.googleDriveClient, i = t.googleDriveBoardServer, a = r.state;
  if (a.status !== "writable" || !a.shareableFile)
    return;
  r.state = {
    status: "updating",
    published: a.published,
    granularlyShared: a.granularlyShared,
    shareableFile: a.shareableFile,
    userDomain: a.userDomain
  };
  const o = new URL(`drive:/${a.shareableFile.id}`), l = structuredClone(n);
  delete l.url, await Promise.all([
    // Update the contents of the shareable copy.
    i.ops.writeGraphToDrive(
      o,
      l
    ),
    // Update the latest version property on the main file.
    s.updateFileMetadata(a.shareableFile.id, {
      properties: {
        [ml]: a.latestVersion
      }
    }),
    // Ensure all assets have the same permissions as the shareable file,
    // since they might have been added since the last publish.
    $a(a.shareableFile.id, n)
  ]), r.state = {
    ...a,
    shareableFile: {
      ...a.shareableFile,
      stale: !1
    }
  }, console.debug(
    `[Sharing] Updated stale shareable graph copy "${a.shareableFile.id}" to version "${a.latestVersion}".`
  );
}
async function TR() {
  const { controller: n, services: e } = Me, t = n.editor.share, r = e.googleDriveClient, s = t.state;
  s.status === "unmanaged-assets" && (t.state = { status: "loading" }, await Promise.all(
    s.problems.map(async (i) => {
      i.problem === "missing" && await Promise.all(
        i.missing.map(
          (a) => r.createPermission(i.asset.id, a, {
            sendNotificationEmail: !1
          })
        )
      );
    })
  ), s.closed.resolve());
}
function Rv() {
  const { controller: n } = Me, e = n.editor.share;
  e.state.status === "closed" && (e.state = { status: "opening" });
}
function ER() {
  const { controller: n } = Me, e = n.editor.share, t = e.state, { status: r } = t;
  r === "closed" || r === "opening" || r === "loading" || r === "readonly" || r === "writable" ? e.state = { status: "closed" } : r === "updating" || r === "granular" || r === "unmanaged-assets" ? console.warn(`[Sharing] Cannot close panel while in "${r}" state`) : console.error("[Sharing] Unhandled state:", t);
}
async function PR(n, e) {
  const { controller: t } = Me, r = t.editor.share, s = r.state;
  if (s.status !== "writable")
    return;
  if (!n.url) {
    console.error("No graph url");
    return;
  }
  r.state = { status: "loading" };
  const i = s.shareableFile?.id ?? (await jv(n, e)).shareableCopyFileId;
  r.state = {
    status: "granular",
    shareableFile: { id: i }
  };
}
async function AR(n) {
  const { controller: e } = Me, t = e.editor.share;
  if (t.state.status !== "granular")
    return;
  const r = t.state.shareableFile.id;
  t.state = { status: "loading" }, await $a(r, n), t.state = { status: "opening" }, Rv();
}
const MR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: Me,
  closePanel: ER,
  fixUnmanagedAssetProblems: TR,
  onGoogleDriveSharePanelClose: AR,
  openPanel: Rv,
  publish: IR,
  publishStale: CR,
  readPublishedState: xR,
  unpublish: $R,
  viewSharePermissions: PR
}, Symbol.toStringTag, { value: "Module" }));
let to = null;
function OR(n, e) {
  return to || (en({ controller: n, services: e }), dp({ controller: n, services: e }), jt({ controller: n, services: e }), pp({ controller: n, services: e }), Me({ controller: n, services: e }), to = {
    board: iR,
    flowgen: bR,
    graph: gR,
    run: wR,
    share: MR
  }), to;
}
function tn() {
  let n;
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), r = (s) => {
    n = s;
  };
  return new Proxy(r, {
    get(s, i, a) {
      if (i === "register")
        return (o, l) => {
          e.set(o, oh(l));
        };
      if (i === "registerEventBridge")
        return (o, l, c, d) => {
          t.set(o, { target: l, event: c, handler: d }), l.addEventListener(c, d);
        };
      if (i === "clean")
        return () => {
          for (const [, o] of e)
            o.call(null);
          e.clear();
          for (const [, o] of t)
            o.target.removeEventListener(o.event, o.handler);
          t.clear();
        };
      if (i === "list")
        return () => {
          const o = [...e.keys()].map((c) => `[effect] ${c}`), l = [...t.keys()].map(
            (c) => `[bridge] ${c}`
          );
          return [...o, ...l];
        };
      if (n && i in n)
        return Reflect.get(n, i, a);
      throw new Error("Not set");
    }
  });
}
const Yn = tn();
function Dv() {
  Yn.register("Graph Invalidate Trigger", () => {
    const { controller: n, services: e } = Yn, { version: t, readOnly: r } = n.editor.graph;
    r || t === -1 || e.agentContext.invalidateResumableRuns();
  });
}
function Uv() {
  let n = null;
  Yn.register("Graph URL Change Trigger", () => {
    const { controller: e, services: t } = Yn, { url: r } = e.editor.graph;
    r !== n && (n !== null && t.agentContext.clearAllRuns(), n = r);
  });
}
const jR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: Yn,
  registerGraphInvalidateTrigger: Dv,
  registerGraphUrlChangeTrigger: Uv
}, Symbol.toStringTag, { value: "Module" })), Qt = tn();
function Nv() {
  Qt.register("Save Trigger", () => {
    const { controller: n, actions: e } = Qt, { version: t, readOnly: r, editor: s } = n.editor.graph;
    r || t === -1 || !s || e.board.save();
  });
}
function Gv() {
  Qt.register("Newer Version Trigger", () => {
    const { controller: n } = Qt, { newerVersionAvailable: e } = n.board.main;
    e && (n.global.snackbars.snackbar(
      "A newer version of this board is available",
      nt.INFORMATION,
      [],
      !0,
      // persistent
      globalThis.crypto.randomUUID(),
      !0
      // replaceAll
    ), n.board.main.newerVersionAvailable = !1);
  });
}
function Fv() {
  const { controller: n, services: e } = Qt, t = (r) => {
    const { url: s, status: i } = r, a = n.editor.graph.url;
    if (!(!a || a !== s))
      switch (i) {
        case "saving":
          n.editor.graph.saveStatus = "saving";
          break;
        case "idle":
          n.editor.graph.saveStatus = "saved";
          break;
        case "debouncing":
        case "queued":
          n.editor.graph.saveStatus = "unsaved";
          break;
        default:
          n.editor.graph.saveStatus = "saved";
          break;
      }
  };
  Qt.registerEventBridge(
    "Save Status Bridge",
    e.googleDriveBoardServer,
    "savestatuschange",
    t
  );
}
const RR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: Qt,
  registerNewerVersionTrigger: Gv,
  registerSaveStatusListener: Fv,
  registerSaveTrigger: Nv
}, Symbol.toStringTag, { value: "Module" })), ia = tn();
function DR(n) {
  return [{ parts: [{ json: n }] }];
}
function zv() {
  const n = "Trigger: Autoname";
  ia.register("Autoname Trigger", async () => {
    const { controller: e, services: t } = ia, { lastNodeConfigChange: r, editor: s, readOnly: i } = e.editor.graph, a = wn(e);
    if (!r || i || !s)
      return;
    const { nodeId: o, graphId: l, configuration: c, titleUserModified: d } = r, { autonamer: p } = t;
    if (!(await e.global.flags.flags()).outputTemplates && d)
      return;
    const u = s.inspect(l).nodeById(o);
    if (!u) {
      a.log(
        yn(`Unable to find node "${o}"`),
        n
      );
      return;
    }
    const y = u.descriptor.type, v = new AbortController();
    let x = !1;
    s.addEventListener(
      "graphchange",
      () => {
        x = !0, v.abort();
      },
      { once: !0 }
    );
    const m = await p.autoname(
      DR({
        nodeConfigurationUpdate: { configuration: c, type: y }
      }),
      v.signal
    );
    if (x) {
      a.log(
        wt(
          "Results discarded due to graph change"
        ),
        n
      );
      return;
    }
    if (!w(m)) {
      a.log(
        Sx("Autoname error:", m.$error),
        n
      );
      return;
    }
    const b = Tx(m);
    if (!b) {
      a.log(yn("Result not found"), n);
      return;
    }
    if (a.log(
      wt("Autoname result:", b),
      n
    ), "notEnoughContext" in b) {
      a.log(
        wt(
          "Not enough context to autoname",
          o
        ),
        n
      );
      return;
    }
    b.description.endsWith(".") && (b.description = b.description.slice(0, -1));
    const g = pl({
      title: d ? void 0 : b.title,
      userModified: !0,
      expected_output: b.expected_output
    }), _ = await s.apply(
      new yh(o, l, null, g, null)
    );
    _.success || a.log(
      yn(
        "Failed to apply autoname",
        _.error
      ),
      n
    );
  });
}
const UR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: ia,
  registerAutonameTrigger: zv
}, Symbol.toStringTag, { value: "Module" })), Jn = tn();
function Lv() {
  const n = () => {
    const { controller: e } = Jn;
    e.router.updateFromCurrentUrl();
  };
  Jn.registerEventBridge("Router URL Change", window, "popstate", n);
}
function Wv() {
  const { controller: n } = Jn;
  n.router.init(), Jn.register("Router Init Trigger", () => {
  });
}
const NR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: Jn,
  registerInitTrigger: Wv,
  registerPopstateTrigger: Lv
}, Symbol.toStringTag, { value: "Module" })), aa = tn();
function Bv() {
  aa.register("Graph Synchronization Trigger", () => {
    const { controller: n } = aa, e = n.editor.graph, t = n.run.main;
    if (e.version, t.hasRunner) {
      const r = e.editor?.raw()?.nodes?.length ?? 0;
      t.setEstimatedEntryCount(r);
    }
  });
}
const GR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: aa,
  registerGraphSyncTrigger: Bv
}, Symbol.toStringTag, { value: "Module" })), as = tn();
function qv() {
  if (typeof window > "u" || typeof window.matchMedia != "function")
    return;
  const { controller: n } = as, e = window.matchMedia(`(max-width: ${oO}px)`), t = window.matchMedia(`(max-width: ${lO}px)`), r = () => {
    e.matches ? n.global.screenSize.size = "narrow" : t.matches ? n.global.screenSize.size = "medium" : n.global.screenSize.size = "wide";
  };
  r(), as.registerEventBridge("Screen Size Narrow Query", e, "change", r), as.registerEventBridge("Screen Size Medium Query", t, "change", r);
}
const FR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: as,
  registerMediaQueryTrigger: qv
}, Symbol.toStringTag, { value: "Module" })), Lu = ph("Global"), oa = tn();
function Hv() {
  oa.register("Page Title Trigger", () => {
    const { controller: n } = oa, e = n.editor.graph.title, t = Lu.from("APP_NAME"), r = Lu.from("SUB_APP_NAME"), s = `${t} [${r}]`;
    e ? window.document.title = `${e.trim()} - ${s}` : window.document.title = s;
  });
}
const zR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: oa,
  registerPageTitleTrigger: Hv
}, Symbol.toStringTag, { value: "Module" })), la = tn();
function Vv() {
  la.register("Step Auto Save Trigger", async () => {
    const { controller: n, actions: e } = la;
    n.editor.selection.selectionId, n.editor.sidebar.section;
    const t = Zt.subtle.untrack(
      () => n.editor.step.pendingEdit
    ), r = Zt.subtle.untrack(
      () => n.editor.step.pendingAssetEdit
    ), s = n.editor.graph.version;
    if (t && (n.editor.step.clearPendingEdit(), t.graphVersion === s ? await e.graph.changeNodeConfiguration(
      t.nodeId,
      t.graphId,
      t.values
    ) : n.global.toasts.toast(
      "Your edits were discarded because the steps changed",
      $p.WARNING
    )), r)
      if (n.editor.step.clearPendingAssetEdit(), r.graphVersion === s) {
        let i;
        r.dataPart && (i = [{ role: "user", parts: [r.dataPart] }]), await r.update(r.title, i);
      } else
        n.global.toasts.toast(
          "Your edits were discarded because the graph changed",
          $p.WARNING
        );
  });
}
const LR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bind: la,
  registerStepAutoSaveTrigger: Vv
}, Symbol.toStringTag, { value: "Module" }));
let no = null;
function WR(n, e, t) {
  return no || (Yn({ controller: n, services: e, actions: t }), Qt({ controller: n, services: e, actions: t }), ia({ controller: n, services: e, actions: t }), Jn({ controller: n, services: e, actions: t }), aa({ controller: n, services: e, actions: t }), as({ controller: n, services: e, actions: t }), oa({ controller: n, services: e, actions: t }), la({ controller: n, services: e, actions: t }), BR(), no = {
    agent: jR,
    board: RR,
    node: UR,
    router: NR,
    run: GR,
    screenSize: FR,
    shell: zR,
    step: LR
  }), no;
}
function BR() {
  Dv(), Uv(), Nv(), Gv(), Fv(), zv(), Lv(), Wv(), Bv(), qv(), Hv(), Vv();
}
let Ei;
function lD(n, e) {
  if (!Ei) {
    const t = Pv(e), r = xM(
      n,
      t.global.flags,
      () => t.global.consent
    ), s = OR(t, r);
    Ei = {
      services: r,
      controller: t,
      actions: s
    }, t.isHydrated.then(() => {
      WR(t, r, s), r.statusUpdates.start(t.global.statusUpdates);
    }), mh(Ei.controller);
  }
  return Ei;
}
export {
  Vx as C,
  x_ as G,
  QR as M,
  sD as a,
  tD as b,
  rD as c,
  nD as d,
  Gp as e,
  aR as f,
  Vn as g,
  eD as i,
  lD as s
};
