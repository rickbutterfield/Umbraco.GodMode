import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UUIBooleanInputEvent, UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, PartialMap, RegisteredService, TemplateModel } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

@customElement('godmode-partial-browser')
export class GodModePartialBrowserElement extends UmbElementMixin(LitElement) {

  @state()
  private _tableConfig: UmbTableConfig = {
    allowSelection: false,
    hideIcon: true
  }

  @state()
  private _tableColumns: Array<UmbTableColumn> = [
    {
      name: 'Partial Name',
      alias: 'name',
      allowSorting: true
    },
    {
      name: 'Template Name',
      alias: 'templateName',
      allowSorting: true
    }
  ];

  @state()
  private _tableItems: Array<UmbTableItem> = [];

  @state()
  templates: TemplateModel[] = [];

  @state()
  partials: PartialMap[] = [];

  @state()
  filteredData: PartialMap[] = [];

  @state()
  searchName: string = '';

  @state()
  templateOptions: Option[] = [];

  @state()
  selectedTemplate: string = '';

  constructor() {
    super();
  }

  async connectedCallback() {
    super.connectedCallback();
    this.#loadPartials();
  }

  #sortingHandler(event: UmbTableOrderedEvent) {
    const table = event.target as UmbTableElement;
    const orderingColumn = table.orderingColumn as keyof PartialMap;
    const orderingDesc = table.orderingDesc;

    this.filteredData = sortData(structuredClone(this.partials), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
    this._tableItems = this.#mapData(this.filteredData);
  }

  async #loadPartials() {
    const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetTemplates());

    if (data) {
      this.templates = data;
      this.partials = data.map((template) => {
        return template.partials;
      }).reduce((a, b) => {
        return a.concat(b);
      });

      this.filteredData = structuredClone(this.partials);
      this._tableItems = this.#mapData(this.filteredData);

      let templates = [...new Set(this.partials.map(x => x.templateAlias))];
      this.templateOptions = templates.map(x => { return { name: x, value: x } });
      this.templateOptions.unshift({ name: 'Any', value: '', selected: true });
    }
  }

  #mapData(data: PartialMap[]): UmbTableItem[] {
    return data.map((data) => {
      return {
        id: data.name,
        data: [
          {
            columnAlias: 'name',
            value: data.name
          },
          {
            columnAlias: 'templateName',
            value: data.templateAlias
          }
        ]
      }
    });
  }

  #setSearchName(event: UUIInputEvent) {
    const value = event.target.value as string;
    this.searchName = value;
    this.#filterValues();
  }

  #setSelectedTemplate(event: UUISelectEvent) {
    const value = event.target.value as string;
    this.selectedTemplate = value;
    this.#filterValues();
  }

  #filterValues() {
    this.filteredData = structuredClone(this.partials);

    if (this.searchName !== '') {
      this.filteredData = this.filteredData?.filter(x => x.name.toLowerCase().includes(this.searchName));
    }

    if (this.selectedTemplate !== '') {
      this.filteredData = this.filteredData?.filter(x => x.templateAlias?.toLowerCase().includes(this.selectedTemplate));
    }

    if (this.filteredData) {
      this._tableItems = this.#mapData(this.filteredData);
    }
    else this._tableItems = [];
  }

  override render() {
    return html`
            <umb-body-layout>
                <godmode-header name="Partial Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter partial names"
                                .value=${this.searchName}
                                @input=${this.#setSearchName}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>In Template:</uui-label>
                            <uui-select
                                .options=${this.templateOptions}
                                .value=${this.selectedTemplate}
                                @change=${this.#setSelectedTemplate}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ?
        html`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${this.#sortingHandler} />
                    </uui-box>
                ` : html``}
            </umb-body-layout>
        `;
  }

  static styles = [
    css`
            .grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
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
        `
  ]
}

export default GodModePartialBrowserElement;

declare global {
  interface HTMLElementTagNameMap {
    'godmode-partial-browser': GodModePartialBrowserElement;
  }
}
