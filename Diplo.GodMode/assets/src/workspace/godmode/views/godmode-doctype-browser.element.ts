import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
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
    searchDocType: string = '';

    @state()
    searchTemplate: string = '';

    @state()
    searchProperty: string = '';

    @state()
    includeInherited: boolean = false;

    @state()
    hasTemplate: boolean | null = null;

    @state()
    hasCompositions: boolean | null = null;

    @state()
    isElement: boolean | null = null;

    @state()
    isListView: boolean | null = null;

    @state()
    selectedComposition: string = '';

    @state()
    selectedPropertyGroup: string = '';

    @state()
    isLoading: boolean = true;

    @state()
    hasTemplateOptions: Option[] = [
        { name: 'Any', value: '', selected: true },
        { name: 'Yes', value: 'true' },
        { name: 'No', value: 'false' }
    ];

    @state()
    hasCompositionsOptions: Option[] = [
        { name: 'Any', value: '', selected: true },
        { name: 'Yes', value: 'true' },
        { name: 'No', value: 'false' }
    ];

    @state()
    isElementOptions: Option[] = [
        { name: 'Any', value: '', selected: true },
        { name: 'Yes', value: 'true' },
        { name: 'No', value: 'false' }
    ];

    @state()
    isListViewOptions: Option[] = [
        { name: 'Any', value: '', selected: true },
        { name: 'Yes', value: 'true' },
        { name: 'No', value: 'false' }
    ];

    @state()
    compositionOptions: Option[] = [];

    @state()
    propertyGroupOptions: Option[] = [];

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
        const { data } = await tryExecute(this, GodModeService.getContentTypeMap());

        if (data) {
            this.data = data;
            this.filteredData = structuredClone(this.data);
            this._tableItems = this.#mapData(this.filteredData);

            // Extract unique compositions for filter
            const compositions = new Set<string>();
            data.forEach(item => {
                item.compositions?.forEach(comp => {
                    if (comp.name) {
                        compositions.add(comp.name);
                    }
                });
            });
            this.compositionOptions = Array.from(compositions).map(name => ({ name, value: name }));
            this.compositionOptions.unshift({ name: 'Any', value: '', selected: true });

            // Extract unique property groups for filter
            const groups = new Set<string>();
            data.forEach(item => {
                item.propertyGroups?.forEach(group => {
                    if (group) {
                        groups.add(group);
                    }
                });
            });
            this.propertyGroupOptions = Array.from(groups).map(name => ({ name, value: name }));
            this.propertyGroupOptions.unshift({ name: 'Any', value: '', selected: true });
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

    #setSearchDocType(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchDocType = value.toLowerCase();
        this.#filterValues();
    }

    #setSearchTemplate(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchTemplate = value.toLowerCase();
        this.#filterValues();
    }

    #setSearchProperty(event: UUIInputEvent) {
        const value = event.target.value as string;
        this.searchProperty = value.toLowerCase();
        this.#filterValues();
    }

    #toggleIncludeInherited(event: Event) {
        this.includeInherited = (event.target as HTMLInputElement).checked;
        this.#filterValues();
    }

    #setHasTemplate(event: UUISelectEvent) {
        const value = event.target.value;
        this.hasTemplate = value === 'true' ? true : value === 'false' ? false : null;
        this.#filterValues();
    }

    #setHasCompositions(event: UUISelectEvent) {
        const value = event.target.value;
        this.hasCompositions = value === 'true' ? true : value === 'false' ? false : null;
        this.#filterValues();
    }

    #setIsElement(event: UUISelectEvent) {
        const value = event.target.value;
        this.isElement = value === 'true' ? true : value === 'false' ? false : null;
        this.#filterValues();
    }

    #setIsListView(event: UUISelectEvent) {
        const value = event.target.value;
        this.isListView = value === 'true' ? true : value === 'false' ? false : null;
        this.#filterValues();
    }

    #setComposition(event: UUISelectEvent) {
        this.selectedComposition = event.target.value as string;
        this.#filterValues();
    }

    #setPropertyGroup(event: UUISelectEvent) {
        this.selectedPropertyGroup = event.target.value as string;
        this.#filterValues();
    }

    #filterValues() {
        this.filteredData = this.data.filter(item => {
            // Filter by doc type name/alias
            if (this.searchDocType) {
                const matches = item.name?.toLowerCase().includes(this.searchDocType) ||
                    item.alias?.toLowerCase().includes(this.searchDocType);
                if (!matches) return false;
            }

            // Filter by template
            if (this.searchTemplate) {
                const hasMatchingTemplate = item.templates?.some(t =>
                    t.name?.toLowerCase().includes(this.searchTemplate)
                );
                if (!hasMatchingTemplate) return false;
            }

            // Filter by property
            if (this.searchProperty) {
                const properties = this.includeInherited ? item.allProperties : item.properties;
                const hasMatchingProperty = properties?.some(p =>
                    p.name?.toLowerCase().includes(this.searchProperty) ||
                    p.alias?.toLowerCase().includes(this.searchProperty)
                );
                if (!hasMatchingProperty) return false;
            }

            // Filter by has template
            if (this.hasTemplate !== null) {
                if (this.hasTemplate && !item.hasTemplates) return false;
                if (!this.hasTemplate && item.hasTemplates) return false;
            }

            // Filter by has compositions
            if (this.hasCompositions !== null) {
                if (this.hasCompositions && !item.hasCompositions) return false;
                if (!this.hasCompositions && item.hasCompositions) return false;
            }

            // Filter by is element
            if (this.isElement !== null) {
                if (this.isElement && !item.isComposition) return false;
                if (!this.isElement && item.isComposition) return false;
            }

            // Filter by is list view
            if (this.isListView !== null) {
                if (this.isListView && !item.isListView) return false;
                if (!this.isListView && item.isListView) return false;
            }

            // Filter by composition
            if (this.selectedComposition) {
                const hasComposition = item.compositions?.some(c => c.name === this.selectedComposition);
                if (!hasComposition) return false;
            }

            // Filter by property group
            if (this.selectedPropertyGroup) {
                const hasGroup = item.propertyGroups?.includes(this.selectedPropertyGroup);
                if (!hasGroup) return false;
            }

            return true;
        });
        this._tableItems = this.#mapData(this.filteredData);
    }

    override render() {
        return html`
            <umb-body-layout>
            <godmode-header name="Document Type Browser" slot="header"></godmode-header>
          
    <uui-box headline="Search Filters">
             <div class="grid">
        <div>
<uui-label>Has Template?</uui-label>
   <uui-select
     .options=${this.hasTemplateOptions}
           @change=${this.#setHasTemplate}>
      </uui-select>
        </div>

           <div>
   <uui-label>Has Compositions?</uui-label>
   <uui-select
        .options=${this.hasCompositionsOptions}
   @change=${this.#setHasCompositions}>
        </uui-select>
  </div>

         <div>
<uui-label>Composed With:</uui-label>
    <uui-select
         .options=${this.compositionOptions}
 @change=${this.#setComposition}>
     </uui-select>
  </div>

  <div>
    <uui-label>Element Type?</uui-label>
           <uui-select
             .options=${this.isElementOptions}
          @change=${this.#setIsElement}>
       </uui-select>
      </div>

          <div>
        <uui-label>Has Group:</uui-label>
     <uui-select
            .options=${this.propertyGroupOptions}
        @change=${this.#setPropertyGroup}>
      </uui-select>
       </div>

      <div>
 <uui-label>List View?</uui-label>
       <uui-select
    .options=${this.isListViewOptions}
          @change=${this.#setIsListView}>
         </uui-select>
      </div>

   <div>
    <uui-label>Search document types</uui-label>
      <uui-input
         placeholder="Filter document types"
     .value=${this.searchDocType}
           @input=${this.#setSearchDocType}>
            </uui-input>
            </div>

   <div>
       <uui-label>Search templates</uui-label>
           <uui-input
          placeholder="Filter templates"
      .value=${this.searchTemplate}
           @input=${this.#setSearchTemplate}>
   </uui-input>
        </div>

                <div>
       <uui-label>Search properties</uui-label>
      <div class="property-search">
         <uui-input
 placeholder="Filter properties"
            .value=${this.searchProperty}
    @input=${this.#setSearchProperty}>
           </uui-input>
             <uui-checkbox
       label="Include inherited"
           ?checked=${this.includeInherited}
 @change=${this.#toggleIncludeInherited}>
                Include inherited
         </uui-checkbox>
              </div>
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
       <p>No document types match the current filters.</p>
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

            .property-search {
     display: flex;
          flex-direction: column;
        gap: 8px;
}

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