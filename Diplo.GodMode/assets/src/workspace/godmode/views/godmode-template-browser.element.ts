import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, css, customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { GodModeService, TemplateModel } from "../../../api";
import { sortData } from "../../../helpers/sort";
import { DirectionModel } from "@umbraco-cms/backoffice/external/backend-api";

@customElement('godmode-template-browser')
export class GodModeTemplateBrowserElement extends UmbElementMixin(LitElement) {

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
  filteredData: TemplateModel[] = [];

  @state()
  searchName: string = '';

  @state()
  masterOptions: Option[] = [];

  @state()
  selectedMaster: string = '';

  @state()
  partialOptions: Option[] = [];

  @state()
  selectedPartial: string = '';

  constructor() {
    super();
  }

  async connectedCallback() {
    super.connectedCallback();
    this.#loadTemplates();
  }

  #sortingHandler(event: UmbTableOrderedEvent) {
    const table = event.target as UmbTableElement;
    const orderingColumn = table.orderingColumn as keyof TemplateModel;
    const orderingDesc = table.orderingDesc;

    this.filteredData = sortData(structuredClone(this.templates), orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
    this._tableItems = this.#mapData(this.filteredData);
  }

  async #loadTemplates() {
    const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetTemplates());

    if (data) {
      this.templates = data;
      this.filteredData = structuredClone(this.templates);
      this._tableItems = this.#mapData(this.filteredData);

      let partials = [...new Set(this.templates.map(x => x.partials).reduce((a, b) => { return a.concat(b) }))];
      this.partialOptions = partials.map(x => { return { name: x.name, value: x.name } });
      this.partialOptions.unshift({ name: 'Any', value: '', selected: true });

      let masters = [...new Set(this.templates.filter(x => x.isMaster))];
      this.masterOptions = masters.map(x => { return { name: x.name, value: x.id.toString() } });
      this.masterOptions.unshift({ name: 'Any', value: '', selected: true });
    }
  }

  #mapData(data: TemplateModel[]): UmbTableItem[] {
    return data.map((data) => {
      return {
        id: data.name,
        data: [
          {
            columnAlias: 'name',
            value: data.name
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

  #setSelectedMaster(event: UUISelectEvent) {
    const value = event.target.value as string;
    this.selectedMaster = value;
    this.#filterValues();
  }

  #setSelectedPartial(event: UUISelectEvent) {
    const value = event.target.value as string;
    this.selectedMaster = value;
    this.#filterValues();
  }

  #filterValues() {
    this.filteredData = structuredClone(this.templates);

    if (this.searchName !== '') {
      this.filteredData = this.filteredData?.filter(x => x.name.toLowerCase().includes(this.searchName));
    }

    if (this.selectedMaster !== '') {
      this.filteredData = this.filteredData?.filter(x => x.masterAlias?.toLowerCase().includes(this.selectedMaster));
    }

    if (this.selectedPartial !== '') {
      this.filteredData = this.filteredData?.filter(x => x.partials?.some(y => y.name === this.selectedPartial));
    }

    if (this.filteredData) {
      this._tableItems = this.#mapData(this.filteredData);
    }
    else this._tableItems = [];
  }

  override render() {
    return html`
            <umb-body-layout>
                <godmode-header name="Template Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter template names"
                                .value=${this.searchName}
                                @input=${this.#setSearchName}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Uses Master:</uui-label>
                            <uui-select
                                .options=${this.masterOptions}
                                .value=${this.selectedMaster}
                                @change=${this.#setSelectedMaster}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Uses Partial:</uui-label>
                            <uui-select
                                .options=${this.partialOptions}
                                .value=${this.selectedPartial}
                                @change=${this.#setSelectedPartial}>
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

export default GodModeTemplateBrowserElement;

declare global {
  interface HTMLElementTagNameMap {
    'godmode-template-browser': GodModeTemplateBrowserElement;
  }
}
