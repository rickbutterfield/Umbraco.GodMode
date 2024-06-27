import { tryExecuteAndNotify as G } from "@umbraco-cms/backoffice/resources";
import { html as U, css as $, state as T, customElement as j } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as B } from "@umbraco-cms/backoffice/lit-element";
import { O as o } from "./index-CV1Q42C5.js";
import { UMB_NOTIFICATION_CONTEXT as F } from "@umbraco-cms/backoffice/notification";
import { UmbLanguageCollectionRepository as H } from "@umbraco-cms/backoffice/language";
class R extends Error {
  constructor(e, r, a) {
    super(a), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class L extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class W {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, a) => {
      this._resolve = r, this._reject = a;
      const s = (u) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(u));
      }, i = (u) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(u));
      }, c = (u) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(u);
      };
      return Object.defineProperty(c, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(c, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(c, "isCancelled", {
        get: () => this._isCancelled
      }), e(s, i, c);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new L("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const M = (t) => typeof t == "string", f = (t) => M(t) && t !== "", k = (t) => t instanceof Blob, S = (t) => t instanceof FormData, z = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, J = (t) => {
  const e = [], r = (s, i) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(i))}`);
  }, a = (s, i) => {
    i != null && (Array.isArray(i) ? i.forEach((c) => a(s, c)) : typeof i == "object" ? Object.entries(i).forEach(([c, u]) => a(`${s}[${c}]`, u)) : r(s, i));
  };
  return Object.entries(t).forEach(([s, i]) => a(s, i)), e.length ? `?${e.join("&")}` : "";
}, K = (t, e) => {
  const r = t.ENCODE_PATH || encodeURI, a = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (i, c) => {
    var u;
    return (u = e.path) != null && u.hasOwnProperty(c) ? r(String(e.path[c])) : i;
  }), s = t.BASE + a;
  return e.query ? s + J(e.query) : s;
}, Q = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (a, s) => {
      M(s) || k(s) ? e.append(a, s) : e.append(a, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, a]) => a != null).forEach(([a, s]) => {
      Array.isArray(s) ? s.forEach((i) => r(a, i)) : r(a, s);
    }), e;
  }
}, v = async (t, e) => typeof e == "function" ? e(t) : e, X = async (t, e) => {
  const [r, a, s, i] = await Promise.all([
    v(e, t.TOKEN),
    v(e, t.USERNAME),
    v(e, t.PASSWORD),
    v(e, t.HEADERS)
  ]), c = Object.entries({
    Accept: "application/json",
    ...i,
    ...e.headers
  }).filter(([, u]) => u != null).reduce((u, [p, h]) => ({
    ...u,
    [p]: String(h)
  }), {});
  if (f(r) && (c.Authorization = `Bearer ${r}`), f(a) && f(s)) {
    const u = z(`${a}:${s}`);
    c.Authorization = `Basic ${u}`;
  }
  return e.body !== void 0 && (e.mediaType ? c["Content-Type"] = e.mediaType : k(e.body) ? c["Content-Type"] = e.body.type || "application/octet-stream" : M(e.body) ? c["Content-Type"] = "text/plain" : S(e.body) || (c["Content-Type"] = "application/json")), new Headers(c);
}, Y = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : M(t.body) || k(t.body) || S(t.body) ? t.body : JSON.stringify(t.body);
}, Z = async (t, e, r, a, s, i, c) => {
  const u = new AbortController();
  let p = {
    headers: i,
    body: a ?? s,
    method: e.method,
    signal: u.signal
  };
  t.WITH_CREDENTIALS && (p.credentials = t.CREDENTIALS);
  for (const h of t.interceptors.request._fns)
    p = await h(p);
  return c(() => u.abort()), await fetch(r, p);
}, ee = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (M(r))
      return r;
  }
}, te = async (t) => {
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
}, re = (t, e) => {
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
    throw new R(t, e, a);
  if (!e.ok) {
    const s = e.status ?? "unknown", i = e.statusText ?? "unknown", c = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new R(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${i}; body: ${c}`
    );
  }
}, n = (t, e) => new W(async (r, a, s) => {
  try {
    const i = K(t, e), c = Q(e), u = Y(e), p = await X(t, e);
    if (!s.isCancelled) {
      let h = await Z(t, e, i, u, c, p, s);
      for (const N of t.interceptors.response._fns)
        h = await N(h);
      const D = await te(h), x = ee(h, e.responseHeader), P = {
        url: i,
        ok: h.ok,
        status: h.status,
        statusText: h.statusText,
        body: x ?? D
      };
      re(e, P), r(P.body);
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
    return n(o, {
      method: "POST",
      url: "/umbraco/management/api/v1/GodMode/ClearUmbracoCache",
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
    return n(o, {
      method: "POST",
      url: "/umbraco/management/api/v1/GodMode/copyDataType",
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
    return n(o, {
      method: "POST",
      url: "/umbraco/management/api/v1/GodMode/DeleteTag",
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
    return n(o, {
      method: "POST",
      url: "/umbraco/management/api/v1/GodMode/FixTemplateMasters",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetApiControllers",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetAssemblies",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetAssembliesWithInterfaces",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetComposers",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetCompositions",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetConfig",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetContentFinders",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetContentPaged",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetContentTypeAliases",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetContentTypeMap",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetContentUsageData",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetDataTypes",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetDataTypesStatus",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetEnvironmentDiagnostics",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetInterfacesFrom",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetLanguages",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetMedia",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetMediaTypes",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetMemberGroups",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetMembersPaged",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetNonMsAssemblies",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetNuCacheItem",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetNuCacheType",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetOrphanedTags",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetPropertyEditors",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetPropertyGroups",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetPropertyValueConverters",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetPublishedContentModels",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetRegisteredServices",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetRenderMvcControllers",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetStandardContentTypeAliases",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetSurfaceControllers",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetTagHelpers",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetTagMapping",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetTemplates",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetTemplateUrlsToPing",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetTypesAssignableFrom",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetTypesFrom",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetUmbracoAssemblies",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetUrlProviders",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetUrlsToPing",
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
    return n(o, {
      method: "GET",
      url: "/umbraco/management/api/v1/GodMode/GetViewComponents",
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
    return n(o, {
      method: "POST",
      url: "/umbraco/management/api/v1/GodMode/PurgeMediaCache",
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
    return n(o, {
      method: "POST",
      url: "/umbraco/management/api/v1/GodMode/RestartAppPool",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
}
var ae = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, g = (t, e, r, a) => {
  for (var s = a > 1 ? void 0 : a ? oe(e, r) : e, i = t.length - 1, c; i >= 0; i--)
    (c = t[i]) && (s = (a ? c(e, r, s) : c(s)) || s);
  return a && s && ae(e, r, s), s;
}, q = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, m = (t, e, r) => (q(t, e, "read from private field"), r ? r.call(t) : e.get(t)), y = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, ne = (t, e, r, a) => (q(t, e, "write to private field"), a ? a.call(t, r) : e.set(t, r), r), C = (t, e, r) => (q(t, e, "access private method"), r), d, _, A, V, w, O, E, I;
let l = class extends B {
  constructor() {
    super(), y(this, A), y(this, w), y(this, E), y(this, d, void 0), y(this, _, new H(this)), this._languages = [], this._cultures = [], this._selectedCulture = "", this.warmingUp = !1, this.warmUpCurrentUrl = "", this.warmUpCurrent = 1, this.warmUpCount = 0, this.consumeContext(F, (t) => {
      ne(this, d, t);
    }), C(this, A, V).call(this);
  }
  async clearUmbracoCache(t) {
    var r, a, s;
    const { data: e } = await G(this, b.postUmbracoManagementApiV1GodModeClearUmbracoCache({ cache: t }));
    e && e.message && (e.responseType === "Error" ? (r = m(this, d)) == null || r.peek("danger", { data: { message: e.message } }) : e.responseType === "Success" ? (a = m(this, d)) == null || a.peek("positive", { data: { message: e.message } }) : e.responseType === "Warning" && ((s = m(this, d)) == null || s.peek("warning", { data: { message: e.message } })));
  }
  async purgeMediaCache() {
    var t, e, r;
    if (window.confirm("This will attempt to delete all the cached image crops on disk in the TEMP/MediaCache. IO operations can sometimes fail. Are you sure?")) {
      const { data: a } = await G(this, b.postUmbracoManagementApiV1GodModePurgeMediaCache());
      a && a.message && (a.responseType === "Error" ? (t = m(this, d)) == null || t.peek("danger", { data: { message: a.message } }) : a.responseType === "Success" ? (e = m(this, d)) == null || e.peek("positive", { data: { message: a.message } }) : a.responseType === "Warning" && ((r = m(this, d)) == null || r.peek("warning", { data: { message: a.message } })));
    }
  }
  async restartAppPool() {
    var t, e, r;
    if (window.confirm("This will take the site offline (and won't restart it). Are you really, really, really sure?")) {
      const { data: a } = await G(this, b.postUmbracoManagementApiV1GodModeRestartAppPool());
      a && a.message && (a.responseType === "Error" ? (t = m(this, d)) == null || t.peek("danger", { data: { message: a.message } }) : a.responseType === "Success" ? (e = m(this, d)) == null || e.peek("positive", { data: { message: a.message } }) : a.responseType === "Warning" && ((r = m(this, d)) == null || r.peek("warning", { data: { message: a.message } })));
    }
  }
  async warmUpTemplates() {
    const { data: t } = await G(this, b.getUmbracoManagementApiV1GodModeGetTemplateUrlsToPing());
    t && await this._pingUrls(t);
  }
  async pingUrls() {
    const { data: t } = await G(this, b.getUmbracoManagementApiV1GodModeGetUrlsToPing({ culture: this._selectedCulture }));
    t && await this._pingUrls(t);
  }
  async _pingUrls(t) {
    var e;
    this.warmingUp = !0, this.warmUpCount = t.length, this.warmUpCount === 0 && ((e = m(this, d)) == null || e.peek("warning", { data: { message: "THe URL list was empty..." } })), t.forEach(async (r) => {
      this.warmingUp = !0, this.warmUpCurrentUrl = r, (await fetch(r)).ok ? this.warmUpCurrent++ : this.warmUpCurrent++, this.warmUpCurrent === this.warmUpCount && (this.warmingUp = !1);
    });
  }
  render() {
    return U`
            <umb-body-layout>
                <godmode-header name="Utility Browser" slot="header"></godmode-header>
                <uui-box headline="Caches">
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Request Cache" @click=${() => this.clearUmbracoCache("Request")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Request Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Runtime Cache" @click=${() => this.clearUmbracoCache("Runtime")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Runtime Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Isolated Cache" @click=${() => this.clearUmbracoCache("Isolated")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Isolated Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Partial Cache" @click=${() => this.clearUmbracoCache("Partial")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Partial Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Other Cache" @click=${() => this.clearUmbracoCache("Other")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Other Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="danger" label="Clear All Caches" @click=${() => this.clearUmbracoCache("all")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear All Caches
                            </uui-button>
                        </div>
                    </div>
                </uui-box>

                <uui-box headline="TEMP Files">
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Purge Media Cache" @click=${() => this.purgeMediaCache()}>
                                <uui-icon name="icon-hard-drive"></uui-icon> Purge Media Cache
                            </uui-button>
                        </div>
                    </div>
                </uui-box>

                <uui-box headline="Application">
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="danger" label="Stop Application" @click=${() => this.restartAppPool()}>
                                <uui-icon name="icon-scull"></uui-icon> Stop Application
                            </uui-button>
                        </div>
                        <div>
                            <uui-button type="button" look="primary" color="default" label="Warm-Up Templates" @click=${() => this.warmUpTemplates()}>
                                <uui-icon name="icon-server"></uui-icon> Warm-Up Templates
                            </uui-button>
                        </div>
                        <div>
                            <uui-button type="button" look="primary" color="default" label="Ping URLs" @click=${() => this.pingUrls()}>
                                <uui-icon name="icon-server"></uui-icon> Ping URLs
                            </uui-button>
                            <uui-select
                                placeholder="No culture"
                                .options=${this._cultures}
                                @change=${C(this, w, O)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${C(this, E, I).call(this)}
            </umb-body-layout>
        `;
  }
};
d = /* @__PURE__ */ new WeakMap();
_ = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakSet();
V = async function() {
  const { data: t } = await m(this, _).requestCollection({});
  if (t) {
    this._languages = t.items;
    const e = this._languages.map((r) => ({ name: r.name, value: r.unique }));
    e.unshift({ name: "No culture", value: "" }), this._cultures = e;
  }
};
w = /* @__PURE__ */ new WeakSet();
O = function(t) {
  this._selectedCulture = t.target.value;
};
E = /* @__PURE__ */ new WeakSet();
I = function() {
  return this.warmingUp ? U`
                <uui-box>
                    <uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
                    <p>Warming up ${this.warmUpCurrent} of ${this.warmUpCount} - pinging URL: <a href=${this.warmUpCurrentUrl} target="_blank">${this.warmUpCurrentUrl}</a></p>
                </uui-box>
            ` : U``;
};
l.styles = [
  $`
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }

            uui-box {
                margin-bottom: 20px;
            }
        `
];
g([
  T()
], l.prototype, "_languages", 2);
g([
  T()
], l.prototype, "_cultures", 2);
g([
  T()
], l.prototype, "_selectedCulture", 2);
g([
  T()
], l.prototype, "warmingUp", 2);
g([
  T()
], l.prototype, "warmUpCurrentUrl", 2);
g([
  T()
], l.prototype, "warmUpCurrent", 2);
g([
  T()
], l.prototype, "warmUpCount", 2);
l = g([
  j("godmode-utility-browser")
], l);
const me = l;
export {
  l as GodModeUtilityBrowserElement,
  me as default
};
//# sourceMappingURL=godmode-utility-browser.element-CBike_My.js.map
