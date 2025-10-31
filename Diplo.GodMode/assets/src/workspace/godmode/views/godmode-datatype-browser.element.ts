import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, DataTypeMap } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

@customElement('godmode-datatype-browser')
export class GodModeDataTypeBrowserElement extends UmbElementMixin(LitElement) {

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
            name: 'Alias',
            alias: 'alias',
            allowSorting: true,
            width: '25%'
        },
        {
            name: 'DB Type',
            alias: 'dbType',
            allowSorting: true,
            width: '15%'
        },
        {
            name: 'Used',
            alias: 'isUsed',
            allowSorting: true,
            width: '10%'
        },
        {
            name: 'Updated',
            alias: 'updateDate',
            allowSorting: true,
            width: '25%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: DataTypeMap[] = [];

    @state()
    filteredData: DataTypeMap[] = [];

    @state()
    searchName: string = '';

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
        const orderingColumn = table.orderingColumn as keyof DataTypeMap;
        const orderingDesc = table.orderingDesc;

        this.filteredData = sortData(structuredClone(this.data), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.filteredData);
    }

    async #init() {
        this.isLoading = true;
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetDataTypes());

        if (data) {
            this.data = data;
            this.filteredData = structuredClone(this.data);
            this._tableItems = this.#mapData(this.filteredData);
        }
        this.isLoading = false;
    }

    #mapData(data: DataTypeMap[]): UmbTableItem[] {
        return data.map((item) => {
            return {
                id: item.id?.toString() || '',
                data: [
                    {
                        columnAlias: 'name',
                        value: html`<strong>${item.name || ''}</strong>`
                    },
                    {
                        columnAlias: 'alias',
                        value: item.alias || ''
                    },
                    {
                        columnAlias: 'dbType',
                        value: item.dbType || ''
                    },
                    {
                        columnAlias: 'isUsed',
                        value: item.isUsed ? html`<uui-icon name="icon-check" style="color: green;"></uui-icon>` : html`<uui-icon name="icon-wrong" style="color: red;"></uui-icon>`
                    },
                    {
                        columnAlias: 'updateDate',
                        value: item.updateDate ? new Date(item.updateDate).toLocaleString() : ''
                    }
                ]
            }
        });
    }

    #setSearchName(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchName = value.toLowerCase();
        this.#filterValues();
    }

    #filterValues() {
        this.filteredData = this.data.filter(item => {
            if (this.searchName && item.name) {
                return item.name.toLowerCase().includes(this.searchName);
            }
            return true;
        });
        this._tableItems = this.#mapData(this.filteredData);
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="DataType Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <uui-label>Search:</uui-label>
                    <uui-input
                        placeholder="Filter by name"
                        .value=${this.searchName}
                        @input=${this.#setSearchName}>
                    </uui-input>
                </uui-box>

                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
                ` : html``}

                ${!this.isLoading && this._tableItems.length > 0 ? html`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${this.#sortingHandler} />
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
        `
    ]
}

export default GodModeDataTypeBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-datatype-browser': GodModeDataTypeBrowserElement;
    }
}
