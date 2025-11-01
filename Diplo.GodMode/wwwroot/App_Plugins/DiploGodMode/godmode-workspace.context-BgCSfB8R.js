import { UmbWorkspaceRouteManager as p } from "@umbraco-cms/backoffice/workspace";
import { a as i } from "./index-D76lIRat.js";
import { UmbControllerBase as n } from "@umbraco-cms/backoffice/class-api";
class d extends n {
  constructor(t) {
    super(t), this.workspaceAlias = "Umb.Workspace.GodMode", this.routes = new p(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-Bt0mTcB9.js")
      },
      {
        path: "edit/templateBrowser",
        component: () => import("./godmode-template-browser.element-CNhKvtnM.js")
      },
      {
        path: "edit/partialBrowser",
        component: () => import("./godmode-partial-browser.element-9nwrrcAZ.js")
      },
      {
        path: "edit/dataTypeBrowser",
        component: () => import("./godmode-datatype-browser.element-BHkX5BCQ.js")
      },
      {
        path: "edit/contentBrowser",
        component: () => import("./godmode-content-browser.element-DS7mkMs_.js")
      },
      {
        path: "edit/usageBrowser",
        component: () => import("./godmode-usage-browser.element-B32f0cCy.js")
      },
      {
        path: "edit/mediaBrowser",
        component: () => import("./godmode-media-browser.element-BF6CJjDh.js")
      },
      {
        path: "edit/memberBrowser",
        component: () => import("./godmode-member-browser.element-DUQKErR8.js")
      },
      {
        path: "edit/tagBrowser",
        component: () => import("./godmode-tag-browser.element-DbzsKtkV.js")
      },
      {
        path: "edit/serviceBrowser",
        component: () => import("./godmode-services-browser.element-WrpUgvEw.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-CAno6krC.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-DJXVsTFh.js")
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
        component: () => import("./godmode-interface-browser.element-DiPBrVXg.js")
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
//# sourceMappingURL=godmode-workspace.context-BgCSfB8R.js.map
