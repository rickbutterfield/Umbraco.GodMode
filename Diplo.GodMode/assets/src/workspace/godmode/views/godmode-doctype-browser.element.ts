import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, ContentTypeMap } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

@customElement('godmode-doctype-browser')
export class GodModeDocTypeBrowserElement extends UmbElementMixin(LitElement) {

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
            width: '20%'
        },
        {
            name: 'Description',
            alias: 'description',
            allowSorting: true,
            width: '25%'
        },
        {
            name: 'Icon',
            alias: 'icon',
            allowSorting: false,
            width: '10%'
        },
        {
            name: 'Properties',
            alias: 'propertyCount',
            allowSorting: true,
            width: '10%'
        },
        {
            name: 'Compositions',
            alias: 'hasCompositions',
            allowSorting: true,
            width: '15%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: ContentTypeMap[] = [];

    @state()
    filteredData: ContentTypeMap[] = [];

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
        const orderingColumn = table.orderingColumn as keyof ContentTypeMap;
        const orderingDesc = table.orderingDesc;

        this.filteredData = sortData(structuredClone(this.data), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.filteredData);
    }

    async #init() {
        this.isLoading = true;
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetContentTypeMap());

        if (data) {
            this.data = data;
            this.filteredData = structuredClone(this.data);
            this._tableItems = this.#mapData(this.filteredData);
        }
        this.isLoading = false;
    }

    #mapData(data: ContentTypeMap[]): UmbTableItem[] {
        return data.map((item) => {
            const propertyCount = (item.properties?.length || 0) + (item.compositionProperties?.length || 0);
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
                        columnAlias: 'description',
                        value: item.description || ''
                    },
                    {
                        columnAlias: 'icon',
                        value: html`<uui-icon name="${item.icon || 'icon-document'}"></uui-icon>`
                    },
                    {
                        columnAlias: 'propertyCount',
                        value: propertyCount
                    },
                    {
                        columnAlias: 'hasCompositions',
                        value: item.hasCompositions ? html`<uui-icon name="icon-check" style="color: green;"></uui-icon>` : ''
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
                <godmode-header name="Document Type Browser" slot="header"></godmode-header>
                
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

export default GodModeDocTypeBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-doctype-browser': GodModeDocTypeBrowserElement;
    }
}
