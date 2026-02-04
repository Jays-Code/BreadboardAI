function p(e) {
  return typeof e == "object" && e !== null && e.type === "app-sandbox-ready";
}
function o(e) {
  return typeof e == "object" && e !== null && e.type === "app-sandbox-srcdoc";
}
function n(e) {
  return typeof e == "object" && e !== null && e.type === "app-sandbox-request-open-popup";
}
export {
  n as a,
  p as b,
  o as i
};
