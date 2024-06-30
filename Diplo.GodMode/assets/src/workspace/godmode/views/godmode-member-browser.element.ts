import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-member-browser')
export class GodModeMemberBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Member Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeMemberBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-member-browser': GodModeMemberBrowserElement;
    }
}
