import { O as r } from "./index-c6_iC_zC.js";
class G extends Error {
  constructor(e, a, s) {
    super(s), this.name = "ApiError", this.url = a.url, this.status = a.status, this.statusText = a.statusText, this.body = a.body, this.request = e;
  }
}
class A extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class f {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((a, s) => {
      this._resolve = a, this._reject = s;
      const n = (d) => {
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
      }), e(n, i, c);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new A("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const m = (t) => typeof t == "string", g = (t) => m(t) && t !== "", l = (t) => t instanceof Blob, b = (t) => t instanceof FormData, q = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, E = (t) => {
  const e = [], a = (n, i) => {
    e.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(i))}`);
  }, s = (n, i) => {
    i != null && (Array.isArray(i) ? i.forEach((c) => s(n, c)) : typeof i == "object" ? Object.entries(i).forEach(([c, d]) => s(`${n}[${c}]`, d)) : a(n, i));
  };
  return Object.entries(t).forEach(([n, i]) => s(n, i)), e.length ? `?${e.join("&")}` : "";
}, C = (t, e) => {
  const a = t.ENCODE_PATH || encodeURI, s = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (i, c) => {
    var d;
    return (d = e.path) != null && d.hasOwnProperty(c) ? a(String(e.path[c])) : i;
  }), n = t.BASE + s;
  return e.query ? n + E(e.query) : n;
}, U = (t) => {
  if (t.formData) {
    const e = new FormData(), a = (s, n) => {
      m(n) || l(n) ? e.append(s, n) : e.append(s, JSON.stringify(n));
    };
    return Object.entries(t.formData).filter(([, s]) => s != null).forEach(([s, n]) => {
      Array.isArray(n) ? n.forEach((i) => a(s, i)) : a(s, n);
    }), e;
  }
}, p = async (t, e) => typeof e == "function" ? e(t) : e, V = async (t, e) => {
  const [a, s, n, i] = await Promise.all([
    p(e, t.TOKEN),
    p(e, t.USERNAME),
    p(e, t.PASSWORD),
    p(e, t.HEADERS)
  ]), c = Object.entries({
    Accept: "application/json",
    ...i,
    ...e.headers
  }).filter(([, d]) => d != null).reduce((d, [h, u]) => ({
    ...d,
    [h]: String(u)
  }), {});
  if (g(a) && (c.Authorization = `Bearer ${a}`), g(s) && g(n)) {
    const d = q(`${s}:${n}`);
    c.Authorization = `Basic ${d}`;
  }
  return e.body !== void 0 && (e.mediaType ? c["Content-Type"] = e.mediaType : l(e.body) ? c["Content-Type"] = e.body.type || "application/octet-stream" : m(e.body) ? c["Content-Type"] = "text/plain" : b(e.body) || (c["Content-Type"] = "application/json")), new Headers(c);
}, k = (t) => {
  var e, a;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (a = t.mediaType) != null && a.includes("+json") ? JSON.stringify(t.body) : m(t.body) || l(t.body) || b(t.body) ? t.body : JSON.stringify(t.body);
}, R = async (t, e, a, s, n, i, c) => {
  const d = new AbortController();
  let h = {
    headers: i,
    body: s ?? n,
    method: e.method,
    signal: d.signal
  };
  t.WITH_CREDENTIALS && (h.credentials = t.CREDENTIALS);
  for (const u of t.interceptors.request._fns)
    h = await u(h);
  return c(() => d.abort()), await fetch(a, h);
}, S = (t, e) => {
  if (e) {
    const a = t.headers.get(e);
    if (m(a))
      return a;
  }
}, P = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const a = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (a.some((s) => e.includes(s)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, _ = (t, e) => {
  const s = {
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
  if (s)
    throw new G(t, e, s);
  if (!e.ok) {
    const n = e.status ?? "unknown", i = e.statusText ?? "unknown", c = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new G(
      t,
      e,
      `Generic Error: status: ${n}; status text: ${i}; body: ${c}`
    );
  }
}, o = (t, e) => new f(async (a, s, n) => {
  try {
    const i = C(t, e), c = U(e), d = k(e), h = await V(t, e);
    if (!n.isCancelled) {
      let u = await R(t, e, i, d, c, h, n);
      for (const v of t.interceptors.response._fns)
        u = await v(u);
      const y = await P(u), M = S(u, e.responseHeader), T = {
        url: i,
        ok: u.ok,
        status: u.status,
        statusText: u.statusText,
        body: M ?? y
      };
      _(e, T), a(T.body);
    }
  } catch (i) {
    s(i);
  }
});
class j {
  /**
   * @param data The data for the request.
   * @param data.cache
   * @returns unknown OK
   * @throws ApiError
   */
  static postUmbracoManagementApiV1GodModeClearUmbracoCache(e = {}) {
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
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
    return o(r, {
      method: "POST",
      url: "/umbraco/management/api/v1/god-mode/RestartAppPool",
      errors: {
        401: "The resource is protected and requires an authentication token",
        403: "The authenticated user do not have access to this resource"
      }
    });
  }
}
export {
  j as G
};
//# sourceMappingURL=services.gen-DnYPQRvA.js.map
