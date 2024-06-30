import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-usage-browser')
export class GodModeUsageBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Usage Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModeUsageBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-usage-browser': GodModeUsageBrowserElement;
    }
}
