import { UmbWorkspaceRouteManager as p } from "@umbraco-cms/backoffice/workspace";
import { b as i } from "./index-DoLw8Ovk.js";
import { UmbControllerBase as n } from "@umbraco-cms/backoffice/class-api";
class d extends n {
  constructor(t) {
    super(t), this.workspaceAlias = "Umb.Workspace.GodMode", this.routes = new p(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-TLIYr32t.js")
      },
      {
        path: "edit/templateBrowser",
        component: () => import("./godmode-template-browser.element-BvI8sCe-.js")
      },
      {
        path: "edit/partialBrowser",
        component: () => import("./godmode-partial-browser.element-DC39YQ4A.js")
      },
      {
        path: "edit/dataTypeBrowser",
        component: () => import("./godmode-datatype-browser.element-C3cj5kZO.js")
      },
      {
        path: "edit/contentBrowser",
        component: () => import("./godmode-content-browser.element-DzJ0PmQW.js")
      },
      {
        path: "edit/usageBrowser",
        component: () => import("./godmode-usage-browser.element-BXgCpZcX.js")
      },
      {
        path: "edit/mediaBrowser",
        component: () => import("./godmode-media-browser.element-orLvFony.js")
      },
      {
        path: "edit/memberBrowser",
        component: () => import("./godmode-member-browser.element-VXR_kF4e.js")
      },
      {
        path: "edit/tagBrowser",
        component: () => import("./godmode-tag-browser.element-BpYKYpDG.js")
      },
      {
        path: "edit/serviceBrowser",
        component: () => import("./godmode-services-browser.element-Dh_nWihj.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-FvCt1Thc.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-BCwXvaRx.js")
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
        component: () => import("./godmode-interface-browser.element-BsAc6aXX.js")
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
//# sourceMappingURL=godmode-workspace.context-DibtSpue.js.map
