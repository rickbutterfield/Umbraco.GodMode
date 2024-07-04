import { html as c, repeat as m, css as f, state as d, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as h } from "@umbraco-cms/backoffice/lit-element";
import { G as w } from "./index-C2dn3IU5.js";
import { tryExecuteAndNotify as g } from "@umbraco-cms/backoffice/resources";
var v = Object.defineProperty, C = Object.getOwnPropertyDescriptor, u = (e, r, o, i) => {
  for (var t = i > 1 ? void 0 : i ? C(r, o) : r, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (t = (i ? n(r, o, t) : n(t)) || t);
  return i && t && v(r, o, t), t;
}, y = (e, r, o) => {
  if (!r.has(e))
    throw TypeError("Cannot " + o);
}, B = (e, r, o) => {
  if (r.has(e))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(e) : r.set(e, o);
}, _ = (e, r, o) => (y(e, r, "access private method"), o), l, p;
let a = class extends h {
  constructor() {
    super(), B(this, l), this.config = void 0, this.pages = [
      {
        name: "Surface Controllers",
        url: "reflectionBrowser/surface",
        description: "Browse Umbraco Surface Controllers"
      },
      {
        name: "API Controllers",
        url: "reflectionBrowser/api",
        description: "Browse Umbraco Web API Controllers"
      },
      {
        name: "Render Controllers",
        url: "reflectionBrowser/render",
        description: "Browse Umbraco Render Controllers"
      },
      {
        name: "Content Models",
        url: "reflectionBrowser/models",
        description: "List Umbraco Content Models"
      },
      {
        name: "Composers",
        url: "reflectionBrowser/composers",
        description: "Browse Umbraco Composers (DI)"
      },
      {
        name: "Value Converters",
        url: "reflectionBrowser/converters",
        description: "View configured Property Value Converters"
      },
      {
        name: "View Components",
        url: "reflectionBrowser/components",
        description: "List all View Components used on your site"
      },
      {
        name: "Tag Helpers",
        url: "reflectionBrowser/taghelpers",
        description: "All Tag Helpers that you can use"
      },
      {
        name: "Content Finders",
        url: "reflectionBrowser/finders",
        description: "View the registered Content Finders"
      },
      {
        name: "URL Providers",
        url: "reflectionBrowser/urlproviders",
        description: "List all URL Providers that are available"
      },
      {
        name: "Interface Browser",
        url: "typeBrowser",
        description: "Interogate C# Interfaces and derived types in your site"
      }
    ], _(this, l, p).call(this);
  }
  render() {
    return c`
			<umb-body-layout>
				<uui-box>
					<h1>
						<uui-icon name="icon-sience"></uui-icon> God Mode Types
					</h1>
					<p class="muted">Browse controllers and other Umbraco types. Dive into some interfaces.</p>
				</uui-box>

				<uui-box>
					<uui-table>
            <uui-table-column></uui-table-column>
            <uui-table-column></uui-table-column>

            <uui-table-head style="background-color: #eeeeee;">
                <uui-table-head-cell>Action</uui-table-head-cell>
                <uui-table-head-cell>Description</uui-table-head-cell>
            </uui-table-head>
            ${m(
      this.pages,
      (e) => e.name,
      (e) => c`
                  <uui-table-row>
                    <uui-table-cell>
                        <strong><a href="/umbraco/section/settings/workspace/godmode/edit/${e.url}">${e.name}</a></strong>
                    </uui-table-cell>
                    <uui-table-cell>
                        ${e.description}
                    </uui-table-cell>
                  </uui-table-row>
                `
    )}
					</uui-table>
				</uui-box>
			</umb-body-layout>`;
  }
};
l = /* @__PURE__ */ new WeakSet();
p = async function() {
  const { data: e } = await g(this, w.getUmbracoManagementApiV1GodModeGetConfig());
  this.config = e, this.config && (this.pages = this.pages.filter((r) => {
    var i, t, s, n;
    return !(((t = (i = this.config) == null ? void 0 : i.featuresToHide) == null ? void 0 : t.includes(r.name)) || ((n = (s = this.config) == null ? void 0 : s.featuresToHide) == null ? void 0 : n.includes(r.url)));
  }));
};
a.styles = [
  f`
			uui-box {
				margin-bottom: 20px;

				p {
					margin: 0;
				}
			}
		`
];
u([
  d()
], a.prototype, "config", 2);
u([
  d()
], a.prototype, "pages", 2);
a = u([
  b("umb-godmode-folder-workspace")
], a);
export {
  a as UmbGodModeFolderWorkspaceElement,
  a as element
};
//# sourceMappingURL=godmode-folder-workspace.element-WdXbKKNt.js.map
