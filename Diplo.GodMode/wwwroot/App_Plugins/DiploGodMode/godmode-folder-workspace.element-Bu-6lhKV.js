import { repeat as f, html as c, css as b, state as d, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { G as v } from "./index-Car7Rj8s.js";
import { tryExecute as g } from "@umbraco-cms/backoffice/resources";
var C = Object.defineProperty, y = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, u = (e, r, o, i) => {
  for (var t = i > 1 ? void 0 : i ? y(r, o) : r, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (t = (i ? n(r, o, t) : n(t)) || t);
  return i && t && C(r, o, t), t;
}, B = (e, r, o) => r.has(e) || m("Cannot " + o), _ = (e, r, o) => r.has(e) ? m("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, o), U = (e, r, o) => (B(e, r, "access private method"), o), l, p;
let a = class extends w {
  constructor() {
    super(), _(this, l), this.config = void 0, this.pages = [
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
    ], U(this, l, p).call(this);
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

            <uui-table-head>
                <uui-table-head-cell>Action</uui-table-head-cell>
                <uui-table-head-cell>Description</uui-table-head-cell>
            </uui-table-head>
            ${f(
      this.pages,
      (e) => e.name,
      (e) => c`
                  <uui-table-row>
                    <uui-table-cell>
                    <uui-button
                        href="/umbraco/section/settings/workspace/godmode/edit/${e.url}"
                    >
                        ${e.name}
                    </uui-button>
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
  const { data: e } = await g(this, v.getUmbracoManagementApiV1GodModeGetConfig());
  this.config = e, this.config && (this.pages = this.pages.filter((r) => {
    var i, t, s, n;
    return !(((t = (i = this.config) == null ? void 0 : i.featuresToHide) == null ? void 0 : t.includes(r.name)) || ((n = (s = this.config) == null ? void 0 : s.featuresToHide) == null ? void 0 : n.includes(r.url)));
  }));
};
a.styles = [
  b`
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
  h("umb-godmode-folder-workspace")
], a);
export {
  a as UmbGodModeFolderWorkspaceElement,
  a as element
};
//# sourceMappingURL=godmode-folder-workspace.element-Bu-6lhKV.js.map
