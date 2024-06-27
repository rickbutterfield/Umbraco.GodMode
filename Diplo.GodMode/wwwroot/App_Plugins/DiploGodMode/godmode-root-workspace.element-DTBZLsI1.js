import { html as u, repeat as c, css as d, state as p, customElement as m } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as h } from "@umbraco-cms/backoffice/lit-element";
var w = Object.defineProperty, b = Object.getOwnPropertyDescriptor, l = (e, t, s, o) => {
  for (var r = o > 1 ? void 0 : o ? b(t, s) : t, i = e.length - 1, n; i >= 0; i--)
    (n = e[i]) && (r = (o ? n(t, s, r) : n(r)) || r);
  return o && r && w(t, s, r), r;
};
let a = class extends h {
  constructor() {
    super(...arguments), this._pages = [
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
    ];
  }
  render() {
    return u`
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
                        ${c(
      this._pages,
      (e) => e.name,
      (e) => u`
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
a.styles = [
  d`
			uui-box {
				margin-bottom: 20px;

				p {
					margin: 0;
				}
			}
		`
];
l([
  p()
], a.prototype, "_pages", 2);
a = l([
  m("umb-godmode-root-workspace")
], a);
export {
  a as UmbGodModeRootWorkspaceElement,
  a as element
};
//# sourceMappingURL=godmode-root-workspace.element-DTBZLsI1.js.map
