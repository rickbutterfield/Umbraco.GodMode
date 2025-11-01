var d = (e) => {
  throw TypeError(e);
};
var C = (e, r, n) => r.has(e) || d("Cannot " + n);
var h = (e, r, n) => r.has(e) ? d("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, n);
var f = (e, r, n) => (C(e, r, "access private method"), n);
import { UmbTreeServerDataSourceBase as g, UmbTreeRepositoryBase as B } from "@umbraco-cms/backoffice/tree";
import { G as T, a as F } from "./index-fy-rxTHq.js";
import { tryExecute as y } from "@umbraco-cms/backoffice/resources";
const p = "godmode", E = "godmode-root", _ = "godmode-folder";
let s = [
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
], u = [
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
];
var a, m;
class O extends g {
  constructor(n) {
    super(n, {
      getRootItems: w,
      getChildrenOf: D,
      getAncestorsOf: R,
      mapper: b
    });
    h(this, a);
    this.config = void 0, f(this, a, m).call(this);
  }
}
a = new WeakSet(), m = async function() {
  const { data: n } = await y(this, T.getConfig());
  if (this.config = n, this.config) {
    debugger;
    s = s.filter((o) => {
      var l, i, t, c;
      return !(((i = (l = this.config) == null ? void 0 : l.featuresToHide) == null ? void 0 : i.includes(o.name)) || ((c = (t = this.config) == null ? void 0 : t.featuresToHide) == null ? void 0 : c.includes(o.path)));
    });
  }
};
const w = async (e) => {
  debugger;
  return {
    data: {
      total: s.length,
      items: s
    }
  };
}, D = async (e) => {
  debugger;
  return e.parent.unique === null ? await w() : {
    data: {
      total: u.length,
      items: u
    }
  };
}, R = async () => {
  throw new Error("Ancestors is not available.");
}, b = (e) => ({
  unique: e.path,
  parent: {
    unique: e.parent ? e.parent.path : null,
    entityType: e.parent ? p : E
  },
  name: e.name,
  icon: e.icon,
  entityType: e.isFolder ? _ : p,
  isFolder: e.isFolder,
  hasChildren: e.hasChildren
});
class I extends B {
  constructor(r) {
    super(r, O, F);
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
  I as GodModeTreeRepository,
  I as api
};
//# sourceMappingURL=godmode-tree.repository-BQJDh05n.js.map
