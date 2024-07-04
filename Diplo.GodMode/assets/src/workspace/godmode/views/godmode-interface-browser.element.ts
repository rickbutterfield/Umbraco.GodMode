import { customElement, html, css, state, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { DirectionModel, GodModeService, NameValue, TypeMap } from "../../../api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import { sortData } from "../../../helpers/sort";
import { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from "@umbraco-cms/backoffice/components";

@customElement('godmode-interface-browser')
export class GodModeInterfaceBrowserElement extends UmbLitElement {

    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
        hideIcon: true
    }

    @state()
    private _tableColumns: Array<UmbTableColumn> = [
        {
            name: 'Implemented By',
            alias: 'name',
            allowSorting: true
        },
        {
            name: 'Namespace',
            alias: 'namespace',
            allowSorting: true
        },
        {
            name: 'Module',
            alias: 'module',
            allowSorting: true
        },
        {
            name: 'Base Type',
            alias: 'baseType',
            allowSorting: true
        }
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    @state()
    assemblies: Array<NameValue> = [];

    @state()
    assemblyOptions: Array<Option> = [];

    @state()
    currentAssembly: NameValue | undefined = undefined;

    @state()
    currentAssemblyOption: string = '';

    @state()
    interfaces: Array<TypeMap> = [];

    @state()
    interfaceOptions: Array<Option> = [];

    @state()
    currentInterface: TypeMap | undefined = undefined;

    @state()
    currentInterfaceOption: string = '';

    @state()
    types: Array<TypeMap> = [];

    constructor() {
        super();
        this.#loadAssemblies();
    }

    #sortingHandler(event: UmbTableOrderedEvent) {
        const table = event.target as UmbTableElement;
        const orderingColumn = table.orderingColumn as keyof TypeMap;
        const orderingDesc = table.orderingDesc;

        this.types = sortData(this.types, orderingColumn, orderingDesc ? DirectionModel.DESCENDING : DirectionModel.ASCENDING);
        this._tableItems = this.#mapData(this.types);
    }

    async #loadAssemblies() {
        const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetAssemblies());

        if (data) {
            this.assemblies = data;

            this.assemblyOptions = this.assemblies.map((assembly) => ({ name: assembly.name, value: assembly.name }));
            this.assemblyOptions.unshift({ name: 'Please select', value: '' })
        }
    }

    async #getInterfaces(event: UUISelectEvent) {
        this.currentAssemblyOption = event.target.value as string;

        if (this.currentAssemblyOption !== '') {
            this.currentAssembly = this.assemblies.find(x => x.name === this.currentAssemblyOption);

            const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetInterfacesFrom({ assembly: this.currentAssemblyOption }));

            if (data) {
                this.interfaces = data;

                this.interfaceOptions = this.interfaces.map((int) => ({ name: int.name, value: int.name }));
                this.interfaceOptions.unshift({ name: 'Please select', value: '' });
            }
        }
        else {
            this.currentAssembly = undefined;
            this.currentInterface = undefined;
            this.currentInterfaceOption = '';
            this.interfaces = [];
            this.interfaceOptions = [];
        }
    }

    async #getTypes(event: UUISelectEvent) {
        this.currentInterfaceOption = event.target.value as string;

        if (this.currentInterfaceOption !== '') {
            this.currentInterface = this.interfaces.find(x => x.name === this.currentInterfaceOption);

            if (this.currentInterface) {
                const { data } = await tryExecuteAndNotify(this, GodModeService.getUmbracoManagementApiV1GodModeGetTypesAssignableFrom({ baseType: this.currentInterface.loadableName }));

                if (data) {
                    this.types = data;
                    this._tableItems = this.#mapData(this.types);
                }
            }
        }
        else {
            this.currentInterface = undefined;
            this.types = [];
        }
    }

    #mapData(data: TypeMap[]): UmbTableItem[] {
        return data.map((data) => {
            return {
                id: data.name,
                data: [
                    {
                        columnAlias: 'name',
                        value: data.name
                    },
                    {
                        columnAlias: 'namespace',
                        value: data.namespace
                    },
                    {
                        columnAlias: 'module',
                        value: data.module
                    },
                    {
                        columnAlias: 'baseType',
                        value: data.baseType
                    }
                ]
            }
        });
    }

    render() {
        return html`
      <umb-body-layout>
        <godmode-header name="Interface Browser" slot="header"></godmode-header>

        <uui-box>
          <div class="grid">
              <div>
                  <uui-label for="search-assembly">Assembly:</uui-label>
                  <uui-select
                      id="search-assembly"
                      .options=${this.assemblyOptions}
                      @change=${this.#getInterfaces}
                      .value=${this.currentAssemblyOption}>
                  </uui-select>
              </div>
              ${this.currentAssemblyOption !== '' ?
                html`
                  <div>
                      <uui-label for="search-interface">Interface:</uui-label>
                      <uui-select
                          id="search-interface"
                          .options=${this.interfaceOptions}
                          @change=${this.#getTypes}
                          .value=${this.currentInterfaceOption}>
                      </uui-select>
                  </div>
              ` : html``
            }
          </div>
        </uui-box>

        ${this.currentAssemblyOption === '' ?
                html`
            <uui-box>Please select an Assembly (above) and then the Interface you wish to browse. You will then see all types that implement the Interface.</uui-box>
          `
                :
                html`
            <h5>${this.currentAssembly?.value}</h5>

            ${this.types.length !== 0 ?
                        html`
                <uui-box style="--uui-box-default-padding: 0;">
                  ${this._tableItems.length !== 0 ?
                                html`
                        <uui-box style="--uui-box-default-padding: 0;">
                            <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${this.#sortingHandler} />
                        </uui-box>
                    ` : html``}
                </uui-box>
              ` : html``
                    }
          `
            }
      </umb-body-layout>
    `
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

export default GodModeInterfaceBrowserElement;

declare global {
    interface HTMLElementTagNameMap {
        'godmode-interface-browser': GodModeInterfaceBrowserElement;
    }
}
