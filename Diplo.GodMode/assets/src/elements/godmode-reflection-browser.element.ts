import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, ifDefined, property, repeat, state } from "@umbraco-cms/backoffice/external/lit";
import { DirectionModel, DirectionModelEnum, GodModeService, TypeMap } from "../api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import { sortTypeMapData } from "../helpers/sort";

@customElement('godmode-reflection-browser')
export class GodModeReflectionBrowserElement extends UmbElementMixin(LitElement) {
    @property({ type: String })
    type?: string;

    @state()
    name?: string;

    @state()
    data?: TypeMap[] = undefined;

    @state()
    filteredData?: TypeMap[] = undefined;

    @state()
    searchName: string = '';

    @state()
    namespaces: Option[] = [];

    @state()
    selectedNamespace: string = '';

    @state()
    inherits: Option[] = [];

    @state()
    selectedInherits: string = '';

    @state()
    umbraco: Option[] = [{ name: 'Any', value: '', selected: true }, { name: 'Yes', value: 'yes' }, { name: 'No', value: 'no' }]

    @state()
    selectedUmbraco: string = '';

    @state()
    sortingDesc: boolean = false;

    @state()
    orderDirection: DirectionModel = DirectionModelEnum.ASCENDING;

    @state()
    orderBy: string = 'name';

    constructor() {
        super();
    }

    async connectedCallback() {
        super.connectedCallback();
        this.#init();
    }

    private _sortingHandler(column: keyof TypeMap) {
      this.sortingDesc = this.orderBy === column ? !this.sortingDesc : false;
      this.orderBy = column;

      this.orderDirection = this.sortingDesc ? DirectionModelEnum.DESCENDING : DirectionModelEnum.ASCENDING;

      if (this.data) {
        this.data = sortTypeMapData<TypeMap>(this.data, column, this.orderDirection);
        this.filteredData = structuredClone(this.data);
      }
    }

    async #init() {
        if (this.type) {
            let response: UmbDataSourceResponse<TypeMap[]> = {};

            if (this.type === "surface") {
                this.name = "Surface Controller Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetSurfaceControllers());
            }

            if (this.type === "api") {
                this.name = "API Controller Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetApiControllers());
            }

            if (this.type === "render") {
                this.name = "RenderMvc Controller Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetRenderMvcControllers());
            }

            if (this.type === "models") {
                this.name = "Published Content Model Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetPublishedContentModels());
            }

            if (this.type === "composers") {
                this.name = "Composer Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetComposers());
            }

            if (this.type === "converters") {
                this.name = "Property Value Converter Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetRenderMvcControllers());
            }

            if (this.type === "components") {
                this.name = "View Component Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetViewComponents());
            }

            if (this.type === "taghelpers") {
                this.name = "Tag Helpers Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetTagHelpers());
            }

            if (this.type === "finders") {
                this.name = "Content Finders Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetContentFinders());
            }

            if (this.type === "urlproviders") {
                this.name = "URL Providers Browser";
                response = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetUrlProviders());
            }

