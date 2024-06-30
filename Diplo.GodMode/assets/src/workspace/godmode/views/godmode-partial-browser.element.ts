﻿import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-partial-browser')
export class GodModePartialBrowserElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Partial Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `
    }
}

export default GodModePartialBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-partial-browser': GodModePartialBrowserElement;
    }
}
