import { UmbDefaultWorkspaceContext as s, UmbWorkspaceRouteManager as n } from "@umbraco-cms/backoffice/workspace";
import { a as p } from "./index-DGc6ps4P.js";
class m extends s {
  constructor(e) {
    super(e), this.routes = new n(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-DZdv555t.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-C_2WBlez.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-CbHKFTAc.js")
      },
      {
        path: "edit/reflectionBrowser/:unique",
        component: p,
        setup: async (t, o) => {
          const r = o.match.params.unique;
          t.type = r;
        }
      }
    ]);
  }
}
export {
  m as GodModeWorkspaceContext,
  m as api
};
//# sourceMappingURL=godmode-workspace.context-DEMqNHHE.js.map
