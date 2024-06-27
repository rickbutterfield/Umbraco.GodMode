import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-doctype-browser')
export class GodModeDocTypeBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Document Type Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeDocTypeBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-doctype-browser': GodModeDocTypeBrowserElement;
    }
}
