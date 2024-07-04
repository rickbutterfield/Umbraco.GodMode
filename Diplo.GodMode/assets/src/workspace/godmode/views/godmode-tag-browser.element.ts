import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html } from "@umbraco-cms/backoffice/external/lit";

@customElement('godmode-tag-browser')
export class GodModeTagBrowserElement extends UmbElementMixin(LitElement) {

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Tag Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
    }

    static styles = [
        css`
        `
    ]
}

export default GodModeTagBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-tag-browser': GodModeTagBrowserElement;
    }
}
