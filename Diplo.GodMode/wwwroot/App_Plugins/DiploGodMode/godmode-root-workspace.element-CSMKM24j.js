import { html as c, repeat as h, css as m, state as d, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as b } from "@umbraco-cms/backoffice/lit-element";
import { G as g } from "./services.gen-CEv4CA0_.js";
import { tryExecuteAndNotify as y } from "@umbraco-cms/backoffice/resources";
var f = Object.defineProperty, B = Object.getOwnPropertyDescriptor, l = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? B(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && f(t, r, o), o;
}, v = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, _ = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, T = (e, t, r) => (v(e, t, "access private method"), r), u, p;
let n = class extends b {
  constructor() {
    super(), _(this, u), this.config = void 0, this.pages = [
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
    ], T(this, u, p).call(this);
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
p = async function() {
  const { data: e } = await y(this, g.getUmbracoManagementApiV1GodModeGetConfig());
  this.config = e, this.config && (this.pages = this.pages.filter((t) => {
    var a, o, i, s;
    return !(((o = (a = this.config) == null ? void 0 : a.featuresToHide) == null ? void 0 : o.includes(t.name)) || ((s = (i = this.config) == null ? void 0 : i.featuresToHide) == null ? void 0 : s.includes(t.url)));
  }));
};
n.styles = [
  m`
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
  w("umb-godmode-root-workspace")
], n);
export {
  n as UmbGodModeRootWorkspaceElement,
  n as element
};
//# sourceMappingURL=godmode-root-workspace.element-CSMKM24j.js.map
