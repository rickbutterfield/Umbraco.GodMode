import { UMB_AUTH_CONTEXT as l } from "@umbraco-cms/backoffice/auth";
import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { LitElement as f, html as M, ifDefined as T, css as u, property as y, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
class m {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const o = this._fns.indexOf(e);
    o !== -1 && (this._fns = [
      ...this._fns.slice(0, o),
      ...this._fns.slice(o + 1)
    ]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const n = {
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
    request: new m(),
    response: new m()
  }
}, G = "Umb.Repository.GodMode.Tree", b = "Umb.Store.GodMode.Tree", L = "Umb.Tree.GodMode";
var A = Object.defineProperty, O = Object.getOwnPropertyDescriptor, c = (i, e, o, t) => {
  for (var s = t > 1 ? void 0 : t ? O(e, o) : e, a = i.length - 1, d; a >= 0; a--)
    (d = i[a]) && (s = (t ? d(e, o, s) : d(s)) || s);
  return t && s && A(e, o, s), s;
};
let r = class extends E(f) {
  constructor() {
    super();
  }
  render() {
    return M`
            <div class="header">
                <uui-icon name="icon-sience"></uui-icon>
                <h3>God Mode ${T(this.name)}</h3>
            </div>
        `;
  }
};
r.styles = [
  u`
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
c([
  y({ type: String, attribute: !0 })
], r.prototype, "name", 2);
r = c([
  _("godmode-header")
], r);
const h = {
  type: "workspace",
  alias: "Umb.Workspace.GodModeRoot",
  name: "GodMode Root Workspace",
  element: () => import("./godmode-root-workspace.element-CSMKM24j.js"),
  meta: {
    entityType: "godmode-root"
  }
}, w = [h], p = {
  type: "workspace",
  kind: "routable",
  alias: "Umb.Workspace.GodMode",
  name: "God Mode Workspace",
  api: () => import("./godmode-workspace.context-n6Cg_O7V.js"),
  meta: {
    entityType: "godmode"
  }
}, S = {
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
      match: p.alias
    }
  ]
}, I = [
  p,
  S
], R = [
  ...w,
  ...I
], g = [
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
], U = {
  type: "repository",
  alias: G,
  name: "God Mode Tree Repository",
  api: () => import("./godmode-tree.repository-DuWPJsUs.js")
}, D = {
  type: "treeStore",
  alias: b,
  name: "God Mode Tree Store",
  api: () => import("./godmode-tree.store-CYDCLcEv.js")
}, v = {
  type: "tree",
  kind: "default",
  alias: "Umb.Tree.GodMode",
  name: "God Mode Tree",
  meta: {
    repositoryAlias: "Umb.Repository.GodMode.Tree"
  }
}, k = {
  type: "treeItem",
  kind: "default",
  alias: "Umb.TreeItem.GodMode",
  name: "God Mode Tree Item",
  forEntityTypes: ["godmode-root", "godmode", "godmode-folder"]
}, C = [
  U,
  D,
  v,
  k
], P = (i, e) => {
  e.registerMany([
    ...R,
    ...g,
    ...C
  ]), i.consumeContext(l, async (o) => {
    if (!o)
      return;
    const t = o.getOpenApiConfiguration();
    n.BASE = t.base, n.TOKEN = t.token, n.WITH_CREDENTIALS = t.withCredentials, n.CREDENTIALS = t.credentials;
  });
};
export {
  L as G,
  n as O,
  G as a,
  b,
  r as c,
  P as o
};
//# sourceMappingURL=index-CXpG9x3b.js.map
