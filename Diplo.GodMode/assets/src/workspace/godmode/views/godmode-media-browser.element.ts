import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-media-browser')
export class GodModeMediaBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Media Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeMediaBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-media-browser': GodModeMediaBrowserElement;
    }
}
