import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, ContentItem, Lang } from "../../../api";
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

        },
        {
            name: 'Alias',
            alias: 'alias',
            allowSorting: true,

        },
        {
            name: 'Create Date',
            alias: 'createDate',
            allowSorting: true,
        },
        {
            name: 'Creator',
            alias: 'creatorName',
            allowSorting: true,

        },
        {
            name: 'Update Date',
            alias: 'updateDate',
            allowSorting: true,

        },
        {
            name: 'Updater',
            alias: 'updaterName',
            allowSorting: true,

        },
        {
            name: 'Culture',
            alias: 'culture',
            allowSorting: true,
        },
        {
            name: 'Recycled',
            alias: 'trashed',
            allowSorting: true,
        },
        {
            name: 'Id',
            alias: 'id',
            allowSorting: true,
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: ContentItem[] = [];

    @state()
    searchId: string = '';

    @state()
    searchName: string = '';

    @state()
    selectedAlias: string = '';

    @state()
    selectedLanguageId: number | null = null;

    @state()
    searchLevel: number | null = null;

    @state()
    trashed: boolean | null = null;

    @state()
    currentPage: number = 1;

    @state()
    totalPages: number = 1;

    @state()
    totalItems: number = 0;

    @state()
    isLoading: boolean = true;

    @state()
    contentTypeAliases: string[] = [];

    @state()
    contentTypeAliasOptions: Option[] = [];

    @state()
    languages: Lang[] = [];

    @state()
    languageOptions: Option[] = [];

    recycledOptions: Option[] = [
        { name: 'Any', value: '', selected: true },
        { name: 'Yes', value: 'true' },
        { name: 'No', value: 'false' }
    ]

    constructor() {
        super();
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.#loadFilterData();
        this.#fetchContent();
    }

    async #loadFilterData() {
        // Load content type aliases
        const { data: aliases } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetContentTypeAliases());
        if (aliases) {
            this.contentTypeAliases = aliases;
            this.contentTypeAliasOptions = aliases.map(x => { return { name: x, value: x } })
            this.contentTypeAliasOptions.unshift({ name: 'Any', value: '', selected: true });
        }

        // Load languages
        const { data: langs } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetLanguages());
        if (langs) {
            this.languages = langs;
            this.languageOptions = langs.map(x => { return { name: x.name, value: x.id.toString() } })
            this.languageOptions.unshift({ name: 'Any', value: '', selected: true });
        }
    }

    #sortingHandler(event: UmbTableOrderedEvent) {
        const table = event.target as UmbTableElement;
        const orderingColumn = table.orderingColumn as keyof ContentItem;
        const orderingDesc = table.orderingDesc;

        this.data = sortData(structuredClone(this.data), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.data);
    }

    async #fetchContent() {
        this.isLoading = true;
        
        const query: any = {
            page: this.currentPage,
            pageSize: 50,
        };

        if (this.searchId) query.id = this.searchId;
        if (this.searchName) query.name = this.searchName;
        if (this.selectedAlias) query.alias = this.selectedAlias;
        if (this.selectedLanguageId !== null) query.languageId = this.selectedLanguageId;
        if (this.searchLevel !== null) query.level = this.searchLevel;
        if (this.trashed !== null) query.trashed = this.trashed;

        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetContentPaged({ query }));

        if (data) {
            this.data = data.items || [];
            this._tableItems = this.#mapData(this.data);
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
                        value: html`<span class="${item.icon || 'icon-document'}"></span> ${item.alias || ''}`
                    },
                    {
                        columnAlias: 'createDate',
                        value: item.createDate ? new Date(item.createDate).toLocaleString() : ''
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
                        columnAlias: 'updaterName',
                        value: item.updaterName || ''
                    },
                    {
                        columnAlias: 'culture',
                        value: item.culture || ''
                    },
                    {
                        columnAlias: 'trashed',
                        value: item.trashed ? html`<uui-icon name="icon-check" style="color: red;"></uui-icon>` : ''
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
        this.#fetchContent();
    }

    #setSearchName(event: UUIInputEvent) {
        this.searchName = (event.target.value as string).trim();
        this.currentPage = 1;
        this.#fetchContent();
    }

    #setAlias(event: UUISelectEvent) {
        this.selectedAlias = event.target.value as string;
        this.currentPage = 1;
        this.#fetchContent();
    }

    #setLanguage(event: UUISelectEvent) {
        const value = event.target.value;
        this.selectedLanguageId = value ? parseInt(value as string) : null;
        this.currentPage = 1;
        this.#fetchContent();
    }

    #setLevel(event: UUIInputEvent) {
        const value = (event.target.value as string).trim();
        this.searchLevel = value ? parseInt(value) : null;
        this.currentPage = 1;
        this.#fetchContent();
    }

    #setTrashed(event: UUISelectEvent) {
        const value = event.target.value;
        this.trashed = value === 'true' ? true : value === 'false' ? false : null;
        this.currentPage = 1;
        this.#fetchContent();
    }

    #nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.#fetchContent();
        }
    }

    #prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.#fetchContent();
        }
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Content Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Node Id:</uui-label>
                            <uui-input
                                placeholder="Id or UDI"
                                .value=${this.searchId}
                                @input=${this.#setSearchId}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Name:</uui-label>
                            <uui-input
                                placeholder="Search node names"
                                .value=${this.searchName}
                                @input=${this.#setSearchName}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Content Alias:</uui-label>
                            <uui-select
                                .options=${this.contentTypeAliasOptions}
                                @change=${this.#setAlias}>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Language:</uui-label>
                            <uui-select
                                .options=${this.languageOptions}
                                @change=${this.#setLanguage}>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Tree Level:</uui-label>
                            <uui-input
                                type="number"
                                placeholder="Level"
                                .value=${this.searchLevel?.toString() || ''}
                                @input=${this.#setLevel}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Recycled?</uui-label>
                            <uui-select
                                .options=${this.recycledOptions}
                                @change=${this.#setTrashed}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? html`
                    <uui-loader-bar></uui-loader-bar>
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

            .pagination {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
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
