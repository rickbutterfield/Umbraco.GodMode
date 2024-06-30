import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-content-browser')
export class GodModeContentBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Content Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeContentBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-content-browser': GodModeContentBrowserElement;
    }
}
