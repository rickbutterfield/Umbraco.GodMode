import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";

@customElement('godmode-workspace-editor')
export class GodModeWorkspaceEditorElement extends UmbLitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <uui-box></uui-box>
        `;
    }
}

export default GodModeWorkspaceEditorElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-workspace-editor': GodModeWorkspaceEditorElement
    }
}