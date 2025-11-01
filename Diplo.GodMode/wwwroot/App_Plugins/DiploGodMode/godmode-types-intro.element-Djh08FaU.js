import { repeat as c, html as u, css as d, state as m, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as b } from "@umbraco-cms/backoffice/lit-element";
var f = Object.defineProperty, w = Object.getOwnPropertyDescriptor, a = (e, t, s, l) => {
  for (var r = l > 1 ? void 0 : l ? w(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (l ? i(t, s, r) : i(r)) || r);
  return l && r && f(t, s, r), r;
};
let o = class extends b {
  constructor() {
    super(), this.pages = [
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
        description: "Interrogate C# Interfaces and derived types in your site"
      }
    ];
  }
  render() {
    return u`
            <umb-body-layout>
                <godmode-header name="God Mode Types" slot="header"></godmode-header>
                
                <uui-box>
                    <h1>
                        <uui-icon name="icon-science"></uui-icon> God Mode Types
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
                        
                        ${c(
      this.pages,
      (e) => e.name,
      (e) => u`
                                <uui-table-row>
                                    <uui-table-cell>
                                        <uui-button href="/umbraco/section/settings/workspace/godmode/edit/${e.url}">
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
            </umb-body-layout>
        `;
  }
};
o.styles = [
  d`
            uui-box {
                margin-bottom: 20px;

                h1 {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                p {
                    margin: 0;
                }
            }

            .muted {
                color: var(--uui-color-text-alt);
            }
        `
];
a([
  m()
], o.prototype, "pages", 2);
o = a([
  p("godmode-types-intro")
], o);
const C = o;
export {
  o as GodModeTypesIntroElement,
  C as default
};
//# sourceMappingURL=godmode-types-intro.element-Djh08FaU.js.map
