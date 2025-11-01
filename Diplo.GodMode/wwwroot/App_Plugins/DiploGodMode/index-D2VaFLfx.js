import { UMB_AUTH_CONTEXT as we } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as Q } from "@umbraco-cms/backoffice/element-api";
import { LitElement as X, ifDefined as K, html as x, css as Z, property as ee, customElement as te, state as w } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as A } from "@umbraco-cms/backoffice/resources";
import { DirectionModel as k } from "@umbraco-cms/backoffice/external/backend-api";
import "@umbraco-cms/backoffice/tree";
import { UmbContextToken as Ce } from "@umbraco-cms/backoffice/context-api";
const Te = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, r) => typeof r == "bigint" ? r.toString() : r
  )
}, Ge = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: r,
  responseTransformer: a,
  responseValidator: s,
  sseDefaultRetryDelay: d,
  sseMaxRetryAttempts: i,
  sseMaxRetryDelay: n,
  sseSleepFn: u,
  url: m,
  ...l
}) => {
  let h;
  const E = u ?? ((o) => new Promise((p) => setTimeout(p, o)));
  return { stream: async function* () {
    let o = d ?? 3e3, p = 0;
    const D = l.signal ?? new AbortController().signal;
    for (; !D.aborted; ) {
      p++;
      const $ = l.headers instanceof Headers ? l.headers : new Headers(l.headers);
      h !== void 0 && $.set("Last-Event-ID", h);
      try {
        const U = {
          redirect: "follow",
          ...l,
          body: l.serializedBody,
          headers: $,
          signal: D
        };
        let G = new Request(m, U);
        t && (G = await t(m, U));
        const C = await (l.fetch ?? globalThis.fetch)(G);
        if (!C.ok)
          throw new Error(
            `SSE failed: ${C.status} ${C.statusText}`
          );
        if (!C.body) throw new Error("No body in SSE response");
        const S = C.body.pipeThrough(new TextDecoderStream()).getReader();
        let R = "";
        const W = () => {
          try {
            S.cancel();
          } catch {
          }
        };
        D.addEventListener("abort", W);
        try {
          for (; ; ) {
            const { done: be, value: ye } = await S.read();
            if (be) break;
            R += ye;
            const V = R.split(`

`);
            R = V.pop() ?? "";
            for (const pe of V) {
              const ve = pe.split(`
`), O = [];
              let H;
              for (const T of ve)
                if (T.startsWith("data:"))
                  O.push(T.replace(/^data:\s*/, ""));
                else if (T.startsWith("event:"))
                  H = T.replace(/^event:\s*/, "");
                else if (T.startsWith("id:"))
                  h = T.replace(/^id:\s*/, "");
                else if (T.startsWith("retry:")) {
                  const L = Number.parseInt(
                    T.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(L) || (o = L);
                }
              let _, F = !1;
              if (O.length) {
                const T = O.join(`
`);
                try {
                  _ = JSON.parse(T), F = !0;
                } catch {
                  _ = T;
                }
              }
              F && (s && await s(_), a && (_ = await a(_))), r == null || r({
                data: _,
                event: H,
                id: h,
                retry: o
              }), O.length && (yield _);
            }
          }
        } finally {
          D.removeEventListener("abort", W), S.releaseLock();
        }
        break;
      } catch (U) {
        if (e == null || e(U), i !== void 0 && p >= i)
          break;
        const G = Math.min(
          o * 2 ** (p - 1),
          n ?? 3e4
        );
        await E(G);
      }
    }
  }() };
}, Se = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, Ae = (t) => {
  switch (t) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, Me = (t) => {
  switch (t) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, re = ({
  allowReserved: t,
  explode: e,
  name: r,
  style: a,
  value: s
}) => {
  if (!e) {
    const n = (t ? s : s.map((u) => encodeURIComponent(u))).join(Ae(a));
    switch (a) {
      case "label":
        return `.${n}`;
      case "matrix":
        return `;${r}=${n}`;
      case "simple":
        return n;
      default:
        return `${r}=${n}`;
    }
  }
  const d = Se(a), i = s.map((n) => a === "label" || a === "simple" ? t ? n : encodeURIComponent(n) : z({
    allowReserved: t,
    name: r,
    value: n
  })).join(d);
  return a === "label" || a === "matrix" ? d + i : i;
}, z = ({
  allowReserved: t,
  name: e,
  value: r
}) => {
  if (r == null)
    return "";
  if (typeof r == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${e}=${t ? r : encodeURIComponent(r)}`;
}, ae = ({
  allowReserved: t,
  explode: e,
  name: r,
  style: a,
  value: s,
  valueOnly: d
}) => {
  if (s instanceof Date)
    return d ? s.toISOString() : `${r}=${s.toISOString()}`;
  if (a !== "deepObject" && !e) {
    let u = [];
    Object.entries(s).forEach(([l, h]) => {
      u = [
        ...u,
        l,
        t ? h : encodeURIComponent(h)
      ];
    });
    const m = u.join(",");
    switch (a) {
      case "form":
        return `${r}=${m}`;
      case "label":
        return `.${m}`;
      case "matrix":
        return `;${r}=${m}`;
      default:
        return m;
    }
  }
  const i = Me(a), n = Object.entries(s).map(
    ([u, m]) => z({
      allowReserved: t,
      name: a === "deepObject" ? `${r}[${u}]` : u,
      value: m
    })
  ).join(i);
  return a === "label" || a === "matrix" ? i + n : n;
}, Ie = /\{[^{}]+\}/g, De = ({ path: t, url: e }) => {
  let r = e;
  const a = e.match(Ie);
  if (a)
    for (const s of a) {
      let d = !1, i = s.substring(1, s.length - 1), n = "simple";
      i.endsWith("*") && (d = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), n = "label") : i.startsWith(";") && (i = i.substring(1), n = "matrix");
      const u = t[i];
      if (u == null)
        continue;
      if (Array.isArray(u)) {
        r = r.replace(
          s,
          re({ explode: d, name: i, style: n, value: u })
        );
        continue;
      }
      if (typeof u == "object") {
        r = r.replace(
          s,
          ae({
            explode: d,
            name: i,
            style: n,
            value: u,
            valueOnly: !0
          })
        );
        continue;
      }
      if (n === "matrix") {
        r = r.replace(
          s,
          `;${z({
            name: i,
            value: u
          })}`
        );
        continue;
      }
      const m = encodeURIComponent(
        n === "label" ? `.${u}` : u
      );
      r = r.replace(s, m);
    }
  return r;
}, Ue = ({
  baseUrl: t,
  path: e,
  query: r,
  querySerializer: a,
  url: s
}) => {
  const d = s.startsWith("/") ? s : `/${s}`;
  let i = (t ?? "") + d;
  e && (i = De({ path: e, url: i }));
  let n = r ? a(r) : "";
  return n.startsWith("?") && (n = n.substring(1)), n && (i += `?${n}`), i;
};
function _e(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Ee = async (t, e) => {
  const r = typeof e == "function" ? await e(t) : e;
  if (r)
    return t.scheme === "bearer" ? `Bearer ${r}` : t.scheme === "basic" ? `Basic ${btoa(r)}` : r;
}, se = ({
  allowReserved: t,
  array: e,
  object: r
} = {}) => (s) => {
  const d = [];
  if (s && typeof s == "object")
    for (const i in s) {
      const n = s[i];
      if (n != null)
        if (Array.isArray(n)) {
          const u = re({
            allowReserved: t,
            explode: !0,
            name: i,
            style: "form",
            value: n,
            ...e
          });
          u && d.push(u);
        } else if (typeof n == "object") {
          const u = ae({
            allowReserved: t,
            explode: !0,
            name: i,
            style: "deepObject",
            value: n,
            ...r
          });
          u && d.push(u);
        } else {
          const u = z({
            allowReserved: t,
            name: i,
            value: n
          });
          u && d.push(u);
        }
    }
  return d.join("&");
}, $e = (t) => {
  var r;
  if (!t)
    return "stream";
  const e = (r = t.split(";")[0]) == null ? void 0 : r.trim();
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json"))
      return "json";
    if (e === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (a) => e.startsWith(a)
    ))
      return "blob";
    if (e.startsWith("text/"))
      return "text";
  }
}, xe = (t, e) => {
  var r, a;
  return e ? !!(t.headers.has(e) || (r = t.query) != null && r[e] || (a = t.headers.get("Cookie")) != null && a.includes(`${e}=`)) : !1;
}, Pe = async ({
  security: t,
  ...e
}) => {
  for (const r of t) {
    if (xe(e, r.name))
      continue;
    const a = await Ee(r, e.auth);
    if (!a)
      continue;
    const s = r.name ?? "Authorization";
    switch (r.in) {
      case "query":
        e.query || (e.query = {}), e.query[s] = a;
        break;
      case "cookie":
        e.headers.append("Cookie", `${s}=${a}`);
        break;
      case "header":
      default:
        e.headers.set(s, a);
        break;
    }
  }
}, J = (t) => Ue({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : se(t.querySerializer),
  url: t.url
}), Y = (t, e) => {
  var a;
  const r = { ...t, ...e };
  return (a = r.baseUrl) != null && a.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = ie(t.headers, e.headers), r;
}, Ne = (t) => {
  const e = [];
  return t.forEach((r, a) => {
    e.push([a, r]);
  }), e;
}, ie = (...t) => {
  const e = new Headers();
  for (const r of t) {
    if (!r)
      continue;
    const a = r instanceof Headers ? Ne(r) : Object.entries(r);
    for (const [s, d] of a)
      if (d === null)
        e.delete(s);
      else if (Array.isArray(d))
        for (const i of d)
          e.append(s, i);
      else d !== void 0 && e.set(
        s,
        typeof d == "object" ? JSON.stringify(d) : d
      );
  }
  return e;
};
class q {
  constructor() {
    this.fns = [];
  }
  clear() {
    this.fns = [];
  }
  eject(e) {
    const r = this.getInterceptorIndex(e);
    this.fns[r] && (this.fns[r] = null);
  }
  exists(e) {
    const r = this.getInterceptorIndex(e);
    return !!this.fns[r];
  }
  getInterceptorIndex(e) {
    return typeof e == "number" ? this.fns[e] ? e : -1 : this.fns.indexOf(e);
  }
  update(e, r) {
    const a = this.getInterceptorIndex(e);
    return this.fns[a] ? (this.fns[a] = r, e) : !1;
  }
  use(e) {
    return this.fns.push(e), this.fns.length - 1;
  }
}
const Oe = () => ({
  error: new q(),
  request: new q(),
  response: new q()
}), ke = se({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), je = {
  "Content-Type": "application/json"
}, ce = (t = {}) => ({
  ...Te,
  headers: je,
  parseAs: "auto",
  querySerializer: ke,
  ...t
}), ze = (t = {}) => {
  let e = Y(ce(), t);
  const r = () => ({ ...e }), a = (m) => (e = Y(e, m), r()), s = Oe(), d = async (m) => {
    const l = {
      ...e,
      ...m,
      fetch: m.fetch ?? e.fetch ?? globalThis.fetch,
      headers: ie(e.headers, m.headers),
      serializedBody: void 0
    };
    l.security && await Pe({
      ...l,
      security: l.security
    }), l.requestValidator && await l.requestValidator(l), l.body !== void 0 && l.bodySerializer && (l.serializedBody = l.bodySerializer(l.body)), (l.body === void 0 || l.serializedBody === "") && l.headers.delete("Content-Type");
    const h = J(l);
    return { opts: l, url: h };
  }, i = async (m) => {
    const { opts: l, url: h } = await d(m), E = {
      redirect: "follow",
      ...l,
      body: _e(l)
    };
    let I = new Request(h, E);
    for (const g of s.request.fns)
      g && (I = await g(I, l));
    const N = l.fetch;
    let o = await N(I);
    for (const g of s.response.fns)
      g && (o = await g(o, I, l));
    const p = {
      request: I,
      response: o
    };
    if (o.ok) {
      const g = (l.parseAs === "auto" ? $e(o.headers.get("Content-Type")) : l.parseAs) ?? "json";
      if (o.status === 204 || o.headers.get("Content-Length") === "0") {
        let S;
        switch (g) {
          case "arrayBuffer":
          case "blob":
          case "text":
            S = await o[g]();
            break;
          case "formData":
            S = new FormData();
            break;
          case "stream":
            S = o.body;
            break;
          case "json":
          default:
            S = {};
            break;
        }
        return l.responseStyle === "data" ? S : {
          data: S,
          ...p
        };
      }
      let C;
      switch (g) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          C = await o[g]();
          break;
        case "stream":
          return l.responseStyle === "data" ? o.body : {
            data: o.body,
            ...p
          };
      }
      return g === "json" && (l.responseValidator && await l.responseValidator(C), l.responseTransformer && (C = await l.responseTransformer(C))), l.responseStyle === "data" ? C : {
        data: C,
        ...p
      };
    }
    const D = await o.text();
    let $;
    try {
      $ = JSON.parse(D);
    } catch {
    }
    const U = $ ?? D;
    let G = U;
    for (const g of s.error.fns)
      g && (G = await g(U, o, I, l));
    if (G = G || {}, l.throwOnError)
      throw G;
    return l.responseStyle === "data" ? void 0 : {
      error: G,
      ...p
    };
  }, n = (m) => (l) => i({ ...l, method: m }), u = (m) => async (l) => {
    const { opts: h, url: E } = await d(l);
    return Ge({
      ...h,
      body: h.body,
      headers: h.headers,
      method: m,
      onRequest: async (I, N) => {
        let o = new Request(I, N);
        for (const p of s.request.fns)
          p && (o = await p(o, h));
        return o;
      },
      url: E
    });
  };
  return {
    buildUrl: J,
    connect: n("CONNECT"),
    delete: n("DELETE"),
    get: n("GET"),
    getConfig: r,
    head: n("HEAD"),
    interceptors: s,
    options: n("OPTIONS"),
    patch: n("PATCH"),
    post: n("POST"),
    put: n("PUT"),
    request: i,
    setConfig: a,
    sse: {
      connect: u("CONNECT"),
      delete: u("DELETE"),
      get: u("GET"),
      head: u("HEAD"),
      options: u("OPTIONS"),
      patch: u("PATCH"),
      post: u("POST"),
      put: u("PUT"),
      trace: u("TRACE")
    },
    trace: n("TRACE")
  };
}, c = ze(ce({
  baseUrl: "http://localhost:26096",
  throwOnError: !0
})), Be = "Umb.Repository.GodMode.Tree", ot = "Umb.Store.GodMode.Tree", Re = "Umb.Tree.GodMode";
var qe = Object.defineProperty, We = Object.getOwnPropertyDescriptor, le = (t, e, r, a) => {
  for (var s = a > 1 ? void 0 : a ? We(e, r) : e, d = t.length - 1, i; d >= 0; d--)
    (i = t[d]) && (s = (a ? i(e, r, s) : i(s)) || s);
  return a && s && qe(e, r, s), s;
};
let j = class extends Q(X) {
  constructor() {
    super();
  }
  render() {
    return x`
            <div class="header">
                <uui-icon name="icon-sience"></uui-icon>
                <h3>God Mode ${K(this.name)}</h3>
            </div>
        `;
  }
};
j.styles = [
  Z`
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
le([
  ee({ type: String, attribute: !0 })
], j.prototype, "name", 2);
j = le([
  te("godmode-header")
], j);
class M {
  static clearUmbracoCache(e) {
    return ((e == null ? void 0 : e.client) ?? c).post({
      url: "/umbraco/god-mode/api/v1/ClearUmbracoCache",
      ...e
    });
  }
  static copyDataType(e) {
    return ((e == null ? void 0 : e.client) ?? c).post({
      url: "/umbraco/god-mode/api/v1/CopyDataType",
      ...e
    });
  }
  static deleteTag(e) {
    return ((e == null ? void 0 : e.client) ?? c).post({
      url: "/umbraco/god-mode/api/v1/DeleteTag",
      ...e
    });
  }
  static fixTemplateMasters(e) {
    return ((e == null ? void 0 : e.client) ?? c).post({
      url: "/umbraco/god-mode/api/v1/FixTemplateMasters",
      ...e
    });
  }
  static getApiControllers(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetApiControllers",
      ...e
    });
  }
  static getAssemblies(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetAssemblies",
      ...e
    });
  }
  static getAssembliesWithInterfaces(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetAssembliesWithInterfaces",
      ...e
    });
  }
  static getComposers(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetComposers",
      ...e
    });
  }
  static getCompositions(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetCompositions",
      ...e
    });
  }
  static getConfig(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetConfig",
      ...e
    });
  }
  static getContentFinders(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetContentFinders",
      ...e
    });
  }
  static getContentPaged(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetContentPaged",
      ...e
    });
  }
  static getContentTypeAliases(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetContentTypeAliases",
      ...e
    });
  }
  static getContentTypeMap(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetContentTypeMap",
      ...e
    });
  }
  static getContentUsageData(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetContentUsageData",
      ...e
    });
  }
  static getDataTypes(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetDataTypes",
      ...e
    });
  }
  static getDataTypesStatus(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetDataTypesStatus",
      ...e
    });
  }
  static getEnvironmentDiagnostics(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetEnvironmentDiagnostics",
      ...e
    });
  }
  static getInterfacesFrom(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetInterfacesFrom",
      ...e
    });
  }
  static getLanguages(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetLanguages",
      ...e
    });
  }
  static getMedia(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetMedia",
      ...e
    });
  }
  static getMediaTypes(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetMediaTypes",
      ...e
    });
  }
  static getMemberGroups(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetMemberGroups",
      ...e
    });
  }
  static getMembersPaged(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetMembersPaged",
      ...e
    });
  }
  static getNonMsAssemblies(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetNonMsAssemblies",
      ...e
    });
  }
  static getNuCacheItem(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetNuCacheItem",
      ...e
    });
  }
  static getNuCacheType(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetNuCacheType",
      ...e
    });
  }
  static getOrphanedTags(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetOrphanedTags",
      ...e
    });
  }
  static getPropertyEditors(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetPropertyEditors",
      ...e
    });
  }
  static getPropertyGroups(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetPropertyGroups",
      ...e
    });
  }
  static getPropertyValueConverters(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetPropertyValueConverters",
      ...e
    });
  }
  static getPublishedContentModels(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetPublishedContentModels",
      ...e
    });
  }
  static getRegisteredServices(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetRegisteredServices",
      ...e
    });
  }
  static getRenderMvcControllers(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetRenderMvcControllers",
      ...e
    });
  }
  static getStandardContentTypeAliases(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetStandardContentTypeAliases",
      ...e
    });
  }
  static getSurfaceControllers(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetSurfaceControllers",
      ...e
    });
  }
  static getTagHelpers(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetTagHelpers",
      ...e
    });
  }
  static getTagMapping(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetTagMapping",
      ...e
    });
  }
  static getTemplates(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetTemplates",
      ...e
    });
  }
  static getTemplateUrlsToPing(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetTemplateUrlsToPing",
      ...e
    });
  }
  static getTypesAssignableFrom(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetTypesAssignableFrom",
      ...e
    });
  }
  static getTypesFrom(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetTypesFrom",
      ...e
    });
  }
  static getUmbracoAssemblies(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetUmbracoAssemblies",
      ...e
    });
  }
  static getUrlProviders(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetUrlProviders",
      ...e
    });
  }
  static getUrlsToPing(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetUrlsToPing",
      ...e
    });
  }
  static getViewComponents(e) {
    return ((e == null ? void 0 : e.client) ?? c).get({
      url: "/umbraco/god-mode/api/v1/GetViewComponents",
      ...e
    });
  }
  static purgeMediaCache(e) {
    return ((e == null ? void 0 : e.client) ?? c).post({
      url: "/umbraco/god-mode/api/v1/PurgeMediaCache",
      ...e
    });
  }
  static restartAppPool(e) {
    return ((e == null ? void 0 : e.client) ?? c).post({
      url: "/umbraco/god-mode/api/v1/RestartAppPool",
      ...e
    });
  }
}
const Ve = (t, e, r) => e && r ? t.sort((a, s) => {
  const d = a[e], i = s[e];
  return d < i ? r === k.ASCENDING ? -1 : 1 : d > i ? r === k.ASCENDING ? 1 : -1 : 0;
}) : t;
var He = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, ne = (t) => {
  throw TypeError(t);
}, y = (t, e, r, a) => {
  for (var s = a > 1 ? void 0 : a ? Fe(e, r) : e, d = t.length - 1, i; d >= 0; d--)
    (i = t[d]) && (s = (a ? i(e, r, s) : i(s)) || s);
  return a && s && He(e, r, s), s;
}, Le = (t, e, r) => e.has(t) || ne("Cannot " + r), Je = (t, e, r) => e.has(t) ? ne("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), v = (t, e, r) => (Le(t, e, "access private method"), r), b, de, ue, B, oe, me, fe, he, P;
let f = class extends Q(X) {
  constructor() {
    super(), Je(this, b), this._tableConfig = {
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
    super.connectedCallback(), v(this, b, ue).call(this);
  }
  render() {
    return x`
            <umb-body-layout>
                <godmode-header name=${K(this.name)} slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Search names"
                                .value=${this.searchName}
                                @input=${v(this, b, oe)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>In Namespace:</uui-label>
                            <uui-select
                                .options=${this.namespaces}
                                .value=${this.selectedNamespace}
                                @change=${v(this, b, me)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Inherits From:</uui-label>
                            <uui-select
                                .options=${this.inherits}
                                .value=${this.selectedInherits}
                                @change=${v(this, b, fe)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Is Umbraco?</uui-label>
                            <uui-select
                                .options=${this.umbraco}
                                .value=${this.selectedUmbraco}
                                @change=${v(this, b, he)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? x`
                        <uui-box style="--uui-box-default-padding: 0;">
                            <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${v(this, b, de)} />
                        </uui-box>
                    ` : x``}
            </umb-body-layout>
        `;
  }
};
b = /* @__PURE__ */ new WeakSet();
de = function(t) {
  const e = t.target, r = e.orderingColumn, a = e.orderingDesc;
  this.filteredData = Ve(structuredClone(this.data), r, a ? k.DESCENDING : k.ASCENDING), this._tableItems = v(this, b, B).call(this, this.filteredData);
};
ue = async function() {
  if (this.type) {
    let t = {};
    if (this.type === "surface" && (this.name = "Surface Controller Browser", t = await A(this, M.getSurfaceControllers())), this.type === "api" && (this.name = "API Controller Browser", t = await A(this, M.getApiControllers())), this.type === "render" && (this.name = "RenderMvc Controller Browser", t = await A(this, M.getRegisteredServices())), this.type === "models" && (this.name = "Published Content Model Browser", t = await A(this, M.getPublishedContentModels())), this.type === "composers" && (this.name = "Composer Browser", t = await A(this, M.getComposers())), this.type === "converters" && (this.name = "Property Value Converter Browser", t = await A(this, M.getRenderMvcControllers())), this.type === "components" && (this.name = "View Component Browser", t = await A(this, M.getViewComponents())), this.type === "taghelpers" && (this.name = "Tag Helpers Browser", t = await A(this, M.getTagHelpers())), this.type === "finders" && (this.name = "Content Finders Browser", t = await A(this, M.getContentFinders())), this.type === "urlproviders" && (this.name = "URL Providers Browser", t = await A(this, M.getUrlProviders())), t && t.data) {
      this.data = t.data, this.filteredData = structuredClone(this.data), this._tableItems = v(this, b, B).call(this, this.filteredData);
      let e = [...new Set(this.data.map((a) => a.namespace))];
      this.namespaces = e.map((a) => ({ name: a, value: a })), this.namespaces.unshift({ name: "Any", value: "", selected: !0 });
      let r = [...new Set(this.data.map((a) => a.baseType))];
      this.inherits = r.map((a) => ({ name: a, value: a })), this.inherits.unshift({ name: "Any", value: "", selected: !0 });
    }
  }
};
B = function(t) {
  return t.map((e) => ({
    id: e.name,
    data: [
      {
        columnAlias: "name",
        value: e.name
      },
      {
        columnAlias: "module",
        value: x`<pre>${e.module}</pre>`
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
oe = function(t) {
  const e = t.target.value;
  this.searchName = e, v(this, b, P).call(this);
};
me = function(t) {
  const e = t.target.value;
  this.selectedNamespace = e, v(this, b, P).call(this);
};
fe = function(t) {
  const e = t.target.value;
  this.selectedInherits = e, v(this, b, P).call(this);
};
he = function(t) {
  const e = t.target.value;
  this.selectedUmbraco = e, v(this, b, P).call(this);
};
P = function() {
  var t, e, r, a;
  this.filteredData = structuredClone(this.data), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((s) => s.name.toLowerCase().includes(this.searchName))), this.selectedNamespace !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((s) => s.namespace === this.selectedNamespace)), this.selectedInherits !== "" && (this.filteredData = (r = this.filteredData) == null ? void 0 : r.filter((s) => s.baseType === this.selectedInherits)), this.selectedUmbraco !== "" && (this.filteredData = (a = this.filteredData) == null ? void 0 : a.filter((s) => s.isUmbraco === (this.selectedUmbraco === "Yes"))), this.filteredData ? this._tableItems = v(this, b, B).call(this, this.filteredData) : this._tableItems = [];
};
f.styles = [
  Z`
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
y([
  w()
], f.prototype, "_tableConfig", 2);
y([
  w()
], f.prototype, "_tableColumns", 2);
y([
  w()
], f.prototype, "_tableItems", 2);
y([
  ee({ type: String })
], f.prototype, "type", 2);
y([
  w()
], f.prototype, "name", 2);
y([
  w()
], f.prototype, "data", 2);
y([
  w()
], f.prototype, "filteredData", 2);
y([
  w()
], f.prototype, "searchName", 2);
y([
  w()
], f.prototype, "namespaces", 2);
y([
  w()
], f.prototype, "selectedNamespace", 2);
y([
  w()
], f.prototype, "inherits", 2);
y([
  w()
], f.prototype, "selectedInherits", 2);
y([
  w()
], f.prototype, "umbraco", 2);
y([
  w()
], f.prototype, "selectedUmbraco", 2);
f = y([
  te("godmode-reflection-browser")
], f);
const mt = f, Ye = {
  type: "workspace",
  alias: "Umb.Workspace.GodModeRoot",
  name: "GodMode Root Workspace",
  element: () => import("./godmode-root-workspace.element-ZL380WUF.js"),
  meta: {
    entityType: "godmode-root"
  }
}, Qe = [Ye], ge = {
  type: "workspace",
  kind: "routable",
  alias: "Umb.Workspace.GodMode",
  name: "God Mode Workspace",
  api: () => import("./godmode-workspace.context-Cm-cLUt-.js"),
  meta: {
    entityType: "godmode"
  }
}, Xe = {
  type: "workspaceView",
  alias: "Umb.WorkspaceView.GodMode.View",
  name: "God Mode Workspace View",
  element: () => import("./godmode-workspace-editor.element-DBafgsoF.js"),
  weight: 90,
  meta: {
    label: "View",
    pathname: "browse",
    icon: "edit"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: ge.alias
    }
  ]
}, Ke = [
  ge,
  Xe
], Ze = {
  type: "workspace",
  alias: "Umb.Workspace.GodModeFolder",
  name: "GodMode Folder Workspace",
  element: () => import("./godmode-folder-workspace.element-DzauzN9n.js"),
  meta: {
    entityType: "godmode-folder"
  }
}, et = [Ze], tt = [
  ...Qe,
  ...Ke,
  ...et
], rt = [
  {
    type: "menuItem",
    kind: "tree",
    alias: "Umb.MenuItem.GodMode",
    name: "God Mode Menu Item",
    weight: 100,
    meta: {
      label: "God Mode",
      icon: "icon-sience",
      entityType: "godmode-root",
      treeAlias: "Umb.Tree.GodMode",
      menus: ["Umb.Menu.AdvancedSettings"]
    }
  }
];
new Ce("GodModeTreeStore");
const at = [
  {
    type: "repository",
    alias: Be,
    name: "God Mode Tree Repository",
    api: () => import("./godmode-tree.repository-CXxxepPR.js")
  },
  {
    type: "tree",
    kind: "default",
    alias: Re,
    name: "God Mode Tree",
    meta: {
      repositoryAlias: "Umb.Repository.GodMode.Tree"
    }
  },
  {
    type: "treeItem",
    kind: "default",
    alias: "Umb.TreeItem.GodMode",
    name: "God Mode Tree Item",
    forEntityTypes: ["godmode-root", "godmode", "godmode-folder"]
  }
], ft = (t, e) => {
  e.registerMany([
    ...tt,
    ...rt,
    ...at
  ]), t.consumeContext(we, async (r) => {
    if (!r) return;
    const a = r.getOpenApiConfiguration();
    c.setConfig({
      baseUrl: a.base,
      auth: async () => await r.getLatestToken(),
      credentials: a.credentials
    }), c.interceptors.request.use(async (s, d) => {
      const i = await a.token();
      return s.headers.set("Authorization", `Bearer ${i}`), s;
    });
  });
};
export {
  M as G,
  mt as a,
  Re as b,
  Be as c,
  ot as d,
  j as e,
  f,
  ft as o,
  Ve as s
};
//# sourceMappingURL=index-D2VaFLfx.js.map
