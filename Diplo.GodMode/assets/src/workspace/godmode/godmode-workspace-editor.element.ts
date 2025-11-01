import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { GODMODE_WORKSPACE_CONTEXT } from "./godmode-workspace.context-token";

@customElement('godmode-workspace-editor')
export class GodModeWorkspaceEditorElement extends UmbLitElement {
    #workspaceContext?: typeof GODMODE_WORKSPACE_CONTEXT.TYPE;

    constructor() {
        super();

        this.consumeContext(GODMODE_WORKSPACE_CONTEXT, (context) => {
            this.#workspaceContext = context;
        });
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