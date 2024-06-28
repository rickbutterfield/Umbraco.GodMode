import { UmbDefaultWorkspaceContext as o, UmbWorkspaceRouteManager as e } from "@umbraco-cms/backoffice/workspace";
class p extends o {
  constructor(t) {
    super(t), this.routes = new e(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-DZdv555t.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-DfIfuV15.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-BZq3zP_W.js")
      }
    ]);
  }
}
export {
  p as GodModeWorkspaceContext,
  p as api
};
//# sourceMappingURL=godmode-workspace.context-n6Cg_O7V.js.map
