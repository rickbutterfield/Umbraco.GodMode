import { UMB_AUTH_CONTEXT as De } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as te } from "@umbraco-cms/backoffice/element-api";
import { LitElement as re, ifDefined as ae, html as x, css as ce, property as ne, customElement as ie, state as v } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as U } from "@umbraco-cms/backoffice/resources";
import { UmbUniqueTreeStore as we } from "@umbraco-cms/backoffice/tree";
import { UmbContextToken as Ie } from "@umbraco-cms/backoffice/context-api";
const Se = {
  bodySerializer: (t) => JSON.stringify(
    t,
    (e, r) => typeof r == "bigint" ? r.toString() : r
  )
}, Ve = ({
  onRequest: t,
  onSseError: e,
  onSseEvent: r,
  responseTransformer: c,
  responseValidator: n,
  sseDefaultRetryDelay: u,
  sseMaxRetryAttempts: i,
  sseMaxRetryDelay: m,
  sseSleepFn: d,
  url: o,
  ...s
}) => {
  let g;
  const B = d ?? ((l) => new Promise((f) => setTimeout(f, l)));
  return { stream: async function* () {
    let l = u ?? 3e3, f = 0;
    const I = s.signal ?? new AbortController().signal;
    for (; !I.aborted; ) {
      f++;
      const E = s.headers instanceof Headers ? s.headers : new Headers(s.headers);
      g !== void 0 && E.set("Last-Event-ID", g);
      try {
        const S = {
          redirect: "follow",
          ...s,
          body: s.serializedBody,
          headers: E,
          signal: I
        };
        let C = new Request(o, S);
        t && (C = await t(o, S));
        const M = await (s.fetch ?? globalThis.fetch)(C);
        if (!M.ok)
          throw new Error(
            `SSE failed: ${M.status} ${M.statusText}`
          );
        if (!M.body) throw new Error("No body in SSE response");
        const T = M.body.pipeThrough(new TextDecoderStream()).getReader();
        let k = "";
        const F = () => {
          try {
            T.cancel();
          } catch {
          }
        };
        I.addEventListener("abort", F);
        try {
          for (; ; ) {
            const { done: Ae, value: Ce } = await T.read();
            if (Ae) break;
            k += Ce;
            const L = k.split(`

`);
            k = L.pop() ?? "";
            for (const Te of L) {
              const Ue = Te.split(`
`), j = [];
              let J;
              for (const A of Ue)
                if (A.startsWith("data:"))
                  j.push(A.replace(/^data:\s*/, ""));
                else if (A.startsWith("event:"))
                  J = A.replace(/^event:\s*/, "");
                else if (A.startsWith("id:"))
                  g = A.replace(/^id:\s*/, "");
                else if (A.startsWith("retry:")) {
                  const Q = Number.parseInt(
                    A.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(Q) || (l = Q);
                }
              let V, Y = !1;
              if (j.length) {
                const A = j.join(`
`);
                try {
                  V = JSON.parse(A), Y = !0;
                } catch {
                  V = A;
                }
              }
              Y && (n && await n(V), c && (V = await c(V))), r == null || r({
                data: V,
                event: J,
                id: g,
                retry: l
              }), j.length && (yield V);
            }
          }
        } finally {
          I.removeEventListener("abort", F), T.releaseLock();
        }
        break;
      } catch (S) {
        if (e == null || e(S), i !== void 0 && f >= i)
          break;
        const C = Math.min(
          l * 2 ** (f - 1),
          m ?? 3e4
        );
        await B(C);
      }
    }
  }() };
}, Be = (t) => {
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
}, Ee = (t) => {
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
}, _e = (t) => {
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
}, se = ({
  allowReserved: t,
  explode: e,
  name: r,
  style: c,
  value: n
}) => {
  if (!e) {
    const m = (t ? n : n.map((d) => encodeURIComponent(d))).join(Ee(c));
    switch (c) {
      case "label":
        return `.${m}`;
      case "matrix":
        return `;${r}=${m}`;
      case "simple":
        return m;
      default:
        return `${r}=${m}`;
    }
  }
  const u = Be(c), i = n.map((m) => c === "label" || c === "simple" ? t ? m : encodeURIComponent(m) : $({
    allowReserved: t,
    name: r,
    value: m
  })).join(u);
  return c === "label" || c === "matrix" ? u + i : i;
}, $ = ({
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
}, me = ({
  allowReserved: t,
  explode: e,
  name: r,
  style: c,
  value: n,
  valueOnly: u
}) => {
  if (n instanceof Date)
    return u ? n.toISOString() : `${r}=${n.toISOString()}`;
  if (c !== "deepObject" && !e) {
    let d = [];
    Object.entries(n).forEach(([s, g]) => {
      d = [
        ...d,
        s,
        t ? g : encodeURIComponent(g)
      ];
    });
    const o = d.join(",");
    switch (c) {
      case "form":
        return `${r}=${o}`;
      case "label":
        return `.${o}`;
      case "matrix":
        return `;${r}=${o}`;
      default:
        return o;
    }
  }
  const i = _e(c), m = Object.entries(n).map(
    ([d, o]) => $({
      allowReserved: t,
      name: c === "deepObject" ? `${r}[${d}]` : d,
      value: o
    })
  ).join(i);
  return c === "label" || c === "matrix" ? i + m : m;
}, Pe = /\{[^{}]+\}/g, je = ({ path: t, url: e }) => {
  let r = e;
  const c = e.match(Pe);
  if (c)
    for (const n of c) {
      let u = !1, i = n.substring(1, n.length - 1), m = "simple";
      i.endsWith("*") && (u = !0, i = i.substring(0, i.length - 1)), i.startsWith(".") ? (i = i.substring(1), m = "label") : i.startsWith(";") && (i = i.substring(1), m = "matrix");
      const d = t[i];
      if (d == null)
        continue;
      if (Array.isArray(d)) {
        r = r.replace(
          n,
          se({ explode: u, name: i, style: m, value: d })
        );
        continue;
      }
      if (typeof d == "object") {
        r = r.replace(
          n,
          me({
            explode: u,
            name: i,
            style: m,
            value: d,
            valueOnly: !0
          })
        );
        continue;
      }
      if (m === "matrix") {
        r = r.replace(
          n,
          `;${$({
            name: i,
            value: d
          })}`
        );
        continue;
      }
      const o = encodeURIComponent(
        m === "label" ? `.${d}` : d
      );
      r = r.replace(n, o);
    }
  return r;
}, xe = ({
  baseUrl: t,
  path: e,
  query: r,
  querySerializer: c,
  url: n
}) => {
  const u = n.startsWith("/") ? n : `/${n}`;
  let i = (t ?? "") + u;
  e && (i = je({ path: e, url: i }));
  let m = r ? c(r) : "";
  return m.startsWith("?") && (m = m.substring(1)), m && (i += `?${m}`), i;
};
function Oe(t) {
  const e = t.body !== void 0;
  if (e && t.bodySerializer)
    return "serializedBody" in t ? t.serializedBody !== void 0 && t.serializedBody !== "" ? t.serializedBody : null : t.body !== "" ? t.body : null;
  if (e)
    return t.body;
}
const Ne = async (t, e) => {
  const r = typeof e == "function" ? await e(t) : e;
  if (r)
    return t.scheme === "bearer" ? `Bearer ${r}` : t.scheme === "basic" ? `Basic ${btoa(r)}` : r;
}, ue = ({
  allowReserved: t,
  array: e,
  object: r
} = {}) => (n) => {
  const u = [];
  if (n && typeof n == "object")
    for (const i in n) {
      const m = n[i];
      if (m != null)
        if (Array.isArray(m)) {
          const d = se({
            allowReserved: t,
            explode: !0,
            name: i,
            style: "form",
            value: m,
            ...e
          });
          d && u.push(d);
        } else if (typeof m == "object") {
          const d = me({
            allowReserved: t,
            explode: !0,
            name: i,
            style: "deepObject",
            value: m,
            ...r
          });
          d && u.push(d);
        } else {
          const d = $({
            allowReserved: t,
            name: i,
            value: m
          });
          d && u.push(d);
        }
    }
  return u.join("&");
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
      (c) => e.startsWith(c)
    ))
      return "blob";
    if (e.startsWith("text/"))
      return "text";
  }
}, Re = (t, e) => {
  var r, c;
  return e ? !!(t.headers.has(e) || (r = t.query) != null && r[e] || (c = t.headers.get("Cookie")) != null && c.includes(`${e}=`)) : !1;
}, ke = async ({
  security: t,
  ...e
}) => {
  for (const r of t) {
    if (Re(e, r.name))
      continue;
    const c = await Ne(r, e.auth);
    if (!c)
      continue;
    const n = r.name ?? "Authorization";
    switch (r.in) {
      case "query":
        e.query || (e.query = {}), e.query[n] = c;
        break;
      case "cookie":
        e.headers.append("Cookie", `${n}=${c}`);
        break;
      case "header":
      default:
        e.headers.set(n, c);
        break;
    }
  }
}, X = (t) => xe({
  baseUrl: t.baseUrl,
  path: t.path,
  query: t.query,
  querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : ue(t.querySerializer),
  url: t.url
}), K = (t, e) => {
  var c;
  const r = { ...t, ...e };
  return (c = r.baseUrl) != null && c.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = de(t.headers, e.headers), r;
}, ze = (t) => {
  const e = [];
  return t.forEach((r, c) => {
    e.push([c, r]);
  }), e;
}, de = (...t) => {
  const e = new Headers();
  for (const r of t) {
    if (!r)
      continue;
    const c = r instanceof Headers ? ze(r) : Object.entries(r);
    for (const [n, u] of c)
      if (u === null)
        e.delete(n);
      else if (Array.isArray(u))
        for (const i of u)
          e.append(n, i);
      else u !== void 0 && e.set(
        n,
        typeof u == "object" ? JSON.stringify(u) : u
      );
  }
  return e;
};
class z {
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
    const c = this.getInterceptorIndex(e);
    return this.fns[c] ? (this.fns[c] = r, e) : !1;
  }
  use(e) {
    return this.fns.push(e), this.fns.length - 1;
  }
}
const qe = () => ({
  error: new z(),
  request: new z(),
  response: new z()
}), We = ue({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), He = {
  "Content-Type": "application/json"
}, le = (t = {}) => ({
  ...Se,
  headers: He,
  parseAs: "auto",
  querySerializer: We,
  ...t
}), Fe = (t = {}) => {
  let e = K(le(), t);
  const r = () => ({ ...e }), c = (o) => (e = K(e, o), r()), n = qe(), u = async (o) => {
    const s = {
      ...e,
      ...o,
      fetch: o.fetch ?? e.fetch ?? globalThis.fetch,
      headers: de(e.headers, o.headers),
      serializedBody: void 0
    };
    s.security && await ke({
      ...s,
      security: s.security
    }), s.requestValidator && await s.requestValidator(s), s.body !== void 0 && s.bodySerializer && (s.serializedBody = s.bodySerializer(s.body)), (s.body === void 0 || s.serializedBody === "") && s.headers.delete("Content-Type");
    const g = X(s);
    return { opts: s, url: g };
  }, i = async (o) => {
    const { opts: s, url: g } = await u(o), B = {
      redirect: "follow",
      ...s,
      body: Oe(s)
    };
    let w = new Request(g, B);
    for (const b of n.request.fns)
      b && (w = await b(w, s));
    const P = s.fetch;
    let l = await P(w);
    for (const b of n.response.fns)
      b && (l = await b(l, w, s));
    const f = {
      request: w,
      response: l
    };
    if (l.ok) {
      const b = (s.parseAs === "auto" ? $e(l.headers.get("Content-Type")) : s.parseAs) ?? "json";
      if (l.status === 204 || l.headers.get("Content-Length") === "0") {
        let T;
        switch (b) {
          case "arrayBuffer":
          case "blob":
          case "text":
            T = await l[b]();
            break;
          case "formData":
            T = new FormData();
            break;
          case "stream":
            T = l.body;
            break;
          case "json":
          default:
            T = {};
            break;
        }
        return s.responseStyle === "data" ? T : {
          data: T,
          ...f
        };
      }
      let M;
      switch (b) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          M = await l[b]();
          break;
        case "stream":
          return s.responseStyle === "data" ? l.body : {
            data: l.body,
            ...f
          };
      }
      return b === "json" && (s.responseValidator && await s.responseValidator(M), s.responseTransformer && (M = await s.responseTransformer(M))), s.responseStyle === "data" ? M : {
        data: M,
        ...f
      };
    }
    const I = await l.text();
    let E;
    try {
      E = JSON.parse(I);
    } catch {
    }
    const S = E ?? I;
    let C = S;
    for (const b of n.error.fns)
      b && (C = await b(S, l, w, s));
    if (C = C || {}, s.throwOnError)
      throw C;
    return s.responseStyle === "data" ? void 0 : {
      error: C,
      ...f
    };
  }, m = (o) => (s) => i({ ...s, method: o }), d = (o) => async (s) => {
    const { opts: g, url: B } = await u(s);
    return Ve({
      ...g,
      body: g.body,
      headers: g.headers,
      method: o,
      onRequest: async (w, P) => {
        let l = new Request(w, P);
        for (const f of n.request.fns)
          f && (l = await f(l, g));
        return l;
      },
      url: B
    });
  };
  return {
    buildUrl: X,
    connect: m("CONNECT"),
    delete: m("DELETE"),
    get: m("GET"),
    getConfig: r,
    head: m("HEAD"),
    interceptors: n,
    options: m("OPTIONS"),
    patch: m("PATCH"),
    post: m("POST"),
    put: m("PUT"),
    request: i,
    setConfig: c,
    sse: {
      connect: d("CONNECT"),
      delete: d("DELETE"),
      get: d("GET"),
      head: d("HEAD"),
      options: d("OPTIONS"),
      patch: d("PATCH"),
      post: d("POST"),
      put: d("PUT"),
      trace: d("TRACE")
    },
    trace: m("TRACE")
  };
}, a = Fe(le({
  baseUrl: "http://localhost:26095",
  throwOnError: !0
})), Le = "Umb.Repository.GodMode.Tree", Je = "Umb.Store.GodMode.Tree", Ye = "Umb.Tree.GodMode";
var Qe = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, oe = (t, e, r, c) => {
  for (var n = c > 1 ? void 0 : c ? Xe(e, r) : e, u = t.length - 1, i; u >= 0; u--)
    (i = t[u]) && (n = (c ? i(e, r, n) : i(n)) || n);
  return c && n && Qe(e, r, n), n;
};
let O = class extends te(re) {
  constructor() {
    super();
  }
  render() {
    return x`
            <div class="header">
                <uui-icon name="icon-sience"></uui-icon>
                <h3>God Mode ${ae(this.name)}</h3>
            </div>
        `;
  }
};
O.styles = [
  ce`
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
oe([
  ne({ type: String, attribute: !0 })
], O.prototype, "name", 2);
O = oe([
  ie("godmode-header")
], O);
const N = {
  ASCENDING: "Ascending",
  DESCENDING: "Descending"
};
class Ke {
  static putUmbracoManagementApiV11DocumentByIdValidate11(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1.1/document/{id}/validate",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
}
const W = class W {
};
W.documentByIdValidate1Service = Ke;
let q = W;
const H = class H {
  static getCollectionDocumentById(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/collection/document/{id}",
      ...e
    });
  }
  static postDocument(e) {
    return ((e == null ? void 0 : e.client) ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static deleteDocumentById(e) {
    return (e.client ?? a).delete({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}",
      ...e
    });
  }
  static getDocumentById(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}",
      ...e
    });
  }
  static putDocumentById(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static getDocumentByIdAuditLog(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/audit-log",
      ...e
    });
  }
  /**
   * @deprecated
   */
  static getDocumentByIdAvailableSegmentOptions(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/available-segment-options",
      ...e
    });
  }
  static postDocumentByIdCopy(e) {
    return (e.client ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/copy",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static getDocumentByIdDomains(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/domains",
      ...e
    });
  }
  static putDocumentByIdDomains(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/domains",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static putDocumentByIdMove(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/move",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static putDocumentByIdMoveToRecycleBin(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/move-to-recycle-bin",
      ...e
    });
  }
  static getDocumentByIdNotifications(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/notifications",
      ...e
    });
  }
  static putDocumentByIdNotifications(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/notifications",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static getDocumentByIdPreviewUrl(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/preview-url",
      ...e
    });
  }
  static deleteDocumentByIdPublicAccess(e) {
    return (e.client ?? a).delete({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/public-access",
      ...e
    });
  }
  static getDocumentByIdPublicAccess(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/public-access",
      ...e
    });
  }
  static postDocumentByIdPublicAccess(e) {
    return (e.client ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/public-access",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static putDocumentByIdPublicAccess(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/public-access",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static putDocumentByIdPublish(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/publish",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static putDocumentByIdPublishWithDescendants(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/publish-with-descendants",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static getDocumentByIdPublishWithDescendantsResultByTaskId(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/publish-with-descendants/result/{taskId}",
      ...e
    });
  }
  static getDocumentByIdPublished(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/published",
      ...e
    });
  }
  static getDocumentByIdReferencedBy(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/referenced-by",
      ...e
    });
  }
  static getDocumentByIdReferencedDescendants(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/referenced-descendants",
      ...e
    });
  }
  static putDocumentByIdUnpublish(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/{id}/unpublish",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static getDocumentAreReferenced(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/are-referenced",
      ...e
    });
  }
  static getDocumentConfiguration(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/configuration",
      ...e
    });
  }
  static putDocumentSort(e) {
    return ((e == null ? void 0 : e.client) ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/sort",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static getDocumentUrls(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/urls",
      ...e
    });
  }
  static postDocumentValidate(e) {
    return ((e == null ? void 0 : e.client) ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/document/validate",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e == null ? void 0 : e.headers
      }
    });
  }
  static getItemDocument(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/item/document",
      ...e
    });
  }
  static getItemDocumentSearch(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/item/document/search",
      ...e
    });
  }
  static deleteRecycleBinDocument(e) {
    return ((e == null ? void 0 : e.client) ?? a).delete({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/recycle-bin/document",
      ...e
    });
  }
  static deleteRecycleBinDocumentById(e) {
    return (e.client ?? a).delete({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/recycle-bin/document/{id}",
      ...e
    });
  }
  static getRecycleBinDocumentByIdOriginalParent(e) {
    return (e.client ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/recycle-bin/document/{id}/original-parent",
      ...e
    });
  }
  static putRecycleBinDocumentByIdRestore(e) {
    return (e.client ?? a).put({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/recycle-bin/document/{id}/restore",
      ...e,
      headers: {
        "Content-Type": "application/json",
        ...e.headers
      }
    });
  }
  static getRecycleBinDocumentChildren(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/recycle-bin/document/children",
      ...e
    });
  }
  static getRecycleBinDocumentReferencedBy(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/recycle-bin/document/referenced-by",
      ...e
    });
  }
  static getRecycleBinDocumentRoot(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/recycle-bin/document/root",
      ...e
    });
  }
  static getRecycleBinDocumentSiblings(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/recycle-bin/document/siblings",
      ...e
    });
  }
  static getTreeDocumentAncestors(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/tree/document/ancestors",
      ...e
    });
  }
  static getTreeDocumentChildren(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/tree/document/children",
      ...e
    });
  }
  static getTreeDocumentRoot(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/tree/document/root",
      ...e
    });
  }
  static getTreeDocumentSiblings(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/tree/document/siblings",
      ...e
    });
  }
};
H.putUmbracoManagementApiV1Service = q;
let Z = H;
class D {
  static postUmbracoManagementApiV1GodModeClearUmbracoCache(e) {
    return ((e == null ? void 0 : e.client) ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/ClearUmbracoCache",
      ...e
    });
  }
  static postUmbracoManagementApiV1GodModeCopyDataType(e) {
    return ((e == null ? void 0 : e.client) ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/CopyDataType",
      ...e
    });
  }
  static postUmbracoManagementApiV1GodModeDeleteTag(e) {
    return ((e == null ? void 0 : e.client) ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/DeleteTag",
      ...e
    });
  }
  static postUmbracoManagementApiV1GodModeFixTemplateMasters(e) {
    return ((e == null ? void 0 : e.client) ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/FixTemplateMasters",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetApiControllers(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetApiControllers",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetAssemblies(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetAssemblies",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetAssembliesWithInterfaces(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetAssembliesWithInterfaces",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetComposers(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetComposers",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetCompositions(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetCompositions",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetConfig(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetConfig",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetContentFinders(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetContentFinders",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetContentPaged(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetContentPaged",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetContentTypeAliases(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetContentTypeAliases",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetContentTypeMap(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetContentTypeMap",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetContentUsageData(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetContentUsageData",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetDataTypes(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetDataTypes",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetDataTypesStatus(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetDataTypesStatus",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetEnvironmentDiagnostics(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetEnvironmentDiagnostics",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetInterfacesFrom(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetInterfacesFrom",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetLanguages(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetLanguages",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetMedia(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetMedia",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetMediaTypes(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetMediaTypes",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetMemberGroups(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetMemberGroups",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetMembersPaged(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetMembersPaged",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetNonMsAssemblies(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetNonMsAssemblies",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetNuCacheItem(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetNuCacheItem",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetNuCacheType(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetNuCacheType",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetOrphanedTags(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetOrphanedTags",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetPropertyEditors(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetPropertyEditors",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetPropertyGroups(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetPropertyGroups",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetPropertyValueConverters(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetPropertyValueConverters",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetPublishedContentModels(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetPublishedContentModels",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetRegisteredServices(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetRegisteredServices",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetRenderMvcControllers(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetRenderMvcControllers",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetStandardContentTypeAliases(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetStandardContentTypeAliases",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetSurfaceControllers(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetSurfaceControllers",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetTagHelpers(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetTagHelpers",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetTagMapping(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetTagMapping",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetTemplates(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetTemplates",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetTemplateUrlsToPing(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetTemplateUrlsToPing",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetTypesAssignableFrom(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetTypesAssignableFrom",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetTypesFrom(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetTypesFrom",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetUmbracoAssemblies(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetUmbracoAssemblies",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetUrlProviders(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetUrlProviders",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetUrlsToPing(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetUrlsToPing",
      ...e
    });
  }
  static getUmbracoManagementApiV1GodModeGetViewComponents(e) {
    return ((e == null ? void 0 : e.client) ?? a).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/GetViewComponents",
      ...e
    });
  }
  static postUmbracoManagementApiV1GodModePurgeMediaCache(e) {
    return ((e == null ? void 0 : e.client) ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/PurgeMediaCache",
      ...e
    });
  }
  static postUmbracoManagementApiV1GodModeRestartAppPool(e) {
    return ((e == null ? void 0 : e.client) ?? a).post({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/management/api/v1/god-mode/RestartAppPool",
      ...e
    });
  }
}
const Ze = (t, e, r) => e && r ? t.sort((c, n) => {
  const u = c[e], i = n[e];
  return u < i ? r === N.ASCENDING ? -1 : 1 : u > i ? r === N.ASCENDING ? 1 : -1 : 0;
}) : t;
var et = Object.defineProperty, tt = Object.getOwnPropertyDescriptor, he = (t) => {
  throw TypeError(t);
}, p = (t, e, r, c) => {
  for (var n = c > 1 ? void 0 : c ? tt(e, r) : e, u = t.length - 1, i; u >= 0; u--)
    (i = t[u]) && (n = (c ? i(e, r, n) : i(n)) || n);
  return c && n && et(e, r, n), n;
}, rt = (t, e, r) => e.has(t) || he("Cannot " + r), at = (t, e, r) => e.has(t) ? he("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), G = (t, e, r) => (rt(t, e, "access private method"), r), y, ge, be, R, ye, pe, fe, Ge, _;
let h = class extends te(re) {
  constructor() {
    super(), at(this, y), this._tableConfig = {
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
    super.connectedCallback(), G(this, y, be).call(this);
  }
  render() {
    return x`
            <umb-body-layout>
                <godmode-header name=${ae(this.name)} slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Search names"
                                .value=${this.searchName}
                                @input=${G(this, y, ye)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>In Namespace:</uui-label>
                            <uui-select
                                .options=${this.namespaces}
                                .value=${this.selectedNamespace}
                                @change=${G(this, y, pe)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Inherits From:</uui-label>
                            <uui-select
                                .options=${this.inherits}
                                .value=${this.selectedInherits}
                                @change=${G(this, y, fe)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Is Umbraco?</uui-label>
                            <uui-select
                                .options=${this.umbraco}
                                .value=${this.selectedUmbraco}
                                @change=${G(this, y, Ge)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? x`
                        <uui-box style="--uui-box-default-padding: 0;">
                            <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${G(this, y, ge)} />
                        </uui-box>
                    ` : x``}
            </umb-body-layout>
        `;
  }
};
y = /* @__PURE__ */ new WeakSet();
ge = function(t) {
  const e = t.target, r = e.orderingColumn, c = e.orderingDesc;
  this.filteredData = Ze(structuredClone(this.data), r, c ? N.DESCENDING : N.ASCENDING), this._tableItems = G(this, y, R).call(this, this.filteredData);
};
be = async function() {
  if (this.type) {
    let t = {};
    if (this.type === "surface" && (this.name = "Surface Controller Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetSurfaceControllers())), this.type === "api" && (this.name = "API Controller Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetApiControllers())), this.type === "render" && (this.name = "RenderMvc Controller Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetRenderMvcControllers())), this.type === "models" && (this.name = "Published Content Model Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetPublishedContentModels())), this.type === "composers" && (this.name = "Composer Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetComposers())), this.type === "converters" && (this.name = "Property Value Converter Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetRenderMvcControllers())), this.type === "components" && (this.name = "View Component Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetViewComponents())), this.type === "taghelpers" && (this.name = "Tag Helpers Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetTagHelpers())), this.type === "finders" && (this.name = "Content Finders Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetContentFinders())), this.type === "urlproviders" && (this.name = "URL Providers Browser", t = await U(this, D.getUmbracoManagementApiV1GodModeGetUrlProviders())), t && t.data) {
      this.data = t.data, this.filteredData = structuredClone(this.data), this._tableItems = G(this, y, R).call(this, this.filteredData);
      let e = [...new Set(this.data.map((c) => c.namespace))];
      this.namespaces = e.map((c) => ({ name: c, value: c })), this.namespaces.unshift({ name: "Any", value: "", selected: !0 });
      let r = [...new Set(this.data.map((c) => c.baseType))];
      this.inherits = r.map((c) => ({ name: c, value: c })), this.inherits.unshift({ name: "Any", value: "", selected: !0 });
    }
  }
};
R = function(t) {
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
ye = function(t) {
  const e = t.target.value;
  this.searchName = e, G(this, y, _).call(this);
};
pe = function(t) {
  const e = t.target.value;
  this.selectedNamespace = e, G(this, y, _).call(this);
};
fe = function(t) {
  const e = t.target.value;
  this.selectedInherits = e, G(this, y, _).call(this);
};
Ge = function(t) {
  const e = t.target.value;
  this.selectedUmbraco = e, G(this, y, _).call(this);
};
_ = function() {
  var t, e, r, c;
  this.filteredData = structuredClone(this.data), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((n) => n.name.toLowerCase().includes(this.searchName))), this.selectedNamespace !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((n) => n.namespace === this.selectedNamespace)), this.selectedInherits !== "" && (this.filteredData = (r = this.filteredData) == null ? void 0 : r.filter((n) => n.baseType === this.selectedInherits)), this.selectedUmbraco !== "" && (this.filteredData = (c = this.filteredData) == null ? void 0 : c.filter((n) => n.isUmbraco === (this.selectedUmbraco === "Yes"))), this.filteredData ? this._tableItems = G(this, y, R).call(this, this.filteredData) : this._tableItems = [];
};
h.styles = [
  ce`
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
p([
  v()
], h.prototype, "_tableConfig", 2);
p([
  v()
], h.prototype, "_tableColumns", 2);
p([
  v()
], h.prototype, "_tableItems", 2);
p([
  ne({ type: String })
], h.prototype, "type", 2);
p([
  v()
], h.prototype, "name", 2);
p([
  v()
], h.prototype, "data", 2);
p([
  v()
], h.prototype, "filteredData", 2);
p([
  v()
], h.prototype, "searchName", 2);
p([
  v()
], h.prototype, "namespaces", 2);
p([
  v()
], h.prototype, "selectedNamespace", 2);
p([
  v()
], h.prototype, "inherits", 2);
p([
  v()
], h.prototype, "selectedInherits", 2);
p([
  v()
], h.prototype, "umbraco", 2);
p([
  v()
], h.prototype, "selectedUmbraco", 2);
h = p([
  ie("godmode-reflection-browser")
], h);
const vt = h, ct = {
  type: "workspace",
  alias: "Umb.Workspace.GodModeRoot",
  name: "GodMode Root Workspace",
  element: () => import("./godmode-root-workspace.element-Dm0ErLiU.js"),
  meta: {
    entityType: "godmode-root"
  }
}, nt = [ct], ve = {
  type: "workspace",
  kind: "routable",
  alias: "Umb.Workspace.GodMode",
  name: "God Mode Workspace",
  api: () => import("./godmode-workspace.context-DibtSpue.js"),
  meta: {
    entityType: "godmode"
  }
}, it = {
  type: "workspaceView",
  alias: "Umb.WorkspaceView.GodMode.View",
  name: "God Mode Workspace View",
  element: () => import("./godmode-workspace-editor.element-B_ct3jm1.js"),
  weight: 90,
  meta: {
    label: "View",
    pathname: "browse",
    icon: "edit"
  },
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: ve.alias
    }
  ]
}, st = [
  ve,
  it
], mt = {
  type: "workspace",
  alias: "Umb.Workspace.GodModeFolder",
  name: "GodMode Folder Workspace",
  element: () => import("./godmode-folder-workspace.element-kZ3FJJfC.js"),
  meta: {
    entityType: "godmode-folder"
  }
}, ut = [mt], dt = [
  ...nt,
  ...st,
  ...ut
], lt = [
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
class ee extends we {
  constructor(e) {
    super(e, Me.toString());
  }
}
const Me = new Ie("GodModeTreeStore"), ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GOD_MODE_TREE_STORE_CONTEXT: Me,
  GodModeTreeStore: ee,
  default: ee
}, Symbol.toStringTag, { value: "Module" })), ht = [
  {
    type: "repository",
    alias: Le,
    name: "God Mode Tree Repository",
    api: () => import("./godmode-tree.repository-CpepeQ2m.js")
  },
  {
    type: "treeStore",
    alias: Je,
    name: "God Mode Tree Store",
    api: () => Promise.resolve().then(() => ot)
  },
  {
    type: "tree",
    kind: "default",
    alias: Ye,
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
], Mt = (t, e) => {
  e.registerMany([
    ...dt,
    ...lt,
    ...ht
  ]), t.consumeContext(De, async (r) => {
    if (!r) return;
    const c = r.getOpenApiConfiguration();
    a.setConfig({
      baseUrl: c.base,
      auth: async () => await r.getLatestToken(),
      credentials: c.credentials
    });
  });
};
export {
  N as D,
  Me as G,
  D as a,
  vt as b,
  Ye as c,
  Le as d,
  Je as e,
  O as f,
  h as g,
  Mt as o,
  Ze as s
};
//# sourceMappingURL=index-DoLw8Ovk.js.map
