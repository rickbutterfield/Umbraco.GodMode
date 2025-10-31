import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, MemberModel } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

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
            width: '25%'
        },
        {
            name: 'Name',
            alias: 'name',
            allowSorting: true,
            width: '25%'
        },
        {
            name: 'Email',
            alias: 'email',
            allowSorting: true,
            width: '30%'
        },
        {
            name: 'Created',
            alias: 'createDate',
            allowSorting: true,
            width: '20%'
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: MemberModel | undefined;

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
        //const orderingColumn = table.orderingColumn as string;
        //const orderingDesc = table.orderingDesc;

        // MemberModel doesn't appear to be an array, handling will be adjusted
    }

    async #init() {
        this.isLoading = true;
        const { data } = await tryExecute(this, GodModeService.getUmbracoManagementApiV1GodModeGetMembersPaged());

        if (data) {
            this.data = data;
            this._tableItems = this.#mapData(data);
        }
        this.isLoading = false;
    }

    #mapData(data: MemberModel): UmbTableItem[] {
        // MemberModel appears to be a single object, not an array
        // Create a single item from it
        return [{
            id: data.id?.toString() || '',
            data: [
                {
                    columnAlias: 'username',
                    value: html`<strong>${data.username || ''}</strong>`
                },
                {
                    columnAlias: 'name',
                    value: data.name || ''
                },
                {
                    columnAlias: 'email',
                    value: data.email || ''
                },
                {
                    columnAlias: 'createDate',
                    value: data.createDate ? new Date(data.createDate).toLocaleString() : ''
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
                <godmode-header name="Member Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <uui-label>Search:</uui-label>
                    <uui-input
                        placeholder="Filter by username or email"
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

export default GodModeMemberBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-member-browser': GodModeMemberBrowserElement;
    }
}
