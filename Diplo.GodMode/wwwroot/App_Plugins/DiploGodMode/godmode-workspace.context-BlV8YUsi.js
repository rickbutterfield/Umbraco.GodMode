import { UmbWorkspaceRouteManager as p } from "@umbraco-cms/backoffice/workspace";
import { a as i } from "./index-Car7Rj8s.js";
import { UmbControllerBase as n } from "@umbraco-cms/backoffice/class-api";
class d extends n {
  constructor(t) {
    super(t), this.workspaceAlias = "Umb.Workspace.GodMode", this.routes = new p(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-BG39HrAK.js")
      },
      {
        path: "edit/templateBrowser",
        component: () => import("./godmode-template-browser.element-8lcmnCph.js")
      },
      {
        path: "edit/partialBrowser",
        component: () => import("./godmode-partial-browser.element-CsLdsS5B.js")
      },
      {
        path: "edit/dataTypeBrowser",
        component: () => import("./godmode-datatype-browser.element-BELJqZPB.js")
      },
      {
        path: "edit/contentBrowser",
        component: () => import("./godmode-content-browser.element-BmREVg6j.js")
      },
      {
        path: "edit/usageBrowser",
        component: () => import("./godmode-usage-browser.element-DizXljwI.js")
      },
      {
        path: "edit/mediaBrowser",
        component: () => import("./godmode-media-browser.element-DaavoUox.js")
      },
      {
        path: "edit/memberBrowser",
        component: () => import("./godmode-member-browser.element-BHHFX4xj.js")
      },
      {
        path: "edit/tagBrowser",
        component: () => import("./godmode-tag-browser.element-C7IRXmfU.js")
      },
      {
        path: "edit/serviceBrowser",
        component: () => import("./godmode-services-browser.element-DER5FMq0.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-ByRzdZyd.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-CMndKpae.js")
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
        component: () => import("./godmode-interface-browser.element-DDiD0hpN.js")
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
//# sourceMappingURL=godmode-workspace.context-BlV8YUsi.js.map
