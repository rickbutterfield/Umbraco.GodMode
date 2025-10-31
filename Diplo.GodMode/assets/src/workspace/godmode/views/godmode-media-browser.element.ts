import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, MediaMap } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

@customElement('godmode-media-browser')
export class GodModeMediaBrowserElement extends UmbElementMixin(LitElement) {

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
            name: 'Type',
            alias: 'type',
            allowSorting: true,
            width: '15%'
        },
        {
            name: 'Extension',
            alias: 'ext',
            allowSorting: true,
            width: '10%'
        },
        {
            name: 'Size',
            alias: 'size',
            allowSorting: true,
            width: '15%'
        },
        {
            name: 'Created',
            alias: 'createDate',
            allowSorting: true,
            width: '20%'
        },
        {
            name: 'Path',
            alias: 'path',
            allowSorting: false,
            width: '15%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: MediaMap | undefined;

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
        const orderingColumn = table.orderingColumn as string;
        const orderingDesc = table.orderingDesc;

        // MediaMap doesn't have a direct array, so we'll handle this in the future if needed
        // For now, just keep the current items
    }

    async #init() {
        this.isLoading = true;
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetMedia());

        if (data) {
            this.data = data;
            this._tableItems = this.#mapData(data);
        }
        this.isLoading = false;
    }

    #mapData(data: MediaMap): UmbTableItem[] {
        // MediaMap appears to be a single object, not an array
        // Create a single item from it
        const formatBytes = (bytes: number) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        };

        return [{
            id: data.id?.toString() || '',
            data: [
                {
                    columnAlias: 'name',
                    value: html`<strong>${data.name || ''}</strong>`
                },
                {
                    columnAlias: 'type',
                    value: data.type || ''
                },
                {
                    columnAlias: 'ext',
                    value: data.ext || ''
                },
                {
                    columnAlias: 'size',
                    value: formatBytes(data.size || 0)
                },
                {
                    columnAlias: 'createDate',
                    value: data.createDate ? new Date(data.createDate).toLocaleString() : ''
                },
                {
                    columnAlias: 'path',
                    value: data.path || ''
                }
            ]
        }];
    }

    #setSearchName(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchName = value.toLowerCase();
        // Filtering will be implemented when we understand the data structure better
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Media Browser" slot="header"></godmode-header>
                
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

export default GodModeMediaBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-media-browser': GodModeMediaBrowserElement;
    }
}
