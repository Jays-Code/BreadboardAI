import "./modulepreload-polyfill-DvzacyrX.js";
import { C as l } from "./oauth-bA5gMzvn.js";
import { c as u, S as B } from "./opal-shell-guest-CavlCYO8.js";
import { p as N, g, w, i as U, O as b, m as G, a as c } from "./logger-BR29-LuY.js";
const f = "1.30.0", C = {
  version: f
};
var y = { ActivityLog: { COMMAND_CONTINUE: { str: "Continue" }, COMMAND_RE_RUN: { str: "Re-run" }, COMMAND_STEP_TO_NEXT: { str: "Step to next" }, COMMAND_CLEAR: { str: "Clear" }, COMMAND_DOWNLOAD: { str: "Download" }, COMMAND_CREATE_EXPORT: { str: "Create export" }, COMMAND_START: { str: "Start" }, STATUS_GENERATING_EXPORT: { str: "Generating export..." }, STATUS_RETRIEVING_VALUES: { str: "Retrieving values..." }, STATUS_AWAITING_USER: { str: "Waiting for user input" }, LABEL_WAITING_MESSAGE: { str: "Start the opal to see outputs" }, LABEL_DETAILS: { str: "Details" } }, AppPreview: { COMMAND_CONTINUE: { str: "Continue" }, STATUS_GENERATING_EXPORT: { str: "Generating export..." }, STATUS_RETRIEVING_VALUES: { str: "Retrieving values..." }, STATUS_LOADING_APP_PREVIEW: { str: "Loading App Preview..." }, LABEL_WAITING_MESSAGE: { str: "Tap Start to begin" }, LABEL_DETAILS: { str: "Details" }, LABEL_START: { str: "Start" }, LABEL_INITIAL_MESSAGE: { str: "Tap Start to begin" }, LABEL_FOOTER: { str: "Made with" }, LABEL_UNTITLED_APP: { str: "Untitled App" }, QUERY_RESTART: { str: "Would you like to restart?" } }, AssetOrganizer: { COMMAND_TOGGLE_EXPAND: { str: "Toggle Expand" }, COMMAND_TOGGLE_VIEWER: { str: "Viewer" }, COMMAND_ADD_ASSET: { str: "Add Asset" }, COMMAND_EDIT_ASSET: { str: "Edit Asset Content" }, COMMAND_CANCEL: { str: "Cancel" }, COMMAND_SAVE_ASSET: { str: "Save Asset Content" }, COMMAND_EDIT_PARAMETER: { str: "Edit Parameter" }, COMMAND_SAVE_PARAMETER: { str: "Save Parameter" }, LABEL_WAITING_MESSAGE: { str: "No value selected" }, LABEL_TITLE: { str: "Assets" }, LABEL_NO_ASSETS: { str: "There are no assets yet" }, LABEL_NO_PARAMETERS: { str: "There are no parameters yet" }, LABEL_ENTER_TITLE: { str: "Enter a title for this parameter" }, LABEL_ENTER_DESCRIPTION: { str: "Enter a description for this parameter" }, LABEL_ENTER_SAMPLE: { str: "Provide a sample value for this parameter" }, LABEL_ENTER_MODALITY: { str: "Specify parameter value type" }, LABEL_DELETE_ASSET: { str: "Delete asset" }, LABEL_DELETE_PARAM: { str: "Delete parameter" }, LABEL_DELETE_PARAM_UNAVAILABLE: { str: "Delete parameter (Unavailable as parameter is in use)" } }, AudioHandler: { COMMAND_HOLD_TO_RECORD: { str: "Hold to Record" } }, CommandPalette: { LABEL_NO_OPTIONS: { str: "No options available" } }, ComponentSelector: { STATUS_NO_ITEMS: { str: "No items" }, LABEL_TITLE: { str: "Steps" }, LABEL_BUTTON_COMPONENTS: { str: "Steps" }, LABEL_BUTTON_KITS: { str: "Library" }, LABEL_SEARCH: { str: "Search Steps" } }, Editor: { COMMAND_ADD_MISSING_ITEM: { str: "Add" }, COMMAND_SHOW_LIBRARY: { str: "Show Library" }, COMMAND_LIBRARY_GROUP_1: { str: "Show AI Steps" }, COMMAND_LIBRARY_GROUP_2: { str: "Show Control Steps" }, COMMAND_LIBRARY_GROUP_3: { str: "Show Tools" }, COMMAND_LIBRARY_MODULES: { str: "Show Custom Steps" }, COMMAND_ZOOM_TO_FIT: { str: "Fit to Screen" }, COMMAND_ZOOM_IN: { str: "Zoom In" }, COMMAND_ZOOM_OUT: { str: "Zoom Out" }, COMMAND_UNDO: { str: "Undo" }, COMMAND_REDO: { str: "Redo" }, COMMAND_RUN_ISOLATED: { str: "Run this Step" }, COMMAND_DESCRIBE_EDIT: { str: "Describe an edit" }, COMMAND_DESCRIBE_FRESH_FLOW: { str: "Describe what you want to build" }, COMMAND_DESCRIBE_FRESH_FLOW_ALT: { str: "An app or workflow that..." }, COMMAND_DESCRIBE_EDIT_FLOW: { str: "Edit these steps" }, COMMAND_DESCRIBE_EDIT_STEP: { str: "Suggest an edit to the prompt" }, COMMAND_ASSET_ORGANIZER: { str: "Show Assets" }, LABEL_COMPONENT_LIBRARY: { str: "Library" }, LABEL_SHOW_LIST: { str: "Show List" }, LABEL_NO_COMPONENTS: { str: "No Steps available" }, LABEL_ADD_ITEM: { str: "Add Step" }, LABEL_MISSING_ITEM: { str: "Missing details for this step" }, LABEL_NO_MISSING_ITEM_INFO: { str: "There is no additional information needed for this step." }, LABEL_UPDATING: { str: "Updating step definition." }, LABEL_ADD_ASSETS: { str: "Assets" } }, FocusEditor: { COMMAND_RUN_ISOLATED: { str: "Run this Step" }, LABEL_NO_OUTPUTS: { str: "Run the flow to see the outputs in this panel." } }, Global: { APP_NAME: "Opal", SUB_APP_NAME: "Experiment", PROVIDER_NAME: "Google", COMMAND_OPEN_PROJECT: { str: "Open Flow ..." }, COMMAND_SAVE_PROJECT: { str: "Save Flow" }, COMMAND_COPY_PROJECT_URL: { str: "Copy Flow URL" }, COMMAND_SAVE_PROJECT_AS: { str: "Save Flow as..." }, COMMAND_COPY_FULL_URL: { str: "Copy full URL" }, COMMAND_COPY_APP_PREVIEW_URL: { str: "Share App" }, COMMAND_EDIT_PROJECT_INFORMATION: { str: "Edit title and description..." }, COMMAND_COPY_PROJECT: { str: "Duplicate App" }, COMMAND_OPEN_MODULE: { str: "Open Module..." }, COMMAND_OPEN: { str: "Open" }, COMMAND_CREATE_MODULE: { str: "Create Module..." }, COMMAND_COPY_PROJECT_CONTENTS: { str: "Copy JSON" }, COMMAND_DELETE_PROJECT: { str: "Delete" }, COMMAND_SEND_FEEDBACK: { str: "Send feedback" }, COMMAND_DOCUMENTATION: { str: "Read Documentation" }, COMMAND_JOIN_CHAT: { str: "Discord" }, COMMAND_WATCH_DEMO_VIDEO: { str: "Watch Demo Video" }, COMMAND_STATUS_UPDATE: { str: "Status Update" }, COMMAND_EXPORT_PROJECT: { str: "Export JSON" }, COMMAND_EDIT_SETTINGS: { str: "Edit Settings" }, COMMAND_REMIX: { str: "Remix" }, COMMAND_ADDITIONAL_ITEMS: { str: "See additional items" }, COMMAND_LOG_OUT: { str: "Sign out" }, COMMAND_NEW_ITEM: { str: "Add a new item..." }, COMMAND_SHOW_VERSION_HISTORY: { str: "Show version history" }, COMMAND_MANAGE_MCP_SERVERS: { str: "Manage MCP Servers" }, COMMAND_GLOBAL_SETTINGS: { str: "Global Settings" }, COMMAND_CONFIRM: { str: "Confirm" }, LABEL_RUN: { str: "Start" }, LABEL_STOP: { str: "Stop" }, LABEL_RUN_PROJECT: { str: "Run this Flow" }, LABEL_UNDO: { str: "Undo" }, LABEL_REDO: { str: "Redo" }, LABEL_SAVE_STATUS_SAVED: { str: "Saved" }, LABEL_SAVE_STATUS_SAVING: { str: "Saving" }, LABEL_SAVE_STATUS_READ_ONLY: { str: "Read Only" }, LABEL_SAVE_ERROR: { str: "Error" }, LABEL_SAVE_UNSAVED: { str: "Unsaved" }, LABEL_MAIN_PROJECT: { str: "Main Flow..." }, LABEL_READONLY_PROJECT: { str: "This Opal app is not editable. Please Remix it to make changes." }, LABEL_DISCLAIMER: { str: "Opal can make mistakes, so double-check it" }, LABEL_EMPTY: { str: "Your app will appear here once it's built" }, LABEL_STATUS_UPDATE: { str: "Status Update" }, LABEL_SHARE: { str: "An Opal mini-app has been shared with you" }, LABEL_EMAIL_UPDATES: { str: "I’d like to receive emails for model updates, offers, useful tips and news about Opal" }, LABEL_EMAIL_RESEARCH: { str: "I’m interested in being invited to future research studies from Opal" }, LABEL_SETTINGS_GENERAL: { str: "General" }, LABEL_SETTINGS_INTEGRATIONS: { str: "Integrations" }, LABEL_SETTINGS_EXPERIMENTAL: { str: "Experimental Features" }, LABEL_FIRST_RUN: { str: "Click start to try this Opal" }, LABEL_FIRST_RUN_LITE: { str: "Click start to try this Gem" }, STATUS_REMIXING_PROJECT: { str: "Remixing..." }, STATUS_CREATING_PROJECT: { str: "Creating opal" }, STATUS_SAVING_PROJECT: { str: "Saving opal" }, STATUS_DELETING_PROJECT: { str: "Deleting Opal app" }, STATUS_GENERIC_WORKING: { str: "Working..." }, STATUS_GENERIC_LOADING: { str: "Loading..." }, STATUS_GENERIC_DONE: { str: "Done" }, STATUS_GENERIC_RUN_STOPPED: { str: "Opal stopped" }, STATUS_PROJECT_CREATED: { str: "Flow created" }, STATUS_PROJECT_SAVED: { str: "Opal saved" }, STATUS_PROJECT_CONFIGURATION_SAVED: { str: "Opal app and configuration saved" }, STATUS_PROJECT_DELETED: { str: "Opal app deleted" }, STATUS_SAVED_SETTINGS: { str: "Saved settings" }, STATUS_PROJECTS_REFRESHED: { str: "Opal apps refreshed" }, STATUS_PROJECT_CONTENTS_COPIED: { str: "Opal app contents copied to clipboard" }, STATUS_PROJECT_URL_COPIED: { str: "Opal app URL copied to clipboard" }, STATUS_FULL_URL_COPIED: { str: "Full URL copied to clipboard" }, STATUS_APP_PREVIEW_URL_COPIED: { str: "App Preview URL copied to clipboard" }, STATUS_LOGGED_OUT: { str: "Successfully signed out" }, STATUS_NEWER_VERSION: { str: "This app has been updated by the owner with new published changes" }, ERROR_UNABLE_TO_CREATE_PROJECT: { str: "Unable to create an Opal app" }, ERROR_UNABLE_TO_LOAD_PROJECT: { str: "Unable to load Opal app" }, ERROR_NO_PROJECT: { str: "Unable to edit; no Opal app found" }, ERROR_GENERIC: { str: "An error occurred" }, ERROR_RUN_LOAD_DATA_FAILED: { str: "Unable to load run data" }, ERROR_LOAD_FAILED: { str: "Unable to load data" }, ERROR_SAVE_SETTINGS: { str: "Unable to save settings" }, ERROR_UNABLE_TO_REFRESH_PROJECTS: { str: "Unable to refresh Opal apps" }, ERROR_UNABLE_TO_RETRIEVE_TYPE_INFO: { str: "Error retrieving type information; try adding it again" }, ERROR_INPUT_REQUIRED: { str: "Please type or upload your response" }, TITLE_CREATE_PROJECT: { str: "Create new Opal app" }, TITLE_UNTITLED_PROJECT: { str: "Untitled Opal app" }, QUERY_DELETE_PROJECT: { str: "Are you sure you want to delete this Flow? This cannot be undone" }, QUERY_SAVE_PROJECT: { str: "The current Flow isn't saved - would you like to save first?" }, TOS_TITLE: { str: "Terms of Service" }, TEXT_WARM_WELCOME_TITLE: { str: "Welcome to Opal" }, TEXT_WARM_WELCOME_INTRO: { str: "We’re excited to see what you build with Opal, a no code tool to help you create, edit, and share AI workflows and mini-apps." }, TEXT_WARM_WELCOME_PRIVACY: { str: "We respect your privacy, and we do not use your data to train Google’s AI models." }, TEXT_WARM_WELCOME_EMAIL_UPDATES: { str: "Let us know if you’d like to be involved with future research studies or hear about the latest and greatest from Opal!" }, LABEL_DISCLAIMER_LITE: { str: "This Gem is powered by Google Labs, not Gemini Apps. It can make mistakes, so double-check it. [Learn more](https://support.google.com/gemini?p=ai_apps)" } }, KitSelector: { LABEL_TITLE: { str: "Library" } }, ProjectListing: { COMMAND_NEW_PROJECT: { str: "Create New" }, COMMAND_DESCRIBE_FLOW: { str: "Describe your flow" }, COMMAND_ADD_NEW_PROJECT_SERVER: { str: "Add new Flow Server" }, COMMAND_REFRESH_PROJECT_SERVER: { str: "Refresh Flow Server" }, COMMAND_REMOVE_PROJECT_SERVER: { str: "Remove Flow Server" }, COMMAND_RENEW_ACCESS: { str: "Renew Access" }, COMMAND_PREVIOUS: { str: "Previous" }, COMMAND_NEXT: { str: "Next" }, COMMAND_REMIX: { str: "Remix" }, COMMAND_DUPLICATE: { str: "Duplicate" }, COMMAND_PIN: { str: "Pin" }, COMMAND_UNPIN: { str: "Unpin" }, COMMAND_DELETE: { str: "Delete" }, COMMAND_SHOW_MORE: { str: "Show more" }, COMMAND_SHOW_LESS: { str: "Show less" }, STATUS_LOADING: { str: "Loading..." }, LABEL_SORT_BY: { str: "Sort by" }, LABEL_TEAM_NAME: { str: "Opal Team" }, LABEL_WELCOME_MESSAGE_A: { str: "Opal apps" }, LABEL_WELCOME_MESSAGE_B: { str: "Build, edit and share mini-AI apps using natural language" }, LABEL_WELCOME_CTA: { str: "Describe what you want to build" }, LABEL_FEATURED_GUIDES: { str: "Guides and Tutorials" }, LABEL_PROJECT_SERVER_SETTINGS: { str: "Flow Server Settings" }, LABEL_NO_VERSION: { str: "(no version)" }, LABEL_NO_DESCRIPTION: { str: "(no description)" }, LABEL_NO_OWNER: { str: "(no owner)" }, LABEL_TABLE_HEADER_NAME: { str: "Name" }, LABEL_TABLE_HEADER_VERSION: { str: "Version" }, LABEL_TABLE_HEADER_DESCRIPTION: { str: "Description" }, LABEL_TABLE_HEADER_TAGS: { str: "Tags" }, LABEL_TABLE_HEADER_OWNER: { str: "Owner" }, LABEL_TABLE_DESCRIPTION_YOUR_PROJECTS: { str: "Your Opal apps" }, LABEL_TABLE_DESCRIPTION_OTHER_PEOPLES_PROJECTS: { str: "Other people's Flows" }, LABEL_NO_PROJECTS_FOUND: { str: "No Opal apps found" }, LABEL_ACCESS_EXPIRED_PROJECT_SERVER: { str: "Access has expired for this Flow Server" }, LABEL_APP_VERSION: { str: "Version" }, LABEL_SEARCH_BOARDS: { str: "Search opals" }, LABEL_SUGGEST_AN_EDIT: { str: "Suggest an edit" }, LABEL_GENERATING_FLOW: { str: "Generating your application ..." }, LABEL_GENERATING_FLOW_DETAIL: { str: "Your application will open automatically when ready" }, LABEL_SAMPLE_GALLERY_TITLE: { str: "Gallery" }, LABEL_SAMPLE_GALLERY_DESCRIPTION: { str: "Get inspired by exploring some sample flows and apps" }, LABEL_WELCOME_MESSAGE_LITE: { str: "Build mini-apps and workflows with Opal" }, LABEL_SAMPLE_GALLERY_TITLE_LITE: { str: "Opal apps made by Google" }, LABEL_TABLE_DESCRIPTION_YOUR_PROJECTS_LITE: { str: "My Opal apps" }, LABEL_NO_OPALS_LITE: { str: "The Opal apps you create will appear here" }, QUERY_CONFIRM_REMOVE_SERVER: { str: "Are you sure you want to remove this Flow Server?" }, ERROR_LOADING_PROJECTS: { str: "Error loading Opal app server" }, LABEL_NO_CREATE_COMPACT: { str: "To create a new Gem from Labs, go to Gemini on a desktop browser." } }, UIController: { COMMAND_BACK_TO_CONSOLE: { str: "Back to Console" }, COMMAND_CONTINUE: { str: "Continue" }, COMMAND_START: { str: "Test Flow" }, STATUS_COPIED_TO_CLIPBOARD: { str: "App URL copied to clipboard" }, LABEL_SECTION_NAV_CHAT: { str: "Chat" }, LABEL_SECTION_PREVIEW: { str: "Preview" }, LABEL_SECTION_CONSOLE: { str: "Console" }, LABEL_SECTION_NAV_CONSOLE: { str: "Console" }, LABEL_SECTION_NAV_PROJECT: { str: "Project" }, LABEL_SECTION_NAV_CAPABILITIES: { str: "Capabilities" }, LABEL_SECTION_NAV_COMPONENTS: { str: "Components" }, LABEL_PROJECT: { str: "Flow" }, LABEL_APP_LAYOUT: { str: "App Layout" }, LABEL_APP_LAYOUT_DESCRIPTION: { str: "Choose a layout to style your app" }, LABEL_APP_LAYOUT_1: { str: "Default" }, LABEL_APP_THEME: { str: "Theme" }, LABEL_APP_THEME_DESCRIPTION: { str: "Choose a theme for your app" }, LABEL_APP_THEME_1: { str: "Light" }, LABEL_TEST: { str: "Test Flow" }, LABEL_PUBLIC: { str: "Public" }, LABEL_SHARE: { str: "Share" }, LABEL_SHARE_DESCRIPTION: { str: "Share this URL with friends" }, LABEL_TOGGLE_EXPAND: { str: "Toggle expand" } }, WorkspaceOutline: { COMMAND_CREATE: { str: "Create" }, LABEL_SEARCH: { str: "Search" } } };
const d = g();
function M(s) {
  const A = document.head.querySelector("#scheme") ?? document.createElement("style");
  if (A.id = "scheme", s)
    A.textContent = `:root { --color-scheme: ${s}; }`;
  else {
    const o = window.matchMedia("(prefers-color-scheme: dark)"), a = (T) => {
      const O = T.matches ? "dark" : "light";
      A.textContent = `:root { --color-scheme: ${O}; }`;
    };
    a(o), o.addEventListener("change", () => {
      a(o);
    });
  }
  document.head.appendChild(A);
}
async function J(s) {
  const { shellHost: A, embedHandler: o, hostOrigin: a } = await u(), T = {
    environmentName: l.ENVIRONMENT_NAME,
    googleDrive: {
      publishPermissions: l.GOOGLE_DRIVE_PUBLISH_PERMISSIONS ?? []
    },
    buildInfo: {
      packageJsonVersion: C.version,
      gitCommitHash: "2026-02-04, 2:51 a.m.; b6a7162"
    },
    ...s.deploymentConfiguration,
    hostOrigin: a
  }, { SettingsStore: O } = await import("./logger-BR29-LuY.js").then((e) => e.W), I = await O.restoredInstance(), i = new B(A), p = await import("./helper-EFXUwdnr.js");
  await p.initFrom(y);
  const h = await A.getConfiguration(), S = N(window.location.href), { lite: R, page: _, colorScheme: P } = S;
  if (
    // Signed-out users can access public graphs.
    _ === "graph" || // The open page prompts to sign-in and then redirects.
    _ === "open" || // The Lite gallery has a signed-out mode.
    _ === "home" && R || // IMPORTANT: Keep this `await` as the last condition, so that we don't need
    // to block on it in all of the above cases which don't care about signin.
    await i.state === "signedin"
  ) {
    const e = document.createElement("link");
    e.rel = "icon", e.type = "image/svg+xml", e.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAEhCAMAAADoAY0XAAAASFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACrhKybAAAAGHRSTlMABQ4bJBYSKDVDRzEjPgkfLDoNBBctNj/+pWNbAAADtUlEQVR4Ae3a13rrLBCFYYhkBGMBdpRy/1f6914Wu0SRwN97vEvCw4KZQQ4AAAAAAAAAAAAAAAAAAAAAAAAA/sk/TdP8k+kSvMPf+LDEZH+R4hzcr+DDNdl/SNfJOfg12f/Ka2F5TMqrdw9sStaUHzdoJdoXuRb3kGqyL5Qq26chFrbPX3AS+Zt9tVtxDyNk+wb5yT2I1b7RyunccC9ueBd1OnNW+8W+0+JGVrJ9t1wofhqqG5O/mkBJpIsfSqJqH2ql+GmIheJHyxPFz4OUROVuO8mF4kdLdfDJDyWRLn6IWbVPsFL8DFoShWSfJE8UPw2L53TW8hPbZ6Cz+jmbwIW/2kHWAVovNlFNdqSV2rAhFraPlirbp9MO/5LsJPLU26sXm0i3Fmwiv9jp3DzbR8uB7dOwsH06aD0WO7X11J0pm0i2FmyiEq0LsZzx1YKqcbGOrJzODblQ/JzpXahah+pZni04iFZTWKHVFFboYh0LbnclW8dScXu7W9fisRc8l31J1rnk3Z5u1r2b21GxAQQ2kHZjAzV4NpA2u71kG0JyOwk2iMCQVVvoMrTsdrHZMDxzDu3F7WE2iYv+asN4dXuINoz7EWUi11gyiVraBnLgArFALBBnELfYnUJRe2PaccS8Y6JZ1YoNo7hdZDoNbaGZ1y4cQdqWmLhqkSpIqzaEye1l45JviCRMqyRM20hYQyRhWiVhw9eK3ilk7Or2Fcbuw8hYcntbmHRogc8TGxKzRG0hYVogYQ2ZhGkzD4ZaoZFviHyzoM008tpGwhoiozKtkjBtSyRMi4zKtAsJ07bEqEx7pZHXAo18Q6KR1xYSpgUS1pBImDYzKhsqY0/u02USpi0kTAvcYQ2JhGkLVaIWSFhDImHaKwnTAp/dDTJXdEeJTOu1iWm9tvHpeEPkxVmrJEzbeHFuiN0njIxVd6RCwhrufJeozQxbtcBzRkNmFKQtjIK0wLC1IZEwbSFhWiBh2pb4cFN7JWFa6PY5g4y5c4g8Z2gTw1ZtS9xh2it3mBa4wxoSfZg2kzDtmWl9Q+Q9TAs08g2RI1oLVNENkTZMK4krTKt8sdBwo0bUtmwnkb07pZLtFHJxJ1Uy66OVzPpoJbM+Wrnaod68E5gNVScQsxxcH+ZsB0iz60Z5PWB5vOtJWTLL03C5JvsU6S24ToXlLdmu3q9L8K5r/jlcpmn+U51+E35TfuP/+CvlV8/hN5fpV3X+08//wE9/pWudAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwLX04QmNTo0fQAAAABJRU5ErkJggg==", document.head.appendChild(e);
    {
      const t = document.createElement("link");
      t.rel = "stylesheet", t.href = "https://fonts.googleapis.com/css2?family=Google+Sans+Code&family=Google+Sans+Flex:opsz,wght,ROND@6..144,1..1000,0..100&family=Google+Sans:opsz,wght@17..18,400..700&display=block", document.head.appendChild(t);
    }
    const n = document.createElement("style");
    n.textContent = `/**
    * @license
    * Copyright 2025 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    */
    :root {
      --bb-logo: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAEhCAMAAADoAY0XAAAASFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACrhKybAAAAGHRSTlMABQ4bJBYSKDVDRzEjPgkfLDoNBBctNj/+pWNbAAADtUlEQVR4Ae3a13rrLBCFYYhkBGMBdpRy/1f6914Wu0SRwN97vEvCw4KZQQ4AAAAAAAAAAAAAAAAAAAAAAAAA/sk/TdP8k+kSvMPf+LDEZH+R4hzcr+DDNdl/SNfJOfg12f/Ka2F5TMqrdw9sStaUHzdoJdoXuRb3kGqyL5Qq26chFrbPX3AS+Zt9tVtxDyNk+wb5yT2I1b7RyunccC9ueBd1OnNW+8W+0+JGVrJ9t1wofhqqG5O/mkBJpIsfSqJqH2ql+GmIheJHyxPFz4OUROVuO8mF4kdLdfDJDyWRLn6IWbVPsFL8DFoShWSfJE8UPw2L53TW8hPbZ6Cz+jmbwIW/2kHWAVovNlFNdqSV2rAhFraPlirbp9MO/5LsJPLU26sXm0i3Fmwiv9jp3DzbR8uB7dOwsH06aD0WO7X11J0pm0i2FmyiEq0LsZzx1YKqcbGOrJzODblQ/JzpXahah+pZni04iFZTWKHVFFboYh0LbnclW8dScXu7W9fisRc8l31J1rnk3Z5u1r2b21GxAQQ2kHZjAzV4NpA2u71kG0JyOwk2iMCQVVvoMrTsdrHZMDxzDu3F7WE2iYv+asN4dXuINoz7EWUi11gyiVraBnLgArFALBBnELfYnUJRe2PaccS8Y6JZ1YoNo7hdZDoNbaGZ1y4cQdqWmLhqkSpIqzaEye1l45JviCRMqyRM20hYQyRhWiVhw9eK3ilk7Or2Fcbuw8hYcntbmHRogc8TGxKzRG0hYVogYQ2ZhGkzD4ZaoZFviHyzoM008tpGwhoiozKtkjBtSyRMi4zKtAsJ07bEqEx7pZHXAo18Q6KR1xYSpgUS1pBImDYzKhsqY0/u02USpi0kTAvcYQ2JhGkLVaIWSFhDImHaKwnTAp/dDTJXdEeJTOu1iWm9tvHpeEPkxVmrJEzbeHFuiN0njIxVd6RCwhrufJeozQxbtcBzRkNmFKQtjIK0wLC1IZEwbSFhWiBh2pb4cFN7JWFa6PY5g4y5c4g8Z2gTw1ZtS9xh2it3mBa4wxoSfZg2kzDtmWl9Q+Q9TAs08g2RI1oLVNENkTZMK4krTKt8sdBwo0bUtmwnkb07pZLtFHJxJ1Uy66OVzPpoJbM+Wrnaod68E5gNVScQsxxcH+ZsB0iz60Z5PWB5vOtJWTLL03C5JvsU6S24ToXlLdmu3q9L8K5r/jlcpmn+U51+E35TfuP/+CvlV8/hN5fpV3X+08//wE9/pWudAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwLX04QmNTo0fQAAAABJRU5ErkJggg==");
    }`, document.head.appendChild(n);
    const L = document.createElement("style");
    L.textContent = `/**
    * @license
    * Copyright 2025 Google LLC
    * SPDX-License-Identifier: Apache-2.0
    */
    :root {
      --bb-font-family: "Google Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
--bb-font-family-mono: "Google Sans Code", "Courier New", Courier, monospace;
--bb-font-family-flex: "Google Sans Flex", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }`, document.head.appendChild(L), window.oncontextmenu = (t) => t.preventDefault();
    const r = {
      settings: I,
      enableTos: !0,
      tosHtml: `<p>
  The <a href="https://policies.google.com/terms">Google Terms</a> and
  <a href="https://policies.google.com/terms/generative-ai/use-policy"
    >Use Policy</a
  >
  apply. The Privacy Notice describes how your data is handled. Your
  conversations and browsing data may be reviewed and used to improve Google AI.
</p>
`,
      env: s.env,
      embedHandler: o,
      globalConfig: T,
      guestConfiguration: h,
      shellHost: A,
      parsedUrl: S,
      hostOrigin: a
    };
    if (r.globalConfig.googleDrive.publishPermissions.length === 0 && d.log(
      w(
        "No googleDrive.publishPermissions were configured. Publishing with Google Drive will not be supported."
      ),
      "Bootstrap",
      !1
      /* checkDebuggableAppControllerStatus */
    ), M(P), o.addEventListener("theme_change", (t) => {
      t.type === "theme_change" && M(t.message.theme);
    }), _ === "open") {
      const { OpenMain: t } = await import("./index-open-B2ijvQoQ.js"), E = new t(r);
      document.body.appendChild(E);
    } else if (R)
      if (_ === "home" && !S.new) {
        const { LiteHome: t } = await import("./index-lite-home-Dcv2_AQ3.js"), E = new t(r);
        document.body.appendChild(E);
      } else {
        const { LiteMain: t } = await import("./index-lite-BYl-L6sR.js"), E = new t(r);
        document.body.appendChild(E);
      }
    else {
      const { Main: t } = await import("./index-51_HXVxs.js"), E = new t(r);
      document.body.appendChild(E);
    }
    const m = p.forSection("Global");
    d.log(
      U(
        `Visual Editor: Version ${C.version}; Commit 2026-02-04, 2:51 a.m.; b6a7162]`
      ),
      m.from("APP_NAME"),
      !1
    );
  } else {
    if (window.location.pathname !== "/" && window.location.pathname !== "/_app/" || new URLSearchParams(window.location.search).has("redirect-from-landing")) {
      const { PageNotFound: L } = await import("./404-BK2MUmVX.js"), r = new L();
      document.body.appendChild(r);
      return;
    }
    const e = {
      page: "landing",
      redirect: N(window.location.href),
      oauthRedirect: new URL(window.location.href).searchParams.get(b) ?? void 0,
      guestPrefixed: !0
    }, n = await i.validateScopes();
    await i.state === "signedin" && !n.ok && (console.log(
      "[signin] oauth scopes were missing or unavailable, forcing signin.",
      n.error
    ), await i.signOut(), e.missingScopes = !0), window.location.href = G(e);
    return;
  }
}
const V = l, F = new URL(
  "v1beta1/executeStep",
  c
).href, v = new URL(
  "v1beta1/executeAgentNodeStream",
  c
).href;
J({
  deploymentConfiguration: V,
  env: [
    {
      path: "/env/settings/backend",
      data: D({ endpoint_url: F })
    },
    {
      path: "/env/settings/opalAdkBackend",
      data: D({ endpoint_url: v })
    }
  ]
});
function D(s) {
  return [{ parts: [{ json: s }] }];
}
