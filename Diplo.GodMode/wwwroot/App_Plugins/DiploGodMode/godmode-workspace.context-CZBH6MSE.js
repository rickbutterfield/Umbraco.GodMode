import { UmbDefaultWorkspaceContext as p, UmbWorkspaceRouteManager as i } from "@umbraco-cms/backoffice/workspace";
import { a as n } from "./index-x45slcvs.js";
class c extends p {
  constructor(t) {
    super(t), this.routes = new i(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-DZdv555t.js")
      },
      {
        path: "edit/templateBrowser",
        component: () => import("./godmode-template-browser.element-wSUng6iN.js")
      },
      {
        path: "edit/partialBrowser",
        component: () => import("./godmode-partial-browser.element-qbU1KxtH.js")
      },
      {
        path: "edit/dataTypeBrowser",
        component: () => import("./godmode-datatype-browser.element-q605pft1.js")
      },
      {
        path: "edit/contentBrowser",
        component: () => import("./godmode-content-browser.element-GNGoRCYi.js")
      },
      {
        path: "edit/usageBrowser",
        component: () => import("./godmode-usage-browser.element-B1UzWjRr.js")
      },
      {
        path: "edit/mediaBrowser",
        component: () => import("./godmode-media-browser.element-WimDFli0.js")
      },
      {
        path: "edit/memberBrowser",
        component: () => import("./godmode-member-browser.element-CH-KR-ED.js")
      },
      {
        path: "edit/tagBrowser",
        component: () => import("./godmode-tag-browser.element-PXkqwflu.js")
      },
      {
        path: "edit/serviceBrowser",
        component: () => import("./godmode-services-browser.element-O69yT87c.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-BlEzaRVy.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-B9TYkIDO.js")
      },
      {
        path: "edit/reflectionBrowser/:unique",
        component: n,
        setup: async (e, o) => {
          const r = o.match.params.unique;
          e.type = r;
        }
      },
      {
        path: "edit/typeBrowser",
        component: () => import("./godmode-interface-browser.element-BzmUx_WT.js")
      }
    ]);
  }
}
export {
  c as GodModeWorkspaceContext,
  c as api
};
//# sourceMappingURL=godmode-workspace.context-CZBH6MSE.js.map
