import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-services-browser')
export class GodModeServicesBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="DI Services Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeServicesBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-services-browser': GodModeServicesBrowserElement;
    }
}
