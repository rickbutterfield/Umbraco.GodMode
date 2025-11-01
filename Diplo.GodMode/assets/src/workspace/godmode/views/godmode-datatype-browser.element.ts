import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
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
        },
        {
            name: 'Alias',
            alias: 'alias',
            allowSorting: true,
        },
        {
            name: 'DB Type',
            alias: 'dbType',
            allowSorting: true,
        },
        {
            name: 'Used',
            alias: 'isUsed',
            allowSorting: true,
        },
        {
            name: 'Updated',
            alias: 'updateDate',
            allowSorting: true,
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    data: DataTypeMap[] = [];

    @state()
    filteredData: DataTypeMap[] = [];

    @state()
    propertyEditors: DataTypeMap[] = [];

    @state()
    searchName: string = '';

    @state()
    selectedEditor: string = '';

    @state()
    selectedDbType: string = '';

    @state()
    isUsed: boolean | null = null;

    @state()
    isUsedOptions: Option[] = [
        { name: 'Any', value: '', selected: true },
        { name: 'Yes', value: 'true' },
        { name: 'No', value: 'false' }
    ];

    @state()
    isLoading: boolean = true;

    @state()
    editorOptions: Option[] = [];

    @state()
    dbTypeOptions: Option[] = [];

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

        // Load data types
        const { data } = await tryExecute(this, GodModeService.getDataTypes());

        if (data) {
            this.data = data;
            this.filteredData = structuredClone(this.data);
            this._tableItems = this.#mapData(this.filteredData);

            // Extract unique DB types
            const dbTypes = new Set<string>();
            data.forEach(item => {
                if (item.dbType) {
                    dbTypes.add(item.dbType);
                }
            });
            this.dbTypeOptions = Array.from(dbTypes).map(type => ({ name: type, value: type }));
            this.dbTypeOptions.unshift({ name: 'Any', value: '' });
        }

        // Load property editors
        const { data: editors } = await tryExecute(this, GodModeService.getPropertyEditors());

        if (editors) {
            this.propertyEditors = editors;
            // Extract unique editor aliases
            const aliases = new Set<string>();
            editors.forEach(item => {
                if (item.alias) {
                    aliases.add(item.alias);
                }
            });
            this.editorOptions = Array.from(aliases).map(alias => ({ name: alias, value: alias }));
            this.editorOptions.unshift({ name: 'Any', value: '' });
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
                        value: item.alias
                    },
                    {
                        columnAlias: 'dbType',
                        value: html`<code>${item.dbType}</code>`
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

    #setEditor(event: UUISelectEvent) {
        this.selectedEditor = event.target.value as string;
        this.#filterValues();
    }

    #setDbType(event: UUISelectEvent) {
        this.selectedDbType = event.target.value as string;
        this.#filterValues();
    }

    #setIsUsed(event: UUISelectEvent) {
        const value = event.target.value;
        this.isUsed = value === 'true' ? true : value === 'false' ? false : null;
        this.#filterValues();
    }

    #filterValues() {
        this.filteredData = this.data.filter(item => {
            // Filter by name
            if (this.searchName && item.name) {
                if (!item.name.toLowerCase().includes(this.searchName)) {
                    return false;
                }
            }

            // Filter by editor/alias
            if (this.selectedEditor && item.alias) {
                if (item.alias !== this.selectedEditor) {
                    return false;
                }
            }

            // Filter by DB type
            if (this.selectedDbType && item.dbType) {
                if (item.dbType !== this.selectedDbType) {
                    return false;
                }
            }

            // Filter by is used
            if (this.isUsed !== null) {
                if (this.isUsed && !item.isUsed) return false;
                if (!this.isUsed && item.isUsed) return false;
            }

            return true;
        });
        this._tableItems = this.#mapData(this.filteredData);
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name="DataType Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter data types"
                                .value=${this.searchName}
                                @input=${this.#setSearchName}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Editor:</uui-label>
                            <uui-select .options=${this.editorOptions} @change=${this.#setEditor}>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>DB Type:</uui-label>
                            <uui-select .options=${this.dbTypeOptions} @change=${this.#setDbType}>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Is Used?</uui-label>
                            <uui-select .options=${this.isUsedOptions} @change=${this.#setIsUsed}>
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

                ${!this.isLoading && this._tableItems.length === 0 && this.data.length > 0 ? html`
                    <uui-box>
                        <p>No data types match the current filters.</p>
                    </uui-box>
                ` : html``}

                ${!this.isLoading ? html`
                    <uui-box>
                        <div class="alert">
                            <uui-icon name="icon-alert"></uui-icon>
                            <div>
                                <h4>Important!</h4>
                                <p>This only checks for datatypes that are used directly by a document type. Datatypes that are nested within another datatype (eg. within Block Editor, Grid or Nested Content) are not discoverable via the Umbraco API.</p>
                            </div>
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

            .alert {
                display: flex;
                gap: 12px;
                padding: 12px;
                background: var(--uui-color-warning-emphasis);
                border-radius: 6px;
                align-items: flex-start;
            }

            .alert uui-icon {
                color: var(--uui-color-warning);
                flex-shrink: 0;
            }

            .alert h4 {
                margin: 0 0 8px 0;
            }

            .alert p {
                margin: 0;
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