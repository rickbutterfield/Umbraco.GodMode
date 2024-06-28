import { UMB_AUTH_CONTEXT as Q } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as D } from "@umbraco-cms/backoffice/element-api";
import { LitElement as I, html as f, ifDefined as X, css as N, property as O, customElement as x, repeat as Z, state as g } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify as l } from "@umbraco-cms/backoffice/resources";
class k {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const a = this._fns.indexOf(e);
    a !== -1 && (this._fns = [
      ...this._fns.slice(0, a),
      ...this._fns.slice(a + 1)
    ]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const s = {
  BASE: "",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new k(),
    response: new k()
  }
}, ee = "Umb.Repository.GodMode.Tree", te = "Umb.Store.GodMode.Tree", Pe = "Umb.Tree.GodMode";
var re = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, $ = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? ae(e, a) : e, i = t.length - 1, c; i >= 0; i--)
    (c = t[i]) && (o = (r ? c(e, a, o) : c(o)) || o);
  return r && o && re(e, a, o), o;
};
let E = class extends D(I) {
  constructor() {
    super();
  }
  render() {
    return f`
            <div class="header">
                <uui-icon name="icon-sience"></uui-icon>
                <h3>God Mode ${X(this.name)}</h3>
            </div>
        `;
  }
};
E.styles = [
  N`
            .header {
                display: flex;
                flex-direction: row;
                align-items: center;

                uui-icon {
                    width: 24px;
                    height: 24px;
                    margin-right: var(--uui-size-space-2);
                }
            }
        `
];
$([
  O({ type: String, attribute: !0 })
], E.prototype, "name", 2);
E = $([
  x("godmode-header")
], E);
class P extends Error {
  constructor(e, a, r) {
    super(r), this.name = "ApiError", this.url = a.url, this.status = a.status, this.statusText = a.statusText, this.body = a.body, this.request = e;
  }
}
class oe extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class se {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((a, r) => {
      this._resolve = a, this._reject = r;
      const o = (d) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(d));
      }, i = (d) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(d));
      }, c = (d) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(d);
      };
      return Object.defineProperty(c, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(c, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(c, "isCancelled", {
        get: () => this._isCancelled
      }), e(o, i, c);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, a) {
    return this.promise.then(e, a);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new oe("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const v = (t) => typeof t == "string", U = (t) => v(t) && t !== "", R = (t) => t instanceof Blob, B = (t) => t instanceof FormData, ne = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, ie = (t) => {
  const e = [], a = (o, i) => {
    e.push(`${encodeURIComponent(o)}=${encodeURIComponent(String(i))}`);
  }, r = (o, i) => {
    i != null && (Array.isArray(i) ? i.forEach((c) => r(o, c)) : typeof i == "object" ? Object.entries(i).forEach(([c, d]) => r(`${o}[${c}]`, d)) : a(o, i));
  };
  return Object.entries(t).forEach(([o, i]) => r(o, i)), e.length ? `?${e.join("&")}` : "";
}, ce = (t, e) => {
  const a = t.ENCODE_PATH || encodeURI, r = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (i, c) => {
    var d;
    return (d = e.path) != null && d.hasOwnProperty(c) ? a(String(e.path[c])) : i;
  }), o = t.BASE + r;
  return e.query ? o + ie(e.query) : o;
}, de = (t) => {
  if (t.formData) {
    const e = new FormData(), a = (r, o) => {
      v(o) || R(o) ? e.append(r, o) : e.append(r, JSON.stringify(o));
    };
    return Object.entries(t.formData).filter(([, r]) => r != null).forEach(([r, o]) => {
      Array.isArray(o) ? o.forEach((i) => a(r, i)) : a(r, o);
    }), e;
  }
}, A = async (t, e) => typeof e == "function" ? e(t) : e, ue = async (t, e) => {
  const [a, r, o, i] = await Promise.all([
    A(e, t.TOKEN),
    A(e, t.USERNAME),
    A(e, t.PASSWORD),
    A(e, t.HEADERS)
  ]), c = Object.entries({
    Accept: "application/json",
    ...i,
    ...e.headers
  }).filter(([, d]) => d != null).reduce((d, [T, m]) => ({
    ...d,
    [T]: String(m)
  }), {});
  if (U(a) && (c.Authorization = `Bearer ${a}`), U(r) && U(o)) {
    const d = ne(`${r}:${o}`);
    c.Authorization = `Basic ${d}`;
  }
  return e.body !== void 0 && (e.mediaType ? c["Content-Type"] = e.mediaType : R(e.body) ? c["Content-Type"] = e.body.type || "application/octet-stream" : v(e.body) ? c["Content-Type"] = "text/plain" : B(e.body) || (c["Content-Type"] = "application/json")), new Headers(c);
}, he = (t) => {
  var e, a;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (a = t.mediaType) != null && a.includes("+json") ? JSON.stringify(t.body) : v(t.body) || R(t.body) || B(t.body) ? t.body : JSON.stringify(t.body);
}, me = async (t, e, a, r, o, i, c) => {
  const d = new AbortController();
  let T = {
    headers: i,
    body: r ?? o,
    method: e.method,
    signal: d.signal
  };
  t.WITH_CREDENTIALS && (T.credentials = t.CREDENTIALS);
  for (const m of t.interceptors.request._fns)
    T = await m(T);
  return c(() => d.abort()), await fetch(a, T);
}, le = (t, e) => {
  if (e) {
    const a = t.headers.get(e);
    if (v(a))
      return a;
  }
}, pe = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const a = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (a.some((r) => e.includes(r)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, ge = (t, e) => {
  const r = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...t.errors
  }[e.status];
  if (r)
    throw new P(t, e, r);
  if (!e.ok) {
    const o = e.status ?? "unknown", i = e.statusText ?? "unknown", c = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new P(
      t,
      e,
      `Generic Error: status: ${o}; status text: ${i}; body: ${c}`
    );
  }
}, n = (t, e) => new se(async (a, r, o) => {
  try {
    const i = ce(t, e), c = de(e), d = he(e), T = await ue(t, e);
    if (!o.isCancelled) {
      let m = await me(t, e, i, d, c, T, o);
      for (const K of t.interceptors.response._fns)
        m = await K(m);
      const J = await pe(m), Y = le(m, e.responseHeader), V = {
        url: i,
        ok: m.ok,
        status: m.status,
        statusText: m.statusText,
        body: Y ?? J
      };
      ge(e, V), a(V.body);
    }
  } catch (i) {
    r(i);
  }
});
class p {
  /**
   * @param data The data for the request.
   * @param data.cache
   * @returns unknown OK
   * @throws ApiError
   */
  static postUmbracoManagementApiV1GodModeClearUmbracoCache(e = {}) {
    return n(s, {
      method: "POST",
      url: "/umbraco/management/api/v1/god-mode/ClearUmbracoCache",
      query: {
        cache: e.cache
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.id
   * @returns unknown OK
   * @throws ApiError
   */
  static postUmbracoManagementApiV1GodModeCopyDataType(e = {}) {
    return n(s, {
      method: "POST",
      url: "/umbraco/management/api/v1/god-mode/CopyDataType",
      query: {
        id: e.id
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.id
   * @returns unknown OK
   * @throws ApiError
   */
  static postUmbracoManagementApiV1GodModeDeleteTag(e = {}) {
    return n(s, {
      method: "POST",
      url: "/umbraco/management/api/v1/god-mode/DeleteTag",
      query: {
        id: e.id
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns number OK
   * @throws ApiError
   */
  static postUmbracoManagementApiV1GodModeFixTemplateMasters() {
    return n(s, {
      method: "POST",
      url: "/umbraco/management/api/v1/god-mode/FixTemplateMasters",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetApiControllers() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetApiControllers",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetAssemblies() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetAssemblies",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetAssembliesWithInterfaces() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetAssembliesWithInterfaces",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetComposers() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetComposers",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetCompositions() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetCompositions",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetConfig() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetConfig",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetContentFinders() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetContentFinders",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.page
   * @param data.pageSize
   * @param data.name
   * @param data.alias
   * @param data.creatorId
   * @param data.id
   * @param data.level
   * @param data.trashed
   * @param data.updaterId
   * @param data.languageId
   * @param data.orderBy
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetContentPaged(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetContentPaged",
      query: {
        page: e.page,
        pageSize: e.pageSize,
        name: e.name,
        alias: e.alias,
        creatorId: e.creatorId,
        id: e.id,
        level: e.level,
        trashed: e.trashed,
        updaterId: e.updaterId,
        languageId: e.languageId,
        orderBy: e.orderBy
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns string OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetContentTypeAliases() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetContentTypeAliases",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetContentTypeMap() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetContentTypeMap",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.id
   * @param data.orderBy
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetContentUsageData(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetContentUsageData",
      query: {
        id: e.id,
        orderBy: e.orderBy
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetDataTypes() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetDataTypes",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetDataTypesStatus() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetDataTypesStatus",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetEnvironmentDiagnostics() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetEnvironmentDiagnostics",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.assembly
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetInterfacesFrom(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetInterfacesFrom",
      query: {
        assembly: e.assembly
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetLanguages() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetLanguages",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.page
   * @param data.pageSize
   * @param data.name
   * @param data.id
   * @param data.mediaTypeId
   * @param data.orderBy
   * @param data.orderByDir
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetMedia(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetMedia",
      query: {
        page: e.page,
        pageSize: e.pageSize,
        name: e.name,
        id: e.id,
        mediaTypeId: e.mediaTypeId,
        orderBy: e.orderBy,
        orderByDir: e.orderByDir
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetMediaTypes() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetMediaTypes",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetMemberGroups() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetMemberGroups",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.page
   * @param data.pageSize
   * @param data.groupId
   * @param data.search
   * @param data.orderBy
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetMembersPaged(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetMembersPaged",
      query: {
        page: e.page,
        pageSize: e.pageSize,
        groupId: e.groupId,
        search: e.search,
        orderBy: e.orderBy
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetNonMsAssemblies() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetNonMsAssemblies",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.id
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetNuCacheItem(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetNuCacheItem",
      query: {
        id: e.id
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns string OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetNuCacheType() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetNuCacheType",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetOrphanedTags() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetOrphanedTags",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetPropertyEditors() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetPropertyEditors",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns string OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetPropertyGroups() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetPropertyGroups",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetPropertyValueConverters() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetPropertyValueConverters",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetPublishedContentModels() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetPublishedContentModels",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetRegisteredServices() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetRegisteredServices",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetRenderMvcControllers() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetRenderMvcControllers",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns string OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetStandardContentTypeAliases() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetStandardContentTypeAliases",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetSurfaceControllers() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetSurfaceControllers",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetTagHelpers() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetTagHelpers",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetTagMapping() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetTagMapping",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetTemplates() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetTemplates",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns string OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetTemplateUrlsToPing() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetTemplateUrlsToPing",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.baseType
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetTypesAssignableFrom(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetTypesAssignableFrom",
      query: {
        baseType: e.baseType
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.assembly
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetTypesFrom(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetTypesFrom",
      query: {
        assembly: e.assembly
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetUmbracoAssemblies() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetUmbracoAssemblies",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetUrlProviders() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetUrlProviders",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.culture
   * @returns string OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetUrlsToPing(e = {}) {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetUrlsToPing",
      query: {
        culture: e.culture
      },
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoManagementApiV1GodModeGetViewComponents() {
    return n(s, {
      method: "GET",
      url: "/umbraco/management/api/v1/god-mode/GetViewComponents",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static postUmbracoManagementApiV1GodModePurgeMediaCache() {
    return n(s, {
      method: "POST",
      url: "/umbraco/management/api/v1/god-mode/PurgeMediaCache",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static postUmbracoManagementApiV1GodModeRestartAppPool() {
    return n(s, {
      method: "POST",
      url: "/umbraco/management/api/v1/god-mode/RestartAppPool",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
}
var be = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, h = (t, e, a, r) => {
  for (var o = r > 1 ? void 0 : r ? Te(e, a) : e, i = t.length - 1, c; i >= 0; i--)
    (c = t[i]) && (o = (r ? c(e, a, o) : c(o)) || o);
  return r && o && be(e, a, o), o;
}, Ge = (t, e, a) => {
  if (!e.has(t))
    throw TypeError("Cannot " + a);
}, G = (t, e, a) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, a);
}, b = (t, e, a) => (Ge(t, e, "access private method"), a), C, j, w, H, S, F, _, L, q, W, y, M;
let u = class extends D(I) {
  constructor() {
    super(), G(this, C), G(this, w), G(this, S), G(this, _), G(this, q), G(this, y), this.data = void 0, this.filteredData = void 0, this.searchName = "", this.namespaces = [], this.selectedNamespace = "", this.inherits = [], this.selectedInherits = "", this.umbraco = [{ name: "Any", value: "", selected: !0 }, { name: "Yes", value: "yes" }, { name: "No", value: "no" }], this.selectedUmbraco = "";
  }
  async connectedCallback() {
    super.connectedCallback(), b(this, C, j).call(this);
  }
  render() {
    return f`
            <umb-body-layout>
                <godmode-header name=${this.name} slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Search names"
                                .value=${this.searchName}
                                @input=${b(this, w, H)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>In Namespace:</uui-label>
                            <uui-select
                                .options=${this.namespaces}
                                .value=${this.selectedNamespace}
                                @change=${b(this, S, F)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Inherits From:</uui-label>
                            <uui-select
                                .options=${this.inherits}
                                .value=${this.selectedInherits}
                                @change=${b(this, _, L)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Is Umbraco?</uui-label>
                            <uui-select
                                .options=${this.umbraco}
                                .value=${this.selectedUmbraco}
                                @change=${b(this, q, W)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                <uui-box>
                    <uui-table>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>

                        <uui-table-head>
                            <uui-table-head-cell>Name</uui-table-head-cell>
                            <uui-table-head-cell>Module</uui-table-head-cell>
                            <uui-table-head-cell>Base Type</uui-table-head-cell>
                            <uui-table-head-cell>Umbraco?</uui-table-head-cell>
                        </uui-table-head>

                        ${Z(
      this.filteredData,
      (t) => t.name,
      (t) => f`
                                    <uui-table-row>
                                        <uui-table-cell>
                                            <strong>${t.name}</strong>
                                        </uui-table-cell>
                                        <uui-table-cell>
                                            <code>${t.module}</code>
                                        </uui-table-cell>
                                        <uui-table-cell>
                                            ${t.baseType}
                                        </uui-table-cell>
                                        <uui-table-cell>
                                            <div class="inline-flex">
                                                ${t.isUmbraco ? f`<uui-icon name="icon-checkbox"></uui-icon> Yes` : f`<uui-icon name="icon-checkbox-empty"></uui-icon> No`}
                                            </div>
                                        </uui-table-cell>
                                    </uui-table-row>
                                `
    )}
                    </uui-table>
                </uui-box>
            </umb-body-layout>
        `;
  }
};
C = /* @__PURE__ */ new WeakSet();
j = async function() {
  if (this.type) {
    let t = {};
    if (this.type === "surface" && (this.name = "Surface Controller Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetSurfaceControllers())), this.type === "api" && (this.name = "API Controller Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetApiControllers())), this.type === "render" && (this.name = "RenderMvc Controller Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetRenderMvcControllers())), this.type === "models" && (this.name = "Published Content Model Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetPublishedContentModels())), this.type === "composers" && (this.name = "Composer Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetComposers())), this.type === "converters" && (this.name = "Property Value Converter Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetRenderMvcControllers())), this.type === "components" && (this.name = "View Component Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetViewComponents())), this.type === "taghelpers" && (this.name = "Tag Helpers Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetTagHelpers())), this.type === "finders" && (this.name = "Content Finders Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetContentFinders())), this.type === "urlproviders" && (this.name = "URL Providers Browser", t = await l(this, p.getUmbracoManagementApiV1GodModeGetUrlProviders())), t && t.data) {
      this.data = t.data, this.filteredData = structuredClone(this.data);
      let e = [...new Set(this.data.map((r) => r.namespace))];
      this.namespaces = e.map((r) => ({ name: r, value: r })), this.namespaces.unshift({ name: "Any", value: "", selected: !0 });
      let a = [...new Set(this.data.map((r) => r.baseType))];
      this.inherits = a.map((r) => ({ name: r, value: r })), this.inherits.unshift({ name: "Any", value: "", selected: !0 });
    }
  }
};
w = /* @__PURE__ */ new WeakSet();
H = function(t) {
  const e = t.target.value;
  this.searchName = e, b(this, y, M).call(this);
};
S = /* @__PURE__ */ new WeakSet();
F = function(t) {
  const e = t.target.value;
  this.selectedNamespace = e, b(this, y, M).call(this);
};
_ = /* @__PURE__ */ new WeakSet();
L = function(t) {
  const e = t.target.value;
  this.selectedInherits = e, b(this, y, M).call(this);
};
q = /* @__PURE__ */ new WeakSet();
W = function(t) {
  const e = t.target.value;
  this.selectedUmbraco = e, b(this, y, M).call(this);
};
y = /* @__PURE__ */ new WeakSet();
M = function() {
  var t, e, a, r;
  this.filteredData = structuredClone(this.data), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((o) => o.name.toLowerCase().includes(this.searchName))), this.selectedNamespace !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((o) => o.namespace === this.selectedNamespace)), this.selectedInherits !== "" && (this.filteredData = (a = this.filteredData) == null ? void 0 : a.filter((o) => o.baseType === this.selectedInherits)), this.selectedUmbraco !== "" && (this.filteredData = (r = this.filteredData) == null ? void 0 : r.filter((o) => o.isUmbraco === (this.selectedUmbraco === "Yes")));
};
u.styles = [
  N`
            .grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;

                div {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
            }

            uui-box {
	            margin-bottom: 20px;
            }

            .inline-flex {
                display: inline-flex;
                align-items: center;

                uui-icon {
                    margin-right: 6px;
                }
            }
        `
];
h([
  O({ type: String })
], u.prototype, "type", 2);
h([
  g()
], u.prototype, "name", 2);
h([
  g()
], u.prototype, "data", 2);
h([
  g()
], u.prototype, "filteredData", 2);
h([
  g()
], u.prototype, "searchName", 2);
h([
  g()
], u.prototype, "namespaces", 2);
h([
  g()
], u.prototype, "selectedNamespace", 2);
h([
  g()
], u.prototype, "inherits", 2);
h([
  g()
], u.prototype, "selectedInherits", 2);
h([
  g()
], u.prototype, "umbraco", 2);
h([
  g()
], u.prototype, "selectedUmbraco", 2);
u = h([
  x("godmode-reflection-browser")
], u);
const De = u, ye = {
  type: "workspace",
  alias: "Umb.Workspace.GodModeRoot",
  name: "GodMode Root Workspace",
  element: () => import("./godmode-root-workspace.element-Dm40v4qG.js"),
  meta: {
    entityType: "godmode-root"
  }
}, fe = [ye], z = {
  type: "workspace",
  kind: "routable",
  alias: "Umb.Workspace.GodMode",
  name: "God Mode Workspace",
  api: () => import("./godmode-workspace.context-DEMqNHHE.js"),
  meta: {
    entityType: "godmode"
  }
}, ve = {
  type: "workspaceView",
  alias: "Umb.WorkspaceView.GodMode.View",
  name: "God Mode Workspace View",
  element: () => import("./godmode-workspace-editor.element-BY9_Xlko.js"),
  weight: 90,
  meta: {
    label: "View",
    pathname: "browse",
    icon: "edit"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: z.alias
    }
  ]
}, Me = [
  z,
  ve
], Ae = [
  ...fe,
  ...Me
], Ee = [
  {
    type: "menuItem",
    kind: "tree",
    alias: "Umb.MenuItem.GodMode",
    name: "God Mode Menu Item",
    weight: 100,
    meta: {
      label: "God Mode",
      icon: "icon-sience",
      entityType: "godmode",
      treeAlias: "Umb.Tree.GodMode",
      menus: ["Umb.Menu.AdvancedSettings"]
    }
  }
], Ue = {
  type: "repository",
  alias: ee,
  name: "God Mode Tree Repository",
  api: () => import("./godmode-tree.repository-7q9HWY-I.js")
}, Ce = {
  type: "treeStore",
  alias: te,
  name: "God Mode Tree Store",
  api: () => import("./godmode-tree.store-CYDCLcEv.js")
}, we = {
  type: "tree",
  kind: "default",
  alias: "Umb.Tree.GodMode",
  name: "God Mode Tree",
  meta: {
    repositoryAlias: "Umb.Repository.GodMode.Tree"
  }
}, Se = {
  type: "treeItem",
  kind: "default",
  alias: "Umb.TreeItem.GodMode",
  name: "God Mode Tree Item",
  forEntityTypes: ["godmode-root", "godmode", "godmode-folder"]
}, _e = [
  Ue,
  Ce,
  we,
  Se
], Ie = (t, e) => {
  e.registerMany([
    ...Ae,
    ...Ee,
    ..._e
  ]), t.consumeContext(Q, async (a) => {
    if (!a)
      return;
    const r = a.getOpenApiConfiguration();
    s.BASE = r.base, s.TOKEN = r.token, s.WITH_CREDENTIALS = r.withCredentials, s.CREDENTIALS = r.credentials;
  });
};
export {
  p as G,
  De as a,
  Pe as b,
  ee as c,
  te as d,
  E as e,
  u as f,
  Ie as o
};
//# sourceMappingURL=index-DGc6ps4P.js.map
