import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, UsageModel } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

@customElement('godmode-usage-browser')
export class GodModeUsageBrowserElement extends UmbElementMixin(LitElement) {

    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
        hideIcon: true
    }

    @state()
    private _tableColumns: Array<UmbTableColumn> = [
        {
            name: 'Type',
            alias: 'type',
            allowSorting: true,
            width: '20%'
        },
        {
            name: 'Alias',
            alias: 'alias',
            allowSorting: true,
            width: '25%'
        },
        {
            name: 'Description',
            alias: 'description',
            allowSorting: true,
            width: '35%'
        },
        {
            name: 'Count',
            alias: 'nodeCount',
            allowSorting: true,
            width: '10%'
        },
        {
            name: 'Icon',
            alias: 'icon',
            allowSorting: false,
            width: '10%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: UsageModel[] = [];

    @state()
    filteredData: UsageModel[] = [];

    @state()
    searchAlias: string = '';

    @state()
    searchDescription: string = '';

    @state()
    selectedType: string = '';

    @state()
    isLoading: boolean = true;

    @state()
    typeOptions: string[] = [];

    constructor() {
        super();
    }

    async connectedCallback() {
        super.connectedCallback();
        this.#init();
    }

    #sortingHandler(event: UmbTableOrderedEvent) {
        const table = event.target as UmbTableElement;
        const orderingColumn = table.orderingColumn as keyof UsageModel;
        const orderingDesc = table.orderingDesc;

        this.filteredData = sortData(structuredClone(this.filteredData), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.filteredData);
    }

    async #init() {
        this.isLoading = true;
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetContentUsageData());

        if (data) {
            this.data = data;
            
            // Extract unique types
            const types = new Set<string>();
            data.forEach(item => {
                if (item.type) {
                    types.add(item.type);
                }
            });
            this.typeOptions = Array.from(types);
            
            this.filteredData = structuredClone(this.data);
            this._tableItems = this.#mapData(this.filteredData);
        }
        this.isLoading = false;
    }

    #setSearchAlias(event: UUIInputEvent) {
        this.searchAlias = (event.target.value as string).toLowerCase();
        this.#filterValues();
    }

    #setSearchDescription(event: UUIInputEvent) {
        this.searchDescription = (event.target.value as string).toLowerCase();
        this.#filterValues();
    }

    #setType(event: UUISelectEvent) {
        this.selectedType = event.target.value as string;
        this.#filterValues();
    }

    #filterValues() {
        this.filteredData = this.data.filter(item => {
            // Filter by alias
            if (this.searchAlias && item.alias) {
                if (!item.alias.toLowerCase().includes(this.searchAlias)) {
                    return false;
                }
            }

            // Filter by description
            if (this.searchDescription && item.description) {
                if (!item.description.toLowerCase().includes(this.searchDescription)) {
                    return false;
                }
            }

            // Filter by type
            if (this.selectedType && item.type) {
                if (item.type !== this.selectedType) {
                    return false;
                }
            }

            return true;
        });
        this._tableItems = this.#mapData(this.filteredData);
    }

    #mapData(data: UsageModel[]): UmbTableItem[] {
        return data.map((item) => {
            return {
                id: item.id?.toString() || '',
                data: [
                    {
                        columnAlias: 'type',
                        value: html`<strong>${item.type || ''}</strong>`
                    },
                    {
                        columnAlias: 'alias',
                        value: item.alias || ''
                    },
                    {
                        columnAlias: 'description',
                        value: item.description || ''
                    },
                    {
                        columnAlias: 'nodeCount',
                        value: html`<span class="node-count">${item.nodeCount || 0}</span>`
                    },
                    {
                        columnAlias: 'icon',
                        value: html`<uui-icon name="${item.icon || 'icon-document'}"></uui-icon>`
                    }
                ]
            }
        });
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Usage Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Alias:</uui-label>
                            <uui-input
                                placeholder="Search content-type aliases"
                                .value=${this.searchAlias}
                                @input=${this.#setSearchAlias}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Description:</uui-label>
                            <uui-input
                                placeholder="Search content-type descriptions"
                                .value=${this.searchDescription}
                                @input=${this.#setSearchDescription}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Type:</uui-label>
                            <uui-select @change=${this.#setType}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.typeOptions.map(type => html`
                                    <uui-select-option value="${type}">${type}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
                ` : html``}

                ${!this.isLoading && this.data.length > 0 ? html`
                    <uui-box>
                        <p><strong>${this.filteredData.length}</strong> / <strong>${this.data.length}</strong> items</p>
                    </uui-box>
                ` : html``}

                ${!this.isLoading && this._tableItems.length > 0 ? html`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${this.#sortingHandler} />
                    </uui-box>
                ` : html``}

                ${!this.isLoading && this._tableItems.length === 0 && this.data.length > 0 ? html`
                    <uui-box>
                        <p>No usage data matches the current filters.</p>
                    </uui-box>
                ` : html``}

                ${!this.isLoading && this.data.length === 0 ? html`
                    <uui-box>
                        <p>No usage data available.</p>
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
            }

            uui-box {
                margin-bottom: 20px;
            }

            .node-count {
                font-weight: bold;
                color: var(--uui-color-emphasis);
            }
        `
    ]
}

export default GodModeUsageBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-usage-browser': GodModeUsageBrowserElement;
    }
}
