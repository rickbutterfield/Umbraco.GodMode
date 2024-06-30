import { html, customElement, css, state, repeat } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { GodModePage } from '../../types';
import { GodModeConfig, GodModeService } from '../../api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

@customElement('umb-godmode-folder-workspace')
export class UmbGodModeFolderWorkspaceElement extends UmbLitElement {
  @state()
  private config: GodModeConfig | undefined = undefined;

  @state()
  private pages: GodModePage[] = [
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
  ];

  constructor() {
    super();
    this.#getConfig();
  }

  async #getConfig() {
    const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetConfig());
    this.config = data;

    if (this.config) {
      this.pages = this.pages.filter((page) => {
        const filtered = this.config?.featuresToHide?.includes(page.name) || this.config?.featuresToHide?.includes(page.url);
        return !filtered;
      })
    }
  }

  override render() {
    return html`
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
            ${repeat(
              this.pages,
              (page) => page.name,
              (page) =>
                html`
                  <uui-table-row>
                    <uui-table-cell>
                        <strong><a href="/umbraco/section/settings/workspace/godmode/edit/${page.url}">${page.name}</a></strong>
                    </uui-table-cell>
                    <uui-table-cell>
                        ${page.description}
                    </uui-table-cell>
                  </uui-table-row>
                `
    )}
					</uui-table>
				</uui-box>
			</umb-body-layout>`;
  }

  static styles = [
    css`
			uui-box {
				margin-bottom: 20px;

				p {
					margin: 0;
				}
			}
		`
  ]
}

export { UmbGodModeFolderWorkspaceElement as element };

declare global {
  interface HTMLElementTagNameMap {
    'umb-godmode-folder-workspace': UmbGodModeFolderWorkspaceElement;
  }
}
