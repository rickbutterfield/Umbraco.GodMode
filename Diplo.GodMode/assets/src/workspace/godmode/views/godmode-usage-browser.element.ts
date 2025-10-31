import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
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
    isLoading: boolean = true;

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

        this.filteredData = sortData(structuredClone(this.data), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.filteredData);
    }

    async #init() {
        this.isLoading = true;
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetContentUsageData());

        if (data) {
            this.data = data;
            this.filteredData = structuredClone(this.data);
            this._tableItems = this.#mapData(this.filteredData);
        }
        this.isLoading = false;
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
                
                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
                ` : html``}

                ${!this.isLoading && this._tableItems.length > 0 ? html`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${this.#sortingHandler} />
                    </uui-box>
                ` : html``}

                ${!this.isLoading && this._tableItems.length === 0 ? html`
                    <uui-box>
                        <p>No usage data available.</p>
                    </uui-box>
                ` : html``}
            </umb-body-layout>
        `;
    }

    static styles = [
        css`
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
