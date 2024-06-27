import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, ifDefined, property } from "@umbraco-cms/backoffice/external/lit";

@customElement('godmode-header')
export class GodModeHeaderElement extends UmbElementMixin(LitElement) {
    @property({ type: String, attribute: true })
    name?: string;

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="header">
                <uui-icon name="icon-sience"></uui-icon>
                <h3>God Mode ${ifDefined(this.name)}</h3>
            </div>
        `;
    }

    static styles = [
        css`
            .header {
                display: flex;
                flex-direction: row;
                align-items: center;

                uui-icon {
                    width: 24px;
                    height: 24px;
                    margin-right: var(--uui-size-space-2);
                }
            }
        `
    ]
}

export default GodModeHeaderElement;