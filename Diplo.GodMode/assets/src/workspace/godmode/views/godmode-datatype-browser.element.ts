import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-datatype-browser')
export class GodModeDataTypeBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="DataType Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeDataTypeBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-datatype-browser': GodModeDataTypeBrowserElement;
    }
}
