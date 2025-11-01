import { UmbWorkspaceRouteManager as p } from "@umbraco-cms/backoffice/workspace";
import { a as i } from "./index--MEPM8tO.js";
import { UmbControllerBase as n } from "@umbraco-cms/backoffice/class-api";
class d extends n {
  constructor(t) {
    super(t), this.workspaceAlias = "Umb.Workspace.GodMode", this.routes = new p(this), this.routes.setRoutes([
      {
        path: "edit/docTypeBrowser",
        component: () => import("./godmode-doctype-browser.element-Deu_ILFH.js")
      },
      {
        path: "edit/templateBrowser",
        component: () => import("./godmode-template-browser.element-Be30KEJk.js")
      },
      {
        path: "edit/partialBrowser",
        component: () => import("./godmode-partial-browser.element-DwfzxjgI.js")
      },
      {
        path: "edit/dataTypeBrowser",
        component: () => import("./godmode-datatype-browser.element-CaZo9_H2.js")
      },
      {
        path: "edit/contentBrowser",
        component: () => import("./godmode-content-browser.element-Cw5HXP5S.js")
      },
      {
        path: "edit/usageBrowser",
        component: () => import("./godmode-usage-browser.element-DOaOLiYN.js")
      },
      {
        path: "edit/mediaBrowser",
        component: () => import("./godmode-media-browser.element-BOP2PYm_.js")
      },
      {
        path: "edit/memberBrowser",
        component: () => import("./godmode-member-browser.element-DSiE5IOc.js")
      },
      {
        path: "edit/tagBrowser",
        component: () => import("./godmode-tag-browser.element-GGkX2RGR.js")
      },
      {
        path: "edit/serviceBrowser",
        component: () => import("./godmode-services-browser.element-VXW3Wcfz.js")
      },
      {
        path: "edit/diagnosticBrowser",
        component: () => import("./godmode-diagnostic-browser.element-BmVb1Z9U.js")
      },
      {
        path: "edit/utilityBrowser",
        component: () => import("./godmode-utility-browser.element-BUPV8BA_.js")
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
        component: () => import("./godmode-interface-browser.element-v-zssD5n.js")
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
//# sourceMappingURL=godmode-workspace.context-DIayN_rd.js.map
