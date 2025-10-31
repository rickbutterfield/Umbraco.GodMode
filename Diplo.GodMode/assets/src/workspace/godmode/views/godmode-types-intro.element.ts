import { customElement, html, state, repeat, css } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

interface TypePage {
    name: string;
    url: string;
    description: string;
}

@customElement('godmode-types-intro')
export class GodModeTypesIntroElement extends UmbLitElement {

    @state()
    private pages: TypePage[] = [
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
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="God Mode Types" slot="header"></godmode-header>
                
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
                            (page) => html`
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
            </umb-body-layout>
        `;
    }

    static styles = [
        css`
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
    ]
}

export default GodModeTypesIntroElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-types-intro': GodModeTypesIntroElement;
    }
}
