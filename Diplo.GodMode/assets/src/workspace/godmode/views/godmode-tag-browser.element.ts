import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-tag-browser')
export class GodModeTagBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Tag Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeTagBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-tag-browser': GodModeTagBrowserElement;
    }
}
