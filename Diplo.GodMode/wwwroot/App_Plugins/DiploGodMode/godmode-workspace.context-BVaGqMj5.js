import { UmbWorkspaceRouteManager as p } from "@umbraco-cms/backoffice/workspace";
import { a as i } from "./index-olPh7UBx.js";
import { UmbControllerBase as n } from "@umbraco-cms/backoffice/class-api";
class d extends n {
  constructor(t) {
    super(t), this.workspaceAlias = "Umb.Workspace.GodMode", this.routes = new p(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-DP7TrJtA.js")
      },
      {
        path: "edit/templateBrowser",
        component: () => import("./godmode-template-browser.element-DVvRdmiV.js")
      },
      {
        path: "edit/partialBrowser",
        component: () => import("./godmode-partial-browser.element-CM43zag5.js")
      },
      {
        path: "edit/dataTypeBrowser",
        component: () => import("./godmode-datatype-browser.element-7mv0pJTR.js")
      },
      {
        path: "edit/contentBrowser",
        component: () => import("./godmode-content-browser.element-DhfoVYb8.js")
      },
      {
        path: "edit/usageBrowser",
        component: () => import("./godmode-usage-browser.element-DB-3aevv.js")
      },
      {
        path: "edit/mediaBrowser",
        component: () => import("./godmode-media-browser.element-B4fuIJ5b.js")
      },
      {
        path: "edit/memberBrowser",
        component: () => import("./godmode-member-browser.element-D8Qtswuw.js")
      },
      {
        path: "edit/tagBrowser",
        component: () => import("./godmode-tag-browser.element-B-TvJKmf.js")
      },
      {
        path: "edit/serviceBrowser",
        component: () => import("./godmode-services-browser.element-BuDRPgAB.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-dDLfuhHZ.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-DWy6JiXz.js")
      },
      {
        path: "edit/reflectionBrowser/:unique",
        component: i,
        setup: async (e, o) => {
          const r = o.match.params.unique;
          e.type = r;
        }
      },
      {
        path: "edit/typeBrowser",
        component: () => import("./godmode-interface-browser.element-BNbcg4hW.js")
      },
      {
        path: "edit/types",
        component: () => import("./godmode-types-intro.element-C9eYikvT.js")
      }
    ]);
  }
  getEntityType() {
    return "godmode";
  }
}
export {
  d as GodModeWorkspaceContext,
  d as api
};
//# sourceMappingURL=godmode-workspace.context-BVaGqMj5.js.map
