import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, ContentItem } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

@customElement('godmode-content-browser')
export class GodModeContentBrowserElement extends UmbElementMixin(LitElement) {

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
            width: '20%'
        },
        {
            name: 'Alias',
            alias: 'alias',
            allowSorting: true,
            width: '15%'
        },
        {
            name: 'Icon',
            alias: 'icon',
            allowSorting: false,
            width: '8%'
        },
        {
            name: 'Level',
            alias: 'level',
            allowSorting: true,
            width: '7%'
        },
        {
            name: 'Creator',
            alias: 'creatorName',
            allowSorting: true,
            width: '15%'
        },
        {
            name: 'Updated',
            alias: 'updateDate',
            allowSorting: true,
            width: '15%'
        },
        {
            name: 'Trashed',
            alias: 'trashed',
            allowSorting: true,
            width: '10%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: ContentItem[] = [];

    @state()
    filteredData: ContentItem[] = [];

    @state()
    searchName: string = '';

    @state()
    currentPage: number = 1;

    @state()
    totalPages: number = 1;

    @state()
    totalItems: number = 0;

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
        const orderingColumn = table.orderingColumn as keyof ContentItem;
        const orderingDesc = table.orderingDesc;

        this.filteredData = sortData(structuredClone(this.data), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.filteredData);
    }

    async #init() {
        this.isLoading = true;
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetContentPaged({
            query: {
                page: this.currentPage,
                pageSize: 50
            }
        }));

        if (data) {
            this.data = data.items || [];
            this.filteredData = structuredClone(this.data);
            this._tableItems = this.#mapData(this.filteredData);
            this.currentPage = data.currentPage || 1;
            this.totalPages = data.totalPages || 1;
            this.totalItems = data.totalItems || 0;
        }
        this.isLoading = false;
    }

    #mapData(data: ContentItem[]): UmbTableItem[] {
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
                        columnAlias: 'icon',
                        value: html`<uui-icon name="${item.icon || 'icon-document'}"></uui-icon>`
                    },
                    {
                        columnAlias: 'level',
                        value: item.level || 0
                    },
                    {
                        columnAlias: 'creatorName',
                        value: item.creatorName || ''
                    },
                    {
                        columnAlias: 'updateDate',
                        value: item.updateDate ? new Date(item.updateDate).toLocaleString() : ''
                    },
                    {
                        columnAlias: 'trashed',
                        value: item.trashed ? html`<uui-icon name="icon-trash" style="color: red;"></uui-icon>` : ''
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
                return item.name.toLowerCase().includes(this.searchName) || 
                       item.alias?.toLowerCase().includes(this.searchName);
            }
            return true;
        });
        this._tableItems = this.#mapData(this.filteredData);
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Content Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <uui-label>Search:</uui-label>
                    <uui-input
                        placeholder="Filter by name or alias"
                        .value=${this.searchName}
                        @input=${this.#setSearchName}>
                    </uui-input>
                </uui-box>

                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
                ` : html``}

                ${!this.isLoading && this.totalItems > 0 ? html`
                    <uui-box>
                        <p>Showing page ${this.currentPage} of ${this.totalPages} (${this.totalItems} total items)</p>
                    </uui-box>
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

export default GodModeContentBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-content-browser': GodModeContentBrowserElement;
    }
}
