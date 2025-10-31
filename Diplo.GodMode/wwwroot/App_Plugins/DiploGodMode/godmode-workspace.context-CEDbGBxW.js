import { UmbWorkspaceRouteManager as p } from "@umbraco-cms/backoffice/workspace";
import { b as i } from "./index-CJ2F2uoa.js";
import { UmbControllerBase as n } from "@umbraco-cms/backoffice/class-api";
class d extends n {
  constructor(t) {
    super(t), this.workspaceAlias = "Umb.Workspace.GodMode", this.routes = new p(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-BVWNMH89.js")
      },
      {
        path: "edit/templateBrowser",
        component: () => import("./godmode-template-browser.element-CGxF6Mui.js")
      },
      {
        path: "edit/partialBrowser",
        component: () => import("./godmode-partial-browser.element-DbLGMDKq.js")
      },
      {
        path: "edit/dataTypeBrowser",
        component: () => import("./godmode-datatype-browser.element-CPWQX7-G.js")
      },
      {
        path: "edit/contentBrowser",
        component: () => import("./godmode-content-browser.element-BuJZ-Llr.js")
      },
      {
        path: "edit/usageBrowser",
        component: () => import("./godmode-usage-browser.element-Kw6IHshu.js")
      },
      {
        path: "edit/mediaBrowser",
        component: () => import("./godmode-media-browser.element-56bUVgqm.js")
      },
      {
        path: "edit/memberBrowser",
        component: () => import("./godmode-member-browser.element-D8rGRYPy.js")
      },
      {
        path: "edit/tagBrowser",
        component: () => import("./godmode-tag-browser.element-B5_VxfKs.js")
      },
      {
        path: "edit/serviceBrowser",
        component: () => import("./godmode-services-browser.element-CJbKG7UA.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-DTYEi3Z7.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-D498qO3U.js")
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
        component: () => import("./godmode-interface-browser.element-BO6ivdFa.js")
      },
      {
        path: "edit/typesIntro",
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
//# sourceMappingURL=godmode-workspace.context-CEDbGBxW.js.map
