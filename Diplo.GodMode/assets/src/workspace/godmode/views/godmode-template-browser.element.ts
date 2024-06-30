import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-template-browser')
export class GodModeTemplateBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Template Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeTemplateBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-template-browser': GodModeTemplateBrowserElement;
    }
}
