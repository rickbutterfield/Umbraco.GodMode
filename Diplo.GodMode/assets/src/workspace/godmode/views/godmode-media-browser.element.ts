import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, ItemBase } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

interface MediaItem {
    id: number;
    udi: string;
    name: string;
    alias: string;
    ext: string;
    type: string;
    size: number;
    updateDate: string;
    path: string;
}

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
            width: '30%'
        },
        {
            name: 'Media',
            alias: 'alias',
            allowSorting: true,
            width: '15%'
        },
        {
            name: 'Type',
            alias: 'type',
            allowSorting: false,
            width: '15%'
        },
        {
            name: 'Size',
            alias: 'size',
            allowSorting: true,
            width: '10%'
        },
        {
            name: 'Update Date',
            alias: 'updateDate',
            allowSorting: true,
            width: '15%'
        },
        {
            name: 'Id',
            alias: 'id',
            allowSorting: true,
            width: '15%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: MediaItem[] = [];

    @state()
    searchId: string = '';

    @state()
    searchName: string = '';

    @state()
    selectedMediaType: number | null = null;

    @state()
    currentPage: number = 1;

    @state()
    totalPages: number = 1;

    @state()
    totalItems: number = 0;

    @state()
    isLoading: boolean = true;

    @state()
    mediaTypes: ItemBase[] = [];

    constructor() {
        super();
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.#loadFilterData();
        this.#fetchMedia();
    }

    async #loadFilterData() {
        // Load media types
        const { data: types } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetMediaTypes());
        if (types) {
            this.mediaTypes = types;
        }
    }

    #sortingHandler(event: UmbTableOrderedEvent) {
        const table = event.target as UmbTableElement;
        const orderingColumn = table.orderingColumn as keyof MediaItem;
        const orderingDesc = table.orderingDesc;

        this.data = sortData(structuredClone(this.data), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.data);
    }

    async #fetchMedia() {
        this.isLoading = true;
        
        const query: any = {
            page: this.currentPage,
            pageSize: 50
        };

        if (this.searchId) query.id = parseInt(this.searchId);
        if (this.searchName) query.name = this.searchName;
        if (this.selectedMediaType !== null) query.mediaTypeId = this.selectedMediaType;

        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetMedia({ query }));

        if (data) {
            // API type is wrong - it should return paginated data
            // Handle both single object and paginated response
            if ((data as any).items) {
                this.data = (data as any).items || [];
                this.currentPage = (data as any).currentPage || 1;
                this.totalPages = (data as any).totalPages || 1;
                this.totalItems = (data as any).totalItems || 0;
            } else {
                // Fallback for single object response (API type issue)
                this.data = [data as any];
                this.currentPage = 1;
                this.totalPages = 1;
                this.totalItems = 1;
            }
            this._tableItems = this.#mapData(this.data);
        }
        this.isLoading = false;
    }

    #formatBytes(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    #mapData(data: MediaItem[]): UmbTableItem[] {
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
                        columnAlias: 'type',
                        value: item.type || item.ext || ''
                    },
                    {
                        columnAlias: 'size',
                        value: this.#formatBytes(item.size || 0)
                    },
                    {
                        columnAlias: 'updateDate',
                        value: item.updateDate ? new Date(item.updateDate).toLocaleString() : ''
                    },
                    {
                        columnAlias: 'id',
                        value: html`<div><strong>${item.id || ''}</strong><br/><code style="font-size: 0.8em;">${item.udi || ''}</code></div>`
                    }
                ]
            }
        });
    }

    #setSearchId(event: UUIInputEvent) {
        this.searchId = (event.target.value as string).trim();
        this.currentPage = 1;
        this.#fetchMedia();
    }

    #setSearchName(event: UUIInputEvent) {
        this.searchName = (event.target.value as string).trim();
        this.currentPage = 1;
        this.#fetchMedia();
    }

    #setMediaType(event: UUISelectEvent) {
        const value = event.target.value;
        this.selectedMediaType = value ? parseInt(value as string) : null;
        this.currentPage = 1;
        this.#fetchMedia();
    }

    #nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.#fetchMedia();
        }
    }

    #prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.#fetchMedia();
        }
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Media Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Media Id:</uui-label>
                            <uui-input
                                placeholder="Search Id"
                                .value=${this.searchId}
                                @input=${this.#setSearchId}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter media names"
                                .value=${this.searchName}
                                @input=${this.#setSearchName}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Media Type:</uui-label>
                            <uui-select @change=${this.#setMediaType}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.mediaTypes.map(type => html`
                                    <uui-select-option value="${type.id}">${type.alias}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
                ` : html``}

                ${!this.isLoading && this.totalItems > 0 ? html`
                    <uui-box>
                        <p><strong>${this.data.length}</strong> / <strong>${this.totalItems}</strong> items</p>
                    </uui-box>
                ` : html``}

                ${!this.isLoading && this._tableItems.length > 0 ? html`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${this.#sortingHandler} />
                    </uui-box>
                ` : html``}

                ${!this.isLoading && this.totalPages > 1 ? html`
                    <uui-box>
                        <div class="pagination">
                            <uui-button
                                label="Previous"
                                look="default"
                                ?disabled=${this.currentPage === 1}
                                @click=${this.#prevPage}>
                                Previous
                            </uui-button>
                            <span>Page ${this.currentPage} of ${this.totalPages}</span>
                            <uui-button
                                label="Next"
                                look="default"
                                ?disabled=${this.currentPage === this.totalPages}
                                @click=${this.#nextPage}>
                                Next
                            </uui-button>
                        </div>
                    </uui-box>
                ` : html``}

                ${!this.isLoading && this._tableItems.length === 0 ? html`
                    <uui-box>
                        <p>No media was found for your selected criteria.</p>
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

            .pagination {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
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
