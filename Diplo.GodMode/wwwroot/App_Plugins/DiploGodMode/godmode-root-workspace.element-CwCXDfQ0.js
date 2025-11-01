import { repeat as h, html as c, css as w, state as d, customElement as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as g } from "@umbraco-cms/backoffice/lit-element";
import { G as y } from "./index-Car7Rj8s.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var B = Object.defineProperty, v = Object.getOwnPropertyDescriptor, p = (e) => {
  throw TypeError(e);
}, l = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? v(t, r) : t, s = e.length - 1, i; s >= 0; s--)
    (i = e[s]) && (o = (a ? i(t, r, o) : i(o)) || o);
  return a && o && B(t, r, o), o;
}, _ = (e, t, r) => t.has(e) || p("Cannot " + r), T = (e, t, r) => t.has(e) ? p("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), x = (e, t, r) => (_(e, t, "access private method"), r), u, m;
let n = class extends g {
  constructor() {
    super(), T(this, u), this.config = void 0, this.pages = [
      {
        name: "DocType Browser",
        url: "docTypeBrowser",
        description: "Browse, filter and search document types and see where they are used"
      },
      {
        name: "Template Browser",
        url: "templateBrowser",
        description: "Filter, browse and search the template hierarchy and see what partials they use"
      },
      {
        name: "Partial Browser",
        url: "partialBrowser",
        description: "Browse partial views and see whether they are cached"
      },
      {
        name: "DataType Browser",
        url: "dataTypeBrowser",
        description: "Browse data types, see whether they are used and by which editor"
      },
      {
        name: "Content Browser",
        url: "contentBrowser",
        description: "Browse, search and filter all your content pages"
      },
      {
        name: "Usage Browser",
        url: "usageBrowser",
        description: "See how your content types are used and how many instances have been made"
      },
      {
        name: "Media Browser",
        url: "mediaBrowser",
        description: "Search your media and filter by type"
      },
      {
        name: "Member Browser",
        url: "memberBrowser",
        description: "Search members and see what groups they have been assigned to"
      },
      {
        name: "Tag Browser",
        url: "tagBrowser",
        description: "View all tags and see what content they are assigned to"
      },
      {
        name: "Type Browser",
        url: "typesIntro",
        description: "See how controllers, composers and models are made up and browse interfaces"
      },
      {
        name: "Services",
        url: "serviceBrowser",
        description: "Browse injected services registered with the IOC container."
      },
      {
        name: "Diagnostics",
        url: "diagnosticBrowser",
        description: "View Umbraco settings and configuration, Server settings and much more..."
      },
      {
        name: "Utilities",
        url: "utilityBrowser",
        description: "Clear caches, restart application pool and warm-up your little templates"
      }
    ], x(this, u, m).call(this);
  }
  render() {
    return c`
			<umb-body-layout>
				<uui-box>
					<h1>
						<uui-icon name="icon-sience"></uui-icon> Welcome to God Mode
					</h1>
					<p class="muted">The indispensable Umbraco tool to make developers invincible!</p>
				</uui-box>

				<uui-box>
					<uui-table>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>

                        <uui-table-head style="background-color: #eeeeee;">
                            <uui-table-head-cell>Action</uui-table-head-cell>
                            <uui-table-head-cell>Description</uui-table-head-cell>
                        </uui-table-head>
                        ${h(
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

				<uui-box>
					<p class="muted">
                        <uui-icon name="icon-hearts"></uui-icon> Made with love by Dan 'Diplo' Booth - <a href="https://www.diplo.co.uk/" target="_blank" rel="noopener">https://www.diplo.co.uk</a> - report any issues on the <a target="_blank" rel="noopener" href="https://github.com/DanDiplo/Umbraco.GodMode/issues">GitHub Issue Tracker</a>.
                    </p>
				</uui-box>
			</umb-body-layout>`;
  }
};
u = /* @__PURE__ */ new WeakSet();
m = async function() {
  const { data: e } = await f(this, y.getUmbracoManagementApiV1GodModeGetConfig());
  this.config = e, this.config && (this.pages = this.pages.filter((t) => {
    var a, o, s, i;
    return !(((o = (a = this.config) == null ? void 0 : a.featuresToHide) == null ? void 0 : o.includes(t.name)) || ((i = (s = this.config) == null ? void 0 : s.featuresToHide) == null ? void 0 : i.includes(t.url)));
  }));
};
n.styles = [
  w`
			uui-box {
				margin-bottom: 20px;

				p {
					margin: 0;
				}
			}
		`
];
l([
  d()
], n.prototype, "config", 2);
l([
  d()
], n.prototype, "pages", 2);
n = l([
  b("umb-godmode-root-workspace")
], n);
export {
  n as UmbGodModeRootWorkspaceElement,
  n as element
};
//# sourceMappingURL=godmode-root-workspace.element-CwCXDfQ0.js.map
