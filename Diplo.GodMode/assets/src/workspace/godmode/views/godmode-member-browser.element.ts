import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, MemberGroupModel } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

interface MemberItem {
    id: number;
    username: string;
    name: string;
    email: string;
    createDate: string;
    udi: string;
}

@customElement('godmode-member-browser')
export class GodModeMemberBrowserElement extends UmbElementMixin(LitElement) {

    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
        hideIcon: true
    }

    @state()
    private _tableColumns: Array<UmbTableColumn> = [
        {
            name: 'Username',
            alias: 'username',
            allowSorting: true,
            width: '20%'
        },
        {
            name: 'Name',
            alias: 'name',
            allowSorting: true,
            width: '20%'
        },
        {
            name: 'Email',
            alias: 'email',
            allowSorting: true,
            width: '20%'
        },
        {
            name: 'Create Date',
            alias: 'createDate',
            allowSorting: true,
            width: '20%'
        },
        {
            name: 'Id',
            alias: 'id',
            allowSorting: true,
            width: '20%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: MemberItem[] = [];

    @state()
    selectedGroup: number | null = null;

    @state()
    searchText: string = '';

    @state()
    currentPage: number = 1;

    @state()
    totalPages: number = 1;

    @state()
    totalItems: number = 0;

    @state()
    isLoading: boolean = true;

    @state()
    memberGroups: MemberGroupModel[] = [];

    @state()
    memberGroupOptions: Option[] = [];

    constructor() {
        super();
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.#loadFilterData();
        this.#fetchMembers();
    }

    async #loadFilterData() {
        // Load member groups
        const { data: groups } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetMemberGroups());
        if (groups) {
            this.memberGroups = groups;
            this.memberGroupOptions = this.memberGroups.map(x => { return { name: x.name, value: x.id.toString() } });
            this.memberGroupOptions.unshift({ name: 'Any', value: '', selected: true });
        }
    }

    #sortingHandler(event: UmbTableOrderedEvent) {
        const table = event.target as UmbTableElement;
        const orderingColumn = table.orderingColumn as keyof MemberItem;
        const orderingDesc = table.orderingDesc;

        this.data = sortData(structuredClone(this.data), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.data);
    }

    async #fetchMembers() {
        this.isLoading = true;

        const query: any = {
            page: this.currentPage,
            pageSize: 50
        };

        if (this.selectedGroup !== null) query.groupId = this.selectedGroup;
        if (this.searchText) query.search = this.searchText;

        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetMembersPaged({ query }));

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

    #mapData(data: MemberItem[]): UmbTableItem[] {
        return data.map((item) => {
            return {
                id: item.id?.toString() || '',
                data: [
                    {
                        columnAlias: 'username',
                        value: html`<strong>${item.username || ''}</strong>`
                    },
                    {
                        columnAlias: 'name',
                        value: item.name || ''
                    },
                    {
                        columnAlias: 'email',
                        value: html`<a href="mailto:${item.email}" target="_blank">${item.email || ''}</a>`
                    },
                    {
                        columnAlias: 'createDate',
                        value: item.createDate ? new Date(item.createDate).toLocaleString() : ''
                    },
                    {
                        columnAlias: 'id',
                        value: html`<div><strong>${item.id || ''}</strong><br/><code style="font-size: 0.8em;">${item.udi || ''}</code></div>`
                    }
                ]
            }
        });
    }

    #setGroup(event: UUISelectEvent) {
        const value = event.target.value;
        this.selectedGroup = value ? parseInt(value as string) : null;
        this.currentPage = 1;
        this.#fetchMembers();
    }

    #setSearchText(event: UUIInputEvent) {
        this.searchText = (event.target.value as string).trim();
        this.currentPage = 1;
        this.#fetchMembers();
    }

    #nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.#fetchMembers();
        }
    }

    #prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.#fetchMembers();
        }
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="Member Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Group:</uui-label>
                            <uui-select
                                .options=${this.memberGroupOptions}
                                @change=${this.#setGroup}
                            >
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Search members"
                                .value=${this.searchText}
                                @input=${this.#setSearchText}>
                            </uui-input>
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

                ${!this.isLoading && this._tableItems.length === 0 ? html`
                    <uui-box>
                        <p>No members were found for your selected criteria.</p>
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

export default GodModeMemberBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-member-browser': GodModeMemberBrowserElement;
    }
}
