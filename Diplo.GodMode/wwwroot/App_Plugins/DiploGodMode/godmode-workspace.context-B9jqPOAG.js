import { UmbDefaultWorkspaceContext as e, UmbWorkspaceRouteManager as o } from "@umbraco-cms/backoffice/workspace";
class p extends e {
  constructor(t) {
    super(t), this.routes = new o(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-DZdv555t.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-DemUlwVT.js")
      }
    ]);
  }
}
export {
  p as GodModeWorkspaceContext,
  p as api
};
//# sourceMappingURL=godmode-workspace.context-B9jqPOAG.js.map