            if (response) {
                if (response.data) {
                    this.data = response.data;
                    this.filteredData = sortTypeMapData(structuredClone(this.data), 'name', this.orderDirection);
                    
                    let namespaces = [...new Set(this.data.map(x => x.namespace))];
                    this.namespaces = namespaces.map(x => { return { name: x, value: x } });
                    this.namespaces.unshift({ name: 'Any', value: '', selected: true });

                    let inherits = [...new Set(this.data.map(x => x.baseType))];
                    this.inherits = inherits.map(x => { return { name: x, value: x } });
                    this.inherits.unshift({ name: 'Any', value: '', selected: true });
                }
            }
        }
    }

    #setSearchName(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchName = value;
        this.#filterValues();
    }

    #setSelectedNamspace(event: UUISelectEvent) {
        const value = event.target.value as string;
        this.selectedNamespace = value;
        this.#filterValues();
    }

    #setSelectedInherits(event: UUISelectEvent) {
        const value = event.target.value as string;
        this.selectedInherits = value;
        this.#filterValues();
    }

    #setSelectedUmbraco(event: UUISelectEvent) {
        const value = event.target.value as string;
        this.selectedUmbraco = value;
        this.#filterValues();
    }

    #filterValues() {
        this.filteredData = structuredClone(this.data);

        if (this.searchName !== '') {
            this.filteredData = this.filteredData?.filter(x => x.name.toLowerCase().includes(this.searchName));
        }

        if (this.selectedNamespace !== '') {
            this.filteredData = this.filteredData?.filter(x => x.namespace === this.selectedNamespace);
        }

        if (this.selectedInherits !== '') {
            this.filteredData = this.filteredData?.filter(x => x.baseType === this.selectedInherits);
        }

        if (this.selectedUmbraco !== '') {
            this.filteredData = this.filteredData?.filter(x => x.isUmbraco === (this.selectedUmbraco === 'Yes' ? true : false));
        }
    }

    override render() {
        return html`
            <umb-body-layout>
                <godmode-header name=${ifDefined(this.name)} slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Search names"
                                .value=${this.searchName}
                                @input=${this.#setSearchName}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>In Namespace:</uui-label>
                            <uui-select
                                .options=${this.namespaces}
                                .value=${this.selectedNamespace}
                                @change=${this.#setSelectedNamspace}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Inherits From:</uui-label>
                            <uui-select
                                .options=${this.inherits}
                                .value=${this.selectedInherits}
                                @change=${this.#setSelectedInherits}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Is Umbraco?</uui-label>
                            <uui-select
                                .options=${this.umbraco}
                                .value=${this.selectedUmbraco}
                                @change=${this.#setSelectedUmbraco}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                <uui-box style="--uui-box-default-padding: 0;">
                    <uui-table>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>
                        <uui-table-column></uui-table-column>

                        <uui-table-head>
                            <uui-table-head-cell style="--uui-table-cell-padding: 0">
                              <button
                                label="Name"
                                style="font-weight: 700;"
                                @click=${() => this._sortingHandler('name')}>
                                Name
                                <uui-symbol-sort
                                  ?active=${this.orderBy === 'name'}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                            </uui-table-head-cell>
                            <uui-table-head-cell style="--uui-table-cell-padding: 0">
                              <button
                                label="Module"
                                style="font-weight: 700;"
                                @click=${() => this._sortingHandler('module')}>
                                Module
                                <uui-symbol-sort
                                  ?active=${this.orderBy === 'module'}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                            </uui-table-head-cell>
                            <uui-table-head-cell style="--uui-table-cell-padding: 0">
                              <button
                                label="Base Type"
                                style="font-weight: 700;"
                                @click=${() => this._sortingHandler('baseType')}>
                                Base Type
                                <uui-symbol-sort
                                  ?active=${this.orderBy === 'baseType'}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                            </uui-table-head-cell>
                            <uui-table-head-cell style="--uui-table-cell-padding: 0">
                              <button
                                label="Umbraco?"
                                style="font-weight: 700;"
                                @click=${() => this._sortingHandler('isUmbraco')}>
                                Umbraco?
                                <uui-symbol-sort
                                  ?active=${this.orderBy === 'isUmbraco'}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                            </uui-table-head-cell>
                        </uui-table-head>

                        ${repeat(
                            this.filteredData!,
                            (data) => data.name,
                            (data) =>
                                html`
                                    <uui-table-row>
                                        <uui-table-cell>
                                            <strong>${data.name}</strong>
                                        </uui-table-cell>
                                        <uui-table-cell>
                                            <code>${data.module}</code>
                                        </uui-table-cell>
                                        <uui-table-cell>
                                            ${data.baseType}
                                        </uui-table-cell>
                                        <uui-table-cell>
                                            <div class="inline-flex">
                                                ${data.isUmbraco ? html`<uui-icon name="icon-checkbox"></uui-icon> Yes` : html`<uui-icon name="icon-checkbox-empty"></uui-icon> No`}
                                            </div>
                                        </uui-table-cell>
                                    </uui-table-row>
                                `
                            )}
                    </uui-table>
                </uui-box>
            </umb-body-layout>
        `;
    }

    static styles = [
        css`
            .grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
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

            .inline-flex {
                display: inline-flex;
                align-items: center;

                uui-icon {
                    margin-right: 6px;
                }
            }

            uui-table-head-cell button {
                padding: var(--uui-size-4) var(--uui-size-5);
                background-color: transparent;
                color: inherit;
                border: none;
                cursor: pointer;
                font-family: var(--uui-font-family);
                font-weight: inherit;
                font-size: inherit;
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }
        `
    ]
}

export default GodModeReflectionBrowserElement;