import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UUIBooleanInputEvent, UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, RegisteredService } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

@customElement('godmode-services-browser')
export class GodModeServicesBrowserElement extends UmbElementMixin(LitElement) {

    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
        hideIcon: true
    }

    @state()
    private _tableColumns: Array<UmbTableColumn> = [
        {
            name: 'Name',
            alias: 'name',
            allowSorting: true,
            width: '25%'
        },
        {
            name: 'Namespace',
            alias: 'namespace',
            allowSorting: true,
            width: '20%'
        },
        {
            name: 'Implemented By',
            alias: 'implementName',
            allowSorting: true,
            width: '25%'
        },
        {
            name: 'Implemented Namespace',
            alias: 'implementNamespace',
            allowSorting: true,
            width: '20%'
        },
        {
            name: 'Lifetime',
            alias: 'lifetime',
            allowSorting: true,
            width: '10%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: RegisteredService[] = [];

    @state()
    filteredData: RegisteredService[] = [];

    @state()
    searchName: string = '';

    @state()
    searchImplemented: string = '';

    @state()
    namespaces: Option[] = [];

    @state()
    selectedNamespace: string = '';

    @state()
    implementedNamespaces: Option[] = [];

    @state()
    selectedImplementedNamespace: string = '';

    @state()
    lifetimes: Option[] = [];

    @state()
    selectedLifetime: string = '';

    @state()
    visibility: boolean = false;

    constructor() {
        super();
    }

    async connectedCallback() {
        super.connectedCallback();
        this.#init();
    }

    #sortingHandler(event: UmbTableOrderedEvent) {
        const table = event.target as UmbTableElement;
        const orderingColumn = table.orderingColumn as keyof RegisteredService;
        const orderingDesc = table.orderingDesc;

        this.filteredData = sortData(structuredClone(this.data), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.filteredData);
    }

    async #init() {
        const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetRegisteredServices());

        if (data) {
            this.data = data;
            this.filteredData = structuredClone(this.data);
            this._tableItems = this.#mapData(this.filteredData);

            let lifetimes = [...new Set(this.data.map(x => x.lifetime))];
            this.lifetimes = lifetimes.map(x => { return { name: x, value: x } });
            this.lifetimes.unshift({ name: 'Any', value: '', selected: true });

            let namespaces = [...new Set(this.data.map(x => x.namespace))];
            this.namespaces = namespaces.map(x => { return { name: x, value: x } });
            this.namespaces.unshift({ name: 'Any', value: '', selected: true });

            let implementedNamespaces = [...new Set(this.data.map(x => x.implementNamespace))];
            this.implementedNamespaces = implementedNamespaces.map(x => { return { name: x, value: x } });
            this.implementedNamespaces.unshift({ name: 'Any', value: '', selected: true });
        }
    }

    #mapData(data: RegisteredService[]): UmbTableItem[] {
        return data.map((data) => {
            return {
                id: data.name,
                data: [
                    {
                        columnAlias: 'name',
                        value: data.name
                    },
                    {
                        columnAlias: 'namespace',
                        value: data.namespace
                    },
                    {
                        columnAlias: 'implementName',
                        value: data.implementName
                    },
                    {
                        columnAlias: 'implementNamespace',
                        value: data.implementNamespace
                    },
                    {
                        columnAlias: 'lifetime',
                        value: data.lifetime
                    }
                ]
            }
        });
    }

    #setSearchName(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchName = value;
        this.#filterValues();
    }

    #setSearchImplemented(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchImplemented = value;
        this.#filterValues();
    }

    #setSelectedLifetime(event: UUISelectEvent) {
        const value = event.target.value as string;
        this.selectedLifetime = value;
        this.#filterValues();
    }

    #setSelectedNamespace(event: UUISelectEvent) {
        const value = event.target.value as string;
        this.selectedNamespace = value;
        this.#filterValues();
    }

    #setSelectedImplementNamespace(event: UUISelectEvent) {
        const value = event.target.value as string;
        this.selectedImplementedNamespace = value;
        this.#filterValues();
    }

    #setVisibility(event: UUIBooleanInputEvent) {
        const value = event.target.checked;
        this.visibility = value;
        this.#filterValues();
    }

    #filterValues() {
        this.filteredData = structuredClone(this.data);

        if (this.searchName !== '') {
            this.filteredData = this.filteredData?.filter(x => x.name.toLowerCase().includes(this.searchName));
        }

        if (this.searchImplemented !== '') {
            this.filteredData = this.filteredData?.filter(x => x.implementName?.toLowerCase().includes(this.searchImplemented));
        }

        if (this.selectedLifetime !== '') {
            this.filteredData = this.filteredData?.filter(x => x.lifetime === this.selectedLifetime);
        }

        if (this.selectedNamespace !== '') {
            this.filteredData = this.filteredData?.filter(x => x.namespace === this.selectedNamespace);
        }

        if (this.selectedImplementedNamespace !== '') {
            this.filteredData = this.filteredData?.filter(x => x.implementNamespace === this.selectedImplementedNamespace);
        }

        this.filteredData = this.filteredData?.filter(x => x.isPublic === this.visibility);

        if (this.filteredData) {
            this._tableItems = this.#mapData(this.filteredData);
        }
        else this._tableItems = [];
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="DI Services Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Names:</uui-label>
                            <uui-input
                                placeholder="Search names"
                                .value=${this.searchName}
                                @input=${this.#setSearchName}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Implemented:</uui-label>
                            <uui-input
                                placeholder="Search implemented"
                                .value=${this.searchImplemented}
                                @input=${this.#setSearchImplemented}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Lifetime:</uui-label>
                            <uui-select
                                .options=${this.lifetimes}
                                .value=${this.selectedLifetime}
                                @change=${this.#setSelectedLifetime}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Namespace:</uui-label>
                            <uui-select
                                .options=${this.namespaces}
                                .value=${this.selectedNamespace}
                                @change=${this.#setSelectedNamespace}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Implemented NS:</uui-label>
                            <uui-select
                                .options=${this.implementedNamespaces}
                                .value=${this.selectedImplementedNamespace}
                                @change=${this.#setSelectedImplementNamespace}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Visibility:</uui-label>
                            <umb-input-toggle
                                .checked=${this.visibility}
                                showLabels="true"
                                labelOn="Public"
                                labelOff="Any"
                                @change=${this.#setVisibility}>
                            </umb-input-toggle>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ?
                html`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${this.#sortingHandler} />
                    </uui-box>
                ` : html``}
            </umb-body-layout>
        `;
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

            .inline-flex {
                display: inline-flex;
                align-items: center;

                uui-icon {
                    margin-right: 6px;
                }
            }
        `
    ]
}

export default GodModeServicesBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-services-browser': GodModeServicesBrowserElement;
    }
}
