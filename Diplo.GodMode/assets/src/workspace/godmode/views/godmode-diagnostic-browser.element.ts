import { css, customElement, html, ifDefined, repeat, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { Diagnostic, DiagnosticGroup, DiagnosticSection, GodModeService } from "../../../api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";

@customElement('godmode-diagnostic-browser')
export class GodModeDiagnosticBrowserElement extends UmbLitElement {
    @state()
    diagnostics: DiagnosticGroup[] = [];

    @state()
    currentGroup?: DiagnosticGroup = undefined;

    @state()
    filteredSections?: DiagnosticSection[];

    @state()
    currentGroupId: string = '';

    @state()
    searchKey: string = '';

    @state()
    searchValue: string = '';

    configurationGroups: Array<Option> = [];

    constructor() {
        super();
        this.loadDiagnostics();
    }

    async loadDiagnostics() {
        const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetEnvironmentDiagnostics());

        if (data) {
            this.diagnostics = data;

            const groups = data.map(group => {
                return { name: group.title, value: group.id.toString(), selected: group.id === 0 }
            });

            groups.unshift({ name: 'Select', value: '', selected: false });

            this.configurationGroups = groups;
            this.currentGroup = this.diagnostics[0];
            this.currentGroupId = this.diagnostics[0]?.id.toString();
            this.filteredSections = this.currentGroup.sections;
        }
    }

    #configurationChange(event: UUISelectEvent) {
        const newGroup = this.diagnostics.find(x => x.id.toString() == event.target.value as string);
        if (newGroup) {
            this.currentGroup = newGroup;
            this.currentGroupId = newGroup.id.toString();
            this.filteredSections = newGroup.sections;
        }
    }

    #setSearchKey(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchKey = value;
        this.#filterValues();
    }

    #setSearchValue(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchValue = value;
        this.#filterValues();
    }

    #filterValues() {
        if (this.searchKey !== '' || this.searchValue !== '') {
            this.filteredSections = structuredClone(this.currentGroup?.sections);
            this.filteredSections?.forEach(section => {
                section.diagnostics = section.diagnostics.filter(x => this.#filter(x));
            });
        }
        else {
            this.filteredSections = this.currentGroup?.sections;
        }
    }

    #filter(diag: Diagnostic) {
        let found: boolean = false;
        if (this.searchKey !== '') {
            found = diag.key.toLowerCase().includes(this.searchKey.toLowerCase());
        }

        if (this.searchValue !== '') {
            found = diag.value.toLowerCase().includes(this.searchValue.toLowerCase());
        }

        return found;
    }

    render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Diagnostics" slot="header"></godmode-header>

                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label for="search-key">Search Names:</uui-label>
                            <uui-input
                                id="search-key"
                                .value=${this.searchKey}
                                @input=${this.#setSearchKey}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label for="search-value">Search Values:</uui-label>
                            <uui-input
                                id="search-value"
                                .value=${this.searchValue}
                                @input=${this.#setSearchValue}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label for="search-section">Configuration Group:</uui-label>
                            <uui-select
                                id="search-section"
                                .options=${this.configurationGroups}
                                @change=${this.#configurationChange}
                                .value=${this.currentGroupId}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${repeat(
                    this.filteredSections,
                    (group) => group.heading,
                    (group) => group.diagnostics.length !== 0 ?
                        html`
                            <uui-box headline=${group.heading}>
                                <uui-table>
                                    <uui-table-head>
                                        <uui-table-head-cell style="width: 30%">Key</uui-table-head-cell>
                                        <uui-table-head-cell style="width: 70%">Value</uui-table-head-cell>
                                    </uui-table-head>

                                    ${repeat(
                                        group.diagnostics,
                                        (diagnostic) => diagnostic.key,
                                        (diagnostic) => html`
                                            <uui-table-row>
                                                <uui-table-cell>${diagnostic.key}</uui-table-cell>
                                                <uui-table-cell>${diagnostic.value}</uui-table-cell>
                                            </uui-table-row>
                                        `
                                    )}
                                </uui-table>
                            </uui-box>
                        ` : html``
                )}
            </umb-body-layout>
        `
    }

    static styles = [
        css`
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;

                div {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
            }

            uui-box {
                margin-bottom: 20px;
            }
        `
    ]
}

export default GodModeDiagnosticBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-diagnostic-browser': GodModeDiagnosticBrowserElement;
    }
}
