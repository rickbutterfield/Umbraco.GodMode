import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { GodModeService } from "../../../api";

@customElement('godmode-member-browser')
export class GodModeMemberBrowserElement extends UmbElementMixin(LitElement) {

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
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetMembersPaged({
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

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Member Browser" slot="header"></godmode-header>
                
                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
                ` : html``}

                ${!this.isLoading && this.data ? html`
                    <uui-box>
                        <h3>Member Information</h3>
                        <div class="info-grid">
                            <div><strong>Username:</strong> ${this.data.username || 'N/A'}</div>
                            <div><strong>Name:</strong> ${this.data.name || 'N/A'}</div>
                            <div><strong>Email:</strong> ${this.data.email || 'N/A'}</div>
                            <div><strong>Created:</strong> ${this.data.createDate ? new Date(this.data.createDate).toLocaleString() : 'N/A'}</div>
                            <div><strong>ID:</strong> ${this.data.id || 'N/A'}</div>
                            <div><strong>UDI:</strong> <code>${this.data.udi || 'N/A'}</code></div>
                        </div>
                    </uui-box>
                ` : html``}

                ${!this.isLoading && !this.data ? html`
                    <uui-box>
                        <p>No member data available. The API response structure may need adjustment.</p>
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

export default GodModeMemberBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-member-browser': GodModeMemberBrowserElement;
    }
}
