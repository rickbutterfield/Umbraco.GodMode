import { UMB_AUTH_CONTEXT as oe } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as B } from "@umbraco-cms/backoffice/element-api";
import { LitElement as j, html as C, ifDefined as H, css as F, property as W, customElement as L, state as l } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify as g } from "@umbraco-cms/backoffice/resources";
class x {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const r = this._fns.indexOf(e);
    r !== -1 && (this._fns = [...this._fns.slice(0, r), ...this._fns.slice(r + 1)]);
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
    request: new x(),
    response: new x()
  }
}, se = "Umb.Repository.GodMode.Tree", ne = "Umb.Store.GodMode.Tree", je = "Umb.Tree.GodMode";
var ie = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, z = (t, e, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ce(e, r) : e, i = t.length - 1, c; i >= 0; i--)
    (c = t[i]) && (o = (a ? c(e, r, o) : c(o)) || o);
  return a && o && ie(e, r, o), o;
};
let U = class extends B(j) {
  constructor() {
    super();
  }
  render() {
    return C`
            <div class="header">
                <uui-icon name="icon-sience"></uui-icon>
                <h3>God Mode ${H(this.name)}</h3>
            </div>
        `;
  }
};
U.styles = [
  F`
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
z([
  W({ type: String, attribute: !0 })
], U.prototype, "name", 2);
U = z([
  L("godmode-header")
], U);
class $ extends Error {
  constructor(e, r, a) {
    super(a), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class de extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class ue {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, a) => {
      this._resolve = r, this._reject = a;
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
  then(e, r) {
    return this.promise.then(e, r);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new de("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const v = (t) => typeof t == "string", _ = (t) => v(t) && t !== "", k = (t) => t instanceof Blob, J = (t) => t instanceof FormData, me = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, he = (t) => {
  const e = [], r = (o, i) => {
    e.push(`${encodeURIComponent(o)}=${encodeURIComponent(String(i))}`);
  }, a = (o, i) => {
    i != null && (i instanceof Date ? r(o, i.toISOString()) : Array.isArray(i) ? i.forEach((c) => a(o, c)) : typeof i == "object" ? Object.entries(i).forEach(([c, d]) => a(`${o}[${c}]`, d)) : r(o, i));
  };
  return Object.entries(t).forEach(([o, i]) => a(o, i)), e.length ? `?${e.join("&")}` : "";
}, le = (t, e) => {
  const r = t.ENCODE_PATH || encodeURI, a = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (i, c) => {
    var d;
    return (d = e.path) != null && d.hasOwnProperty(c) ? r(String(e.path[c])) : i;
  }), o = t.BASE + a;
  return e.query ? o + he(e.query) : o;
}, pe = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (a, o) => {
      v(o) || k(o) ? e.append(a, o) : e.append(a, JSON.stringify(o));
    };
    return Object.entries(t.formData).filter(([, a]) => a != null).forEach(([a, o]) => {
      Array.isArray(o) ? o.forEach((i) => r(a, i)) : r(a, o);
    }), e;
  }
}, E = async (t, e) => typeof e == "function" ? e(t) : e, ge = async (t, e) => {
  const [r, a, o, i] = await Promise.all([
    // @ts-ignore
    E(e, t.TOKEN),
    // @ts-ignore
    E(e, t.USERNAME),
    // @ts-ignore
    E(e, t.PASSWORD),
    // @ts-ignore
    E(e, t.HEADERS)
  ]), c = Object.entries({
    Accept: "application/json",
    ...i,
    ...e.headers
  }).filter(([, d]) => d != null).reduce((d, [T, p]) => ({
    ...d,
    [T]: String(p)
  }), {});
  if (_(r) && (c.Authorization = `Bearer ${r}`), _(a) && _(o)) {
    const d = me(`${a}:${o}`);
    c.Authorization = `Basic ${d}`;
  }
  return e.body !== void 0 && (e.mediaType ? c["Content-Type"] = e.mediaType : k(e.body) ? c["Content-Type"] = e.body.type || "application/octet-stream" : v(e.body) ? c["Content-Type"] = "text/plain" : J(e.body) || (c["Content-Type"] = "application/json")), new Headers(c);
}, be = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : v(t.body) || k(t.body) || J(t.body) ? t.body : JSON.stringify(t.body);
}, Te = async (t, e, r, a, o, i, c) => {
  const d = new AbortController();
  let T = {
    headers: i,
    body: a ?? o,
    method: e.method,
    signal: d.signal
  };
  t.WITH_CREDENTIALS && (T.credentials = t.CREDENTIALS);
  for (const p of t.interceptors.request._fns)
    T = await p(T);
  return c(() => d.abort()), await fetch(r, T);
}, Ge = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (v(r))
      return r;
  }
}, fe = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const r = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (r.some((a) => e.includes(a)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, ye = (t, e) => {
  const a = {
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
  if (a)
    throw new $(t, e, a);
  if (!e.ok) {
    const o = e.status ?? "unknown", i = e.statusText ?? "unknown", c = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new $(
      t,
      e,
      `Generic Error: status: ${o}; status text: ${i}; body: ${c}`
    );
  }
}, n = (t, e) => new ue(async (r, a, o) => {
  try {
    const i = le(t, e), c = pe(e), d = be(e), T = await ge(t, e);
    if (!o.isCancelled) {
      let p = await Te(t, e, i, d, c, T, o);
      for (const ae of t.interceptors.response._fns)
        p = await ae(p);
      const N = await fe(p), re = Ge(p, e.responseHeader);
      let P = N;
      e.responseTransformer && p.ok && (P = await e.responseTransformer(N));
      const O = {
        url: i,
        ok: p.ok,
        status: p.status,
        statusText: p.statusText,
        body: re ?? P
      };
      ye(e, O), r(O.body);
    }
  } catch (i) {
    a(i);
  }
});
class b {
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
var y = /* @__PURE__ */ ((t) => (t.ASCENDING = "Ascending", t.DESCENDING = "Descending", t))(y || {});
const ve = (t, e, r) => e && r ? t.sort((a, o) => {
  const i = a[e], c = o[e];
  return i < c ? r === y.ASCENDING ? -1 : 1 : i > c ? r === y.ASCENDING ? 1 : -1 : 0;
}) : t;
var Me = Object.defineProperty, Ae = Object.getOwnPropertyDescriptor, m = (t, e, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ae(e, r) : e, i = t.length - 1, c; i >= 0; i--)
    (c = t[i]) && (o = (a ? c(e, r, o) : c(o)) || o);
  return a && o && Me(e, r, o), o;
}, Ee = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, G = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, h = (t, e, r) => (Ee(t, e, "access private method"), r), w, K, q, Y, M, S, V, Q, D, X, R, Z, I, ee, f, A;
let u = class extends B(j) {
  constructor() {
    super(), G(this, w), G(this, q), G(this, M), G(this, V), G(this, D), G(this, R), G(this, I), G(this, f), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Name",
        alias: "name",
        allowSorting: !0
      },
      {
        name: "Module",
        alias: "module",
        allowSorting: !0
      },
      {
        name: "Base Type",
        alias: "baseType",
        allowSorting: !0
      },
      {
        name: "Umbraco?",
        alias: "isUmbraco",
        allowSorting: !0
      }
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.searchName = "", this.namespaces = [], this.selectedNamespace = "", this.inherits = [], this.selectedInherits = "", this.umbraco = [{ name: "Any", value: "", selected: !0 }, { name: "Yes", value: "yes" }, { name: "No", value: "no" }], this.selectedUmbraco = "";
  }
  async connectedCallback() {
    super.connectedCallback(), h(this, q, Y).call(this);
  }
  render() {
    return C`
            <umb-body-layout>
                <godmode-header name=${H(this.name)} slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Search names"
                                .value=${this.searchName}
                                @input=${h(this, V, Q)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>In Namespace:</uui-label>
                            <uui-select
                                .options=${this.namespaces}
                                .value=${this.selectedNamespace}
                                @change=${h(this, D, X)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Inherits From:</uui-label>
                            <uui-select
                                .options=${this.inherits}
                                .value=${this.selectedInherits}
                                @change=${h(this, R, Z)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Is Umbraco?</uui-label>
                            <uui-select
                                .options=${this.umbraco}
                                .value=${this.selectedUmbraco}
                                @change=${h(this, I, ee)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? C`
                        <uui-box style="--uui-box-default-padding: 0;">
                            <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${h(this, w, K)} />
                        </uui-box>
                    ` : C``}
            </umb-body-layout>
        `;
  }
};
w = /* @__PURE__ */ new WeakSet();
K = function(t) {
  const e = t.target, r = e.orderingColumn, a = e.orderingDesc;
  this.filteredData = ve(structuredClone(this.data), r, a ? y.DESCENDING : y.ASCENDING), this._tableItems = h(this, M, S).call(this, this.filteredData);
};
q = /* @__PURE__ */ new WeakSet();
Y = async function() {
  if (this.type) {
    let t = {};
    if (this.type === "surface" && (this.name = "Surface Controller Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetSurfaceControllers())), this.type === "api" && (this.name = "API Controller Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetApiControllers())), this.type === "render" && (this.name = "RenderMvc Controller Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetRenderMvcControllers())), this.type === "models" && (this.name = "Published Content Model Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetPublishedContentModels())), this.type === "composers" && (this.name = "Composer Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetComposers())), this.type === "converters" && (this.name = "Property Value Converter Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetRenderMvcControllers())), this.type === "components" && (this.name = "View Component Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetViewComponents())), this.type === "taghelpers" && (this.name = "Tag Helpers Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetTagHelpers())), this.type === "finders" && (this.name = "Content Finders Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetContentFinders())), this.type === "urlproviders" && (this.name = "URL Providers Browser", t = await g(this, b.getUmbracoManagementApiV1GodModeGetUrlProviders())), t && t.data) {
      this.data = t.data, this.filteredData = structuredClone(this.data), this._tableItems = h(this, M, S).call(this, this.filteredData);
      let e = [...new Set(this.data.map((a) => a.namespace))];
      this.namespaces = e.map((a) => ({ name: a, value: a })), this.namespaces.unshift({ name: "Any", value: "", selected: !0 });
      let r = [...new Set(this.data.map((a) => a.baseType))];
      this.inherits = r.map((a) => ({ name: a, value: a })), this.inherits.unshift({ name: "Any", value: "", selected: !0 });
    }
  }
};
M = /* @__PURE__ */ new WeakSet();
S = function(t) {
  return t.map((e) => ({
    id: e.name,
    data: [
      {
        columnAlias: "name",
        value: e.name
      },
      {
        columnAlias: "module",
        value: e.module
      },
      {
        columnAlias: "baseType",
        value: e.baseType
      },
      {
        columnAlias: "isUmbraco",
        value: e.isUmbraco
      }
    ]
  }));
};
V = /* @__PURE__ */ new WeakSet();
Q = function(t) {
  const e = t.target.value;
  this.searchName = e, h(this, f, A).call(this);
};
D = /* @__PURE__ */ new WeakSet();
X = function(t) {
  const e = t.target.value;
  this.selectedNamespace = e, h(this, f, A).call(this);
};
R = /* @__PURE__ */ new WeakSet();
Z = function(t) {
  const e = t.target.value;
  this.selectedInherits = e, h(this, f, A).call(this);
};
I = /* @__PURE__ */ new WeakSet();
ee = function(t) {
  const e = t.target.value;
  this.selectedUmbraco = e, h(this, f, A).call(this);
};
f = /* @__PURE__ */ new WeakSet();
A = function() {
  var t, e, r, a;
  this.filteredData = structuredClone(this.data), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((o) => o.name.toLowerCase().includes(this.searchName))), this.selectedNamespace !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((o) => o.namespace === this.selectedNamespace)), this.selectedInherits !== "" && (this.filteredData = (r = this.filteredData) == null ? void 0 : r.filter((o) => o.baseType === this.selectedInherits)), this.selectedUmbraco !== "" && (this.filteredData = (a = this.filteredData) == null ? void 0 : a.filter((o) => o.isUmbraco === (this.selectedUmbraco === "Yes"))), this.filteredData ? this._tableItems = h(this, M, S).call(this, this.filteredData) : this._tableItems = [];
};
u.styles = [
  F`
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
m([
  l()
], u.prototype, "_tableConfig", 2);
m([
  l()
], u.prototype, "_tableColumns", 2);
m([
  l()
], u.prototype, "_tableItems", 2);
m([
  W({ type: String })
], u.prototype, "type", 2);
m([
  l()
], u.prototype, "name", 2);
m([
  l()
], u.prototype, "data", 2);
m([
  l()
], u.prototype, "filteredData", 2);
m([
  l()
], u.prototype, "searchName", 2);
m([
  l()
], u.prototype, "namespaces", 2);
m([
  l()
], u.prototype, "selectedNamespace", 2);
m([
  l()
], u.prototype, "inherits", 2);
m([
  l()
], u.prototype, "selectedInherits", 2);
m([
  l()
], u.prototype, "umbraco", 2);
m([
  l()
], u.prototype, "selectedUmbraco", 2);
u = m([
  L("godmode-reflection-browser")
], u);
const He = u, Ce = {
  type: "workspace",
  alias: "Umb.Workspace.GodModeRoot",
  name: "GodMode Root Workspace",
  element: () => import("./godmode-root-workspace.element-BUP6s2rL.js"),
  meta: {
    entityType: "godmode-root"
  }
}, Ue = [Ce], te = {
  type: "workspace",
  kind: "routable",
  alias: "Umb.Workspace.GodMode",
  name: "God Mode Workspace",
  api: () => import("./godmode-workspace.context-v39mK39c.js"),
  meta: {
    entityType: "godmode"
  }
}, Se = {
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
      match: te.alias
    }
  ]
}, _e = [
  te,
  Se
], we = {
  type: "workspace",
  alias: "Umb.Workspace.GodModeFolder",
  name: "GodMode Folder Workspace",
  element: () => import("./godmode-folder-workspace.element-WdXbKKNt.js"),
  meta: {
    entityType: "godmode-folder"
  }
}, qe = [we], Ve = [
  ...Ue,
  ..._e,
  ...qe
], De = [
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
], Re = {
  type: "repository",
  alias: se,
  name: "God Mode Tree Repository",
  api: () => import("./godmode-tree.repository-COqMNRyt.js")
}, Ie = {
  type: "treeStore",
  alias: ne,
  name: "God Mode Tree Store",
  api: () => import("./godmode-tree.store-CYDCLcEv.js")
}, ke = {
  type: "tree",
  kind: "default",
  alias: "Umb.Tree.GodMode",
  name: "God Mode Tree",
  meta: {
    repositoryAlias: "Umb.Repository.GodMode.Tree"
  }
}, Ne = {
  type: "treeItem",
  kind: "default",
  alias: "Umb.TreeItem.GodMode",
  name: "God Mode Tree Item",
  forEntityTypes: ["godmode-root", "godmode", "godmode-folder"]
}, Pe = [
  Re,
  Ie,
  ke,
  Ne
], Fe = (t, e) => {
  e.registerMany([
    ...Ve,
    ...De,
    ...Pe
  ]), t.consumeContext(oe, async (r) => {
    if (!r)
      return;
    const a = r.getOpenApiConfiguration();
    s.BASE = a.base, s.TOKEN = a.token, s.WITH_CREDENTIALS = a.withCredentials, s.CREDENTIALS = a.credentials;
  });
};
export {
  y as D,
  b as G,
  He as a,
  je as b,
  se as c,
  ne as d,
  U as e,
  u as f,
  Fe as o,
  ve as s
};
//# sourceMappingURL=index-C2dn3IU5.js.map
