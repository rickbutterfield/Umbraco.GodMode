import { UmbTreeServerDataSourceBase as s, UmbTreeRepositoryBase as o } from "@umbraco-cms/backoffice/tree";
import { GOD_MODE_TREE_STORE_CONTEXT as l } from "./godmode-tree.store-CYDCLcEv.js";
const a = "godmode", t = "godmode-root", i = "godmode-folder";
class c extends s {
  constructor(r) {
    super(r, {
      getRootItems: n,
      getChildrenOf: d,
      getAncestorsOf: h,
      mapper: p
    });
  }
}
const n = async (e) => ({
  total: 13,
  items: [
    {
      hasChildren: !1,
      path: "docTypeBrowser",
      name: "DocType Browser",
      icon: "icon-item-arrangement",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "templateBrowser",
      name: "Template Browser",
      icon: "icon-newspaper-alt",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "partialBrowser",
      name: "Partial Browser",
      icon: "icon-article",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "dataTypeBrowser",
      name: "DataType Browser",
      icon: "icon-autofill",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "contentBrowser",
      name: "Content Browser",
      icon: "icon-umb-content",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "usageBrowser",
      name: "Usage Browser",
      icon: "icon-chart-curve",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "mediaBrowser",
      name: "Media Browser",
      icon: "icon-picture",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "memberBrowser",
      name: "Member Browser",
      icon: "icon-umb-members",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "tagBrowser",
      name: "Tag Browser",
      icon: "icon-tags",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !0,
      path: "types",
      name: "Types",
      parent: null,
      isFolder: !0
    },
    {
      hasChildren: !1,
      path: "serviceBrowser",
      name: "Services",
      icon: "icon-console",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "diagnosticBrowser",
      name: "Diagnostics",
      icon: "icon-settings",
      parent: null,
      isFolder: !1
    },
    {
      hasChildren: !1,
      path: "utilityBrowser",
      name: "Utilities",
      icon: "icon-wrench",
      parent: null,
      isFolder: !1
    }
  ]
}), d = async (e) => e.parent.unique === null ? await n() : {
  total: 0,
  items: [
    {
      hasChildren: !1,
      name: "Surface Controllers",
      path: "reflectionBrowser/surface",
      isFolder: !1,
      icon: "icon-planet"
    },
    {
      hasChildren: !1,
      name: "API Controllers",
      path: "reflectionBrowser/api",
      isFolder: !1,
      icon: "icon-rocket"
    },
    {
      hasChildren: !1,
      name: "Render Controllers",
      path: "reflectionBrowser/render",
      isFolder: !1,
      icon: "icon-satellite-dish"
    },
    {
      hasChildren: !1,
      name: "Content Models",
      path: "reflectionBrowser/models",
      isFolder: !1,
      icon: "icon-binarycode"
    },
    {
      hasChildren: !1,
      name: "Composers",
      path: "reflectionBrowser/composers",
      isFolder: !1,
      icon: "icon-music"
    },
    {
      hasChildren: !1,
      name: "Value Converters",
      path: "reflectionBrowser/converters",
      isFolder: !1,
      icon: "icon-wand"
    },
    {
      hasChildren: !1,
      name: "View Components",
      path: "reflectionBrowser/components",
      isFolder: !1,
      icon: "icon-code"
    },
    {
      hasChildren: !1,
      name: "Tag Helpers",
      path: "reflectionBrowser/taghelpers",
      isFolder: !1,
      icon: "icon-tags"
    },
    {
      hasChildren: !1,
      name: "Content Finders",
      path: "reflectionBrowser/finders",
      isFolder: !1,
      icon: "icon-directions-alt"
    },
    {
      hasChildren: !1,
      name: "URL Providers",
      path: "reflectionBrowser/urlproviders",
      isFolder: !1,
      icon: "icon-link"
    },
    {
      hasChildren: !1,
      name: "Interface Browser",
      path: "typeBrowser",
      isFolder: !1,
      icon: "icon-molecular-network"
    }
  ]
}, h = async (e) => [], p = (e) => ({
  unique: e.path,
  parent: {
    unique: e.parent ? e.parent.path : null,
    entityType: e.parent ? a : t
  },
  name: e.name,
  icon: e.icon,
  entityType: e.isFolder ? i : a,
  isFolder: e.isFolder,
  hasChildren: e.hasChildren
});
class m extends o {
  constructor(r) {
    super(r, c, l);
  }
  async requestTreeRoot() {
    return { data: {
      unique: null,
      entityType: "godmode-root",
      name: "God Mode",
      icon: "icon-sience",
      hasChildren: !0,
      isFolder: !1
    } };
  }
}
export {
  m as GodModeTreeRepository,
  m as api
};
//# sourceMappingURL=godmode-tree.repository-COqMNRyt.js.map
