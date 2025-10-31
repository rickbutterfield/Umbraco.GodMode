import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { GodModeService } from "../../../api";

@customElement('godmode-media-browser')
export class GodModeMediaBrowserElement extends UmbElementMixin(LitElement) {

    @state()
    data: any;

    @state()
    isLoading: boolean = true;

    constructor() {
        super();
    }

    async connectedCallback() {
        super.connectedCallback();
        this.#init();
    }

    async #init() {
        this.isLoading = true;
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetMedia({
            query: {
                page: 1,
                pageSize: 50
            }
        }));

        if (data) {
            this.data = data;
        }
        this.isLoading = false;
    }

    #formatBytes(bytes: number) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Media Browser" slot="header"></godmode-header>
                
                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
                ` : html``}

                ${!this.isLoading && this.data ? html`
                    <uui-box>
                        <h3>Media Information</h3>
                        <div class="info-grid">
                            <div><strong>Name:</strong> ${this.data.name || 'N/A'}</div>
                            <div><strong>Type:</strong> ${this.data.type || 'N/A'}</div>
                            <div><strong>Extension:</strong> ${this.data.ext || 'N/A'}</div>
                            <div><strong>Size:</strong> ${this.#formatBytes(this.data.size || 0)}</div>
                            <div><strong>Created:</strong> ${this.data.createDate ? new Date(this.data.createDate).toLocaleString() : 'N/A'}</div>
                            <div><strong>Updated:</strong> ${this.data.updateDate ? new Date(this.data.updateDate).toLocaleString() : 'N/A'}</div>
                            <div><strong>Path:</strong> ${this.data.path || 'N/A'}</div>
                            <div><strong>UDI:</strong> <code>${this.data.udi || 'N/A'}</code></div>
                        </div>
                    </uui-box>
                ` : html``}

                ${!this.isLoading && !this.data ? html`
                    <uui-box>
                        <p>No media data available. The API response structure may need adjustment.</p>
                    </uui-box>
                ` : html``}
            </umb-body-layout>
        `;
    }

    static styles = [
        css`
            uui-box {
                margin-bottom: 20px;
            }

            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin-top: 12px;
            }

            .info-grid > div {
                padding: 8px;
                background: var(--uui-color-surface);
                border-radius: 4px;
            }
        `
    ]
}

export default GodModeMediaBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-media-browser': GodModeMediaBrowserElement;
    }
}
