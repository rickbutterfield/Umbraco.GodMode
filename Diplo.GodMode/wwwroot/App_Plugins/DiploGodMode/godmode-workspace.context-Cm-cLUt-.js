import { UmbWorkspaceRouteManager as p } from "@umbraco-cms/backoffice/workspace";
import { a as i } from "./index-D2VaFLfx.js";
import { UmbControllerBase as n } from "@umbraco-cms/backoffice/class-api";
class d extends n {
  constructor(t) {
    super(t), this.workspaceAlias = "Umb.Workspace.GodMode", this.routes = new p(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-Ddb43FFb.js")
      },
      {
        path: "edit/templateBrowser",
        component: () => import("./godmode-template-browser.element-CT62vqiA.js")
      },
      {
        path: "edit/partialBrowser",
        component: () => import("./godmode-partial-browser.element-Z6YvdJdA.js")
      },
      {
        path: "edit/dataTypeBrowser",
        component: () => import("./godmode-datatype-browser.element-DqpAmFJZ.js")
      },
      {
        path: "edit/contentBrowser",
        component: () => import("./godmode-content-browser.element-CqrpHAGK.js")
      },
      {
        path: "edit/usageBrowser",
        component: () => import("./godmode-usage-browser.element-Cl0KhUNe.js")
      },
      {
        path: "edit/mediaBrowser",
        component: () => import("./godmode-media-browser.element-Cgr8HVLl.js")
      },
      {
        path: "edit/memberBrowser",
        component: () => import("./godmode-member-browser.element-BliNd0RQ.js")
      },
      {
        path: "edit/tagBrowser",
        component: () => import("./godmode-tag-browser.element-Cv7oqMNB.js")
      },
      {
        path: "edit/serviceBrowser",
        component: () => import("./godmode-services-browser.element-DkqJdYai.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-Bqk-kQxT.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-CizrqsjY.js")
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
        component: () => import("./godmode-interface-browser.element-D8VVtV_E.js")
      },
      {
        path: "edit/types",
        component: () => import("./godmode-types-intro.element-Djh08FaU.js")
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
//# sourceMappingURL=godmode-workspace.context-Cm-cLUt-.js.map
